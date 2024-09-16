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
    <div className="min-h-full min-w-full overflow-x-hidden">
      <Header />

      <div className="absolute left-[32vw] top-0 flex items-center justify-center gap-2 rounded-b-3xl bg-neutral-950 px-6 pb-2 pt-5 shadow-sm shadow-black sm:left-[20vw]">
        <span className="whitespace-nowrap text-xs font-bold text-white">
          Located in Brazil
        </span>
        <div className="relative flex items-center justify-center rounded-full bg-gray-300 p-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="animate-rotate size-4 text-black"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
            />
          </svg>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="animate-rotate-reverse absolute size-6 -translate-x-1/2 -translate-y-1/2 text-black"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
            />
          </svg>
        </div>
      </div>

      <main className="mx-10 mt-6 flex flex-col items-center justify-center">
        <div className="mb-6 flex items-center justify-start gap-4">
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

          <div className="relative flex flex-col gap-4">
            <div className="animate-blob rounded-full border-4 bg-green-500 shadow-md">
              <Image
                src="https://github.com/cristiangiehl1.png"
                width={600}
                height={600}
                quality={80}
                alt=""
                className="rounded-full"
                style={{ width: 'auto' }}
                priority
              />
            </div>
          </div>
        </div>

        <TechStack />
      </main>
    </div>
  )
}
