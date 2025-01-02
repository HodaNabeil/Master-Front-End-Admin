import { IconButton, Menu, MenuButton, MenuList, useDisclosure } from "@chakra-ui/react";
import { TbMenu2 } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { SetHelperData } from "@/Redux";
import CogsModal from ".";
import NotificationsCard from "../Notifications";

const CogsModalSmall = ({ ...rest }) => {
    const { isOpen, onToggle } = useDisclosure();
    const { ToggleSideBar } = useSelector((state) => state.Helper);
    const [isSideWasOpen, setIsSideWasOpen] = useState(false);
    const Disptach = useDispatch();
    return (
        <Menu
            gutter={0}
            boundary={"scrollParent"}
            placement="auto"
            strategy="fixed"
            zIndex={"modal"}
            isOpen={isOpen}
            onOpen={() => {
                onToggle();
                if (ToggleSideBar) {
                    setIsSideWasOpen(true);
                    Disptach(SetHelperData({ ToggleSideBar: false }));
                }
            }}
            onClose={() => {
                onToggle();
                if (isSideWasOpen) {
                    setIsSideWasOpen(false);
                    Disptach(SetHelperData({ ToggleSideBar: true }));
                }
            }}
        >
            <MenuButton as={IconButton} icon={<TbMenu2 />} {...rest} />
            <MenuList
                py={0}
                w={"fit-content"}
                className="Main-Modal Shadow"
                zIndex={"modal"}
                transform={"translateX(-110%) scale(0.1)"}
                transition={".5s ease-in-out"}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
            >
                <CogsModal boxSize={"2.5rem"} />
                <NotificationsCard boxSize={"2.5rem"} />
            </MenuList>
        </Menu>
    );
};

export default CogsModalSmall;
