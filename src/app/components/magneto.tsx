'use client'

import gsap from 'gsap'
import { useEffect, useRef } from 'react'

interface MagnetoProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string
  href: string | undefined
}

export default function Magneto({ text, href, ...props }: MagnetoProps) {
  const magnetoRef = useRef<HTMLButtonElement>(null)
  const magnetoTextRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const magneto = magnetoRef.current
    const magnetoText = magnetoTextRef.current

    if (!magneto || !magnetoText) return

    let mouseX = 0
    let mouseY = 0
    let animationFrame: number | null = null

    const magnetoStrength = 50
    const magnetoTextStrength = 30

    const activateMagneto = () => {
      const boundBox = magneto.getBoundingClientRect()
      const newX = (mouseX - boundBox.left) / magneto.offsetWidth - 0.5
      const newY = (mouseY - boundBox.top) / magneto.offsetHeight - 0.5

      gsap.to(magneto, {
        duration: 0,
        x: newX * magnetoStrength,
        y: newY * magnetoStrength,
        rotate: '0.001deg',
        ease: 'elastic',
      })

      gsap.to(magnetoText, {
        duration: 0,
        x: newX * magnetoTextStrength,
        y: newY * magnetoTextStrength,
        rotate: '0.001deg',
        ease: 'elastic',
      })

      animationFrame = requestAnimationFrame(activateMagneto)
    }

    function onMouseMove(event: MouseEvent) {
      mouseX = event.clientX
      mouseY = event.clientY

      if (!animationFrame) {
        animationFrame = requestAnimationFrame(activateMagneto)
      }
    }

    function resetMagneto() {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
        animationFrame = null
      }

      gsap.to(magneto, {
        duration: 0.5,
        x: 0,
        y: 0,
        ease: 'elastic',
      })

      gsap.to(magnetoText, {
        duration: 0.5,
        x: 0,
        y: 0,
        ease: 'elastic',
      })
    }

    magneto.addEventListener('mousemove', onMouseMove)
    magneto.addEventListener('mouseleave', resetMagneto)

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }

      magneto.removeEventListener('mousemove', onMouseMove)
      magneto.removeEventListener('mouseleave', resetMagneto)
    }
  }, [])

  return (
    <button
      ref={magnetoRef}
      {...props}
      className={`magneto flex cursor-pointer items-center justify-center rounded-full ${
        props.className ? props.className : ''
      }`}
    >
      <a href={href} ref={magnetoTextRef} className="">
        <span className="magnetoText">{text}</span>
      </a>
    </button>
  )
}
