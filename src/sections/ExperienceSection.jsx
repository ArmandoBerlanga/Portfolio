import { useState } from "react";
import PropTypes from "prop-types";
import { jobs } from "../config/experience";
import { formatYM, formatRange } from "../utils/dates";

const AVATAR_HUES = [
    "from-[#6fb5f7] to-[#2e5cc5]",
    "from-[#8a7bf0] to-[#5b46c9]",
    "from-[#f7b955] to-[#e8842c]",
    "from-[#4ecb71] to-[#1f9d4d]",
];

function companyInitials(company) {
    return company
        .split(/\s+/)
        .slice(0, 2)
        .map((w) => w[0])
        .join("")
        .toUpperCase();
}

function CompanyAvatar({ company, index, size = "size-10 text-xs" }) {
    return (
        <span
            aria-hidden="true"
            className={`${size} flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br font-bold text-white shadow-sm ${AVATAR_HUES[index % AVATAR_HUES.length]}`}
        >
            {companyInitials(company)}
        </span>
    );
}

CompanyAvatar.propTypes = {
    company: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    size: PropTypes.string,
};

function MessageRow({ job, selected, onSelect }) {
    const isCurrent = job.endDate === "Present";
    return (
        <li className="border-b border-(--window-divider)">
            <button
                type="button"
                onClick={onSelect}
                aria-current={selected}
                className={`relative flex w-full flex-col gap-0.5 py-2.5 pl-7 pr-3 text-left transition-colors duration-150 ${
                    selected ? "bg-accent text-white" : "hover:bg-hover-fill"
                }`}
            >
                {/* unread dot for the current position */}
                {isCurrent && (
                    <span
                        title="Current position"
                        className={`absolute left-2.5 top-[1.05rem] size-2 rounded-full ${
                            selected ? "bg-white" : "bg-accent"
                        }`}
                    />
                )}
                <span className="flex items-baseline justify-between gap-2">
                    <span
                        className={`truncate text-sm font-bold ${
                            selected ? "text-white" : "text-ink"
                        }`}
                    >
                        {job.company}
                    </span>
                    <span
                        className={`shrink-0 text-xs tabular-nums ${
                            selected ? "text-white/75" : "text-ink-3"
                        }`}
                    >
                        {formatYM(job.startDate)}
                    </span>
                </span>
                <span
                    className={`truncate text-[13px] font-medium ${
                        selected ? "text-white/90" : "text-ink-2"
                    }`}
                >
                    {job.title}
                </span>
                <span
                    className={`line-clamp-2 text-xs leading-snug ${
                        selected ? "text-white/70" : "text-ink-3"
                    }`}
                >
                    {job.description}
                </span>
            </button>
        </li>
    );
}

MessageRow.propTypes = {
    job: PropTypes.object.isRequired,
    selected: PropTypes.bool.isRequired,
    onSelect: PropTypes.func.isRequired,
};

// Extra terms worth emphasizing beyond each job's technology list.
const EMPHASIS_TERMS = [
    "full-stack",
    "microservices",
    "RESTful APIs",
    "AI-powered",
    "Domain-Driven Design",
    "SOLID",
];

function escapeRegex(term) {
    return term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Wraps known technologies / key phrases in <strong> for scannability.
function Emphasized({ text, terms }) {
    const sorted = [...new Set([...terms, ...EMPHASIS_TERMS])].sort(
        (a, b) => b.length - a.length,
    );
    const pattern = new RegExp(
        `(${sorted.map(escapeRegex).join("|")})`,
        "gi",
    );
    return text.split(pattern).map((part, i) =>
        i % 2 === 1 ? (
            <strong key={i} className="font-semibold text-ink">
                {part}
            </strong>
        ) : (
            part
        ),
    );
}

Emphasized.propTypes = {
    text: PropTypes.string.isRequired,
    terms: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const VISIBLE_BULLETS = 2;

function MessageBody({ job }) {
    const [expanded, setExpanded] = useState(false);
    const sentences = job.description
        .split(/(?<=\.)\s+/)
        .filter((s) => s.trim());
    const [lead, ...rest] = sentences;
    const hasMore = rest.length > VISIBLE_BULLETS;
    const bullets = expanded ? rest : rest.slice(0, VISIBLE_BULLETS);

    return (
        <>
            <p className="text-[15px] leading-relaxed text-ink-2 @xl:text-base">
                <Emphasized text={lead} terms={job.technologies} />
            </p>

            {rest.length > 0 && (
                <ul className="mt-4 space-y-2.5">
                    {bullets.map((sentence) => (
                        <li
                            key={sentence.slice(0, 32)}
                            className="flex gap-2.5 text-[15px] leading-relaxed text-ink-2 @xl:text-base"
                        >
                            <span
                                aria-hidden="true"
                                className="mt-[0.55em] size-1.5 shrink-0 rounded-full bg-primary/60"
                            />
                            <span>
                                <Emphasized
                                    text={sentence}
                                    terms={job.technologies}
                                />
                            </span>
                        </li>
                    ))}
                </ul>
            )}

            {hasMore && (
                <button
                    type="button"
                    onClick={() => setExpanded((e) => !e)}
                    aria-expanded={expanded}
                    className="mt-3 text-[13px] font-semibold text-primary transition-opacity hover:opacity-75"
                >
                    {expanded
                        ? "Show less"
                        : `Read more (${rest.length - VISIBLE_BULLETS} more)`}
                </button>
            )}
        </>
    );
}

MessageBody.propTypes = {
    job: PropTypes.object.isRequired,
};

export default function ExperienceSection() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const job = jobs[currentIndex];
    const domain = job.company.split(/\s+/)[0].toLowerCase();

    return (
        <section
            id="experience"
            aria-label="Professional work experience"
            className="flex min-h-full flex-col @2xl:h-full @2xl:flex-row"
        >
            {/* Message list pane */}
            <div className="flex shrink-0 flex-col border-b border-(--window-divider) @2xl:w-72 @2xl:border-b-0 @2xl:border-r">
                <header className="flex items-center justify-between px-3 py-2.5">
                    <h2 className="text-sm font-bold text-ink">Career</h2>
                    <span className="rounded-full bg-hover-fill px-2 py-0.5 text-[11px] font-semibold tabular-nums text-ink-2">
                        {jobs.length}
                    </span>
                </header>
                <nav aria-label="Positions" className="min-h-0 @2xl:flex-1 @2xl:overflow-y-auto">
                    <ul className="border-t border-(--window-divider)">
                        {jobs.map((j, idx) => (
                            <MessageRow
                                key={j.company}
                                job={j}
                                selected={idx === currentIndex}
                                onSelect={() => setCurrentIndex(idx)}
                            />
                        ))}
                    </ul>
                </nav>
                <footer className="hidden border-t border-(--window-divider) px-3 py-1.5 text-center text-[11px] text-ink-3 @2xl:block">
                    {jobs.length} positions · {new Date().getFullYear() - 2021}+ years
                </footer>
            </div>

            {/* Message view */}
            <article className="min-w-0 flex-1 @2xl:overflow-y-auto">
                {/* Header block, Mail-style */}
                <header className="border-b border-(--window-divider) p-5 @md:px-7">
                    <h3 className="text-lg font-bold tracking-tight text-ink @xl:text-xl">
                        {job.title}
                    </h3>
                    <div className="mt-3 flex items-start gap-3">
                        <CompanyAvatar company={job.company} index={currentIndex} />
                        <div className="min-w-0 flex-1 text-[13px] leading-relaxed">
                            <p className="truncate">
                                <span className="font-semibold text-ink">
                                    {job.company}
                                </span>{" "}
                                <span className="text-ink-3">
                                    &lt;careers@{domain}.com&gt;
                                </span>
                            </p>
                            <p className="text-ink-3">
                                To:{" "}
                                <span className="text-primary">aberlang</span>
                            </p>
                        </div>
                        <div className="shrink-0 text-right text-xs leading-relaxed text-ink-3">
                            <p className="tabular-nums">
                                {formatRange(job.startDate, job.endDate)}
                            </p>
                            <p>
                                {job.type} · {job.location}
                            </p>
                        </div>
                    </div>
                </header>

                <div className="p-5 @md:px-7">
                    <MessageBody key={job.company} job={job} />

                    <h4 className="mt-6 text-[11px] font-semibold uppercase tracking-wide text-ink-3">
                        Technologies — {job.technologies.length}
                    </h4>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                        {job.technologies.map((tech) => (
                            <span
                                key={tech}
                                className="rounded-full border border-primary/20 bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            </article>
        </section>
    );
}
