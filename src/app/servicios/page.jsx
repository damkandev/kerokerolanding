'use client';

import { useRef, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import { CircleDollarSign } from 'lucide-react';

const servicios = [
    {
        id: 'sistema-control',
        titulo: "sistema de control procesos internos",
        emoji: "🤖",
        descripcion: "un sistema interno para dejar de aprobar cosas por WhatsApp, correos perdidos o Excels raros. Todo queda en un solo lugar.",
        precioMin: "1.1K USD",
        precioMax: "5K USD"
    },
    {
        id: 'mvp-startup',
        titulo: "MVP para una startup en 30 días",
        emoji: "🚀",
        descripcion: "construimos el MVP de tu startup para pasar de la idea a un producto real en 30 días, listo para probar con usuarios y seguir creciendo.",
        precioMin: "2K USD",
        precioMax: "10K USD"
    },
    {
        id: 'asistente-ia',
        titulo: "asistente IA interno para tu empresa",
        emoji: "🗃️",
        descripcion: "un asistente de IA que ayuda a tu equipo a responder dudas, automatizar tareas y acceder a información interna en segundos.",
        precioMin: "1K USD",
        precioMax: "3K USD"
    }
];

// Ideas divididas en 2 filas
const ideasRow1 = [
    { id: 'bot-whatsapp', titulo: "bot de WhatsApp para atención al cliente", emoji: "💬", precioMin: "300 USD", precioMax: "1K USD" },
    { id: 'dashboard', titulo: "dashboard ejecutivo para tu negocio en 7 días", emoji: "📈", precioMin: "400 USD", precioMax: "1.5K USD" },
    { id: 'scraper', titulo: "scraper de precios de tu competencia", emoji: "👀", precioMin: "500 USD", precioMax: "2K USD" },
    { id: 'reservas', titulo: "sistema de reservas online", emoji: "📅", precioMin: "400 USD", precioMax: "1.5K USD" },
    { id: 'crm-simple', titulo: "CRM simple para gestionar clientes y ventas", emoji: "🧩", precioMin: "600 USD", precioMax: "2K USD" },
    { id: 'inventario', titulo: "sistema de inventario básico", emoji: "📦", precioMin: "600 USD", precioMax: "2K USD" },
    { id: 'reportes-auto', titulo: "automatización de reportes diarios o semanales", emoji: "📊", precioMin: "400 USD", precioMax: "1.2K USD" },
    { id: 'pagos', titulo: "integración con pasarela de pagos", emoji: "💳", precioMin: "300 USD", precioMax: "1K USD" },
    { id: 'auth-roles', titulo: "sistema de usuarios y roles", emoji: "🔐", precioMin: "400 USD", precioMax: "1.5K USD" },
    { id: 'backoffice', titulo: "backoffice administrativo a medida", emoji: "🛠️", precioMin: "700 USD", precioMax: "3K USD" },
    { id: 'formularios', titulo: "formularios inteligentes con validaciones", emoji: "📝", precioMin: "300 USD", precioMax: "1K USD" },
    { id: 'notificaciones', titulo: "sistema de notificaciones por email y WhatsApp", emoji: "🔔", precioMin: "400 USD", precioMax: "1.5K USD" },
];

const ideasRow2 = [
    { id: 'chatbot-web', titulo: "chatbot con IA para tu sitio web", emoji: "🤖", precioMin: "500 USD", precioMax: "2K USD" },
    { id: 'landing', titulo: "landing page premium en 3 días", emoji: "🚀", precioMin: "300 USD", precioMax: "1K USD" },
    { id: 'asistente-interno', titulo: "asistente IA interno para tu empresa", emoji: "🧠", precioMin: "800 USD", precioMax: "3K USD" },
    { id: 'flujo-aprobaciones', titulo: "sistema de aprobaciones internas", emoji: "✅", precioMin: "600 USD", precioMax: "2K USD" },
    { id: 'integraciones', titulo: "integración entre sistemas y APIs", emoji: "🔗", precioMin: "500 USD", precioMax: "2K USD" },
    { id: 'mvp-30', titulo: "MVP funcional para validar tu idea", emoji: "⚡", precioMin: "1K USD", precioMax: "5K USD" },
    { id: 'auditoria-tech', titulo: "auditoría técnica de tu sistema actual", emoji: "🔍", precioMin: "500 USD", precioMax: "2K USD" },
    { id: 'optimizacion', titulo: "optimización de rendimiento de tu sistema", emoji: "🚄", precioMin: "600 USD", precioMax: "2.5K USD" },
    { id: 'seo-tech', titulo: "SEO técnico para tu sitio web", emoji: "📡", precioMin: "400 USD", precioMax: "1.5K USD" },
    { id: 'migracion', titulo: "migración de sistemas o bases de datos", emoji: "📦", precioMin: "800 USD", precioMax: "4K USD" },
    { id: 'automatizacion', titulo: "automatización de procesos internos", emoji: "⚙️", precioMin: "500 USD", precioMax: "2K USD" },
    { id: 'panel-analytics', titulo: "panel de métricas y analítica del negocio", emoji: "📊", precioMin: "600 USD", precioMax: "2K USD" },
];

// Schema.org JSON-LD para servicios
const servicesSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Servicios de KeroKero",
    "description": "Servicios de desarrollo de software automatizado",
    "itemListElement": [
        ...servicios.map((s, i) => ({
            "@type": "ListItem",
            "position": i + 1,
            "item": {
                "@type": "Service",
                "name": s.titulo,
                "description": s.descripcion,
                "provider": {
                    "@type": "Organization",
                    "name": "KeroKero"
                },
                "priceRange": `${s.precioMin} - ${s.precioMax}`
            }
        })),
        ...ideasRow1.map((s, i) => ({
            "@type": "ListItem",
            "position": servicios.length + i + 1,
            "item": {
                "@type": "Service",
                "name": s.titulo,
                "provider": {
                    "@type": "Organization",
                    "name": "KeroKero"
                },
                "priceRange": `${s.precioMin} - ${s.precioMax}`
            }
        })),
        ...ideasRow2.map((s, i) => ({
            "@type": "ListItem",
            "position": servicios.length + ideasRow1.length + i + 1,
            "item": {
                "@type": "Service",
                "name": s.titulo,
                "provider": {
                    "@type": "Organization",
                    "name": "KeroKero"
                },
                "priceRange": `${s.precioMin} - ${s.precioMax}`
            }
        }))
    ]
};

export default function Servicios() {
    const router = useRouter();
    const buttonRefs = useRef([]);
    const cotizarBtnRef = useRef(null);
    const webBtnRef = useRef(null);
    const row1Ref = useRef(null);
    const row2Ref = useRef(null);
    const animation1Ref = useRef(null);
    const animation2Ref = useRef(null);
    const cardRefs = useRef([]);
    const [selectedIdeas, setSelectedIdeas] = useState([]);

    // Navegar a contacto con servicio(s) seleccionado(s)
    const navegarAContacto = (servicioIds) => {
        const ids = Array.isArray(servicioIds) ? servicioIds : [servicioIds];
        router.push(`/contacto?servicios=${ids.join(',')}`);
    };

    // Efecto popup elástico para las cards principales
    useEffect(() => {
        // Configurar estado inicial de las cards (casi a tamaño normal, invisible)
        cardRefs.current.forEach((card) => {
            if (card) {
                gsap.set(card, {
                    scale: 0.85,
                    opacity: 0,
                    transformOrigin: 'center center'
                });
            }
        });

        // Animar cada card con un stagger - efecto sutil
        cardRefs.current.forEach((card, index) => {
            if (card) {
                gsap.to(card, {
                    scale: 1,
                    opacity: 1,
                    duration: 0.6,
                    delay: 0.15 + (index * 0.12), // Stagger de 120ms entre cada card
                    ease: 'elastic.out(1, 0.75)' // Elasticidad más suave (menos overshoot)
                });
            }
        });
    }, []);

    // Efecto 3D para botones de la primera sección
    useEffect(() => {
        buttonRefs.current.forEach((btn) => {
            if (!btn) return;

            const handleMouseEnter = () => {
                gsap.to(btn, {
                    y: 8,
                    boxShadow: '0 0px 0 0 #31813C',
                    duration: 0.15,
                    ease: 'power2.out'
                });
            };

            const handleMouseLeave = () => {
                gsap.to(btn, {
                    y: 0,
                    boxShadow: '0 8px 0 0 #31813C',
                    duration: 0.15,
                    ease: 'power2.out'
                });
            };

            btn.addEventListener('mouseenter', handleMouseEnter);
            btn.addEventListener('mouseleave', handleMouseLeave);

            btn._gsapHandlers = { handleMouseEnter, handleMouseLeave };
        });

        return () => {
            buttonRefs.current.forEach((btn) => {
                if (btn && btn._gsapHandlers) {
                    btn.removeEventListener('mouseenter', btn._gsapHandlers.handleMouseEnter);
                    btn.removeEventListener('mouseleave', btn._gsapHandlers.handleMouseLeave);
                }
            });
        };
    }, []);

    // Efecto 3D para botón cotizar de la segunda sección
    useEffect(() => {
        const btn = cotizarBtnRef.current;
        if (!btn) return;

        const handleMouseEnter = () => {
            if (selectedIdeas.length === 0) return;
            gsap.to(btn, {
                y: 8,
                boxShadow: '0 0px 0 0 #31813C',
                duration: 0.15,
                ease: 'power2.out'
            });
        };

        const handleMouseLeave = () => {
            if (selectedIdeas.length === 0) return;
            gsap.to(btn, {
                y: 0,
                boxShadow: '0 8px 0 0 #31813C',
                duration: 0.15,
                ease: 'power2.out'
            });
        };

        btn.addEventListener('mouseenter', handleMouseEnter);
        btn.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            btn.removeEventListener('mouseenter', handleMouseEnter);
            btn.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [selectedIdeas]);

    // Efecto 3D para botón web de la tercera sección
    useEffect(() => {
        const btn = webBtnRef.current;
        if (!btn) return;

        const handleMouseEnter = () => {
            gsap.to(btn, {
                y: 8,
                boxShadow: '0 0px 0 0 #31813C',
                duration: 0.15,
                ease: 'power2.out'
            });
        };

        const handleMouseLeave = () => {
            gsap.to(btn, {
                y: 0,
                boxShadow: '0 8px 0 0 #31813C',
                duration: 0.15,
                ease: 'power2.out'
            });
        };

        btn.addEventListener('mouseenter', handleMouseEnter);
        btn.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            btn.removeEventListener('mouseenter', handleMouseEnter);
            btn.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    // Carousel infinito para fila 1
    useEffect(() => {
        const row = row1Ref.current;
        if (!row) return;

        // Pequeño delay para asegurar que el DOM esté listo
        const timer = setTimeout(() => {
            const cards = row.querySelectorAll('.idea-card');
            const cardWidth = cards[0]?.offsetWidth + 24 || 350;
            const totalWidth = cardWidth * ideasRow1.length;

            gsap.set(row, { x: 0 });

            animation1Ref.current = gsap.to(row, {
                x: -totalWidth,
                duration: 25,
                ease: 'none',
                repeat: -1,
                overwrite: true,
                modifiers: {
                    x: gsap.utils.unitize(x => parseFloat(x) % totalWidth)
                }
            });
        }, 100);

        const handleMouseEnter = () => {
            if (animation1Ref.current) {
                gsap.to(animation1Ref.current, { timeScale: 0.2, duration: 0.5 });
            }
        };

        const handleMouseLeave = () => {
            if (animation1Ref.current) {
                gsap.to(animation1Ref.current, { timeScale: 1, duration: 0.5 });
            }
        };

        row.addEventListener('mouseenter', handleMouseEnter);
        row.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            clearTimeout(timer);
            animation1Ref.current?.kill();
            row.removeEventListener('mouseenter', handleMouseEnter);
            row.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    // Carousel infinito para fila 2 (dirección opuesta)
    useEffect(() => {
        const row = row2Ref.current;
        if (!row) return;

        // Pequeño delay para asegurar que el DOM esté listo
        const timer = setTimeout(() => {
            const cards = row.querySelectorAll('.idea-card');
            const cardWidth = cards[0]?.offsetWidth + 24 || 350;
            const totalWidth = cardWidth * ideasRow2.length;

            gsap.set(row, { x: -totalWidth });

            animation2Ref.current = gsap.to(row, {
                x: 0,
                duration: 25,
                ease: 'none',
                repeat: -1,
                overwrite: true,
                modifiers: {
                    x: gsap.utils.unitize(x => {
                        const val = parseFloat(x) % totalWidth;
                        return val > 0 ? val - totalWidth : val;
                    })
                }
            });
        }, 100);

        const handleMouseEnter = () => {
            if (animation2Ref.current) {
                gsap.to(animation2Ref.current, { timeScale: 0.2, duration: 0.5 });
            }
        };

        const handleMouseLeave = () => {
            if (animation2Ref.current) {
                gsap.to(animation2Ref.current, { timeScale: 1, duration: 0.5 });
            }
        };

        row.addEventListener('mouseenter', handleMouseEnter);
        row.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            clearTimeout(timer);
            animation2Ref.current?.kill();
            row.removeEventListener('mouseenter', handleMouseEnter);
            row.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    const toggleIdea = (id) => {
        setSelectedIdeas(prev =>
            prev.includes(id)
                ? prev.filter(i => i !== id)
                : [...prev, id]
        );
    };

    const isSelected = (id) => selectedIdeas.includes(id);

    // Duplicar ideas para efecto infinito
    const duplicatedRow1 = [...ideasRow1, ...ideasRow1, ...ideasRow1];
    const duplicatedRow2 = [...ideasRow2, ...ideasRow2, ...ideasRow2];

    const IdeaCard = ({ idea, index }) => {
        const selected = isSelected(idea.id);
        return (
            <div
                key={`${idea.id}-${index}`}
                onClick={() => toggleIdea(idea.id)}
                className={`idea-card bg-white border-3 p-5 flex flex-col gap-2 min-w-[320px] max-w-[320px] cursor-pointer transition-all duration-200 ${selected
                    ? 'border-(--accent) shadow-[0_0_20px_rgba(81,184,95,0.4)]'
                    : 'border-[#636363]'
                    }`}
            >
                <h3 className="text-base font-bold text-(--foreground) leading-snug">
                    {idea.titulo} {idea.emoji}
                </h3>
                <div className="flex items-center gap-2 text-sm text-[#555555]">
                    <CircleDollarSign size={16} />
                    <span>{idea.precioMin} - {idea.precioMax}</span>
                </div>
            </div>
        );
    };

    return (
        <>
            {/* Schema.org JSON-LD para servicios */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
            />
            <main className="min-h-screen bg-(--background)">
                {/* Primera sección - Servicios principales */}
                <section className="min-h-screen flex flex-col items-center justify-center px-4 py-16 gap-12" aria-labelledby="servicios-title">
                    <h1 id="servicios-title" className="text-4xl font-medium text-(--foreground) text-center tracking-tight">
                        lo que más pide la gente
                    </h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1100px] w-full">
                        {servicios.map((servicio, index) => (
                            <div
                                key={index}
                                ref={(el) => (cardRefs.current[index] = el)}
                                className="bg-white border-3 border-[#636363] p-7 flex flex-col gap-4"
                            >
                                <h2 className="text-xl font-bold text-(--foreground) leading-tight">
                                    {servicio.titulo} {servicio.emoji}
                                </h2>
                                <p className="text-sm text-[#666666] leading-relaxed grow">
                                    {servicio.descripcion}
                                </p>
                                <div className="flex items-center gap-2 text-sm text-[#555555] mt-2">
                                    <CircleDollarSign size={18} />
                                    <span>{servicio.precioMin} - {servicio.precioMax}</span>
                                </div>
                                <button
                                    ref={(el) => (buttonRefs.current[index] = el)}
                                    onClick={() => navegarAContacto(servicio.id)}
                                    className="bg-[#51B85F] text-white border-3 border-[#31813C] rounded py-3.5 px-6 text-base font-semibold cursor-pointer mt-2 shadow-[0_8px_0_0_#31813C]"
                                >
                                    Cotizaar!
                                </button>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Segunda sección - Ideas carousel */}
                <section className="min-h-screen flex flex-col items-center justify-center py-16 gap-8 overflow-hidden">
                    <h2 className="text-2xl font-normal text-(--foreground) text-center tracking-tight px-4">
                        no sabes lo que quieres? te damos ideas
                    </h2>

                    {/* Fila 1 */}
                    <div className="w-full overflow-hidden">
                        <div
                            ref={row1Ref}
                            className="flex gap-6"
                            style={{ width: 'max-content' }}
                        >
                            {duplicatedRow1.map((idea, index) => (
                                <IdeaCard key={`row1-${index}`} idea={idea} index={index} />
                            ))}
                        </div>
                    </div>

                    {/* Fila 2 */}
                    <div className="w-full overflow-hidden">
                        <div
                            ref={row2Ref}
                            className="flex gap-6"
                            style={{ width: 'max-content' }}
                        >
                            {duplicatedRow2.map((idea, index) => (
                                <IdeaCard key={`row2-${index}`} idea={idea} index={index} />
                            ))}
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="flex flex-col items-center gap-6 px-4 mt-8">
                        <p className="text-xl text-(--foreground) text-center">
                            si te gusta alguna, puedes seleccionarla y apretar
                        </p>
                        <button
                            ref={cotizarBtnRef}
                            disabled={selectedIdeas.length === 0}
                            onClick={() => navegarAContacto(selectedIdeas)}
                            className={`border-3 border-[#31813C] rounded py-3.5 px-12 text-base font-semibold transition-all duration-200 ${selectedIdeas.length > 0
                                ? 'bg-[#51B85F] text-white cursor-pointer shadow-[0_8px_0_0_#31813C]'
                                : 'bg-[#51B85F]/50 text-white/70 cursor-not-allowed shadow-[0_8px_0_0_#31813C]/50'
                                }`}
                        >
                            Cotizaar!
                        </button>
                    </div>
                </section>

                {/* Tercera sección - Solo web */}
                <section className="min-h-screen flex flex-col items-center justify-center px-4 gap-6">
                    <h2 className="text-2xl font-normal text-(--foreground) text-center tracking-tight">
                        también hacemos páginas webs btw
                    </h2>
                    <button
                        ref={webBtnRef}
                        onClick={() => navegarAContacto('web')}
                        className="bg-[#51B85F] text-white border-3 border-[#31813C] rounded py-3.5 px-8 text-base font-semibold cursor-pointer shadow-[0_8px_0_0_#31813C]"
                    >
                        solo quiero una web
                    </button>
                </section>
            </main>
        </>
    );
}