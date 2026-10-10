(() => {
    "use strict";

    const SOURCES = [
        { id: "ait", name: "البوابة التقنية", kind: "ناشر تقني عربي", feed: "https://aitnews.com/feed/", home: "https://aitnews.com/", defaultCategory: "general" },
        { id: "techwd", name: "عالم التقنية", kind: "ناشر تقني عربي", feed: "https://www.tech-wd.com/wd/feed/", home: "https://www.tech-wd.com/wd/", defaultCategory: "general" },
        { id: "apple", name: "Apple Newsroom", kind: "مصدر رسمي", feed: "https://www.apple.com/newsroom/rss-feed.rss", home: "https://www.apple.com/newsroom/", defaultCategory: "general" },
        { id: "google", name: "Google Blog", kind: "مصدر رسمي", feed: "https://blog.google/rss/", home: "https://blog.google/", defaultCategory: "general" },
        { id: "googledev", name: "مدونة مطوري Google", kind: "مصدر رسمي", feed: "https://developers.googleblog.com/feeds/posts/default?alt=rss", home: "https://developers.googleblog.com/", defaultCategory: "developers" },
        { id: "openai", name: "OpenAI News", kind: "مصدر رسمي", feed: "https://openai.com/news/rss.xml", home: "https://openai.com/news/", defaultCategory: "ai" },
        { id: "github", name: "GitHub Blog", kind: "مصدر رسمي", feed: "https://github.blog/feed/", home: "https://github.blog/", defaultCategory: "developers" },
        { id: "python", name: "Python Insider", kind: "مصدر رسمي", feed: "https://blog.python.org/feeds/posts/default?alt=rss", home: "https://blog.python.org/", defaultCategory: "developers" },
        { id: "cloudflare", name: "Cloudflare Blog", kind: "مصدر رسمي", feed: "https://blog.cloudflare.com/rss/", home: "https://blog.cloudflare.com/", defaultCategory: "network" }
    ];
    const CATEGORIES = [
        { id: "all", label: "كل المجالات" },
        { id: "ai", label: "الذكاء الاصطناعي" },
        { id: "cyber", label: "الأمن السيبراني" },
        { id: "developers", label: "البرمجة والمطورون" },
        { id: "devices", label: "الأجهزة والأنظمة" },
        { id: "network", label: "الشبكات والسحابة" },
        { id: "science", label: "العلوم والفضاء" },
        { id: "fintech", label: "التقنية المالية" },
        { id: "general", label: "تقنية عامة" }
    ];
    const CATEGORY_RULES = [
        { id: "cyber", terms: ["cybersecurity", "cyber security", "security", "vulnerability", "vulnerabilities", "malware", "ransomware", "privacy", "encryption", "cryptography", "امن سيبراني", "الأمن السيبراني", "أمن", "ثغرة", "ثغرات", "اختراق", "حماية", "خصوصية", "تشفير"] },
        { id: "ai", terms: ["artificial intelligence", "machine learning", "deep learning", "large language model", "generative ai", "openai", "chatgpt", "gemini", "llm", "neural network", "الذكاء الاصطناعي", "ذكاء اصطناعي", "تعلم الآلة", "التعلم الآلي", "توليدي", "وكلاء ذكاء"] },
        { id: "developers", terms: ["developer", "developers", "programming", "software development", "open source", "github", "python", "javascript", "typescript", "rust", "linux", "sdk", "api", "برمجة", "مطور", "المطورين", "مفتوح المصدر", "شفرة", "تطبيقات برمجية"] },
        { id: "fintech", terms: ["fintech", "blockchain", "cryptocurrency", "digital currency", "payments", "banking technology", "التقنية المالية", "العملات الرقمية", "بلوك تشين", "مدفوعات رقمية"] },
        { id: "network", terms: ["cloud computing", "cloudflare", "network", "internet", "data center", "dns", "telecom", "broadband", "5g", "edge computing", "الشبكات", "شبكة", "الإنترنت", "انترنت", "سحابة", "الحوسبة السحابية", "اتصالات", "اتصال", "مراكز البيانات"] },
        { id: "devices", terms: ["smartphone", "iphone", "ipad", "macbook", "laptop", "hardware", "processor", "semiconductor", "android", "ios", "windows", "apple watch", "هاتف", "الأجهزة", "جهاز", "حاسوب", "كمبيوتر", "معالج", "رقاقة", "أندرويد", "آيفون", "ويندوز"] },
        { id: "science", terms: ["nasa", "space", "satellite", "astronomy", "quantum", "robotics", "science and technology", "biotechnology", "الفضاء", "قمر صناعي", "الفلك", "كمومي", "روبوتات", "التقنيات الطبية"] }
    ];
    const API = "https://api.rss2json.com/v1/api.json";
    const IMAGE_API = "https://api.microlink.io/";
    const CACHE_KEY = "ahlia-tech-news-v1";
    const REFRESH_MS = 15 * 60 * 1000;
    const $ = (id) => document.getElementById(id);
    let articles = [];
    let activeCategory = "all";
    let query = "";

    function classifyArticle(item, source) {
        const text = `${item.title || ""} ${item.description || ""} ${(item.categories || []).join(" ")}`.replace(/&amp;/g, "&").toLowerCase();
        for (const rule of CATEGORY_RULES) {
            if (rule.terms.some((term) => text.includes(term))) return rule.id;
        }
        return source.defaultCategory || "general";
    }

    function categoryLabel(id) {
        const category = CATEGORIES.find((entry) => entry.id === id);
        return category ? category.label : "تقنية عامة";
    }

    function getArticleImage(item) {
        if (item.thumbnail && /^https:\/\//i.test(item.thumbnail)) return item.thumbnail;
        const enclosure = item.enclosure && item.enclosure.link;
        if (enclosure && /^https:\/\//i.test(enclosure)) return enclosure;
        const content = item.content || item.description || "";
        const documentFragment = new DOMParser().parseFromString(content, "text/html");
        const image = documentFragment.querySelector("img");
        const source = image ? image.getAttribute("src") || "" : "";
        return /^https:\/\//i.test(source) ? source : "";
    }

    function normalizeArticle(item, source) {
        const description = new DOMParser().parseFromString(item.description || "", "text/html").body.textContent || "";
        let date = "";
        const parsedDate = new Date(item.pubDate);
        if (!Number.isNaN(parsedDate.getTime())) date = parsedDate.toISOString();
        return {
            title: String(item.title || "").trim(),
            description: description.replace(/\s+/g, " ").trim().slice(0, 210),
            link: /^https:\/\//i.test(item.link || "") ? item.link : source.home,
            image: getArticleImage(item),
            author: String(item.author || "").trim(),
            date,
            categories: Array.isArray(item.categories) ? item.categories.map(String) : [],
            sourceId: source.id,
            sourceName: source.name,
            sourceKind: source.kind,
            category: classifyArticle(item, source),
            categoryLabel: categoryLabel(classifyArticle(item, source))
        };
    }

    async function fetchSource(source) {
        const url = new URL(API);
        url.searchParams.set("rss_url", source.feed);
        const response = await fetch(url, { cache: "no-store", mode: "cors" });
        if (!response.ok) throw new Error(`${source.name}: HTTP ${response.status}`);
        const result = await response.json();
        if (result.status !== "ok" || !Array.isArray(result.items)) throw new Error(`${source.name}: feed unavailable`);
        return result.items.map((item) => normalizeArticle(item, source)).filter((item) => item.title && item.link);
    }

    function readCache() {
        try {
            const cached = JSON.parse(localStorage.getItem(CACHE_KEY) || "null");
            return cached && Array.isArray(cached.articles) ? cached : null;
        } catch (error) {
            return null;
        }
    }

    function formatDate(value) {
        if (!value) return "تاريخ غير متاح";
        return new Intl.DateTimeFormat("ar-EG", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));
    }

    function makeCategoryButton(category) {
        const button = document.createElement("button");
        button.className = "tech-news-chip";
        button.type = "button";
        button.dataset.category = category.id;
        button.setAttribute("aria-pressed", String(activeCategory === category.id));
        button.textContent = category.label;
        button.addEventListener("click", () => {
            activeCategory = category.id;
            document.querySelectorAll(".tech-news-chip").forEach((chip) => {
                chip.setAttribute("aria-pressed", String(chip.dataset.category === activeCategory));
            });
            render();
        });
        return button;
    }

    function makeArticleCard(article) {
        const card = document.createElement("article");
        card.className = "tech-news-card";
        const link = document.createElement("a");
        link.className = "tech-news-card__link";
        link.href = article.link;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.setAttribute("aria-label", `${article.title}، من ${article.sourceName}`);

        const imageWrap = document.createElement("div");
        imageWrap.className = "tech-news-card__image";
        if (article.image) {
            const image = document.createElement("img");
            image.src = article.image;
            image.alt = "";
            image.loading = "lazy";
            image.referrerPolicy = "no-referrer";
            image.onerror = () => {
                image.remove();
                imageWrap.classList.add("tech-news-card__image--empty");
            };
            imageWrap.append(image);
        } else {
            imageWrap.classList.add("tech-news-card__image--empty");
        }

        const body = document.createElement("div");
        body.className = "tech-news-card__body";
        const meta = document.createElement("div");
        meta.className = "tech-news-card__meta";
        const source = document.createElement("span");
        source.className = `tech-news-source tech-news-source--${article.sourceId}`;
        source.textContent = article.sourceName;
        const sourceKind = document.createElement("span");
        sourceKind.className = "tech-news-source-kind";
        sourceKind.textContent = article.sourceKind;
        const category = document.createElement("span");
        category.className = "tech-news-category";
        category.textContent = article.categoryLabel;
        const time = document.createElement("time");
        time.textContent = formatDate(article.date);
        if (article.date) time.dateTime = article.date;
        meta.append(source, sourceKind, category, time);

        const title = document.createElement("h2");
        title.textContent = article.title;
        const description = document.createElement("p");
        description.textContent = article.description || "افتح المقال لقراءة التفاصيل من المصدر.";
        const footer = document.createElement("span");
        footer.className = "tech-news-card__read";
        footer.textContent = "اقرأ المقال الأصلي ←";
        body.append(meta, title, description, footer);
        link.append(imageWrap, body);
        card.append(link);
        return card;
    }

    function render() {
        const filtered = articles.filter((article) => {
            const matchesCategory = activeCategory === "all" || article.category === activeCategory;
            const searchable = `${article.title} ${article.description} ${article.sourceName} ${article.categories.join(" ")}`.toLowerCase();
            return matchesCategory && (!query || searchable.includes(query));
        });
        $("newsGrid").replaceChildren(...filtered.map(makeArticleCard));
        $("newsEmpty").hidden = filtered.length > 0;
    }

    function updateStatus(text, state) {
        const status = $("newsStatus");
        status.textContent = text;
        status.dataset.state = state || "";
    }

    async function fetchArticleImage(article) {
        const endpoint = new URL(IMAGE_API);
        endpoint.searchParams.set("url", article.link);
        const controller = new AbortController();
        const timeout = window.setTimeout(() => controller.abort(), 10000);
        try {
            const response = await fetch(endpoint, { cache: "force-cache", signal: controller.signal });
            if (!response.ok) return "";
            const result = await response.json();
            const image = result.data && result.data.image && result.data.image.url;
            return /^https:\/\//i.test(image || "") ? image : "";
        } catch (error) {
            return "";
        } finally {
            window.clearTimeout(timeout);
        }
    }

    function saveCache() {
        try {
            localStorage.setItem(CACHE_KEY, JSON.stringify({ fetchedAt: new Date().toISOString(), articles }));
        } catch (error) {}
    }

    async function fillMissingImages() {
        const missing = articles.filter((article) => !article.image);
        for (let index = 0; index < missing.length; index += 3) {
            await Promise.all(missing.slice(index, index + 3).map(async(article) => {
                article.image = await fetchArticleImage(article);
            }));
            render();
            saveCache();
        }
    }

    async function loadNews(options = {}) {
        const quiet = options.quiet === true;
        const button = $("newsRefresh");
        button.disabled = true;
        button.classList.add("is-loading");
        if (!quiet && !articles.length) updateStatus("جارٍ تحميل أحدث الأخبار...", "loading");
        const results = await Promise.allSettled(SOURCES.map(fetchSource));
        const fresh = results.flatMap((result) => result.status === "fulfilled" ? result.value : []);
        const failedCount = results.filter((result) => result.status === "rejected").length;

        if (fresh.length) {
            const savedImages = new Map(articles.filter((article) => article.image).map((article) => [article.link, article.image]));
            const unique = new Map();
            fresh.forEach((article) => {
                if (!article.image && savedImages.has(article.link)) article.image = savedImages.get(article.link);
                unique.set(article.link, article);
            });
            articles = [...unique.values()].sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
            render();
            const status = failedCount ? `تم تحديث بعض المصادر · ${formatDate(new Date().toISOString())}` : `آخر تحديث · ${formatDate(new Date().toISOString())}`;
            updateStatus(status, failedCount ? "partial" : "success");
            await fillMissingImages();
            saveCache();
        } else {
            const cached = readCache();
            if (cached) {
                articles = cached.articles;
                render();
                updateStatus(`تعذر الاتصال؛ تعرض أخبارًا محفوظة من ${formatDate(cached.fetchedAt)}`, "offline");
            } else {
                updateStatus("تعذر تحميل الأخبار الآن. تحقق من الاتصال ثم حاول التحديث.", "error");
            }
        }

        button.disabled = false;
        button.classList.remove("is-loading");
    }

    CATEGORIES.forEach((category) => $("newsCategories").append(makeCategoryButton(category)));
    $("newsSearch").addEventListener("input", (event) => {
        query = event.target.value.trim().toLowerCase();
        render();
    });
    $("newsRefresh").addEventListener("click", () => loadNews());
    document.addEventListener("visibilitychange", () => {
        if (!document.hidden) loadNews({ quiet: true });
    });
    window.setInterval(() => {
        if (!document.hidden) loadNews({ quiet: true });
    }, REFRESH_MS);

    const cached = readCache();
    if (cached) {
        articles = cached.articles;
        render();
        updateStatus(`أخبار محفوظة من ${formatDate(cached.fetchedAt)} · جارٍ التحقق من الجديد`, "loading");
    }
    loadNews({ quiet: Boolean(cached) });
})();