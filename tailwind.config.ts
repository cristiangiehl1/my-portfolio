import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
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
      },
      animation: {
        blob: 'blob 12s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
export default config
