/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        black: '#000000',
        white: '#ffffff',
        primary: '#1e3a8a',
        secondary: '#172554',
        highlight: '#f16920'
      }
    }
  },
  plugins: [
    require('tailwind-gradient-mask-image'),
    require('tailwind-scrollbar')({ nocompatible: true }),
    require('@tailwindcss/typography')
  ]
};
