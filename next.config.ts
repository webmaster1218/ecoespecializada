import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  trailingSlash: true,
  turbopack: {
    root: process.cwd(),
  },
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
    return [
      {
        source: '/(.*)',
        headers: [
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
    ];
  },
};

export default nextConfig;
