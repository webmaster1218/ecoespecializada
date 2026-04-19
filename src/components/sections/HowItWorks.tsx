"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { ReactNode } from "react";
import styles from "./HowItWorks.module.css";
import { FileText, Send, PenLine, Truck } from "lucide-react";

function HowItWorks({ city, title }: { city?: string, title?: string }) {
    const steps = [
        {
            id: "01",
            title: "Registro digital",
            desc: "Completa nuestro formulario con tus datos, elección del equipo y la dirección exacta de envío.",
            icon: <FileText size={32} strokeWidth={1.5} />
        },
        {
            id: "02",
            title: "Recepción de contrato",
            desc: "Recibirás automáticamente en tu correo el contrato junto con las instrucciones para realizar el pago.",
            icon: <Send size={32} strokeWidth={1.5} />
        },
        {
            id: "03",
            title: "Firma y pago",
            desc: "Debes devolvernos el correo con el contrato firmado y adjuntar tu respectivo soporte de pago.",
            icon: <PenLine size={32} strokeWidth={1.5} />
        },
        {
            id: "04",
            title: "Envío del equipo",
            desc: "Una vez verificado, despachamos de inmediato el ecógrafo a la dirección que colocaste en el registro.",
            icon: <Truck size={32} strokeWidth={1.5} />
        }
    ];

    return (
        <section className={styles.section} id="como-funciona">
            <div className="container">
                <motion.div className={styles.header} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
                    <span className={styles.overline}>Proceso simplificado</span>
                    <h2 className={styles.title}>{title || (<>Flujo de <span className="text-gradient">alquiler profesional</span></>)}</h2>
                    <p className={styles.subtitle}>{city ? `Optimizamos cada etapa en ${city} para garantizar rapidez y seguridad en su práctica médica.` : "Optimizamos cada etapa para garantizar rapidez y seguridad en su práctica médica."}</p>
                </motion.div>

                <div className={styles.processGrid}>
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            className={styles.processCard}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <div className={styles.cardHeader}>
                                <div className={styles.iconBox}>
                                    {step.icon}
                                </div>
                                <span className={styles.stepNumber}>{step.id}</span>
                            </div>
                            <h3 className={styles.stepTitle}>{step.title}</h3>
                            <p className={styles.stepDesc}>{step.desc}</p>
                        </motion.div>
                    ))}
                </div>

                <motion.div className={styles.ctaWrapper} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.4 }}>
                    <a href="#reservar" className="btn-primary">
                        Comenzar reserva
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                    </a>
                </motion.div>
            </div>
        </section>
    );
}

export default memo(HowItWorks);
