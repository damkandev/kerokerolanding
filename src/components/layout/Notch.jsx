"use client"
import { House, Box, BriefcaseBusiness, BookUser, Users } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Link from "next/link";

export default function Notch() {
  const [activeLink, setActiveLink] = useState(0);
  
  const iconRefs = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)];
  
  // Define the sections that correspond to each navigation icon
  const sections = [
    { id: "header", index: 0 },
    { id: "services", index: 1 },
    // Add more sections as they become available in your page
    { id: "projects", index: 2 },
    { id: "contact", index: 3 },
    { id: "team", index: 4 },
  ];

  useEffect(() => {
    // Register ScrollToPlugin
    gsap.registerPlugin(ScrollToPlugin);

    // Set up animation for icons
    iconRefs.forEach((ref, index) => {
      const iconElement = ref.current;
      if (!iconElement) return;
      
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

    // Set up Intersection Observer to detect which section is in view
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -20% 0px',
      threshold: 0.3, // Lower threshold for easier detection
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Find which navigation index this section corresponds to
          const sectionId = entry.target.id;
          const sectionData = sections.find(section => section.id === sectionId);
          
          if (sectionData) {
            setActiveLink(sectionData.index);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    // Observe all sections
    sections.forEach(section => {
      const element = document.getElementById(section.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      // Clean up the observer
      observer.disconnect();
    };
  }, []);

  const handleLinkClick = (index, e) => {
    e.preventDefault(); 
    setActiveLink(index);
    
    // Get the section ID that corresponds to this index
    const targetSection = sections.find(section => section.index === index);
    if (targetSection) {
      gsap.to(window, {
        duration: 1.2,
        scrollTo: {
          y: `#${targetSection.id}`,
          offsetY: 0
        },
        ease: "power3.inOut"
      });
    }
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
        href="#services" 
        ref={iconRefs[1]} 
        className={`border border-white/25 p-4 rounded-md transition-colors ${activeLink === 1 ? 'bg-[#9BFFB1]' : ''}`}
        onClick={(e) => handleLinkClick(1, e)}
      >
        <Box size={25} color={activeLink === 1 ? "#142418" : "#9BFFB1"} />
      </Link>
      <Link 
        href="#projects" 
        ref={iconRefs[2]} 
        className={`border border-white/25 p-4 rounded-md transition-colors ${activeLink === 2 ? 'bg-[#9BFFB1]' : ''}`}
        onClick={(e) => handleLinkClick(2, e)}
      >
        <BriefcaseBusiness size={25} color={activeLink === 2 ? "#142418" : "#9BFFB1"} />
      </Link>
      <Link 
        href="#contact" 
        ref={iconRefs[3]} 
        className={`border border-white/25 p-4 rounded-md transition-colors ${activeLink === 3 ? 'bg-[#9BFFB1]' : ''}`}
        onClick={(e) => handleLinkClick(3, e)}
      >
        <BookUser size={25} color={activeLink === 3 ? "#142418" : "#9BFFB1"} />
      </Link>
      <Link 
        href="#team" 
        ref={iconRefs[4]} 
        className={`border border-white/25 p-4 rounded-md transition-colors ${activeLink === 4 ? 'bg-[#9BFFB1]' : ''}`}
        onClick={(e) => handleLinkClick(4, e)}
      >
        <Users size={25} color={activeLink === 4 ? "#142418" : "#9BFFB1"} />
      </Link>
    </div>
  );
}
