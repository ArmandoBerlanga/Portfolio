import { Component } from 'react';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error('Error caught by boundary:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="wallpaper-ridge fixed inset-0 flex items-center justify-center p-6">
                    <div
                        role="alertdialog"
                        aria-labelledby="crash-title"
                        className="glass-popover w-full max-w-sm overflow-hidden rounded-xl text-ink shadow-window"
                    >
                        <div className="flex flex-col items-center px-6 pt-7 text-center">
                            {/* App icon with caution badge */}
                            <div className="relative">
                                <svg viewBox="0 0 100 100" className="size-16" aria-hidden="true">
                                    <rect width="100" height="100" rx="22.37" fill="url(#crash-g)" />
                                    <defs>
                                        <linearGradient id="crash-g" x1="0" y1="0" x2="1" y2="1">
                                            <stop offset="0%" stopColor="#6fb5f7" />
                                            <stop offset="100%" stopColor="#2e5cc5" />
                                        </linearGradient>
                                    </defs>
                                    <text x="50" y="64" textAnchor="middle" fontSize="40" fontWeight="700" fill="#fff">
                                        AB
                                    </text>
                                </svg>
                                <svg viewBox="0 0 24 24" className="absolute -bottom-1.5 -right-1.5 size-7 drop-shadow" aria-hidden="true">
                                    <path d="M12 2 1.5 21h21L12 2Z" fill="#febc2e" stroke="#fff" strokeWidth="1.2" strokeLinejoin="round" />
                                    <path d="M12 9v5" stroke="#1d1d1f" strokeWidth="2" strokeLinecap="round" />
                                    <circle cx="12" cy="17" r="1.2" fill="#1d1d1f" />
                                </svg>
                            </div>

                            <h1 id="crash-title" className="mt-4 text-[15px] font-bold">
                                Portfolio quit unexpectedly.
                            </h1>
                            <p className="mt-1.5 text-[13px] leading-relaxed text-ink-2">
                                The application encountered a problem. Click
                                Reopen to launch it again — your desktop will be
                                restored.
                            </p>

                            {import.meta.env.DEV && this.state.error && (
                                <details className="mt-3 w-full text-left">
                                    <summary className="text-[13px] font-medium text-primary">
                                        Show problem report…
                                    </summary>
                                    <pre className="mt-2 max-h-32 overflow-auto rounded-lg bg-black/80 p-3 font-mono text-[11px] leading-relaxed text-[#6fd66f]">
                                        {`Process:        portfolio [1]\nException Type: ${this.state.error.name}\n\n${this.state.error.toString()}`}
                                    </pre>
                                </details>
                            )}
                        </div>

                        <div className="mt-6 flex gap-3 border-t border-(--window-divider) bg-hover-fill/40 px-5 py-4">
                            <a
                                href="mailto:armandoberlanga2708@gmail.com?subject=Portfolio%20bug%20report"
                                className="flex-1 rounded-lg border border-(--window-divider) bg-surface py-1.5 text-center text-[13px] font-semibold text-ink transition-colors hover:bg-hover-fill"
                            >
                                Report…
                            </a>
                            <button
                                type="button"
                                onClick={() => window.location.reload()}
                                className="flex-1 rounded-lg bg-primary py-1.5 text-[13px] font-semibold text-white shadow-sm transition-all hover:bg-primary/90 active:scale-95"
                            >
                                Reopen
                            </button>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
