/* =====================================================================
   بيانات الموقع — عدّل هذا الملف فقط لتغيير:
    الكورسات (المواد) والترمات، الملفات، موضوعات الشرح، هيئة التدريس، فريق العمل.
   * المواد مأخوذة من جدول الخطة الدراسية (الترم 1-1 … 4-2).
   * الملفات: ضع ملف PDF في المسار المكتوب في url (مثال: files/cs/algorithms-summary.pdf).
    * موضوعات الشرح: تظهر داخل المادة مع رابط بحث لفيديوهات الشرح على YouTube.
   * أسماء الدكاترة والمعيدين هنا أسماء تجريبية — استبدلها بالأسماء الحقيقية.
   * staff -> teaches: أرقام (ids) المواد التي يدرّسها العضو، وهي تظهر تحت اسمه.
   ===================================================================== */
(function() {
    var GENERIC_TOPICS = ["مقدمة المادة وأهدافها", "المفاهيم الأساسية", "التطبيقات والأمثلة", "مراجعة وتمارين"];
    var ICON = { programming: "code", design: "design", data: "data", media: "media", security: "security", year1: "pc", year2: "tree", cs: "cs", ai: "ai", is: "is" };
    var LEVELS = { programming: "مبتدئ", design: "مبتدئ", data: "مبتدئ", media: "مبتدئ", security: "مبتدئ", year1: "مبتدئ", year2: "متوسط", cs: "متقدم", ai: "متقدم", is: "متقدم" };
    var PREFIX = { programming: "prog", design: "des", data: "dat", media: "med", security: "sec", year1: "y1", year2: "y2", cs: "cs", ai: "ai", is: "is" };

    /* مادة: C(المجموعة, الاسم المختصر للملف, اسم المادة, [الوصف], [الساعات], [المواضيع], [المستوى], [الأيقونة]) */
    function C(page, slug, title, desc, hours, topics, level, icon) {
        topics = topics || GENERIC_TOPICS;
        return {
            id: PREFIX[page] + "-" + slug,
            group: page,
            title: title,
            desc: desc || "",
            hours: hours || null,
            icon: icon || ICON[page],
            level: level || LEVELS[page],
            topics: topics,
            files: [
                { title: "ملخص المحاضرات", type: "PDF", url: "files/" + page + "/" + slug + "-summary.pdf" },
                { title: "كتاب المادة", type: "PDF", url: "files/" + page + "/" + slug + "-book.pdf" },
                { title: "تمارين ونماذج امتحانات", type: "PDF", url: "files/" + page + "/" + slug + "-exercises.pdf" },
            ],
        };
    }

    /* ترم: T(عنوان الترم, [ مواد ]) */
    function T(title, courses, comingSoon) {
        return { title: title, courses: courses, comingSoon: !!comingSoon };
    }

    var pages = {
        programming: {
            icon: "code",
            label: "البرمجة",
            courses: [
                C("programming", "web", "تطوير واجهات الويب", "HTML • CSS • JavaScript", 15, ["أساسيات HTML", "تنسيق الصفحات بـ CSS", "JavaScript للمبتدئين", "مشروع ويب كامل"]),
                C("programming", "python", "بايثون للمبتدئين", "بناء البرامج من الصفر", 12, ["المتغيرات والأنواع", "الشروط والحلقات", "الدوال والمكتبات", "مشروع تطبيقي صغير"]),
                C("programming", "java", "مقدمة في لغة Java", "أساسيات البرمجة بلغة Java", 14, ["بنية البرنامج", "التحكم والحلقات", "الأصناف والكائنات", "مشروع صغير"]),
                C("programming", "django", "Django Framework", "بناء تطبيقات ويب بإطار Django", 16, ["أساسيات Django", "النماذج وقواعد البيانات", "القوالب والواجهات", "النشر والأمان"], "متوسط"),
                C("programming", "flutter", "تطوير تطبيقات الموبايل بـ Flutter", "ابنِ تطبيقات للأندرويد وiOS بكود واحد", 20, ["أساسيات Dart", "بناء الواجهات", "إدارة الحالة", "ربط التطبيق بالإنترنت"], "متوسط", "mobile"),
            ],
        },
        design: {
            icon: "design",
            label: "تصميم الجرافيك",
            courses: [
                C("design", "photoshop", "أساسيات Adobe Photoshop", "تعديل وتصميم الصور باحتراف", 8, ["واجهة البرنامج والطبقات", "التحديد والتعديل", "الألوان والفلاتر", "تصميم بوستر كامل"]),
                C("design", "illustrator", "Adobe Illustrator", "الرسم الاتجاهي وتصميم الشعارات", 10, ["أدوات الرسم", "الأشكال والمسارات", "تصميم شعار", "تجهيز الملفات للطباعة"], "متوسط"),
                C("design", "uiux", "تصميم واجهات المستخدم UI/UX", "من الفكرة إلى النموذج التفاعلي بـ Figma", 12, ["أساسيات تجربة المستخدم", "تخطيط الشاشات", "تصميم الواجهات", "النموذج التفاعلي"], "متوسط"),
                C("design", "design-basics", "أساسيات التصميم والألوان", "قواعد التكوين والألوان والخطوط", 6, ["عناصر التصميم", "نظرية الألوان", "الخطوط والنصوص", "التكوين والتوازن"]),
            ],
        },
        data: {
            icon: "data",
            label: "البيانات",
            courses: [
                C("data", "py-data", "تحليل البيانات باستخدام Python", "NumPy و Pandas من الصفر", 10, ["مكتبة NumPy", "مكتبة Pandas", "تنظيف البيانات", "الرسوم البيانية"], "متوسط"),
                C("data", "mysql", "MySQL من الصفر", "تصميم قواعد البيانات وكتابة الاستعلامات", 10, ["مفاهيم قواعد البيانات", "إنشاء الجداول", "الاستعلامات", "الربط بين الجداول"]),
                C("data", "excel", "Excel لتحليل البيانات", "الدوال والجداول المحورية", 8, ["الدوال الأساسية", "الجداول المحورية", "الرسوم البيانية", "لوحة معلومات"]),
                C("data", "powerbi", "Power BI ولوحات المعلومات", "عرض البيانات بصرياً واتخاذ القرار", 9, ["استيراد البيانات", "نمذجة البيانات", "التقارير والرسوم", "نشر لوحة معلومات"], "متوسط"),
            ],
        },
        media: {
            icon: "media",
            label: "المونتاج",
            courses: [
                C("media", "premiere", "مونتاج الفيديو باستخدام Premiere", "من القص إلى التصدير النهائي", 12, ["واجهة البرنامج", "القص والتركيب", "الصوت والمؤثرات", "التصدير"]),
                C("media", "aftereffects", "After Effects والموشن جرافيك", "تحريك النصوص والرسوم", 14, ["الطبقات والحركة", "تحريك النصوص", "المؤثرات البصرية", "مشروع موشن جرافيك"], "متوسط"),
                C("media", "content", "صناعة المحتوى المرئي", "التخطيط والتصوير والنشر", 6, ["الفكرة والسيناريو", "التصوير", "المونتاج السريع", "النشر والتحليل"]),
            ],
        },
        security: {
            icon: "security",
            label: "الأمن السيبراني",
            courses: [
                C("security", "sec-basics", "أساسيات الأمن السيبراني", "مفاهيم الحماية وأنواع التهديدات", 12, ["مفاهيم الأمن", "أنواع التهديدات", "أدوات الحماية", "السياسات والتوعية"]),
                C("security", "network-sec", "حماية الشبكات", "جدران الحماية وتأمين الأجهزة", 10, ["أساسيات الشبكات", "جدران الحماية", "تأمين الأجهزة", "المراقبة والتقارير"], "متوسط"),
                C("security", "ethical", "مدخل إلى اختبار الاختراق الأخلاقي", "منهجية اختبار الأمان بإذن وتوثيقه", 12, ["المنهجية والأخلاقيات", "جمع المعلومات", "تقييم الثغرات", "كتابة التقرير"], "متوسط"),
            ],
        },
        year1: {
            icon: "pc",
            label: "السنة الأولى",
            terms: [
                T("الترم الأول", [
                    C("year1", "history", "تاريخ الحوسبة"),
                    C("year1", "electronics", "الإلكترونيات"),
                    C("year1", "math1", "رياضيات 1"),
                    C("year1", "cs-basics", "أساسيات علوم الحاسب"),
                    C("year1", "english", "اللغة الإنجليزية"),
                    C("year1", "ethics", "الحاسبات والأخلاقيات"),
                    C("year1", "scientific-thinking", "التفكير العلمي"),
                ]),
                T("الترم الثاني", [
                    C("year1", "discrete", "الهياكل المتقطعة"),
                    C("year1", "computer-laws", "قوانين الحاسبات"),
                    C("year1", "math2", "رياضيات 2"),
                    C("year1", "prob1", "احتمالات وإحصاء 1"),
                    C("year1", "programming-basics", "أساسيات البرمجة"),
                    C("year1", "tech-writing", "الكتابة التقنية"),
                    C("year1", "org-behavior", "سلوكيات الهيئات"),
                ]),
            ],
        },
        year2: {
            icon: "tree",
            label: "السنة الثانية",
            terms: [
                T("الترم الأول", [
                    C("year2", "logic-design", "التصميم المنطقي"),
                    C("year2", "operations-research", "بحوث العمليات"),
                    C("year2", "prob2", "احتمالات وإحصاء 2"),
                    C("year2", "oop", "البرمجة الشيئية"),
                    C("year2", "project-mgmt", "إدارة المشروعات"),
                    C("year2", "networks1", "شبكات الحاسب 1"),
                ]),
                T("الترم الثاني", [
                    C("year2", "databases", "قواعد البيانات"),
                    C("year2", "physics", "الفيزياء"),
                    C("year2", "parallel", "البرمجة المتوازية"),
                    C("year2", "ds1", "هياكل البيانات 1"),
                    C("year2", "web-tech", "تكنولوجيا الويب"),
                    C("year2", "modeling", "النمذجة والمحاكاة"),
                ]),
            ],
        },
        cs: {
            icon: "cs",
            label: "علوم الحاسب",
            terms: [
                T("السنة الثالثة • الترم الأول", [
                    C("cs", "se", "هندسة البرمجيات"),
                    C("cs", "image-proc", "معالجة الصور"),
                    C("cs", "ai", "الذكاء الاصطناعي"),
                    C("cs", "ds2", "هياكل البيانات 2"),
                    C("cs", "algorithms", "تحليل وتنظيم الخوارزميات"),
                    C("cs", "os", "نظم التشغيل"),
                ]),
                T("السنة الثالثة • الترم الثاني", [
                    C("cs", "comp-arch", "بنية وتنظيم الحاسبات"),
                    C("cs", "field-training", "التدريب الميداني"),
                    C("cs", "cryptography", "التشفير"),
                    C("cs", "graphics", "الرسم بالحاسب"),
                    C("cs", "pl-concepts", "مفاهيم لغات الحاسب"),
                    C("cs", "visual-prog", "البرمجة المرئية"),
                ], true),
                T("السنة الرابعة • الترم الأول", [
                    C("cs", "theory", "نظرية الحاسبات"),
                    C("cs", "ml", "تعلم الآلة"),
                    C("cs", "knowledge-discovery", "اكتشاف المعرفة"),
                    C("cs", "mobile", "برمجة الأجهزة المحمولة"),
                    C("cs", "cloud", "الحوسبة السحابية"),
                    C("cs", "grad1", "مشروع التخرج"),
                ], true),
                T("السنة الرابعة • الترم الثاني", [
                    C("cs", "compilers", "المترجمات"),
                    C("cs", "fuzzy", "الحوسبة الضبابية"),
                    C("cs", "vision", "الرؤية بالحاسب"),
                    C("cs", "big-data", "معالجة البيانات الضخمة"),
                    C("cs", "nlp", "معالجة اللغات الطبيعية"),
                    C("cs", "grad2", "مشروع التخرج"),
                ], true),
            ],
        },
        ai: {
            icon: "ai",
            label: "الذكاء الاصطناعي",
            terms: [
                T("السنة الثالثة • الترم الأول", [
                    C("ai", "probabilistic-reasoning", "التفكير الاحتمالي"),
                    C("ai", "os", "نظم التشغيل"),
                    C("ai", "artificial-intelligence", "الذكاء الاصطناعي"),
                    C("ai", "algorithms", "تحليل وتنظيم الخوارزميات"),
                    C("ai", "data-science", "علوم البيانات"),
                    C("ai", "field-training", "التدريب الميداني"),
                ]),
                T("السنة الثالثة • الترم الثاني", [
                    C("ai", "cv", "الرؤية الحاسوبية", "تحليل الصور والفيديو", 9, ["معالجة الصور", "اكتشاف الحواف والميزات", "تصنيف الصور", "اكتشاف الكائنات"]),
                    C("ai", "nlp", "معالجة اللغات الطبيعية", "فهم النصوص العربية والإنجليزية", 8, ["معالجة النصوص", "تمثيل الكلمات", "نماذج اللغة", "تطبيقات على اللغة العربية"]),
                ], true),
                T("السنة الرابعة • الترم الأول", [], true),
                T("السنة الرابعة • الترم الثاني", [], true),
            ],
        },
        is: {
            icon: "is",
            label: "نظم المعلومات",
            terms: [
                T("السنة الثالثة • الترم الأول", [
                    C("is", "microcontrollers", "المتحكمات الدقيقة"),
                    C("is", "data-comm", "تراسل البيانات"),
                    C("is", "signals", "الإشارات والنظم"),
                    C("is", "field-training", "التدريب الميداني"),
                    C("is", "ai", "الذكاء الاصطناعي"),
                    C("is", "algorithms", "تحليل وتنظيم الخوارزميات"),
                    C("is", "os", "نظم التشغيل"),
                ]),
                T("السنة الثالثة • الترم الثاني", [
                    C("is", "comp-arch", "بنية وتنظيم الحاسبات"),
                    C("is", "graphics", "الرسم بالحاسب"),
                    C("is", "cryptography", "التشفير"),
                    C("is", "pattern1", "التعرف على الأنماط 1"),
                    C("is", "dsp", "معالجة الإشارات الرقمية"),
                    C("is", "networks2", "شبكات الحاسب 2"),
                ], true),
                T("السنة الرابعة • الترم الأول", [
                    C("is", "concurrent", "الحوسبة المتزامنة"),
                    C("is", "grad1", "مشروع التخرج"),
                    C("is", "embedded", "النظم المدمجة"),
                    C("is", "pattern2", "التعرف على الأنماط 2"),
                    C("is", "internet-protocols", "برمجة وبروتوكولات الإنترنت"),
                    C("is", "network-security", "تأمين شبكات الحاسبات"),
                ], true),
                T("السنة الرابعة • الترم الثاني", [
                    C("is", "robotics", "الإنسان الآلي"),
                    C("is", "grad2", "مشروع التخرج"),
                    C("is", "multimedia-mining", "التنقيب في الوسائط المتعددة"),
                    C("is", "speech", "معالجة الكلام"),
                    C("is", "telecom", "تكنولوجيا الاتصالات"),
                    C("is", "cybersecurity", "الأمن السيبراني"),
                ], true),
            ],
        },
    };

    var softwareEngineering = pages.cs.terms[0].courses.find(function(course) {
        return course.id === "cs-se";
    });
    softwareEngineering.files = softwareEngineering.files.filter(function(file) {
        return file.title !== "ملخص المحاضرات" && file.title !== "تمارين ونماذج امتحانات";
    });

    ["cs-image-proc", "cs-ai", "cs-ds2", "cs-algorithms"].forEach(function(courseId) {
        var course = pages.cs.terms[0].courses.find(function(item) {
            return item.id === courseId;
        });
        course.files = course.files.filter(function(file) {
            return file.title !== "ملخص المحاضرات" && file.title !== "تمارين ونماذج امتحانات";
        });
    });

    var dataStructures2 = pages.cs.terms[0].courses.find(function(course) {
        return course.id === "cs-ds2";
    });
    dataStructures2.files.push({ title: "هياكل البيانات 2 - الفصل الأول", type: "رابط Google Drive", url: "https://drive.google.com/drive/folders/1e8fCHgcFcTV_4MEm9XSZM8zOGC3ZgTv6", external: true }, { title: "هياكل البيانات 2 - المحاضرة 4", type: "رابط Google Drive", url: "https://drive.google.com/file/d/1IfzxKWhc6xSVDiusd5FFvC2BIKrxWqTI/view?usp=drive_link", external: true }, { title: "هياكل البيانات 2 - المحاضرة 2", type: "رابط Google Drive", url: "https://drive.google.com/file/d/1Q-p_TnlT66KB9mr42WPYX0WHAb46tuJa/view?usp=drive_link", external: true }, { title: "هياكل البيانات 2 - المحاضرة 3", type: "رابط Google Drive", url: "https://drive.google.com/file/d/1dNlSYHsjVTmGAJR7V4pLe0EHb19VkRIe/view?usp=drive_link", external: true }, { title: "هياكل البيانات 2 - Removed", type: "رابط Google Drive", url: "https://drive.google.com/file/d/1sk7s4hy4sYfiLktSPguiJixuAY4YlmLj/view?usp=drive_link", external: true }, { title: "هياكل البيانات 2 - الكتاب (صفحات 67-94)", type: "رابط Google Drive", url: "https://drive.google.com/file/d/1so6ev2K20d9qaAkhGN3zrwJtrRWbKyd6/view?usp=drive_link", external: true }, { title: "هياكل البيانات 2", type: "رابط Google Drive", url: "https://drive.google.com/file/d/1KfQ0cmiYvxt_3pZKP2rK4NtSpDoaMqWJ/view?usp=drive_link", external: true });
    dataStructures2.files.push({ title: "هياكل البيانات 2 - Overleaf package", type: "رابط Google Drive", url: "https://drive.google.com/file/d/1taXTrqg9YFVAM1uxM627NU3UAhLGCl7c/view?usp=drive_link", external: true });

    var csCourseFolders = {
        "cs-algorithms": "Algorithms Analysis",
        "cs-ai": "Artificial Intelligence",
        "cs-ds2": "Data Structures II",
        "cs-image-proc": "Image Processing",
        "cs-os": "Operating Systems I",
        "cs-se": "Software Engineering",
    };
    var csCourseFiles = {
        "cs-algorithms": `algorithms Book.pdf
Algorithms.pdf
Algorithm_questions.pdf
ch(4)_Algorithm.pdf
Data Structures and Algorithms (2).pdf
Exams.rar
Lab 1-1.pdf
Lab 2.pdf
Lab 3.pdf
Lab 4.pdf
Sheet algorithm.pdf
حل شابتر 4.docx
algorithms/algorithms/Heapsort.pdf
algorithms/algorithms/lecture 1-algorithms.pdf
algorithms/algorithms/Lecture 2_Algorithms.pdf
algorithms/algorithms/lecture 3 algorithms.pdf
algorithms/algorithms/Lecture 4 algorithms.pdf
algorithms/algorithms/Lecture 5 algorithms.pdf
algorithms/algorithms/Lecture 6-algorityms.pdf
algorithms/algorithms/Lecture 6-algorityms.ppt
algorithms/algorithms/lecture 7-algorithms.pdf
algorithms/algorithms/Priority Queues.pdf
algorithms/algorithms/Quicksort.pdf
algorithms/algorithms/كتاب.pdf
Exams/algorithm it-1.pdf
Exams/Algorithm كلية علوم-1.pdf
Exams/photo_2023-12-25_13-48-41.jpg
Exams/photo_2023-12-25_13-49-03.jpg
Exams/photo_2023-12-25_13-49-27.jpg
Exams/photo_2023-12-25_13-49-34.jpg
Exams/photo_2023-12-25_13-49-52.jpg
Exams/ميد algorithm cs-1.pdf
Exams/exam2022/photo_2023-12-29_00-02-04.jpg
Exams/exam2022/photo_2023-12-29_00-03-31.jpg
Exams/exam2022/photo_2023-12-29_00-03-36.jpg
Exams/exam2022/photo_2023-12-29_00-03-45.jpg
lectures/algorithms 3 .pdf
lectures/CHAPTER 2 Algorithms .pdf
lectures/Chapter 3  Algorithms.pdf
lectures/chapter 3 part 2.pdf
lectures/CHAPTER 4 Algorithms .pdf
lectures/Divide and Conquer part 2lect 7.pdf
lectures/Introduction To Algorithms lecture 1.pdf
lectures/Introduction To Algorithms lecture 1.pptx
sections/algorithm section 7.pdf
sections/algorithm section 8.pdf
sections/IMG-20251203-WA0013.jpg
sections/IMG-20251203-WA0014.jpg
sections/IMG-20251203-WA0015.jpg
sections/IMG-20251203-WA0016.jpg
sections/IMG-20251203-WA0017.jpg
sections/mamdoh Salah _ سكاشن algorithm.pdf
امتحانات al/Algo.pdf
امتحانات al/algorithm it.pdf
امتحانات al/Algorithm كلية علوم.pdf
امتحانات al/Algorithm_questions (1).pdf
امتحانات al/All exams of algorithm.pdf
امتحانات al/CamScanner ١١-١٦-٢٠٢٣ ٢٢.٢٦_2.pdf
امتحانات al/Final.docx
امتحانات al/Final.pdf
امتحانات al/prac-quiz1-sol.pdf
امتحانات al/ميد algorithm cs.pdf`,
        "cs-ai": `Ahlea - AI midterm.pdf
AI Book.pdf
AI Book_unlocked.pdf
AI IBM Book.pdf
ai.pdf
quiz1_review.pdf
Three_KNN_Problems.docx
Three_KNN_Problems.pdf
WhatsApp Image 2026-01-04 at 6.26.26 AM.jpeg
WhatsApp Image 2026-01-04 at 6.26.27 AM.jpeg
WhatsApp Image 2026-01-04 at 6.26.28 AM.jpeg
WhatsApp Image 2026-01-04 at 6.26.29 AM.jpeg
lectures/AI Lecture 1.pptx
lectures/quiz1_review.pdf
lectures/picture lec2/WhatsApp Image 2025-10-16 at 23.22.01_854e3408.jpg
lectures/picture lec2/WhatsApp Image 2025-10-16 at 23.22.01_fb9ab881.jpg
lectures/picture lec2/WhatsApp Image 2025-10-16 at 23.22.02_cf23db2b.jpg
lectures/picture lec2/WhatsApp Image 2025-10-16 at 23.22.02_d74c8da1.jpg
project/ai_task_ziad_and_fawy (1).ipynb
project/github_repos_2000.csv
sections/data.csv
sections/Data_Preprocessing_and_Analysis_Functions.pdf
sections/HeartAttack.csv
sections/Python Practice.pdf
sections/Python.pdf
sections/section 2-list-tuple.pdf
sections/section 4 ai.pdf
sections/section 5- student-scores.ipynb
sections/section 7- HeartAttack classification -part 1.ipynb
sections/Section5 - Student_Scores_Linear_Regression.pdf
sections/Setion 9- Breast_Cancer Classification.ipynb
sections/student_scores.csv
sections/New folder/J.ipynb
صور/WhatsApp Image 2025-11-04 at 23.01.32_aba26adf.jpg
صور/WhatsApp Image 2025-11-04 at 23.12.54_31b79689.jpg
صور/WhatsApp Image 2025-11-04 at 23.13.49_1e02af4f.jpg`,
        "cs-ds2": `Data structure 2 lec 2.pptx
Data Strucutre 2 Book.pdf
data strucutre 2.pdf
code/Task1BST Taha Mohammed Fawy.zip
code/Task2_Taha Mohammed Fawy.zip
code/fbn/main.cpp
code/Task1BST/main.cpp
code/Task2_Taha Mohammed Fawy/Task2_AVL Taha Mohammed Fawy/main.cpp
code/Task2_Taha Mohammed Fawy/Task2_Tree__Taha Mohammed Fawy/main.cpp
code/Task1BST/Task1BST.cbp
code/fbn/fbn.cbp
code/Task2_Taha Mohammed Fawy/Task2_Tree__Taha Mohammed Fawy/Task2_Tree__Taha Mohammed Fawy.cbp
code/Task2_Taha Mohammed Fawy/Task2_AVL Taha Mohammed Fawy/Task2_AVL.cbp
lectures/Chapter 1 data structure2.pdf
lectures/data structur2 les 4 AVL.pdf
lectures/Data structure 2 lec 2.pdf
lectures/Data structure 2 lec 3.pdf
lectures/Data Structures II (1)_removed.pdf
lectures/Data Strucutre 2 Book-67-94.pdf
lectures/Data_Structure_II_Overleaf_Package (1)_removed.pdf
lectures/WhatsApp Image 2025-10-22 at 10.30.41_6c7e5182.jpg`,
        "cs-image-proc": `Digital Image Processing.pdf
Image Processing Book.pdf
Image Processing _students.rar
Image Processing.zip
lectures.rar
WhatsApp Image 2025-11-19 at 19.46.34_df495d29.jpg
WhatsApp Image 2025-11-19 at 19.46.35_4b1fe90e.jpg
Image Processing/e-book.pdf
Image Processing/Revision.docx
Image Processing/Exames/Final 2023.pdf
Image Processing/Exames/Medterm.pdf
Image Processing/Exames/Quiz.pdf
Image Processing/Lecture #1/Image Processing Lecture#1.pdf
Image Processing/Lecture #2/Image Processing Lecture#2 Part_1.pdf
Image Processing/Lecture #2/Image Processing Lecture#2 Part_2.pdf
Image Processing/Lecture #2/Image Processing Lecture#2 Part_3.pdf
Image Processing/Lecture #3/Image Processing Lecture#3 Part_1.pdf
Image Processing/Lecture #3/Image Processing Lecture#3 Part_2.pdf
Image Processing/Lecture #4/Image Processing Lecture#4 Part_1.pdf
Image Processing/Lecture #4/Image Processing Lecture#4 Part_2.pdf
Image Processing/Lecture #4/Image Processing Lecture#4 Part_3.pdf
Image Processing/Lecture #5/Image Processing Lecture#5.pdf
Image Processing/Lecture #6/Image Processing Lecture#6 Part_1.pdf
Image Processing/Lecture #6/Image Processing Lecture#6 Part_2.pdf
Image Processing/Lecture #7/Image Compression-Lecture#7.pdf
Image Processing _students/compare between image preprocessing and image enhancement.docx
Image Processing _students/compare between spatial and frequency domain.docx
Image Processing _students/example - robert operator.docx
Image Processing _students/example prewitt operator.docx
Image Processing _students/Final Mideterm حكومى Image Processing.docx
Image Processing _students/Fundamental of Image Processing-Lecture##2.pdf
Image Processing _students/Fundamental of Image Processing-Lecture#2.pdf
Image Processing _students/Fundamentals of Spatial Filtering-Lecture#5.pdf
Image Processing _students/Image Compression-Lecture#7.pptx
Image Processing _students/Image Edge Detection Operators in Digital Image Processing.pptx
Image Processing _students/Image Enhancement in spatial domain-part2_lecture#4.pdf
Image Processing _students/Image Enhancement in spatial domain-part2_lecture#4.pptx
Image Processing _students/Image Enhancement-Lecture#3.pdf
Image Processing _students/Image Enhancement-Lecture#3.pptx
Image Processing _students/Image Processing-Lecture#1.pdf
Image Processing _students/image segmentation -part3.pptx
Image Processing _students/INTENSITY TRANSFORMATIONAND SPATIAL FILTERING-Lecture#2.pptx
Image Processing _students/Introduction to image Segmentation- part1.pdf
Image Processing _students/Introduction to image Segmentation-final# part1.pdf
Image Processing _students/Introduction to image Segmentation-final# part1.pptx
Image Processing _students/Modified - Fundamental image processing _Lecture#2.pptx
Image Processing _students/Order-Statistic (Nonlinear) Filters-Lecture#6.pdf
Image Processing _students/Order-Statistic (Nonlinear) Filters-Lecture-final#6.pdf
Image Processing _students/What are Sharpening Filters.docx
lecture/example - robert operator.docx
lecture/example prewitt operator.docx
lecture/Fundamental of Image Processing-Lecture#2.pdf
lecture/Fundamentals of Spatial Filtering-Lecture#5.pdf
lecture/Image Compression-Lecture#7.pdf
lecture/Image Edge Detection Operators in Digital Image Processing.pptx
lecture/Image Enhancement in spatial domain-part2_lecture#4.pdf
lecture/Image Enhancement-Lecture#3.pdf
lecture/Image Processing-Lecture#1.pdf
lecture/image segmentation -part3.pptx
lecture/Image segmentation- part2.pptx
lecture/Introduction to image Segmentation-final# part1.pptx
lecture/Order-Statistic (Nonlinear) Filters-Lecture-final#6.pdf
lecture/Prewitt  operator.docx
lecture/Robert example.docx
lectures/example - robert operator.docx
lectures/example prewitt operator.docx
lectures/Fundamental of Image Processing-Lecture#2.pdf
lectures/Fundamentals of Spatial Filtering-Lecture#5.pdf
lectures/Image Compression-Lecture#7.pdf
lectures/Image Edge Detection Operators in Digital Image Processing.pptx
lectures/Image Enhancement in spatial domain-part2_lecture#4.pdf
lectures/Image Enhancement-Lecture#3.pdf
lectures/Image Processing-Lecture#1.pdf
lectures/image segmentation -part3.pptx
lectures/Image segmentation- part2.pptx
lectures/Introduction to image Segmentation-final# part1.pptx
lectures/Order-Statistic (Nonlinear) Filters-Lecture-final#6.pdf
lectures/Prewitt  operator.docx
lectures/Robert example.docx
lectures/New folder/example - robert operator.docx
lectures/New folder/example prewitt operator.docx
lectures/New folder/Image Edge Detection Operators in Digital Image Processing.pptx
lectures/New folder/image segmentation -part3.pptx
lectures/New folder/Image segmentation- part2.pptx
lectures/New folder/Introduction to image Segmentation-final# part1.pptx
lectures/New folder/Prewitt  operator.docx
lectures/New folder/Robert example.docx
sections/download.jpg
sections/list2025.pdf
sections/lists in Python.pdf
sections/output.png
sections/pngg.png
sections/Python.pdf
sections/python.py
sections/section 5-image processing.ipynb
sections/section 6- image processing.ipynb
sections/section 7- image processing.ipynb
sections/Section 8- Image Processing.ipynb
sections/section3-image processing.ipynb
sections/section4 - image processing.ipynb
sections/New folder/img.py`,
        "cs-os": `Operating System 1.pdf
Operating System Book.pdf
OPerating System Concepts chapter 1 .pdf
OPerating System Concepts chapter 2 مترجم.pdf
OPerating System Concepts chapter 2.pdf
OPerating System Concepts-chapter (1) مترجم.pdf
Software Engineering Book.pdf
WhatsApp Image 2025-12-01 at 14.26.55_817006bb.jpg
أساسيات أوامر linux.pdf
lectures/ch1 - 01-30.pdf
lectures/ch1 - 1-19.pdf
lectures/OPerating System Concepts.pdf
sections/section 3.pdf
sections/section 4.pdf
sections/section 5.pdf
sections/section 6.pdf
sections/section 7.pdf
امتحانات/operating system mcq.docx
امتحانات/operating system.pdf
امتحانات/OS CH1 MCQs solved.pptx.pdf.PDF
امتحانات/OS Exams.pdf
امتحانات/OS_Solution_v3.pdf
امتحانات/حل فاينل os.pdf
امتحانات/فاينل +ميد د_سارة.pdf
امتحانات/فاينيل +ميد د_سامح.pdf
تلخيص/1752330685552.pdf
تلخيص/All_C#_Basic_maked by_Tharwat_Abdulhamed_250829_001643.pdf
تلخيص/Chapter1-OS.pdf
تلخيص/Chapter2-OS.pdf
تلخيص/Chapter3-OS.pdf
تلخيص/Chapter4-OS.pdf
تلخيص/CPU Scheduling (4).pdf
تلخيص/CPU Scheduling.pdf
تلخيص/Deadlock (2).pdf
تلخيص/Deadlock.pdf
تلخيص/Introduction os.pdf
تلخيص/Memory Management (1).pdf
تلخيص/OS Structure .pdf
تلخيص/Process Synchronization & Semaphora.pdf
تلخيص/Process Synchronization .pdf
تلخيص/Processes.pdf
تلخيص/Threads.pdf`,
        "cs-se": `answer30q.docx
Answers.pdf
Qbankforstudent.pdf
Software Engineering Book.pdf
Software Engineering.pdf
software engineering.rar
Software_Engineering_Exam_QA.pdf
Software_Engineering_Final_Exam_1-30.pdf
projects/Results  Rating Page and Competition Page.docx
software engineering/4_Requirements.pdf
software engineering/ch1_introduction.ppt
software engineering/Software Eng 1.pptx
software engineering/Software Eng 2.pdf
software engineering/Software Engineering, 9th Edition.pdf
software engineering/SRS_DeliveryApp.pdf
software engineering/software engineering/4_Requirements.pdf
software engineering/software engineering/ch1_introduction.ppt
software engineering/software engineering/Software Eng 1.pptx
software engineering/software engineering/Software Eng 2.pdf
software engineering/software engineering/Software Engineering, 9th Edition.pdf
software engineering/software engineering/Software Engineering.pdf`,
    };

    Object.keys(csCourseFiles).forEach(function(courseId) {
        var course;
        pages.cs.terms.some(function(term) {
            course = term.courses.find(function(item) { return item.id === courseId; });
            return !!course;
        });
        if (!course) return;
        course.files = course.files.filter(function(file) { return file.external; });
        csCourseFiles[courseId].split("\n").forEach(function(relativePath) {
            var fullPath = csCourseFolders[courseId] + "/" + relativePath;
            var extension = relativePath.slice(relativePath.lastIndexOf(".")).toLowerCase();
            course.files.push({
                title: relativePath.split("/").join(" / ").replace(/\.[^.]+$/, ""),
                type: extension.slice(1).toUpperCase(),
                url: "files/cs/" + fullPath.split("/").map(encodeURIComponent).join("/"),
                direct: extension !== ".pdf",
            });
        });
    });

    var yearCourseFolders = {
        "y1-org-behavior": { page: "year1", path: "السلوك التنظيمي" },
        "y1-discrete": { page: "year1", path: "ديسكريت" },
        "y1-computer-laws": { page: "year1", path: "قانون الحاسب" },
        "y1-tech-writing": { page: "year1", path: "كتابه تقنيه" },
        "y2-project-mgmt": { page: "year2", path: "اداره مشروعات" },
        "y2-oop": { page: "year2", path: "البرمجه الشيئيه" },
        "y2-operations-research": { page: "year2", path: "بحوث عمليه" },
        "y2-databases": { page: "year2", path: "قواعد البيانات" },
        "y2-networks1": { page: "year2", path: "نتيورك" },
        "y2-modeling": { page: "year2", path: "نمذجه ومحاكاه" },
    };
    var yearCourseFiles = {
        "y1-org-behavior": `IMG-20250403-WA0006.jpg
IMG-20250403-WA0007.jpg
IMG-20250403-WA0008.jpg
IMG-20250428-WA0118.jpg
IMG-20250428-WA0119.jpg
IMG-20250428-WA0120.jpg
Organizational Behavior محاضرة 1.pptx
Task for Organization Behavior.pdf
المرفق.pdf
بنك أسئلة -سلوك تنظيمي.pdf
بنك اسئلة  للفاينل.pdf
حل اسئلة كتاب سلوك الهيئات.pdf
سلوك الهيئات اهلية ميد.pdf
‎⁨فاينل السلوك⁩.pdf`,
        "y1-discrete": `DM-Course-1.pdf
DM-Course-2.pdf
DM-Course-3.pdf
DM-Course-4.pdf
DM-Course-5.pdf
نسخة من mamdoh Salah_Discrete Definitions-1.pdf
الشابتر  الثاني/L3_ Introduction of proofs .pdf
الشابتر  الثاني/Lecture 2-2 (1).pdf
الشابتر الاول/L1.pdf
الشابتر الاول/Lecture 2-2 (1).pdf
الشابتر التالت/Basic Structures, set.pdf
الشابتر الخامس/Number theory (1).pdf
الشابتر الخامس/Number theory 2.pdf
امتحانات سابقه/1.jpeg
امتحانات سابقه/2.jpeg
امتحانات سابقه/3.jpeg
امتحانات سابقه/4.jpeg
امتحانات سابقه/WhatsApp Image 2025-05-20 at 11.24.21 PM.jpeg
امتحانات سابقه/WhatsApp Image 2025-05-20 at 11.24.22 PM.jpeg
امتحانات سابقه/WhatsApp Image 2025-05-20 at 11.24.23 PM.jpeg
امتحانات سابقه/WhatsApp Image 2025-05-20 at 11.24.24 PM.jpeg
امتحانات سابقه/WhatsApp Image 2025-05-20 at 6.40.14 PM.jpeg
امتحانات سابقه/الميد.jpeg`,
        "y1-computer-laws": `Ch 6.pdf
Ch 7.pdf
Kitty❤️😺.pdf
Lecture 1 2025.pdf
Lecture 2.pdf
Lecture 3.pdf
Lecture 4.pdf
Lecture 6.pdf
mamdoh Salah ch1 CL.pdf
mamdoh Salah ch2 CL.pdf
mamdoh Salah قوانين الحاسب .pdf
pdf24_converted.pdf
اسئله السليدات_merged.pdf
اسئله.pdf
تلخيص الشابتر التاني قانون الحاسب (الجزء الثاني).pdf
تلخيص الشابتر الثالث.pdf
تلخيص الشابتر الثاني (الجزء الاول).pdf
قوانين الحاسب.pdf
قوانين الحاسبات_unlocked_removed.pdf
ملخص شامل للفصل الأول (الجزء الاول).pdf
ملخص قوي ومبسط للفصل الأول (الجزء الثاني).pdf`,
        "y1-tech-writing": `ch 1 .. technical.pdf
ch 2 .. technical (1).pdf
image (1).jpeg
image (2).jpeg
image (3).jpeg
image (4).jpeg
image.jpeg
PDF_1748136094143.pdf
technical_writing_ch1_to_ch3.pdf
امتحان سنه سابقه اهليه كتابه تقنيه.pdf
تلخيص اماني لتجنب الدور التاني.pdf
تلخيص محاضره دكتور همام ٣ رمضان.pdf
محاضره دكتور همام ٢٤ فبراير.pdf
📘 Technical Writing.pdf
الاسلايد الاول/1. The basics of Technical Writing.pdf
الاسلايد الاول/chapter 1.pdf
الاسلايد الاول/TechnicalWritingChapter1.pdf
الاسلايد الاول/📘 الملف الشامل لمادة الكتابة التقنية.pdf
الاسلايد التاسع/9. Mistakes to Avoid in Technical Writing.pdf
الاسلايد التالت/3. The Technical Writing Process.pdf
الاسلايد التاني/2. The Basics of Technical Writing.pdf
الاسلايد الرابع/4. The Technical Writing Process.pdf`,
        "y2-project-mgmt": `11.pptx
12.pdf
13.docx
15.pdf
16.pdf
19.pptx
2.pptx
20.pdf
24.pptx
26.pdf
27.pdf
28.pdf
29.pdf
3.pdf
4.pptx
5.pptx
6.pdf
7.pdf
8.pptx
9.pdf
١.pdf`,
        "y2-oop": `Lecture1_CPP_Fundamentals.pptx
Lecture2_Classes_Objects.pptx
Lecture3_Abstraction.pptx
Lecture5_Inheritance_Polymorphism.pptx
الأكواد OOP.pdf`,
        "y2-operations-research": `OR (1).pdf
OR_2026_L1.pdf
Lectures/book.pdf
Lectures/L1 part 1.pdf
Lectures/L1 part 2.pdf
Sections/section 1 dia.pdf
Sections/section 1 shaimaa.pdf
Sections/section 2 dia .pdf
Sections/section 2,3 shaima.pdf
Sections/section 4 shaima.pdf
Sections/section 5 shaima.pdf`,
        "y2-databases": `Database DrIbrahim.pdf
DataBase.pdf`,
        "y2-networks1": `Chapter 1 Part_2-38.pptx
networks.pdf
ناس بتشرح Computer Network.pdf
نتورك اول ٣ شباتر.pdf
نسخة من نتورك اول ٣ شباتر.pdf
Lectures/book.pdf
Lectures/CHAPTER 1 Networks 1     .pdf
Lectures/CHAPTER 1 Networks 1   .pptx
Sections/Section2 .pdf
Sections/Section3.pdf
Sections/Section_1  .pdf
Sections/Section_1 [1].pptx`,
        "y2-modeling": `Chapter 1 Modeling Summary.pdf
Lecture1.pdf
MCQ Ch1.pdf
MCQ Ch2.pdf
MCQ Ch3.pdf
Modeling (Ch1 + Ch2 ).pdf
Modeling Final1.pdf
The_Simulation_Blueprint.pdf
كتاب modeling and simulation - Copy.pdf`,
    };
    Object.keys(yearCourseFiles).forEach(function(courseId) {
        var config = yearCourseFolders[courseId];
        var course;
        pages[config.page].terms.some(function(term) {
            course = term.courses.find(function(item) { return item.id === courseId; });
            return !!course;
        });
        if (!course) return;
        course.files = course.files.filter(function(file) { return file.external; });
        yearCourseFiles[courseId].split("\n").forEach(function(relativePath) {
            var fullPath = "files/" + config.page + "/" + config.path + "/" + relativePath;
            var extension = relativePath.slice(relativePath.lastIndexOf(".")).toLowerCase();
            course.files.push({
                title: relativePath.split("/").join(" / ").replace(/\.[^.]+$/, ""),
                type: extension.slice(1).toUpperCase(),
                url: fullPath.split("/").map(encodeURIComponent).join("/"),
                direct: extension !== ".pdf",
            });
        });
    });

    /* يجمع مواد كل الترمات في page.courses ويضيف اسم الترم لكل مادة */
    Object.keys(pages).forEach(function(k) {
        var p = pages[k];
        if (!p.terms) return;
        p.courses = [];
        p.terms.forEach(function(t) {
            if (t.comingSoon) return;
            t.courses.forEach(function(c) {
                c.term = t.title;
                if (!c.desc) c.desc = p.label + " • " + t.title;
                p.courses.push(c);
            });
        });
    });

    window.AHLIA_DATA = {
        pages: pages,

        /* ---------------- الأفلام التقنية (movies.html) ----------------
           video: ضع رابط مصدر مرخّص أو ملفك أنت (يوتيوب/Vimeo أو ملف mp4) ليظهر زر «شاهد» */
        movies: {
            "sections": [{
                    "id": "movies",
                    "title": "أفلام الهكر والتكنولوجيا"
                },
                {
                    "id": "series",
                    "title": "مسلسلات البرمجة والكمبيوتر"
                },
                {
                    "id": "documentaries",
                    "title": "وثائقيات التكنولوجيا والإنترنت"
                },
                {
                    "id": "cybersecurity",
                    "title": "أفلام الأمن السيبراني"
                }
            ],
            "items": [{
                    "id": "m1",
                    "section": "movies",
                    "kind": "فيلم",
                    "title": "The Social Network",
                    "desc": "فيلم درامي يروي قصة تأسيس فيسبوك من منظور طلابي تقني، يظهر التحديات البرمجية والاجتماعية والقانونية التي واجهها مارك زوكربيرج.",
                    "details": "فيلم درامي يروي قصة تأسيس فيسبوك من منظور طلابي تقني، يظهر التحديات البرمجية والاجتماعية والقانونية التي واجهها مارك زوكربيرج أثناء تطوير المنصة التي غيرت عالم التواصل الاجتماعي. الفيلم يسلط الضوء على كيفية تحويل فكرة بسيطة إلى منصة غيرت طريقة تواصل البشر حول العالم.",
                    "year": 2010,
                    "duration": "120 دقيقة",
                    "category": "internet",
                    "categoryLabel": "الإنترنت",
                    "poster": "https://m.media-amazon.com/images/M/MV5BOGUyZDUxZjEtMmIzMC00MzlmLTg4MGItZWJmMzBhZjE0Mjc1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
                    "video": "",
                    "rating": 4.2,
                    "ratingCount": 1250,
                    "director": "ديفيد فينشر",
                    "language": "الإنجليزية",
                    "tags": [
                        "PHP",
                        "MySQL",
                        "خوادم الويب",
                        "التواصل الاجتماعي"
                    ]
                },
                {
                    "id": "m2",
                    "section": "movies",
                    "kind": "فيلم",
                    "title": "Hackers",
                    "desc": "فيلم كلاسيكي عن ثقافة الهاكرز في التسعينيات، يظهر مجموعة من القراصنة المراهقين الموهوبين الذين يستخدمون مهاراتهم البرمجية.",
                    "details": "فيلم كلاسيكي عن ثقافة الهاكرز في التسعينيات، يظهر مجموعة من القراصنة المراهقين الموهوبين الذين يستخدمون مهاراتهم البرمجية لاكتشاف مؤامرة خبيثة تهدد الأمن العالمي. الفيلم يعكس ثقافة الهاكرز في بدايات الإنترنت ويظهر كيفية استخدام المعرفة التقنية للتأثير على العالم.",
                    "year": 1995,
                    "duration": "107 دقيقة",
                    "category": "hacking",
                    "categoryLabel": "الهكر والأمن",
                    "poster": "https://m.media-amazon.com/images/M/MV5BNmExMTkyYjItZTg0YS00NWYzLTkwMjItZWJiOWQ2M2ZkYjE4XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg",
                    "video": "https://vk.ru/video_ext.php?oid=848028866&id=456258334",
                    "rating": 3.8,
                    "ratingCount": 890,
                    "director": "إيان سوفتلي",
                    "language": "الإنجليزية",
                    "tags": [
                        "C Programming",
                        "Networking",
                        "Unix",
                        "Security"
                    ]
                },
                {
                    "id": "m3",
                    "section": "movies",
                    "kind": "فيلم",
                    "title": "The Imitation Game",
                    "desc": "فيلم سيرة ذاتية عن عالم الرياضيات آلان تورينج، أبو الذكاء الاصطناعي، وجهوده في فك شفرة آلة إنيغما الألمانية.",
                    "details": "فيلم سيرة ذاتية عن عالم الرياضيات آلان تورينج، أبو الذكاء الاصطناعي، وجهوده في فك شفرة آلة إنيغما الألمانية خلال الحرب العالمية الثانية باستخدام آلة حاسوبية مبكرة. الفيلم يسلط الضوء على مساهمات تورينج في مجال الحوسبة ونظرية الذكاء الاصطناعي.",
                    "year": 2014,
                    "duration": "114 دقيقة",
                    "category": "programming",
                    "categoryLabel": "البرمجة",
                    "poster": "https://m.media-amazon.com/images/M/MV5BOTgwMzFiMWYtZDhlNS00ODNkLWJiODAtZDVhNzgyNzJhYjQ4L2ltYWdlXkEyXkFqcGdeQXVyNzEzOTYxNTQ@._V1_.jpg",
                    "video": "https://vk.ru/video_ext.php?oid=848084895&id=456239017&hd=2",
                    "rating": 4.5,
                    "ratingCount": 2100,
                    "director": "مورتن تيلدوم",
                    "language": "الإنجليزية",
                    "tags": [
                        "التشفير",
                        "آلة تورينج",
                        "خوارزميات",
                        "الحوسبة"
                    ]
                }, {
                    "id": "m4",
                    "section": "movies",
                    "kind": "فيلم",
                    "title": "WarGames",
                    "desc": "فيلم تشويق تقني كلاسيكي عن مراهق موهوب في البرمجة يخترق نظام كمبيوتر عسكري أمريكي ويعتقد أنه يلعب لعبة حرب.",
                    "details": "فيلم تشويق تقني كلاسيكي عن مراهق موهوب في البرمجة يخترق نظام كمبيوتر عسكري أمريكي ويعتقد أنه يلعب لعبة حرب، لكنه يجد نفسه على شفا حرب نووية عالمية. الفيلم يعكس المخاوف المبكرة من الذكاء الاصطناعي والأمن السيبراني.",
                    "year": 1983,
                    "duration": "114 دقيقة",
                    "category": "hacking",
                    "categoryLabel": "الهكر والأمن",
                    "poster": "https://upload.wikimedia.org/wikipedia/en/2/29/Wargames.jpg",
                    "video": "https://vk.ru/video_ext.php?oid=848028866&id=456256624&hd=2",
                    "rating": 4,
                    "ratingCount": 760,
                    "director": "جون بادهام",
                    "language": "الإنجليزية",
                    "tags": [
                        "الوصول عن بعد",
                        "المحاكاة",
                        "أنظمة الدفاع",
                        "الأمن"
                    ]
                },
                {
                    "id": "m5",
                    "section": "movies",
                    "kind": "فيلم",
                    "title": "The Matrix",
                    "desc": "فيلم خيال علمي ثوري يتبع قصة مبرمج كمبيوتر يكتشف أن العالم الذي يعيش فيه هو محاكاة حاسوبية متطورة.",
                    "details": "فيلم خيال علمي ثوري يتبع قصة مبرمج كمبيوتر يكتشف أن العالم الذي يعيش فيه هو محاكاة حاسوبية متطورة، ويجد نفسه في قلب حرب بين البشر والذكاء الاصطناعي. الفيلم يطرح أسئلة فلسفية عميقة حول الواقع والحرية والتكنولوجيا.",
                    "year": 1999,
                    "duration": "136 دقيقة",
                    "category": "ai",
                    "categoryLabel": "الذكاء الاصطناعي",
                    "poster": "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg",
                    "video": "https://vk.ru/video_ext.php?oid=848028866&id=456259613",
                    "rating": 4.7,
                    "ratingCount": 3500,
                    "director": "الأختان واتشوسكي",
                    "language": "الإنجليزية",
                    "tags": [
                        "الذكاء الاصطناعي",
                        "المحاكاة",
                        "الواقع الافتراضي",
                        "الخيال العلمي"
                    ]
                },
                {
                    "id": "s1",
                    "section": "series",
                    "kind": "مسلسل",
                    "title": "Mr. Robot",
                    "desc": "مسلسل درامي تقني يتبع قصة إليوت ألديرسون، مهندس أمن معلومات يعاني من القلق الاجتماعي.",
                    "details": "مسلسل درامي تقني يتبع قصة إليوت ألديرسون، مهندس أمن معلومات يعاني من القلق الاجتماعي، ينضم إلى مجموعة قراصنة أناركيين تهدف إلى إسقاط أكبر conglomerate في العالم. المسلسل يقدم تصويرًا واقعيًا للقرصنة والأمن السيبراني.",
                    "year": 2015,
                    "duration": "4 مواسم",
                    "category": "hacking",
                    "categoryLabel": "الهكر والأمن",
                    "poster": "https://m.media-amazon.com/images/M/MV5BMzgxMmQxZjQtNDdmMC00MjRlLTk1MDEtZDcwNTdmOTg0YzA2XkEyXkFqcGdeQXVyMzQ2MDI5NjU@._V1_.jpg",
                    "video": "",
                    "rating": 4.8,
                    "ratingCount": 3200,
                    "director": "سام إسماعيل",
                    "language": "الإنجليزية",
                    "tags": [
                        "Linux",
                        "Python",
                        "Networking",
                        "Security",
                        "Ethical Hacking"
                    ]
                },
                {
                    "id": "d2",
                    "section": "documentaries",
                    "kind": "وثائقي",
                    "title": "The Great Hack",
                    "desc": "وثائقي استقصائي يفحم فضيحة كامبريدج أناليتيكا واستخدام بيانات فيسبوك.",
                    "details": "وثائقي استقصائي يفحم فضيحة كامبريدج أناليتيكا وكيف تم استخدام بيانات فيسبوك الشخصية للتأثير على الانتخابات واستفتاءات حول العالم من خلال استهداف ناخبين محددين. الوثائقي يكشف عن الثغرات في حماية البيانات الشخصية.",
                    "year": 2019,
                    "duration": "114 دقيقة",
                    "category": "hacking",
                    "categoryLabel": "الهكر والأمن",
                    "poster": "https://upload.wikimedia.org/wikipedia/ar/f/f8/%D8%A7%D9%84%D8%A7%D8%AE%D8%AA%D8%B1%D8%A7%D9%82_%D8%A7%D9%84%D9%83%D8%A8%D9%8A%D8%B1.jpeg",
                    "video": "",
                    "rating": 3.9,
                    "ratingCount": 820,
                    "director": "كاراه كوزيما وجيهن نوفاك",
                    "language": "الإنجليزية",
                    "tags": [
                        "تحليل البيانات",
                        "الخصوصية",
                        "الإعلانات",
                        "التأثير"
                    ]
                },
                {
                    "id": "d5",
                    "section": "documentaries",
                    "kind": "وثائقي",
                    "title": "الانترنت المظلم و القراصنة",
                    "desc": "وثائقيات :(الانترنت و الهاكرز)أخطر فلم وثائقي ممكن ان تراه",
                    "details": "وثائقيات :(الانترنت و الهاكرز)أخطر فلم وثائقي ممكن ان تراه عن الانترنت المظلم و القراصنة ......",
                    "year": 2015,
                    "duration": "52 دقيقة",
                    "category": "programming",
                    "categoryLabel": "البرمجة",
                    "poster": "cc.jpeg",
                    "video": "",
                    "rating": 4,
                    "ratingCount": 380,
                    "director": "-",
                    "language": "العربية",
                    "tags": [
                        "تطوير البرمجيات",
                        "حل المشكلات",
                        "الابتكار",
                        "التأثير المجتمعي"
                    ]
                },
                {
                    "id": "d6",
                    "section": "documentaries",
                    "kind": "وثائقي",
                    "title": "خفايا عالم صناعة أجهزة الرقابة والتجسس",
                    "desc": "تحقيقات الجزيرة | يكشف الوثائقي  تجار التجسس ",
                    "details": "ولجت وحدة التحقيقات بشبكة الجزيرة عالم صناعة أجهزة الرقابة والتجسس، حيث يكشف فيلم “تجار التجسس” عن معدات تجسس شديدة الاختراق، وصفقات تجسس غير قانونية بملايين الدولارات تمثل انتهاكا للقوانين الدولية.",
                    "year": 2017,
                    "duration": "47 دقيقة",
                    "category": "programming",
                    "categoryLabel": "البرمجة",
                    "poster": "aa.jpeg",
                    "video": "",
                    "rating": 4,
                    "ratingCount": 380,
                    "director": "-",
                    "language": "العربية",
                    "tags": [
                        "تطوير البرمجيات",
                        "حل المشكلات",
                        "الابتكار",
                        "التأثير المجتمعي"
                    ]
                },
                {
                    "id": "c1",
                    "section": "cybersecurity",
                    "kind": "فيلم",
                    "title": "Blackhat",
                    "desc": "فيلم تشويق تقني عن هاكر مفرج عنه من السجن للعمل مع السلطات.",
                    "details": "فيلم تشويق تقني عن هاكر مفرج عنه من السجن للعمل مع السلطات لمطاردة قرصان خطير يقف وراء هجمات إلكترونية متطورة تهدد البنية التحتية الحيوية حول العالم. الفيلم يسلط الضوء على التحديات الأمنية في العصر الرقمي.",
                    "year": 2015,
                    "duration": "133 دقيقة",
                    "category": "cybersecurity",
                    "categoryLabel": "الأمن السيبراني",
                    "poster": "https://upload.wikimedia.org/wikipedia/ar/7/79/Blackhat.jpg",
                    "video": "https://vkvideo.ru/video848077136_456239459?ref_domain=dal.ahwaktv.net",
                    "rating": 3.5,
                    "ratingCount": 720,
                    "director": "مايكل مان",
                    "language": "الإنجليزية",
                    "tags": [
                        "القرصنة",
                        "الأمن السيبراني",
                        "التحقيقات",
                        "البنية التحتية"
                    ]
                },
                {
                    "id": "c2",
                    "section": "cybersecurity",
                    "kind": "فيلم",
                    "title": "Who Am I",
                    "desc": "فيلم تشويق ألماني عن شاب موهوب في البرمجة ينضم إلى مجموعة قرصنة.",
                    "details": "فيلم تشويق ألماني عن شاب موهوب في البرمجة ينضم إلى مجموعة قرصنة ويصبح مشهورًا في المجتمع السري للهاكرز، لكنه يواجه معضلات أخلاقية عندما تتصاعد الأمور. الفيلم يستكشف ثقافة الهاكرز والأخلاقيات في العالم الرقمي.",
                    "year": 2014,
                    "duration": "102 دقيقة",
                    "category": "cybersecurity",
                    "categoryLabel": "الأمن السيبراني",
                    "poster": "Who Am I.jpg",
                    "video": "",
                    "rating": 4.3,
                    "ratingCount": 1100,
                    "director": "باران بو أودار",
                    "language": "الألمانية",
                    "tags": [
                        "ثقافة الهاكرز",
                        "الأمن المعلوماتي",
                        "البرمجة",
                        "الأخلاقيات"
                    ]
                }
            ]
        },

        /* ---------------- المسارات المهنية (paths.html) ----------------
           steps: ids المواد بالترتيب | advice: نصائح خبراء (اختياري) [{name, role, text}] */
        paths: [{
                "id": "web",
                "title": "مطوّر ويب",
                "desc": "من أساسيات البرمجة حتى بناء موقع كامل بقاعدة بيانات.",
                "icon": "code",
                "steps": [
                    "y1-programming-basics",
                    "prog-web",
                    "dat-mysql",
                    "prog-django",
                    "des-uiux"
                ],
                "advice": []
            },
            {
                "id": "mobile",
                "title": "مطوّر تطبيقات الموبايل",
                "desc": "ابنِ تطبيقات للأندرويد وiOS بداية من أساسيات الكائنات.",
                "icon": "mobile",
                "steps": [
                    "y1-programming-basics",
                    "y2-oop",
                    "prog-java",
                    "prog-flutter",
                    "des-uiux"
                ],
                "advice": []
            },
            {
                "id": "data",
                "title": "محلل بيانات",
                "desc": "اجمع البيانات ونظّفها وحلّلها واعرضها في لوحات معلومات.",
                "icon": "data",
                "steps": [
                    "dat-excel",
                    "dat-mysql",
                    "prog-python",
                    "dat-py-data",
                    "dat-powerbi"
                ],
                "advice": []
            },
            {
                "id": "ai",
                "title": "مهندس ذكاء اصطناعي",
                "desc": "ابدأ ببايثون وتحليل البيانات ثم تعرّف إلى الذكاء الاصطناعي ومفاهيمه.",
                "icon": "ai",
                "steps": [
                    "prog-python",
                    "dat-py-data",
                    "ai-algorithms",
                    "ai-data-science",
                    "ai-artificial-intelligence"
                ],
                "advice": []
            },
            {
                "id": "design",
                "title": "مصمم جرافيك وواجهات",
                "desc": "من أساسيات التصميم إلى الهوية البصرية وواجهات المستخدم.",
                "icon": "design",
                "steps": [
                    "des-design-basics",
                    "des-photoshop",
                    "des-illustrator",
                    "des-uiux"
                ],
                "advice": []
            },
            {
                "id": "media",
                "title": "مونتير وصانع محتوى",
                "desc": "خطّط للمحتوى وصوّره وأنتجه ثم أضف الحركة والمؤثرات.",
                "icon": "media",
                "steps": [
                    "des-design-basics",
                    "med-content",
                    "med-premiere",
                    "med-aftereffects"
                ],
                "advice": []
            },
            {
                "id": "security",
                "title": "متخصص أمن سيبراني",
                "desc": "ابدأ بأساسيات الشبكات ثم تعلم حمايتها واختبار الاختراق الأخلاقي.",
                "icon": "security",
                "steps": [
                    "y2-networks1",
                    "sec-sec-basics",
                    "sec-network-sec",
                    "sec-ethical"
                ],
                "advice": []
            },
            {
                "id": "network",
                "title": "مهندس شبكات",
                "desc": "من شبكات الحاسب إلى تراسل البيانات والإشارات وحماية الشبكات.",
                "icon": "is",
                "steps": [
                    "y2-networks1",
                    "is-data-comm",
                    "sec-network-sec",
                    "is-signals"
                ],
                "advice": []
            }
        ],

        /* ---------------- إعلانات المنصة (صفحة الترحيب) ---------------- */
        announcements: [{
                "id": "a1",
                "title": "مرحباً بك في أهلية أكاديمي",
                "text": "كل موادك من السنة الأولى حتى التخصص، بملفات وموضوعات شرح، في مكان واحد.",
                "tag": "المنصة"
            },
            {
                "id": "a2",
                "title": "جدولي: نظّم مواعيدك",
                "text": "أضف محاضراتك وسكاشنك وتسليماتك في جدول أسبوعي واحد، وشاهد مواعيد اليوم فور دخولك.",
                "tag": "ميزة جديدة"
            },
            {
                "id": "a3",
                "title": "اشترك في الكورسات وتابع تقدمك",
                "text": "من صفحة أي مادة اضغط «اشترك»، ثم تابع المحاضرات المكتملة من «كورساتي» واحصل على شهادة عند الإتمام.",
                "tag": "ميزة جديدة"
            },
            {
                "id": "a4",
                "title": "كورسات مهارية جديدة",
                "text": "أضفنا كورسات في البرمجة وتصميم الجرافيك والبيانات والمونتاج والأمن السيبراني.",
                "tag": "محتوى"
            }
        ],

        /* ---------------- نتائج استبيان الطلاب (الصفحة الرئيسية) ---------------- */
        survey: [{
                "q": "إيه المشاكل اللي بتواجه الطلبة في الدراسة؟",
                "answers": [{
                        "t": "سوء الإدارة والتنظيم والعشوائية بين المواعيد",
                        "p": 90
                    },
                    {
                        "t": "مفيش تكيفات",
                        "p": 5
                    },
                    {
                        "t": "مفيش مشاكل",
                        "p": 5
                    }
                ],
                "built": "جدولي لتنظيم المواعيد في مكان واحد، وكل مادة مرتبة حسب السنة والترم والتخصص.",
                "link": "schedule.html",
                "linkText": "افتح جدولي"
            },
            {
                "q": "إيه اللي متوقعه من المنصة؟",
                "answers": [{
                        "t": "تسهيل العملية بشكل أفضل",
                        "p": 70
                    },
                    {
                        "t": "حاجة تنظم العملية الدراسية مش ألف جروب وألف رسالة وكل جروب محتوى",
                        "p": 35
                    },
                    {
                        "t": "إضافة خانة الكورسات التي يمكن الاشتراك بها",
                        "p": 5
                    }
                ],
                "built": "المحتوى كله في منصة واحدة بدل الجروبات، مع الاشتراك في الكورسات ومتابعتها من «كورساتي».",
                "link": "mylearning.html",
                "linkText": "كورساتي"
            },
            {
                "q": "شايف المنصة ممكن تستفيد منها؟",
                "answers": [{
                        "t": "نعم",
                        "p": 100
                    },
                    {
                        "t": "لا",
                        "p": 0
                    }
                ],
                "built": "",
                "link": "",
                "linkText": ""
            },
            {
                "q": "إيه الحاجات اللي مش حابب تكون في المنصة؟",
                "answers": [{
                        "t": "الصعوبة بين التنقل والبطء بشكل عام",
                        "p": 70
                    },
                    {
                        "t": "إنها تكون زي أي منصة مفيهاش فكرة",
                        "p": 20
                    },
                    {
                        "t": "مفيش حاجة",
                        "p": 10
                    }
                ],
                "built": "صفحات خفيفة وسريعة، وقائمة واضحة، وبحث وتصفية في الكورسات، وأفلام ومسارات تميّز المنصة.",
                "link": "courses.html",
                "linkText": "جميع الكورسات"
            },
            {
                "q": "إيه الحاجات اللي محتاج ليها في المنصة في سوق العمل والكورسات؟",
                "answers": [{
                        "t": "مكان أقدر آخد كورسات منه وكورسات للأقسام",
                        "p": 50
                    },
                    {
                        "t": "ناس خبرة تكون أخدت كورسات معينة واشتغلت أو بتنصح بكورسات معينة حسب طبيعة شغلها وكل قسم له كورساته",
                        "p": 50
                    }
                ],
                "built": "كورسات مهارية لكل مجال، ومسارات مهنية مقترحة لكل قسم يمكن إضافة نصائح الخبراء إليها.",
                "link": "paths.html",
                "linkText": "المسارات المهنية"
            },
            {
                "q": "أي اقتراحات تفيد في تطوير المنصة؟",
                "answers": [{
                        "t": "يبقى عليها نتائج أعمال السنة أول بأول وكل حاجة محتاجها في التخصص تبقى موجودة ومفيش لخبطة ولا أقدر أخش على تخصص مش مسجله",
                        "p": 50
                    },
                    {
                        "t": "إنها تكون ويب وأبلكيشن في نفس الوقت",
                        "p": 40
                    },
                    {
                        "t": "إشعارات الرسائل",
                        "p": 10
                    }
                ],
                "built": "كل طالب يفتح سنته وتخصصه فقط، والمنصة تعمل كتطبيق قابل للتثبيت، وإعلانات المنصة تظهر في صفحة الترحيب.",
                "link": "",
                "linkText": ""
            }
        ],
        /* ---------------- هيئة التدريس (دكاترة ومعيدين) ----------------
           type: "doctor" أو "assistant" | teaches: ids المواد التي يدرّسها */
        staff: [
            { "name": "سامح محمد مصطفى سيد", "title": "مدرس", "type": "doctor", "teaches": ["y1-history", "y1-cs-basics", "y1-scientific-thinking", "y1-math2", "y1-tech-writing", "y1-english", "cs-os", "is-os", "ai-os"] },
            { "name": "د. هاني", "title": "دكتور", "type": "doctor", "teaches": ["y1-electronics"] },
            { "name": "احمد عطيتو عبد العاطى الحداد", "title": "مدرس", "type": "doctor", "teaches": ["y1-discrete", "y1-prob1", "y1-org-behavior"] },
            { "name": "د. احمد العربي", "title": "أستاذ دكتور", "type": "doctor", "teaches": ["y1-math1", "y1-computer-laws"] },
            { "name": "عماد", "title": "مدرس", "type": "doctor", "teaches": ["y1-programming-basics"] },
            { "name": "أ.د.م/ محمود حسب الله محمود علي", "title": "أستاذ دكتور", "type": "doctor", "teaches": ["y1-history", "y1-math1", "y1-scientific-thinking", "y1-computer-laws", "y1-prob1"] },
            { "name": "نهلة فتحى احمد عمران", "title": "مدرس مساعد", "type": "doctor", "teaches": ["y1-cs-basics", "y1-ethics"] },
            { "name": "همام عبد العال همام الشاذلى", "title": "دكتور", "type": "doctor", "teaches": ["y2-logic-design", "y2-prob2", "y2-project-mgmt", "y2-databases", "y2-parallel", "y2-web-tech"] },
            { "name": "بسمه احمد عبد الحافظ خلف الله", "title": "معيد", "type": "doctor", "teaches": ["y2-operations-research", "y2-oop", "y2-networks1", "y2-physics", "y2-ds1", "y2-modeling"] },
            { "name": "عبده مكى موسى حسين", "title": "مدرس مساعد", "type": "doctor", "teaches": ["y2-logic-design", "y2-prob2", "y2-project-mgmt", "y2-databases", "y2-parallel", "y2-web-tech"] },
            { "name": "ندا مبارك أحمد مبارك", "title": "معيد", "type": "assistant", "teaches": ["y2-operations-research", "y2-oop", "y2-networks1", "y2-physics", "y2-ds1", "y2-modeling"] },
            { "name": "رضا محمد أحمد علي", "title": "دكتور", "type": "doctor", "teaches": ["cs-se", "cs-cryptography", "cs-theory", "cs-cloud", "cs-vision"] },
            { "name": "هيلانه رافت تامر", "title": "أستاذ دكتور", "type": "doctor", "teaches": ["cs-image-proc", "cs-graphics", "cs-ml", "cs-grad1", "cs-big-data"] },
            { "name": "رندا محمد عبد الحميد محمد", "title": "أستاذ مساعد", "type": "doctor", "teaches": ["cs-os", "is-os", "ai-os", "cs-ai", "ai-artificial-intelligence", "is-ai", "is-cryptography", "is-concurrent", "is-internet-protocols", "is-multimedia-mining"] },
            { "name": "نغم احمد عبد المجيد محمد", "title": "دكتور", "type": "doctor", "teaches": ["cs-comp-arch", "cs-pl-concepts", "cs-knowledge-discovery", "cs-compilers", "cs-nlp"] },
            { "name": "عمرو مجدى ربيع", "title": "دكتور", "type": "doctor", "teaches": ["cs-ds2", "cs-field-training", "cs-visual-prog", "cs-mobile", "cs-fuzzy", "cs-grad2"] },
            { "name": "احمد حمادة محمد", "title": "معيد", "type": "doctor", "teaches": ["cs-se", "cs-ds2", "cs-comp-arch", "cs-graphics", "cs-theory", "cs-mobile", "cs-compilers", "cs-big-data"] },
            { "name": "امال احمد محمد راشد", "title": "مدرس مساعد", "type": "doctor", "teaches": ["cs-image-proc", "cs-field-training", "cs-pl-concepts", "cs-ml", "cs-cloud", "cs-fuzzy", "cs-nlp"] },
            { "name": "أحمد فاروق متولى سالم", "title": "معيد", "type": "doctor", "teaches": ["cs-cryptography", "cs-visual-prog", "cs-knowledge-discovery", "cs-grad1", "cs-vision", "cs-grad2"] },
            { "name": "عبدالرحمن عبدالنظير عبدالكريم محمود", "title": "أستاذ دكتور", "type": "doctor", "teaches": ["is-microcontrollers", "is-data-comm"] },
            { "name": "احمد جمعه", "title": "مدرس مساعد", "type": "assistant", "teaches": ["is-cryptography", "is-concurrent", "is-internet-protocols", "is-multimedia-mining"] },
            { "name": "سارة فراج عبد الغني", "title": "أستاذ مساعد", "type": "doctor", "teaches": [] },
            { "name": "محمد يوسف", "title": "مدرس مساعد", "type": "assistant", "teaches": ["is-cryptography", "is-concurrent", "is-internet-protocols", "is-multimedia-mining"] },
            { "name": "فاطمه", "title": "مدرس مساعد", "type": "assistant", "teaches": ["is-cryptography", "is-concurrent", "is-internet-protocols", "is-multimedia-mining", "cs-os", "is-os", "ai-os"] },
            { "name": "رحمه خالد", "title": "مدرس مساعد", "type": "assistant", "teaches": ["is-cryptography", "is-concurrent", "is-internet-protocols", "is-multimedia-mining"] },
            { "name": "يونس صلاح يونس عبدالوارث", "title": "دكتور", "type": "doctor", "teaches": ["is-pattern1", "is-grad1", "is-network-security", "is-speech"] },
            { "name": "اماني اسعد عبدالسميع احمد", "title": "أستاذ دكتور", "type": "doctor", "teaches": ["is-comp-arch", "is-dsp", "is-embedded", "is-robotics", "is-telecom"] },
        ],

        /* ---------------- فريق العمل (صفحة team.html) ----------------
           كل فريق له قسم مستقل في الصفحة. لإضافة فريق جديد انسخ كتلة { id, title ... } كاملة.
           * icon: review | design | code | dev | mgmt   (الأيقونة بجانب عنوان الفريق)
           * members -> name: الاسم | role: الدور | photo: مسار الصورة داخل مجلد team/
             (لو الصورة غير موجودة يظهر حرف من الاسم)
           * linkedin / facebook: رابط الحساب الكامل — اتركه "" لو مفيش حساب (يظهر الزر معطّلاً) */
        teams: [{
                id: "review",
                title: "فريق المراجعة",
                desc: "مراجعة المحتوى والتأكد من دقته",
                icon: "review",
                members: [],
            },
            {
                id: "design",
                title: "فريق التصميم",
                desc: "تصميم الواجهات وتجربة المستخدم",
                icon: "design",
                members: [],
            },
            {
                id: "code",
                title: "فريق البرمجة",
                desc: "بناء الموقع وبرمجة صفحاته",
                icon: "code",
                members: [],
            },
            {
                id: "dev",
                title: "فريق التطوير",
                desc: "تطوير المحتوى والميزات الجديدة",
                icon: "dev",
                members: [],
            },
            {
                id: "mgmt",
                title: "فريق الإدارة",
                desc: "تنظيم العمل والتنسيق بين الفرق",
                icon: "mgmt",
                members: [
                    { name: "احمد حاتم", role: "إدارة المشروع", photo: "Ahmed Hatem.jfif", linkedin: "https://www.linkedin.com/in/ahmed-hatem11/", facebook: "https://www.facebook.com/profile.php?id=100030429453407" },
                    { name: "احمد رمضان", role: "إدارة المشروع", photo: "Ahmed Ramadan.png", linkedin: "", facebook: "https://www.facebook.com/ahmed.ramadan.478181" },
                ],
            },
        ],
    };
})();