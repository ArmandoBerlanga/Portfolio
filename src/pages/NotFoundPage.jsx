import { Link } from 'react-router-dom';

export default function NotFoundPage() {
    return (
        <section className="py-20 bg-gradient-to-br from-white via-slate-50 to-slate-200 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-500 rounded-2xl min-h-[60vh] flex items-center justify-center">
            <div className="text-center px-6">
                <h1 className="text-9xl md:text-[12rem] font-extrabold text-primary/20 mb-4">404</h1>
                <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">Page Not Found</h2>
                <p className="text-lg md:text-xl text-slate-700 dark:text-slate-200 mb-8 max-w-md mx-auto">
                    Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
                </p>
                <Link
                    to="/"
                    className="inline-block px-8 py-4 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-primary/90 transition-colors text-lg"
                >
                    Go Back Home
                </Link>
            </div>
        </section>
    );
}
