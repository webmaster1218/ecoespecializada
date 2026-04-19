"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import styles from "./Comparison.module.css";
import {
    Wallet,
    TrendingDown,
    Wrench,
    AlertTriangle,
    Diamond,
    Rocket,
    ShieldCheck,
    Gift,
    Settings
} from "lucide-react";

export default function Comparison({ city, subtitle, titleText, titleHighlight }: { city?: string, subtitle?: string, titleText?: string, titleHighlight?: string }) {
    return (
        <section className={styles.section} id="comparativa">
            <div className="container">
                <motion.div className={styles.header} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
                    <span className={styles.overline}>Decisión inteligente</span>
                    <h2 className={styles.title}>{titleText || "El mejor servicio de"} <span className="text-gradient">{titleHighlight || `alquiler de ecógrafos ${city || ""}`}</span></h2>
                    <p className={styles.subtitle}>{subtitle || "Compara y descubre por qué más de 200 clínicas prefieren nuestro modelo vs la compra tradicional."}</p>
                </motion.div>

                <div className={styles.grid}>
                    {/* Columna Dolor */}
                    <motion.div className={`${styles.card} ${styles.pain}`} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
                        <h3 className={styles.cardTitle}>❌ Comprar</h3>
                        <ul className={styles.list}>
                            <li>
                                <div className={`${styles.iconWrapper} ${styles.iconPain}`}>
                                    <Wallet size={24} />
                                </div>
                                <div>
                                    <strong>Inversión masiva</strong>
                                    <p>Inviertes $80 millones de contado o a crédito.</p>
                                </div>
                            </li>
                            <li>
                                <div className={`${styles.iconWrapper} ${styles.iconPain}`}>
                                    <TrendingDown size={24} />
                                </div>
                                <div>
                                    <strong>Depreciación inmediata</strong>
                                    <p>Tu equipo pierde valor desde el día 1.</p>
                                </div>
                            </li>
                            <li>
                                <div className={`${styles.iconWrapper} ${styles.iconPain}`}>
                                    <Wrench size={24} />
                                </div>
                                <div>
                                    <strong>Mantenimiento costoso</strong>
                                    <p>Repuestos y visitas técnicas por tu cuenta.</p>
                                </div>
                            </li>
                            <li>
                                <div className={`${styles.iconWrapper} ${styles.iconPain}`}>
                                    <AlertTriangle size={24} />
                                </div>
                                <div>
                                    <strong>Riesgo de "reacondicionados"</strong>
                                    <p>Equipos usados sin garantía real o dudosa procedencia.</p>
                                </div>
                            </li>
                            <li>
                                <div className={`${styles.iconWrapper} ${styles.iconPain}`}>
                                    <Settings size={24} />
                                </div>
                                <div>
                                    <strong>Calibracion costosa</strong>
                                    <p>Constante calibracion de equipos por tu cuenta.</p>
                                </div>
                            </li>
                        </ul>
                    </motion.div>

                    {/* Columna Placer (Alquiler de Ecógrafos) */}
                    <motion.div className={`${styles.card} ${styles.pleasure} glass-card`} initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
                        <div className={styles.badge}>Mejor opción</div>
                        <h3 className={styles.cardTitle}>✅ Alquiler de ecógrafos (Cero riesgo)</h3>
                        <ul className={styles.list}>
                            <li>
                                <div className={`${styles.iconWrapper} ${styles.iconPleasure}`}>
                                    <Diamond size={24} />
                                </div>
                                <div>
                                    <strong>Alquiler desde $350.000 pesos/día</strong>
                                    <p>Sin cuota inicial millonaria. Paga solo por los días que usas.</p>
                                </div>
                            </li>
                            <li>
                                <div className={`${styles.iconWrapper} ${styles.iconPleasure}`}>
                                    <Rocket size={24} />
                                </div>
                                <div>
                                    <strong>Tecnología siempre actual</strong>
                                    <p>Cambia de equipo cuando quieras. Cero obsolescencia.</p>
                                </div>
                            </li>
                            <li>
                                <div className={`${styles.iconWrapper} ${styles.iconPleasure}`}>
                                    <ShieldCheck size={24} />
                                </div>
                                <div>
                                    <strong>Mantenimiento & soporte $0</strong>
                                    <p>Cubierto 100% por Equibiomedic. Respaldo oficial.</p>
                                </div>
                            </li>
                            <li>
                                <div className={`${styles.iconWrapper} ${styles.iconPleasure}`}>
                                    <Gift size={24} />
                                </div>
                                <div>
                                    <strong>Elige tus sondas</strong>
                                    <p>Convexo, Lineal y Transvaginal listas para usar.</p>
                                </div>
                            </li>
                        </ul>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
