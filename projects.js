(() => {
    "use strict";

    const grid = document.getElementById("projectsGrid");
    const form = document.getElementById("projectForm");
    const dialog = document.getElementById("projectDialog");
    const imageInput = document.getElementById("projectImage");
    const status = document.getElementById("projectStatus");
    if (!grid || !form || !dialog || !imageInput) return;

    const DB_NAME = "ahlia-project-gallery";
    const DB_VERSION = 1;
    const MAX_UPLOAD_BYTES = 8 * 1024 * 1024;
    const MAX_STORED_BYTES = 1.5 * 1024 * 1024;
    const MAX_PROJECTS = 60;
    const user = (window.AhliaStore && window.AhliaStore.getUser()) || {};
    const ownerId = String(user.id || "guest");
    let projects = [];
    let preparedImage = null;
    let previewUrl = "";
    let cardImageUrls = [];
    let databasePromise;

    const byId = (id) => document.getElementById(id);

    function openDatabase() {
        if (databasePromise) return databasePromise;
        databasePromise = new Promise((resolve, reject) => {
            if (!window.indexedDB) {
                reject(new Error("هذا المتصفح لا يدعم حفظ صور المشاريع."));
                return;
            }
            const request = indexedDB.open(DB_NAME, DB_VERSION);
            request.onupgradeneeded = () => {
                const database = request.result;
                if (!database.objectStoreNames.contains("projects")) {
                    const store = database.createObjectStore("projects", { keyPath: "id" });
                    store.createIndex("createdAt", "createdAt");
                }
            };
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(new Error("تعذّر فتح مساحة حفظ المشاريع على هذا المتصفح."));
        });
        return databasePromise;
    }

    async function readProjects() {
        const database = await openDatabase();
        return new Promise((resolve, reject) => {
            const request = database.transaction("projects", "readonly").objectStore("projects").getAll();
            request.onsuccess = () => resolve(request.result.sort((a, b) => b.createdAt - a.createdAt));
            request.onerror = () => reject(new Error("تعذّر تحميل المشاريع المحفوظة."));
        });
    }

    async function saveProject(project) {
        const database = await openDatabase();
        return new Promise((resolve, reject) => {
            const transaction = database.transaction("projects", "readwrite");
            transaction.objectStore("projects").add(project);
            transaction.oncomplete = () => resolve();
            transaction.onerror = () => reject(new Error("تعذّر حفظ المشروع. قد تكون مساحة التخزين ممتلئة."));
            transaction.onabort = () => reject(new Error("أُوقف حفظ المشروع قبل اكتماله."));
        });
    }

    async function deleteProject(project) {
        if (project.ownerId !== ownerId) throw new Error("يمكن لصاحب المشاركة حذفها فقط.");
        const database = await openDatabase();
        return new Promise((resolve, reject) => {
            const transaction = database.transaction("projects", "readwrite");
            transaction.objectStore("projects").delete(project.id);
            transaction.oncomplete = () => resolve();
            transaction.onerror = () => reject(new Error("تعذّر حذف المشروع."));
        });
    }

    function make(tag, className, text) {
        const element = document.createElement(tag);
        if (className) element.className = className;
        if (text != null) element.textContent = text;
        return element;
    }

    function makeProjectCard(project) {
        const card = make("article", "project-card");
        const image = make("img", "project-card__image");
        image.src = URL.createObjectURL(project.imageBlob);
        image.alt = `صورة ${project.title}`;
        image.loading = "lazy";
        cardImageUrls.push(image.src);
        card.append(image);

        const content = make("div", "project-card__content");
        const meta = make("div", "project-card__meta");
        meta.append(
            make("span", `project-kind project-kind--${project.type}`, project.type === "achievement" ? "إنجاز" : "مشروع"),
            make("span", "project-card__date", new Date(project.createdAt).toLocaleDateString("ar-EG", { dateStyle: "medium" }))
        );
        content.append(meta, make("h3", "project-card__title", project.title));
        content.append(make("p", "project-card__idea", project.idea));
        if (project.details) content.append(make("p", "project-card__details", project.details));

        const footer = make("div", "project-card__footer");
        const author = make("span", "project-card__author", `بواسطة ${project.ownerName || "طالب"}`);
        const actions = make("div", "project-card__actions");
        const support = make("a", "btn btn--primary btn--sm", "ادعم المشروع على LinkedIn");
        support.href = project.linkedin;
        support.target = "_blank";
        support.rel = "noopener noreferrer";
        support.setAttribute("aria-label", `ادعم ${project.title} على LinkedIn`);
        actions.append(support);
        if (project.ownerId === ownerId) {
            const remove = make("button", "btn btn--outline btn--sm project-card__delete", "حذف");
            remove.type = "button";
            remove.dataset.deleteProject = project.id;
            actions.append(remove);
        }
        footer.append(author, actions);
        content.append(footer);
        card.append(content);
        return card;
    }

    function render() {
        const query = byId("projectSearch").value.trim().toLocaleLowerCase("ar-EG");
        const kind = byId("projectTypeFilter").value;
        const visible = projects.filter((project) => {
            const matchesKind = !kind || project.type === kind;
            const searchable = `${project.title} ${project.idea} ${project.details || ""} ${project.ownerName || ""}`.toLocaleLowerCase("ar-EG");
            return matchesKind && (!query || searchable.includes(query));
        });

        cardImageUrls.forEach((url) => URL.revokeObjectURL(url));
        cardImageUrls = [];
        grid.replaceChildren(...visible.map(makeProjectCard));
        byId("projectCount").textContent = `عرض ${visible.length} من ${projects.length} مشاركة`;
        byId("projectsEmpty").hidden = visible.length > 0;
    }

    async function refresh() {
        try {
            projects = await readProjects();
            render();
            if (status) status.textContent = "";
        } catch (error) {
            if (status) status.textContent = error.message;
            byId("projectCount").textContent = "تعذّر تحميل المعرض";
        }
    }

    function imageToBlob(file) {
        return new Promise((resolve, reject) => {
            const image = new Image();
            const sourceUrl = URL.createObjectURL(file);
            image.onload = () => {
                const scale = Math.min(1, 1440 / Math.max(image.naturalWidth, image.naturalHeight));
                const canvas = document.createElement("canvas");
                canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
                canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
                const context = canvas.getContext("2d");
                if (!context) {
                    URL.revokeObjectURL(sourceUrl);
                    reject(new Error("تعذّر تجهيز الصورة للرفع."));
                    return;
                }
                context.drawImage(image, 0, 0, canvas.width, canvas.height);
                URL.revokeObjectURL(sourceUrl);
                canvas.toBlob((blob) => {
                    if (!blob) {
                        reject(new Error("تعذّر ضغط الصورة. جرّب صورة بصيغة JPG أو PNG."));
                        return;
                    }
                    resolve({ blob, width: canvas.width, height: canvas.height });
                }, "image/webp", 0.82);
            };
            image.onerror = () => {
                URL.revokeObjectURL(sourceUrl);
                reject(new Error("تعذّر قراءة الصورة. جرّب ملف JPG أو PNG أو WebP."));
            };
            image.src = sourceUrl;
        });
    }

    function resetPreview() {
        if (previewUrl) URL.revokeObjectURL(previewUrl);
        previewUrl = "";
        preparedImage = null;
        byId("projectImagePreview").hidden = true;
        byId("projectPreviewImg").removeAttribute("src");
        byId("projectImageLabel").textContent = "اختر صورة من جهازك";
    }

    imageInput.addEventListener("change", async() => {
        resetPreview();
        const file = imageInput.files && imageInput.files[0];
        if (!file) return;
        byId("projectFormError").textContent = "";
        if (!file.type.startsWith("image/")) {
            byId("projectFormError").textContent = "اختر ملف صورة صالحًا.";
            imageInput.value = "";
            return;
        }
        if (file.size > MAX_UPLOAD_BYTES) {
            byId("projectFormError").textContent = "حجم الصورة أكبر من 8MB. اختر صورة أصغر.";
            imageInput.value = "";
            return;
        }
        byId("projectImageLabel").textContent = "جارٍ تجهيز الصورة...";
        try {
            preparedImage = await imageToBlob(file);
            if (preparedImage.blob.size > MAX_STORED_BYTES) {
                preparedImage = null;
                throw new Error("الصورة ما زالت كبيرة بعد الضغط. اختر صورة أصغر.");
            }
            previewUrl = URL.createObjectURL(preparedImage.blob);
            byId("projectPreviewImg").src = previewUrl;
            byId("projectImagePreview").hidden = false;
            byId("projectImageLabel").textContent = `${file.name} • ${(preparedImage.blob.size / 1024).toFixed(0)}KB بعد الضغط`;
        } catch (error) {
            byId("projectFormError").textContent = error.message;
            imageInput.value = "";
            byId("projectImageLabel").textContent = "اختر صورة من جهازك";
        }
    });

    byId("removeProjectImage").addEventListener("click", () => {
        imageInput.value = "";
        resetPreview();
    });
    byId("openProjectForm").addEventListener("click", () => {
        byId("projectFormError").textContent = "";
        dialog.showModal();
    });
    ["closeProjectForm", "cancelProjectForm"].forEach((id) => byId(id).addEventListener("click", () => dialog.close()));
    dialog.addEventListener("close", () => {
        form.reset();
        resetPreview();
        byId("projectFormError").textContent = "";
    });
    byId("projectSearch").addEventListener("input", render);
    byId("projectTypeFilter").addEventListener("change", render);

    form.addEventListener("submit", async(event) => {
        event.preventDefault();
        const values = Object.fromEntries(new FormData(form));
        const title = String(values.title || "").trim();
        const idea = String(values.idea || "").trim();
        const details = String(values.details || "").trim();
        let linkedin;
        try {
            linkedin = new URL(String(values.linkedin || "").trim());
        } catch (error) {
            byId("projectFormError").textContent = "أدخل رابط LinkedIn صحيحًا.";
            return;
        }
        if (linkedin.protocol !== "https:" || !(linkedin.hostname === "linkedin.com" || linkedin.hostname.endsWith(".linkedin.com"))) {
            byId("projectFormError").textContent = "رابط الدعم يجب أن يكون من LinkedIn.";
            return;
        }
        if (!title || !idea || !preparedImage) {
            byId("projectFormError").textContent = "أكمل اسم المشاركة وفكرتها واختر صورة.";
            return;
        }
        if (projects.length >= MAX_PROJECTS) {
            byId("projectFormError").textContent = "وصل المعرض إلى الحد الأقصى على هذا المتصفح.";
            return;
        }

        const submit = byId("submitProject");
        submit.disabled = true;
        submit.textContent = "جارٍ الحفظ...";
        byId("projectFormError").textContent = "";
        try {
            await saveProject({
                id: globalThis.crypto && crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`,
                type: values.type === "achievement" ? "achievement" : "project",
                title,
                idea,
                details,
                linkedin: linkedin.href,
                imageBlob: preparedImage.blob,
                ownerId,
                ownerName: String(user.name || "طالب").trim().slice(0, 80),
                createdAt: Date.now(),
            });
            dialog.close();
            await refresh();
            if (status) status.textContent = "تمت إضافة مشاركتك إلى معرض هذا المتصفح.";
        } catch (error) {
            byId("projectFormError").textContent = error.message;
        } finally {
            submit.disabled = false;
            submit.textContent = "نشر في المعرض";
        }
    });

    grid.addEventListener("click", async(event) => {
        const button = event.target.closest("[data-delete-project]");
        if (!button) return;
        const project = projects.find((item) => item.id === button.dataset.deleteProject);
        if (!project || project.ownerId !== ownerId) return;
        if (!confirm("حذف هذه المشاركة من هذا المتصفح؟")) return;
        try {
            await deleteProject(project);
            await refresh();
            if (status) status.textContent = "تم حذف المشاركة.";
        } catch (error) {
            if (status) status.textContent = error.message;
        }
    });

    refresh();
})();