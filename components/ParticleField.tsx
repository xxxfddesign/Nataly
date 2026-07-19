"use client";
import { useEffect, useRef } from "react";

// Едва заметная золотая пыль, дрейфующая по фону. Работает и в светлой,
// и в тёмной теме — цвет частиц один и тот же (тёплое золото), меняется
// только их прозрачность, чтобы не спорить с фоном.
export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const count = prefersReduced ? 0 : Math.min(70, Math.floor((width * height) / 22000));

    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.6 + 0.4,
      speedY: Math.random() * 0.15 + 0.03,
      speedX: (Math.random() - 0.5) * 0.08,
      alpha: Math.random() * 0.35 + 0.08,
      twinkle: Math.random() * Math.PI * 2,
    }));

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
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201, 162, 76, ${p.alpha * (0.5 + flicker * 0.5)})`;
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
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-70"
      aria-hidden="true"
    />
  );
}
