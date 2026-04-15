'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }) {
    const lenisRef = useRef(null);

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smooth: true,
        });

        lenisRef.current = lenis;

        const scrollToHash = () => {
            const hash = window.location.hash.replace('#', '');

            if (!hash) {
                lenis.scrollTo(0, { immediate: true });
                window.scrollTo(0, 0);
                return;
            }

            const target = document.getElementById(hash);
            if (!target) return;

            lenis.scrollTo(target, {
                duration: 1.2
            });
        };

        // Sync Lenis with GSAP ScrollTrigger
        lenis.on('scroll', ScrollTrigger.update);

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0);

        requestAnimationFrame(() => {
            requestAnimationFrame(scrollToHash);
        });
        window.addEventListener('hashchange', scrollToHash);

        return () => {
            window.removeEventListener('hashchange', scrollToHash);
            lenis.destroy();
            gsap.ticker.remove(lenis.raf);
        };
    }, []);

    return <>{children}</>;
}
