import PropTypes from "prop-types";
import useClock from "../useClock";
import { useTheme } from "../useTheme";

export default function StatusBar({ onOpenSpotlight, light }) {
    const now = useClock();
    const { isDark, toggleTheme } = useTheme();
    const tone = light ? "text-white" : "text-ink";

    return (
        <div
            className={`flex h-11 select-none items-center justify-between px-5 pt-[env(safe-area-inset-top)] text-[13px] font-semibold ${tone}`}
        >
            <time dateTime={now.toISOString()} className="tabular-nums">
                {now.toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "2-digit",
                })}
            </time>
            <div className="flex items-center gap-3">
                {onOpenSpotlight && (
                    <button
                        type="button"
                        aria-label="Search"
                        onClick={onOpenSpotlight}
                        className="flex items-center"
                    >
                        <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                            <circle cx="11" cy="11" r="7" />
                            <path d="m20 20-3.5-3.5" />
                        </svg>
                    </button>
                )}
                <button
                    type="button"
                    aria-label={isDark ? "Switch to light appearance" : "Switch to dark appearance"}
                    onClick={toggleTheme}
                    className="flex items-center"
                >
                    {isDark ? (
                        <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                            <circle cx="12" cy="12" r="4" />
                            <path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4m11.4-11.4 1.4-1.4" />
                        </svg>
                    ) : (
                        <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z" />
                        </svg>
                    )}
                </button>
                {/* battery glyph — decorative */}
                <svg viewBox="0 0 28 14" className="h-3.5 w-7" aria-hidden="true">
                    <rect x="1" y="1" width="22" height="12" rx="3.5" fill="none" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.5" />
                    <rect x="3" y="3" width="15" height="8" rx="2" fill="currentColor" />
                    <path d="M25 5v4a2.2 2.2 0 0 0 0-4Z" fill="currentColor" fillOpacity="0.5" />
                </svg>
            </div>
        </div>
    );
}

StatusBar.propTypes = {
    onOpenSpotlight: PropTypes.func,
    light: PropTypes.bool,
};
