"use client";

import { useRef, useEffect, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
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
  const titleRef = useRef(null);
  const formFieldRefs = useRef([]);
  const buttonsRef = useRef(null);
  const modalOverlayRef = useRef(null);
  const modalPanelRef = useRef(null);
  const importUrlInputRef = useRef(null);

  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    servicios: [],
    mensaje: '',
    projectUrl: ''
  });

  const [submitStatus, setSubmitStatus] = useState({
    loading: false,
    success: false,
    error: null
  });

  const [showImportModal, setShowImportModal] = useState(false);
  const [isClosingImportModal, setIsClosingImportModal] = useState(false);
  const [importUrl, setImportUrl] = useState('');
  const [importError, setImportError] = useState(null);


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

  useEffect(() => {
    if (!showImportModal) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [showImportModal]);

  useEffect(() => {
    if (!showImportModal) return;

    const overlay = modalOverlayRef.current;
    const panel = modalPanelRef.current;
    if (!overlay || !panel) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    gsap.killTweensOf([overlay, panel]);

    if (prefersReducedMotion) {
      if (isClosingImportModal) {
        setShowImportModal(false);
        setIsClosingImportModal(false);
        return;
      }

      gsap.set(overlay, { opacity: 1 });
      gsap.set(panel, { opacity: 1, y: 0, scale: 1 });
      importUrlInputRef.current?.focus();
      return;
    }

    if (isClosingImportModal) {
      const exitTl = gsap.timeline({
        onComplete: () => {
          setShowImportModal(false);
          setIsClosingImportModal(false);
        }
      });

      exitTl.to(panel, {
        opacity: 0,
        y: 24,
        scale: 0.98,
        duration: 0.18,
        ease: 'power2.in'
      });
      exitTl.to(overlay, {
        opacity: 0,
        duration: 0.16,
        ease: 'power1.out'
      }, 0);

      return () => {
        exitTl.kill();
      };
    }

    gsap.set(overlay, { opacity: 0 });
    gsap.set(panel, { opacity: 0, y: 32, scale: 0.96 });

    const enterTl = gsap.timeline({
      onComplete: () => {
        importUrlInputRef.current?.focus();
      }
    });

    enterTl.to(overlay, {
      opacity: 1,
      duration: 0.22,
      ease: 'power1.out'
    });
    enterTl.to(panel, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.28,
      ease: 'power3.out'
    }, 0.02);

    return () => {
      enterTl.kill();
    };
  }, [showImportModal, isClosingImportModal]);

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

  const handleOpenImportModal = () => {
    setImportUrl('');
    setImportError(null);
    setIsClosingImportModal(false);
    setShowImportModal(true);
  };

  const handleCloseImportModal = useCallback(() => {
    if (!showImportModal || isClosingImportModal) return;

    setImportError(null);
    setIsClosingImportModal(true);
  }, [showImportModal, isClosingImportModal]);

  useEffect(() => {
    if (!showImportModal) return;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        handleCloseImportModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [showImportModal, handleCloseImportModal]);

  const handleImportProjectUrl = () => {
    const normalizedUrl = importUrl.trim();

    if (!normalizedUrl) {
      setImportError('Pega un URL antes de importar.');
      return;
    }

    try {
      new URL(normalizedUrl);
    } catch {
      setImportError('Ingresa un URL valido.');
      return;
    }

    setFormData(prev => ({
      ...prev,
      projectUrl: normalizedUrl
    }));

    setImportUrl('');
    handleCloseImportModal();
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
    try {
      const response = await fetch('/api/contacto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          nombre: formData.nombre,
          correo: formData.correo,
          servicios: formData.servicios.map(id => getServicioNombre(id)),
          mensaje: formData.mensaje,
          projectUrl: formData.projectUrl
        }),
      });

      const contentType = response.headers.get('content-type') || '';
      const rawBody = await response.text();
      const data = contentType.includes('application/json')
        ? JSON.parse(rawBody)
        : null;

      if (!response.ok) {
        throw new Error(
          data?.error || `Error al enviar el mensaje (${response.status})`
        );
      }

      if (!data) {
        throw new Error('La API devolvio una respuesta invalida.');
      }

      setSubmitStatus({ loading: false, success: true, error: null });
      setFormData({ nombre: '', correo: '', servicios: [], mensaje: '', projectUrl: '' });

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

              <div ref={buttonsRef} className="mt-4 flex flex-col gap-4 lg:flex-row">
                <button
                  type="button"
                  onClick={handleOpenImportModal}
                  className="w-full lg:w-auto flex-1 border-3 rounded py-2.5 px-4 text-base font-semibold transition-all duration-200 bg-white text-(--foreground) border-[#636363] cursor-pointer shadow-[0_8px_0_0_#636363] hover:translate-y-[4px] hover:shadow-[0_4px_0_0_#636363] flex items-center justify-center gap-2"
                  aria-label="Importar desde Lovable y v0"
                >
                  <span>Importar</span>
                  <img src="/logo_lovable.svg" alt="Lovable" className="h-8 w-auto shrink-0" />
                  <span>/</span>
                  <img src="/logo_v0.svg" alt="v0" className="h-8 w-auto shrink-0 rounded-[6px]" />
                </button>

                <button
                  ref={enviarBtnRef}
                  type="submit"
                  disabled={submitStatus.loading || submitStatus.success}
                  className={`w-full lg:w-auto flex-1 border-3 rounded py-2.5 px-4 text-base font-semibold transition-all duration-200 ${submitStatus.loading || submitStatus.success
                    ? 'bg-gray-400 border-gray-500 text-gray-200 cursor-not-allowed shadow-[0_8px_0_0_#555]'
                    : 'bg-[#51B85F] text-white border-[#31813C] cursor-pointer shadow-[0_8px_0_0_#31813C]'
                    }`}
                >
                  {submitStatus.loading ? 'Enviando...' : submitStatus.success ? '✓ Enviado' : 'Enviar'}
                </button>
              </div>

              {formData.projectUrl && (
                <div className="border-3 border-[#636363] bg-white px-4 py-3 text-sm text-(--foreground) shadow-[0_8px_0_0_#636363] break-all">
                  Proyecto importado: <span className="font-medium">{formData.projectUrl}</span>
                </div>
              )}
            </form>
          </div>

          {/* Right Side: Image */}
          <div className="shrink-0 flex justify-center items-center px-4">
            <img src="/box.png" alt="Pizza Box" className="w-[200px] sm:w-[280px] lg:w-[350px] max-w-[70vw] object-contain" />
          </div>

          {showImportModal && typeof document !== 'undefined' && createPortal(
            <div
              ref={modalOverlayRef}
              className="fixed inset-0 z-[999] flex min-h-screen w-screen items-end justify-center bg-black/55 px-4 py-4 sm:items-center"
              role="dialog"
              aria-modal="true"
              aria-labelledby="import-project-title"
              onClick={handleCloseImportModal}
            >
              <div
                ref={modalPanelRef}
                className="w-full max-w-[560px] max-h-[calc(100vh-2rem)] overflow-y-auto bg-(--background) border-3 border-[#636363] shadow-[0_12px_0_0_#636363] p-5 sm:p-8"
                onClick={(event) => event.stopPropagation()}
              >
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div>
                    <h3 id="import-project-title" className="font-jetbrains text-lg sm:text-xl text-(--foreground)">
                      Importar desde Lovable/v0
                    </h3>
                    <p className="mt-2 text-sm sm:text-base text-(--foreground)">
                      Pega el URL del proyecto y lo enviaremos junto a tu solicitud, sin modificar el mensaje que escribas.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleCloseImportModal}
                    className="shrink-0 border-3 border-[#636363] bg-white px-3 py-1.5 text-(--foreground) shadow-[0_4px_0_0_#636363] cursor-pointer"
                    aria-label="Cerrar modal"
                  >
                    x
                  </button>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="import-project-url" className="text-base font-medium text-(--foreground)">
                    URL del proyecto
                  </label>
                  <input
                    ref={importUrlInputRef}
                    id="import-project-url"
                    type="url"
                    value={importUrl}
                    onChange={(event) => {
                      setImportUrl(event.target.value);
                      if (importError) {
                        setImportError(null);
                      }
                    }}
                    placeholder="https://..."
                    className="w-full bg-white border-3 border-[#636363] shadow-[0_8px_0_0_#636363] p-4 text-base text-(--foreground) outline-none focus:border-(--accent) transition-colors duration-200"
                  />
                </div>

                {importError && (
                  <div className="mt-4 bg-red-100 border-2 border-red-400 text-red-700 px-4 py-3 rounded">
                    {importError}
                  </div>
                )}

                <div className="mt-6 flex flex-col-reverse sm:flex-row justify-end gap-4">
                  <button
                    type="button"
                    onClick={handleCloseImportModal}
                    className="w-full sm:w-auto border-3 rounded py-3 px-5 text-base font-semibold bg-white text-(--foreground) border-[#636363] cursor-pointer shadow-[0_8px_0_0_#636363]"
                  >
                    cancelar
                  </button>
                  <button
                    type="button"
                    onClick={handleImportProjectUrl}
                    className="w-full sm:w-auto border-3 rounded py-3 px-5 text-base font-semibold bg-[#51B85F] text-white border-[#31813C] cursor-pointer shadow-[0_8px_0_0_#31813C]"
                  >
                    importar
                  </button>
                </div>
              </div>
            </div>,
            document.body
          )}

        </ScrollReveal>
      </section>
  );
}
