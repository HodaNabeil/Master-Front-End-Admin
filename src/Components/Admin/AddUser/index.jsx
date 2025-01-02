import { InputField } from "@/Common";
import PhoneInp from "@/Common/PhoneInput";
import { Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useColorMode, useDisclosure } from "@chakra-ui/react";



import "./adduser.css"
import { ThemeColors } from "@/Utility";
import { color } from "framer-motion";
// eslint-disable-next-line no-unused-vars
const AddUser = ({ Lang, colorMode }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <Button onClick={onOpen}>Open Modal</Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay className="Modal-Overlay-Admin" />
                <ModalContent m={"auto"} w={{
                    base: "90%"
                }}>
                    <ModalHeader>
                        {Lang?.PAGE_ADMIN?.USERS?.ADDUSER}
                    </ModalHeader>
                    <ModalCloseButton className="Btn-Circle-Admin "
                        _hover={{

                        }}
                    />
                    <ModalBody>

                        <Input></Input>
                        < PhoneInp Label="WhatsApp" />
                        < PhoneInp Label="Phone" />
                        <InputField Label={"Password"} Type="password" />

                    </ModalBody>

                    <ModalFooter
                        style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "2rem" }}
                    >
                        <Button className="Btn-Add-User-Admin  "
                            _hover={{
                                backgroundColor: `${ThemeColors.ActiveStateColor[colorMode]} !important`,
                                transform: "scale(1.04)",
                            }}


                            variant={"solid"} onClick={onClose}>
                            {Lang?.SAVE}
                        </Button>
                        <Button
                            className="Btn-Add-User-Admin  "
                            _hover={{
                                backgroundColor:
                                    `${ThemeColors.ActiveStateColor[colorMode]} !important`,
                                transform: "scale(1.04)",
                            }}
                            variant={"solid"} onClick={onClose}>
                            {Lang?.RESET}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default AddUser;
