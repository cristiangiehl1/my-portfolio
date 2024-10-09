'use client'

import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import { useRef } from 'react'
import { FaPlus } from 'react-icons/fa'
import { PiFirstAidBold, PiStarFourFill } from 'react-icons/pi'

import ContactSection from '@/app/components/contact-section'
import aboutImg from '@/assets/about-img.jpeg'

// import KnightGame from './knight-game'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

export default function AboutHero() {
  const aboutRef = useRef<HTMLDivElement>(null)
  const scrollTween = useRef<gsap.core.Tween | null>(null)
  const snapTriggers = useRef<ScrollTrigger[]>([])

  const { contextSafe } = useGSAP(
    () => {
      function calcWindowWidth() {
        return window.innerWidth
      }

      const panels = gsap.utils.toArray<HTMLElement>('.panel')

      let scrollStarts = [0]
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      let snapScroll = (value: number, direction?: number) => value

      function createScrollTriggers() {
        panels.forEach((panel, i) => {
          const children = panel.querySelectorAll('*')

          const tl = gsap.timeline()

          let animation: gsap.core.Animation = tl.to('.panel', {})

          let start = 'top top'
          let end = 'bottom top'

          if (i > 0) {
            start = '2% top'
          }

          if (i === panels.length) {
            end = 'top top'
          }

          snapTriggers.current[i] = ScrollTrigger.create({
            trigger: panel,
            start,
            end,
            scrub: 1,
            pinSpacing: false,
            markers: false,
            id: 'about-hero-scrolltrigger',
          })

          if (i === 0) {
            gsap.to(children, {
              y: 0,
              opacity: 1,
              duration: 0.3,
              ease: 'power4.inOut',
            })
          } else if (i === 1) {
            animation = tl
              .to('.help-with-element', {
                x: 0,
                opacity: 1,
                duration: 2,
                stagger: {
                  amount: 15,
                },
              })
              .to('.help-with-element-heading', {
                y: 0,
                opacity: 1,
                duration: 2,
              })
          } else if (i === 2) {
            animation = tl
              .to('.soft-skills', {
                gap: '40px',
                duration: 2,
              })
              .to('.soft-skills-l', {
                transform: 'rotate(10deg)',
                delay: -1,
              })
              .to('.soft-skills-r', {
                transform: 'rotate(-10deg)',
                delay: -1,
              })
              .to('.soft-skills-heading', {
                opacity: 1,
                height: 'auto',
                width: 'auto',
                delay: 0.5,
              })
          }

          ScrollTrigger.create({
            trigger: panel,
            start: 'top top',
            end: '20% bottom',
            scrub: 1,
            markers: false,
            animation,
            id: 'about-hero-scrolltrigger',
          })

          ScrollTrigger.create({
            trigger: panel,
            start: 'top top',
            pin: true,
            pinSpacing: false,
            scrub: 1,
            id: 'about-hero-scrolltrigger',
          })
        })

        ScrollTrigger.addEventListener('refresh', () => {
          scrollStarts = snapTriggers.current.map((trigger) => trigger.start)
          snapScroll = ScrollTrigger.snapDirectional(scrollStarts)
        })

        let timeoutId: NodeJS.Timeout | null = null
        let lastScroll: number | null = null

        ScrollTrigger.observe({
          type: 'wheel, touch',
          onChangeY(self) {
            lastScroll = snapScroll(
              self.scrollY() + self.deltaY,
              self.deltaY > 0 ? 1 : -1,
            )

            if (timeoutId) {
              clearTimeout(timeoutId)
            }

            timeoutId = setTimeout(() => {
              if (lastScroll !== null) {
                const windowWidth = calcWindowWidth()

                if (windowWidth > 638) {
                  goToSection(scrollStarts.indexOf(lastScroll))
                }
              }

              lastScroll = null
            }, 300)
          },
        })

        ScrollTrigger.refresh()
      }

      if (aboutRef.current) {
        createScrollTriggers()
      }

      return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
      }
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
      duration: 0.2,
      overwrite: true,
      onComplete: () => (scrollTween.current = null),
    })
  })

  return (
    <div
      ref={aboutRef}
      className="relative z-0 min-h-screen w-full overflow-x-hidden"
    >
      <main className="contact-hero z-0 min-h-screen w-full">
        <section className="panel relative flex min-h-[110vh] w-full flex-col items-start justify-start gap-6 overflow-hidden bg-slate-500 px-8 pt-24 md:flex-row md:justify-between md:px-20 md:pt-32">
          <div className="flex w-full translate-y-full flex-col items-center justify-start gap-4 opacity-0 md:h-full">
            <h1 className="relative text-2xl font-bold leading-snug tracking-tighter md:text-5xl">
              Turning{' '}
              <span className="text-about-animation px-2 text-yellow-300">
                ideas
              </span>{' '}
              into solutions that make an impact
              <PiStarFourFill className="absolute -left-7 top-1 rotate-[75deg] text-2xl sm:-left-10 sm:top-2 sm:text-4xl" />
            </h1>

            <p className="w-full text-center text-sm leading-relaxed sm:text-left sm:text-base">
              {`Passionate about exploring new technologies and discovering
                innovative ways to turn concepts into reality.`}
            </p>
            {/* <KnightGame /> */}
          </div>

          <div className="flex h-full w-full translate-y-full items-start justify-center opacity-0">
            <Image
              src={aboutImg}
              alt=""
              width={500}
              height={500}
              quality={100}
              priority
              className="about-img h-[40vh] bg-white object-cover p-2 md:h-[70vh]"
              style={{
                boxShadow:
                  ' rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px',
              }}
            />
          </div>
        </section>

        <section className="website-content panel flex min-h-[110vh] w-full flex-col items-center justify-start overflow-hidden bg-slate-700 p-8 sm:justify-center md:p-16">
          <h2 className="help-with-element-heading w-full text-left text-2xl font-bold text-purple-300 md:text-3xl">
            I can help you with<span className="dot-appear">...</span>
            <PiFirstAidBold className="absolute -left-7 top-1 text-2xl sm:-left-10 sm:top-0 sm:text-4xl" />
          </h2>

          <div className="mt-4 flex w-full flex-col justify-between gap-6 sm:flex-row lg:gap-16">
            <div className="help-with-element w-full">
              <div className="w-full border-b-[2px] border-gray-300 pb-4">
                <span className="text-xs font-bold text-gray-300">01</span>
              </div>

              <h3 className="mb-2 pt-4 text-xl font-bold text-purple-300 md:text-2xl">
                Front-End
              </h3>

              <p className="text-sm md:text-base">
                I build websites from scratch. My focus is on micro animations,
                transitions and interaction. Building with GSAP.
              </p>
            </div>

            <div className="help-with-element w-full">
              <div className="w-full border-b-[2px] border-gray-300 pb-4">
                <span className="text-xs font-bold text-gray-300">02</span>
              </div>

              <h3 className="mb-2 pt-4 text-xl font-bold text-purple-300 md:text-2xl">
                Back-End
              </h3>

              <p className="text-sm md:text-base">
                I build APIs from the ground up. My focus is on creating
                efficient architectures, optimizing performance, and ensuring
                scalability. Building with Node.js, Zod, and Prisma.
              </p>
            </div>

            <div className="help-with-element w-full">
              <div className="w-full border-b-[2px] border-gray-300 pb-4">
                <span className="text-xs font-bold text-gray-300">03</span>
              </div>

              <h3 className="mb-2 pt-4 text-xl font-bold text-purple-300 md:text-2xl">
                Full-Stack
              </h3>
              <p className="text-sm md:text-base">
                I create complete websites with custom APIs to ensure optimal
                performance and efficiency. From intuitive front-end interfaces
                to high-performance back-end systems, I focus on building fast,
                scalable solutions that deliver a seamless user experience.{' '}
              </p>
            </div>
          </div>
        </section>

        <section className="panel relative flex min-h-[110vh] w-full flex-col items-center overflow-hidden bg-slate-600 px-6 pt-[20vw] sm:justify-center sm:pt-0">
          <div className="soft-skills flex w-full flex-col items-center justify-center gap-4 lg:flex-row">
            <div
              className="soft-skills-l relative z-10 flex min-w-[200px] flex-col gap-6 rounded-2xl bg-slate-900 p-6 text-base md:min-w-[250px] md:text-2xl"
              style={{
                boxShadow:
                  'rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;',
              }}
            >
              <span>Communication</span>
              <span>Teamwork</span>
              <span>Adaptability</span>
            </div>

            <div className="soft-skills-heading flex h-0 w-0 items-center justify-center gap-2 text-4xl font-bold opacity-0 md:text-6xl">
              <span className="cloudy text-yellow-500">Soft</span>
              <span>
                <FaPlus className="text-slate-900" />
              </span>
              <span className="target">Skills</span>
            </div>

            <div
              className="soft-skills-r z-10 flex min-w-[200px] flex-col gap-6 rounded-2xl bg-slate-900 p-6 text-base md:min-w-[250px] md:text-2xl"
              style={{
                boxShadow:
                  'rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;',
              }}
            >
              <span>Problem-Solving</span>
              <span>Work Ethic</span>
              <span>Time Management</span>
            </div>
          </div>
        </section>
      </main>

      <ContactSection />
    </div>
  )
}
