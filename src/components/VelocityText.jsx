'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const VelocityText = ({ className = '', delay = .5 }) => {
    const containerRef = useRef(null);
    const triggerRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const chars = containerRef.current.querySelectorAll('.vel-char');

        const resetAnimation = () => {
            gsap.set(chars, {
                opacity: 0,
                y: 20,
                scale: 0.5
            });
        };

        const playAnimation = () => {
            // Animate "vel" normally
            gsap.to(chars[0], { // v
                opacity: 1, y: 0, scale: 1,
                duration: 0.1, delay: delay, ease: 'power2.out'
            });
            gsap.to(chars[1], { // e
                opacity: 1, y: 0, scale: 1,
                duration: 0.1, delay: delay + 0.05, ease: 'power2.out'
            });
            gsap.to(chars[2], { // l
                opacity: 1, y: 0, scale: 1,
                duration: 0.1, delay: delay + 0.1, ease: 'power2.out'
            });

            // Animate "oooooo" with bounce effect - rapid fire with elastic
            const oChars = [chars[3], chars[4], chars[5], chars[6], chars[7], chars[8]];
            oChars.forEach((char, i) => {
                gsap.to(char, {
                    opacity: 1,
                    y: 0,
                    scale: 1.3,
                    duration: 0.08,
                    delay: delay + 0.15 + (i * 0.03), // Rapid succession
                    ease: 'back.out(3)',
                    onComplete: () => {
                        gsap.to(char, {
                            scale: 1,
                            duration: 0.2,
                            ease: 'elastic.out(1, 0.3)'
                        });
                    }
                });
            });

            // Animate "cidad" after the o's
            const endChars = [chars[9], chars[10], chars[11], chars[12], chars[13]]; // c, i, d, a, d
            endChars.forEach((char, i) => {
                gsap.to(char, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.1,
                    delay: delay + 0.4 + (i * 0.04),
                    ease: 'power2.out'
                });
            });
        };

        // Set initial state
        resetAnimation();

        triggerRef.current = ScrollTrigger.create({
            trigger: containerRef.current,
            start: 'top 80%',
            onEnter: playAnimation,
            onEnterBack: playAnimation,
            onLeave: resetAnimation,
            onLeaveBack: resetAnimation
        });

        return () => {
            if (triggerRef.current) {
                triggerRef.current.kill();
            }
        };
    }, [delay]);

    // vel + oooooo + cidad = velocidad with stretched o's
    return (
        <span ref={containerRef} className={`inline-block ${className}`}>
            <span className="vel-char inline-block">v</span>
            <span className="vel-char inline-block">e</span>
            <span className="vel-char inline-block">l</span>
            <span className="vel-char inline-block ">o</span>
            <span className="vel-char inline-block ">o</span>
            <span className="vel-char inline-block ">o</span>
            <span className="vel-char inline-block ">o</span>
            <span className="vel-char inline-block ">o</span>
            <span className="vel-char inline-block ">o</span>
            <span className="vel-char inline-block">c</span>
            <span className="vel-char inline-block">i</span>
            <span className="vel-char inline-block">d</span>
            <span className="vel-char inline-block">a</span>
            <span className="vel-char inline-block">d</span>
        </span>
    );
};

export default VelocityText;
