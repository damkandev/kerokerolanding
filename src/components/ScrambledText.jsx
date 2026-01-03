'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import './ScrambledText.css';

const ScrambledText = ({
    radius = 3,
    duration = 0.2,
    speed = 0.5,
    scrambleChars = '.:',
    className = '',
    style = {},
    highlightWords = [],
    children
}) => {
    const rootRef = useRef(null);
    const charsRef = useRef([]);
    const originalChars = useRef([]);
    const intervalsRef = useRef([]);

    const scrambleChar = useCallback((el, originalChar, index) => {
        // Clear any existing interval for this char
        if (intervalsRef.current[index]) {
            clearInterval(intervalsRef.current[index]);
        }

        const chars = scrambleChars.split('');
        const steps = Math.floor(duration / speed * 10);
        let step = 0;

        intervalsRef.current[index] = setInterval(() => {
            if (step >= steps) {
                el.textContent = originalChar;
                clearInterval(intervalsRef.current[index]);
                intervalsRef.current[index] = null;
                return;
            }
            el.textContent = chars[Math.floor(Math.random() * chars.length)];
            step++;
        }, speed * 100);
    }, [scrambleChars, duration, speed]);

    useEffect(() => {
        if (!rootRef.current) return;

        const text = typeof children === 'string' ? children : '';
        originalChars.current = text.split('');

        return () => {
            // Cleanup intervals
            intervalsRef.current.forEach(interval => {
                if (interval) clearInterval(interval);
            });
        };
    }, [children]);

    useEffect(() => {
        if (!rootRef.current) return;

        const charElements = rootRef.current.querySelectorAll('.char');
        charsRef.current = Array.from(charElements);

        charsRef.current.forEach((c, i) => {
            c.dataset.content = originalChars.current[i];
            c.dataset.index = i;
        });

        const handleMove = (e) => {
            charsRef.current.forEach((c, i) => {
                const rect = c.getBoundingClientRect();
                const dx = e.clientX - (rect.left + rect.width / 2);
                const dy = e.clientY - (rect.top + rect.height / 2);
                const dist = Math.hypot(dx, dy);

                if (dist < radius && !intervalsRef.current[i]) {
                    scrambleChar(c, originalChars.current[i], i);
                }
            });
        };

        const el = rootRef.current;
        el.addEventListener('pointermove', handleMove);

        return () => {
            el.removeEventListener('pointermove', handleMove);
        };
    }, [radius, scrambleChar, children]);

    // Parse text and create spans with highlights
    const renderText = () => {
        const text = typeof children === 'string' ? children : '';
        let result = [];
        let currentIndex = 0;
        let charIndex = 0;

        // Find all highlight positions
        const highlights = [];
        highlightWords.forEach(word => {
            let searchIndex = 0;
            while (true) {
                const found = text.indexOf(word, searchIndex);
                if (found === -1) break;
                highlights.push({ start: found, end: found + word.length, word });
                searchIndex = found + 1;
            }
        });
        highlights.sort((a, b) => a.start - b.start);

        highlights.forEach(({ start, end }) => {
            // Add non-highlighted chars before this highlight
            if (currentIndex < start) {
                for (let i = currentIndex; i < start; i++) {
                    result.push(
                        <span key={charIndex} className="char">
                            {text[i]}
                        </span>
                    );
                    charIndex++;
                }
            }
            // Add highlighted chars
            for (let i = start; i < end; i++) {
                result.push(
                    <span key={charIndex} className="char highlight">
                        {text[i]}
                    </span>
                );
                charIndex++;
            }
            currentIndex = end;
        });

        // Add remaining chars
        for (let i = currentIndex; i < text.length; i++) {
            result.push(
                <span key={charIndex} className="char">
                    {text[i]}
                </span>
            );
            charIndex++;
        }

        return result;
    };

    return (
        <span ref={rootRef} className={`scrambled-text ${className}`} style={style}>
            {renderText()}
        </span>
    );
};

export default ScrambledText;
