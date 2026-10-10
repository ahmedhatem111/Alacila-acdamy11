(() => {
    "use strict";

    const books = [
        { title: "Think Python", author: "Allen B. Downey", category: "programming", categoryLabel: "البرمجة", description: "مدخل عملي لتعلّم البرمجة باستخدام Python.", language: "English", url: "https://greenteapress.com/wp/think-python-2e/", cover: "python" },
        { title: "Eloquent JavaScript", author: "Marijn Haverbeke", category: "web", categoryLabel: "تطوير الويب", description: "أساسيات JavaScript ومفاهيم بناء تطبيقات الويب.", language: "English", url: "https://eloquentjavascript.net/", cover: "javascript" },
        { title: "Pro Git", author: "Scott Chacon و Ben Straub", category: "tools", categoryLabel: "أدوات المطورين", description: "مرجع عملي لإدارة الإصدارات باستخدام Git.", language: "English", url: "https://git-scm.com/book/en/v2", cover: "git" },
        { title: "The Linux Command Line", author: "William Shotts", category: "systems", categoryLabel: "أنظمة التشغيل", description: "دليل للتعامل مع الطرفية وأدوات Linux.", language: "English", url: "https://linuxcommand.org/tlcl.php", cover: "linux" },
        { title: "Open Data Structures", author: "Pat Morin", category: "algorithms", categoryLabel: "الخوارزميات", description: "كتاب مفتوح عن هياكل البيانات وتحليلها.", language: "English", url: "https://opendatastructures.org/", cover: "data" },
        { title: "Operating Systems: Three Easy Pieces", author: "Remzi H. Arpaci-Dusseau و Andrea C. Arpaci-Dusseau", category: "systems", categoryLabel: "أنظمة التشغيل", description: "مفاهيم أنظمة التشغيل من خلال أمثلة وشروحات.", language: "English", url: "https://pages.cs.wisc.edu/~remzi/OSTEP/", cover: "systems" }
    ];

    const categories = [
        { id: "all", label: "الكل" },
        { id: "programming", label: "البرمجة" },
        { id: "web", label: "تطوير الويب" },
        { id: "algorithms", label: "الخوارزميات" },
        { id: "systems", label: "أنظمة التشغيل" },
        { id: "tools", label: "أدوات المطورين" }
    ];
    const $ = (id) => document.getElementById(id);
    let activeCategory = "all";
    let query = "";

    function makeCategoryButton(category) {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "library-chip";
        button.dataset.category = category.id;
        button.setAttribute("aria-pressed", String(activeCategory === category.id));
        button.textContent = category.label;
        button.addEventListener("click", () => {
            activeCategory = category.id;
            document.querySelectorAll(".library-chip").forEach((chip) => {
                chip.setAttribute("aria-pressed", String(chip.dataset.category === activeCategory));
            });
            render();
        });
        return button;
    }

    function makeBookCard(book) {
        const card = document.createElement("article");
        card.className = "card book-card";
        const cover = document.createElement("div");
        cover.className = `book-cover book-cover--${book.cover}`;
        const coverTop = document.createElement("span");
        coverTop.className = "book-cover__top";
        coverTop.textContent = "أهلية أكاديمي · مكتبة التقنية";
        const coverTitle = document.createElement("strong");
        coverTitle.textContent = book.title;
        const coverType = document.createElement("span");
        coverType.className = "book-cover__type";
        coverType.textContent = book.categoryLabel;
        cover.append(coverTop, coverTitle, coverType);

        const body = document.createElement("div");
        body.className = "book-card__body";
        const category = document.createElement("span");
        category.className = "book-card__category";
        category.textContent = book.categoryLabel;
        const title = document.createElement("h2");
        title.textContent = book.title;
        const author = document.createElement("p");
        author.className = "book-card__author";
        author.textContent = book.author;
        const description = document.createElement("p");
        description.className = "book-card__description";
        description.textContent = book.description;
        const footer = document.createElement("div");
        footer.className = "book-card__footer";
        const language = document.createElement("span");
        language.textContent = book.language;
        const link = document.createElement("a");
        link.className = "btn btn--outline btn--sm";
        link.href = book.url;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.textContent = "اقرأ الكتاب";
        footer.append(language, link);
        body.append(category, title, author, description, footer);
        card.append(cover, body);
        return card;
    }

    function render() {
        const filtered = books.filter((book) => {
            const matchesCategory = activeCategory === "all" || book.category === activeCategory;
            const matchesQuery = !query || `${book.title} ${book.author} ${book.categoryLabel} ${book.description}`.toLowerCase().includes(query);
            return matchesCategory && matchesQuery;
        });
        $("bookGrid").replaceChildren(...filtered.map(makeBookCard));
        $("bookCount").textContent = `${filtered.length} كتاب`;
        $("bookTotal").textContent = `${books.length} كتب`;
        $("bookEmpty").hidden = filtered.length > 0;
    }

    categories.forEach((category) => $("bookCategories").append(makeCategoryButton(category)));
    $("bookSearch").addEventListener("input", (event) => {
        query = event.target.value.trim().toLowerCase();
        render();
    });
    render();
})();