import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCategoryBySlug, getAllCategorySlugs } from '@/lib/blog/categories';
import { getPostsByCategory } from '@/lib/blog/posts';
import { generateBreadcrumbSchema } from '@/lib/blog/utils';
import React from 'react';

export async function generateStaticParams() {
  const slugs = getAllCategorySlugs();
  return slugs.map((slug) => ({ categoria: slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ categoria: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const catMeta = getCategoryBySlug(resolvedParams.categoria);

  if (!catMeta) {
    return { title: 'Categoría no encontrada' };
  }

  return {
    title: `${catMeta.name} | Blog - Alquiler de Ecógrafos`,
    description: catMeta.description,
    openGraph: {
      title: `${catMeta.name} | Blog - Alquiler de Ecógrafos`,
      description: catMeta.description,
      type: 'website',
    },
  };
}

export default async function CategoriaLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ categoria: string }>;
}) {
  const resolvedParams = await params;
  const catMeta = getCategoryBySlug(resolvedParams.categoria);

  if (!catMeta) {
    notFound();
  }

  const breadcrumbSchema = generateBreadcrumbSchema(resolvedParams.categoria);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {children}
    </>
  );
}
