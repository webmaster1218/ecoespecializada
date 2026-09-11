"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { m } from "framer-motion";
import { Turnstile } from "@marsidev/react-turnstile";
import styles from "./ContactForm.module.css";
import CallButton from "../ui/CallButton";

export default function ContactForm() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [renderTime] = useState<number>(() => Date.now());
    const [turnstileToken, setTurnstileToken] = useState<string>("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        const data = {
            client_name: formData.get("name"),
            city: formData.get("city"),
            equipment: formData.get("equipment"),
            hp_website: formData.get("hp_website"),
            render_time: renderTime,
            turnstile_token: turnstileToken,
            created_at: new Date().toISOString(),
            source: 'landing_contact_form'
        };

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                router.push('/gracias');
            } else {
                const resData = await response.json().catch(() => ({}));
                throw new Error(resData.error || "Error al procesar la solicitud.");
            }
        } catch (err: any) {
            console.error("Error sending contact form:", err);
            setError(err.message || "Hubo un error. Por favor intenta de nuevo o contáctanos por WhatsApp.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <section className={styles.section} id="contacto">
                <div className={styles.container}>
                    <m.div className={styles.card} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }} style={{ textAlign: 'center', padding: '40px' }}>
                        <h2 className={styles.title}>¡Solicitud Enviada!</h2>
                        <p className={styles.subtitle}>Nos pondremos en contacto contigo en breve para validar disponibilidad.</p>
                        <button
                            onClick={() => setSubmitted(false)}
                            className={styles.submitBtn}
                            style={{ marginTop: '20px', maxWidth: '200px', margin: '20px auto' }}
                        >
                            Volver
                        </button>
                    </m.div>
                </div>
            </section>
        );
    }

    return (
        <section className={styles.section} id="contacto">
            <div className={styles.container}>
                <m.div className={styles.card} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
                    <div className={styles.header}>
                        <h2 className={styles.title}>¿Listo para potenciar tu consulta?</h2>
                        <p className={styles.subtitle}>Reserva hoy y obtén <strong>15% OFF</strong> en tu primera semana de alquiler.</p>
                    </div>

                    <form className={styles.form} onSubmit={handleSubmit}>
                        {/* Campo Honeypot para capturar bots - Invisible para usuarios humanos */}
                        <div style={{ position: "absolute", left: "-9999px", opacity: 0, pointerEvents: "none", height: 0, overflow: "hidden" }} aria-hidden="true">
                            <label htmlFor="hp_website_contact">Dejar este campo vacío</label>
                            <input
                                id="hp_website_contact"
                                name="hp_website"
                                type="text"
                                tabIndex={-1}
                                autoComplete="off"
                            />
                        </div>

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

                        {process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && (
                            <div style={{ display: 'flex', justifyContent: 'center', margin: '12px 0' }}>
                                <Turnstile
                                    siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
                                    onSuccess={(token) => setTurnstileToken(token)}
                                    options={{
                                        theme: 'light',
                                        size: 'normal',
                                    }}
                                />
                            </div>
                        )}

                        <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
                            {isSubmitting ? "Enviando..." : "Solicitar reserva sin riesgo"}
                        </button>

                        {error && (
                            <p style={{ color: '#ff4d4f', fontSize: '0.8rem', textAlign: 'center', marginTop: '10px' }}>
                                {error}
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
                </m.div>
            </div>
        </section>
    );
}
