"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./Navbar.module.css";

import Image from "next/image";

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
                    <Image
                        src="/images/logo/logo.webp"
                        alt="Logo"
                        width={140}
                        height={40}
                        className="rounded-md"
                    />
                </Link>

                <div className={`${styles.navLinks} ${mobileMenuOpen ? styles.open : ""}`}>
                    <a href="#inicio" onClick={() => setMobileMenuOpen(false)}>Inicio</a>
                    <a href="#ventajas" onClick={() => setMobileMenuOpen(false)}>Ventajas</a>
                    <a href="#nosotros" onClick={() => setMobileMenuOpen(false)}>Nosotros</a>
                    <a href="#equipos" onClick={() => setMobileMenuOpen(false)}>Equipos</a>
                    <a href="#servicios-complementarios" onClick={() => setMobileMenuOpen(false)}>Otros servicios</a>
                    <a href="#testimonios" onClick={() => setMobileMenuOpen(false)}>Opiniones</a>
                    <a href="#reservar" onClick={() => setMobileMenuOpen(false)} className={styles.mobileCta}>Separar equipo</a>
                </div>

                <div className={styles.actions}>
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
        </nav>
    );
}
