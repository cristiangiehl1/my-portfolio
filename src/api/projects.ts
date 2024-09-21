import type { StaticImageData } from 'next/image'

import portfolioPage from '../assets/portfolio-page.png'
import type { TechName } from './tech-stack'

interface Project {
  id: string
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
  id: '1-0',
  name: 'My Portfolio',
  techs: portfolioTechs,
  projectRepo: 'https://github.com/cristiangiehl1/my-portfolio',
  projectImg: portfolioPage,
  projectVideo: '/assets/videos/portfolio-video.mp4',
}

const portfolio2: Project = {
  id: '1-1',
  name: 'My Portfolio',
  techs: portfolioTechs,
  projectRepo: 'https://github.com/cristiangiehl1/my-portfolio',
  projectImg: portfolioPage,
  projectVideo: '/assets/videos/portfolio-video.mp4',
}

const portfolio3: Project = {
  id: '1-2',
  name: 'My Portfolio',
  techs: portfolioTechs,
  projectRepo: 'https://github.com/cristiangiehl1/my-portfolio',
  projectImg: portfolioPage,
  projectVideo: '/assets/videos/portfolio-video.mp4',
}

const portfolio4: Project = {
  id: '2-0',
  name: 'My Portfolio',
  techs: portfolioTechs,
  projectRepo: 'https://github.com/cristiangiehl1/my-portfolio',
  projectImg: portfolioPage,
  projectVideo: '/assets/videos/portfolio-video.mp4',
}

const portfolio5: Project = {
  id: '2-1',
  name: 'My Portfolio',
  techs: portfolioTechs,
  projectRepo: 'https://github.com/cristiangiehl1/my-portfolio',
  projectImg: portfolioPage,
  projectVideo: '/assets/videos/portfolio-video.mp4',
}

const portfolio6: Project = {
  id: '3-0',
  name: 'My Portfolio',
  techs: portfolioTechs,
  projectRepo: 'https://github.com/cristiangiehl1/my-portfolio',
  projectImg: portfolioPage,
  projectVideo: '/assets/videos/portfolio-video.mp4',
}

const portfolio7: Project = {
  id: '3-1',
  name: 'My Portfolio',
  techs: portfolioTechs,
  projectRepo: 'https://github.com/cristiangiehl1/my-portfolio',
  projectImg: portfolioPage,
  projectVideo: '/assets/videos/portfolio-video.mp4',
}

const portfolio8: Project = {
  id: '3-2',
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
  portfolio5,
  portfolio6,
  portfolio7,
  portfolio8,
]
