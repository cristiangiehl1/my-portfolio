'use client'

import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRef } from 'react'

import ContactSection from '@/app/components/contact-section'
import Footer from '@/app/components/footer'
import Header from '@/app/components/header'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

export default function About() {
  const aboutRef = useRef<HTMLDivElement>(null)
  const scrollTween = useRef<gsap.core.Tween | null>(null)
  const snapTriggers = useRef<ScrollTrigger[]>([])

  const { contextSafe } = useGSAP(
    () => {
      const panels = gsap.utils.toArray<HTMLElement>('.section')
      let scrollStarts = [0]
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      let snapScroll = (value: number, direction?: number) => value

      panels.forEach((panel, i) => {
        if (i === 1) {
          snapTriggers.current[i] = ScrollTrigger.create({
            trigger: panel,
            start: 'top top',
            pin: true,
          })
        } else {
          snapTriggers.current[i] = ScrollTrigger.create({
            trigger: panel,
            start: 'top top',
          })
        }

        if (i === 1) {
          ScrollTrigger.create({
            trigger: '.pinned',
            start: 'top 80%',
            endTrigger: panel,
            end: '49% center',
            pin: true,
            pinSpacing: false,
            markers: false,
            onUpdate: (self) => {
              const progress = self.progress
              const rotation = progress * 360
              const clipPath = `polygon(
              ${45 - 45 * progress}% ${0 + 0 * progress}%,
              ${55 + 45 * progress}% ${0 + 0 * progress}%,
              ${55 + 45 * progress}% ${100 - 0 * progress}%, 
              ${45 - 45 * progress}% ${100 - 0 * progress}%)`

              gsap.to('.revelear', { rotation })
              gsap.to('.revelear-1, .revelear-2', {
                clipPath,
                ease: 'none',
                duration: 0,
              })
            },
          })
        }

        if (i === 2) {
          ScrollTrigger.create({
            trigger: '.pinned',
            start: 'center 80%',
            endTrigger: panel,
            end: '49% center',
            pin: true,
            pinSpacing: false,
            markers: true,
            onUpdate: (self) => {
              const screenWidth = window.innerWidth
              const progress = self.progress
              const left = 40 + ((screenWidth - 80 - 40) / 2) * progress

              gsap.to('.pinned', {
                left: `${left}px`,
                ease: 'none',
                duration: 0,
              })
            },
          })
        }
      })

      ScrollTrigger.addEventListener('refresh', () => {
        scrollStarts = snapTriggers.current.map((trigger) => trigger.start)
        snapScroll = ScrollTrigger.snapDirectional(scrollStarts)
      })

      ScrollTrigger.observe({
        type: 'wheel,touch',
        onChangeY(self) {
          const scroll = snapScroll(
            self.scrollY() + self.deltaY,
            self.deltaY > 0 ? 1 : -1,
          )

          goToSection(scrollStarts.indexOf(scroll))
        },
      })

      ScrollTrigger.refresh()
    },
    { scope: aboutRef, revertOnUpdate: true },
  )

  const goToSection = contextSafe((i: number) => {
    const targetY = snapTriggers.current[i].start

    scrollTween.current = gsap.to(window, {
      scrollTo: {
        y: targetY,
        autoKill: false,
      },
      duration: 0.3,
      overwrite: true,
      onComplete: () => (scrollTween.current = null),
    })
  })

  return (
    <div
      ref={aboutRef}
      className="relative min-h-screen w-full overflow-x-hidden"
    >
      <Header />

      <main className="contact-hero w-full">
        <section
          id=""
          className="section flex min-h-[100vh] w-full flex-col items-center justify-center bg-slate-500 px-24 pt-24"
        >
          <h1 className="text-4xl font-bold tracking-tighter">
            Turning ideas into solutions that make an impact
          </h1>

          <p className="leading-relaxed">
            {`Passionate about exploring new technologies and discovering
            innovative ways to turn concepts into reality.`}
          </p>
        </section>

        <section className="section flex min-h-[200vh] w-full flex-col items-center justify-start bg-slate-600 px-6 pt-[50vh] md:px-24">
          <h2 className="text-3xl font-bold">Soft Skills</h2>
          <div className="mt-10 flex gap-4">
            <div className="flex flex-col gap-2">
              <span>Communication</span>
              <span>Teamwork</span>
              <span>Adaptability</span>
            </div>
            <div className="flex flex-col gap-2">
              <span>Problem-Solving</span>
              <span>Work Ethic</span>
              <span>Teste</span>
            </div>
          </div>
        </section>

        <section
          id="help-with"
          className="website-content section flex min-h-[110vh] w-full flex-col items-center justify-center bg-slate-700 px-24 py-32"
        >
          <h2 className="text-3xl font-bold">I can help you with...</h2>

          <div className="mt-14 flex w-full flex-col justify-between gap-16 md:flex-row">
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

      <section className="pinned absolute left-10 top-[80vh] z-10 flex items-center justify-center bg-red-500">
        <div className="revelear relative mt-20 rounded-full">
          <div
            className="revelear-1 z-100 absolute left-1/2 top-1/2 h-10 w-10 bg-orange-200"
            style={{
              clipPath: 'polygon(45% 0%, 55% 0%, 55% 100%, 45% 100%)',
              transform: 'translate(-50%, -50%)',
            }}
          ></div>

          <div
            className="revelear-2 z-100 absolute left-1/2 top-1/2 h-10 w-10 bg-orange-200"
            style={{
              clipPath: 'polygon(45% 0%, 55% 0%, 55% 100%, 45% 100%)',
              transform: 'rotate(90deg) translate(-50%, +50%)',
            }}
          ></div>
        </div>
      </section>

      <ContactSection />

      <Footer />
    </div>
  )
}
