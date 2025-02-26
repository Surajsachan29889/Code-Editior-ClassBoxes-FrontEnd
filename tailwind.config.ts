import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
     extend: {
      colors: {
        'code-bg': '#0A0A0A',
        dark: {
          900: '#000000',
          800: '#0A0A0A',
          700: '#141414',
          600: '#1A1A1A',
          500: '#262626',
          400: '#363636'
        }
      },
    },
  },
  plugins: [],
} satisfies Config;
