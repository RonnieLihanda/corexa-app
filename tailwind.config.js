/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          gold: "#F5A623",
          bg: "#0A0A0F",
          card: "#111827",
          text: "#F1F5F9",
          border: "#1E2535",
        },
      },
      borderRadius: {
        'brand': '12px',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
