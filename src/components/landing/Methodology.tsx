"use client";

import { useCallback, useEffect, useRef } from "react";
import { useAnimate } from "motion/react-mini";

import { methodologySteps, type MethodologyStep } from "./data";
import { IconMask } from "./IconMask";

const easing = [0.22, 1, 0.36, 1] as const;

type StoppableAnimation = { stop: () => void };

function MethodologyDiagram({ title }: { title: MethodologyStep["title"] }) {
  if (title === "Observamos") {
    return (
      <svg viewBox="0 0 300 180" className="methodology-diagram" aria-hidden="true">
        <path d="M18 58 C31 22 45 91 60 58 S88 24 102 59 S131 101 145 57 S173 30 187 59 S215 90 229 56 S256 20 282 58" data-main-path pathLength="1" className="methodology-trace" />
        <path d="M18 58 C31 22 45 91 60 58 S88 24 102 59 S131 101 145 57 S173 30 187 59 S215 90 229 56 S256 20 282 58" data-hover-flow pathLength="1" className="methodology-flow" />
        <g data-reveal="components">
          <path d="M18 104 C38 78 57 78 77 104 S116 130 136 104 S175 78 195 104 S234 130 282 104" data-component pathLength="1" className="methodology-trace methodology-trace-muted" />
          <path d="M18 128 C30 110 42 146 54 128 S78 110 90 128 S114 146 126 128 S150 110 162 128 S186 146 198 128 S222 110 234 128 S258 146 282 128" data-component pathLength="1" className="methodology-trace methodology-trace-muted" />
          <path d="M18 151 C30 140 42 162 54 151 S78 140 90 151 S114 162 126 151 S150 140 162 151 S186 162 198 151 S222 140 234 151 S258 162 282 151" data-component pathLength="1" className="methodology-trace methodology-trace-muted" />
          <text x="18" y="119" data-component className="methodology-label">sin(x)</text>
          <text x="18" y="143" data-component className="methodology-label">sin(3x)</text>
          <text x="18" y="173" data-component className="methodology-label">cos(7x)</text>
        </g>
      </svg>
    );
  }

  if (title === "Identificamos") {
    const points = [[30, 116], [49, 78], [68, 128], [89, 94], [109, 135], [126, 71], [142, 109], [161, 124], [182, 84], [202, 103], [221, 69], [240, 90], [260, 56], [274, 82]];
    const cluster = new Set([5, 8, 10, 12]);

    return (
      <svg viewBox="0 0 300 180" className="methodology-diagram" aria-hidden="true">
        <path d="M18 146 H282" className="methodology-axis" />
        {points.map(([cx, cy], index) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={cluster.has(index) ? 4 : 3} data-cluster={cluster.has(index) ? "true" : undefined} className={cluster.has(index) ? "methodology-point methodology-point-cluster" : "methodology-point"} />
        ))}
        <path d="M20 142 C65 141 105 136 141 117 C170 102 181 81 202 58 C222 36 250 28 280 27" data-main-path pathLength="1" className="methodology-trace" />
        <path d="M20 142 C65 141 105 136 141 117 C170 102 181 81 202 58 C222 36 250 28 280 27" data-hover-flow pathLength="1" className="methodology-flow" />
      </svg>
    );
  }

  if (title === "Construimos") {
    return (
      <svg viewBox="0 0 300 180" className="methodology-diagram" aria-hidden="true">
        <g data-tree-line>
          <path d="M150 43 V65 H88 V88 M150 65 H224 V88 M88 111 V134 H54 M88 134 H120" pathLength="1" className="methodology-branch methodology-branch-draw" />
          <path d="M150 43 V65 H88 V88 M150 65 H224 V88 M88 111 V134 H54 M88 134 H120" data-hover-flow pathLength="1" className="methodology-flow" />
        </g>
        <g data-tree-node>
          <circle cx="150" cy="42" r="14" className="methodology-node" />
          <circle cx="88" cy="101" r="14" className="methodology-node" />
          <circle cx="224" cy="101" r="14" className="methodology-node" />
          <circle cx="54" cy="147" r="12" className="methodology-node methodology-node-output" />
          <circle cx="120" cy="147" r="12" className="methodology-node methodology-node-output" />
        </g>
        <g data-tree-value className="methodology-value">
          <text x="150" y="46" textAnchor="middle">x1</text>
          <text x="88" y="105" textAnchor="middle">x2</text>
          <text x="224" y="105" textAnchor="middle">0.81</text>
          <text x="54" y="151" textAnchor="middle">0.12</text>
          <text x="120" y="151" textAnchor="middle">0.67</text>
          <text x="150" y="19" textAnchor="middle" className="methodology-label">x1 &gt; 0.62</text>
          <text x="88" y="77" textAnchor="middle" className="methodology-label">x2 &lt; 14</text>
        </g>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 300 180" className="methodology-diagram" aria-hidden="true">
      <path d="M18 92 H282" className="methodology-threshold" />
      <text x="24" y="84" className="methodology-label">umbral</text>
      <path d="M20 143 C52 143 68 148 87 136 S109 117 127 130 S156 147 175 123 S194 78 214 73 S247 75 280 43" data-main-path pathLength="1" className="methodology-trace" />
      <path d="M20 143 C52 143 68 148 87 136 S109 117 127 130 S156 147 175 123 S194 78 214 73 S247 75 280 43" data-hover-flow pathLength="1" className="methodology-flow" />
      <g data-reveal="action">
        <circle cx="280" cy="43" r="5" data-hover-action className="methodology-action" />
        <path d="M280 43 L262 24" className="methodology-branch" />
        <text x="206" y="21" className="methodology-label">accion</text>
      </g>
    </svg>
  );
}

function MethodologyCard({ step }: { step: MethodologyStep }) {
  const [scope, animate] = useAnimate<HTMLElement>();
  const prefersReducedMotion = useRef(false);
  const isHovering = useRef(false);
  const hoverIntent = useRef(0);
  const entrancePromise = useRef<Promise<void> | null>(null);
  const hoverAnimations = useRef<StoppableAnimation[]>([]);

  const playEntrance = useCallback(() => {
    if (prefersReducedMotion.current || !scope.current) return Promise.resolve();
    if (entrancePromise.current) return entrancePromise.current;

    entrancePromise.current = (async () => {
      if (step.title === "Construimos") {
        await animate("[data-tree-line]", { opacity: 1 }, { duration: 0.15, ease: easing });
        if (!scope.current) return;
        await animate(".methodology-branch-draw", { strokeDashoffset: 0 }, { duration: 0.55, ease: easing });
        if (!scope.current) return;
        await animate("[data-tree-node]", { opacity: 1, transform: "scale(1)" }, { duration: 0.35, ease: easing });
        if (!scope.current) return;
        await animate("[data-tree-value]", { opacity: 1 }, { duration: 0.3, ease: easing });
        return;
      }

      await animate("[data-main-path]", { strokeDashoffset: 0 }, { duration: 0.7, ease: easing });
      if (!scope.current) return;

      if (step.title === "Observamos") {
        await animate("[data-reveal='components']", { opacity: 1, transform: "translateY(0px)" }, { duration: 0.45, ease: easing });
        return;
      }

      if (step.title === "Identificamos") {
        await animate("[data-cluster='true']", { opacity: 1, transform: "scale(1)" }, { duration: 0.35, delay: 0.1, ease: easing });
        return;
      }

      await animate("[data-reveal='action']", { opacity: 1, transform: "translate(0px, 0px)" }, { duration: 0.35, ease: easing });
    })();

    return entrancePromise.current;
  }, [animate, scope, step.title]);

  const clearAmbientMotion = useCallback(() => {
    hoverAnimations.current.forEach((animation) => animation.stop());
    hoverAnimations.current = [];
  }, []);

  const stopAmbientMotion = useCallback(() => {
    clearAmbientMotion();
    const flow = scope.current?.querySelector<SVGPathElement>("[data-hover-flow]");
    hoverAnimations.current = flow
      ? [animate(flow, { opacity: 0 }, { duration: 0.18, ease: "linear" })]
      : [];

    if (step.title === "Resultados") {
      const action = scope.current?.querySelector<SVGCircleElement>("[data-hover-action]");
      if (action) {
        hoverAnimations.current.push(
          animate(action, { opacity: 1, transform: "scale(1)" }, { duration: 0.18, ease: easing }),
        );
      }
    }
  }, [animate, clearAmbientMotion, scope, step.title]);

  const startAmbientMotion = useCallback(() => {
    if (prefersReducedMotion.current) return;

    clearAmbientMotion();
    const flowElement = scope.current?.querySelector<SVGPathElement>("[data-hover-flow]");
    if (!flowElement) return;

    const currentDashOffset = Number.parseFloat(
      window.getComputedStyle(flowElement).strokeDashoffset,
    ) || 0;
    const flowReveal = animate(
      flowElement,
      { opacity: 0.85 },
      { duration: 0.18, ease: "linear" },
    );
    const flow = animate(
      flowElement,
      { strokeDashoffset: [currentDashOffset, currentDashOffset - 1] },
      { duration: 1.8, ease: "linear", repeat: Infinity },
    );
    hoverAnimations.current = [flowReveal, flow];

    if (step.title === "Resultados") {
      const action = scope.current?.querySelector<SVGCircleElement>("[data-hover-action]");
      if (action) {
        hoverAnimations.current.push(
          animate(
            action,
            { opacity: 0.45, transform: "scale(1.18)" },
            { duration: 0.675, ease: easing, repeat: Infinity, repeatType: "reverse" },
          ),
        );
      }
    }
  }, [animate, clearAmbientMotion, scope, step.title]);

  useEffect(() => {
    if (typeof window.matchMedia !== "function") return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    prefersReducedMotion.current = mediaQuery.matches;
    const updateMotionPreference = () => {
      prefersReducedMotion.current = mediaQuery.matches;
      if (mediaQuery.matches) {
        hoverIntent.current += 1;
        isHovering.current = false;
        clearAmbientMotion();
      }
    };

    mediaQuery.addEventListener("change", updateMotionPreference);

    if (mediaQuery.matches || typeof IntersectionObserver === "undefined") {
      return () => mediaQuery.removeEventListener("change", updateMotionPreference);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          void playEntrance();
          observer.disconnect();
        }
      },
      { threshold: 0.45 },
    );

    if (scope.current) observer.observe(scope.current);

    return () => {
      observer.disconnect();
      mediaQuery.removeEventListener("change", updateMotionPreference);
      clearAmbientMotion();
    };
  }, [clearAmbientMotion, playEntrance, scope]);

  const handlePointerEnter = () => {
    if (
      typeof window.matchMedia === "function" &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches
    ) {
      isHovering.current = true;
      const intent = ++hoverIntent.current;
      void playEntrance().then(() => {
        if (isHovering.current && hoverIntent.current === intent) {
          startAmbientMotion();
        }
      });
    }
  };

  const handlePointerLeave = () => {
    isHovering.current = false;
    hoverIntent.current += 1;
    stopAmbientMotion();
  };

  return (
    <article
      ref={scope}
      data-methodology-card={step.title}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      className={`methodology-card flex min-h-[316px] flex-col border p-[22px] shadow-[5px_5px_0_0_var(--kk-method-card-shadow)] lg:min-h-[348px] lg:p-6 ${
        step.featured
          ? "feature-card-grid border-kk-border-strong [--kk-method-card-shadow:#a2bba2]"
          : "kk-grid-bg border-[#bbc8ba] bg-[rgba(241,255,240,0.11)] [--kk-method-card-shadow:#bbc8ba]"
      }`}
    >
      <h3 className="font-serif text-[20.52px] font-bold leading-[0.93] text-kk-heading lg:text-[22.5px]">
        {step.title}
      </h3>
      <p className="mt-[10px] font-sans text-[10.86px] leading-[14px] text-kk-text lg:mt-[11px] lg:text-xs lg:leading-[15.5px]">
        {step.copy}
      </p>
      <div className="methodology-graphic mt-auto h-[135px] border border-[#bbc8ba] bg-kk-canvas lg:h-[149px]">
        <MethodologyDiagram title={step.title} />
      </div>
    </article>
  );
}

export function Methodology() {
  return (
    <section id="sobre-nosotros" aria-labelledby="methodology-title">
      <div className="methodology-banner-grid grid min-h-[160px] items-center gap-6 border-b border-kk-border-strong px-6 py-8 sm:min-h-[131px] sm:grid-cols-[minmax(0,1fr)_400px] sm:px-12 sm:py-6 lg:min-h-36 lg:grid-cols-[minmax(0,1fr)_440px] lg:px-[53px] lg:py-[26px]">
        <div className="flex items-center gap-5">
          <IconMask src="/icons/asterisk.svg" className="size-8 shrink-0 text-kk-heading lg:size-[35px]" />
          <h2 id="methodology-title" className="font-serif text-[clamp(2.15rem,9vw,2.5rem)] leading-[0.93] text-kk-heading sm:text-[34.45px] lg:text-[38px]">
            Cómo construimos ventaja
          </h2>
        </div>
        <p className="max-w-[400px] font-sans text-[10.86px] leading-[14px] text-kk-text sm:justify-self-end lg:max-w-[440px] lg:text-xs lg:leading-[15.5px]">
          Partimos por una decisión relevante para el negocio. Luego construimos, integramos y medimos el sistema que permite mejorarla.
        </p>
      </div>

      <div className="grid gap-8 bg-[#FBFFFB] px-6 py-10 sm:px-10 lg:grid-cols-[repeat(4,273px)] lg:gap-[21px] lg:px-[41px] lg:py-[41px]">
        {methodologySteps.map((step) => <MethodologyCard key={step.title} step={step} />)}
      </div>
    </section>
  );
}
