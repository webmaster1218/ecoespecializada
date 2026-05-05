// Types for blog posts
export interface BlogPost {
  articleId?: string; // Article ID (format: XX-NNN, e.g., GUI-001)
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  image: string;
  category: string;
  readTime: number;
  tags?: string[];
  status?: 'draft' | 'published'; // draft = preview only, published = production
}

export interface BlogCategory {
  name: string;
  slug: string;
  count: number;
}

// Helper to format date to readable format
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-CO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Helper to calculate reading time
export function calculateReadTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

// Helper to slugify text
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
}
