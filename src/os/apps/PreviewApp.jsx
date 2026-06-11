import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { usePreview } from "../PreviewContext";
import { fileKind } from "../documents";

const ZOOM_STEPS = [0.5, 0.67, 0.8, 1, 1.25, 1.5, 2, 3];
const DEFAULT_ZOOM_INDEX = 3; // 100%

function ToolbarButton({ label, onClick, disabled, children }) {
    return (
        <button
            type="button"
            aria-label={label}
            title={label}
            onClick={onClick}
            disabled={disabled}
            className="flex size-7 items-center justify-center rounded-md text-ink transition-colors duration-150 hover:bg-hover-fill disabled:opacity-30 disabled:hover:bg-transparent"
        >
            {children}
        </button>
    );
}

ToolbarButton.propTypes = {
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    children: PropTypes.node.isRequired,
};

function TextDocument({ src }) {
    const [content, setContent] = useState(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        let alive = true;
        fetch(src)
            .then((r) => {
                if (!r.ok) {throw new Error(String(r.status));}
                return r.text();
            })
            .then((t) => alive && setContent(t))
            .catch(() => alive && setError(true));
        return () => {
            alive = false;
        };
    }, [src]);

    if (error) {
        return <p className="p-6 text-sm text-ink-3">Could not load file.</p>;
    }
    if (content === null) {
        return <p className="p-6 text-sm text-ink-3">Loading…</p>;
    }
    return (
        <pre className="whitespace-pre-wrap break-words rounded-lg bg-surface p-6 font-mono text-[13px] leading-relaxed text-ink shadow-sm">
            {content}
        </pre>
    );
}

TextDocument.propTypes = { src: PropTypes.string.isRequired };

function DocumentBody({ doc, kind }) {
    if (kind === "pdf") {
        return (
            <iframe
                title={doc.name}
                src={`${doc.src}#toolbar=0&navpanes=0&view=FitH`}
                className="h-[1000px] w-[800px] max-w-full rounded-lg border border-(--window-divider) bg-white shadow-md"
            />
        );
    }
    if (kind === "image") {
        return (
            <img
                src={doc.src}
                alt={doc.name}
                className="max-w-full rounded-lg border border-(--window-divider) shadow-md"
            />
        );
    }
    if (kind === "text") {
        return (
            <div className="w-[760px] max-w-full">
                <TextDocument src={doc.src} />
            </div>
        );
    }
    return (
        <div className="rounded-lg border border-(--window-divider) bg-surface p-8 text-center text-sm text-ink-2 shadow-sm">
            No preview available for this file type.
            <br />
            Use Download to open it.
        </div>
    );
}

DocumentBody.propTypes = {
    doc: PropTypes.object.isRequired,
    kind: PropTypes.string.isRequired,
};

export default function PreviewApp() {
    const { doc } = usePreview();
    const [zoomIndex, setZoomIndex] = useState(DEFAULT_ZOOM_INDEX);

    // Reset zoom whenever a different document is opened.
    useEffect(() => {
        setZoomIndex(DEFAULT_ZOOM_INDEX);
    }, [doc?.src]);

    if (!doc) {
        return (
            <div className="flex h-full items-center justify-center p-8 text-sm text-ink-3">
                No document selected.
            </div>
        );
    }

    const kind = fileKind(doc.name);
    const zoom = ZOOM_STEPS[zoomIndex];

    return (
        <section
            aria-label={`Preview of ${doc.name}`}
            className="flex h-full min-h-full flex-col"
        >
            {/* Toolbar */}
            <div className="flex h-11 shrink-0 items-center gap-1 border-b border-(--window-divider) bg-titlebar/60 px-3">
                <span className="truncate text-[13px] font-semibold text-ink">
                    {doc.name}
                </span>

                <div className="ml-auto flex items-center gap-1">
                    <ToolbarButton
                        label="Zoom out"
                        onClick={() => setZoomIndex((i) => Math.max(0, i - 1))}
                        disabled={zoomIndex === 0}
                    >
                        <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                            <circle cx="11" cy="11" r="7" />
                            <path d="m20 20-3.5-3.5M8 11h6" />
                        </svg>
                    </ToolbarButton>
                    <button
                        type="button"
                        onClick={() => setZoomIndex(DEFAULT_ZOOM_INDEX)}
                        aria-label="Reset zoom to 100%"
                        className="min-w-12 rounded-md px-1 text-center text-xs font-medium tabular-nums text-ink-2 transition-colors hover:bg-hover-fill"
                    >
                        {Math.round(zoom * 100)}%
                    </button>
                    <ToolbarButton
                        label="Zoom in"
                        onClick={() =>
                            setZoomIndex((i) =>
                                Math.min(ZOOM_STEPS.length - 1, i + 1),
                            )
                        }
                        disabled={zoomIndex === ZOOM_STEPS.length - 1}
                    >
                        <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                            <circle cx="11" cy="11" r="7" />
                            <path d="m20 20-3.5-3.5M11 8v6M8 11h6" />
                        </svg>
                    </ToolbarButton>

                    <span className="mx-1 h-5 w-px bg-(--window-divider)" />

                    <a
                        href={doc.src}
                        download={doc.name}
                        aria-label={`Download ${doc.name}`}
                        title="Download"
                        className="flex size-7 items-center justify-center rounded-md text-ink transition-colors duration-150 hover:bg-hover-fill"
                    >
                        <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M12 3v12m0 0 4-4m-4 4-4-4M5 21h14" />
                        </svg>
                    </a>
                </div>
            </div>

            {/* Canvas */}
            <div className="min-h-0 flex-1 overflow-auto bg-black/10 p-5 dark:bg-black/30">
                <div className="flex min-h-full min-w-full items-start justify-center">
                    <div
                        className="origin-top transition-transform duration-150 ease-[var(--ease-mac)]"
                        style={{ transform: `scale(${zoom})` }}
                    >
                        <DocumentBody doc={doc} kind={kind} />
                    </div>
                </div>
            </div>
        </section>
    );
}
