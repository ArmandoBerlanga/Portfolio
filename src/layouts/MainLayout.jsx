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
            <header className="bg-dark/90 backdrop-blur-md text-white px-6 py-3 flex flex-row items-center justify-between sticky top-0 z-50 shadow-lg border-b border-primary/10">
                <div className="flex items-center gap-3">
                    <img src="me.png" alt="Armando Berlanga" className="w-10 h-10 rounded-2xl object-cover border-2 border-primary/30 shadow-md" />
                    <h1 className="font-bold text-lg md:text-xl tracking-tight text-primary drop-shadow-sm">Armando Berlanga</h1>
                </div>

                <div className="flex items-center gap-6">
                    <nav>
                        <ul className="flex space-x-2 md:space-x-6 text-base md:text-lg font-medium">
                            <li><a href="#about-me" className={`px-3 py-1 rounded-lg transition-colors duration-200 hover:bg-primary/10 hover:text-primary ${activeSection === "#about-me" ? "bg-primary/20 text-primary font-bold" : "text-white"}`}>About Me</a></li>
                            <li><a href="#experience" className={`px-3 py-1 rounded-lg transition-colors duration-200 hover:bg-primary/10 hover:text-primary ${activeSection === "#experience" ? "bg-primary/20 text-primary font-bold" : "text-white"}`}>Experience</a></li>
                            <li><a href="#education" className={`px-3 py-1 rounded-lg transition-colors duration-200 hover:bg-primary/10 hover:text-primary ${activeSection === "#education" ? "bg-primary/20 text-primary font-bold" : "text-white"}`}>Education</a></li>
                            <li><a href="#certifications" className={`px-3 py-1 rounded-lg transition-colors duration-200 hover:bg-primary/10 hover:text-primary ${activeSection === "#certifications" ? "bg-primary/20 text-primary font-bold" : "text-white"}`}>Certifications</a></li>
                            <li><a href="#projects" className={`px-3 py-1 rounded-lg transition-colors duration-200 hover:bg-primary/10 hover:text-primary ${activeSection === "#projects" ? "bg-primary/20 text-primary font-bold" : "text-white"}`}>Projects</a></li>
                            <li><a href="#contact" className={`px-3 py-1 rounded-lg transition-colors duration-200 hover:bg-primary/10 hover:text-primary ${activeSection === "#contact" ? "bg-primary/20 text-primary font-bold" : "text-white"}`}>Contact</a></li>
                        </ul>
                    </nav>
                    <button className="ml-2 p-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors" title="Toggle theme">
                        <span className="material-icons text-primary text-2xl align-middle">contrast</span>
                    </button>
                </div>
            </header>

            <main className="flex flex-grow flex-col justify-center bg-dark text-white px-4 md:px-16 text-left transition-colors duration-500">
                <Outlet />
            </main>

            <footer className="bg-dark/90 px-6 py-4 text-center text-slate-400 text-sm border-t border-primary/10">© {new Date().getFullYear()} Armando Berlanga. All rights reserved.</footer>
        </div>
    );
}