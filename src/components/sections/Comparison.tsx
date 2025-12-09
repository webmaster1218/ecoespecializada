import styles from "./Comparison.module.css";

export default function Comparison() {
    return (
        <section className={styles.section} id="comparativa">
            <div className="container">
                <h2 className={styles.title} data-aos="fade-up">¿Por qué <span className="text-gradient">EcoAlquiler</span> es la decisión inteligente?</h2>

                <div className={styles.grid}>
                    {/* Columna Dolor */}
                    <div className={`${styles.card} ${styles.pain}`} data-aos="fade-right">
                        <h3 className={styles.cardTitle}>Comprar / Otros Proveedores</h3>
                        <ul className={styles.list}>
                            <li>
                                <span className={styles.icon}>💸</span>
                                <div>
                                    <strong>Inversión Masiva</strong>
                                    <p>Inviertes $80 Millones de contado o a crédito.</p>
                                </div>
                            </li>
                            <li>
                                <span className={styles.icon}>📉</span>
                                <div>
                                    <strong>Depreciación Inmediata</strong>
                                    <p>Tu equipo pierde valor desde el día 1.</p>
                                </div>
                            </li>
                            <li>
                                <span className={styles.icon}>🔧</span>
                                <div>
                                    <strong>Mantenimiento Costoso</strong>
                                    <p>Repuestos y visitas técnicas por tu cuenta.</p>
                                </div>
                            </li>
                            <li>
                                <span className={styles.icon}>⚠️</span>
                                <div>
                                    <strong>Riesgo de "Reacondicionados"</strong>
                                    <p>Equipos usados sin garantía real o dudosa procedencia.</p>
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* Columna Placer (EcoAlquiler) */}
                    <div className={`${styles.card} ${styles.pleasure} glass-card`} data-aos="fade-left">
                        <div className={styles.badge}>Mejor Opción</div>
                        <h3 className={styles.cardTitle}>EcoAlquiler Colombia</h3>
                        <ul className={styles.list}>
                            <li>
                                <span className={styles.icon}>💎</span>
                                <div>
                                    <strong>Canon desde $450k/mes</strong>
                                    <p>Sin cuota inicial millonaria. Flujo de caja libre.</p>
                                </div>
                            </li>
                            <li>
                                <span className={styles.icon}>🚀</span>
                                <div>
                                    <strong>Tecnología Siempre Actual</strong>
                                    <p>Cambia de equipo cuando quieras. Cero obsolescencia.</p>
                                </div>
                            </li>
                            <li>
                                <span className={styles.icon}>🛡️</span>
                                <div>
                                    <strong>Mantenimiento & Soporte $0</strong>
                                    <p>Cubierto 100% por Equibiomedic. Respaldo oficial.</p>
                                </div>
                            </li>
                            <li>
                                <span className={styles.icon}>🎁</span>
                                <div>
                                    <strong>3 Sondas Incluidas GRATIS</strong>
                                    <p>Convexa, Lineal y Transvaginal listas para usar.</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
