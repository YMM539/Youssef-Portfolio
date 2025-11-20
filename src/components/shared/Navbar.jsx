'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Container from '../ui/Container.jsx';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen((prev) => !prev);
    const closeMenu = () => setIsOpen(false);

    return (
        <header className="sticky top-4 inset-x-0 z-50 w-full bg-transparent">
            <Container>
                <nav
                    className="pointer-events-auto mx-auto max-w-5xl bg-[var(--background)] border-2 border-[var(--foreground)] rounded-xl shadow-lg px-4 py-3 flex items-center justify-between gap-4 transition-all duration-300 backdrop-blur-sm"
                    aria-label="Primary Navigation"
                >
                    {/* Logo */}
                    <div className="flex items-center gap-3 no-underline cursor-default">
                        <span className="text-2xl font-extrabold text-[var(--foreground)]">
                            &lt;YMM/&gt;
                        </span>
                    </div>

                    {/* Right controls */}
                    <div className="flex items-center gap-3">
                        {/* Desktop links */}
                        <ul className="hidden md:flex items-center gap-8 px-9">
                            {[ 
                                { href: '/', label: 'Home' },
                                { href: '/#about', label: 'About' },
                                { href: '/#skills', label: 'Skills' },
                                { href: '/#projects', label: 'Projects' },
                                { href: '/#contact', label: 'Contact' },
                            ].map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        onClick={closeMenu}
                                        className="relative text-sm font-medium text-[var(--foreground)] hover:text-[var(--accent)] transition-colors duration-300 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[var(--accent)] after:transition-all after:duration-300 hover:after:w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        {/* Mobile menu button */}
                        <button
                            type="button"
                            onClick={toggleMenu}
                            aria-label="Toggle menu"
                            aria-expanded={isOpen}
                            aria-controls="mobile-menu"
                            className="md:hidden p-2 rounded-md text-[var(--foreground)] border-2 border-current hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
                        >
                            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </nav>

                {/* Mobile dropdown */}
                <div
                    id="mobile-menu"
                    className={`md:hidden mt-2 mx-auto max-w-5xl overflow-hidden pointer-events-auto transition-all duration-500 ease-[cubic-bezier(0.68,-0.55,0.27,1.55)] origin-top transform-gpu
                        ${isOpen ? 'max-h-[320px] opacity-100 scale-100' : 'max-h-0 opacity-0 scale-95'}`}
                    aria-hidden={!isOpen}
                    role="menu"
                >
                    <div className="bg-[var(--background)] border-2 border-t-0 border-[var(--foreground)] rounded-b-xl shadow-lg px-4 py-4">
                        <ul className="flex flex-col gap-2">
                            {[ 
                                { href: '/', label: 'Home' },
                                { href: '/#about', label: 'About' },
                                { href: '/#skills', label: 'Skills' },
                                { href: '/#projects', label: 'Projects' },
                                { href: '/#contact', label: 'Contact' },
                            ].map((link, idx) => (
                                <li
                                    key={link.href}
                                    className={`transition-all duration-300 ease-out ${isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4' }`}
                                    style={{ transitionDelay: `${idx * 80}ms` }}
                                    role="none"
                                >
                                    <Link
                                        href={link.href}
                                        onClick={closeMenu}
                                        className="group relative block py-2 px-3 rounded-md text-[var(--foreground)] hover:bg-[var(--hover)] transition-colors font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
                                        role="menuitem"
                                    >
                                        <span className="relative z-10">{link.label}</span>
                                        <span className="absolute inset-0 rounded-md bg-gradient-to-r from-transparent to-[var(--accent)] opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </Container>
        </header>
    );
}
