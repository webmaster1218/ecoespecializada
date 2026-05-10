import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPostBySlug, getAllPostsIncludingDrafts } from '@/lib/blog/posts';
import { generateArticleSchema, generateBreadcrumbSchema } from '@/lib/blog/utils';
import React from 'react';

// Generate static params for all posts with their categories
export async function generateStaticParams() {
  const posts = getAllPostsIncludingDrafts();
  return posts.map((post) => ({
    categoria: post.category,
    slug: post.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ categoria: string; slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.slug);

  if (!post) {
    return {
      title: 'Artículo no encontrado',
    };
  }

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

export default async function BlogPostLayout({ children, params }: { children: React.ReactNode; params: Promise<{ categoria: string; slug: string }> }) {
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  const articleSchema = generateArticleSchema(post);
  const breadcrumbSchema = generateBreadcrumbSchema(post.category, post.title);

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {children}
    </>
  );
}
