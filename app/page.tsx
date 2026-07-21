import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Hero } from "@/components/Hero";
import { AnimatedReveal } from "@/components/AnimatedReveal";
import { GoldDivider } from "@/components/GoldDivider";
import { FeaturedWorks } from "@/components/FeaturedWorks";
import { Magnetic } from "@/components/Magnetic";
import { aboutContent } from "@/lib/about-content";
import { siteConfig } from "@/lib/site-config";

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* О художнике — краткий блок */}
      <section className="relative overflow-hidden px-6 pb-28 pt-10 lg:px-10">
        <div className="pointer-events-none absolute -right-4 top-0 hidden w-28 opacity-20 2xl:block">
          <Image src="/images/deco-column.png" alt="" width={172} height={512} className="w-full" />
        </div>

        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <AnimatedReveal effect="slide">
            <div className="relative mx-auto w-72 sm:w-80">
              <div className="pointer-events-none absolute inset-0 -z-10 scale-125 rounded-full bg-gold-400/15 blur-3xl dark:bg-gold-400/10" />
              <div className="pointer-events-none absolute -right-10 -top-6 hidden w-24 rotate-[15deg] animate-drift opacity-40 sm:block lg:w-32">
                <Image src="/images/deco-laurel-gold.png" alt="" width={255} height={200} className="w-full" />
              </div>
              <div className="pointer-events-none absolute -bottom-6 -left-8 hidden w-28 animate-drift opacity-25 [animation-delay:1.5s] sm:block lg:w-36">
                <Image src="/images/deco-gold-dust.png" alt="" width={229} height={246} className="w-full" />
              </div>
              <Image
                src="/images/portrait-natalia.png"
                alt={siteConfig.artistName}
                width={500}
                height={500}
                className="relative w-full drop-shadow-2xl"
              />
            </div>
          </AnimatedReveal>

          <AnimatedReveal effect="slide" delay={0.15}>
            <p className="mb-4 font-body text-xs uppercase tracking-widest2 text-gold-500">Об авторе</p>
            <h2 className="font-display text-4xl leading-tight sm:text-5xl">{aboutContent.heading}</h2>
            <p className="mt-6 max-w-xl font-body text-lg leading-relaxed text-ink/70 dark:text-parchment/70">
              {aboutContent.intro}
            </p>
            <p className="mt-4 max-w-xl font-signature text-2xl text-gold-500">“{aboutContent.quote}”</p>

            <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-4">
              {siteConfig.stats.map((s) => (
                <div key={s.label}>
                  <p className="font-display text-3xl text-gold-500">{s.value}</p>
                  <p className="mt-2 text-xs uppercase leading-relaxed tracking-widest2 text-ink/50 dark:text-parchment/50">{s.label}</p>
                </div>
              ))}
            </div>

            <Link
              href="/about"
              className="mt-10 inline-flex items-center gap-2 font-body text-sm uppercase tracking-wider text-gold-500 transition-colors hover:text-gold-600"
            >
              Читать историю полностью
              <ArrowRight size={16} />
            </Link>
          </AnimatedReveal>
        </div>
      </section>

      <GoldDivider className="mx-auto max-w-4xl" />

      {/* Каталог — превью */}
      <section className="relative px-6 py-28 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <AnimatedReveal effect="fade" className="mb-14 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="mb-3 font-body text-xs uppercase tracking-widest2 text-gold-500">Избранное</p>
              <h2 className="font-display text-4xl sm:text-5xl">Каталог работ</h2>
            </div>
            <Link
              href="/catalog"
              className="inline-flex items-center gap-2 rounded-full border border-gold-400/40 px-6 py-3 text-sm uppercase tracking-wider transition-colors hover:border-gold-400 hover:bg-gold-400/10"
            >
              Весь каталог <ArrowRight size={15} />
            </Link>
          </AnimatedReveal>

          <FeaturedWorks />
        </div>
      </section>

      {/* Квиз — приглашение */}
      <section className="relative overflow-hidden px-6 py-20 lg:px-10">
        <div className="pointer-events-none absolute inset-x-0 top-6 mx-auto w-full max-w-[1000px] px-4 opacity-90 sm:top-2">
          <Image
            src="/images/deco-quiz-wave-light.png"
            alt=""
            width={724}
            height={337}
            className="block w-full dark:hidden"
          />
          <Image
            src="/images/deco-quiz-wave-dark.png"
            alt=""
            width={724}
            height={330}
            className="hidden w-full dark:block"
          />
        </div>

        <AnimatedReveal
          effect="scale"
          className="relative mx-auto flex max-w-4xl flex-col items-center gap-6 rounded-3xl border border-gold-400/20 bg-gradient-to-br from-gold-400/10 via-transparent to-gold-400/5 p-10 text-center shadow-gold backdrop-blur-[2px] sm:flex-row sm:text-left"
        >
          <Sparkles className="hidden shrink-0 text-gold-500 sm:block" size={40} />
          <div className="flex-1">
            <h3 className="font-display text-2xl sm:text-3xl">Какой вы тип ценителя искусства?</h3>
            <p className="mt-2 font-body text-ink/70 dark:text-parchment/70">
              Пройдите короткий квиз из пяти вопросов — и узнайте, какие работы откликнутся именно вам.
            </p>
          </div>
          <Link
            href="/quiz"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 bg-[length:200%_auto] px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-graphite shadow-gold transition-all duration-500 hover:bg-right"
          >
            Пройти квиз <ArrowRight size={16} />
          </Link>
        </AnimatedReveal>
      </section>

      {/* Приглашение к контакту — фон меняется по теме, как баннер в Hero */}
      <section className="relative overflow-hidden px-6 py-32 lg:px-10">
        <div className="absolute inset-0">
          <Image
            src="/images/cta-scene-light.png"
            alt=""
            fill
            className="object-cover dark:hidden"
          />
          <Image
            src="/images/cta-scene-dark.png"
            alt=""
            fill
            className="hidden object-cover dark:block"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ivory/60 via-ivory/10 to-transparent dark:from-graphite/70 dark:via-graphite/20 dark:to-transparent" />
          {/* Мягкое растворение сверху, чтобы фото не выглядело жёстко обрезанным */}
          <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-ivory via-ivory/60 to-transparent dark:from-graphite dark:via-graphite/60 sm:h-96" />
        </div>

        <div className="pointer-events-none absolute left-6 top-10 w-24 -rotate-12 opacity-70 sm:w-32 lg:left-14">
          <Image src="/images/deco-laurel-branch.png" alt="" width={294} height={284} className="w-full" />
        </div>

        <AnimatedReveal effect="scale" className="relative mx-auto max-w-3xl text-center">
          <h2 className="font-display text-4xl leading-tight sm:text-5xl">
            Искусство создаёт <span className="gold-text">бессмертие</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl font-body text-lg text-ink/70 dark:text-parchment/80">
            Каждая работа — приглашение остановиться. Если что-то откликнулось —
            напишите, и мы расскажем об этой работе подробнее.
          </p>
          <Magnetic>
            <Link
              href="/contacts"
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 bg-[length:200%_auto] px-8 py-4 font-body text-sm font-semibold uppercase tracking-wider text-graphite shadow-gold transition-all duration-500 hover:bg-right"
            >
              Связаться со мной <ArrowRight size={16} />
            </Link>
          </Magnetic>
        </AnimatedReveal>
      </section>
    </>
  );
}
