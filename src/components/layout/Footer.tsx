"use client";

import { useState } from "react";
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
                        <h3 className={styles.logo}>EcoAlquiler Colombia</h3>
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
                                <span className={styles.icon}>📱</span>
                                <span>(601) 000-0000</span>
                            </div>
                            <div className={styles.contactItem}>
                                <span className={styles.icon}>💬</span>
                                <span>WhatsApp: +57 300-000-0000</span>
                            </div>
                            <div className={styles.contactItem}>
                                <span className={styles.icon}>📧</span>
                                <span>info@ecoalquilercolombia.com</span>
                            </div>
                            <div className={styles.contactItem}>
                                <span className={styles.icon}>📍</span>
                                <span>Calle 123 # 45-67, Bogotá D.C.</span>
                            </div>
                        </div>
                    </div>

                    {/* Columna 3: Formulario de contacto rápido */}
                    <div className={styles.column}>
                        <h4 className={styles.columnHeader}>Reserva Rápida</h4>
                        <form className={styles.quickForm} onSubmit={handleSubmit}>
                            <div className={styles.inputGroup}>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Tu nombre"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className={styles.input}
                                    required
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <input
                                    type="text"
                                    name="city"
                                    placeholder="Ciudad"
                                    value={formData.city}
                                    onChange={handleInputChange}
                                    className={styles.input}
                                    required
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <select
                                    name="equipment"
                                    value={formData.equipment}
                                    onChange={handleInputChange}
                                    className={styles.select}
                                    required
                                >
                                    <option value="">Selecciona equipo</option>
                                    <option value="z6">Mindray Z6 ($350/día)</option>
                                    <option value="z60">Mindray Z60 ($380/día)</option>
                                </select>
                            </div>
                            <button type="submit" className={styles.submitBtn}>
                                Solicitar Información
                            </button>
                            <p className={styles.disclaimer}>
                                Te contactaremos en menos de 2 horas
                            </p>
                        </form>
                    </div>
                </div>

                {/* Bottom footer */}
                <div className={styles.bottom}>
                    <div className={styles.bottomContent}>
                        <div className={styles.copyright}>
                            <p>&copy; 2025 EcoAlquiler Colombia. Todos los derechos reservados.</p>
                        </div>
                        <div className={styles.legalLinks}>
                            <a href="#" className={styles.link}>Política de Privacidad</a>
                            <a href="#" className={styles.link}>Términos y Condiciones</a>
                            <a href="#" className={styles.link}>Garantía</a>
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