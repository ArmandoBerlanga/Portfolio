import { Outlet } from "react-router-dom";

export default function MainLayout() {
    return (
        <div className="flex flex-col min-h-screen">
            <header className="bg-dark text-white px-6 py-2 flex flex-row items-center justify-between">
                <div className="flex items-center justify-between">
                    <img src="src/assets/me.png" alt="Armando Berlanga" className="w-8 h-8 rounded-xl inline-block mr-2 object-cover" />          
                    <h1 className="font-bold">Armando Berlanga</h1>
                </div>

                <div className="flex items-center justify-between mt-2">
                    <nav>
                        <ul className="flex space-x-4">
                            <li><a href="/" className="text-white hover:underline">About Me</a></li>
                            <li><a href="/experience" className="text-white hover:underline">Experience</a></li>
                            <li><a href="/projects" className="text-white hover:underline">Education</a></li>
                            <li><a href="/contact" className="text-white hover:underline">Certifications</a></li>
                            <li><a href="/projects" className="text-white hover:underline">Projects</a></li>
                            <li><a href="/contact" className="text-white hover:underline">Contact</a></li>
                        </ul>
                    </nav>

                    <span className="material-icons ml-4">
                        contrast
                    </span>
                </div>
            </header>

            <main className="flex-grow bg-dark">
                <Outlet />
            </main>

            <footer className="bg-dark px-6 py-2"></footer>
        </div>
    );
}