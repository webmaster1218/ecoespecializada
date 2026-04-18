"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { getPostsByCategory, getAllCategories } from '@/lib/blog/posts';
import { formatDate, getReadingTime } from '@/lib/blog/utils';
import { getCategoryBySlug, categories as categoryMap } from '@/lib/blog/categories';
import CallButton from '@/components/ui/CallButton';
import { useParams } from 'next/navigation';
import styles from './Categoria.module.css';
import blogStyles from '../Blog.module.css';

export default function CategoriaPage() {
  const params = useParams();
  const categoria = params.categoria as string;
  const catMeta = getCategoryBySlug(categoria);

  if (!catMeta) {
    return (
      <main className={styles.categoria}>
        <div className="container" style={{ textAlign: 'center', padding: '6rem 1rem' }}>
          <h1>Categoría no encontrada</h1>
          <Link href="/blog">Volver al blog</Link>
        </div>
      </main>
    );
  }

  const posts = getPostsByCategory(categoria);
  const allCats = getAllCategories();

  return (
    <main className={styles.categoria}>
      {/* Breadcrumb */}
      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <div className="container">
          <Link href="/" className={styles.breadcrumbLink}>Inicio</Link>
          <span className={styles.breadcrumbSeparator}>/</span>
          <Link href="/blog" className={styles.breadcrumbLink}>Blog</Link>
          <span className={styles.breadcrumbSeparator}>/</span>
          <span className={styles.breadcrumbCurrent}>{catMeta.name}</span>
        </div>
      </nav>

      {/* Category Hero */}
      <section className={styles.hero}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={styles.heroContent}
          >
            <span className={styles.heroIcon}>{catMeta.icon}</span>
            <h1 className={styles.heroTitle}>{catMeta.name}</h1>
            <p className={styles.heroDescription}>{catMeta.description}</p>
            <span className={styles.heroCount}>{posts.length} artículos</span>
          </motion.div>
        </div>
      </section>

      {/* Category Nav */}
      <section className={blogStyles.categories}>
        <div className="container">
          <div className={blogStyles.categoriesList}>
            <Link href="/blog" className={blogStyles.category}>
              Todos
            </Link>
            {allCats.map((cat) => (
              <Link
                key={cat.slug}
                href={`/blog/${cat.slug}`}
                className={`${blogStyles.category} ${cat.slug === categoria ? blogStyles.categoryActive : ''}`}
              >
                {cat.name} ({cat.count})
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className={blogStyles.postsSection}>
        <div className="container">
          <div className={blogStyles.postsGrid}>
            {posts.map((post, index) => {
              const postCatMeta = categoryMap[post.category];
              return (
                <motion.article
                  key={post.slug}
                  className={blogStyles.postCard}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                >
                  <Link href={`/blog/${post.category}/${post.slug}`} className={blogStyles.postLink}>
                    <div className={blogStyles.postImage}>
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className={blogStyles.image}
                      />
                      <div className={blogStyles.postCategory}>
                        {postCatMeta?.name || post.category}
                        {post.articleId && (
                          <span className={blogStyles.articleId}> {post.articleId}</span>
                        )}
                      </div>
                    </div>

                    <div className={blogStyles.postContent}>
                      <div className={blogStyles.postMeta}>
                        <span className={blogStyles.postDate}>{formatDate(post.date)}</span>
                        <span className={blogStyles.postReadTime}>{getReadingTime(post.content)}</span>
                      </div>

                      <h2 className={blogStyles.postTitle}>{post.title}</h2>
                      <p className={blogStyles.postExcerpt}>{post.excerpt}</p>

                      <div className={blogStyles.postFooter}>
                        <span className={blogStyles.postAuthor}>{post.author}</span>
                        <span className={blogStyles.postReadMore}>Leer más →</span>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              );
            })}
          </div>

          {posts.length === 0 && (
            <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
              <p>No hay artículos en esta categoría aún.</p>
              <Link href="/blog" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>
                Ver todos los artículos
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className={blogStyles.ctaSection}>
        <div className="container">
          <div className={blogStyles.ctaCard}>
            <motion.div
              className={blogStyles.ctaContent}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className={blogStyles.ctaTitle}>
                ¿Necesitas un Ecógrafo para tu Práctica?
              </h2>
              <p className={blogStyles.ctaText}>
                Alquiler de equipos Mindray Z6, Z60 y M7. Calidad garantizada,
                mantenimiento incluido y entrega rápida.
              </p>
              <CallButton text="Cotizar Ahora" />
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
