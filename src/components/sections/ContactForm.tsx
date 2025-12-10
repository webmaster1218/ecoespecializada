"use client";

import styles from "./ContactForm.module.css";

export default function ContactForm() {
    return (
        <section className={styles.section} id="contacto">
            <div className={styles.container}>
                <div className={styles.card} data-aos="zoom-in">
                    <div className={styles.header}>
                        <h2 className={styles.title}>¿Listo para potenciar tu consulta?</h2>
                        <p className={styles.subtitle}>Reserva hoy y obtén <strong>15% OFF</strong> en tu primera semana de alquiler.</p>
                    </div>

                    <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
                        <div className={styles.inputGroup}>
                            <input type="text" placeholder="Nombre del Especialista" required className={styles.input} />
                        </div>
                        <div className={styles.inputGroup}>
                            <input type="text" placeholder="Ciudad de Entrega" required className={styles.input} />
                        </div>
                        <div className={styles.inputGroup}>
                            <select className={styles.select}>
                                <option value="z6">Mindray Z6 - Obstetricia ($350k/día)</option>
                                <option value="z60">Mindray Z60 - Doppler Avanzado ($380k/día)</option>
                            </select>
                        </div>

                        <button type="submit" className={styles.submitBtn}>
                            Solicitar Reserva sin Riesgo
                        </button>

                        <div className={styles.securityBadges} style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '15px', fontSize: '0.8rem', color: '#666' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>🔒 SSL Seguro</span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>🛡️ Datos Protegidos</span>
                        </div>

                        <p className={styles.disclaimer}>* Reserva no vinculante. Te contactaremos para validar disponibilidad.</p>
                    </form>
                </div>
            </div>
        </section>
    );
}
