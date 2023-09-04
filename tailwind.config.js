/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {},
    fontFamily: {
      anton: ['Anton'],
      raleway: ['Raleway'],
      emoji: ['"Noto Emoji"']
    },
    screens: {
      easy: '419px',
      normal: '779px',
      hard: '1049px'
    }
  },
  plugins: []
}
