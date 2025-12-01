import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../Components/Page Layout/Layout';
import '../Styles/styles.css';
import { BioModal, ResumeModal } from "../Components/About Page/AboutModal";

const About = () => {
    const navigate = useNavigate();
    const [isBioOpen, setIsBioOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [isResumeOpen, setIsResumeOpen] = useState(false);

    const closeModal = (modalType) => {
        if (isClosing) return;

        setIsClosing(true);
        setTimeout(() => {
            if (modalType === 'bio') {
                setIsBioOpen(false);
            } else if (modalType === 'resume') {
                setIsResumeOpen(false);
            }
            setIsClosing(false);
        }, 1500);
    };

    const commands = React.useMemo(() => ({
        ls: {
            description: 'Show everything on the page',
            fn: function () {
                return 'resume\\nlinkedin\\ngithub\\nemail\\nbio';
            }
        },
        about: {
            description: 'You are here',
            fn: function () {
                return 'You are already at the about page';
            }
        },
        cd: {
            description: 'Go back',
            fn: function () {
                setTimeout(function () {
                    navigate('/');
                }, 1200);
                return 'redirecting to the main page ...';
            }
        },
        resume: {
            description: 'Open my resume',
            fn: function () {
                setTimeout(function () {
                    setIsResumeOpen(true);
                }, 1200);
                return 'Here it comes...';
            }
        },
        linkedin: {
            description: 'Go to Linkedin profile',
            fn: function () {
                setTimeout(function () {
                    window.open('https://www.linkedin.com/in/kbssrikar/', '_blank');
                }, 1200);
                return 'Redirecting to the Linkedin Profile ...';
            }
        },
        github: {
            description: 'Go to Github profile',
            fn: function () {
                setTimeout(function () {
                    window.open('https://www.github.com/kbss0000/', '_blank');
                }, 1200);
                return 'Redirecting to the Github Profile ...';
            }
        },
        email: {
            description: 'Shoot me an email',
            fn: function () {
                setTimeout(function () {
                    window.open('mailto:kbsivasrikar@gmail.com', '_blank');
                }, 1200);
                return 'I tend to respond quick';
            }
        },
        bio: {
            description: 'A little about me',
            fn: function () {
                setTimeout(function () {
                    setIsBioOpen(true);
                }, 1200);
                return 'Get to know me more...';
            }
        },
        whoami: {
            description: 'Current user',
            fn: function () {
                return 'KBS';
            }
        },
        date: {
            description: 'Current date',
            fn: function () {
                return new Date().toString();
            }
        },
        pwd: {
            description: 'Print working directory',
            fn: function () {
                return '/home/kbs/about';
            }
        }
    }), [navigate]);

    return (
        <Layout commands={commands} welcomeMessage="You've made it to the About page. Enter the command 'ls' to find out more. Use 'cd' to go back to the main page.">
            {isBioOpen && !isClosing && (
                <BioModal isOpen={isBioOpen} onClose={() => closeModal('bio')} />
            )}
            {isResumeOpen && !isClosing && (
                <ResumeModal isOpen={isResumeOpen} onClose={() => closeModal('resume')} />
            )}
        </Layout>
    );
};

export default About;
