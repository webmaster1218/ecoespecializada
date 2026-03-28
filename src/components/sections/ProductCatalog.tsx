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

const M7_DATA = {
    id: 'm7',
    name: "Mindray M7",
    tagline: "Claridad · Precisión · Rendimiento",
    description: "Lleva tu bola de cristal al punto de atención. El M7 es una poderosa herramienta con calidad de imagen superior para todas las especialidades clínicas, incluyendo 3D/4D.",
    price: "$ 650.000",
    images: [
        "/images/m7/M7-abierto-ziquierda.png",
        "/images/m7/m7-abierto-derecha.png",
        "/images/m7/m7-de-lado.png",
        "/images/m7/M7-trastuctores.jpg"
    ],
    features: [
        "Doppler Color Portátil Premium",
        "Imagen 4D Transvaginal Volumétrico",
        "iTouch™, iClear™, iZoom™, iBeam™",
        "Batería Li-ion (1.5h+ autonomía)"
    ],
    specialties: ["Obstetricia 3D/4D", "Cardiovascular", "Musculoesquelético"],
    psychology: "Tecnología premium multipropósito"
};

export type ProductDetails = typeof Z6_DATA;

export default function ProductCatalog({ city }: { city?: string }) {
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
                    <p className={styles.subtitle}>Tecnología Mindray de última generación disponible para {city ? `entrega en ${city}` : "entrega inmediata en Medellín"} y despachos a nivel nacional.</p>
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

                        <div className="grid grid-cols-2 gap-3 mt-auto pt-4 w-full">
                            <button
                                className={`px-2 py-2.5 rounded-xl font-bold border border-slate-200 hover:border-blue-400 hover:text-blue-600 transition-all text-slate-600 w-full text-sm hover:bg-slate-50`}
                                onClick={() => handleOpenGallery(Z6_DATA)}
                            >
                                Ver detalles
                            </button>
                            <a href="#reservar" className="btn-primary w-full text-center flex items-center justify-center py-2.5 px-2 text-sm rounded-xl">Reservar ahora</a>
                            <div className="col-span-2">
                                <CallButton
                                    text="Llamar"
                                    subtext="300 3608621"
                                    variant="highlight"
                                    className="w-full justify-center"
                                />
                            </div>
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

                        <div className="grid grid-cols-2 gap-3 mt-auto pt-4 w-full">
                            <button
                                className={`px-2 py-2.5 rounded-xl font-bold border border-slate-200 hover:border-blue-400 hover:text-blue-600 transition-all text-slate-600 w-full text-sm hover:bg-blue-50`}
                                onClick={() => handleOpenGallery(Z60_DATA)}
                            >
                                Ver detalles
                            </button>
                            <a href="#reservar" className="btn-primary w-full shadow-lg shadow-blue-600/20 text-center flex items-center justify-center py-2.5 px-2 text-sm rounded-xl">Reservar ahora</a>
                            <div className="col-span-2">
                                <CallButton
                                    text="Llamar"
                                    subtext="300 3608621"
                                    variant="highlight"
                                    className="w-full justify-center"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Card M7 */}
                    <div className={`${styles.card} glass-card hover:shadow-lg transition-all`} data-aos="fade-up" data-aos-delay="200">
                        <div className={styles.cardHeader}>
                            <h3 className={styles.productName}>Mindray M7</h3>
                            <span className="inline-block px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wider rounded-full">Experiencia 3D/4D</span>
                        </div>

                        <div className={styles.priceContainer}>
                            <p className={styles.equipmentDescription}>
                                Potencia multiplicadora para punto de atención con imagen 4D transvaginal volumétrico. Multiespecialidad y robusto.
                            </p>
                            <div className={`${styles.currentPrice} text-slate-900`}>$ 650.000<span className={styles.period}>/día</span></div>
                        </div>

                        <div className={`${styles.stock} text-emerald-600 font-bold`}>
                            <span className={`${styles.dot} bg-emerald-500 animate-pulse`}></span> ¡Disponible ahora!
                        </div>

                        <div className={styles.imagePlaceholder}>
                            <Image
                                src="/images/m7/m7-abierto-derecha.png"
                                alt="Mindray M7"
                                fill
                                style={{ objectFit: 'contain' }}
                                sizes="(max-width: 768px) 90vw, (max-width: 1200px) 45vw, 444px"
                            />
                            <button
                                className={styles.galleryBtn}
                                onClick={() => handleOpenGallery(M7_DATA)}
                            >
                                <IconEye size={18} /> Ver galería
                            </button>
                        </div>

                        <ul className={styles.specs}>
                            <li>✓ <strong>Doppler Color / 4D Volumétrico</strong></li>
                            <li>✓ 2 Sondas: Convexo, TV Volumétrico</li>
                            <li>✓ Software IMT Integrado</li>
                            <li>✓ Carcasa robusta antiimpacto</li>
                            <li>✓ Autonomía extendida con iRoam™</li>
                        </ul>

                        <div className="grid grid-cols-2 gap-3 mt-auto pt-4 w-full">
                            <button
                                className={`px-2 py-2.5 rounded-xl font-bold border border-slate-200 hover:border-blue-400 hover:text-blue-600 transition-all text-slate-600 w-full text-sm hover:bg-slate-50`}
                                onClick={() => handleOpenGallery(M7_DATA)}
                            >
                                Ver detalles
                            </button>
                            <a href="#reservar" className="btn-primary w-full text-center flex items-center justify-center py-2.5 px-2 text-sm rounded-xl">Reservar ahora</a>
                            <div className="col-span-2">
                                <CallButton
                                    text="Llamar"
                                    subtext="300 3608621"
                                    variant="highlight"
                                    className="w-full justify-center"
                                />
                            </div>
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
