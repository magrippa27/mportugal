/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Open Sans', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        base: '18px',
        lg: '20px',
        xl: '22px',
        '2xl': '26px',
        '3xl': '32px',
        '4xl': '40px',
        '5xl': '48px',
      },
      lineHeight: {
        relaxed: '1.75',
        loose: '1.85',
      },
      maxWidth: {
        prose: '65ch',
        'prose-narrow': '55ch',
      },
      colors: {
        neutral: '#f5f3f0',
        primary: {
          50: '#f4f6f9',
          100: '#e8ecf1',
          200: '#d1d9e3',
          300: '#a9b8ca',
          400: '#7d92ab',
          500: '#5d728f',
          600: '#4a5b75',
          700: '#3d4a5f',
          800: '#2d3748',
          900: '#1a202c',
        },
        accent: {
          50: '#faf5f2',
          100: '#f0e6dc',
          200: '#ddc8b4',
          300: '#c9a886',
          400: '#b68d5f',
          500: '#8b6f47',
          600: '#6f5838',
          700: '#5a462d',
          800: '#453624',
          900: '#32271a',
        },
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
      },
    },
  },
  plugins: [],
};

