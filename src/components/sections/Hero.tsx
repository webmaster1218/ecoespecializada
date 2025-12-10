import Image from "next/image";
import styles from "./Hero.module.css";

export default function Hero() {
    return (
        <section className={styles.hero} id="inicio">
            <div className={`container ${styles.container}`}>
                <div className={styles.content} data-aos="fade-up">
                    <div className={styles.badge}>
                        <span className={styles.badgeIcon}>✓</span> Envío Gratis + Mantenimiento Incluido
                    </div>

                    <h1 className={styles.headline}>
                        ¿Buscas Alquiler de Ecógrafo? <br />
                        <span className="text-gradient">Obtén Tecnología Premium sin Pagar $80M.</span>
                    </h1>

                    <p className={styles.subheadline}>
                        Alquila Ecógrafos Mindray Z6 y Z60 de Gama Alta sin la inversión inicial de $80M.
                        <strong>Pruébalo por 7 días sin riesgo.</strong>
                    </p>

                    <div className={styles.actions}>
                        <a href="#contacto" className="btn-primary">
                            Solicitar Demo Gratis
                            <span className={styles.stockBadge}>🔥 3 Disponibles</span>
                        </a>
                        <a href="#ventajas" className={styles.btnOutline}>
                            ¿Por qué alquilar?
                        </a>
                    </div>

                    <div className={styles.trust}>
                        <div className={styles.trustItem}>
                            <span>🏥</span> +200 Clínicas Confían
                        </div>
                        <div className={styles.trustItem}>
                            <span>⭐</span> 4.9/5 Calificación
                        </div>
                        <div className={styles.trustItem}>
                            <span>🛡️</span> Garantía 100%
                        </div>
                    </div>
                </div>

                <div className={styles.visual} data-aos="fade-left" data-aos-delay="200">
                    <div className={`${styles.imageWrapper} glass-card`}>
                        <Image
                            src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80"
                            alt="Ecógrafo Mindray Clínica"
                            fill
                            className={styles.heroImage}
                            style={{ objectFit: 'cover', borderRadius: '12px' }}
                            priority
                        />

                        <div className={styles.floatCard}>
                            <span className={styles.floatTitle}>Disponibilidad</span>
                            <span className={styles.floatValue} style={{ color: '#22c55e' }}>Inmediata</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
