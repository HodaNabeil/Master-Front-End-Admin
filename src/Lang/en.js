const SIDEBAR = {
    LABEL: {
        City: "Cities",
        Delivery: "Delivery",
        PAYMENT_PLAN: "Payment Plan",
        DELIVERY: "Delivery",
        YEARS: "Installment Years",
        UNIT_TOTL_PRICE: "Budget",
        BEDROOMS: "Bedrooms",
        BUILT_UP_AREA: "Built Up Area",
        COMPOUND: "Compound",
        PROJECT: "Project",
        DEVELOPER: "Developer",
        FINISHING: "Finishing",
        TYPES: "Types"
    },
    RESULT_LABEL: {
        UNIT_TOTL_PRICE: "Price |",
        YEARS: "Years |",
        DWON_PAYMENT: "Down |"
    },
    OPTIONS: {
        UNIT_TOTL_PRICE_TYPES: [
            {
                Label: "Installment",
                Value: "Installment"
            },
            {
                Label: "Cash",
                Value: "CashDiscount"
            }
        ]
    }
};
export const Lang = {
    APP_NAME: "Master - V",
    NO_OPTIONS: "No Options Founded",
    NO_DATA: "No Data Founded",
    PREV: "Previous",
    NEXT: "Next",
    SUBMIT: "Submit",
    DOWNLOAD: "Download",
    FULL_SCREEN: "Full Screen",
    CHOOSE: "Choose",
    SERVER: "Service Connection",
    ONLINE: "Online",
    OFFLINE: "Offline",
    NO_INTERNET: "No Internet Connection",
    VERSION_VIEW: "Display system : {{Version}}",
    UPDATE: "Update",
    DELETE: "Delete",
    CREATE: "Create",
    SEARCH: "Search",
    SAVE: "Save",
    RESET: "Reset",
    CLOSE: "Close",
    FROM: "From",
    OK: "Ok",
    TO: "To",
    SELECT_ALL: "Select All",
    UNSELECT_ALL: "UnSelect All",
    RESET_SECTION: "Reset {{Section}}",
    SELECTED: "Selected : {{Count}}",
    SIDEBAR: SIDEBAR,
    PUBLIC: {
        UPDATED: "Updated",
        TODAY: "Today",
        YESTERDAY: "Yesterday",
        WORDS: {
            METR: "m",
            DELIVERY: "Years",
            YEARS: "Years",
            DELIVERY_TITLE: "R T M",
            START_BUA: "Start Bua",
            START_PRICE: "Start Price"
        },
        FINISHING: {
            0: "Not Finishing",
            1: "Fully Finished"
        },
        DELETE_LABEL: "Delete {{Name}}",
        DELETE_MESSAGE:
            "Are You Sure To Delete {{Name}} ? \n You Can't Undo This Action Afterwards.",
        Personal: "Personal",
        Company: "Company"
    },
    VERSIONS: [
        {
            Label: "Last Version",
            Value: 1
        },
        {
            Label: "New Version",
            Value: 2
        }
    ],
    NAVBAR: {
        ROUTES: {
            Data: "Data",
            Settings: "Settings",
            Dashboard: "Dashboard",
            Comparison: "Comparison"
        }
    },
    WHASTAPP_SENDER: {
        STATUS: "Whatsapp Connection",
        TIME_LEFT: "Time Untile Next Send : ",
        SEND_TO_LABEL: "Send To Whatsapp :",
        MESSAGES: {
            OnQRUpdated: "Please Scan The QR Code From Whatsapp To Link",
            OnQRUpdated_NULL: "Maximum Number Of Tries Exceededو Please Try Again Later",
            OnConnecting: "Please Wait While We Connecting To Whatsapp",
            OnConnected: "Connected To Whatsapp Successfully"
        },
        DESCRIPTION_FAILD_TO_SEND: "Failed To Send Description",
        FILE_FAILD_TO_SEND: "Failed To Send {{File}} File",
        SUCCESS_SENT_FILES: "Successfully Sent {{Count}} Files"
    },
    AUTH_PAGE: {
        LABEL: {
            Register: "Create New Account",
            Login: "Login",
            Forget: "Forget Password",
            City: "City",
            Section: "Section"
        },
        BUTTONS: {
            Login: "Login",
            Register: "Sign Up",
            Forget: "Forget Password"
        },
        ASK: {
            HAVE_ACCOUNT: "have Account ?",
            DONT_HAVE_ACCOUNT: "Don't have an account?",
            BACKTO: "Back To ?"
        },
        MESSAGES: {
            VERIFY_LOADING: "Validating Your Data",
            VERIFY_LOADING2: "Plaese Wait While We Verify Your Data",
            VERIFY_FAIL:
                "Failed To Reset Your Password Please Try Again \n Or If You Have A Problem Please Contact Us ",
            REASON: "Reason : "
        },
        INPUTS: {
            PASSWORD: "Password",
            CONFIRM_PASSWORD: "Retype Password",
            PHONE_NUMBER: "Whatsapp",
            EMAIL: "Email Address",
            USER_NAME: "User Name",
            ROLE: "Account Type",
            COMPANY_NAME: "Company Name",
            USERS_COUNT: "Users Count",
            PLAN: "Select Plan",
            SECTION: "Choose Section",
            CITY: "Choose {{Key}} Cities",
            OLD_PASSWORD: "Old Password",
            NEW_PASSWORD: "New Password",
            CONFIRM_NEW_PASSWORD: "Confirm New Password",
            JOB_TITLE: "Title"
        },
        OPTIONS: {
            PLAN: [
                {
                    Name: "Choose",
                    Value: ""
                },
                {
                    Name: "Trial",
                    Value: "Trial"
                },
                {
                    Name: "1 Month",
                    Value: 1
                },
                {
                    Name: "3 Months",
                    Value: 3
                },
                {
                    Name: "6 Months",
                    Value: 6
                },
                {
                    Name: "1 Year",
                    Value: 12
                }
            ],
            ROLES: [
                {
                    Name: "Company",
                    Key: "Company",
                    Value: 4
                },
                {
                    Name: "Personal",
                    Key: "Personal",
                    Value: 5
                }
            ]
        }
    },
    DATA_PAGE: {
        PROJECT_COUNT: "Count of projects ",
        PHASES: "Phases",
        ACCOUNT: "Account :",
        ADVANCED: "Advanced",
        LE: "LE",
        STATUS_DATA: {
            1: "Available",
            2: "Launching",
            3: "Available", // Custom
            4: "Launching", // custom
            5: "Not Available"
        },
        STATUS_MESSAGES: {
            3: "Theres no details for available units at the moment - For any request please contact the Developer",
            4: "This Compound is launching now - please contact the developer for any details.",
            5: "Not available now"
        },
        STATUS_REPLACE: {
            3: "by request",
            4: "Soon",
            5: "Not available"
        },
        VIEWS: {
            MATRIAL: {
                Brochure: "Brochure",
                Contract: "Contract",
                MasterPlan: "Master Plan",
                Photos: "Photos",
                Description: "Description"
            }
        },
        TABS: {
            OLD_VERSION: [
                {
                    Label: "Basic",
                    Value: "Basic"
                },
                {
                    Label: "Details",
                    Value: "Details"
                }
            ],
            SECTIONS: [
                {
                    ViewLabel: "Residential",
                    label: "Residential",
                    value: 1,
                    id: 1
                },
                {
                    ViewLabel: "Commercial",
                    label: "Commercial",
                    value: 2,
                    id: 2
                }
            ]
        },
        ACTIONS: {
            PAYMENT_PLAN: "Payment plans",
            CONTACTS: "Contacts",
            OFFERS: "Offers and News",
            CITYSCAPE: "CityScape",
            NOTES: "Notes",
            DESCRIPTION: "Description",
            LAYOUTS: "Layouts",
            MATRILAS: "All Matrials",
            PRICELIST: "Price list",
            URL: "Videos"
        },
        MESSAGES: {
            NOTES: "New updates available, Check report details for more info",
            NO_MESSAGE: "Theres no Message For This Compound",
            NO_URL: "Theres no Url For This Compound",
            CITYSCAPE: "To know the offers of the payment system, please open the price report"
        },
        OPTIONS: {
            ORDER: [
                {
                    Label: "Price",
                    Value: "DataUnitTotalPriceFrom"
                },
                {
                    Label: "Bedrooms",
                    Value: "DataBedRooms"
                },
                {
                    Label: "Delivery",
                    Value: "DataDeliveryFrom"
                }
            ],
            ADDITIONAL: [
                {
                    Label: "ExtraBenefits",
                    Value: "ExtraBenefits"
                },
                {
                    Label: "Engineering",
                    Value: "Engineering"
                },
                {
                    Label: "Architecture",
                    Value: "Architecture"
                },
                {
                    Label: "Executive",
                    Value: "Executive"
                },
                {
                    Label: "Management",
                    Value: "Management"
                },
                {
                    Label: "Management1",
                    Value: "Management1"
                }
            ]
        },
        EXTRA_BENFITS: {
            1: "Mandatory Rent",
            2: "Rent Authorization",
            3: "Advance Yield",
            4: "Installment Yield"
        }
    },
    SETTINGS_PAGE: {
        USER_NAME: "Whatsapp Name",
        NUMBER: "Whatsapp Number",
        DELETE_SESSION: "Delete Connection",
        TABS: [
            {
                Label: "Account",
                Value: 1
            },
            {
                Label: "Whatsapp Connection",
                Value: 2
            }
        ]
    },
    DASHBOARD_PAGE: {
        USERS: "Users",
        TABS: [
            {
                Label: "Users",
                Value: 1
            },
            {
                Label: "Companies V1",
                Value: 2
            }
        ],
        OPTIONS: {
            FILTER: [
                {
                    Name: "User Name",
                    Value: "UserName"
                },
                {
                    Name: "Title",
                    Value: "UserJobTitle"
                },
                {
                    Name: "WhatsApp",
                    Value: "UserPhoneNumber"
                },
                {
                    Name: "Email Adress",
                    Value: "UserEmail"
                }
            ],
            JOB_TITLE: [
                { Name: "Choose", Value: "" },
                { Name: "Junior Sales", Value: "Junior Sales" },
                { Name: "Senior Sales", Value: "Senior Sales" },
                { Name: "Team Leader", Value: "Team Leader" },
                { Name: "Sales Supervisor", Value: "Sales Supervisor" },
                { Name: "Sales Manager", Value: "Sales Manager" },
                { Name: "Sales Director", Value: "Sales Director" },
                { Name: "Head Of Sales", Value: "Head Of Sales" },
                { Name: "CEO", Value: "CEO" }
            ]
        }
    },
    TABLES: {
        DataDate: "Last update",
        DataDeveloper: "Developer",
        DataCompound: "Compound",
        DataStatus: "Status",
        DataArea: "Locations",
        DataAcres_ProjectArea: "Acres",
        DataPolicy: "Co. Policy",
        DataSubType: "Type",
        DataBedRooms: "bedrooms",
        DataBuiltUpAreaFrom: "Built up area",
        DataUnitTotalPriceFrom: "Original Price ( from - to )",
        DataUnitTotalPriceDiscountFrom: "Cash Price ( from - to )",
        Name: "Name",
        Number: "Number",
        Tools: "Tools",
        Username: "Username",
        Title: "Title",
        WhatsApp: "WhatsApp",
        EmailAdress: "Email Adress"
    },
    VALIDATION: {
        EMAIL_REQUIRED: "Email is required",
        EMAIL_INVALID: "Email is invalid",
        PHONE_NUMBER_REQUIRED: "Phone Number is required",
        PHONE_NUMBER_INVALID: "Phone Number is invalid",
        USERNAME_REQUIRED: "Username is required",
        USERNAME_LENGTH: "User Name must be at least 1 character long",
        USERNAME_INVALID: "User Name must contain at least one letter",
        PASSWORD_REQUIRED: "Password is required",
        PASSWORD_LENGTH: "Password must be greater than or equal to 6 characters",
        PASSWORD_INVALID: "Password must contain both numbers and letters",
        PASSWORD_DIDNOT_MATCH: "Password Doesn't Match",
        OLD_PASSWORD_REQUIRED: "Old Password is required",
        NEW_PASSWORD_REQUIRED: "New Password is required",
        CONFIRM_NEW_PASSWORD_REQUIRED: "Confirm New Password is required",
        PASSWORDS_NOT_MATCH: "Password Doesn't Match Confirm Password",
        ACCOUNT_TYPE_REQUIRED: "Account Type is required",
        COMPANY_NAME_REQUIRED: "Company Name is required",
        COMPANY_NAME_LENGTH: "Company Name must be at least 2 character long",
        COMPANY_NAME_INVALID: "Company Name must contain at least one letter",
        USERS_COUNT_REQUIRED: "Users Count is required",
        SECTIONS_LENGTH: "Sections Can't Be Leth Than 1",
        SECTION_IS_EMPTY: "{{Key}} Cities Can't Be Leth Than 1 While You Chose {{Key}} Section",
        PLAN_REQUIRED: "Plan is required",
        JOB_TITLE_REQUIRED: "Job Title is required",
        FILES_REQUIRED: "Please Select At Least One File",
        MESSAGE_REQUIRED: "Message Is Required",
        FILE_REQUIRED: "File Is Required"
    },
    //{ PAGE_ADMIN.USERS.ADDUSER}
    PAGE_ADMIN: {
        USERS: {
            ADDUSER: "AddUser"
        }
    },

    ERRORS: {
        NO_COORDINATES: "There are no coordinates for {{Compound}}",
        NO_URL: "There are no Orientation for {{Compound}}",
        NO_DESCRIPTION: "There are no Description for {{Compound}}",
        NO_CONTACTS: "No Contacts Yet For {{Developer}}",
        CDN_UNAVILABLE: "Viewing File Is Unavailable Please Contact Admin With Code : 199404",
        SERVIES_UNAVILABLE: "Services Is Unavailable \n Please Contact Admin \n With Code : 199405",
        FILE_VIEW_NOT_ALLOWED:
            "This File Can't Be Viewed \n We Are Not Supported This File Type Right Now,\n Plaese Download It",
        NOT_ALLOWED_SECTION: "You Need To Choose {{Key}} Section First",
        NO_NOTIFICATIONS: "No Notifications Now",
        PHONE_NUMBER_STARTS_WITH: "Number Starts With Contry Code",
        NO_CONNECTION: "No Connection Found For {key} Please Make Sure You Are Connected",
        NO_CITIES_FOUND: "No Cities Found For This Section Please Contact Admin"
    }
};
