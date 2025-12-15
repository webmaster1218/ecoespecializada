"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { IconX, IconChevronLeft, IconChevronRight, IconCheck, IconTrophy, IconStethoscope } from "@tabler/icons-react";
import styles from "./ProductGalleryModal.module.css";
import { ProductDetails } from "../sections/ProductCatalog";

interface ProductGalleryModalProps {
    isOpen: boolean;
    onClose: () => void;
    product: ProductDetails | null;
}

export default function ProductGalleryModal({ isOpen, onClose, product }: ProductGalleryModalProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    // Reset index when modal opens
    useEffect(() => {
        if (isOpen && product) {
            setCurrentIndex(0);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
            setIsHovered(false); // Reset zoom state
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, product]);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isOpen) return;
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowLeft') showPrev();
            if (e.key === 'ArrowRight') showNext();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, currentIndex]); // eslint-disable-line

    if (!isOpen || !product) return null;

    const images = product.images;

    const showNext = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
        setIsHovered(false); // Reset zoom
    };

    const showPrev = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
        setIsHovered(false); // Reset zoom
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;
        setMousePosition({ x, y });
    };

    return (
        <AnimatePresence>
            <motion.div
                className={styles.overlay}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            >
                <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                    <button className={styles.closeButton} onClick={onClose}>
                        <IconX size={24} />
                    </button>

                    <div className={styles.container}>
                        {/* Columna Izquierda: Galería */}
                        <div className={styles.colImage}>
                            <div className={styles.mainImageContainer}>
                                <button className={`${styles.navButton} ${styles.prev}`} onClick={showPrev}>
                                    <IconChevronLeft size={24} />
                                </button>

                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={currentIndex}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{
                                            opacity: 1,
                                            scale: isHovered ? 2 : 1
                                        }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.2 }}
                                        className={styles.imageWrapper}
                                        onMouseEnter={() => setIsHovered(true)}
                                        onMouseLeave={() => setIsHovered(false)}
                                        onMouseMove={handleMouseMove}
                                        style={{
                                            transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
                                            cursor: isHovered ? 'zoom-out' : 'zoom-in'
                                        }}
                                    >
                                        <Image
                                            src={images[currentIndex]}
                                            alt={`${product.name} view ${currentIndex + 1}`}
                                            fill
                                            className={styles.mainImage}
                                            priority={true}
                                        />
                                    </motion.div>
                                </AnimatePresence>

                                <button className={`${styles.navButton} ${styles.next}`} onClick={showNext}>
                                    <IconChevronRight size={24} />
                                </button>
                            </div>

                            <div className={styles.thumbnailStrip}>
                                {images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        className={`${styles.thumbnailBtn} ${idx === currentIndex ? styles.activeThumb : ''}`}
                                        onClick={() => setCurrentIndex(idx)}
                                    >
                                        <Image
                                            src={img}
                                            alt={`Thumb ${idx}`}
                                            fill
                                            className={styles.img}
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Columna Derecha: Información */}
                        <div className={styles.colInfo}>
                            <div className={styles.headerInfo}>
                                <span className={styles.tagline}>{product.tagline}</span>
                                <h3 className={styles.productTitle}>{product.name}</h3>
                                <div className={styles.priceTag}>{product.price}<span className={styles.period}>/día</span></div>
                            </div>

                            <p className={styles.description}>{product.description}</p>

                            <div className={styles.psychologyBadge}>
                                <IconTrophy size={18} className="text-yellow-500" />
                                <span>{product.psychology}</span>
                            </div>

                            <div className={styles.sectionTitle}>
                                <IconStethoscope size={18} /> Especialidades Ideales
                            </div>
                            <div className={styles.tagsContainer}>
                                {product.specialties.map((spec, i) => (
                                    <span key={i} className={styles.specTag}>{spec}</span>
                                ))}
                            </div>

                            <div className={styles.sectionTitle}>
                                <IconCheck size={18} /> Características Clave
                            </div>
                            <ul className={styles.featuresList}>
                                {product.features.map((feat, i) => (
                                    <li key={i}>{feat}</li>
                                ))}
                            </ul>

                            <div className={styles.ctaContainer}>
                                <a href="#reservar" onClick={onClose} className="btn-primary" style={{ width: '100%', textAlign: 'center' }}>
                                    Reservar Ahora
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
