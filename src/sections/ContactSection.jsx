export default function ContactSection() {
    return (
        <section id="contact" className="py-20 bg-gradient-to-br from-slate-50 via-white to-slate-200 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-500">
            <h2 className="text-4xl md:text-5xl font-extrabold text-primary/90 mb-8 text-center tracking-tight drop-shadow-sm">Contact</h2>
            <div className="flex flex-col items-center justify-center max-w-xl mx-auto px-4">
                <p className="text-lg md:text-2xl text-slate-700 dark:text-slate-200 mb-6 text-center">Want to get in touch? Feel free to reach out via email!</p>
                <a href="mailto:armandoberlanga2708@gmail.com" className="inline-block px-8 py-4 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-primary/90 transition-colors text-lg md:text-xl">Mail Me</a>
            </div>
        </section>
    );
}