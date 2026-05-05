/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        text: "var(--text)",
        "text-h": "var(--text-h)",
        bg: "var(--bg)",
        border: "var(--border)",
        "code-bg": "var(--code-bg)",
        accent: "var(--accent)",
        "accent-bg": "var(--accent-bg)",
        "accent-border": "var(--accent-border)",
        "social-bg": "var(--social-bg)",
      },
      fontFamily: {
        sans: "system-ui, 'Segoe UI', Roboto, sans-serif",
        heading: "system-ui, 'Segoe UI', Roboto, sans-serif",
        mono: "ui-monospace, Consolas, monospace",
      },
      boxShadow: {
        "custom": "rgba(0, 0, 0, 0.1) 0 10px 15px -3px, rgba(0, 0, 0, 0.05) 0 4px 6px -2px",
      },
      fontSize: {
        base: "18px",
      },
      lineHeight: {
        base: "145%",
      },
      letterSpacing: {
        base: "0.18px",
      },
    },
  },
  plugins: [],
}
