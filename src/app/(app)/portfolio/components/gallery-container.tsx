'use client'

import { useEffect, useRef } from 'react'

import { createComet } from '@/utils/create-comet'
import { createStar } from '@/utils/create-start'

export default function GalleryContainer() {
  const galleryRef = useRef<HTMLDivElement>(null)

  const resizeTimeout = useRef<number | null>(null)

  // background movement
  useEffect(() => {
    const galleryElement = galleryRef.current as HTMLDivElement
    const parent = galleryElement.parentElement

    function handleMouseMovement(e: MouseEvent) {
      const { clientX, clientY, currentTarget } = e

      const targetElement = currentTarget as HTMLDivElement

      if (!galleryElement) return

      const { width, height } = targetElement.getBoundingClientRect()

      const centerX = width / 2
      const centerY = height / 2

      const sensitivity = 1
      const deltaX = (centerX - clientX) / sensitivity
      const deltaY = (centerY - clientY) / sensitivity

      galleryElement.style.transform = `translate(calc(-50% + ${deltaX}px), calc(-50% + ${deltaY}px))`
    }

    if (!parent) return

    parent.addEventListener('mousemove', handleMouseMovement as EventListener)

    return () => {
      parent.removeEventListener(
        'mousemove',
        handleMouseMovement as EventListener,
      )
    }
  }, [])

  // create start and comet
  useEffect(() => {
    const galleryElement = galleryRef.current

    if (!galleryElement) return

    const generateStars = () => {
      const starCount = 100
      for (let i = 0; i < starCount; i++) {
        createStar(galleryElement)
      }
    }

    const generateComet = () => {
      const comet = createComet(galleryElement)
      setTimeout(() => {
        comet.remove()
      }, 4000)
    }

    const cometInterval = setInterval(generateComet, 500)

    generateStars()

    function handleResize() {
      if (resizeTimeout.current) {
        clearTimeout(resizeTimeout.current)
      }

      resizeTimeout.current = window.setTimeout(() => {
        generateStars()
      }, 200)
    }

    return () => {
      if (resizeTimeout.current) {
        clearTimeout(resizeTimeout.current)
      }
      window.removeEventListener('resize', handleResize)
      clearInterval(cometInterval)
    }
  }, [])

  return (
    <div
      ref={galleryRef}
      className="space-bg absolute left-1/2 top-1/2 -z-20 h-[200vh] w-[200vw] -translate-x-1/2 -translate-y-1/2"
    ></div>
  )
}
