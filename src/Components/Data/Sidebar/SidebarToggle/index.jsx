import { ToggleSideBar } from "@/Redux";
import { Image, useColorMode } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
export default function SidebarToggle({ Version, ...rest }) {
    const { colorMode } = useColorMode();
    const Dispatch = useDispatch();
    return (
        <>
            <Image
                src={`/Img/${colorMode}/Arrow-Reverse-${Version}.webp`}
                boxSize={"2.8rem"}
                p={0}
                onClick={() => Dispatch(ToggleSideBar())}
                cursor={"pointer"}
                _hover={{
                    transform: "scale(1.1)"
                }}
                transition={".2s ease-in-out"}
                {...rest}
            />
        </>
    );
}
