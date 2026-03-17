import { useState, useEffect } from "react";
import PropTypes from 'prop-types';

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

    // Keyboard navigation
    useEffect(() => {
        const handleKeyPress = (e) => {
            if (!expanded) return;

            if (e.key === 'Escape') {
                setExpanded(false);
            } else if (e.key === 'ArrowLeft') {
                setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
            } else if (e.key === 'ArrowRight') {
                setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [expanded, images.length]);

    const goToPrevious = () => {
        setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const goToNext = () => {
        setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    if (!images || images.length === 0) return null;
    return (
        <div className="gallery flex flex-col items-center gap-2">
            <div
                className="w-full aspect-video flex items-center justify-center bg-white dark:bg-slate-900 rounded-xl border border-primary/20 shadow-md overflow-hidden relative group"
            >
                <img
                    src={images[current]}
                    alt={alt}
                    loading="lazy"
                    className="object-contain w-full h-full max-h-80 transition-all duration-300"
                    onClick={() => setExpanded(true)}
                    style={{ cursor: 'zoom-in' }}
                />
                {images.length > 1 && (
                    <>
                        <button
                            onClick={goToPrevious}
                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/80"
                            aria-label="Previous image"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z" clipRule="evenodd" />
                            </svg>
                        </button>
                        <button
                            onClick={goToNext}
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/80"
                            aria-label="Next image"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </>
                )}
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
                        loading="lazy"
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
                        <>
                            <button
                                onClick={goToPrevious}
                                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 text-white p-3 rounded-full hover:bg-black/80 transition"
                                aria-label="Previous image"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                                    <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z" clipRule="evenodd" />
                                </svg>
                            </button>
                            <button
                                onClick={goToNext}
                                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 text-white p-3 rounded-full hover:bg-black/80 transition"
                                aria-label="Next image"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                                    <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </>
                    )}
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

Gallery.propTypes = {
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    alt: PropTypes.string.isRequired
};
