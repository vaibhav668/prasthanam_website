/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "rgb(var(--ink-rgb) / <alpha-value>)",
        "ink-2": "rgb(var(--ink-2-rgb) / <alpha-value>)",
        paper: "rgb(var(--paper-rgb) / <alpha-value>)",
        mute: "rgb(var(--mute-rgb) / <alpha-value>)",
        red: "rgb(var(--red-rgb) / <alpha-value>)",
        "red-ui": "rgb(var(--red-ui-rgb) / <alpha-value>)",
        "red-text": "var(--red-text)",
        cyan: "rgb(var(--cyan-rgb) / <alpha-value>)",
        line: "var(--line)",
      },
      fontFamily: {
        display: ['"Unbounded"', '"Unbounded Fallback"', "system-ui", "sans-serif"],
        body: ['"Archivo"', '"Archivo Fallback"', "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', '"JetBrains Mono Fallback"', "ui-monospace", "monospace"],
      },
      screens: { xs: "390px" },
    },
  },
  plugins: [],
};
