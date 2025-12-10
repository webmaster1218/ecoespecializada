import styles from "./Comparison.module.css";
import {
    IconWalletOff,
    IconTrendingDown,
    IconTools,
    IconAlertTriangle,
    IconDiamond,
    IconRocket,
    IconShieldCheck,
    IconGift
} from "@tabler/icons-react";

export default function Comparison() {
    return (
        <section className={styles.section} id="comparativa">
            <div className="container">
                <div className={styles.header} data-aos="fade-up">
                    <span className={styles.overline}>Decisión Inteligente</span>
                    <h2 className={styles.title}>¿Por qué <span className="text-gradient">EcoAlquiler</span>?</h2>
                    <p className={styles.subtitle}>Compara y descubre por qué más de 200 clínicas prefieren nuestro modelo vs la compra tradicional.</p>
                </div>

                <div className={styles.grid}>
                    {/* Columna Dolor */}
                    <div className={`${styles.card} ${styles.pain}`} data-aos="fade-right">
                        <h3 className={styles.cardTitle}>❌ Comprar (Riesgo Alto)</h3>
                        <ul className={styles.list}>
                            <li>
                                <div className={`${styles.iconWrapper} ${styles.iconPain}`}>
                                    <IconWalletOff size={24} />
                                </div>
                                <div>
                                    <strong>Inversión Masiva</strong>
                                    <p>Inviertes $80 Millones de contado o a crédito.</p>
                                </div>
                            </li>
                            <li>
                                <div className={`${styles.iconWrapper} ${styles.iconPain}`}>
                                    <IconTrendingDown size={24} />
                                </div>
                                <div>
                                    <strong>Depreciación Inmediata</strong>
                                    <p>Tu equipo pierde valor desde el día 1.</p>
                                </div>
                            </li>
                            <li>
                                <div className={`${styles.iconWrapper} ${styles.iconPain}`}>
                                    <IconTools size={24} />
                                </div>
                                <div>
                                    <strong>Mantenimiento Costoso</strong>
                                    <p>Repuestos y visitas técnicas por tu cuenta.</p>
                                </div>
                            </li>
                            <li>
                                <div className={`${styles.iconWrapper} ${styles.iconPain}`}>
                                    <IconAlertTriangle size={24} />
                                </div>
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
                        <h3 className={styles.cardTitle}>✅ EcoAlquiler (Cero Riesgo)</h3>
                        <ul className={styles.list}>
                            <li>
                                <div className={`${styles.iconWrapper} ${styles.iconPleasure}`}>
                                    <IconDiamond size={24} />
                                </div>
                                <div>
                                    <strong>Alquiler desde $350/día</strong>
                                    <p>Sin cuota inicial millonaria. Paga solo por los días que usas.</p>
                                </div>
                            </li>
                            <li>
                                <div className={`${styles.iconWrapper} ${styles.iconPleasure}`}>
                                    <IconRocket size={24} />
                                </div>
                                <div>
                                    <strong>Tecnología Siempre Actual</strong>
                                    <p>Cambia de equipo cuando quieras. Cero obsolescencia.</p>
                                </div>
                            </li>
                            <li>
                                <div className={`${styles.iconWrapper} ${styles.iconPleasure}`}>
                                    <IconShieldCheck size={24} />
                                </div>
                                <div>
                                    <strong>Mantenimiento & Soporte $0</strong>
                                    <p>Cubierto 100% por Equibiomedic. Respaldo oficial.</p>
                                </div>
                            </li>
                            <li>
                                <div className={`${styles.iconWrapper} ${styles.iconPleasure}`}>
                                    <IconGift size={24} />
                                </div>
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
