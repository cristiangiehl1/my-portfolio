import type { StaticImageData } from 'next/image'

import portfolioPage from '../assets/portfolio-page.png'
import type { TechName } from './tech-stack'

interface Project {
  name: string
  techs: TechName[]
  projectRepo: string
  projectImg: StaticImageData
}

const portfolioTechs: TechName[] = [
  'HTML5',
  'CSS3',
  'Tailwind',
  'React',
  'Next.js',
  'TypeScript',
  'GSAP',
]

const portfolio = {
  name: 'My Portfolio',
  techs: portfolioTechs,
  projectRepo: 'https://github.com/cristiangiehl1/my-portfolio',
  projectImg: portfolioPage,
}

const portfolio2 = {
  name: 'My Portfolio',
  techs: portfolioTechs,
  projectRepo: 'https://github.com/cristiangiehl1/my-portfolio',
  projectImg: portfolioPage,
}

const portfolio3 = {
  name: 'My Portfolio',
  techs: portfolioTechs,
  projectRepo: 'https://github.com/cristiangiehl1/my-portfolio',
  projectImg: portfolioPage,
}

const portfolio4 = {
  name: 'My Portfolio',
  techs: portfolioTechs,
  projectRepo: 'https://github.com/cristiangiehl1/my-portfolio',
  projectImg: portfolioPage,
}

export const projects: Project[] = [
  portfolio,
  portfolio2,
  portfolio3,
  portfolio4,
]
