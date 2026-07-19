"use client";
import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

// Живая золотая пыль на фоне. В тёмной теме — тёплое золото на чёрном.
// В светлой теме тон делаем более насыщенным и добавляем едва заметное
// сияние вокруг части частиц, иначе золото "теряется" на светлом фоне.
export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const isDark = resolvedTheme === "dark";
    const baseColor = isDark ? "201, 162, 76" : "150, 108, 34";

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const count = prefersReduced ? 0 : Math.min(110, Math.floor((width * height) / 15000));

    const particles = Array.from({ length: count }, () => {
      const big = Math.random() > 0.85;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        r: big ? Math.random() * 2 + 1.8 : Math.random() * 1.4 + 0.4,
        glow: big,
        speedY: Math.random() * 0.16 + 0.03,
        speedX: (Math.random() - 0.5) * 0.09,
        alpha: (big ? 0.5 : 0.4) * (Math.random() * 0.6 + (isDark ? 0.4 : 0.55)),
        twinkle: Math.random() * Math.PI * 2,
      };
    });

    let frame: number;
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        p.y -= p.speedY;
        p.x += p.speedX;
        p.twinkle += 0.01;
        if (p.y < -10) p.y = height + 10;
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        const flicker = (Math.sin(p.twinkle) + 1) / 2;
        const a = p.alpha * (0.5 + flicker * 0.5);

        if (p.glow) {
          const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 5);
          gradient.addColorStop(0, `rgba(${baseColor}, ${a * 0.5})`);
          gradient.addColorStop(1, `rgba(${baseColor}, 0)`);
          ctx.beginPath();
          ctx.fillStyle = gradient;
          ctx.arc(p.x, p.y, p.r * 5, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${baseColor}, ${a})`;
        ctx.fill();
      }
      frame = requestAnimationFrame(render);
    };
    render();

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
    };
  }, [resolvedTheme]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-80"
      aria-hidden="true"
    />
  );
}
