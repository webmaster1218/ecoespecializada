import styles from "./ExperienceVideo.module.css";

export default function ExperienceVideo() {
    return (
        <section className={styles.section} id="experiencia-video">
            <div className={styles.container}>
                <div className={styles.titleArea}>
                    <span className={styles.badge}>Experiencia Real</span>
                    <h2 className={styles.title}>
                        Tecnología que impulsa tu <span className={styles.highlight}>crecimiento</span>
                    </h2>
                    <p className={styles.subtitle}>
                        Descubre cómo el alquiler de equipos de alta gama transforma la consulta diaria de nuestros especialistas.
                    </p>
                </div>

                <div className={styles.contentRow}>
                    <div className={styles.videoWrapper}>
                        <iframe
                            src="https://www.youtube.com/embed/t77PUxAS_6Q"
                            title="Testimonio Alquiler de Ecógrafos"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        ></iframe>
                    </div>


                    <div className={styles.infoCard}>
                        <a href="https://www.youtube.com/channel/UCz-uvK09Po3RaXP3mqYPbnA">
                            <div className={styles.text}>
                                <p>
                                    El <strong>Dr. Cristian</strong> destaca que el haber alquilado con <strong>alquilerdeecografos.com</strong> el equipo <strong>Mindray Z60</strong> ha impulsado su consultorio, permitiendo diagnósticos precisos y procedimientos en tejidos blandos con total seguridad y eficacia.
                                </p>

                                <div className={styles.quote}>
                                    "El proceso fue eficiente y de gran apoyo, con entrega puntual y la orientación necesaria. La inclusión del carrito práctico facilitó mucho la configuración en mi consultorio."
                                </div>
                            </div>

                            <div className={styles.footer}>
                                <div className={styles.avatar}>DR</div>
                                <div className={styles.authorInfo}>
                                    <span className={styles.authorName}>Dr. Cristian Sanchez </span>
                                    <span className={styles.authorTitle}>Médico general con formación en
                                        cuidado del paciente crítico │ Usuario de Mindray Z60</span>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
