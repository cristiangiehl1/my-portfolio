'use client'

import gsap from 'gsap'
import { type ReactNode, useEffect, useRef } from 'react'

interface MagnetoProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string
  href?: string
  magnetoStrength: number
  magnetoTextStrength: number
  children?: ReactNode
}

export default function Magneto({
  text,
  href,
  magnetoStrength,
  magnetoTextStrength,
  children,
  ...props
}: MagnetoProps) {
  const magnetoRef = useRef<HTMLButtonElement>(null)
  const magnetoTextRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const magneto = magnetoRef.current
    const magnetoText = magnetoTextRef.current

    if (!magneto || !magnetoText) return

    let mouseX = 0
    let mouseY = 0
    let animationFrame: number | null = null

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
  }, [magnetoStrength, magnetoTextStrength])

  return (
    <button
      ref={magnetoRef}
      {...props}
      className={`magneto z-10 flex cursor-pointer items-center justify-center rounded-full ${
        props.className ? props.className : ''
      }`}
    >
      {!href ? (
        <span ref={magnetoTextRef} className="magnetoText z-10">
          {text}
          {children}
        </span>
      ) : (
        <a href={href} ref={magnetoTextRef} className="z-10">
          <span className="magnetoText">{text}</span>
        </a>
      )}
    </button>
  )
}
