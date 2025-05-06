
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
            We have worked on a variety of projects and take pride in every
            solution we have developed. We believe in close collaboration with
            our customers, understanding their needs and turning them into
            innovative and functional products.
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
                We designed and developed the base infrastructure of a CRM fully
                adapted to the specific needs of our clients.
              </p>
              <p className="font-inter-regular text-[#D3FFDD] mt-4">
                Subsequently, this platform served as a starting point for the
                creation of a CRM powered by artificial intelligence, developed
                in strategic alliance with MTS for the company BDK, among other
                companies that have relied on our technology.
              </p>

              <Button variant="primary" className="mt-4">
                View Website
              </Button>

              <div className="absolute bottom-0 right-0 overflow-hidden rounded-br-xl">
                <Image
                  src="/images/themis.jpg"
                  alt="Captura de Themis"
                  height={440}
                  width={620}
                  className="rounded-lg"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 lg:gap-6">
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
                <p className="text-center font-clash-display-regular">Alliance with <span className=" font-clash-display-semibold">KitsuLabs</span></p>
              </div>
              <div className="bg-[#0D0D0D] p-1 lg:p-12 rounded-xl text-white border border-[#FF0051] flex flex-col items-center justify-center gap-4 shadow-[0px_4px_34.3px_0px_rgba(255,0,81,0.33)]">
                <div className="flex items-center">
                  <Image
                    src="/logos/mts.svg"
                    width={60}
                    height={60}
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
                <p className="text-center font-clash-display-regular">Alliance with <span className=" font-clash-display-semibold">MTS</span></p>
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
                  We were in charge of the complete development of the dashboard
                  and landing page for our client My Crypto Essence, creating an
                  intuitive and functional digital experience.
                </p>
                <p className="font-inter-regular mt-4">
                  We also managed the logistics of perfume shipping, optimizing
                  processes to ensure an efficient and reliable shopping
                  experience.
                </p>
                <Button variant="primary" className="mt-4">
                  View Website
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

            <div className="bg-[#FFF8F3] p-6 rounded-xl h-[45vh] lg:h-[40vh] text-black flex flex-col justify-between">
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
                  We are in charge of the integral development of the startup Gran
                  Menú, including the web application, the mobile application and
                  the web landing page. In addition, we managed all the creative
                  and design aspects, ensuring a coherent and attractive visual
                  identity.
                </p>
                <Button variant="gran menu">View Website</Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </ClickSpark>
  );
}
