/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        mobius: {
          blue: '#1A58F2',
          purple: '#A226A8',
          lightBlue: '#4D8DF6',
          violet: '#802DAD',
          gray: '#E6E6E6'
        }
      },
      backgroundImage: {
        'gradient-mobius': 'linear-gradient(to right, #1A58F2, #A226A8)'
      }
    },
  },
  plugins: [],
};