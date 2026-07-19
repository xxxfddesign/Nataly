import Image from "next/image";
import { AnimatedReveal } from "@/components/AnimatedReveal";
import { GoldDivider } from "@/components/GoldDivider";
import { aboutContent } from "@/lib/about-content";
import { siteConfig } from "@/lib/site-config";

export const metadata = { title: "О художнике — Art by Natalia" };

export default function AboutPage() {
  return (
    <div className="px-6 pb-28 pt-32 lg:px-10">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-16 lg:grid-cols-[380px_1fr]">
        <AnimatedReveal effect="scale" className="mx-auto lg:sticky lg:top-32 lg:mx-0 lg:self-start">
          <div className="relative w-72 sm:w-80">
            <Image
              src="/images/portrait-natalia.png"
              alt={siteConfig.artistName}
              width={500}
              height={500}
              className="w-full drop-shadow-2xl"
            />
          </div>
          <p className="mt-6 text-center font-signature text-3xl text-gold-500 lg:text-left">
            {siteConfig.artistName}
          </p>
          <p className="text-center text-xs uppercase tracking-widest2 text-ink/50 dark:text-parchment/50 lg:text-left">
            Художник · Скульптор · Педагог
          </p>
        </AnimatedReveal>

        <div>
          <AnimatedReveal effect="slide">
            <p className="mb-4 font-body text-xs uppercase tracking-widest2 text-gold-500">Обо мне</p>
            <h1 className="font-display text-4xl leading-tight sm:text-5xl">{aboutContent.intro}</h1>
          </AnimatedReveal>

          <GoldDivider className="my-10 max-w-xs" />

          <div className="space-y-6">
            {aboutContent.paragraphs.map((p, i) => (
              <AnimatedReveal effect="fade" delay={i * 0.1} key={i}>
                <p className="font-body text-lg leading-relaxed text-ink/75 dark:text-parchment/75">{p}</p>
              </AnimatedReveal>
            ))}
          </div>

          <AnimatedReveal effect="fade" delay={0.3}>
            <p className="mt-10 border-l-2 border-gold-400 pl-6 font-signature text-3xl text-gold-500">
              “{aboutContent.quote}”
            </p>
          </AnimatedReveal>

          <GoldDivider className="my-12" />

          <AnimatedReveal effect="slide">
            <h2 className="mb-8 font-display text-2xl">Факты и практика</h2>
            <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {aboutContent.facts.map((f) => (
                <div key={f.label} className="rounded-2xl border border-gold-400/15 bg-ivory-deep/50 p-6 dark:bg-graphite-deep/50">
                  <dt className="text-xs uppercase tracking-widest2 text-gold-500">{f.label}</dt>
                  <dd className="mt-2 font-body text-ink/80 dark:text-parchment/80">{f.value}</dd>
                </div>
              ))}
            </dl>
          </AnimatedReveal>
        </div>
      </div>
    </div>
  );
}
