import { Helper } from "@/Utility";
import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Text
} from "@chakra-ui/react";
export default function ActionModal({
    OnClose = () => {},
    Data = {
        IsOpen: false,
        Title: "",
        Content: ""
    }
}) {
    const IsArabic = Helper.IsArabic(Data.Content);
    const ArabicProps = IsArabic
        ? {
              direction: "rtl",
              textAlign: "right",
              padding: "10px",
              whiteSpace: "pre-line",
              overflow: "auto"
          }
        : {};
    return (
        <>
            <Modal
                isOpen={Data.IsOpen}
                onClose={OnClose}
                isCentered={true}
                motionPreset="slideInLeft"
            >
                <ModalOverlay />
                <ModalContent
                    className="Main-Modal"
                    transform={"translateX(-110%) scale(0.1)"}
                    transition={".5s ease-in-out"}
                >
                    <ModalHeader py={1}>{Data.Title}</ModalHeader>
                    <ModalCloseButton rounded={"full"} />
                    <ModalBody {...ArabicProps}>
                        {IsArabic ? Data.Content?.split("،").map((item, index) => (
                            <Text key={index}>{item}</Text>
                        )) : Data.Content}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}
