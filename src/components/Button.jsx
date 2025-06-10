export function Button({ children, active, onClick }) {
    return (
        <button
            className={`px-4 py-2 rounded-t-lg border-b-2 transition-all duration-200 cursor-pointer hover:bg-primary/10 ${active
                ? 'border-primary text-primary bg-primary/10 font-bold'
                : 'border-transparent text-gray-400 bg-gray-800 hover:text-primary'
            }`}
            onClick={onClick}
        >
            {children}
        </button>
    );
}