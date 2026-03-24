/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: 'rgb(var(--color-ink) / <alpha-value>)',
        charcoal: 'rgb(var(--color-charcoal) / <alpha-value>)',
        sand: 'rgb(var(--color-sand) / <alpha-value>)',
        clay: 'rgb(var(--color-clay) / <alpha-value>)',
        ember: 'rgb(var(--color-ember) / <alpha-value>)',
        forest: 'rgb(var(--color-forest) / <alpha-value>)',
      },
      fontFamily: {
        display: ['"Bodoni Moda"', 'serif'],
        body: ['"Source Sans 3"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 20px 50px -30px rgba(0,0,0,0.35)',
      },
      backgroundImage: {
        'hero-texture': 'var(--hero-texture)',
      },
    },
  },
  plugins: [],
};
