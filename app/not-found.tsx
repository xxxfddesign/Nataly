import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 pt-20 text-center">
      <p className="font-signature text-4xl text-gold-500">Упс…</p>
      <h1 className="mt-4 font-display text-3xl">Эта страница ещё не написана</h1>
      <p className="mt-3 max-w-md text-ink/60 dark:text-parchment/60">
        Похоже, вы свернули не туда в галерее. Вернитесь на главную или загляните в каталог.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold-400 px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-graphite shadow-gold"
      >
        На главную
      </Link>
    </div>
  );
}
