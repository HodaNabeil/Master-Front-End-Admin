import { AspectRatio } from "@chakra-ui/react";
export default function MapContent({ Data, IsModel = true }) {
    const ModalProps = IsModel
        ? {
              border: "3px solid aquamarine",
              rounded: "3xl"
          }
        : {};
    const IsVedio = Data.Type == "DataUrl";
    return (
        <AspectRatio {...ModalProps} ratio={16 / 9} w={"100%"} h={"100%"}>
            <iframe
                title={"coordinates"}
                style={
                    IsModel
                        ? {
                              border: "1px solid",
                              borderRadius: "20px"
                          }
                        : {}
                }
                src={IsVedio ? Data.Content?.replace("watch?v=", "embed/") : Data.Content}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            />
        </AspectRatio>
    );
}
