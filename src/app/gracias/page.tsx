"use client";

import Link from "next/link";
import { m } from "framer-motion";
import { Check, ArrowLeft, Clock } from "lucide-react";
import styles from "./Gracias.module.css";
import Image from "next/image";

export default function Gracias() {
    return (
        <div className={styles.page}>
            <div className="container">
                <div className={styles.content}>
                    {/* Logo */}
                    <div className="flex justify-center mb-8">
                        <Image src="/images/logo/logo_alquilerdeecografos.webp" alt="Logo" width={180} height={60} className="rounded-lg shadow-sm" />
                    </div>

                    {/* Icono de éxito */}
                    <m.div className={styles.successIcon} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
                        <Check />
                    </m.div>

                    {/* Mensaje principal */}
                    <m.div className={styles.message} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
                        <h1 className={styles.title}>
                            ¡Gracias por tu <span className="text-gradient">reserva!</span>
                        </h1>
                        <p className={styles.description}>
                            Hemos recibido tu solicitud correctamente. <strong>Revisa tu correo electrónico</strong>, ya que te hemos enviado el contrato de alquiler junto con los datos necesarios para realizar el pago y formalizar el servicio.
                        </p>
                        <p className={styles.description}>
                            Uno de nuestros asesores especializados se comunicará contigo pronto para coordinar los detalles finales de la entrega.
                        </p>
                    </m.div>

                    {/* Información de contacto */}
                    <m.div className={styles.contactInfo} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
                        <div className={styles.contactCard}>
                            <div className={styles.contactIcon}>
                                <Clock />
                            </div>
                            <div className={styles.contactText}>
                                <h3>Tiempo de respuesta</h3>
                                <p>Menos de 2 horas hábiles</p>
                            </div>
                        </div>
                    </m.div>

                    {/* CTA para volver al inicio */}
                    <m.div className={styles.actions} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}>
                        <Link href="/" className="btn-primary flex items-center gap-2 px-8 py-4 text-lg">
                            <ArrowLeft size={24} />
                            Volver al inicio
                        </Link>
                    </m.div>
                </div>
            </div>
        </div>
    );
}
