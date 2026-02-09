"use client";

import { useState } from "react";
import Image from "next/image";
import { IconEye } from "@tabler/icons-react";
import styles from "./ProductCatalog.module.css";
import ProductGalleryModal from "../ui/ProductGalleryModal";
import CallButton from "../ui/CallButton";

const Z6_DATA = {
    id: 'z6',
    name: "Mindray Z6",
    tagline: "El equilibrio perfecto",
    description: "La elección inteligente para diagnósticos generales. El Z6 combina portabilidad con una calidad de imagen sorprendente para su segmento, permitiendo diagnósticos confiables en cualquier lugar.",
    price: "$ 350.000",
    images: [
        "/images/z6/z6-Tripode.webp",
        "/images/z6/z6-abierto-derecha.webp",
        "/images/z6/z6-abierto-izquierda.webp",
        "/images/z6/z6.webp",
        "/images/z6/z6-espalda.webp"
    ],
    features: [
        "Batería de 90 min de autonomía",
        "Peso ligero: 6.5kg",
        "iStation™: Gestión de pacientes",
        "Arranque rápido en 30s"
    ],
    specialties: ["Ginecología", "Obstetricia", "Abdomen", "Partes Blandas"],
    psychology: "Rentabilidad inmediata"
};

const Z60_DATA = {
    id: 'z60',
    name: "Mindray Z60",
    tagline: "Potencia clínica superior",
    description: "Lleva tu consulta al siguiente nivel. Con tecnologías heredadas de sistemas de consola, el Z60 ofrece Doppler Color avanzado y una resolución de contraste excepcional para casos difíciles.",
    price: "$ 550.000",
    images: [
        "/images/z60/z-60-tripode.webp",
        "/images/z60/z-60-abierto-derecha.webp",
        "/images/z60/z-60-abierto-izquierda.webp",
        "/images/z60/z-60-espalda.webp",
        "/images/z60/z-60.webp"
    ],
    features: [
        "Doppler Color / Power de Alta Sensibilidad",
        "Pantalla 15\" Reclinable 60°",
        "Tecnología iClear™ (Reducción de ruido)",
        "Phase Shift Harmonic Imaging"
    ],
    specialties: ["Cardiología Básica", "Vascular", "Urología", "MSK Avanzado"],
    psychology: "Calidad de imagen premium"
};

export type ProductDetails = typeof Z6_DATA;

export default function ProductCatalog() {
    const [selectedProduct, setSelectedProduct] = useState<ProductDetails | null>(null);

    const handleOpenGallery = (product: ProductDetails) => {
        setSelectedProduct(product);
    };

    const handleCloseGallery = () => {
        setSelectedProduct(null);
    };

    return (
        <section className={styles.section} id="equipos">
            <div className="container">
                <div className={styles.header} data-aos="fade-up">
                    <span className={styles.overline}>Modelos disponibles</span>
                    <h2 className={styles.title}>Tecnología <span className="text-gradient">mindray a tu alcance</span></h2>
                    <p className={styles.subtitle}>Tecnología Mindray de última generación disponible para <strong>entrega inmediata en Medellín</strong> y despachos a nivel nacional.</p>
                </div>

                <div className={styles.grid}>
                    {/* Card Z6 */}
                    <div className={`${styles.card} glass-card hover:shadow-lg transition-all`} data-aos="fade-up">
                        <div className={styles.cardHeader}>
                            <h3 className={styles.productName}>Mindray Z6</h3>
                            <span className="inline-block px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wider rounded-full">Funcionalidad y precio</span>
                        </div>

                        <div className={styles.priceContainer}>
                            <p className={styles.equipmentDescription}>
                                Portabilidad y versatilidad para diagnósticos generales. Calidad de imagen sorprendente para su segmento.
                            </p>
                            <div className={`${styles.currentPrice} text-slate-900`}>$ 350.000<span className={styles.period}>/día</span></div>
                        </div>

                        <div className={`${styles.stock} text-orange-600 font-bold`}>
                            <span className={`${styles.dot} bg-orange-500 animate-pulse`}></span> ¡Solo 2 unidades disponibles!
                        </div>

                        <div className={styles.imagePlaceholder}>
                            <Image
                                src="/images/z6/z6-abierto-izquierda.webp"
                                alt="Mindray Z6"
                                fill
                                style={{ objectFit: 'contain' }}
                                sizes="(max-width: 768px) 90vw, (max-width: 1200px) 45vw, 444px"
                            />
                            <button
                                className={styles.galleryBtn}
                                onClick={() => handleOpenGallery(Z6_DATA)}
                            >
                                <IconEye size={18} /> Ver galería
                            </button>
                        </div>

                        <ul className={styles.specs}>
                            <li>✓ Ideal obstetricia y ginecología</li>
                            <li>✓ Batería de 90 min de autonomía</li>
                            <li>✓ <strong>3 sondas incluidas:</strong> Convexo, TV, Lineal</li>
                            <li>✓ Ligero: Solo 6.5kg de peso</li>
                        </ul>

                        <div className={styles.actions}>
                            <button
                                className={`px-6 py-3 rounded-full font-semibold border border-slate-200 hover:border-blue-400 hover:text-blue-600 transition-all text-slate-600 w-full`}
                                onClick={() => handleOpenGallery(Z6_DATA)}
                            >
                                Ver detalles
                            </button>
                            <a href="#reservar" className="btn-primary w-full">Reservar ahora</a>
                            <CallButton text="Llamar" variant="outline" className="w-full" />
                        </div>
                    </div>

                    {/* Card Z60 */}
                    <div className={`${styles.card} glass-card ${styles.featured} ring-2 ring-blue-500/20 shadow-blue-900/5`} data-aos="fade-up" data-aos-delay="100">
                        <div className={`${styles.featuredBadge} bg-blue-600 text-white shadow-lg`}>Recomendado</div>
                        <div className={styles.cardHeader}>
                            <h3 className={styles.productName}>Mindray Z60</h3>
                            <span className="inline-block px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wider rounded-full">Sofware moderno, mejor resolución</span>
                        </div>

                        <div className={styles.priceContainer}>
                            <p className={styles.equipmentDescription}>
                                Doppler avanzado y resolución superior para casos difíciles. El equilibrio perfecto entre potencia y diseño.
                            </p>
                            <div className={`${styles.currentPrice} text-blue-600`}>$ 550.000<span className={styles.period}>/día</span></div>
                        </div>

                        <div className={`${styles.stock} text-orange-600 font-bold`}>
                            <span className={`${styles.dot} bg-orange-500 animate-pulse`}></span> ¡Solo 2 unidades disponibles!
                        </div>

                        <div className={styles.imagePlaceholder}>
                            <Image
                                src="/images/z60/z-60-abierto-izquierda.webp"
                                alt="Mindray Z60"
                                fill
                                style={{ objectFit: 'contain' }}
                                sizes="(max-width: 768px) 90vw, (max-width: 1200px) 45vw, 444px"
                            />
                            <button
                                className={styles.galleryBtn}
                                onClick={() => handleOpenGallery(Z60_DATA)}
                            >
                                <IconEye size={18} /> Ver galería
                            </button>
                        </div>

                        <ul className={styles.specs}>
                            <li>✓ <strong>Doppler color / Power Doppler</strong></li>
                            <li>✓ Pantalla LCD 15" Reclinable</li>
                            <li>✓ Tecnologías iClear™ / iBeam™ / iTouch™</li>
                            <li>✓ Batería Li-ion (100min+ autonomía)</li>
                            <li>✓ 3 Sondas: Convexo, Lineal, Endocavitaria</li>
                            <li>✓ Gestión de pacientes iStation™ + 500GB</li>
                        </ul>

                        <div className={styles.actions}>
                            <button
                                className={`px-6 py-3 rounded-full font-semibold border border-slate-200 hover:border-blue-400 hover:text-blue-600 transition-all text-slate-600 w-full hover:bg-blue-50`}
                                onClick={() => handleOpenGallery(Z60_DATA)}
                            >
                                Ver detalles
                            </button>
                            <a href="#reservar" className="btn-primary w-full shadow-lg shadow-blue-600/20">Reservar ahora</a>
                            <CallButton text="Llamar" variant="outline" className="w-full" />
                        </div>
                    </div>
                </div>
            </div>

            <ProductGalleryModal
                isOpen={selectedProduct !== null}
                onClose={handleCloseGallery}
                product={selectedProduct}
            />
        </section>
    );
}
