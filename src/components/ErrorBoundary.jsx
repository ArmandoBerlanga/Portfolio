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
                <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-white via-slate-50 to-slate-200 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-500 px-6">
                    <div className="text-center max-w-2xl">
                        <h1 className="text-6xl md:text-7xl font-extrabold text-red-500 mb-6">Oops!</h1>
                        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Something went wrong</h2>
                        <p className="text-lg md:text-xl text-slate-700 dark:text-slate-200 mb-8">
                            We're sorry for the inconvenience. Please try refreshing the page.
                        </p>
                        {process.env.NODE_ENV === 'development' && this.state.error && (
                            <details className="text-left bg-slate-100 dark:bg-slate-800 p-4 rounded-lg mb-8">
                                <summary className="cursor-pointer font-semibold text-slate-700 dark:text-slate-200 mb-2">
                                    Error Details
                                </summary>
                                <pre className="text-sm text-red-600 dark:text-red-400 overflow-auto">
                                    {this.state.error.toString()}
                                </pre>
                            </details>
                        )}
                        <button
                            onClick={() => window.location.reload()}
                            className="px-8 py-4 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-primary/90 transition-colors text-lg"
                        >
                            Refresh Page
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
