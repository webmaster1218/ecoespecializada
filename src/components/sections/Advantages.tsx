import styles from "./Advantages.module.css";

export default function Advantages() {
    const advantages = [
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
            ),
            title: "Aliados Directos",
            desc: "Sin intermediarios. Especialistas Mindray con soporte técnico nacional certificado."
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                </svg>
            ),
            title: "Logística Flash",
            desc: "Despachos inmediatos a ciudades principales. Puesta en marcha en < 48 horas."
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    <path d="M8 11h8"></path>
                </svg>
            ),
            title: "Prueba sin Riesgo",
            desc: "7 días de garantía de satisfacción total. Si no cumple sus expectativas, devolvemos su dinero."
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
            ),
            title: "Todo Incluido",
            desc: "Maleta de transporte, calibración certificada y capacitación especializada de manejo."
        }
    ];

    return (
        <section className={styles.section} id="ventajas">
            <div className="container">
                <div className={styles.header} data-aos="fade-up">
                    <span className={styles.overline}>Beneficios Exclusivos</span>
                    <h2 className={styles.sectionTitle}>¿Por qué elegir <span className="text-gradient">EcoAlquiler?</span></h2>
                    <p className={styles.subtitle}>Reducimos su riesgo operativo y maximizamos su rentabilidad clínica.</p>
                </div>

                <div className={styles.grid}>
                    {advantages.map((adv, index) => (
                        <div
                            key={index}
                            className={styles.card}
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                        >
                            <div className={styles.iconWrapper}>{adv.icon}</div>
                            <h3 className={styles.cardTitle}>{adv.title}</h3>
                            <p className={styles.cardDesc}>{adv.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
