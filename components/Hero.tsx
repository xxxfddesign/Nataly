"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, PlayCircle } from "lucide-react";
import { ContactButtons } from "./ContactButtons";
import { Magnetic } from "./Magnetic";

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-20">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 1.6, duration: 1.2 }}
        className="pointer-events-none absolute -left-16 top-24 w-64 animate-drift opacity-40 lg:w-96"
      >
        <Image src="/images/deco-splash.png" alt="" width={400} height={230} className="w-full" />
      </motion.div>

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-6 py-16 lg:grid-cols-2 lg:items-start lg:gap-16 lg:px-10 lg:pt-24">
        <div className="order-2 lg:order-1">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-5xl leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
          >
            Искусство <span className="gold-text animate-shimmer">вдохновляет</span> жизнь
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mt-6 max-w-md font-body text-lg leading-relaxed text-ink/70 dark:text-parchment/70"
          >
            Картины и скульптуры, рождённые из тишины мастерской — там, где форма,
            цвет и золото встречаются, чтобы рассказать историю без слов.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="mt-10 flex flex-wrap items-center gap-5"
          >
            <Magnetic>
              <Link
                href="/catalog"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 bg-[length:200%_auto] px-8 py-4 font-body text-sm font-semibold uppercase tracking-wider text-graphite shadow-gold transition-all duration-500 hover:bg-right"
              >
                Смотреть каталог
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Magnetic>
            <Link
              href="/about"
              className="group inline-flex items-center gap-2 font-body text-sm uppercase tracking-wider text-ink/80 transition-colors hover:text-gold-500 dark:text-parchment/80"
            >
              <PlayCircle size={22} className="text-gold-400" />
              Об авторе
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="mt-14"
          >
            <ContactButtons />
          </motion.div>
        </div>

        <motion.div
          className="relative order-1 lg:order-2"
          initial={{ opacity: 0, scale: 1.12 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2rem] shadow-2xl">
            <Image
              src="/images/banner-light.png"
              alt="Скульптура из белого мрамора с золотыми прожилками"
              fill
              priority
              className="object-cover dark:hidden"
            />
            <Image
              src="/images/banner-dark.png"
              alt="Скульптура из белого мрамора на тёмном фоне с золотыми прожилками"
              fill
              priority
              className="hidden object-cover dark:block"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />

            {/* Золотая рамка, "прорисовывающая" себя при загрузке — как в галерее.
                Используем ручной stroke-dasharray/dashoffset вместо pathLength:
                у framer-motion pathLength на скруглённом прямоугольнике иногда
                не замыкает контур до конца. */}
            <svg
              className="pointer-events-none absolute inset-0 h-full w-full"
              viewBox="0 0 100 75"
              preserveAspectRatio="none"
              fill="none"
            >
              <motion.rect
                x="1.2"
                y="1.2"
                width="97.6"
                height="72.6"
                rx="6"
                stroke="url(#heroFrameGradient)"
                strokeWidth="0.6"
                strokeDasharray="340"
                initial={{ strokeDashoffset: 340, opacity: 0 }}
                animate={{ strokeDashoffset: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
              />
              <defs>
                <linearGradient id="heroFrameGradient" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#E8C97A" />
                  <stop offset="50%" stopColor="#B8934A" />
                  <stop offset="100%" stopColor="#E8C97A" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.8 }}
            className="absolute -bottom-8 -left-8 hidden w-40 rounded-2xl border border-gold-400/30 bg-ivory/90 p-4 shadow-gold backdrop-blur dark:bg-graphite/90 sm:block"
          >
            <p className="font-display text-2xl text-gold-500">13+</p>
            <p className="text-xs uppercase tracking-widest2 text-ink/60 dark:text-parchment/60">лет в искусстве</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
