(() => {
        "use strict";

        const STORAGE_KEY = "ahlia_lost_found_reports";
        const user = (() => { try { return JSON.parse(localStorage.getItem("ahlia_user")); } catch (error) { return null; } })();
        const form = document.getElementById("reportForm");
        form.elements.reporterName.value = String(user && user.name || "").slice(0, 80);
        const dialog = document.getElementById("reportDialog");
        const grid = document.getElementById("reportGrid");
        const message = document.getElementById("reportFormMessage");
        const pageMessage = document.getElementById("reportStatus");
        const search = document.getElementById("searchReports");
        const sort = document.getElementById("sortReports");
        const count = document.getElementById("reportCount");
        const categoryNames = { electronics: "إلكترونيات", documents: "بطاقات أو مستندات", keys: "مفاتيح", bag: "حقيبة", clothing: "ملابس", other: "أخرى" };
        let activeFilter = "all";

        const readReports = () => {
            try { const reports = JSON.parse(localStorage.getItem(STORAGE_KEY)); return Array.isArray(reports) ? reports : []; } catch (error) { return []; }
        };
        const saveReports = (reports) => {
            try { localStorage.setItem(STORAGE_KEY, JSON.stringify(reports)); return true; } catch (error) { return false; }
        };
        const escapeHTML = (value) => String(value || "").replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);
        const normalizePhone = (value) => {
            let phone = String(value || "").replace(/\D/g, "");
            if (phone.startsWith("00")) phone = phone.slice(2);
            if (phone.startsWith("05") && phone.length === 10) phone = "966" + phone.slice(1);
            else if (phone.startsWith("5") && phone.length === 9) phone = "966" + phone;
            return /^\d{10,15}$/.test(phone) ? phone : "";
        };
        const formatDate = (value) => {
            if (!value) return "";
            const date = new Date(value + "T00:00:00");
            return Number.isNaN(date.getTime()) ? "" : new Intl.DateTimeFormat("ar-SA", { dateStyle: "medium" }).format(date);
        };

        function renderReports() {
            const query = search.value.trim().toLocaleLowerCase("ar");
            let reports = readReports().filter((report) => {
                const text = [report.title, report.location, report.description, report.reporterName, categoryNames[report.category]].join(" ").toLocaleLowerCase("ar");
                return (activeFilter === "all" || report.status === activeFilter) && (!query || text.includes(query));
            });
            reports.sort((a, b) => sort.value === "oldest" ? a.createdAt - b.createdAt : b.createdAt - a.createdAt);
            count.textContent = new Intl.NumberFormat("ar-SA").format(reports.length);
            if (!reports.length) {
                const filtered = query || activeFilter !== "all";
                grid.innerHTML = `<div class="marketplace-empty"><h3>${filtered ? "ما لقيناش بلاغات مطابقة" : "لا توجد بلاغات حتى الآن"}</h3><p>${filtered ? "جرّب كلمة بحث أو تصنيفًا مختلفًا." : "أضف بلاغًا للمفقودات أو المعثورات لمساعدة زملائك."}</p></div>`;
                return;
            }
            grid.innerHTML = reports.map((report) => {
                        const phone = normalizePhone(report.contactNumber);
                        const isCall = report.contactMethod === "call";
                        const contactUrl = isCall ? `tel:+${phone}` : `https://wa.me/${phone}?text=${encodeURIComponent(`مرحبًا ${report.reporterName}، بخصوص بلاغك: ${report.title}`)}`;
            const contactClass = isCall ? "marketplace-call" : "marketplace-whatsapp";
            const contactLabel = isCall ? "اتصال" : "واتساب";
            const ownReport = user && String(report.ownerId) === String(user.id);
            const statusLabel = report.status === "found" ? "تم العثور عليه" : "مفقود";
            const statusClass = report.status === "found" ? "lost-found-status--found" : "lost-found-status--lost";
            return `<article class="marketplace-listing lost-found-card">
                <div class="marketplace-listing__top"><span class="lost-found-status ${statusClass}">${statusLabel}</span><span class="marketplace-tag">${escapeHTML(categoryNames[report.category] || "أخرى")}</span></div>
                <h3>${escapeHTML(report.title)}</h3>
                <div class="lost-found-card__details"><span><strong>المكان:</strong> ${escapeHTML(report.location)}</span><span><strong>التاريخ:</strong> ${escapeHTML(formatDate(report.eventDate))}</span></div>
                ${report.description ? `<p class="marketplace-listing__description">${escapeHTML(report.description)}</p>` : ""}
                <div class="marketplace-listing__footer"><div><small>صاحب البلاغ: ${escapeHTML(report.reporterName)}</small></div>
                ${ownReport ? `<button class="marketplace-delete" type="button" data-delete-report="${escapeHTML(report.id)}">حذف</button>` : phone ? `<a class="${contactClass}" href="${contactUrl}"${isCall ? "" : ' target="_blank" rel="noopener noreferrer"'} aria-label="${contactLabel} مع ${escapeHTML(report.reporterName)}"><svg viewbox="0 0 24 24" aria-hidden="true"><path d="M5 4h4l2 5-3 2a14 14 0 0 0 5 5l2-3 5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z"/></svg>${contactLabel}</a>` : ""}</div>
            </article>`;
        }).join("");
    }

    document.getElementById("openReportDialog").addEventListener("click", () => {
        message.textContent = "";
        dialog.showModal();
        form.elements.title.focus();
    });
    document.querySelector("[data-close-report-dialog]").addEventListener("click", () => dialog.close());
    dialog.addEventListener("keydown", (event) => {
        if (event.key === "Escape") { event.preventDefault(); dialog.close(); }
    });
    dialog.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); });
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const values = new FormData(form);
        const contactNumber = normalizePhone(values.get("contactNumber"));
        if (!contactNumber) {
            form.elements.contactNumber.setCustomValidity("أدخل رقمًا صحيحًا مع مفتاح الدولة، مثل 05xxxxxxxx للسعودية.");
            form.elements.contactNumber.reportValidity();
            return;
        }
        form.elements.contactNumber.setCustomValidity("");
        const report = {
            id: Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
            ownerId: String(user && user.id || "guest"),
            status: values.get("status"), category: values.get("category"),
            title: String(values.get("title") || "").trim().slice(0, 90),
            location: String(values.get("location") || "").trim().slice(0, 100),
            eventDate: String(values.get("eventDate") || ""),
            description: String(values.get("description") || "").trim().slice(0, 500),
            reporterName: String(values.get("reporterName") || "").trim().slice(0, 80),
            contactMethod: values.get("contactMethod"), contactNumber,
            createdAt: Date.now(),
        };
        const reports = readReports();
        reports.unshift(report);
        if (!saveReports(reports)) { message.textContent = "تعذر حفظ البلاغ؛ مساحة تخزين المتصفح ممتلئة."; return; }
        form.reset();
        form.elements.reporterName.value = String(user && user.name || "").slice(0, 80);
        pageMessage.textContent = "تم نشر البلاغ على هذا المتصفح.";
        dialog.close();
        renderReports();
    });
    form.elements.contactNumber.addEventListener("input", () => form.elements.contactNumber.setCustomValidity(""));
    search.addEventListener("input", renderReports);
    sort.addEventListener("change", renderReports);
    document.querySelectorAll("[data-report-filter]").forEach((button) => button.addEventListener("click", () => {
        activeFilter = button.dataset.reportFilter;
        document.querySelectorAll("[data-report-filter]").forEach((item) => {
            const selected = item === button;
            item.classList.toggle("is-active", selected);
            item.setAttribute("aria-pressed", String(selected));
        });
        renderReports();
    }));
    grid.addEventListener("click", (event) => {
        const button = event.target.closest("[data-delete-report]");
        if (!button) return;
        const ownerId = String(user && user.id || "guest");
        saveReports(readReports().filter((report) => report.id !== button.dataset.deleteReport || String(report.ownerId) !== ownerId));
        renderReports();
    });
    window.addEventListener("storage", (event) => { if (event.key === STORAGE_KEY) renderReports(); });
    renderReports();
})();