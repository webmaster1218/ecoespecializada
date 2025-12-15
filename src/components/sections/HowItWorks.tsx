import styles from "./HowItWorks.module.css";

export default function HowItWorks() {
    const steps = [
        {
            id: "01",
            title: "Selección del Equipo",
            desc: "Identifique el modelo Mindray (Z6 o Z60) acorde a sus requerimientos clínicos.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                    <line x1="8" y1="21" x2="16" y2="21"></line>
                    <line x1="12" y1="17" x2="12" y2="21"></line>
                    <circle cx="12" cy="10" r="3"></circle>
                    <path d="M12 10a3 3 0 0 1 2.12-1"></path>
                </svg>
            )
        },
        {
            id: "02",
            title: "Validación de Datos",
            desc: "Complete el formulario de registro para validación de identidad y disponibilidad.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
            )
        },
        {
            id: "03",
            title: "Formalización",
            desc: "Proceso de pago seguro y firma digital del contrato de alquiler.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                    <line x1="1" y1="10" x2="23" y2="10"></line>
                    <path d="M16 16h2"></path>
                    <path d="M12 16h.01"></path>
                </svg>
            )
        },
        {
            id: "04",
            title: "Entrega Certificada",
            desc: "Recepción del equipo calibrado en su consultorio en 24-48 horas hábiles.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="1" y="3" width="15" height="13" rx="2" ry="2"></rect>
                    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                    <circle cx="5.5" cy="18.5" r="2.5"></circle>
                    <circle cx="18.5" cy="18.5" r="2.5"></circle>
                </svg>
            )
        }
    ];

    return (
        <section className={styles.section} id="como-funciona">
            <div className="container">
                <div className={styles.header} data-aos="fade-up">
                    <span className={styles.overline}>Proceso Simplificado</span>
                    <h2 className={styles.title}>Flujo de <span className="text-gradient">Alquiler Profesional</span></h2>
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
                        Comenzar Reserva
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
