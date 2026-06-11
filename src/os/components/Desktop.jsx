import { useEffect, useRef, useState } from "react";
import {
    WindowManagerProvider,
    useWindowManager,
    useWindowActions,
} from "../WindowManagerContext";
import { APPS, APP_BY_ID } from "../apps";
import { ResumeIcon } from "../AppIcons";
import MenuBar from "./MenuBar";
import Dock from "./Dock";
import Window from "./Window";
import Spotlight from "./Spotlight";
import useHashSync from "../useHashSync";
import useGlobalShortcuts from "../useGlobalShortcuts";

function Announcer() {
    const { windows } = useWindowManager();
    const prevRef = useRef(windows);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const prev = prevRef.current;
        prevRef.current = windows;
        for (const id of Object.keys(windows)) {
            if (!prev[id]) {
                setMessage(`${APP_BY_ID[id].title} window opened`);
                return;
            }
            if (windows[id].minimized && !prev[id].minimized) {
                setMessage(`${APP_BY_ID[id].title} window minimized`);
                return;
            }
        }
        for (const id of Object.keys(prev)) {
            if (!windows[id]) {
                setMessage(`${APP_BY_ID[id].title} window closed`);
                return;
            }
        }
    }, [windows]);

    return (
        <div aria-live="polite" className="sr-only">
            {message}
        </div>
    );
}

function DesktopInner() {
    const { windows, focusedId } = useWindowManager();
    const { openApp, cycleFocus, focus } = useWindowActions();
    const [spotlightOpen, setSpotlightOpen] = useState(false);

    useHashSync({
        onOpenApp: openApp,
        focusedId,
        defaultApps: ["about", "experience"],
    });
    useGlobalShortcuts({
        onToggleSpotlight: () => setSpotlightOpen((o) => !o),
        onCycleFocus: cycleFocus,
    });

    const activeTitle = focusedId ? APP_BY_ID[focusedId].title : "Portfolio";

    return (
        <div className="wallpaper-ridge fixed inset-0 overflow-hidden">
            <a
                href="#main-content"
                onClick={(e) => {
                    e.preventDefault();
                    if (focusedId) {
                        document
                            .querySelector(`[data-window="${focusedId}"]`)
                            ?.focus();
                        focus(focusedId);
                    }
                }}
                className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-9 focus:z-[650] focus:rounded focus:bg-surface focus:px-3 focus:py-2 focus:text-ink"
            >
                Skip to focused window
            </a>

            <MenuBar
                activeTitle={activeTitle}
                onOpenApp={openApp}
                onOpenSpotlight={() => setSpotlightOpen(true)}
            />

            {/* Desktop shortcut */}
            <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                title="Open resume.pdf"
                className="group absolute right-5 top-12 z-[5] flex w-20 flex-col items-center gap-1 rounded-lg p-2 outline-none transition-colors duration-150 hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/80"
            >
                <ResumeIcon className="size-12 drop-shadow-lg transition-transform duration-200 group-hover:scale-105" />
                <span className="max-w-full truncate rounded px-1 text-[11px] font-medium text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
                    resume.pdf
                </span>
            </a>

            <main id="main-content" className="absolute inset-0">
                {APPS.filter((app) => windows[app.id]).map((app) => (
                    <Window
                        key={app.id}
                        app={app}
                        win={windows[app.id]}
                        focused={focusedId === app.id}
                    />
                ))}
            </main>

            <Dock />
            <Announcer />

            {spotlightOpen && (
                <Spotlight
                    onClose={() => setSpotlightOpen(false)}
                    onOpenApp={openApp}
                />
            )}
        </div>
    );
}

export default function Desktop() {
    return (
        <WindowManagerProvider>
            <DesktopInner />
        </WindowManagerProvider>
    );
}
