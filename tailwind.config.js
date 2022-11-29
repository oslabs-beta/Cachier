/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./demo/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      'serif': ['Georgia, serif'],
    },
    extend: {},
  },
  daisyui: {
    styled: true,
    themes: true,
    darkTheme: 'dark',
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
};
