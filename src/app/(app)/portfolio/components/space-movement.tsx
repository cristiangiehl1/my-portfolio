'use client'

import './styles.css'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useLayoutEffect, useRef } from 'react'

import { getRandom } from '@/utils/create-start'

interface AnimateParticlesProps {
  className: string
  yPosition: number
  delay: number
  duration: number
  repeat: number
  opacity: number
}

export default function SpaceshipMovement() {
  const slices = 32
  const angle = 360 / slices
  const sliceRefs = useRef<HTMLDivElement[]>([])

  const slicesArray = Array.from({ length: slices })

  const createParticles = (
    container: HTMLDivElement,
    numParticles: number,
    className: string,
    positionMultiplier: number = 1,
  ) => {
    const fragment = document.createDocumentFragment()

    const containerWidth = container.offsetWidth
    const containerHeight = container.offsetHeight

    for (let i = 0; i < numParticles; i++) {
      const size = getRandom(2, 4)
      const xPos = getRandom(0, containerWidth)

      const yPos = getRandom(0, containerHeight * positionMultiplier)

      const particle = document.createElement('div')
      particle.classList.add(className)
      particle.style.position = 'absolute'
      particle.style.zIndex = '100'
      particle.style.width = `${size}px`
      particle.style.height = `${size}px`
      particle.style.backgroundColor = 'white'
      particle.style.borderRadius = '9999px'

      if (positionMultiplier > 1) {
        particle.style.opacity = '0'
      }

      particle.style.top = `${yPos}px`
      particle.style.left = `${xPos}px`

      fragment.appendChild(particle)
    }
    container.appendChild(fragment)
  }

  useLayoutEffect(() => {
    sliceRefs.current.forEach((sliceRef) => {
      if (!sliceRef) return
      setTimeout(() => {
        createParticles(sliceRef, 15, 'particle', 2)
      }, 3000)

      setTimeout(() => {
        createParticles(sliceRef, 15, 'particle2', 2)
      }, 5000)
    })
  }, [])

  useGSAP(() => {
    const animateParticles = ({
      className,
      yPosition,
      delay,
      duration,
      repeat,
      opacity,
    }: AnimateParticlesProps) => {
      gsap.to(`.${className}`, {
        y: `${yPosition}px`,
        startAt: { y: 800 },
        opacity,
        duration,
        delay,
        repeat,
        ease: 'none',
      })
    }

    gsap.delayedCall(5, () => {
      animateParticles({
        className: 'particle',
        yPosition: -1000,
        delay: 3.5,
        duration: 6,
        repeat: 3,
        opacity: 1,
      })
    })

    gsap.delayedCall(7, () => {
      animateParticles({
        className: 'particle2',
        yPosition: -1000,
        delay: 5,
        duration: 6,
        repeat: 3,
        opacity: 1,
      })
    })
  })

  return (
    <div className="space-movement-container absolute -z-[10] flex h-screen w-full scale-[1.5] items-center justify-center bg-transparent">
      <div className="relative h-[1080px] w-[1080px] overflow-hidden rounded-full bg-transparent">
        {slicesArray.map((_, index) => (
          <div
            ref={(el) => {
              if (el) {
                sliceRefs.current[index] = el
              }
            }}
            style={
              {
                '--slice-number': index + 1,
                '--angle': angle,
              } as React.CSSProperties
            }
            key={index}
            className="pizza-slice"
          ></div>
        ))}
        {/* <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"></div> */}
      </div>
    </div>
  )
}
