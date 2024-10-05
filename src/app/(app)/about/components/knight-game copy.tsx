'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { CgArrowLeft, CgArrowRight, CgArrowUp } from 'react-icons/cg'

import knightChill from '@/assets/__Idle.gif'
import knightJump from '@/assets/__Jump.gif'
import knightRun from '@/assets/__Run.gif'
// import bgParallaxLayer00 from '@/assets/Parallax_Backgrounds_Cave/0.png'
import bgParallaxLayer01 from '@/assets/Parallax_Backgrounds_Cave/1.png'
import bgParallaxLayer02 from '@/assets/Parallax_Backgrounds_Cave/2.png'
import bgParallaxLayer03 from '@/assets/Parallax_Backgrounds_Cave/3.png'
import bgParallaxLayer04 from '@/assets/Parallax_Backgrounds_Cave/4.png'
import bgParallaxLayer05 from '@/assets/Parallax_Backgrounds_Cave/5.png'
import bgParallaxLayer06 from '@/assets/Parallax_Backgrounds_Cave/6.png'
import bgParallaxLayer07 from '@/assets/Parallax_Backgrounds_Cave/7.png'

export default function KnightGame() {
  const treadmillContainerRef = useRef<HTMLDivElement>(null)
  const knightRunningRef = useRef<HTMLImageElement>(null)
  const knightJumpingRef = useRef<HTMLImageElement>(null)
  const knightChillRef = useRef<HTMLImageElement>(null)

  const [isJumping, setIsJumping] = useState(false)
  const [isGameRunning, setIsGameRunning] = useState(false)

  // function handleKnightJump(event: React.KeyboardEvent) {
  //   const key = event.key
  // }

  function handleKnightMovement(event: React.KeyboardEvent) {
    const key = event.key

    if (key === 'ArrowRight') {
      gsap.to('.parallax-container', {
        left: '20px',
        duration: 2,
        ease: 'power4.inOut',
        repeat: -1,
      })
    }

    if (key === 'ArrowLeft') {
      console.log('arrow Left')
    }

    if (key === 'ArrowUp') {
      const knightRunning = knightRunningRef.current
      const knightJumping = knightJumpingRef.current
      const knightchill = knightChillRef.current

      if (!isJumping) {
        gsap.to(knightJumping, {
          onStart: () => {
            setIsJumping(true)
            gsap.to(knightJumping, {
              opacity: 1,
              duration: 0,
            })
            gsap.to(knightRunning, {
              opacity: 0,
              duration: 0,
            })
            gsap.to(knightchill, {
              opacity: 0,
              duration: 0,
            })
          },
          bottom: '50px',
          duration: 0.3,
          ease: 'power1.out',
          yoyo: true,
          repeat: 1,
          onComplete: () => {
            setIsJumping(false)
            gsap.to(knightJumping, {
              opacity: 0,
              duration: 0,
            })
            gsap.to(knightRunning, {
              opacity: 1,
              duration: 0,
            })
          },
        })
      }
    }
  }

  // function startKnightAnimation() {
  //   const knightRunning = document.getElementById(
  //     'knight-running',
  //   ) as HTMLImageElement
  //   const knightJumping = document.getElementById(
  //     'knight-jumping',
  //   ) as HTMLImageElement
  //   const treadmillContainer = treadmillContainerRef.current
  //   const treadmill = treadmillContainer?.getBoundingClientRect()

  //   if (!treadmill) return

  //   if (knightRunning) {
  //     gsap.to([knightRunning, knightJumping], {
  //       startAt: { x: '-30px' },
  //       x: `${treadmill.width + 40}px`,
  //       duration: 8,
  //       ease: 'linear',
  //       repeat: -1,
  //     })
  //   }
  // }

  function handleStartGame() {
    setIsGameRunning(true)
    gsap.killTweensOf('.start-game-text')
  }

  function handlePauseGame() {
    setIsGameRunning(false)

    gsap.to('.start-game-text', {
      opacity: 0,
      scale: 1.2,
      repeat: -1,
      duration: 1.3,
      ease: 'elastic.inOut',
    })
  }

  useEffect(() => {
    // startKnightAnimation()

    const handleResize = () => {
      gsap.killTweensOf(knightRunningRef.current)
      // startKnightAnimation()
    }

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useGSAP(() => {
    const tl = gsap.timeline({ paused: true })

    tl.to('.start-game-text', {
      textShadow:
        '-2px -2px 0 rgba(255, 255, 255, 0.479), -2px -2px 0 rgba(0, 255, 0, 0.5)',
      repeat: -1,
      yoyo: true,
      duration: 2,
      ease: 'sine.out',
    })

    if (!isGameRunning) {
      tl.play()
    } else {
      tl.pause()
    }
  }, [isGameRunning])

  return (
    <div
      tabIndex={0}
      onBlur={() => handlePauseGame()}
      onKeyDown={handleKnightMovement}
      ref={treadmillContainerRef}
      className="treadmill-container relative mt-4 hidden h-[20vw] w-full overflow-hidden bg-zinc-500 md:flex"
    >
      <div className="parallax-container absolute inset-0 z-0 h-full w-full bg-white">
        <Image
          src={bgParallaxLayer01}
          alt="parallax layer 0"
          className="z-70 absolute h-full w-full object-fill"
        />
        <Image
          src={bgParallaxLayer02}
          alt="parallax layer 0"
          className="z-60 absolute h-full w-full object-fill"
        />

        <Image
          src={bgParallaxLayer03}
          alt="parallax layer 0"
          className="absolute z-40 h-full w-full object-fill"
        />

        <Image
          src={bgParallaxLayer04}
          alt="parallax layer 0"
          className="absolute z-30 h-full w-full object-fill"
        />

        <Image
          src={bgParallaxLayer05}
          alt="parallax layer 0"
          className="absolute z-20 h-full w-full object-fill"
        />

        <Image
          src={bgParallaxLayer06}
          alt="parallax layer 0"
          className="absolute z-10 h-full w-full object-fill"
        />

        <Image
          src={bgParallaxLayer07}
          alt="parallax layer 0"
          className="absolute z-0 h-full w-full object-fill"
        />
      </div>

      {/* <div className="parallax-container absolute inset-0 z-0">
        <Image
          src={bgParallaxLayer07}
          alt="Background Layer 7"
          layout="fill"
          objectFit="cover"
          className="parallax-layer"
        />
        <Image
          src={bgParallaxLayer06}
          alt="Background Layer 6"
          layout="fill"
          objectFit="cover"
          className="parallax-layer"
        />
        <Image
          src={bgParallaxLayer05}
          alt="Background Layer 5"
          layout="fill"
          objectFit="cover"
          className="parallax-layer"
        />
        <Image
          src={bgParallaxLayer04}
          alt="Background Layer 4"
          layout="fill"
          objectFit="cover"
          className="parallax-layer"
        />
        <Image
          src={bgParallaxLayer03}
          alt="Background Layer 3"
          layout="fill"
          objectFit="cover"
          className="parallax-layer"
        />
        <Image
          src={bgParallaxLayer02}
          alt="Background Layer 2"
          layout="fill"
          objectFit="cover"
          className="parallax-layer"
        />
        <Image
          src={bgParallaxLayer01}
          alt="Background Layer 1"
          layout="fill"
          objectFit="cover"
          className="parallax-layer"
        />
        <Image
          src={bgParallaxLayer00}
          alt="Background Layer 0"
          layout="fill"
          objectFit="cover"
          className="parallax-layer"
        />
      </div> */}

      <div
        className="esteira h-full w-full"
        style={{
          boxShadow:
            'rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset',
        }}
      >
        <Image
          src={knightRun}
          alt=""
          width={40}
          height={40}
          className="knight absolute bottom-0 left-[50%] -translate-x-1/2 border-2 border-red-500"
          id="knight-running"
          ref={knightRunningRef}
        />
        <Image
          src={knightJump}
          alt=""
          width={37}
          height={37}
          className="knight opacity-1 absolute bottom-0 left-[50%] -translate-x-1/2 border-2 border-red-500"
          id="knight-jumping"
          ref={knightJumpingRef}
        />

        <Image
          src={knightChill}
          alt=""
          width={36}
          height={36}
          className="knight opacity-1 absolute bottom-0 left-[50%] -translate-x-1/2 border-2 border-red-500"
          id="knight-chill"
          ref={knightChillRef}
        />

        <div className="absolute left-1 top-1 w-full">
          <div className="flex items-center"></div>
        </div>
      </div>

      {!isGameRunning && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center">
          <div
            className="absolute h-full w-full bg-black opacity-50"
            onClick={() => handleStartGame()}
          ></div>
          <span
            className="start-game-text z-30 p-2 text-2xl font-bold"
            onClick={() => handleStartGame()}
          >
            Click Here To Start
          </span>
          <div className="z-20 flex w-full flex-col items-center justify-center text-gray-400">
            <h3> Controls</h3>

            <div className="flex">
              <CgArrowLeft size={20} />
              <CgArrowUp size={20} />
              <CgArrowRight size={20} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
