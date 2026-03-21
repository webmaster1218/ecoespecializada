import { memo } from "react";
import styles from "./HowItWorks.module.css";
import { IconFileDescription, IconMailForward, IconSignature, IconTruckDelivery } from "@tabler/icons-react";

function HowItWorks() {
    const steps = [
        {
            id: "01",
            title: "Registro digital",
            desc: "Completa nuestro formulario con tus datos, elección del equipo y la dirección exacta de envío.",
            icon: <IconFileDescription size={32} stroke={1.5} />
        },
        {
            id: "02",
            title: "Recepción de contrato",
            desc: "Recibirás automáticamente en tu correo el contrato junto con las instrucciones para realizar el pago.",
            icon: <IconMailForward size={32} stroke={1.5} />
        },
        {
            id: "03",
            title: "Firma y pago",
            desc: "Debes devolvernos el correo con el contrato firmado y adjuntar tu respectivo soporte de pago.",
            icon: <IconSignature size={32} stroke={1.5} />
        },
        {
            id: "04",
            title: "Envío del equipo",
            desc: "Una vez verificado, despachamos de inmediato el ecógrafo a la dirección que colocaste en el registro.",
            icon: <IconTruckDelivery size={32} stroke={1.5} />
        }
    ];

    return (
        <section className={styles.section} id="como-funciona">
            <div className="container">
                <div className={styles.header} data-aos="fade-up">
                    <span className={styles.overline}>Proceso simplificado</span>
                    <h2 className={styles.title}>Flujo de <span className="text-gradient">alquiler profesional</span></h2>
                    <p className={styles.subtitle}>Optimizamos cada etapa para garantizar rapidez y seguridad en su práctica médica.</p>
                </div>

                <div className={styles.processGrid}>
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className={styles.processCard}
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                        >
                            <div className={styles.cardHeader}>
                                <div className={styles.iconBox}>
                                    {step.icon}
                                </div>
                                <span className={styles.stepNumber}>{step.id}</span>
                            </div>
                            <h3 className={styles.stepTitle}>{step.title}</h3>
                            <p className={styles.stepDesc}>{step.desc}</p>
                        </div>
                    ))}
                </div>

                <div className={styles.ctaWrapper} data-aos="fade-up" data-aos-delay="400">
                    <a href="#reservar" className="btn-primary">
                        Comenzar reserva
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    );
}

export default memo(HowItWorks);
