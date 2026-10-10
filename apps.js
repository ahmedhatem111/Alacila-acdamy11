(() => {
    const search = document.getElementById("appsSearch");
    const category = document.getElementById("appsCategory");
    const cards = [...document.querySelectorAll("[data-app]")];
    const count = document.getElementById("appsCount");
    const empty = document.getElementById("appsEmpty");
    if (!search || !category || !count || !empty) return;

    document.querySelectorAll(".study-app-logo").forEach((image) => {
        const mark = image.closest(".study-app-mark");
        const showLogo = () => mark && mark.classList.add("has-logo");
        if (image.complete) {
            if (image.naturalWidth > 0) showLogo();
        } else {
            image.addEventListener("load", showLogo, { once: true });
        }
    });

    function update() {
        const query = search.value.trim().toLocaleLowerCase("ar-EG");
        let visible = 0;
        cards.forEach((card) => {
            const matchesCategory = category.value === "all" || card.dataset.category === category.value;
            const matchesQuery = !query || card.textContent.toLocaleLowerCase("ar-EG").includes(query) || (card.dataset.keywords || "").toLocaleLowerCase("ar-EG").includes(query);
            const matches = matchesCategory && matchesQuery;
            card.hidden = !matches;
            if (matches) visible++;
        });
        count.textContent = `عرض ${visible} من ${cards.length} تطبيق`;
        empty.hidden = visible > 0;
    }

    search.addEventListener("input", update);
    category.addEventListener("change", update);
    update();
})();