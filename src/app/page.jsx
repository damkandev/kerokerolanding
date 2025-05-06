"use client"
import { ReactLenis } from "lenis/react";
import Header from "@/components/sections/Header";
import Services from "@/components/sections/Services";
import Portfolio from "@/components/sections/Portfolio";
import Contact from "@/components/sections/Contact";
import Team from "@/components/sections/Team";

export default function Home() {
  const lenisOptions = {
    lerp: 0.1,
    smooth: true,
    direction: "vertical",
  };

  return (
    <ReactLenis root options={lenisOptions}>
      <div className="h-fit">
        <Header />
        <Services />
        <Portfolio />
        <Contact />
        <Team />
      </div>
    </ReactLenis>
  );
}
