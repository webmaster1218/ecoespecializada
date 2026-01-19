"use client";

import React from 'react';
import styles from './LogoLoop.module.css';

const logoData = [
    { name: "Equibiomedic", url: "/images/logo/equibiomedic-new.png" },
    { name: "Sura", url: "https://images.seeklogo.com/logo-png/32/1/sura-logo-png_seeklogo-328191.png" },
    { name: "Hospital Pablo Tobón Uribe", url: "https://images.seeklogo.com/logo-png/25/1/hospital-pablo-tobon-uribe-logo-png_seeklogo-251956.png" },
    { name: "Clínica del Country", url: "https://images.seeklogo.com/logo-png/35/1/clinica-internacional-logo-png_seeklogo-359473.png" },
    { name: "Colsanitas", url: "https://seeklogo.com/images/C/colsanitas-logo-483AF91885-seeklogo.com.png" },
    { name: "Clínica Medellín", url: "https://images.seeklogo.com/logo-png/19/1/clinica-san-pablo-logo-png_seeklogo-197404.png" },
    { name: "Fundación Valle del Lili", url: "https://banner2.cleanpng.com/20180803/xrr/b9b1ba6d0bf6e246dcd30f0d935cbe7a.webp" },
    { name: "Compensar", url: "https://logosenvector.com/logo/img/compensar-4399.jpg" },
    { name: "Cruz Verde", url: "https://images.seeklogo.com/logo-png/39/1/farmacia-cruz-verde-logo-png_seeklogo-390328.png" },
];

// Fallback to text if image fails to load keeps it clean
const getPlaceholder = (name: string) => `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=transparent&color=334155&size=128&font-size=0.3&bold=true&length=2`;

export default function LogoLoop() {
    // Duplicate multiple times for smooth infinite loop
    const allLogos = [...logoData, ...logoData, ...logoData];

    return (
        <section className={styles.section}>
            <div className={styles.mask}></div>

            <div className="container mx-auto px-4 mb-12 text-center" data-aos="fade-up">
                <span className="text-blue-600 font-bold uppercase tracking-widest text-xs md:text-sm mb-4 block">
                    Confianza comprobada
                </span>
                <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
                    Empresas que confían <span className="text-blue-600">en nosotros</span>
                </h2>
                <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
                    Acompañamos a las instituciones de salud líderes en Colombia con tecnología y respaldo.
                </p>
            </div>

            <div className={styles.sliderContainer}>
                <div className={styles.slider}>
                    <div className={styles.logoGrid}>
                        {allLogos.map((item, index) => (
                            <div key={index} className={styles.logoItem}>
                                <img
                                    src={item.url}
                                    alt={item.name}
                                    className={styles.logoImage}
                                    title={item.name}
                                    loading="lazy"
                                    onError={(e) => {
                                        // On error try a simple text fallback styling
                                        const target = e.target as HTMLImageElement;
                                        target.style.display = 'none';
                                        target.parentElement!.innerText = item.name;
                                        target.parentElement!.style.color = '#64748b';
                                        target.parentElement!.style.fontWeight = '700';
                                        target.parentElement!.style.fontSize = '1.2rem';
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
