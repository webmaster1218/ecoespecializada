"use client";

import { IconPhone } from "@tabler/icons-react";
import styles from "./CallButton.module.css";

interface CallButtonProps {
    className?: string;
    text?: string;
    variant?: "primary" | "secondary" | "outline";
}

export default function CallButton({ className = "", text = "Llamar ahora", variant = "primary" }: CallButtonProps) {
    const buttonClass = variant === "primary" ? "btn-primary" : (variant === "outline" ? styles.outline : styles.secondary);

    return (
        <a 
            href="tel:+573005212664" 
            className={`${buttonClass} ${className} ${styles.callButton}`}
        >
            <IconPhone size={18} stroke={2.5} className={styles.icon} />
            <span className={styles.text}>{text}</span>
        </a>
    );
}
