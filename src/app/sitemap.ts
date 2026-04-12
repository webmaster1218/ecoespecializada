import type { MetadataRoute } from 'next';
import { posts } from '@/lib/blog/posts';

const BASE_URL = 'https://alquilerdeecografos.com';

export default function sitemap(): MetadataRoute.Sitemap {
  // Paginas estaticas del sitio
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      lastModified: '2026-04-11',
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/colombia/`,
      lastModified: '2026-04-11',
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    // Ciudades de Colombia
    {
      url: `${BASE_URL}/colombia/bogota/`,
      lastModified: '2026-04-02',
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/colombia/cali/`,
      lastModified: '2026-04-02',
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/colombia/barranquilla/`,
      lastModified: '2026-04-02',
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/colombia/cartagena/`,
      lastModified: '2026-04-02',
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/colombia/bucaramanga/`,
      lastModified: '2026-04-02',
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/colombia/pereira/`,
      lastModified: '2026-04-02',
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/colombia/cucuta/`,
      lastModified: '2026-04-02',
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    // Paginas de equipos
    {
      url: `${BASE_URL}/ecografo-z6/`,
      lastModified: '2026-04-02',
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/ecografo-z60/`,
      lastModified: '2026-04-02',
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/ecografo-m7/`,
      lastModified: '2026-04-02',
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    // Blog index
    {
      url: `${BASE_URL}/blog/`,
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    // Paginas legales
    {
      url: `${BASE_URL}/gracias`,
      lastModified: '2026-01-30',
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/politicas`,
      lastModified: '2026-01-30',
      changeFrequency: 'yearly',
      priority: 0.1,
    },
  ];

  // Blog posts — se generan automaticamente desde posts.ts
  const blogPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}/`,
    lastModified: post.date,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...blogPages];
}
