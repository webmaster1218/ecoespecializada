import Image from "next/image";
import styles from "./Hero.module.css";

export default function Hero() {
    return (
        <section className={styles.hero} id="inicio">
            <div className={`container ${styles.container}`}>
                <div className={styles.content} data-aos="fade-up">
                    <div className={styles.badge}>
                        <span className={styles.badgeIcon}>✓</span> Certificado INVIMA + Mantenimiento
                    </div>

                    <h1 className={styles.headline}>
                        Diagnóstico de Alta Gama <br />
                        <span className="text-gradient">Sin Invertir 80 Millones.</span>
                    </h1>

                    <p className={styles.subheadline}>
                        Alquila Ecógrafos Mindray Z6 y Z60 Portátiles con respaldo oficial de Equibiomedic.
                        Entrega exprés en 48h a toda Colombia.
                    </p>

                    <div className={styles.actions}>
                        <a href="#catalogo" className="btn-primary">
                            Reserva tu Equipo
                            <span className={styles.stockBadge}>Stock Limitado</span>
                        </a>
                        <a href="#specs" className={styles.btnOutline}>
                            Ver Ficha Técnica
                        </a>
                    </div>

                    <div className={styles.trust}>
                        <div className={styles.trustItem}>
                            <span>🚚</span> Envío Nacional
                        </div>
                        <div className={styles.trustItem}>
                            <span>🔧</span> Soporte 24/7
                        </div>
                        <div className={styles.trustItem}>
                            <span>🛡️</span> Garantía Total
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
                            <span className={styles.floatTitle}>Doppler Color</span>
                            <span className={styles.floatValue}>Incluido</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
