import './styles.css'

import type { Metadata } from 'next'

import Footer from '@/app/components/footer'

import AboutHero from './components/about-hero'

export const metadata: Metadata = {
  title: 'About',
}

export default function About() {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      <AboutHero />
      <Footer />
    </div>
  )
}
