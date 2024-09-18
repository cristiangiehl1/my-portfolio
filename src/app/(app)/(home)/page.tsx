import type { Metadata } from 'next'

import Header from '@/app/components/header'
import TechStack from '@/app/components/tech-stack'

import HomePortfolio from './home-portfolio'
import HomeTextAndImage from './home-text-and-image'

export const metadata: Metadata = {
  title: 'Home',
}

export default function Home() {
  return (
    <div className="min-h-full min-w-full overflow-x-hidden">
      <Header />

      <main className="mx-10 mt-6 flex flex-col items-center justify-center">
        <HomeTextAndImage />
        <TechStack />
      </main>

      <HomePortfolio />

      <section>About</section>
      <section>Contact</section>
    </div>
  )
}
