import { PlainButton, IconButton } from '../components/Button';

export default function HomePage() {
    const openResume = () => {
        window.open('/resume.pdf', '_blank');
    }

    return (
        <div className="flex flex-col justify-center min-h-screen bg-primary text-white px-32 text-left">
            <section id="about-me">
                <div className="about-me-content flex">
                    <div className="about-me-description mr-20">
                        <h1 className='text-6xl mb-6'>Hi, I'm Armando Berlanga!</h1>

                        <h2 className='text-4xl mb-4'>
                            I'm a Senior Software Engineer who thrives on continuous learning and excels at
                            delivering robust, scalable solutions.
                        </h2>

                        <p className="text-2xl">
                            With extensive full-stack development experience
                            and a resilient, adaptable mindset, I seamlessly integrate into large-scale Scrum teams
                            to drive impactful results.
                        </p>
                    </div>
                    
                    <img src="src/assets/me.png" alt="Armando Berlanga" className="w-80 h-80 rounded-xl inline-block mr-2 object-cover" />
                </div>

                <div className="about-me-go-to flex">
                    <PlainButton className='text-white' onClick={openResume}>
                        Resume
                    </PlainButton>

                    <IconButton icon='code' />
                    <IconButton icon='link' />
                </div>
            </section>

        </div>
    );
}