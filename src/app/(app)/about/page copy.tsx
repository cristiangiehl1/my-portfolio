'use client'

import './styles.css'

import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import { useRef } from 'react'

import ContactSection from '@/app/components/contact-section'
import Footer from '@/app/components/footer'
import Header from '@/app/components/header'
import aboutImg from '@/assets/about-img.jpeg'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

export default function About() {
  const aboutRef = useRef<HTMLDivElement>(null)

  function getClipPath(panelIndex: number, progress: number): string {
    switch (panelIndex) {
      case 0:
        return `polygon(
          ${45 - 45 * progress}% 0%,
          ${55 + 45 * progress}% 0%,
          ${55 + 45 * progress}% 100%,
          ${45 - 45 * progress}% 100%
        )`
      case 1:
        return `ellipse(${40 + 60 * progress}% ${50 + 50 * progress}% at 50% 50%)`

      case 2:
        return `circle(${50 + 50 * progress}% at 50% 50%)`
      default:
        return 'none'
    }
  }

  useGSAP(
    () => {
      ScrollTrigger.create({
        trigger: '#app-header',
        pin: true,
        pinSpacing: false,
        scrub: 1,
        start: 'top top',
        endTrigger: '#app-footer',
      })

      gsap.to('.revelear', {
        opacity: 1,
        duration: 2,
        ease: 'none',
      })

      ScrollTrigger.create({
        trigger: aboutRef.current,
        start: 'top top',
        end: '80% 15%',
        pin: '.pinned',
        pinSpacing: false,
        markers: false,
        onUpdate: (self) => {
          const progress = self.progress
          gsap.to('.revelear-1, .revelear-2', {
            backgroundColor: `hsl(${169 + progress * 191}%, 100%, ${100 - progress * 50}%)`,
          })
        },
      })

      const panels = gsap.utils.toArray<HTMLElement>('.panel')

      panels.forEach((panel, i) => {
        const children = panel.querySelectorAll('*')

        const tl = gsap.timeline()

        let animation: gsap.core.Animation = tl.to('.panel', {})

        ScrollTrigger.create({
          trigger: panel,
          start: 'top top',
          end: '90% top',
          scrub: 1,
          pinSpacing: false,
          markers: true,
          onUpdate: (self) => {
            const progress = self.progress
            const rotation = 360 * i + progress * 360

            const clipPath = getClipPath(i, progress)

            let left = 3
            let top = 16

            if (i === 1) {
              left = 3 + progress * 47
            }

            if (i === 2) {
              left = 50 - progress * 46
              top = 16 + progress * 59
            }

            if (i === 3) {
              left = 4
              top = 75
            }

            gsap.to('.pinned', { left: `${left}%`, top: `${top}vh` })
            gsap.to('.revelear', { rotation })
            gsap.to('.revelear-1, .revelear-2', {
              clipPath,
              ease: 'none',
              duration: 0,
            })
          },
        })

        if (i === 0) {
          animation = tl.from('.help-with-element', {
            y: 0,
            opacity: 1,
            duration: 2,
            stagger: {
              amount: 0.3,
            },
          })

          gsap.to(children, {
            y: 0,
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1,
            ease: 'power4.inOut',
          })
        }

        if (i === 2) {
          animation = tl
            .to('.soft-skills', {
              gap: '350px',
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
        }

        ScrollTrigger.create({
          trigger: panel,
          start: 'top top',
          pin: true,
          pinSpacing: false,
          scrub: 1,
        })

        ScrollTrigger.create({
          trigger: panel,
          start: 'top top',
          end: '20% bottom',
          scrub: 1,
          markers: false,
          id: panel.id,
          animation,
        })
      })
    },
    { scope: aboutRef, revertOnUpdate: true },
  )

  return (
    <div
      ref={aboutRef}
      className="relative min-h-screen w-full overflow-x-hidden"
    >
      <Header />

      <main className="contact-hero w-full">
        <section className="panel flex min-h-[100vh] w-full items-center justify-between gap-6 overflow-hidden bg-slate-500 px-24 pt-32">
          <div
            className="flex h-full w-full translate-y-full flex-col items-center justify-start"
            style={{ clipPath: 'inset(100% 0% 0% 0%)' }}
          >
            <h1 className="text-5xl font-bold leading-snug tracking-tighter">
              Turning ideas into solutions that make an impact
            </h1>
            <p className="leading-relaxed">
              {`Passionate about exploring new technologies and discovering
              innovative ways to turn concepts into reality.`}
            </p>
          </div>

          <div
            className="flex h-full w-full translate-y-full items-start justify-center"
            style={{ clipPath: 'inset(100% 0% 0% 0%)' }}
          >
            <Image
              src={aboutImg}
              alt=""
              width={400}
              height={400}
              quality={100}
              priority
              className="object-fill p-2"
              style={{
                boxShadow:
                  'rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px',
              }}
            />
          </div>
        </section>

        <section className="website-content panel flex min-h-[110vh] w-full flex-col items-center justify-center overflow-hidden bg-slate-700 px-20 py-20">
          <h2 className="help-with-element w-full text-left text-3xl font-bold">
            I can help you with...
          </h2>

          <div className="mt-4 flex w-full flex-col justify-between gap-6 sm:flex-row lg:gap-16">
            <div className="help-with-element w-full">
              <div className="w-full border-b-[2px] pb-4">
                <span className="text-xs font-bold">01</span>
              </div>

              <h3 className="mb-2 pt-4 text-2xl font-bold">Front-End</h3>

              <p>
                I build websites from scratch. My focus is on micro animations,
                transitions and interaction. Building with GSAP.
              </p>
            </div>

            <div className="help-with-element w-full">
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

            <div className="help-with-element w-full">
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

        <section className="panel relative flex min-h-[110vh] w-full flex-col items-center justify-center overflow-hidden bg-slate-600 px-6">
          <h2 className="absolute text-6xl font-bold">Soft Skills</h2>

          <div className="soft-skills flex w-full items-center justify-center gap-4">
            <div
              className="soft-skills-l z-10 flex flex-col gap-6 rounded-2xl bg-slate-900 p-6 text-2xl"
              style={{
                boxShadow:
                  'rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;',
              }}
            >
              <span>Communication</span>
              <span>Teamwork</span>
              <span>Adaptability</span>
            </div>
            <div
              className="soft-skills-r z-10 flex flex-col gap-6 rounded-2xl bg-green-700 p-6 text-2xl"
              style={{
                boxShadow:
                  'rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;',
              }}
            >
              <span className="">Problem-Solving</span>
              <span>Work Ethic</span>
              <span>Time Management</span>
            </div>
          </div>
        </section>
      </main>

      <section className="pinned absolute left-[3%] top-[16vh] z-10 flex items-center justify-center">
        <div className="revelear relative mt-20 rounded-full opacity-0">
          <div
            className="revelear-1 z-100 absolute left-1/2 top-1/2 h-10 w-10 bg-white"
            style={{
              clipPath: 'polygon(45% 0%, 55% 0%, 55% 100%, 45% 100%)',
              transform: 'translate(-50%, -50%)',
            }}
          ></div>

          <div
            className="revelear-2 z-100 absolute left-1/2 top-1/2 h-10 w-10 bg-white"
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
