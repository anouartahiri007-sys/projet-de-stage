/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    'bg-blue-50', 'text-blue-600',
    'bg-emerald-50', 'text-emerald-600',
    'bg-purple-50', 'text-purple-600',
    'bg-orange-50', 'text-orange-600',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          900: '#152C4D',
          800: '#1E3E6E',
          700: '#2A5285',
          600: '#3466A4',
          light: 'var(--primary-light)',
          main: 'var(--primary-main)',
          dark: 'var(--primary-dark)',
        },
        healthcare: {
          600: '#10B981',
          500: '#34D399',
          50: '#ECFDF5',
        },
        accent: {
          blue: '#3B82F6',
          purple: '#8B5CF6',
          teal: '#0D9488',
          orange: '#F97316',
        },
        govBackground: 'var(--color-govBackground)',
      },
      fontFamily: {
        heading: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        'gov': '12px',
      },
      boxShadow: {
        'gov-card': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      }
    },
  },
  plugins: [],
}
