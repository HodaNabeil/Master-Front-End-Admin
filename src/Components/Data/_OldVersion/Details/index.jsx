import { Table } from "@/Common";
import { useLang } from "@/Hooks";
import { Helper } from "@/Utility";
import { Box, Flex, Icon, Image, SimpleGrid, Stack, Text, Tooltip } from "@chakra-ui/react";
import { useMemo } from "react";
import { BsFillPatchCheckFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import ActionsButtons from "../../ActionsButtons";
export default function DetailsData({
    OnSetModalData,
    SelectedItem = null,
    IsLoading = true,
    OnSelect,
    Data = [],
    Modal,
    ...rest
}) {
    const Lang = useLang();
    const { Rtl } = useSelector((state) => state.Helper);
    const { Events } = useSelector((state) => state.Public);
    const THeadData = [
        // 16.7px = 1em
        {
            Label: "Last update",
            Sort: "ASC",
            OrderBy: "DataDate",
            size: "6rem"
        },
        {
            Label: "Developer",
            Sort: "ASC",
            OrderBy: "DataDeveloper",
            size: "12rem"
        },
        {
            Label: "Compound",
            Sort: "ASC",
            OrderBy: "DataCompound",
            size: "14rem"
        },
        {
            Label: "Status",
            Sort: "ASC",
            OrderBy: "DataStatus",
            size: "6.4rem"
        },

        {
            Label: "Type",
            Sort: "ASC",
            OrderBy: "DataSubType",
            size: "10.20rem"
        },
        {
            Label: "bedrooms",
            Sort: "ASC",
            OrderBy: "DataBedRooms",
            size: "5.4rem"
        },
        {
            Label: "Built up area",
            Sort: "ASC",
            OrderBy: "DataBuiltUpAreaFrom",
            size: "9.5rem"
        },
        {
            Label: "Original Price ( from - to )",
            Sort: "ASC",
            OrderBy: "DataUnitTotalPriceFrom",
            size: "13rem"
        },
        {
            Label: "Cash Price ( from - to )",
            Sort: "ASC",
            OrderBy: "DataUnitTotalPriceDiscountFrom",
            size: "13rem"
        }
    ];
    let ColsSize = THeadData.reduce((o, key) => ({ ...o, [key.OrderBy]: key.size }), {});
    const DataToRender = useMemo(() => {
        if (Data.length < 1) return null;
        return Data.map((item) => {
            const {
                DataDeveloperId,
                DataDeveloper,
                DataCompound,
                DataCompoundId,
                DataStatus,
                DataDate,
                DataHaveNote,
                DataSubType,
                DataBedRooms,
                DataBuiltUpAreaFrom,
                DataBuiltUpAreaTo,
                DataUnitTotalPriceFrom,
                DataUnitTotalPriceTo,
                DataUnitTotalPriceDiscountFrom,
                DataUnitTotalPriceDiscountTo,
                DataIsCityScape
            } = item;
            const { IsToday, IsYesTerday, Format } = DataDate || {};
            const IsUpdated = IsToday || IsYesTerday;
            const ProcessDate = IsToday
                ? Lang?.PUBLIC?.TODAY
                : IsYesTerday
                ? Lang?.PUBLIC?.YESTERDAY
                : Format?.Date;
            const IsAllowedToViewAllDetails = Helper.ValidateStatus(Lang, DataStatus);
            const IsSelected = SelectedItem ? SelectedItem.DataId == item.DataId : null;
            const ProcesDataBuiltUpArea =
                DataBuiltUpAreaFrom == DataBuiltUpAreaTo
                    ? DataBuiltUpAreaFrom
                    : `${DataBuiltUpAreaFrom} ${Lang?.PUBLIC?.WORDS?.METR} : ${DataBuiltUpAreaTo} ${Lang?.PUBLIC?.WORDS?.METR}`;
            const ProcesDataUnitTotalPrice =
                DataUnitTotalPriceFrom == DataUnitTotalPriceTo
                    ? `${Helper.NumberWithCommas(DataUnitTotalPriceFrom)} ${Lang?.DATA_PAGE?.LE}`
                    : `${Helper.NumberWithCommas(DataUnitTotalPriceFrom)} ${
                          Lang?.DATA_PAGE?.LE
                      } : ${Helper.NumberWithCommas(DataUnitTotalPriceTo)} ${Lang?.DATA_PAGE?.LE}`;
            const ProcesDataUnitTotalPriceDiscount =
                DataUnitTotalPriceDiscountFrom == DataUnitTotalPriceDiscountTo
                    ? `${Helper.NumberWithCommas(DataUnitTotalPriceDiscountFrom)} ${
                          Lang?.DATA_PAGE?.LE
                      }`
                    : `${Helper.NumberWithCommas(DataUnitTotalPriceDiscountFrom)} ${
                          Lang?.DATA_PAGE?.LE
                      } : ${Helper.NumberWithCommas(DataUnitTotalPriceDiscountTo)} ${
                          Lang?.DATA_PAGE?.LE
                      }`;
            const Color = IsAllowedToViewAllDetails.IsAllowed ? "" : Helper.StatusColor[DataStatus];
            return {
                IsSelected,
                OnSelect: () => OnSelect(item),
                Data: [
                    {
                        Label: (
                            <Flex
                                direction="column"
                                justifyContent={"center"}
                                w={ColsSize["DataDate"]}
                            >
                                <span style={{ textAlign: "center" }}>{ProcessDate}</span>
                                {IsUpdated && (
                                    <Flex alignItems={"center"} justify={"center"} gap={1}>
                                        {Lang?.PUBLIC?.UPDATED}
                                        <Icon as={BsFillPatchCheckFill} color={"green.500"} />
                                    </Flex>
                                )}
                            </Flex>
                        ),
                        IsSticky: false,
                        Extra: null
                    },
                    {
                        Label: (
                            <SimpleGrid
                                columns={2}
                                spacing={0}
                                py={"0.5"}
                                alignItems={"center"}
                                mr={Rtl ? "0" : "5"}
                                ml={Rtl ? " 5" : "0"}
                                w={ColsSize["DataDeveloper"]}
                            >
                                <Box
                                    h={"40px"}
                                    w={"60px"}
                                    rounded={"lg"}
                                    bg={"#102d3f"}
                                    // p={1}
                                    className="Shadow"
                                >
                                    <Image
                                        rounded={"lg"}
                                        src={`/Img/Developer/${DataDeveloperId}.${Helper.DeveloperImgExtintion}`}
                                        alt={DataDeveloper}
                                        h={"100%"}
                                        w={"100%"}
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = "/Img/Not_Found.webp";
                                        }}
                                    />
                                </Box>
                                <Text ml={Rtl ? 0 : "-20px"} mr={Rtl ? "-20px" : 0}>
                                    {DataDeveloper}
                                </Text>
                            </SimpleGrid>
                        ),
                        IsSticky: false,
                        Extra: null
                    },
                    {
                        Label: (
                            <Box
                                mr={Rtl ? "-2" : "1"}
                                ml={Rtl ? 1 : "-2"}
                                w={ColsSize["DataCompound"]}
                                py={"1"}
                            >
                                <SimpleGrid columns={2} alignItems={"center"} gap={0}>
                                    <Flex gap={1}>
                                        {DataHaveNote ? (
                                            <Tooltip
                                                label={Lang?.DATA_PAGE?.ACTIONS?.NOTES}
                                                aria-label={Lang?.DATA_PAGE?.ACTIONS?.NOTES}
                                            >
                                                <Image
                                                    src="/Img/Notes.svg"
                                                    transition={"0.3s"}
                                                    _hover={{
                                                        transform: "scale(1.3)"
                                                    }}
                                                    cursor={"pointer"}
                                                    w={"1.2rem"}
                                                    h={"1.2rem"}
                                                    onClick={() =>
                                                        OnSetModalData({
                                                            CompoundId: DataCompoundId,
                                                            Type: "Notes",
                                                            Title: Lang?.DATA_PAGE?.ACTIONS?.NOTES,
                                                            Content: (
                                                                <Stack
                                                                    direction={"column"}
                                                                    alignItems={"center"}
                                                                    justifyContent={"center"}
                                                                    gap={1}
                                                                >
                                                                    {Lang?.DATA_PAGE?.MESSAGES?.NOTES.split(
                                                                        "~"
                                                                    ).map((item, index) => (
                                                                        <Text key={index}>
                                                                            {item}
                                                                        </Text>
                                                                    ))}
                                                                </Stack>
                                                            )
                                                        })
                                                    }
                                                />
                                            </Tooltip>
                                        ) : null}
                                        {Events.Cityscape && DataIsCityScape ? (
                                            //  && item?.data_type == 1
                                            <Tooltip
                                                label={Lang?.DATA_PAGE?.ACTIONS?.CITYSCAPE}
                                                aria-label={Lang?.DATA_PAGE?.ACTIONS?.CITYSCAPE}
                                            >
                                                <Image
                                                    src="/Img/Cityscape.webp"
                                                    _hover={{
                                                        transform: "scale(1.3)"
                                                    }}
                                                    cursor={"pointer"}
                                                    transition={"0.3s"}
                                                    w={"1.2rem"}
                                                    h={"1.2rem"}
                                                    onClick={() =>
                                                        OnSetModalData({
                                                            CompoundId: DataCompoundId,
                                                            Type: "CityScape",
                                                            Title: Lang?.DATA_PAGE?.ACTIONS
                                                                ?.CITYSCAPE,
                                                            Content: (
                                                                <Stack
                                                                    direction={"column"}
                                                                    alignItems={"center"}
                                                                    justifyContent={"center"}
                                                                    gap={1}
                                                                >
                                                                    {Lang?.DATA_PAGE?.MESSAGES?.CITYSCAPE.split(
                                                                        "~"
                                                                    ).map((item, index) => (
                                                                        <Text key={index}>
                                                                            {item}
                                                                        </Text>
                                                                    ))}
                                                                </Stack>
                                                            )
                                                        })
                                                    }
                                                />
                                            </Tooltip>
                                        ) : null}
                                    </Flex>
                                    <Text
                                        ml={Rtl ? "0" : "-4.2em"}
                                        mr={Rtl ? "-4.2em" : "0"}
                                        className="text-ellipsis"
                                    >
                                        <Tooltip label={DataCompound} aria-label={DataCompound}>
                                            {DataCompound}
                                        </Tooltip>
                                    </Text>
                                    {IsSelected && (
                                        <ActionsButtons
                                            OnSetModalData={OnSetModalData}
                                            Modal={Modal}
                                            Lang={Lang}
                                            Item={item}
                                        />
                                    )}
                                </SimpleGrid>
                            </Box>
                        ),
                        IsSticky: false,
                        Extra: null
                    },
                    {
                        Label: (
                            <Text
                                w={ColsSize["DataStatus"]}
                                textAlign={"center"}
                                color={Helper.StatusColor[DataStatus] || ""}
                            >
                                {Lang?.DATA_PAGE?.STATUS_DATA?.[DataStatus]}
                            </Text>
                        ),
                        IsSticky: false,
                        Extra: null
                    },
                    // Only For Details
                    {
                        Label: (
                            <Text
                                textAlign={"center"}
                                w={ColsSize["DataSubType"]}
                                color={DataStatus == 5 ? Color : ""}
                            >
                                {IsAllowedToViewAllDetails.IsAllowed
                                    ? DataSubType
                                    : DataStatus == 5
                                    ? IsAllowedToViewAllDetails.Message
                                    : DataSubType}
                            </Text>
                        ),
                        IsSticky: false,
                        Extra: null
                    },
                    {
                        Label: (
                            <Text textAlign={"center"} w={ColsSize["DataBedRooms"]} color={Color}>
                                {IsAllowedToViewAllDetails.IsAllowed
                                    ? DataBedRooms
                                    : IsAllowedToViewAllDetails.Message}
                            </Text>
                        ),
                        IsSticky: false,
                        Extra: null
                    },
                    {
                        Label: (
                            <Text
                                textAlign={"center"}
                                w={ColsSize["DataBuiltUpAreaFrom"]}
                                color={Color}
                            >
                                {IsAllowedToViewAllDetails.IsAllowed
                                    ? ProcesDataBuiltUpArea
                                    : IsAllowedToViewAllDetails.Message}
                            </Text>
                        ),
                        IsSticky: false,
                        Extra: null
                    },
                    {
                        Label: (
                            <Text
                                textAlign={"center"}
                                w={ColsSize["DataUnitTotalPriceFrom"]}
                                color={Color}
                            >
                                {IsAllowedToViewAllDetails.IsAllowed
                                    ? ProcesDataUnitTotalPrice
                                    : IsAllowedToViewAllDetails.Message}
                            </Text>
                        ),
                        IsSticky: false,
                        Extra: null
                    },
                    {
                        Label: (
                            <Text
                                textAlign={"center"}
                                w={ColsSize["DataUnitTotalPriceDiscountFrom"]}
                                color={Color}
                            >
                                {IsAllowedToViewAllDetails.IsAllowed
                                    ? ProcesDataUnitTotalPriceDiscount
                                    : IsAllowedToViewAllDetails.Message}
                            </Text>
                        ),
                        IsSticky: false,
                        Extra: null
                    }
                ]
            };
        });
    }, [
        ColsSize,
        Data,
        Events.Cityscape,
        Lang,
        Modal,
        OnSelect,
        OnSetModalData,
        Rtl,
        SelectedItem
    ]);
    return (
        <>
            <Table
                THeadData={THeadData}
                BodyData={DataToRender ? DataToRender : []}
                IsLoading={IsLoading}
                size={"sm"}
                {...rest}
            />
        </>
    );
}
