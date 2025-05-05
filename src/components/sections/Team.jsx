import Image from "next/image";
import Link from "next/link";
import TeamCard from "../ui/TeamCard";
import { Instagram, Youtube, Github } from "lucide-react";


export default function Team() {
  return (
    <div className="h-fit pb-[15vh] px-[5vw] py-20 bg-[#070707]" id="team">
      <div className="text-white flex lg:flex-row flex-col px-5 lg:px-0 justify-between items-center">
        <p className="font-nohemi-black text-[#9BFFB1] leading-36 text-[15vh]">
          THE <span className="text-[#FF6320]">CREW</span>
        </p>
        <p className="font-inter-regular text-[#D3FFDD] max-w-[100vw] pb-10 lg:pb-0 lg:max-w-[20vw] text-justify">
          Imagine you are assembling an elite team to carry out a flawless
          heist, but instead of a bank, the goal is the success of your project.
          Here, there is no margin for error: we provide you with the best
          programmers, because in our team, every developer is a highly trained
          expert.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="flex flex-col lg:flex-row items-center gap-8 text-white">
          <div className="max-w-sm">
            <div className=" flex flex-col items-center -mb-5 rotate-2">
              <Image
                src="/images/tagleader.png"
                height={63}
                width={290}
                alt="Tag del Lider"
              />
            </div>
            <div className="card bg-white text-black p-6 ">
              <Image
                className=" mx-auto"
                src="/images/damian.png"
                width={342}
                height={295}
              />
              <p className="text-2xl font-bold text-left mt-4 font-special-elite-regular">
                Damián Panes - CEO
              </p>
              <p className="text-md text-gray-700mt-2 font-inter-regular text-left mb-8">
                Me apasiona liderar proyectos y desarrollar soluciones
                innovadoras y personalizadas que impulsen el crecimiento de tu
                empresa.
              </p>
            </div>
            <div className="p-4 -mt-8">
              <div className=" flex gap-2 w-full ">
                <div className="bg-[#FFD667] w-full flex flex-col h-[12vh] items-center -mt-4 -rotate-4 mb-4">
                  <span className="flex w-full h-[3vh] bg-[#E0BD5C] "></span>
                  <p className="text-black font-medium mt-2 font-patrick-hand-regular text-2xl ">
                    Social Networks
                  </p>
                  <div className="flex gap-2 mt-2">
                    <Link href={"https://www.instagram.com/damian.panes/"}>
                      <Instagram size={24} className="text-black" />
                    </Link>
                    <Link href={"https://www.youtube.com/@damianpanes"}>
                      <Youtube size={24} className="text-black" />
                    </Link>
                    <Link href={"https://github.com/damkandev"}>
                      <Github size={24} className="text-black" />
                    </Link>
                  </div>
                </div>
                <div className="bg-[#F2B9FE] flex flex-col h-[12vh] rotate-2 items-center -mt-10 w-full ">
                  <span className="flex w-full h-[3vh] bg-[#D397DF] "></span>
                  <p className="text-black font-medium mt-2 font-patrick-hand-regular text-2xl ">
                    The Portfolio
                  </p>
                  <Link href={"https://damianpan.es"}>
                    <Image
                      height={39}
                      width={139}
                      src={"/images/damianpanes.svg"}
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="max-w-sm">
            <div className=" flex flex-col items-center -mb-5 -rotate-2">
              <Image
                src="/images/tagbrain.png"
                height={63}
                width={290}
                alt="Tag del Lider"
              />
            </div>
            <div className="card bg-white text-black p-6 ">
              <Image
                className=" mx-auto"
                src="/images/jesus.png"
                width={342}
                height={295}
              />
              <p className="text-2xl font-bold text-left mt-4 font-special-elite-regular">
                Jesús Rojas - CTO
              </p>
              <p className="text-md text-gray-700mt-2 font-inter-regular text-left mb-8">
                Me apasiona liderar proyectos y desarrollar soluciones
                innovadoras y personalizadas que impulsen el crecimiento de tu
                empresa.
              </p>
            </div>
            <div className="p-4 -mt-8">
              <div className=" flex gap-2 w-full ">
                <div className=" w-full flex flex-col h-[12vh] items-center -mt-6 -rotate-4 mb-4">
                  <Image src={"/images/lineas.svg"} width={153} height={25} />
                </div>
                <div className="bg-[#FFD667] w-full flex flex-col h-[12vh] items-center -mt-6 rotate-4 mb-4">
                  <span className="flex w-full h-[3vh] bg-[#E0BD5C] "></span>
                  <p className="text-black font-medium mt-2 font-patrick-hand-regular text-2xl ">
                    Social Networks
                  </p>
                  <div className="flex gap-2 mt-2">
                    <Link href={"https://www.instagram.com/damian.panes/"}>
                      <Instagram size={24} className="text-black" />
                    </Link>
                    <Link href={"https://www.youtube.com/@damianpanes"}>
                      <Youtube size={24} className="text-black" />
                    </Link>
                    <Link href={"https://github.com/damkandev"}>
                      <Github size={24} className="text-black" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="teamcards grid grid-cols-2 lg:grid-cols-3 mt-6 gap-2 justify-center">
            <TeamCard image="marilyncelis" name="Marilyn Celis" role="Backend" instagram="damian.panes" youtube="damianpanes" github="damkandev" />
            <TeamCard image="josuepalma" name="Josué Palma" role="Frontend" instagram="damian.panes" youtube="damianpanes" github="damkandev" />
            <TeamCard image="ivanbelasich" name="Ivan Belasich" role="Frontend" instagram="damian.panes" youtube="damianpanes" github="damkandev" />
            <TeamCard image="agustinaltamirano" name="Agustin Altamirano" role="Backend" instagram="damian.panes" youtube="damianpanes" github="damkandev" />
            <TeamCard image="felipefigueroa" name="Felipe Figueroa" role="Backend" instagram="damian.panes" youtube="damianpanes" github="damkandev" />
            <TeamCard image="kevinbriceño" name="Kevin Briceño" role="Backend" instagram="damian.panes" youtube="damianpanes" github="damkandev" />
          </div>
        </div>
      </div>
    </div>
  );
}
