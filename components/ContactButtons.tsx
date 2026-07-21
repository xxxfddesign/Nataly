"use client";
import { ReactNode } from "react";
import { ArrowUpRight, Instagram, MessageCircle, Phone } from "lucide-react";
import { links } from "@/lib/site-config";

const base =
  "group flex h-12 w-12 items-center justify-center rounded-full border border-gold-400/40 text-gold-500 transition-all duration-400 hover:scale-110 hover:shadow-gold hover:border-gold-400";

export function ContactButtons({ variant = "icons" }: { variant?: "icons" | "full" }) {
  if (variant === "icons") {
    return (
      <div className="flex items-center gap-3">
        <a href={links.whatsapp()} target="_blank" rel="noopener noreferrer" aria-label="Написать в WhatsApp" className={base}>
          <MessageCircle size={20} />
        </a>
        <a href={links.instagram()} target="_blank" rel="noopener noreferrer" aria-label="Открыть Instagram" className={base}>
          <Instagram size={20} />
        </a>
        <a href={links.phone()} aria-label="Позвонить" className={base}>
          <Phone size={20} />
        </a>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <ContactRow icon={<MessageCircle size={20} />} label="WhatsApp" href={links.whatsapp()} />
      <ContactRow icon={<Instagram size={20} />} label="Instagram" href={links.instagram()} />
      <ContactRow icon={<Phone size={20} />} label="Телефон" href={links.phone()} />
    </div>
  );
}

function ContactRow({ icon, label, href }: { icon: ReactNode; label: string; href: string }) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noopener noreferrer"
      className="group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-gold-400/25 bg-black/[0.02] px-6 py-4 transition-all duration-400 hover:-translate-y-0.5 hover:border-gold-400 hover:shadow-gold dark:bg-white/[0.02]"
    >
      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-gold-400/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
      <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-gold-400/25 via-gold-400/10 to-transparent text-gold-500 ring-1 ring-gold-400/30 transition-transform duration-400 group-hover:scale-110 group-hover:ring-gold-400">
        {icon}
      </span>
      <span className="relative font-display text-lg">{label}</span>
      <ArrowUpRight
        size={18}
        className="relative ml-auto text-gold-500 opacity-0 transition-all duration-300 -translate-x-1 group-hover:translate-x-0 group-hover:opacity-100"
      />
    </a>
  );
}
