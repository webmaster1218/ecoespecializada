import { notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { getPostBySlug, getRelatedPosts, getAllPosts } from '@/lib/blog/posts';
import { formatDate, getReadingTime, generateArticleSchema, generateBreadcrumbSchema } from '@/lib/blog/utils';
import CallButton from '@/components/ui/CallButton';
import styles from './BlogPost.module.css';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

// Helper to get all posts (needed for static generation)
function getAllPosts() {
  // Import dynamically to avoid circular dependency
  const { posts } = require('@/lib/blog/posts');
  return posts;
}

// Generate static params for all posts
export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post: { slug: string }) => ({
    slug: post.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: BlogPostPageProps) {
  const post = getPostBySlug(params.slug);

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

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(post.slug, post.category, 3);
  const articleSchema = generateArticleSchema(post);
  const breadcrumbSchema = generateBreadcrumbSchema();

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

      <main className={styles.blogPost}>
        {/* Breadcrumb */}
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <div className="container">
            <Link href="/" className={styles.breadcrumbLink}>
              Inicio
            </Link>
            <span className={styles.breadcrumbSeparator}>/</span>
            <Link href="/blog" className={styles.breadcrumbLink}>
              Blog
            </Link>
            <span className={styles.breadcrumbSeparator}>/</span>
            <span className={styles.breadcrumbCurrent}>{post.title}</span>
          </div>
        </nav>

        {/* Article Hero */}
        <article className={styles.article}>
          <div className="container">
            <motion.div
              className={styles.articleHeader}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className={styles.articleMeta}>
                <span className={styles.articleCategory}>{post.category}</span>
                <span className={styles.articleDate}>{formatDate(post.date)}</span>
                <span className={styles.articleReadTime}>{getReadingTime(post.content)}</span>
              </div>

              <h1 className={styles.articleTitle}>{post.title}</h1>

              <div className={styles.articleAuthor}>
                <div className={styles.authorInfo}>
                  <div className={styles.authorAvatar}>
                    {post.author.charAt(0)}
                  </div>
                  <div className={styles.authorDetails}>
                    <span className={styles.authorName}>{post.author}</span>
                    <span className={styles.authorRole}>Especialista en Ultrasonido</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Featured Image */}
            <motion.div
              className={styles.featuredImage}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Image
                src={post.image}
                alt={post.title}
                fill
                sizes="100vw"
                className={styles.image}
                priority
              />
            </motion.div>

            {/* Article Content */}
            <motion.div
              className={styles.articleContent}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {/* Markdown-like content rendering */}
              <div className={styles.markdownContent}>
                {post.content.split('\n\n').map((paragraph, index) => {
                  // Check if it's a heading
                  if (paragraph.startsWith('#')) {
                    const level = paragraph.match(/^#+/)?.[0].length || 1;
                    const text = paragraph.replace(/^#+\s/, '');
                    const HeadingTag = `h${Math.min(level, 6)}` as keyof JSX.IntrinsicElements;
                    return <HeadingTag key={index}>{text}</HeadingTag>;
                  }

                  // Check if it's a list item
                  if (paragraph.startsWith('- ')) {
                    const items = paragraph.split('\n- ').map(item => item.replace('- ', '').trim()).filter(Boolean);
                    return (
                      <ul key={index} className={styles.list}>
                        {items.map((item, i) => (
                          <li key={i} dangerouslySetInnerHTML={{ __html: formatMarkdown(item) }} />
                        ))}
                      </ul>
                    );
                  }

                  // Check if it's a blockquote
                  if (paragraph.startsWith('> ')) {
                    const text = paragraph.replace('> ', '');
                    return (
                      <blockquote key={index} className={styles.blockquote}>
                        {text}
                      </blockquote>
                    );
                  }

                  // Check if it's a horizontal rule
                  if (paragraph.startsWith('---')) {
                    return <hr key={index} className={styles.hr} />;
                  }

                  // Regular paragraph
                  return (
                    <p key={index} dangerouslySetInnerHTML={{ __html: formatMarkdown(paragraph) }} />
                  );
                })}
              </div>

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className={styles.tags}>
                  {post.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Share Buttons */}
            <motion.div
              className={styles.shareButtons}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <span className={styles.shareLabel}>Compartir:</span>
              <button className={styles.shareButton} aria-label="Compartir en WhatsApp">
                WhatsApp
              </button>
              <button className={styles.shareButton} aria-label="Compartir en Facebook">
                Facebook
              </button>
              <button className={styles.shareButton} aria-label="Compartir en Twitter">
                Twitter
              </button>
            </motion.div>
          </div>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className={styles.relatedSection}>
            <div className="container">
              <h2 className={styles.relatedTitle}>Artículos Relacionados</h2>
              <div className={styles.relatedGrid}>
                {relatedPosts.map((post) => (
                  <motion.article
                    key={post.slug}
                    className={styles.relatedCard}
                    whileHover={{ y: -4 }}
                  >
                    <Link href={`/blog/${post.slug}`} className={styles.relatedLink}>
                      <div className={styles.relatedImage}>
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 300px"
                        />
                      </div>
                      <div className={styles.relatedContent}>
                        <h3 className={styles.relatedPostTitle}>{post.title}</h3>
                        <p className={styles.relatedExcerpt}>{post.excerpt}</p>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className={styles.ctaSection}>
          <div className="container">
            <motion.div
              className={styles.ctaCard}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className={styles.ctaTitle}>¿Interesado en Alquilar un Ecógrafo?</h2>
              <p className={styles.ctaText}>
                Consulta con nuestros especialistas y encuentra la solución perfecta
                para tu práctica médica.
              </p>
              <CallButton text="Cotizar Ahora" />
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}

// Simple markdown formatter (bold, italic, links)
function formatMarkdown(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>') // Bold
    .replace(/\*(.+?)\*/g, '<em>$1</em>') // Italic
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'); // Links
}
