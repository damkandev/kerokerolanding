
import Image from "next/image";
import Button from "../ui/Button";
import ClickSpark from "@/blocks/Animations/ClickSpark/ClickSpark";

export default function Portfolio() {
  return (
    <ClickSpark>
      <section className="h-fit px-[5vw] py-20" id="projects">
        <div className="flex lg:flex-row flex-col justify-between items-center text-justify">
          <div className="flex lg:flex-row flex-col items-center ">
            <p className="text-[#9BFFB1] font-clash-display-bold text-[15vh] uppercase">
              Port
            </p>
            <p className="text-[#F8FF9B] font-mr-saint-delafied-regular text-[15vh] lg:mt-10 ml-2">
              Folio
            </p>
          </div>
          <p className="font-inter-regular text-[#D3FFDD] lg:max-w-[20vw] pb-10 lg:pb-0">
            Hemos trabajado en una gran variedad de proyectos y estamos orgullosos de todas las soluciones que hemos desarrollado. Creemos en la estrecha colaboración con nuestros clientes.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 ">
          <div className="flex flex-col gap-6">
            <div className="bg-[#070B09] border border-[#9BFFB1]/60 p-12 rounded-xl text-white h-[90vh] lg:h-[80vh] relative">
              <div className="flex items-center">
                <Image
                  src="/logos/themis.svg"
                  width={50}
                  height={50}
                  alt="logo de Themis"
                />
                <p className="text-4xl font-clash-display-medium ml-2">
                  Themis <span className="font-clash-display-bold">CRM</span>
                </p>
              </div>
              <p className="font-inter-regular text-[#D3FFDD] mt-4">
                Diseñamos y desarrollamos la infraestructura base de un CRM totalmente adaptado.
              </p>
              <p className="font-inter-regular text-[#D3FFDD] mt-4">
                Posteriormente, esta plataforma sirvió como punto de partida para la creación de un CRM potenciado por inteligencia artificial, desarrollado en alianza estratégica con MTS para la empresa BDK, entre otras empresas que han confiado en nuestra tecnología.
              </p>

              <Button variant="primary" className="mt-4">
                Ver sitio web
              </Button>

              <div className="absolute bottom-0 right-0 overflow-hidden rounded-br-xl">
                <Image
                  src="/images/themis.jpg"
                  alt="Captura de Themis"
                  height={440}
                  width={620}
                  className="rounded-lg xl:w-[500px] 2xl:w-[620px]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-6">
              <div className="bg-[#030B07] p-4 lg:p-12 rounded-xl text-white border border-[#00FF90] flex flex-col items-center justify-center gap-4 shadow-[0px_4px_34.3px_0px_rgba(0,255,144,0.33)]">
                <div className="flex items-center">
                  <Image
                    src="/logos/kitsulabs.svg"
                    width={50}
                    height={50}
                    alt="logo de Kitsu Labs"
                  />
                  <p className="font-inter-regular text-4xl mx-2">+</p>
                  <Image
                    src="/logos/logo_kerokero.svg"
                    width={50}
                    height={50}
                    alt="logo de KeroKero"
                  />
                </div>
                <p className="text-center font-clash-display-regular">Alianza con <span className=" font-clash-display-semibold">KitsuLabs</span></p>
              </div>
              <div className="bg-[#0D0D0D] p-4 lg:p-12 rounded-xl text-white border border-[#FF0051] flex flex-col items-center justify-center gap-4 shadow-[0px_4px_34.3px_0px_rgba(255,0,81,0.33)]">
                <div className="flex items-center">
                  <Image
                    src="/logos/mts.svg"
                    width={70}
                    height={70}
                    alt="logo de MTS"
                  />
                  <p className="font-inter-regular text-4xl mx-2">+</p>
                  <Image
                    src="/logos/logo_kerokero.svg"
                    width={50}
                    height={50}
                    alt="logo de KeroKero"
                  />
                </div>
                <p className="text-center font-clash-display-regular">Alianza con <span className=" font-clash-display-semibold">MTS</span></p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="bg-[#09090B] border border-white/20 p-6 rounded-xl text-white relative h-[65vh] lg:h-[60vh]">
              <div>
                <p className="text-4xl font-clash-display-semibold">
                  My Crypto Essence
                </p>
                <p className="font-inter-regular mt-4">
                  Nos encargamos del desarrollo completo del dashboard y landing page para nuestro cliente My Crypto Essence, creando una experiencia digital intuitiva y funcional.
                </p>
                <p className="font-inter-regular mt-4">
                  También gestionamos la logística del envío de perfumes, optimizando los procesos para garantizar una experiencia de compra eficaz y fiable.
                </p>
                <Button variant="primary" className="mt-4">
                  Ver sitio web
                </Button>
                <div className="absolute bottom-0 right-0 overflow-hidden rounded-br-xl">
                  <div className="border-l border-t rounded-lg border-white/20">
                    <Image
                      src="/images/mce.jpg"
                      alt="Captura de MCE"
                      height={440}
                      width={620}
                      className="rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#FFF8F3] p-6 rounded-xl h-[50vh] md:h-[45vh] lg:h-[43vh] xl:h-[40.5vh] text-black flex flex-col justify-between">
              <div>
                <Image
                  src="/logos/granmenu.svg"
                  height={30}
                  width={30}
                  alt="Logo de Gran Menú"
                />
              </div>
              
              <div>
                <p className="font-gasoek-one text-[#44372E] text-4xl">Gran Menú</p>
                <p className="font-inter-regular text-[#44372E] my-4">
                  Nos encargamos del desarrollo integral de la startup Gran Menú, incluyendo la aplicación web, la aplicación móvil y la landing page web. Además, gestionamos todos los aspectos creativos y de diseño, asegurando una identidad visual coherente y atractiva.
                </p>
                <Button variant="gran menu">Ver sitio web</Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </ClickSpark>
  );
}
