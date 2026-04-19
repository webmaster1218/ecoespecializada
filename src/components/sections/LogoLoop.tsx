"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import styles from './LogoLoop.module.css';

const logoData = [
    { name: "Equibiomedic", src: "/images/logo/equibiomedic-new.webp", width: 200, height: 40 },
    { name: "Sura", src: "/images/logo/partners/sura.webp", width: 120, height: 60 },
    { name: "Hospital Pablo Tobón Uribe", src: "/images/logo/partners/pablo_tobon.webp", width: 120, height: 60 },
    { name: "Clínica del Country", src: "/images/logo/partners/clinica_country.webp", width: 120, height: 60 },
    { name: "Colsanitas", src: "/images/logo/partners/colsanitas.webp", width: 120, height: 60 },
    { name: "Clínica Medellín", src: "/images/logo/partners/clinica_medellin.webp", width: 120, height: 60 },
    { name: "Fundación Valle del Lili", src: "/images/logo/partners/valle_lili.webp", width: 120, height: 60 },
    { name: "Compensar", src: "https://logosenvector.com/logo/img/compensar-4399.jpg", width: 120, height: 60 },
    { name: "Cruz Verde", src: "/images/logo/partners/cruz_verde.webp", width: 120, height: 60 },
];

const logoDataWithIds = logoData.map((logo, idx) => ({ ...logo, id: idx }));

function LogoImage({ name, src, width, height }: { name: string; src: string; width: number; height: number }) {
    const [hasError, setHasError] = React.useState(false);

    if (hasError) {
        return <span className={styles.logoFallback}>{name}</span>;
    }

    const isExternal = src.startsWith('http');

    if (isExternal) {
        return (
            <img
                src={src}
                alt={name}
                className={styles.logoImage}
                title={name}
                loading="lazy"
                onError={() => setHasError(true)}
            />
        );
    }

    return (
        <Image
            src={src}
            alt={name}
            width={width}
            height={height}
            className={styles.logoImage}
            title={name}
            onError={() => setHasError(true)}
        />
    );
}

export default function LogoLoop() {
    // Duplicate multiple times for smooth infinite loop
    const allLogos = [...logoData, ...logoData, ...logoData];

    return (
        <section className={styles.section}>
            <div className={styles.mask}></div>

            <motion.div className="container mx-auto px-4 mb-12 text-center" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
                <span className="text-blue-600 font-bold uppercase tracking-widest text-xs md:text-sm mb-4 block">
                    Confianza comprobada
                </span>
                <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
                    Empresas que confían <span className="text-blue-600">en nosotros</span>
                </h2>
                <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
                    Acompañamos a las instituciones de salud líderes en Colombia con tecnología y respaldo.
                </p>
            </motion.div>

            <div className={styles.sliderContainer}>
                <div className={styles.slider}>
                    <div className={styles.logoGrid}>
                        {allLogos.map((item, index) => (
                            <div key={index} className={styles.logoItem}>
                                <LogoImage name={item.name} src={item.src} width={item.width} height={item.height} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
