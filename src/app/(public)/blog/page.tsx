"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { getRecentPosts, getAllCategories } from '@/lib/blog/posts';
import { formatDate, getReadingTime } from '@/lib/blog/utils';
import CallButton from '@/components/ui/CallButton';
import styles from './Blog.module.css';

export default function BlogPage() {
  const posts = getRecentPosts(50); // Get all posts sorted by date
  const categories = getAllCategories();

  return (
    <main className={styles.blog}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={styles.heroContent}
          >
            <motion.div
              className={styles.badge}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              📚 Blog Médico
            </motion.div>

            <motion.h1
              className={styles.headline}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Conocimiento para{" "}
              <span className="text-gradient">Profesionales Médicos</span>
            </motion.h1>

            <motion.p
              className={styles.subheadline}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Guías, casos de éxito y tendencias en ultrasonido médico.
              Información práctica para mejorar tu práctica.
            </motion.p>

            <motion.div
              className={styles.actions}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <CallButton text="Consultar con Especialista" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className={styles.categories}>
        <div className="container">
          <div className={styles.categoriesList}>
            <Link href="/blog" className={`${styles.category} ${styles.categoryActive}`}>
              Todos
            </Link>
            {categories.map((cat, index) => (
              <Link
                key={cat.name}
                href={`/blog?category=${encodeURIComponent(cat.name)}`}
                className={styles.category}
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
          <div className={styles.postsGrid}>
            {posts.map((post, index) => (
              <motion.article
                key={post.slug}
                className={styles.postCard}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <Link href={`/blog/${post.slug}`} className={styles.postLink}>
                  <div className={styles.postImage}>
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className={styles.image}
                    />
                    <div className={styles.postCategory}>{post.category}</div>
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
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaCard}>
            <motion.div
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
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
