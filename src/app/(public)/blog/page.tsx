"use client";

import { m } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { getRecentPosts, getAllCategories } from '@/lib/blog/posts';
import { formatDate, getReadingTime } from '@/lib/blog/utils';
import { categories as categoryMap } from '@/lib/blog/categories';
import CallButton from '@/components/ui/CallButton';
import styles from './Blog.module.css';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function BlogContent() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category');
  const tag = searchParams.get('tag');

  let posts = getRecentPosts(50); // Get all posts sorted by date

  // Filter by category if specified
  if (category) {
    posts = posts.filter(post => post.category === category);
  }

  // Filter by tag if specified
  if (tag) {
    posts = posts.filter(post => post.tags?.includes(tag));
  }

  const cats = getAllCategories();

  return (
    <main className={styles.blog}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className="container">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={styles.heroContent}
          >
            <m.div
              className={styles.badge}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              📚 Blog Médico
            </m.div>

            <m.h1
              className={styles.headline}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Conocimiento para{" "}
              <span className="text-gradient">Profesionales Médicos</span>
            </m.h1>

            <m.p
              className={styles.subheadline}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Guías, casos de éxito y tendencias en ultrasonido médico.
              Información práctica para mejorar tu práctica.
            </m.p>

            <m.div
              className={styles.actions}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <CallButton text="Consultar con Especialista" />
            </m.div>
          </m.div>
        </div>
      </section>

      {/* Categories */}
      <section className={styles.categories}>
        <div className="container">
          <div className={styles.categoriesList}>
            <Link href="/blog" className={`${styles.category} ${!category && !tag ? styles.categoryActive : ''}`}>
              Todos
            </Link>
            {cats.map((cat) => (
              <Link
                key={cat.slug}
                href={`/blog/${cat.slug}`}
                className={`${styles.category} ${category === cat.slug ? styles.categoryActive : ''}`}
              >
                {cat.name} ({cat.count})
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className={styles.postsSection}>
        <div className="container">
          {/* Filter indicator */}
          {tag && (
            <div className={styles.filterIndicator}>
              <span>Filtrando por: </span>
              <strong>#{tag}</strong>
              <Link href="/blog" className={styles.clearFilter}>
                ✕ Limpiar filtro
              </Link>
            </div>
          )}

          <div className={styles.postsGrid}>
            {posts.map((post, index) => {
              const catMeta = categoryMap[post.category];
              return (
                <m.article
                  key={post.slug}
                  className={styles.postCard}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                >
                  <Link href={`/blog/${post.category}/${post.slug}`} className={styles.postLink}>
                    <div className={styles.postImage}>
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className={styles.image}
                      />
                      <div className={styles.postCategory}>
                        {catMeta?.name || post.category}
                      </div>
                    </div>

                    <div className={styles.postContent}>
                      <div className={styles.postMeta}>
                        <span className={styles.postDate}>{formatDate(post.date)}</span>
                        <span className={styles.postReadTime}>{getReadingTime(post.content)}</span>
                      </div>

                      <h2 className={styles.postTitle}>{post.title}</h2>

                      <p className={styles.postExcerpt}>{post.excerpt}</p>

                      <div className={styles.postFooter}>
                        <span className={styles.postAuthor}>{post.author}</span>
                        <span className={styles.postReadMore}>Leer más →</span>
                      </div>
                    </div>
                  </Link>
                </m.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaCard}>
            <m.div
              className={styles.ctaContent}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className={styles.ctaTitle}>
                ¿Necesitas un Ecógrafo para tu Práctica?
              </h2>
              <p className={styles.ctaText}>
                Alquiler de equipos Mindray Z6, Z60 y M7. Calidad garantizada,
                mantenimiento incluido y entrega rápida.
              </p>
              <CallButton text="Cotizar Ahora" />
            </m.div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function BlogPage() {
  return (
    <Suspense fallback={<div className={styles.blog}>Cargando...</div>}>
      <BlogContent />
    </Suspense>
  );
}
