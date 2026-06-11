import { useState } from "react";
import PropTypes from "prop-types";

const TABS = ["Overview", "Stack", "Highlights"];

const SPECS = [
    { label: "Role", value: "Senior Software Engineer @ Slalom Build" },
    { label: "Experience", value: `${new Date().getFullYear() - 2021}+ years building software` },
    { label: "Focus", value: "Full-stack · Cloud · AI-powered solutions" },
    { label: "Location", value: "Monterrey, N.L., México" },
    { label: "Languages", value: "Spanish · English (TOEFL 577)" },
    { label: "Education", value: "Computer Technologies Eng. — UDEM (GPA 9.72)" },
];

const STACK = [
    { name: ".NET", years: 5, icon: "stack/net.webp" },
    { name: "Azure", years: 5, icon: "stack/azure.webp" },
    { name: "Python", years: 4, icon: "stack/python.webp" },
    { name: "React", years: 4, icon: "stack/react.webp" },
    { name: "VueJS", years: 4, icon: "stack/vue.webp" },
    { name: "GCP", years: 3, icon: "stack/gcp.webp" },
];

const EXTRA_STACK = [
    { name: "GitHub", years: 5 },
    { name: "SQL Server", years: 5 },
    { name: "Quasar", years: 4 },
    { name: "Docker", years: 3 },
    { name: "Linux", years: 3 },
    { name: "Cloudflare", years: 3 },
    { name: "CI/CD", years: 2 },
    { name: "MongoDB", years: 1 },
];

const SOFT_SKILLS = [
    "Leadership",
    "Assertive",
    "Self-taught",
    "Curious",
    "Adaptable",
    "Teamwork",
    "Resilient",
    "Responsible",
    "Organized",
];

const MAX_YEARS = 5;

function Overview() {
    return (
        <div className="animate-fade-in">
            <p className="mx-auto max-w-xl text-center text-[15px] leading-relaxed text-ink-2">
                Extensive <span className="text-primary font-semibold">full-stack</span> development
                experience and a <span className="text-primary font-semibold">resilient</span>,{" "}
                <span className="text-primary font-semibold">adaptable</span> mindset — I integrate
                seamlessly into large-scale Scrum teams to drive impactful results.
            </p>
            <dl className="mx-auto mt-5 max-w-md divide-y divide-(--window-divider) overflow-hidden rounded-xl border border-(--window-divider) bg-hover-fill/40">
                {SPECS.map((spec) => (
                    <div key={spec.label} className="flex items-center justify-between gap-4 px-4 py-2.5">
                        <dt className="shrink-0 text-[13px] text-ink-3">{spec.label}</dt>
                        <dd className="text-right text-[13px] font-medium text-ink">
                            {spec.value}
                        </dd>
                    </div>
                ))}
            </dl>
        </div>
    );
}

function YearsBar({ years }) {
    return (
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-hover-fill">
            <div
                className="h-full rounded-full bg-gradient-to-r from-accent-soft to-accent transition-[width] duration-500 ease-[var(--ease-mac)]"
                style={{ width: `${(years / MAX_YEARS) * 100}%` }}
            />
        </div>
    );
}

YearsBar.propTypes = {
    years: PropTypes.number.isRequired,
};

function Stack() {
    return (
        <div className="animate-fade-in mx-auto max-w-md">
            <ul className="divide-y divide-(--window-divider) overflow-hidden rounded-xl border border-(--window-divider) bg-hover-fill/40">
                {STACK.map((tech) => (
                    <li key={tech.name} className="flex items-center gap-3 px-4 py-2.5">
                        <img
                            src={tech.icon}
                            alt=""
                            width="28"
                            height="28"
                            className="size-7 shrink-0 rounded-lg bg-white/80 object-cover p-0.5 shadow-sm dark:bg-slate-800/80"
                        />
                        <span className="w-24 shrink-0 text-[13px] font-semibold text-ink">
                            {tech.name}
                        </span>
                        <YearsBar years={tech.years} />
                        <span className="w-8 shrink-0 text-right text-xs tabular-nums text-ink-3">
                            {tech.years} yr
                        </span>
                    </li>
                ))}
            </ul>
            <div className="mt-3 flex flex-wrap justify-center gap-1.5">
                {EXTRA_STACK.map((tech) => (
                    <span
                        key={tech.name}
                        className="rounded-full border border-primary/20 bg-primary/10 px-2.5 py-0.5 text-[11px] font-medium text-primary"
                    >
                        {tech.name} · {tech.years} yr
                    </span>
                ))}
            </div>
        </div>
    );
}

function Highlights() {
    return (
        <div className="animate-fade-in mx-auto max-w-md space-y-4">
            <div className="overflow-hidden rounded-xl border border-(--window-divider) bg-hover-fill/40 px-4 py-3">
                <h3 className="text-[11px] font-semibold uppercase tracking-wide text-ink-3">
                    Leadership
                </h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-ink">
                    Drivers of Change &amp; Leaders Plus Honors Program — developed
                    social projects aligned with the UN Sustainable Development
                    Goals (2019 — 2023).
                </p>
            </div>
            <div className="overflow-hidden rounded-xl border border-(--window-divider) bg-hover-fill/40 px-4 py-3">
                <h3 className="text-[11px] font-semibold uppercase tracking-wide text-ink-3">
                    Soft skills
                </h3>
                <div className="mt-2 flex flex-wrap gap-1.5">
                    {SOFT_SKILLS.map((skill) => (
                        <span
                            key={skill}
                            className="rounded-full border border-primary/20 bg-primary/10 px-2.5 py-0.5 text-[11px] font-medium text-primary"
                        >
                            {skill}
                        </span>
                    ))}
                </div>
            </div>
            <div className="overflow-hidden rounded-xl border border-(--window-divider) bg-hover-fill/40 px-4 py-3">
                <h3 className="text-[11px] font-semibold uppercase tracking-wide text-ink-3">
                    Currently
                </h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-ink">
                    Shipping AI-powered cloud solutions for automotive and energy
                    clients — Python on GCP, .NET 8 with Blazor on Azure — and
                    accelerating delivery with AI tooling.
                </p>
            </div>
        </div>
    );
}

export default function AboutMeSection() {
    const [tab, setTab] = useState(TABS[0]);

    return (
        <section
            id="about-me"
            aria-label="About me and introduction"
            className="flex min-h-full flex-col items-center p-6 @md:p-8"
        >
            <img
                src="me.webp"
                alt="Armando Berlanga"
                width="320"
                height="320"
                className="size-24 rounded-full border-2 border-(--window-divider) object-cover shadow-lg @xl:size-28"
            />
            <h1 className="mt-3 text-2xl font-bold tracking-tight text-ink @xl:text-3xl">
                Armando Berlanga
            </h1>
            <h2 className="mt-0.5 text-[15px] font-medium text-ink-2">
                Senior Software Engineer
            </h2>

            {/* Segmented control */}
            <div
                role="tablist"
                aria-label="About sections"
                className="mt-4 flex w-full max-w-xs rounded-lg bg-hover-fill p-0.5"
            >
                {TABS.map((t) => (
                    <button
                        key={t}
                        type="button"
                        role="tab"
                        aria-selected={tab === t}
                        onClick={() => setTab(t)}
                        className={`flex-1 rounded-md px-3 py-1.5 text-[13px] font-semibold transition-all duration-200 ${
                            tab === t
                                ? "bg-surface text-ink shadow-sm"
                                : "text-ink-2 hover:text-ink"
                        }`}
                    >
                        {t}
                    </button>
                ))}
            </div>

            <div className="mt-5 w-full" key={tab}>
                {tab === "Overview" && <Overview />}
                {tab === "Stack" && <Stack />}
                {tab === "Highlights" && <Highlights />}
            </div>

            <div className="mt-6 flex gap-3">
                <a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg bg-primary px-6 py-2.5 text-[15px] font-semibold text-white shadow-md transition-all duration-200 hover:bg-primary/90 active:scale-95"
                >
                    Resume
                </a>
                <a
                    href="https://github.com/ArmandoBerlanga"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg border border-(--window-divider) bg-hover-fill px-5 py-2.5 text-sm font-semibold text-ink transition-all duration-200 hover:bg-primary/10 active:scale-95"
                >
                    GitHub
                </a>
                <a
                    href="https://www.linkedin.com/in/armandoberlanga"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg border border-(--window-divider) bg-hover-fill px-5 py-2.5 text-sm font-semibold text-ink transition-all duration-200 hover:bg-primary/10 active:scale-95"
                >
                    LinkedIn
                </a>
            </div>
        </section>
    );
}
