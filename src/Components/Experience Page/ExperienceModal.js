import React, { useState, useEffect } from 'react';

const ModalComponent = ({ isOpen, onClose, modalText }) => {
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
            </div>
        </div>
    );
};

const volteoContent = `
<h2>Cloud and DevOps Intern</h2>
<p><strong>Volteo Maritime India Pvt. Ltd.</strong> | Kakinada, Andhra Pradesh | April 2025 – June 2025</p>
<p>Managed Kubernetes clusters for Wayship SaaS, ensuring 99.9% uptime for vessel IoT telemetry. Developed automated CI/CD pipelines for maritime systems, reducing deployment turnaround time by 40%. Optimized AWS resource allocation and autoscaling policies, lowering operational cloud costs by 25%.</p>
<p><strong>Technologies:</strong> Kubernetes, Docker, AWS (EC2, S3, IAM, Auto Scaling), CI/CD pipelines</p>
`;

const vitalitysoftContent = `
<h2>Full Stack Developer Intern</h2>
<p><strong>Vitalitysoft IT Services (OPC) Pvt. Ltd.</strong> | Hyderabad, Telangana | June 2025 – August 2025</p>
<p>Added dynamic JSON-LD schema, improving rich-result eligibility and increasing CTR by 35%. Integrated SSR and performance tuning, improving Core Web Vitals and boosting organic traffic by 40%. Optimized bundling, caching, and compression, reducing load time by 50% and raising Lighthouse SEO scores.</p>
<p><strong>Technologies:</strong> React, Next.js, Server-Side Rendering (SSR), Web optimization, SEO, JSON-LD schema</p>
`;

const VolteoModal = (props) => <ModalComponent {...props} modalText={volteoContent} />;
const VitalitysoftModal = (props) => <ModalComponent {...props} modalText={vitalitysoftContent} />;

export { VolteoModal, VitalitysoftModal };

