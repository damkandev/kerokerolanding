'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CountUp = ({
    end,
    duration = 2,
    prefix = '',
    suffix = '',
    className = '',
    delay = 0
}) => {
    const numberRef = useRef(null);
    const triggerRef = useRef(null);

    useEffect(() => {
        if (!numberRef.current) return;

        const resetAnimation = () => {
            numberRef.current.textContent = prefix + '0' + suffix;
        };

        const playAnimation = () => {
            const obj = { value: 0 };

            gsap.to(obj, {
                value: end,
                duration: duration,
                delay: delay,
                ease: 'power2.out',
                onUpdate: () => {
                    if (numberRef.current) {
                        numberRef.current.textContent = prefix + Math.round(obj.value) + suffix;
                    }
                }
            });
        };

        // Set initial value
        resetAnimation();

        triggerRef.current = ScrollTrigger.create({
            trigger: numberRef.current,
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
    }, [end, duration, prefix, suffix, delay]);

    return (
        <span ref={numberRef} className={className}>
            {prefix}0{suffix}
        </span>
    );
};

export default CountUp;
