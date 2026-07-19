"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ImageOff, Instagram, MessageCircle } from "lucide-react";
import { Artwork, seedArtworks } from "@/lib/artworks";
import { store } from "@/lib/admin-store";
import { links } from "@/lib/site-config";
import { AnimatedReveal } from "@/components/AnimatedReveal";
import { GoldDivider } from "@/components/GoldDivider";

export default function ProductPage() {
  const params = useParams<{ slug: string }>();
  const [artwork, setArtwork] = useState<Artwork | null | undefined>(undefined);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const all = store.getArtworks();
    const found = all.find((a) => a.id === params.slug) || seedArtworks.find((a) => a.id === params.slug);
    setArtwork(found ?? null);
  }, [params.slug]);

  if (artwork === undefined) return <div className="pt-40 text-center">Загрузка…</div>;
  if (artwork === null) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 pt-20 text-center">
        <p className="font-signature text-4xl text-gold-500">Упс…</p>
        <h1 className="mt-4 font-display text-3xl">Такой работы не нашлось</h1>
        <Link href="/catalog" className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold-400 px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-graphite shadow-gold">
          К каталогу
        </Link>
      </div>
    );
  }

  const mainImage = artwork.images[activeImage];

  return (
    <div className="px-6 pb-28 pt-32 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <Link href="/catalog" className="mb-10 inline-flex items-center gap-2 text-sm uppercase tracking-wider text-ink/60 hover:text-gold-500 dark:text-parchment/60">
          <ArrowLeft size={16} /> Назад к каталогу
        </Link>

        <div className="grid grid-cols-1 gap-14 lg:grid-cols-2">
          <AnimatedReveal effect="scale">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-gold-400/15 bg-ivory-deep dark:bg-graphite-deep">
              {mainImage ? (
                <Image src={mainImage} alt={artwork.title} fill className="object-cover" />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center gap-3 text-ink/30 dark:text-parchment/30">
                  <ImageOff size={40} />
                  <span className="text-xs uppercase tracking-widest2">Фото скоро появится</span>
                </div>
              )}
            </div>
            {artwork.images.length > 1 && (
              <div className="mt-4 flex gap-3">
                {artwork.images.map((img, i) => (
                  <button
                    key={img + i}
                    onClick={() => setActiveImage(i)}
                    className={`relative h-20 w-20 overflow-hidden rounded-xl border-2 transition-colors ${
                      i === activeImage ? "border-gold-400" : "border-transparent"
                    }`}
                  >
                    <Image src={img} alt="" fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </AnimatedReveal>

          <AnimatedReveal effect="slide" delay={0.15}>
            <p className="mb-3 font-body text-xs uppercase tracking-widest2 text-gold-500">{artwork.category}</p>
            <h1 className="font-display text-4xl leading-tight sm:text-5xl">{artwork.title}</h1>
            <p className="mt-6 font-display text-3xl text-gold-500">
              {artwork.price ? `$${artwork.price}` : "Цена по запросу"}
            </p>

            <GoldDivider className="my-8" />

            <p className="font-body text-lg leading-relaxed text-ink/75 dark:text-parchment/75">
              {artwork.description}
            </p>

            <dl className="mt-10 grid grid-cols-2 gap-6">
              <Detail label="Размер" value={artwork.size} />
              <Detail label="Вес" value={artwork.weight} />
              <Detail label="Материал" value={artwork.material} />
              <Detail label="Год" value={String(artwork.year)} />
              <Detail label="Статус" value={artwork.status} />
            </dl>

            <div className="mt-12 flex flex-wrap gap-4">
              <a
                href={`${links.whatsapp()}?text=${encodeURIComponent(`Здравствуйте! Интересует работа «${artwork.title}»`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 bg-[length:200%_auto] px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-graphite shadow-gold transition-all duration-500 hover:bg-right"
              >
                <MessageCircle size={17} /> Написать в WhatsApp
              </a>
              <a
                href={links.instagram()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-gold-400/40 px-7 py-3.5 text-sm uppercase tracking-wider transition-colors hover:border-gold-400 hover:bg-gold-400/10"
              >
                <Instagram size={17} /> Instagram
              </a>
            </div>
          </AnimatedReveal>
        </div>
      </div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-widest2 text-ink/45 dark:text-parchment/45">{label}</dt>
      <dd className="mt-1 font-display text-lg">{value}</dd>
    </div>
  );
}
