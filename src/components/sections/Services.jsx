import Button from "../ui/Button";
import Head from "next/head";
import { useEffect, useRef } from "react";

export default function Services() {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.innerHTML = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ItemList",
        "itemListElement": [
          {
            "@type": "Service",
            "position": 1,
            "name": "Software a Medida",
            "description": "Agiliza procesos y mejora la experiencia de tus usuarios con software a medida."
          },
          {
            "@type": "Service",
            "position": 2,
            "name": "Aplicaciones Web",
            "description": "Desarrollamos aplicaciones web escalables y seguras para tu negocio, para el manejo de operaciones, logistica, talentos, etc."
          },
          {
            "@type": "Service",
            "position": 3,
            "name": "E-commerce",
            "description": "¿Necesitas vender? Nosotros te ayudamos a crear tu tienda online."
          },
          {
            "@type": "Service",
            "position": 4,
            "name": "Automatización con IA",
            "description": "Implementamos IA para automatizar procesos y mejorar la eficiencia de tu negocio."
          }
        ]
      });
      
      return () => {
        document.head.removeChild(script);
      };
    }
  }, []);

  return (
    <>
      <Head>
        <meta name="description" content="Servicios de desarrollo de software a medida, aplicaciones web, e-commerce y automatización con IA para mejorar la eficiencia de tu negocio." />
        <meta name="keywords" content="software a medida, aplicaciones web, e-commerce, automatización IA, desarrollo web" />
      </Head>
      <div className="lg:h-screen">
        <section
          id="servicios"
          ref={sectionRef}
          aria-label="Nuestros Servicios"
          className="services h-full flex flex-col justify-center items-center py-6 px-[5vw]"
          style={{
            backgroundImage: "url('/images/nenufar.svg')",
            backgroundSize: "35%",
            backgroundPosition: "center 65%",
            backgroundRepeat: "no-repeat",
            position: "relative",
          }}
        >
          <div className="w-full relative z-10">
            <header className="flex justify-between w-full mb-6">
              <h2 className="text-3xl lg:text-4xl font-clash-display-bold text-[#9BFFB1]">
                Que ofrecemos
              </h2>
              <Button link={true} href="#contact" variant="primary" aria-label="Contactar para servicios">
                Contactanos
              </Button>
            </header>
            <div className="cards grid grid-cols-1 lg:grid-cols-4 gap-4 flex-grow w-full mt-12" role="list">
              <article className="bg-[#030B07]/99 backdrop-blur-sm border border-[#9BFFB1] rounded-[15px] p-6 flex flex-col justify-end h-[60vh]" role="listitem">
                <h3 className="text-[#9BFFB1] text-2xl xl:text-3xl font-clash-display-bold text-left w-full">
                  Software a Medida
                </h3>
                <p className="text-[#D3FFDD] font-inter-regular">
                  Agiliza procesos y mejora la experiencia de tus usuarios con software a medida. Diseñado específicamente para resolver los desafíos únicos de tu empresa.
                </p>
              </article>
              <article className="bg-[#030B07]/99 backdrop-blur-sm border border-[#9BFFB1] rounded-[15px] p-6 flex flex-col justify-end h-[60vh]" role="listitem">
                <h3 className="text-[#9BFFB1] text-2xl xl:text-3xl font-clash-display-bold text-left w-full">
                  Aplicaciones Web
                </h3>
                <p className="text-[#D3FFDD] font-inter-regular">
                  Desarrollamos aplicaciones web escalables y seguras para tu negocio, para el manejo de operaciones, logística, talentos, etc. Optimizadas para todos los dispositivos.
                </p>
              </article>
              <article className="bg-[#030B07]/99 backdrop-blur-sm border border-[#9BFFB1] rounded-[15px] p-6 flex flex-col justify-end h-[60vh]" role="listitem">
                <h3 className="text-[#9BFFB1] text-2xl xl:text-3xl font-clash-display-bold text-left w-full">
                  E-commerce
                </h3>
                <p className="text-[#D3FFDD] font-inter-regular">
                  ¿Necesitas vender? Nosotros te ayudamos a crear tu tienda online. Plataformas personalizadas con pasarelas de pago seguras y optimizadas para conversión.
                </p>
              </article>
              <article className="bg-[#030B07]/99 backdrop-blur-sm border border-[#9BFFB1] rounded-[15px] p-6 flex flex-col justify-end h-[60vh]" role="listitem">
                <h3 className="text-[#9BFFB1] text-2xl xl:text-3xl font-clash-display-bold text-left w-full">
                  Automatización con IA
                </h3>
                <p className="text-[#D3FFDD] font-inter-regular">
                  Implementamos IA para automatizar procesos y mejorar la eficiencia de tu negocio. Soluciones inteligentes para optimizar flujos de trabajo y aumentar productividad.
                </p>
              </article>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
