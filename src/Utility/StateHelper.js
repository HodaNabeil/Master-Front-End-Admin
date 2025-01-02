const Actions = {
    SetData: "SetData",
    DataTypeId: "DataTypeId"
};
const AuthInitialState = {
    Method: "+2",
    Password: "",
    UType: "U",
    // =================    Register   ==============//
    UserName: "",
    UserEmail: "",
    UserPhoneNumber: "",
    UserPassword: "",
    UserRoleId: "4",
    UserCompanyName: "",
    UserSubUsersCount: "",
    UserSections: [],
    Residential: [],
    Commercial: [],
    UserPlan: ""
};
const HandleChangeReducer = (state = {}, action = {}) => {
    const { type, payload } = action;
    switch (type) {
        case Actions.SetData:
            return {
                ...state,
                ...payload
            };
        default: {
            return AuthInitialState;
        }
    }
};
const InitialFilterResidential = {
    // 1 = Residential Data , 2  = Commercial Data
    DataAreaId: [],
    DataTypeId: "",
    DataSubTypeId: [],
    // ============= Utp ===========
    DataUnitTotalPriceFrom: "",
    DataUnitTotalPriceTo: "",
    DataUnitPriceType: "Installment", // "Installment" Or "CashDiscount"
    // ============= Bs ===========
    DataBedRooms: [],
    // ============= Fg ===========
    DataFinishingId: "",
    // // =============== Dly ============
    DataDeliveryFrom: "",
    DataDeliveryTo: "",
    // ========== Payment Plan ==============
    // // =========== Ys = Installment ================
    DataYearsFrom: "",
    DataYearsTo: "",
    // =============== Dp = DownPayment ============
    DataDownPaymentFrom: "",
    DataDownPaymentTo: "",
    // ========== End Payment Plan ==============
    // =========== Bua ================
    DataBuiltUpAreaFrom: "",
    DataBuiltUpAreaTo: "",
    DataCompoundId: [],
    DataDeveloperId: [],
    IsCityScape: false,
    DataExtraBenefits: [],
    DataEngineering: [],
    DataExecutive: [],
    DataManagement: [],
    DataArchitecture: []
    //phase.statusid
};
const Objectkeys = [];
const TextKeys = [];
const ToggleKeys = [];
export const ArrayKeys = [
    "DataCityId",
    "DataAreaId",
    "DataSubTypeId",
    "DataBedRooms",
    "DataCompoundId",
    "DataDeveloperId"
];
const HandelChangeFilter = (state = {}, action = {}) => {
    const { type, payload } = action;
    const IsChoose = type?.startsWith("Choose");
    if (IsChoose) {
        const ProcessKey = type.slice("Choose".length);
        const OldData = state[ProcessKey];
        if (!ArrayKeys.includes(ProcessKey)) return state;
        return {
            ...state,
            [ProcessKey]: payload.checked
                ? [...OldData, payload.id]
                : OldData.filter((id) => id !== payload.id)
        };
    }
    if (ToggleKeys.includes(action.type)) {
        return {
            ...state,
            [action.type]: !state[action.type]
        };
    }
    switch (type) {
        case "Change": {
            return {
                ...state,
                ...payload
            };
        }
        case "Reset": {
            return InitialFilterResidential;
        }
        default:
            return InitialFilterResidential;
    }
};
// const States = {
//     SubUserFilter: {
//         Limit: 10,
//         Page: 1,
//         Sort: "ASC",
//         OrderBy: "UserId",
//         SearchBy: "",
//         Search: "",
//         To: "",
//         From: ""
//     }
// };
// const HandelChangeState = (state = {}, action = {}) => {
//     const { type, payload, Key } = action;
//     switch (type) {
//         case "Change": {
//             return {
//                 ...state,
//                 ...payload
//             };
//         }
//         case "Reset": {
//             return InitialFilterResidential;
//         }
//         default:
//             return InitialFilterResidential;
//     }
// };

export {
    AuthInitialState,
    InitialFilterResidential,
    HandleChangeReducer,
    HandelChangeFilter,
    Actions
};
