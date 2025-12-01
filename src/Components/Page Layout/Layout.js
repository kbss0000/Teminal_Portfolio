import MatrixRain from './MatrixRain';
import React, { useState, useEffect, useRef } from 'react';
import { useAutoComplete } from '../../hooks/useAutoComplete';
import { useCommandHistory } from '../../hooks/useCommandHistory';

const Layout = ({ commands, children, welcomeMessage }) => {
    const [dynamicWelcome, setDynamicWelcome] = useState('');
    const [isInputAllowed, setInputAllowed] = useState(false);
    const [output, setOutput] = useState([]);
    const [input, setInput] = useState('');
    const lastInputRef = useRef('');

    const inputRef = useRef(null);
    const bottomRef = useRef(null);

    // Initialize hooks
    const {
        suggestions,
        selectedIndex,
        selectNext,
        getSuggestions,
        clearSuggestions,
        setSelectedIndex
    } = useAutoComplete(commands);

    const {
        addToHistory,
        navigateHistory
    } = useCommandHistory();

    // Welcome message animation
    useEffect(() => {
        if (!welcomeMessage) return;
        
        setDynamicWelcome('');
        let messageIndex = 0;
        const welcomeText = (welcomeMessage || '').split('');
        const welcomeMessageInterval = setInterval(() => {
            if (messageIndex < welcomeText.length) {
                const char = welcomeText[messageIndex];
                if (char !== undefined && char !== null) {
                    setDynamicWelcome((prev) => prev + char);
                }
                messageIndex++;
            } else {
                setInputAllowed(true);
                clearInterval(welcomeMessageInterval);
                setTimeout(() => inputRef.current?.focus(), 100);
            }
        }, 45);

        return () => clearInterval(welcomeMessageInterval);
    }, [welcomeMessage]);

    // Auto-scroll to bottom
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [output, dynamicWelcome]);

    const handleKeyDown = (e) => {
        if (e.key === 'Tab') {
            e.preventDefault();

            // Check if input has changed since last time
            const inputChanged = input !== lastInputRef.current;
            lastInputRef.current = input;

            // Get suggestions, preserving index only if input hasn't changed
            const currentSuggestions = getSuggestions(input, !inputChanged);
            
            if (currentSuggestions.length === 0) {
                // No matches found
                return;
            } else if (currentSuggestions.length === 1) {
                // Unique match - complete it and add space
                setInput(currentSuggestions[0] + ' ');
                clearSuggestions();
                lastInputRef.current = currentSuggestions[0] + ' ';
            } else {
                // Multiple matches - use current selectedIndex
                const suggestionToUse = currentSuggestions[selectedIndex] || currentSuggestions[0];
                setInput(suggestionToUse);
                lastInputRef.current = suggestionToUse;
                // Move to next suggestion for next Tab press
                selectNext();
            }
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            const prevCmd = navigateHistory('up');
            if (prevCmd !== null) setInput(prevCmd);
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            const nextCmd = navigateHistory('down');
            setInput(nextCmd || '');
        } else if (e.key === 'Enter') {
            e.preventDefault();
            executeCommand();
        }
    };

    const executeCommand = () => {
        const trimmedInput = input.trim();

        // Add to output
        const newOutput = [
            ...output,
            { type: 'command', content: `KBS@Matrix:~$ ${input}` }
        ];

        if (trimmedInput) {
            addToHistory(trimmedInput);

            // Split by one or more spaces to handle multiple spaces between args
            const [cmdName, ...args] = trimmedInput.split(/\s+/);
            const command = commands[cmdName] || commands[cmdName.toLowerCase()];

            if (cmdName.toLowerCase() === 'ls') {
                // Custom `ls` output: show commands in yellow with descriptions
                const isMobile = window.innerWidth < 768;
                const lsText = Object.keys(commands)
                    .filter(cmd => !['ls', 'whoami', 'date', 'pwd'].includes(cmd.toLowerCase()))
                    .map(cmd => (
                        <div key={cmd} style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? '5px' : '20px', marginBottom: isMobile ? '8px' : '0' }}>
                            <span style={{ color: '#ffff00', minWidth: isMobile ? 'auto' : '150px' }}>{cmd}</span>
                            <span style={{ fontSize: isMobile ? 'clamp(11px, 2vw, 13px)' : 'inherit' }}>{commands[cmd]?.description || 'No description available'}</span>
                        </div>
                    ));
                newOutput.push({ type: 'result', content: lsText });
            } else if (command) {
                try {
                    // Spread args so they are passed as individual arguments, matching About.js expectation
                    const result = command.fn(...args);
                    if (result !== undefined && result !== null) {
                        // Convert result to string to handle any type
                        const resultString = String(result);
                        // Handle both real newlines and escaped newlines
                        const formattedResult = resultString.split(/\\n|\n/).map((line, i) => (
                            <div key={i}>{line}</div>
                        ));
                        newOutput.push({ type: 'result', content: formattedResult });
                    }
                } catch (error) {
                    newOutput.push({ type: 'error', content: `Error executing command: ${error.message}` });
                }
            } else if (cmdName.toLowerCase() === 'clear') {
                setOutput([]);
                setInput('');
                return;
            } else if (cmdName.toLowerCase() === 'help') {
                const isMobile = window.innerWidth < 768;
                const helpText = Object.keys(commands).map(cmd => (
                    <div key={cmd} style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? '5px' : '20px', marginBottom: isMobile ? '8px' : '0' }}>
                        <span style={{ color: '#ffff00', minWidth: isMobile ? 'auto' : '150px' }}>{cmd}</span>
                        <span style={{ fontSize: isMobile ? 'clamp(11px, 2vw, 13px)' : 'inherit' }}>{commands[cmd]?.description || 'No description available'}</span>
                    </div>
                ));
                newOutput.push({ type: 'result', content: helpText });
            } else {
                newOutput.push({ type: 'error', content: `Command not found: ${cmdName}. Type 'help' for available commands.` });
            }
        }

        setOutput(newOutput);
        setInput('');
        clearSuggestions();
    };

    const terminalContainerStyle = {
        position: 'absolute',
        border: '5px solid #007500',
        top: '50%',
        left: '50%',
        background: '#000000e6',
        transform: 'translate(-50%, -50%)',
        zIndex: 1,
        width: '90%',
        maxWidth: '900px',
        height: '80%',
        maxHeight: '600px',
        minWidth: '280px',
        minHeight: '300px',
        borderRadius: '5px',
        display: 'flex',
        flexDirection: 'column',
        padding: '15px',
        fontFamily: 'monospace',
        fontSize: 'clamp(12px, 2.5vw, 15px)',
        color: '#00FF00',
        overflow: 'hidden',
        boxShadow: '0 0 20px rgba(0, 255, 0, 0.2)'
    };

    const outputAreaStyle = {
        flex: 1,
        overflowY: 'auto',
        marginBottom: '10px',
        paddingRight: '10px'
    };

    const inputAreaStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        position: 'relative' // For suggestions positioning
    };

    const inputStyle = {
        background: 'transparent',
        border: 'none',
        color: '#00FF00',
        fontFamily: 'monospace',
        fontSize: 'clamp(12px, 2.5vw, 15px)',
        flex: 1,
        outline: 'none',
        caretColor: '#00FF00',
        width: '100%'
    };

    const suggestionsStyle = {
        display: 'flex',
        gap: '8px',
        marginBottom: '5px',
        flexWrap: 'wrap',
        color: '#00aa00',
        fontSize: 'clamp(10px, 2vw, 12px)'
    };

    return (
        <div style={{ position: 'relative', height: '100vh', width: '100vw', overflow: 'hidden', touchAction: 'manipulation' }}>
            <MatrixRain style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: -1 }} />

            <div className="terminal-container" style={terminalContainerStyle}>
                <div style={outputAreaStyle} onClick={() => inputRef.current?.focus()}>
                    <div style={{ marginBottom: '20px' }}>
                        {dynamicWelcome}
                    </div>

                    {output.map((line, index) => (
                        <div key={index} style={{ marginBottom: '5px', color: line.type === 'error' ? '#ff5555' : '#00FF00' }}>
                            {line.content || ''}
                        </div>
                    ))}
                    <div ref={bottomRef} />
                </div>

                {isInputAllowed && (
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        {/* Suggestions Bar */}
                        {suggestions.length > 0 && (
                            <div style={suggestionsStyle}>
                                {suggestions.map(s => (
                                    <span key={s} style={{ background: '#003300', padding: '2px 5px', borderRadius: '3px' }}>
                                        {s}
                                    </span>
                                ))}
                            </div>
                        )}
                        <div style={inputAreaStyle}>
                            <span style={{ color: '#00FF00', fontWeight: 'bold', fontSize: 'clamp(12px, 2.5vw, 15px)', whiteSpace: 'nowrap' }}>KBS@Matrix:~$</span>
                            <input
                                ref={inputRef}
                                type="text"
                                value={input}
                                onChange={(e) => {
                                    const newValue = e.target.value;
                                    setInput(newValue);
                                    lastInputRef.current = newValue;
                                    getSuggestions(newValue);
                                }}
                                onKeyDown={handleKeyDown}
                                style={inputStyle}
                                autoFocus
                                spellCheck={false}
                                autoComplete="off"
                            />
                        </div>
                    </div>
                )}
            </div>
            {children}
        </div>
    );
};

export default Layout;
