import Image from "next/image";
import { AnimatedReveal } from "@/components/AnimatedReveal";
import { ContactButtons } from "@/components/ContactButtons";
import { siteConfig } from "@/lib/site-config";

export const metadata = { title: "Контакты — Art by Natalia" };

export default function ContactsPage() {
  return (
    <div className="relative overflow-hidden px-6 pb-28 pt-32 lg:px-10">
      <div className="pointer-events-none absolute -left-8 top-28 w-24 rotate-12 opacity-45 lg:top-32 lg:w-36">
        <Image src="/images/deco-laurel-branch.png" alt="" width={294} height={284} className="w-full" />
      </div>
      <div className="pointer-events-none absolute -right-8 top-28 w-24 -rotate-[150deg] scale-x-[-1] opacity-45 lg:top-32 lg:w-36">
        <Image src="/images/deco-laurel-gold.png" alt="" width={255} height={200} className="w-full" />
      </div>

      <div className="mx-auto max-w-4xl text-center">
        <div className="pointer-events-none absolute left-1/2 top-24 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-gold-400/10 blur-3xl dark:bg-gold-400/[0.08]" />
        <AnimatedReveal effect="slide">
          <p className="mb-4 font-body text-xs uppercase tracking-widest2 text-gold-500">Свяжитесь со мной</p>
          <h1 className="font-display text-5xl leading-tight">Будем рады диалогу об искусстве</h1>
          <p className="mx-auto mt-6 max-w-xl font-body text-lg text-ink/70 dark:text-parchment/70">
            Пишите о работе, которая тронула, — расскажу подробнее об истории создания,
            материалах и наличии. {siteConfig.address}.
          </p>
        </AnimatedReveal>

        <AnimatedReveal effect="scale" delay={0.15} className="relative mx-auto mt-14 grid max-w-md grid-cols-1 gap-4">
          <ContactButtons variant="full" />
        </AnimatedReveal>
      </div>
    </div>
  );
}
