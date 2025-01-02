const SIDEBAR = {
    LABEL: {
        City: "المدن",
        Delivery: "التسليم",
        PAYMENT_PLAN: "خطة السداد",
        DELIVERY: "التسليم",
        YEARS: "سنوات التقسيط",
        UNIT_TOTL_PRICE: "الميزانية",
        BEDROOMS: "عدد الغرف",
        BUILT_UP_AREA: "المساحة المبنية",
        COMPOUND: "المجمع العقاري",
        PROJECT : "المشروع",
        DEVELOPER: "المطور العقاري",
        FINISHING: "التشطيب",
        TYPES: "النوع"
    },
    RESULT_LABEL: {
        UNIT_TOTL_PRICE: "السعر |",
        YEARS: "السنوات |",
        DWON_PAYMENT: "المقدم |"
    },
    OPTIONS: {
        UNIT_TOTL_PRICE_TYPES: [
            {
                Label: "تقسيط",
                Value: "Installment"
            },
            {
                Label: "كاش",
                Value: "CashDiscount"
            }
        ]
    }
};
export const Lang = {
    APP_NAME: "Master - V",
    NO_OPTIONS: "لا يوجد خيارات متوفرة",
    NO_DATA: "لا يوجد بيانات",
    PREV: "السابق",
    NEXT: "التالي",
    SUBMIT: "إرسال",
    DOWNLOAD: "تحميل",
    FULL_SCREEN: "شاشة كاملة",
    CHOOSE: "اختر",
    SERVER: "اتصالك بالخدمة",
    ONLINE: "متصل",
    OFFLINE: "غير متصل",
    NO_INTERNET: "لا يوجد اتصال بالانترنت",
    VERSION_VIEW: "نظام العرض : {{Version}}",
    SAVE: "حفظ",
    UPDATE: "تحديث",
    CREATE: "اضافة",
    SEARCH: "بحث",
    CLOSE: "اغلاق",
    FROM: "من",
    TO: "الي",
    OK: "تم",
    SELECT_ALL: "اختر الكل",
    UNSELECT_ALL: "الغاء تحديد الكل",
    SELECTED: "تم تحديد : {{Count}}",
    RESET_SECTION: "استعادة {{Section}}",

    SIDEBAR: SIDEBAR,
    PUBLIC: {
        UPDATED: "اخر تحديث",
        TODAY: "اليوم",
        YESTERDAY: "أمس",
        WORDS: {
            METR: "م",
            DELIVERY: "سنة",
            YEARS: "سنة",
            DELIVERY_TITLE: "R T M",
            START_BUA: "اقل مساحة",
            START_PRICE: "اقل سعر"
        },
        FINISHING: {
            0: "غير مكتمل",
            1: "مكتمل بالكامل"
        },
        Personal: "شخصي",
        Company: "شركة"
    },
    VERSIONS: [
        {
            Label: "النسخة السابقة",
            Value: 1
        },
        {
            Label: "النسخة الأحدث",
            Value: 2
        }
    ],
    NAVBAR: {
        ROUTES: {
            Data: "البيانات",
            Settings: "الاعدادات",
            Dashboard: "لوحة التحكم",
            Comparison: "المقارنة"
        }
    },
    WHASTAPP_SENDER: {
        STATUS : "ربط الواتساب",
        TIME_LEFT: "الوقت المتبقي للارسال : ",
        SEND_TO_LABEL: "ارسال الى واتساب : ",
        MESSAGES: {
            OnQRUpdated: "يرجي القيام بمسح الباركود من خلال الواتساب للقيام بالربط",
            OnQRUpdated_NULL: "لقد تخطيت عدد تكرار اعادة انشاء الكود يرجي المحاولة لاحقا",
            OnConnecting: "يرجي الانتظار ريثما نقوم بالاتصال بالواتساب",
            OnConnected: "تم الاتصال بالواتساب بنجاح"
        },
        DESCRIPTION_FAILD_TO_SEND: "فشل في ارسال وصف المشروع",
        FILE_FAILD_TO_SEND: "فشل في ارسال ملف {{File}}",
        SUCCESS_SENT_FILES : "تم ارسال {{Count}} ملف بنجاح",
    },
    AUTH_PAGE: {
        LABEL: {
            Register: "انشاء حساب جديد",
            Login: "تسجيل الدخول",
            Forget: "نسيت كلمة المرور",
            City: "City",
            Section: "القسم "
        },
        BUTTONS: {
            Login: "تسجيل الدخول",
            Register: "انشاء الحساب",
            Forget: "نسيت كلمة المرور"
        },
        ASK: {
            HAVE_ACCOUNT: "لديك حساب؟",
            DONT_HAVE_ACCOUNT: "ليس لديك حساب؟",
            BACKTO: "العودة الى ?"
        },
        MESSAGES: {
            VERIFY_LOADING: "جاري التحقق من البيانات",
            VERIFY_LOADING2: "يرجي الانتظار حتى نتمكن من التحقق من بياناتك",
            VERIFY_FAIL:
                "فشل تغيير كلمة المرور الخاصة بك يرجى المحاولة مرة اخرى \n او اذا كان لديك مشكلة يرجى الاتصال بنا",

            REASON: "السبب : "
        },
        INPUTS: {
            PASSWORD: "الرقم السري",
            CONFIRM_PASSWORD: "تأكيد الرقم السري",
            PHONE_NUMBER: "رقم الواتساب",
            EMAIL: "البريد الالكتروني",
            USER_NAME: "اسم المستخدم",
            ROLE: "نوع الحساب",
            COMPANY_NAME: "اسم الشركة",
            USERS_COUNT: "عدد المستخدمين",
            PLAN: "اختر الخطة",
            SECTION: "اختر الاقسام",
            CITY: "اختر مدن ال{{Key}}",
            OLD_PASSWORD: "الرقم السري القديم",
            NEW_PASSWORD: "الرقم السري الجديد",
            CONFIRM_NEW_PASSWORD: "تأكيد الرقم السري الجديد"
        },
        OPTIONS: {
            PLAN: [
                {
                    Name: "اختر",
                    Value: ""
                },
                {
                    Name: "تجريبي",
                    Value: "Trial"
                },
                {
                    Name: "شهر واحد",
                    Value: 1
                },
                {
                    Name: "3 اشهر",
                    Value: 3
                },
                {
                    Name: "6 اشهر",
                    Value: 6
                },
                {
                    Name: "سنة واحدة",
                    Value: 12
                }
            ],
            ROLES: [
                {
                    Name: "شركة",
                    Key: "Company",
                    Value: 4
                },
                {
                    Name: "شخصي",
                    Key: "Personal",
                    Value: 5
                }
            ]
        }
    },
    DATA_PAGE: {
        PROJECT_COUNT: "عدد المشاريع",
        PHASES: "المراحل",
        ACCOUNT: "الحساب :",
        ADVANCED: "متقدم",
        LE: "جنيه",
        STATUS_DATA: {
            1: "متاح",
            2: "قريبا",
            3: "متاح", // Custom
            4: "قريبا", // custom
            5: "غير متاح"
        },
        STATUS_MESSAGES: {
            3: "تفاصيل الوحدات المتاحه متغيره وغير واضحة من الشركة المطورة - يرجى التواصل المباشر مع المطور",
            4: "المشروع حاليا فى المرحله الافتتاحية يرجى التواصل مع المسئول  من الشركة المطورة",
            5: "غير متاح الان"
        },
        STATUS_REPLACE: {
            3: "بالطلب",
            4: "قريبا",
            5: "غير متاح"
        },
        VIEWS: {
            MATRIAL: {
                Brochure: "الكتيب",
                Contract: "العقد",
                MasterPlan: "الخطة الرئيسية",
                Photos: "الصور",
                Description: "الوصف"
            }
        },
        TABS: {
            OLD_VERSION: [
                {
                    Label: "التفاصيل",
                    Value: "Details"
                },
                {
                    Label: "أساسي",
                    Value: "Basic"
                }
            ],
            SECTIONS: [
                {
                    ViewLabel: "سكني",
                    label: "Residential",
                    value: 1,
                    id: 1
                },
                {
                    ViewLabel: "تجاري",
                    label: "Commercial",
                    value: 2,
                    id: 2
                }
            ]
        },
        ACTIONS: {
            PAYMENT_PLAN: "خطط الدفع",
            CONTACTS: "جهات الاتصال",
            OFFERS: "العروض والأخبار",
            CITYSCAPE: "سيتي سكيب",
            NOTES: "الملاحظات",
            DESCRIPTION: "الوصف",
            LAYOUTS: "التصميمات",
            MATRILAS: "المواد",
            PRICELIST: "قائمة الأسعار",
            URL: "الفيديوهات"
        },
        MESSAGES: {
            NOTES: "تحديثات جديدة متاحة، تحقق من تفاصيل التقرير لمزيد من المعلومات",
            NO_MESSAGE: "لا توجد رسائل لهذا المجمع",
            NO_URL: "لا يوجد رابط لهذا المجمع",
            CITYSCAPE: "لمعرفة عروض نظام الدفع، يرجى فتح تقرير الأسعار"
        },

        OPTIONS: {
            ORDER: [
                {
                    Label: "السعر",
                    Value: "DataUnitTotalPriceFrom"
                },
                {
                    Label: "الغرف",
                    Value: "DataBedRooms"
                },
                {
                    Label: "التسليم",
                    Value: "DataDeliveryFrom"
                }
            ],
            ADDITIONAL: [
                {
                    Label: "مميزات اضافية",
                    Value: "ExtraBenefits"
                },
                {
                    Label: "استشاري هندسي",
                    Value: "Engineering"
                },
                {
                    Label: "استشاري معماري",
                    Value: "Architecture"
                },
                {
                    Label: "استشاري تنفيذي",
                    Value: "Executive"
                },
                {
                    Label: "شركة الإدارة",
                    Value: "Management"
                }
            ]
        },
        EXTRA_BENFITS: {
            1: "إيجار الإلزامي",
            2: "تفويض بالإيجار",
            3: "عائد عالمقدم",
            4: "عائد علي الأقساط"
        }
    },
    SETTINGS_PAGE: {
        USER_NAME: "اسم الواتساب",
        NUMBER: "رقم الواتساب",
        DELETE_SESSION: "حذف الاتصال",
        TABS: [
            {
                Label: "الحساب",
                Value: 1
            },
            {
                Label: "اتصال الواتساب",
                Value: 2
            }
        ]
    },
    DASHBOARD_PAGE: {
        USERS: "المستخدمين",
        TABS: [
            {
                Label: "المستخدمين",
                Value: 1
            },
            {
                Label: "الشركات V1",
                Value: 2
            }
        ],
        OPTIONS: {
            FILTER: [
                {
                    Name: "اسم المستخدم",
                    Value: "UserName"
                },
                {
                    Name: "الوظيفة",
                    Value: "UserJobTitle"
                },
                {
                    Name: "رقم الواتساب",
                    Value: "UserPhoneNumber"
                },
                {
                    Name: "البريد الالكتروني",
                    Value: "UserEmail"
                }
            ]
        }
    },
    TABLES: {
        DataDate: "آخر تحديث",
        DataDeveloper: "المطور",
        DataCompound: "المجمع",
        DataStatus: "الحالة",
        DataArea: "الموقع",
        DataAcres_ProjectArea: "عدد الافدنة",
        DataPolicy: "سياسة الشركة",
        DataSubType: "النوع",
        DataBedRooms: "عدد الغرف",
        DataBuiltUpAreaFrom: "مساحة البناء",
        DataUnitTotalPriceFrom: "السعر الأصلي (من - إلى)",
        DataUnitTotalPriceDiscountFrom: "السعر النقدي (من - إلى)",
        Name: "الاسم",
        Number: "رقم الاتصال",
        Tools: "الادوات",
        Username: "الاسم",
        Title: "المسمي الوظيفي",
        WhatsApp: "رقم الواتساب",
        EmailAdress: "البريد الالكتروني"
    },
    VALIDATION: {
        EMAIL_REQUIRED: "البريد الالكتروني مطلوب",
        EMAIL_INVALID: "البريد الالكتروني غير صحيح",
        PHONE_NUMBER_REQUIRED: "رقم الواتساب مطلوب",
        PHONE_NUMBER_INVALID: "رقم الواتساب غير صحيح",
        USERNAME_REQUIRED: "اسم المستخدم مطلوب",
        USERNAME_LENGTH: "اسم المستخدم يجب ان يكون اكثر من حرف",
        USERNAME_INVALID: "اسم المستخدم يجب ان يحتوي علي حرف واحد عالاقل",
        PASSWORD_REQUIRED: "كلمة المرور مطلوبة",
        PASSWORD_LENGTH: "كلمة المرور يجب ان تكون اكثر من او تساوي 6 حروف",
        PASSWORD_INVALID: "كلمة المرور يجب ان تحتوي علي حروف وارقام",
        PASSWORD_DIDNOT_MATCH: "كلمة المرور غير متطابقة",
        OLD_PASSWORD_REQUIRED: "كلمة المرور القديمة مطلوبة",
        NEW_PASSWORD_REQUIRED: "كلمة المرور الجديدة مطلوبة",
        CONFIRM_NEW_PASSWORD_REQUIRED: "تاكيد كلمة المرور الجديدة مطلوبة",
        PASSWORDS_NOT_MATCH: "كلمة المرور و تاكيد كلمة المرور غير متطابقين",
        ACCOUNT_TYPE_REQUIRED: "نوع الحساب مطلوب",
        COMPANY_NAME_REQUIRED: "اسم الشركة مطلوب",
        COMPANY_NAME_LENGTH: "اسم الشركة يجب ان يكون اكثر من حرفين",
        COMPANY_NAME_INVALID: "اسم الشركة يجب ان يحتوي علي حرف واحد عالاقل",
        USERS_COUNT_REQUIRED: "عدد المستخدمين مطلوب",
        SECTIONS_LENGTH: "لا يمكن ان يكون عدد الأقسام اقل من 1",
        SECTION_IS_EMPTY: "مدن ال{{Key}} لا يمكن ان تكون اقل من 1 بينما تم اختيار القسم {{Key}}",
        PLAN_REQUIRED: "الخطة مطلوبة",
        FILES_REQUIRED: "يرجي اختيار ملف واحد عالاقل",
        MESSAGE_REQUIRED: "لا يمكن ارسال رسالة فارغة",
        FILE_REQUIRED: "لا يمكن ارسال ملف فارغ"
    },
    ERRORS: {
        NO_COORDINATES: "لا توجد إحداثيات لـ {{Compound}}",
        NO_URL: "لا توجد توجيهات لـ {{Compound}}",
        NO_DESCRIPTION: "لا يوجد وصف لـ {{Compound}}",
        NO_CONTACTS: "لا توجد جهات اتصال حتى الآن لـ {{Developer}}",
        CDN_UNAVILABLE: "عرض الملف غير متاح، يرجى الاتصال بالمسؤول باستخدام الكود: 199404",
        SERVIES_UNAVILABLE: "الخدمات غير متاحة \n يرجى الاتصال بالمسؤول \n باستخدام الكود: 199405",
        FILE_VIEW_NOT_ALLOWED:
            "لا يمكن عرض هذا الملف \n نحن لا ندعم عرض هذا النوع من الملفات حاليًا \n يرجى تنزيله",
        NOT_ALLOWED_SECTION: "تحتاج إلى اختيار قسم {{Key}} أولا",
        NO_NOTIFICATIONS: "لا يوجد أشعارات حاليا",
        PHONE_NUMBER_STARTS_WITH: "الرقم يبدء بكود البلد",
        NO_CONNECTION: "لم يتم العثور على اتصال لـ {key}، يرجى التأكد من أنك متصل",
        NO_CITIES_FOUND: "لا توجد مدن متاحة لهذا القسم، يرجى التواصل مع الادمن",
        // NO_CITIES_FOUND: "No Cities Found For This Section Please Contact Admin",
    }
};
