// Skeleton loader components for better perceived performance

export function SkeletonImage({ className = "" }) {
    return (
        <div className={`animate-pulse bg-slate-200 dark:bg-slate-700 ${className}`}>
            <div className="h-full w-full" />
        </div>
    );
}

export function SkeletonText({ className = "", lines = 3 }) {
    return (
        <div className={`animate-pulse space-y-3 ${className}`}>
            {Array.from({ length: lines }).map((_, i) => (
                <div
                    key={i}
                    className="h-4 bg-slate-200 dark:bg-slate-700 rounded"
                    style={{ width: i === lines - 1 ? '80%' : '100%' }}
                />
            ))}
        </div>
    );
}

export function SkeletonCard({ className = "" }) {
    return (
        <div className={`animate-pulse bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl ${className}`}>
            <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mb-4" />
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2 mb-6" />
            <div className="space-y-3">
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded" />
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded" />
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-5/6" />
            </div>
        </div>
    );
}
