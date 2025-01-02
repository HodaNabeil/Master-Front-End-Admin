import {
    Image,
    Menu,
    MenuButton,
    MenuList,
    useColorMode
} from "@chakra-ui/react";
import CogContent from "./Content"; 


const CogsModal = ({...rest }) => {
    const { colorMode } = useColorMode();
    return (
        <Menu
            gutter={0}
            boundary={"scrollParent"}
            placement="auto"
            strategy="fixed"
            zIndex={"modal"}
        >
            <MenuButton>
                <Image
                    src={`/Img/${colorMode}/User.webp`}
                    boxSize={{
                        base: "2rem",
                        md: "2.2rem"
                    }}
                    {...rest}
                />
            </MenuButton>
            <MenuList
                p={2}
                w={"fit-content"}
                className="Main-Modal"
                zIndex={"modal"}
                transform={"translateX(-110%) scale(0.1)"}
                transition={".5s ease-in-out"}
            >
                <CogContent />
            </MenuList>
        </Menu>
    );
};

export default CogsModal;
