'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Link from 'next/link';

const DashedButton = ({ href, children, className = '' }) => {
    const buttonRef = useRef(null);
    const rectRef = useRef(null);
    const arrowRef = useRef(null);
    const animationRef = useRef(null);

    useEffect(() => {
        if (!buttonRef.current || !rectRef.current || !arrowRef.current) return;

        const button = buttonRef.current;
        const rect = rectRef.current;
        const arrow = arrowRef.current;

        // Calculate total path length for the dash animation
        const updatePathLength = () => {
            const width = button.offsetWidth;
            const height = button.offsetHeight;
            // Approximate perimeter of rounded rect
            const perimeter = 2 * (width + height) - (4 * 8) + (2 * Math.PI * 8);
            rect.style.strokeDasharray = '8 6';
            rect.dataset.perimeter = perimeter;
        };

        updatePathLength();

        const handleEnter = () => {
            // Animate strokeDashoffset to make dashes "march" around
            animationRef.current = gsap.to(rect, {
                strokeDashoffset: -100,
                duration: 2,
                ease: 'linear',
                repeat: -1
            });

            // Move arrow to the right
            gsap.to(arrow, {
                x: 8,
                duration: 0.3,
                ease: 'power2.out'
            });
        };

        const handleLeave = () => {
            // Stop marching animation
            if (animationRef.current) {
                animationRef.current.kill();
            }
            gsap.to(rect, {
                strokeDashoffset: 0,
                duration: 0.3,
                ease: 'power2.out'
            });

            // Reset arrow position
            gsap.to(arrow, {
                x: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
        };

        button.addEventListener('mouseenter', handleEnter);
        button.addEventListener('mouseleave', handleLeave);

        return () => {
            button.removeEventListener('mouseenter', handleEnter);
            button.removeEventListener('mouseleave', handleLeave);
            if (animationRef.current) {
                animationRef.current.kill();
            }
            gsap.killTweensOf(arrow);
        };
    }, []);

    return (
        <Link
            href={href}
            ref={buttonRef}
            className={`relative inline-flex items-center justify-center px-8 py-4 ${className}`}
        >
            {/* Dashed border SVG */}
            <svg
                className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
            >
                <rect
                    ref={rectRef}
                    x="1"
                    y="1"
                    width="calc(100% - 2px)"
                    height="calc(100% - 2px)"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeDasharray="8 6"
                    strokeDashoffset="0"
                    strokeOpacity="0.4"
                />
            </svg>

            {/* Text content */}
            <span className="flex items-center gap-2">
                <span>{children}</span>
                <span ref={arrowRef} className="inline-block">→</span>
            </span>
        </Link>
    );
};

export default DashedButton;
