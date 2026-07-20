"use client";
import { useEffect, useState } from "react";
import { Artwork, seedArtworks } from "@/lib/artworks";
import { store } from "@/lib/admin-store";
import { CatalogCard } from "./CatalogCard";

// Показывает работы на главной странице из тех же данных, что видит админка —
// если Наталья поменяла цену, фото или описание в /admin, это сразу видно и здесь,
// а не только в каталоге.
export function FeaturedWorks() {
  const [artworks, setArtworks] = useState<Artwork[]>(seedArtworks);

  useEffect(() => {
    setArtworks(store.getArtworks());
  }, []);

  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
      {artworks.slice(0, 3).map((a, i) => (
        <CatalogCard artwork={a} index={i} key={a.id} />
      ))}
    </div>
  );
}
