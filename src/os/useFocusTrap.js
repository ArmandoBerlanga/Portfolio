import { useEffect } from "react";

const FOCUSABLE =
    'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])';

export default function useFocusTrap(containerRef, active) {
    useEffect(() => {
        if (!active || !containerRef.current) {return undefined;}
        const container = containerRef.current;
        const previouslyFocused = document.activeElement;

        const onKeyDown = (e) => {
            if (e.key !== "Tab") {return;}
            const focusable = Array.from(
                container.querySelectorAll(FOCUSABLE),
            ).filter((el) => el.offsetParent !== null);
            if (focusable.length === 0) {return;}
            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        };

        container.addEventListener("keydown", onKeyDown);
        return () => {
            container.removeEventListener("keydown", onKeyDown);
            previouslyFocused?.focus?.();
        };
    }, [containerRef, active]);
}
