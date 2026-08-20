"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { useEffect, useId, useRef, useState } from "react";

import { navItems } from "./data";
import { IconMask } from "./IconMask";
import { PressableLink } from "./PressableButton";

function RollingNavLabel({ label }: { label: string }) {
  return (
    <span aria-hidden="true" className="kk-nav-roll">
      {Array.from(label).map((letter, index) => (
        <span
          key={`${letter}-${index}`}
          className="kk-nav-roll-letter"
          style={{ "--letter-index": index } as CSSProperties}
        >
          <span className="kk-nav-roll-current">
            {letter === " " ? "\u00a0" : letter}
          </span>
          <span className="kk-nav-roll-next">
            {letter === " " ? "\u00a0" : letter}
          </span>
        </span>
      ))}
    </span>
  );
}

export function Header({ currentPath = "/" }: { currentPath?: string }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const mobileNavId = useId();
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

  return (
    <header className="grid min-h-[72px] grid-cols-[1fr_auto] items-center gap-3 border-y border-kk-border px-4 py-3 sm:min-h-[57px] sm:px-4 sm:py-0 md:grid-cols-[1fr_auto_1fr] lg:min-h-[63px] lg:px-[18px]">
      <Link
        href="/"
        className="flex items-center gap-1 text-kk-logo"
        aria-label="Kerokero inicio"
        onClick={() => setIsMenuOpen(false)}
      >
        <IconMask
          src="/figma/star.svg"
          className="size-7 text-[#598A56] sm:size-[22px] lg:size-6"
        />
        <span className="font-display text-[1.45rem] leading-none tracking-normal sm:text-[16.26px] lg:text-[18px]">
          KeroKero
        </span>
      </Link>

      <button
        ref={menuButtonRef}
        type="button"
        className="kk-menu-button inline-flex sm:hidden"
        aria-controls={mobileNavId}
        aria-expanded={isMenuOpen}
        aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
        onClick={() => setIsMenuOpen((open) => !open)}
      >
        <span aria-hidden="true" className="kk-menu-icon">
          <span />
          <span />
        </span>
      </button>

      <nav
        aria-label="Principal"
        className="order-3 col-span-2 hidden items-center justify-center gap-[18px] text-[10.77px] text-[#324232] sm:flex md:order-none md:col-span-1 lg:gap-5 lg:text-xs"
      >
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            aria-label={item.label}
            aria-current={currentPath === item.href ? "page" : undefined}
            className="kk-nav-link focus:outline-none focus-visible:ring-2 focus-visible:ring-kk-focus"
          >
            <RollingNavLabel label={item.label} />
          </Link>
        ))}
      </nav>

      <nav
        id={mobileNavId}
        aria-label="Principal móvil"
        aria-hidden={!isMenuOpen}
        inert={isMenuOpen ? undefined : true}
        className={`order-3 col-span-2 grid w-full overflow-hidden text-[1rem] text-[#324232] transition-[grid-template-rows,opacity,transform] duration-300 ease-out sm:hidden ${
          isMenuOpen
            ? "grid-rows-[1fr] translate-y-0 opacity-100"
            : "pointer-events-none grid-rows-[0fr] -translate-y-2 opacity-0"
        }`}
      >
        <div className="flex min-h-0 flex-col items-stretch gap-2 py-2">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              aria-label={item.label}
              aria-current={currentPath === item.href ? "page" : undefined}
              className="kk-nav-link min-h-11 rounded-kk-control px-2 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-kk-focus"
              onClick={() => setIsMenuOpen(false)}
            >
              <RollingNavLabel label={item.label} />
            </Link>
          ))}
          <PressableLink
            href="#contacto"
            className="mt-2 w-full px-0"
            onClick={() => setIsMenuOpen(false)}
          >
            Conversemos
          </PressableLink>
        </div>
      </nav>

      <div className="hidden justify-self-end sm:block">
        <PressableLink
          href="#contacto"
          className="w-full px-0 sm:w-[107px] lg:w-[118px]"
        >
          Conversemos
        </PressableLink>
      </div>
    </header>
  );
}
