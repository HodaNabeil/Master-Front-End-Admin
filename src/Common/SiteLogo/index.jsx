import { Box, Image, useColorMode } from "@chakra-ui/react";
export default function SiteLogo({ ...rest }) {
    const { colorMode } = useColorMode();
    return (
        <Box
            width={"9rem"}
            // width={"150px"}
            // width={"150px"}
            h={"2.5rem"}
            py={0}
            {...rest}
        >
            <Image
                objectFit="cover"
                src={`/Img/${colorMode}/Logo-Triangle.webp`}
                alt="Master V"
                w={"auto"}
                h={"auto"}
                rounded={"md"}
            />
        </Box>
    );
}
