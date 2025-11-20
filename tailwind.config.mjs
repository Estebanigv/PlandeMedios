/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
  ],
  theme: {
    extend: {
      colors: {
        // Custom color system matching CSS variables
        bg: {
          DEFAULT: '#020617', // slate-950
          secondary: '#0f172a', // slate-900
          tertiary: '#1e293b', // slate-800
        },
        accent: {
          DEFAULT: '#14b8a6', // teal-500
          hover: '#2dd4bf', // teal-400
          secondary: '#0d9488', // teal-600
        },
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'sans-serif'],
      },
      spacing: {
        'xs': '0.25rem',
        'sm': '0.5rem',
        'md': '1rem',
        'lg': '1.5rem',
        'xl': '2rem',
        '2xl': '3rem',
      },
    },
  },
  plugins: [],
}
