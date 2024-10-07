import './styles.css'

import type { Metadata } from 'next'

import Footer from '@/app/components/footer'
import Header from '@/app/components/header'

import AboutHero from './components/about-hero'

export const metadata: Metadata = {
  title: 'About',
}

export default function About() {
  return (
    <div
      className="relative z-0 min-h-full min-w-full overflow-x-hidden"
      id="about-page-container"
    >
      <Header />

      <AboutHero />

      <Footer />
    </div>
  )
}
