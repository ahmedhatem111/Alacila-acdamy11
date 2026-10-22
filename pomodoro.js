(() => {
    "use strict";

    const $ = (id) => document.getElementById(id);
    const api = (method, url, body) => window.AhliaStore.api(method, url, body);
    const studyTimer = window.AhliaStudyTimer;
    const ambientAudio = window.AhliaAmbientAudio;
    const SOUND_OPTIONS = ambientAudio.getOptions();
    const user = window.AhliaStore.getUser();
    const owner = user && user.mode === "local-guest" ? String(user.email || user.id).trim().toLowerCase() : String(user.id);
    const DAY_MS = 24 * 60 * 60 * 1000;
    const readPending = () => {
        try {
            const value = JSON.parse(localStorage.getItem("ahlia_study_pending:" + encodeURIComponent(owner)));
            if (!value || typeof value !== "object") return {};
            return Object.keys(value).reduce((result, date) => {
                const item = value[date];
                result[date] = typeof item === "number" ? { seconds: item, inflight: null } : {
                    seconds: Math.max(0, Number(item.seconds) || 0),
                    inflight: item.inflight && typeof item.inflight.id === "string" ? item.inflight : null,
                };
                return result;
            }, {});
        } catch (e) {
            return {};
        }
    };
    const timerState = studyTimer.init(25 * 60, 5 * 60);
    if (!timerState) return;
    let phase = timerState.phase;
    let running = timerState.running;
    let remaining = timerState.remaining;
    let phaseLength = timerState.phaseLength;
    let totals = {};
    let pending = readPending();
    const soundSlots = [];
    const quranReciters = new Map();
    let quranSurahs = [];
    let lastNoticeId = timerState.notice && timerState.notice.id;

    function say(message, error) {
        $("studyMessage").textContent = message;
        $("studyMessage").classList.toggle("is-error", !!error);
    }

    function minutes(input, min, max, fallback) {
        const value = Number.parseInt(input.value, 10);
        const bounded = Number.isFinite(value) ? Math.max(min, Math.min(max, value)) : fallback;
        input.value = String(bounded);
        return bounded * 60;
    }

    $("focusMinutes").value = String(timerState.focusDuration / 60);
    $("breakMinutes").value = String(timerState.breakDuration / 60);

    function applyTimerState(next) {
        if (!next) return;
        phase = next.phase;
        running = next.running;
        remaining = next.running ? Math.max(0, next.remaining - (Date.now() - next.updatedAt) / 1000) : next.remaining;
        phaseLength = next.phaseLength;
        renderClock();
        $("dialogTimerPhase").textContent = phase === "focus" ? "وقت التركيز" : "وقت الاستراحة";
        $("dialogTimerClock").textContent = String(Math.floor(remaining / 60)).padStart(2, "0") + ":" + String(Math.floor(remaining % 60)).padStart(2, "0");
        if (next.error) say(next.error, true);
        if (Math.ceil(remaining) % 30 === 0 || next.saved) {
            pending = readPending();
            renderHistory();
        }
    }

    function renderClock() {
        const total = Math.max(0, Math.ceil(remaining));
        const mins = Math.floor(total / 60);
        const secs = total % 60;
        $("timerClock").textContent = String(mins).padStart(2, "0") + ":" + String(secs).padStart(2, "0");
        $("timerPhase").textContent = phase === "focus" ? "وقت التركيز" : "وقت الاستراحة";
        $("cycleLabel").textContent = phase === "focus" ? "جلسة تركيز • بعدها استراحة قصيرة" : "استراحة قصيرة • بعدها نكمل التركيز";
        $("timerToggle").textContent = running ? "إيقاف مؤقت" : "ابدأ " + (phase === "focus" ? "المذاكرة" : "الاستراحة");
        $("timerProgress").style.width = phaseLength ? Math.max(0, Math.min(100, (1 - remaining / phaseLength) * 100)) + "%" : "0%";
    }

    function clockDate(dateOffset) {
        return new Date(Date.now() + dateOffset * DAY_MS);
    }

    function readableDuration(seconds) {
        const wholeMinutes = Math.floor(seconds / 60);
        if (wholeMinutes < 60) return wholeMinutes ? wholeMinutes + " د" : "0 د";
        const hours = Math.floor(wholeMinutes / 60);
        const mins = wholeMinutes % 60;
        return hours + " س" + (mins ? " و " + mins + " د" : "");
    }

    function renderHistory() {
        pending = readPending();
        const rows = [];
        let max = 0;
        for (let offset = 6; offset >= 0; offset--) {
            const date = clockDate(-offset);
            const key = date.getFullYear() + "-" + String(date.getMonth() + 1).padStart(2, "0") + "-" + String(date.getDate()).padStart(2, "0");
            const queued = pending[key] || { seconds: 0, inflight: null };
            const amount = Math.min(86400, Number(totals[key] || 0) + queued.seconds + Number(queued.inflight && queued.inflight.seconds || 0));
            rows.push({ date, key, amount, label: offset === 0 ? "اليوم" : new Intl.DateTimeFormat("ar", { weekday: "long" }).format(date) });
            max = Math.max(max, amount);
        }
        $("todayHours").textContent = readableDuration(rows[rows.length - 1].amount);
        const history = $("studyHistory");
        history.replaceChildren();
        rows.forEach((row) => {
            const item = document.createElement("div");
            item.className = "study-day";
            const label = document.createElement("span");
            label.className = "study-day__label";
            label.textContent = row.label;
            const track = document.createElement("span");
            track.className = "study-day__track";
            const bar = document.createElement("i");
            bar.style.width = max ? Math.max(row.amount ? 3 : 0, row.amount / max * 100) + "%" : "0%";
            track.append(bar);
            const value = document.createElement("strong");
            value.className = "study-day__value";
            value.textContent = readableDuration(row.amount);
            item.append(label, track, value);
            history.append(item);
        });
    }

    async function loadHistory() {
        try {
            const records = await api("GET", "/api/study-sessions");
            totals = {};
            records.forEach((item) => {
                if (typeof item.date === "string" && Number.isFinite(Number(item.seconds))) {
                    totals[item.date] = Math.min(86400, (totals[item.date] || 0) + Number(item.seconds));
                }
            });
            renderHistory();
        } catch (error) {
            renderHistory();
            say(error.message || "تعذّر تحميل إحصائيات المذاكرة.", true);
        }
    }

    function playChime() {
        if (ambientAudio.list().some((slot) => slot.playing)) {
            ambientAudio.chime(phase === "focus" ? 660 : 880);
        }
    }

    function resetTimer() {
        studyTimer.reset(minutes($("focusMinutes"), 1, 180, 25), minutes($("breakMinutes"), 1, 60, 5));
        say("تمت إعادة ضبط المؤقّت.", false);
    }

    function renderSoundState() {
        const states = ambientAudio.list();
        soundSlots.forEach((slot) => {
            const state = states.find((item) => item.type === slot.type);
            const active = !!(state && state.playing);
            if (state && state.kind === "quran") {
                const title = slot.element.querySelector("h4");
                const reciter = slot.element.querySelector(".study-sound-slot__reciter");
                if (title) title.textContent = state.label;
                if (reciter) reciter.textContent = state.reciter + " · " + state.recitation;
                slot.volumeInput.value = String(state.volume);
                slot.volumeValue.textContent = state.volume + "%";
            }
            slot.toggle.textContent = state && state.kind === "quran" ?
                (active ? "إيقاف التلاوة" : "تشغيل التلاوة") :
                (active ? "إيقاف الصوت" : "تشغيل الصوت");
            slot.toggle.setAttribute("aria-pressed", String(active));
        });
        const activeCount = states.filter((item) => item.playing).length;
        $("activeSoundCount").textContent = activeCount + (activeCount === 1 ? " صوت يعمل" : " أصوات تعمل");
        updateQuranControls();
    }

    function refreshSoundPicker() {
        const select = $("studySoundType");
        const available = SOUND_OPTIONS.filter((option) => !soundSlots.some((slot) => slot.type === option.value));
        select.replaceChildren();
        if (!available.length) {
            const option = document.createElement("option");
            option.value = "";
            option.textContent = "تمت إضافة كل الأصوات";
            select.append(option);
            $("addStudySound").disabled = true;
            return;
        }
        available.forEach((sound) => {
            const option = document.createElement("option");
            option.value = sound.value;
            option.textContent = sound.label;
            select.append(option);
        });
        $("addStudySound").disabled = false;
    }

    function addSound(type, initialVolume) {
        const sound = SOUND_OPTIONS.find((option) => option.value === type);
        if (!sound || soundSlots.some((slot) => slot.type === type)) return null;

        const element = document.createElement("article");
        element.className = "study-sound-slot";
        const heading = document.createElement("div");
        heading.className = "study-sound-slot__head";
        const title = document.createElement("h4");
        title.textContent = sound.label;
        const remove = document.createElement("button");
        remove.type = "button";
        remove.className = "study-sound-slot__remove";
        remove.setAttribute("aria-label", "إزالة " + sound.label);
        remove.title = "إزالة الصوت";
        remove.textContent = "×";
        heading.append(title, remove);

        const volumeLabel = document.createElement("label");
        volumeLabel.className = "study-volume";
        const volumeText = document.createElement("span");
        volumeText.append(document.createTextNode("مستوى الصوت "));
        const volumeValue = document.createElement("b");
        const volume = Number.isFinite(Number(initialVolume)) ? Number(initialVolume) : 25;
        volumeValue.textContent = volume + "%";
        volumeText.append(volumeValue);
        const volumeInput = document.createElement("input");
        volumeInput.type = "range";
        volumeInput.min = "0";
        volumeInput.max = "100";
        volumeInput.value = String(volume);
        volumeInput.setAttribute("aria-label", "مستوى صوت " + sound.label);
        volumeLabel.append(volumeText, volumeInput);

        const toggle = document.createElement("button");
        toggle.type = "button";
        toggle.className = "btn btn--outline";
        toggle.setAttribute("aria-pressed", "false");
        toggle.textContent = "تشغيل الصوت";
        element.append(heading, volumeLabel, toggle);

        const slot = {
            type,
            label: sound.label,
            element,
            toggle,
            volumeInput,
            volumeValue,
        };
        soundSlots.push(slot);
        $("studySoundSlots").append(element);
        toggle.addEventListener("click", () => ambientAudio.toggle(slot.type));
        volumeInput.addEventListener("input", () => {
            const volume = Number(volumeInput.value);
            volumeValue.textContent = volume + "%";
            ambientAudio.setVolume(slot.type, volume);
        });
        remove.addEventListener("click", () => {
            ambientAudio.remove(slot.type);
            soundSlots.splice(soundSlots.indexOf(slot), 1);
            element.remove();
            refreshSoundPicker();
            renderSoundState();
        });
        refreshSoundPicker();
        return slot;
    }

    function addQuranSound(item) {
        const existing = soundSlots.find((slot) => slot.kind === "quran");
        if (existing) {
            existing.type = item.type;
            existing.element.querySelector("h4").textContent = item.label;
            existing.element.querySelector(".study-sound-slot__reciter").textContent = item.reciter + " · " + item.recitation;
            existing.element.querySelector(".study-sound-slot__remove").setAttribute("aria-label", "إزالة " + item.label + " بصوت " + item.reciter);
            existing.volumeInput.value = String(item.volume);
            existing.volumeValue.textContent = item.volume + "%";
            return existing;
        }
        const element = document.createElement("article");
        element.className = "study-sound-slot study-sound-slot--quran";
        const heading = document.createElement("div");
        heading.className = "study-sound-slot__head";
        const titleGroup = document.createElement("div");
        titleGroup.className = "study-sound-slot__title";
        const title = document.createElement("h4");
        title.textContent = item.label;
        const reciter = document.createElement("p");
        reciter.className = "study-sound-slot__reciter";
        reciter.textContent = item.reciter + " · " + item.recitation;
        titleGroup.append(title, reciter);
        const remove = document.createElement("button");
        remove.type = "button";
        remove.className = "study-sound-slot__remove";
        remove.setAttribute("aria-label", "إزالة " + item.label + " بصوت " + item.reciter);
        remove.title = "إزالة التلاوة";
        remove.textContent = "×";
        heading.append(titleGroup, remove);

        const volumeLabel = document.createElement("label");
        volumeLabel.className = "study-volume";
        const volumeText = document.createElement("span");
        volumeText.append(document.createTextNode("مستوى الصوت "));
        const volumeValue = document.createElement("b");
        volumeValue.textContent = item.volume + "%";
        volumeText.append(volumeValue);
        const volumeInput = document.createElement("input");
        volumeInput.type = "range";
        volumeInput.min = "0";
        volumeInput.max = "100";
        volumeInput.value = String(item.volume);
        volumeInput.setAttribute("aria-label", "مستوى صوت " + item.label);
        volumeLabel.append(volumeText, volumeInput);

        const toggle = document.createElement("button");
        toggle.type = "button";
        toggle.className = "btn btn--outline";
        toggle.setAttribute("aria-pressed", String(item.playing));
        toggle.textContent = item.playing ? "إيقاف التلاوة" : "تشغيل التلاوة";
        element.append(heading, volumeLabel, toggle);

        const slot = { type: item.type, kind: "quran", element, toggle, volumeInput, volumeValue };
        soundSlots.push(slot);
        $("studySoundSlots").append(element);
        toggle.addEventListener("click", () => ambientAudio.toggle(slot.type));
        volumeInput.addEventListener("input", () => {
            const volume = Number(volumeInput.value);
            volumeValue.textContent = volume + "%";
            ambientAudio.setVolume(slot.type, volume);
        });
        remove.addEventListener("click", () => {
            ambientAudio.remove(slot.type);
            soundSlots.splice(soundSlots.indexOf(slot), 1);
            element.remove();
            renderSoundState();
        });
    }

    async function loadQuranChoices() {
        const reciterSelect = $("quranReciterSelect");
        const surahSelect = $("quranSurahSelect");
        const status = $("quranLoadStatus");
        try {
            const catalog = await ambientAudio.getQuranCatalog();
            if (!catalog.reciters.length || catalog.surahs.length !== 114) throw new Error("لا تتوفر قائمة تلاوات كاملة حاليًا.");
            quranSurahs = catalog.surahs;
            reciterSelect.replaceChildren();
            catalog.reciters.forEach((reciter) => {
                quranReciters.set(reciter.key, reciter);
                const option = document.createElement("option");
                option.value = reciter.key;
                option.textContent = reciter.name + " · " + reciter.recitation;
                reciterSelect.append(option);
            });
            surahSelect.replaceChildren();
            quranSurahs.forEach((surah) => {
                const option = document.createElement("option");
                option.value = String(surah.id);
                option.textContent = String(surah.id).padStart(3, "0") + " · " + surah.name;
                surahSelect.append(option);
            });
            reciterSelect.disabled = false;
            surahSelect.disabled = false;
            $("addQuranRecitation").disabled = false;
            const current = ambientAudio.getQuran();
            if (current && quranReciters.has(current.reciterKey)) {
                reciterSelect.value = current.reciterKey;
                surahSelect.value = String(current.surahId);
            }
            status.textContent = catalog.reciters.length + " رواية كاملة و114 سورة متاحة";
            updateQuranControls();
        } catch (error) {
            status.textContent = error.message || "تعذّر تحميل القرّاء. تحقق من اتصال الإنترنت.";
        }
    }

    function updateQuranControls() {
        if (!quranSurahs.length) return;
        const current = ambientAudio.getQuran();
        const reciterSelect = $("quranReciterSelect");
        const surahSelect = $("quranSurahSelect");
        const addButton = $("addQuranRecitation");
        reciterSelect.disabled = false;
        surahSelect.disabled = false;
        addButton.disabled = false;
        if (current && reciterSelect.value !== current.reciterKey) {
            addButton.textContent = "استبدال القارئ";
            $("quranLoadStatus").textContent = "سيتم إيقاف " + current.reciter + " وتشغيل القارئ المختار بدلًا منه.";
        } else if (current) {
            addButton.textContent = "تشغيل السورة المختارة";
            $("quranLoadStatus").textContent = "قارئ واحد فقط: " + current.reciter + ". اختر سورة أخرى أو قارئًا بديلًا.";
        } else {
            addButton.textContent = "إضافة التلاوة";
            $("quranLoadStatus").textContent = quranReciters.size + " رواية كاملة و114 سورة متاحة";
        }
    }

    $("openStudySettings").addEventListener("click", () => $("studySettingsDialog").showModal());
    ["closeStudySettings", "doneStudySettings"].forEach((id) => $(id).addEventListener("click", () => $("studySettingsDialog").close()));
    $("studySettingsDialog").addEventListener("click", (event) => {
        if (event.target === $("studySettingsDialog")) $("studySettingsDialog").close();
    });
    $("timerToggle").addEventListener("click", () => {
        const wasRunning = running;
        if (wasRunning) studyTimer.pause();
        else studyTimer.start();
        say(wasRunning ? "تم إيقاف المؤقّت مؤقتًا." : "بالتوفيق في جلستك!", false);
    });
    $("timerReset").addEventListener("click", resetTimer);
    [$("focusMinutes"), $("breakMinutes")].forEach((input) => input.addEventListener("change", () => {
        studyTimer.configure(minutes($("focusMinutes"), 1, 180, 25), minutes($("breakMinutes"), 1, 60, 5));
    }));
    $("addStudySound").addEventListener("click", () => {
        const type = $("studySoundType").value;
        if (ambientAudio.add(type, 25)) {
            addSound(type, 25);
            renderSoundState();
            say("تم تشغيل الصوت، ويمكنك إضافة أصوات أخرى للمزج.", false);
        }
    });
    $("addQuranRecitation").addEventListener("click", () => {
        const reciter = quranReciters.get($("quranReciterSelect").value);
        const surah = quranSurahs.find((item) => item.id === Number($("quranSurahSelect").value));
        const current = ambientAudio.getQuran();
        const replacing = !!(current && reciter && current.reciterKey !== reciter.key);
        const item = ambientAudio.addQuran(reciter, surah, 25);
        if (!item) {
            $("quranLoadStatus").textContent = "تعذّر تشغيل التلاوة المختارة. تحقق من اتصال الإنترنت.";
            return;
        }
        addQuranSound(item);
        renderSoundState();
        $("quranLoadStatus").textContent = replacing ?
            "تم استبدال القارئ وتشغيل " + item.label + " بصوت " + item.reciter + "." :
            "تُشغّل " + item.label + " بصوت " + item.reciter + ". ستنتقل للسورة التالية تلقائيًا.";
    });
    $("quranReciterSelect").addEventListener("change", updateQuranControls);
    ambientAudio.list().forEach((slot) => {
        if (slot.kind === "quran") addQuranSound(slot);
        else addSound(slot.type, slot.volume);
    });
    refreshSoundPicker();
    renderSoundState();
    loadQuranChoices();
    window.addEventListener("ahlia-ambient-audio", renderSoundState);
    window.addEventListener("ahlia-ambient-audio-error", (event) => {
        if (event.detail && event.detail.type.startsWith("quran:")) {
            $("quranLoadStatus").textContent = event.detail.message;
        }
    });
    window.addEventListener("pagehide", () => {
        studyTimer.sync();
    });
    window.addEventListener("ahlia-study-timer", (event) => {
        const next = event.detail;
        applyTimerState(next);
        if (next.notice && next.notice.id !== lastNoticeId) {
            lastNoticeId = next.notice.id;
            say(next.notice.message, false);
            playChime();
        }
    });

    applyTimerState(studyTimer.getState());
    renderClock();
    renderHistory();
    loadHistory();
})();