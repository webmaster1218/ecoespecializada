// src/app/api/reviews/route.ts
import { NextResponse } from "next/server";

// Fuerza render dinámico: los route handlers en Next pueden cachearse estáticamente
// en build y quemar el valor de process.env (key indefinida en build). Con esto,
// el endpoint siempre se evalúa en runtime con la key real.
export const dynamic = "force-dynamic";

const API_KEY = process.env.GOOGLE_PLACES_API_KEY;
const PLACE_ID = process.env.GOOGLE_PLACES_PLACE_ID;
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

async function fetchFromGoogle(): Promise<ReviewsPayload["place"]> {
  const url = `https://places.googleapis.com/v1/places/${PLACE_ID}`;
  const res = await fetch(url, {
    headers: {
      "X-Goog-Api-Key": API_KEY!,
      "X-Goog-FieldMask":
        "displayName,rating,userRatingCount,googleMapsUri,reviews(authorName,rating,text,publishTime)",
    },
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`Places API error: ${res.status}`);
  const data = await res.json();

  const reviews: GoogleReview[] = (data.reviews ?? [])
    .filter((r: { text?: { text?: string } }) => r.text?.text)
    .map((r: { authorName?: string; rating?: number; text?: { text?: string }; publishTime?: string }) => ({
      authorName: r.authorName ?? "Cliente Google",
      rating: r.rating ?? 5,
      text: r.text!.text!,
      publishTime: r.publishTime ?? "",
    }));

  return {
    name: data.displayName?.text ?? "Alquiler de Ecógrafos",
    rating: data.rating ?? 0,
    userRatingCount: data.userRatingCount ?? 0,
    googleMapsUri: data.googleMapsUri ?? "",
    reviews,
  };
}

export async function GET() {
  if (!API_KEY || !PLACE_ID) {
    return NextResponse.json({ ok: false, error: "not_configured" } satisfies ReviewsPayload);
  }

  if (cache && Date.now() - cache.at < TTL_MS) {
    return NextResponse.json(cache.data);
  }

  try {
    const place = await fetchFromGoogle();
    const payload: ReviewsPayload = { ok: true, place };
    cache = { data: payload, at: Date.now() };
    return NextResponse.json(payload);
  } catch (err) {
    // Si la API falla pero hay caché previo, servimos el caché.
    console.error("reviews: fallo al consultar Google Places API", err);
    if (cache) return NextResponse.json(cache.data);
    return NextResponse.json({ ok: false, error: "fetch_failed" } satisfies ReviewsPayload);
  }
}
