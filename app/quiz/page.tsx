"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, RotateCcw, Sparkles, Heart, Gem, BookOpen, Compass } from "lucide-react";
import { AnimatedReveal } from "@/components/AnimatedReveal";

type TypeKey = "romantic" | "collector" | "philosopher" | "explorer";

interface Question {
  question: string;
  options: { label: string; type: TypeKey }[];
}

const QUESTIONS: Question[] = [
  {
    question: "Вы заходите в галерею. Что первым делом притягивает взгляд?",
    options: [
      { label: "Свет и настроение картины", type: "romantic" },
      { label: "Техника и мастерство исполнения", type: "collector" },
      { label: "История, скрытая за сюжетом", type: "philosopher" },
      { label: "Что-то неожиданное и странное", type: "explorer" },
    ],
  },
  {
    question: "Какая работа скорее окажется у вас дома?",
    options: [
      { label: "Тёплый пейзаж или нежный портрет", type: "romantic" },
      { label: "Скульптура редкой работы, вложение на годы", type: "collector" },
      { label: "Произведение с глубоким культурным смыслом", type: "philosopher" },
      { label: "То, что ни у кого больше нет", type: "explorer" },
    ],
  },
  {
    question: "Что вы цените в художнике больше всего?",
    options: [
      { label: "Искренность и умение передать чувство", type: "romantic" },
      { label: "Дисциплину и владение материалом", type: "collector" },
      { label: "Способность говорить о важном через форму", type: "philosopher" },
      { label: "Смелость экспериментировать", type: "explorer" },
    ],
  },
  {
    question: "Идеальный вечер в мире искусства — это...",
    options: [
      { label: "Тихая прогулка по музею на закате", type: "romantic" },
      { label: "Аукцион и разговор о провенансе", type: "collector" },
      { label: "Долгая беседа об идее произведения", type: "philosopher" },
      { label: "Открытие никому не известной мастерской", type: "explorer" },
    ],
  },
  {
    question: "Какое слово ближе всего описывает ваш вкус?",
    options: [
      { label: "Чувственность", type: "romantic" },
      { label: "Ценность", type: "collector" },
      { label: "Смысл", type: "philosopher" },
      { label: "Открытие", type: "explorer" },
    ],
  },
];

const RESULTS: Record<
  TypeKey,
  { title: string; description: string; suggestion: string }
> = {
  romantic: {
    title: "Романтик",
    description:
      "Вы ищете в искусстве эмоцию, а не факт. Свет, настроение, тихая поэзия момента — вот что заставляет вас остановиться перед работой. Вам близки живописные сюжеты, где чувство важнее детали.",
    suggestion: "Загляните в раздел «Картины» — там живёт то самое настроение.",
  },
  collector: {
    title: "Коллекционер",
    description:
      "Вы цените искусство как ремесло и как ценность одновременно. Материал, техника, редкость — для вас это не менее важно, чем сюжет. Вы смотрите на работу и видите её путь через годы.",
    suggestion: "Обратите внимание на «Скульптуры» — работы, выполненные вручную и с характером.",
  },
  philosopher: {
    title: "Философ",
    description:
      "Для вас произведение — это всегда высказывание. Вы ищете смысл, символ, историю, зашитую в форму. Простая красота вам не так интересна, как та, что заставляет задуматься.",
    suggestion: "Присмотритесь к работам с глубоким культурным контекстом — таким как «Уют истории великой степи».",
  },
  explorer: {
    title: "Искатель",
    description:
      "Вам скучно с предсказуемым. Вы всегда в поиске неожиданного ракурса, редкой техники, работы, которую не встретишь больше нигде. Именно вы находите настоящие сокровища раньше остальных.",
    suggestion: "Полистайте весь каталог целиком — не пропустите то самое, штучное.",
  },
};

const TYPE_ICONS: Record<TypeKey, typeof Heart> = {
  romantic: Heart,
  collector: Gem,
  philosopher: BookOpen,
  explorer: Compass,
};

export default function QuizPage() {
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState<Record<TypeKey, number>>({
    romantic: 0,
    collector: 0,
    philosopher: 0,
    explorer: 0,
  });
  const [finished, setFinished] = useState(false);

  function answer(type: TypeKey) {
    setScores((prev) => ({ ...prev, [type]: prev[type] + 1 }));
    if (step + 1 < QUESTIONS.length) {
      setStep(step + 1);
    } else {
      setFinished(true);
    }
  }

  function restart() {
    setStep(0);
    setScores({ romantic: 0, collector: 0, philosopher: 0, explorer: 0 });
    setFinished(false);
  }

  const resultKey = (Object.keys(scores) as TypeKey[]).reduce((a, b) =>
    scores[a] >= scores[b] ? a : b
  );

  return (
    <div className="relative overflow-hidden px-6 pb-28 pt-32 lg:px-10">
      {/* Лавровые ветви по краям — слева и справа, зеркально */}
      <div className="pointer-events-none absolute -left-8 top-10 w-28 -rotate-12 opacity-30 sm:w-36 lg:-left-6 lg:w-48">
        <Image src="/images/deco-laurel-gold.png" alt="" width={255} height={200} className="w-full" />
      </div>
      <div className="pointer-events-none absolute -left-10 bottom-8 hidden w-32 rotate-[150deg] opacity-25 sm:block lg:-left-8 lg:w-44">
        <Image src="/images/deco-laurel-gold.png" alt="" width={255} height={200} className="w-full" />
      </div>
      <div className="pointer-events-none absolute -right-8 top-16 w-28 rotate-[195deg] scale-x-[-1] opacity-30 sm:w-36 lg:-right-6 lg:w-48">
        <Image src="/images/deco-laurel-gold.png" alt="" width={255} height={200} className="w-full" />
      </div>
      <div className="pointer-events-none absolute -right-10 bottom-10 hidden w-32 rotate-[-30deg] scale-x-[-1] opacity-25 sm:block lg:-right-8 lg:w-44">
        <Image src="/images/deco-laurel-gold.png" alt="" width={255} height={200} className="w-full" />
      </div>
      <div className="mx-auto max-w-2xl">
        <AnimatedReveal effect="slide" className="mb-12 text-center">
          <p className="mb-3 flex items-center justify-center gap-2 font-body text-xs uppercase tracking-widest2 text-gold-500">
            <Sparkles size={14} /> Небольшая игра
          </p>
          <h1 className="font-display text-4xl leading-tight sm:text-5xl">Какой вы тип ценителя искусства?</h1>
          <p className="mt-4 font-body text-ink/70 dark:text-parchment/70">
            Пять коротких вопросов — и мы угадаем, что в живописи и скульптуре трогает именно вас.
          </p>
        </AnimatedReveal>

        <div className="mb-10 flex items-center justify-center gap-2 sm:gap-3">
          {QUESTIONS.map((_, i) => {
            const isDone = finished || i < step;
            const isCurrent = !finished && i === step;
            return (
              <div key={i} className="flex items-center gap-2 sm:gap-3">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full border font-body text-xs transition-all duration-400 ${
                    isDone
                      ? "border-gold-400 bg-gold-400 text-graphite"
                      : isCurrent
                        ? "border-gold-400 text-gold-500 shadow-gold"
                        : "border-gold-400/25 text-ink/30 dark:text-parchment/30"
                  }`}
                >
                  {i + 1}
                </div>
                {i < QUESTIONS.length - 1 && (
                  <div className={`h-px w-4 sm:w-8 ${isDone ? "bg-gold-400" : "bg-gold-400/20"}`} />
                )}
              </div>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          {!finished ? (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-3xl border border-gold-400/15 bg-ivory-deep/60 p-8 dark:bg-graphite-deep/60"
            >
              <p className="mb-2 text-xs uppercase tracking-widest2 text-gold-500">
                Вопрос {step + 1} из {QUESTIONS.length}
              </p>
              <h2 className="mb-8 font-display text-2xl leading-snug sm:text-3xl">
                {QUESTIONS[step].question}
              </h2>
              <div className="grid grid-cols-1 gap-3">
                {QUESTIONS[step].options.map((opt, i) => (
                  <button
                    key={opt.label}
                    onClick={() => answer(opt.type)}
                    className="group flex items-center gap-4 rounded-2xl border border-gold-400/20 bg-transparent px-6 py-4 text-left font-body transition-all duration-300 hover:border-gold-400 hover:bg-gold-400/10 hover:shadow-gold"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gold-400/30 font-display text-sm text-gold-500 transition-colors duration-300 group-hover:border-gold-400 group-hover:bg-gold-400 group-hover:text-graphite">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span className="flex-1">{opt.label}</span>
                    <ArrowRight size={16} className="shrink-0 text-gold-500 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100" />
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-3xl border border-gold-400/20 bg-ivory-deep/60 p-10 text-center shadow-gold dark:bg-graphite-deep/60"
            >
              <div className="pointer-events-none absolute left-1/2 top-8 -z-10 h-40 w-40 -translate-x-1/2 rounded-full bg-gold-400/20 blur-3xl" />
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-gold-400/40 bg-gold-400/10 text-gold-500 shadow-gold">
                {(() => {
                  const ResultIcon = TYPE_ICONS[resultKey];
                  return <ResultIcon size={28} />;
                })()}
              </div>
              <p className="mb-3 font-body text-xs uppercase tracking-widest2 text-gold-500">Ваш результат</p>
              <h2 className="font-signature text-5xl text-gold-500">{RESULTS[resultKey].title}</h2>
              <p className="mx-auto mt-6 max-w-lg font-body text-lg leading-relaxed text-ink/75 dark:text-parchment/75">
                {RESULTS[resultKey].description}
              </p>
              <p className="mt-4 font-body text-sm text-ink/60 dark:text-parchment/60">
                {RESULTS[resultKey].suggestion}
              </p>

              <div className="mx-auto mt-10 flex max-w-md flex-col gap-3">
                {(Object.keys(scores) as TypeKey[]).map((key) => {
                  const Icon = TYPE_ICONS[key];
                  const pct = Math.round((scores[key] / QUESTIONS.length) * 100);
                  return (
                    <div key={key} className="flex items-center gap-3 text-left">
                      <Icon size={15} className="shrink-0 text-gold-500" />
                      <span className="w-28 shrink-0 font-body text-xs uppercase tracking-wider text-ink/60 dark:text-parchment/60">
                        {RESULTS[key].title}
                      </span>
                      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-black/5 dark:bg-white/10">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-gold-300 to-gold-500"
                          initial={{ width: 0 }}
                          animate={{ width: `${pct}%` }}
                          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/catalog"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 bg-[length:200%_auto] px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-graphite shadow-gold transition-all duration-500 hover:bg-right"
                >
                  Смотреть каталог <ArrowRight size={16} />
                </Link>
                <button
                  onClick={restart}
                  className="inline-flex items-center gap-2 rounded-full border border-gold-400/40 px-7 py-3.5 text-sm uppercase tracking-wider transition-colors hover:border-gold-400 hover:bg-gold-400/10"
                >
                  <RotateCcw size={15} /> Пройти ещё раз
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
