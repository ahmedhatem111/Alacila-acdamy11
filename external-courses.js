(() => {
    const COURSES = [{
            provider: "harvard",
            providerName: "Harvard University · CS50",
            title: "مقدمة في علوم الحاسب · CS50x",
            description: "مدخل إلى التفكير الحاسوبي والخوارزميات وهياكل البيانات والبرمجة، مع تمارين ومشروع نهائي.",
            meta: ["مبتدئ", "OpenCourseWare"],
            url: "https://cs50.harvard.edu/x/",
            image: "https://cs50.harvard.edu/x/2026/assets/sanders.jpg",
            imageAlt: "صورة من صفحة Harvard CS50x",
            search: "harvard cs50x computer science علوم الحاسب التفكير الحاسوبي الخوارزميات البرمجة",
        },
        {
            provider: "harvard",
            providerName: "Harvard University · CS50",
            title: "البرمجة باستخدام Python · CS50P",
            description: "تعلم Python والاختبارات ومعالجة الأخطاء والكائنات والملفات من خلال مسائل عملية.",
            meta: ["مبتدئ", "OpenCourseWare"],
            url: "https://cs50.harvard.edu/python/",
            image: "https://prod-discovery.edx-cdn.org/media/course/image/2cc794d0-316d-42f7-bbfd-25c34e4cd5df-033e46d516c0.small.png",
            imageAlt: "صورة دورة CS50 Python على edX",
            search: "harvard cs50p python programming بايثون برمجة",
        },
        {
            provider: "harvard",
            providerName: "Harvard University · CS50",
            title: "الذكاء الاصطناعي باستخدام Python",
            description: "مقدمة في خوارزميات البحث والتعلم الآلي ونماذج اللغة باستخدام Python.",
            meta: ["متوسط", "يتطلب خبرة سابقة بـ Python"],
            url: "https://cs50.harvard.edu/ai/",
            image: "https://img.youtube.com/vi/qK46ET1xk2A/maxresdefault.jpg",
            imageAlt: "مقدمة دورة Harvard CS50 للذكاء الاصطناعي",
            search: "harvard cs50 ai artificial intelligence الذكاء الاصطناعي بايثون تعلم آلي",
        },
        {
            provider: "harvard",
            providerName: "Harvard University · CS50",
            title: "تطوير تطبيقات الويب · CS50W",
            description: "مشروعات عملية في Django وJavaScript وSQL وتصميم واجهات وتطبيقات الويب.",
            meta: ["متوسط", "يتطلب خبرة برمجية"],
            url: "https://cs50.harvard.edu/web/",
            image: "https://img.youtube.com/vi/24Kf3v7kZyE/maxresdefault.jpg",
            imageAlt: "مقدمة دورة Harvard CS50 لتطوير الويب",
            search: "harvard cs50w web development django javascript sql تطوير ويب",
        },
        {
            provider: "microsoft",
            providerName: "Microsoft Learn · Azure",
            title: "مفاهيم الحوسبة السحابية",
            description: "تعرف على نماذج السحابة وفوائدها وأنواع الخدمات ضمن مسار Azure التأسيسي.",
            meta: ["مبتدئ", "3 وحدات"],
            url: "https://learn.microsoft.com/training/paths/az-900-describe-cloud-concepts/",
            image: "https://learn.microsoft.com/training/achievements/microsoft-azure-fundamentals-describe-cloud-concepts-social.png",
            imageAlt: "شارة Microsoft Learn لمفاهيم الحوسبة السحابية",
            search: "microsoft azure cloud computing سحابة مفاهيم الحوسبة",
        },
        {
            provider: "microsoft",
            providerName: "Microsoft Learn · Azure",
            title: "بنية Azure وخدماتها",
            description: "تعرف على مكونات Azure وخدمات الحوسبة والشبكات والتخزين والهوية.",
            meta: ["مبتدئ", "5 وحدات"],
            url: "https://learn.microsoft.com/training/paths/azure-fundamentals-describe-azure-architecture-services/",
            image: "https://learn.microsoft.com/training/achievements/azure-fundamentals-describe-azure-architecture-services-social.png",
            imageAlt: "شارة Microsoft Learn لبنية Azure وخدماتها",
            search: "microsoft azure architecture services سحابة بنية خدمات",
        },
        {
            provider: "microsoft",
            providerName: "Microsoft Learn · Azure",
            title: "إدارة Azure والحوكمة",
            description: "أساسيات إدارة الموارد والتكلفة والمراقبة والحوكمة في Azure.",
            meta: ["مبتدئ", "4 وحدات"],
            url: "https://learn.microsoft.com/training/paths/describe-azure-management-governance/",
            image: "https://learn.microsoft.com/training/achievements/describe-azure-management-governance-social.png",
            imageAlt: "شارة Microsoft Learn لإدارة Azure والحوكمة",
            search: "microsoft azure management governance إدارة حوكمة موارد",
        },
        {
            provider: "microsoft",
            providerName: "Microsoft Learn · Azure",
            title: "مشروعات تطبيقية على Azure",
            description: "نفذ مشروعات إرشادية لاستضافة موقع وإدارة الموارد وتأمينها ومراقبتها.",
            meta: ["مبتدئ", "8 وحدات تطبيقية"],
            url: "https://learn.microsoft.com/training/paths/introduction-cloud-infrastructure-apply-azure-skills-guided-projects/",
            image: "https://learn.microsoft.com/en-us/training/achievements/describe-cloud-compute.svg",
            imageAlt: "شارة Microsoft Learn لمهارات Azure التطبيقية",
            search: "microsoft azure guided projects cloud مشروعات تطبيقية سحابة",
        },
        {
            provider: "cisco",
            providerName: "Cisco Networking Academy",
            title: "مقدمة في الأمن السيبراني",
            description: "مدخل إلى مفاهيم الأمن السيبراني والتهديدات الرقمية والمسارات المهنية.",
            meta: ["تمهيدي", "أمن سيبراني"],
            url: "https://www.netacad.com/courses/introduction-to-cybersecurity?courseLang=en-US",
            image: "https://www.netacad.com/p/ff9e491c-49be-4734-803e-a79e6e83dab1/7dc6e66c-935b-4905-b315-61b12ecb801a/image.png",
            imageAlt: "صورة دورة مقدمة في الأمن السيبراني من Cisco NetAcad",
            search: "cisco cybersecurity أمن سيبراني حماية تهديدات",
        },
        {
            provider: "cisco",
            providerName: "Cisco Networking Academy",
            title: "أساسيات الشبكات",
            description: "تعرف على مبادئ الشبكات ومكوناتها وطريقة انتقال البيانات بين الأجهزة.",
            meta: ["تمهيدي", "شبكات"],
            url: "https://www.netacad.com/courses/networking-basics?courseLang=en-US",
            image: "https://www.netacad.com/p/ff9e491c-49be-4734-803e-a79e6e83dab1/37d55b0f-dedd-41ca-a33d-65c01569816b/image.png",
            imageAlt: "صورة دورة أساسيات الشبكات من Cisco NetAcad",
            search: "cisco networking basics شبكات أساسيات بروتوكولات",
        },
        {
            provider: "cisco",
            providerName: "Cisco Networking Academy",
            title: "Python Essentials 1",
            description: "تدريب ذاتي على أساسيات Python وتحليل المشكلات وكتابة البرامج وتصحيحها.",
            meta: ["مبتدئ", "30 ساعة · مجاني"],
            url: "https://www.netacad.com/courses/python-essentials-1?courseLang=en-US",
            image: "https://www.netacad.com/p/ff9e491c-49be-4734-803e-a79e6e83dab1/407c875e-1b8b-11ec-9621-0242ac130003/image.png?ut=1784946708570",
            imageAlt: "غلاف دورة Python Essentials 1 من Cisco NetAcad",
            search: "cisco python essentials برمجة بايثون",
        },
        {
            provider: "google",
            providerName: "Google Skills · Google Cloud",
            title: "مقدمة في الذكاء الاصطناعي التوليدي",
            description: "شرح تمهيدي للذكاء الاصطناعي التوليدي واستخداماته والفرق بينه وبين تعلم الآلة التقليدي.",
            meta: ["تمهيدي", "45 دقيقة · شارة مهارة"],
            url: "https://www.skills.google/course_templates/536",
            image: "https://cdn.qwiklabs.com/lqJbxogu4tSLez1OvjDcIO8rwow6cPLwvrfIdmQLf6U%3D",
            imageAlt: "صورة دورة من Google Skills",
            search: "google cloud generative ai الذكاء الاصطناعي التوليدي",
        },
        {
            provider: "google",
            providerName: "Google Skills · Google Cloud",
            title: "استخراج الرؤى من بيانات BigQuery",
            description: "تدرب على استعلامات SQL وتحميل البيانات وبناء التقارير باستخدام BigQuery.",
            meta: ["تمهيدي", "45 دقيقة · شارة مهارة"],
            url: "https://www.skills.google/course_templates/623",
            image: "https://cdn.qwiklabs.com/lqJbxogu4tSLez1OvjDcIO8rwow6cPLwvrfIdmQLf6U%3D",
            imageAlt: "صورة دورة من Google Skills",
            search: "google bigquery sql data analytics بيانات تحليل",
        },
        {
            provider: "google",
            providerName: "Google Skills · Google Cloud",
            title: "مشاركة البيانات عبر Google Data Cloud",
            description: "تطبيقات عملية لمشاركة مجموعات البيانات وتحليلها باستخدام BigQuery.",
            meta: ["تمهيدي", "30 دقيقة · شارة مهارة"],
            url: "https://www.skills.google/course_templates/657",
            image: "https://cdn.qwiklabs.com/lqJbxogu4tSLez1OvjDcIO8rwow6cPLwvrfIdmQLf6U%3D",
            imageAlt: "صورة دورة من Google Skills",
            search: "google data cloud bigquery مشاركة بيانات",
        },
        {
            provider: "google",
            providerName: "Google Skills · Google Workspace",
            title: "أدوات التعاون والإنتاجية السحابية",
            description: "تدريب على Gmail وCalendar وMeet وDrive وSheets وAppSheet.",
            meta: ["تمهيدي", "30 دقيقة · شارة مهارة"],
            url: "https://www.skills.google/course_templates/676",
            image: "https://cdn.qwiklabs.com/lqJbxogu4tSLez1OvjDcIO8rwow6cPLwvrfIdmQLf6U%3D",
            imageAlt: "صورة دورة من Google Skills",
            search: "google workspace gmail calendar meet drive sheets appsheet تعاون",
        },
        {
            provider: "google",
            providerName: "Google Skills · Google Cloud",
            title: "نقل MySQL إلى Cloud SQL",
            description: "تطبيق عملي لترحيل قواعد بيانات MySQL إلى Cloud SQL باستخدام أدوات الترحيل.",
            meta: ["تمهيدي", "ساعة و15 دقيقة · شارة مهارة"],
            url: "https://www.skills.google/course_templates/629",
            image: "https://cdn.qwiklabs.com/lqJbxogu4tSLez1OvjDcIO8rwow6cPLwvrfIdmQLf6U%3D",
            imageAlt: "صورة دورة من Google Skills",
            search: "google mysql cloud sql database migration قواعد بيانات ترحيل",
        },
        {
            provider: "google",
            providerName: "Google Skills · Google Cloud",
            title: "إدارة Kubernetes على Google Cloud",
            description: "تعلم إدارة النشر ومراقبة التطبيقات وتصحيحها على Google Kubernetes Engine.",
            meta: ["متوسط", "30 دقيقة · شارة مهارة"],
            url: "https://www.skills.google/course_templates/783",
            image: "https://cdn.qwiklabs.com/lqJbxogu4tSLez1OvjDcIO8rwow6cPLwvrfIdmQLf6U%3D",
            imageAlt: "صورة دورة من Google Skills",
            search: "google kubernetes cloud gke containers حاويات",
        },
        {
            provider: "google",
            providerName: "Google Skills · Google Cloud",
            title: "إدارة البنية السحابية باستخدام Terraform",
            description: "مختبرات عملية لإطلاق موارد Google Cloud وإدارتها باستخدام Terraform.",
            meta: ["متوسط", "3 ساعات و45 دقيقة · شارة"],
            url: "https://www.skills.google/course_templates/746",
            image: "https://cdn.qwiklabs.com/lqJbxogu4tSLez1OvjDcIO8rwow6cPLwvrfIdmQLf6U%3D",
            imageAlt: "صورة دورة من Google Skills",
            search: "google cloud terraform infrastructure البنية السحابية",
        },
        {
            provider: "ibm",
            providerName: "IBM SkillsBuild",
            title: "البدء في الذكاء الاصطناعي التوليدي",
            description: "مسار تمهيدي من IBM للتعرف على الذكاء الاصطناعي التوليدي وتطبيقاته.",
            meta: ["ذكاء اصطناعي", "اعتماد رقمي"],
            url: "https://skills.yourlearning.ibm.com/activity/PLAN-BAEFCCAAD520",
            image: "https://skillsbuild.org/api/social-image/2026/07/CourseCatalog_FB_LinkedIn.v3.jpg",
            imageAlt: "صورة كتالوج IBM SkillsBuild الرسمي",
            search: "ibm skillsbuild generative ai الذكاء الاصطناعي التوليدي",
        },
        {
            provider: "ibm",
            providerName: "IBM SkillsBuild",
            title: "استكشف التقنيات الناشئة",
            description: "محتوى تعليمي من IBM للتعرف على التقنيات الحديثة واكتساب اعتماد رقمي.",
            meta: ["تقنيات حديثة", "اعتماد رقمي"],
            url: "https://skills.yourlearning.ibm.com/activity/PLAN-B5FC126AEBFB",
            image: "https://skillsbuild.org/api/social-image/2026/07/CourseCatalog_FB_LinkedIn.v3.jpg",
            imageAlt: "صورة كتالوج IBM SkillsBuild الرسمي",
            search: "ibm skillsbuild emerging technology technology التقنيات الناشئة",
        },
    ];

    function element(tag, className, text) {
        const node = document.createElement(tag);
        if (className) node.className = className;
        if (text) node.textContent = text;
        return node;
    }

    function createCard(course) {
        const card = element("article", "external-course-card");
        card.dataset.provider = course.provider;
        card.dataset.search = course.search;

        const imageWrap = element("div", "external-course-card__image-wrap");
        const image = element("img", "external-course-card__image");
        image.src = course.image;
        image.alt = course.imageAlt || course.title;
        image.loading = "lazy";
        image.decoding = "async";
        image.referrerPolicy = "no-referrer";
        image.addEventListener("error", () => {
            imageWrap.hidden = true;
        }, { once: true });
        imageWrap.append(image);
        card.append(imageWrap);

        const body = element("div", "external-course-card__body");
        const head = element("div", "external-course-card__head");
        head.append(element("span", "external-course-card__provider", course.providerName));
        body.append(head);
        body.append(element("h3", "", course.title));
        body.append(element("p", "", course.description));

        const metadata = element("div", "external-course-card__meta");
        course.meta.forEach((item) => metadata.append(element("span", "", item)));
        body.append(metadata);

        const providerLabel = course.providerName.split(" · ")[0];
        const link = element("a", "btn btn--outline btn--sm external-course-card__link", `افتح منصة ${providerLabel}`);
        link.href = course.url;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        body.append(link);
        card.append(body);
        return card;
    }

    window.AHLIA_EXTERNAL_COURSES = COURSES;
    window.AHLIA_EXTERNAL_COURSE_CARD = createCard;
})();