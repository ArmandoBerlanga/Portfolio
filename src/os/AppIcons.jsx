import PropTypes from "prop-types";

/*
 * One squircle icon system: rx 22.37% corner ratio, per-app gradient,
 * top-edge highlight, white glyph. All inline SVG — zero asset requests.
 */

function Squircle({ id, from, to, children, highlight = true, ...props }) {
    return (
        <svg viewBox="0 0 100 100" aria-hidden="true" {...props}>
            <defs>
                <linearGradient id={`g-${id}`} x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor={from} />
                    <stop offset="100%" stopColor={to} />
                </linearGradient>
                <linearGradient id={`h-${id}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgba(255,255,255,0.35)" />
                    <stop offset="40%" stopColor="rgba(255,255,255,0)" />
                </linearGradient>
            </defs>
            <rect width="100" height="100" rx="22.37" fill={`url(#g-${id})`} />
            {highlight && (
                <rect width="100" height="100" rx="22.37" fill={`url(#h-${id})`} />
            )}
            {children}
        </svg>
    );
}

Squircle.propTypes = {
    id: PropTypes.string.isRequired,
    from: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    children: PropTypes.node,
    highlight: PropTypes.bool,
};

const glyph = {
    fill: "none",
    stroke: "#fff",
    strokeWidth: 5,
    strokeLinecap: "round",
    strokeLinejoin: "round",
};

export function AboutIcon(props) {
    return (
        <Squircle id="about" from="#6fb5f7" to="#2e5cc5" {...props}>
            {/* Two-tone face split, Finder-flavored */}
            <path
                d="M50 16 V84"
                stroke="rgba(255,255,255,0.45)"
                strokeWidth="3"
            />
            <circle cx="36" cy="42" r="3.5" fill="#fff" stroke="none" />
            <circle cx="64" cy="42" r="3.5" fill="#fff" stroke="none" />
            <path d="M32 60 Q50 74 68 60" {...glyph} />
        </Squircle>
    );
}

export function ProjectsIcon(props) {
    return (
        <Squircle id="projects" from="#8a7bf0" to="#5b46c9" {...props}>
            <path d="M30 50 L42 38 M30 50 L42 62" {...glyph} />
            <path d="M70 50 L58 38 M70 50 L58 62" {...glyph} />
        </Squircle>
    );
}

export function ExperienceIcon(props) {
    return (
        <Squircle id="experience" from="#f7b955" to="#e8842c" {...props}>
            <rect x="26" y="38" width="48" height="32" rx="6" {...glyph} />
            <path d="M40 38 V32 a4 4 0 0 1 4-4 h12 a4 4 0 0 1 4 4 v6" {...glyph} />
            <path d="M26 52 H74" {...glyph} strokeWidth="3.5" />
        </Squircle>
    );
}

export function EducationIcon(props) {
    return (
        <Squircle id="education" from="#4ecb71" to="#1f9d4d" {...props}>
            <path d="M50 30 L78 42 L50 54 L22 42 Z" {...glyph} />
            <path d="M36 48 V62 Q50 70 64 62 V48" {...glyph} />
            <path d="M78 42 V58" {...glyph} strokeWidth="3.5" />
        </Squircle>
    );
}

export function CertificationsIcon(props) {
    return (
        <Squircle id="certs" from="#f56fa1" to="#c23a6f" {...props}>
            <circle cx="50" cy="44" r="16" {...glyph} />
            <path d="M44 44 L49 49 L58 39" {...glyph} strokeWidth="4" />
            <path d="M42 57 L38 74 L50 67 L62 74 L58 57" {...glyph} strokeWidth="4" />
        </Squircle>
    );
}

export function ContactIcon(props) {
    return (
        <Squircle id="contact" from="#74c6f9" to="#1f7ae0" {...props}>
            <rect x="24" y="34" width="52" height="36" rx="6" {...glyph} />
            <path d="M26 38 L50 56 L74 38" {...glyph} />
        </Squircle>
    );
}

export function TerminalIcon(props) {
    return (
        <Squircle
            id="terminal"
            from="#3a3f4a"
            to="#16181e"
            highlight={false}
            {...props}
        >
            <path d="M28 36 L40 48 L28 60" {...glyph} />
            <path d="M48 62 H68" {...glyph} />
        </Squircle>
    );
}

export function ResumeIcon(props) {
    return (
        <Squircle id="resume" from="#ffffff" to="#e8e8ec" {...props}>
            <path
                d="M36 24 H58 L68 34 V76 H36 Z"
                fill="none"
                stroke="#ff5f57"
                strokeWidth="5"
                strokeLinejoin="round"
            />
            <path d="M58 24 V34 H68" fill="none" stroke="#ff5f57" strokeWidth="5" strokeLinejoin="round" />
            <text
                x="52"
                y="62"
                textAnchor="middle"
                fontSize="17"
                fontWeight="700"
                fill="#ff5f57"
                fontFamily="inherit"
            >
                PDF
            </text>
        </Squircle>
    );
}

export function PreviewIcon(props) {
    return (
        <Squircle id="preview" from="#9bb7e8" to="#4a6fb8" {...props}>
            {/* photo + loupe, Preview-style */}
            <rect x="24" y="26" width="52" height="40" rx="5" {...glyph} strokeWidth="4.5" />
            <path d="M24 58 38 46 50 56 60 48 76 60" {...glyph} strokeWidth="4" />
            <circle cx="38" cy="37" r="3.5" fill="#fff" stroke="none" />
            <circle cx="62" cy="66" r="11" {...glyph} strokeWidth="4.5" fill="rgba(255,255,255,0.15)" />
            <path d="M70 74 78 82" {...glyph} strokeWidth="5" />
        </Squircle>
    );
}

const EXT_COLOR = {
    pdf: "#ff5f57",
    image: "#28c840",
    text: "#5b86e5",
    binary: "#8a8f98",
};

// A paper-sheet document icon with a folded corner and a colored extension
// tab — kind drives the accent so any file type reads at a glance.
export function FileIcon({ name = "file", kind = "binary", ...props }) {
    const ext = name.includes(".") ? name.split(".").pop().toUpperCase() : "";
    const accent = EXT_COLOR[kind] ?? EXT_COLOR.binary;
    return (
        <svg viewBox="0 0 100 100" aria-hidden="true" {...props}>
            <defs>
                <linearGradient id={`file-${kind}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="100%" stopColor="#e8e8ec" />
                </linearGradient>
            </defs>
            {/* sheet */}
            <path
                d="M24 8 H62 L80 26 V88 a4 4 0 0 1 -4 4 H24 a4 4 0 0 1 -4 -4 V12 a4 4 0 0 1 4 -4 Z"
                fill={`url(#file-${kind})`}
                stroke="rgba(0,0,0,0.12)"
                strokeWidth="1.5"
            />
            {/* folded corner */}
            <path d="M62 8 V26 H80 Z" fill="#cfd0d6" />
            {/* extension tab */}
            <rect x="20" y="52" width="46" height="20" rx="4" fill={accent} />
            <text
                x="43"
                y="67"
                textAnchor="middle"
                fontSize="13"
                fontWeight="700"
                fill="#fff"
                fontFamily="inherit"
            >
                {ext}
            </text>
        </svg>
    );
}

FileIcon.propTypes = {
    name: PropTypes.string,
    kind: PropTypes.string,
};

export function MonogramIcon(props) {
    return (
        <Squircle id="monogram" from="#6fb5f7" to="#2e5cc5" {...props}>
            <text
                x="50"
                y="64"
                textAnchor="middle"
                fontSize="40"
                fontWeight="700"
                fill="#fff"
                fontFamily="inherit"
            >
                AB
            </text>
        </Squircle>
    );
}
