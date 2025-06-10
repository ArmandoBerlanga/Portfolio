import { Button } from "../components/Button";

export default function AboutMeSection() {
    const openResume = () => {
        window.open('/resume.pdf', '_blank');
    }

    const goToCode = () => {
        window.open('https://github.com/ArmandoBerlanga', '_blank');
    }

    const goToLinkedIn = () => {
        window.open('https://www.linkedin.com/in/armandoberlanga', '_blank');
    }

    return (
        <section id="about-me" className="py-20 bg-gradient-to-br from-white via-slate-50 to-slate-200 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-500 rounded-2xl">
            <div className="about-me-content flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto px-6 md:px-12">
                <div className="about-me-description md:mr-20 flex-1 mb-10 md:mb-0">
                    <h1 className='text-5xl md:text-6xl font-extrabold mb-6 opacity-80 leading-tight tracking-tight'>Hi, I'm <span className='text-primary drop-shadow-md'>Armando Berlanga</span>!</h1>

                    <h2 className='text-2xl md:text-4xl font-semibold mb-4 opacity-100 text-slate-700 dark:text-slate-200'>
                        A <span className='text-primary'>Senior Software Engineer</span> who thrives on continuous learning and excels at
                        delivering robust, scalable solutions.
                    </h2>

                    <p className="text-lg md:text-2xl opacity-90 text-slate-600 dark:text-slate-300 mb-6 max-w-2xl">
                        With extensive <span className='text-primary font-semibold'>full-stack</span> development experience
                        and a <span className='text-primary font-semibold'>resilient</span>, <span className='text-primary font-semibold'>adaptable</span> mindset,
                        I seamlessly integrate into large-scale Scrum teams to drive impactful results.
                    </p>

                    <div className="stack flex flex-wrap gap-3 mt-6">
                        <img src="stack/net.svg" alt=".NET" className="w-10 h-10 rounded-xl shadow-md bg-white/80 dark:bg-slate-800/80 p-1 object-cover transition-transform hover:scale-110" />
                        <img src="stack/python.png" alt="Python" className="w-10 h-10 rounded-xl shadow-md bg-white/80 dark:bg-slate-800/80 p-1 object-cover transition-transform hover:scale-110" />
                        <img src="stack/vue.jpg" alt="VueJS" className="w-10 h-10 rounded-xl shadow-md bg-white/80 dark:bg-slate-800/80 p-1 object-cover transition-transform hover:scale-110" />
                        <img src="stack/react.png" alt="React" className="w-10 h-10 rounded-xl shadow-md bg-white/80 dark:bg-slate-800/80 p-1 object-cover transition-transform hover:scale-110" />
                        <img src="stack/azure.jpeg" alt="Azure" className="w-10 h-10 rounded-xl shadow-md bg-white/80 dark:bg-slate-800/80 p-1 object-cover transition-transform hover:scale-110" />
                        <img src="stack/gcp.png" alt="GCP" className="w-10 h-10 rounded-xl shadow-md bg-white/80 dark:bg-slate-800/80 p-1 object-cover transition-transform hover:scale-110" />
                    </div>
                </div>

                <div className="flex-1 flex justify-center items-center">
                    <div className="relative group">
                        <img src="me.png" alt="Armando Berlanga" className="w-64 h-64 md:w-80 md:h-80 rounded-3xl shadow-2xl object-cover border-4 border-primary/30 group-hover:scale-105 transition-transform duration-300" />
                        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-primary text-white text-xs px-4 py-1 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">Let's connect!</div>
                    </div>
                </div>
            </div>

            <div className="about-me-go-to flex justify-center gap-4 mt-12">
                <Button onClick={openResume} className="px-6 py-3 text-lg font-semibold bg-primary rounded-lg shadow-md transition-colors">
                    Resume
                </Button>
                <Button onClick={goToCode} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-md p-3 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                    <img src="github.svg" alt="GitHub" className="w-6 h-6" />
                </Button>
                <Button onClick={goToLinkedIn} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-md p-3 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                    <img src="linkedin.svg" alt="LinkedIn" className="w-6 h-6" />
                </Button>
            </div>
        </section>
    );
}