import { VISIBLE_APPS } from "./apps";
import { projects } from "../config/projects";
import { jobs } from "../config/experience";
import { education } from "../config/education";
import { certsTypes } from "../config/certifications";
import { formatRange } from "../utils/dates";

const entries = [
    ...VISIBLE_APPS.map((app) => ({
        type: "App",
        title: app.title,
        subtitle: "Application",
        keywords: app.keywords,
        appId: app.id,
    })),
    ...projects.map((project, i) => ({
        type: "Project",
        title: project.title,
        subtitle: project.institution,
        keywords: project.skills,
        appId: "projects",
        anchorId: `project-${i}`,
    })),
    ...jobs.map((job) => ({
        type: "Job",
        title: `${job.title} @ ${job.company}`,
        subtitle: formatRange(job.startDate, job.endDate),
        keywords: job.technologies,
        appId: "experience",
    })),
    ...education.map((entry) => ({
        type: "Education",
        title: entry.institution,
        subtitle: entry.degree,
        keywords: [entry.degree],
        appId: "education",
    })),
    ...Object.values(certsTypes)
        .flat()
        .map((cert) => ({
            type: "Certificate",
            title: cert.name,
            subtitle: cert.issuer,
            keywords: cert.aptitudes,
            appId: "certifications",
        })),
];

export default function search(query) {
    const q = query.trim().toLowerCase();
    if (!q) {return [];}
    return entries
        .map((entry) => {
            const title = entry.title.toLowerCase();
            let score = 0;
            if (title.startsWith(q)) {score = 3;}
            else if (title.includes(q)) {score = 2;}
            else if (
                entry.keywords?.some((k) => k.toLowerCase().includes(q)) ||
                entry.subtitle?.toLowerCase().includes(q)
            ) {
                score = 1;
            }
            return { entry, score };
        })
        .filter((r) => r.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 8)
        .map((r) => r.entry);
}
