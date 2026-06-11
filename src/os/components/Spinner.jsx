export default function Spinner() {
    return (
        <div
            role="status"
            aria-label="Loading"
            className="flex h-full min-h-32 items-center justify-center"
        >
            <span className="size-5 animate-spin rounded-full border-2 border-ink-3/30 border-t-ink-2" />
        </div>
    );
}
