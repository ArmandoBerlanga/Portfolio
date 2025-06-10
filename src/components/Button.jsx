export function Button({ children, active, onClick }) {
    return (
        <button
            className={`px-4 py-2 rounded-t-lg border-b-2 transition-colors duration-200 cursor-pointer ${active
                ? 'border-primary text-primary bg-primary/10 font-bold'
                : 'border-transparent text-gray-400 bg-gray-800 hover:text-primary'
            }`}
            onClick={onClick}
        >
            {children}
        </button>
    );
}