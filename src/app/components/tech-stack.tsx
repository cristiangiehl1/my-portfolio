'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import Image from 'next/image'
import { useEffect, useRef } from 'react'

import { type TechStack, techStack } from '@/tech-stack'

export default function TechStack() {
  function splitTechStack(techStack: TechStack[]) {
    const halfLength = Math.ceil(techStack.length / 2) // Calcula o tamanho do primeiro array
    const firstHalf = techStack.slice(0, halfLength) // Cria o primeiro array
    const secondHalf = techStack.slice(halfLength) // Cria o segundo array

    return [firstHalf, secondHalf]
  }

  const [firstArray, secondArray] = splitTechStack(techStack)

  const pageContent = useRef(null)
  const container1 = useRef(null)
  const container2 = useRef(null)

  //   useGSAP(
  //     () => {
  //       gsap.fromTo(
  //         container1.current,
  //         {
  //           x: '100%',
  //         },
  //         {
  //           x: '-100%',
  //           duration: 15,
  //           repeat: -1,
  //           ease: 'linear',
  //         },
  //       )

  //       gsap.fromTo(
  //         container2.current,
  //         {
  //           x: '-100%',
  //         },
  //         {
  //           x: '100%',
  //           duration: 15,
  //           repeat: -1,
  //           ease: 'linear',
  //         },
  //       )
  //     },

  //     { scope: pageContent },
  //   )

  useEffect(() => {
    const scrollers = document.querySelectorAll('.scroller')

    function addAnimation() {
      scrollers.forEach((scroller) => {
        scroller.setAttribute('data-animated', 'true')

        const scrollerInner = scroller.querySelector('.scroller__inner')
        const scrollerInner2 = scroller.querySelector('.scroller__inner2')

        if (scrollerInner) {
          const scrollerContent = Array.from(scrollerInner.children)

          scrollerContent.forEach((item) => {
            const duplicatedItem = item.cloneNode(true) as HTMLElement
            duplicatedItem.setAttribute('aria-hidden', 'true')
            // duplicatedItem.style.background = 'red'

            scrollerInner.appendChild(duplicatedItem)
          })
        }

        if (scrollerInner2) {
          const scrollerContent = Array.from(scrollerInner2.children)

          scrollerContent.forEach((item) => {
            const duplicatedItem = item.cloneNode(true) as HTMLElement
            duplicatedItem.setAttribute('aria-hidden', 'true')

            scrollerInner2.appendChild(duplicatedItem)
          })
        }
      })
    }

    addAnimation()
  }, [])

  return (
    <div
      ref={pageContent}
      className="mb-6 w-full overflow-hidden p-4 md:max-w-[800px]"
    >
      <div>
        <h2 className="mb-5 border-y-2 py-2 text-center font-bold sm:text-xl">
          Tech Stack
        </h2>
      </div>

      <div className="scroller flex w-full flex-col justify-between gap-5 overflow-hidden">
        <div className="scroller__inner relative flex items-center gap-10 px-6">
          {firstArray.map((tech, index) => (
            <Image
              key={index}
              src={tech.iconUrl}
              alt={tech.name}
              title={tech.name}
              width={40}
              height={40}
              style={{ width: '40px', height: 'auto' }}
            />
          ))}
        </div>

        <div className="scroller__inner2 relative flex items-center gap-10 px-6">
          {secondArray.map((tech, index) => (
            <Image
              key={index}
              src={tech.iconUrl}
              alt={tech.name}
              title={tech.name}
              width={40}
              height={40}
              style={{ width: '40px', height: 'auto' }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
