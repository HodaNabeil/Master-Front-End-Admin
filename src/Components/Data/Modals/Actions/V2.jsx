import { Helper } from "@/Utility";
import { Box, Flex, Text } from "@chakra-ui/react";
export default function ActionModal({
    Data = {
        IsOpen: false,
        Title: "",
        Content: "",
        Type: ""
    }
}) {
    const IsArabic = Helper.IsArabic(Data.Content);
    const IsDesc = Data.Type == "Description";
    const ArabicProps = IsArabic
        ? {
              direction: "rtl",
              textAlign: "right",
              padding: "10px",
              whiteSpace: "pre-line",
              overflow: "auto"
          }
        : {};
    const IsDescProps = IsDesc
        ? {}
        : {
              alignItems: "center",
              justifyContent: "center",
              w: "100%"
          };
    return (
        <Flex
            p={2}
            h={"80%"}
            w={{
                lg: "100%",
                xl: IsDesc ? "80%" : "100%"
            }}
            rounded={"lg"}
            {...IsDescProps}
            {...ArabicProps}
        >
            <Box {...IsDescProps}>
                {IsArabic
                    ? Data.Content?.split("~").map((item, index) => 
                    <Text key={index}>{item}</Text>)
                    : Data.Content}
            </Box>
        </Flex>
    );
}
