import { LoginR, LogoutR, SetPublicData, SetWpData, UpdateUserData } from "@/Redux";
import Helper from "./Helper";
import { clearAllListeners } from "@reduxjs/toolkit";
import { FindLang } from "@/Utility/_FindLang";

class WebSocketController {
    constructor({ dispatch, navigate, Notify, Lang }) {
        this.dispatch = dispatch;
        this.Notify = Notify;
        this.navigate = navigate;
        this.SetLang(Lang);
    }
    async SetLang(Lang) {
        const FindLocal = await FindLang(Lang);
        this.Lang = FindLocal;
    }
    Error(data) {
        const LogOutCodes = [401, 403];
        const { code, message } = data;
        this.Notify("error", message);
        if (LogOutCodes.includes(code)) {
            this.dispatch(LogoutR());
            clearAllListeners();
        }
    }
    // Root
    RootIndex(data) {
        const { Device, User } = data.data;
        if (Device?.DeviceValue) {
            Helper.SetStorage("Device", Device?.DeviceValue);
        }
        if (User) {
            const OldUSerData = Helper.GetStorage("User");
            const UData = {
                UserId: User.UserId,
                UserName: User.UserName,
                UserEmail: User.UserEmail,
                UserPhoneNumber: User.UserPhoneNumber,
                UserCompanyName: User.UserCompanyName,
                UserRole: User.UserRole,
                UserSelectedResidential: User.UserSelectedResidential,
                UserSelectedCommercial: User.UserSelectedCommercial,
                UserAccessToken: User.UserAccessToken,
                UserExpiry: User.UserExpiry,
                UserIsActive: User.UserIsActive,
                UserIsConnectedSession: User?.UserIsConnectedSession
            };
            Object.assign(OldUSerData, UData);
            this.dispatch(LoginR(OldUSerData));
            delete data.data?.User;
        }
        this.dispatch(
            SetPublicData({
                ...data.data
            })
        );
    }
    IntegrationQrCode(data) {
        const { message } = data;
        const { QRCode } = data.data || {};
        const UserData = Helper.GetStorage("User");
        const { UserIsConnectedSession } = UserData;
        const IsSettings = window.location.pathname == "/Settings";
        if (!UserIsConnectedSession && IsSettings) {
            if (QRCode) {
                this.Notify("info", this.Lang.WHASTAPP_SENDER?.MESSAGES?.[message]);
                this.dispatch(
                    SetWpData({
                        Avatar: QRCode
                    })
                );
            }
            if (QRCode == null) {
                this.Notify("error", this.Lang.WHASTAPP_SENDER?.MESSAGES?.[`${message}_NULL`]);
                this.dispatch(
                    SetWpData({
                        Avatar: "/Img/whatsapp.webp"
                    })
                );
            }
        }
    }
    IntegrationConnecting(data) {
        const { message } = data;
        const IsSettings = window.location.pathname == "/Settings";
        if (IsSettings) {
            this.Notify("warn", this?.Lang.WHASTAPP_SENDER?.MESSAGES?.[message]);
        }
    }
    IntegrationConnected(data) {
        const { message, data: UserDetails } = data;
        this.Notify("success", this.Lang?.WHASTAPP_SENDER?.MESSAGES?.[message]);
        // const UserData = Helper.GetStorage("User");
        // const {UserIsConnectedSession} = UserData;
        if (UserDetails) {
            const Data = {
                IsConnected: true,
                Name: UserDetails.WaName,
                Phone: UserDetails.WaPhone,
                Avatar: UserDetails.WaAvatar
            };
            this.dispatch(SetWpData(Data));
            this.dispatch(
                UpdateUserData({
                    UserIsConnectedSession: true
                })
            );
        }
    }
    SubUserSettings(data) {
        if (data?.data) {
            this.dispatch(UpdateUserData(data?.data));
        }
    }
}
export default WebSocketController;
