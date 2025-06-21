/** @type {import('tailwindcss').Config} */
import tailwindcssAnimate from "tailwindcss-animate";
import { colors } from "./src/lib/theme";
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      colors: {
        primary: colors.primary,
        secondary: colors.secondary,
        accent: colors.accent,
        muted: colors.muted,
        border: colors.border,
        input: colors.input,
        ring: colors.ring,
        hover: colors.hover,
        text: colors.text,
        subtext: colors.subtext,
        bg: colors.bg,
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};
