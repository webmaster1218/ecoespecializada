/**
 * Blog Posts — Powered by .md files (pre-build generated data)
 * 
 * Each article lives in /content/{category}/{slug}.md
 * The script scripts/generate-posts-data.js reads them and generates
 * posts-data.ts, which is imported here.
 * 
 * To add a new article: create a .md file in content/{category}/ then
 * run: node scripts/generate-posts-data.js
 * 
 * This module exports the same API as the original posts.ts for full backward compatibility.
 */

import { postsData } from './posts-data';
import { categories } from './categories';
import { BlogPost } from './types';

const posts = postsData;

// Re-export the same API

export function getPublishedPosts(): BlogPost[] {
  return posts
    .filter(post => post.status !== 'draft')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getDraftPosts(): BlogPost[] {
  return posts
    .filter(post => post.status === 'draft')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getAllPostsIncludingDrafts(): BlogPost[] {
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostsByCategory(category: string): BlogPost[] {
  return posts.filter(post => post.category === category && post.status !== 'draft');
}

export function getRecentPosts(count: number = 3): BlogPost[] {
  return getPublishedPosts().slice(0, count);
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find(post => post.slug === slug);
}

export function getRelatedPosts(currentSlug: string, category: string, count: number = 3): BlogPost[] {
  return getPublishedPosts()
    .filter(post => post.slug !== currentSlug && post.category === category)
    .slice(0, count);
}

export function getAllCategories(): Array<{ name: string; slug: string; count: number }> {
  const catCounts = getPublishedPosts().reduce((acc, post) => {
    acc[post.category] = (acc[post.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(catCounts).map(([slug, count]) => ({
    name: categories[slug]?.name || slug,
    slug,
    count,
  }));
}
