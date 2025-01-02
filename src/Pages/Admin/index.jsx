import { AddUser, Users } from "@/Components";
import { useLang } from "@/Hooks";
import { ThemeColors } from "@/Utility";
import { Box, useColorMode } from "@chakra-ui/react";

const Admin = () => {
    const { colorMode } = useColorMode()
    const Lang = useLang()
    return (
        <Box
            w="100%"
            height={"100vh"}
            bg={ThemeColors.MainAppBgColor[colorMode]} >
            <Users colorMode={colorMode} />
            {/* <AddUser Lang={Lang} colorMode={colorMode} /> */}
        </Box>
    );
}

export default Admin;
