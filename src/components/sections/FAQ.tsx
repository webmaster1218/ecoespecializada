"use client";

import { useState } from "react";
import styles from "./FAQ.module.css";
import CallButton from "../ui/CallButton";

interface FAQItem {
    question: string;
    answer: string;
}

const faqData: FAQItem[] = [
    {
        question: "¿Qué modelos de ecógrafos tienen disponibles para alquiler?",
        answer: "Contamos con los modelos Mindray Z6 y Mindray Z60. El Z6 es ideal para diagnósticos generales y el Z60 ofrece Doppler Color avanzado para estudios vasculares y cardiológicos básicos. Ambos son portátiles y de alta gama."
    },
    {
        question: "¿Qué incluye el servicio de alquiler diario?",
        answer: "Cada alquiler incluye: el equipo (Z6 o Z60), 3 sondas estándar (Convexa, Lineal y Transvaginal), maletín de transporte, capacitación inicial de uso y soporte técnico permanente. Todo respaldado por Equibiomedic."
    },
    {
        question: "¿Cuál es el tiempo de entrega en Medellín y a nivel nacional?",
        answer: "En Medellín la entrega es el mismo día si confirmas antes de mediodía. A nivel nacional, despachamos en un plazo máximo de 24 a 48 horas hábiles, garantizando que el equipo llegue listo para usar a tu consultorio."
    },
    {
        question: "¿Los equipos cuentan con registro sanitario INVIMA?",
        answer: "Sí, el 100% de nuestra flota cuenta con registro sanitario INVIMA vigente y certificación de calibración. Somos distribuidores autorizados con más de 10 años de experiencia en el sector médico colombiano."
    },
    {
        question: "¿Hay un tiempo mínimo de alquiler?",
        answer: "No, nuestro servicio es totalmente flexible. Puedes alquilar desde 1 solo día para jornadas específicas hasta meses completos con tarifas preferenciales para contratos a largo plazo."
    },
    {
        question: "¿Qué pasa si el equipo presenta alguna falla técnica?",
        answer: "Ofrecemos garantía técnica total. En caso de una falla que no se pueda resolver remotamente, realizamos el cambio del equipo en menos de 24 horas para que tu consulta no se detenga."
    },
    {
        question: "¿Necesito dejar algún depósito o garantía?",
        answer: "Nuestro proceso de validación es ágil. Solicitamos información básica del profesional o entidad (RUT/Cédula) para el contrato de alquiler. Un asesor te guiará en el proceso de pago seguro por transferencia o link."
    },
    {
        question: "¿Entregan los ecógrafos con gel y papel para impresora?",
        answer: "El alquiler incluye el equipo y sus accesorios base. Si necesitas insumos adicionales como gel conductor o papel térmico, podemos incluirlos en el pedido bajo solicitud para que tengas tu kit completo."
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
                    <span className={styles.overline}>Resolvemos tus dudas</span>
                    <h2 className={styles.title}>Preguntas <span className="text-gradient">frecuentes</span></h2>
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
                        <CallButton
                            text="Hablar con un asesor"
                            subtext="300 521 2664"
                            iconType="whatsapp"
                            variant="highlight"
                            href="https://api.whatsapp.com/send/?phone=573005212664&text&type=phone_number&app_absent=0"
                        />
                        <p className={styles.responseTime}>Respuesta garantizada en menos de 2 horas</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
