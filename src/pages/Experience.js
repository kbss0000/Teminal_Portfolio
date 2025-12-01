import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../Components/Page Layout/Layout';
import { VolteoModal, VitalitysoftModal } from "../Components/Experience Page/ExperienceModal";

const Experience = () => {
    const navigate = useNavigate();
    const [isClosing, setIsClosing] = useState(false);
    const [isVolteoOpen, setIsVolteoOpen] = useState(false);
    const [isVitalitysoftOpen, setIsVitalitysoftOpen] = useState(false);

    const closeModal = (modalType) => {
        if (isClosing) return;

        setIsClosing(true);
        setTimeout(() => {
            if (modalType === 'volteo') {
                setIsVolteoOpen(false);
            } else if (modalType === 'vitalitysoft') {
                setIsVitalitysoftOpen(false);
            }
            setIsClosing(false);
        }, 1500);
    };

    const commands = React.useMemo(() => ({
        experience: {
            description: 'You are here',
            fn: function () {
                return 'You are already at the Experience page';
            }
        },
        ls: {
            description: 'List all work experiences',
            fn: function () {
                return 'volteo\\nvitalitysoft';
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
        volteo: {
            description: 'Cloud and DevOps Intern at Volteo Maritime',
            fn: function () {
                setTimeout(function () {
                    setIsVolteoOpen(true);
                }, 1200);
                return 'Opening Volteo Maritime experience...';
            }
        },
        vitalitysoft: {
            description: 'Full Stack Developer Intern at Vitalitysoft',
            fn: function () {
                setTimeout(function () {
                    setIsVitalitysoftOpen(true);
                }, 1200);
                return 'Opening Vitalitysoft experience...';
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
                return '/home/kbs/experience';
            }
        }
    }), [navigate]);

    return (
        <Layout commands={commands} welcomeMessage="Enter command 'ls' to see my work experience. Use 'cd' to go back to the main page.">
            {isVolteoOpen && !isClosing && (
                <VolteoModal isOpen={isVolteoOpen} onClose={() => closeModal('volteo')} />
            )}
            {isVitalitysoftOpen && !isClosing && (
                <VitalitysoftModal isOpen={isVitalitysoftOpen} onClose={() => closeModal('vitalitysoft')} />
            )}
        </Layout>
    );
};

export default Experience;

