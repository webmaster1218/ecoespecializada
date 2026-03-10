"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./Navbar.module.css";

import Image from "next/image";
import CallButton from "../ui/CallButton";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
            <div className={styles.brandingBar}>
                <span className={styles.brandLabel}>Una marca de</span>
                <Image
                    src="/images/logo/equibiomedic-new.png"
                    alt="Equibiomedic Logo"
                    width={120}
                    height={24}
                    className={styles.brandLogo}
                />
            </div>
            <div className={styles.navMain}>
                <div className={`container ${styles.container}`}>
                    <Link href="/" className={styles.logo}>
                        <Image
                            src="/images/logo/logo_alquilerdeecografos.webp"
                            alt="Logo"
                            width={140}
                            height={40}
                            className="rounded-md"
                        />
                    </Link>

                    <div className={`${styles.navLinks} ${mobileMenuOpen ? styles.open : ""}`}>
                        <a href="#inicio" onClick={() => setMobileMenuOpen(false)}>Inicio</a>
                        <a href="#ventajas" onClick={() => setMobileMenuOpen(false)}>Ventajas</a>
                        
                        {/* Dropdown Equipos */}
                        <div className={styles.dropdown}>
                            <a href="#equipos" className={styles.dropdownTrigger} onClick={() => setMobileMenuOpen(false)}>
                                Equipos
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </a>
                            <div className={styles.dropdownMenu}>
                                <a href="#equipos" onClick={() => setMobileMenuOpen(false)}>Ver Todos</a>
                                <Link href="/ecografo-z6" onClick={() => setMobileMenuOpen(false)}>Mindray Z6</Link>
                                <Link href="/ecografo-z60" onClick={() => setMobileMenuOpen(false)}>Mindray Z60</Link>
                            </div>
                        </div>

                        <a href="#nosotros" onClick={() => setMobileMenuOpen(false)}>Nosotros</a>
                        <a href="#servicios-complementarios" onClick={() => setMobileMenuOpen(false)}>Otros servicios</a>
                        <a href="#testimonios" onClick={() => setMobileMenuOpen(false)}>Testimonios</a>
                        <a href="#reservar" onClick={() => setMobileMenuOpen(false)} className={styles.mobileCta}>Separar equipo</a>
                    </div>

                    <div className={styles.actions}>
                        <CallButton
                            text="Llamar"
                            subtext="300 521 2664"
                            variant="highlight"
                            className={styles.desktopCta}
                        />
                        <a href="#reservar" className={`btn-primary ${styles.desktopCta}`}>
                            <span className="mr-2 text-xl">📅</span> Separar equipo
                        </a>
                        <button
                            className={styles.mobileToggle}
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            ☰
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
