'use client'

import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { TextPlugin } from 'gsap/TextPlugin'
import { useRef } from 'react'

gsap.registerPlugin(TextPlugin)

interface TypeWriteTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  texts: string[]
}

export function TypeWriteText({ texts, ...props }: TypeWriteTextProps) {
  const typewriterRef = useRef(null)

  const words = texts

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
        repeatDelay: 3,
      })

      textTimeline.to(typewriterRef.current, {
        text: word,
        duration: 1.5,
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
    <span {...props}>
      <span ref={typewriterRef}> </span>
      <span id="cursor">|</span>
    </span>
  )
}
