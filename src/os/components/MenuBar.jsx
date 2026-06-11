import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import useClock from "../useClock";
import { useTheme } from "../useTheme";

function formatClock(date) {
    const day = date.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
    });
    const time = date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
    });
    return `${day}  ${time}`;
}

function DropdownMenu({ label, trigger, items, triggerClass }) {
    const [open, setOpen] = useState(false);
    const rootRef = useRef(null);
    const itemRefs = useRef([]);

    useEffect(() => {
        if (!open) {return undefined;}
        const onPointerDown = (e) => {
            if (!rootRef.current?.contains(e.target)) {setOpen(false);}
        };
        document.addEventListener("pointerdown", onPointerDown);
        itemRefs.current[0]?.focus();
        return () => document.removeEventListener("pointerdown", onPointerDown);
    }, [open]);

    function onMenuKeyDown(e) {
        const focusable = itemRefs.current.filter(Boolean);
        const idx = focusable.indexOf(document.activeElement);
        if (e.key === "Escape") {
            setOpen(false);
            rootRef.current?.querySelector("button")?.focus();
        } else if (e.key === "ArrowDown") {
            e.preventDefault();
            focusable[(idx + 1) % focusable.length]?.focus();
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            focusable[(idx - 1 + focusable.length) % focusable.length]?.focus();
        }
    }

    return (
        <div ref={rootRef} className="relative">
            <button
                type="button"
                aria-label={label}
                aria-haspopup="menu"
                aria-expanded={open}
                onClick={() => setOpen((o) => !o)}
                className={`flex h-7 items-center rounded px-2.5 text-[13px] transition-colors ${
                    open
                        ? "bg-accent text-white"
                        : "hover:bg-hover-fill text-ink"
                } ${triggerClass ?? ""}`}
            >
                {trigger}
            </button>
            {open && (
                <ul
                    role="menu"
                    aria-label={label}
                    onKeyDown={onMenuKeyDown}
                    className="glass-popover absolute left-0 top-8 z-10 min-w-52 animate-[menu-in_140ms_var(--ease-mac-spring)] rounded-lg p-1 shadow-window"
                >
                    {items.map((item, i) =>
                        item.separator ? (
                            <li key={`sep-${i}`} role="separator">
                                <div className="mx-2 my-1 h-px bg-(--window-divider)" />
                            </li>
                        ) : (
                            <li key={item.label} role="none">
                                <button
                                    type="button"
                                    role="menuitem"
                                    ref={(el) => {
                                        itemRefs.current[i] = el;
                                    }}
                                    onClick={() => {
                                        setOpen(false);
                                        item.onSelect();
                                    }}
                                    className="flex w-full items-center justify-between rounded-md px-3 py-1 text-left text-[13px] text-ink hover:bg-accent hover:text-white focus-visible:bg-accent focus-visible:text-white outline-none"
                                >
                                    {item.label}
                                    {item.hint && (
                                        <span className="ml-6 text-ink-3">
                                            {item.hint}
                                        </span>
                                    )}
                                </button>
                            </li>
                        ),
                    )}
                </ul>
            )}
        </div>
    );
}

DropdownMenu.propTypes = {
    label: PropTypes.string.isRequired,
    trigger: PropTypes.node.isRequired,
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    triggerClass: PropTypes.string,
};

function SunIcon() {
    return (
        <svg viewBox="0 0 24 24" className="size-[15px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4m11.4-11.4 1.4-1.4" />
        </svg>
    );
}

function MoonIcon() {
    return (
        <svg viewBox="0 0 24 24" className="size-[15px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z" />
        </svg>
    );
}

function SearchIcon() {
    return (
        <svg viewBox="0 0 24 24" className="size-[15px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
        </svg>
    );
}

export default function MenuBar({ activeTitle, onOpenApp, onOpenSpotlight }) {
    const now = useClock();
    const { isDark, theme, setTheme, toggleTheme } = useTheme();

    const logoItems = [
        {
            label: "About This Portfolio",
            onSelect: () => onOpenApp("about"),
        },
        { separator: true },
        {
            label: "View Source on GitHub",
            onSelect: () =>
                window.open(
                    "https://github.com/ArmandoBerlanga",
                    "_blank",
                    "noopener",
                ),
        },
        {
            label: "Download Resume",
            onSelect: () => window.open("/resume.pdf", "_blank", "noopener"),
        },
        { separator: true },
        {
            label: "Restart…",
            onSelect: () => {
                sessionStorage.removeItem("booted");
                window.location.reload();
            },
        },
    ];

    const appearanceItems = [
        { label: "Light", hint: theme === "light" ? "✓" : "", onSelect: () => setTheme("light") },
        { label: "Dark", hint: theme === "dark" ? "✓" : "", onSelect: () => setTheme("dark") },
        { label: "Auto (System)", hint: theme === "system" ? "✓" : "", onSelect: () => setTheme("system") },
    ];

    return (
        <div className="glass-bar fixed inset-x-0 top-0 z-[600] flex h-7 select-none items-center border-b border-(--window-divider) px-2 text-[13px] text-ink">
            <DropdownMenu
                label="Main menu"
                trigger={
                    <img
                        src="/me.webp"
                        alt=""
                        width="18"
                        height="18"
                        className="size-[18px] rounded-full object-cover"
                    />
                }
                items={logoItems}
            />
            <span className="ml-1 px-2 font-semibold">{activeTitle}</span>
            <DropdownMenu
                label="Appearance"
                trigger="Appearance"
                items={appearanceItems}
                triggerClass="hidden sm:flex"
            />

            <div className="ml-auto flex items-center gap-0.5">
                <a
                    href="https://github.com/ArmandoBerlanga"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub profile"
                    className="flex h-7 items-center rounded px-2 hover:bg-hover-fill"
                >
                    <svg viewBox="0 0 16 16" className="size-[15px]" fill="currentColor" aria-hidden="true">
                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.42 7.42 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
                    </svg>
                </a>
                <a
                    href="https://www.linkedin.com/in/armandoberlanga"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn profile"
                    className="flex h-7 items-center rounded px-2 hover:bg-hover-fill"
                >
                    <svg viewBox="0 0 16 16" className="size-[15px]" fill="currentColor" aria-hidden="true">
                        <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
                    </svg>
                </a>
                <button
                    type="button"
                    aria-label={isDark ? "Switch to light appearance" : "Switch to dark appearance"}
                    onClick={toggleTheme}
                    className="flex h-7 items-center rounded px-2 hover:bg-hover-fill"
                >
                    {isDark ? <SunIcon /> : <MoonIcon />}
                </button>
                <button
                    type="button"
                    aria-label="Search (Command K)"
                    onClick={onOpenSpotlight}
                    className="flex h-7 items-center rounded px-2 hover:bg-hover-fill"
                >
                    <SearchIcon />
                </button>
                <time
                    dateTime={now.toISOString()}
                    className="whitespace-pre px-2 tabular-nums"
                >
                    {formatClock(now)}
                </time>
            </div>
        </div>
    );
}

MenuBar.propTypes = {
    activeTitle: PropTypes.string.isRequired,
    onOpenApp: PropTypes.func.isRequired,
    onOpenSpotlight: PropTypes.func.isRequired,
};
