import { useState, useEffect } from "react";

export function Gallery({ images, alt }) {
    const [current, setCurrent] = useState(0);
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        if (expanded) {
            const original = document.body.style.overflow;
            document.body.style.overflow = 'hidden';
            return () => {
                document.body.style.overflow = original;
            };
        }
    }, [expanded]);

    if (!images || images.length === 0) return null;
    return (
        <div className="gallery flex flex-col items-center gap-2">
            <div
                className="w-full aspect-video flex items-center justify-center bg-white dark:bg-slate-900 rounded-xl border border-primary/20 shadow-md overflow-hidden relative"
            >
                <img
                    src={images[current]}
                    alt={alt}
                    className="object-contain w-full h-full max-h-80 transition-all duration-300"
                    onClick={() => setExpanded(true)}
                    style={{ cursor: 'zoom-in' }}
                />
            </div>
            {images.length > 1 && (
                <div className="flex gap-2 mt-2">
                    {images.map((img, idx) => (
                        <button
                            key={idx}
                            className={`w-4 h-4 rounded-full border-2 ${current === idx ? 'bg-primary border-primary' : 'bg-white dark:bg-slate-700 border-primary/30'} transition-all cursor-pointer active:scale-90 hover:scale-110`}
                            onClick={() => setCurrent(idx)}
                            aria-label={`Show image ${idx + 1}`}
                        />
                    ))}
                </div>
            )}
            {expanded && (
                <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/60 p-8 animate-fade-in">
                    <img
                        src={images[current]}
                        alt={alt}
                        className="object-contain w-full h-full max-h-[90vh] max-w-[90vw]"
                        style={{ cursor: 'zoom-out' }}
                        onClick={() => setExpanded(false)}
                    />
                    <button
                        className="absolute top-4 right-4 text-white bg-black/60 rounded-full p-2 text-2xl z-50 cursor-pointer hover:bg-black/80 transition"
                        onClick={() => setExpanded(false)}
                        aria-label="Close expanded gallery"
                    >
                        &times;
                    </button>
                    {images.length > 1 && (
                        <div className="flex gap-2 mt-4">
                            {images.map((img, idx) => (
                                <button
                                    key={idx}
                                    className={`w-4 h-4 rounded-full border-2 ${current === idx ? 'bg-primary border-primary' : 'bg-white dark:bg-slate-700 border-primary/30'} transition-all cursor-pointer active:scale-90 hover:scale-110`}
                                    onClick={() => setCurrent(idx)}
                                    aria-label={`Show image ${idx + 1}`}
                                />
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
