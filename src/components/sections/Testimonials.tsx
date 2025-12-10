import styles from "./Testimonials.module.css";

export default function Testimonials() {
    const testimonials = [
        {
            text: "La nitidez del Z60 cambió mis diagnósticos a domicilio. El respaldo de Equibiomedic se nota en cada detalle. Muy recomendados.",
            author: "Dr. Carlos Martínez",
            role: "Ginecólogo Obstetra",
            location: "Bogotá",
            avatar: "CM"
        },
        {
            text: "Necesitaba un equipo urgente para una brigada de salud. En 24 horas ya lo tenía en Cali calibrado y listo. Excelente servicio.",
            author: "Dra. Ana M. Torres",
            role: "Medicina General",
            location: "Cali",
            avatar: "AT"
        },
        {
            text: "El modelo de alquiler me permitió iniciar mi consultorio privado sin endeudarme con los bancos. Los equipos están como nuevos.",
            author: "Dr. Jorge Valencia",
            role: "Radiólogo",
            location: "Medellín",
            avatar: "JV"
        }
    ];

    return (
        <section className={styles.section} id="testimonios">
            <div className="container">
                <h2 className={styles.sectionTitle} data-aos="fade-up">Lo que dicen tus colegas</h2>

                <div className={styles.grid}>
                    {testimonials.map((t, index) => (
                        <div className={`${styles.card} glass-card`} key={index} data-aos="zoom-in" data-aos-delay={index * 100}>
                            <div className={styles.cardHeader}>
                                <div className={styles.quoteIcon}>❝</div>
                                <div className={styles.verifiedBadge}>
                                    <span>✓</span> Cliente Verificado
                                </div>
                            </div>

                            <p className={styles.text}>"{t.text}"</p>

                            <div className={styles.authorMeta}>
                                <div className={styles.avatar}>{t.avatar}</div>
                                <div>
                                    <div className={styles.author}>{t.author}</div>
                                    <div className={styles.role}>{t.role}</div>
                                    <div className={styles.location}>📍 {t.location}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
