"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const PaperTexture = dynamic(
  () =>
    import("@paper-design/shaders-react").then(
      (module) => module.PaperTexture,
    ),
  { ssr: false },
);

export function PaperShader() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if ("requestIdleCallback" in window) {
      const idleId = window.requestIdleCallback(() => setIsReady(true), {
        timeout: 1200,
      });

      return () => window.cancelIdleCallback(idleId);
    }

    const timeoutId = globalThis.setTimeout(() => setIsReady(true), 250);
    return () => globalThis.clearTimeout(timeoutId);
  }, []);

  if (!isReady) return null;

  return (
    <PaperTexture
      aria-hidden="true"
      className="paper-shader-overlay"
      width="100%"
      height="100%"
      colorBack="#ffffff"
      colorFront="#9fadbc"
      contrast={0.3}
      roughness={0.4}
      fiber={0.3}
      fiberSize={0.2}
      crumples={0.3}
      crumpleSize={0.35}
      folds={0.65}
      foldCount={5}
      drops={0.2}
      fade={0}
      seed={5.8}
      scale={0.6}
      fit="cover"
      minPixelRatio={1}
      maxPixelCount={1_200_000}
    />
  );
}
