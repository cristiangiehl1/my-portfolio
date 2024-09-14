'use client'

import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { TextPlugin } from 'gsap/TextPlugin'
import { useRef } from 'react'

gsap.registerPlugin(TextPlugin)

const words = ['Fullstack Developer']

export function AnimatedText() {
  const typewriterRef = useRef(null)

  useGSAP(() => {
    const cursorTimeline = gsap.timeline({
      repeat: -1,
      repeatDelay: 0.8,
    })

    cursorTimeline
      .to('#cursor', {
        opacity: 1,
        duration: 0,
      })
      .to('#cursor', {
        opacity: 0,
        duration: 0,
        delay: 0.8,
      })

    const mainTimeline = gsap.timeline({
      repeat: -1,
    })

    words.forEach((word) => {
      const textTimeline = gsap.timeline({
        repeat: 1,
        yoyo: true,
        repeatDelay: 4.8,
      })

      textTimeline.to(typewriterRef.current, {
        text: word,
        duration: 2,
        onUpdate: () => {
          cursorTimeline.restart()
          cursorTimeline.pause()
        },
        onComplete: () => {
          cursorTimeline.play()
        },
      })

      mainTimeline.add(textTimeline)
    })
  }, [])

  return (
    <h3 className="text-sm md:text-3xl">
      {`<`}
      <span ref={typewriterRef} className="text-green-500">
        {' '}
      </span>
      <span id="cursor">|</span>
      {` />`}
    </h3>
  )
}
