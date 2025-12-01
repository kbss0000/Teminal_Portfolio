import { useState, useCallback, useMemo, useRef, useEffect } from 'react';

/**
 * Custom hook for command autocomplete functionality
 * Adapted from terminal-portfolio reference
 */
export function useAutoComplete(commands) {
    const [suggestions, setSuggestions] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const suggestionsRef = useRef([]);

    // Keep ref in sync with state
    useEffect(() => {
        suggestionsRef.current = suggestions;
    }, [suggestions]);

    // Memoize sorted commands for performance
    const sortedCommands = useMemo(() => {
        // Handle both array of strings and object keys
        const cmdList = Array.isArray(commands) ? commands : Object.keys(commands);
        return [...cmdList].sort();
    }, [commands]);

    const getSuggestions = useCallback((input, preserveIndex = false) => {
        if (!input || !input.trim()) {
            setSuggestions([]);
            setSelectedIndex(0);
            return [];
        }

        const filtered = sortedCommands.filter(cmd =>
            cmd.toLowerCase().startsWith(input.toLowerCase())
        );

        setSuggestions(filtered);
        suggestionsRef.current = filtered;
        
        // Only reset selectedIndex if we're not preserving it (e.g., when user types)
        if (!preserveIndex) {
            setSelectedIndex(0);
        } else {
            // Ensure selectedIndex is within bounds
            setSelectedIndex(prevIndex => {
                if (prevIndex >= filtered.length) {
                    return 0;
                }
                return prevIndex;
            });
        }
        
        return filtered;
    }, [sortedCommands]);

    const clearSuggestions = useCallback(() => {
        setSuggestions([]);
        suggestionsRef.current = [];
        setSelectedIndex(0);
    }, []);

    const selectNext = useCallback(() => {
        setSelectedIndex(prevIndex => {
            const currentSuggestions = suggestionsRef.current;
            if (currentSuggestions.length === 0) {
                return 0;
            }
            return (prevIndex + 1) % currentSuggestions.length;
        });
    }, []);

    const setSelectedIndexDirect = useCallback((index) => {
        setSelectedIndex(index);
    }, []);

    return {
        suggestions,
        selectedIndex,
        getSuggestions,
        clearSuggestions,
        selectNext,
        setSelectedIndex: setSelectedIndexDirect
    };
}
