"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./Navbar.module.css";

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
            <div className={`container ${styles.container}`}>
                <Link href="/" className={styles.logo}>
                    Eco<span className={styles.accent}>Alquiler</span>
                </Link>

                <div className={`${styles.navLinks} ${mobileMenuOpen ? styles.open : ""}`}>
                    <a href="#inicio" onClick={() => setMobileMenuOpen(false)}>Inicio</a>
                    <a href="#equipos" onClick={() => setMobileMenuOpen(false)}>Equipos</a>
                    <a href="#nosotros" onClick={() => setMobileMenuOpen(false)}>Nosotros</a>
                    <a href="#comparativa" onClick={() => setMobileMenuOpen(false)}>¿Por qué alquilar?</a>
                    <a href="#testimonios" onClick={() => setMobileMenuOpen(false)}>Opiniones</a>
                    <a href="https://wa.me/573000000000" className={styles.mobileCta}>Separar Equipo</a>
                </div>

                <div className={styles.actions}>
                    <a href="https://wa.me/573000000000" target="_blank" rel="noopener noreferrer" className={`btn-primary ${styles.desktopCta}`}>
                        📞 Separar Equipo
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
        </nav>
    );
}
