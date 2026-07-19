import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          DEFAULT: "#FBF7F0",
          deep: "#F3ECDF",
          line: "#E4D9C4",
        },
        graphite: {
          DEFAULT: "#14110D",
          deep: "#1C1812",
          line: "#3A3226",
        },
        ink: "#241F1A",
        parchment: "#F0E9DD",
        gold: {
          50: "#FBF2DD",
          100: "#F1DFAF",
          200: "#E8C97A",
          300: "#D9B872",
          400: "#C9A24C",
          500: "#B8934A",
          600: "#9C7A38",
          700: "#7A5E2A",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-manrope)", "sans-serif"],
        signature: ["var(--font-signature)", "cursive"],
      },
      letterSpacing: {
        widest2: "0.35em",
      },
      transitionDuration: {
        400: "400ms",
        600: "600ms",
        900: "900ms",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        drift: {
          "0%, 100%": { transform: "translate3d(0,0,0)" },
          "50%": { transform: "translate3d(0,-14px,0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.9s cubic-bezier(.16,1,.3,1) forwards",
        shimmer: "shimmer 3.5s linear infinite",
        drift: "drift 6s ease-in-out infinite",
      },
      boxShadow: {
        gold: "0 0 0 1px rgba(184,147,74,0.35), 0 8px 30px -8px rgba(184,147,74,0.45)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
