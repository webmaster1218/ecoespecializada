"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import styles from "./AboutUs.module.css";
import { Award, Trophy, ClipboardCheck, ShieldCheck, Check } from "lucide-react";
import CallButton from "../ui/CallButton";

export default function AboutUs({ city, description, titleText, titleHighlight }: { city?: string, description?: string, titleText?: string, titleHighlight?: string }) {
    return (
        <section className={styles.section} id="nosotros">
            <div className="container">
                <motion.div className={styles.header} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
                    <span className={styles.overline}>Nuestra trayectoria</span>
                    <h2 className={styles.title}>{titleText || "Conoce a"} <span className="text-gradient">{titleHighlight || "alquiler de ecógrafos"}</span></h2>
                    <p className={styles.subtitle}>{description || `Más de 10 años transformando el diagnóstico médico ${city ? `con presencia destacada en ${city}` : "desde Medellín para toda Colombia"} con tecnología de punta y servicio confiable.`}</p>
                </motion.div>

                <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 mb-12 lg:mb-20">
                    {/* Left Column: Story */}
                    <motion.div className="w-full lg:w-5/12" initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
                        <div className={`${styles.storyCard} glass-card p-6 md:p-10 lg:p-12 h-full flex flex-col justify-center`}>
                            <h3 className={styles.storyTitle}>Nuestra historia</h3>
                            <p className={styles.storyText}>
                                Hacemos parte integral de <strong>Equibiomedic</strong>, empresa líder en tecnología médica, pero nos enfocamos de manera especializada en el <strong>alquiler de ecógrafos</strong>. Nacimos de una necesidad real: facilitar el acceso a tecnología de diagnóstico de alta gama sin el peso financiero de una inversión millonaria.
                            </p>
                            <p className={styles.storyText}>
                                Entendemos el día a día de los consultorios, clínicas y servicios de diagnóstico móvil. Por eso ofrecemos una solución flexible que se adapta a tus necesidades, con equipos de última generación y soporte técnico real.
                            </p>
                        </div>
                    </motion.div>

                    {/* Right Column: Stats & Certs */}
                    <div className="w-full lg:w-7/12 flex flex-col gap-6 lg:gap-8">
                        <motion.div className={`${styles.statsCard} glass-card p-6 md:p-8 w-full`} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
                            <h4 className={styles.statsTitle}>Números que hablan</h4>
                            <div className="grid grid-cols-2 gap-4 md:gap-6">
                                <div className={styles.statItem}>
                                    <div className={styles.statNumber}>5+</div>
                                    <div className={styles.statLabel}>Años de experiencia</div>
                                </div>
                                <div className={styles.statItem}>
                                    <div className={styles.statNumber}>200+</div>
                                    <div className={styles.statLabel}>Equipos entregados</div>
                                </div>
                                <div className={styles.statItem}>
                                    <div className={styles.statNumber}>15+</div>
                                    <div className={styles.statLabel}>Clínicas cubiertas</div>
                                </div>
                                <div className={styles.statItem}>
                                    <div className={styles.statNumber}>24/7</div>
                                    <div className={styles.statLabel}>Soporte técnico</div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div className={`${styles.certificationsCard} glass-card p-6 md:p-8 w-full`} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
                            <h4 className={styles.certTitle}>Certificaciones y respaldo</h4>
                            <div className="flex flex-col gap-4">
                                <div className={styles.certItem}>
                                    <div className={styles.certIconWrapper}>
                                        <ClipboardCheck className={styles.certIconSvg} />
                                    </div>
                                    <div>
                                        <strong>INVIMA certificado</strong>
                                        <p>Todos nuestros equipos cuentan con registro sanitario vigente</p>
                                    </div>
                                </div>
                                <div className={styles.certItem}>
                                    <div className={styles.certIconWrapper}>
                                        <Trophy className={styles.certIconSvg} />
                                    </div>
                                    <div>
                                        <strong>Distribuidor oficial Mindray</strong>
                                        <p>Respaldado por Equibiomedic</p>
                                    </div>
                                </div>
                                <div className={styles.certItem}>
                                    <div className={styles.certIconWrapper}>
                                        <Award className={styles.certIconSvg} />
                                    </div>
                                    <div>
                                        <strong>ISO 9001:2015</strong>
                                        <p>Procesos certificados de calidad</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                <motion.div className={styles.assurance} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
                    <div className={`${styles.assuranceCard} glass-card`}>
                        <div className={styles.assuranceContent}>
                            <div className={styles.assuranceIcon}>
                                <ShieldCheck className={styles.assuranceIconSvg} strokeWidth={1.5} />
                            </div>
                            <div className={styles.assuranceText}>
                                <h3>Garantía total de confianza</h3>
                                <p>No alquilamos equipos, ofrecemos soluciones completas con:</p>
                                <ul className={styles.assuranceList}>
                                    <li>Capacitación inicial y soporte continuo incluido</li>
                                    <li>Mantenimiento preventivo y correctivo sin costo adicional</li>
                                    <li>Reemplazo inmediato en caso de falla técnica</li>
                                    <li>Actualización de software y calibraciones periódicas</li>
                                </ul>
                            </div>
                        </div>
                        <div className={styles.assuranceAction}>
                            <CallButton text="Llamar a un asesor" subtext="300 3608621" variant="highlight" />
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}