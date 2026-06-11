import { useState } from "react";
import PropTypes from "prop-types";
import { education } from "../config/education";
import { formatRange } from "../utils/dates";

// Per-school details that the shared config doesn't carry.
const SCHOOL_META = {
    "Universidad de Monterrey": {
        location: "San Pedro Garza García, MX",
        kind: "Bachelor's degree",
        stats: [
            { label: "GPA", value: "9.72" },
            { label: "Years", value: "4.5" },
            { label: "Honors", value: "Leaders Plus" },
        ],
    },
    "Universidad Francisco de Vitoria": {
        location: "Madrid, ES",
        kind: "International exchange",
        stats: [
            { label: "Semester", value: "Fall 2022" },
            { label: "Focus", value: "CS" },
            { label: "Mode", value: "Exchange" },
        ],
    },
};

function InfoRow({ label, value }) {
    return (
        <div className="flex items-center justify-between gap-4 px-4 py-2.5">
            <dt className="shrink-0 text-[13px] text-ink-3">{label}</dt>
            <dd className="truncate text-right text-[13px] font-medium text-ink">
                {value}
            </dd>
        </div>
    );
}

InfoRow.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
};

export default function EducationSection() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const edu = education[currentIndex];
    const meta = SCHOOL_META[edu.institution] ?? { stats: [] };

    return (
        <section
            id="education"
            aria-label="Educational background"
            className="flex min-h-full flex-col @2xl:h-full @2xl:flex-row"
        >
            {/* Sidebar — school list */}
            <div className="flex shrink-0 flex-col border-b border-(--window-divider) bg-hover-fill/40 @2xl:w-64 @2xl:border-b-0 @2xl:border-r">
                <header className="px-3 pb-1 pt-3">
                    <h2 className="px-1 text-sm font-bold text-ink">Education</h2>
                </header>
                <nav aria-label="Institutions" className="relative min-h-0 @2xl:flex-1 @2xl:overflow-y-auto">
                    <ul className="flex snap-x gap-1.5 overflow-x-auto p-2 @2xl:flex-col @2xl:gap-1 @2xl:overflow-visible">
                        {education.map((e, idx) => (
                            <li
                                key={e.institution}
                                className="w-52 shrink-0 snap-start @2xl:w-auto @2xl:shrink"
                            >
                                <button
                                    type="button"
                                    onClick={() => setCurrentIndex(idx)}
                                    aria-current={idx === currentIndex}
                                    className={`flex w-full items-center gap-2.5 rounded-lg px-2 py-1.5 text-left transition-colors duration-150 ${
                                        idx === currentIndex
                                            ? "bg-accent text-white"
                                            : "bg-hover-fill/60 text-ink hover:bg-hover-fill @2xl:bg-transparent"
                                    }`}
                                >
                                    <img
                                        src={e.image}
                                        alt=""
                                        loading="lazy"
                                        width="36"
                                        height="36"
                                        className="size-9 shrink-0 rounded-lg border border-(--window-divider) bg-white object-contain p-0.5 dark:bg-slate-900"
                                    />
                                    <span className="min-w-0">
                                        <span className="block truncate text-sm font-semibold">
                                            {e.institution}
                                        </span>
                                        <span
                                            className={`block truncate text-xs tabular-nums ${
                                                idx === currentIndex
                                                    ? "text-white/75"
                                                    : "text-ink-3"
                                            }`}
                                        >
                                            {formatRange(e.startDate, e.endDate)}
                                        </span>
                                    </span>
                                </button>
                            </li>
                        ))}
                    </ul>
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-(--window-bg) @2xl:hidden"
                    />
                </nav>
                <footer className="hidden border-t border-(--window-divider) px-3 py-1.5 text-center text-[11px] text-ink-3 @2xl:block">
                    {education.length} institutions
                </footer>
            </div>

            {/* Detail pane — school profile */}
            <article className="min-w-0 flex-1 @2xl:overflow-y-auto">
                <header className="border-b border-(--window-divider) p-5 @md:px-7">
                    <div className="flex items-start gap-4">
                        <img
                            src={edu.image}
                            alt={edu.institution}
                            width="96"
                            height="48"
                            className="h-12 w-24 shrink-0 rounded-xl border border-(--window-divider) bg-white object-contain p-1 shadow-md dark:bg-slate-900"
                        />
                        <div className="min-w-0 flex-1">
                            <h3 className="text-lg font-bold leading-snug tracking-tight text-ink @xl:text-xl">
                                {edu.institution}
                            </h3>
                            <p className="mt-0.5 text-[13px] text-ink-3">
                                {meta.kind} · {meta.location}
                            </p>
                            <p className="mt-1.5 text-xs text-ink-3 tabular-nums">
                                {formatRange(edu.startDate, edu.endDate)}
                            </p>
                        </div>
                    </div>
                </header>

                <div className="p-5 @md:px-7">
                    {/* Stats strip */}
                    <div className="grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-(--window-divider) bg-(--window-divider)">
                        {meta.stats.map((stat) => (
                            <div key={stat.label} className="bg-surface px-3 py-2.5 text-center">
                                <p className="truncate text-sm font-bold tabular-nums text-primary">
                                    {stat.value}
                                </p>
                                <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-wide text-ink-3">
                                    {stat.label}
                                </p>
                            </div>
                        ))}
                    </div>

                    <h4 className="mt-6 text-[11px] font-semibold uppercase tracking-wide text-ink-3">
                        About
                    </h4>
                    <p className="mt-2 text-[15px] leading-relaxed text-ink">
                        {edu.description}
                    </p>

                    <h4 className="mt-6 mb-2 text-[11px] font-semibold uppercase tracking-wide text-ink-3">
                        Information
                    </h4>
                    <dl className="divide-y divide-(--window-divider) overflow-hidden rounded-xl border border-(--window-divider) bg-hover-fill/40">
                        <InfoRow label="Degree" value={edu.degree} />
                        <InfoRow
                            label="Period"
                            value={formatRange(edu.startDate, edu.endDate)}
                        />
                        <InfoRow label="Location" value={meta.location ?? "—"} />
                        <InfoRow label="Program" value={meta.kind ?? "—"} />
                    </dl>
                </div>
            </article>
        </section>
    );
}
