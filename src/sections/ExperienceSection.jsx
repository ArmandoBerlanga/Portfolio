import { useState } from 'react';
import { Button } from '../components/Button';
import { jobs } from '../config/experience';

export default function ExperienceSection() {
    const [currentIndex, setCurrentIndex] = useState(0);

    return (
        <section id="experience">
            <h1 className='text-4xl text-primary/80 mb-4'>Job Experience</h1>

            <div className="experience-tabs w-full flex flex-col items-center">
                <div className="tab-list flex flex-wrap gap-2 mb-2 w-full justify-center">
                    {jobs.map((job, idx) => (
                        <Button key={job.company} onClick={() => setCurrentIndex(idx)} active={idx === currentIndex}>
                            {job.company}
                        </Button>
                    ))}

                </div>

                <div className="tab-panel w-full">
                    <div className="job-item p-4 bg-gray-800 border border-gray-700 rounded-lg w-full">
                        <h2 className='text-2xl mb-2 text-primary'>{jobs[currentIndex].title}</h2>

                        <p className='text-lg mb-4 text-gray-400'>
                            {jobs[currentIndex].type} - {jobs[currentIndex].location} / {jobs[currentIndex].startDate} - {jobs[currentIndex].endDate}
                        </p>

                        <p className='text-lg mb-4'>{}</p>

                        <p className='mb-4'>{jobs[currentIndex].description}</p>

                        <div className="technologies flex flex-wrap gap-2">
                            {jobs[currentIndex].technologies.map((tech, techIndex) => (
                                <span key={techIndex} className='bg-gray-700 text-white px-3 py-1 rounded-full text-sm'>
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