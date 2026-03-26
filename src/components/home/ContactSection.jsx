"use client";

import { useRef, useEffect, useState, useCallback } from 'react';
import gsap from 'gsap';
import ScrollReveal from '@/components/ScrollReveal';

// Lista de servicios disponibles
const serviciosDisponibles = [
  { id: 'sistema-control', nombre: 'Sistema de control procesos internos 🤖' },
  { id: 'mvp-startup', nombre: 'Optimiza un proceso automatizandolo 💻'},
  { id: 'otro', nombre: 'Otro' },
];

export default function ContactSection() {
  const enviarBtnRef = useRef(null);
  const truckRef = useRef(null);
  const boxRef = useRef(null);
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


  const [showTruck, setShowTruck] = useState(false);

  // Animación popup elástica al cargar
  useEffect(() => {
    const elements = [
      titleRef.current,
      ...formFieldRefs.current.filter(Boolean),
      buttonsRef.current
    ].filter(Boolean);

    gsap.set(elements, {
      scale: 0.85,
      opacity: 0,
      transformOrigin: 'center center'
    });

    elements.forEach((element, index) => {
      gsap.to(element, {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        delay: 0.1 + (index * 0.1),
        ease: 'elastic.out(1, 0.75)'
      });
    });
  }, []);

  // Animación del truck — se ejecuta cuando la imagen carga
  const startTruckAnimation = useCallback(() => {
    const truck = truckRef.current;
    const box = boxRef.current;
    if (!truck || !box) return;

    const truckW = truck.offsetWidth;
    const truckH = truck.offsetHeight;
    let boxHidden = false;

    const boxRect = box.getBoundingClientRect();
    const boxCenterY = boxRect.top + boxRect.height / 2;
    truck.style.top = `${boxCenterY - truckH / 2 + 120}px`;

    const tl = gsap.timeline({
      onComplete: () => {
        setShowTruck(false);
      },
      onUpdate: () => {
        if (boxHidden) return;
        const truckRect = truck.getBoundingClientRect();
        const boxRect2 = box.getBoundingClientRect();
        const truckCenter = truckRect.left + truckRect.width / 2;
        const boxCenter = boxRect2.left + boxRect2.width / 2;
        if (truckCenter <= boxCenter) {
          boxHidden = true;
          gsap.to(box, { opacity: 0, duration: 0.1 });
        }
      }
    });

    tl.fromTo(truck,
      { x: window.innerWidth + truckW, opacity: 0 },
      { x: -(truckW + 100), duration: 2, ease: "power2.inOut" }
    );
    tl.to(truck, { opacity: 1, duration: 0.3 }, "<");
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
    e.target.value = '';
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

    if (!formData.nombre || !formData.correo || !formData.mensaje) {
      setSubmitStatus({
        loading: false,
        success: false,
        error: 'Por favor completa todos los campos requeridos'
      });
      return;
    }

    setSubmitStatus({ loading: true, success: false, error: null });
    setShowTruck(true);

    try {
      const response = await fetch('/api/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: formData.nombre,
          correo: formData.correo,
          servicios: formData.servicios.map(id => getServicioNombre(id)),
          mensaje: formData.mensaje
        }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || 'Error al enviar');

      setSubmitStatus({ loading: false, success: true, error: null });
      setFormData({ nombre: '', correo: '', servicios: [], mensaje: '' });

    } catch (error) {
      setSubmitStatus({
        loading: false,
        success: false,
        error: error.message || 'Error al enviar. Por favor intenta de nuevo.'
      });
    }
  };

  const serviciosNoSeleccionados = serviciosDisponibles.filter(
    s => !formData.servicios.includes(s.id)
  );

  return (
    <section id="contacto" className="min-h-screen w-full flex items-center justify-center px-4 sm:px-6 py-12 bg-(--background)" aria-label="CTA">
        <ScrollReveal y={80} opacity={0} className="max-w-[1200px] w-full flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">

          {/* Left Side: Form */}
          <div className="max-w-[600px] shrink-0 w-full flex flex-col">
            <h2 ref={titleRef} className="font-jetbrains font-medium text-lg sm:text-xl text-left leading-relaxed mb-6 text-(--foreground)">
              Solicita tu cotización, habla con nosotros para empezar tu pizza.
            </h2>

            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
              <div ref={(el) => (formFieldRefs.current[0] = el)} className="flex flex-col gap-2">
                <label htmlFor="nombre" className="text-base font-medium text-(--foreground)">
                  tú nombre
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  className="w-full bg-white border-3 border-[#636363] shadow-[0_8px_0_0_#636363] p-4 text-base text-(--foreground) outline-none focus:border-(--accent) transition-colors duration-200"
                />
              </div>

              <div ref={(el) => (formFieldRefs.current[1] = el)} className="flex flex-col gap-2">
                <label htmlFor="correo" className="text-base font-medium text-(--foreground)">
                  tú correo electronico
                </label>
                <input
                  type="email"
                  id="correo"
                  name="correo"
                  value={formData.correo}
                  onChange={handleChange}
                  className="w-full bg-white border-3 border-[#636363] shadow-[0_8px_0_0_#636363] p-4 text-base text-(--foreground) outline-none focus:border-(--accent) transition-colors duration-200"
                />
              </div>

              <div ref={(el) => (formFieldRefs.current[2] = el)} className="flex flex-col gap-2">
                <label htmlFor="servicio" className="text-base font-medium text-(--foreground)">
                  servicio
                </label>

                {formData.servicios.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-2">
                    {formData.servicios.map(servicioId => (
                      <div key={servicioId} className="flex items-center gap-2 bg-(--accent) text-white px-3 py-1.5 rounded text-sm">
                        <span>{getServicioNombre(servicioId)}</span>
                        <button type="button" onClick={() => handleRemoveServicio(servicioId)} className="hover:bg-white/20 rounded-full p-0.5 transition-colors cursor-pointer">
                          x
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <select
                  id="servicio"
                  onChange={handleAddServicio}
                  className="w-full bg-white border-3 border-[#636363] shadow-[0_8px_0_0_#636363] p-4 text-base text-(--foreground) outline-none focus:border-(--accent) transition-colors duration-200 cursor-pointer"
                  defaultValue=""
                >
                  <option value="">
                    {formData.servicios.length > 0 ? 'Agregar otro servicio...' : 'Selecciona un servicio...'}
                  </option>
                  {serviciosNoSeleccionados.map(servicio => (
                    <option key={servicio.id} value={servicio.id}>{servicio.nombre}</option>
                  ))}
                </select>
              </div>

              <div ref={(el) => (formFieldRefs.current[3] = el)} className="flex flex-col gap-2">
                <label htmlFor="mensaje" className="text-base font-medium text-(--foreground)">
                  mensaje
                </label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleChange}
                  rows={6}
                  className="w-full bg-white border-3 border-[#636363] shadow-[0_8px_0_0_#636363] p-4 text-base text-(--foreground) outline-none focus:border-(--accent) transition-colors duration-200 resize-none"
                />
              </div>

              {/* Status messages */}
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

              <div ref={buttonsRef} className="mt-4">
                <button
                  ref={enviarBtnRef}
                  type="submit"
                  disabled={submitStatus.loading || submitStatus.success}
                  className={`w-full border-3 rounded py-3.5 px-6 text-base font-semibold transition-all duration-200 ${submitStatus.loading || submitStatus.success
                    ? 'bg-gray-400 border-gray-500 text-gray-200 cursor-not-allowed shadow-[0_8px_0_0_#555]'
                    : 'bg-[#51B85F] text-white border-[#31813C] cursor-pointer shadow-[0_8px_0_0_#31813C]'
                    }`}
                >
                  {submitStatus.loading ? 'enviando...' : submitStatus.success ? '✓ enviado' : 'enviar'}
                </button>
              </div>
            </form>
          </div>

          {/* Right Side: Image */}
          <div className="shrink-0 flex justify-center items-center px-4">
            <img ref={boxRef} src="/box.png" alt="Pizza Box" className="w-[200px] sm:w-[280px] lg:w-[350px] max-w-[70vw] object-contain" />
          </div>

          {showTruck && (
            <img
              ref={truckRef}
              src="/truck.png"
              alt="Truck"
              className="pointer-events-none"
              style={{
                position: 'fixed',
                width: '85vw',
                left: 0,
                zIndex: 50,
                opacity: 0
              }}
              onLoad={startTruckAnimation}
            />
          )}

        </ScrollReveal>
      </section>
  );
}
