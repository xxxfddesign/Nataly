import Image from "next/image";
import Link from "next/link";
import { ContactButtons } from "./ContactButtons";
import { ScrollToTop } from "./ScrollToTop";
import { siteConfig } from "@/lib/site-config";

export function Footer() {
  return (
    <footer className="relative bg-ivory-deep/60 px-6 py-14 dark:bg-graphite-deep/60 lg:px-10">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px animate-shimmer bg-gradient-to-r from-transparent via-gold-400 to-transparent bg-[length:200%_auto] opacity-70"
      />
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-10 md:flex-row md:items-center">
        <div className="flex items-center gap-3">
          <Image src="/images/logo.png" alt="" width={40} height={40} className="h-10 w-10 object-contain opacity-90" />
          <div>
            <p className="font-signature text-xl text-gold-500">Art by Natalia</p>
            <p className="text-xs uppercase tracking-widest2 text-ink/50 dark:text-parchment/50">
              {siteConfig.artistName}
            </p>
          </div>
        </div>

        <nav className="flex flex-wrap gap-x-8 gap-y-2 font-body text-sm text-ink/70 dark:text-parchment/70">
          <Link href="/about" className="hover:text-gold-500">О художнике</Link>
          <Link href="/catalog" className="hover:text-gold-500">Каталог</Link>
          <Link href="/quiz" className="hover:text-gold-500">Квиз об искусстве</Link>
          <Link href="/contacts" className="hover:text-gold-500">Контакты</Link>
          <Link href="/admin" className="hover:text-gold-500">Админ</Link>
        </nav>

        <ContactButtons />
      </div>
      <p className="mx-auto mt-10 max-w-7xl text-xs text-ink/40 dark:text-parchment/40">
        © {new Date().getFullYear()} {siteConfig.brandName}. Создано с любовью к искусству.
      </p>
      <ScrollToTop />
    </footer>
  );
}
