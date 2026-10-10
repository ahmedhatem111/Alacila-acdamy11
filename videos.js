(() => {
    "use strict";

    const featuredVideos = [
        { title: "مقارنة: هل أعمل مع Samsung؟ ولماذا أنتقد iPhone؟", videoId: "B90eMFWTVn4", creatorName: "أشرف مصطفى", category: "advice", label: "رأي تقني", topic: "Samsung iPhone" },
        { title: "مراجعة HONOR Robot Phone", videoId: "b8RQPDN1Mwk", creatorName: "أشرف مصطفى", category: "mobile", label: "مراجعة هاتف", topic: "HONOR Robot Phone" },
        { title: "المراجعة الكاملة لهاتف realme C100i", videoId: "FFKLo1u1cWc", creatorName: "أشرف مصطفى", category: "mobile", label: "مراجعة هاتف", topic: "realme C100i" },
        { title: "مراجعة vivo X300 FE", videoId: "jVOJVsGostQ", creatorName: "أشرف مصطفى", category: "mobile", label: "مراجعة هاتف", topic: "vivo X300 FE" },
        { title: "OPPO Reno 16 Pro: المميزات والعيوب", videoId: "WlCpgNAf17w", creatorName: "أشرف مصطفى", category: "mobile", label: "مراجعة هاتف", topic: "OPPO Reno 16 Pro" },
        { title: "مراجعة Samsung Galaxy Z Fold 8", videoId: "GRYlbFscUPI", creatorName: "أشرف مصطفى", category: "mobile", label: "مراجعة هاتف", topic: "Samsung Galaxy Z Fold 8" },
        { title: "لابتوب للطلاب والبرمجة والذكاء الاصطناعي", videoId: "kxPhZUr4R-g", creatorName: "أشرف مصطفى", category: "computers", label: "أجهزة للطلاب", topic: "لابتوب برمجة ذكاء اصطناعي" },
        { title: "نصيحة مهمة قبل شراء هاتف Huawei", videoId: "cHwXh3Wrp4A", creatorName: "أشرف مصطفى", category: "advice", label: "نصيحة تقنية", topic: "Huawei هاتف" },
        { title: "مراجعة سماعة oraimo SpaceBuds 2", videoId: "pZQ4JC6YGH4", creatorName: "أشرف مصطفى", category: "accessories", label: "مراجعة إكسسوار", topic: "oraimo SpaceBuds 2" },
        { title: "مميزات iPhone 18 Pro Max من وجهة نظر البائع", videoId: "I7O2davdFSs", creatorName: "أشرف مصطفى", category: "mobile", label: "نصائح هواتف", topic: "iPhone 18 Pro Max" },
        { title: "مراجعة ساعة ذكية أنيقة", videoId: "rkJFNq0-1sI", creatorName: "أشرف مصطفى", category: "accessories", label: "مراجعة إكسسوار", topic: "ساعة ذكية" },
        { title: "مراجعة هاتف itel A200 Plus", videoId: "wq3yTzpRM_I", creatorName: "أشرف مصطفى", category: "mobile", label: "مراجعة هاتف", topic: "itel A200 Plus" },
        { title: "مميزات وعيوب سماعة Soundcore Liberty 5 Pro", videoId: "YSjQj-laEV8", creatorName: "أشرف مصطفى", category: "accessories", label: "مراجعة إكسسوار", topic: "Soundcore Liberty 5 Pro" },
        { title: "مراجعة هاتف Infinix Hot 70", videoId: "83K8N_en_hc", creatorName: "أشرف مصطفى", category: "mobile", label: "مراجعة هاتف", topic: "Infinix Hot 70" },
        { title: "هاتف يستحق سعره؟", videoId: "TXEaj-izS3c", creatorName: "أشرف مصطفى", category: "mobile", label: "رأي تقني", topic: "مراجعة هاتف" },
        { title: "هاتف nubia وخيارات التقسيط", videoId: "0TzZa_sjiGY", creatorName: "أشرف مصطفى", category: "mobile", label: "نصيحة شراء", topic: "هاتف nubia تقسيط" },
        { title: "مراجعة هاتف Motorola", videoId: "zRo-3kn0_Jw", creatorName: "أشرف مصطفى", category: "mobile", label: "مراجعة هاتف", topic: "Motorola" },
        { title: "مراجعة سماعة وساعة Infinix", videoId: "jQVjMenILNs", creatorName: "أشرف مصطفى", category: "accessories", label: "مراجعة إكسسوار", topic: "Infinix سماعة ساعة" },
        { title: "مراجعة سماعات oraimo", videoId: "H9oZN5lPtT8", creatorName: "أشرف مصطفى", category: "accessories", label: "مراجعة إكسسوار", topic: "oraimo سماعات" },
        { title: "Intro to Non-linear data structures - Arabic", videoId: "ucLUAbv-QPg", creatorName: "محمود عبدالرازق", category: "data-structures", label: "هياكل البيانات", topic: "Non-linear data structures" },
        { title: "Definition of trees - [Arabic]", videoId: "2qZE0XFRPis", creatorName: "محمود عبدالرازق", category: "data-structures", label: "هياكل البيانات", topic: "تعريف الأشجار" },
        { title: "Binary Tree: Basic Terminologies", videoId: "I-YCEvQavR8", creatorName: "محمود عبدالرازق", category: "data-structures", label: "هياكل البيانات", topic: "مصطلحات الشجرة الثنائية" },
        { title: "أنواع الأشجار الثنائية", videoId: "amFpt9KYRAY", creatorName: "محمود عبدالرازق", category: "data-structures", label: "هياكل البيانات", topic: "أنواع الأشجار الثنائية" },
        { title: "بناء الشجرة الثنائية", videoId: "VLw3gDox5WY", creatorName: "محمود عبدالرازق", category: "data-structures", label: "هياكل البيانات", topic: "تنفيذ الشجرة الثنائية" },
        { title: "Binary Tree Level Order Traversal: BFS", videoId: "9hTbbZZl3kY", creatorName: "محمود عبدالرازق", category: "data-structures", label: "هياكل البيانات", topic: "BFS اجتياز الشجرة مستوى بمستوى" },
        { title: "حل مسألة Binary Tree Level Order Traversal بـ C++", videoId: "iPzbooOH1Q8", creatorName: "محمود عبدالرازق", category: "data-structures", label: "حل مسائل برمجية", topic: "LeetCode BFS C++" },
        { title: "Binary Tree Traversal: DFS الجزء الأول", videoId: "C2vg267p2ZY", creatorName: "محمود عبدالرازق", category: "data-structures", label: "هياكل البيانات", topic: "DFS preorder inorder postorder" },
        { title: "Binary Tree Traversal: DFS الجزء الثاني", videoId: "eVOQPZe5e-U", creatorName: "محمود عبدالرازق", category: "data-structures", label: "هياكل البيانات", topic: "DFS تعقيد المساحة" },
        { title: "حذف جميع عقد الشجرة الثنائية", videoId: "rWkHvzsmpY8", creatorName: "محمود عبدالرازق", category: "data-structures", label: "هياكل البيانات", topic: "حذف Binary Tree من الذاكرة" },
        { title: "نسخ الشجرة الثنائية: Clone A Binary Tree", videoId: "SC6rlgWAAzQ", creatorName: "محمود عبدالرازق", category: "data-structures", label: "هياكل البيانات", topic: "نسخ الشجرة الثنائية C++" },
        { title: "ارتفاع الشجرة الثنائية", videoId: "t1uugJ5AMHA", creatorName: "محمود عبدالرازق", category: "data-structures", label: "هياكل البيانات", topic: "حساب ارتفاع Binary Tree" },
        { title: "Invert Binary Tree: حل مسألة LeetCode", videoId: "7ZJLHcdAiZU", creatorName: "محمود عبدالرازق", category: "data-structures", label: "حل مسائل برمجية", topic: "Invert Binary Tree LeetCode" },
        { title: "Same Tree: حل المسألة بـ C++", videoId: "wJxt9c0kD6s", creatorName: "محمود عبدالرازق", category: "data-structures", label: "حل مسائل برمجية", topic: "Same Tree LeetCode C++" },
        { title: "Binary Search Tree: التعريف", videoId: "PsPwzLLH5qg", creatorName: "محمود عبدالرازق", category: "data-structures", label: "هياكل البيانات", topic: "تعريف Binary Search Tree" },
        { title: "ترشيح بلاي ليست شرح Math لطلاب حاسبات وهندسة", videoId: "_gXwEhEg2bk", creatorName: "خالد النابي", category: "math", label: "رياضيات", topic: "رياضيات حاسبات وهندسة" },
        { title: "يعني إيه Data Analysis؟", videoId: "q8MKcJGEncQ", creatorName: "خالد النابي", category: "data-analysis", label: "تحليل البيانات", topic: "مفهوم تحليل البيانات" },
        { title: "Roadmap AI: خريطة تعلم الذكاء الاصطناعي", videoId: "oZdBCs986hY", creatorName: "خالد النابي", category: "ai", label: "ذكاء اصطناعي", topic: "مسار تعلم AI" },
        { title: "خريطة تعلم Cyber Security", videoId: "MFqTBvEEIW8", creatorName: "خالد النابي", category: "cybersecurity", label: "أمن سيبراني", topic: "مسار الأمن السيبراني" },
        { title: "يعني إيه DataBase؟", videoId: "sGsSprxTVIA", creatorName: "خالد النابي", category: "databases", label: "قواعد البيانات", topic: "مفهوم قاعدة البيانات" },
        { title: "خريطة Mobile App Development", videoId: "Qm4qpKtG48A", creatorName: "خالد النابي", category: "mobile-dev", label: "تطوير تطبيقات", topic: "مسار تطوير تطبيقات الجوال" },
        { title: "ليه المنافسة ضعيفة في الصعيد؟ ومشاكل الشركات", videoId: "txZgkVHwzpI", creatorName: "Qcast Podcast", category: "business", label: "الأعمال وريادة الأعمال", topic: "منافسة الشركات في الصعيد" },
        { title: "جيل Z وطريقتهم في التفكير بالمشروعات الناشئة", videoId: "s1a-UjrrXhA", creatorName: "Qcast Podcast", category: "business", label: "الأعمال وريادة الأعمال", topic: "جيل Z الشركات الناشئة" },
        { title: "ليه رواد الأعمال بيستعجلوا النجاح؟", videoId: "NwDJDVSEDds", creatorName: "Qcast Podcast", category: "business", label: "الأعمال وريادة الأعمال", topic: "رواد الأعمال والنجاح" },
        { title: "العمل الحر ورفع قيمة سعر الساعة", videoId: "4RVC7N9V-l0", creatorName: "Qcast Podcast", category: "freelancing", label: "العمل الحر", topic: "العمل الحر الدخل وسعر الساعة" },
        { title: "هل ما زالت فرص العمل الحر موجودة؟", videoId: "omtZqKmA8Jk", creatorName: "Qcast Podcast", category: "freelancing", label: "العمل الحر", topic: "فرص العمل الحر والمنافسة" },
        { title: "كيف يساعدك العمل الحر على التعلم والمنافسة؟", videoId: "e45ceqILkOc", creatorName: "Qcast Podcast", category: "freelancing", label: "العمل الحر", topic: "العمل الحر والتعلم والفرص" },
        { title: "الدخل السلبي وفرص العمل الحر", videoId: "PFi9G3PQmcE", creatorName: "Qcast Podcast", category: "freelancing", label: "العمل الحر", topic: "الدخل السلبي والعمل الحر" },
        { title: "التأمين الصحي والاجتماعي في العمل الحر", videoId: "9TnvJqgs9fQ", creatorName: "Qcast Podcast", category: "freelancing", label: "العمل الحر", topic: "التأمين الصحي والاجتماعي للمستقلين" },
        { title: "خطوات اختيار العمل الحر والتميز فيه", videoId: "7obRWxmCEgs", creatorName: "Qcast Podcast", category: "freelancing", label: "العمل الحر", topic: "اختيار العمل الحر والمهارات" },
        { title: "العمل الحر: من مشروع جانبي إلى وظيفة دائمة", videoId: "ZecigYkvGro", creatorName: "Qcast Podcast", category: "freelancing", label: "العمل الحر", topic: "العمل الحر والعمل الدائم" },
        { title: "من الصيدلة إلى ريادة الأعمال وتدريب الطلبة المغتربين", videoId: "0CwktbcbKqs", creatorName: "Qcast Podcast", category: "business", label: "بودكاست طويل · 57:11", topic: "ريادة الأعمال تدريب الطلاب" },
        { title: "من التدريب والاستشارات إلى توجيه الشركات الناشئة", videoId: "ZdEAUwvZR_E", creatorName: "Qcast Podcast", category: "business", label: "بودكاست طويل · 55:27", topic: "التدريب الاستشارات الشركات الناشئة" },
        { title: "من وظيفة بنكية إلى العمل الحر على Upwork", videoId: "ZN2jTlaoT6o", creatorName: "Qcast Podcast", category: "freelancing", label: "بودكاست طويل · 1:01:18", topic: "العمل الحر Upwork" },
        { title: "هل التسويق فعلًا ملوش علاقة بالمبيعات؟", videoId: "WZVCTJNR0bk", creatorName: "Qcast Podcast", category: "business", label: "بودكاست طويل · 56:30", topic: "التسويق والمبيعات في الصعيد" },
        { title: "الدوبلاج المصري مع المعلق الصوتي مصطفى جبريل", videoId: "7IWlrGl0dGQ", creatorName: "Qcast Podcast", category: "business", label: "بودكاست طويل · 39:28", topic: "الدوبلاج والتعليق الصوتي" }
    ];
    const CHANNEL_FEED = "https://www.youtube.com/feeds/videos.xml?channel_id=UCHV_ce_DrXijYyVZPFSVcsA";
    const creatorImages = {
        "أشرف مصطفى": "https://yt3.googleusercontent.com/PHNZW9ozp0x46Xb4ITH0oUJJjOaza_6fYXs1XPm8zmB-bQ6somd7k82bOM1j46VWk3QUCF6-zA=s120-c-k-c0x00ffffff-no-rj",
        "محمود عبدالرازق": "https://yt3.googleusercontent.com/_0M2EhPU1VOJZnUwJrPZ-8tFPppKO6D84tYNZPg6mktVSreQZFPe7mWU0z5HAznK_jlbDiWzFg=s120-c-k-c0x00ffffff-no-rj",
        "خالد النابي": "https://yt3.googleusercontent.com/CV46hGa5K1Hoz2dvj71JxEwHueFF5p1Pp8jS8tXcBAw-QQHg9sDusz6oypu6Q_GwNBnZvCGoMTc=s120-c-k-c0x00ffffff-no-rj",
        "Qcast Podcast": "https://yt3.googleusercontent.com/raE44kCg0CMcSxTCk0tgsgNZmA-YBYiOnkifntbEwkzsD9YW9Gl7N9_oHknWxFB_Rb3fv0m4=s120-c-k-c0x00ffffff-no-rj"
    };

    function interleaveCreators(items) {
        const groups = [...items.reduce((map, video) => {
            const creator = video.creatorName || "محتوى قنا";
            if (!map.has(creator)) map.set(creator, []);
            map.get(creator).push(video);
            return map;
        }, new Map()).values()];
        const mixed = [];
        for (let index = 0; mixed.length < items.length; index++) {
            groups.forEach((group) => {
                if (group[index]) mixed.push(group[index]);
            });
        }
        return mixed;
    }

    const videos = interleaveCreators(featuredVideos);

    const categories = [
        { id: "all", label: "الكل", icon: "⌂" },
        { id: "mobile", label: "الهواتف", icon: "▣" },
        { id: "accessories", label: "السماعات والإكسسوارات", icon: "◉" },
        { id: "computers", label: "أجهزة الطلاب", icon: "▤" },
        { id: "advice", label: "نصائح تقنية", icon: "✳" },
        { id: "data-structures", label: "هياكل البيانات", icon: "⌘" },
        { id: "math", label: "الرياضيات", icon: "∑" },
        { id: "data-analysis", label: "تحليل البيانات", icon: "▥" },
        { id: "ai", label: "الذكاء الاصطناعي", icon: "✳" },
        { id: "cybersecurity", label: "الأمن السيبراني", icon: "⬡" },
        { id: "databases", label: "قواعد البيانات", icon: "▤" },
        { id: "mobile-dev", label: "تطوير تطبيقات الجوال", icon: "▯" },
        { id: "business", label: "الأعمال وريادة الأعمال", icon: "↗" },
        { id: "freelancing", label: "العمل الحر", icon: "⌘" }
    ];
    const $ = (id) => document.getElementById(id);
    let activeCategory = "all";
    let query = "";

    function makeCategoryButton(category, compact) {
        const button = document.createElement("button");
        button.type = "button";
        button.className = compact ? "video-chip" : "video-category";
        button.dataset.category = category.id;
        button.setAttribute("aria-pressed", String(activeCategory === category.id));
        if (!compact) {
            const icon = document.createElement("span");
            icon.className = "video-category__icon";
            icon.setAttribute("aria-hidden", "true");
            icon.textContent = category.icon;
            button.append(icon);
        }
        button.append(document.createTextNode(category.label));
        button.addEventListener("click", () => {
            activeCategory = category.id;
            document.querySelectorAll("[data-category]").forEach((item) => {
                item.setAttribute("aria-pressed", String(item.dataset.category === activeCategory));
            });
            render();
        });
        return button;
    }

    function makeCard(video, index) {
        const link = document.createElement("a");
        link.className = "video-card";
        link.href = `https://www.youtube.com/watch?v=${encodeURIComponent(video.videoId)}`;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.setAttribute("aria-label", `شاهد الفيديو على يوتيوب: ${video.title}`);

        const thumbnail = document.createElement("div");
        thumbnail.className = "video-thumb";
        thumbnail.style.setProperty("--thumb-index", index);
        const image = document.createElement("img");
        image.className = "video-thumb__image";
        image.src = `https://i.ytimg.com/vi/${video.videoId}/hqdefault.jpg`;
        image.alt = "";
        image.loading = "lazy";
        image.referrerPolicy = "no-referrer";
        image.addEventListener("error", () => image.remove(), { once: true });
        const play = document.createElement("span");
        play.className = "video-thumb__play";
        play.setAttribute("aria-hidden", "true");
        play.textContent = "▶";
        thumbnail.append(image, play);

        const title = document.createElement("h3");
        title.className = "video-card__title";
        title.textContent = video.title;

        const creator = document.createElement("div");
        creator.className = "video-card__creator";
        const avatarUrl = video.creatorImage || creatorImages[video.creatorName];
        const avatar = avatarUrl ? document.createElement("img") : document.createElement("span");
        avatar.className = "video-card__avatar";
        const fallbackInitial = video.creatorName ? Array.from(video.creatorName.trim())[0] : "ق";
        if (avatarUrl) {
            avatar.src = avatarUrl;
            avatar.alt = "صورة صانع المحتوى";
            avatar.loading = "lazy";
            avatar.onerror = () => {
                const fallback = document.createElement("span");
                fallback.className = "video-card__avatar video-card__avatar--placeholder";
                fallback.setAttribute("aria-hidden", "true");
                fallback.textContent = fallbackInitial;
                avatar.replaceWith(fallback);
            };
        } else {
            avatar.classList.add("video-card__avatar--placeholder");
            avatar.setAttribute("aria-hidden", "true");
            avatar.textContent = fallbackInitial;
        }
        const creatorDetails = document.createElement("div");
        creatorDetails.className = "video-card__creator-details";
        const creatorName = document.createElement("strong");
        creatorName.textContent = video.creatorName || "اسم صانع المحتوى";
        const type = document.createElement("span");
        type.className = "video-card__type";
        type.textContent = `${video.label} · ${video.creatorName || "صانع محتوى من قنا"}`;
        creatorDetails.append(creatorName, type);
        creator.append(avatar, creatorDetails);
        link.append(thumbnail, title, creator);
        return link;
    }

    function categoryFor(title) {
        const text = title.toLocaleLowerCase("ar-EG");
        if (/math|رياضيات/.test(text)) return ["math", "رياضيات"];
        if (/data analysis|تحليل البيانات/.test(text)) return ["data-analysis", "تحليل البيانات"];
        if (/artificial intelligence|\bai\b|ذكاء اصطناعي/.test(text)) return ["ai", "ذكاء اصطناعي"];
        if (/cyber|security|أمن سيبراني/.test(text)) return ["cybersecurity", "أمن سيبراني"];
        if (/database|قاعدة البيانات|قواعد البيانات/.test(text)) return ["databases", "قواعد البيانات"];
        if (/mobile app|تطوير تطبيقات/.test(text)) return ["mobile-dev", "تطوير تطبيقات"];
        if (/data structures|binary tree|هياكل البيانات|الشجرة الثنائية/.test(text)) return ["data-structures", "هياكل البيانات"];
        if (/لابتوب|كمبيوتر|حاسوب|laptop|computer/.test(text)) return ["computers", "أجهزة للطلاب"];
        if (/سماعة|سماعات|ساعة|earbud|headphone|watch/.test(text)) return ["accessories", "مراجعة إكسسوار"];
        if (/نصيحة|مقارنة|tip|versus/.test(text)) return ["advice", "نصيحة تقنية"];
        return ["mobile", "مراجعة هاتف"];
    }

    function normalizeChannelItem(item) {
        const link = String(item.link || "");
        if (!/^https:\/\/(?:www\.)?youtube\.com\//i.test(link)) return null;
        const idMatch = link.match(/[?&]v=([\w-]{11})|\/(?:shorts|embed)\/([\w-]{11})/i);
        const videoId = idMatch && (idMatch[1] || idMatch[2]);
        const title = String(item.title || "").trim().slice(0, 180);
        if (!videoId || !title) return null;
        const [category, label] = categoryFor(title);
        return { title, videoId, creatorName: "أشرف مصطفى", category, label, topic: title };
    }

    async function refreshChannelVideos() {
        const status = $("videoChannelStatus");
        try {
            const endpoint = new URL("https://api.rss2json.com/v1/api.json");
            endpoint.searchParams.set("rss_url", CHANNEL_FEED);
            const response = await fetch(endpoint, { cache: "no-store" });
            if (!response.ok) throw new Error("RSS update failed");
            const feed = await response.json();
            if (feed.status !== "ok" || !Array.isArray(feed.items)) throw new Error("Channel feed unavailable");
            const latest = feed.items.map(normalizeChannelItem).filter(Boolean);
            if (!latest.length) throw new Error("No recent channel videos");
            const latestIds = new Set(latest.map((video) => video.videoId));
            videos.splice(0, videos.length, ...interleaveCreators([...latest, ...featuredVideos.filter((video) => !latestIds.has(video.videoId))]));
            render();
            if (status) {
                const updatedAt = new Intl.DateTimeFormat("ar-EG", { timeStyle: "short" }).format(new Date());
                status.textContent = `تحديث تلقائي للقناة · آخر تحقق ${updatedAt}`;
            }
        } catch (error) {
            if (status) status.textContent = "تعذّر جلب الجديد الآن؛ تعرض الصفحة الفيديوهات المحفوظة.";
        }
    }

    function render() {
        const filtered = videos.filter((video) => {
            const matchesCategory = activeCategory === "all" || video.category === activeCategory;
            const matchesQuery = !query || `${video.title} ${video.label} ${video.topic}`.toLowerCase().includes(query);
            return matchesCategory && matchesQuery;
        });
        const grid = $("videoGrid");
        grid.replaceChildren(...filtered.map(makeCard));
        $("videoCount").textContent = `${filtered.length} فيديو`;
        $("videoEmpty").hidden = filtered.length > 0;
    }

    categories.forEach((category) => {
        $("videoCategories").append(makeCategoryButton(category, false));
        $("videoChips").append(makeCategoryButton(category, true));
    });
    $("videoSearch").addEventListener("input", (event) => {
        query = event.target.value.trim().toLowerCase();
        render();
    });
    render();
    refreshChannelVideos();
    window.setInterval(() => {
        if (!document.hidden) refreshChannelVideos();
    }, 30 * 60 * 1000);
    document.addEventListener("visibilitychange", () => {
        if (!document.hidden) refreshChannelVideos();
    });
})();