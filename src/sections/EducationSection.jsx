import { education } from "../config/education";

export default function EducationSection() {
    return (
        <section id="education">
            <h1 className='text-4xl text-primary/80 mb-4'>Education</h1>

            <div className="education-list flex space-x-2 items-center">
                {education.map((edu, index) => (
                    <div key={index} className="education-item p-4 bg-gray-800 border border-gray-700 rounded-lg w-full mb-4">
                        <div className="flex items-center mb-2">
                            <img src={edu.image} alt={edu.institution} className="w-36 h-16 rounded-xl mr-4 object-cover" />
                            <div>
                                <h2 className='text-2xl mb-1 text-primary'>{edu.institution}</h2>
                                <p className='text-lg mb-1 text-gray-400'>{edu.degree}</p>
                                <p className='text-sm text-gray-500'>{edu.startDate} - {edu.endDate}</p>
                            </div>
                        </div>
                        <p className='mb-4'>{edu.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}