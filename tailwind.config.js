/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./demo/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  daisyui: {
    styled: true,
    themes: true,
    darkTheme: 'dark',
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
};
