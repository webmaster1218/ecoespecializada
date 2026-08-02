// src/components/sections/GoogleReviews.tsx
"use client";

import { useEffect, useState } from "react";
import type { ReviewsPayload, GoogleReview } from "@/app/api/reviews/route";
import styles from "./GoogleReviews.module.css";

function Stars({ rating, size = "sm" }: { rating: number; size?: "sm" | "lg" }) {
  const filled = Math.round(rating);
  const cls = size === "lg" ? styles.starsLg : styles.stars;
  return (
    <div className={cls} aria-label={`${rating} de 5 estrellas`}>
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
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86_400_000);
  if (Number.isNaN(days)) return "";
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
  const [selected, setSelected] = useState<GoogleReview | null>(null);

  useEffect(() => {
    let active = true;
    fetch("/api/reviews")
      .then((r) => r.json())
      .then((json: ReviewsPayload) => {
        if (!active) return;
        if (json.ok && json.place) {
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

  // Cerrar el modal con ESC y bloquear el scroll de fondo mientras esté abierto.
  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [selected]);

  if (status !== "ok" || !data?.place) return null;

  const { place } = data;
  const hasReviews = place.reviews.length > 0;
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

      {hasReviews ? (
        <div className={styles.sliderContainer}>
          <div className={styles.slider}>
            {reviews.map((review, idx) => (
              <button
                type="button"
                className={styles.card}
                key={`${review.authorName}-${idx}`}
                aria-hidden={idx >= place.reviews.length}
                tabIndex={idx >= place.reviews.length ? -1 : 0}
                onClick={() => setSelected(review)}
                aria-label={`Ver reseña completa de ${review.authorName}`}
              >
                <div className={styles.cardTop}>
                  <span className={styles.googleLogo}>G</span>
                  <Stars rating={review.rating} />
                </div>
                <p className={styles.cardText}>{review.text}</p>
                <div className={styles.cardFooter}>
                  <span className={styles.author}>{review.authorName}</span>
                  <span className={styles.date}>{timeAgo(review.publishTime)}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-center text-slate-600 text-lg max-w-2xl mx-auto px-4 leading-relaxed">
          Nuestros clientes nos califican en Google. Pulsa el botón para leer lo que opinan de
          nosotros.
        </p>
      )}

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

      {selected && (
        <div
          className={styles.modalOverlay}
          onClick={() => setSelected(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Reseñas en Google"
        >
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div>
                <h3 className={styles.modalHeading}>Reseñas en Google</h3>
                <div className={styles.modalSub}>
                  <span className={styles.googleLogo}>G</span>
                  <span className={styles.ratingValue}>{place.rating.toFixed(1)}</span>
                  <Stars rating={place.rating} size="lg" />
                  <span className={styles.ratingCount}>({place.userRatingCount})</span>
                </div>
              </div>
              <button
                type="button"
                className={styles.closeBtn}
                onClick={() => setSelected(null)}
                aria-label="Cerrar"
              >
                ✕
              </button>
            </div>

            <div className={styles.modalReviews}>
              {place.reviews.map((review, idx) => (
                <article className={styles.modalReview} key={`${review.authorName}-${idx}`}>
                  <div className={styles.modalReviewTop}>
                    <span className={styles.author}>{review.authorName}</span>
                    <span className={styles.date}>{timeAgo(review.publishTime)}</span>
                  </div>
                  <Stars rating={review.rating} size="lg" />
                  <p className={styles.modalText}>{review.text}</p>
                </article>
              ))}
            </div>

            <a
              href={place.googleMapsUri}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.mapsBtn}
            >
              Ver en Google Maps
            </a>
          </div>
        </div>
      )}
    </section>
  );
}
