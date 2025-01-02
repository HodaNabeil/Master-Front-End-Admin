import { Box, Flex, useDisclosure } from "@chakra-ui/react";
import { CustomMultiCheckBox } from "@/Common";
import TypeFilter from "../TypeFilter";
const Bedrooms = ({ OnToggleTab, OnChange, Options = [], State, Tabs, Lang }) => {
    const { isOpen, onToggle } = useDisclosure({
        // defaultIsOpen: true
    });
    return (
        <Box mt={"10px"}>
            <TypeFilter
                text={Lang?.SIDEBAR?.LABEL?.BEDROOMS}
                isOpen={isOpen}
                onToggle={onToggle}
                Name={"BedRooms"}
                OnToggleTab={OnToggleTab}
                State={State}
                Tabs={Tabs}
                AllowToggleTab={true}
            />
            {isOpen && (
                <Flex
                    gap={{
                        base: "10px",
                        md: "10px",
                        lg: "15px"
                    }}
                    wrap={"wrap"}
                    py={"5px"}
                    px={"2px"}
                    rounded={"md"}
                    mt={1}
                    alignItems={"center"}
                    justifyContent={{
                        base: "center",
                        lg: "inherit"
                    }}
                    bg={"#104c70"}
                >
                    <CustomMultiCheckBox
                        Name={"DataBedRooms"}
                        IsMulti={true}
                        Options={Options}
                        OnChange={OnChange}
                        Value={State.DataBedRooms}
                        DirectionRow={true}
                        Lang={Lang}
                    />
                </Flex>
            )}
        </Box>
    );
};

export default Bedrooms;
