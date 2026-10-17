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
    var DRIVE_PAGE_FOLDERS = {
        ai: "179qQJac_SxechlM-Dmrkk23geGoAcgDX",
        cs: "16TqIljNt3fsxKjgPye_RpT0rdw9jQ_tT",
        data: "17DLet03RJ2uCbzpGP_6Nt3qkHVsezJpK",
        design: "1pUHQI3GJ1swJSf8Ssqswvk9bKM27260h",
        is: "19McDsc4jzdb1rQ-XHtoUdZ_ZT1QxlBX1",
        media: "1j23Pm_TNXPMMhCdfHhND5fZw1xlLSdss",
        programming: "193RhRTT1IiOQDWQMPJaJmArRBUQW_8DC",
        security: "1hncdDH_69Ci-7mxmM7kFw2Dav2uloW35",
        year1: "1FjfiateGORXd6lJKWM0u0LPuFaziOhE0",
        year2: "1hp6Kww9eJsNJIlaAslK2JxQ8se6oShbp",
    };
    var DRIVE_COURSE_FOLDERS = {
        "cs-algorithms": "1FgnXnE1U2MZD2aGNghI94BvHfIvQKpgK",
        "cs-ai": "1FHQ_cpA7cMw1UYTVKnQxki6CZdn25jVx",
        "cs-ds2": "1nDSEAxbzbsAGc145ajC-qTwngn5QK-el",
        "cs-image-proc": "1sKh0RbEn6MtfX2Q2JiXe9fjMqyx7KEdF",
        "cs-os": "18uFKalk-xBcuHaVJvjU4Qlo1mUQBOqfI",
        "cs-se": "1jJWtGxu5306XcmoTA_0wnBpeZEy1UVcA",
        "y1-computer-laws": "1LYbNaxtnQMNxmwn_-MeZIqzfnd6Y9EqW",
        "y1-discrete": "1Gi7Yr3KM7GOeIQhNoGjc_4piG6X1VRfj",
        "y1-org-behavior": "1Z2DPw82aFF9JiTLEQw770liaQx2UczJv",
        "y1-tech-writing": "1Bd6qty3AnDS6PZSdMrwPkFaXNUsOfn0D",
        "y2-databases": "1WkcafBLHTritLKlRyCmKIoCU5vNZZFqa",
        "y2-modeling": "12CDRHa-zy5ygg1G_-63-PP_4dZAkECSM",
        "y2-networks1": "1iho3jgSQ8p0RIqHY8hqdCetW-OmrwHLZ",
        "y2-oop": "1GP7RvYt2LhHVbQgfdJS3VsO0AtuWtTrD",
        "y2-operations-research": "1Qg0zZdrqyRdwkji6rkIQf9Fq5LiAm9g4",
        "y2-project-mgmt": "1_DyzGhre0YEUxq8BPoC7VBA7pAtjs7dn",
    };
    var DRIVE_COURSE_FILES = {
        "cs-algorithms": [
            ["حل شابتر 4.docx", "1USP6_3cXVZskBJPDmMMMkjFrPvbGyNiR"],
            ["Algorithm_questions.pdf", "1PuTPMO3ntZVNQHb9ZbZQ-b9gQPe9l7eR"],
            ["algorithms Book.pdf", "1Hmtbf6NUSOiYzH8Hu1DTHhEICP1u3cDC"],
            ["Algorithms.pdf", "1CCcrjH4QwFJX4w-WE0eZa7XYZS8KpKyo"],
            ["ch(4)_Algorithm.pdf", "1x6xpkt-gj_433m86p_TK1L0yX-uoceZW"],
            ["Data Structures and Algorithms (2).pdf", "1uwAWq8or9O-FlTtpxvYjIgICry13QHZG"],
            ["Exams.rar", "1LzP8jtY0bkyUG-Roq1OpXQ3jfx5NvMYZ"],
            ["Lab 1-1.pdf", "1yZPC1ii-t242fnsNvu1bOX6p4qK8C2Eg"],
            ["Lab 2.pdf", "1B6rZY4vkySctawAHO7qLGxEurxLG5ONE"],
            ["Lab 3.pdf", "1HIb97ZY2sKHM030tr-3sz20x72Nl3Mxz"],
            ["Lab 4.pdf", "18HgglBdQpl1lp14jKxOYqRMPyovY2YEA"],
            ["Sheet algorithm.pdf", "1dakYzYE4CkXV0fWTrDUPpqOj4qY7UQeN"],
            ["امتحانات al/ميد algorithm cs.pdf", "1EyY9jpq4ZhvioFi7ORx_xGC0nsS8aRl2"],
            ["امتحانات al/Algo.pdf", "1QjkC3J9XzEBxrGFSEbf70DEtdSTVphN8"],
            ["امتحانات al/Algorithm كلية علوم.pdf", "1HHJARIlF2zKtnvLP7uHmuEXgaSXN0DZt"],
            ["امتحانات al/algorithm it.pdf", "1J_zlqUi8KjB82wbt8AalN8HB-yGKtDNt"],
            ["امتحانات al/Algorithm_questions (1).pdf", "1ZhcBbpHoFqhShhWTQ7WG3NEMT3Cyu2bN"],
            ["امتحانات al/All exams of algorithm.pdf", "14Y5xznBjJcvVv_YGTplgBk0wLI3QUBd6"],
            ["امتحانات al/CamScanner ١١-١٦-٢٠٢٣ ٢٢.٢٦_2.pdf", "1qEszFVsAx-73HgwIzhteQkdvLYuYEwe6"],
            ["امتحانات al/Final.docx", "1lHl9Z6Oh6XRPxEOv2cLjfdJdF8jtmfJh"],
            ["امتحانات al/Final.pdf", "1hqYulyTKNRflcVYhIVq0xVO6iCq1ktb_"],
            ["امتحانات al/prac-quiz1-sol.pdf", "1sy5zQUbvpd2PkXSwPMYd-F9Web1sfp8R"],
            ["algorithms/algorithms/كتاب.pdf", "1OdpdPLrD0a6w5t9TenYpbRldVMsWf-ny"],
            ["algorithms/algorithms/Heapsort.pdf", "1vycUFBiHJQnzZp7XK1P8qYdsbdt6YutC"],
            ["algorithms/algorithms/lecture 1-algorithms.pdf", "1BDb671YUoU1Cwh8ZzR1-BVnEgefRmjxw"],
            ["algorithms/algorithms/Lecture 2_Algorithms.pdf", "1pcbWJeQZurfKO3grhld2Lik49VBEdj__"],
            ["algorithms/algorithms/lecture 3 algorithms.pdf", "1lFLmHZvwoIPrUGBnW5tLmL5LrwSRtuqk"],
            ["algorithms/algorithms/Lecture 4 algorithms.pdf", "1_ByjxzcgYATmepLZBPBKxmnS0cku3-U-"],
            ["algorithms/algorithms/Lecture 5 algorithms.pdf", "1ylIHeoIeoaoKgf2fSX1ie3q6geke5X76"],
            ["algorithms/algorithms/Lecture 6-algorityms.pdf", "1s_BrvYJqmc4oL5TlKZs1liir4GJdmtkG"],
            ["algorithms/algorithms/Lecture 6-algorityms.ppt", "1hg-0ERVTkzru970ANaO2lNZyBo1UXdLA"],
            ["algorithms/algorithms/lecture 7-algorithms.pdf", "1NFjxzd8dXp0b5VILK_4f4lFQaSE9I1vu"],
            ["algorithms/algorithms/Priority Queues.pdf", "1KZD7z4EQIQHiv0fPixYjU1PeW5U8newb"],
            ["algorithms/algorithms/Quicksort.pdf", "1iJR64z5Vin8a5MxpwMgLxuodHewQgms3"],
            ["Exams/ميد algorithm cs-1.pdf", "1sfXdLwmv68JgKbWFkhavg9twnqEfotou"],
            ["Exams/Algorithm كلية علوم-1.pdf", "1XBNzbCrowMD4jdkm4Ld2sCeOpH49wHx"],
            ["Exams/algorithm it-1.pdf", "17tp24fe1DHgOb_G-EpmS1kg9aLpQwvEc"],
            ["Exams/photo_2023-12-25_13-48-41.jpg", "1vJl162twigwPYdc9_P6oFfQe-CK-ctNe"],
            ["Exams/photo_2023-12-25_13-49-03.jpg", "1aXn9xSofEveQJmXSqGwh6aYoMfqpzIkf"],
            ["Exams/photo_2023-12-25_13-49-27.jpg", "1_d--dgh_xVxyZH_H9bJQPRKj08C-4J3C"],
            ["Exams/photo_2023-12-25_13-49-34.jpg", "1wo38z8e9sBkJHUp0d9EbkUjSUjJcKpG2"],
            ["Exams/photo_2023-12-25_13-49-52.jpg", "1E-duE9U6uPbo-rx2yBLK-JYUyW_yMb8n"],
            ["lectures/algorithms 3 .pdf", "1mIpTMyAxwp8egt-EnjNUjBOdCqB99RQu"],
            ["lectures/CHAPTER 2 Algorithms .pdf", "1yyyzTM8v1MMI09_41z3IFS6_qIep3R3J"],
            ["lectures/Chapter 3  Algorithms.pdf", "1RWva8eNRr_a_NT8l_sjwt_skrnR2Fvix"],
            ["lectures/chapter 3 part 2.pdf", "1VLCEtI2Un9dz6UyYQNnLbJ3wvL_gm1Zi"],
            ["lectures/CHAPTER 4 Algorithms .pdf", "1G7HpsjlM0bjAUo2-9tmZW7l6OGj6dIJj"],
            ["lectures/Divide and Conquer part 2lect 7.pdf", "1P7tqJvld3aN2R_nnIq8n1uQ1BXX0zvlL"],
            ["lectures/Introduction To Algorithms lecture 1.pdf", "1VceZthouV5penvW1el1FHDdP8SX5n_lf"],
            ["lectures/Introduction To Algorithms lecture 1.pptx", "1KwaBV8SgqzqWpFtb6HZIGZQY2kAD7iut"],
            ["sections/algorithm section 7.pdf", "1YzFIf94hH8pvA5T4RTnZx3gWQZrJdY7U"],
            ["sections/algorithm section 8.pdf", "1fXLMMGzSXVTsVRSj7yAJZROT2eCM6Wkr"],
            ["sections/IMG-20251203-WA0013.jpg", "1SDTv22K2AFKCZGvxhkdkslAECyrUAXcD"],
            ["sections/IMG-20251203-WA0014.jpg", "1Hu9qofsthgAQRb9C1BV9B5ZWyoyz4Ls4"],
            ["sections/IMG-20251203-WA0015.jpg", "19yvYdEzB1LfBltppTtAPlcv5hkBhLXZd"],
            ["sections/IMG-20251203-WA0016.jpg", "16pSYBeumv1JWsNPxEz-xxTupbmub_B8u"],
            ["sections/IMG-20251203-WA0017.jpg", "1MjbZKNUrBz2OzTwnMGksyVr9ewbHOFq0"],
            ["sections/mamdoh Salah _ سكاشن algorithm.pdf", "1yLTSe2Wz5TZU-itopraOot7yorrfXY0I"],
            ["Exams/exam2022/photo_2023-12-29_00-02-04.jpg", "17Wen2RwpqkJHa68--kMA0pB4CIkBjZnI"],
            ["Exams/exam2022/photo_2023-12-29_00-03-31.jpg", "1raml7wrviRIX6AXdXRCuFMlqJ9Yw1txm"],
            ["Exams/exam2022/photo_2023-12-29_00-03-36.jpg", "182UtxOScisczKBW1JIQJArGbpn-Mb2aX"],
            ["Exams/exam2022/photo_2023-12-29_00-03-45.jpg", "1vH2DJHwx1CDhn6nKfpO_AJRdMkwlw1ia"],
        ],
        "y1-org-behavior": [
            ["IMG-20250403-WA0006.jpg", "160qL78gHd_Pmc8trAbyfPvbY4dW2SEy3"],
            ["IMG-20250403-WA0007.jpg", "1Q8Nru38XsNtvk4qQ8q80_z2498L1w3y-"],
            ["IMG-20250403-WA0008.jpg", "1YHx59sRbK84cTM3cNYL49NmHq3aGJ31z"],
            ["IMG-20250428-WA0118.jpg", "14G9J-iFPqCaotmNX1EbwaCxYRMIB0Xjn"],
            ["IMG-20250428-WA0119.jpg", "15dSz4xYOgclEJffOZIRV-SFTbiBFqAYW"],
            ["IMG-20250428-WA0120.jpg", "1Izl_ztFatN66WHnJyLgwUpXG9ZPkjaa5"],
            ["Organizational Behavior محاضرة 1.pptx", "1MqptRlAUG3WZ5hc8sfZY5Nq5MSGaOjni"],
            ["Task for Organization Behavior.pdf", "1iZ_mWz7k4-5n_ISLoanztiqX17_3m2Ia"],
            ["المرفق.pdf", "1pl8q6XCP9Q6yhfyzh_3dnsqjGlft7oaU"],
            ["بنك أسئلة -سلوك تنظيمي.pdf", "1ps1otcJW1lBODiC9suoyKNJaLgNMTsQ0"],
            ["بنك اسئلة للفاينل.pdf", "1vLDWDDqGSG7BfzKCnrnRnqVsw8-Zzoig"],
            ["حل اسئلة كتاب سلوك الهيئات.pdf", "1W9Fzb847_NuIp4pfshheJQ6zZrjKKG75"],
            ["سلوك الهيئات اهلية ميد.pdf", "17a9GkOlU18tyG50BgbBn4X2BQp6cA-NI"],
            ["‎⁨فاينل السلوك⁩.pdf", "1S8byc9qOFXAnBH5gxz1a3ewvBKdI25vN"],
        ],
        "y1-discrete": [
            ["الشابتر الثاني/L3_ Introduction of proofs .pdf", "16Pzps3zEhTtdSl1gp_Z0zV5694dp2ZnK"],
            ["الشابتر الثاني/Lecture 2-2 (1).pdf", "1oy-HxIif2eyQypbt3vvwQx5E8uVFQQl0"],
            ["الشابتر الاول/L1.pdf", "1QexORxhSwkhjk9Ngd_4gDrY0Oa4A_kct"],
            ["الشابتر الاول/Lecture 2-2 (1).pdf", "1D70NRxE2ysow1FF6CxS-I_nWJDLFmD7q"],
            ["الشابتر التالت/Basic Structures, set.pdf", "1t3pEHKEd6e44G8gpoKb5IeOuAwLCppna"],
            ["الشابتر الخامس/Number theory (1).pdf", "1ZCivVbleNn2aosbtNj7EKlBNPyrjwABy"],
            ["الشابتر الخامس/Number theory 2.pdf", "1q3v1a7U8f3S3Nx3_icvQjqS9Dgh0YUGG"],
            ["امتحانات سابقه/1.jpeg", "1W1jPBeMqASRbbxXhLGXOyOK_r-O4JkqG"],
            ["امتحانات سابقه/2.jpeg", "18MBWGicRzVxkZvYxVf0CbAK2geiG6g9N"],
            ["امتحانات سابقه/3.jpeg", "1zJatxOvbmfflwhqguuU_-12bjdGghndz"],
            ["امتحانات سابقه/4.jpeg", "1TWQqcmIswPT0XhwnxSzNCdc3R7lm1RSA"],
            ["امتحانات سابقه/الميد.jpeg", "1Li0Jp4oHiCIQBwAUOjCWnFc-td4ARd4O"],
            ["امتحانات سابقه/WhatsApp Image 2025-05-20 at 6.40.14 PM.jpeg", "1bHlMLNoFBavkOf4JLpnYT3aWT4zNERHI"],
            ["امتحانات سابقه/WhatsApp Image 2025-05-20 at 11.24.21 PM.jpeg", "13Kzef6fHi4kgC8r5b77Ga5WK_Ejrs8ww"],
            ["امتحانات سابقه/WhatsApp Image 2025-05-20 at 11.24.22 PM.jpeg", "132jRzBScF0tqJ0A9-o1CFLdfmdQ9_612"],
            ["امتحانات سابقه/WhatsApp Image 2025-05-20 at 11.24.23 PM.jpeg", "1zgo8T5Tcc8wEmW8r11RCtjGyWNi9xksx"],
            ["امتحانات سابقه/WhatsApp Image 2025-05-20 at 11.24.24 PM.jpeg", "1VOFDjxEW-kESZP0AqTkqm1LvTc2TjV7B"],
            ["نسخة من mamdoh Salah_Discrete Definitions-1.pdf", "1Ik0WlaPAl1N2knGjlVeWai2DCHb1ALPE"],
            ["DM-Course-1.pdf", "1vPMdbrWSIm9XJkks0fkViI6hhgV-q-Nr"],
            ["DM-Course-2.pdf", "12n55g6ufnnyUTQR1xJRGvFumOVFtzJDJ"],
            ["DM-Course-3.pdf", "1jjBuki10lonT_3FRFb4SkDDWWHQGcFLy"],
            ["DM-Course-4.pdf", "1mlGl_WLR0b2n7UI_JKNrJkgVtLJuY4nl"],
            ["DM-Course-5.pdf", "1xFsG5IBvHVqt_mrg8hcTWZB2GFkZ5-MY"],
        ],
        "y1-computer-laws": [
            ["Ch 6.pdf", "1V1ri2WgytMYfwQh2jLCxC81W2py62JnR"],
            ["Ch 7.pdf", "10jI1WwUtr_rAssrDVMcErbAH7ufExRY3"],
            ["Kitty❤️😺.pdf", "165VOA35iyLoFhskJvnoDHFq756vSvSwh"],
            ["Lecture 1 2025.pdf", "1wwLbY60JH41rAaWMeiSiBBC780hkBJQv"],
            ["Lecture 2.pdf", "1bnBje7szEkMjX4CAl4JtWMkQuPuOYKkN"],
            ["Lecture 3.pdf", "1en2miNvJSUL3YF6AHAR7S7_H7d711mDt"],
            ["Lecture 4.pdf", "1lkhM0XTyUn541Qj5QPkhcqRVLl5tpkLp"],
            ["Lecture 6.pdf", "1WTzCyimINjDMOvphxbrdAd0Y32XgaVzS"],
            ["mamdoh Salah ch1 CL.pdf", "1DHIE6df8OpH8BapZY-b-OEwDa4d-Mdge"],
            ["mamdoh Salah ch2 CL.pdf", "13DaZ8vTVo7uxheTrtXZOGvdo4sODa9TZ"],
            ["mamdoh Salah قوانين الحاسب .pdf", "17Pcb_AYowdEdGk9GEo7qRzi_CRWLid8e"],
            ["pdf24_converted.pdf", "1BvcMYD6ZtmxTIhchIOddgoR7Lxss2CTs"],
            ["اسئله السليدات_merged.pdf", "1Wj_0q35d_Dv6mw4p6bJAIe2W71-hOozs"],
            ["اسئله.pdf", "1782JoID6Vb17eFuI7HIrmucqddIL16j1"],
            ["تلخيص الشابتر التاني قانون الحاسب (الجزء الثاني).pdf", "1YCfgQqbDT339ks9tU4EyYEbk5KYEyD4R"],
            ["تلخيص الشابتر الثالث.pdf", "1HDPaY56p8bN3IAXB_SDp09pQ00JhCYIF"],
            ["تلخيص الشابتر الثاني (الجزء الاول).pdf", "1OX13dSXK-SmGxttrRCd2IzeR-oivpXcf"],
            ["قوانين الحاسب.pdf", "1a4wqZ43_xASyGk8DOguxX133FeWnE6qH"],
            ["قوانين الحاسبات_unlocked_removed.pdf", "1YjjL0kipL9lSgGDoCKzbtIbIaZt3O3g2"],
            ["ملخص شامل للفصل الأول (الجزء الاول).pdf", "17dQPG9Gxk8HvCu6zq0ZGTswPrWGr2FcJ"],
            ["ملخص قوي ومبسط للفصل الأول (الجزء الثاني).pdf", "19BQjSOUa6lfzuGCeqoRzvLfEoEgjAF1Z"],
        ],
        "y1-tech-writing": [
            ["الاسلايد الاول/1. The basics of Technical Writing.pdf", "12EuJWgmNT8lFy8FIaCbyT6Igxqeqz088"],
            ["الاسلايد الاول/chapter 1.pdf", "1ZsDp9URceLyyv87VHyUgBzeWATMfiakI"],
            ["الاسلايد الاول/TechnicalWritingChapter1.pdf", "1BK2zpLMjYBUeiDoybBg3yT8YV819_WMC"],
            ["الاسلايد الاول/📘 الملف الشامل لمادة الكتابة التقنية.pdf", "1UmXyCCWEvs2qoTk0jeDVAsJTwdp1qW3q"],
            ["الاسلايد التاسع/9. Mistakes to Avoid in Technical Writing.pdf", "1GEVe-1GxG5YY-yyvfAIwtt5rvXPhkQAC"],
            ["الاسلايد التالت/3. The Technical Writing Process.pdf", "1Fieksi_SNl5ynwO_FLvOKuieaGfJ1NTM"],
            ["الاسلايد التاني/2. The Basics of Technical Writing.pdf", "1H6s5hxDxicIGz914yxlVqOvcWZNyU8hJ"],
            ["الاسلايد الرابع/4. The Technical Writing Process.pdf", "1aKusBogzAKqToQ0aUMiwRvZ9uu7qoLGd"],
            ["ch 1 .. technical.pdf", "1P_ZMjTWXUrZ9bqkz0nnyCFkfsV0bRD4q"],
            ["ch 2 .. technical (1).pdf", "1bGukuodJJ7cjT9QvaR3VsFA1QI39ovP6"],
            ["image (1).jpeg", "105GkesiZXBiVM_KMGxxS9ntpskzCs-VW"],
            ["image (2).jpeg", "15eDgWtkinU0inlFcgj-lQxuG0tqE3SFt"],
            ["image (3).jpeg", "18FxMXPZtCGH2yvOoUHsqeJNpv334D6nd"],
            ["image (4).jpeg", "1a8b_cTjSJ1DNa0lkuAtJ7CL8HVTwGhFG"],
            ["image.jpeg", "1rd9ypnLjPt8Q6fXpMFwcmgQa_6zCpDdP"],
            ["PDF_1748136094143.pdf", "1_Qk27xSrz-K1hFyl_T-0rmbPiJew9JS3"],
            ["technical_writing_ch1_to_ch3.pdf", "1GVEvj3m4_aUTU3gLOQYQk9LQI5sPNDOV"],
            ["امتحان سنه سابقه اهليه كتابه تقنيه.pdf", "1Uln3ZEHhcR3HSAZB7swqqIvx4BNWzqsW"],
            ["تلخيص اماني لتجنب الدور التاني.pdf", "1tZalDubLvJMlaiw-uBzhf2QmM0Hz5LNl"],
            ["تلخيص محاضره دكتور همام ٣ رمضان.pdf", "1vp9BnloqHsXNejN-df_tI4rxDr429CPF"],
            ["محاضره دكتور همام ٢٤ فبراير.pdf", "1ZDY9xeiE4aZjH-0Wc6HlZXfwijWw8bEs"],
            ["📘 Technical Writing.pdf", "1F--NTF1FNJgzgdy9-qIGtF8d3siUYN_D"],
        ],
        "y2-project-mgmt": [
            ["١.pdf", "1bdo_QtsGGh_YQmf3R2aq52wHNFx0yqjq"],
            ["2.pptx", "1aceNRwgDPT6tsSwYI_9Rss9xsoHfNQcf"],
            ["3.pdf", "178dFv0ZVJBswp_MmiEeF3eEuONorw-wK"],
            ["4.pptx", "1hr5jV3CYK77q4fjjcRQ0jN4vxcHKr3fy"],
            ["5.pptx", "1ImoR81ahPOkWFI83NfnifF4JIyrSsSRm"],
            ["6.pdf", "17ePXXGQbISuQeklu7P74SJy713omWtnb"],
            ["7.pdf", "1ZuTcwyXPPkugMmdkJ9c65lzY5K1xJjEn"],
            ["8.pptx", "1-gS6d4rrqUP8yMIM_vKH42wn9nvLTD-W"],
            ["9.pdf", "1L64_d1Iaj3wY_UMCnxClyVUGHmZoAwLO"],
            ["11.pptx", "1wCzo2w0av4TpXQXww1Hx4519Cx5oO7t8"],
            ["12.pdf", "18T5kRVP-qSSbQrD1FpTlN88jGRZZBPyn"],
            ["13.docx", "15NCSgsNx28YSEOw3HnmEumChLdEgcANO"],
            ["15.pdf", "1Fp8tz8l3JHEQYe_nq63oz23IY4PBObL5"],
            ["16.pdf", "1EWfY92XP5CaugtWx-pgJwOK39ErRjy3f"],
            ["19.pptx", "1YFeEsK4VZzrOQjismj6JmffdNYpoQyko"],
            ["20.pdf", "1tkcemTwJT0OknDQCVs-rnX6dVmaEND_4"],
        ],
        "y2-oop": [
            ["الأكواد OOP.pdf", "1mcR5F4Fk2Jr8GPo-JYOwOyCY_JzLbr4r"],
            ["Lecture1_CPP_Fundamentals.pptx", "178vWd_Oc580PqRTT0_22H2C4g_uvsIkp"],
            ["Lecture2_Classes_Objects.pptx", "1_KZ-zRyYf-qFZybB3WGMu2a6P82vLWXL"],
            ["Lecture3_Abstraction.pptx", "1r5JvNVkl44iAVm7yt3ixmVleUTVxi7q9"],
            ["Lecture5_Inheritance_Polymorphism.pptx", "1xsBKCZpIguK9CE2RHWc2bbtzuJwxiJzk"],
        ],
        "y2-operations-research": [
            ["Lectures/book.pdf", "1zNES1Ji-ByT2rzC5OTrr_pFaWuaTTDvH"],
            ["Lectures/L1 part 1.pdf", "1CBMSvQrjTlU6pkOKfrWxmgQH6K8h-fAq"],
            ["Lectures/L1 part 2.pdf", "1-FIyEOZLxA-ht3OPHh6bPChNVDtcX5un"],
            ["Sections/section 1 dia.pdf", "1KlmD0vI3dQ8S3m8rhhDR-yzeTZ0Bljd2"],
            ["Sections/section 1 shaimaa.pdf", "1_Kf3gcwBav-x-jVFkoNsb3ri66s5DVyE"],
            ["Sections/section 2 dia .pdf", "1dHPKfj8Jvx-S1cAl3HLkLM14y1FAwJ_D"],
            ["Sections/section 2,3 shaima.pdf", "1lbYSh24iEasNzPvCJmqJ_idtyTf99hrV"],
            ["Sections/section 4 shaima.pdf", "1rtVhTdSvGwSB5hUth8ytn_FjuqJa0CYG"],
            ["Sections/section 5 shaima.pdf", "1A67c3U_IVvG9CbQeGbC_PElzyfGv3Wtk"],
            ["OR (1).pdf", "1G-549qSY2rqqCcRBlJLJYNNRp4p-bYDw"],
            ["OR_2026_L1.pdf", "1qrLptQ40lJlU0j5BUFH8kYwHsIBmiYrY"],
        ],
        "y2-databases": [
            ["Database DrIbrahim.pdf", "1bp3FmJ9n15A8J-MooUWIajGyNtU4-SnQ"],
            ["DataBase.pdf", "1yIY7e7nSs1hg0tPUtfkcDfIbLtXPgSYH"],
        ],
        "y2-networks1": [
            ["Lectures/book.pdf", "12TysrpVhZj-M_-GrDgO0659DhZTYzt9n"],
            ["Lectures/CHAPTER 1 Networks 1     .pdf", "1zwhDIGVDa5CIqO9tXAUdDDuHsH9me6sg"],
            ["Lectures/CHAPTER 1 Networks 1   .pptx", "1PMMUpBq9kPoBNjKG3OokAwHG0dcA4TlP"],
            ["Sections/Section_1  .pdf", "1kmlTqVJWYWHNR-QndURWu1anrBi4lRO7"],
            ["Sections/Section_1 [1].pptx", "1kk2zPmCfhqAA04K3BXUmyIkaHxOghg4c"],
            ["Sections/Section2 .pdf", "1CnuyZiue-PCbzUYJAef5lKBRexM77INq"],
            ["Sections/Section3.pdf", "1yzIHHeSaScEOppJrLyVdEYBc9YZscJCg"],
            ["ناس بتشرح Computer Network.pdf", "1fYV3nAYE2qcaS_IXlskrujf0fNSEa3IH"],
            ["نتورك اول ٣ شباتر.pdf", "1FPV8W0mTaFZyvYLUgwTeT2uL4B72oTET"],
            ["نسخة من نتورك اول ٣ شباتر.pdf", "1gtkk6Ruz1hyf0QnVRX_xlkAbjzkihK6G"],
            ["Chapter 1 Part_2-38.pptx", "16QwzWOGrlgTD7KEarsg6PRFhef5PV_Wm"],
            ["networks.pdf", "1C2uhYuxVM-ydE8RLKd0WzCR4ObBabtzU"],
        ],
        "y2-modeling": [
            ["Chapter 1 Modeling Summary.pdf", "17FanZmOj85y5HYNBeKEeJH_9ftZSrFKx"],
            ["Lecture1.pdf", "1YxKIb1JuvGdjHoD1E4EPlauQt_rb_tsN"],
            ["MCQ Ch1.pdf", "1ec80swhPvm1xhHbtJxwmBMD6eDObkTul"],
            ["MCQ Ch2.pdf", "1_Ak1lxHGV7WH9llFz8P6wU3CPxubXloo"],
            ["MCQ Ch3.pdf", "1kbPP0CpgknbRq3GSbJDxumFKGMmDIzLI"],
            ["Modeling (Ch1 + Ch2 ).pdf", "1H48dEOLMfjEDICOu1qhTyc_NalplDhYn"],
            ["Modeling Final1.pdf", "1_v_Zqe5-jzyp_FiHs5J6BxKIBIezilYu"],
            ["The_Simulation_Blueprint.pdf", "1wbkYtqEpq74ZUivk7Rh4rMdPP34fSzRb"],
            ["كتاب modeling and simulation - Copy.pdf", "1E_jJEUTTVVudVIZusi4jOmtg8C5_Srp_"],
        ],
    };

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
            files: [],
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
                T("الفصل الدراسي الثالث", [
                    C("year2", "logic-design", "التصميم المنطقي"),
                    C("year2", "operations-research", "بحوث العمليات"),
                    C("year2", "prob2", "احتمالات وإحصاء 2"),
                    C("year2", "oop", "البرمجة الشيئية"),
                    C("year2", "project-mgmt", "إدارة المشروعات"),
                    C("year2", "networks1", "شبكات الحاسب 1"),
                ]),
                T("الفصل الدراسي الرابع", [
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

    Object.keys(pages).forEach(function(pageKey) {
        var page = pages[pageKey];
        var courses = page.courses || [];
        courses.forEach(function(course) {
            var driveFiles = DRIVE_COURSE_FILES[course.id];
            if (driveFiles) {
                var driveFilePaths = new Set(driveFiles.map(function(file) {
                    return file[0].toLocaleLowerCase();
                }));
                var localPrefix = csCourseFolders[course.id] ? "files/cs/" + csCourseFolders[course.id] + "/" : null;
                var localFiles = (course.files || []).filter(function(file) {
                    if (file.external || file.video) return false;
                    var path = String(file.url || "").split(/[?#]/)[0];
                    try { path = decodeURIComponent(path); } catch (e) {}
                    if (localPrefix && path.indexOf(localPrefix) === 0) path = path.slice(localPrefix.length);
                    else path = path.split("/").pop();
                    return !driveFilePaths.has(path.toLocaleLowerCase());
                });
                var linkedDriveFiles = driveFiles.map(function(file) {
                    var extension = file[0].match(/\.([^.]+)$/);
                    var fileUrl = "https://drive.google.com/file/d/" + file[1];
                    return {
                        title: file[0],
                        type: extension ? extension[1].toUpperCase() : "ملف",
                        url: fileUrl + "/view",
                        previewUrl: fileUrl + "/preview",
                        external: true,
                        drive: true,
                    };
                });
                course.files = localFiles.concat(linkedDriveFiles);
                return;
            }
            var existingLinks = (course.files || []).filter(function(file) {
                return !file.external || !/drive\.google\.com\/drive\/folders\//.test(file.url || "");
            }).map(function(file) {
                var match = String(file.url || "").match(/drive\.google\.com\/file\/d\/([^/?#]+)/);
                if (!match) return file;
                return Object.assign({}, file, {
                    drive: true,
                    previewUrl: "https://drive.google.com/file/d/" + match[1] + "/preview",
                });
            });
            course.files = existingLinks;
        });
    });

    function appendSourceVideos(course, videos) {
        var existingUrls = new Set(course.files.filter(function(file) { return file.video; }).map(function(file) { return file.url; }));
        (videos || []).forEach(function(video) {
            var url;
            var embedUrl;
            var provider;
            if (video.driveId) {
                url = "https://drive.google.com/file/d/" + video.driveId + "/view";
                embedUrl = "https://drive.google.com/file/d/" + video.driveId + "/preview";
                provider = "drive";
            } else if (video.playlist) {
                url = "https://youtube.com/playlist?list=" + video.playlist;
                embedUrl = "https://www.youtube.com/embed/videoseries?list=" + video.playlist;
                provider = "youtube";
            } else if (video.id) {
                url = "https://youtu.be/" + video.id;
                embedUrl = "https://www.youtube.com/embed/" + video.id;
                provider = "youtube";
            } else return;
            if (existingUrls.has(url)) return;
            existingUrls.add(url);
            var thumbnailUrl = video.thumbnailUrl;
            if (!thumbnailUrl && video.id && provider === "youtube") thumbnailUrl = "https://i.ytimg.com/vi/" + video.id + "/hqdefault.jpg";
            if (!thumbnailUrl && video.driveId) thumbnailUrl = "https://drive.google.com/thumbnail?id=" + video.driveId + "&sz=w640";
            course.files.push({
                title: video.title,
                type: "فيديو شرح",
                url: url,
                embedUrl: embedUrl,
                provider: provider,
                thumbnailUrl: thumbnailUrl,
                channelName: video.channelName || "",
                channelUrl: video.channelUrl || "",
                channelAvatarUrl: video.channelAvatarUrl || "",
                video: true,
            });
        });
    }

    function appendSourceFiles(course, files) {
        var existingUrls = new Set((course.files || []).map(function(file) { return file.url; }));
        (files || []).forEach(function(file) {
            var url;
            var previewUrl;
            if (file.driveId) {
                url = "https://drive.google.com/file/d/" + file.driveId + "/view";
                previewUrl = "https://drive.google.com/file/d/" + file.driveId + "/preview";
            } else if (file.presentationId) {
                url = "https://docs.google.com/presentation/d/" + file.presentationId + "/edit";
                previewUrl = "https://docs.google.com/presentation/d/" + file.presentationId + "/embed?start=false&loop=false&delayms=3000";
            } else if (file.documentId) {
                url = "https://docs.google.com/document/d/" + file.documentId + "/edit";
                previewUrl = "https://docs.google.com/document/d/" + file.documentId + "/preview";
            } else return;
            if (existingUrls.has(url)) return;
            existingUrls.add(url);
            course.files.push({
                title: file.title,
                type: file.type || "PDF",
                url: url,
                previewUrl: previewUrl,
                external: true,
                drive: true,
            });
        });
    }

    var year2SourceMaterials = {
        "y2-networks1": { subject: "network", videos: [{ title: "شرح شبكات الحاسب 1", id: "_ZxbvwNN_8o" }] },
        "y2-oop": {
            subject: "oop",
            videos: [
                { title: "Object Oriented Programming with CPP", id: "6U6WtWG3NrA" },
                { title: "البرمجة الكائنية بلغة C++", playlist: "PL8DDsWuvM_EXVdXvLzDJGEOwiMsKU2srp" },
                { title: "Object-Oriented Programming C++ in Arabic", playlist: "PLCInYL3l2Aaiq1oLvi9TlWtArJyAuCVow" },
                { title: "C++ Object Oriented Programming Video Tutorials", playlist: "PLfVsf4Bjg79DLA5K3GLbIwf3baNVFO2Lq" },
            ],
        },
        "y2-logic-design": {
            subject: "logic",
            videos: [
                { title: "شرح Logic Design 1", driveId: "1ManRbSf-z7HBHOJ9nA-0KkP7a3fyRVvg" },
                { title: "شرح Logic Design 2", driveId: "1tqNjUSIIw7tp-lp0g0mvTi6EMh7eOiDj" },
                { title: "شرح Logic Design 3", driveId: "19SlSI8Uy8NIi767ENvJbxRIUaGYBEEw3" },
                { title: "شرح Logic Design 4", driveId: "1js0dHLlLWrTf1XsbSYu48RkCpa3E17G0" },
                { title: "شرح Logic Design 5", driveId: "1NjNi4EgwcBYSKtSj-ApZ7VpjjGcbE7rL" },
                { title: "شرح Logic Design 6", driveId: "1g7Ew6NvQm4z4hMVRq5U16f9u8fd6W47w" },
                { title: "شرح Logic Design 7", driveId: "1vuUBsrQ7QNQI6UD2jaUG85qD4uB5bUnm" },
                { title: "شرح Logic Design 8", driveId: "1p2E9SqLaT2xIeH4S92MlfPyBTgD3bWTQ" },
                { title: "شرح Logic Design 9", driveId: "1XqDLEKlwVyNCk0LUcDVLLWpIW8WzReyF" },
                { title: "شرح Logic Design 10", driveId: "1xXbF7c3uAb2bxm4I-Qrd0UVg2P_Wa5n6" },
                { title: "شرح Logic Design 11", driveId: "1QYSei24qBLR6_9sGNaQGTqS5C-0lgLtj" },
                { title: "شرح Logic Design 12", driveId: "17SvJPDwCgAy3-C32Ised5aYzYyk6S9PZ" },
                { title: "شرح Logic Design 13", driveId: "1QOodzIMUCnHqXnnoeakmZ1OhvrEsfGNY" },
                { title: "شرح Logic Design 14", driveId: "1W6kO8h38psVXBlXHFE1fuUYRnh6H1U1T" },
                { title: "شرح Logic Design 15", driveId: "1GxX6YAY9W180pJmHz0e2lPPfXfZ9aq5E" },
                { title: "شرح Logic Design 16", driveId: "1KM2B6XBwej2uvTxzdr41oEuD03tsgLE0" },
                { title: "شرح Logic Design 17", driveId: "1i7sI6u7wlI1I9vSNf8vrHzzO7PPkBmOT" },
                { title: "شرح Logic Design 18", driveId: "1c_y9TOGHA56UAdzKP9-blQYbn1RAZB5w" },
                { title: "شرح Logic Design 19", driveId: "1ZOvgNCROt1R-HNh5s03CAtnaaxMLSzMi" },
                { title: "شرح Logic Design 20", driveId: "1JHJpwT9VjEFDweRsW5javcW7d0Lkbxfb" },
                { title: "شرح Logic Design 21", driveId: "1_1yKiC3TIlJliTlG5pmCgGdKy1wPGdH7" },
                { title: "شرح Logic Design 22", driveId: "1zOhbJnf6B7OAp3ih53erljKCswM_nTzO" },
                { title: "شرح Logic Design 23", driveId: "1SK5a5CE1nWFa85W9hcPWFE9gS0dpfQF5" },
                { title: "شرح Logic Design - فيديو 1", id: "H9KAlcx9frY", channelName: "MBI", channelUrl: "https://www.youtube.com/@mbi2049", channelAvatarUrl: "https://unavatar.io/youtube/mbi2049" },
                { title: "شرح Logic Design - فيديو 2", id: "ShbCYuomKzc", channelName: "Hashim EduTech", channelUrl: "https://www.youtube.com/@HashimEduTech", channelAvatarUrl: "https://unavatar.io/youtube/HashimEduTech" },
                { title: "شرح Logic Design - قائمة التشغيل", playlist: "PLSRx5jmWD9u1U8kqwkb43AP35Ssg7yPrS", thumbnailUrl: "https://i.ytimg.com/vi/a0KqOJejO5Y/hqdefault.jpg", channelName: "si-manual", channelUrl: "https://www.youtube.com/@si-manual", channelAvatarUrl: "https://unavatar.io/youtube/si-manual" },
                { title: "شرح Logic Design - فيديو 3", id: "lyga8BUD4gs", channelName: "Dr. Aya Nasser - د. آية ناصر", channelUrl: "https://www.youtube.com/@ayanasser1576", channelAvatarUrl: "https://unavatar.io/youtube/ayanasser1576" },
            ],
        },
        "y2-project-mgmt": { subject: "spm" },
        "y2-operations-research": { subject: "or", videos: [{ title: "شرح بحوث العمليات", playlist: "PLgj7VaRVWj1fpPufIJh1zyrWQBx2yWOQ1" }] },
        "y2-prob2": { subject: "possibilities2" },
        "y2-ds1": {
            subject: "datastructure",
            videos: [
                { title: "شرح Data Structure - قائمة التشغيل 1", playlist: "PL1DUmTEdeA6JlommmGP5wicYLxX5PVCQt" },
                { title: "شرح Data Structure - قائمة التشغيل 2", playlist: "PL37D52B7714788190" },
            ],
        },
        "y2-databases": {
            subject: "database",
            videos: [
                { title: "شرح قواعد البيانات - قائمة التشغيل", playlist: "PLVohjPQ5va9yyBD9Ld64bqAA3-Q4TyUsu" },
                { title: "شرح قواعد البيانات 1", id: "xkbDH1N9Nb0" },
                { title: "شرح قواعد البيانات 2", id: "mzsDuNir5F8" },
                { title: "شرح قواعد البيانات 3", id: "8xyLzcp5B6A" },
            ],
        },
        "y2-web-tech": {
            subject: "web",
            videos: [
                { title: "HTML ELZERO", id: "qfPUMV9J5yw" },
                { title: "CSS ELZERO", id: "qyVkLebgfzY" },
                { title: "JavaScript ELZERO - الجزء الأول", id: "gIGGhFlGgLI" },
                { title: "JavaScript ELZERO - الجزء الثاني", id: "FKrfis1W1tk" },
                { title: "Bootstrap ELZERO", id: "EzHbZjXDdKc" },
            ],
        },
        "y2-modeling": { subject: "simulation", videos: [{ title: "شرح Modeling & Simulation", id: "krdDck_2Mtw" }] },
        "y2-parallel": { subject: "parallel" },
        "y2-physics": { subject: "physics", videos: [{ title: "شرح عملي الفيزياء", playlist: "PLOqbasp99wh4YUvLWH0MDgzlzxRuvsLwV" }] },
    };
    Object.keys(year2SourceMaterials).forEach(function(courseId) {
        var source = year2SourceMaterials[courseId];
        var course = pages.year2.courses.find(function(item) { return item.id === courseId; });
        if (!course) return;
        appendSourceVideos(course, source.videos);
    });

    var year1SourceMaterials = {
        "y1-math1": { subject: "math1", videos: [{ title: "شرح رياضيات 1", playlist: "PLZEjCjHzGS_a5qUPC6upncagEJm8bPS1I" }] },
        "y1-history": { subject: "history" },
        "y1-scientific-thinking": { subject: "thinking" },
        "y1-ethics": { subject: "ethics" },
        "y1-english": { subject: "english1" },
        "y1-cs-basics": {
            subject: "csf",
            videos: [
                { title: "شرح أساسيات البرمجة", playlist: "PL2CH7ub8lpTUG5Fy56Aan3cubcNPKhHuU" },
                { title: "شرح السكاشن PowerPoint", id: "wrNC2GyUtIU" },
                { title: "شرح السكاشن Excel", id: "tih6OulII8Q" },
            ],
        },
        "y1-electronics": { subject: "electronics", videos: [{ title: "بلاي ليست دكتور حازم فلاح", id: "jNpVpab2xls" }] },
        "y1-math2": { subject: "math2" },
        "y1-prob1": {
            subject: "stats",
            videos: [
                { title: "شرح احتمالات وإحصاء 1 - قائمة التشغيل", id: "wyEZXjW1dvw" },
                { title: "شرح احتمالات وإحصاء 1", id: "8YpnQoXZdb8" },
            ],
        },
        "y1-programming-basics": {
            subject: "prog1",
            videos: [
                { title: "شرح أساسيات البرمجة 1", id: "UVmCAoBMSvA" },
                { title: "شرح أساسيات البرمجة 2", id: "XO1C5LRvrjM" },
                { title: "شرح أساسيات البرمجة 3", id: "Pm7VW3W8-7g" },
            ],
        },
        "y1-discrete": { subject: "discrete" },
        "y1-org-behavior": { subject: "behavior" },
        "y1-tech-writing": { subject: "writing" },
        "y1-computer-laws": { subject: "law" },
    };
    Object.keys(year1SourceMaterials).forEach(function(courseId) {
        var source = year1SourceMaterials[courseId];
        var course = pages.year1.courses.find(function(item) { return item.id === courseId; });
        if (!course) return;
        appendSourceVideos(course, source.videos);
    });

    function appendSourceFiles(course, files) {
        var existingUrls = new Set((course.files || []).map(function(file) { return file.url; }));
        (files || []).forEach(function(file) {
            var url;
            var previewUrl;
            var type = file.type || "PDF";
            if (file.driveId) {
                url = "https://drive.google.com/file/d/" + file.driveId + "/view";
                previewUrl = "https://drive.google.com/file/d/" + file.driveId + "/preview";
            } else if (file.presentationId) {
                url = "https://docs.google.com/presentation/d/" + file.presentationId + "/edit";
                previewUrl = "https://docs.google.com/presentation/d/" + file.presentationId + "/embed?start=false&loop=false&delayms=3000";
                type = "عرض تقديمي";
            } else if (file.documentId) {
                url = "https://docs.google.com/document/d/" + file.documentId + "/edit";
                previewUrl = "https://docs.google.com/document/d/" + file.documentId + "/preview";
                type = "مستند";
            } else return;
            if (existingUrls.has(url)) return;
            existingUrls.add(url);
            course.files.push({ title: file.title, type: type, url: url, previewUrl: previewUrl, external: true, drive: true });
        });
    }

    var year1SourceFiles = {
        "y1-math1": [
            { title: "ملخص كبسولة التفاضل", driveId: "1rg02a56o2PfVnCcMkoYrgdyhoKGZ741R" },
            { title: "ملخص كبسولة التكامل", driveId: "1dptZ0ZbitpfS0K51aDvYvRPdrui6GCSU" },
            { title: "امتحان Sheet Math 1", driveId: "1iT1rfME8T_a9UcIL4njtWqbAgoGeA78l" },
            { title: "امتحان Math 1 النهائي", driveId: "1O_szCxQeZH_DfZk2n9p6V24TKuEHkdPG" },
            { title: "كتاب Math 1", driveId: "1fY3nrFG2lPwm6mhuZ0XeZi8QRZiO3Ao5" },
        ],
        "y1-history": [
            { title: "امتحان تاريخ الحوسبة النهائي 1", driveId: "1tTIrp67uAzuoh1klCRRFCItnXg6QLmAJ" },
            { title: "امتحان تاريخ الحوسبة النهائي 2", driveId: "1oxFmeXvX5dX_wHaPPCJLhLIK84zEr6_i" },
            { title: "أسئلة شفوي تاريخ الحوسبة", driveId: "12xLWvlfdkOMsQYjtdq9DGhAwXh7zxGcA" },
            { title: "كتاب الطالب لتاريخ الحوسبة", driveId: "1WabZLkzif2o6d0YL10GMa7DJ87U6_uwk" },
        ],
        "y1-scientific-thinking": [
            { title: "تلخيص التفكير العلمي", driveId: "1kZyyj-o2CH2OwH9Vb8cxmE8nCICw9kU5" },
            { title: "نماذج امتحانات التفكير العلمي 1", driveId: "1qjRH5BE035pJ9Q8Ep4yyDZtPD0ri_oVz" },
            { title: "نماذج امتحانات التفكير العلمي 2", driveId: "1I1knzDRv-vjPqKb8eOmc8MlSDlU3fz9V" },
            { title: "الكتاب الدراسي للتفكير العلمي", driveId: "1DMfR0lp9vv3_RHN1dyerWt6ATyLLbjh1" },
        ],
        "y1-ethics": [
            { title: "ملخص أخلاقيات - الفصل الأول", driveId: "1kMkz24lukskLqrwt9O_NnrksRl-Fs3cy" },
            { title: "ملخص أخلاقيات - الفصل الثالث", driveId: "1bJj7XAicoTQHfS6ezxjSPHFB3axyYdCJ" },
            { title: "أسئلة أخلاقيات", driveId: "1chQTs4GfbpMSyyJpx9fBHJMKASN0S0FZ" },
        ],
        "y1-english": [
            { title: "ملخص القطع المترجمة", driveId: "1G7fj5V0yAsGRJyZ0nZKqXoZNC0O4UetK" },
            { title: "ملخص القطع", driveId: "1XovzwzW56iMNFK_Lsk2T2q-plsyv8LEz" },
            { title: "نماذج امتحانات اللغة الإنجليزية", driveId: "1ydVHFURg0cRn0yAhko8fbAN8jzea9KMm" },
            { title: "الكتاب الدراسي الرسمي للغة الإنجليزية", driveId: "1214_JyagQPi2UiM-YeZhy77v49RdwyoC" },
        ],
        "y1-cs-basics": [
            { title: "امتحانات أساسيات علوم الحاسب 1", driveId: "19sTuTrfsk-ZGsaBOrHHnlTFC6y-5pEa7" },
            { title: "امتحانات أساسيات علوم الحاسب 2", driveId: "18VUb5JwtcEOR32wiWtGTCO4Yaw9x-xFI" },
            { title: "الكتاب الدراسي الرسمي لأساسيات علوم الحاسب", driveId: "12sGd1Nmc1vW4WffkE-gYFcfFsQi9SwfX" },
        ],
        "y1-electronics": [
            { title: "ملخص أوراق مسائل الإلكترونيات", driveId: "1uhRyoRaZf36q8nO7r7zjGJX5u330jjUH" },
            { title: "امتحان إلكترونيات نهائي", driveId: "12y8-8V3QkFTbaHi6nT1tMaQJ3me6XaJx" },
            { title: "امتحان إلكترونيات ميد 2024", driveId: "1ycxSWRuJfqhmtceXeF6WxLAiRQEjqJ5P" },
            { title: "امتحان إلكترونيات ميد 2023", driveId: "1R3we95eEaKBWZLUNEoxQnHieloido6u_" },
        ],
        "y1-math2": [
            { title: "ملخص رياضيات 2 - شرح موضوعات", driveId: "17mxDiG7et5qewW6YomNZPq70jW0uuKhp" },
            { title: "ملخص المعادلات التفاضلية الجزئية", driveId: "1e1TWSI7iyTgVsABEwWMEJQEMQjN-SMMo" },
            { title: "صور محاضرات رياضيات 2", driveId: "1ioGueDLqcuNCs9wWZl0_3fvKWNRq-sV8" },
            { title: "امتحان Math 2 أهلي نهائي", driveId: "1_MmqBuZJYYZGg9RrEGHWE9p9ZV_fA9Wj" },
            { title: "امتحان Math 2 حكومي نهائي", driveId: "10yAMgss2SutzRSuuDOaXSINPqUjSz18U" },
            { title: "امتحان Math 2 ميدتيرم", driveId: "1S5E-YJV14ad8ii3GCJYN9e7GzLnwAZiq" },
        ],
        "y1-prob1": [
            { title: "تلخيص احتمالات وإحصاء 1", driveId: "1amRh8nX-ungFUKoRa7QcdQna3mIxZK34" },
            { title: "امتحان احتمالات وإحصاء 1 ميد أهلي", driveId: "1E9m1wa3cjIkQCEySx6XWBo_VFpPdnsVl" },
        ],
        "y1-programming-basics": [
            { title: "ملخص أساسيات البرمجة - Arrays", presentationId: "1f4q8GH0zg115o-gJyJh7PIPVE0eT0vgH" },
            { title: "ملخص أساسيات البرمجة - Loops", presentationId: "1UObNXG_f5AO2B9J40ZaLI7b9fZNOJrhT" },
            { title: "ملخص أساسيات البرمجة - Data Type", driveId: "1M15xwZ8f_GwiKQ0qsmNNsdxpaWfTLzHL" },
            { title: "امتحان أساسيات البرمجة 1", driveId: "17YwrTHHFZjZO_nrvsxQQiPAXvGmGaLXT" },
            { title: "امتحان أساسيات البرمجة 2", driveId: "12FHeQWKkQMIpN06578HFhgns-NEYi9Za" },
            { title: "الكتاب الدراسي لأساسيات البرمجة", driveId: "1CDAcxTcW_uxXAK5mbpA4V4InZ6_lQzEd" },
        ],
        "y1-discrete": [
            { title: "أسئلة الهياكل المتقطعة", driveId: "1KqHOuD9Omdytp7pYXskErnI6xf4WLaG9" },
            { title: "امتحان الهياكل المتقطعة 2", driveId: "1zpZAaPQf36JGdp1WfUcT3K8bODBPBmNy" },
            { title: "أسئلة صح وخطأ للهياكل المتقطعة", documentId: "1CW9EQaUrsqZzbetrPoLiGDnXd422p8cH" },
            { title: "أسئلة الهياكل المتقطعة", driveId: "1KkZE1meoSRol5xZcyVRScusq_Vn1H_wL" },
        ],
        "y1-org-behavior": [
            { title: "أسئلة السلوكيات", driveId: "1nAxJtc3sJpq-TTTuzMQlO4Hvap5__2sn" },
            { title: "حل أسئلة كتاب سلوك الهيئات", driveId: "1Wl2_7gyaOqF6gKzaYCFcjlgd9EDtcOXN" },
            { title: "أسئلة شفوي السلوكيات", driveId: "1XaKgYK52hrcULMI1kk6-HtVhpwNn-fNR" },
            { title: "امتحان سلوكيات ميد أهلي", driveId: "196KR_MOPcBdIG1UCnYtuL24npjK9MTrO" },
            { title: "امتحان سلوكيات ميد 2", driveId: "1erzrRO1Yyuihl8TB9LQuBYu0_gvMgQsK" },
            { title: "كتاب السلوكيات الدراسي", driveId: "1o3S19mqYocQaRFfoOIEUGkHeHHm4R-1a" },
        ],
        "y1-computer-laws": [
            { title: "ملخص قوانين الحاسب - Lecture 1", driveId: "1NgcCKyO13i8t38L5ZbvRzR8TIN0fzWMT" },
            { title: "ملخص قوانين الحاسب - Lecture 2", driveId: "1hLROS3sryq8wf4UdA6GHaATS3OcaI-rF" },
            { title: "ملخص قوانين الحاسب - Lecture 3", driveId: "1GCWdwrXbfjWkLlWB4lKwcgjmne4soWqw" },
            { title: "ملخص قوانين الحاسب - Lecture 4", driveId: "11DSDhdlKWb9oHwFrueAdm32V8c5VmU0-" },
            { title: "ملخص قوانين الحاسب - Lecture 6", driveId: "1GYED3S6jMBcpirFNDUU2TJzb6_zGb6ut" },
            { title: "ملخص قوانين الحاسب - Lecture 7", driveId: "1zMqikPN5sJ-6Z5zBTbh3iEw3_IqJwLQW" },
            { title: "أسئلة قانون الحاسب", driveId: "1H_2YE8gVnibcW-ZOChkt_oXnVxTlRRxm" },
        ],
    };

    var year2SourceFiles = {
        "y2-networks1": [
            { title: "ملخص شبكات - سكشن 1", driveId: "1gPI_1z85CuWHktGI0N66nj09FeaUWghJ" },
            { title: "ملخص شبكات - سكشن 2", driveId: "1djb2kkDMt4q8ZyL_eVNapFxEz9L95sHd" },
            { title: "مقدمة في الشبكات", driveId: "191Nfvlx6uXCv__9lM2H4AJJ5ysFowfRF" },
            { title: "أوامر Cisco Switch وRouter", driveId: "1wT501eJhh9Ua5QEkTA1NXL2QH1-oB_DX" },
            { title: "كيفية تكوين الشبكة", driveId: "1wLJddKDTbt5kPX2v7cuOnpUuR33IoMOa" },
            { title: "عنوان شبكات IP وMAC", driveId: "1SdKM3AocffRZQIab3hH2SUwqMnzGUFaA" },
            { title: "شفوي شبكات", driveId: "1DJmfQQiGr-1MvtH67wl1Pw89w8ioM_3w" },
            { title: "امتحانات Network", driveId: "1DOWdTuXU9uFIhzx1Vvcf1HyDsr2PgJmh" },
            { title: "أسئلة Network", driveId: "1t2RmglZ4rEA7JMrIcbVvPE32K-ohAsp6" },
            { title: "كتاب Network", driveId: "15C6zm8zgh0TvJ7eIt8belXt8B8XVkfOS" },
        ],
        "y2-oop": [
            { title: "ملخص OOP 1", driveId: "1nHX68gcHrfPIUcbAPmXfJrQp8UgLVclN" },
            { title: "ملخص OOP 2", driveId: "1qzLDVseaUV81RzOm6uqAD98mNsBVQ_ol" },
            { title: "ملخص OOP 3", driveId: "1pHK5GM-OyrKRJDnL9h1qetAlDhTokgma" },
            { title: "ملخص OOP 3 - نسخة أخرى", driveId: "1VyXKTplhJLvvmyEErPYlb6x_gQbF47fc" },
            { title: "ملخص OOP C++", driveId: "1tiWCluZtYk9dj_jPrfmWLT10blQXZ4Fl" },
            { title: "ملخص OOP Functions Part 1", driveId: "150E_A3CjSsphrACZGMqR5fDyyhliwUCJ" },
            { title: "امتحانات OOP", driveId: "1EoTBydCyBXbhgxv0oKh6xVgWXcDXLdkV" },
            { title: "كتاب OOP", driveId: "1lWlQ9uBWTrzPkotJA2VzgGkDksog4mOK" },
        ],
        "y2-logic-design": [
            { title: "ملخص Logic Design 1", driveId: "1ssSN2CuMHPXh4aqt8eYNmt_pe9EnbdSy" },
            { title: "ملخص Logic Design 2", driveId: "18pDcysHT-fMen7LT-TB6kAiqt84QP2mt" },
            { title: "ملخص Logic Design 3", driveId: "1O81hP9U8qQTFwBGQ1TWwIyTZjmWvdCz4" },
            { title: "ملخص Logic Design 4", driveId: "1TaQ5ZA_i4ga2naM1aaAxfYfE3TaxqUSF" },
            { title: "ملخص Logic Design 5", driveId: "1kmg17Dpd22awMf0YHT0tdg3up-m9bYC7" },
            { title: "ملخص Logic Design 6", driveId: "1jVPGlo6O3qYy4fMKa9IZ_YLBvUOBoO4" },
            { title: "امتحانات Logic Design 1", driveId: "11vDR24b27zowIZ5onzXLA75PKpLaHMN6" },
            { title: "امتحانات Logic Design 2", driveId: "1snX4FhmSXdoZOk7XiirwXgTGBOKKzo43" },
            { title: "كتاب Logic Design", driveId: "1VLHQcs7Ilg7egjWzzZI1xI9f-rRFthjj" },
        ],
        "y2-project-mgmt": [
            { title: "كتاب SPM", driveId: "14MVJaoaq5-wJrrJjvdDSIyJ2qYaArVtI" },
        ],
        "y2-operations-research": [
            { title: "ملخص Operations Research", driveId: "1XR7y2sA4CO8dNkfO12LSy_5fOCwSfGND" },
            { title: "امتحان Operations Research - Sheet", driveId: "1Oht4pVZraRtt695qJWWpuDm0DVWc05oM" },
            { title: "امتحان Operations Research - Final and Mid", driveId: "1z62ptJwojYj4aeksNYhMrgVcbv_rQDyd" },
            { title: "كتاب Operations Research", driveId: "14AF_QSIDapuk8bb_MC2mEEA08TiWRhTq" },
        ],
        "y2-prob2": [
            { title: "ملخص احتمالات وإحصاء 2", driveId: "1voMNRP928TOzCvGQlg30IYsFS3BHczz6" },
            { title: "امتحان احتمالات وإحصاء 2", driveId: "1Tjyvf8ePFIDjjFiTPInLOBXWsG8HsSkf" },
            { title: "كتاب احتمالات وإحصاء 2", driveId: "1Xwx51yQEqRSHVMTzqDbH5ao998CdT4Fr" },
        ],
        "y2-ds1": [
            { title: "ملخص Data Structure", driveId: "1uaxlskWzWFNJLX0BFEVbRlP5-6da840j" },
            { title: "امتحان Data Structure", driveId: "1wqghj5dabDsAD5u_pVtTZkhbViNWDUFk" },
            { title: "كتاب Data Structure", driveId: "12XvTgnOtNxA5HPrPnbQVbSstYMhd6RHo" },
        ],
        "y2-databases": [
            { title: "امتحانات Database - أسئلة وإجابات 1", driveId: "1Gan_CFAFKB1TlNteyR4zxueEFsiKDijw" },
            { title: "امتحانات Database - أسئلة وإجابات 2", driveId: "1h5Lw3qNZRTQfa0KdV4fVbNW_cNTUb_kD" },
            { title: "امتحان Database Sheet", driveId: "1HmLQ2lW4n5ACkAFHPCV67hhjuWv8PJ0Z" },
            { title: "كتاب Database", driveId: "1Dycb0SpS1NtfaaN9V6PndpyKEtTWhmFl" },
        ],
        "y2-modeling": [
            { title: "ملخص Modeling - Chapter 2", driveId: "1loi_RXViijpx9FFV1jqMKZ5rfNg1KIMf" },
            { title: "ملخص Modeling - Chapter 5", driveId: "1drc0Q9K0xognF0th_A_dxid0vctnF05Q" },
            { title: "ملخص Modeling - Chapter 6", driveId: "1VZBbUf99LEU7-mkMifRrqS_QXXEKuYW2" },
            { title: "امتحان Modeling MCQ", driveId: "1y5h325_qQvrCMrdxTCWOxHNDOado5Sbs" },
        ],
        "y2-web-tech": [
            { title: "كتاب Web Development", driveId: "1PqnAOMI9_Wyaod3qVMKLlwNsCBh2T3vS" },
        ],
        "y2-physics": [
            { title: "ملخص قوانين الفيزياء", driveId: "1A9wxqdeEURlDzsDHQFx3sYch3TysW-g-" },
            { title: "تجارب الفيزياء", driveId: "1cD1YSRDWOGMaLbQHx724oEia1KDS7nof" },
            { title: "كتاب الفيزياء", driveId: "1HGyGNrgQt50bS684MnKyLoJnr6XDN52b" },
        ],
    };

    Object.keys(year1SourceFiles).forEach(function(courseId) {
        var course = pages.year1.courses.find(function(item) { return item.id === courseId; });
        if (course) appendSourceFiles(course, year1SourceFiles[courseId]);
    });
    Object.keys(year2SourceFiles).forEach(function(courseId) {
        var course = pages.year2.courses.find(function(item) { return item.id === courseId; });
        if (course) appendSourceFiles(course, year2SourceFiles[courseId]);
    });

    var allowedMaterialExtensions = new Set(["pdf", "jpg", "jpeg", "png", "gif", "webp", "bmp", "avif", "jfif", "heic", "heif", "tif", "tiff"]);
    Object.keys(pages).forEach(function(pageKey) {
        (pages[pageKey].courses || []).forEach(function(course) {
            course.files = (course.files || []).filter(function(file) {
                if (file.video) return true;
                if (/docs\.google\.com\/(presentation|document)\//.test(file.url || "")) return false;
                var type = String(file.type || "").toLowerCase().replace(/^image\//, "");
                var titleExtension = String(file.title || "").match(/\.([^.\\/]+)$/);
                var urlPath = String(file.url || "").split(/[?#]/)[0];
                var urlExtension = urlPath.match(/\.([^.\\/]+)$/);
                var extension = titleExtension ? titleExtension[1].toLowerCase() : urlExtension ? urlExtension[1].toLowerCase() : type;
                return allowedMaterialExtensions.has(extension) || type === "pdf";
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
                members: [],
            },
        ],
    };
})();