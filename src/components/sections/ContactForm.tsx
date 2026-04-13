"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import styles from "./ContactForm.module.css";
import CallButton from "../ui/CallButton";

export default function ContactForm() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(false);

        const formData = new FormData(e.currentTarget);
        const data = {
            client_name: formData.get("name"),
            city: formData.get("city"),
            equipment: formData.get("equipment"),
            created_at: new Date().toISOString(),
            source: 'landing_contact_form'
        };

        try {
            const webhookUrl = "https://n8n.srv1054162.hstgr.cloud/webhook/20114322-9cd8-4eea-91c4-3d8ff32a4c71";
            const response = await fetch(webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                router.push('/gracias');
            } else {
                throw new Error("Webhook failed");
            }
        } catch (err) {
            console.error("Error sending to webhook:", err);
            setError(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <section className={styles.section} id="contacto">
                <div className={styles.container}>
                    <motion.div className={styles.card} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }} style={{ textAlign: 'center', padding: '40px' }}>
                        <h2 className={styles.title}>¡Solicitud Enviada!</h2>
                        <p className={styles.subtitle}>Nos pondremos en contacto contigo en breve para validar disponibilidad.</p>
                        <button
                            onClick={() => setSubmitted(false)}
                            className={styles.submitBtn}
                            style={{ marginTop: '20px', maxWidth: '200px', margin: '20px auto' }}
                        >
                            Volver
                        </button>
                    </motion.div>
                </div>
            </section>
        );
    }

    return (
        <section className={styles.section} id="contacto">
            <div className={styles.container}>
                <motion.div className={styles.card} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
                    <div className={styles.header}>
                        <h2 className={styles.title}>¿Listo para potenciar tu consulta?</h2>
                        <p className={styles.subtitle}>Reserva hoy y obtén <strong>15% OFF</strong> en tu primera semana de alquiler.</p>
                    </div>

                    <form className={styles.form} onSubmit={handleSubmit}>
                        <div className={styles.inputGroup}>
                            <input name="name" type="text" placeholder="Nombre del especialista" required className={styles.input} />
                        </div>
                        <div className={styles.inputGroup}>
                            <input name="city" type="text" placeholder="Ciudad de entrega" required className={styles.input} />
                        </div>
                        <div className={styles.inputGroup}>
                            <select name="equipment" className={styles.select}>
                                <option value="z6">Mindray Z6 - Obstetricia ($350k/día)</option>
                                <option value="z60">Mindray Z60 - Doppler Avanzado ($550k/día)</option>
                            </select>
                        </div>

                        <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
                            {isSubmitting ? "Enviando..." : "Solicitar reserva sin riesgo"}
                        </button>

                        {error && (
                            <p style={{ color: '#ff4d4f', fontSize: '0.8rem', textAlign: 'center', marginTop: '10px' }}>
                                Hubo un error. Por favor intenta de nuevo o contáctanos por WhatsApp.
                            </p>
                        )}

                        <div className={styles.securityBadges} style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '15px', fontSize: '0.8rem', color: '#666' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>🔒 SSL seguro</span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>🛡️ Datos protegidos</span>
                        </div>

                        <p className={styles.disclaimer}>* Reserva no vinculante. Te contactaremos para validar disponibilidad.</p>

                        <div className={styles.callSection}>
                            <p className={styles.callText}>¿Prefieres atención inmediata?</p>
                            <CallButton text="Llamar directamente" subtext="300 3608621" variant="highlight" />
                        </div>
                    </form>
                </motion.div>
            </div>
        </section>
    );
}
