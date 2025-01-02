import { ThemeColors } from "@/Utility";
import { IconButton, Menu, MenuButton, MenuItem, MenuList, Stack, Text } from "@chakra-ui/react";
import { useMemo } from "react";
import { MdNotificationsActive } from "react-icons/md";
import { useSelector } from "react-redux";

export default function ItemNotifications({
    OnSetModalData,
    IsSelected,
    colorMode,
    ItemProps,
    Item,
    Lang
}) {
    const { Events } = useSelector((state) => state.Public);
    const OnNoteClick = () => {
        OnSetModalData({
            CompoundId: Item.DataCompoundId,
            Type: "Notes",
            Title: Lang?.DATA_PAGE?.ACTIONS?.NOTES,
            Content: (
                <Stack direction={"column"} alignItems={"center"} justifyContent={"center"} gap={1}>
                    {Lang?.DATA_PAGE?.MESSAGES?.NOTES.split("~").map((item, index) => (
                        <Text key={index}>{item}</Text>
                    ))}
                </Stack>
            )
        });
    };
    const OnCityScapeClick = () => {
        OnSetModalData({
            CompoundId: Item.DataCompoundId,
            Type: "CityScape",
            Title: Lang?.DATA_PAGE?.ACTIONS?.CITYSCAPE,
            Content: (
                <Stack direction={"column"} alignItems={"center"} justifyContent={"center"} gap={1}>
                    {Lang?.DATA_PAGE?.MESSAGES?.CITYSCAPE.split("~").map((item, index) => (
                        <Text key={index}>{item}</Text>
                    ))}
                </Stack>
            )
        });
    };
    const ShowCityScape = useMemo(() => {
        return Events?.CityScape && Item?.DataIsCityScape;
    }, [Events?.CityScape, Item?.DataIsCityScape]);
    return (
        <Menu gutter={0} boundary={"scrollParent"} placement="auto">
            <MenuButton
                as={IconButton}
                size={"xs"}
                fontSize={"1.2rem"}
                outline={"none"}
                border={"none"}
                rounded={"full"}
                bg={ThemeColors.NavIconColor[colorMode]}
                _hover={{ bg: ThemeColors.NavIconColor[colorMode] }}
                className="Nav-Icon-Color"
                icon={<MdNotificationsActive />}
                isDisabled={!IsSelected}
            />
            <MenuList
                p={2}
                w={"fit-content"}
                className="Main-Modal"
                zIndex={"modal"}
                transform={"translateX(-110%) scale(0.1)"}
                transition={".5s ease-in-out"}
            >
                {!ShowCityScape && !Item?.DataHaveNote ? (
                    <h4 style={{ textAlign: "center" }}>{Lang?.ERRORS?.NO_NOTIFICATIONS}</h4>
                ) : null}
                {Item.DataHaveNote ? (
                    <MenuItem onClick={() => OnNoteClick()} {...ItemProps}>
                        {Lang?.DATA_PAGE?.ACTIONS?.NOTES}
                    </MenuItem>
                ) : null}
                {ShowCityScape ? (
                    //  && item?.data_type == 1
                    <MenuItem onClick={() => OnCityScapeClick()} {...ItemProps}>
                        {Lang?.DATA_PAGE?.ACTIONS?.CITYSCAPE}
                    </MenuItem>
                ) : null}
            </MenuList>
        </Menu>
    );
}
