import { Flex } from "@chakra-ui/react";
import CogsModal from "../../Modals/Cogs";
import NotificationsCard from "../../Modals/Notifications";

const SidebarNavigationButton = ({ dirction = "row", IconSize, ...rest }) => {
    return (
        <Flex 
        alignItems={"center"}
        flexDir={dirction}
        py={0}
        my={0} 
        {...rest}
         >
            <CogsModal {...(IconSize && { ...IconSize })} />
            <NotificationsCard {...(IconSize && { ...IconSize })} />
        </Flex>
    );
};

export default SidebarNavigationButton;
