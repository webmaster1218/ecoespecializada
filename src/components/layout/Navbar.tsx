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
                        <a href="#equipos" onClick={() => setMobileMenuOpen(false)}>Equipos</a>
                        <a href="#nosotros" onClick={() => setMobileMenuOpen(false)}>Nosotros</a>
                        <a href="#servicios-complementarios" onClick={() => setMobileMenuOpen(false)}>Otros servicios</a>
                        <a href="#testimonios" onClick={() => setMobileMenuOpen(false)}>Testimonios</a>
                        <a href="#reservar" onClick={() => setMobileMenuOpen(false)} className={styles.mobileCta}>Separar equipo</a>
                    </div>

                    <div className={styles.actions}>
                        <CallButton 
                            text="Llamar" 
                            variant="outline" 
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
