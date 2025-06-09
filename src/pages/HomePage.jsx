import AboutMeSection from '../sections/AboutMeSection';
import ContactSection from '../sections/ContactSection';
import EducationSection from '../sections/EducationSection';
import ExperienceSection from '../sections/ExperienceSection';
import ProjectsSection from '../sections/ProjectsSection';

export default function HomePage() {
    return (
        <>
            <AboutMeSection />
            <ExperienceSection />
            <EducationSection />
            <ProjectsSection />
            <ContactSection />
        </>
    );
}