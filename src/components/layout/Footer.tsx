"use client";

import Link from "next/link";
import Image from "next/image";
import { IconBrandWhatsapp, IconMail, IconMapPin } from "@tabler/icons-react";
import styles from "./Footer.module.css";

export default function Footer() {
    // Removal of unused form logic if not needed, but keeping for now as per user request to just change icons/links

    return (
        <footer className={styles.footer}>
            <div className="container">
                <div className={styles.grid}>
                    {/* Columna 1: Información de la empresa */}
                    <div className={styles.column}>
                        <div className={styles.headerWithLogo}>
                            <h3 className={styles.logo}>Alquiler de Ecógrafos Colombia</h3>
                            <Link href="/login" className="hover:opacity-80 transition-opacity">
                                <Image
                                    src="/images/logo/logo_alquilerdeecografos.webp"
                                    alt="Logo Alquiler de Ecógrafos"
                                    width={86}
                                    height={58}
                                    className={styles.footerLogoImg}
                                />
                            </Link>
                        </div>
                        <p className={styles.description}>
                            Especialistas en alquiler de ecógrafos <a href="https://www.mindray.com/co" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 underline underline-offset-4 decoration-blue-500/30 transition-colors">Mindray</a> con más de 10 años de experiencia transformando el diagnóstico médico en Colombia.
                        </p>
                        <div className={styles.certifications}>
                            <span className={styles.certBadge}>INVIMA certificado</span>
                            <span className={styles.certBadge}>ISO 9001:2015</span>
                        </div>
                    </div>

                    {/* Columna 2: Contacto */}
                    <div className={styles.column}>
                        <h4 className={styles.columnHeader}>Contacto</h4>
                        <div className={styles.contactInfo}>
                            <div className={styles.contactItem}>
                                <span className={styles.icon}><IconBrandWhatsapp size={20} className="text-emerald-500" /></span>
                                <a href="https://wa.me/573005212664" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">WhatsApp: +57 3005212664</a>
                            </div>
                            <div className={styles.contactItem}>
                                <span className={styles.icon}><IconMail size={20} className="text-blue-400" /></span>
                                <a href="mailto:info@alquilerdeecografos.com" className="hover:text-blue-300 transition-colors">info@alquilerdeecografos.com</a>
                            </div>
                            <div className={styles.contactItem}>
                                <span className={styles.icon}><IconMapPin size={20} className="text-rose-500" /></span>
                                <span>Diagonal 47a #17sur-162 CS 105, Santa María de los Ángeles, Medellín</span>
                            </div>
                        </div>
                    </div>

                    {/* Columna 3: Servicios y Enlaces */}
                    <div className={styles.column}>
                        <h4 className={styles.columnHeader}>Servicios</h4>
                        <div className={styles.serviceLinks}>
                            <a href="#equipos" className={styles.link}>Alquiler de ecógrafos</a>
                            <a href="#servicios-complementarios" className={styles.link}>Calibración de equipos</a>
                            <a href="#comparativa" className={styles.link}>¿Por qué alquilar?</a>
                            <a href="#servicios-complementarios" className={styles.link}>Soporte técnico</a>
                        </div>
                    </div>

                    {/* Columna 4: Ubicación */}
                    <div className={styles.column}>
                        <h4 className={styles.columnHeader}>Ubicación</h4>
                        <div className={styles.mapContainer}>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521260322283!2d-75.5747532!3d6.1944771!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e44282b42afefe5%3A0x4eb9c71716356023!2sDiagonal%2047a%20%2317sur-162%2C%20Medell%C3%ADn%2C%20Antioquia!5e0!3m2!1ses-419!2sco!4v1736369400000!5m2!1ses-419!2sco"
                                width="100%"
                                height="150"
                                style={{ border: 0, borderRadius: '12px' }}
                                allowFullScreen={true}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </div>
                </div>

                {/* Bottom footer */}
                <div className={styles.bottom}>
                    <div className={styles.bottomContent}>
                        <div className={styles.copyright}>
                            <p>&copy; 2026 Alquiler de Ecógrafos Colombia. Todos los derechos reservados.</p>
                        </div>
                        <div className={styles.legalLinks}>
                            <Link href="/politicas" className={styles.link}>Política de privacidad</Link>
                        </div>
                    </div>
                    <div className={styles.partners}>
                        <span className={styles.partnerLabel}>Respaldado por:</span>
                        <div className={styles.partnerLogos}>
                            <a href="https://www.mindray.com/co" target="_blank" rel="noopener noreferrer" className={styles.partnerLogo}>Mindray</a>
                            <a href="https://equibiomedic.com/" target="_blank" rel="noopener noreferrer" className={styles.partnerLogo}>Equibiomedic</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}