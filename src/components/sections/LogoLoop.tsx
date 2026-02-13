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
const logoDataWithIds = logoData.map((logo, idx) => ({ ...logo, id: idx }));

function LogoImage({ name, url }: { name: string; url: string }) {
    const [hasError, setHasError] = React.useState(false);

    if (hasError) {
        return <span className={styles.logoFallback}>{name}</span>;
    }

    return (
        <img
            src={url}
            alt={name}
            className={styles.logoImage}
            title={name}
            loading="lazy"
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
                                <LogoImage name={item.name} url={item.url} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
