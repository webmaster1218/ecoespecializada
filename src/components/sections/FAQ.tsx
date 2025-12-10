"use client";

import { useState } from "react";
import styles from "./FAQ.module.css";

interface FAQItem {
    question: string;
    answer: string;
}

const faqData: FAQItem[] = [
    {
        question: "¿Cuánto tiempo demora la entrega del ecógrafo?",
        answer: "Entregamos en todo el territorio colombiano en máximo 48 horas hábiles después de confirmar la reserva. Para Bogotá, Medellín y Cali la entrega es el mismo día si la reserva se confirma antes de las 12:00pm."
    },
    {
        question: "¿El mantenimiento está incluido en el alquiler?",
        answer: "Sí, el mantenimiento preventivo y correctivo está 100% incluido. Cubrimos calibraciones, actualizaciones de software, y cualquier reparación necesaria sin costo adicional."
    },
    {
        question: "¿Cuántas sondas incluye cada equipo?",
        answer: "Todos nuestros equipos incluyen 3 sondas estándar: sonda convexa (abdomen/general), sonda lineal (músculo-esquelético/vascular) y sonda transvaginal. Adicionales disponibles bajo solicitud."
    },
    {
        question: "¿Qué pasa si el equipo presenta fallas?",
        answer: "Ofrecemos reemplazo inmediato del equipo dentro de 24 horas en ciudades principales y 48 horas en otras ciudades. Mientras tanto, el técnico especialista atenderá tu caso remotamente."
    },
    {
        question: "¿Ofrecen capacitación para usar los equipos?",
        answer: "Sí, incluimos capacitación personalizada presencial o virtual de 2 horas cubriendo: funcionamiento básico, configuración de estudios, optimización de imágenes y mantenimiento diario."
    },
    {
        question: "¿Cuál es el tiempo mínimo de alquiler?",
        answer: "Nuestro alquiler es flexible desde 1 día para estudios específicos hasta contratos mensuales con descuentos especiales. No hay penalización por devolución anticipada."
    },
    {
        question: "¿Los equipos cuentan con garantía y certificación INVIMA?",
        answer: "Todos nuestros equipos son 100% nuevos y certificados con registro INVIMA vigente. Ofrecemos garantía oficial de fábrica a través de Equibiomedic, distribuidor autorizado Mindray en Colombia."
    },
    {
        question: "¿Qué incluye el soporte técnico 24/7?",
        answer: "Soporte telefónico y vía WhatsApp para resolución remota de problemas, asistencia durante procedimientos complejos, y coordinación de servicio técnico en sitio si es necesario."
    }
];

export default function FAQ() {
    const [activeItem, setActiveItem] = useState<number | null>(null);

    const toggleItem = (index: number) => {
        setActiveItem(activeItem === index ? null : index);
    };

    return (
        <section className={styles.section} id="faq">
            <div className="container">
                <div className={styles.header} data-aos="fade-up">
                    <h2 className={styles.title}>Preguntas <span className="text-gradient">Frecuentes</span></h2>
                    <p className={styles.subtitle}>Todo lo que necesitas saber sobre nuestros servicios de alquiler de ecógrafos</p>
                </div>

                <div className={styles.faqContainer} data-aos="fade-up" data-aos-delay="100">
                    <div className={styles.faqGrid}>
                        {faqData.map((item, index) => (
                            <div
                                key={index}
                                className={`${styles.faqItem} ${activeItem === index ? styles.active : ''}`}
                            >
                                <button
                                    className={styles.faqQuestion}
                                    onClick={() => toggleItem(index)}
                                    aria-expanded={activeItem === index}
                                >
                                    <span className={styles.questionText}>{item.question}</span>
                                    <span className={`${styles.icon} ${activeItem === index ? styles.rotated : ''}`}>
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </span>
                                </button>
                                <div className={`${styles.faqAnswer} ${activeItem === index ? styles.open : ''}`}>
                                    <p>{item.answer}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles.contactCta} data-aos="fade-up" data-aos-delay="200">
                    <div className={styles.ctaCard}>
                        <h3>¿No encuentras lo que buscas?</h3>
                        <p>Nuestros especialistas están listos para resolver todas tus dudas</p>
                        <a href="#contacto" className="btn-primary">Hablar con un Experto</a>
                        <p className={styles.responseTime}>Respuesta garantizada en menos de 2 horas</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
