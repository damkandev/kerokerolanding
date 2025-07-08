import Link from "next/link";
import { Instagram, Youtube, Github } from "lucide-react";
import Image from "next/image";

export default function TeamCard({image, name, role, github}) {
  return (
    <div className="bg-white p-4 w-fit mt-5">
      <Image src={`/images/team/${image}.png`} height={196} width={228} alt={name} />
      <p className="font-special-elite-regular text-2xl mt-4">{name}</p>
      <p className="text-[#0055D4] font-special-elite-regular text-xl">
        {role}
      </p>
      <div className="flex gap-2 mt-2">
        <Link href={`https://github.com/${github}`}>
          <Github size={24} className="text-black" />
        </Link>
      </div>
    </div>
  );
}
