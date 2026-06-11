import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { APPS, VISIBLE_APPS } from "../apps";
import { ResumeIcon } from "../AppIcons";
import { useWindowManager, useWindowActions } from "../WindowManagerContext";

const BASE_SIZE = 52;

function DockItem({ id, label, icon, running, bouncing, onClick, href }) {
    const Icon = icon;
    const inner = (
        <>
            <span
                className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md px-2.5 py-1 text-[11px] text-ink opacity-0 transition-opacity delay-300 glass-popover group-hover/item:opacity-100 group-focus-visible/item:opacity-100 group-focus-visible/item:delay-0"
                role="presentation"
            >
                {label}
            </span>
            <Icon className="size-full drop-shadow-md" />
            <span
                aria-hidden="true"
                className={`absolute -bottom-1.5 left-1/2 size-1 -translate-x-1/2 rounded-full bg-ink-2 transition-opacity ${
                    running ? "opacity-100" : "opacity-0"
                }`}
            />
        </>
    );

    // Only the hovered icon magnifies — pure CSS :hover, no neighbor bleed.
    // Eased over 350ms both in and out so it glides instead of snapping.
    const className = `group/item relative block origin-bottom rounded-xl outline-none transition-transform duration-350 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] focus-visible:ring-2 focus-visible:ring-accent motion-safe:hover:-translate-y-1.5 motion-safe:hover:scale-[1.28] motion-safe:active:scale-110 motion-safe:active:duration-150 ${
        bouncing ? "motion-safe:animate-[dock-bounce_700ms_ease-out]" : ""
    }`;
    const style = { width: BASE_SIZE, height: BASE_SIZE };

    if (href) {
        return (
            <a
                id={`dock-${id}`}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className={className}
                style={style}
            >
                {inner}
            </a>
        );
    }
    return (
        <button
            id={`dock-${id}`}
            type="button"
            aria-label={label}
            aria-pressed={running}
            onClick={onClick}
            className={className}
            style={style}
        >
            {inner}
        </button>
    );
}

DockItem.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    icon: PropTypes.elementType.isRequired,
    running: PropTypes.bool,
    bouncing: PropTypes.bool,
    onClick: PropTypes.func,
    href: PropTypes.string,
};

export default function Dock() {
    const { windows } = useWindowManager();
    const { openApp } = useWindowActions();
    const [bouncingId, setBouncingId] = useState(null);

    // Hidden apps (e.g. Preview) join the dock while running. Closed ones
    // stay mounted with `leaving` until their collapse animation finishes.
    const [transient, setTransient] = useState([]);

    useEffect(() => {
        setTransient((prev) => {
            const next = prev.map((t) =>
                windows[t.app.id]
                    ? { app: t.app, leaving: false }
                    : { ...t, leaving: true },
            );
            for (const app of APPS) {
                if (
                    app.hidden &&
                    windows[app.id] &&
                    !next.some((t) => t.app.id === app.id)
                ) {
                    next.push({ app, leaving: false });
                }
            }
            return next;
        });
    }, [windows]);

    function removeTransient(appId) {
        setTransient((prev) => prev.filter((t) => t.app.id !== appId));
    }

    function launch(appId) {
        if (!windows[appId]) {
            setBouncingId(appId);
            setTimeout(() => setBouncingId(null), 750);
        }
        openApp(appId);
    }

    return (
        <nav
            aria-label="Applications"
            className="fixed bottom-2 left-1/2 z-[600] -translate-x-1/2"
        >
            <div className="glass-dock flex items-end gap-2 rounded-[22px] border border-(--dock-border) p-2 shadow-[0_8px_32px_rgba(0,0,0,0.25)]">
                {VISIBLE_APPS.map((app) => (
                    <DockItem
                        key={app.id}
                        id={app.id}
                        label={app.title}
                        icon={app.icon}
                        running={Boolean(windows[app.id])}
                        bouncing={bouncingId === app.id}
                        onClick={() => launch(app.id)}
                    />
                ))}
                {transient.map(({ app, leaving }) => (
                    <div
                        key={app.id}
                        style={{ transformOrigin: "bottom center" }}
                        onAnimationEnd={(e) => {
                            if (leaving && e.target === e.currentTarget) {
                                removeTransient(app.id);
                            }
                        }}
                        className={
                            leaving
                                ? "overflow-hidden motion-safe:animate-[dock-item-out_220ms_var(--ease-mac-exit)_forwards]"
                                : "motion-safe:animate-[dock-item-in_280ms_var(--ease-mac-spring)]"
                        }
                    >
                        <DockItem
                            id={app.id}
                            label={app.title}
                            icon={app.icon}
                            running={!leaving}
                            onClick={() => openApp(app.id)}
                        />
                    </div>
                ))}
                <div
                    aria-hidden="true"
                    className="mx-1 h-10 w-px self-center bg-ink-3/40"
                />
                <DockItem
                    id="resume"
                    label="Resume (PDF)"
                    icon={ResumeIcon}
                    href="/resume.pdf"
                />
            </div>
        </nav>
    );
}
