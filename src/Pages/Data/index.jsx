import { Spinner } from "@/Common";
import { useLang, useNotify, useValidateRole, useValidateSection } from "@/Hooks";
import { LogoutR, SetFilter, useGetCdnListQuery, useGetDataQuery } from "@/Redux";
import { BodyHelper, Helper } from "@/Utility";
import { Box, Flex } from "@chakra-ui/react";
import { clearAllListeners } from "@reduxjs/toolkit";
import { lazy, startTransition, Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const CdnTypes = ["Matrial", "Layout", "PriceList"];
const Pages = {
    1: lazy(() => import("./1")),
    2: lazy(() => import("./2"))
};
const ModalState = {
    CompoundId: "",
    Type: "",
    SendType: "",
    Title: "",
    Content: "",
    IsOpen: false
};
const ViewDataState = {
    IsOpen: false,
    Title: "",
    Content: ""
};
export default function AppDataPage() {
    const { Version, ServerStatus } = useSelector((state) => state.Helper);
    const { IsPersonal } = useValidateRole();
    const { IsCommercial, SelectedCityId } = useValidateSection();
    const Notify = useNotify();
    const Lang = useLang();
    const Dispatch = useDispatch();
    const Filter = useSelector((state) => state.Filter);
    const { UserAccessToken, UserSelectedResidential, UserSelectedCommercial } = useSelector(
        (state) => state.Auth
    );
    const [SelectedItem, SetSelectedItem] = useState(null);
    const [ViewData, SetViewData] = useState(ViewDataState);
    const [Modal, SetModal] = useState(ModalState);
    useEffect(() => {
        if (Version) {
            Dispatch(
                SetFilter({
                    Sort: "ASC",
                    OrderBy: "DataUnitTotalPriceFrom"
                })
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [Version]);
    // const
    const {
        data,
        isFetching,
        refetch: refetchData,
        isUninitialized,
        isError,
        error
    } = useGetDataQuery(BodyHelper.Data(Filter), {
        skip:
            !Filter.DataCityId ||
            Filter.DataCityId.length == 0 ||
            typeof Filter?.DataSectionId != "object" ||
            !UserAccessToken,
        refetchOnMountOrArgChange: true
    });
    useEffect(() => {
        if (isError) {
            const LogOutCodes = [401, 403];
            if (LogOutCodes.includes(error.status)) {
                const Msg = Helper.ValidateErrorMessage(error);
                Notify("error", Msg);
                Dispatch(LogoutR());
                clearAllListeners();
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isError]);
    const ProcessData = useMemo(() => {
        let Data = data?.data?.results;
        if (!IsPersonal) {
            let Selected = IsCommercial ? UserSelectedCommercial : UserSelectedResidential;
            if (Selected.length > 0) {
                const GetCityIfFound = Selected.find(
                    (item) => item.UserAreaCityId == SelectedCityId
                );
                if (GetCityIfFound) {
                    let SelectedIds = GetCityIfFound.UserAreaValue;
                    if (SelectedIds?.length > 0) {
                        Data = Data?.filter((item) => SelectedIds.includes(item.DataAreaId));
                    }
                }
            }
        }
        return {
            Data: data?.data ? Data : [],
            SideBar: data?.data ? data?.data?.Filter : [],
            Meta: data?.data ? data?.data?.meta : {}
        };
    }, [
        IsCommercial,
        IsPersonal,
        SelectedCityId,
        UserSelectedCommercial,
        UserSelectedResidential,
        data?.data
    ]);
    useEffect(() => {
        if (ServerStatus.Main) return;
        if (!isUninitialized) {
            refetchData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ServerStatus.Main, isUninitialized]);

    const HandleReset = useCallback(
        (WithSelected = true) => {
            if (Modal.IsOpen) {
                SetModal(ModalState);
            }
            if (ViewData.IsOpen) {
                SetViewData(ViewDataState);
            }
            if (WithSelected) {
                SetSelectedItem(null);
            }
        },
        [Modal.IsOpen, ViewData.IsOpen]
    );
    const HandleSelect = useCallback(
        (Item) => {
            const IsSelected = SelectedItem?.DataId == Item?.DataId;
            if (!IsSelected) {
                // startTransition(() => {
                // });
                SetSelectedItem(Item);
                HandleReset(false);
            }
        },
        [HandleReset, SelectedItem?.DataId]
    );
    const OnSetModalData = useCallback(
        (Data) => {
            let { Type, Extra } = Data || {
                Extra: ""
            };
            let error = false;
            switch (Type) {
                case "DataCoordinates":
                    if (!Data.Content)
                        error = Lang?.ERRORS?.NO_COORDINATES?.replace("{{Compound}}", Extra);
                    break;
                default:
                    break;
            }
            if (error) {
                Notify("error", error);
                return;
            }
            startTransition(() => {
                SetModal({
                    CompoundId: Data.CompoundId,
                    Title: Data.Title,
                    Content: Data.Content,
                    Type: Data.Type,
                    SendType: Data.SendType ? Data.SendType : "",
                    Size: Data?.Size ? Data.Size : null,
                    Extra: Data?.Extra ? Data?.Extra : null,
                    IsOpen: true
                });
                SetViewData(ViewDataState);
            });
        },
        [Lang?.ERRORS?.NO_COORDINATES, Notify]
    );
    const OnSetFileViewData = (Data) => {
        startTransition(() => {
            SetViewData({
                IsOpen: true,
                Title: Data.Title,
                Content: Data.Content
            });
        });
    };
    const {
        data: CdnData,
        isFetching: IsCdnLoading,
        isError: isCdnerror,
        error: CdnError
    } = useGetCdnListQuery(Modal.Content, {
        skip: !Modal.Content || !CdnTypes.includes(Modal.Type)
    });
    useEffect(() => {
        if (isCdnerror) {
            SetModal(ModalState);
            const Msg = Helper.ValidateErrorMessage(CdnError);
            Notify(CdnError.status == 503 ? "error" : "info", Msg);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isCdnerror]);
    useEffect(() => {
        if (Filter.DataViewTab) {
            HandleReset();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [Filter.DataViewTab]);
    useEffect(() => {
        if (Version) {
            HandleReset();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [Version]);
    const MainProps = {
        OnSetFileViewData,
        OnSetModalData,
        SelectedItem,
        IsCdnLoading,
        SetViewData,
        HandleSelect,
        ProcessData,
        HandleReset,
        isFetching,
        isCdnerror,
        ViewData,
        SetModal,
        CdnData,
        Notify,
        Filter,
        Modal,
        Lang
    };
    const PageToView = useMemo(() => {
        const Component = Pages[Version];
        return Component;
    }, [Version]);
    return (
        <Box h={"100vh"}>
            <Suspense
                fallback={
                    <Flex
                        fontSize={"3xl"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        h={"100vh"}
                    >
                        <Spinner Width={200} />
                    </Flex>
                }
            >
                <PageToView {...MainProps} />
            </Suspense>
        </Box>
    );
}
