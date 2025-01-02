import { AspectRatio, Box, CloseButton, Flex, IconButton, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { startTransition, useEffect, useMemo, useRef, useState } from "react";
import { BsFullscreenExit, BsFullscreen } from "react-icons/bs";
import MainLoader from "../Loader";
import ZoomableImage from "../ZoomableImage";
import { useLoadFileQuery } from "@/Redux";
import { Helper } from "@/Utility";
import { FaDownload } from "react-icons/fa";
import OverLay from "../Overlay";
const FileView = ({
    OnClose = () => {},
    Data = {
        IsOpen: false,
        Title: "",
        Content: ""
    },
    Notify,
    Lang
}) => {
    const FullScreenElement = useRef(null);
    const IFrameElement = useRef(null);
    const [IsFullScreen, setIsFullScreen] = useState(false);
    const { Rtl } = useSelector((state) => state.Helper);
    const { data, isError, error, isLoading } = useLoadFileQuery(
        { FileUrl: Data.Content },
        { skip: !Data.IsOpen || !Data.Content }
    );
    const ImageData = useMemo(() => {
        if (!data) return null;
        if (data.error) return null;
        return {
            IsImage: data.data?.FileMimeType?.startsWith("image/"),
            IsPdf: data.data?.FileMimeType?.includes("/pdf"),
            IsDoc: data.data?.FileOriginalName?.includes(".doc"),
            ...data.data
        };
    }, [data]);
    useEffect(() => {
        if (isError) {
            if (isError) {
                OnClose();
                const Msg = Helper.ValidateErrorMessage(error);
                Notify(error.status == 503 ? "error" : "info", Msg);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isError]);
    useEffect(() => {
        if (ImageData) {
            if (!ImageData.IsImage && !ImageData.IsPdf && !ImageData.IsDoc) {
                Notify("info", Lang?.ERRORS?.FILE_VIEW_NOT_ALLOWED);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [!ImageData?.IsImage, ImageData?.IsPdf]);
    useEffect(() => {
        document.addEventListener("fullscreenchange", () => {
            const isFull = document.fullscreenElement;
            startTransition(() => {
                setIsFullScreen(isFull ? true : false);
            });
        });
    }, [setIsFullScreen]);
    function ChunkBase64(base64, size) {
        const base64Data = base64.includes(",") ? base64.split(",")[1] : base64;
        const regex = new RegExp(`.{1,${size}}`, "g");
        return base64Data.match(regex);
    }
    const HandleDownloadFile = (File) =>
        Helper.DownloadFile(File.FileUrl, File.FileName?.replaceAll("%20", " "));

    useEffect(() => {
        const RenderChunkedPDF = (Base64String, FileMimeType) => {
            if (!Base64String?.startsWith(`data:${FileMimeType};base64,`)) {
                return;
            }
            const Chunks = ChunkBase64(Base64String, 1000000); // 1 MB Chunks
            const reassembledBase64 = `data:${FileMimeType};base64,` + Chunks.join("");
            try {
                const ByteCharacters = atob(reassembledBase64.split(",")[1]);
                const ByteArray = new Uint8Array(ByteCharacters.length).map((_, i) =>
                    ByteCharacters.charCodeAt(i)
                );
                const BlobData = new Blob([ByteArray], { type: FileMimeType });
                const ObjectURL = URL.createObjectURL(BlobData);
                return ObjectURL;
            } catch {
                // return;
            }
        };
        if (ImageData) {
            if (ImageData.IsPdf) {
                const GetFileBlob = RenderChunkedPDF(ImageData.FileUrl, ImageData.FileMimeType);
                if (IFrameElement.current && GetFileBlob){
                    IFrameElement.current.src = GetFileBlob;
                    return () => {
                        URL.revokeObjectURL(GetFileBlob);
                    }
                };
            }
            if (ImageData.IsDoc) {
                Helper.DownloadFile(ImageData.FileUrl, ImageData.FileName?.replaceAll("%20", " "));
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ImageData, IFrameElement.current]);
    return (
        <OverLay>
            <Box
                pos={"fixed"}
                top={{
                    base: 0,
                    md: "clamp(5%, 2vh, 10%)"
                }}
                left={{
                    base: 0,
                    md: "10vw"
                }}
                minW={{
                    base: "100vw",
                    md: "80vw"
                }}
                className="Main-Modal Shadow"
                ref={FullScreenElement}
                py={2}
                zIndex={"modal"}
                rounded={"lg"}
            >
                <Box
                    direction={Rtl ? "row-reverse" : "row"}
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                    w={"96%"}
                    className="Shadow"
                    rounded={"lg"}
                    py={1}
                    px={1}
                    ml={"2%"}
                >
                    <div dir={Rtl ? "rtl" : "ltr"}>{Data.Title?.replaceAll("%20", " ")}</div>
                    <Flex alignItems={"center"} gap={2}>
                        <IconButton
                            cursor={"pointer"}
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
                        />
                        {ImageData?.IsPdf ||
                            (ImageData?.IsDoc && (
                                <IconButton
                                    cursor={"pointer"}
                                    bg={"gray.500"}
                                    rounded={"full"}
                                    onClick={() => HandleDownloadFile(ImageData)}
                                    _hover={{
                                        bg: "blue.300",
                                        color: "black"
                                    }}
                                    size={"sm"}
                                    transition={".5s"}
                                    fontSize={"1.2rem"}
                                    icon={<FaDownload />}
                                />
                            ))}
                    </Flex>
                    <CloseButton
                        rounded={"full"}
                        pos={"initial"}
                        onClick={() => {
                            if (IsFullScreen) {
                                Helper.ToggleFullScreen(FullScreenElement, setIsFullScreen);
                            }
                            OnClose();
                        }}
                    />
                </Box>
                <Box
                    zIndex={13}
                    rounded={"lg"}
                    w={"100%"}
                    px={1}
                    mt={1}
                    h={{
                        base: "100vh",
                        sm: window.innerHeight < 273 ? "clamp(80vh, 2vh, 100vh)" : "100vh",
                        md: "80vh"
                    }}
                >
                    {isLoading && (
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                flexDirection: "column",
                                height: "100%",
                                borderRadius: "10px"
                            }}
                        >
                            <MainLoader />
                        </div>
                    )}
                    {Data.IsOpen && !isError && !isLoading && (
                        <>
                            {ImageData && (
                                <>
                                    {ImageData?.IsDoc && (
                                        <Box
                                            h={"80%"}
                                            maxW="100%"
                                            maxH={"100%"}
                                            border={"1px solid"}
                                            borderRadius={"20px"}
                                            mt={"3px"}
                                            ratio={1}
                                            display={"flex"}
                                            alignItems={"center"}
                                            justifyContent={"center"}
                                            flexDir={"column"}
                                        >
                                            {Lang?.ERRORS?.FILE_VIEW_NOT_ALLOWED?.split("\n").map(
                                                (line, index) => (
                                                    <Text key={index}>{line}</Text>
                                                )
                                            )}
                                        </Box>
                                    )}
                                    {ImageData.IsPdf && (
                                        <AspectRatio
                                            h={"auto"}
                                            maxW="100%"
                                            maxH={"100%"}
                                            border={"1px solid"}
                                            borderRadius={"20px"}
                                            mt={"3px"}
                                            ratio={1}
                                        >
                                            <iframe
                                                src={"#"}
                                                ref={IFrameElement}
                                                title={ImageData.FileOriginalName}
                                                height={"100%"}
                                                width={"100%"}
                                                style={{
                                                    objectFit: "cover",
                                                    width: "100%",
                                                    height: "100%",
                                                    borderRadius: "20px"
                                                }}
                                                allowFullScreen
                                            />
                                        </AspectRatio>
                                    )}
                                    {ImageData.IsImage && (
                                        <>
                                            <ZoomableImage
                                                Src={ImageData.FileUrl}
                                                Alt={ImageData.FileOriginalName}
                                                // width={"100%"}
                                                // height={"100%"}
                                                width={"100%"}
                                                height={"100%"}
                                                rounded={"lg"}
                                                overflow={"auto"}
                                                maxH={{
                                                    base: "auto",
                                                    md: "90vh"
                                                }}
                                            />
                                        </>
                                    )}
                                </>
                            )}
                        </>
                    )}
                </Box>
            </Box>
        </OverLay>
    );
};

export default FileView;
