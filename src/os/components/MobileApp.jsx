import { Suspense, useRef } from "react";
import PropTypes from "prop-types";
import ErrorBoundary from "../../components/ErrorBoundary";
import Spinner from "./Spinner";
import StatusBar from "./StatusBar";
import useFocusTrap from "../useFocusTrap";

export default function MobileApp({ app, onClose }) {
    const containerRef = useRef(null);
    useFocusTrap(containerRef, true);

    return (
        <div
            ref={containerRef}
            role="dialog"
            aria-modal="true"
            aria-label={app.title}
            className="fixed inset-0 z-50 flex animate-[app-open_350ms_var(--ease-mac)] flex-col bg-[#f6f6f8] text-ink dark:bg-[#26282f]"
        >
            <header className="shrink-0 border-b border-(--window-divider) bg-titlebar">
                <StatusBar />
                <div className="relative flex h-11 items-center justify-center">
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Back to home screen"
                        className="absolute left-3 flex items-center gap-1 text-[15px] text-accent"
                    >
                        <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M15 18l-6-6 6-6" />
                        </svg>
                        Home
                    </button>
                    <h1 className="text-[16px] font-semibold">{app.title}</h1>
                </div>
            </header>

            <div className="@container min-h-0 flex-1 overflow-y-auto">
                <ErrorBoundary>
                    <Suspense fallback={<Spinner />}>
                        <app.Component />
                    </Suspense>
                </ErrorBoundary>
            </div>

            <button
                type="button"
                onClick={onClose}
                aria-label="Close app"
                className="flex shrink-0 justify-center pb-[max(8px,env(safe-area-inset-bottom))] pt-2"
            >
                <span className="h-[5px] w-[134px] rounded-full bg-ink/40" />
            </button>
        </div>
    );
}

MobileApp.propTypes = {
    app: PropTypes.shape({
        title: PropTypes.string.isRequired,
        Component: PropTypes.elementType.isRequired,
    }).isRequired,
    onClose: PropTypes.func.isRequired,
};
