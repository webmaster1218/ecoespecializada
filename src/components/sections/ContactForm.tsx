"use client";

import styles from "./ContactForm.module.css";

export default function ContactForm() {
    return (
        <section className={styles.section} id="contacto">
            <div className={styles.container}>
                <div className={styles.card} data-aos="zoom-in">
                    <div className={styles.header}>
                        <h2 className={styles.title}>¿Listo para potenciar tu consulta?</h2>
                        <p className={styles.subtitle}>Reserva hoy y obtén <strong>15% OFF</strong> en tu primer mes de alquiler.</p>
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
                                <option value="z6">Mindray Z6 - Obstetricia ($450k)</option>
                                <option value="z60">Mindray Z60 - Doppler Avanzado ($550k)</option>
                            </select>
                        </div>

                        <button type="submit" className={styles.submitBtn}>
                            RESERVAR AHORA - 15% OFF
                        </button>
                        <p className={styles.disclaimer}>* Sin cláusulas de permanencia ocultas.</p>
                    </form>
                </div>
            </div>
        </section>
    );
}
