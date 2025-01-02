import { AuthLogin, AuthRegister, AuthForget } from "@/Components";
import { Box, Flex, Text } from "@chakra-ui/react";
import { cloneElement, useEffect, useReducer, useState } from "react";
import { useLang, useNotify } from "@/Hooks";
import { Actions, AuthInitialState, HandleChangeReducer, Helper, RoutingManager } from "@/Utility";
import { LoginR, useForgetMutation, useLoginMutation, useRegisterMutation } from "@/Redux";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LangSwitch } from "@/Common";

const AuthPage = () => {
    // Login , Register, Forget
    const Lang = useLang();
    const { Rtl } = useSelector((state) => state.Helper);
    const [ActiveTab, setActiveTab] = useState("Login");
    const toast = useNotify();
    const Navigate = useNavigate();
    const DispatchR = useDispatch();
    const [state, disptach] = useReducer(HandleChangeReducer, AuthInitialState);
    const [Login, { isError: isLoginError, error: LoginError, isLoading: isLoginLoading }] =
        useLoginMutation();
    const [
        Register,
        { isError: isRegisterError, error: RegisterError, isLoading: isRegisterLoading }
    ] = useRegisterMutation();
    const [Forget, { isError: isForgetError, error: ForgetError, isLoading: isForgetLoading }] =
        useForgetMutation();
    const HandleChange = (e) => {
        disptach({
            type: Actions.SetData,
            payload: {
                [e.target.name]: e.target.value
            }
        });
    };
    const HandleSubmit = async (e, Type, state = {}) => {
        e.preventDefault();
        const Funs = {
            Login,
            Register,
            Forget
        };
        const DataToSend = {
            Login: {
                UType: state.UType,
                Method: Helper.ValidateNumber(state.Method),
                Password: state.Password
            },
            Register: {
                UserName: state.UserName,
                UserEmail: state.UserEmail,
                UserPhoneNumber: Helper.ValidateNumber(state.UserPhoneNumber),
                UserPassword: state.UserPassword,
                UserRoleId: parseInt(state.UserRoleId),
                UserCompanyName: state.UserCompanyName,
                UserSubUsersCount: state.UserSubUsersCount,
                UserPlan: state.UserPlan,
                UserSections:
                    state.UserSections?.length > 0
                        ? state.UserSections.map((x) => ({
                              SectionId: x.SectionId,
                              SectionKey: x.SectionKey,
                              SectionName: x.SectionName
                          }))
                        : [],

                Residential:
                    state.Residential?.length > 0
                        ? state.Residential.map((x) => ({
                              CityId: x.CityId,
                              CityName: x.CityName,
                              CitySectionId: x.CitySectionId
                          }))
                        : [],

                Commercial:
                    state.Commercial?.length > 0
                        ? state.Commercial.map((x) => ({
                              CityId: x.CityId,
                              CityName: x.CityName,
                              CitySectionId: x.CitySectionId
                          }))
                        : []
            },
            Forget: {
                UserPhoneNumber: Helper.ValidateNumber(state.UserPhoneNumber),
                UType: state.UType,
                Redirct: window.location.origin + RoutingManager.Client.AuthReset.Path
            }
        };
        const { data } = await Funs[Type](DataToSend[Type]);
        // console.log({
        //     data
        // })
        const ToLoginGroup = ["Register", "Forget"];
        if (data) {
            toast("success", data.message, true);
            if (Type == "Login") {
                DispatchR(LoginR(data.data));
                Navigate(RoutingManager.Client.Data.Path);
            }
            if (ToLoginGroup.includes(Type)) {
                setActiveTab("Login");
            }
        }
    };
    useEffect(() => {
        if (isLoginError) {
            const Msg = Helper.ValidateErrorMessage(LoginError);
            toast("error", Msg);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoginError]);
    useEffect(() => {
        if (isRegisterError) {
            const Msg = Helper.ValidateErrorMessage(RegisterError);
            toast("error", Msg);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isRegisterError]);
    useEffect(() => {
        if (isForgetError) {
            const Msg = Helper.ValidateErrorMessage(ForgetError);
            toast("error", Msg);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isForgetError]);

    const Tabs = {
        Login: (
            <AuthLogin
                HandleChange={HandleChange}
                state={state}
                HandleSubmit={HandleSubmit}
                IsLoading={isLoginLoading}
                Lang={Lang}
                Rtl={Rtl}
            />
        ),
        Register: (
            <AuthRegister
                state={state}
                disptach={disptach}
                HandleSubmit={HandleSubmit}
                HandleChange={HandleChange}
                IsLoading={isRegisterLoading}
                Lang={Lang}
                Rtl={Rtl}
            />
        ),
        Forget: (
            <AuthForget
                state={state}
                HandleSubmit={HandleSubmit}
                disptach={disptach}
                HandleChange={HandleChange}
                IsLoading={isForgetLoading}
                Lang={Lang}
                Rtl={Rtl}
            />
        )
    };
    return (
        <Box
            position={"relative"}
            w={"100%"}
            h="100vh"
            overflow={"hidden"}
            bg={{
                base: "linear-gradient(to bottom, #0e2d3f, #354f5e)",
                md: `url(/Img/master-auth-img.webp) no-repeat`
            }}
            bgSize={{
                base: "unset",
                md: `100% 100%`
            }}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
        >
            <Flex
                pos={"fixed"}
                bottom={"1rem"}
                left={"1rem"}
                gap={"1rem"}
                flexDir={"column"}
                justifyContent={"center"}
            >
                <LangSwitch />
            </Flex>
            <Flex
                w={"100%"}
                justifyContent={"end"}
                pr={{
                    base: "1rem",
                    sm: "7rem"
                }}
            >
                <Box
                    bg={"transparent"}
                    backdropFilter={"blur(5px)"}
                    w={{
                        base: "22rem",
                        md: "22rem"
                    }}
                    p={"1rem"}
                    className="Shadow-Auth"
                    rounded={"md"}
                >
                    <Text
                        as="h5"
                        textAlign={"center"}
                        color={"white"}
                        p="10px"
                        letterSpacing={"1px"}
                        fontWeight={"600"}
                    >
                        {/* {ActiveTab == "Forget" ? "Forget Password" : ActiveTab} */}
                        {Lang?.AUTH_PAGE?.LABEL[ActiveTab]}
                    </Text>
                    {cloneElement(Tabs[ActiveTab], {
                        setActiveTab
                    })}
                </Box>
            </Flex>
        </Box>
    );
};

export default AuthPage;
