import Image from "next/image";
import { AnimatedReveal } from "@/components/AnimatedReveal";
import { CatalogGrid } from "@/components/CatalogGrid";

export const metadata = { title: "Каталог — Art by Natalia" };

export default function CatalogPage() {
  return (
    <div className="relative overflow-hidden px-6 pb-28 pt-32 lg:px-10">
      <div className="pointer-events-none absolute top-28 right-0 hidden w-52 opacity-40 lg:block">
        <Image src="/images/deco-bust-light.png" alt="" width={262} height={354} className="w-full" />
      </div>
      <div className="pointer-events-none absolute -left-10 top-64 hidden w-32 rotate-[200deg] opacity-25 lg:block">
        <Image src="/images/deco-laurel-gold.png" alt="" width={255} height={200} className="w-full" />
      </div>
      <div className="mx-auto max-w-7xl">
        <div className="pointer-events-none absolute left-1/4 top-16 -z-10 h-72 w-72 rounded-full bg-gold-400/10 blur-3xl dark:bg-gold-400/[0.06]" />
        <AnimatedReveal effect="slide" className="mb-14 max-w-2xl">
          <p className="mb-3 font-body text-xs uppercase tracking-widest2 text-gold-500">Собрание работ</p>
          <h1 className="font-display text-5xl leading-tight">Каталог работ</h1>
          <p className="mt-5 font-body text-lg text-ink/70 dark:text-parchment/70">
            Картины, скульптуры и авторские сувениры — каждая работа со своей историей,
            материалом и настроением.
          </p>
        </AnimatedReveal>

        <CatalogGrid />
      </div>
    </div>
  );
}
