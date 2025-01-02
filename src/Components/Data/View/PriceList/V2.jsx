import { startTransition, useEffect, useMemo, useRef, useState } from "react";
import { FaDownload } from "react-icons/fa";
import { Flex, IconButton, Tooltip, GridItem, Box, Grid, Image } from "@chakra-ui/react";
import { Spinner, ZoomableImage } from "@/Common";
import { useFileMutation } from "@/Redux";
import { Helper, RoutingManager } from "@/Utility";
import { useNotify, useWindowSize } from "@/Hooks";
import { BsFullscreen, BsFullscreenExit } from "react-icons/bs";
import { MdViewSidebar } from "react-icons/md";
import { useSelector } from "react-redux";
const PriceListView = ({
    Data = {
        IsOpen: false,
        Title: "",
        Content: {
            Type: "PriceList",
            CompoundId: "",
            CityId: ""
        },
        Extra: ""
    },
    Lang,
    CdnData,
    IsLoading = true,
    ModalsProps = {
        OnChecked: () => {},
        RichedLimit: false,
        Checked: {}
    }
}) => {
    const { height: WindowHeight, width: WindowWidth } = useWindowSize();
    const FullScreenElement = useRef(null);
    const [IsFullScreen, setIsFullScreen] = useState(false);
    const Notify = useNotify();
    const [state, setState] = useState({
        title: Data.Title,
        view: "",
        path: "",
        open: false
    });
    const FindCdnList = useMemo(() => {
        return CdnData?.data?.Files ? CdnData?.data?.Files : null;
    }, [CdnData]);
    useEffect(() => {
        if (Data.IsOpen && FindCdnList?.length > 0) {
            setState((prev) => {
                return {
                    ...prev,
                    path: FindCdnList[0].FileUrl,
                    view: FindCdnList[0].FullUrl,
                    open: true
                };
            });
        } else {
            setState((prev) => ({
                ...prev,
                view: "",
                path: "",
                open: true
            }));
        }
    }, [Data.IsOpen, FindCdnList]);
    useEffect(() => {
        if (!state?.open) return;
        startTransition(() => {
            ModalsProps.OnChecked("PriceListFile", state.path);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.open, state.path]);
    const HandleSelectFile = (item) => {
        setState({
            ...state,
            path: item.FileUrl,
            view: item.FullUrl
        });
    };
    const [
        DownloadFile,
        { isError: isDownloadError, error: downloadError, isLoading: downloadLoading }
    ] = useFileMutation();
    const HandleDownloadFile = async (FileUrl, type) => {
        const { data } = await DownloadFile({
            FileUrl
        });
        if (data?.data) {
            const { FileName, FileUrl } = data.data || {};
            if (type == "Download") {
                Helper.DownloadFile(FileUrl, FileName);
            } else {
                Helper.PrintImage(FileUrl, FileName);
            }
            return;
        }
    };
    useEffect(() => {
        if (isDownloadError) {
            const Msg = Helper.ValidateErrorMessage(downloadError);
            Notify(downloadError.status == 503 ? "error" : "info", Msg);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDownloadError]);
    const OnSelect = (Key, Value) => {
        startTransition(() => {
            setState({
                ...state,
                [Key]: Value
            });
        });
    };
    const { UserAccessToken } = useSelector((State) => State.Auth);
    const ProcessUrl = (url) => {
        const Process = `${
            RoutingManager.MainDomain
        }${url}&Authorization=${UserAccessToken}&ForWord=${window.location.origin}&T=${Date.now()}`;
        return Process;
    };
    const CalcHeight = useMemo(() => {
        const HandlGetSize = () => {
            if (IsFullScreen) return { H1: "", H2: "100vh" };
            const MainElemet = document.getElementById("Data-Right-Box");
            const mainElemetHeight = MainElemet?.clientHeight || 0;
            const maxHeight = mainElemetHeight * 0.9;
            const element1Height = Math.round(maxHeight * 0.12); // 12% for the first element
            const element2Height = Math.round(maxHeight * 0.91); // 88% for the second element
            return {
                H1: `${element1Height / 16}rem`,
                H2: `${element2Height / 16}rem`
            };
        }
        return HandlGetSize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [IsFullScreen, WindowWidth, WindowHeight]);
    // if (isError) return null;
    return (
        <>
            <Box w={"100%"} h={"95%"} mt={"5%"}>
                {IsLoading ? (
                    <Flex fontSize={"3xl"} justifyContent={"center"} alignItems={"center"}>
                        <Spinner Width={200} />
                    </Flex>
                ) : (
                    <Box ref={FullScreenElement} pos={"relative"}>
                        {FindCdnList && FindCdnList.length > 0 ? (
                            <Grid templateColumns="repeat(24, 1fr)" gap={1}>
                                {state.open && (
                                    <GridItem
                                        colSpan={24}
                                        rounded={"md"}
                                        className="Shadow"
                                        transition={"grid-column 0.5s ease"}
                                        py={0}
                                        pr={state.open ? 0 : 1}
                                    >
                                        <Flex
                                            justifyContent={"space-between"}
                                            alignItems={"center"}
                                        >
                                            <Box>{Lang?.DATA_PAGE?.PHASES}</Box>
                                            <Flex
                                                justifyContent={"space-between"}
                                                gap={1}
                                                alignItems={"center"}
                                            >
                                                <Tooltip
                                                    label={Lang?.FULL_SCREEN}
                                                    hasArrow={true}
                                                    gutter={0}
                                                >
                                                    <IconButton
                                                        cursor={"pointer"}
                                                        aria-label={Lang?.FULL_SCREEN}
                                                        rounded={"full"}
                                                        onClick={() =>
                                                            Helper.ToggleFullScreen(
                                                                FullScreenElement,
                                                                setIsFullScreen
                                                            )
                                                        }
                                                        fontWeight={"bold"}
                                                        size={"sm"}
                                                        fontSize={"1.2rem"}
                                                        icon={
                                                            IsFullScreen ? (
                                                                <BsFullscreenExit />
                                                            ) : (
                                                                <BsFullscreen />
                                                            )
                                                        }
                                                    />
                                                </Tooltip>
                                                <Tooltip
                                                    label={Lang?.DOWNLOAD}
                                                    hasArrow={true}
                                                    gutter={0}
                                                >
                                                    <IconButton
                                                        aria-label={Lang?.DOWNLOAD}
                                                        size={"sm"}
                                                        display={{
                                                            base: "none",
                                                            md: "flex"
                                                        }}
                                                        rounded={"full"}
                                                        fontSize={"1.2rem"}
                                                        icon={<FaDownload />}
                                                        isLoading={downloadLoading}
                                                        isDisabled={downloadLoading}
                                                        onClick={() =>
                                                            HandleDownloadFile(
                                                                state.path,
                                                                "Download"
                                                            )
                                                        }
                                                    />
                                                </Tooltip>
                                                <IconButton
                                                    onClick={() => OnSelect("open", !state.open)}
                                                    icon={<MdViewSidebar />}
                                                    size={"sm"}
                                                    rounded={"full"}
                                                    fontSize={"1.2rem"}
                                                    transform={"rotate(180deg)"}
                                                    zIndex={10}
                                                />
                                            </Flex>
                                        </Flex>
                                        <Box
                                            // maxH={IsFullScreen ? "100vh" : "auto"}
                                            overflowY={{
                                                base: "unset",
                                                md: "auto"
                                            }}
                                            overflowX={{
                                                base: "auto",
                                                md: "unset"
                                            }}
                                            w={"100%"}
                                            display={{
                                                base: "-webkit-box",
                                                md: "flex"
                                            }}
                                            gap={"2"}
                                            py={0}
                                            px={"1"}
                                        >
                                            {FindCdnList &&
                                                FindCdnList.map((item, index) => {
                                                    return (
                                                        <div key={index}>
                                                            <Image
                                                                onClick={() => {
                                                                    HandleSelectFile(item);
                                                                }}
                                                                cursor={"pointer"}
                                                                rounded={"lg"}
                                                                src={ProcessUrl(item.FullUrl)}
                                                                filter={
                                                                    state.view == item.FullUrl
                                                                        ? "hue-rotate(250deg)"
                                                                        : "brightness(1)"
                                                                }
                                                                boxSize={`calc(${CalcHeight.H1} - calc(${CalcHeight.H1} * 0.4))`}
                                                                onError={(e) => {
                                                                    e.onError = null;
                                                                    e.target.src =
                                                                        "/Img/Not_Found.webp";
                                                                }}
                                                            />
                                                        </div>
                                                    );
                                                })}
                                        </Box>
                                    </GridItem>
                                )}
                                <GridItem colSpan={24} rounded={"md"} position={"relative"}>
                                    {!state.open && (
                                        <IconButton
                                            onClick={() => OnSelect("open", !state.open)}
                                            icon={<MdViewSidebar />}
                                            size={"sm"}
                                            rounded={"full"}
                                            fontSize={"1.2rem"}
                                            transform={"rotate(180deg)"}
                                            pos={"absolute"}
                                            top={"-2rem"}
                                            right={"15%"}
                                            zIndex={10}
                                        />
                                    )}
                                    <Box rounded={"md"}>
                                        <ZoomableImage
                                            Src={ProcessUrl(state.view)}
                                            width={"100%"}
                                            height={"auto"}
                                            rounded={"md"}
                                            // overflow={"hidden"}
                                            PlaceMent={{
                                                pos: "sticky",
                                                top: ".2rem",
                                                left: ".5rem"
                                            }}
                                            IsFullScreen={IsFullScreen}
                                            maxH={CalcHeight.H2}
                                            overflowY={"auto"}
                                        />
                                    </Box>
                                </GridItem>
                            </Grid>
                        ) : (
                            <Flex fontSize={"3xl"} justifyContent={"center"} alignItems={"center"}>
                                <Spinner Width={200} />
                            </Flex>
                        )}
                        {IsFullScreen && (
                            <IconButton
                                cursor={"pointer"}
                                aria-label={Lang?.FULL_SCREEN}
                                bg={"gray.500"}
                                rounded={"full"}
                                onClick={() =>
                                    Helper.ToggleFullScreen(FullScreenElement, setIsFullScreen)
                                }
                                _hover={{
                                    bg: "blue.300",
                                    color: "black"
                                }}
                                size={"sm"}
                                transition={".5s"}
                                fontSize={"1.2rem"}
                                icon={IsFullScreen ? <BsFullscreenExit /> : <BsFullscreen />}
                                pos={"fixed"}
                                top={0}
                                left={{
                                    base: "5%",
                                    md: "50%"
                                }}
                                zIndex={"modal"}
                            />
                        )}
                    </Box>
                )}
            </Box>
        </>
    );
};

export default PriceListView;
