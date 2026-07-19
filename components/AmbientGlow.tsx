// Мягкие золотые "пятна" света на фоне — добавляют глубину и роскошь,
// особенно в светлой теме, где фон иначе выглядит слишком плоско.
export function AmbientGlow() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div className="absolute left-[-10%] top-[-10%] h-[40rem] w-[40rem] animate-drift rounded-full bg-gold-400/[0.10] blur-[120px] dark:bg-gold-400/[0.06]" />
      <div
        className="absolute right-[-15%] top-[30%] h-[36rem] w-[36rem] animate-drift rounded-full bg-gold-300/[0.10] blur-[130px] dark:bg-gold-300/[0.05]"
        style={{ animationDelay: "-3s" }}
      />
      <div
        className="absolute bottom-[-10%] left-[20%] h-[32rem] w-[32rem] animate-drift rounded-full bg-gold-500/[0.08] blur-[110px] dark:bg-gold-500/[0.05]"
        style={{ animationDelay: "-1.5s" }}
      />
    </div>
  );
}
