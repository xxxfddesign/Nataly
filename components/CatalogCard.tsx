"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ImageOff } from "lucide-react";
import { Artwork } from "@/lib/artworks";
import { formatPrice } from "@/lib/format";

export function CatalogCard({ artwork, index = 0 }: { artwork: Artwork; index?: number }) {
  const image = artwork.images[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link href={`/catalog/${artwork.id}`} className="group block">
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-gold-400/15 bg-ivory-deep dark:bg-graphite-deep">
          {image ? (
            <Image
              src={image}
              alt={artwork.title}
              fill
              className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-3 text-ink/30 dark:text-parchment/30">
              <ImageOff size={32} />
              <span className="text-xs uppercase tracking-widest2">Фото скоро появится</span>
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-black/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <div className="pointer-events-none absolute inset-0 opacity-0 shadow-[inset_0_0_40px_rgba(201,162,76,0.5)] transition-opacity duration-500 group-hover:opacity-100" />

          <span className="absolute left-4 top-4 rounded-full border border-gold-400/40 bg-black/30 px-3 py-1 text-[11px] uppercase tracking-widest2 text-white backdrop-blur">
            {artwork.category}
          </span>

          <span className="absolute bottom-4 left-4 translate-y-4 rounded-full bg-gold-400 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-graphite opacity-0 transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100">
            Подробнее
          </span>
        </div>

        <div className="mt-4 flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-xl">{artwork.title}</h3>
            <p className="text-sm text-ink/50 dark:text-parchment/50">{artwork.year} · {artwork.material}</p>
          </div>
          <p className="whitespace-nowrap font-display text-lg text-gold-500">
            {formatPrice(artwork.price)}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
