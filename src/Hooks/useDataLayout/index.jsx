import { startTransition, useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";
// Small Mobile (320px - 480px): Typical for small smartphones.
// Medium Mobile (481px - 768px): Covers larger smartphones.
// Mini Tablets (769px - 1024px): For iPads, mini tablets.
// Large Tablets / Small Laptops (1025px - 1366px): Devices like Surface Pro or smaller laptops.
// Mini Desktops (1367px - 1600px): Standard desktops and higher-resolution laptops.
// Large Desktops (1601px and up): Ultra-wide monitors or large desktops.
const useDataLayout = ({ InPrecentage = false, InViewWidth = false, WithView = true } = {}) => {
    const { ToggleSideBar } = useSelector((state) => state.Helper);
    const [Layout, setLayout] = useState({
        Sidebar: 30,
        Main: 70,
        View: 0
    });
    useLayoutEffect(() => {
        function handleResize() {
            const width = window.innerWidth;
            const ClosedSidebarWidth = 5;
            const Data = {
                Sidebar: 30,
                Main: 70,
                View: 0
            };
            switch (true) {
                case width >= 320 && width <= 480:
                case width >= 481 && width <= 768:
                    break;
                case width >= 769 && width <= 1024:
                    Data.Sidebar = ToggleSideBar ? (WithView ? 30 : 30) : ClosedSidebarWidth;
                    Data.Main = ToggleSideBar
                        ? WithView
                            ? 30
                            : 70
                        : WithView
                        ? 30
                        : 100 - ClosedSidebarWidth;
                    Data.View = ToggleSideBar ? 40 : 60;
                    break;
                case width >= 1025 && width <= 1366:
                    Data.Sidebar = ToggleSideBar ? (WithView ? 30 : 30) : ClosedSidebarWidth;
                    Data.Main = ToggleSideBar
                        ? WithView
                            ? 30
                            : 70
                        : WithView
                        ? 30
                        : 100 - ClosedSidebarWidth;
                    Data.View = ToggleSideBar ? 40 : 60;
                    break;
                case width >= 1367 && width <= 1600:
                    Data.Sidebar = ToggleSideBar ? (WithView ? 30 : 30) : ClosedSidebarWidth;
                    Data.Main = ToggleSideBar
                        ? WithView
                            ? 30
                            : 70
                        : WithView
                        ? 30
                        : 100 - ClosedSidebarWidth;
                    Data.View = ToggleSideBar ? 40 : 60;
                    break;
                case width >= 1601:
                    Data.Sidebar = ToggleSideBar ? (WithView ? 30 : 30) : ClosedSidebarWidth;
                    Data.Main = ToggleSideBar
                        ? WithView
                            ? 30
                            : 70
                        : WithView
                        ? 30
                        : 100 - ClosedSidebarWidth;
                    Data.View = ToggleSideBar ? 40 : 60;
                    break;
                default:
                    break;
            }
            startTransition(() => {
                setLayout(Data);
            });
        }
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ToggleSideBar]);
    const Prefix = InPrecentage ? "%" : InViewWidth ? "vw" : null;
    return {
        Sidebar: Prefix ? Layout.Sidebar + Prefix : Layout.Sidebar,
        Main: Prefix ? Layout.Main + Prefix : Layout.Main,
        View: Prefix ? Layout.View + Prefix : Layout.View
    };
};
export default useDataLayout;
