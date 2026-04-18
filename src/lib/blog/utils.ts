// Utility functions for blog
import { formatDate, calculateReadTime, slugify } from './types';
import type { BlogPost } from './types';
import { categories } from './categories';

export { formatDate, calculateReadTime, slugify };

// Extract plain text from markdown content (simple version)
export function extractExcerpt(content: string, maxLength: number = 150): string {
  // Remove markdown syntax
  const plainText = content
    .replace(/^#{1,6}\s+/gm, '') // Remove headers
    .replace(/\*\*/g, '') // Remove bold
    .replace(/\*/g, '') // Remove italic
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove links but keep text
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '') // Remove images
    .replace(/\n/g, ' ') // Replace newlines with spaces
    .replace(/\s+/g, ' ') // Remove multiple spaces
    .trim();

  return plainText.length > maxLength
    ? plainText.substring(0, maxLength) + '...'
    : plainText;
}

// Generate meta tags for SEO
export function generateMetaTags(post: BlogPost) {
  return {
    title: `${post.title} | Alquiler de Ecógrafos`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

// Schema.org Article markup
export function generateArticleSchema(post: BlogPost) {
  const catMeta = categories[post.category];
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: post.image,
    articleSection: catMeta?.name || post.category,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    datePublished: post.date,
    dateModified: post.date,
    publisher: {
      '@type': 'Organization',
      name: 'Alquiler de Ecógrafos',
      logo: {
        '@type': 'ImageObject',
        url: '/images/logo/logo_alquilerdeecografos.webp',
      },
    },
  };
}

// BreadcrumbList schema for blog (supports optional category level)
export function generateBreadcrumbSchema(categorySlug?: string, postTitle?: string) {
  const items: Array<{ '@type': string; position: number; name: string; item?: string }> = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Inicio',
      item: '/',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Blog',
      item: '/blog',
    },
  ];

  if (categorySlug) {
    const catMeta = categories[categorySlug];
    items.push({
      '@type': 'ListItem',
      position: 3,
      name: catMeta?.name || categorySlug,
      item: `/blog/${categorySlug}`,
    });

    if (postTitle) {
      items.push({
        '@type': 'ListItem',
        position: 4,
        name: postTitle,
      });
    }
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items,
  };
}

// Get reading time in minutes
export function getReadingTime(content: string): string {
  const minutes = calculateReadTime(content);
  return minutes === 1 ? '1 min de lectura' : `${minutes} min de lectura`;
}

// Truncate text
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

// Validate post data
export function validatePost(post: BlogPost): boolean {
  return !!(
    post.slug &&
    post.title &&
    post.excerpt &&
    post.content &&
    post.author &&
    post.date &&
    post.image &&
    post.category
  );
}

// Sort posts by date (newest first)
export function sortPostsByDate(posts: BlogPost[]): BlogPost[] {
  return [...posts].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateB - dateA;
  });
}

// Filter posts by tag
export function filterPostsByTag(posts: BlogPost[], tag: string): BlogPost[] {
  return posts.filter(post => post.tags?.includes(tag));
}

// Get all unique tags from posts
export function getAllTags(posts: BlogPost[]): string[] {
  const tags = new Set<string>();
  posts.forEach(post => {
    post.tags?.forEach(tag => tags.add(tag));
  });
  return Array.from(tags).sort();
}

// Search posts by query
export function searchPosts(posts: BlogPost[], query: string): BlogPost[] {
  const lowerQuery = query.toLowerCase();
  return posts.filter(post =>
    post.title.toLowerCase().includes(lowerQuery) ||
    post.excerpt.toLowerCase().includes(lowerQuery) ||
    post.content.toLowerCase().includes(lowerQuery) ||
    post.tags?.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
}

// Generate URL-safe slug from title
export function generateSlug(title: string): string {
  return slugify(title);
}
