/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
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
        primary: {
          50: '#f0f4f8',
          100: '#d9e2ec',
          200: '#bcccdc',
          300: '#9fb3c8',
          400: '#829ab1',
          500: '#627d98',
          600: '#486581',
          700: '#334e68',
          800: '#243b53',
          900: '#102a43',
        },
        accent: {
          50: '#e3f8f5',
          100: '#c1ede5',
          200: '#9de2d4',
          300: '#7ad7c3',
          400: '#5dccb2',
          500: '#3ec1a0',
          600: '#2fb696',
          700: '#1fa88a',
          800: '#0f9a7e',
          900: '#008060',
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

