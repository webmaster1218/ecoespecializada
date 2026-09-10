import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  trailingSlash: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/blog/guias/alquiler-equipos-medicos-bogota',
        destination: '/blog/ciudades/alquiler-equipos-medicos-bogota',
        permanent: true,
      },
      {
        source: '/blog/guias/alquiler-equipos-medicos-bogota/',
        destination: '/blog/ciudades/alquiler-equipos-medicos-bogota/',
        permanent: true,
      },
      {
        source: '/blog/guias/alquiler-ecografos-bogota',
        destination: '/blog/ciudades/alquiler-ecografos-bogota',
        permanent: true,
      },
      {
        source: '/blog/guias/alquiler-ecografos-bogota/',
        destination: '/blog/ciudades/alquiler-ecografos-bogota/',
        permanent: true,
      },
      {
        source: '/blog/beneficios-alquiler-ecografos',
        destination: '/blog/guias/beneficios-alquiler-ecografos',
        permanent: true,
      },
      {
        source: '/blog/mindray-z6-vs-z60-comparacion',
        destination: '/blog/guias/mindray-z6-vs-z60-comparacion',
        permanent: true,
      },
      {
        source: '/blog/caso-exito-clinica-valle',
        destination: '/blog/casos-exito/caso-exito-clinica-valle',
        permanent: true,
      },
      {
        source: '/blog/guia-transductores-ultrasonido',
        destination: '/blog/guias/guia-transductores-ultrasonido',
        permanent: true,
      },
      {
        source: '/blog/guias/cuanto-cuesta-un-ecografo-en-colombia-precios-2026',
        destination: '/blog/guias/cuanto-cuesta-un-ecografo-en-colombia',
        permanent: true,
      },
      {
        source: '/blog/cuanto-cuesta-un-ecografo-en-colombia-precios-2026',
        destination: '/blog/guias/cuanto-cuesta-un-ecografo-en-colombia',
        permanent: true,
      },
    ];
  },
  async headers() {
    const securityHeaders = [
      { key: "X-DNS-Prefetch-Control", value: "on" },
      { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
      { key: "X-XSS-Protection", value: "1; mode=block" },
      { key: "X-Frame-Options", value: "DENY" },
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
    ];

    return [
      {
        source: '/(.*)',
        headers: [
          ...securityHeaders,
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400',
          },
        ],
      },
      {
        source: '/_next/image(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/(llms.*\\.txt|.*ai\\.txt)',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow',
          },
          {
            key: 'Content-Type',
            value: 'text/plain; charset=utf-8',
          },
        ],
      },
      {
        source: '/api/md/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
