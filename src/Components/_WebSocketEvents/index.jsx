import { SetServerStatus } from "@/Redux";
import { Helper, RoutingManager } from "@/Utility";
import WebSocketController from "@/Utility/WebSocketController";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
export default function WebSocketEvents({ Socket, UserId, Notify, dispatch, User }) {
    const Device = Helper.GetStorage("Device");
    const OldLang = Helper.GetStorage("Lang");
    const navigate = useNavigate();
    const PathName = useLocation().pathname;
    useEffect(() => {
        const ProtectedRoutes = Object.values(RoutingManager.Client)
            ?.filter((Rout) => Rout.Protected)
            ?.map((Rout) => Rout.Path?.toLowerCase());
        if (!User?.UserAccessToken && ProtectedRoutes.includes(PathName?.toLowerCase())) {
            navigate(RoutingManager.Client.Auth.Path);
        }
        if (
            User?.UserAccessToken &&
            PathName?.toLowerCase() == RoutingManager.Client.Auth.Path?.toLowerCase()
            // PathName?.toLowerCase()?.includes(RoutingManager.Client.Auth.Path?.toLowerCase())
        ) {
            navigate(RoutingManager.Client.Data.Path);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [PathName, User?.UserAccessToken]);
    useEffect(() => {
        function HandleEvents(Controller, key, data) {
            const { command } = data;
            const ProcessCommand = `${key}${command}`;
            if (Controller[ProcessCommand]) {
                Controller[ProcessCommand](data);
            }
            // IntegrationQrCode
            if (key == RoutingManager.Commands.Error && Controller[RoutingManager.Commands.Error]) {
                Controller[RoutingManager.Commands.Error](data);
            }
        }
        function HandleVerifyUser(Connection) {
            if (Connection == "Online") {
                dispatch(
                    SetServerStatus({
                        Main: true
                    })
                );
            }
            if (UserId && Device) {
                Socket.Emit(RoutingManager.SocketEvents.Auth, {
                    command: "Verify",
                    body: {
                        UserId: UserId,
                        UserDevice: Device || "",
                        UserConnection: Connection,
                        URole: User?.UserRole ? User?.UserRole?.RoleKey : ""
                    }
                });
            }
        }
        if (Socket) {
            Socket.On("connect", () => HandleVerifyUser("Online"));
            Socket.On("disconnect", () => HandleVerifyUser("Offline"));
            Socket.OnError((Err) => {
                if (Err) {
                    dispatch(
                        SetServerStatus({
                            Main: false
                        })
                    );
                }
            });
            // Socket.OnAny()
            Socket.Emit(RoutingManager.SocketEvents.Root, {
                command: "Index",
                query: {
                    UId: UserId,
                    UType: "U",
                    UDevice: Device,
                    URole: User?.UserRole ? User?.UserRole?.RoleKey : ""
                }
            });
            const Controller = new WebSocketController({
                dispatch: dispatch,
                Notify: Notify,
                navigate: navigate,
                Lang: OldLang
            });
            Object.keys(RoutingManager.SocketEvents).map((key) => {
                let k = key.includes(":") ? key.replace(":", "") : key;
                Socket.On(key, (data) => HandleEvents(Controller, k, data));
            });
            return () => {
                Object.keys(RoutingManager.SocketEvents).map((key) => {
                    let k = key.includes(":") ? key.replace(":", "") : key;
                    Socket.Off(key, (data) => HandleEvents(Controller, k, data));
                });
            };
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [Socket]);
    return null;
}
