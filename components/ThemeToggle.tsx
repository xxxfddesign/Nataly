"use client";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="h-9 w-16" />;

  const isDark = theme === "dark";

  return (
    <button
      aria-label="Переключить тему"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative flex h-9 w-16 items-center rounded-full border border-gold-400/40 bg-black/5 px-1 transition-colors duration-500 dark:bg-white/5"
    >
      <span
        className="absolute top-1 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-gold-200 via-gold-400 to-gold-600 shadow-gold transition-all duration-500"
        style={{ left: isDark ? "calc(100% - 30px)" : "4px" }}
      >
        {isDark ? <Moon size={14} className="text-graphite" /> : <Sun size={14} className="text-graphite" />}
      </span>
    </button>
  );
}
