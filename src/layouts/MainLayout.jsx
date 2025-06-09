import { Outlet, useLocation } from "react-router-dom";

export default function MainLayout() {
    const location = useLocation();

    const getActiveSection = () => {
        if (location.hash) return location.hash;
        return "#about-me";
    };

    const activeSection = getActiveSection();

    return (
        <div className="flex flex-col min-h-screen">
            <header className="bg-dark text-white px-6 py-2 flex flex-row items-center justify-between sticky top-0 z-50">
                <div className="flex items-center justify-between">
                    <img src="src/assets/me.png" alt="Armando Berlanga" className="w-8 h-8 rounded-xl inline-block mr-2 object-cover" />          
                    <h1 className="font-bold">Armando Berlanga</h1>
                </div>

                <div className="flex items-center justify-between mt-2">
                    <nav>
                        <ul className="flex space-x-4">
                            <li><a href="#about-me" className={`hover:underline${activeSection === "#about-me" ? " text-primary" : " text-white"}`}>About Me</a></li>
                            <li><a href="#experience" className={`hover:underline${activeSection === "#experience" ? " text-primary" : " text-white"}`}>Experience</a></li>
                            <li><a href="#education" className={`hover:underline${activeSection === "#education" ? " text-primary" : " text-white"}`}>Education</a></li>
                            <li><a href="#certifications" className={`hover:underline${activeSection === "#certifications" ? " text-primary" : " text-white"}`}>Certifications</a></li>
                            <li><a href="#projects" className={`hover:underline${activeSection === "#projects" ? " text-primary" : " text-white"}`}>Projects</a></li>
                            <li><a href="#contact" className={`hover:underline${activeSection === "#contact" ? " text-primary" : " text-white"}`}>Contact</a></li>
                        </ul>
                    </nav>

                    <span className="material-icons ml-4">
                        contrast
                    </span>
                </div>
            </header>

            <main className="flex flex-grow flex-col justify-center bg-dark text-white px-32 text-left">
                <Outlet />
            </main>

            <footer className="bg-dark px-6 py-2"></footer>
        </div>
    );
}