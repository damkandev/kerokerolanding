'use client';

import ScrollReveal from '@/components/ScrollReveal';
import CustomSlider from '../CustomSlider';
import { Clock, Cpu, HandCoins, PiggyBank } from 'lucide-react';

export default function TrackingSection() {
  return (
    <section className="min-h-screen py-12 flex items-center justify-center overflow-hidden px-4 sm:px-6" aria-label="Estadísticas">
      <ScrollReveal y={80} opacity={0} className="w-full">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 max-w-7xl mx-auto w-full">
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end order-2 lg:order-1">
            <img src="/horno.png" alt="Horno interactivo" className="w-full max-w-[280px] sm:max-w-[400px] lg:max-w-[500px] object-contain" />
          </div>
          
          <div className="w-full lg:w-1/2 flex flex-col items-start max-w-xl order-1 lg:order-2">
            <p className="font-jetbrains font-medium text-base sm:text-lg lg:text-xl text-left leading-relaxed">
              <span className="text-[#EEAE5F]">Monitorea</span> el proceso de cocción de tu software desde tu <span className="text-[#51B85F]">panel de cliente</span> y <span className="text-[#51B85F]">recibe correos actualizandote</span>.
            </p>
            
            <div className="w-full border border-[#E5E5E5] bg-transparent p-6 sm:p-8 flex flex-col gap-6 mt-8 relative z-10 lg:-ml-4">
              <h2 className="font-jetbrains font-medium text-2xl sm:text-[32px] text-[#282828] mb-1">Tú pizza</h2>
              <div className="px-1">
                <CustomSlider 
                  value={45} 
                  min={1} 
                  max={100} 
                  onChange={() => {}}
                />
              </div>
              <div className='flex flex-wrap items-center gap-4 sm:gap-8 text-[13px] font-jetbrains mt-2 text-[#282828]'>
                <div className='flex items-center gap-2'>
                  <Clock size={16} strokeWidth={1.5} className="text-[#51B85F]" />
                  <p>4 meses</p>
                </div>
                <div className='flex items-center gap-2 mb-[2px]'>
                  <Cpu size={16} strokeWidth={1.5} className="text-[#086495]" />
                  <p>Etapa 1</p>
                </div>
                <div className='flex items-center gap-2'>
                  <HandCoins size={16} strokeWidth={1.5} className="text-[#51B85F]" />
                  <p>1.500.000 abonados</p>
                </div>
                <div className='flex items-center gap-2'>
                  <PiggyBank size={16} strokeWidth={1.5} className="text-[#E190DD]" />
                  <p>3.500.000 restantes</p>
                </div>
              </div>  
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}