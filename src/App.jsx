import { lazy, Suspense, useEffect, useState } from "react";
import "./index.css";
import { Helper, RoutingManager, WebSocketInstance } from "./Utility";
import { useDispatch, useSelector } from "react-redux";
import { LoginR, SetHelperData, SetNewLang } from "./Redux";
import { Routes, Route } from "react-router-dom";
import { WebSocketEvents } from "./Components";
import { useNotify, useOnline } from "./Hooks";
import { Box } from "@chakra-ui/react";
import { Loader, OfflineMessage } from "./Common";
import Admin from "./Pages/Admin";

const Error404 = lazy(() => import("./Pages/Error404"));

const AuthPage = lazy(() => import("./Pages/Auth"));
const AuthResetPage = lazy(() => import("./Pages/Auth/Reset"));
function App() {
    const { ServerStatus } = useSelector((state) => state.Helper);
    const IsOnline = useOnline();
    const OldLang = Helper.GetStorage("Lang");
    const User = Helper.GetStorage("User");
    const Version = Helper.GetStorage("Version");
    const dispatch = useDispatch();
    const Notify = useNotify();
    const [Socket, setSocket] = useState(null);
    const { UserId } = useSelector((state) => state.Auth);
    useEffect(() => {
        if (Version) {
            // Helper.UpdateVersion(Version);
            dispatch(SetHelperData({ Version: Version }));
        } else {
            Helper.SetStorage("Version", "1");
        }
    }, [Version, dispatch]);

    useEffect(() => {
        if (!OldLang) {
            dispatch(SetNewLang("en"));
        }
        if (User?.UserAccessToken) {
            dispatch(LoginR(User));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        const ConnectToSocket = (OldLang, Token) => {
            if (Socket) {
                Socket.Close();
            }
            const SocketInstace = RoutingManager.SocketConnection(OldLang, Token);
            const CustomeWebSocket = new WebSocketInstance(SocketInstace);
            CustomeWebSocket.Connect();
            setSocket(CustomeWebSocket);
        };
        if (OldLang) {
            dispatch(SetNewLang(OldLang));
            if (User?.UserAccessToken) {
                ConnectToSocket(OldLang, User?.UserAccessToken);
                return;
            }
            ConnectToSocket(OldLang);
        } else {
            dispatch(SetNewLang("en"));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [OldLang, User?.UserAccessToken]);
    return (
        <Box className="Main-Background">
            <WebSocketEvents
                Socket={Socket}
                UserId={UserId}
                Notify={Notify}
                dispatch={dispatch}
                User={User}
            />
            {!(ServerStatus.Main && IsOnline) && <OfflineMessage />}
            <Suspense fallback={<Loader />}>
                <Routes>
                    {/* / */}
                    {/* <Route path={RoutingManager.Client.Home.Path} element={<HomePage />} /> */}
                    <Route path={RoutingManager.Client.Auth.Path} element={<AuthPage />} />
                    <Route
                        path={RoutingManager.Client.AuthReset.Path}
                        element={<AuthResetPage Type={"Password"} />}
                    />

                    <Route path={RoutingManager.Client.Admin.Path} element={<Admin />} />
                    <Route path="*" element={<Error404 />} />
                </Routes>
            </Suspense>
        </Box>
    );
}

export default App;
