'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { CgArrowLeft, CgArrowRight, CgArrowUp } from 'react-icons/cg'

import knightChill from '@/assets/__Idle.gif'
import knightJump from '@/assets/__Jump.gif'
import knightRun from '@/assets/__Run.gif'
import bgParallaxLayer00 from '@/assets/Parallax_Backgrounds_Cave/0.png'
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

  return (
    <div className="relative flex h-[50vh] w-full bg-black">
      <canvas
        id="canvas1"
        className="3px solid absolute h-full w-full border-[3px] border-white"
      ></canvas>
    </div>
  )
}
