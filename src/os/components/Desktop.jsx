import { useEffect, useRef, useState } from "react";
import {
    WindowManagerProvider,
    useWindowManager,
    useWindowActions,
} from "../WindowManagerContext";
import { APPS, APP_BY_ID } from "../apps";
import { FileIcon } from "../AppIcons";
import { DOCUMENTS, fileKind } from "../documents";
import { PreviewProvider, usePreview } from "../PreviewContext";
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
    const { openDocument } = usePreview();
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

            {/* Desktop documents — click to open in Preview */}
            <div className="absolute right-3 top-10 z-[5] flex flex-col items-center gap-1">
                {DOCUMENTS.map((doc) => (
                    <button
                        key={doc.src}
                        type="button"
                        onDoubleClick={() => openDocument(doc)}
                        onClick={() => openDocument(doc)}
                        title={`Open ${doc.name}`}
                        className="group flex w-24 flex-col items-center gap-1 rounded-lg p-2 outline-none transition-colors duration-150 hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/80"
                    >
                        {fileKind(doc.name) === "image" ? (
                            // Images show their own thumbnail, like Finder.
                            <img
                                src={doc.src}
                                alt=""
                                loading="lazy"
                                width="48"
                                height="48"
                                className="size-12 rounded-md border-2 border-white/85 object-cover shadow-lg transition-transform duration-200 group-hover:scale-105"
                            />
                        ) : (
                            <FileIcon
                                name={doc.name}
                                kind={fileKind(doc.name)}
                                className="size-12 drop-shadow-lg transition-transform duration-200 group-hover:scale-105"
                            />
                        )}
                        <span className="line-clamp-2 max-w-full break-all rounded px-1 text-center text-[11px] font-medium leading-tight text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
                            {doc.name}
                        </span>
                    </button>
                ))}
            </div>

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
            <PreviewProvider>
                <DesktopInner />
            </PreviewProvider>
        </WindowManagerProvider>
    );
}
