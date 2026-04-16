/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'DM Sans'", "system-ui", "sans-serif"],
        display: ["'Outfit'", "system-ui", "sans-serif"],
      },
      colors: {
        surface: {
          DEFAULT: "#0c0f14",
          raised: "#12161e",
          border: "#1e2633",
        },
        accent: {
          DEFAULT: "#38bdf8",
          muted: "#0ea5e9",
        },
      },
      backgroundImage: {
        "grid-slate":
          "linear-gradient(to right, rgba(148,163,184,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.06) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};
