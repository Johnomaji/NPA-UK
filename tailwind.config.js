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
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 32px -8px rgba(0,0,0,0.5)',
        glow: '0 0 32px -8px rgba(74,222,128,0.3)',
      },
      backgroundImage: {
        'hero-texture': 'var(--hero-texture)',
      },
    },
  },
  plugins: [],
};
