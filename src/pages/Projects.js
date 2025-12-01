import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../Components/Page Layout/Layout';
import { StudyFlowModal, HandwrittenEquationSolverModal, CardioRiskAnalyzerModal } from "../Components/Project Page/ProjectsModal";

const Projects = () => {
    const navigate = useNavigate();
    const [isClosing, setIsClosing] = useState(false);
    const [isStudyFlowModalOpen, setIsStudyFlowModalOpen] = useState(false);
    const [isHandwrittenEquationSolverModalOpen, setIsHandwrittenEquationSolverModalOpen] = useState(false);
    const [isCardioRiskAnalyzerModalOpen, setIsCardioRiskAnalyzerModalOpen] = useState(false);

    const closeModal = (modalType) => {
        if (isClosing) return;

        setIsClosing(true);
        setTimeout(() => {
            switch (modalType) {
                case 'studyflow':
                    setIsStudyFlowModalOpen(false);
                    break;
                case 'equationsolver':
                    setIsHandwrittenEquationSolverModalOpen(false);
                    break;
                case 'cardioanalyzer':
                    setIsCardioRiskAnalyzerModalOpen(false);
                    break;
                default:
                    break;
            }
            setIsClosing(false);
        }, 1500);
    };

    const commands = React.useMemo(() => ({
        ls: {
            description: 'List all projects on the page',
            fn: function () {
                return 'studyflow\\nequationsolver\\ncardioanalyzer';
            }
        },
        projects: {
            description: 'You are here',
            fn: function () {
                return 'You are already at the projects page';
            }
        },
        cd: {
            description: 'Go back',
            fn: function () {
                setTimeout(function () {
                    navigate('/');
                }, 1200);
                return 'redirecting to main page...';
            }
        },
        studyflow: {
            description: 'Study Flow: AI-Powered Productivity Suite',
            fn: function () {
                setTimeout(function () {
                    setIsStudyFlowModalOpen(true);
                }, 1200);
                return 'Fetching details about Study Flow...';
            }
        },
        equationsolver: {
            description: 'Handwritten Equation Solver',
            fn: function () {
                setTimeout(function () {
                    setIsHandwrittenEquationSolverModalOpen(true);
                }, 1200);
                return 'Fetching details about Handwritten Equation Solver...';
            }
        },
        cardioanalyzer: {
            description: 'Cardio Risk Analyzer',
            fn: function () {
                setTimeout(function () {
                    setIsCardioRiskAnalyzerModalOpen(true);
                }, 1200);
                return 'Fetching details about Cardio Risk Analyzer...';
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
                return '/home/kbs/projects';
            }
        }
    }), [navigate]);

    return (
        <Layout commands={commands} welcomeMessage="Enter command 'ls' to see some cool stuff I built. Use 'cd' to go back to the main page." >
            {isStudyFlowModalOpen && !isClosing && (
                <StudyFlowModal isOpen={isStudyFlowModalOpen} onClose={() => closeModal('studyflow')} />
            )}
            {isHandwrittenEquationSolverModalOpen && !isClosing && (
                <HandwrittenEquationSolverModal isOpen={isHandwrittenEquationSolverModalOpen} onClose={() => closeModal('equationsolver')} />
            )}
            {isCardioRiskAnalyzerModalOpen && !isClosing && (
                <CardioRiskAnalyzerModal isOpen={isCardioRiskAnalyzerModalOpen} onClose={() => closeModal('cardioanalyzer')} />
            )}
        </Layout>
    );
};

export default Projects;
