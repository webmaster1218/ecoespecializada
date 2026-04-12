"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { getPostBySlug, getRelatedPosts } from '@/lib/blog/posts';
import { formatDate, getReadingTime } from '@/lib/blog/utils';
import { notFound } from 'next/navigation';
import { useParams } from 'next/navigation';
import CallButton from '@/components/ui/CallButton';
import styles from './BlogPost.module.css';

// Function to get posts filtered by tag
function getPostsByTag(tag: string) {
  return (window as any).posts?.filter((post: any) => 
    post.tags?.includes(tag)
  ) || [];
}

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;

  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

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

                  // Check if it's a list item - FIXED: Also detect lines starting with checkmarks and hyphens
                  const listItems = [];
                  const lines = paragraph.split('\n');
                  let isList = false;
                  
                  for (const line of lines) {
                    const trimmed = line.trim();
                    // Detect standard bullet (-) OR checkmarks (✓, ✔, ✅)
                    if (trimmed.startsWith('- ')) {
                      isList = true;
                      listItems.push(trimmed.substring(2));
                    } else if (trimmed.match(/^[✓✔✅]\s+/)) {
                      isList = true;
                      listItems.push(trimmed.replace(/^[✓✔✅]\s+/, ''));
                    }
                    // Also handle mixed formats (checkmark followed by text)
                    else if (trimmed.match(/^[✓✔✅]/)) {
                      // This is a mixed checkmark line, check if it has leading spaces or text
                      if (trimmed.length > 1 && !trimmed.startsWith('✅') && !trimmed.startsWith('✓') && !trimmed.startsWith('✔')) {
                        isList = true;
                        listItems.push(trimmed);
                      }
                    }
                  }
                  
                  if (isList && listItems.length > 0) {
                    // Check if any item has check marks at the start
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
  );
}

// Simple markdown formatter (bold, italic, links)
function formatMarkdown(text: string): string {
  return text
    // Check marks - Convert to styled elements
    .replace(/([✓✔✅])\s*/g, '<span class="checkMark">$1</span> ')
    // Bold
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
}

// Parse markdown headings
function parseMarkdownHeading(text: string): { isHeading: boolean; level: number; content: string } {
  const match = text.match(/^(#{1,6})\s+(.+)$/);
  if (match) {
    const level = match[1].length;
    const content = match[2];
    return { isHeading: true, level, content };
  }
  return { isHeading: false, level: 0, content: text };
}

// Parse markdown lists (ordered and unordered)
function parseMarkdownList(text: string): { isList: boolean; type: 'ordered' | 'unordered' | 'mixed' | null; items: string[] } {
  const lines = text.trim().split('\n');
  let hasListItems = false;
  let listType: 'ordered' | 'unordered' | 'mixed' | null = null;
  
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.match(/^-\s/) || trimmed.match(/^\*\s/)) {
      hasListItems = true;
      if (!listType) listType = 'unordered';
      else if (listType !== 'unordered') listType = 'mixed';
    } else if (trimmed.match(/^\d+\.\s/)) {
      hasListItems = true;
      if (!listType) listType = 'ordered';
      else if (listType !== 'ordered') listType = 'mixed';
    }
  }
  
  if (!hasListItems) {
    return { isList: false, type: null, items: [] };
  }
  
  const items: string[] = [];
  for (const line of lines) {
    const trimmed = line.trim();
    const orderedMatch = trimmed.match(/^\d+\.\s+(.+)$/);
    const unorderedMatch = trimmed.match(/^[-*]\s+(.+)$/);
    
    if (orderedMatch) {
      items.push(orderedMatch[1]);
    } else if (unorderedMatch) {
      items.push(unorderedMatch[1]);
    }
  }
  
  return { isList: true, type: listType, items };
}

// Parse blockquotes
function parseBlockquote(text: string): { isBlockquote: boolean; content: string } {
  if (text.trim().startsWith('>')) {
    const content = text.replace(/^>\s?/gm, '').trim();
    return { isBlockquote: true, content };
  }
  return { isBlockquote: false, content: text };
}

// Parse markdown tables
function parseMarkdownTable(text: string): { isTable: boolean; content: any } {
  // Check if it's a table (contains | separators)
  if (!text.includes('|') || !text.trim().startsWith('|')) {
    return { isTable: false, content: text };
  }

  // Split into rows
  const rows = text.trim().split('\n').filter(row => row.trim());
  
  // Check if it's a valid table (at least 3 rows: header, separator, data)
  if (rows.length < 3) {
    return { isTable: false, content: text };
  }

  // Parse header row
  const headerRow = rows[0];
  const headers = headerRow.split('|').map(h => h.trim()).filter(h => h);

  // Parse separator row (should be |---|---|---)
  const separatorRow = rows[1];
  if (!separatorRow.includes('---')) {
    return { isTable: false, content: text };
  }

  // Parse data rows
  const dataRows = rows.slice(2).map(row => {
    return row.split('|').map(cell => cell.trim()).filter(cell => cell !== '');
  });

  // Return table component
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
