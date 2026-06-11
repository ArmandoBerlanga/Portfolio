import { APPS } from "../apps";
import { projects } from "../../config/projects";
import { jobs } from "../../config/experience";
import { education } from "../../config/education";
import { certsTypes } from "../../config/certifications";

const NEOFETCH_ART = [
    "        ▄▄▄▄▄▄▄▄        ",
    "     ▄█████████████▄    ",
    "   ▄███████████████▄    ",
    "   ████  ▄▄▄▄  █████    ",
    "   ████  ████  █████    ",
    "   ████  ▀▀▀▀  █████    ",
    "   ▀███████████████▀    ",
    "     ▀█████████▀▀       ",
];

function neofetch() {
    const uptimeYears = new Date().getFullYear() - 2019;
    const info = [
        "aberlang@portfolio",
        "------------------",
        "OS:       PortfolioOS 5.0 (web)",
        "Host:     armandoberlanga.com",
        "Kernel:   React 19 + Vite",
        "Role:     Senior Software Engineer @ Slalom Build",
        `Uptime:   ${uptimeYears} years in software`,
        "Shell:    zsh (emulated)",
        "Stack:    .NET · Python · React · Vue · Azure · GCP",
        "Locale:   Monterrey, MX",
    ];
    return NEOFETCH_ART.map(
        (line, i) => `${line}  ${info[i] ?? ""}`,
    );
}

export const COMMANDS = {
    help: {
        desc: "List available commands",
        run: () => [
            "Available commands:",
            ...Object.entries(COMMANDS).map(
                ([name, c]) => `  ${name.padEnd(12)} ${c.desc}`,
            ),
        ],
    },
    about: {
        desc: "Who is aberlang",
        run: () => [
            "José Armando Berlanga Mendoza — Senior Software Engineer.",
            "Full-stack developer (.NET, Python, React, Vue) building",
            "scalable cloud solutions on Azure and GCP. Based in Monterrey, MX.",
            "Try 'open about' for the full story.",
        ],
    },
    whoami: {
        desc: "Print current user",
        run: () => ["aberlang"],
    },
    projects: {
        desc: "List projects; 'projects <n>' for detail",
        run: (args) => {
            const n = parseInt(args[0], 10);
            if (!Number.isNaN(n) && projects[n - 1]) {
                const p = projects[n - 1];
                return [
                    p.title,
                    `  ${p.institution} · ${p.date}`,
                    `  ${p.description}`,
                    `  Stack: ${p.skills.join(", ")}`,
                ];
            }
            return [
                "Projects (use 'projects <n>' for detail):",
                ...projects.map((p, i) => `  ${i + 1}. ${p.title}`),
            ];
        },
    },
    experience: {
        desc: "Show work history",
        run: () =>
            jobs.flatMap((j) => [
                `${j.title} — ${j.company}`,
                `  ${j.startDate} → ${j.endDate}`,
            ]),
    },
    education: {
        desc: "Show education",
        run: () =>
            education.map(
                (e) => `${e.institution} — ${e.degree} (${e.startDate} → ${e.endDate})`,
            ),
    },
    certs: {
        desc: "List certifications and courses",
        run: () =>
            Object.entries(certsTypes).flatMap(([group, items]) => [
                `${group}:`,
                ...items.map((c) => `  ${c.name} — ${c.issuer} (${c.date})`),
            ]),
    },
    contact: {
        desc: "Open the Contact app",
        run: (_, ctx) => {
            ctx.openApp("contact");
            return ["Opening Contact…"];
        },
    },
    open: {
        desc: "Open an app: open <name>",
        run: ([id], ctx) => {
            if (!id) {return ["usage: open <app>. Try 'ls' to list apps."];}
            const app = APPS.find((a) => a.id === id.toLowerCase());
            if (!app) {return [`open: no such app: ${id}`];}
            ctx.openApp(app.id);
            return [`Opening ${app.title}…`];
        },
    },
    ls: {
        desc: "List installed apps",
        run: () => [APPS.map((a) => a.id).join("  ")],
    },
    resume: {
        desc: "Download resume (PDF)",
        run: () => {
            window.open("/resume.pdf", "_blank", "noopener");
            return ["Opening resume.pdf…"];
        },
    },
    neofetch: {
        desc: "System info",
        run: () => neofetch(),
    },
    theme: {
        desc: "Set appearance: theme light|dark|system",
        run: ([mode], ctx) => {
            if (!["light", "dark", "system"].includes(mode)) {
                return ["usage: theme light|dark|system"];
            }
            ctx.setTheme(mode);
            return [`Appearance set to ${mode}.`];
        },
    },
    echo: {
        desc: "Print arguments",
        run: (args) => [args.join(" ")],
    },
    date: {
        desc: "Print current date",
        run: () => [new Date().toString()],
    },
    clear: {
        desc: "Clear the screen",
        run: (_, ctx) => {
            ctx.clear();
            return [];
        },
    },
    sudo: {
        desc: "Run as superuser",
        run: () => [
            "aberlang is not in the sudoers file.",
            "This incident will be reported.",
        ],
    },
    exit: {
        desc: "Close the terminal",
        run: (_, ctx) => {
            ctx.closeSelf();
            return [];
        },
    },
};

export function execute(line, ctx) {
    const [cmd, ...args] = line.trim().split(/\s+/);
    if (!cmd) {return [];}
    const command = COMMANDS[cmd.toLowerCase()];
    if (!command) {
        return [`zsh: command not found: ${cmd}. Try 'help'.`];
    }
    return command.run(args, ctx);
}

export function complete(partial) {
    const names = Object.keys(COMMANDS);
    const matches = names.filter((n) => n.startsWith(partial.toLowerCase()));
    return matches.length === 1 ? matches[0] : null;
}
