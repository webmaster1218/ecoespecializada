"use client";

import { m } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { getPostBySlug, getRelatedPosts } from '@/lib/blog/posts';
import { formatDate, getReadingTime } from '@/lib/blog/utils';
import { categories as categoryMap } from '@/lib/blog/categories';
import { notFound } from 'next/navigation';
import { useParams } from 'next/navigation';
import CallButton from '@/components/ui/CallButton';
import styles from './BlogPost.module.css';

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const categoria = params.categoria as string;

  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const catMeta = categoryMap[post.category];
  const relatedPosts = getRelatedPosts(post.slug, post.category, 3);

  return (
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
            <Link href={`/blog/${post.category}`} className={styles.breadcrumbLink}>
              {catMeta?.name || post.category}
            </Link>
            <span className={styles.breadcrumbSeparator}>/</span>
            <span className={styles.breadcrumbCurrent}>{post.title}</span>
          </div>
        </nav>

        {/* Article Hero */}
        <article className={styles.article}>
          <div className="container">
            <m.div
              className={styles.articleHeader}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className={styles.articleMeta}>
                <span className={styles.articleCategory}>{catMeta?.name || post.category}</span>
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
            </m.div>

            {/* Featured Image */}
            <m.div
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
            </m.div>

            {/* Article Content */}
            <m.div
              className={styles.articleContent}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {/* Markdown-like content rendering */}
              <div className={styles.markdownContent}>
                {post.content.split('\n\n').map((paragraph, index) => {
                  // Check if it's a table FIRST (before other elements)
                  const parsedTable = parseMarkdownTable(paragraph);
                  if (parsedTable.isTable) {
                    return <div key={index}>{parsedTable.content}</div>;
                  }

                  // Check if it's a heading
                  if (paragraph.startsWith('#')) {
                    const level = paragraph.match(/^#+/)?.[0].length || 1;
                    const text = paragraph.replace(/^#+\s/, '');
                    if (level === 1) return <h1 key={index}>{text}</h1>;
                    if (level === 2) return <h2 key={index}>{text}</h2>;
                    if (level === 3) return <h3 key={index}>{text}</h3>;
                    if (level === 4) return <h4 key={index}>{text}</h4>;
                    if (level === 5) return <h5 key={index}>{text}</h5>;
                    return <h6 key={index}>{text}</h6>;
                  }

                  // Check if it's a list item
                  const listItems = [];
                  const lines = paragraph.split('\n');
                  let isList = false;

                  for (const line of lines) {
                    const trimmed = line.trim();
                    if (trimmed.startsWith('- ')) {
                      isList = true;
                      listItems.push(trimmed.substring(2));
                    } else if (trimmed.match(/^[✓✔✅]\s+/)) {
                      isList = true;
                      listItems.push(trimmed.replace(/^[✓✔✅]\s+/, ''));
                    }
                    else if (trimmed.match(/^[✓✔✅]/)) {
                      if (trimmed.length > 1 && !trimmed.startsWith('✅') && !trimmed.startsWith('✓') && !trimmed.startsWith('✔')) {
                        isList = true;
                        listItems.push(trimmed);
                      }
                    }
                  }

                  if (isList && listItems.length > 0) {
                    const hasCheckMarks = listItems.some(item => item.trim().startsWith('✓') || item.trim().startsWith('✔') || item.trim().startsWith('✅'));

                    return (
                      <ul key={index} className={hasCheckMarks ? styles.checkList : styles.list}>
                        {listItems.map((item, i) => (
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
                    <Link key={tag} href={`/blog?tag=${encodeURIComponent(tag)}`} className={styles.tag}>
                      #{tag}
                    </Link>
                  ))}
                </div>
              )}
            </m.div>

            {/* Share Buttons */}
            <m.div
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
            </m.div>
          </div>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className={styles.relatedSection}>
            <div className="container">
              <h2 className={styles.relatedTitle}>Artículos Relacionados</h2>
              <div className={styles.relatedGrid}>
                {relatedPosts.map((post) => (
                  <m.article
                    key={post.slug}
                    className={styles.relatedCard}
                    whileHover={{ y: -4 }}
                  >
                    <Link href={`/blog/${post.category}/${post.slug}`} className={styles.relatedLink}>
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
                  </m.article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className={styles.ctaSection}>
          <div className="container">
            <m.div
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
            </m.div>
          </div>
        </section>
      </main>
  );
}

// Simple markdown formatter (bold, italic, links, images)
function formatMarkdown(text: string): string {
  return text
    // Check marks
    .replace(/([✓✔✅])\s*/g, '<span class="checkMark">$1</span> ')
    // Bold
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // Images
    .replace(/!\[([^\]]+)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" style="max-width: 100%; height: auto; display: block; margin: 2rem 0; border-radius: 8px;" />')
    // Regular links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
    // PDF link support
    .replace(/\[([^\]]+)\]\(([^)]+\.pdf)\)/g, '<a href="$2" class="pdf-link" download="$1">$1</a>');
}

// Parse markdown tables
function parseMarkdownTable(text: string): { isTable: boolean; content: any } {
  if (!text.includes('|') || !text.trim().startsWith('|')) {
    return { isTable: false, content: text };
  }

  const rows = text.trim().split('\n').filter(row => row.trim());

  if (rows.length < 3) {
    return { isTable: false, content: text };
  }

  const headerRow = rows[0];
  const headers = headerRow.split('|').map(h => h.trim()).filter(h => h);

  const separatorRow = rows[1];
  if (!separatorRow.includes('---')) {
    return { isTable: false, content: text };
  }

  const dataRows = rows.slice(2).map(row => {
    return row.split('|').map(cell => cell.trim()).filter(cell => cell !== '');
  });

  return {
    isTable: true,
    content: (
      <table className={styles.table}>
        <thead>
          <tr>
            {headers.map((header, i) => (
              <th key={i}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dataRows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j} dangerouslySetInnerHTML={{ __html: formatMarkdown(cell) }} />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    )
  };
}
