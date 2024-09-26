'use client'

import './styles.css'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useLayoutEffect, useRef } from 'react'

import { getRandom } from '@/utils/create-start'

export default function Test() {
  const slices = 6
  const angle = 360 / slices
  const sliceRefs = useRef<HTMLDivElement[]>([])
  const particlesContainer = useRef<HTMLDivElement>(null)

  const slicesArray = Array.from({ length: slices })

  const createParticles = (
    container: HTMLDivElement,
    numParticles: number,
    className: string,
    positionMultiplier: number = 1,
  ) => {
    for (let i = 0; i < numParticles; i++) {
      const containerX = container.offsetWidth
      const containerY = container.offsetHeight
      const centerX = containerX / 2
      const centerY = containerY / 2

      const size = getRandom(2, 4)
      const xPos = getRandom(0, containerX)
      const yPos = getRandom(0, containerY)

      const DistanceToCenterX = centerX - xPos

      console.log('xPos = ' + Math.round(xPos))
      console.log('yPos = ' + Math.round(yPos))

      console.log('centerX - Xpos = ' + DistanceToCenterX)

      const particle = document.createElement('div')
      particle.classList.add(className)
      particle.style.position = 'absolute'
      particle.style.zIndex = '100'
      particle.style.top = `${yPos}px`
      particle.style.left = `${-DistanceToCenterX}px`
      particle.style.width = `40px`
      particle.style.height = `${size}px`
      particle.style.backgroundColor = 'white'
      particle.style.borderRadius = '9999px'

      particle.style.transform = 'rotate(90deg)'

      container.appendChild(particle)
    }
  }

  useLayoutEffect(() => {
    sliceRefs.current.forEach((sliceRef) => {
      if (!sliceRef) return
      createParticles(sliceRef, 1, 'particle', 1)
      createParticles(sliceRef, 1, 'particle2', -2)
      createParticles(sliceRef, 1, 'particle3', -2)
    })
  }, [])

  interface AnimateParticlesProps {
    className: string
    yPosition: number
    delay: number
    duration: number
    repeat: number
  }

  // useGSAP(() => {
  //   const animateParticles = ({
  //     className,
  //     yPosition,
  //     delay,
  //     duration,
  //     repeat,
  //   }: AnimateParticlesProps) => {
  //     gsap.to(`.${className}`, {
  //       transform: `translateY(${yPosition}px)`,
  //       duration,
  //       delay,
  //       repeat,
  //       ease: 'none',
  //     })
  //   }

  //   animateParticles({
  //     className: 'particle2',
  //     yPosition: 1050,
  //     delay: 1.5,
  //     duration: 9,
  //     repeat: -1,
  //   })
  //   animateParticles({
  //     className: 'particle3',
  //     yPosition: 1050,
  //     delay: 6,
  //     duration: 9,
  //     repeat: -1,
  //   })
  //   animateParticles({
  //     className: 'particle',
  //     yPosition: 350,
  //     delay: 0,
  //     duration: 6,
  //     repeat: 0,
  //   })
  // })

  return (
    <div className="absolute flex h-screen w-full items-center justify-center bg-slate-900">
      <div
        ref={particlesContainer}
        className="relative h-[700px] w-[700px] overflow-hidden rounded-full bg-slate-500"
      >
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
        <div className="z-100 absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"></div>
      </div>
    </div>
  )
}
