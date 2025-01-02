import { Box } from "@chakra-ui/react";
import { Component } from "react";

class NetworkErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return {
            hasError: true,
            error
        };
    }

    componentDidCatch() {
        const { pathname } = window.location;
        setTimeout(() => {
            history.replaceState(pathname.split("/"), null, pathname);
        }, 10000);
    }
    render() {
        const { hasError, error } = this.state;
        if (hasError) {
            return (
                <Box h={"100vh"} overflow={"hidden"}>
                    {/* <Image
            src={'/Img/error.gif'}
            w={'100%'}
            h={'100%'}
            bgSize={'cover'}
            borderRadius={'6px'}
          /> */}
                    <Box
                        textAlign={"center"}
                        pos={"absolute"}
                        bottom={"5%"}
                        left={"5%"}
                        background={"#42A5F5"}
                        color={"black"}
                        p={"2px 5px"}
                        borderRadius={"6px"}
                    >
                        Will Reload After 10 Secounds
                    </Box>
                </Box>
            );
        }

        return this.props.children;
    }
}

export default NetworkErrorBoundary;
