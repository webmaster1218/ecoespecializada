"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import styles from "./Hero.module.css";

interface HeroProps {
  badgeText?: string;
  headline?: React.ReactNode;
  subheadline?: React.ReactNode;
  ctaText?: string;
  ctaHref?: string;
  whatsappText?: string;
  whatsappLink?: string;
  imageSrc?: string;
  imageAlt?: string;
  availabilityText?: string;
  availabilitySubtext?: string;
}

export default function Hero({
  badgeText = "Disponibilidad inmediata para envío hoy mismo",
  headline = (
    <>
      Alquila tu ecógrafo por día,
      <br />
      <span className="text-gradient">
        Recibe tu equipo rápido y sigue facturando.
      </span>
    </>
  ),
  subheadline = (
    <>
      La mejor opción de <strong>alquiler de ecógrafos en Medellín</strong> y
      toda Antioquia. Mindray Z6 y Z60 de gama alta sin grandes inversiones.
    </>
  ),
  ctaText = "Cotizar ahora",
  ctaHref = "#reservar",
  whatsappText,
  whatsappLink,
  imageSrc = "/images/z60/z-60-abierto-izquierda.webp",
  imageAlt = "Ecógrafo Mindray Z60",
  availabilityText = "Inmediata",
  availabilitySubtext = "Para envío hoy mismo",
}: HeroProps) {
  return (
    <section className={styles.hero} id="inicio">
      <div className={`container ${styles.container}`}>
        {/* Left Column: Text Content */}
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className={styles.badge}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className={styles.badgeIcon}>✓</span> {badgeText}
          </motion.div>

          <motion.h1
            className={styles.headline}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {headline}
          </motion.h1>

          <motion.p
            className={styles.subheadline}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {subheadline}
          </motion.p>

          <motion.div
            className={styles.actions}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <a href={ctaHref} className="btn-primary">
              {ctaText}
              <span className="ml-2 bg-white/20 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                🔥 4 disp.
              </span>
            </a>
            {whatsappLink ? (
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 rounded-full font-semibold text-slate-600 bg-white border border-slate-200 hover:border-green-400 hover:text-green-600 transition-all shadow-sm"
              >
                {whatsappText || "WhatsApp"}
              </a>
            ) : (
              <a
                href="#ventajas"
                className="px-8 py-3 rounded-full font-semibold text-slate-600 bg-white border border-slate-200 hover:border-blue-400 hover:text-blue-600 transition-all shadow-sm"
              >
                ¿Por qué alquilar?
              </a>
            )}
          </motion.div>

          <motion.div
            className={styles.trust}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className={styles.trustItem}>
              <span>🏥</span> +10 clínicas confían
            </div>
            <div className={styles.trustItem}>
              <span>⭐</span> 4.9/5 calificación
            </div>
            <div className={styles.trustItem}>
              <span>🛡️</span> Garantía 100%
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column: Visual Composition */}
        <div className="relative w-full h-[500px] md:h-[600px] flex items-center justify-center lg:h-[700px]">
          {/* Layer 1: Atmosphere Glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute z-10 h-[300px] w-[300px] rounded-full bg-blue-100 blur-3xl lg:h-[500px] lg:w-[500px]"
          />

          {/* Layer 2: The Pedestal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="absolute z-20 h-[280px] w-[280px] rounded-full border border-blue-50 bg-gradient-to-b from-blue-50/50 to-white shadow-2xl shadow-blue-200/40 lg:h-[450px] lg:w-[450px]"
          />

          {/* Layer 3: The Product Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="relative z-30 flex items-center justify-center w-[350px] md:w-[480px]"
          >
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={500}
              height={500}
              className="w-full h-auto object-contain drop-shadow-2xl"
              style={{ mixBlendMode: "multiply" }}
              priority
              fetchPriority="high"
              decoding="sync"
              sizes="(max-width: 640px) 90vw, (max-width: 1024px) 480px, 500px"
            />
          </motion.div>

          {/* Layer 4: Floating Availability Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="absolute -bottom-10 left-0 right-0 mx-auto w-fit md:mx-0 md:w-auto md:left-auto md:bottom-16 md:-right-4 lg:right-10 z-40"
          >
            <div className="bg-white/80 backdrop-blur-md p-3 md:p-5 rounded-2xl shadow-xl flex items-center gap-3 md:gap-4 hover:scale-105 transition-transform duration-300 cursor-default border border-white/50 min-w-[280px] md:min-w-[300px]">
              <div className="bg-green-100 p-2 md:p-3 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 md:w-6 md:h-6 text-green-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12l5 5l10 -10" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-xs text-slate-500 font-medium mb-0.5">
                  Disponibilidad
                </p>
                <p className="text-base md:text-lg font-bold text-green-600 leading-none mb-1">
                  {availabilityText}
                </p>
                <p className="text-[10px] text-slate-400 font-medium">
                  {availabilitySubtext}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
