import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { MonogramIcon } from "../AppIcons";

const PROGRESS_MS = 1400;
const LOGIN_MS = 600;
const FADE_MS = 250;

/*
 * Pure overlay above the already-rendered desktop — content, LCP, and
 * crawlers never wait on it. Runs once per session, skippable on any input.
 */
export default function BootScreen({ onDone }) {
    const [stage, setStage] = useState("boot"); // boot | login | fading

    useEffect(() => {
        if (stage === "fading") {
            const t = setTimeout(onDone, FADE_MS);
            return () => clearTimeout(t);
        }
        const t = setTimeout(
            () => setStage(stage === "boot" ? "login" : "fading"),
            stage === "boot" ? PROGRESS_MS : LOGIN_MS,
        );
        return () => clearTimeout(t);
    }, [stage, onDone]);

    useEffect(() => {
        const skip = () => setStage("fading");
        window.addEventListener("pointerdown", skip);
        window.addEventListener("keydown", skip);
        return () => {
            window.removeEventListener("pointerdown", skip);
            window.removeEventListener("keydown", skip);
        };
    }, []);

    return (
        <div
            aria-hidden="true"
            className={`fixed inset-0 z-[800] transition-opacity duration-250 ${
                stage === "fading" ? "opacity-0" : "opacity-100"
            }`}
        >
            <span className="sr-only" aria-live="polite" aria-hidden="false">
                Loading portfolio. Press any key to skip.
            </span>

            {stage === "boot" ? (
                <div className="flex h-full flex-col items-center justify-center gap-10 bg-black">
                    <MonogramIcon className="size-[72px] opacity-90 grayscale" />
                    <div className="h-1 w-40 overflow-hidden rounded-full bg-white/20">
                        <div className="h-full animate-[boot-progress_1400ms_cubic-bezier(0.4,0,0.2,1)_forwards] rounded-full bg-white/90" />
                    </div>
                </div>
            ) : (
                <div className="wallpaper-ridge flex h-full flex-col items-center justify-center">
                    <div className="absolute inset-0 bg-black/30" />
                    <div className="relative flex flex-col items-center gap-3">
                        <img
                            src="/me.webp"
                            alt=""
                            width="96"
                            height="96"
                            className="size-24 rounded-full border-2 border-white/40 object-cover shadow-lg"
                        />
                        <p className="text-[15px] font-semibold text-white">
                            aberlang
                        </p>
                        <p className="text-[12px] text-white/70">
                            Logging in…
                        </p>
                    </div>
                </div>
            )}

            <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[12px] text-white/40">
                Press any key to skip
            </p>
        </div>
    );
}

BootScreen.propTypes = {
    onDone: PropTypes.func.isRequired,
};
