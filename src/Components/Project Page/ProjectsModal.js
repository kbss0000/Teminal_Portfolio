import React, { useState, useEffect } from 'react';
import StudyFlowContent from './PageContent/StudyFlowContent';
import HandwrittenEquationSolverContent from './PageContent/HandwrittenEquationSolverContent';
import CardioRiskAnalyzerContent from './PageContent/CardioRiskAnalyzerContent';

const ModalComponent = ({ isOpen, onClose, modalText, images }) => {
    const [visibleText, setVisibleText] = useState('');
    const [typingIndex, setTypingIndex] = useState(0);
    const typingSpeed = 8;

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            window.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);

    useEffect(() => {
        let intervalId;

        if (isOpen && modalText) {
            intervalId = setInterval(() => {
                setVisibleText(prevText => {
                    if (typingIndex >= modalText.length) {
                        clearInterval(intervalId);
                        return prevText;
                    }
                    const nextChar = modalText[typingIndex];
                    return prevText + (nextChar || '');
                });

                setTypingIndex(prevIndex => {
                    if (prevIndex >= modalText.length) {
                        return prevIndex;
                    }
                    return prevIndex + 1;
                });
            }, typingSpeed);
        }

        return () => {
            if (intervalId) clearInterval(intervalId);
        };
    }, [isOpen, typingIndex, modalText]);

    useEffect(() => {
        if (!isOpen) {
            setVisibleText('');
            setTypingIndex(0);
        }
    }, [isOpen]);

    useEffect(() => {
        if (visibleText.endsWith('undefined')) {
            setVisibleText(prevText => prevText.replace(/undefined$/g, ''));
        }
    }, [visibleText]);

    return (
        <div className={isOpen ? 'modal open' : 'modal'}>
            <div className="modal-content">
                <span className="close" onClick={onClose}>
                    &times;
                </span>
                <div dangerouslySetInnerHTML={{ __html: visibleText }}></div>
                {images && images.map((img, idx) => (
                    <img key={idx} src={img} alt={`Visual content ${idx + 1}`} />
                ))}
            </div>
        </div>
    );
};

const StudyFlowModal = (props) => <ModalComponent {...props} modalText={StudyFlowContent} />;
const HandwrittenEquationSolverModal = (props) => <ModalComponent {...props} modalText={HandwrittenEquationSolverContent} />;
const CardioRiskAnalyzerModal = (props) => <ModalComponent {...props} modalText={CardioRiskAnalyzerContent} />;

export { StudyFlowModal, HandwrittenEquationSolverModal, CardioRiskAnalyzerModal };