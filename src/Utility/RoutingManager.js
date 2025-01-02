import { io } from "socket.io-client";
const Config = window.Config;
const MainDomain = Config.DOMAIN_URL?.endsWith("/")
    ? Config.DOMAIN_URL?.slice(0, -1)
    : Config.DOMAIN_URL;
const MainApiPath = Config.API_URL?.startsWith("/") ? Config.API_URL : "/" + Config.API_URL;
const MainWsPath = Config.WS?.startsWith("/") ? Config.WS : "/" + Config.WS;
class RoutingManager {
    static MainDomain = MainDomain;
    static ApiUrl = MainDomain + MainApiPath;
    static Client = {
        // Home: {
        //     Path: "/",
        //     Name: "Home",
        //     Allowed: true,
        //     Protected: true
        // },
        Auth: {
            Path: "/",
            Name: "Auth",
            Allowed: false,
            Protected: false
        },
        AuthReset: {
            Path: "/Auth/Reset",
            Name: "Reset",
            Allowed: false,
            Protected: false
        },
        Data: {
            Path: "/Data",
            Name: "Data",
            Allowed: true,
            Protected: true
        },
        Settings: {
            Path: "/Settings",
            Name: "Settings",
            Allowed: true,
            Protected: true
        },
        Dashboard: {
            Path: "/Dashboard",
            Name: "Dashboard",
            Allowed: false,
            Protected: true
        },
        Admin: {
            Path: "/Admin",
            Name: "Admin",
            Allowed: false,
            Protected: true
        }
        // Comparison: {
        //     Path: "/Comparison",
        //     Name: "Comparison",
        //     Allowed: true,
        //     Protected: true
        // }
    };
    static SocketConnection = (Local, Token = false) => {
        const Headers = {
            Local: Local
        };
        if (Token) {
            Headers.Authorization = Token;
        }
        const Io = io(MainDomain, {
            path: MainWsPath,
            extraHeaders: Headers,
            autoConnect: false
        });
        return Io;
    };
    static SocketEvents = {
        Error: "Error",
        Expired: "Expired",
        SubUser: "SubUser",
        Auth: "Auth",
        Root: "Root",
        Cdn: "Cdn",
        Integration: "Integration"
    };
    static Commands = {
        Error: "Error",
        Index: "Index",
        Login: "Login",
        Register: "Register",
        RegisterEvent: "RegisterEvent",
        Forget: "Forget",
        CheckForget: "CheckForget",
        Reset: "Reset",
        Verify: "Verify",
        Show: "Show",
        Create: "Create",
        Update: "Update",
        Delete: "Delete",
        Upload: "Upload",
        Download: "Download",
        History: "History",
        Settings: "Settings",
        Import: "Import",
        Export: "Export",
        Restore: "Restore",
        Expired: "Expired",
        //  =========== WHAtsApp ================
        QrCode: "QrCode",
        Connecting: "Connecting",
        Connected: "Connected",
        Text: "Text",
        File: "File",
        FileUrl: "FileUrl",
        List: "List"
    };
}

export default RoutingManager;
