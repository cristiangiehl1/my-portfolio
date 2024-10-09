import './styles.css'

import type { Metadata } from 'next'

import GalleryContainer from './components/gallery-container'
import OrbitalPortfolio from './components/orbital-portfolio'
import PortFolioHeader from './components/portfolio-header'

export const metadata: Metadata = {
  title: 'Portfolio',
}

export default function Portfolio() {
  return (
    <div className="projects-container relative h-screen w-full overflow-hidden">
      <PortFolioHeader />

      <OrbitalPortfolio />

      <GalleryContainer />
    </div>
  )
}
