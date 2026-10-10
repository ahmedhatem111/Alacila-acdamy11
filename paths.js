(() => {
    "use strict";

    const data = window.AHLIA_DATA || {};
    const paths = data.paths || [];
    const courses = Object.values(data.pages || {}).flatMap((page) => page.courses || []);
    const coursesById = new Map(courses.map((course) => [course.id, course]));
    const $ = (id) => document.getElementById(id);
    let query = "";

    function createCourseStep(id, index) {
        const course = coursesById.get(id);
        const item = document.createElement("li");
        const number = document.createElement("span");
        number.className = "path-step__number";
        number.textContent = String(index + 1).padStart(2, "0");
        item.append(number);

        if (!course) {
            const missing = document.createElement("span");
            missing.className = "path-step__missing";
            missing.textContent = "سيُضاف هذا الكورس قريبًا";
            item.append(missing);
            return item;
        }

        const link = document.createElement("a");
        link.className = "path-step__link";
        link.href = `course.html?id=${encodeURIComponent(course.id)}`;
        link.textContent = course.title;
        item.append(link);
        return item;
    }

    function createPathCard(path) {
        const card = document.createElement("article");
        card.className = "card path-card";
        const header = document.createElement("div");
        header.className = "path-card__header";
        const icon = document.createElement("span");
        icon.className = "path-card__icon";
        icon.setAttribute("aria-hidden", "true");
        icon.textContent = path.title.slice(0, 1);
        const heading = document.createElement("div");
        const title = document.createElement("h3");
        title.textContent = path.title;
        const count = document.createElement("small");
        const availableCourses = (path.steps || []).filter((id) => coursesById.has(id)).length;
        count.textContent = `${availableCourses} كورسات`;
        heading.append(title, count);
        header.append(icon, heading);

        const description = document.createElement("p");
        description.className = "path-card__description";
        description.textContent = path.desc;
        const steps = document.createElement("ol");
        steps.className = "path-card__steps";
        (path.steps || []).forEach((id, index) => steps.append(createCourseStep(id, index)));
        card.append(header, description, steps);

        if (path.advice && path.advice.length) {
            const advice = document.createElement("details");
            advice.className = "path-advice";
            const summary = document.createElement("summary");
            summary.textContent = "نصائح أهل الخبرة";
            advice.append(summary);
            path.advice.forEach((tip) => {
                const quote = document.createElement("blockquote");
                quote.textContent = tip.text;
                const author = document.createElement("small");
                author.textContent = `${tip.name} · ${tip.role}`;
                advice.append(quote, author);
            });
            card.append(advice);
        }
        return card;
    }

    function render() {
        const filtered = paths.filter((path) => `${path.title} ${path.desc}`.toLowerCase().includes(query));
        $("pathsGrid").replaceChildren(...filtered.map(createPathCard));
        $("pathCount").textContent = `${filtered.length} مسارات`;
        $("pathsEmpty").hidden = filtered.length > 0;
    }

    $("pathSearch").addEventListener("input", (event) => {
        query = event.target.value.trim().toLowerCase();
        render();
    });
    render();
})();