"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { Magnetic } from "./Magnetic";

// Небольшая приятная деталь: кнопка "наверх" появляется после прокрутки
// и слегка тянется к курсору, как остальные акцентные кнопки на сайте.
export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 left-6 z-[55]"
        >
          <Magnetic strength={12}>
            <button
              aria-label="Наверх"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-gold-400/40 bg-ivory/90 text-gold-500 shadow-gold backdrop-blur transition-colors hover:bg-gold-400/10 dark:bg-graphite/90"
            >
              <ArrowUp size={18} />
            </button>
          </Magnetic>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
