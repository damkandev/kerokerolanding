"use client"
import { House, Box, BriefcaseBusiness, BookUser, Users } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import Link from "next/link";

export default function Notch() {
  const [activeLink, setActiveLink] = useState(0);
  
  const iconRefs = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)];
  
  useEffect(() => {
    iconRefs.forEach((ref, index) => {
      const iconElement = ref.current;
      
      const enterAnimation = gsap.timeline({ 
        paused: true,
      })
        .to(iconElement.children[0], { 
          scale: 0.8, 
          rotation: 15, 
          duration: 0.4,
          ease: "power2.out"
        })
        .to(iconElement.children[0], { 
          scale: 1, 
          rotation: 0, 
          duration: 0.4,
          ease: "elastic.out(1, 0.3)" 
        });
      
      iconElement.addEventListener("mouseenter", () => enterAnimation.restart());
    });
  }, []);

  const handleLinkClick = (index, e) => {
    e.preventDefault(); 
    setActiveLink(index);
  };

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 flex border border-white/25 p-2 gap-2 rounded-xl w-fit bg-[#020A05]/60 backdrop-blur-xl">
      <Link 
        href="#header" 
        ref={iconRefs[0]} 
        className={`border border-white/25 p-4 rounded-md transition-colors ${activeLink === 0 ? 'bg-[#9BFFB1]' : ''}`}
        onClick={(e) => handleLinkClick(0, e)}
      >
        <House size={25} color={activeLink === 0 ? "#142418" : "#9BFFB1"} />
      </Link>
      <Link 
        href="#" 
        ref={iconRefs[1]} 
        className={`border border-white/25 p-4 rounded-md transition-colors ${activeLink === 1 ? 'bg-[#9BFFB1]' : ''}`}
        onClick={(e) => handleLinkClick(1, e)}
      >
        <Box size={25} color={activeLink === 1 ? "#142418" : "#9BFFB1"} />
      </Link>
      <Link 
        href="#" 
        ref={iconRefs[2]} 
        className={`border border-white/25 p-4 rounded-md transition-colors ${activeLink === 2 ? 'bg-[#9BFFB1]' : ''}`}
        onClick={(e) => handleLinkClick(2, e)}
      >
        <BriefcaseBusiness size={25} color={activeLink === 2 ? "#142418" : "#9BFFB1"} />
      </Link>
      <Link 
        href="#" 
        ref={iconRefs[3]} 
        className={`border border-white/25 p-4 rounded-md transition-colors ${activeLink === 3 ? 'bg-[#9BFFB1]' : ''}`}
        onClick={(e) => handleLinkClick(3, e)}
      >
        <BookUser size={25} color={activeLink === 3 ? "#142418" : "#9BFFB1"} />
      </Link>
      <Link 
        href="#" 
        ref={iconRefs[4]} 
        className={`border border-white/25 p-4 rounded-md transition-colors ${activeLink === 4 ? 'bg-[#9BFFB1]' : ''}`}
        onClick={(e) => handleLinkClick(4, e)}
      >
        <Users size={25} color={activeLink === 4 ? "#142418" : "#9BFFB1"} />
      </Link>
    </div>
  );
}
