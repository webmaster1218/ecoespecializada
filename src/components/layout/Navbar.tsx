"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import styles from "./Navbar.module.css";

import Image from "next/image";
import CallButton from "../ui/CallButton";

export default function Navbar() {
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Helper to determine if a link should be absolute or hash-only
    const getHref = (target: string) => {
        const cityPaths = ["/bogota", "/cali", "/barranquilla", "/cartagena", "/bucaramanga", "/pereira", "/cucuta"];
        const nestedCityPaths = cityPaths.map(p => `/colombia${p}`);
        const landingPaths = ["/", "/colombia", ...cityPaths, ...nestedCityPaths];
        
        const isLandingPage = landingPaths.some(p => pathname === p || pathname === `${p}/`);
        
        if (isLandingPage) {
            // On landing pages, use current path + hash for reliable same-page navigation
            const path = pathname === "/" ? "" : pathname;
            return `${path}${target}`;
        }
        
        // On non-landing pages (like product pages), redirect to home page section
        return `/${target}`;
    };

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
                        <div className={styles.logoWrapper}>
                            <Image
                                src="/images/logo/logo_alquilerdeecografos.webp"
                                alt="Logo"
                                fill
                                sizes="(max-width: 768px) 110px, 140px"
                                priority
                                className={styles.logoImg}
                            />
                        </div>
                    </Link>

                    <div className={`${styles.navLinks} ${mobileMenuOpen ? styles.open : ""}`}>
                        <Link href={getHref("#inicio")} onClick={() => setMobileMenuOpen(false)}>Inicio</Link>
                        <Link href={getHref("#ventajas")} onClick={() => setMobileMenuOpen(false)}>Ventajas</Link>
                        
                        {/* Dropdown Equipos */}
                        <div className={styles.dropdown}>
                            <Link href={getHref("#equipos")} className={styles.dropdownTrigger} onClick={() => setMobileMenuOpen(false)}>
                                Equipos
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </Link>
                            <div className={styles.dropdownMenu}>
                                <Link href={getHref("#equipos")} onClick={() => setMobileMenuOpen(false)}>Ver Todos</Link>
                                <Link href="/ecografo-z6" onClick={() => setMobileMenuOpen(false)}>Mindray Z6</Link>
                                <Link href="/ecografo-z60" onClick={() => setMobileMenuOpen(false)}>Mindray Z60</Link>
                                <Link href="/ecografo-m7" onClick={() => setMobileMenuOpen(false)}>Mindray M7</Link>
                            </div>
                        </div>

                        {!pathname.startsWith("/colombia") && (
                            <Link href="/colombia" onClick={() => setMobileMenuOpen(false)}>Colombia</Link>
                        )}

                        {/* Dropdown Ciudades - Solo visible en rutas de Colombia */}
                        {pathname.startsWith("/colombia") && (
                            <div className={styles.dropdown}>
                                <span className={styles.dropdownTrigger}>
                                    Ciudades
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </span>
                                <div className={styles.dropdownMenu}>
                                    <Link href="/colombia/bogota" onClick={() => setMobileMenuOpen(false)}>Bogotá</Link>
                                    <Link href="/colombia/cali" onClick={() => setMobileMenuOpen(false)}>Cali</Link>
                                    <Link href="/colombia/barranquilla" onClick={() => setMobileMenuOpen(false)}>Barranquilla</Link>
                                    <Link href="/colombia/cartagena" onClick={() => setMobileMenuOpen(false)}>Cartagena</Link>
                                    <Link href="/colombia/bucaramanga" onClick={() => setMobileMenuOpen(false)}>Bucaramanga</Link>
                                    <Link href="/colombia/pereira" onClick={() => setMobileMenuOpen(false)}>Pereira</Link>
                                    <Link href="/colombia/cucuta" onClick={() => setMobileMenuOpen(false)}>Cúcuta</Link>
                                </div>
                            </div>
                        )}

                        <Link href={getHref("#nosotros")} onClick={() => setMobileMenuOpen(false)}>Nosotros</Link>
                        <Link href={getHref("#servicios-complementarios")} onClick={() => setMobileMenuOpen(false)}>Servicios</Link>
                        <Link href={getHref("#testimonios")} onClick={() => setMobileMenuOpen(false)}>Testimonios</Link>
                        <div className={styles.mobileButtons}>
                            <CallButton
                                text="Llamar"
                                subtext="300 3608621"
                                variant="highlight"
                                className={styles.mobileCallButton}
                            />
                            <Link href={getHref("#reservar")} onClick={() => setMobileMenuOpen(false)} className={styles.mobileCta}>Separar equipo</Link>
                        </div>
                    </div>

                    <div className={styles.actions}>
                        <CallButton
                            text="Llamar"
                            subtext="300 3608621"
                            variant="highlight"
                            className={styles.desktopCta}
                        />
                        <Link href={getHref("#reservar")} className={`btn-primary ${styles.desktopCta}`}>
                            <span className="mr-2 text-xl">📅</span> Separar equipo
                        </Link>
                        <button
                            className={`${styles.mobileToggle} ${mobileMenuOpen ? styles.toggleOpen : ""}`}
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
