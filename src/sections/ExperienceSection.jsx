import { useState } from 'react';
import { Button } from '../components/Button';

export default function ExperienceSection() {
    const jobs = [
        {
            title: 'Senior Software Engineer',
            company: 'Slalom Build',
            type: 'Full-time',
            location: 'Hybrid',
            startDate: '2024-12',
            endDate: 'Present',
            description: 'Develop full-stack .NET 8 applications using Blazor and Azure, implementing SOLID-based backend solutions and responsive UIs with Telerik Blazor, while actively applying Scrum practices through daily standups, PR reviews, and full user story management.',
            technologies: ['.NET', 'Blazor', 'Azure', 'Telerik Blazor']
        },
        {
            title: 'Software Engineer',
            company: 'Infosys',
            type: 'Full-time',
            location: 'Hybrid',
            startDate: '2024-02',
            endDate: '2024-12',
            description: 'Proficient .NET Developer skilled in designing APIs, building microservices, and managing CI/CD deployments with Octopus. Successfully migrated legacy MuleSoft apps to modern .NET frameworks, ensuring seamless integration and functionality across MVC architecture and microservices.',
            technologies: ['.NET', 'MuleSoft', 'Octopus Deploy', 'Microservices']
        },
        {
            title: 'Full Stack Software Developer',
            company: 'KEMET Electronics Corporation',
            type: 'Full-time',
            location: 'Hybrid',
            startDate: '2023-05',
            endDate: '2024-01',
            description: 'Full Stack Developer experienced in C#/.NET, VueJS 3, and SQL, with a focus on building RESTful APIs using Domain-Driven Design and implementing microservices for efficient frontend integration. Skilled in crafting responsive UIs and optimizing SQL queries for performance.',
            technologies: ['C#', '.NET', 'VueJS 3', 'SQL', 'RESTful APIs', 'Microservices']
        },
        {
            title: 'Jr. Full Stack Software Developer',
            company: 'HACSYS LATAM',
            type: 'Full-time',
            location: 'Hybrid',
            startDate: '2021-06',
            endDate: '2023-05',
            description: 'Building web applications with VueJS, .NET, and SQL Server in a hybrid environment. Collaborated with clients to gather requirements and deliver end-to-end solutions across frontend, backend, and middleware components.',
            technologies: ['VueJS', '.NET', 'SQL Server']
        }
    ]

    const [currentIndex, setCurrentIndex] = useState(0);

    return (
        <section id="experience">
            <h1 className='text-4xl text-primary mb-6'>Job Experience</h1>
            <div className="experience-tabs w-full flex flex-col items-center">
                <div className="tab-list flex flex-wrap gap-2 mb-2 w-full justify-center">
                    {jobs.map((job, idx) => (
                        <Button key={job.company} onClick={() => setCurrentIndex(idx)} active={idx === currentIndex}>
                            {job.company}
                        </Button>
                    ))}
                </div>
                <div className="tab-panel w-full">
                    <div className="job-item p-4 border border-gray-700 rounded-lg w-full">
                        <h2 className='text-2xl mb-2'>{jobs[currentIndex].title}</h2>
                        <h3 className='text-xl mb-1'>{jobs[currentIndex].company} - {jobs[currentIndex].type}</h3>
                        <p className='text-lg mb-1'>{jobs[currentIndex].location}</p>
                        <p className='text-lg text-gray-400 mb-4'>
                            {jobs[currentIndex].startDate} - {jobs[currentIndex].endDate}
                        </p>
                        <p className='mb-4'>{jobs[currentIndex].description}</p>
                        <div className="technologies flex flex-wrap gap-2">
                            {jobs[currentIndex].technologies.map((tech, techIndex) => (
                                <span key={techIndex} className='bg-gray-800 text-white px-3 py-1 rounded-full text-sm'>
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