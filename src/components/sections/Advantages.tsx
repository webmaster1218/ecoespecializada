import styles from "./Advantages.module.css";

export default function Advantages() {
    const advantages = [
        {
            icon: "🤝",
            title: "Aliados Equibiomedic",
            desc: "No somos intermediarios. Somos especialistas con soporte técnico nacional real directo de fábrica."
        },
        {
            icon: "⚡",
            title: "Logística Flash",
            desc: "Entregas en Bogotá, Medellín y Cali más rápido que ProEquipos. Puesta en marcha en 48h."
        },
        {
            icon: "🔄",
            title: "Prueba de 7 Días",
            desc: "Te enviamos las 3 sondas. Úsalo en tu consulta. Si no te convence la calidad, devuelves el equipo."
        },
        {
            icon: "🎒",
            title: "Todo Incluido",
            desc: "Recibes maleta de transporte, calibración certificada y capacitación virtual de manejo."
        }
    ];

    return (
        <section className={styles.section} id="ventajas">
            <div className="container">
                <h2 className={styles.sectionTitle} data-aos="fade-up">Más que un Alquiler, una Alianza</h2>

                <div className={styles.grid}>
                    {advantages.map((adv, index) => (
                        <div
                            key={index}
                            className={`${styles.card} glass-card`}
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
