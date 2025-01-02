import { useNotify, useValidateRole } from "@/Hooks";
import { useGetContactsMutation } from "@/Redux";
import { ThemeColors } from "@/Utility";
import {
    Box,
    IconButton,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Spinner,
    useDisclosure
} from "@chakra-ui/react";
import { FaEllipsisH, FaVideo } from "react-icons/fa";
import ContactsTable from "../../ContactsTable";
import { BsTextareaT } from "react-icons/bs";
import { MdOutlineContactPhone } from "react-icons/md";
import { IconImage } from "@/Common";
import { useMemo } from "react";
export default function ItemActionButtons({
    OnSetModalData,
    IsSelected,
    colorMode,
    ItemProps,
    Item,
    Lang
}) {
    const { IsPersonal } = useValidateRole();
    const Notify = useNotify();
    const [FindContacts, { isLoading: IsContactLoading }] = useGetContactsMutation();
    const {
        isOpen: IsMatrialLoading,
        onOpen: OnOpenMatrialLoading,
        onClose: OnCloseMatrialLoading
    } = useDisclosure();
    // const {
    //     isOpen: IsLayoutsLoading,
    //     onOpen: OnOpenLayoutsLoading,
    //     onClose: OnCloseLayoutsLoading
    // } = useDisclosure();
    const {
        isOpen: IsPriceListLoading,
        onOpen: OnOpenPriceListLoading,
        onClose: OnClosePriceListLoading
    } = useDisclosure();
    const OnOpenOrientation = () => {
        if (!Item.DataUrl || Item.DataUrl == "0") {
            Notify("warn", Lang?.ERRORS?.NO_URL?.replace("{{Compound}}", Item.DataCompound));
            return;
        } else {
            OnSetModalData({
                CompoundId: Item.DataCompoundId,
                Type: "DataUrl",
                Title: Item.DataCompound + " Video",
                Content: Item.DataUrl,
                Size: {
                    minW: {
                        base: "100vw",
                        sm: "60vw"
                    },
                    h: {
                        base: "80vh",
                        sm: "60vh"
                    },
                    top: {
                        base: "10vh",
                        lg: "20vh"
                    },
                    left: {
                        base: "0vw",
                        sm: "20vw"
                    }
                }
            });
        }
    };
    const OnOpenDataDescription = () => {
        if (!Item.DataDescription || Item.DataDescription == "0") {
            Notify(
                "warn",
                Lang?.ERRORS?.NO_DESCRIPTION?.replace("{{Compound}}", Item.DataCompound)
            );
            return;
        } else {
            OnSetModalData({
                CompoundId: Item.DataCompoundId,
                Type: "Description",
                SendType: "Message",
                Title: `Description ${Item.DataCompound}`,
                Content: Item.DataDescription
            });
        }
    };
    const OnSetContacts = async () => {
        const { data } = await FindContacts(Item.DataDeveloperId);
        const Data = data?.data?.results;
        if (!Data || Data.length === 0) {
            Notify("warn", Lang?.ERRORS?.NO_CONTACTS?.replace("{{Developer}}", Item.DataDeveloper));
            return;
        }
        OnSetModalData({
            CompoundId: Item.DataCompoundId,
            Type: "Contacts",
            Title: Lang?.DATA_PAGE?.ACTIONS?.CONTACTS,
            Content: <ContactsTable Data={Data} IsLoading={IsContactLoading} />
        });
    };
    const OnPriceList = async () => {
        // const Data = await OnCdnFetch("PriceList");
        OnOpenPriceListLoading();
        OnSetModalData({
            CompoundId: Item.DataCompoundId,
            Type: "PriceList",
            SendType: "Single",
            Title: Item.DataCompound,
            Content: {
                Type: "PriceList",
                CompoundId: Item.DataCompoundId,
                CityId: Item.DataCityId
            }
        });
        setTimeout(() => OnClosePriceListLoading(), 1500);
    };
    // const OnLayouts = async () => {
    //     OnOpenLayoutsLoading();
    //     OnSetModalData({
    //         CompoundId: Item.DataCompoundId,
    //         Type: "Layout",
    //         SendType: "Single",
    //         Title: Item.DataCompound,
    //         Content: {
    //             Type: "Layout",
    //             CompoundId: Item.DataCompoundId,
    //             CityId: Item.DataCityId
    //         }
    //     });
    //     setTimeout(() => OnCloseLayoutsLoading(), 1500);
    // };
    const OnMatrials = async () => {
        OnOpenMatrialLoading();
        OnSetModalData({
            CompoundId: Item.DataCompoundId,
            Type: "Matrial",
            SendType: "List",
            Title: Item.DataCompound,
            Content: {
                Type: "Matrial",
                CompoundId: Item.DataCompoundId,
                CityId: Item.DataCityId
            },
            Extra: Item.DataDescription
        });
        setTimeout(() => OnCloseMatrialLoading(), 1500);
    };
    const IconStyle = {
        color: colorMode == "light" ? "white" : "#002d3e",
        background: colorMode == "light" ? "#002d3e" : "white",
        height: "1.4rem",
        width: "1.4rem",
        padding: ".1rem",
        borderRadius: "10%"
    };
    const IsLoadingAny = useMemo(() => {
        return IsMatrialLoading || IsPriceListLoading || IsContactLoading; // IsLayoutsLoading;
    }, [IsContactLoading, IsMatrialLoading, IsPriceListLoading]);
    return (
        <Menu
            gutter={0}
            boundary={"scrollParent"}
            placement="auto"
            // closeOnSelect={false}
            {...(IsLoadingAny ? { isOpen: true } : {})}
        >
            <MenuButton
                as={IconButton}
                className="Nav-Icon-Color"
                size={"xs"}
                rounded={"full"}
                bg={ThemeColors.NavIconColor[colorMode]}
                _hover={{ bg: ThemeColors.NavIconColor[colorMode] }}
                icon={<FaEllipsisH />}
                isDisabled={!IsSelected}
            />
            {IsSelected && (
                <MenuList
                    p={2}
                    w={"fit-content"}
                    className="Main-Modal"
                    zIndex={"modal"}
                    transform={"translateX(-110%) scale(0.1)"}
                    transition={".5s ease-in-out"}
                >
                    <MenuItem
                        as={Box}
                        display={"flex"}
                        alignItems={"center"}
                        justifyContent={"space-between"}
                        gap={2}
                        className="Shadow"
                        onClick={() => OnPriceList()}
                        {...ItemProps}
                    >
                        {IsPriceListLoading ? (
                            <Spinner />
                        ) : (
                            <IconImage
                                Src={`/Img/${colorMode}/PriceList.webp`}
                                Alt="PriceList"
                                className="Action-Btn"
                                rounded={"10%"}
                                size={"xs"}
                            />
                        )}
                        <Box w={"100%"}>{Lang?.DATA_PAGE?.ACTIONS?.PRICELIST}</Box>
                    </MenuItem>
                    <MenuItem
                        as={Box}
                        onClick={() => OnMatrials()}
                        display={"flex"}
                        alignItems={"center"}
                        justifyContent={"space-between"}
                        gap={2}
                        className="Shadow"
                        {...ItemProps}
                    >
                        {IsMatrialLoading ? (
                            <Spinner />
                        ) : (
                            <IconImage
                                Src={`/Img/${colorMode}/Matrial.webp`}
                                Alt="Matrial"
                                className="Action-Btn"
                                rounded={"10%"}
                                size={"xs"}
                            />
                        )}
                        <Box w={"100%"}>{Lang?.DATA_PAGE?.ACTIONS?.MATRILAS}</Box>
                    </MenuItem>
                    {/* <MenuItem
                                            as={Box}

                        onClick={() => OnLayouts()}
                          display={"flex"}
                        alignItems={"center"}
                        justifyContent={"space-between"}
                        gap={2}
                        px={2}
                        className="Shadow"
                        {...ItemProps}
                    >
                       {IsLayoutsLoading ? (
                            <Spinner />
                        ) : (
                            <IconImage
                                Src={`/Img/${colorMode}/Layouts.webp`}
                                Alt="Layouts"
                                className="Action-Btn"
                                rounded={"10%"}
                                size={"xs"}
                                isLoading={IsLayoutsLoading}
                            />
                        )}
                              <Box w={"100%"}>
                            {Lang?.DATA_PAGE?.ACTIONS?.LAYOUTS}
                        </Box>
                    </MenuItem> */}
                    <MenuItem
                        as={Box}
                        icon={<BsTextareaT style={IconStyle} />}
                        onClick={() => OnOpenDataDescription()}
                        {...ItemProps}
                    >
                        {Lang?.DATA_PAGE?.ACTIONS?.DESCRIPTION}
                    </MenuItem>
                    {IsPersonal && (
                        <MenuItem
                            as={Box}
                            icon={<MdOutlineContactPhone style={IconStyle} />}
                            onClick={() => (IsContactLoading ? () => {} : OnSetContacts())}
                            {...ItemProps}
                        >
                            {IsContactLoading ? <Spinner /> : Lang?.DATA_PAGE?.ACTIONS?.CONTACTS}
                        </MenuItem>
                    )}
                    <MenuItem
                        as={Box}
                        icon={<FaVideo style={IconStyle} />}
                        onClick={() => OnOpenOrientation()}
                        {...ItemProps}
                    >
                        {/* Orientation */}
                        {Lang?.DATA_PAGE?.ACTIONS?.URL}
                    </MenuItem>
                </MenuList>
            )}
        </Menu>
    );
}
