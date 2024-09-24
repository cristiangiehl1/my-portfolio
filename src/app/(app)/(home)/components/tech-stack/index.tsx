'use client'

import './styles.css'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import Image from 'next/image'
import { useEffect, useRef } from 'react'

import { type TechStack, techStack } from '@/api/tech-stack'
import robot from '@/assets/robot.svg'
import robotBlink from '@/assets/robot-blink.svg'

export default function TechStack() {
  function splitTechStack(techStack: TechStack[]) {
    const halfLength = Math.ceil(techStack.length / 2)
    const firstHalf = techStack.slice(0, halfLength)
    const secondHalf = techStack.slice(halfLength)

    return [firstHalf, secondHalf]
  }

  const [firstArray, secondArray] = splitTechStack(techStack)

  const pageContent = useRef(null)

  useGSAP(() => {
    gsap.to('.text-box', {
      opacity: 1,
      ease: 'power4.inOut',
      delay: 1.5,
      stagger: {
        amount: 0.3,
      },
    })

    gsap.to('.text-box1', {
      opacity: 1,
      ease: 'power4.inOut',
      delay: 1.5,
      stagger: {
        amount: 0.3,
      },
    })

    gsap.to('.text-box', {
      y: 0,
      ease: 'power4.inOut',
      delay: 2.2,
      stagger: {
        amount: 0.3,
      },
    })

    gsap.to('.text-box1', {
      y: 0,
      ease: 'power4.inOut',
      delay: 2.2,
      stagger: {
        amount: 0.3,
      },
    })

    gsap.to('.scroller', {
      y: 0,
      opacity: 1,
      ease: 'power4.inOut',
      delay: 2.5,
    })
  }, [pageContent])

  useEffect(() => {
    const scrollers = document.querySelectorAll('.scroller')

    function addAnimation() {
      scrollers.forEach((scroller) => {
        scroller.setAttribute('data-animated', 'true')

        const scrollerInners = scroller.querySelectorAll('.scroller__inner')

        if (scrollerInners) {
          scrollerInners.forEach((scrollerInner) => {
            const scrollerContent = Array.from(scrollerInner.children)

            scrollerContent.forEach((item) => {
              const duplicatedItem = item.cloneNode(true) as HTMLElement
              duplicatedItem.setAttribute('aria-hidden', 'true')

              scrollerInner.appendChild(duplicatedItem)
            })
          })
        }
      })
    }

    addAnimation()
  }, [])

  return (
    <div
      ref={pageContent}
      className="mb-4 w-full overflow-hidden p-4 md:max-w-[800px]"
    >
      <div className="text-box flex min-w-full translate-y-[55px] items-center justify-center rounded-t-full border-[1px] bg-gray-950 py-3 opacity-0 sm:translate-y-[65px]">
        <h2 className="flex min-w-full items-center justify-center gap-2 text-center font-bold sm:text-xl">
          Tech Stack
          <span className="relative">
            <Image
              src={robotBlink}
              alt=""
              width={26}
              height={26}
              className="absolute animate-fade-out"
            />
            <Image src={robot} alt="" width={26} height={26} className="" />
          </span>
        </h2>
      </div>

      <div className="scroller flex w-full translate-y-[50px] flex-col justify-between overflow-hidden opacity-0">
        <div className="scroller__inner relative flex items-center gap-10 bg-background px-6 py-4">
          {firstArray.map((tech, index) => (
            <Image
              key={index}
              src={tech.iconUrl}
              alt={tech.name}
              title={tech.name}
              width={30}
              height={30}
              className="w-[20px] sm:w-[30px]"
            />
          ))}
        </div>

        <div
          style={
            {
              '--direction': 'reverse',
            } as React.CSSProperties
          }
          className="scroller__inner relative flex items-center gap-10 bg-background px-6 py-4"
        >
          {secondArray.map((tech, index) => (
            <Image
              key={index}
              src={tech.iconUrl}
              alt={tech.name}
              title={tech.name}
              width={30}
              height={30}
              className="w-[20px] sm:w-[30px]"
            />
          ))}
        </div>
      </div>
      <div className="text-box1 flex min-w-full -translate-y-[55px] items-center justify-center rounded-b-full border-[1px] bg-gray-950 py-5 opacity-0 sm:-translate-y-[65px]"></div>
    </div>
  )
}
