/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        strongBlue: '#0B1120',
        strongGreen: '#10b981',
        brandNavy: '#0B1120',
        brandGold: '#C5A065',
        brightGold: '#C5A065',
        darkGold: '#947638',
        darkerGold: '#947638',
        softWhite: '#F8FAFC',
      },
    },
  },
  plugins: [],
}
