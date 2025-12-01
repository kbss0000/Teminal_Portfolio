import { useState, useCallback, useRef, useEffect } from 'react';

/**
 * Custom hook for managing command history
 * Adapted from terminal-portfolio reference
 */
export function useCommandHistory(maxSize = 50) {
    const [history, setHistory] = useState([]);
    const [pointer, setPointer] = useState(-1);
    const historyRef = useRef([]);

    // Sync ref with state for performance
    useEffect(() => {
        historyRef.current = history;
    }, [history]);

    const addToHistory = useCallback((command) => {
        setHistory(prev => {
            // Only add if different from last command
            if (prev.length > 0 && prev[prev.length - 1] === command) {
                return prev;
            }

            const newHistory = [...prev, command];

            // Hard cap at maxSize
            if (newHistory.length > maxSize) {
                return newHistory.slice(-maxSize);
            }

            return newHistory;
        });
        setPointer(-1);
    }, [maxSize]);

    const navigateHistory = useCallback((direction) => {
        const currentHistory = historyRef.current;

        if (currentHistory.length === 0) return null;

        let newPointer;
        if (direction === 'up') {
            // If we haven't started navigating yet (pointer is -1), start at the end
            const startPointer = pointer === -1 ? currentHistory.length : pointer;
            newPointer = Math.max(0, startPointer - 1);
        } else {
            // Down navigation
            newPointer = Math.min(pointer + 1, currentHistory.length);
        }

        setPointer(newPointer);

        if (newPointer >= currentHistory.length) return '';
        return currentHistory[newPointer];
    }, [pointer]);

    return {
        history,
        addToHistory,
        navigateHistory
    };
}
