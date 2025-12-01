import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../Components/Page Layout/Layout';
import { OracleJavaModal, OracleCloudModal } from "../Components/Certs Page/CertsModal";

const Certs = () => {
    const navigate = useNavigate();
    const [isClosing, setIsClosing] = useState(false);
    const [isOracleJavaOpen, setIsOracleJavaOpen] = useState(false);
    const [isOracleCloudOpen, setIsOracleCloudOpen] = useState(false);

    const closeModal = (modalType) => {
        if (isClosing) return;

        setIsClosing(true);
        setTimeout(() => {
            if (modalType === 'oracleJava') {
                setIsOracleJavaOpen(false);
            } else if (modalType === 'oracleCloud') {
                setIsOracleCloudOpen(false);
            }
            setIsClosing(false);
        }, 1500);
    };

    const commands = React.useMemo(() => ({
        certs: {
            description: 'You are here',
            fn: function () {
                return 'You are already at the Certs page';
            }
        },
        ls: {
            description: 'List all certifications',
            fn: function () {
                return 'oracle_java_associate\\noracle_cloud_ai_infrastructure';
            }
        },
        about: {
            description: 'Go to About page',
            fn: function () {
                setTimeout(function () {
                    navigate('/about');
                }, 1200);
                return 'Redirecting to About page...';
            }
        },
        projects: {
            description: 'Go to Projects page',
            fn: function () {
                setTimeout(function () {
                    navigate('/projects');
                }, 1200);
                return 'Redirecting to the projects Page ...';
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
        oracle_java_associate: {
            description: 'Oracle Java Associate Certification',
            fn: function () {
                setTimeout(function () {
                    setIsOracleJavaOpen(true);
                }, 1200);
                return "Opening Oracle Java Associate Certification...";
            }
        },
        oracle_cloud_ai_infrastructure: {
            description: 'Oracle Cloud AI Infrastructure Certification',
            fn: function () {
                setTimeout(function () {
                    setIsOracleCloudOpen(true);
                }, 1200);
                return 'Opening Oracle Cloud AI Infrastructure Certification...';
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
                return '/home/kbs/certs';
            }
        }
    }), [navigate]);

    return (
        <Layout commands={commands} welcomeMessage="Enter command 'ls' to see my certifications. Use 'cd' to go back to the main page.">
            {isOracleJavaOpen && !isClosing && (
                <OracleJavaModal isOpen={isOracleJavaOpen} onClose={() => closeModal('oracleJava')} />
            )}
            {isOracleCloudOpen && !isClosing && (
                <OracleCloudModal isOpen={isOracleCloudOpen} onClose={() => closeModal('oracleCloud')} />
            )}
        </Layout>
    );
};

export default Certs;
