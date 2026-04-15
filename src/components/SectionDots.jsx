'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const DEFAULT_SELECTOR = 'main > section';

const SectionDots = ({ selector = DEFAULT_SELECTOR }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [sectionCount, setSectionCount] = useState(0);
    const dotsRef = useRef([]);

    useEffect(() => {
        const sectionElements = Array.from(document.querySelectorAll(selector));
        const frameId = requestAnimationFrame(() => {
            setSectionCount(sectionElements.length);
        });
        dotsRef.current = dotsRef.current.slice(0, sectionElements.length);

        const triggers = sectionElements.map((section, index) =>
            ScrollTrigger.create({
                trigger: section,
                start: 'top center',
                end: 'bottom center',
                onEnter: () => setActiveIndex(index),
                onEnterBack: () => setActiveIndex(index)
            })
        );

        return () => {
            cancelAnimationFrame(frameId);
            triggers.forEach((trigger) => trigger.kill());
        };
    }, [selector]);

    useEffect(() => {
        dotsRef.current.forEach((dot, index) => {
            if (dot) {
                gsap.to(dot, {
                    scale: index === activeIndex ? 1.2 : 1,
                    opacity: index === activeIndex ? 1 : 0.3,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }
        });
    }, [activeIndex]);

    const scrollToSection = (index) => {
        const sections = document.querySelectorAll(selector);
        if (sections[index]) {
            sections[index].scrollIntoView({ behavior: 'smooth' });
        }
    };

    if (sectionCount === 0) return null;

    return (
        <div className="fixed right-8 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-3 z-50">
            {Array.from({ length: sectionCount }).map((_, index) => (
                <button
                    key={index}
                    ref={el => dotsRef.current[index] = el}
                    onClick={() => scrollToSection(index)}
                    className="w-2 h-2 bg-current opacity-30 hover:opacity-100 transition-opacity cursor-pointer"
                    aria-label={`Ir a sección ${index + 1}`}
                />
            ))}
        </div>
    );
};

export default SectionDots;
