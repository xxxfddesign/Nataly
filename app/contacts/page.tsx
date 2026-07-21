import Image from "next/image";
import { AnimatedReveal } from "@/components/AnimatedReveal";
import { ContactButtons } from "@/components/ContactButtons";
import { siteConfig } from "@/lib/site-config";

export const metadata = { title: "Контакты — Art by Natalia" };

export default function ContactsPage() {
  return (
    <div className="relative overflow-hidden px-6 pb-28 pt-32 lg:px-10">
      <div className="absolute inset-0 opacity-[0.06] dark:opacity-[0.08]">
        <Image src="/images/about-scene-light.png" alt="" fill className="object-cover dark:hidden" />
        <Image src="/images/contacts-box-bg.png" alt="" fill className="hidden object-cover dark:block" />
      </div>
      <div className="pointer-events-none absolute -top-10 right-0 w-56 opacity-20 lg:w-80">
        <Image src="/images/deco-splash.png" alt="" width={400} height={230} className="w-full" />
      </div>
      <div className="pointer-events-none absolute -left-10 bottom-8 w-28 -rotate-12 opacity-40 lg:w-40">
        <Image src="/images/deco-laurel-branch.png" alt="" width={294} height={284} className="w-full" />
      </div>

      <div className="relative mx-auto max-w-4xl text-center">
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
