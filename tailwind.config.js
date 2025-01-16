/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#2563eb',
        secondary: '#1e293b',
        accent: '#38bdf8',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        jetbrains: ['JetBrains Mono', 'monospace'],
      },
      spacing: {
        '16': '16px',
        '24': '24px',
        '32': '32px',
        '48': '48px',
      },
    },
  },
  plugins: [],
};