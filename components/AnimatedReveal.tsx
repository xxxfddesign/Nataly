"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

type Effect = "fade" | "slide" | "scale";

const variants: Record<Effect, any> = {
  fade: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
  slide: { hidden: { opacity: 0, y: 32 }, visible: { opacity: 1, y: 0 } },
  scale: { hidden: { opacity: 0, scale: 0.94 }, visible: { opacity: 1, scale: 1 } },
};

export function AnimatedReveal({
  children,
  effect = "slide",
  delay = 0,
  className,
}: {
  children: ReactNode;
  effect?: Effect;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={variants[effect]}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
