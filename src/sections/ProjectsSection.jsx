import { useState } from "react";
import PropTypes from "prop-types";
import { projects } from "../config/projects";
import { Gallery } from "../components/Gallery";

function matches(project, query) {
    const q = query.toLowerCase();
    return (
        project.title.toLowerCase().includes(q) ||
        project.institution.toLowerCase().includes(q) ||
        project.skills.some((s) => s.toLowerCase().includes(q))
    );
}

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

export default function ProjectsSection() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [query, setQuery] = useState("");
    const visible = projects
        .map((p, i) => [p, i])
        .filter(([p]) => !query.trim() || matches(p, query.trim()));
    const project = projects[currentIndex];

    return (
        <section
            id="projects"
            aria-label="Portfolio projects"
            className="flex min-h-full flex-col @2xl:h-full @2xl:flex-row"
        >
            {/* Sidebar — project list */}
            <div className="flex shrink-0 flex-col border-b border-(--window-divider) bg-hover-fill/40 @2xl:w-64 @2xl:border-b-0 @2xl:border-r">
                <header className="px-3 pb-2 pt-3">
                    <h2 className="px-1 text-sm font-bold text-ink">Projects</h2>
                    <div className="mt-2 flex h-7 items-center gap-2 rounded-lg bg-hover-fill px-2.5">
                        <svg viewBox="0 0 24 24" className="size-3.5 shrink-0 text-ink-3" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                            <circle cx="11" cy="11" r="7" />
                            <path d="m20 20-3.5-3.5" />
                        </svg>
                        <input
                            type="search"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search"
                            aria-label="Search projects"
                            className="w-full bg-transparent text-[13px] text-ink outline-none placeholder:text-ink-3"
                        />
                    </div>
                </header>
                <nav aria-label="Projects" className="relative min-h-0 @2xl:flex-1 @2xl:overflow-y-auto">
                    <ul className="flex snap-x gap-1.5 overflow-x-auto p-2 @2xl:flex-col @2xl:gap-1 @2xl:overflow-visible">
                        {visible.map(([p, idx]) => (
                            <li
                                key={p.title}
                                id={`project-${idx}`}
                                className="w-44 shrink-0 snap-start @2xl:w-auto @2xl:shrink"
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
                                        src={p.images[0]}
                                        alt=""
                                        loading="lazy"
                                        width="36"
                                        height="36"
                                        className="size-9 shrink-0 rounded-lg border border-(--window-divider) object-cover"
                                    />
                                    <span className="min-w-0">
                                        <span className="block truncate text-sm font-semibold">
                                            {p.title}
                                        </span>
                                        <span
                                            className={`block truncate text-xs ${
                                                idx === currentIndex
                                                    ? "text-white/75"
                                                    : "text-ink-3"
                                            }`}
                                        >
                                            {p.institution}
                                        </span>
                                    </span>
                                </button>
                            </li>
                        ))}
                        {visible.length === 0 && (
                            <li className="px-3 py-6 text-center text-xs text-ink-3">
                                No projects match “{query}”
                            </li>
                        )}
                    </ul>
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-(--window-bg) @2xl:hidden"
                    />
                </nav>
                <footer className="hidden border-t border-(--window-divider) px-3 py-1.5 text-center text-[11px] text-ink-3 @2xl:block">
                    {projects.length} projects
                </footer>
            </div>

            {/* Detail pane — product page */}
            <article className="min-w-0 flex-1 @2xl:overflow-y-auto">
                <header className="border-b border-(--window-divider) p-5 @md:px-7">
                    <div className="flex items-start gap-4">
                        <img
                            src={project.images[0]}
                            alt=""
                            width="72"
                            height="72"
                            className="size-18 shrink-0 rounded-2xl border border-(--window-divider) object-cover shadow-md"
                        />
                        <div className="min-w-0 flex-1">
                            <h3 className="text-lg font-bold leading-snug tracking-tight text-ink @xl:text-xl">
                                {project.title}
                            </h3>
                            <p className="mt-0.5 text-[13px] text-ink-3">
                                {project.institution}
                            </p>
                            <p className="mt-1.5 text-xs text-ink-3">
                                {project.date} · {project.skills.length}{" "}
                                technologies
                            </p>
                        </div>
                    </div>
                </header>

                <div className="p-5 @md:px-7">
                    <h4 className="mb-3 text-[11px] font-semibold uppercase tracking-wide text-ink-3">
                        Preview
                    </h4>
                    <Gallery images={project.images} alt={project.title} />

                    <h4 className="mt-6 text-[11px] font-semibold uppercase tracking-wide text-ink-3">
                        About
                    </h4>
                    <p className="mt-2 text-[15px] leading-relaxed text-ink">
                        {project.description}
                    </p>

                    <h4 className="mt-6 mb-2 text-[11px] font-semibold uppercase tracking-wide text-ink-3">
                        Information
                    </h4>
                    <dl className="divide-y divide-(--window-divider) overflow-hidden rounded-xl border border-(--window-divider) bg-hover-fill/40">
                        <InfoRow label="Client" value={project.institution} />
                        <InfoRow label="Timeline" value={project.date} />
                        <InfoRow
                            label="Screens"
                            value={`${project.images.length} previews`}
                        />
                        <div className="px-4 py-2.5">
                            <dt className="text-[13px] text-ink-3">Built with</dt>
                            <dd className="mt-2 flex flex-wrap gap-1.5">
                                {project.skills.map((skill) => (
                                    <span
                                        key={skill}
                                        className="rounded-full border border-primary/20 bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </dd>
                        </div>
                    </dl>
                </div>
            </article>
        </section>
    );
}
