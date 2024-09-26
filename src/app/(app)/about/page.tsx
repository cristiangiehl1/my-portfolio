'use client'

import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'

import ContactSection from '@/app/components/contact-section'
import Footer from '@/app/components/footer'
import Header from '@/app/components/header'
import contactImage from '@/assets/planet-original.png'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.contact-hero',
        start: '1200px 80%',
        end: 'bottom 20%',
        /**
         se estiver o scrub: false, a animação irá ocorrer completa assim que chegar no 
         start. Além disso, podemos usar o duration nas animações para definir
         o tempo de execução.
        */
        scrub: true,
        markers: false,
        /**
         onEnter onLeave onEnterBack onLeaveBack
         actions = play, pause, 
        */
        toggleActions: '',
      },
    })

    tl.to('.contact-hero', {})
  })

  return (
    <div className="relative min-h-screen w-full">
      <Header />

      <main className="contact-hero w-full px-10 pb-48 pt-14">
        <h1 className="text-4xl font-bold tracking-tighter">
          Turning ideas into solutions that make an impact
        </h1>

        <section id="" className="mt-10 flex flex-col leading-relaxed">
          <p>
            {`Passionate about exploring new technologies and discovering
            innovative ways to turn concepts into reality.`}
          </p>

          <Image src={contactImage} alt="" width={600} height={600} />
        </section>

        <section id="help-with" className="help-with mt-10 w-full">
          <h2 className="text-3xl font-bold">I can help you with...</h2>

          <div className="mt-14 flex w-full justify-between gap-16">
            <div className="help-with-option w-full">
              <div className="w-full border-b-[2px] pb-4">
                <span className="text-xs font-bold">01</span>
              </div>

              <h3 className="mb-2 pt-4 text-2xl font-bold">Front-End</h3>

              <p>
                I build websites from scratch. My focus is on micro animations,
                transitions and interaction. Building with GSAP.
              </p>
            </div>

            <div className="help-with-option w-full">
              <div className="w-full border-b-[2px] pb-4">
                <span className="text-xs font-bold">02</span>
              </div>

              <h3 className="mb-2 pt-4 text-2xl font-bold">Back-End</h3>

              <p>
                I build APIs from the ground up. My focus is on creating
                efficient architectures, optimizing performance, and ensuring
                scalability. Building with Node.js, Zod, and Prisma.
              </p>
            </div>

            <div className="help-with-option w-full">
              <div className="w-full border-b-[2px] pb-4">
                <span className="text-xs font-bold">03</span>
              </div>

              <h3 className="mb-2 pt-4 text-2xl font-bold">Full-Stack</h3>
              <p>
                I create complete websites with custom APIs to ensure optimal
                performance and efficiency. From intuitive front-end interfaces
                to high-performance back-end systems, I focus on building fast,
                scalable solutions that deliver a seamless user experience.{' '}
              </p>
            </div>
          </div>
        </section>
      </main>

      <ContactSection />

      <Footer />
    </div>
  )
}
