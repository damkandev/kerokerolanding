import Image from "next/image";
import Button from "../ui/Button";

export default function Portfolio() {
  return (
    <section className="h-fit px-[5vw] py-20" id="projects">
      <div className="flex justify-between items-center text-justify">
        <div className="flex items-center ">
          <p className="text-[#9BFFB1] font-clash-display-bold text-[15vh] uppercase">
            Port
          </p>
          <p className="text-[#F8FF9B] font-mr-saint-delafied-regular text-[15vh] mt-10 ml-2">
            Folio
          </p>
        </div>
        <p className="font-inter-regular text-[#D3FFDD] max-w-[20vw]">
          We have worked on a variety of projects and take pride in every
          solution we have developed. We believe in close collaboration with our
          customers, understanding their needs and turning them into innovative
          and functional products.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-6 ">
        <div className="flex flex-col gap-6">
          <div className="bg-[#070B09] border border-[#9BFFB1]/60 p-12 rounded-xl text-white h-[80vh] relative">
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
              creation of a CRM powered by artificial intelligence, developed in
              strategic alliance with MTS for the company BDK, among other
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

          <div className="grid grid-cols-2 gap-6">
            <div className="bg-[#030B07] p-6 rounded-xl text-white border border-[#00FF90]">
              KitsuLabs
            </div>
            <div className="bg-[#0D0D0D] p-6 rounded-xl text-white border border-[#FF0051]">
              MTS
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="bg-[#09090B] border border-white/20 p-6 rounded-xl text-white">
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
              <Image
                src="/images/mce.jpg"
                alt="Captura de MCE"
                height={440}
                width={620}
                className="rounded-lg"
              />
            </div>
          </div>

          <div className="bg-[#FFF8F3] p-6 rounded-xl text-black">
            Gran Menú
          </div>
        </div>
      </div>
    </section>
  );
}
