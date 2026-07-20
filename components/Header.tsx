"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

const NAV = [
  { href: "/", label: "Главная" },
  { href: "/about", label: "О художнике" },
  { href: "/catalog", label: "Каталог" },
  { href: "/quiz", label: "Квиз об искусстве" },
  { href: "/contacts", label: "Контакты" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Блокируем прокрутку фона, пока открыто мобильное меню
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Закрываем меню автоматически при переходе на другую страницу
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 bg-ivory/95 shadow-[0_1px_0_0_rgba(184,147,74,0.25),0_12px_30px_-18px_rgba(184,147,74,0.55)] backdrop-blur-md transition-colors duration-500 dark:bg-graphite/95 dark:shadow-[0_1px_0_0_rgba(201,162,76,0.18),0_12px_30px_-18px_rgba(201,162,76,0.35)]">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
          <Link href="/" className="flex items-center gap-2 sm:gap-3">
            <Image src="/images/logo.png" alt="Art by Natalia" width={44} height={44} className="h-9 w-9 object-contain sm:h-11 sm:w-11" priority />
            <span className="font-signature text-lg leading-none text-gold-500 sm:text-2xl">Art by Natalia</span>
          </Link>

          <nav className="hidden items-center gap-8 xl:flex">
            {NAV.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group relative py-2 font-body text-sm uppercase tracking-widest2 text-ink/80 transition-colors hover:text-gold-500 dark:text-parchment/80"
                >
                  {item.label}
                  <span
                    className={`absolute -bottom-0.5 left-0 h-px bg-gold-400 transition-all duration-400 ${
                      active ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 sm:gap-4">
            <ThemeToggle />
            <button
              aria-label="Открыть меню"
              className="xl:hidden"
              onClick={() => setOpen(true)}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Мобильное меню рендерится ВНЕ <header>, у которого есть backdrop-blur —
          у filter/backdrop-filter есть побочный эффект: они создают новый containing
          block для потомков с position:fixed, из-за чего оверлей "прилипал" не к
          экрану, а к 80px-полосе хэдера. Вынос наверх уровня чинит это раз и навсегда. */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[100] flex flex-col bg-gradient-to-b from-ivory via-ivory to-ivory-deep dark:from-graphite dark:via-graphite dark:to-graphite-deep xl:hidden"
          >
            <div className="flex h-20 shrink-0 items-center justify-between border-b border-gold-400/15 px-6">
              <span className="font-signature text-2xl text-gold-500">Art by Natalia</span>
              <button
                aria-label="Закрыть меню"
                onClick={() => setOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gold-400/30 text-gold-500 transition-colors hover:bg-gold-400/10"
              >
                <X size={22} />
              </button>
            </div>
            <nav className="flex flex-1 flex-col justify-center gap-1 overflow-y-auto px-6 pb-16">
              {NAV.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 * i, duration: 0.4 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="group flex items-center justify-between border-b border-gold-400/15 py-5 font-display text-3xl transition-colors hover:text-gold-500"
                  >
                    {item.label}
                    <span className="text-gold-400 opacity-0 transition-opacity group-hover:opacity-100">→</span>
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
