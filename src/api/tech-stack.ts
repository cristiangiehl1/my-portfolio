export type TechName =
  | 'JavaScript'
  | 'TypeScript'
  | 'HTML5'
  | 'CSS3'
  | 'Tailwind'
  | 'React'
  | 'Next.js'
  | 'Vite.js'
  | 'Node.js'
  | 'Python'
  | 'Django'
  | 'Fastify'
  | 'Express'
  | 'Vitest'
  | 'Playwright'
  | 'Prisma'
  | 'Knex'
  | 'GSAP'
  | 'Zod'
  | 'Git'

export interface TechStack {
  name: TechName
  iconUrl: string
}

export const techStack: TechStack[] = [
  {
    name: 'JavaScript',
    iconUrl:
      'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',
  },
  {
    name: 'TypeScript',
    iconUrl:
      'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg',
  },
  {
    name: 'HTML5',
    iconUrl:
      'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg',
  },
  {
    name: 'CSS3',
    iconUrl:
      'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg',
  },
  {
    name: 'Tailwind',
    iconUrl:
      'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg',
  },
  {
    name: 'React',
    iconUrl:
      'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
  },
  {
    name: 'Next.js',
    iconUrl:
      'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg',
  },
  {
    name: 'Vite.js',
    iconUrl:
      'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg',
  },
  {
    name: 'Node.js',
    iconUrl:
      'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg',
  },
  {
    name: 'Python',
    iconUrl:
      'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg',
  },

  {
    name: 'Django',
    iconUrl:
      'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/django/django-plain.svg',
  },
  {
    name: 'Fastify',
    iconUrl:
      'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastify/fastify-original.svg',
  },
  {
    name: 'Express',
    iconUrl:
      'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg',
  },
  {
    name: 'Vitest',
    iconUrl:
      'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitest/vitest-original.svg',
  },
  {
    name: 'Playwright',
    iconUrl:
      'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/playwright/playwright-original.svg',
  },
  {
    name: 'Prisma',
    iconUrl:
      'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prisma/prisma-original.svg',
  },
  {
    name: 'Knex',
    iconUrl:
      'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/knexjs/knexjs-original.svg',
  },

  {
    name: 'Git',
    iconUrl:
      'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg',
  },
]
