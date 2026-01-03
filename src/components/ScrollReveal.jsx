'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollReveal({
    children,
    className = '',
    // Animation properties
    y = 60,
    x = 0,
    opacity = 0,
    scale = 1,
    rotation = 0,
    // ScrollTrigger options
    start = 'top 85%',
    end = 'top 20%',
    scrub = true,
    markers = false,
    // Animation options
    duration = 1,
    ease = 'power3.out',
    delay = 0,
}) {
    const elementRef = useRef(null);
    const triggerRef = useRef(null);

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        // Set initial state
        gsap.set(element, {
            y,
            x,
            opacity,
            scale,
            rotation,
        });

        // Create animation
        const tween = gsap.to(element, {
            y: 0,
            x: 0,
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration,
            ease,
            delay,
            scrollTrigger: {
                trigger: element,
                start,
                end,
                scrub: scrub === true ? 1 : scrub,
                markers,
            },
        });

        triggerRef.current = tween.scrollTrigger;

        return () => {
            if (triggerRef.current) {
                triggerRef.current.kill();
            }
            tween.kill();
        };
    }, [y, x, opacity, scale, rotation, start, end, scrub, markers, duration, ease, delay]);

    return (
        <div ref={elementRef} className={className}>
            {children}
        </div>
    );
}
