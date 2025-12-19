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
        answer: "Entregamos en todo el territorio colombiano en máximo 48 horas hábiles. Para Bogotá, Medellín y Cali la entrega es el mismo día si la reserva se confirma antes de las 12:00pm. Contamos con stock permanente para entrega inmediata."
    },
    {
        question: "¿Cuáles son los precios de alquiler diario?",
        answer: "Nuestras tarifas diarias son: Mindray Z6 a $350.000 COP/día y Mindray Z60 a $550.000 COP/día. Incluyen mantenimiento, calibración, 3 sondas estándar y soporte técnico 24/7 sin costos adicionales."
    },
    {
        question: "¿Qué diferencia hay entre el Z6 y el Z60?",
        answer: "El Z6 es ideal para consultorio y uso general con excelente calidad de imagen. El Z60 ofrece tecnología superior con Doppler color, más aplicaciones especializadas y mayor resolución, recomendado para clínicas y estudios más complejos."
    },
    {
        question: "¿El mantenimiento y calibración están incluidos?",
        answer: "Sí, el mantenimiento preventivo y correctivo está 100% incluido. Realizamos calibraciones periódicas con certificación oficial y actualizaciones de software sin costo adicional durante todo el contrato."
    },
    {
        question: "¿Qué pasa si el equipo presenta fallas técnicas?",
        answer: "Ofrecemos reemplazo inmediato del equipo dentro de 24 horas en ciudades principales y 48 horas en otras localidades. Mientras tanto, nuestro técnico especialista te asistirá remotamente para minimizar interrupciones."
    },
    {
        question: "¿Ofrecen servicios además del alquiler?",
        answer: "Sí, además del alquiler ofrecemos: calibración certificada de ecógrafos, mantenimiento especializado, y venta de equipos nuevos y reacondicionados con financiación flexible hasta 24 meses."
    },
    {
        question: "¿Cuántas sondas incluye cada equipo?",
        answer: "Todos nuestros equipos incluyen 3 sondas estándar: sonda convexa (abdomen/general), sonda lineal (músculo-esquelético/vascular) y sonda transvaginal. Sondas adicionales disponibles bajo solicitud."
    },
    {
        question: "¿Los equipos tienen certificación INVIMA?",
        answer: "Sí, todos nuestros equipos cuentan con registro sanitario INVIMA vigente. Somos especialistas con respaldo oficial de Equibiomedic, distribuidor autorizado de Mindray en Colombia."
    },
    {
        question: "¿Ofrecen capacitación para el uso del equipo?",
        answer: "Sí, incluimos capacitación personalizada presencial o virtual de 2 horas cubriendo: funcionamiento básico, configuración de estudios, optimización de imágenes y protocolos de mantenimiento diario."
    },
    {
        question: "¿Cuál es el tiempo mínimo de alquiler?",
        answer: "Nuestro alquiler es flexible desde 1 día para estudios específicos hasta contratos mensuales con descuentos especiales. No hay penalización por devolución anticipada y adaptamos el plan a tus necesidades."
    },
    {
        question: "¿Qué cobertura tienen en Colombia?",
        answer: "Contamos con presencia en más de 50 ciudades y cobertura nacional. Entregamos equipos en todo el territorio colombiano con tiempos máximos de 48 horas y despachos inmediatos a ciudades principales."
    },
    {
        question: "¿Qué incluye el kit completo de entrega?",
        answer: "El kit incluye: el ecógrafo seleccionado con 3 sondas, maleta de transporte protectora, manual del usuario, certificado de calibración, capacitación inicial y soporte técnico permanente."
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
                    <span className={styles.overline}>RESOLVEMOS TUS DUDAS</span>
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
                        <a href="https://api.whatsapp.com/send/?phone=573005212664&text&type=phone_number&app_absent=0" className="btn-primary">Hablar con un asesor</a>
                        <p className={styles.responseTime}>Respuesta garantizada en menos de 2 horas</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
