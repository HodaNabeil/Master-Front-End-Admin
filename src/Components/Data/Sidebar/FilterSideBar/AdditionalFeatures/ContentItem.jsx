import { Box, Collapse, Flex, Text } from "@chakra-ui/react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const ContentItem = ({
    IsOpen = false,
    OnChange = () => {},
    OnToggle = () => {},
    Options = [],
    State = [],
    Label,
    Name = "",
    Rtl = false
}) => {
    return (
        <div>
            <Flex
                alignItems={"center"}
                justifyContent={"center"}
                className="Header-Modal-AdditionalFeatures"
                onClick={() => OnToggle(Name)}
            >
                <Text>{Label}</Text>
                {!IsOpen ? (
                    <FaChevronDown className=" Icon-Header-Modal-AdditionalFeatures" />
                ) : (
                    <FaChevronUp className=" Icon-Header-Modal-AdditionalFeatures" />
                )}
            </Flex>
            <Collapse in={IsOpen} animateOpacity={true} animate={["visible", "active"]}>
                <Box
                    // as="ul"
                    dir="rtl"
                    overflowY={"auto"}
                    overflowX={"hidden"}
                    sx={{
                        "&::-webkit-scrollbar": {
                            width: "5px"
                        },
                        "&::-webkit-scrollbar-thumb": {
                            backgroundColor: "#4b7a95", // scrollbar color
                            borderRadius: "10px", // optional: round edges
                            cursor: "pointer"
                        },
                        "&::-webkit-scrollbar-track": {
                            backgroundColor: "#f0f0f0" // scrollbar track color
                        }
                    }}
                    className="List-Modal-AdditionalFeatures"
                >
                    {Options.map((item) => {
                        const IsSelected = State?.find((Item) => Item.id == item.id) ? true : false;
                        return (
                            <Flex
                                key={`Additional_${Name}_Item_${item.id}`}
                                onClick={() => OnChange(Name, item, IsSelected)}
                                alignItems={"center"}
                                justifyContent={Rtl ? "start" : "end"}
                                flexDir={Rtl ? "row-reverse" : "row"}
                                mb={1}
                                gap={2}
                                cursor={"pointer"}
                            >
                                <Text>{item.label}</Text>
                                <Text
                                    w={"1.2rem"}
                                    h={"1.2rem"}
                                    rounded={"full"}
                                    border={"5px solid"}
                                    borderColor={IsSelected ? "#38a169" : "#acb9c4"}
                                    bg={"transparent"}
                                />
                            </Flex>
                        );
                    })}
                </Box>
            </Collapse>
        </div>
    );
};

export default ContentItem;
