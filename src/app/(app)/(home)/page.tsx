import type { Metadata } from 'next'
import Image from 'next/image'

import Header from '@/app/components/header'
import TechStack from '@/app/components/tech-stack'

import { AnimatedText } from './animated-text'
import ProfessionalIcons from './professional-icons'

export const metadata: Metadata = {
  title: 'Home',
}

export default function Home() {
  return (
    <div className="min-h-full min-w-full">
      <Header />

      <main className="mx-10 my-4 flex flex-col items-center justify-center">
        <div className="mb-10 mt-2 flex items-center justify-between gap-4">
          <div className="flex w-full flex-col justify-between">
            <h4 className="text-xl font-bold md:text-2xl">Hello, Traveler</h4>

            <h1 className="text-2xl font-bold sm:text-3xl md:text-5xl">{`I'm Cristian Giehl`}</h1>

            <AnimatedText />

            <p className="mb-2 mt-4 max-w-[400px] text-xs leading-relaxed sm:text-base">
              Seja muito bem-vindo ao meu portfólio. Aqui você vai descobrir
              meus conhecimentos em desenvolvimento Font-end e Back-end.{' '}
            </p>
            <p className="text-xs font-bold text-green-400 sm:text-base">
              Criando experiências digitais que inspiram e transformam, do
              conceito à realidade.
            </p>

            <ProfessionalIcons />
          </div>

          <div className="animate-blob rounded-full border-4 bg-green-500 shadow-md">
            <Image
              src="https://github.com/cristiangiehl1.png"
              width={600}
              height={600}
              quality={80}
              alt=""
              className="rounded-full"
              style={{ width: 'auto' }}
            />
          </div>
        </div>

        <TechStack />
      </main>
    </div>
  )
}
