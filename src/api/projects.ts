import type { StaticImageData } from 'next/image'

import portfolioPage from '../assets/portfolio-page.png'
import type { TechName } from './tech-stack'

export interface Project {
  id: string
  name: string
  techs: TechName[]
  projectRepo: string
  projectImg: StaticImageData
  projectVideo: string
  deploy?: string
}

const defaultProject: Omit<Project, 'id'> = {
  name: 'My Portfolio',
  techs: [
    'HTML5',
    'CSS3',
    'Tailwind',
    'React',
    'Next.js',
    'TypeScript',
    'GSAP',
    'Zod',
  ],
  projectRepo: 'https://github.com/cristiangiehl1/my-portfolio',
  projectImg: portfolioPage,
  projectVideo: '/assets/videos/portfolio-video.mp4',
}

function createProject(id: string): Project {
  return { id, ...defaultProject }
}

export const projects: Project[] = [
  createProject('1-0'),
  createProject('1-1'),
  createProject('1-2'),
  createProject('2-0'),
  createProject('2-1'),
  createProject('3-0'),
  createProject('3-1'),
  createProject('3-2'),
]

// const projectPortfolio = {
//   name: 'My Portfolio',
//   techs: [
//     'HTML5',
//     'CSS3',
//     'Tailwind',
//     'React',
//     'Next.js',
//     'TypeScript',
//     'GSAP',
//   ],
//   projectRepo: 'https://github.com/cristiangiehl1/my-portfolio',
//   projectImg: portfolioPage,
//   projectVideo: '/assets/videos/portfolio-video.mp4',
//   deploy: 'https://cristiangiehl.com.br/',
// }
