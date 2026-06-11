import { useEffect, useState } from "react";
import { ThemeProvider } from "../useTheme";
import useMediaQuery from "../useMediaQuery";
import { preloadApps } from "../apps";
import Desktop from "./Desktop";
import MobileHome from "./MobileHome";
import BootScreen from "./BootScreen";

function shouldBoot() {
    if (sessionStorage.getItem("booted")) {
        return false;
    }
    return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function OSShell() {
    const isDesktop = useMediaQuery("(min-width: 768px)");
    const [booting, setBooting] = useState(shouldBoot);

    useEffect(() => {
        preloadApps();
    }, []);

    return (
        <ThemeProvider>
            {isDesktop ? <Desktop /> : <MobileHome />}
            {booting && (
                <BootScreen
                    onDone={() => {
                        sessionStorage.setItem("booted", "1");
                        setBooting(false);
                    }}
                />
            )}
        </ThemeProvider>
    );
}
