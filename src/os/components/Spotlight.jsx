import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import search from "../searchIndex";
import { APP_BY_ID } from "../apps";
import useFocusTrap from "../useFocusTrap";

function scrollToAnchor(anchorId, attempt = 0) {
    const el = document.getElementById(anchorId);
    if (el) {
        el.scrollIntoView({ block: "start", behavior: "smooth" });
        return;
    }
    // Window content is lazy-loaded; retry a few frames until it mounts.
    if (attempt < 30) {
        requestAnimationFrame(() => scrollToAnchor(anchorId, attempt + 1));
    }
}

export default function Spotlight({ onClose, onOpenApp }) {
    const [query, setQuery] = useState("");
    const [selected, setSelected] = useState(0);
    const panelRef = useRef(null);
    const results = search(query);

    useFocusTrap(panelRef, true);

    useEffect(() => {
        setSelected(0);
    }, [query]);

    function activate(entry) {
        onClose();
        onOpenApp(entry.appId);
        if (entry.anchorId) {scrollToAnchor(entry.anchorId);}
    }

    function onKeyDown(e) {
        if (e.key === "Escape") {
            e.preventDefault();
            onClose();
        } else if (e.key === "ArrowDown") {
            e.preventDefault();
            setSelected((s) => Math.min(s + 1, results.length - 1));
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setSelected((s) => Math.max(s - 1, 0));
        } else if (e.key === "Enter" && results[selected]) {
            e.preventDefault();
            activate(results[selected]);
        }
    }

    return (
        <div
            className="fixed inset-0 z-[700] bg-black/20"
            onClick={(e) => {
                if (e.target === e.currentTarget) {onClose();}
            }}
        >
            <div
                ref={panelRef}
                role="dialog"
                aria-modal="true"
                aria-label="Search"
                className="glass-popover mx-auto mt-[18vh] w-[min(560px,calc(100vw-2rem))] animate-[spotlight-in_180ms_var(--ease-mac-spring)] overflow-hidden rounded-2xl shadow-window"
            >
                <div className="flex items-center gap-3 px-4">
                    <svg viewBox="0 0 24 24" className="size-5 shrink-0 text-ink-3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                        <circle cx="11" cy="11" r="7" />
                        <path d="m20 20-3.5-3.5" />
                    </svg>
                    <input
                        autoFocus
                        type="text"
                        role="combobox"
                        aria-expanded={results.length > 0}
                        aria-controls="spotlight-results"
                        aria-activedescendant={
                            results[selected]
                                ? `spotlight-item-${selected}`
                                : undefined
                        }
                        aria-label="Search apps, projects, and experience"
                        placeholder="Search"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={onKeyDown}
                        className="h-12 w-full bg-transparent text-lg text-ink placeholder-ink-3 outline-none"
                    />
                </div>
                {results.length > 0 && (
                    <ul
                        id="spotlight-results"
                        role="listbox"
                        aria-label="Search results"
                        className="border-t border-(--window-divider) p-1.5"
                    >
                        {results.map((entry, i) => {
                            const app = APP_BY_ID[entry.appId];
                            const Icon = app.icon;
                            return (
                                <li
                                    key={`${entry.type}-${entry.title}`}
                                    id={`spotlight-item-${i}`}
                                    role="option"
                                    aria-selected={i === selected}
                                >
                                    <button
                                        type="button"
                                        tabIndex={-1}
                                        onClick={() => activate(entry)}
                                        onMouseEnter={() => setSelected(i)}
                                        className={`flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-left ${
                                            i === selected
                                                ? "bg-accent text-white"
                                                : "text-ink"
                                        }`}
                                    >
                                        <Icon className="size-7 shrink-0" />
                                        <span className="min-w-0 flex-1">
                                            <span className="block truncate text-sm font-medium">
                                                {entry.title}
                                            </span>
                                            <span
                                                className={`block truncate text-xs ${
                                                    i === selected
                                                        ? "text-white/75"
                                                        : "text-ink-3"
                                                }`}
                                            >
                                                {entry.type} · {entry.subtitle}
                                            </span>
                                        </span>
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>
        </div>
    );
}

Spotlight.propTypes = {
    onClose: PropTypes.func.isRequired,
    onOpenApp: PropTypes.func.isRequired,
};
