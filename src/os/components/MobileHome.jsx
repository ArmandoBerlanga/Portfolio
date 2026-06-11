import { useState } from "react";
import PropTypes from "prop-types";
import { VISIBLE_APPS, APP_BY_ID } from "../apps";
import { ResumeIcon } from "../AppIcons";
import StatusBar from "./StatusBar";
import MobileApp from "./MobileApp";
import Spotlight from "./Spotlight";
import useHashSync from "../useHashSync";

const FAVORITES = ["about", "projects", "terminal", "contact"];

function SpringboardIcon({ app, onOpen }) {
    const Icon = app.icon;
    return (
        <button
            type="button"
            onClick={() => onOpen(app.id)}
            className="flex flex-col items-center gap-1.5 outline-none focus-visible:ring-2 focus-visible:ring-white/80 rounded-xl"
        >
            <Icon className="size-[60px] drop-shadow-lg" />
            <span className="text-[11px] font-medium text-white/90 drop-shadow">
                {app.title}
            </span>
        </button>
    );
}

SpringboardIcon.propTypes = {
    app: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        icon: PropTypes.elementType.isRequired,
    }).isRequired,
    onOpen: PropTypes.func.isRequired,
};

export default function MobileHome() {
    const [activeAppId, setActiveAppId] = useState(null);
    const [spotlightOpen, setSpotlightOpen] = useState(false);

    useHashSync({ onOpenApp: setActiveAppId, focusedId: activeAppId });

    const gridApps = VISIBLE_APPS.filter((app) => !FAVORITES.includes(app.id));
    const favoriteApps = FAVORITES.map((id) => APP_BY_ID[id]);

    return (
        <div className="wallpaper-ridge fixed inset-0 flex flex-col overflow-hidden text-white">
            <StatusBar light onOpenSpotlight={() => setSpotlightOpen(true)} />

            <main className="grid flex-1 grid-cols-4 content-start gap-y-6 px-6 pt-6">
                {gridApps.map((app) => (
                    <SpringboardIcon
                        key={app.id}
                        app={app}
                        onOpen={setActiveAppId}
                    />
                ))}
                <a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-1.5 rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-white/80"
                >
                    <ResumeIcon className="size-[60px] drop-shadow-lg" />
                    <span className="text-[11px] font-medium text-white/90 drop-shadow">
                        Resume
                    </span>
                </a>
            </main>

            <nav
                aria-label="Favorite applications"
                className="glass-dock mx-4 mb-[max(12px,env(safe-area-inset-bottom))] flex justify-around rounded-[28px] border border-(--dock-border) p-3"
            >
                {favoriteApps.map((app) => {
                    const Icon = app.icon;
                    return (
                        <button
                            key={app.id}
                            type="button"
                            aria-label={app.title}
                            onClick={() => setActiveAppId(app.id)}
                            className="rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-white/80"
                        >
                            <Icon className="size-[56px] drop-shadow-lg" />
                        </button>
                    );
                })}
            </nav>

            {activeAppId && (
                <MobileApp
                    app={APP_BY_ID[activeAppId]}
                    onClose={() => setActiveAppId(null)}
                />
            )}

            {spotlightOpen && (
                <Spotlight
                    onClose={() => setSpotlightOpen(false)}
                    onOpenApp={setActiveAppId}
                />
            )}
        </div>
    );
}
