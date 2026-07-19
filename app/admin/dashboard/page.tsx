"use client";
import { useEffect, useRef, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
import {
  LogOut, Plus, Trash2, Save, Upload, Download, ImagePlus, X,
} from "lucide-react";
import { store, HeroContent } from "@/lib/admin-store";
import { formatPrice } from "@/lib/format";
import { Artwork, ArtworkCategory, ArtworkStatus } from "@/lib/artworks";
import { siteConfig } from "@/lib/site-config";

type Tab = "works" | "home" | "contacts" | "backup";

function emptyArtwork(): Artwork {
  return {
    id: `work-${Date.now()}`,
    title: "Новая работа",
    category: "Картины",
    description: "",
    size: "",
    weight: "",
    material: "",
    price: null,
    status: "В наличии",
    year: new Date().getFullYear(),
    images: [],
    createdAt: new Date().toISOString(),
  };
}

export default function AdminDashboard() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("works");
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [editing, setEditing] = useState<Artwork | null>(null);
  const [hero, setHero] = useState<HeroContent | null>(null);
  const [contacts, setContacts] = useState(siteConfig);
  const [savedFlash, setSavedFlash] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const importInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setArtworks(store.getArtworks());
    setHero(store.getHero());
    setContacts(store.getContacts());
  }, []);

  function flashSaved() {
    setSavedFlash(true);
    setTimeout(() => setSavedFlash(false), 1600);
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin");
  }

  function saveWork(work: Artwork) {
    const updated = store.upsertArtwork(work);
    setArtworks(updated);
    setEditing(null);
    flashSaved();
  }

  function deleteWork(id: string) {
    if (!confirm("Удалить эту работу?")) return;
    setArtworks(store.deleteArtwork(id));
  }

  function saveHero() {
    if (!hero) return;
    store.saveHero(hero);
    flashSaved();
  }

  function saveContacts() {
    store.saveContacts(contacts);
    flashSaved();
  }

  function handleImageUpload(files: FileList | null) {
    if (!files || !editing) return;
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        setEditing((prev) =>
          prev ? { ...prev, images: [...prev.images, reader.result as string] } : prev
        );
      };
      reader.readAsDataURL(file);
    });
  }

  function handleBannerUpload(file: File | undefined, key: "bannerLight" | "bannerDark") {
    if (!file || !hero) return;
    const reader = new FileReader();
    reader.onload = () => setHero({ ...hero, [key]: reader.result as string });
    reader.readAsDataURL(file);
  }

  function exportBackup() {
    const blob = new Blob([store.exportAll()], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "art-by-natalia-backup.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  function importBackup(file: File | undefined) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        store.importAll(reader.result as string);
        setArtworks(store.getArtworks());
        setHero(store.getHero());
        setContacts(store.getContacts());
        flashSaved();
      } catch {
        alert("Не удалось прочитать файл резервной копии.");
      }
    };
    reader.readAsText(file);
  }

  return (
    <div className="px-6 pb-28 pt-32 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="font-body text-xs uppercase tracking-widest2 text-gold-500">Панель управления</p>
            <h1 className="font-display text-4xl">Админ-панель</h1>
          </div>
          <div className="flex items-center gap-3">
            {savedFlash && <span className="text-sm text-gold-500">Сохранено ✓</span>}
            <button
              onClick={logout}
              className="inline-flex items-center gap-2 rounded-full border border-gold-400/40 px-5 py-2.5 text-sm uppercase tracking-wider hover:border-gold-400 hover:bg-gold-400/10"
            >
              <LogOut size={15} /> Выйти
            </button>
          </div>
        </div>

        <div className="mb-10 flex flex-wrap gap-2 border-b border-gold-400/15 pb-4">
          {[
            { id: "works", label: "Работы" },
            { id: "home", label: "Главная страница" },
            { id: "contacts", label: "Контакты" },
            { id: "backup", label: "Экспорт / импорт" },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id as Tab)}
              className={`rounded-full px-5 py-2 text-sm uppercase tracking-wider transition-colors ${
                tab === t.id ? "bg-gold-400 text-graphite" : "text-ink/60 hover:bg-gold-400/10 dark:text-parchment/60"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === "works" && !editing && (
          <div>
            <button
              onClick={() => setEditing(emptyArtwork())}
              className="mb-8 inline-flex items-center gap-2 rounded-full bg-gold-400 px-6 py-3 text-sm font-semibold uppercase tracking-wider text-graphite shadow-gold"
            >
              <Plus size={16} /> Добавить работу
            </button>

            <div className="space-y-3">
              {artworks.map((a) => (
                <div
                  key={a.id}
                  className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-gold-400/15 bg-ivory-deep/50 px-6 py-4 dark:bg-graphite-deep/50"
                >
                  <div>
                    <p className="font-display text-lg">{a.title}</p>
                    <p className="text-sm text-ink/50 dark:text-parchment/50">
                      {a.category} · {a.status} · {formatPrice(a.price)} · {a.images.length} фото
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditing(a)}
                      className="rounded-full border border-gold-400/40 px-4 py-2 text-xs uppercase tracking-wider hover:bg-gold-400/10"
                    >
                      Редактировать
                    </button>
                    <button
                      onClick={() => deleteWork(a.id)}
                      className="rounded-full border border-red-400/40 px-3 py-2 text-red-500 hover:bg-red-400/10"
                      aria-label="Удалить"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "works" && editing && (
          <div className="rounded-3xl border border-gold-400/15 bg-ivory-deep/50 p-8 dark:bg-graphite-deep/50">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-display text-2xl">Редактирование работы</h2>
              <button onClick={() => setEditing(null)} aria-label="Закрыть"><X size={20} /></button>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field label="Название">
                <input className="input" value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} />
              </Field>
              <Field label="Категория">
                <select className="input" value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value as ArtworkCategory })}>
                  <option>Картины</option>
                  <option>Скульптуры</option>
                  <option>Сувениры</option>
                </select>
              </Field>
              <Field label="Размер">
                <input className="input" value={editing.size} onChange={(e) => setEditing({ ...editing, size: e.target.value })} placeholder="45 x 30 x 20 см" />
              </Field>
              <Field label="Вес">
                <input className="input" value={editing.weight} onChange={(e) => setEditing({ ...editing, weight: e.target.value })} placeholder="3.2 кг" />
              </Field>
              <Field label="Материал">
                <input className="input" value={editing.material} onChange={(e) => setEditing({ ...editing, material: e.target.value })} />
              </Field>
              <Field label="Год">
                <input type="number" className="input" value={editing.year} onChange={(e) => setEditing({ ...editing, year: Number(e.target.value) })} />
              </Field>
              <Field label="Цена, ₸ (пусто = по запросу)">
                <input
                  type="number"
                  className="input"
                  value={editing.price ?? ""}
                  onChange={(e) => setEditing({ ...editing, price: e.target.value === "" ? null : Number(e.target.value) })}
                />
              </Field>
              <Field label="Статус / наличие">
                <select className="input" value={editing.status} onChange={(e) => setEditing({ ...editing, status: e.target.value as ArtworkStatus })}>
                  <option>В наличии</option>
                  <option>Под заказ</option>
                  <option>Продано</option>
                </select>
              </Field>
              <Field label="Описание" className="sm:col-span-2">
                <textarea className="input min-h-[100px]" value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} />
              </Field>
            </div>

            <div className="mt-6">
              <p className="mb-3 text-xs uppercase tracking-widest2 text-gold-500">Фотографии</p>
              <div className="flex flex-wrap gap-3">
                {editing.images.map((img, i) => (
                  <div key={i} className="relative h-24 w-24 overflow-hidden rounded-xl border border-gold-400/20">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img} alt="" className="h-full w-full object-cover" />
                    <button
                      onClick={() => setEditing({ ...editing, images: editing.images.filter((_, idx) => idx !== i) })}
                      className="absolute right-1 top-1 rounded-full bg-black/60 p-1 text-white"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex h-24 w-24 flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-gold-400/40 text-gold-500 hover:bg-gold-400/10"
                >
                  <ImagePlus size={20} />
                  <span className="text-[10px]">Добавить</span>
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  hidden
                  onChange={(e) => handleImageUpload(e.target.files)}
                />
              </div>
            </div>

            <button
              onClick={() => saveWork(editing)}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold-400 px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-graphite shadow-gold"
            >
              <Save size={16} /> Сохранить работу
            </button>
          </div>
        )}

        {tab === "home" && hero && (
          <div className="max-w-xl space-y-5 rounded-3xl border border-gold-400/15 bg-ivory-deep/50 p-8 dark:bg-graphite-deep/50">
            <Field label="Заголовок на главной">
              <input className="input" value={hero.title} onChange={(e) => setHero({ ...hero, title: e.target.value })} />
            </Field>
            <Field label="Подзаголовок">
              <textarea className="input" value={hero.subtitle} onChange={(e) => setHero({ ...hero, subtitle: e.target.value })} />
            </Field>
            <Field label="Баннер — светлая тема">
              <input type="file" accept="image/*" onChange={(e) => handleBannerUpload(e.target.files?.[0], "bannerLight")} />
            </Field>
            <Field label="Баннер — тёмная тема">
              <input type="file" accept="image/*" onChange={(e) => handleBannerUpload(e.target.files?.[0], "bannerDark")} />
            </Field>
            <button onClick={saveHero} className="inline-flex items-center gap-2 rounded-full bg-gold-400 px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-graphite shadow-gold">
              <Save size={16} /> Сохранить
            </button>
            <p className="text-xs text-ink/50 dark:text-parchment/50">
              Изменения из этого раздела пока не выводятся автоматически на витрину — свяжитесь с разработчиком,
              чтобы подключить их к главной странице, либо используйте раздел "Экспорт/импорт" как резервную копию.
            </p>
          </div>
        )}

        {tab === "contacts" && (
          <div className="max-w-xl space-y-5 rounded-3xl border border-gold-400/15 bg-ivory-deep/50 p-8 dark:bg-graphite-deep/50">
            <Field label="WhatsApp (только цифры, с кодом страны)">
              <input className="input" value={contacts.whatsapp} onChange={(e) => setContacts({ ...contacts, whatsapp: e.target.value })} />
            </Field>
            <Field label="Instagram (без @)">
              <input className="input" value={contacts.instagram} onChange={(e) => setContacts({ ...contacts, instagram: e.target.value })} />
            </Field>
            <Field label="Телефон">
              <input className="input" value={contacts.phone} onChange={(e) => setContacts({ ...contacts, phone: e.target.value })} />
            </Field>
            <Field label="Email">
              <input className="input" value={contacts.email} onChange={(e) => setContacts({ ...contacts, email: e.target.value })} />
            </Field>
            <button onClick={saveContacts} className="inline-flex items-center gap-2 rounded-full bg-gold-400 px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-graphite shadow-gold">
              <Save size={16} /> Сохранить
            </button>
          </div>
        )}

        {tab === "backup" && (
          <div className="max-w-xl space-y-6 rounded-3xl border border-gold-400/15 bg-ivory-deep/50 p-8 dark:bg-graphite-deep/50">
            <p className="text-sm text-ink/70 dark:text-parchment/70">
              Каталог и настройки хранятся в этом браузере. Скачайте резервную копию,
              чтобы не потерять данные или перенести их на другое устройство.
            </p>
            <button onClick={exportBackup} className="inline-flex items-center gap-2 rounded-full border border-gold-400/40 px-6 py-3 text-sm uppercase tracking-wider hover:bg-gold-400/10">
              <Download size={16} /> Скачать резервную копию
            </button>
            <div>
              <button
                onClick={() => importInputRef.current?.click()}
                className="inline-flex items-center gap-2 rounded-full border border-gold-400/40 px-6 py-3 text-sm uppercase tracking-wider hover:bg-gold-400/10"
              >
                <Upload size={16} /> Загрузить резервную копию
              </button>
              <input ref={importInputRef} type="file" accept="application/json" hidden onChange={(e) => importBackup(e.target.files?.[0])} />
            </div>
          </div>
        )}
      </div>

      <style jsx global>{`
        .input {
          width: 100%;
          border-radius: 0.75rem;
          border: 1px solid rgba(184, 147, 74, 0.25);
          background: transparent;
          padding: 0.65rem 1rem;
          font-size: 0.9rem;
          outline: none;
        }
        .input:focus {
          border-color: #c9a24c;
        }
      `}</style>
    </div>
  );
}

function Field({ label, children, className = "" }: { label: string; children: ReactNode; className?: string }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-xs uppercase tracking-widest2 text-ink/50 dark:text-parchment/50">{label}</span>
      {children}
    </label>
  );
}
