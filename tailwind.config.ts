import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';
import defaultTheme from 'tailwindcss/defaultTheme';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    // colors: {
    //   'base': {
    //     '50': '#f6f6f6',
    //     '100': '#e7e7e7',
    //     '200': '#d1d1d1',
    //     '300': '#b0b0b0',
    //     '400': '#888888',
    //     '500': '#6d6d6d',
    //     '600': '#5d5d5d',
    //     '700': '#171719',
    //     '800': '#131314',
    //     '900': '#111112',
    //     '950': '#0f0f0f',
    //   },
    //   'warning': colors.amber,
    //   'primary': colors.teal,
    //   'error': colors.rose,
    //   'gray': colors.gray,
    //   'success': colors.emerald,
    //   "transparent": colors.transparent,
    //   "white": colors.white
    // },
    extend: {
      fontFamily: {
        sans: ['var(--font-poppins)'],
      }
    },

  },
  daisyui: {
    themes: ['dark'],
  },
  plugins: [require('daisyui')]
}
export default config;
