import Link from "next/link";
import { IconCheck, IconArrowLeft, IconClock } from "@tabler/icons-react";
import styles from "./Gracias.module.css";
import Image from "next/image";

export default function Gracias() {
    return (
        <div className={styles.page}>
            <div className="container">
                <div className={styles.content}>
                    {/* Logo */}
                    <div className="flex justify-center mb-8">
                        <Image src="/images/logo/logo.webp" alt="Logo" width={180} height={60} className="rounded-lg shadow-sm" />
                    </div>

                    {/* Icono de éxito */}
                    <div className={styles.successIcon} data-aos="zoom-in">
                        <IconCheck />
                    </div>

                    {/* Mensaje principal */}
                    <div className={styles.message} data-aos="fade-up" data-aos-delay="100">
                        <h1 className={styles.title}>
                            ¡Gracias por tu <span className="text-gradient">mensaje!</span>
                        </h1>
                        <p className={styles.description}>
                            Hemos recibido tu información correctamente. Uno de nuestros asesores especializados
                            se pondrá en contacto contigo en las próximas horas para ayudarte a encontrar la
                            solución perfecta para tus necesidades de diagnóstico médico.
                        </p>
                    </div>

                    {/* Información de contacto */}
                    <div className={styles.contactInfo} data-aos="fade-up" data-aos-delay="200">
                        <div className={styles.contactCard}>
                            <div className={styles.contactIcon}>
                                <IconClock />
                            </div>
                            <div className={styles.contactText}>
                                <h3>Tiempo de respuesta</h3>
                                <p>Menos de 2 horas hábiles</p>
                            </div>
                        </div>
                    </div>

                    {/* CTA para volver al inicio */}
                    <div className={styles.actions} data-aos="fade-up" data-aos-delay="300">
                        <Link href="/" className="btn-primary flex items-center gap-2">
                            <IconArrowLeft size={20} />
                            Volver al inicio
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
