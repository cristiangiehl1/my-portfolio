'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

export default function AnimatedLogo() {
  useGSAP(() => {
    gsap.to('.animated-logo', {
      scale: 1,
      delay: 0.5,
      ease: 'power4.inOut',
    })
  })

  return (
    <div className="animated-logo scale-0">
      <svg viewBox="0 0 160 20" className="w-36 font-bold md:w-52">
        <text
          x="19%"
          y="50%"
          dy=".32em"
          textAnchor="middle"
          className="text-body stroke-white stroke-1 text-lg tracking-tighter"
        >
          Cristian
        </text>
        <text
          x="19%"
          y="50%"
          dy=".32em"
          dx="1.9em"
          textAnchor="middle"
          className="text-body stroke-white stroke-1 text-lg tracking-tighter"
        >
          .
        </text>
        <text
          x="19%"
          y="50%"
          dy=".32em"
          textAnchor="middle"
          dx="2.9em"
          className="text-body stroke-white stroke-1 text-lg tracking-tighter"
        >
          dev
        </text>
      </svg>
    </div>
  )
}
