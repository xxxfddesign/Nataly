"use client";
import { useEffect, useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { Artwork, ArtworkCategory } from "@/lib/artworks";
import { CatalogCard } from "./CatalogCard";
import { store } from "@/lib/admin-store";
import { seedArtworks } from "@/lib/artworks";

const CATEGORIES: (ArtworkCategory | "Все")[] = ["Все", "Картины", "Скульптуры", "Сувениры"];
type Sort = "new" | "price-asc" | "price-desc";
type Availability = "all" | "available";

export function CatalogGrid() {
  const [artworks, setArtworks] = useState<Artwork[]>(seedArtworks);
  const [category, setCategory] = useState<(ArtworkCategory | "Все")>("Все");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<Sort>("new");
  const [availability, setAvailability] = useState<Availability>("all");
  const [maxPrice, setMaxPrice] = useState<number>(5000);

  useEffect(() => {
    setArtworks(store.getArtworks());
  }, []);

  const filtered = useMemo(() => {
    let items = [...artworks];
    if (category !== "Все") items = items.filter((a) => a.category === category);
    if (query.trim()) {
      const q = query.toLowerCase();
      items = items.filter(
        (a) => a.title.toLowerCase().includes(q) || a.material.toLowerCase().includes(q)
      );
    }
    if (availability === "available") items = items.filter((a) => a.status === "В наличии");
    items = items.filter((a) => (a.price ?? 0) <= maxPrice || a.price === null);

    if (sort === "price-asc") items.sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity));
    if (sort === "price-desc") items.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
    if (sort === "new") items.sort((a, b) => b.year - a.year);

    return items;
  }, [artworks, category, query, sort, availability, maxPrice]);

  return (
    <div>
      <div className="mb-10 flex flex-wrap items-center gap-3">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`rounded-full border px-5 py-2 text-sm uppercase tracking-wider transition-all duration-300 ${
              category === c
                ? "border-gold-400 bg-gold-400 text-graphite shadow-gold"
                : "border-gold-400/25 text-ink/70 hover:border-gold-400/60 dark:text-parchment/70"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mb-12 grid grid-cols-1 gap-4 rounded-2xl border border-gold-400/15 bg-ivory-deep/60 p-5 dark:bg-graphite-deep/60 sm:grid-cols-2 lg:grid-cols-4">
        <label className="flex items-center gap-2 rounded-xl border border-gold-400/20 bg-transparent px-4 py-2.5">
          <Search size={16} className="text-gold-500" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Поиск по названию"
            className="w-full bg-transparent text-sm outline-none placeholder:text-ink/40 dark:placeholder:text-parchment/40"
          />
        </label>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as Sort)}
          className="rounded-xl border border-gold-400/20 bg-transparent px-4 py-2.5 text-sm outline-none"
        >
          <option value="new">Сначала новые</option>
          <option value="price-asc">Цена: по возрастанию</option>
          <option value="price-desc">Цена: по убыванию</option>
        </select>

        <select
          value={availability}
          onChange={(e) => setAvailability(e.target.value as Availability)}
          className="rounded-xl border border-gold-400/20 bg-transparent px-4 py-2.5 text-sm outline-none"
        >
          <option value="all">Любое наличие</option>
          <option value="available">Только в наличии</option>
        </select>

        <label className="flex items-center gap-3 rounded-xl border border-gold-400/20 px-4 py-2.5 text-sm">
          <SlidersHorizontal size={14} className="text-gold-500" />
          <span className="whitespace-nowrap text-xs text-ink/60 dark:text-parchment/60">до ${maxPrice}</span>
          <input
            type="range"
            min={50}
            max={5000}
            step={50}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full accent-gold-500"
          />
        </label>
      </div>

      {filtered.length === 0 ? (
        <p className="py-20 text-center text-ink/50 dark:text-parchment/50">
          Ничего не найдено. Попробуйте изменить фильтры.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((a, i) => (
            <CatalogCard artwork={a} index={i} key={a.id} />
          ))}
        </div>
      )}
    </div>
  );
}
