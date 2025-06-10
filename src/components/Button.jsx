export function Button({ children, active, onClick, className = "" }) {
    return (
        <button
            className={`px-5 py-2 rounded-lg font-semibold shadow-md border transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/40 ${
                active
                    ? 'bg-primary text-white border-primary scale-105 drop-shadow-lg'
                    : 'bg-white dark:bg-slate-800 text-primary border-primary/20 hover:bg-primary/10 hover:text-primary'
            } ${className}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
}