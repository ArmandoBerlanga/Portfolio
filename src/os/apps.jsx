import { lazy } from "react";
import {
    AboutIcon,
    CertificationsIcon,
    ContactIcon,
    EducationIcon,
    ExperienceIcon,
    PreviewIcon,
    ProjectsIcon,
    TerminalIcon,
} from "./AppIcons";

export const APPS = [
    {
        id: "about",
        title: "About Me",
        hash: "#about-me",
        icon: AboutIcon,
        load: () => import("../sections/AboutMeSection"),
        Component: lazy(() => import("../sections/AboutMeSection")),
        defaultBounds: { x: 48, y: 56, w: 780, h: 580 },
        minSize: { w: 360, h: 280 },
        keywords: ["bio", "armando", "berlanga", "aberlang", "resume", "me"],
    },
    {
        id: "experience",
        title: "Experience",
        hash: "#experience",
        icon: ExperienceIcon,
        load: () => import("../sections/ExperienceSection"),
        Component: lazy(() => import("../sections/ExperienceSection")),
        defaultBounds: { x: 480, y: 110, w: 860, h: 580 },
        minSize: { w: 380, h: 300 },
        keywords: ["work", "jobs", "career", "slalom", "infosys", "kemet"],
    },
    {
        id: "education",
        title: "Education",
        hash: "#education",
        icon: EducationIcon,
        load: () => import("../sections/EducationSection"),
        Component: lazy(() => import("../sections/EducationSection")),
        defaultBounds: { x: 180, y: 110, w: 720, h: 480 },
        minSize: { w: 360, h: 280 },
        keywords: ["university", "udem", "degree", "school"],
    },
    {
        id: "certifications",
        title: "Certifications",
        hash: "#certifications",
        icon: CertificationsIcon,
        load: () => import("../sections/CertificationsSection"),
        Component: lazy(() => import("../sections/CertificationsSection")),
        defaultBounds: { x: 200, y: 80, w: 880, h: 600 },
        minSize: { w: 380, h: 300 },
        keywords: ["courses", "diplomas", "scrum", "linkedin"],
    },
    {
        id: "projects",
        title: "Projects",
        hash: "#projects",
        icon: ProjectsIcon,
        load: () => import("../sections/ProjectsSection"),
        Component: lazy(() => import("../sections/ProjectsSection")),
        defaultBounds: { x: 120, y: 70, w: 880, h: 600 },
        minSize: { w: 400, h: 320 },
        keywords: ["portfolio", "work", "code", "apps", "iq", "hft"],
    },
    {
        id: "contact",
        title: "Contact",
        hash: "#contact",
        icon: ContactIcon,
        load: () => import("../sections/ContactSection"),
        Component: lazy(() => import("../sections/ContactSection")),
        defaultBounds: { x: 240, y: 120, w: 640, h: 520 },
        minSize: { w: 360, h: 320 },
        keywords: ["email", "mail", "message", "hire", "reach"],
    },
    {
        id: "terminal",
        title: "Terminal",
        hash: "#terminal",
        icon: TerminalIcon,
        load: () => import("./apps/TerminalApp"),
        Component: lazy(() => import("./apps/TerminalApp")),
        defaultBounds: { x: 260, y: 140, w: 640, h: 420 },
        minSize: { w: 380, h: 260 },
        keywords: ["shell", "console", "cli", "command", "neofetch"],
    },
    {
        // Hidden: not pinned in the dock/spotlight — opened by clicking a
        // desktop file; appears in the dock while running, like macOS.
        id: "preview",
        title: "Preview",
        hidden: true,
        icon: PreviewIcon,
        load: () => import("./apps/PreviewApp"),
        Component: lazy(() => import("./apps/PreviewApp")),
        defaultBounds: { x: 200, y: 70, w: 760, h: 640 },
        minSize: { w: 360, h: 320 },
        keywords: [],
    },
];

// Apps surfaced in the dock, spotlight, and springboard (excludes Preview).
export const VISIBLE_APPS = APPS.filter((app) => !app.hidden);

// Warm every app chunk once the desktop is idle so windows open with
// their content already in memory.
export function preloadApps() {
    const warm = () => APPS.forEach((app) => app.load());
    if ("requestIdleCallback" in window) {
        window.requestIdleCallback(warm, { timeout: 3000 });
    } else {
        setTimeout(warm, 1500);
    }
}

export const APP_BY_ID = Object.fromEntries(APPS.map((a) => [a.id, a]));
export const APP_BY_HASH = Object.fromEntries(
    APPS.filter((a) => a.hash).map((a) => [a.hash, a]),
);
