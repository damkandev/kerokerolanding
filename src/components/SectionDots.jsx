'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SectionDots = ({ sections = 6 }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const dotsRef = useRef([]);

    useEffect(() => {
        // Create scroll triggers for each section
        const sectionElements = document.querySelectorAll('.h-screen');

        sectionElements.forEach((section, index) => {
            ScrollTrigger.create({
                trigger: section,
                start: 'top center',
                end: 'bottom center',
                onEnter: () => setActiveIndex(index),
                onEnterBack: () => setActiveIndex(index)
            });
        });

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

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
        const sectionElements = document.querySelectorAll('.h-screen');
        if (sectionElements[index]) {
            sectionElements[index].scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="fixed right-8 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-50">
            {Array.from({ length: sections }).map((_, index) => (
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
