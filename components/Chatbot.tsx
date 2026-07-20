"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquareText, X, Send, Sparkles } from "lucide-react";

interface Msg {
  role: "user" | "assistant";
  content: string;
}

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content:
        "Здравствуйте! Я помощник галереи. Спросите меня о картинах, скульптурах, материалах, размерах, наличии или доставке.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  async function send() {
    if (!input.trim() || loading) return;
    const next = [...messages, { role: "user" as const, content: input }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = await res.json();
      setMessages([...next, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages([
        ...next,
        { role: "assistant", content: "Извините, произошла ошибка. Попробуйте позже." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <motion.button
        aria-label="Открыть чат-помощник"
        onClick={() => setOpen(true)}
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: open ? 0 : 1, scale: open ? 0.6 : 1 }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-6 right-6 z-[55] flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-gold-300 to-gold-600 text-graphite shadow-gold"
      >
        <MessageSquareText size={24} />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-6 right-6 z-[55] flex h-[min(32rem,75vh)] w-[22rem] max-w-[90vw] flex-col overflow-hidden rounded-2xl border border-gold-400/30 bg-ivory shadow-2xl dark:bg-graphite-deep"
          >
            <div className="flex items-center justify-between border-b border-gold-400/15 bg-gradient-to-r from-gold-400/10 to-transparent px-5 py-4">
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-gold-500" />
                <span className="font-display text-lg">Помощник галереи</span>
              </div>
              <button aria-label="Закрыть чат" onClick={() => setOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "ml-auto bg-gold-400 text-graphite"
                      : "bg-black/[0.04] text-ink dark:bg-white/[0.06] dark:text-parchment"
                  }`}
                >
                  {m.content}
                </div>
              ))}
              {loading && (
                <div className="w-fit rounded-2xl bg-black/[0.04] px-4 py-2.5 text-sm dark:bg-white/[0.06]">
                  <span className="animate-pulse">печатает…</span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 border-t border-gold-400/15 p-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Напишите ваш вопрос…"
                className="flex-1 rounded-full border border-gold-400/20 bg-transparent px-4 py-2.5 text-sm outline-none focus:border-gold-400"
              />
              <button
                aria-label="Отправить"
                onClick={send}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-400 text-graphite transition-transform hover:scale-105"
              >
                <Send size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
