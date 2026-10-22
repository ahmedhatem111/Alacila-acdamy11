/* Shared ambient audio: restore selected sounds across full-page navigation. */
(() => {
    "use strict";

    const SOUND_OPTIONS = [
        { value: "rain", label: "صوت المطر", filter: ["highpass", 1100, .35] },
        { value: "forest", label: "الغابة والطيور", filter: ["bandpass", 1050, .5] },
        { value: "ocean", label: "أمواج البحر", filter: ["lowpass", 420, .35] },
        { value: "cafe", label: "ضوضاء المقهى", filter: ["bandpass", 700, .7] },
        { value: "fire", label: "طقطقة المدفأة", filter: ["lowpass", 600, .6] },
        { value: "wind", label: "نسيم الهواء", filter: ["lowpass", 220, .35] },
        { value: "river", label: "جدول ماء", filter: ["highpass", 500, .35] },
        { value: "white", label: "ضوضاء بيضاء", filter: ["allpass", 10000, .35] },
        { value: "pink", label: "ضوضاء وردية", filter: ["lowpass", 1500, .25] },
        { value: "brown", label: "ضوضاء بنية", filter: ["lowpass", 280, .25] },
        { value: "thunder", label: "رعد بعيد", filter: ["lowpass", 100, .4] },
        { value: "night", label: "أصوات الليل والزيز", filter: ["bandpass", 2300, .45] },
        { value: "fan", label: "مروحة هادئة", filter: ["lowpass", 320, .25] },
        { value: "train", label: "قطار بعيد", filter: ["bandpass", 190, .3] },
        { value: "keyboard", label: "نقر لوحة المفاتيح", filter: ["highpass", 2400, .5] },
    ];
    const user = window.AhliaStore && window.AhliaStore.getUser();
    const owner = user && user.mode === "local-guest" ? String(user.email || user.id).trim().toLowerCase() : user && String(user.id);
    const storageKey = owner ? "ahlia_ambient_audio:" + encodeURIComponent(owner) : "";
    const quranCatalogKey = "ahlia_quran_catalog:ar:v1";
    let items = [];
    let audioContext = null;
    let noiseBuffer = null;
    let soundOutput = null;
    let quranCatalog = null;
    let quranCatalogPromise = null;
    const activeSounds = new Map();
    const pendingSounds = new Set();
    let muted = false;

    try {
        muted = !!storageKey && sessionStorage.getItem(storageKey + ":muted") === "1";
    } catch (error) {}

    function readItems() {
        if (!storageKey) return [];
        try {
            const saved = JSON.parse(sessionStorage.getItem(storageKey));
            if (!Array.isArray(saved)) return [];
            const restored = saved.filter((item) => {
                if (SOUND_OPTIONS.some((sound) => sound.value === item.type)) return true;
                if (item.kind !== "quran" || typeof item.audioUrl !== "string") return false;
                try {
                    const url = new URL(item.audioUrl);
                    return url.protocol === "https:" && (url.hostname === "mp3quran.net" || url.hostname.endsWith(".mp3quran.net"));
                } catch (error) {
                    return false;
                }
            }).map((item) => Object.assign({}, item, {
                volume: Math.max(0, Math.min(100, Number(item.volume) || 0)),
                playing: item.playing === true,
                position: Math.max(0, Number(item.position) || 0),
            }));
            let hasQuran = false;
            return restored.filter((item) => {
                if (item.kind !== "quran") return true;
                if (hasQuran) return false;
                hasQuran = true;
                if (!item.reciterKey) {
                    const parts = String(item.type).split(":");
                    item.reciterKey = parts.length >= 4 ? parts.slice(1, -1).join(":") : parts.slice(1).join(":");
                }
                item.server = item.server || item.audioUrl.slice(0, item.audioUrl.lastIndexOf("/") + 1);
                item.type = "quran:" + item.reciterKey;
                return true;
            });
        } catch (error) {
            return [];
        }
    }

    async function loadQuranCatalog() {
        if (quranCatalog) return quranCatalog;
        if (quranCatalogPromise) return quranCatalogPromise;
        quranCatalogPromise = (async() => {
            try {
                const cached = JSON.parse(sessionStorage.getItem(quranCatalogKey));
                if (cached && Array.isArray(cached.reciters) && Array.isArray(cached.surahs)) {
                    quranCatalog = cached;
                    return cached;
                }
            } catch (error) {}
            const [reciterResponse, surahResponse] = await Promise.all([
                fetch("https://www.mp3quran.net/api/v3/reciters?language=ar"),
                fetch("https://www.mp3quran.net/api/v3/suwar?language=ar"),
            ]);
            if (!reciterResponse.ok || !surahResponse.ok) throw new Error("تعذّر تحميل قائمة التلاوات.");
            const [reciterData, surahData] = await Promise.all([reciterResponse.json(), surahResponse.json()]);
            const surahs = (surahData.suwar || []).map((surah) => ({ id: Number(surah.id), name: String(surah.name || "") }));
            if (surahs.length !== 114 || surahs.some((surah) => !surah.id || !surah.name)) throw new Error("قائمة السور غير مكتملة.");
            const completeIds = new Set(surahs.map((surah) => surah.id));
            const reciters = [];
            (reciterData.reciters || []).forEach((reciter) => {
                const moshafs = Array.isArray(reciter.moshaf) ? reciter.moshaf : [reciter.moshaf];
                moshafs.filter(Boolean).forEach((moshaf) => {
                    const available = new Set(String(moshaf.surah_list || "").split(",").map(Number).filter(Boolean));
                    if (available.size !== 114 || [...completeIds].some((id) => !available.has(id))) return;
                    try {
                        const server = new URL(String(moshaf.server || ""));
                        if (server.protocol !== "https:" || !(server.hostname === "mp3quran.net" || server.hostname.endsWith(".mp3quran.net"))) return;
                        reciters.push({
                            key: String(reciter.id) + ":" + String(moshaf.id),
                            name: String(reciter.name || "قارئ"),
                            recitation: String(moshaf.name || "مرتّل"),
                            server: server.href.endsWith("/") ? server.href : server.href + "/",
                        });
                    } catch (error) {}
                });
            });
            reciters.sort((a, b) => a.name.localeCompare(b.name, "ar") || a.recitation.localeCompare(b.recitation, "ar"));
            quranCatalog = { reciters, surahs };
            try { sessionStorage.setItem(quranCatalogKey, JSON.stringify(quranCatalog)); } catch (error) {}
            return quranCatalog;
        })().catch((error) => {
            quranCatalogPromise = null;
            throw error;
        });
        return quranCatalogPromise;
    }

    function persist() {
        if (!storageKey) return;
        try {
            sessionStorage.setItem(storageKey, JSON.stringify(items));
        } catch (error) {}
    }

    function emit() {
        window.dispatchEvent(new CustomEvent("ahlia-ambient-audio", { detail: controller.list() }));
    }

    function ensureAudio() {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) throw new Error("AudioContext is not supported");
        if (!audioContext || audioContext.state === "closed") {
            audioContext = new AudioContext();
            soundOutput = audioContext.createDynamicsCompressor();
            soundOutput.threshold.value = -10;
            soundOutput.knee.value = 16;
            soundOutput.ratio.value = 8;
            soundOutput.attack.value = .003;
            soundOutput.release.value = .25;
            soundOutput.connect(audioContext.destination);
            noiseBuffer = audioContext.createBuffer(1, audioContext.sampleRate * 4, audioContext.sampleRate);
            const data = noiseBuffer.getChannelData(0);
            for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
        }
        return audioContext;
    }

    function playTone(slot, frequency, duration, volume) {
        if (!audioContext || !slot.gain) return;
        const oscillator = audioContext.createOscillator();
        const gain = audioContext.createGain();
        oscillator.type = "sine";
        oscillator.frequency.value = frequency;
        gain.gain.setValueAtTime(.0001, audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(volume, audioContext.currentTime + .05);
        gain.gain.exponentialRampToValueAtTime(.0001, audioContext.currentTime + duration);
        oscillator.connect(gain).connect(slot.gain);
        oscillator.addEventListener("ended", () => {
            oscillator.disconnect();
            slot.nodes = slot.nodes.filter((node) => node !== oscillator);
        }, { once: true });
        oscillator.start();
        oscillator.stop(audioContext.currentTime + duration);
        slot.nodes.push(oscillator);
    }

    function scheduleSound(type, slot) {
        if (type === "ocean" || type === "wind") {
            const wave = audioContext.createOscillator();
            const swell = audioContext.createGain();
            wave.frequency.value = type === "ocean" ? .08 : .04;
            swell.gain.value = type === "ocean" ? .12 : .08;
            wave.connect(swell).connect(slot.gain.gain);
            wave.start();
            slot.nodes.push(wave);
        }
        const schedules = {
            forest: [1800, () => { if (Math.random() > .55) playTone(slot, 1500 + Math.random() * 1000, .12 + Math.random() * .18, .025); }],
            fire: [220, () => { if (Math.random() > .45) playTone(slot, 350 + Math.random() * 950, .025 + Math.random() * .06, .04); }],
            rain: [180, () => { if (Math.random() > .55) playTone(slot, 1700 + Math.random() * 1800, .025 + Math.random() * .05, .025); }],
            thunder: [7000, () => { if (Math.random() > .72) playTone(slot, 45 + Math.random() * 35, 1.8 + Math.random(), .08); }],
            night: [650, () => { if (Math.random() > .35) playTone(slot, 2200 + Math.random() * 900, .04 + Math.random() * .07, .018); }],
            train: [520, () => playTone(slot, 110 + Math.random() * 45, .08, .035)],
            keyboard: [260, () => { if (Math.random() > .45) playTone(slot, 1700 + Math.random() * 2200, .018 + Math.random() * .035, .025); }],
        };
        if (schedules[type]) slot.timer = window.setInterval(schedules[type][1], schedules[type][0]);
    }

    function stopRuntime(type) {
        const slot = activeSounds.get(type);
        if (!slot) return;
        if (slot.audio) {
            const item = items.find((sound) => sound.type === type);
            if (item && Number.isFinite(slot.audio.currentTime)) item.position = slot.audio.currentTime;
            slot.audio.pause();
        }
        if (slot.timer) window.clearInterval(slot.timer);
        slot.nodes.forEach((node) => {
            try { node.stop(); } catch (error) {}
            try { node.disconnect(); } catch (error) {}
        });
        activeSounds.delete(type);
    }

    async function startItem(item) {
        if (!item || !item.playing || activeSounds.has(item.type) || pendingSounds.has(item.type)) return;
        pendingSounds.add(item.type);
        let slot = null;
        try {
            if (item.kind === "quran") {
                const catalog = await loadQuranCatalog();
                if (!item.playing) return;
                const audio = new Audio(item.audioUrl);
                audio.preload = "auto";
                audio.volume = muted ? 0 : item.volume / 100;
                slot = { audio, nodes: [], gain: null, timer: null };
                activeSounds.set(item.type, slot);
                audio.addEventListener("loadedmetadata", () => {
                    if (item.position > 0 && Number.isFinite(audio.duration) && item.position < audio.duration) {
                        audio.currentTime = item.position;
                    }
                }, { once: true });
                audio.addEventListener("timeupdate", () => {
                    if (audio.currentTime > 0) item.position = audio.currentTime;
                    if (Date.now() - (item.lastSaved || 0) > 2500) {
                        item.lastSaved = Date.now();
                        persist();
                    }
                });
                audio.addEventListener("ended", () => {
                    activeSounds.delete(item.type);
                    const nextSurah = catalog && catalog.surahs.find((surah) => surah.id === item.surahId + 1);
                    if (nextSurah) {
                        item.surahId = nextSurah.id;
                        item.label = "سورة " + nextSurah.name;
                        item.audioUrl = item.server + String(nextSurah.id).padStart(3, "0") + ".mp3";
                        item.position = 0;
                        persist();
                        emit();
                        startItem(item);
                        return;
                    }
                    item.playing = false;
                    item.position = 0;
                    persist();
                    emit();
                }, { once: true });
                audio.addEventListener("error", () => {
                    item.playing = false;
                    activeSounds.delete(item.type);
                    persist();
                    emit();
                    window.dispatchEvent(new CustomEvent("ahlia-ambient-audio-error", { detail: { type: item.type, message: "تعذّر تشغيل التلاوة. تحقق من اتصال الإنترنت." } }));
                }, { once: true });
                await audio.play();
                return;
            }
            ensureAudio();
            if (audioContext.state === "suspended") await audioContext.resume();
            if (!item.playing) return;
            const settings = SOUND_OPTIONS.find((sound) => sound.value === item.type);
            const source = audioContext.createBufferSource();
            const filter = audioContext.createBiquadFilter();
            const gain = audioContext.createGain();
            slot = { nodes: [source], gain, timer: null };
            source.buffer = noiseBuffer;
            source.loop = true;
            filter.type = settings.filter[0];
            filter.frequency.value = settings.filter[1];
            filter.Q.value = settings.filter[2];
            gain.gain.value = item.volume / 100 * .4 * (muted ? 0 : 1);
            source.connect(filter).connect(gain).connect(soundOutput);
            activeSounds.set(item.type, slot);
            source.start();
            scheduleSound(item.type, slot);
        } catch (error) {
            if (slot) stopRuntime(item.type);
        } finally {
            pendingSounds.delete(item.type);
        }
    }

    const controller = {
        getOptions() { return SOUND_OPTIONS.map((sound) => Object.assign({}, sound)); },
        getQuranCatalog() { return loadQuranCatalog(); },
        list() { return items.map((item) => Object.assign({}, item)); },
        get(type) { const item = items.find((sound) => sound.type === type); return item ? Object.assign({}, item) : null; },
        getQuran() { const item = items.find((sound) => sound.kind === "quran"); return item ? Object.assign({}, item) : null; },
        add(type, volume) {
            if (!SOUND_OPTIONS.some((sound) => sound.value === type) || items.some((item) => item.type === type)) return false;
            const item = { type, volume: Math.max(0, Math.min(100, Number(volume) || 0)), playing: true };
            items.push(item);
            persist();
            emit();
            startItem(item);
            return true;
        },
        addQuran(reciter, surah, volume) {
            if (!reciter || !surah || !reciter.server || !surah.id) return null;
            let item = items.find((sound) => sound.kind === "quran");
            const type = "quran:" + reciter.key;
            if (!item) {
                item = { type, kind: "quran" };
                items.push(item);
            } else {
                stopRuntime(item.type);
            }
            Object.assign(item, {
                type,
                kind: "quran",
                reciterKey: reciter.key,
                server: reciter.server,
                label: "سورة " + surah.name,
                reciter: reciter.name,
                recitation: reciter.recitation,
                surahId: Number(surah.id),
                volume: Math.max(0, Math.min(100, Number(volume) || 0)),
                playing: true,
                position: 0,
                audioUrl: reciter.server + String(surah.id).padStart(3, "0") + ".mp3",
            });
            persist();
            emit();
            startItem(item);
            return Object.assign({}, item);
        },
        toggle(type) {
            const item = items.find((sound) => sound.type === type);
            if (!item) return;
            item.playing = !item.playing;
            if (item.playing) startItem(item);
            else stopRuntime(type);
            persist();
            emit();
        },
        remove(type) {
            stopRuntime(type);
            items = items.filter((item) => item.type !== type);
            persist();
            emit();
        },
        setVolume(type, volume) {
            const item = items.find((sound) => sound.type === type);
            if (!item) return;
            item.volume = Math.max(0, Math.min(100, Number(volume) || 0));
            const slot = activeSounds.get(type);
            if (slot && slot.audio) slot.audio.volume = muted ? 0 : item.volume / 100;
            else if (slot && audioContext) slot.gain.gain.setTargetAtTime(item.volume / 100 * .4 * (muted ? 0 : 1), audioContext.currentTime, .08);
            persist();
        },
        isMuted() { return muted; },
        toggleMute() {
            muted = !muted;
            try {
                if (storageKey) sessionStorage.setItem(storageKey + ":muted", muted ? "1" : "0");
            } catch (error) {}
            items.forEach((item) => {
                const slot = activeSounds.get(item.type);
                if (!slot) return;
                if (slot.audio) slot.audio.volume = muted ? 0 : item.volume / 100;
                else if (audioContext) slot.gain.gain.setTargetAtTime(item.volume / 100 * .4 * (muted ? 0 : 1), audioContext.currentTime, .08);
            });
            emit();
            return muted;
        },
        chime(frequency) {
            if (muted || !audioContext || audioContext.state !== "running") return;
            const oscillator = audioContext.createOscillator();
            const gain = audioContext.createGain();
            oscillator.frequency.value = frequency;
            gain.gain.setValueAtTime(.12, audioContext.currentTime);
            gain.gain.exponentialRampToValueAtTime(.001, audioContext.currentTime + .8);
            oscillator.connect(gain).connect(audioContext.destination);
            oscillator.start();
            oscillator.stop(audioContext.currentTime + .8);
        },
        shutdown() {
            activeSounds.forEach((slot, type) => {
                if (!slot.audio) return;
                const item = items.find((sound) => sound.type === type);
                if (item && Number.isFinite(slot.audio.currentTime)) item.position = slot.audio.currentTime;
            });
            persist();
            Array.from(activeSounds.keys()).forEach(stopRuntime);
            pendingSounds.clear();
            if (audioContext && audioContext.state !== "closed") audioContext.close();
            audioContext = null;
            noiseBuffer = null;
            soundOutput = null;
        },
    };

    window.AhliaAmbientAudio = controller;
    items = readItems();
    items.filter((item) => item.playing).forEach(startItem);

    function resumePendingSounds() {
        if (audioContext && audioContext.state === "suspended") audioContext.resume().catch(() => {});
        items.filter((item) => item.playing).forEach(startItem);
    }
    document.addEventListener("pointerdown", resumePendingSounds, true);
    document.addEventListener("keydown", resumePendingSounds, true);
    window.addEventListener("pagehide", controller.shutdown);
    window.addEventListener("pageshow", () => items.filter((item) => item.playing).forEach(startItem));
})();

(() => {
    const header = document.querySelector(".header__inner");
    if (!header) return;

    let nav = header.querySelector("#nav");
    if (!nav) {
        nav = document.createElement("nav");
        nav.id = "nav";
        nav.className = "nav";
        nav.setAttribute("aria-label", "القائمة الرئيسية");
        const actions = header.querySelector(".header__actions");
        actions ? header.insertBefore(nav, actions) : header.append(nav);
        if (actions && !actions.querySelector("#burger")) {
            const burger = document.createElement("button");
            burger.className = "burger";
            burger.id = "burger";
            burger.type = "button";
            burger.setAttribute("aria-label", "فتح القائمة");
            burger.setAttribute("aria-expanded", "false");
            burger.innerHTML = "<span></span><span></span><span></span>";
            actions.append(burger);
        }
    }

    const file = location.pathname.split("/").pop() || "index.html";
    const hash = location.hash;
    const onHome = file === "index.html" || file === "";
    const homeHref = onHome ? "#home" : "index.html#home";
    const sectionHref = (id) => onHome ? "#" + id : "index.html#" + id;
    const items = [
        { key: "home", label: "الرئيسية", href: homeHref, group: "main" },
        { key: "years", label: "السنوات الدراسية", href: sectionHref("years"), group: "main" },
        { key: "majors", label: "التخصصات", href: sectionHref("majors"), group: "main" },
        { key: "courses", label: "الكورسات", href: onHome ? "#courses" : "courses.html", group: "main" },
        { key: "paths", label: "المسارات المهنية", href: "paths.html", menuGroup: "الدراسة والتخصصات" },
        { key: "year1", label: "السنة الأولى", href: "year1.html", menuGroup: "الدراسة والتخصصات" },
        { key: "year2", label: "السنة الثانية", href: "year2.html", menuGroup: "الدراسة والتخصصات" },
        { key: "cs", label: "علوم الحاسب", href: "cs.html", menuGroup: "الدراسة والتخصصات" },
        { key: "ai", label: "الذكاء الاصطناعي", href: "ai.html", menuGroup: "الدراسة والتخصصات" },
        { key: "is", label: "نظم المعلومات", href: "is.html", menuGroup: "الدراسة والتخصصات" },
        { key: "staff", label: "هيئة التدريس", href: "staff.html", menuGroup: "خدمات الطالب" },
        { key: "schedule", label: "جدولي", href: "schedule.html", menuGroup: "خدمات الطالب" },
        { key: "pomodoro", label: "ركن المذاكرة", href: "pomodoro.html", menuGroup: "خدمات الطالب" },
        { key: "apps", label: "تطبيقات الدراسة", href: "apps.html", menuGroup: "خدمات الطالب" },
        { key: "locations", label: "مواقع المحاضرات", href: "locations.html", menuGroup: "خدمات الطالب" },
        { key: "library", label: "المكتبة", href: "library.html", menuGroup: "خدمات الطالب" },
        { key: "feedback", label: "الاقتراحات والشكاوى", href: "feedback.html", menuGroup: "خدمات الطالب" },
        { key: "certificate", label: "الشهادات", href: "certificate-info.html", menuGroup: "خدمات الطالب" },
        { key: "ai-tools", label: "أدوات الذكاء الاصطناعي", href: "ai-tools.html", menuGroup: "مصادر التقنية" },
        { key: "movies", label: "الأفلام", href: "movies.html", menuGroup: "مصادر التقنية" },
        { key: "videos", label: "فيديوهات تقنية", href: "videos.html", menuGroup: "مصادر التقنية" },
        { key: "memes", label: "اضحك يا مبرمج", href: "memes.html", menuGroup: "مصادر التقنية" },
        { key: "news", label: "أخبار التقنية", href: "news.html", menuGroup: "مصادر التقنية" },
        { key: "laptops", label: "دليل اللابتوب", href: "laptops.html", menuGroup: "مصادر التقنية" },
        { key: "opportunities", label: "فرص العمل والتدريب", href: "opportunities.html", menuGroup: "المشاريع والمجتمع" },
        { key: "volunteering", label: "التطوع والأنشطة الطلابية", href: "volunteering.html", menuGroup: "المشاريع والمجتمع" },
        { key: "projects", label: "معرض مشاريع الطلاب", href: "projects.html", menuGroup: "المشاريع والمجتمع" },
        { key: "teams", label: "زملاء المشروع", href: "teams.html", menuGroup: "المشاريع والمجتمع" },
        { key: "team", label: "فريق العمل", href: "team.html", menuGroup: "المشاريع والمجتمع" },
    ];
    const pageFor = { year1: "year1.html", year2: "year2.html", cs: "cs.html", ai: "ai.html", is: "is.html", courses: "courses.html", paths: "paths.html", staff: "staff.html", "ai-tools": "ai-tools.html", movies: "movies.html", videos: "videos.html", memes: "memes.html", news: "news.html", laptops: "laptops.html", library: "library.html", feedback: "feedback.html", schedule: "schedule.html", pomodoro: "pomodoro.html", apps: "apps.html", locations: "locations.html", opportunities: "opportunities.html", volunteering: "volunteering.html", projects: "projects.html", teams: "teams.html", team: "team.html" };
    const isActive = (key) => {
        if (key === "home") return file === "welcome.html" || (onHome && (!hash || hash === "#home"));
        if (key === "years") return ["year1.html", "year2.html"].includes(file) || (onHome && hash === "#years");
        if (key === "majors") return ["cs.html", "ai.html", "is.html"].includes(file) || (onHome && hash === "#majors");
        if (key === "courses") return ["courses.html", "course.html"].includes(file) || (onHome && hash === "#courses");
        if (key === "certificate") return file === "certificate-info.html" || (onHome && hash === "#certificate");
        return file === pageFor[key];
    };
    const makeLink = (item) => {
        const link = document.createElement("a");
        link.href = item.href;
        link.textContent = item.label;
        if (isActive(item.key)) {
            link.classList.add("active");
            link.setAttribute("aria-current", "page");
        }
        return link;
    };
    const more = document.createElement("div");
    more.className = "nav-more";
    more.innerHTML = '<button class="nav-more__btn" type="button" aria-haspopup="true" aria-expanded="false" aria-controls="navMoreMenu">المزيد <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="m3 6 5 5 5-5"/></svg></button><div class="nav-more__menu" id="navMoreMenu" aria-label="روابط الموقع الإضافية"></div>';
    const menuGroups = new Map();
    items.filter((item) => item.group !== "main").forEach((item) => {
        const label = item.menuGroup || "روابط أخرى";
        if (!menuGroups.has(label)) menuGroups.set(label, []);
        menuGroups.get(label).push(item);
    });
    more.querySelector(".nav-more__menu").replaceChildren(...[...menuGroups].map(([label, links]) => {
        const group = document.createElement("div");
        group.className = "nav-more__group";
        group.setAttribute("role", "group");
        group.setAttribute("aria-label", label);
        const heading = document.createElement("h3");
        heading.className = "nav-more__heading";
        heading.textContent = label;
        group.append(heading, ...links.map(makeLink));
        return group;
    }));
    if (items.some((item) => item.group !== "main" && isActive(item.key))) more.querySelector(".nav-more__btn").classList.add("active");
    nav.replaceChildren(...items.filter((item) => item.group === "main").map(makeLink), more);
})();

/* Shared Pomodoro clock: keep time and daily study totals moving between pages. */
(() => {
    "use strict";

    const TIMER_PREFIX = "ahlia_study_timer:";
    const PENDING_PREFIX = "ahlia_study_pending:";
    const DAY_MS = 86400000;
    const DEFAULT_FOCUS = 25 * 60;
    const DEFAULT_BREAK = 5 * 60;
    let owner = "";
    let timerKey = "";
    let pendingKey = "";
    let state = null;
    let tickHandle = 0;
    let widget = null;
    let widgetDismissed = false;
    let toast = null;
    let toastTimeout = 0;
    let saving = false;
    let lastFlushAttempt = 0;
    let lastNoticeId = "";

    function userOwner() {
        const user = window.AhliaStore && window.AhliaStore.getUser();
        if (!user) return "";
        return user.mode === "local-guest" ? String(user.email || user.id).trim().toLowerCase() : String(user.id);
    }

    function read(key, fallback) {
        try {
            const value = JSON.parse(localStorage.getItem(key));
            return value == null ? fallback : value;
        } catch (error) {
            return fallback;
        }
    }

    function saveState() {
        try {
            localStorage.setItem(timerKey, JSON.stringify(state));
        } catch (error) {
            dispatch({ error: "تعذّر حفظ حالة المؤقّت على هذا الجهاز." });
        }
    }

    function dispatch(extra) {
        if (!state) return;
        window.dispatchEvent(new CustomEvent("ahlia-study-timer", {
            detail: Object.assign({}, state, extra || {}),
        }));
    }

    function eventId() {
        if (window.crypto && window.crypto.randomUUID) return window.crypto.randomUUID();
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
            const r = Math.random() * 16 | 0;
            return (c === "x" ? r : (r & 3 | 8)).toString(16);
        });
    }

    function dayKey(timestamp) {
        const date = new Date(timestamp);
        return date.getFullYear() + "-" + String(date.getMonth() + 1).padStart(2, "0") + "-" + String(date.getDate()).padStart(2, "0");
    }

    function storeFocusSeconds(start, seconds) {
        let cursor = start;
        while (seconds > 0) {
            const dayStart = new Date(cursor);
            dayStart.setHours(0, 0, 0, 0);
            const chunk = Math.min(seconds, Math.max(1, Math.ceil((dayStart.getTime() + DAY_MS - cursor) / 1000)));
            const date = dayKey(cursor);
            const pending = read(pendingKey, {});
            const slot = pending[date] || { seconds: 0, inflight: null };
            slot.seconds = Math.min(86400, Number(slot.seconds || 0) + chunk);
            pending[date] = slot;
            try {
                localStorage.setItem(pendingKey, JSON.stringify(pending));
            } catch (error) {
                dispatch({ error: "تعذّر حفظ وقت الدراسة مؤقتًا على هذا الجهاز." });
            }
            cursor += chunk * 1000;
            seconds -= chunk;
        }
    }

    async function flushStudy() {
        if (saving || Date.now() - lastFlushAttempt < 30000 || !window.AhliaStore) return;
        const pending = read(pendingKey, {});
        const date = Object.keys(pending).sort()[0];
        if (!date) return;
        const slot = pending[date];
        if (!slot.inflight && slot.seconds > 0) {
            const seconds = Math.floor(slot.seconds);
            if (!seconds) return;
            slot.inflight = { id: eventId(), seconds };
            slot.seconds -= seconds;
            try {
                localStorage.setItem(pendingKey, JSON.stringify(pending));
            } catch (error) {
                dispatch({ error: "تعذّر حفظ وقت الدراسة مؤقتًا على هذا الجهاز." });
                return;
            }
        }
        const request = slot.inflight;
        if (!request) return;
        saving = true;
        lastFlushAttempt = Date.now();
        try {
            await window.AhliaStore.api("POST", "/api/study-sessions", {
                date,
                seconds: request.seconds,
                eventId: request.id,
            });
            const current = read(pendingKey, {});
            if (current[date] && current[date].inflight && current[date].inflight.id === request.id) {
                current[date].inflight = null;
                if (!current[date].seconds) delete current[date];
                localStorage.setItem(pendingKey, JSON.stringify(current));
            }
            lastFlushAttempt = 0;
            dispatch({ saved: true });
        } catch (error) {
            dispatch({ error: error.message || "تعذّر حفظ وقت المذاكرة. ستتم إعادة المحاولة لاحقًا." });
        } finally {
            saving = false;
        }
    }

    function showNotice(notice) {
        if (!toast || !notice || !notice.id || notice.id === lastNoticeId) return;
        lastNoticeId = notice.id;
        const seenKey = "ahlia_study_notice:" + encodeURIComponent(owner);
        try {
            if (sessionStorage.getItem(seenKey) === notice.id) return;
            sessionStorage.setItem(seenKey, notice.id);
        } catch (error) {}
        toast.replaceChildren();
        const message = document.createElement("p");
        message.textContent = notice.message;
        const open = document.createElement("a");
        open.href = "pomodoro.html";
        open.textContent = "فتح المؤقّت";
        open.className = "study-global-toast__open";
        const close = document.createElement("button");
        close.type = "button";
        close.className = "study-global-toast__close";
        close.setAttribute("aria-label", "إغلاق التنبيه");
        close.textContent = "×";
        close.addEventListener("click", () => { toast.hidden = true; });
        toast.append(message, open, close);
        toast.hidden = false;
        window.clearTimeout(toastTimeout);
        toastTimeout = window.setTimeout(() => { toast.hidden = true; }, 9000);
    }

    function formatTime(seconds) {
        const remaining = Math.max(0, Math.ceil(seconds));
        return String(Math.floor(remaining / 60)).padStart(2, "0") + ":" + String(remaining % 60).padStart(2, "0");
    }

    function renderWidget() {
        if (!widget || !state) return;
        const phase = state.phase === "focus" ? "تركيز" : "استراحة";
        const audioActive = window.AhliaAmbientAudio && window.AhliaAmbientAudio.list().some((item) => item.playing);
        const time = state.running && state.remaining > 0 ? state.remaining - (Date.now() - state.updatedAt) / 1000 : state.remaining;
        const toggle = widget.querySelector(".study-global-widget__toggle");
        widget.dataset.phase = state.phase;
        widget.classList.toggle("is-paused", !state.running);
        widget.querySelector(".study-global-widget__phase").textContent = state.running ? phase : "متوقفة";
        widget.querySelector(".study-global-widget__clock").textContent = formatTime(Math.max(0, time));
        const progress = Math.max(0, Math.min(1, 1 - Math.max(0, time) / state.phaseLength));
        const ring = widget.querySelector(".study-global-widget__progress");
        ring.style.strokeDashoffset = String(194.78 * (1 - progress));
        const label = "مؤقّت " + phase + "، " + formatTime(Math.max(0, time)) + (state.running ? " متبقٍ. اضغط للإيقاف المؤقت." : " متبقية. اضغط للاستئناف.");
        toggle.setAttribute("aria-label", label);
        toggle.title = label;
        toggle.setAttribute("aria-pressed", String(state.running));
        const mute = widget.querySelector(".study-global-widget__mute");
        const muted = window.AhliaAmbientAudio && window.AhliaAmbientAudio.isMuted();
        mute.setAttribute("aria-pressed", String(muted));
        mute.setAttribute("aria-label", muted ? "تشغيل الصوت" : "كتم الصوت");
        mute.title = muted ? "تشغيل الصوت" : "كتم الصوت";
        mute.querySelector(".study-global-widget__mute-waves").style.display = muted ? "none" : "";
        mute.querySelector(".study-global-widget__mute-cross").style.display = muted ? "" : "none";
        widget.hidden = (widgetDismissed && !audioActive) || location.pathname.split("/").pop() === "pomodoro.html" || (!state.used && !audioActive);
        if (state.notice && Date.now() - state.notice.at < 30000) showNotice(state.notice);
    }

    function makeWidget() {
        if (!document.body || widget) return;
        toast = document.createElement("aside");
        toast.className = "study-global-toast";
        toast.setAttribute("role", "status");
        toast.setAttribute("aria-live", "polite");
        toast.hidden = true;
        document.body.append(toast);

        widget = document.createElement("aside");
        widget.className = "study-global-widget";
        widget.setAttribute("aria-label", "مؤقّت المذاكرة المستمر");
        try {
            widgetDismissed = sessionStorage.getItem("ahlia_study_widget_hidden") === "1";
        } catch (error) {}
        const toggle = document.createElement("button");
        toggle.type = "button";
        toggle.className = "study-global-widget__toggle";
        toggle.setAttribute("aria-pressed", "false");
        const ring = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        ring.classList.add("study-global-widget__ring");
        ring.setAttribute("viewBox", "0 0 72 72");
        ring.setAttribute("aria-hidden", "true");
        const track = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        track.classList.add("study-global-widget__track");
        track.setAttribute("cx", "36");
        track.setAttribute("cy", "36");
        track.setAttribute("r", "31");
        const progress = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        progress.classList.add("study-global-widget__progress");
        progress.setAttribute("cx", "36");
        progress.setAttribute("cy", "36");
        progress.setAttribute("r", "31");
        progress.setAttribute("stroke-dasharray", "194.78");
        progress.setAttribute("stroke-dashoffset", "194.78");
        ring.append(track, progress);
        const phase = document.createElement("span");
        phase.className = "study-global-widget__phase";
        const clock = document.createElement("strong");
        clock.className = "study-global-widget__clock";
        const pausedIndicator = document.createElement("span");
        pausedIndicator.className = "study-global-widget__paused-indicator";
        pausedIndicator.textContent = "Ⅱ";
        pausedIndicator.setAttribute("aria-hidden", "true");
        toggle.append(ring, phase, clock, pausedIndicator);
        toggle.addEventListener("click", () => {
            if (state.running) controller.pause();
            else controller.start();
        });
        const actions = document.createElement("div");
        actions.className = "study-global-widget__actions";
        const mute = document.createElement("button");
        mute.type = "button";
        mute.className = "study-global-widget__action study-global-widget__mute";
        const muteIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        muteIcon.setAttribute("viewBox", "0 0 24 24");
        muteIcon.setAttribute("fill", "none");
        muteIcon.setAttribute("stroke", "currentColor");
        muteIcon.setAttribute("stroke-width", "2");
        muteIcon.setAttribute("stroke-linecap", "round");
        muteIcon.setAttribute("stroke-linejoin", "round");
        muteIcon.setAttribute("aria-hidden", "true");
        const speaker = document.createElementNS("http://www.w3.org/2000/svg", "path");
        speaker.setAttribute("d", "M11 5 6 9H3v6h3l5 4z");
        const waves = document.createElementNS("http://www.w3.org/2000/svg", "path");
        waves.classList.add("study-global-widget__mute-waves");
        waves.setAttribute("d", "M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13");
        const cross = document.createElementNS("http://www.w3.org/2000/svg", "path");
        cross.classList.add("study-global-widget__mute-cross");
        cross.setAttribute("d", "m16 9 5 6m0-6-5 6");
        cross.style.display = "none";
        muteIcon.append(speaker, waves, cross);
        mute.append(muteIcon);
        mute.setAttribute("aria-pressed", "false");
        mute.addEventListener("click", () => window.AhliaAmbientAudio.toggleMute());
        const open = document.createElement("a");
        open.className = "study-global-widget__action study-global-widget__open";
        open.href = "pomodoro.html";
        open.setAttribute("aria-label", "فتح صفحة المؤقّت");
        open.title = "فتح صفحة المؤقّت";
        open.textContent = "↗";
        const close = document.createElement("button");
        close.type = "button";
        close.className = "study-global-widget__action study-global-widget__close";
        close.setAttribute("aria-label", "إخفاء مؤقّت المذاكرة");
        close.title = "إخفاء المؤقّت";
        close.textContent = "×";
        close.addEventListener("click", () => {
            if (state.running) controller.pause();
            widgetDismissed = true;
            try {
                sessionStorage.setItem("ahlia_study_widget_hidden", "1");
            } catch (error) {}
            widget.hidden = true;
        });
        actions.append(mute, open, close);
        widget.append(toggle, actions);
        document.body.append(widget);
        renderWidget();
    }

    function tick() {
        if (!state || !state.running) return;
        const now = Date.now();
        let elapsed = Math.max(0, Math.floor((now - state.updatedAt) / 1000));
        elapsed = Math.min(elapsed, 7 * 86400);
        let cursor = now - elapsed * 1000;
        while (elapsed > 0) {
            const segment = Math.min(elapsed, state.remaining);
            if (state.phase === "focus") storeFocusSeconds(cursor, segment);
            state.remaining -= segment;
            elapsed -= segment;
            cursor += segment * 1000;
            if (state.remaining <= 0) {
                const completed = state.phase;
                const duration = state.phaseLength;
                state.phase = completed === "focus" ? "break" : "focus";
                state.phaseLength = state.phase === "focus" ? state.focusDuration : state.breakDuration;
                state.remaining = state.phaseLength;
                state.notice = {
                    id: eventId(),
                    at: now,
                    message: completed === "focus" ?
                        "انتهى وقت التركيز (" + Math.round(duration / 60) + " دقيقة). ابدأ الاستراحة الآن." : "انتهت الاستراحة (" + Math.round(duration / 60) + " دقيقة). حان وقت جلسة تركيز جديدة.",
                };
                showNotice(state.notice);
            }
        }
        state.updatedAt = cursor;
        saveState();
        if (Object.values(read(pendingKey, {})).some((slot) => slot.seconds >= 30 || slot.inflight)) flushStudy();
        renderWidget();
        dispatch();
    }

    function syncNow() {
        tick();
        return state;
    }

    function startTicker() {
        if (!tickHandle) tickHandle = window.setInterval(tick, 1000);
    }

    function stopTicker() {
        if (tickHandle) window.clearInterval(tickHandle);
        tickHandle = 0;
    }

    const controller = {
        getState() { return state ? Object.assign({}, state) : null; },
        init(focusDuration, breakDuration) {
            owner = userOwner();
            if (!owner) return null;
            timerKey = TIMER_PREFIX + encodeURIComponent(owner);
            pendingKey = PENDING_PREFIX + encodeURIComponent(owner);
            const stored = read(timerKey, null);
            if (!stored || stored.owner !== owner || !["focus", "break"].includes(stored.phase)) {
                state = {
                    owner,
                    phase: "focus",
                    focusDuration,
                    breakDuration,
                    phaseLength: focusDuration,
                    remaining: focusDuration,
                    running: false,
                    used: false,
                    updatedAt: Date.now(),
                    notice: null,
                };
                saveState();
            } else {
                state = Object.assign({
                    focusDuration,
                    breakDuration,
                    phaseLength: focusDuration,
                    remaining: focusDuration,
                    running: false,
                    used: false,
                    updatedAt: Date.now(),
                    notice: null,
                }, stored);
                if (!Number.isFinite(state.remaining) || state.remaining <= 0) state.remaining = state.phaseLength;
            }
            dispatch();
            return Object.assign({}, state);
        },
        configure(focusDuration, breakDuration) {
            if (!state) return;
            const oldLength = state.phaseLength;
            state.focusDuration = focusDuration;
            state.breakDuration = breakDuration;
            if (!state.running && state.remaining === oldLength) {
                state.phaseLength = state.phase === "focus" ? focusDuration : breakDuration;
                state.remaining = state.phaseLength;
            }
            saveState();
            dispatch();
        },
        start() {
            if (!state || state.running) return;
            widgetDismissed = false;
            try {
                sessionStorage.removeItem("ahlia_study_widget_hidden");
            } catch (error) {}
            state.running = true;
            state.used = true;
            state.updatedAt = Date.now();
            saveState();
            startTicker();
            renderWidget();
            dispatch();
        },
        pause() {
            if (!state || !state.running) return;
            tick();
            state.running = false;
            state.updatedAt = Date.now();
            saveState();
            stopTicker();
            renderWidget();
            dispatch();
        },
        reset(focusDuration, breakDuration) {
            if (!state) return;
            state.phase = "focus";
            state.focusDuration = focusDuration;
            state.breakDuration = breakDuration;
            state.phaseLength = focusDuration;
            state.remaining = focusDuration;
            state.running = false;
            state.updatedAt = Date.now();
            state.notice = null;
            saveState();
            stopTicker();
            renderWidget();
            dispatch();
        },
        sync: syncNow,
    };
    window.AhliaStudyTimer = controller;

    controller.init(DEFAULT_FOCUS, DEFAULT_BREAK);
    document.addEventListener("DOMContentLoaded", () => {
        owner = userOwner();
        if (!owner || !state) return;
        makeWidget();
        window.addEventListener("ahlia-ambient-audio", renderWidget);
        renderWidget();
        if (state.notice && Date.now() - state.notice.at < 30000) showNotice(state.notice);
        if (state.running) {
            tick();
            startTicker();
        }
        window.addEventListener("storage", (event) => {
            if (event.key !== timerKey || !event.newValue) return;
            try {
                state = JSON.parse(event.newValue);
                if (state.running) startTicker();
                else stopTicker();
                renderWidget();
                dispatch();
            } catch (error) {}
        });
        window.addEventListener("pagehide", () => {
            if (state.running) tick();
            stopTicker();
        }, { once: true });
        window.addEventListener("pageshow", () => {
            if (state.running) {
                tick();
                startTicker();
            }
        });
    });
})();

document.addEventListener("DOMContentLoaded", () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* ---------- 1) Starfield background ---------- */
    const canvas = document.getElementById("stars");
    const ctx = canvas ? canvas.getContext("2d") : null;
    let stars = [];

    function resize() {
        if (!canvas) return;
        canvas.width = innerWidth;
        canvas.height = innerHeight;
        stars = Array.from({ length: Math.min(90, Math.floor(innerWidth / 14)) }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 1.6 + 0.3,
            s: Math.random() * 0.25 + 0.05,
            a: Math.random() * Math.PI * 2,
        }));
    }

    function draw() {
        if (!ctx) return;
        if (document.documentElement.getAttribute("data-theme") === "soft") {
            // calm theme has no starfield: clear it and check back later
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            if (!reduce) setTimeout(() => requestAnimationFrame(draw), 600);
            return;
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (const st of stars) {
            st.a += 0.02;
            st.y += st.s;
            if (st.y > canvas.height) {
                st.y = 0;
                st.x = Math.random() * canvas.width;
            }
            ctx.beginPath();
            ctx.fillStyle = `rgba(140,180,255,${0.35 + Math.sin(st.a) * 0.3})`;
            ctx.arc(st.x, st.y, st.r, 0, Math.PI * 2);
            ctx.fill();
        }
        if (!reduce) requestAnimationFrame(draw);
    }
    resize();
    draw();
    addEventListener("resize", resize);

    /* ---------- 2) Mobile menu ---------- */
    const burger = document.getElementById("burger");
    const nav = document.getElementById("nav");
    if (burger && nav) {
        const more = nav.querySelector(".nav-more");
        const moreButton = more && more.querySelector(".nav-more__btn");
        burger.addEventListener("click", () => {
            const open = nav.classList.toggle("open");
            burger.setAttribute("aria-expanded", open);
            if (open && matchMedia("(max-width: 1200px)").matches && moreButton && !more.classList.contains("open")) {
                requestAnimationFrame(() => {
                    if (nav.classList.contains("open") && !more.classList.contains("open")) moreButton.click();
                });
            } else if (!open && moreButton && more.classList.contains("open")) moreButton.click();
        });
        nav.querySelectorAll("a").forEach((a) =>
            a.addEventListener("click", () => {
                nav.classList.remove("open");
                burger.setAttribute("aria-expanded", "false");
                if (moreButton && more.classList.contains("open")) moreButton.click();
            })
        );
    }

    /* ---------- 3) Active nav link on scroll ---------- */
    const links = nav ? [...nav.querySelectorAll("a")] : [];
    const map = new Map(links.map((l) => [l.getAttribute("href").slice(1), l]));
    const spy = new IntersectionObserver(
        (entries) => {
            entries.forEach((e) => {
                if (e.isIntersecting && map.has(e.target.id)) {
                    links.forEach((l) => l.classList.remove("active"));
                    map.get(e.target.id).classList.add("active");
                }
            });
        }, { rootMargin: "-40% 0px -55% 0px" }
    );
    ["home", "years", "majors", "courses", "features", "certificate"].forEach((id) => {
        const el = document.getElementById(id);
        if (el) spy.observe(el);
    });

    /* ---------- 4) Progress bars animate when visible ---------- */
    const barObs = new IntersectionObserver(
        (entries) => entries.forEach((e) => {
            if (e.isIntersecting) {
                e.target.classList.add("in");
                barObs.unobserve(e.target);
            }
        }), { threshold: 0.4 }
    );
    document.querySelectorAll(".bar").forEach((b) => barObs.observe(b));

    /* ---------- 5) Reveal sections once ---------- */
    document.querySelectorAll(".section, .features").forEach((el) => el.classList.add("reveal"));
    const revObs = new IntersectionObserver(
        (entries) => entries.forEach((e) => {
            if (e.isIntersecting) {
                e.target.classList.add("in");
                revObs.unobserve(e.target);
            }
        }), { threshold: 0, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".reveal").forEach((el) => revObs.observe(el));

});

/* ========== Auth glue: signed-out visitors are sent to login.html (a real page) ========== */
(() => {
    const KEY_USER = "ahlia_user";
    const PAGES = { cs: "cs.html", ai: "ai.html", is: "is.html", year1: "year1.html", year2: "year2.html" };
    /* every page except index.html, login.html and team.html needs a signed-in user */
    const PROTECTED = /^(welcome|courses|course|teams|staff|year1|year2|cs|ai|is|mylearning|schedule|locations|opportunities|paths|movies|certificate|ai-tools|feedback)\.html(\?[\w%.\-=&]*)?$/;

    const getUser = () => { try { return JSON.parse(localStorage.getItem(KEY_USER)); } catch (e) { return null; } };
    const loginUrl = (next) => "login.html" + (next ? "?next=" + encodeURIComponent(next) : "");

    /* small message at the bottom of the screen */
    function toast(msg) {
        let t = document.getElementById("toast");
        if (!t) {
            t = document.createElement("div");
            t.id = "toast";
            t.className = "toast";
            t.setAttribute("role", "status");
            document.body.append(t);
        }
        t.textContent = msg;
        t.classList.add("show");
        clearTimeout(toast.t);
        toast.t = setTimeout(() => t.classList.remove("show"), 3200);
    }
    /* may the signed-in student open this page? (own year / major only) */
    function blocked(page) {
        const S = window.AhliaStore,
            user = getUser();
        const group = (page || "").replace(/\.html.*$/, "");
        if (!S || !user || !S.LABEL[group] || S.canAccess(group, user)) return null;
        return `هذه الصفحة خاصة بـ ${S.who(group)}، وأنت مسجل في: ${S.LABEL[user.major] || "حسابك"}.`;
    }

    const authBtn = document.getElementById("authBtn");
    const authLabel = document.getElementById("authLabel");

    function refreshHeader() {
        if (!authLabel) return;
        const u = getUser();
        authLabel.textContent = u ? "خروج" : "تسجيل الدخول";
        authBtn.title = u ? u.name : "";
    }
    refreshHeader();

    /* buttons / cards that need an account: header button, year cards, course buttons ... */
    document.querySelectorAll("[data-open-auth]").forEach((el) =>
        el.addEventListener("click", (e) => {
            e.preventDefault();
            const user = getUser();
            if (el === authBtn && user) { // header button while signed in = log out
                (window.AhliaStore ? AhliaStore.logout(false) : Promise.resolve(localStorage.removeItem(KEY_USER))).then(refreshHeader);
                return;
            }
            const target = el.dataset.target || null;
            if (user) {
                const msg = blocked(target);
                if (msg) { toast(msg); return; }
                if (target) location.href = target;
                return;
            }
            location.href = loginUrl(target);
        })
    );

    /* major cards */
    document.querySelectorAll(".major").forEach((m) =>
        m.addEventListener("click", (e) => {
            e.preventDefault();
            const page = PAGES[m.dataset.major];
            if (!getUser()) { location.href = loginUrl(page); return; }
            const msg = blocked(page);
            msg ? toast(msg) : (location.href = page);
        })
    );

    /* ordinary links to protected pages (nav, ...) */
    document.querySelectorAll("a[href]").forEach((a) => {
        const href = a.getAttribute("href");
        const protectedPage = PROTECTED.test(href) || href.split("?")[0] === "projects.html";
        if (a.hasAttribute("data-open-auth") || a.classList.contains("major") || !protectedPage) return;
        a.addEventListener("click", (e) => {
            if (getUser()) {
                const msg = blocked(href);
                if (msg) {
                    e.preventDefault();
                    toast(msg);
                }
                return;
            }
            e.preventDefault();
            location.href = loginUrl(href);
        });
    });

    window.AhliaToast = toast;

    /* "المزيد" dropdown */
    document.querySelectorAll(".nav-more").forEach((box) => {
        const btn = box.querySelector(".nav-more__btn");
        const set = (open) => {
            box.classList.toggle("open", open);
            btn.setAttribute("aria-expanded", String(open));
        };
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            set(!box.classList.contains("open"));
        });
        document.addEventListener("click", (e) => { if (!box.contains(e.target)) set(false); });
        document.addEventListener("keydown", (e) => { if (e.key === "Escape") set(false); });
    });
})();

/* ========== Site-wide search palette ========== */
(() => {
    const pages = [
        ["الرئيسية", "index.html"],
        ["السنة الأولى", "year1.html"],
        ["السنة الثانية", "year2.html"],
        ["علوم الحاسب", "cs.html"],
        ["الذكاء الاصطناعي", "ai.html"],
        ["نظم المعلومات", "is.html"],
        ["الكورسات", "courses.html"],
        ["أدوات الذكاء الاصطناعي", "ai-tools.html"],
        ["المسارات المهنية", "paths.html"],
        ["المواد والمحاضرات", "course.html"],
        ["هيئة التدريس", "staff.html"],
        ["جدولي", "schedule.html"],
        ["تطبيقات الدراسة للجوال", "apps.html"],
        ["مواقع المحاضرات والسكاشن", "locations.html"],
        ["فرص العمل والتدريب", "opportunities.html"],
        ["التطوع والأنشطة الطلابية", "volunteering.html"],
        ["معرض مشاريع الطلاب", "projects.html"],
        ["الأفلام التعليمية", "movies.html"],
        ["أخبار التقنية", "news.html"],
        ["دليل اللابتوب", "laptops.html"],
        ["زملاء المشروع", "teams.html"],
        ["الشهادات", "certificate.html"],
        ["فريق العمل", "team.html"],
    ];
    const overlay = document.createElement("div");
    overlay.className = "search-palette";
    overlay.hidden = true;
    overlay.innerHTML = '<section class="search-palette__panel" role="dialog" aria-modal="true" aria-label="بحث في المنصة"><label class="search-palette__field"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"></circle><path d="m20 20-4-4"></path></svg><input type="search" placeholder="ابحث عن مادة، كورس، أو صفحة..." autocomplete="off" aria-label="ابحث في المنصة"><kbd>ESC</kbd></label><div class="search-palette__results" role="listbox" aria-label="نتائج البحث"></div><p class="search-palette__hint">تنقّل بالأسهم <kbd>↑</kbd> <kbd>↓</kbd> ثم Enter</p></section>';
    document.body.append(overlay);

    const input = overlay.querySelector("input");
    const results = overlay.querySelector(".search-palette__results");
    let indexPromise;
    let active = -1;
    let matches = [];
    let trigger = null;

    function makeEntry(title, href, section) {
        return { title, href, section };
    }

    async function buildIndex() {
        if (indexPromise) return indexPromise;
        indexPromise = Promise.all(pages.map(async([label, path]) => {
            const pageUrl = new URL(path, location.href);
            const entries = [makeEntry(label, pageUrl.href, "صفحة")];
            try {
                const response = await fetch(pageUrl.href, { credentials: "same-origin" });
                if (!response.ok) return entries;
                const html = await response.text();
                const doc = new DOMParser().parseFromString(html, "text/html");
                doc.querySelectorAll("h1, h2, h3, a[href]").forEach((element) => {
                    const title = (element.textContent || "").replace(/\s+/g, " ").trim();
                    if (title.length < 2 || title.length > 120) return;
                    let target = pageUrl;
                    if (element.matches("a[href]")) {
                        try { target = new URL(element.getAttribute("href"), pageUrl); } catch { return; }
                        if (target.origin !== location.origin || /^(mailto:|tel:|javascript:)/i.test(target.protocol)) return;
                    } else if (element.id) {
                        target = new URL(pageUrl.href);
                        target.hash = element.id;
                    }
                    entries.push(makeEntry(title, target.href, element.matches("a[href]") ? label : "عنوان في " + label));
                });
            } catch {}
            return entries;
        })).then((groups) => {
            const seen = new Set();
            return groups.flat().filter((entry) => {
                const key = entry.href + "|" + entry.title.toLocaleLowerCase();
                if (seen.has(key)) return false;
                seen.add(key);
                return true;
            });
        });
        return indexPromise;
    }

    function render(query) {
        const request = ++render.request;
        results.replaceChildren();
        active = -1;
        if (!query.trim()) {
            results.textContent = "اكتب كلمة للبحث داخل صفحات المنصة";
            results.classList.add("is-empty");
            return;
        }
        results.textContent = "جاري البحث...";
        results.classList.add("is-empty");
        buildIndex().then((entries) => {
            if (request !== render.request) return;
            const term = query.trim().toLocaleLowerCase();
            matches = entries.filter((entry) => entry.title.toLocaleLowerCase().includes(term)).slice(0, 12);
            results.replaceChildren();
            results.classList.toggle("is-empty", matches.length === 0);
            if (!matches.length) {
                results.textContent = "مفيش نتائج. جرّب كلمة تانية.";
                return;
            }
            matches.forEach((entry, i) => {
                const link = document.createElement("a");
                link.className = "search-palette__result";
                link.href = entry.href;
                link.setAttribute("role", "option");
                link.setAttribute("aria-selected", "false");
                const title = document.createElement("span");
                title.textContent = entry.title;
                const section = document.createElement("small");
                section.textContent = entry.section;
                link.append(title, section);
                link.addEventListener("mousemove", () => setActive(i));
                results.append(link);
            });
        });
    }
    render.request = 0;

    function setActive(next) {
        const options = results.querySelectorAll(".search-palette__result");
        if (!options.length) return;
        active = (next + options.length) % options.length;
        options.forEach((option, i) => {
            option.setAttribute("aria-selected", String(i === active));
            if (i === active) option.scrollIntoView({ block: "nearest" });
        });
    }

    function close() {
        overlay.hidden = true;
        document.body.classList.remove("search-open");
        if (trigger) trigger.focus();
    }

    function open() {
        overlay.hidden = false;
        document.body.classList.add("search-open");
        input.value = "";
        render("");
        input.focus();
    }

    const actions = document.querySelector(".header__actions");
    if (actions) {
        trigger = document.createElement("button");
        trigger.type = "button";
        trigger.className = "search-trigger";
        trigger.setAttribute("aria-label", "بحث في المنصة (Ctrl+K)");
        trigger.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"></circle><path d="m20 20-4-4"></path></svg><span>بحث</span><kbd>Ctrl K</kbd>';
        trigger.addEventListener("click", open);
        actions.prepend(trigger);
    }

    input.addEventListener("input", () => render(input.value));
    input.addEventListener("keydown", (event) => {
        if (event.key === "ArrowDown") {
            event.preventDefault();
            setActive(active + 1);
        }
        if (event.key === "ArrowUp") {
            event.preventDefault();
            setActive(active - 1);
        }
        if (event.key === "Enter" && matches[active]) location.href = matches[active].href;
        if (event.key === "Escape") close();
    });
    overlay.addEventListener("click", (event) => { if (event.target === overlay) close(); });
    document.addEventListener("keydown", (event) => {
        if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
            event.preventDefault();
            overlay.hidden ? open() : close();
        } else if (event.key === "Escape" && !overlay.hidden) close();
    });
})();

/* ========== Course bookmarks and resume state ========== */
(() => {
    const catalog = window.COURSES;
    if (!catalog || !/\/course\.html$/.test(location.pathname)) return;

    let user = null;
    try { user = JSON.parse(localStorage.getItem("ahlia_user")); } catch (e) {}
    if (!user || !user.id) return;

    const query = (new URLSearchParams(location.search).get("id") || "").trim();
    const courseId = catalog[query] ? query : Object.keys(catalog).find((id) => {
        const title = String(catalog[id].title || "").toLocaleLowerCase();
        const needle = query.toLocaleLowerCase();
        return title === needle || (needle.length > 2 && (title.includes(needle) || needle.includes(title)));
    });
    if (!courseId) return;

    const userId = String(user.id);
    const course = catalog[courseId];
    const bookmarkKey = "ahlia_saved_courses:" + encodeURIComponent(userId);
    const recentKey = "ahlia_recent_course:" + encodeURIComponent(userId);
    const progressKey = `progress:${courseId}:${userId}`;
    const readSaved = () => {
        try {
            const value = JSON.parse(localStorage.getItem(bookmarkKey) || "[]");
            return Array.isArray(value) ? value.filter((item) => item && /^[\w.-]{1,80}$/.test(item.id)) : [];
        } catch (e) { return []; }
    };

    function rememberCourse() {
        let progress = {};
        try { progress = JSON.parse(localStorage.getItem(progressKey) || "{}"); } catch (e) {}
        const done = progress.done && typeof progress.done === "object" ? progress.done : {};
        const total = (course.sections || []).reduce((count, section) => count + (section.l || []).length, 0);
        const completed = Object.keys(done).filter((key) => done[key]).length;
        const percent = total ? Math.round(completed / total * 100) : 0;
        try {
            localStorage.setItem(recentKey, JSON.stringify({
                id: courseId,
                title: course.title,
                percent,
                userId,
                updatedAt: Date.now(),
            }));
        } catch (e) {}
    }

    rememberCourse();
    window.addEventListener("pagehide", rememberCourse);

    const info = document.getElementById("info");
    const continueButton = info && info.querySelector("#cont");
    if (!continueButton) return;

    const saveButton = document.createElement("button");
    saveButton.type = "button";
    saveButton.className = "course-save";
    saveButton.setAttribute("aria-pressed", "false");
    continueButton.insertAdjacentElement("afterend", saveButton);

    function updateSaveButton() {
        const saved = readSaved().some((item) => item.id === courseId);
        saveButton.setAttribute("aria-pressed", String(saved));
        saveButton.setAttribute("aria-label", saved ? "إزالة الكورس من قائمتي" : "حفظ الكورس لقائمتي");
        saveButton.innerHTML = saved ?
            '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20s-8-4.5-8-10a4.5 4.5 0 018-2.8A4.5 4.5 0 0120 10c0 5.5-8 10-8 10z" fill="currentColor"></path></svg><span>محفوظ في قائمتي</span>' :
            '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20s-8-4.5-8-10a4.5 4.5 0 018-2.8A4.5 4.5 0 0120 10c0 5.5-8 10-8 10z"></path></svg><span>احفظه لوقت لاحق</span>';
    }

    saveButton.addEventListener("click", () => {
        const saved = readSaved();
        const exists = saved.some((item) => item.id === courseId);
        const updated = exists ?
            saved.filter((item) => item.id !== courseId) : [...saved, { id: courseId, title: course.title, savedAt: Date.now() }].slice(-30);
        try { localStorage.setItem(bookmarkKey, JSON.stringify(updated)); } catch (e) {}
        updateSaveButton();
    });
    updateSaveButton();
})();

/* ========== Installable app (PWA): service worker + install button ========== */
(() => {
    if ("serviceWorker" in navigator && /^https?:$/.test(location.protocol)) {
        window.addEventListener("load", () => navigator.serviceWorker.register("sw.js").catch(() => {}));
    }
    let deferred = null;
    const buttons = () => document.querySelectorAll("[data-install]");
    window.addEventListener("beforeinstallprompt", (e) => {
        e.preventDefault();
        deferred = e;
        buttons().forEach((b) => (b.hidden = false));
    });
    window.addEventListener("appinstalled", () => {
        deferred = null;
        buttons().forEach((b) => (b.hidden = true));
    });
    document.addEventListener("click", async(e) => {
        const b = e.target.closest("[data-install]");
        if (!b || !deferred) return;
        deferred.prompt();
        await deferred.userChoice;
        deferred = null;
        b.hidden = true;
    });
})();

/* Add the shared social links to every page footer. */
(() => {
    const footers = document.querySelectorAll(".footer__inner");
    if (!footers.length) return;

    const links = document.createElement("div");
    links.className = "socials";
    links.setAttribute("role", "group");
    links.setAttribute("aria-label", "تابع أهلية أكاديمي على التواصل الاجتماعي");
    links.innerHTML = '<a href="https://www.facebook.com/profile.php?id=61594780539498" aria-label="Facebook" title="Facebook" target="_blank" rel="noopener noreferrer"><svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M13.5 22v-8.2h2.8l.5-3.3h-3.3V8.4c0-.9.4-1.7 1.8-1.7h1.6V3.8c-.3 0-1.3-.2-2.5-.2-2.6 0-4.2 1.5-4.2 4.3v2.6H7.4v3.3h2.8V22z"></path></svg></a><a href="https://www.instagram.com/ahliyahacademy?stkn=MTkyZnB0NmY5MTJtNg==" aria-label="Instagram" title="Instagram" target="_blank" rel="noopener noreferrer"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"></rect><circle cx="12" cy="12" r="4"></circle><circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none"></circle></svg></a><a href="https://www.linkedin.com/company/ahliyah-academy/" aria-label="LinkedIn" title="LinkedIn" target="_blank" rel="noopener noreferrer"><svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M3 3h18v18H3zm5 7H5.5v8.5H8zm-1.2-3.8a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm11.7 12.3v-4.8c0-2.3-1.2-3.8-3.2-3.8-1.1 0-1.8.6-2.2 1.2V10h-2.5v8.5h2.5v-4.6c0-1.2.6-1.9 1.5-1.9s1.4.7 1.4 1.9v4.6z"></path></svg></a>';

    footers.forEach((footer) => {
        if (!footer.querySelector(".socials")) footer.append(links.cloneNode(true));
    });
})();