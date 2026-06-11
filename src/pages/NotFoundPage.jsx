import { Link } from 'react-router-dom';

export default function NotFoundPage() {
    return (
        <main className="wallpaper-ridge fixed inset-0 flex items-center justify-center p-6">
            <section
                aria-label="Page not found"
                className="glass-window w-full max-w-md overflow-hidden rounded-xl text-ink shadow-window"
            >
                <header className="flex h-10 items-center bg-titlebar px-3 shadow-[inset_0_-0.5px_0_var(--window-divider)]">
                    <div className="flex items-center gap-2">
                        <span className="size-[13px] rounded-full bg-light-red" />
                        <span className="size-[13px] rounded-full bg-light-yellow" />
                        <span className="size-[13px] rounded-full bg-light-green" />
                    </div>
                    <span className="absolute left-1/2 -translate-x-1/2 text-[13px] font-semibold text-ink-2">
                        Not Found
                    </span>
                </header>
                <div className="flex flex-col items-center gap-4 p-8 text-center">
                    <h1 className="text-6xl font-extrabold text-primary/30">404</h1>
                    <h2 className="text-xl font-bold">Page Not Found</h2>
                    <p className="text-sm text-ink-2">
                        The page you're looking for doesn't exist. It might have
                        been moved or deleted.
                    </p>
                    <Link
                        to="/"
                        className="mt-2 inline-block rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-white shadow-md transition-colors hover:bg-primary/90"
                    >
                        Back to Desktop
                    </Link>
                </div>
            </section>
        </main>
    );
}
