/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundColor: {
        primary: '#f5f5f5',
        secondary1: '#1266dd',
        secondary2: '#f73859',
      },
      screens: {
        dt: { max: '1400px' },
        tl: { max: '1023px' },
        mb: { max: '767px' },
      },
    },
  },
  plugins: [],
};
