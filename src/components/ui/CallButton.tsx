"use client";

import { IconPhone, IconBrandWhatsapp } from "@tabler/icons-react";
import styles from "./CallButton.module.css";

interface CallButtonProps {
    className?: string;
    text?: string;
    subtext?: string;
    href?: string;
    iconType?: "phone" | "whatsapp";
    variant?: "primary" | "secondary" | "outline" | "highlight";
}

export default function CallButton({
    className = "",
    text = "Llamar ahora",
    subtext,
    href = "tel:+573005212664",
    iconType = "phone",
    variant = "primary"
}: CallButtonProps) {
    const buttonClass =
        variant === "primary" ? "btn-primary" :
            variant === "highlight" ? "btn-highlight" :
                variant === "outline" ? styles.outline :
                    styles.secondary;

    const Icon = iconType === "whatsapp" ? IconBrandWhatsapp : IconPhone;

    return (
        <a
            href={href}
            className={`${buttonClass} ${className} ${styles.callButton} ${subtext ? styles.withSubtext : ""}`}
        >
            <Icon size={subtext ? 22 : 18} stroke={2.5} className={styles.icon} />
            <div className={styles.textContainer}>
                <span className={styles.text}>{text}</span>
                {subtext && <span className={styles.subtext}>{subtext}</span>}
            </div>
        </a>
    );
}
