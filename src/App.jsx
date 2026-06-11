import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import OSShell from "./os/components/OSShell";

const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

function LoadingFallback() {
    return <div className="wallpaper-ridge fixed inset-0" />;
}

function App() {
    return (
        <ErrorBoundary>
            <BrowserRouter>
                <Suspense fallback={<LoadingFallback />}>
                    <Routes>
                        <Route path="/" element={<OSShell />} />
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </Suspense>
            </BrowserRouter>
        </ErrorBoundary>
    );
}

export default App;
