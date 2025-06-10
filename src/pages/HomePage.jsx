import AboutMeSection from '../sections/AboutMeSection';
import CertificationsSection from '../sections/CertificationsSection';
import ContactSection from '../sections/ContactSection';
import EducationSection from '../sections/EducationSection';
import ExperienceSection from '../sections/ExperienceSection';
import ProjectsSection from '../sections/ProjectsSection';

export default function HomePage() {
    return (
        <div id='home-page' className='flex flex-col pt-10'>
            <AboutMeSection />
            <div className="separator bg-primary my-5"></div>
            <ExperienceSection />
            <div className="separator bg-primary my-5"></div>
            <EducationSection />
            <div className="separator bg-primary my-5"></div>
            <CertificationsSection />
            <div className="separator bg-primary my-5"></div>
            <ProjectsSection />
            <div className="separator bg-primary my-5"></div>
            <ContactSection />
        </div>
    );
}