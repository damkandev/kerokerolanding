'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FocusText = ({ children, className = '', delay = .5 }) => {
    const containerRef = useRef(null);
    const triggerRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const brackets = containerRef.current.querySelectorAll('.bracket');

        const resetAnimation = () => {
            gsap.set(brackets, { color: 'inherit', scale: 1 });
        };

        const playAnimation = () => {
            gsap.to(brackets, {
                color: 'var(--accent)',
                scale: 1.2,
                duration: 0.3,
                delay: delay,
                ease: 'back.out(2)',
                stagger: 0.1,
                onComplete: () => {
                    gsap.to(brackets, {
                        scale: 1,
                        duration: 0.2,
                        ease: 'power2.out'
                    });
                }
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

    return (
        <span ref={containerRef} className={`inline-block ${className}`}>
            <span className="bracket inline-block">[</span>
            <span className="focus-word">{children}</span>
            <span className="bracket inline-block">]</span>
        </span>
    );
};

export default FocusText;
