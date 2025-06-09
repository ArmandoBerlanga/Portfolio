import AboutMeSection from '../sections/AboutMeSection';
import ContactSection from '../sections/ContactSection';
import EducationSection from '../sections/EducationSection';
import ExperienceSection from '../sections/ExperienceSection';
import ProjectsSection from '../sections/ProjectsSection';

export default function HomePage() {
    return (
        <div id='home-page' className='flex flex-col space-y-20 pt-20'>
            <AboutMeSection />
            <ExperienceSection />
            <EducationSection />
            <ProjectsSection />
            <ContactSection />
        </div>
    );
}