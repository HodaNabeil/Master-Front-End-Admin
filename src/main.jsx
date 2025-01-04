import { createRoot } from "react-dom/client";

import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import Store from "./Redux/Store";
import App from "./App";
import { Theme } from "./Utility";
import { BrowserRouter } from "react-router-dom";
createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <Provider store={Store.Configration}>
            <ChakraProvider theme={Theme.Init}>
                <App />
            </ChakraProvider>
        </Provider>
    </BrowserRouter>
);
