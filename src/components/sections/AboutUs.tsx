import styles from "./AboutUs.module.css";
import { IconCertificate, IconTrophy, IconClipboardCheck, IconShieldCheck, IconCheck } from "@tabler/icons-react";

export default function AboutUs() {
    return (
        <section className={styles.section} id="nosotros">
            <div className="container">
                <div className={styles.header} data-aos="fade-up">
                    <span className={styles.overline}>NUESTRA TRAYECTORIA</span>
                    <h2 className={styles.title}>Conoce a <span className="text-gradient">Alquiler de Ecógrafos</span></h2>
                    <p className={styles.subtitle}>Más de 10 años transformando el diagnóstico médico en Colombia con tecnología de punta y servicio confiable.</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 mb-12 lg:mb-20">
                    {/* Left Column: Story */}
                    <div className="w-full lg:w-5/12" data-aos="fade-right">
                        <div className={`${styles.storyCard} glass-card p-6 md:p-10 lg:p-12 h-full flex flex-col justify-center`}>
                            <h3 className={styles.storyTitle}>Nuestra Historia</h3>
                            <p className={styles.storyText}>
                                <strong>Alquiler de Ecógrafos</strong> nació de una necesidad real: los profesionales médicos colombianos requerían acceso a tecnología de diagnóstico de alta gama sin el peso financiero de una inversión millonaria. Somos especialistas en ecógrafos con respaldo oficial de <strong>Equibiomedic</strong>, el distribuidor autorizado de Mindray en Colombia.
                            </p>
                            <p className={styles.storyText}>
                                Entendemos el día a día de los consultorios, clínicas y servicios de diagnóstico móvil. Por eso ofrecemos una solución flexible que se adapta a tus necesidades, con equipos de última generación y soporte técnico real.
                            </p>
                        </div>
                    </div>

                    {/* Right Column: Stats & Certs */}
                    <div className="w-full lg:w-7/12 flex flex-col gap-6 lg:gap-8">
                        <div className={`${styles.statsCard} glass-card p-6 md:p-8 w-full`} data-aos="fade-up" data-aos-delay="100">
                            <h4 className={styles.statsTitle}>Números que Hablan</h4>
                            <div className="grid grid-cols-2 gap-4 md:gap-6">
                                <div className={styles.statItem}>
                                    <div className={styles.statNumber}>5+</div>
                                    <div className={styles.statLabel}>Años de Experiencia</div>
                                </div>
                                <div className={styles.statItem}>
                                    <div className={styles.statNumber}>200+</div>
                                    <div className={styles.statLabel}>Equipos Entregados</div>
                                </div>
                                <div className={styles.statItem}>
                                    <div className={styles.statNumber}>15+</div>
                                    <div className={styles.statLabel}>Clinicas Cubiertas</div>
                                </div>
                                <div className={styles.statItem}>
                                    <div className={styles.statNumber}>24/7</div>
                                    <div className={styles.statLabel}>Soporte Técnico</div>
                                </div>
                            </div>
                        </div>

                        <div className={`${styles.certificationsCard} glass-card p-6 md:p-8 w-full`} data-aos="fade-up" data-aos-delay="200">
                            <h4 className={styles.certTitle}>Certificaciones y Respaldo</h4>
                            <div className="flex flex-col gap-4">
                                <div className={styles.certItem}>
                                    <div className={styles.certIconWrapper}>
                                        <IconClipboardCheck className={styles.certIconSvg} />
                                    </div>
                                    <div>
                                        <strong>INVIMA Certificado</strong>
                                        <p>Todos nuestros equipos cuentan con registro sanitario vigente</p>
                                    </div>
                                </div>
                                <div className={styles.certItem}>
                                    <div className={styles.certIconWrapper}>
                                        <IconTrophy className={styles.certIconSvg} />
                                    </div>
                                    <div>
                                        <strong>Distribuidor Oficial Mindray</strong>
                                        <p>Respaldado por Equibiomedic</p>
                                    </div>
                                </div>
                                <div className={styles.certItem}>
                                    <div className={styles.certIconWrapper}>
                                        <IconCertificate className={styles.certIconSvg} />
                                    </div>
                                    <div>
                                        <strong>ISO 9001:2015</strong>
                                        <p>Procesos certificados de calidad</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.assurance} data-aos="fade-up">
                    <div className={`${styles.assuranceCard} glass-card`}>
                        <div className={styles.assuranceContent}>
                            <div className={styles.assuranceIcon}>
                                <IconShieldCheck className={styles.assuranceIconSvg} stroke={1.5} />
                            </div>
                            <div className={styles.assuranceText}>
                                <h3>Garantía Total de Confianza</h3>
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
                            <a href="#contacto" className="btn-primary">Habla con un asesor</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}