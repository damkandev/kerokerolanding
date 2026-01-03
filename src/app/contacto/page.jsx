'use client';

import { useRef, useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import gsap from 'gsap';
import { X } from 'lucide-react';

// Lista de servicios disponibles
const serviciosDisponibles = [
    { id: 'sistema-control', nombre: 'Sistema de control procesos internos 🤖' },
    { id: 'mvp-startup', nombre: 'MVP para una startup en 30 días 🚀' },
    { id: 'asistente-ia', nombre: 'Asistente IA interno para tu empresa 🗃️' },
    { id: 'bot-whatsapp', nombre: 'Bot de WhatsApp para Atención al Cliente 📦' },
    { id: 'dashboard', nombre: 'Dashboard ejecutivo en 7 días 👔' },
    { id: 'scraper', nombre: 'Scraper de precios para la competencia 👀' },
    { id: 'reservas', nombre: 'Sistema de reservas online 📅' },
    { id: 'chatbot', nombre: 'Chatbot con IA para tu sitio web 🤖' },
    { id: 'reportes', nombre: 'Automatización de reportes diarios 📊' },
    { id: 'landing', nombre: 'Landing page premium en 3 días 🚀' },
    { id: 'pagos', nombre: 'Integración con pasarela de pagos 💳' },
    { id: 'web', nombre: 'Solo quiero una web' },
    { id: 'otro', nombre: 'Otro' },
];

// Schema.org JSON-LD para ContactPage
const contactPageSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contacto - KeroKero",
    "description": "Contáctanos para cotizar tu proyecto de software. Respondemos en menos de 24 horas.",
    "url": "https://keroke.ro/contacto",
    "mainEntity": {
        "@type": "Organization",
        "name": "KeroKero",
        "url": "https://keroke.ro",
        "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "sales",
            "availableLanguage": ["Spanish", "English"]
        }
    }
};


function ContactoContent() {
    const enviarBtnRef = useRef(null);
    const mejorarBtnRef = useRef(null);
    const searchParams = useSearchParams();

    // Refs para animación popup
    const titleRef = useRef(null);
    const formFieldRefs = useRef([]);
    const buttonsRef = useRef(null);

    const [formData, setFormData] = useState({
        nombre: '',
        correo: '',
        servicios: [],
        mensaje: ''
    });

    const [submitStatus, setSubmitStatus] = useState({
        loading: false,
        success: false,
        error: null
    });

    const [showAIToast, setShowAIToast] = useState(false);
    const [typedText, setTypedText] = useState('');
    const [isToastFading, setIsToastFading] = useState(false);

    // Leer servicios de la URL al cargar
    useEffect(() => {
        const serviciosParam = searchParams.get('servicios');
        if (serviciosParam) {
            const serviciosIds = serviciosParam.split(',');
            setFormData(prev => ({
                ...prev,
                servicios: serviciosIds
            }));
        }
    }, [searchParams]);

    // Animación popup elástica al cargar
    useEffect(() => {
        const elements = [
            titleRef.current,
            ...formFieldRefs.current.filter(Boolean),
            buttonsRef.current
        ].filter(Boolean);

        // Estado inicial: invisible y pequeño
        elements.forEach((element) => {
            gsap.set(element, {
                scale: 0.85,
                opacity: 0,
                transformOrigin: 'center center'
            });
        });

        // Animar cada elemento con stagger
        elements.forEach((element, index) => {
            gsap.to(element, {
                scale: 1,
                opacity: 1,
                duration: 0.6,
                delay: 0.1 + (index * 0.1), // Stagger de 100ms entre cada elemento
                ease: 'elastic.out(1, 0.75)'
            });
        });
    }, []);

    // Efecto 3D para botón enviar (verde)
    useEffect(() => {
        const btn = enviarBtnRef.current;
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

    // Efecto 3D para botón mejorar con AI (morado)
    useEffect(() => {
        const btn = mejorarBtnRef.current;
        if (!btn) return;

        const handleMouseEnter = () => {
            gsap.to(btn, {
                y: 8,
                boxShadow: '0 0px 0 0 #6B5B95',
                duration: 0.15,
                ease: 'power2.out'
            });
        };

        const handleMouseLeave = () => {
            gsap.to(btn, {
                y: 0,
                boxShadow: '0 8px 0 0 #6B5B95',
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAddServicio = (e) => {
        const servicioId = e.target.value;
        if (servicioId && !formData.servicios.includes(servicioId)) {
            setFormData(prev => ({
                ...prev,
                servicios: [...prev.servicios, servicioId]
            }));
        }
        e.target.value = ''; // Reset select
    };

    const handleRemoveServicio = (servicioId) => {
        setFormData(prev => ({
            ...prev,
            servicios: prev.servicios.filter(id => id !== servicioId)
        }));
    };

    const getServicioNombre = (id) => {
        const servicio = serviciosDisponibles.find(s => s.id === id);
        return servicio ? servicio.nombre : id;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validación básica
        if (!formData.nombre || !formData.correo || !formData.mensaje) {
            setSubmitStatus({
                loading: false,
                success: false,
                error: 'Por favor completa todos los campos requeridos'
            });
            return;
        }

        setSubmitStatus({ loading: true, success: false, error: null });

        try {
            const response = await fetch('/api/contacto', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nombre: formData.nombre,
                    correo: formData.correo,
                    servicios: formData.servicios.map(id => getServicioNombre(id)),
                    mensaje: formData.mensaje
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Error al enviar el mensaje');
            }

            setSubmitStatus({ loading: false, success: true, error: null });

            // Resetear formulario después de envío exitoso
            setFormData({
                nombre: '',
                correo: '',
                servicios: [],
                mensaje: ''
            });

        } catch (error) {
            setSubmitStatus({
                loading: false,
                success: false,
                error: error.message || 'Error al enviar el mensaje. Por favor intenta de nuevo.'
            });
        }
    };

    const handleMejorarConAI = () => {
        const fullText = "si no quieres escribir mándalo así nomás, no te juzgamos.";
        setTypedText('');
        setShowAIToast(true);
        setIsToastFading(false);

        // Efecto de typing
        let index = 0;
        const typingInterval = setInterval(() => {
            if (index < fullText.length) {
                setTypedText(fullText.slice(0, index + 1));
                index++;
            } else {
                clearInterval(typingInterval);
            }
        }, 30); // 30ms por caracter

        // Iniciar fade out después de typing + 2 segundos
        setTimeout(() => {
            setIsToastFading(true);
            // Ocultar completamente después de la animación de fade out (500ms)
            setTimeout(() => {
                setShowAIToast(false);
                setTypedText('');
                setIsToastFading(false);
            }, 500);
        }, fullText.length * 30 + 2000);
    };

    // Filtrar servicios disponibles que no están seleccionados
    const serviciosNoSeleccionados = serviciosDisponibles.filter(
        s => !formData.servicios.includes(s.id)
    );

    return (
        <>
            {/* Schema.org JSON-LD */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
            />

            {/* Toast de AI */}
            {showAIToast && (
                <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${isToastFading ? 'opacity-0 translate-y-4' : 'opacity-100 animate-[slideUp_0.3s_ease-out]'
                    }`}>
                    <div className="bg-[#1a1a1a] text-white px-6 py-4 rounded-lg shadow-lg border-2 border-[#9C8AFF] flex items-center gap-3">
                        <span className="text-2xl">🐸</span>
                        <span className="font-medium">
                            {typedText}
                            <span className="animate-pulse">|</span>
                        </span>
                    </div>
                </div>
            )}

            <main className="min-h-screen bg-(--background) flex flex-col items-center px-4 pt-32 pb-16">
                <h1
                    ref={titleRef}
                    id="contacto-title"
                    className="text-4xl font-medium text-(--foreground) text-center tracking-tight mb-12"
                >
                    Contáctanos
                </h1>

                <form onSubmit={handleSubmit} className="w-full max-w-xl flex flex-col gap-6">
                    {/* Nombre */}
                    <div
                        ref={(el) => (formFieldRefs.current[0] = el)}
                        className="flex flex-col gap-2"
                    >
                        <label htmlFor="nombre" className="text-base font-medium text-(--foreground)">
                            tú nombre
                        </label>
                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            className="w-full bg-white border-3 border-[#636363] p-4 text-base text-(--foreground) outline-none focus:border-(--accent) transition-colors duration-200"
                        />
                    </div>

                    {/* Correo */}
                    <div
                        ref={(el) => (formFieldRefs.current[1] = el)}
                        className="flex flex-col gap-2"
                    >
                        <label htmlFor="correo" className="text-base font-medium text-(--foreground)">
                            tú correo electronico
                        </label>
                        <input
                            type="email"
                            id="correo"
                            name="correo"
                            value={formData.correo}
                            onChange={handleChange}
                            className="w-full bg-white border-3 border-[#636363] p-4 text-base text-(--foreground) outline-none focus:border-(--accent) transition-colors duration-200"
                        />
                    </div>

                    {/* Servicios */}
                    <div
                        ref={(el) => (formFieldRefs.current[2] = el)}
                        className="flex flex-col gap-2"
                    >
                        <label htmlFor="servicio" className="text-base font-medium text-(--foreground)">
                            servicio
                        </label>

                        {/* Servicios seleccionados */}
                        {formData.servicios.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-2">
                                {formData.servicios.map(servicioId => (
                                    <div
                                        key={servicioId}
                                        className="flex items-center gap-2 bg-(--accent) text-white px-3 py-1.5 rounded text-sm"
                                    >
                                        <span>{getServicioNombre(servicioId)}</span>
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveServicio(servicioId)}
                                            className="hover:bg-white/20 rounded-full p-0.5 transition-colors cursor-pointer"
                                        >
                                            <X size={14} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Select para agregar más servicios */}
                        <select
                            id="servicio"
                            onChange={handleAddServicio}
                            className="w-full bg-white border-3 border-[#636363] p-4 text-base text-(--foreground) outline-none focus:border-(--accent) transition-colors duration-200 cursor-pointer"
                            defaultValue=""
                        >
                            <option value="">
                                {formData.servicios.length > 0
                                    ? 'Agregar otro servicio...'
                                    : 'Selecciona un servicio...'}
                            </option>
                            {serviciosNoSeleccionados.map(servicio => (
                                <option key={servicio.id} value={servicio.id}>
                                    {servicio.nombre}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Mensaje */}
                    <div
                        ref={(el) => (formFieldRefs.current[3] = el)}
                        className="flex flex-col gap-2"
                    >
                        <label htmlFor="mensaje" className="text-base font-medium text-(--foreground)">
                            mensaje
                        </label>
                        <textarea
                            id="mensaje"
                            name="mensaje"
                            value={formData.mensaje}
                            onChange={handleChange}
                            rows={8}
                            className="w-full bg-white border-3 border-[#636363] p-4 text-base text-(--foreground) outline-none focus:border-(--accent) transition-colors duration-200 resize-none"
                        />
                    </div>

                    {/* Mensajes de estado */}
                    {submitStatus.error && (
                        <div className="bg-red-100 border-2 border-red-400 text-red-700 px-4 py-3 rounded">
                            {submitStatus.error}
                        </div>
                    )}

                    {submitStatus.success && (
                        <div className="bg-green-100 border-2 border-green-400 text-green-700 px-4 py-3 rounded">
                            ✅ ¡Mensaje enviado! Te llegará un correo de confirmación.
                        </div>
                    )}

                    {/* Botones */}
                    <div
                        ref={buttonsRef}
                        className="flex gap-4 mt-4"
                    >
                        <button
                            ref={enviarBtnRef}
                            type="submit"
                            disabled={submitStatus.loading || submitStatus.success}
                            className={`flex-1 border-3 rounded py-3.5 px-6 text-base font-semibold transition-all duration-200 ${submitStatus.loading || submitStatus.success
                                ? 'bg-gray-400 border-gray-500 text-gray-200 cursor-not-allowed shadow-[0_8px_0_0_#555]'
                                : 'bg-[#51B85F] text-white border-[#31813C] cursor-pointer shadow-[0_8px_0_0_#31813C]'
                                }`}
                        >
                            {submitStatus.loading ? 'enviando...' : submitStatus.success ? '✓ enviado' : 'enviar'}
                        </button>
                        <button
                            ref={mejorarBtnRef}
                            type="button"
                            onClick={handleMejorarConAI}
                            disabled={submitStatus.loading}
                            className="flex-1 bg-[#9C8AFF] text-white border-3 border-[#6356AC] rounded py-3.5 px-6 text-base font-semibold cursor-pointer shadow-[0_8px_0_0_#6356AC] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            mejorar con AI
                        </button>
                    </div>
                </form>
            </main>
        </>
    );
}

// Componente loading para el fallback de Suspense
function ContactoLoading() {
    return (
        <main className="min-h-screen bg-(--background) flex flex-col items-center px-4 pt-32 pb-16">
            <h1 className="text-4xl font-medium text-(--foreground) text-center tracking-tight mb-12">
                Contáctanos
            </h1>
            <div className="w-full max-w-xl flex flex-col gap-6 animate-pulse">
                <div className="h-20 bg-gray-200 rounded"></div>
                <div className="h-20 bg-gray-200 rounded"></div>
                <div className="h-20 bg-gray-200 rounded"></div>
                <div className="h-40 bg-gray-200 rounded"></div>
            </div>
        </main>
    );
}

export default function Contacto() {
    return (
        <Suspense fallback={<ContactoLoading />}>
            <ContactoContent />
        </Suspense>
    );
}