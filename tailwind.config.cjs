/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: '#FF7E32',
        'background-light': '#2A243E',
        'background-dark': '#282139',
      },
    },
  },
  plugins: [],
}
