import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],

  theme: {
    extend: {
      screens: {
        'break-locale': '1244px',
        'max-sm': { max: '640px' },
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      keyframes: {
        blob: {
          '0%': { borderRadius: '50%' },
          '25%': { borderRadius: '40% 60% 30% 70% / 50% 60% 40% 50%' },
          '50%': { borderRadius: '60% 50% 70% 40% / 60% 50% 40% 70%' },
          '75%': { borderRadius: '30% 70% 50% 60% / 40% 60% 50% 70%' },
          '100%': { borderRadius: '50%' },
        },
        'move-up': {
          '0%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-3px)' },
          '100%': { transform: 'translateY(0)' },
        },
        'move-down': {
          '0%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(3px)' },
          '100%': { transform: 'translateY(0)' },
        },
        rotate: {
          '0%': {
            transform: 'rotate(0deg)',
          },
          '100%': {
            transform: 'rotate(360deg)',
          },
        },
        'fade-out': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'border-spin': {
          '100%': {
            transform: 'rotate(-360deg)',
          },
        },
      },
      animation: {
        blob: 'blob 12s ease-in-out infinite',
        'move-up': 'move-up 2s ease-in-out infinite',
        'move-down': 'move-down 2s ease-in-out infinite',
        rotate: 'rotate 3s infinite linear ',
        'rotate-reverse': 'rotate 3s infinite linear reverse',
        'fade-out': 'fade-out .7s infinite linear',
        'fade-out-reverse': 'fade-out .7s infinite linear reverse',
        'boder-spin': 'border-spin 7s linear infinite',
      },
    },
  },
  plugins: [],
}
export default config
