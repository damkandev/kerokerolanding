'use client';

import { useEffect, useRef } from 'react';
import { Mouse } from 'lucide-react';
import { gsap } from 'gsap';
import ScrambledText from '@/components/ScrambledText';
import StickerPeel from '@/components/StickerPeel';
import ScrollReveal from '@/components/ScrollReveal';
import VelocityText from '@/components/VelocityText';
import FocusText from '@/components/FocusText';
import CountUp from '@/components/CountUp';
import DashedButton from '@/components/DashedButton';
import SectionDots from '@/components/SectionDots';

// Schema.org JSON-LD para Organization
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "KeroKero",
  "url": "https://keroke.ro",
  "logo": "https://keroke.ro/favicon.png",
  "description": "La primera software factory en Chile completamente automatizada. Desarrollo de software sin burocracia.",
  "foundingDate": "2024",
  "founder": {
    "@type": "Person",
    "name": "Damián Panes"
  },
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "CL"
  },
  "sameAs": [
    "https://www.linkedin.com/in/damianpanes/"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "sales",
    "url": "https://keroke.ro/contacto"
  }
};

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

export default function Home() {
  const h1Ref = useRef(null);

  return (
    <>
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <SectionDots sections={6} />
      <main className="">
        <section className="h-screen flex items-center justify-center relative" aria-label="Introducción">
          <StickerPeel
            imageSrc="/sticker.png"
            width={200}
            rotate={0}
            peelBackHoverPct={20}
            peelBackActivePct={40}
            shadowIntensity={0.6}
            lightingIntensity={0.1}
            initialPosition={{ x: 0, y: -200 }}
            exclusionRef={h1Ref}
            exclusionPadding={30}
          />
          <h1 ref={h1Ref} className="font-jetbrains font-medium text-xl max-w-[800px] text-center px-8">
            <ScrambledText
              radius={30}
              duration={0.5}
              speed={0.5}
              scrambleChars=".:"
              highlightWords={['diferente', 'completamente automatizada']}
            >
              somos una software factory diferente, la primera en Chile en ser completamente automatizada.
            </ScrambledText>
          </h1>
          <ScrollIndicator />
        </section>
        <section className="h-screen flex items-center justify-center" aria-label="Problema">
          <ScrollReveal y={80} opacity={0}>
            <p className='font-jetbrains font-medium text-xl max-w-[800px] text-center px-8'>en la mayoría de las consultoras, los equipos <strong>pierden tiempo</strong> en burocracia, administración y <strong>procesos innecesarios</strong>.</p>
          </ScrollReveal>
        </section>
        <section className="h-screen flex items-center justify-center" aria-label="Solución">
          <ScrollReveal y={80} opacity={0}>
            <p className='font-jetbrains font-medium text-xl max-w-[800px] text-center px-8'>¿qué pasaría si existiera una software factory donde <strong>todo</strong> eso estuviera <strong>automatizado</strong>?</p>
          </ScrollReveal>
        </section>
        <section className="h-screen flex items-center justify-center" aria-label="Beneficios">
          <ScrollReveal y={80} opacity={0}>
            <p className='font-jetbrains font-medium text-xl max-w-[800px] text-left px-8 text-black/30'>// beneficios.js</p>
            <p className='font-jetbrains font-medium text-xl max-w-[800px] text-left px-8'>menos reuniones innecesarias</p>
            <p className='font-jetbrains font-medium text-xl max-w-[800px] text-left px-8'>menos correos</p>
            <p className='font-jetbrains font-medium text-xl max-w-[800px] text-left px-8'>menos contratos eternos</p>
            <span className='my-4 block'></span>
            <p className='font-jetbrains font-medium text-xl max-w-[800px] text-left px-8'>más <FocusText>foco</FocusText></p>
            <p className='font-jetbrains font-medium text-xl max-w-[800px] text-left px-8'>más <VelocityText /></p>
            <p className='font-jetbrains font-medium text-xl max-w-[800px] text-left px-8'><strong>mejor</strong> software</p>

          </ScrollReveal>
        </section>
        <section className="h-screen flex items-center justify-center" aria-label="Estadísticas">
          <ScrollReveal y={80} opacity={0}>
            <div className="flex flex-col items-center gap-12">
              {/* Top stat - 0 fricción */}
              <div className="text-center">
                <p className="text-7xl font-bold"><CountUp end={0} duration={1} /></p>
                <p className="text-xl mt-2">fricción administrativa</p>
              </div>

              {/* Bottom stats - two columns */}
              <div className="flex gap-16">
                <div className="text-center">
                  <p className="text-6xl font-bold text-amber-600">
                    <CountUp end={-40} duration={1.5} suffix="%" delay={0.3} />
                  </p>
                  <p className="text-lg mt-2">tiempo en gestión</p>
                </div>
                <div className="text-center">
                  <p className="text-6xl font-bold text-(--accent)">
                    <CountUp end={30} duration={1.5} prefix="+" suffix="%" delay={0.3} />
                  </p>
                  <p className="text-lg mt-2">velocidad de entrega</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>
        <section className="h-screen flex items-center justify-center" aria-label="CTA">
          <ScrollReveal y={80} opacity={0}>
            <DashedButton href="/servicios" className="font-jetbrains font-medium text-xl">
              empezar
            </DashedButton>
          </ScrollReveal>
        </section>
      </main>
    </>
  );
}
