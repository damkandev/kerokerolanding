"use client";
import { ReactLenis } from "lenis/react";
import Header from "@/components/sections/Header";
import Services from "@/components/sections/Services";
import Portfolio from "@/components/sections/Portfolio";
export default function Home() {
  const lenisOptions = {
    lerp: 0.1,
    smooth: true,
    direction: "vertical",
  };
  return (
    <ReactLenis root options={lenisOptions}>
      <div className="h-screen">
        <Header />
        <Services />
        <Portfolio />
        <div className="h-full" id="about"></div>
        <div className="h-full" id="team"></div>
      </div>
    </ReactLenis>
  );
}
