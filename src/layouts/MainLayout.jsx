import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { MenuIcon, CloseIcon } from "../components/Icons";

export default function MainLayout() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("#about-me");

    // Focus trap for mobile menu
    useEffect(() => {
        if (menuOpen) {
            const modal = document.querySelector('[role="dialog"]');
            const focusableElements = modal?.querySelectorAll('a, button');
            const firstElement = focusableElements?.[0];
            const lastElement = focusableElements?.[focusableElements.length - 1];

            firstElement?.focus();

            const handleTab = (e) => {
                if (e.key === 'Escape') {
                    setMenuOpen(false);
                }
                if (e.key === 'Tab') {
                    if (e.shiftKey && document.activeElement === firstElement) {
                        e.preventDefault();
                        lastElement?.focus();
                    } else if (!e.shiftKey && document.activeElement === lastElement) {
                        e.preventDefault();
                        firstElement?.focus();
                    }
                }
            };

            document.addEventListener('keydown', handleTab);
            return () => document.removeEventListener('keydown', handleTab);
        }
    }, [menuOpen]);

    const navLinks = [
        { href: "#about-me", label: "About Me" },
        { href: "#experience", label: "Experience" },
        { href: "#education", label: "Education" },
        { href: "#certifications", label: "Certifications" },
        { href: "#projects", label: "Projects" },
        { href: "#contact", label: "Contact" },
    ];

    useEffect(() => {
        let timeoutId = null;
        const handleScroll = () => {
            if (timeoutId) return;

            timeoutId = setTimeout(() => {
                const offsets = navLinks.map(link => {
                    const el = document.querySelector(link.href);
                    if (!el) return { href: link.href, top: Infinity };

                    const rect = el.getBoundingClientRect();
                    return { href: link.href, top: Math.abs(rect.top) };
                });
                const closest = offsets.reduce((a, b) => (a.top < b.top ? a : b));
                setActiveSection(closest.href);
                timeoutId = null;
            }, 100);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
        return () => {
            window.removeEventListener("scroll", handleScroll);
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, []);

    return (
        <div className="flex flex-col min-h-screen">
            <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-lg focus:shadow-lg">
                Skip to main content
            </a>
            <header className="bg-dark/90 backdrop-blur-md text-white px-6 py-3 flex flex-row items-center justify-between sticky top-0 z-50 shadow-lg border-b border-primary/10">
                <div className="flex items-center gap-3">
                    <img src="me.webp" alt="Armando Berlanga" width="40" height="40" className="w-10 h-10 rounded-2xl object-cover border-2 border-primary/30 shadow-md" />
                    <h1 className="font-bold text-lg md:text-xl tracking-tight text-primary drop-shadow-sm">Armando Berlanga</h1>
                </div>

                {/* Desktop nav */}
                <div className="hidden md:flex items-center gap-4">
                    <nav>
                        <ul className="flex space-x-2 text-base font-medium">
                            {navLinks.map(link => (
                                <li key={link.href}>
                                    <a href={link.href} className={`px-3 py-1 rounded-lg transition-colors duration-200 hover:bg-primary/10 hover:text-primary ${activeSection === link.href ? "bg-primary/20 text-primary font-bold" : "text-white"}`}>{link.label}</a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>

                {/* Hamburger for mobile & mid-size */}
                <div className="md:hidden flex items-center">
                    <button
                        className="p-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors focus:outline-none"
                        title="Open menu"
                        aria-label="Open menu"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        <MenuIcon className="text-primary text-2xl" />
                    </button>
                </div>

                {/* Mobile menu overlay */}
                {menuOpen && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center md:hidden bg-black/30"
                        onClick={() => setMenuOpen(false)}
                        aria-hidden="true"
                    >
                        <div
                            role="dialog"
                            aria-modal="true"
                            aria-label="Navigation menu"
                            className="fixed left-1/2 top-10 transform -translate-x-1/2 bg-dark/95 w-11/12 max-w-xs shadow-lg p-6 flex flex-col gap-8 animate-slide-in rounded-xl items-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="relative flex items-center mb-4 w-full">
                                <span className="font-bold text-2xl text-primary mx-auto">Menu</span>
                                <button
                                    className="absolute right-0 p-2 rounded-lg hover:bg-primary/10 transition-colors"
                                    title="Close menu"
                                    aria-label="Close menu"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    <CloseIcon className="text-primary text-2xl" />
                                </button>
                            </div>
                            <nav className="w-full">
                                <ul className="flex flex-col gap-4 text-lg font-medium items-center w-full">
                                    {navLinks.map(link => (
                                        <li key={link.href} className="w-full">
                                            <a
                                                href={link.href}
                                                className={`block w-full text-center px-3 py-2 rounded-lg transition-colors duration-200 hover:bg-primary/10 hover:text-primary ${activeSection === link.href ? "bg-primary/20 text-primary font-bold" : "text-white"}`}
                                                onClick={() => setMenuOpen(false)}
                                            >
                                                {link.label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </div>
                    </div>
                )}
            </header>

            <main id="main-content" className="flex flex-grow flex-col justify-center bg-dark text-white px-4 md:px-16 text-left transition-colors duration-500">
                <Outlet />
            </main>

            <footer className="bg-dark/90 px-6 py-4 text-center text-slate-400 text-sm border-t border-primary/10">© {new Date().getFullYear()} Armando Berlanga. All rights reserved.</footer>
        </div>
    );
}