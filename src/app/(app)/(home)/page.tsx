import './styles.css'

import type { Metadata } from 'next'

import ContactSection from '@/app/components/contact-section'
import Footer from '@/app/components/footer'
import Header from '@/app/components/header'

import HomePortfolio from './components/home-portfolio'
import HomeTextAndImage from './components/home-text-and-image'
import TechStack from './components/tech-stack'

export const metadata: Metadata = {
  title: 'Home',
}

export default function Home() {
  return (
    <div className="relative min-h-full min-w-full overflow-x-hidden">
      <Header />

      <main className="mx-10 mt-10 flex min-h-screen flex-col items-center justify-center">
        <HomeTextAndImage />
        <TechStack />
      </main>

      <HomePortfolio />

      <ContactSection />
      <Footer />
    </div>
  )
}
