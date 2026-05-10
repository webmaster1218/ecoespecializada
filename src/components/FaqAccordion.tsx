"use client";

import { useState } from 'react';

interface Faq {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  faqs: Faq[];
}

function formatMarkdown(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" style="color: #0369a1;">$1</a>');
}

export default function FaqAccordion({ faqs }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div style={{
      margin: '2rem 0',
      borderRadius: '12px',
      overflow: 'hidden',
      border: '1px solid #e2e8f0',
      background: '#fff',
      boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
    }}>
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            style={{
              borderBottom: index < faqs.length - 1 ? '1px solid #e2e8f0' : 'none',
            }}
          >
            <button
              onClick={() => toggle(index)}
              aria-expanded={isOpen}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                padding: '1.1rem 1.25rem',
                background: isOpen ? '#f0f9ff' : 'transparent',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                fontSize: '1rem',
                fontWeight: 600,
                color: isOpen ? '#0369a1' : '#1e293b',
                transition: 'background 0.2s ease, color 0.2s ease',
                lineHeight: 1.5,
              }}
            >
              <span style={{ flex: 1, marginRight: '1rem' }}>{faq.question}</span>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                background: isOpen ? '#0369a1' : '#e2e8f0',
                color: isOpen ? '#fff' : '#64748b',
                fontSize: '1.1rem',
                fontWeight: 700,
                flexShrink: 0,
                transition: 'background 0.2s ease, color 0.2s ease, transform 0.3s ease',
                transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
              }}>
                +
              </span>
            </button>
            <div
              style={{
                maxHeight: isOpen ? '500px' : '0px',
                overflow: 'hidden',
                transition: 'max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.25s ease',
                opacity: isOpen ? 1 : 0,
              }}
            >
              <div
                style={{
                  padding: '0 1.25rem 1.1rem',
                  color: '#475569',
                  lineHeight: 1.7,
                  fontSize: '0.95rem',
                }}
                dangerouslySetInnerHTML={{ __html: formatMarkdown(faq.answer) }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
