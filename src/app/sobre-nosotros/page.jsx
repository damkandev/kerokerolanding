'use client';

import { Linkedin } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

// Schema.org JSON-LD para AboutPage y Person
const aboutPageSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "Sobre Nosotros - KeroKero",
    "description": "Conoce a KeroKero, la primera software factory automatizada de Chile, fundada por Damián Panes.",
    "mainEntity": {
        "@type": "Person",
        "name": "Damián Panes",
        "jobTitle": "Fundador",
        "worksFor": {
            "@type": "Organization",
            "name": "KeroKero"
        },
        "sameAs": [
            "https://www.linkedin.com/in/damianpanes/"
        ],
        "image": "https://keroke.ro/damianp.png"
    }
};

export default function SobreNosotros() {
    const imageContainerRef = useRef(null);
    const [isExploded, setIsExploded] = useState(false);
    const piecesRef = useRef([]);
    const sectionTristesRef = useRef(null);
    const sectionDespiertoRef = useRef(null);
    const personaDespiertoRef = useRef(null);
    const containerScrollRef = useRef(null);
    const personaOriginalRef = useRef(null);
    const placeholderRef = useRef(null);

    // Animación de la persona que se despierta y sigue el scroll
    useEffect(() => {
        if (!sectionTristesRef.current || !personaDespiertoRef.current || !sectionDespiertoRef.current || !placeholderRef.current) return;

        const personaEl = personaDespiertoRef.current;
        const placeholder = placeholderRef.current;

        // Set initial state
        gsap.set(personaEl, { opacity: 0 });

        // Dar tiempo a que Lenis se inicialice
        const timeout = setTimeout(() => {
            // Refrescar ScrollTrigger para sincronizar con Lenis
            ScrollTrigger.refresh();

            // Fade in cuando entra la sección
            ScrollTrigger.create({
                trigger: sectionTristesRef.current,
                start: 'top center',
                onEnter: () => {
                    gsap.to(personaEl, {
                        opacity: 1,
                        duration: 0.5,
                        ease: 'power2.inOut'
                    });
                },
                onLeaveBack: () => {
                    gsap.to(personaEl, {
                        opacity: 0,
                        duration: 0.3,
                        ease: 'power2.inOut'
                    });
                }
            });

            // Animación scroll-driven para mover la persona al centro de la siguiente sección
            const getTargetPosition = () => {
                const personaRect = personaEl.getBoundingClientRect();
                const placeholderRect = placeholder.getBoundingClientRect();

                // Calcular el offset necesario para llegar al placeholder
                const scrollY = window.scrollY;
                const personaTop = personaRect.top + scrollY;
                const placeholderTop = placeholderRect.top + scrollY;

                return {
                    y: placeholderTop - personaTop,
                    x: placeholderRect.left - personaRect.left + (placeholderRect.width - personaRect.width) / 2
                };
            };

            gsap.to(personaEl, {
                y: () => getTargetPosition().y,
                x: () => getTargetPosition().x,
                scale: 1,
                scrollTrigger: {
                    trigger: sectionTristesRef.current,
                    start: 'bottom bottom',
                    endTrigger: sectionDespiertoRef.current,
                    end: 'center center',
                    scrub: true,
                }
            });

            // Hacer desaparecer la persona original debajo
            if (personaOriginalRef.current) {
                gsap.to(personaOriginalRef.current, {
                    opacity: 0,
                    scrollTrigger: {
                        trigger: sectionTristesRef.current,
                        start: 'bottom bottom',
                        end: 'bottom top',
                        scrub: true,
                    }
                });
            }
        }, 100);

        return () => {
            clearTimeout(timeout);
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    const handleExplode = () => {
        if (isExploded) {
            // Regresar a la posición original
            gsap.to(piecesRef.current, {
                x: 0,
                y: 0,
                rotation: 0,
                opacity: 1,
                duration: 0.6,
                ease: 'elastic.out(1, 0.5)',
                stagger: 0.03
            });
            setIsExploded(false);
        } else {
            // Shake de pantalla
            const tl = gsap.timeline();
            tl.to(document.body, { x: -8, duration: 0.05 })
                .to(document.body, { x: 8, duration: 0.05 })
                .to(document.body, { x: -6, duration: 0.05 })
                .to(document.body, { x: 6, duration: 0.05 })
                .to(document.body, { x: -3, duration: 0.05 })
                .to(document.body, { x: 3, duration: 0.05 })
                .to(document.body, { x: 0, duration: 0.05 });

            // Explotar en 6 pedazos (3x2 grid) con valores aleatorios
            const randomRange = (min, max) => Math.random() * (max - min) + min;

            const baseAnimations = [
                { x: -60, y: -80 },   // Top-left
                { x: 0, y: -90 },     // Top-center
                { x: 60, y: -80 },    // Top-right
                { x: -70, y: 80 },    // Bottom-left
                { x: 0, y: 90 },      // Bottom-center
                { x: 70, y: 80 }      // Bottom-right
            ];

            piecesRef.current.forEach((piece, index) => {
                const base = baseAnimations[index];
                gsap.to(piece, {
                    x: base.x + randomRange(-40, 40),
                    y: base.y + randomRange(-30, 30),
                    rotation: randomRange(-25, 25),
                    duration: randomRange(0.4, 0.7),
                    ease: 'power3.out',
                    delay: randomRange(0, 0.1)
                });
            });
            setIsExploded(true);
        }
    };

    return (
        <>
            {/* Schema.org JSON-LD */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
            />
            <main className="min-h-screen" aria-label="Sobre Nosotros">
                {/* Hero Section - Fundador */}
                <section className="min-h-screen flex items-center justify-center px-8 py-24" aria-label="El Fundador">
                    <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20 max-w-5xl mx-auto">
                        {/* Imagen con efecto de explosión */}
                        <div className="relative" ref={imageContainerRef}>
                            <div className="relative w-64 h-80 md:w-80 md:h-[420px]">
                                {/* Fila 1 - Top */}
                                {/* Pieza 1 - Top Left */}
                                <div
                                    ref={el => piecesRef.current[0] = el}
                                    className="absolute top-0 left-0 w-1/3 h-1/2"
                                    style={{
                                        backgroundImage: 'url(/damianp.png)',
                                        backgroundPosition: '0% 0%',
                                        backgroundSize: '300% 200%'
                                    }}
                                />
                                {/* Pieza 2 - Top Center */}
                                <div
                                    ref={el => piecesRef.current[1] = el}
                                    className="absolute top-0 left-1/3 w-1/3 h-1/2"
                                    style={{
                                        backgroundImage: 'url(/damianp.png)',
                                        backgroundPosition: '50% 0%',
                                        backgroundSize: '300% 200%'
                                    }}
                                />
                                {/* Pieza 3 - Top Right */}
                                <div
                                    ref={el => piecesRef.current[2] = el}
                                    className="absolute top-0 right-0 w-1/3 h-1/2"
                                    style={{
                                        backgroundImage: 'url(/damianp.png)',
                                        backgroundPosition: '100% 0%',
                                        backgroundSize: '300% 200%'
                                    }}
                                />
                                {/* Fila 2 - Bottom */}
                                {/* Pieza 4 - Bottom Left */}
                                <div
                                    ref={el => piecesRef.current[3] = el}
                                    className="absolute bottom-0 left-0 w-1/3 h-1/2"
                                    style={{
                                        backgroundImage: 'url(/damianp.png)',
                                        backgroundPosition: '0% 100%',
                                        backgroundSize: '300% 200%'
                                    }}
                                />
                                {/* Pieza 5 - Bottom Center */}
                                <div
                                    ref={el => piecesRef.current[4] = el}
                                    className="absolute bottom-0 left-1/3 w-1/3 h-1/2"
                                    style={{
                                        backgroundImage: 'url(/damianp.png)',
                                        backgroundPosition: '50% 100%',
                                        backgroundSize: '300% 200%'
                                    }}
                                />
                                {/* Pieza 6 - Bottom Right */}
                                <div
                                    ref={el => piecesRef.current[5] = el}
                                    className="absolute bottom-0 right-0 w-1/3 h-1/2"
                                    style={{
                                        backgroundImage: 'url(/damianp.png)',
                                        backgroundPosition: '100% 100%',
                                        backgroundSize: '300% 200%'
                                    }}
                                />
                            </div>
                        </div>

                        {/* Contenido */}
                        <div className="flex flex-col items-center md:items-start text-center md:text-left">
                            <p className="font-jetbrain font-bold text-xl">
                                Fundador de KeroKero
                            </p>
                            <h2 className="text-[#51B85F] text-4xl md:text-6xl font-jetbrain font-black my-4">
                                Damián Panes
                            </h2>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={handleExplode}
                                    className="bg-[#51B85F] text-white border-3 border-[#31813C] rounded py-3.5 px-8 text-base font-semibold cursor-pointer shadow-[0_8px_0_0_#31813C] hover:translate-y-2 hover:shadow-none transition-all duration-150"
                                >
                                    {isExploded ? 'reparar' : 'romper'}
                                </button>
                                <a
                                    href="https://www.linkedin.com/in/damianpanes/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-[#3489FF] text-white border-3 border-[#20569C] rounded py-3.5 px-4 text-base font-semibold cursor-pointer shadow-[0_8px_0_0_#20569C] hover:translate-y-2 hover:shadow-none transition-all duration-150"
                                >
                                    <Linkedin size={24} />
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Sección empleados tristes */}
                <section ref={sectionTristesRef} className="h-screen flex flex-col items-center justify-center px-8 py-24 relative">
                    <p className="text-xl md:text-2xl text-center font-jetbrain font-bold text-[#1a1a1a] max-w-3xl mb-16 leading-relaxed">
                        antes trabajabamos en una software factory aburrida, con mucha burocracia y más habla que código.
                    </p>
                    <div className="flex gap-8 md:gap-12">
                        <Image src="/persona.svg" alt="Persona" width={126} height={213} />
                        <Image src="/persona.svg" alt="Persona" width={126} height={213} />
                        {/* Persona 3 - se ilumina y se mueve */}
                        <div className="relative">
                            <Image
                                ref={personaOriginalRef}
                                src="/persona.svg"
                                alt="Persona"
                                width={126}
                                height={213}
                            />
                            <Image
                                ref={personaDespiertoRef}
                                src="/despierto.svg"
                                alt="Persona despierta"
                                width={126}
                                height={213}
                                className="absolute top-0 left-0 z-10"
                            />
                        </div>
                        <Image src="/persona.svg" alt="Persona" width={126} height={213} />
                    </div>
                </section>

                {/* Sección empleado despierto */}
                <section ref={sectionDespiertoRef} className="h-screen flex flex-col items-center justify-center px-8 py-24">
                    <p className="text-xl md:text-2xl text-center font-jetbrain font-bold text-[#1a1a1a] max-w-3xl mb-16 leading-relaxed">
                        asi que decidimos crear nuestra propia software factory con juegos de azar y pizzas
                    </p>
                    {/* Espacio reservado para la persona que viene animada */}
                    <div ref={placeholderRef} className="h-[213px] w-[126px]"></div>
                </section>
                <section className='h-screen flex flex-col items-center justify-center px-8 py-24' aria-label="Nuestro Equipo">
                    <p className='text-xl md:text-2xl text-center font-jetbrain font-bold text-[#1a1a1a] max-w-3xl mb-16 leading-relaxed'>empezamos a crecer con nuestro equipo de más personas iguales a nuestra forma de pensar, tenemos +10 clientes en Argentina.</p>
                    {/* empleados felices */}
                    <Image src="/everyone.svg" alt="Equipo de KeroKero trabajando juntos" width={600} height={600} />
                </section>
            </main>
        </>
    );
}