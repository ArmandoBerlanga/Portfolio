import { OutlinedButton, ImageButton } from '../components/Button';

export default function AboutMeSection() {
    const openResume = () => {
        window.open('/resume.pdf', '_blank');
    }

    const goToCode = () => {
        window.open('https://github.com/ArmandoBerlanga', '_blank');
    }

    const goToLinkedIn = () => {
        window.open('https://www.linkedin.com/in/armandoberlanga', '_blank');
    }

    return (
        <section id="about-me">
            <div className="about-me-content flex">
                <div className="about-me-description mr-20">
                    <h1 className='text-6xl mb-6 opacity-70'>Hi, I'm <span className='text-primary'>Armando Berlanga</span>!</h1>

                    <h2 className='text-4xl mb-4 opacity-100'>
                        A <span className='text-primary'>Senior Software Engineer</span> who thrives on continuous learning and excels at
                        delivering robust, scalable solutions.
                    </h2>

                    <p className="text-2xl opacity-80">
                        With extensive <span className='text-primary'>full-stack</span> development experience
                        and a <span className='text-primary'>resilient</span>, <span className='text-primary'>adaptable</span> mindset,
                        I seamlessly integrate into large-scale Scrum teams to drive impactful results.
                    </p>

                    <div className="stack mt-4">
                        <img src="src/assets/stack/net.svg" alt=".NET" className="w-8 h-8 rounded-xl inline-block mr-2 object-cover" />
                        <img src="src/assets/stack/python.png" alt="Python" className="w-8 h-8 rounded-xl inline-block mr-2 object-cover" />
                        <img src="src/assets/stack/vue.jpg" alt="VueJS" className="w-8 h-8 rounded-xl inline-block mr-2 object-cover" />
                        <img src="src/assets/stack/react.png" alt="React" className="w-8 h-8 rounded-xl inline-block mr-2 object-cover" />
                        <img src="src/assets/stack/azure.jpeg" alt="Azure" className="w-8 h-8 rounded-xl inline-block mr-2 object-cover" />
                        <img src="src/assets/stack/gcp.png" alt="GCP" className="w-8 h-8 rounded-xl inline-block mr-2 object-cover" />
                    </div>
                </div>

                <img src="src/assets/me.png" alt="Armando Berlanga" className="w-90 h-90 rounded-xl inline-block mr-2 object-cover" />
            </div>

            <div className="about-me-go-to flex space-x-1">
                <OutlinedButton className='text-white' onClick={openResume}>
                    Resume
                </OutlinedButton>

                <ImageButton src='src/assets/github.svg' alt='GitHub' onClick={goToCode} />
                <ImageButton src='src/assets/linkedin.svg' alt='LinkedIn' onClick={goToLinkedIn} />
            </div>
        </section>
    );
}