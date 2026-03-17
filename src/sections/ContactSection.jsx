import { ContactForm } from '../components/ContactForm';

export default function ContactSection() {
    return (
        <section id="contact" aria-label="Contact information" className="py-20 bg-gradient-to-br from-slate-50 via-white to-slate-200 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-500 rounded-2xl">
            <h2 className="text-4xl md:text-5xl font-extrabold text-primary/90 mb-8 text-center tracking-tight drop-shadow-sm">Contact</h2>
            <div className="flex flex-col items-center justify-center max-w-3xl mx-auto px-4 md:px-8">
                <p className="text-lg md:text-2xl text-slate-700 dark:text-slate-200 mb-8 text-center">Want to get in touch? Fill out the form below or send me an email directly!</p>

                <ContactForm />

                <div className="mt-8 text-center">
                    <p className="text-slate-600 dark:text-slate-300 mb-2">Or email me directly at:</p>
                    <a href="mailto:armandoberlanga2708@gmail.com" className="text-primary font-semibold hover:underline text-lg">
                        armandoberlanga2708@gmail.com
                    </a>
                </div>
            </div>
        </section>
    );
}