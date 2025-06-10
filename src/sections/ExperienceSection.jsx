import { useState } from 'react';
import { Button } from '../components/Button';
import { jobs } from '../config/experience';

export default function ExperienceSection() {
    const [currentIndex, setCurrentIndex] = useState(0);

    return (
        <section id="experience" className="py-20 bg-gradient-to-br from-slate-50 via-white to-slate-200 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-500 rounded-2xl">
            <h2 className='text-4xl md:text-5xl font-extrabold text-primary/90 mb-10 text-center tracking-tight drop-shadow-sm'>Job Experience</h2>

            <div className="experience-tabs w-full flex flex-col items-center max-w-4xl mx-auto px-4 md:px-0">
                <div className="tab-list flex flex-wrap gap-3 mb-6 w-full justify-center">
                    {jobs.map((job, idx) => (
                        <Button
                            key={job.company}
                            onClick={() => setCurrentIndex(idx)}
                            active={idx === currentIndex}
                            className={`px-5 py-2 rounded-lg font-semibold shadow-md transition-all duration-200 border border-primary/20 ${idx === currentIndex ? 'bg-primary text-white scale-105' : 'bg-white dark:bg-slate-800 text-primary hover:bg-primary/10 dark:hover:bg-primary/20'}`}
                        >
                            {job.company}
                        </Button>
                    ))}
                </div>

                <div className="tab-panel w-full">
                    <div className="job-item p-8 bg-white/90 dark:bg-slate-800/90 border border-primary/10 dark:border-slate-700 rounded-2xl w-full shadow-xl transition-colors">
                        <h2 className='text-2xl md:text-3xl font-bold mb-2 text-primary drop-shadow-sm'>{jobs[currentIndex].title}</h2>

                        <p className='text-base md:text-lg mb-4 text-slate-500 dark:text-slate-300 font-medium'>
                            {jobs[currentIndex].type} &mdash; {jobs[currentIndex].location} <span className="mx-2">|</span> {jobs[currentIndex].startDate} - {jobs[currentIndex].endDate}
                        </p>

                        {/* Optionally, add a summary or highlights here if available */}

                        <p className='mb-4 text-slate-700 dark:text-slate-200 text-base md:text-lg leading-relaxed'>{jobs[currentIndex].description}</p>

                        <div className="technologies flex flex-wrap gap-2 mt-4">
                            {jobs[currentIndex].technologies.map((tech, techIndex) => (
                                <span key={techIndex} className='bg-primary/10 text-primary font-semibold px-4 py-1 rounded-full text-sm shadow-sm border border-primary/20'>
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}