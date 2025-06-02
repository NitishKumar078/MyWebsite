/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/pages.tsx",
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // Next.js app directory
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#2563eb",
        secondary: "#1e293b",
        accent: "#38bdf8",
      },
      spacing: {
        16: "16px",
        24: "24px",
        32: "32px",
        48: "48px",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        jetbrains: ["JetBrains Mono", "monospace"],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme("colors.gray.900"),
            a: {
              color: theme("colors.primary"),
              "&:hover": {
                color: theme("colors.primary/90"),
              },
            },
            "code::before": {
              content: '""',
            },
            "code::after": {
              content: '""',
            },
          },
        },
        dark: {
          css: {
            color: theme("colors.gray.100"),
            a: {
              color: theme("colors.primary"),
              "&:hover": {
                color: theme("colors.primary/90"),
              },
            },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
