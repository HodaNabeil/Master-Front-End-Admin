import { InputField, Spinner } from "@/Common";
import { useLang, useNotify } from "@/Hooks";
import { useCheckMutation, useResetMutation } from "@/Redux";
import { RoutingManager, Validation } from "@/Utility";
import { Button, Flex, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ResetPage() {
    const toast = useNotify();
    const Lang = useLang();
    const Navigate = useNavigate();
    const [state, setState] = useState({
        UserPhoneNumber: "",
        UserForgetPasswordCode: "",
        UserPassword: "",
        RetypePassword: "",
        UType: "U",
        IsLoading: true,
        FailReset: false,
        StartCheck: false,
        IsChecking: false,
        SuccessReset: false,
        Message: ""
    });
    const [Check, { isError: isCheckError, error: CheckError }] = useCheckMutation();
    const [Reset, { isError: isResetError, error: ResetError, isLoading: isResetLoading }] =
        useResetMutation();
    useEffect(() => {
        const Search = window.location.search;
        const ParsedUrl = new URLSearchParams(Search);
        const Phone = ParsedUrl.get("PhoneNumber"),
            Code = ParsedUrl.get("c"),
            Utype = ParsedUrl.get("u");
        const HasValues = {
            PhoneNumber: false,
            c: false,
            u: false
        };
        const HasPhones = ParsedUrl.entries();
        for (const [Key, Value] of HasPhones) {
            if (Value && Value != "" && Value != null) {
                HasValues[Key] = true;
            }
        }
        setTimeout(() => {
            setState((prev) => {
                if (Object.values(HasValues).every((x) => x)) {
                    return {
                        ...prev,
                        UserPhoneNumber: Phone,
                        UserForgetPasswordCode: Code,
                        UType: Utype,
                        StartCheck: true
                    };
                } else {
                    return {
                        ...prev,
                        FailReset: true,
                        IsLoading: false
                    };
                }
            });
        }, 3000);
    }, []);
    useEffect(() => {
        async function CheckData(state) {
            const { data } = await Check({
                UserPhoneNumber: state.UserPhoneNumber,
                UType: state.UType
            });
            if (data && !data.error) {
                setTimeout(() => {
                    setState((prev) => ({
                        ...prev,
                        IsLoading: false,
                        FailReset: false,
                        StartCheck: false,
                        IsChecking: false,
                        SuccessReset: true,
                        Message: ""
                    }));
                }, 3000);
            }
        }
        if (state.StartCheck) {
            setState((prev) => ({
                ...prev,
                IsChecking: true
            }));
            setTimeout(() => {
                CheckData(state);
            }, 3000);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.StartCheck]);
    useEffect(() => {
        if (isCheckError) {
            const Msg = CheckError.data.message || CheckError.message || CheckError.data || "Error";
            setTimeout(() => {
                setState((prev) => ({
                    ...prev,
                    FailReset: true,
                    IsLoading: false,
                    Message: Msg
                }));
            }, 3000);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isCheckError]);
    useEffect(() => {
        if (isResetError) {
            const Msg = ResetError.data.message || ResetError.message || ResetError.data || "Error";
            return toast("error", Msg, false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isResetError]);
    const HandleSubmit = async (e, state) => {
        e.preventDefault();
        const errors = Validation.Reset(state);
        if (errors.length > 0) {
            return toast("error", Lang?.VALIDATION?.[errors[0]]);
        }
        const { data } = await Reset({
            UserPhoneNumber: state.UserPhoneNumber,
            UserForgetPasswordCode: state.UserForgetPasswordCode,
            UserPassword: state.UserPassword,
            UType: state.UType
        });
        if (data && !data.error) {
            setState((prev) => ({
                ...prev,
                IsLoading: false,
                FailReset: false,
                StartCheck: false,
                IsChecking: false,
                Message: ""
            }));
            if (data.data?.IsUpdated) {
                toast("success", data.message, false);
                Navigate(RoutingManager.Client.Auth.Path);
            }
        }
    };
    return (
        <Flex justifyContent={"center"} alignItems={"center"} h={"100vh"}>
            <Flex
                justifyContent={"center"}
                alignItems={"center"}
                flexDir={"column"}
                className="shadow"
                w={{
                    base: "100%",
                    md: "80%"
                }}
                h={{
                    base: "50%",
                    md: "50%"
                }}
                rounded={"lg"}
            >
                {state.IsLoading && <IsLoading IsCheck={state.IsChecking} Lang={Lang} />}
                {state.FailReset && <FailReset Message={state.Message} Lang={Lang} />}
                {state.SuccessReset && (
                    <SuccessReset
                        state={state}
                        setState={setState}
                        HandleSubmit={HandleSubmit}
                        IsLoading={isResetLoading}
                        Lang={Lang}
                    />
                )}
            </Flex>
        </Flex>
    );
}
function IsLoading({ IsCheck, Lang }) {
    return (
        <>
            <Spinner Width={200} />
            <Text>
                {IsCheck
                    ? Lang.AUTH_PAGE.MESSAGES.VERIFY_LOADING
                    : Lang.AUTH_PAGE.MESSAGES.VERIFY_LOADING2}
            </Text>
        </>
    );
}
function FailReset({ Message, Lang }) {
    return (
        <>
            <p>{Lang.AUTH_PAGE.MESSAGES.VERIFY_FAIL}</p>
            <p>
                <span style={{ color: "red" }}>{Lang.AUTH_PAGE.MESSAGES.REASON} </span>
                <span style={{ color: "lightcoral" }}>{Message}</span>
            </p>
        </>
    );
}

function SuccessReset({ state, setState, HandleSubmit, IsLoading, Lang }) {
    return (
        <form
            onSubmit={(e) => HandleSubmit(e, state)}
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                alignItems: "center",
                justifyContent: "center",
                padding: "20px",
                borderRadius: "10px"
            }}
            className="shadow"
        >
            <InputField
                Label={Lang?.AUTH_PAGE?.INPUTS?.PASSWORD}
                Name="Password"
                Value={state.UserPassword}
                OnChange={(e) => setState((prev) => ({ ...prev, UserPassword: e.target.value }))}
                Type="password"
                IsAuth={true}
                />
            <InputField
                Label={Lang?.AUTH_PAGE?.INPUTS?.CONFIRM_PASSWORD}
                Name="Password"
                Value={state.RetypePassword}
                OnChange={(e) => setState((prev) => ({ ...prev, RetypePassword: e.target.value }))}
                Type="password"
                IsAuth={true}
            />
            <Button
                type="submit"
                colorScheme="whiteAlpha"
                variant="outline"
                color={"white"}
                width={"100%"}
                my="20px"
                letterSpacing={"2px"}
                transition={"0.3s"}
                _hover={{ letterSpacing: "4px" }}
                isLoading={IsLoading}
                isDisabled={IsLoading}
            >
                {Lang?.SUBMIT}
            </Button>
        </form>
    );
}
