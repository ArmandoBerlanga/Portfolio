import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

function Chevron({ direction }) {
    return (
        <svg
            viewBox="0 0 24 24"
            className="size-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            {direction === "left" ? (
                <path d="M15 18l-6-6 6-6" />
            ) : (
                <path d="M9 6l6 6-6 6" />
            )}
        </svg>
    );
}

Chevron.propTypes = {
    direction: PropTypes.oneOf(["left", "right"]).isRequired,
};

function PageDots({ count, current, onSelect, light }) {
    if (count < 2) {return null;}
    return (
        <div className="flex items-center justify-center gap-1.5" role="tablist" aria-label="Screenshots">
            {Array.from({ length: count }, (_, idx) => (
                <button
                    key={idx}
                    type="button"
                    role="tab"
                    aria-selected={idx === current}
                    aria-label={`Screenshot ${idx + 1} of ${count}`}
                    onClick={() => onSelect(idx)}
                    className={`size-1.5 rounded-full transition-all duration-200 ${
                        idx === current
                            ? light
                                ? "bg-white"
                                : "bg-ink-2"
                            : light
                              ? "bg-white/35 hover:bg-white/60"
                              : "bg-ink-3/35 hover:bg-ink-3/60"
                    }`}
                />
            ))}
        </div>
    );
}

PageDots.propTypes = {
    count: PropTypes.number.isRequired,
    current: PropTypes.number.isRequired,
    onSelect: PropTypes.func.isRequired,
    light: PropTypes.bool,
};

function QuickLook({ images, alt, index, onIndex, onClose }) {
    const panelRef = useRef(null);

    useEffect(() => {
        const previous = document.activeElement;
        panelRef.current?.focus();
        return () => previous?.focus?.();
    }, []);

    function onKeyDown(e) {
        if (e.key === "Escape") {
            e.stopPropagation();
            onClose();
        } else if (e.key === "ArrowLeft") {
            onIndex((index - 1 + images.length) % images.length);
        } else if (e.key === "ArrowRight") {
            onIndex((index + 1) % images.length);
        }
    }

    return (
        <div
            className="fixed inset-0 z-[700] flex items-center justify-center bg-black/40 p-4 @md:p-10"
            onClick={(e) => {
                if (e.target === e.currentTarget) {onClose();}
            }}
        >
            <div
                ref={panelRef}
                role="dialog"
                aria-modal="true"
                aria-label={`${alt} — screenshot ${index + 1} of ${images.length}`}
                tabIndex={-1}
                onKeyDown={onKeyDown}
                className="flex max-h-full w-full max-w-4xl animate-[spotlight-in_180ms_var(--ease-mac-spring)] flex-col overflow-hidden rounded-xl shadow-window outline-none"
            >
                {/* Quick Look titlebar */}
                <header className="glass-popover flex h-9 shrink-0 select-none items-center gap-2 border-b border-(--window-divider) px-3">
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close preview"
                        className="group/close relative size-[13px] rounded-full bg-light-red before:absolute before:-inset-1.5"
                    >
                        <span className="pointer-events-none absolute inset-0 flex items-center justify-center text-[9px] font-bold leading-none text-black/55 opacity-0 transition-opacity duration-100 group-hover/close:opacity-100">
                            ×
                        </span>
                    </button>
                    <span className="absolute left-1/2 -translate-x-1/2 truncate text-[13px] font-semibold text-ink-2">
                        {alt} — {index + 1} of {images.length}
                    </span>
                </header>

                {/* Stage */}
                <div className="relative flex min-h-0 flex-1 items-center justify-center bg-black/90">
                    <img
                        src={images[index]}
                        alt={`${alt} screenshot ${index + 1}`}
                        className="max-h-[70vh] w-full object-contain"
                    />
                    {images.length > 1 && (
                        <>
                            <button
                                type="button"
                                onClick={() =>
                                    onIndex(
                                        (index - 1 + images.length) %
                                            images.length,
                                    )
                                }
                                aria-label="Previous screenshot"
                                className="glass-popover absolute left-3 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full text-ink shadow-md transition-transform duration-150 hover:scale-110 active:scale-95"
                            >
                                <Chevron direction="left" />
                            </button>
                            <button
                                type="button"
                                onClick={() =>
                                    onIndex((index + 1) % images.length)
                                }
                                aria-label="Next screenshot"
                                className="glass-popover absolute right-3 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full text-ink shadow-md transition-transform duration-150 hover:scale-110 active:scale-95"
                            >
                                <Chevron direction="right" />
                            </button>
                        </>
                    )}
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2">
                        <PageDots
                            count={images.length}
                            current={index}
                            onSelect={onIndex}
                            light
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

QuickLook.propTypes = {
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    alt: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    onIndex: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
};

export function Gallery({ images, alt }) {
    const [current, setCurrent] = useState(0);
    const [expanded, setExpanded] = useState(false);
    const stripRef = useRef(null);

    function goTo(idx) {
        setCurrent(idx);
        const strip = stripRef.current;
        const card = strip?.children[idx];
        if (strip && card) {
            strip.scrollTo({
                left: card.offsetLeft - strip.offsetLeft,
                behavior: "smooth",
            });
        }
    }

    // Keep the page dots in sync with manual swipes/trackpad scrolling.
    function onScroll() {
        const strip = stripRef.current;
        if (!strip || !strip.children.length) {return;}
        const cardWidth = strip.children[0].offsetWidth + 12; // gap-3
        setCurrent(
            Math.max(
                0,
                Math.min(
                    images.length - 1,
                    Math.round(strip.scrollLeft / cardWidth),
                ),
            ),
        );
    }

    if (!images || images.length === 0) {return null;}

    return (
        <figure className="group/gallery relative m-0">
            {/* Snap-scrolling screenshot strip */}
            <div
                ref={stripRef}
                onScroll={onScroll}
                className="flex snap-x snap-mandatory gap-3 overflow-x-auto rounded-xl [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
                {images.map((img, idx) => (
                    <button
                        key={img}
                        type="button"
                        onClick={() => {
                            setCurrent(idx);
                            setExpanded(true);
                        }}
                        aria-label={`Open screenshot ${idx + 1} of ${images.length}`}
                        className={`${
                            images.length > 1 ? "w-[85%]" : "w-full"
                        } shrink-0 cursor-zoom-in snap-center overflow-hidden rounded-xl border border-(--window-divider) shadow-sm outline-none transition-shadow duration-200 hover:shadow-md focus-visible:ring-2 focus-visible:ring-accent`}
                    >
                        <img
                            src={img}
                            alt={`${alt} screenshot ${idx + 1}`}
                            loading="lazy"
                            className="aspect-video w-full bg-black/5 object-cover dark:bg-black/30"
                        />
                    </button>
                ))}
            </div>

            {/* Hover chevrons */}
            {images.length > 1 && (
                <>
                    {current > 0 && (
                        <button
                            type="button"
                            onClick={() => goTo(current - 1)}
                            aria-label="Previous screenshot"
                            className="glass-popover absolute left-2 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full text-ink opacity-0 shadow-md transition-all duration-200 hover:scale-110 focus-visible:opacity-100 group-hover/gallery:opacity-100"
                        >
                            <Chevron direction="left" />
                        </button>
                    )}
                    {current < images.length - 1 && (
                        <button
                            type="button"
                            onClick={() => goTo(current + 1)}
                            aria-label="Next screenshot"
                            className="glass-popover absolute right-2 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full text-ink opacity-0 shadow-md transition-all duration-200 hover:scale-110 focus-visible:opacity-100 group-hover/gallery:opacity-100"
                        >
                            <Chevron direction="right" />
                        </button>
                    )}
                </>
            )}

            {/* Page control */}
            {images.length > 1 && (
                <figcaption className="mt-2.5">
                    <PageDots
                        count={images.length}
                        current={current}
                        onSelect={goTo}
                    />
                </figcaption>
            )}

            {expanded && (
                <QuickLook
                    images={images}
                    alt={alt}
                    index={current}
                    onIndex={setCurrent}
                    onClose={() => setExpanded(false)}
                />
            )}
        </figure>
    );
}

Gallery.propTypes = {
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    alt: PropTypes.string.isRequired,
};
