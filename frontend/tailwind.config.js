/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          900: '#152C4D', // Deep Navy (Sidebar)
          800: '#1E3E6E', // Active Sidebar Menu
          700: '#2A5285', // Hover
          600: '#3466A4', // Accents
        },
        healthcare: {
          600: '#10B981', // Emerald (Médecins / Green Tags)
          500: '#34D399',
          50: '#ECFDF5',
        },
        accent: {
          blue: '#3B82F6',   // Personnel icon
          purple: '#8B5CF6', // Infirmiers icon
          teal: '#0D9488',   // Vétérinaires icon
          orange: '#F97316', // Recrutement tag
        },
        govBackground: '#F4F7FB', // Light Gray/Blue background layout
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
