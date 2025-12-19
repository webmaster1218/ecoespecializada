"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
    const [formData, setFormData] = useState({
        name: "",
        city: "",
        equipment: ""
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
        // Aquí iría la lógica de envío del formulario
    };

    return (
        <footer className={styles.footer}>
            <div className="container">
                <div className={styles.grid}>
                    {/* Columna 1: Información de la empresa */}
                    <div className={styles.column}>
                        <h3 className={styles.logo}>Alquiler de Ecógrafos Colombia</h3>
                        <p className={styles.description}>
                            Especialistas en alquiler de ecógrafos Mindray con más de 10 años de experiencia transformando el diagnóstico médico en Colombia.
                        </p>
                        <div className={styles.certifications}>
                            <span className={styles.certBadge}>INVIMA Certificado</span>
                            <span className={styles.certBadge}>ISO 9001:2015</span>
                        </div>
                    </div>

                    {/* Columna 2: Contacto */}
                    <div className={styles.column}>
                        <h4 className={styles.columnHeader}>Contacto</h4>
                        <div className={styles.contactInfo}>
                            <div className={styles.contactItem}>
                                <span className={styles.icon}>💬</span>
                                <span>WhatsApp: +57 3005212664</span>
                            </div>
                            <div className={styles.contactItem}>
                                <span className={styles.icon}>📧</span>
                                <span>ecoespecializada@gmail.com</span>
                            </div>
                            <div className={styles.contactItem}>
                                <span className={styles.icon}>📍</span>
                                <span>Diagonal 47a #17sur-162 CS 105, Santa María de los Ángeles, Medellín</span>
                            </div>
                        </div>
                    </div>

                    {/* Columna 3: Servicios y Enlaces */}
                    <div className={styles.column}>
                        <h4 className={styles.columnHeader}>Servicios</h4>
                        <div className={styles.serviceLinks}>
                            <a href="#equipos" className={styles.link}>Alquiler de Ecógrafos</a>
                            <a href="#servicios-complementarios" className={styles.link}>Calibración de Equipos</a>
                            <a href="#comparativa" className={styles.link}>Por qué Alquilar</a>
                            <a href="#servicios-complementarios" className={styles.link}>Soporte Técnico</a>
                        </div>
                    </div>
                </div>

                {/* Bottom footer */}
                <div className={styles.bottom}>
                    <div className={styles.bottomContent}>
                        <div className={styles.copyright}>
                            <p>&copy; 2025 Alquiler de Ecógrafos Colombia. Todos los derechos reservados.</p>
                        </div>
                        <div className={styles.legalLinks}>
                            <Link href="/politicas" className={styles.link}>Política de Privacidad</Link>
                            <Link href="/politicas" className={styles.link}>Términos y Condiciones</Link>
                        </div>
                    </div>
                    <div className={styles.partners}>
                        <span className={styles.partnerLabel}>Respaldado por:</span>
                        <div className={styles.partnerLogos}>
                            <span className={styles.partnerLogo}>Mindray</span>
                            <span className={styles.partnerLogo}>Equibiomedic</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}