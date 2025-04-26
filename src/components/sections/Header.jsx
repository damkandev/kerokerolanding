"use client"
import Image from "next/image";
import Button from "@/components/ui/Button";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";

export default function Header() {
  const logoRef = useRef(null);
  const [lastMousePosition, setLastMousePosition] = useState({ x: 0, y: 0 });
  const [lastMouseTime, setLastMouseTime] = useState(0);
  
  useEffect(() => {
    const logo = logoRef.current;
    
    const trackMouseMovement = (e) => {
      setLastMousePosition({ x: e.clientX, y: e.clientY });
      setLastMouseTime(Date.now());
    };
    
    const handleMouseEnter = (e) => {
      const currentTime = Date.now();
      const timeDiff = currentTime - lastMouseTime;
      
      if (timeDiff > 0) {
        const xDiff = e.clientX - lastMousePosition.x;
        const yDiff = e.clientY - lastMousePosition.y;
        const distance = Math.sqrt(xDiff * xDiff + yDiff * yDiff);
        
        const speed = distance / timeDiff;
        
        const duration = Math.max(0.3, Math.min(2, 1.5 / (speed * 10 + 0.1)));
        
        gsap.to(logo, {
          rotationY: 360,
          duration: duration,
          ease: "power2.out",
          onComplete: () => {
            gsap.set(logo, { rotationY: 0 });
          }
        });
      } else {
        gsap.to(logo, {
          rotationY: 360,
          duration: 1.5,
          ease: "power2.out",
          onComplete: () => {
            gsap.set(logo, { rotationY: 0 });
          }
        });
      }
    };
    
    if (logo) {
      document.addEventListener("mousemove", trackMouseMovement);
      logo.addEventListener("mouseenter", handleMouseEnter);
      
      return () => {
        document.removeEventListener("mousemove", trackMouseMovement);
        logo.removeEventListener("mouseenter", handleMouseEnter);
      };
    }
  }, [lastMousePosition, lastMouseTime]);
  
  return (
    <div className="h-screen">
      <section className="header grid grid-cols-6 gap-4 h-full min-h-screen p-[5vw]" id="header">
        <div className="col-span-4 flex flex-col justify-between bg-[#030B07] border border-[#9BFFB1] rounded-[15px] p-6">
          <div ref={logoRef} className="inline-block w-fit cursor-pointer" style={{ perspective: "1000px" }}>
            <Image
              src="/logos/logo_kerokero.svg"
              height={40}
              width={40}
              alt="Kerokero Logo"
            />
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="font-clash-display-bold text-[#9BFFB1] text-5xl">
              Whatever you need, we do it.
            </h1>
            <p className="font-inter-regular text-[#D3FFDD] max-w-[37vw] text-lg">
              We have been developing software tailored to your needs for years,
              always trying to make your company's workflow much more efficient.
            </p>
            <div className="flex">
              <Button link={true} href="" variant="primary">
                Contact Us
              </Button>
              <Button link={true} href="" className="ml-2">
                See More
              </Button>
            </div>
          </div>
          <div></div>
        </div>
        <div
          className="col-span-2 flex items-center justify-center bg-cover bg-center bg-no-repeat rounded-[15px]"
          style={{ backgroundImage: "url('/images/green-waves.jpg')" }}
        ></div>
      </section>
    </div>
  );
}
