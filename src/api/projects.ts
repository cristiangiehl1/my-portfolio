import type { StaticImageData } from 'next/image'

import portfolioPage from '../assets/portfolio-page.png'
import type { TechName } from './tech-stack'

interface Project {
  name: string
  techs: TechName[]
  projectRepo: string
  projectImg: StaticImageData
  projectVideo: string
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

const portfolio: Project = {
  name: 'My Portfolio',
  techs: portfolioTechs,
  projectRepo: 'https://github.com/cristiangiehl1/my-portfolio',
  projectImg: portfolioPage,
  projectVideo: '/assets/videos/portfolio-video.mp4',
}

const portfolio2: Project = {
  name: 'My Portfolio',
  techs: portfolioTechs,
  projectRepo: 'https://github.com/cristiangiehl1/my-portfolio',
  projectImg: portfolioPage,
  projectVideo: '/assets/videos/portfolio-video.mp4',
}

const portfolio3: Project = {
  name: 'My Portfolio',
  techs: portfolioTechs,
  projectRepo: 'https://github.com/cristiangiehl1/my-portfolio',
  projectImg: portfolioPage,
  projectVideo: '/assets/videos/portfolio-video.mp4',
}

const portfolio4: Project = {
  name: 'My Portfolio',
  techs: portfolioTechs,
  projectRepo: 'https://github.com/cristiangiehl1/my-portfolio',
  projectImg: portfolioPage,
  projectVideo: '/assets/videos/portfolio-video.mp4',
}

export const projects: Project[] = [
  portfolio,
  portfolio2,
  portfolio3,
  portfolio4,
]
