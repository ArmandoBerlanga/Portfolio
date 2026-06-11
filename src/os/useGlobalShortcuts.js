import { useEffect, useRef } from "react";

export default function useGlobalShortcuts({ onToggleSpotlight, onCycleFocus }) {
    const handlers = useRef({ onToggleSpotlight, onCycleFocus });
    handlers.current = { onToggleSpotlight, onCycleFocus };

    useEffect(() => {
        const onKeyDown = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
                e.preventDefault();
                handlers.current.onToggleSpotlight();
                return;
            }
            if ((e.metaKey || e.ctrlKey) && e.key === "`") {
                e.preventDefault();
                handlers.current.onCycleFocus?.();
            }
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, []);
}
