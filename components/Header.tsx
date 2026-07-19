"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { FlourishDivider } from "./FlourishDivider";

const NAV = [
  { href: "/", label: "Главная" },
  { href: "/about", label: "О художнике" },
  { href: "/catalog", label: "Каталог" },
  { href: "/contacts", label: "Контакты" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-ivory/95 shadow-[0_1px_0_0_rgba(184,147,74,0.25),0_12px_30px_-18px_rgba(184,147,74,0.55)] backdrop-blur-md transition-colors duration-500 dark:bg-graphite/95 dark:shadow-[0_1px_0_0_rgba(201,162,76,0.18),0_12px_30px_-18px_rgba(201,162,76,0.35)]">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
        <Link href="/" className="flex items-center gap-2 sm:gap-3">
          <Image src="/images/logo.png" alt="Art by Natalia" width={44} height={44} className="h-9 w-9 object-contain sm:h-11 sm:w-11" priority />
          <span className="font-signature text-lg leading-none text-gold-500 sm:text-2xl">Art by Natalia</span>
        </Link>

        <nav className="hidden items-center gap-9 lg:flex">
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
            className="lg:hidden"
            onClick={() => setOpen(true)}
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 -bottom-3 flex justify-center">
        <FlourishDivider variant={1} className="max-w-[220px] opacity-80" />
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-ivory dark:bg-graphite lg:hidden"
          >
            <div className="flex h-20 items-center justify-between px-6">
              <span className="font-signature text-2xl text-gold-500">Art by Natalia</span>
              <button aria-label="Закрыть меню" onClick={() => setOpen(false)}>
                <X size={26} />
              </button>
            </div>
            <nav className="flex flex-col gap-1 px-6 pt-8">
              {NAV.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.4 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-gold-400/15 py-5 font-display text-3xl"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
