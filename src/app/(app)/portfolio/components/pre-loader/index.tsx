'use client'

import './styles.css'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import Image from 'next/image'
import { useRef } from 'react'

import { TypeWriteText } from '@/app/components/type-write-text'
import planet from '@/assets/planet.png'
import spaceshipWindow from '@/assets/spaceship-window.png'

import SpaceshipMovement from '../space-movement'

export default function PreLoader() {
  const preLoaderContainerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.to('.hologram', {
      height: '30vh',
      border: '2px solid rgba(17, 83, 148, 0.6)',
      duration: 0.5,
      ease: 'power2.inOut',
      onStart: () => {
        gsap.to('.typewrite-text', { opacity: 1 })
      },
    })

    gsap.to('.typewrite-text', {
      opacity: 0,
      duration: 0,
      delay: 9,
      onComplete: () => {
        gsap.to('.hologram', {
          height: '0px',
          border: '0px',
          duration: 1,
          ease: 'power4.inOut',
        })
        gsap.to('.spaceship-window', {
          scale: 2.4,
          duration: 6,
          delay: 2,
          ease: 'none',
        })
        gsap.to('.planet', {
          opacity: 1,
          scale: 4,
          duration: 16,

          ease: 'power4.inOut',
        })
      },
    })
  }, [preLoaderContainerRef])

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden">
      <Image
        src={spaceshipWindow}
        alt=""
        className="spaceship-window absolute left-1/2 top-1/2 min-h-full min-w-full -translate-x-1/2 -translate-y-1/2 object-cover"
      />

      <div className="hologram z-10 flex h-0 w-[60vw] items-center justify-center rounded-2xl text-center lg:w-[40vw]">
        <TypeWriteText
          texts={['Activate HyperSpace', 'Put on your seatbelt']}
          className="typewrite-text text-4xl font-bold opacity-0"
        />
      </div>

      <div className="space-bg-preloader absolute left-1/2 top-1/2 -z-10 min-h-screen w-[100vw] -translate-x-1/2 -translate-y-1/2 bg-gray-800"></div>

      <SpaceshipMovement />

      <div className="relative h-full w-full">
        <Image
          src={planet}
          quality={80}
          alt=""
          className="planet z-5 absolute left-1/2 top-1/2 h-auto w-[20px] -translate-x-1/2 -translate-y-1/2 opacity-0 max-sm:-bottom-[20vw]"
        />
      </div>
    </div>
  )
}
