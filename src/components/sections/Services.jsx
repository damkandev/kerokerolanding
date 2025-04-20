import Button from "../ui/Button";

export default function Services() {
  return (
    <div className="h-full">
      <section
        id="services"
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
          <div className="flex justify-between w-full mb-6">
            <h2 className="text-4xl font-clash-display-bold text-[#9BFFB1]">
              What we offer
            </h2>
            <Button link={true} href="" variant="primary">
              Contact Us
            </Button>
          </div>
          <div className="cards grid grid-cols-4 gap-4 flex-grow w-full mt-12">
            <div className="bg-[#030B07]/99 backdrop-blur-sm border border-[#9BFFB1] rounded-[15px] p-6 flex flex-col justify-end h-[60vh]">
              <p className="text-[#9BFFB1] text-3xl font-clash-display-bold text-left w-full">
                Custom Software
              </p>
              <p className="text-[#D3FFDD] font-inter-regular">
                What your company needs, we build it based on your criteria.
              </p>
            </div>
            <div className="bg-[#030B07]/99 backdrop-blur-sm border border-[#9BFFB1] rounded-[15px] p-6 flex flex-col justify-end h-[60vh]">
              <p className="text-[#9BFFB1] text-3xl font-clash-display-bold text-left w-full">
                Web Apps
              </p>
              <p className="text-[#D3FFDD] font-inter-regular">
                What your company needs, we build it based on your criteria.
              </p>
            </div>
            <div className="bg-[#030B07]/99 backdrop-blur-sm border border-[#9BFFB1] rounded-[15px] p-6 flex flex-col justify-end h-[60vh]">
              <p className="text-[#9BFFB1] text-3xl font-clash-display-bold text-left w-full">
                E-commerce
              </p>
              <p className="text-[#D3FFDD] font-inter-regular">
                What your company needs, we build it based on your criteria.
              </p>
            </div>
            <div className="bg-[#030B07]/99 backdrop-blur-sm border border-[#9BFFB1] rounded-[15px] p-6 flex flex-col justify-end h-[60vh]">
              <p className="text-[#9BFFB1] text-3xl font-clash-display-bold text-left w-full">
                UI / UX
              </p>
              <p className="text-[#D3FFDD] font-inter-regular">
                What your company needs, we build it based on your criteria.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
