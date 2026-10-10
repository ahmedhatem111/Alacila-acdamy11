(() => {
    const kindSelect = document.getElementById("opportunityKind");
    const regionSelect = document.getElementById("opportunityRegion");
    const keywordInput = document.getElementById("opportunityKeyword");
    const grid = document.querySelector(".opportunities-grid");
    const refreshButton = document.getElementById("opportunityRefresh");
    const status = document.getElementById("opportunityStatus");
    const count = document.getElementById("opportunityCount");
    const empty = document.getElementById("opportunityEmpty");
    if (!kindSelect || !regionSelect || !keywordInput || !grid || !refreshButton) return;
    let cards = [...grid.querySelectorAll("[data-opportunity-card]")];

    const destination = (provider, region, keyword) => {
        const place = region === "qena" ? "Qena, Egypt" : "Egypt";
        if (provider === "forasna") {
            return region === "qena" ? "https://forasna.com/a/وظائف-قنا" : "https://forasna.com/وظائف-خالية";
        }
        if (provider === "nti") {
            return region === "qena" ? "https://nti.sci.eg/dey/creativa.html" : "https://nti.sci.eg/dey/specialized_programs.html";
        }
        if (provider === "depi") return "https://depi.gov.eg/content/depi";
        if (provider === "maharatech") return "https://maharatech.gov.eg/";

        const url = new URL({
            wuzzuf: "https://wuzzuf.net/search/jobs/",
            linkedin: "https://www.linkedin.com/jobs/search/",
            indeed: "https://eg.indeed.com/jobs",
        }[provider]);
        if (keyword) url.searchParams.set(provider === "linkedin" ? "keywords" : "q", keyword);
        url.searchParams.set(provider === "wuzzuf" ? "l" : "location", place);
        return url.href;
    };

    function update() {
        const kind = kindSelect.value;
        const region = regionSelect.value;
        const keyword = keywordInput.value.trim();
        let visible = 0;

        cards.forEach((card) => {
            const link = card.querySelector("[data-opportunity-link]");
            if (link) link.href = destination(card.dataset.provider, region, keyword);
            const regions = (card.dataset.region || "").split(/\s+/);
            const text = `${card.dataset.keywords || ""} ${card.textContent}`.toLocaleLowerCase("ar-EG");
            const matchesKind = kind === "all" || card.dataset.kind === kind;
            const matchesRegion = region === "all" || regions.includes(region) || (regions.includes("egypt") && region !== "online");
            const matchesKeyword = !keyword || text.includes(keyword.toLocaleLowerCase("ar-EG"));
            const matches = matchesKind && matchesRegion && matchesKeyword;
            card.hidden = !matches;
            if (!matches) return;
            visible++;
        });

        if (count) count.textContent = `عرض ${visible} فرص`;
        if (empty) empty.hidden = visible > 0;
    }

    async function refresh() {
        if (refreshButton.disabled) return;
        refreshButton.disabled = true;
        refreshButton.textContent = "جارٍ التحديث...";
        if (status) status.textContent = "جارٍ التحقق من أحدث نسخة منشورة...";

        try {
            const url = new URL(window.location.href);
            url.searchParams.set("_opportunity_refresh", Date.now());
            const response = await fetch(url.href, { cache: "no-store" });
            if (!response.ok) throw new Error("Opportunity page refresh failed");

            const documentCopy = new DOMParser().parseFromString(await response.text(), "text/html");
            const freshCards = [...documentCopy.querySelectorAll("[data-opportunity-card]")];
            if (!freshCards.length) throw new Error("No opportunities found in refreshed page");

            grid.replaceChildren(...freshCards.map((card) => document.importNode(card, true)));
            cards = [...grid.querySelectorAll("[data-opportunity-card]")];
            update();
            if (status) {
                const updatedAt = new Intl.DateTimeFormat("ar-EG", { dateStyle: "medium", timeStyle: "short" }).format(new Date());
                status.textContent = `آخر تحقق من تحديث الصفحة: ${updatedAt}`;
            }
        } catch (error) {
            if (status) status.textContent = "تعذر الاتصال لتحديث القائمة؛ ما زالت الفرص المعروضة متاحة.";
        } finally {
            refreshButton.disabled = false;
            refreshButton.textContent = "تحديث الفرص";
        }
    }

    kindSelect.addEventListener("change", update);
    regionSelect.addEventListener("change", update);
    keywordInput.addEventListener("input", update);
    update();
    refreshButton.addEventListener("click", refresh);
    refresh();
    window.setInterval(refresh, 15 * 60 * 1000);
    window.addEventListener("pageshow", (event) => {
        if (event.persisted) refresh();
    });
})();