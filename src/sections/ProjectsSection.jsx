import { useState } from "react";
import { projects } from "../config/projects";
import { Button } from "../components/Button";

export default function ProjectsSection() {
    const [showAll, setShowAll] = useState(false);

    const itemsPerRow = 2;
    const itemsToShow = showAll ? projects : projects.slice(0, itemsPerRow);
    return (
        <section id="projects" className="py-20 bg-gradient-to-br from-white via-slate-50 to-slate-200 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-500 rounded-2xl">
            <h2 className="text-4xl md:text-5xl font-extrabold text-primary/90 mb-10 text-center tracking-tight drop-shadow-sm">Projects</h2>
            <div className={`projects-list ${projects.length === 1 ? 'max-w-4xl' : 'grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl'} mx-auto px-4 md:px-0`}>
                {itemsToShow.map((project, index) => (
                    <div key={index} className="project-card bg-white/90 dark:bg-slate-800/90 border border-primary/10 dark:border-slate-700 rounded-2xl shadow-xl p-8 flex flex-col transition-colors duration-300">
                        <h3 className="text-2xl md:text-3xl font-bold mb-2 text-primary drop-shadow-sm">{project.title}</h3>
                        <p className="text-base md:text-lg mb-1 text-slate-500 dark:text-slate-300 font-medium">
                            {project.institution} <span className="mx-2">|</span> {project.date}
                        </p>
                        <p className="project-description text-slate-700 dark:text-slate-200 text-base md:text-lg leading-relaxed mb-4">{project.description}</p>
                        <div className="flex flex-wrap gap-2 mt-2 mb-6">
                            {project.skills.map((skill, i) => (
                                <span key={i} className="bg-primary/10 text-primary font-semibold px-3 py-1 rounded-full text-xs shadow-sm border border-primary/20">{skill}</span>
                            ))}
                        </div>
                        {project.image && (
                            <img src={project.image} alt={project.title} className="w-full h-full object-cover rounded-xl mt-1 border border-primary/20 shadow-md bg-white dark:bg-slate-900" />
                        )}
                    </div>
                ))}
            </div>
            {(!showAll && projects.length > itemsPerRow) && (
                <div className="flex justify-center mt-8">
                    <Button
                        onClick={() => setShowAll(true)}
                    >
                        Show more
                    </Button>
                </div>
            )}
            {(showAll && projects.length > itemsPerRow) && (
                <div className="flex justify-center mt-8">
                    <Button
                        onClick={() => setShowAll(false)}
                    >
                        Show less
                    </Button>
                </div>
            )}
        </section>
    );
}