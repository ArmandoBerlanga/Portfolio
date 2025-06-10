import AboutMeSection from '../sections/AboutMeSection';
import ContactSection from '../sections/ContactSection';
import EducationSection from '../sections/EducationSection';
import ExperienceSection from '../sections/ExperienceSection';
import ProjectsSection from '../sections/ProjectsSection';

export default function HomePage() {
    return (
        <div id='home-page' className='flex flex-col pt-20'>
            <AboutMeSection />
            <div className="separator bg-primary my-10 min-h-0.5 opacity-20"></div>
            <ExperienceSection />
            <div className="separator bg-primary my-10 min-h-0.5 opacity-20"></div>
            <EducationSection />
            <div className="separator bg-primary my-10 min-h-0.5 opacity-20"></div>
            <ProjectsSection />
            <div className="separator bg-primary my-10 min-h-0.5 opacity-20"></div>
            <ContactSection />
        </div>
    );
}