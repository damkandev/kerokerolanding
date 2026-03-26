'use client';
import { useState } from 'react';
import ScrollReveal from '@/components/ScrollReveal';
import CustomSlider from '@/components/CustomSlider';

export default function TeamEffortSection() {
  const TOTAL_EFFORT = 12; // 12 dev-months
  const [chefs, setChefs] = useState(1);
  const [months, setMonths] = useState(12);

  const handleChefsChange = (e) => {
    const newChefs = parseInt(e.target.value);
    setChefs(newChefs);
    setMonths(Math.max(2, Math.ceil(TOTAL_EFFORT / newChefs)));
  };

  const handleMonthsChange = (e) => {
    const newMonths = parseInt(e.target.value);
    setMonths(newMonths);
    setChefs(Math.max(1, Math.ceil(TOTAL_EFFORT / newMonths)));
  };

  return (
    <section className="h-screen flex items-center justify-center relative bg-[#F2F2F2] px-6 sm:px-8" aria-label="Beneficios">
      <ScrollReveal y={60} opacity={0} className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-8 xl:gap-12">
        {/* Left Side: Text and Sliders */}
        <div className="w-full max-w-[600px] flex flex-col gap-8 z-10">
          <p className="font-jetbrains font-medium text-base sm:text-lg lg:text-xl leading-relaxed text-[#282828] text-left">
            Nosotros somos, los que harán tu<br className="hidden lg:block"/>
            pizza, <span className="text-[#51B85F]">como tu la pidas</span> y <span className="text-[#51B85F]">en el<br className="hidden lg:block"/>
            tiempo que pidas</span>.
          </p>

          <div className="flex flex-col gap-8 w-full max-w-[400px]">
            <CustomSlider 
              value={chefs} 
              min={1} 
              max={10} 
              onChange={handleChefsChange}
              label={`${chefs} chefs (programadores)`}
            />
            <CustomSlider 
              value={months} 
              min={2} 
              max={12} 
              onChange={handleMonthsChange}
              label={`${months} meses`}
            />
          </div>

          <p className="font-jetbrains text-xs text-gray-500">
            *calculo ilustrativo, cambia según la complejidad del proyecto.
          </p>
        </div>

        {/* Right Side: Image */}
        <div className="w-full lg:w-auto flex justify-center">
          <img 
            src="/chef.png" 
            alt="Chef creativo" 
            className="w-full max-w-[200px] sm:max-w-[280px] lg:max-w-[320px] object-contain drop-shadow-xl" 
          />
        </div>
      </ScrollReveal>
    </section>
  );
}
