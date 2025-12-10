import Image from "next/image";
import styles from "./ProductCatalog.module.css";

export default function ProductCatalog() {
    return (
        <section className={styles.section} id="equipos">
            <div className="container">
                <div className={styles.header} data-aos="fade-up">
                    <h2 className={styles.title}>Tecnología Mindray a tu Alcance</h2>
                    <p className={styles.subtitle}>Equipos portátiles de alto rendimiento listos para tu consulta.</p>
                </div>

                <div className={styles.grid}>
                    {/* Card Z6 */}
                    <div className={`${styles.card} glass-card`} data-aos="fade-up">
                        <div className={styles.cardHeader}>
                            <h3 className={styles.productName}>Mindray Z6</h3>
                            <span className={styles.tag}>El Caballo de Batalla</span>
                        </div>

                        <div className={styles.priceContainer}>
                            <span className={styles.oldPrice}>$ 20.000</span>
                            <div className={styles.currentPrice}>$ 350.000<span className={styles.period}>/día</span></div>
                        </div>

                        <div className={styles.stock}>
                            <span className={styles.dot}></span> ¡Solo 2 unidades disponibles!
                        </div>

                        <div className={styles.imagePlaceholder}>
                            <Image
                                src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80"
                                alt="Mindray Z6"
                                fill
                                style={{ objectFit: 'cover', borderRadius: '8px' }}
                            />
                        </div>

                        <ul className={styles.specs}>
                            <li>✓ Ideal Obstetricia y Ginecología</li>
                            <li>✓ Batería de 90 min de autonomía</li>
                            <li>✓ <strong>3 Sondas Incluidas:</strong> Convexa, TV, Lineal</li>
                            <li>✓ Ligero: Solo 6.5kg de peso</li>
                        </ul>

                        <a href="#contacto" className={`btn-primary ${styles.fullWidthBtn}`}>Reservar Z6 Ahora</a>
                    </div>

                    {/* Card Z60 */}
                    <div className={`${styles.card} glass-card ${styles.featured}`} data-aos="fade-up" data-aos-delay="100">
                        <div className={styles.featuredBadge}>RECOMENDADO</div>
                        <div className={styles.cardHeader}>
                            <h3 className={styles.productName}>Mindray Z60</h3>
                            <span className={styles.tag}>Calidad Superior</span>
                        </div>

                        <div className={styles.priceContainer}>
                            <span className={styles.oldPrice}>$ 25.000</span>
                            <div className={styles.currentPrice}>$ 380.000<span className={styles.period}>/día</span></div>
                        </div>

                        <div className={styles.stock}>
                            <span className={styles.dot}></span> ¡Solo 2 unidades disponibles!
                        </div>

                        <div className={styles.imagePlaceholder}>
                            <Image
                                src="https://images.unsplash.com/photo-1583912267550-d4135e1975b9?auto=format&fit=crop&w=600&q=80"
                                alt="Mindray Z60"
                                fill
                                style={{ objectFit: 'cover', borderRadius: '8px' }}
                            />
                        </div>

                        <ul className={styles.specs}>
                            <li>✓ <strong>Doppler Color Avanzado</strong></li>
                            <li>✓ Pantalla Táctil de 15"</li>
                            <li>✓ Tecnologías iClear / iBeam</li>
                            <li>✓ Exportación DICOM nativa</li>
                            <li>✓ 3 Sondas Incluidas</li>
                        </ul>

                        <a href="#contacto" className={`btn-primary ${styles.fullWidthBtn}`}>Reservar Z60 Ahora</a>
                    </div>
                </div>
            </div>
        </section>
    );
}
