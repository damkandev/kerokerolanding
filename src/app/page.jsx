"use client";
import { ReactLenis } from "lenis/react";
import { useEffect } from "react";
import Header from "@/components/sections/Header";

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
        <Header />
      </div>
    </ReactLenis>
  );
}
