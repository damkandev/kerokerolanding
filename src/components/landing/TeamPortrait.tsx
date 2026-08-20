"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import { PixelSwap } from "./PixelSwap";

const AUTO_SPARKLE_DELAY_MS = 350;
const AUTO_SPARKLE_HOLD_MS = 1900;

export interface TeamPortraitProps {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
}

export function TeamPortrait({ src, alt, sizes, className = "" }: TeamPortraitProps) {
  const [active, setActive] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const timerRef = useRef(0);

  const sparkle = useCallback((holdMs: number) => {
    setActive(true);
    window.clearTimeout(timerRef.current);
    if (holdMs > 0) {
      timerRef.current = window.setTimeout(() => setActive(false), holdMs);
    }
  }, []);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        timerRef.current = window.setTimeout(() => sparkle(AUTO_SPARKLE_HOLD_MS), AUTO_SPARKLE_DELAY_MS);
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      window.clearTimeout(timerRef.current);
    };
  }, [sparkle]);

  // Hover anywhere on the parent card triggers the swap, not just the small
  // portrait box.
  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const card = node.closest("article");
    const target = card ?? node;
    const onEnter = () => sparkle(0);
    const onLeave = () => setActive(false);

    target.addEventListener("mouseenter", onEnter);
    target.addEventListener("mouseleave", onLeave);
    return () => {
      target.removeEventListener("mouseenter", onEnter);
      target.removeEventListener("mouseleave", onLeave);
    };
  }, [sparkle]);

  return (
    <div ref={containerRef} className={`relative isolate ${className}`}>
      <PixelSwap
        active={active}
        trigger="manual"
        aspectRatio="1 / 1"
        className="h-full w-full"
        pixelSize={16}
        pixelScale={0.3}
        duration={1100}
        pixelDuration={380}
        pattern="diagonal"
        randomness={0.2}
        firstContent={
          <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
        }
        secondContent={
          <div className="relative h-full w-full">
            <Image
              src={src}
              alt=""
              fill
              sizes="16px"
              className="object-cover grayscale contrast-110 [image-rendering:pixelated]"
            />
            <div className="absolute inset-0 bg-kk-brand mix-blend-multiply" />
          </div>
        }
      />
    </div>
  );
}
