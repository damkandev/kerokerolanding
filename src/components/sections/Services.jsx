import Button from "../ui/Button";

export default function Services() {
  return (
    <div className="h-full">
      <section
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
            <div className="bg-[#030B07]/99 backdrop-blur-sm border border-[#9BFFB1] rounded-[15px] p-6 flex flex-col items-center h-[60vh]">
              hola
            </div>
            <div className="bg-[#030B07]/99 backdrop-blur-sm border border-[#9BFFB1] rounded-[15px] p-6 flex flex-col items-center h-[60vh]">
              hola
            </div>
            <div className="bg-[#030B07]/99 backdrop-blur-sm border border-[#9BFFB1] rounded-[15px] p-6 flex flex-col items-center h-[60vh]">
              hola
            </div>
            <div className="bg-[#030B07]/99 backdrop-blur-sm border border-[#9BFFB1] rounded-[15px] p-6 flex flex-col items-center h-[60vh]">
              hola
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
