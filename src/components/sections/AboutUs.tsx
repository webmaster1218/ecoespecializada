import styles from "./AboutUs.module.css";

export default function AboutUs() {
    return (
        <section className={styles.section} id="nosotros">
            <div className="container">
                <div className={styles.header} data-aos="fade-up">
                    <h2 className={styles.title}>Conoce a <span className="text-gradient">EcoAlquiler Colombia</span></h2>
                    <p className={styles.subtitle}>Más de 10 años transformando el diagnóstico médico en Colombia con tecnología de punta y servicio confiable.</p>
                </div>

                <div className={styles.twoColumnLayout}>
                    <div className={styles.leftColumn} data-aos="fade-right">
                        <div className={styles.storyCard}>
                            <h3 className={styles.storyTitle}>Nuestra Historia</h3>
                            <p className={styles.storyText}>
                                EcoAlquiler nació de una necesidad real: los profesionales médicos colombianos requerían acceso a tecnología de diagnóstico de alta gama sin el peso financiero de una inversión millonaria. Somos especialistas en ecógrafos con respaldo oficial de <strong>Equibiomedic</strong>, el distribuidor autorizado de Mindray en Colombia.
                            </p>
                            <p className={styles.storyText}>
                                Entendemos el día a día de los consultorios, clínicas y servicios de diagnóstico móvil. Por eso ofrecemos una solución flexible que se adapta a tus necesidades, con equipos de última generación y soporte técnico real.
                            </p>
                        </div>
                    </div>

                    <div className={styles.rightColumn}>
                        <div className={`${styles.statsCard} glass-card`} data-aos="fade-up" data-aos-delay="100">
                            <h4 className={styles.statsTitle}>Números que Hablan</h4>
                            <div className={styles.statsGrid}>
                                <div className={styles.statItem}>
                                    <div className={styles.statNumber}>10+</div>
                                    <div className={styles.statLabel}>Años de Experiencia</div>
                                </div>
                                <div className={styles.statItem}>
                                    <div className={styles.statNumber}>500+</div>
                                    <div className={styles.statLabel}>Equipos Entregados</div>
                                </div>
                                <div className={styles.statItem}>
                                    <div className={styles.statNumber}>50+</div>
                                    <div className={styles.statLabel}>Ciudades Cubiertas</div>
                                </div>
                                <div className={styles.statItem}>
                                    <div className={styles.statNumber}>24/7</div>
                                    <div className={styles.statLabel}>Soporte Técnico</div>
                                </div>
                            </div>
                        </div>

                        <div className={`${styles.certificationsCard} glass-card`} data-aos="fade-up" data-aos-delay="200">
                            <h4 className={styles.certTitle}>Certificaciones y Respaldo</h4>
                            <div className={styles.certsList}>
                                <div className={styles.certItem}>
                                    <span className={styles.certIcon}>✅</span>
                                    <div>
                                        <strong>INVIMA Certificado</strong>
                                        <p>Todos nuestros equipos cuentan con registro sanitario vigente</p>
                                    </div>
                                </div>
                                <div className={styles.certItem}>
                                    <span className={styles.certIcon}>🏆</span>
                                    <div>
                                        <strong>Distribuidor Oficial Mindray</strong>
                                        <p>Respaldado por Equibiomedic, representante autorizado en Colombia</p>
                                    </div>
                                </div>
                                <div className={styles.certItem}>
                                    <span className={styles.certIcon}>📋</span>
                                    <div>
                                        <strong>ISO 9001:2015</strong>
                                        <p>Procesos certificados de calidad y gestión técnica</p>
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
                                <span className={styles.assuranceEmoji}>🛡️</span>
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
                            <a href="#contacto" className="btn-primary">Habla con un Experto</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}