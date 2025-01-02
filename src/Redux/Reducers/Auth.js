import { Helper } from "@/Utility";
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    UserId: "",
    UserName: "",
    UserEmail: "",
    UserPhoneNumber: "",
    UserCompanyName: "",
    UserRole: "",
    UserSelectedResidential: [],
    UserSelectedCommercial: [],
    UserExpiry: null,
    UserAccessToken: "",
    UserIsConnectedSession: false
};
const Reducer = createSlice({
    name: "Auth",
    initialState,
    reducers: {
        LoginR: (state, action) => {
            const { UserAccessToken, UserIsConnectedSession } = action.payload;
            // console.log(action.payload);
            const UData = {
                UserId: action.payload.UserId,
                UserName: action.payload.UserName,
                UserEmail: action.payload.UserEmail,
                UserPhoneNumber: action.payload.UserPhoneNumber,
                UserCompanyName: action.payload.UserCompanyName,
                UserRole: action.payload.UserRole,
                UserSelectedResidential: action.payload.UserSelectedResidential,
                UserSelectedCommercial: action.payload.UserSelectedCommercial,
                UserAccessToken: UserAccessToken ? UserAccessToken : state.UserAccessToken,
                UserExpiry: action.payload.UserExpiry,
                UserIsActive: action.payload.UserIsActive,
                UserPassword: action.payload.UserPassword,
                UserIsConnectedSession: UserIsConnectedSession
                    ? UserIsConnectedSession
                    : state.UserIsConnectedSession
            };
            Helper.SetStorage("User", UData);
            return {
                ...state,
                ...UData
            };
        },
        LogoutR: () => {
            Helper.ClearStorage();
            return initialState;
        },
        UpdateUserData: (state, action) => {
            const NewData = {
                ...state,
                ...action.payload
            };
            Helper.SetStorage("User", NewData);
            return NewData;
        }
    }
});

export default Reducer.reducer;
export const { LoginR, LogoutR, UpdateUserData } = Reducer.actions;
