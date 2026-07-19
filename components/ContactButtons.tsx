"use client";
import { ReactNode } from "react";
import { Instagram, MessageCircle, Phone, Mail } from "lucide-react";
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
        <a href={links.email()} aria-label="Написать письмо" className={base}>
          <Mail size={20} />
        </a>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <ContactRow icon={<MessageCircle size={20} />} label="WhatsApp" href={links.whatsapp()} />
      <ContactRow icon={<Instagram size={20} />} label="Instagram" href={links.instagram()} />
      <ContactRow icon={<Phone size={20} />} label="Телефон" href={links.phone()} />
      <ContactRow icon={<Mail size={20} />} label="Email" href={links.email()} />
    </div>
  );
}

function ContactRow({ icon, label, href }: { icon: ReactNode; label: string; href: string }) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noopener noreferrer"
      className="group flex items-center gap-4 rounded-2xl border border-gold-400/25 bg-black/[0.02] px-6 py-4 transition-all duration-400 hover:border-gold-400 hover:bg-gold-400/5 hover:shadow-gold dark:bg-white/[0.02]"
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-400/10 text-gold-500 transition-transform duration-400 group-hover:scale-110">
        {icon}
      </span>
      <span className="font-display text-lg">{label}</span>
    </a>
  );
}
