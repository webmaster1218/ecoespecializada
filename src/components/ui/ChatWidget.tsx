"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./ChatWidget.module.css";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const WEBHOOK_URL = "https://n8n.srv1054162.hstgr.cloud/webhook/ecografos-chat-v2";
const SESSION_KEY = "ecografos_chat_session";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Generate or retrieve session ID
  const getSessionId = (): string => {
    if (typeof window === "undefined") return "session-1";
    let sessionId = sessionStorage.getItem(SESSION_KEY);
    if (!sessionId) {
      sessionId = `ses-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      sessionStorage.setItem(SESSION_KEY, sessionId);
    }
    return sessionId;
  };

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const userMessage: Message = { role: "user", content: trimmed };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: getSessionId(),
          chatInput: trimmed,
        }),
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const data = await response.json();

      // n8n returns array: [{ output: "..." }] or { output: "..." }
      let text = "";
      if (Array.isArray(data)) {
        text = data[0]?.output || data[0]?.message || JSON.stringify(data[0]);
      } else if (typeof data === "object") {
        text = data.output || data.message || data.text || JSON.stringify(data);
      } else {
        text = String(data);
      }

      const assistantMessage: Message = { role: "assistant", content: text };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      const errorMsg: Message = {
        role: "assistant",
        content:
          "Disculpa, hubo un problema de conexión. Por favor intenta de nuevo o contáctanos por WhatsApp al 300 3608621. ¡Estamos para ayudarte!",
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const toggleChat = () => {
    setIsOpen((prev) => !prev);
    // Add welcome message on first open
    if (!isOpen && messages.length === 0) {
      setMessages([
        {
          role: "assistant",
          content:
            "¡Hola! 👋 Soy el asistente virtual de Alquiler de Ecógrafos. ¿En qué puedo ayudarte hoy? Puedo asesorarte sobre equipos, precios, disponibilidad y más.",
        },
      ]);
    }
  };

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <div className={styles.chatWindow}>
          {/* Header */}
          <div className={styles.chatHeader}>
            <div className={styles.headerLeft}>
              <div className={styles.avatar}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <div>
                <div className={styles.headerTitle}>Alquiler de Ecógrafos</div>
                <div className={styles.headerStatus}>● En línea</div>
              </div>
            </div>
            <button
              onClick={toggleChat}
              className={styles.closeButton}
              aria-label="Cerrar chat"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className={styles.messagesContainer}>
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`${styles.message} ${
                  msg.role === "user" ? styles.userMessage : styles.botMessage
                }`}
              >
                {msg.content}
              </div>
            ))}
            {isLoading && (
              <div className={`${styles.message} ${styles.botMessage} ${styles.typing}`}>
                <span className={styles.dot}></span>
                <span className={styles.dot}></span>
                <span className={styles.dot}></span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className={styles.inputContainer}>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Escribe tu pregunta..."
              className={styles.chatInput}
              disabled={isLoading}
            />
            <button
              onClick={sendMessage}
              disabled={isLoading || !input.trim()}
              className={styles.sendButton}
              aria-label="Enviar mensaje"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={toggleChat}
        className={`${styles.chatButton} ${isOpen ? styles.chatButtonActive : ""}`}
        aria-label={isOpen ? "Cerrar chat" : "Abrir chat de asistencia"}
      >
        {isOpen ? (
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </button>
    </>
  );
}
