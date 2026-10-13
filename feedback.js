(() => {
    "use strict";

    const STORAGE_KEY = "ahlia_feedback_entries_v1";
    const user = (() => {
        try { return JSON.parse(localStorage.getItem("ahlia_user")) || {}; } catch (error) { return {}; }
    })();
    const ownerId = String(user.email || user.name || user.id || "guest").trim().toLocaleLowerCase("ar");
    const form = document.getElementById("feedbackForm");
    const details = form.elements.details;
    const counter = document.getElementById("feedbackLength");
    const message = document.getElementById("feedbackMessage");
    const list = document.getElementById("feedbackList");
    const count = document.getElementById("feedbackCount");
    const historyDialog = document.getElementById("feedbackHistoryDialog");
    const openHistory = document.getElementById("openFeedbackHistory");
    const closeHistory = document.getElementById("closeFeedbackHistory");
    const areas = {
        platform: "الموقع وتجربة الاستخدام",
        courses: "الكورسات والمواد",
        files: "الملفات والمكتبة",
        account: "الحساب وتسجيل الدخول",
        other: "موضوع آخر",
    };
    const kinds = { suggestion: "اقتراح", complaint: "شكوى" };

    function readEntries() {
        try {
            const entries = JSON.parse(localStorage.getItem(STORAGE_KEY));
            return Array.isArray(entries) ? entries.filter((entry) => entry && typeof entry === "object") : [];
        } catch (error) {
            return [];
        }
    }

    function saveEntries(entries) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(entries.slice(0, 300)));
            return true;
        } catch (error) {
            return false;
        }
    }

    function makeElement(tag, className, text) {
        const element = document.createElement(tag);
        if (className) element.className = className;
        if (text != null) element.textContent = text;
        return element;
    }

    function formatDate(value) {
        const date = new Date(value);
        return Number.isNaN(date.getTime()) ? "" : new Intl.DateTimeFormat("ar-SA", { dateStyle: "medium" }).format(date);
    }

    function renderEntries() {
        const entries = readEntries()
            .filter((entry) => String(entry.ownerId) === ownerId)
            .sort((first, second) => second.createdAt - first.createdAt);
        count.textContent = new Intl.NumberFormat("ar-SA").format(entries.length);

        if (!entries.length) {
            const empty = makeElement("div", "feedback-empty");
            empty.append(makeElement("strong", "", "لا توجد رسائل محفوظة"));
            empty.append(makeElement("p", "", "ستجد رسائلك هنا بعد حفظها."));
            list.replaceChildren(empty);
            return;
        }

        list.replaceChildren(...entries.map((entry) => {
            const card = makeElement("article", "feedback-entry");
            const meta = makeElement("div", "feedback-entry__meta");
            meta.append(makeElement("span", `feedback-tag feedback-tag--${entry.kind === "complaint" ? "complaint" : "suggestion"}`, kinds[entry.kind] || "رسالة"));
            meta.append(makeElement("time", "", formatDate(entry.createdAt)));
            card.append(meta);
            card.append(makeElement("h3", "", entry.subject));
            card.append(makeElement("p", "feedback-entry__area", areas[entry.area] || areas.other));
            card.append(makeElement("p", "feedback-entry__details", entry.details));
            const remove = makeElement("button", "feedback-entry__delete", "حذف");
            remove.type = "button";
            remove.dataset.deleteFeedback = entry.id;
            remove.setAttribute("aria-label", `حذف رسالة: ${entry.subject}`);
            card.append(remove);
            return card;
        }));
    }

    function updateCounter() {
        counter.textContent = new Intl.NumberFormat("ar-SA").format(details.value.length);
    }

    details.addEventListener("input", updateCounter);
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        if (!form.reportValidity()) return;

        const values = new FormData(form);
        const entries = readEntries();
        entries.unshift({
            id: Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
            ownerId,
            kind: String(values.get("kind") || "suggestion"),
            area: String(values.get("area") || "other"),
            subject: String(values.get("subject") || "").trim().slice(0, 100),
            details: String(values.get("details") || "").trim().slice(0, 1200),
            replyEmail: String(values.get("replyEmail") || "").trim().slice(0, 254),
            createdAt: Date.now(),
        });

        if (!saveEntries(entries)) {
            message.textContent = "تعذر حفظ الرسالة؛ مساحة تخزين المتصفح غير متاحة.";
            message.classList.add("is-error");
            return;
        }

        form.reset();
        updateCounter();
        message.classList.remove("is-error");
        message.textContent = "حُفظت الرسالة على هذا الجهاز فقط، ولم تُرسل إلى إدارة الموقع.";
        renderEntries();
    });

    openHistory.addEventListener("click", () => {
        renderEntries();
        historyDialog.showModal();
        openHistory.setAttribute("aria-expanded", "true");
        closeHistory.focus();
    });
    closeHistory.addEventListener("click", () => historyDialog.close());
    historyDialog.addEventListener("click", (event) => {
        if (event.target === historyDialog) historyDialog.close();
    });
    historyDialog.addEventListener("close", () => {
        openHistory.setAttribute("aria-expanded", "false");
        openHistory.focus();
    });

    list.addEventListener("click", (event) => {
        const button = event.target.closest("[data-delete-feedback]");
        if (!button) return;
        const entries = readEntries().filter((entry) => !(entry.id === button.dataset.deleteFeedback && String(entry.ownerId) === ownerId));
        if (!saveEntries(entries)) {
            message.textContent = "تعذر حذف الرسالة من التخزين المحلي.";
            message.classList.add("is-error");
            return;
        }
        renderEntries();
    });

    window.addEventListener("storage", (event) => {
        if (event.key === STORAGE_KEY) renderEntries();
    });

    updateCounter();
    renderEntries();
})();