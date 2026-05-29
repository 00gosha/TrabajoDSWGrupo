/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        void: '#000000',
        chrome: '#e8edf2',
        steel: '#9ba5ae',
        graphite: '#111316',
      },
      boxShadow: {
        silver: '0 0 38px rgba(232, 237, 242, 0.18)',
        insetSilver: 'inset 0 1px 0 rgba(255,255,255,0.28)',
      },
      fontFamily: {
        display: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
