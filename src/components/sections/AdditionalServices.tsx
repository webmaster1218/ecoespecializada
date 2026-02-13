"use client";

import { memo } from "react";
import styles from "./AdditionalServices.module.css";
import { IconTool, IconSettings, IconShoppingBag, IconCheck, IconArrowRight } from "@tabler/icons-react";
import CallButton from "../ui/CallButton";

function AdditionalServices() {
    const services = [
        {
            icon: <IconTool className={styles.serviceIcon} />,
            title: "Calibración de ecógrafos",
            description: "Mantenga la precisión y confiabilidad de sus equipos. Certificación oficial y trazabilidad metrológica.",
            features: [
                "Certificado de calibración con validez oficial",
                "Proceso según normas internacionales",
                "Prueba de funcionamiento post-calibración",
                "Informate detallado de resultados"
            ],
            cta: "Solicitar cotización"
        },
        {
            icon: <IconSettings className={styles.serviceIcon} />,
            title: "Mantenimiento especializado",
            description: "Servicio técnico preventivo y correctivo para prolongar la vida útil de sus equipos de diagnóstico.",
            features: [
                "Mantenimiento preventivo programado",
                "Diagnóstico avanzado de fallas",
                "Repuestos originales garantizados",
                "Contratos de servicio mensuales"
            ],
            cta: "Consultar planes"
        },
        {
            icon: <IconShoppingBag className={styles.serviceIcon} />,
            title: "Venta de equipos",
            description: "Adquiera su propio ecógrafo Mindray con financing flexible y garantía completa del fabricante.",
            features: [
                "Equipos nuevos y reacondicionados",
                "Financiación hasta 24 meses",
                "Capacitación completa incluida",
                "Garantía extendida disponible"
            ],
            cta: "Ver catálogo completo"
        }
    ];

    return (
        <section className={styles.section} id="servicios-complementarios">
            <div className="container">
                <div className="text-center mb-16" data-aos="fade-up">
                    <span className="block text-xs uppercase tracking-[0.2em] text-blue-600 font-bold mb-3">Servicios adicionales</span>
                    <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
                        Servicios <span className="text-blue-600">complementarios</span>
                    </h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                        Soluciones integrales para la gestión completa de sus equipos de diagnóstico médico
                    </p>
                </div>

                <div className={styles.servicesGrid}>
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className={`${styles.serviceCard} glass-card`}
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                        >
                            <div className={styles.serviceHeader}>
                                <div className={styles.serviceIconWrapper}>
                                    {service.icon}
                                </div>
                                <h3 className={styles.serviceTitle}>{service.title}</h3>
                            </div>

                            <p className={styles.serviceDescription}>{service.description}</p>

                            <ul className={styles.featuresList}>
                                {service.features.map((feature, featureIndex) => (
                                    <li key={featureIndex} className={styles.featureItem}>
                                        <IconCheck className={styles.featureIcon} />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className={styles.serviceAction}>
                                <a
                                    href={`https://api.whatsapp.com/send/?phone=573005212664&text&type=phone_number&app_absent=0`}
                                    className={styles.serviceCta}
                                >
                                    {service.cta}
                                    <IconArrowRight className={styles.ctaIcon} />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>

                <div className={styles.bottomCTA} data-aos="fade-up">
                    <div className={`${styles.ctaCard} glass-card`}>
                        <div className={styles.ctaContent}>
                            <h3 className={styles.ctaTitle}>
                                ¿Necesita asesoría personalizada?
                            </h3>
                            <p className={styles.ctaDescription}>
                                Nuestros expertos pueden ayudarle a elegir la solución perfecta según sus necesidades y presupuesto.
                            </p>
                        </div>
                        <div className={styles.ctaButton}>
                            <CallButton
                                text="Hablar con un asesor"
                                subtext="300 521 2664"
                                iconType="whatsapp"
                                variant="highlight"
                                href="https://api.whatsapp.com/send/?phone=573005212664&text&type=phone_number&app_absent=0"
                                className="w-full md:w-auto"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default memo(AdditionalServices);