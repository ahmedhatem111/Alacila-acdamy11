(() => {
        "use strict";

        const STORAGE_KEY = "ahlia_marketplace_listings";
        const user = (() => { try { return JSON.parse(localStorage.getItem("ahlia_user")); } catch (error) { return null; } })();
        const form = document.getElementById("listingForm");
        form.elements.sellerName.value = String(user && user.name || "").slice(0, 80);
        const dialog = document.getElementById("listingDialog");
        const grid = document.getElementById("listingGrid");
        const message = document.getElementById("formMessage");
        const pageMessage = document.getElementById("marketplaceStatus");
        const search = document.getElementById("searchListings");
        const sort = document.getElementById("sortListings");
        const count = document.getElementById("listingCount");
        let activeFilter = "all";

        const readListings = () => {
            try { const listings = JSON.parse(localStorage.getItem(STORAGE_KEY)); return Array.isArray(listings) ? listings : []; } catch (error) { return []; }
        };
        const saveListings = (listings) => {
            try { localStorage.setItem(STORAGE_KEY, JSON.stringify(listings)); return true; } catch (error) { return false; }
        };
        const escapeHTML = (value) => String(value || "").replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);
        const normalizeContactNumber = (value) => {
            let phone = String(value || "").replace(/\D/g, "");
            if (phone.startsWith("00")) phone = phone.slice(2);
            if (phone.startsWith("05") && phone.length === 10) phone = "966" + phone.slice(1);
            else if (phone.startsWith("5") && phone.length === 9) phone = "966" + phone;
            return /^\d{10,15}$/.test(phone) ? phone : "";
        };
        const formatPrice = (price) => new Intl.NumberFormat("ar-SA").format(Number(price)) + " ر.س";

        function renderListings() {
            const query = search.value.trim().toLocaleLowerCase("ar");
            let listings = readListings().filter((listing) => {
                const text = [listing.title, listing.brand, listing.sellerName, listing.cpu, listing.gpu, listing.ram, listing.storage, listing.os, listing.description, listing.location].join(" ").toLocaleLowerCase("ar");
                return (activeFilter === "all" || listing.category === activeFilter) && (!query || text.includes(query));
            });
            if (sort.value === "low") listings.sort((a, b) => Number(a.price) - Number(b.price));
            else if (sort.value === "high") listings.sort((a, b) => Number(b.price) - Number(a.price));
            else listings.sort((a, b) => b.createdAt - a.createdAt);

            count.textContent = new Intl.NumberFormat("ar-SA").format(listings.length);
            if (!listings.length) {
                const filtered = query || activeFilter !== "all";
                grid.innerHTML = `<div class="marketplace-empty"><h3>${filtered ? "ما لقينا إعلانات مطابقة" : "السوق ينتظر أول إعلان"}</h3><p>${filtered ? "جرّب كلمة بحث أو تصنيفًا مختلفًا." : "أضف أول جهاز أو ملحق، ويمكنك التواصل مع البائعين عبر واتساب."}</p></div>`;
                return;
            }
            grid.innerHTML = listings.map((listing) => {
                        const specs = [
                            ["المعالج", listing.cpu],
                            ["كرت الشاشة", listing.gpu],
                            ["الرام", listing.ram],
                            ["التخزين", listing.storage],
                            ["النظام", listing.os]
                        ].filter((item) => item[1]);
                        const phone = normalizeContactNumber(listing.contactNumber || listing.whatsapp);
                        const text = encodeURIComponent(`مرحبًا ${listing.sellerName}، أنا مهتم بإعلانك: ${listing.title}`);
                        const method = listing.contactMethod || "whatsapp";
                        const isCall = method === "call";
                        const contactHref = isCall ? `tel:+${phone}` : `https://wa.me/${phone}?text=${text}`;
                        const contactClass = isCall ? "marketplace-call" : "marketplace-whatsapp";
                        const contactLabel = isCall ? "اتصال" : "واتساب";
                        const own = user && String(listing.ownerId) === String(user.id);
                        return `<article class="marketplace-listing"><div class="marketplace-listing__top"><span class="marketplace-tag">${listing.category === "laptop" ? "لابتوب" : "ملحقات"}</span><span class="marketplace-condition">${escapeHTML(listing.condition)}</span></div>
                <h3>${escapeHTML(listing.title)}</h3><div class="marketplace-listing__brand">${escapeHTML(listing.brand || "الشركة غير محددة")}${listing.location ? ` · ${escapeHTML(listing.location)}` : ""}</div>
                ${specs.length ? `<dl class="marketplace-listing__specs">${specs.map(([label, value]) => `<div><dt>${label}</dt><dd>${escapeHTML(value)}</dd></div>`).join("")}</dl>` : ""}
                ${listing.description ? `<p class="marketplace-listing__description">${escapeHTML(listing.description)}</p>` : ""}
                <div class="marketplace-listing__footer"><div><strong>${formatPrice(listing.price)}</strong><small>بواسطة ${escapeHTML(listing.sellerName || "طالب")}</small></div>
                ${own ? `<button class="marketplace-delete" type="button" data-delete="${escapeHTML(listing.id)}">حذف</button>` : phone ? `<a class="${contactClass}" href="${contactHref}"${isCall ? "" : ' target="_blank" rel="noopener noreferrer"'} aria-label="${contactLabel} مع ${escapeHTML(listing.sellerName || "صاحب الإعلان")}">${isCall ? `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h4l2 5-3 2a14 14 0 0 0 5 5l2-3 5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z"/></svg>` : `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 11.8a8.6 8.6 0 0 1-12.7 7.5L3 20.5l1.3-4.6a8.6 8.6 0 1 1 16.2-4.1Z"/><path d="M8.5 8.1c.3-.6.6-.6.9-.6h.4c.2 0 .4 0 .6.5l.8 1.8c.1.3.1.5-.1.7l-.6.7c-.2.2-.2.4-.1.6.5.9 1.2 1.6 2.1 2.1.2.1.4.1.6-.1l.7-.8c.2-.2.4-.3.7-.2l1.8.9c.3.1.5.2.5.4 0 .2 0 1-.6 1.5-.6.6-1.5.8-2.5.5-1-.3-2.2-.8-3.8-2.2-1.2-1.1-2-2.5-2.2-3.4-.3-1 .1-1.9.8-2.4Z"/></svg>`}${contactLabel}</a>` : ""}</div></article>`;
        }).join("");
    }

    document.getElementById("openListingDialog").addEventListener("click", () => {
        message.textContent = "";
        dialog.showModal();
        form.elements.title.focus();
    });
    document.querySelector("[data-close-listing-dialog]").addEventListener("click", () => dialog.close());
    dialog.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            event.preventDefault();
            dialog.close();
        }
    });
    dialog.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); });
    form.elements.category.addEventListener("change", () => { document.getElementById("laptopSpecs").hidden = form.elements.category.value !== "laptop"; });
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const values = new FormData(form);
        const contactNumber = normalizeContactNumber(values.get("contactNumber"));
        if (!contactNumber) {
            form.elements.contactNumber.setCustomValidity("أدخل رقمًا صحيحًا مع مفتاح الدولة، مثل 05xxxxxxxx للسعودية.");
            form.elements.contactNumber.reportValidity();
            return;
        }
        form.elements.contactNumber.setCustomValidity("");
        const isLaptop = values.get("category") === "laptop";
        const listing = {
            id: Date.now().toString(36) + Math.random().toString(36).slice(2, 8), ownerId: String(user && user.id || "guest"),
            sellerName: String(values.get("sellerName") || "").trim().slice(0, 80), category: values.get("category"),
            contactMethod: values.get("contactMethod"), contactNumber,
            title: String(values.get("title") || "").trim().slice(0, 90), brand: String(values.get("brand") || "").trim().slice(0, 50),
            price: Number(values.get("price")), condition: String(values.get("condition") || ""), location: String(values.get("location") || "").trim().slice(0, 60),
            cpu: isLaptop ? String(values.get("cpu") || "").trim().slice(0, 70) : "", gpu: isLaptop ? String(values.get("gpu") || "").trim().slice(0, 70) : "",
            ram: isLaptop ? String(values.get("ram") || "").trim().slice(0, 30) : "", storage: isLaptop ? String(values.get("storage") || "").trim().slice(0, 30) : "",
            os: isLaptop ? String(values.get("os") || "").trim().slice(0, 50) : "", description: String(values.get("description") || "").trim().slice(0, 500),
            whatsapp: contactNumber, createdAt: Date.now(),
        };
        const listings = readListings();
        listings.unshift(listing);
        if (!saveListings(listings)) { message.textContent = "تعذر الحفظ. مساحة تخزين المتصفح ممتلئة."; return; }
        form.reset();
        document.getElementById("laptopSpecs").hidden = false;
        pageMessage.textContent = "تم نشر إعلانك على هذا المتصفح.";
        dialog.close();
        renderListings();
    });
    form.elements.contactNumber.addEventListener("input", () => form.elements.contactNumber.setCustomValidity(""));
    search.addEventListener("input", renderListings);
    sort.addEventListener("change", renderListings);
    document.querySelectorAll("[data-filter]").forEach((button) => button.addEventListener("click", () => {
        activeFilter = button.dataset.filter;
        document.querySelectorAll("[data-filter]").forEach((item) => {
            const selected = item === button;
            item.classList.toggle("is-active", selected);
            item.setAttribute("aria-pressed", String(selected));
        });
        renderListings();
    }));
    grid.addEventListener("click", (event) => {
        const button = event.target.closest("[data-delete]");
        if (!button) return;
        const ownerId = String(user && user.id || "guest");
        saveListings(readListings().filter((listing) => listing.id !== button.dataset.delete || String(listing.ownerId) !== ownerId));
        renderListings();
    });
    window.addEventListener("storage", (event) => { if (event.key === STORAGE_KEY) renderListings(); });
    renderListings();
})();