import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";
import PropTypes from "prop-types";

const ThemeContext = createContext(null);

const SYSTEM_DARK = "(prefers-color-scheme: dark)";

function resolveIsDark(theme) {
    if (theme === "system") {
        return window.matchMedia(SYSTEM_DARK).matches;
    }
    return theme === "dark";
}

export function ThemeProvider({ children }) {
    const [theme, setThemeState] = useState(
        () => localStorage.theme ?? "system",
    );
    const [isDark, setIsDark] = useState(() => resolveIsDark(theme));

    useEffect(() => {
        const dark = resolveIsDark(theme);
        setIsDark(dark);
        document.documentElement.classList.toggle("dark", dark);

        if (theme !== "system") {return undefined;}
        const mq = window.matchMedia(SYSTEM_DARK);
        const onChange = (e) => {
            setIsDark(e.matches);
            document.documentElement.classList.toggle("dark", e.matches);
        };
        mq.addEventListener("change", onChange);
        return () => mq.removeEventListener("change", onChange);
    }, [theme]);

    const setTheme = useCallback((next) => {
        setThemeState(next);
        if (next === "system") {
            localStorage.removeItem("theme");
        } else {
            localStorage.theme = next;
        }
    }, []);

    const toggleTheme = useCallback(() => {
        setTheme(resolveIsDark(localStorage.theme ?? "system") ? "light" : "dark");
    }, [setTheme]);

    return (
        <ThemeContext.Provider value={{ theme, isDark, setTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

ThemeProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export function useTheme() {
    const ctx = useContext(ThemeContext);
    if (!ctx) {throw new Error("useTheme must be used within ThemeProvider");}
    return ctx;
}
