import { useEffect, useRef } from "react";
import { APP_BY_HASH, APP_BY_ID } from "./apps";

/*
 * Keeps the URL hash and the open/focused app in sync so the sitemap's
 * anchor URLs (/#projects etc.) deep-link into the desktop, and focusing
 * a window produces a shareable URL.
 */
export default function useHashSync({
    onOpenApp,
    focusedId,
    defaultApps = ["about"],
}) {
    const openRef = useRef(onOpenApp);
    openRef.current = onOpenApp;
    const defaultsRef = useRef(defaultApps);

    useEffect(() => {
        // Defaults always open (last one focused); a hash deep-link then
        // opens its app on top. Re-opening a default via hash just focuses it.
        defaultsRef.current.forEach((id) => openRef.current(id));
        const app = APP_BY_HASH[window.location.hash];
        if (app) {
            openRef.current(app.id);
        }

        const onHashChange = () => {
            const target = APP_BY_HASH[window.location.hash];
            if (target) {openRef.current(target.id);}
        };
        window.addEventListener("hashchange", onHashChange);
        return () => window.removeEventListener("hashchange", onHashChange);
    }, []);

    useEffect(() => {
        const app = focusedId ? APP_BY_ID[focusedId] : null;
        if (app) {
            if (window.location.hash !== app.hash) {
                window.history.replaceState(null, "", app.hash);
            }
            document.title = `${app.title} — Armando Berlanga`;
        } else {
            window.history.replaceState(null, "", window.location.pathname);
            document.title =
                "Armando Berlanga - Senior Software Engineer | Full-Stack Developer";
        }
    }, [focusedId]);
}
