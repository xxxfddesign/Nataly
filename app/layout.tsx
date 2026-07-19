import type { Metadata } from "next";
import { Playfair_Display, Manrope, Parisienne } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ParticleField } from "@/components/ParticleField";
import { IntroLoader } from "@/components/IntroLoader";
import { PageTransition } from "@/components/PageTransition";
import { Chatbot } from "@/components/Chatbot";

const playfair = Playfair_Display({
  subsets: ["latin", "latin-ext", "cyrillic"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700"],
});

const parisienne = Parisienne({
  subsets: ["latin"],
  variable: "--font-signature",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Art by Natalia — Наталья Шелко | Художник и скульптор",
  description:
    "Персональная художественная галерея Натальи Шелко: живопись, скульптура и авторские работы. Каталог, выставки, контакты.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={`${playfair.variable} ${manrope.variable} ${parisienne.variable} font-body`}>
        <ThemeProvider>
          <IntroLoader />
          <ParticleField />
          <Header />
          <main className="relative z-10">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
          <Chatbot />
        </ThemeProvider>
      </body>
    </html>
  );
}
