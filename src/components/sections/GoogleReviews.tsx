// src/components/sections/GoogleReviews.tsx
"use client";

import { useEffect, useState } from "react";
import type { ReviewsPayload, GoogleReview } from "@/app/api/reviews/route";
import styles from "./GoogleReviews.module.css";

function Stars({ rating }: { rating: number }) {
  const filled = Math.round(rating);
  return (
    <div className={styles.stars} aria-label={`${rating} de 5 estrellas`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={i <= filled ? styles.starFilled : styles.starEmpty}>
          ★
        </span>
      ))}
    </div>
  );
}

function timeAgo(iso: string): string {
  if (!iso) return "";
  const diff = Date.now() - new Date(iso).getTime();
  const days = Math.floor(diff / 86_400_000);
  if (days <= 0) return "hoy";
  if (days === 1) return "hace 1 día";
  if (days < 7) return `hace ${days} días`;
  const weeks = Math.floor(days / 7);
  if (weeks === 1) return "hace 1 semana";
  if (weeks < 5) return `hace ${weeks} semanas`;
  const months = Math.floor(days / 30);
  if (months === 1) return "hace 1 mes";
  return `hace ${months} meses`;
}

export default function GoogleReviews() {
  const [data, setData] = useState<ReviewsPayload | null>(null);
  const [status, setStatus] = useState<"loading" | "ok" | "error">("loading");

  useEffect(() => {
    let active = true;
    fetch("/api/reviews")
      .then((r) => r.json())
      .then((json: ReviewsPayload) => {
        if (!active) return;
        if (json.ok && json.place && json.place.reviews.length > 0) {
          setData(json);
          setStatus("ok");
        } else {
          setStatus("error");
        }
      })
      .catch(() => {
        if (active) setStatus("error");
      });
    return () => {
      active = false;
    };
  }, []);

  if (status !== "ok" || !data?.place) return null;

  const { place } = data;
  // Duplicar para loop infinito limpio (translateX -50%).
  const reviews: GoogleReview[] = [...place.reviews, ...place.reviews];

  return (
    <section className={styles.section} id="resenas-google">
      <div className="container mx-auto px-4 mb-12 text-center">
        <span className="text-blue-600 font-bold uppercase tracking-widest text-xs md:text-sm mb-4 block">
          Opiniones verificadas
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
          Reseñas en <span className="text-blue-600">Google</span>
        </h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Lo que nuestros clientes opinan de nosotros en Google, en tiempo real.
        </p>
        <div className={styles.ratingBadge}>
          <span className={styles.ratingValue}>{place.rating.toFixed(1)}</span>
          <Stars rating={place.rating} />
          <span className={styles.ratingCount}>({place.userRatingCount} reseñas)</span>
        </div>
      </div>

      <div className={styles.sliderContainer}>
        <div className={styles.slider}>
          {reviews.map((review, idx) => (
            <div className={styles.card} key={`${review.authorName}-${idx}`}>
              <div className={styles.cardTop}>
                <span className={styles.googleLogo}>G</span>
                <Stars rating={review.rating} />
              </div>
              <p className={styles.cardText}>{review.text}</p>
              <div className={styles.cardFooter}>
                <span className={styles.author}>{review.authorName}</span>
                <span className={styles.date}>{timeAgo(review.publishTime)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {place.googleMapsUri && (
        <div className="text-center mt-8">
          <a
            href={place.googleMapsUri}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 transition"
          >
            Ver todas las reseñas en Google
          </a>
        </div>
      )}
    </section>
  );
}
