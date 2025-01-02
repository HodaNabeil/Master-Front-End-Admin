import { ThemeColors } from "@/Utility";
import { Flex, IconButton, Input, Select } from "@chakra-ui/react";
import { MdSearch } from "react-icons/md";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

import { MdOutlineClose } from "react-icons/md";

const Nav = ({ colorMode }) => {

    return (
        <header style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0.4rem  1rem ",
            margin: "0 0.5rem"
            , borderRadius: "4px",
            backgroundColor: ThemeColors.SidebarChooseOption[colorMode]
        }}>
            <Flex gap="4rem" alignItems={"center"}>
                <MdKeyboardDoubleArrowRight fontSize={"2rem"} />
                <Select
                    bg={ThemeColors.MainAppBgColor[colorMode]}
                >
                    {window.Config && window.Config.PAGE_ADMIN.NumberCounter.map((item, index) => (
                        <option key={index}> {item}</option>
                    ))}

                </Select>
            </Flex>

            <Flex alignItems={"center"} gap="0.5rem">
                <Select
                    bg={ThemeColors.MainAppBgColor[colorMode]}
                >
                    <option>User Name</option>
                </Select>

                <Input type="text" bg={ThemeColors.MainAppBgColor[colorMode]} placeholder="User Name" />
                {/* <Input type="date" bg={ThemeColors.MainAppBgColor[colorMode]}></Input>
                <Input type="date" bg={ThemeColors.MainAppBgColor[colorMode]}></Input> */}
                <IconButton
                    className="Btn-Nav"
                    _hover={{
                        transform: "scale(1.1)"
                    }}

                    icon={<MdOutlineClose />}>
                </IconButton>
                <IconButton
                    className="Btn-Nav"

                    _hover={{
                        transform: "scale(1.1)"
                    }}
                    icon={<MdSearch />}>

                </IconButton>

            </Flex>

        </header>
    );
}

export default Nav;
