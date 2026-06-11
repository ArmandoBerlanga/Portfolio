import { useState } from "react";
import PropTypes from "prop-types";
import { certsTypes } from "../config/certifications";

const GROUPS = Object.keys(certsTypes); // certifications, diplomas, courses

const GROUP_META = {
    certifications: {
        hue: "from-[#f56fa1] to-[#c23a6f]",
        blurb: "Industry credentials, verified by their issuers.",
        glyph: (
            <>
                <circle cx="12" cy="9" r="5" />
                <path d="m9.5 13.5-2 7 4.5-2.5 4.5 2.5-2-7" />
            </>
        ),
    },
    diplomas: {
        hue: "from-[#8a7bf0] to-[#5b46c9]",
        blurb: "University formation programs at UDEM.",
        glyph: (
            <>
                <path d="M12 4 2 9l10 5 10-5-10-5Z" />
                <path d="M6 11.5V16c2 2 10 2 12 0v-4.5" />
            </>
        ),
    },
    courses: {
        hue: "from-[#4ecb71] to-[#1f9d4d]",
        blurb: "Continuous learning, course by course.",
        glyph: (
            <>
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V4H6.5A2.5 2.5 0 0 0 4 6.5v13Z" />
                <path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5" />
            </>
        ),
    },
};

function GroupIcon({ group, size = "size-7" }) {
    return (
        <span
            aria-hidden="true"
            className={`flex ${size} shrink-0 items-center justify-center rounded-md bg-gradient-to-br shadow-sm ${GROUP_META[group].hue}`}
        >
            <svg viewBox="0 0 24 24" className="size-[60%]" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {GROUP_META[group].glyph}
            </svg>
        </span>
    );
}

GroupIcon.propTypes = {
    group: PropTypes.string.isRequired,
    size: PropTypes.string,
};

function CertRow({ item }) {
    const hasLink = item.url && item.url !== "---";
    const date = new Date(item.date).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
    });

    const body = (
        <>
            <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold text-ink">
                    {item.name}
                </span>
                <span className="mt-0.5 block text-xs text-ink-3">
                    {item.issuer} · {date}
                </span>
                <span className="mt-1 block text-[13px] leading-relaxed text-ink-2">
                    {item.description}
                </span>
                <span className="mt-2 flex flex-wrap gap-1.5">
                    {item.aptitudes.map((apt) => (
                        <span
                            key={apt}
                            className="rounded-full border border-primary/20 bg-primary/10 px-2 py-px text-[11px] font-medium text-primary"
                        >
                            {apt}
                        </span>
                    ))}
                </span>
            </span>
            {hasLink && (
                <svg viewBox="0 0 24 24" className="mt-1 size-3.5 shrink-0 text-ink-3" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M7 17 17 7M9 7h8v8" />
                </svg>
            )}
        </>
    );

    const rowClass = "flex w-full items-start gap-3 px-4 py-3 text-left";

    return (
        <li>
            {hasLink ? (
                <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${rowClass} transition-colors duration-150 hover:bg-hover-fill`}
                >
                    {body}
                </a>
            ) : (
                <div className={rowClass}>{body}</div>
            )}
        </li>
    );
}

CertRow.propTypes = {
    item: PropTypes.object.isRequired,
};

export default function CertificationsSection() {
    const [group, setGroup] = useState(GROUPS[0]);
    const items = certsTypes[group];
    const total = GROUPS.reduce((n, g) => n + certsTypes[g].length, 0);

    return (
        <section
            id="certifications"
            aria-label="Professional certifications, diplomas, and courses"
            className="flex min-h-full flex-col @2xl:h-full @2xl:flex-row"
        >
            {/* Settings sidebar */}
            <nav
                aria-label="Certificate categories"
                className="shrink-0 border-b border-(--window-divider) bg-hover-fill/40 @2xl:w-56 @2xl:border-b-0 @2xl:border-r"
            >
                <div className="hidden items-center gap-2.5 px-4 pb-2 pt-4 @2xl:flex">
                    <img
                        src="/me.webp"
                        alt=""
                        width="36"
                        height="36"
                        className="size-9 rounded-full object-cover"
                    />
                    <div className="min-w-0 leading-tight">
                        <p className="truncate text-[13px] font-semibold text-ink">
                            Armando Berlanga
                        </p>
                        <p className="truncate text-[11px] text-ink-3">
                            {total} credentials
                        </p>
                    </div>
                </div>
                <ul className="flex gap-1 p-2 @2xl:flex-col">
                    {GROUPS.map((g) => (
                        <li key={g} className="flex-1 @2xl:flex-none">
                            <button
                                type="button"
                                onClick={() => setGroup(g)}
                                aria-current={group === g}
                                className={`flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-sm font-medium capitalize transition-colors duration-150 ${
                                    group === g
                                        ? "bg-accent text-white"
                                        : "text-ink hover:bg-hover-fill"
                                }`}
                            >
                                <GroupIcon group={g} />
                                <span className="truncate">{g}</span>
                                <span
                                    className={`ml-auto hidden text-[11px] tabular-nums @md:block ${
                                        group === g
                                            ? "text-white/75"
                                            : "text-ink-3"
                                    }`}
                                >
                                    {certsTypes[g].length}
                                </span>
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Detail pane — inset grouped list */}
            <div className="min-w-0 flex-1 p-4 @md:p-6 @2xl:overflow-y-auto">
                <header className="mb-4 flex items-center gap-3">
                    <GroupIcon group={group} size="size-10" />
                    <div>
                        <h2 className="text-lg font-bold capitalize tracking-tight text-ink">
                            {group}
                        </h2>
                        <p className="text-[13px] text-ink-3">
                            {GROUP_META[group].blurb}
                        </p>
                    </div>
                </header>

                <ul
                    key={group}
                    className="animate-fade-in divide-y divide-(--window-divider) overflow-hidden rounded-xl border border-(--window-divider) bg-surface shadow-sm"
                >
                    {items.map((item) => (
                        <CertRow key={item.name} item={item} />
                    ))}
                </ul>

                <p className="mt-3 px-1 text-xs text-ink-3">
                    {items.length} {group} · tap a row to verify with the issuer
                </p>
            </div>
        </section>
    );
}
