'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const linksRef = useRef([]);
    const navContainerRef = useRef(null);
    const dropdownRef = useRef(null);
    const pathname = usePathname();

    // Scroll animation for navbar width
    useEffect(() => {
        if (!navContainerRef.current || !dropdownRef.current) return;

        let lastScrollY = 0;
        let isScrollingDown = false;
        let ticking = false;

        const updateNavbar = (scrollY) => {
            const newIsScrollingDown = scrollY > lastScrollY && scrollY > 50;

            if (newIsScrollingDown !== isScrollingDown) {
                isScrollingDown = newIsScrollingDown;

                if (isScrollingDown) {
                    // Scroll down - reduce width
                    gsap.to([navContainerRef.current, dropdownRef.current], {
                        maxWidth: '32rem',
                        duration: 0.6,
                        ease: 'elastic.out(1, 0.5)'
                    });
                } else {
                    // Scroll up - restore width
                    gsap.to([navContainerRef.current, dropdownRef.current], {
                        maxWidth: '56rem',
                        duration: 0.6,
                        ease: 'elastic.out(1, 0.5)'
                    });
                }
            }

            lastScrollY = scrollY;
            ticking = false;
        };

        const handleScroll = () => {
            // Get scroll position from multiple sources for Lenis compatibility
            const scrollY = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;

            if (!ticking) {
                requestAnimationFrame(() => {
                    updateNavbar(scrollY);
                });
                ticking = true;
            }
        };

        // Listen to both scroll and wheel for better Lenis compatibility
        window.addEventListener('scroll', handleScroll, { passive: true });
        document.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
            document.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Menu open/close animation
    useEffect(() => {
        if (!menuRef.current) return;

        if (isMenuOpen) {
            // Open animation
            gsap.fromTo(menuRef.current,
                {
                    height: 0,
                    opacity: 0,
                    y: -10
                },
                {
                    height: 'auto',
                    opacity: 1,
                    y: 0,
                    duration: 0.4,
                    ease: 'power3.out'
                }
            );

            // Stagger links animation
            gsap.fromTo(linksRef.current,
                {
                    opacity: 0,
                    x: -20
                },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.3,
                    stagger: 0.08,
                    delay: 0.1,
                    ease: 'power2.out'
                }
            );
        } else {
            // Close animation
            gsap.to(menuRef.current, {
                height: 0,
                opacity: 0,
                y: -10,
                duration: 0.3,
                ease: 'power2.in'
            });
        }
    }, [isMenuOpen]);

    const isActive = (path) => pathname === path;

    return (
        <nav className="fixed top-4 left-4 right-4 z-[1000]">
            <div ref={navContainerRef} className="bg-[#1a1a1a] rounded-2xl px-4 py-4 flex items-center justify-between max-w-4xl mx-auto">
                {/* Hamburger menu */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="text-white hover:opacity-80 transition-opacity"
                    aria-label="Menu"
                >
                    {isMenuOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
                </button>

                {/* Navigation buttons */}
                <div className="flex items-center gap-2">
                    <Link
                        href="/servicios"
                        className="relative px-6 py-4 rounded-full bg-white text-black font-medium text-sm hover:bg-gray-100 transition-colors flex items-center gap-2"
                    >
                        {isActive('/servicios') && (
                            <span className="w-2 h-2 bg-black" />
                        )}
                        servicios
                    </Link>
                    <Link
                        href="/contacto"
                        className="relative px-6 py-4 rounded-sm bg-[#51B85F] text-white font-medium text-sm hover:bg-[#45a352] transition-colors flex items-center gap-2"
                    >
                        {isActive('/contacto') && (
                            <span className="w-2 h-2 bg-white" />
                        )}
                        contacto
                    </Link>

                </div>
            </div>

            {/* Dropdown menu */}
            <div
                ref={(el) => {
                    menuRef.current = el;
                    dropdownRef.current = el;
                }}
                className="bg-[#1a1a1a] rounded-2xl mt-2 px-6 overflow-hidden max-w-4xl mx-auto"
                style={{ height: 0, opacity: 0 }}
            >
                <div className="flex flex-col gap-4 py-6">
                    <Link
                        ref={el => linksRef.current[0] = el}
                        href="/"
                        className="text-white hover:opacity-80 text-lg flex items-center gap-2"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        {isActive('/') && (
                            <span className="w-2 h-2 bg-white" />
                        )}
                        inicio
                    </Link>
                    <Link
                        ref={el => linksRef.current[0] = el}
                        href="/sobre-nosotros"
                        className="text-white hover:opacity-80 text-lg flex items-center gap-2"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        {isActive('/sobre-nosotros') && (
                            <span className="w-2 h-2 bg-white" />
                        )}
                        sobre nosotros
                    </Link>
                    <Link
                        ref={el => linksRef.current[1] = el}
                        href="/como-funciona"
                        className="text-white hover:opacity-80 text-lg flex items-center gap-2"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        {isActive('/como-funciona') && (
                            <span className="w-2 h-2 bg-white" />
                        )}
                        como funciona
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
