"use client";
import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

// Переход между страницами: "мазок кисти" золотом раскрывает новый холст.
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative"
      >
        <motion.div
          className="pointer-events-none fixed inset-0 z-[90] origin-left bg-gradient-to-r from-gold-500 via-gold-300 to-transparent"
          initial={{ scaleX: 1 }}
          animate={{ scaleX: 0 }}
          transition={{ duration: 0.6, ease: [0.83, 0, 0.17, 1] }}
        />
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
