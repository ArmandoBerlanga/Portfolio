import { education } from "../config/education";

export default function EducationSection() {
    return (
        <section id="education" className="py-20 bg-gradient-to-br from-white via-slate-50 to-slate-200 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-500 rounded-2xl">
            <h2 className='text-4xl md:text-5xl font-extrabold text-primary/90 mb-10 text-center tracking-tight drop-shadow-sm'>Education</h2>

            <div className="education-list flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0 items-stretch max-w-7xl mx-auto px-4 md:px-0">
                {education.map((edu, index) => (
                    <div key={index} className="education-item flex-1 p-8 bg-white/90 dark:bg-slate-800/90 border border-primary/10 dark:border-slate-700 rounded-2xl shadow-xl flex flex-col justify-between transition-colors">
                        <div className="flex items-center mb-4">
                            <img src={edu.image} alt={edu.institution} className="w-32 h-16 rounded-xl mr-4 object-cover shadow-md border border-primary/20 bg-white dark:bg-slate-900" />
                            <div>
                                <h2 className='text-xl md:text-2xl font-bold mb-1 text-primary drop-shadow-sm'>{edu.institution}</h2>
                                <p className='text-base md:text-lg mb-1 text-slate-500 dark:text-slate-300 font-medium'>{edu.degree}</p>
                                <p className='text-xs md:text-sm text-slate-400 dark:text-slate-400'>{edu.startDate} - {edu.endDate}</p>
                            </div>
                        </div>
                        <p className='text-slate-700 dark:text-slate-200 text-base md:text-lg leading-relaxed'>{edu.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}