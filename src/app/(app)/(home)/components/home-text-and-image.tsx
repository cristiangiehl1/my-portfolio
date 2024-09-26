'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import Image from 'next/image'

import { TypeWriteText } from '@/app/components/type-write-text'

import ExternalLinksAndResume from './external-links-and-resume'

export default function HomeTextAndImage() {
  useGSAP(() => {
    gsap.to('.home-text-container-clip-path', {
      clipPath: 'inset(0% 0% 0% 0%)',
      duration: 1.2,
      delay: 0.4,
      ease: 'power3.inOut',
    })

    gsap.to('.home-circle-container-clip-path', {
      clipPath: 'circle(60%)',
      duration: 1.5,
      delay: 0.6,
      ease: 'power3.inOut',
    })
  })

  return (
    <section className="mb-3 flex items-center justify-start gap-4">
      <div className="flex w-full flex-col justify-between">
        <h4 className="home-text-container-clip-path text-xl font-bold md:text-2xl">
          Hello, Traveler
        </h4>

        <h1 className="home-text-container-clip-path text-2xl font-bold sm:text-3xl md:text-5xl">{`I'm Cristian Giehl`}</h1>

        <div className="home-text-container-clip-path flex items-center">
          <span className="text-sm md:text-3xl">{'<'}</span>
          <TypeWriteText
            texts={['FullStack Developer']}
            className="text-sm text-green-500 md:text-3xl"
          />
          <span className="text-sm md:text-3xl"> {'/>'}</span>
        </div>

        <p className="home-text-container-clip-path mb-2 mt-4 max-w-[400px] text-xs leading-relaxed sm:text-base">
          Seja muito bem-vindo ao meu portfólio. Aqui você vai descobrir meus
          conhecimentos em desenvolvimento Font-end e Back-end.{' '}
        </p>
        <p className="home-text-container-clip-path text-xs font-bold text-green-400 sm:text-base">
          Criando experiências digitais que inspiram e transformam, do conceito
          à realidade.
        </p>

        <ExternalLinksAndResume />
      </div>

      <div className="relative flex flex-col gap-4">
        <div className="home-circle-container-clip-path animate-blob rounded-full border-4 bg-green-500 shadow-md">
          <Image
            src="https://github.com/cristiangiehl1.png"
            width={600}
            height={600}
            quality={80}
            alt=""
            className="rounded-full"
            style={{ width: 'auto' }}
            sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
            loading="eager"
          />
        </div>
      </div>
    </section>
  )
}
