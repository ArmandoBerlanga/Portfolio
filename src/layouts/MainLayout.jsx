import { Outlet } from "react-router-dom";

export default function MainLayout() {
    return (
        <div className="flex flex-col min-h-screen">
            <header className="bg-primary text-white px-2.5 py-1">Header Content</header>

            <main className="flex-grow">
                <Outlet />
            </main>

            <footer className="bg-primary p-2.5">Footer Content</footer>
        </div>
    );
}