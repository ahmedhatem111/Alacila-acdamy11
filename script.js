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
        { key: "apps", label: "تطبيقات الدراسة", href: "apps.html", menuGroup: "خدمات الطالب" },
        { key: "locations", label: "مواقع المحاضرات", href: "locations.html", menuGroup: "خدمات الطالب" },
        { key: "library", label: "المكتبة", href: "library.html", menuGroup: "خدمات الطالب" },
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
    const pageFor = { year1: "year1.html", year2: "year2.html", cs: "cs.html", ai: "ai.html", is: "is.html", courses: "courses.html", paths: "paths.html", staff: "staff.html", "ai-tools": "ai-tools.html", movies: "movies.html", videos: "videos.html", memes: "memes.html", news: "news.html", laptops: "laptops.html", library: "library.html", schedule: "schedule.html", apps: "apps.html", locations: "locations.html", opportunities: "opportunities.html", volunteering: "volunteering.html", projects: "projects.html", teams: "teams.html", team: "team.html" };
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
        burger.addEventListener("click", () => {
            const open = nav.classList.toggle("open");
            burger.setAttribute("aria-expanded", open);
        });
        nav.querySelectorAll("a").forEach((a) =>
            a.addEventListener("click", () => {
                nav.classList.remove("open");
                burger.setAttribute("aria-expanded", "false");
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
    const PROTECTED = /^(welcome|courses|course|teams|staff|year1|year2|cs|ai|is|mylearning|schedule|locations|opportunities|paths|movies|certificate|ai-tools)\.html(\?[\w%.\-=&]*)?$/;

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