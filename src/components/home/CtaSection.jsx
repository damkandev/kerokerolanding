"use client";

import { useState, useEffect, useRef } from 'react';
import ScrollReveal from '@/components/ScrollReveal';

export default function CtaSection() {
  const [buttonStyle, setButtonStyle] = useState({});
  const [isVisible, setIsVisible] = useState(true);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const button = buttonRef.current;
      if (!button) return;

      const rect = button.getBoundingClientRect();
      const buttonCenterX = rect.left + rect.width / 2;
      const buttonCenterY = rect.top + rect.height / 2;

      const distance = Math.sqrt(
        Math.pow(e.clientX - buttonCenterX, 2) +
        Math.pow(e.clientY - buttonCenterY, 2)
      );

      if (distance < 80) {
        const angle = Math.atan2(e.clientY - buttonCenterY, e.clientX - buttonCenterX);
        const moveDistance = 300;

        const newX = -Math.cos(angle) * moveDistance;
        const newY = -Math.sin(angle) * moveDistance;

        setButtonStyle({
          position: 'fixed',
          left: `calc(50% + ${newX}px)`,
          top: `calc(50% + ${newY}px)`,
          transform: 'translate(-50%, -50%)',
          transition: 'all 0.08s ease-out',
          zIndex: 10
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleButtonClick = () => {
    setIsVisible(false);
  };

  return (
    <section className="h-screen w-full flex items-center justify-center px-4 sm:px-6" aria-label="CTA">
      <ScrollReveal y={80} opacity={0} className="max-w-[1200px] w-full flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
        <div className="max-w-[600px] shrink-0 w-full">
          <p className="font-jetbrains font-medium text-base sm:text-lg lg:text-xl text-left leading-relaxed mb-6">
            Cuando todo haya terminado, solo tendrás que preocuparte de disfrutar lo que pediste y ahora si, dormir en paz.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <button className="bg-[#5fc568] hover:bg-[#52b15a] transition-colors text-white font-jetbrains px-6 py-3 min-h-[48px]">
             contacto
            </button>
            <button
              ref={buttonRef}
              className="hidden lg:block bg-[#9e9e9e] hover:bg-[#8a8a8a] transition-colors text-white font-jetbrains px-6 py-3 cursor-default"
              style={buttonStyle}
              onClick={handleButtonClick}
            >
              no contactar
            </button>
          </div>
        </div>
        <div className="shrink-0">
          <img src="/slice.png" alt="Pizza verde derretida" className="w-[200px] sm:w-[280px] lg:w-[350px] max-w-[70vw] object-contain" />
        </div>
      </ScrollReveal>
    </section>
  );
}
