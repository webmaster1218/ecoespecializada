import { MetadataRoute } from 'next';
import { getPublishedPosts } from '@/lib/blog/posts';
import { categories } from '@/lib/blog/categories';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://alquilerdeecografos.com';
  const now = new Date();

  // Páginas estáticas principales
  const staticPages = [
    { path: '', changeFrequency: 'weekly' as const, priority: 1.0 },
    { path: '/colombia', changeFrequency: 'weekly' as const, priority: 0.9 },
    { path: '/colombia/bogota', changeFrequency: 'weekly' as const, priority: 0.8 },
    { path: '/colombia/medellin', changeFrequency: 'weekly' as const, priority: 0.8 },
    { path: '/colombia/cali', changeFrequency: 'weekly' as const, priority: 0.8 },
    { path: '/colombia/barranquilla', changeFrequency: 'weekly' as const, priority: 0.8 },
    { path: '/colombia/cartagena', changeFrequency: 'weekly' as const, priority: 0.8 },
    { path: '/colombia/bucaramanga', changeFrequency: 'weekly' as const, priority: 0.8 },
    { path: '/colombia/pereira', changeFrequency: 'weekly' as const, priority: 0.8 },
    { path: '/colombia/cucuta', changeFrequency: 'weekly' as const, priority: 0.8 },
    { path: '/ecografo-z6', changeFrequency: 'weekly' as const, priority: 0.9 },
    { path: '/ecografo-z60', changeFrequency: 'weekly' as const, priority: 0.9 },
    { path: '/ecografo-mx3', changeFrequency: 'weekly' as const, priority: 0.9 },
    { path: '/ecografo-m7', changeFrequency: 'weekly' as const, priority: 0.9 },
    { path: '/blog', changeFrequency: 'weekly' as const, priority: 0.8 },
    { path: '/politicas', changeFrequency: 'yearly' as const, priority: 0.3 },
  ];

  const entries: MetadataRoute.Sitemap = staticPages.map((page) => ({
    url: page.path ? `${baseUrl}${page.path}/` : `${baseUrl}/`,
    lastModified: now,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));

  // Categorías de blog
  Object.keys(categories).forEach((catKey) => {
    entries.push({
      url: `${baseUrl}/blog/${catKey}/`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    });
  });

  // Artículos publicados del blog
  const posts = getPublishedPosts();
  posts.forEach((post) => {
    const postDate = post.date ? new Date(post.date) : now;
    entries.push({
      url: `${baseUrl}/blog/${post.category}/${post.slug}/`,
      lastModified: postDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    });
  });

  return entries;
}
