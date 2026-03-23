/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // enable dark mode via class strategy
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        card: 'var(--card-bg)',
        'card-border': 'var(--card-border)',
        accent: {
          light: '#74b9ff',
          DEFAULT: '#0984e3',
          dark: '#005f9e'
        },
        priority: {
          high: '#ff7675',
          medium: '#fdcb6e',
          low: '#55efc4'
        }
      },
      boxShadow: {
        'soft-light': '9px 9px 16px rgba(163,177,198,0.6), -9px -9px 16px rgba(255,255,255, 0.6)',
        'inner-light': 'inset 6px 6px 10px 0 rgba(163,177,198, 0.5), inset -6px -6px 10px 0 rgba(255,255,255, 0.6)',
        'soft-dark': '7px 7px 15px rgba(0,0,0,0.5), -7px -7px 15px rgba(67, 72, 85, 0.3)',
        'inner-dark': 'inset 5px 5px 10px rgba(0,0,0,0.5), inset -5px -5px 10px rgba(67, 72, 85, 0.3)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'super-gradient': 'linear-gradient(135deg, #0984e3, #74b9ff)',
        'glass-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0))'
      }
    },
  },
  plugins: [],
}
