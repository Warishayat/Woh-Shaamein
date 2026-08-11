/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'nostalgia-dark': '#0f0c08', // very dark sepia/warm black
        'nostalgia-brown': '#3e2723',
        'nostalgia-gold': '#d4af37',
        'nostalgia-accent': '#8d6e63',
      },
      fontFamily: {
        'nostalgic': ['"Playfair Display"', 'serif'], // A classic elegant serif
        'sans': ['"Inter"', 'sans-serif'],
      },
      backgroundImage: {
        'vintage-gradient': 'linear-gradient(to bottom, rgba(15, 12, 8, 0.7), rgba(15, 12, 8, 1))',
      }
    },
  },
  plugins: [],
}
