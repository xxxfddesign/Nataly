"use client";
import { useEffect, useRef } from "react";

// Едва заметный золотой шлейф за курсором — работает только на устройствах
// с точным указателем (мышь), не мешает мобильным экранам и уважает
// prefers-reduced-motion.
export function CursorTrail() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!isFinePointer || prefersReduced) return;

    const container = containerRef.current;
    if (!container) return;

    let lastSpawn = 0;

    const onMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - lastSpawn < 45) return;
      lastSpawn = now;

      const dot = document.createElement("span");
      const size = Math.random() * 4 + 3;
      dot.style.position = "fixed";
      dot.style.left = `${e.clientX}px`;
      dot.style.top = `${e.clientY}px`;
      dot.style.width = `${size}px`;
      dot.style.height = `${size}px`;
      dot.style.borderRadius = "9999px";
      dot.style.pointerEvents = "none";
      dot.style.background =
        "radial-gradient(circle, rgba(232,201,122,0.9) 0%, rgba(201,162,76,0.5) 60%, rgba(201,162,76,0) 100%)";
      dot.style.transform = "translate(-50%, -50%) scale(1)";
      dot.style.transition = "transform 900ms ease-out, opacity 900ms ease-out";
      dot.style.opacity = "1";
      dot.style.zIndex = "45";
      container.appendChild(dot);

      requestAnimationFrame(() => {
        dot.style.transform = "translate(-50%, -50%) scale(0.2) translateY(18px)";
        dot.style.opacity = "0";
      });

      setTimeout(() => dot.remove(), 950);
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return <div ref={containerRef} className="pointer-events-none fixed inset-0 z-[45]" aria-hidden="true" />;
}
