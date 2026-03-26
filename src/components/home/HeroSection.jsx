'use client';

import { useEffect, useRef, useState } from 'react';
import { Mouse, Pizza, Eye, Beer } from 'lucide-react';
import { gsap } from 'gsap';
import ScrambledText from '@/components/ScrambledText';
import StickerPeel from '@/components/StickerPeel';

function ScrollIndicator() {
  const mouseRef = useRef(null);

  useEffect(() => {
    if (!mouseRef.current) return;

    gsap.to(mouseRef.current, {
      y: 10,
      duration: 0.8,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
    });
  }, []);

  return (
    <div className="absolute bottom-24 left-1/2 -translate-x-1/2">
      <Mouse ref={mouseRef} size={32} strokeWidth={1.5} />
    </div>
  );
}

export default function HeroSection() {
  const h1Ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const isTouchDevice = () => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(hover: none)').matches;
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative px-4 sm:px-6 lg:px-8 py-28 sm:py-32" aria-label="Introducción">
      <div className="flex flex-col lg:flex-row items-center justify-center gap-6 sm:gap-8 lg:gap-8 xl:gap-12 w-full max-w-6xl mx-auto">
        <h1 ref={h1Ref} className="font-jetbrains font-medium text-base sm:text-lg lg:text-xl text-left w-full max-w-[34rem] lg:max-w-[600px] order-2 lg:order-1 leading-relaxed break-words">
          Entregamos software como <Pizza className="inline-block text-[#EEAE5F]" /> pizzas elige, ordena, <Eye className="inline-block text-[#51B85F]" /> ve el proceso y <Beer className="inline-block text-[#EF862A]" /> disfruta.
        </h1>
        <img 
          src={isHovered ? '/box.png' : '/pizza.png'} 
          alt="" 
          className="w-[260px] h-[260px] sm:w-[350px] sm:h-[350px] lg:w-[424px] lg:h-[424px] object-contain cursor-pointer max-w-[85vw] order-1 lg:order-2"
          onMouseEnter={() => {
            if (!isTouchDevice()) setIsHovered(true);
          }}
          onMouseLeave={() => {
            if (!isTouchDevice()) setIsHovered(false);
          }}
          onClick={() => {
            if (isTouchDevice()) setIsHovered((prev) => !prev);
          }}
        />
      </div>
      <ScrollIndicator />
    </section>
  );
}
