// src/app/api/reviews/route.ts
import { NextResponse } from "next/server";

// Fuerza render dinámico: los route handlers en Next pueden cachearse estáticamente
// en build y quemar el valor de process.env (key indefinida en build). Con esto,
// el endpoint siempre se evalúa en runtime con la key real.
export const dynamic = "force-dynamic";

const API_KEY = process.env.GOOGLE_PLACES_API_KEY;
const PLACE_ID = process.env.GOOGLE_PLACES_PLACE_ID;
const MAPS_URI = process.env.GOOGLE_PLACES_MAPS_URI;
const TTL_MS = 6 * 60 * 60 * 1000; // 6 horas

export type GoogleReview = {
  authorName: string;
  rating: number;
  text: string;
  publishTime: string;
};

export type ReviewsPayload = {
  ok: boolean;
  place?: {
    name: string;
    rating: number;
    userRatingCount: number;
    googleMapsUri: string;
    reviews: GoogleReview[];
  };
  error?: string;
};

type Cached = { data: ReviewsPayload; at: number };
let cache: Cached | null = null;

// Places API (New) — sin facturación. Da nota, contador y URL de la ficha.
async function fetchPlaceSummary() {
  const url = `https://places.googleapis.com/v1/places/${PLACE_ID}`;
  const res = await fetch(url, {
    headers: {
      "X-Goog-Api-Key": API_KEY!,
      "X-Goog-FieldMask": "displayName,rating,userRatingCount,googleMapsUri",
    },
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`Places API error: ${res.status}`);
  const d = await res.json();
  return {
    name: d.displayName?.text ?? "Alquiler de Ecógrafos",
    rating: d.rating ?? 0,
    userRatingCount: d.userRatingCount ?? 0,
    googleMapsUri: d.googleMapsUri ?? "",
  };
}

// Places API legacy (place/details) — devuelve el texto de las reseñas pero
// requiere facturación activa. Si falla, devolvemos [] (la sección muestra
// el fallback sin texto, y el texto aparece solo cuando la facturación exista).
async function fetchLegacyReviews(): Promise<GoogleReview[]> {
  const url =
    `https://maps.googleapis.com/maps/api/place/details/json` +
    `?place_id=${PLACE_ID}&fields=reviews&language=es&key=${API_KEY}`;
  const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
  if (!res.ok) throw new Error(`Legacy error: ${res.status}`);
  const data = await res.json();
  if (data.status !== "OK") return [];

  const r = data.result ?? {};
  return (r.reviews ?? [])
    .filter((x: { text?: string }) => x.text)
    .map((x: { author_name?: string; rating?: number; text?: string; time?: number }) => ({
      authorName: x.author_name ?? "Cliente Google",
      rating: x.rating ?? 5,
      text: x.text!,
      // `time` viene en segundos Unix; lo convertimos a ISO para el componente.
      publishTime: x.time ? new Date(x.time * 1000).toISOString() : "",
    }));
}

export async function GET() {
  if (!API_KEY || !PLACE_ID) {
    return NextResponse.json({ ok: false, error: "not_configured" } satisfies ReviewsPayload);
  }

  if (cache && Date.now() - cache.at < TTL_MS) {
    return NextResponse.json(cache.data);
  }

  try {
    const summary = await fetchPlaceSummary();
    let reviews: GoogleReview[] = [];
    try {
      reviews = await fetchLegacyReviews();
    } catch (err) {
      // Sin facturación o fallo de legacy: la sección igual se muestra con la nota.
      console.warn("reviews: sin texto de reseñas (legacy requiere facturación)", err);
    }
    const payload: ReviewsPayload = { ok: true, place: { ...summary, reviews } };
    cache = { data: payload, at: Date.now() };
    return NextResponse.json(payload);
  } catch (err) {
    // Si la API falla (propagación/billing pendiente) pero hay enlace de la ficha,
    // servimos un mínimo útil para que la sección no desaparezca.
    console.error("reviews: fallo al consultar Google", err);
    if (MAPS_URI) {
      const fallback: ReviewsPayload = {
        ok: true,
        place: {
          name: "Alquiler de Ecógrafos",
          rating: 0,
          userRatingCount: 0,
          googleMapsUri: MAPS_URI,
          reviews: [],
        },
      };
      cache = { data: fallback, at: Date.now() };
      return NextResponse.json(fallback);
    }
    if (cache) return NextResponse.json(cache.data);
    return NextResponse.json({ ok: false, error: "fetch_failed" } satisfies ReviewsPayload);
  }
}
