import { useLang } from "@/Hooks";
import { Image, Menu, MenuButton, MenuList, useColorMode } from "@chakra-ui/react";

const NotificationsCard = ({ ...rest }) => {
    const Lang = useLang();
    const { colorMode } = useColorMode();

    return (
        <Menu>
            <MenuButton>
                <Image
                    src={`/Img/${colorMode}/Bell.webp`}
                    boxSize={{
                        base: "1.4rem",
                        md: "1.5rem"
                    }}
                    bgSize={"cover"}
                    objectFit={"cover"}
                    {...rest}
                />
            </MenuButton>
            <MenuList
                p={1}
                w={"fit-content"}
                className="Main-Modal"
                transform={"translateX(-110%) scale(0.1)"}
                transition={".5s ease-in-out"}
            >
                <h4 style={{ textAlign: "center" }}>
                    {Lang?.ERRORS?.NO_NOTIFICATIONS}
                </h4>
            </MenuList>
        </Menu>
    );
};

export default NotificationsCard;
