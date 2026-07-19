"use client";

// Простое хранилище для админ-панели на основе localStorage.
// Это не полноценная база данных: изменения сохраняются в браузере
// того устройства, где выполнялся вход в админку. Для регулярной работы
// это удобно (никакого сервера настраивать не нужно), а раздел
// "Экспорт / импорт" в админ-панели позволяет сохранить резервную копию
// каталога в файл и загрузить её в другой раз или на другом устройстве.

import { Artwork, seedArtworks } from "./artworks";
import { siteConfig } from "./site-config";

const ARTWORKS_KEY = "asn_artworks_v1";
const HERO_KEY = "asn_hero_v1";
const CONTACTS_KEY = "asn_contacts_v1";

export interface HeroContent {
  title: string;
  subtitle: string;
  bannerLight: string;
  bannerDark: string;
}

const defaultHero: HeroContent = {
  title: "Искусство вдохновляет жизнь",
  subtitle: "Картины и скульптуры, созданные с душой и любовью к искусству",
  bannerLight: "/images/banner-light.png",
  bannerDark: "/images/banner-dark.png",
};

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

export const store = {
  getArtworks(): Artwork[] {
    return read<Artwork[]>(ARTWORKS_KEY, seedArtworks);
  },
  saveArtworks(items: Artwork[]) {
    write(ARTWORKS_KEY, items);
  },
  upsertArtwork(item: Artwork) {
    const items = store.getArtworks();
    const idx = items.findIndex((a) => a.id === item.id);
    if (idx >= 0) items[idx] = item;
    else items.unshift(item);
    store.saveArtworks(items);
    return items;
  },
  deleteArtwork(id: string) {
    const items = store.getArtworks().filter((a) => a.id !== id);
    store.saveArtworks(items);
    return items;
  },
  getHero(): HeroContent {
    return read<HeroContent>(HERO_KEY, defaultHero);
  },
  saveHero(hero: HeroContent) {
    write(HERO_KEY, hero);
  },
  getContacts() {
    return read(CONTACTS_KEY, siteConfig);
  },
  saveContacts(contacts: typeof siteConfig) {
    write(CONTACTS_KEY, contacts);
  },
  exportAll() {
    return JSON.stringify(
      {
        artworks: store.getArtworks(),
        hero: store.getHero(),
        contacts: store.getContacts(),
      },
      null,
      2
    );
  },
  importAll(json: string) {
    const parsed = JSON.parse(json);
    if (parsed.artworks) store.saveArtworks(parsed.artworks);
    if (parsed.hero) store.saveHero(parsed.hero);
    if (parsed.contacts) store.saveContacts(parsed.contacts);
  },
};
