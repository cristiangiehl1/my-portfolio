'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { FaGithub } from 'react-icons/fa'

import { projects } from '@/api/projects'
import { techStack } from '@/api/tech-stack'
import { createComet } from '@/utils/create-comet'
import { createStar } from '@/utils/create-start'

import asteroid from '../../../assets/asteroid.svg'

interface ProjectItem {
  id: string
  rowId: number
  project: (typeof projects)[number] | undefined
}

export default function Portfolio() {
  const galleryRef = useRef<HTMLDivElement>(null)

  const [items, setItems] = useState<ProjectItem[][]>([])

  useEffect(() => {
    const generateItems = () => {
      const rows = [
        { id: 1, count: 4 },
        { id: 2, count: 3 },
        { id: 3, count: 4 },
      ]

      const newItems = rows.map((row) => {
        return Array.from({ length: row.count }, (_, index) => {
          const itemId = `${row.id}-${index}`
          const project = projects.find((project) => project.id === itemId)
          return {
            id: itemId,
            rowId: row.id,
            project,
          }
        })
      })
      setItems(newItems)
    }

    generateItems()

    function handleMouseMovement(e: MouseEvent) {
      const { clientX, clientY, currentTarget } = e

      const targetElement = currentTarget as HTMLDivElement
      const galleryElement = galleryRef.current

      if (!galleryElement) return

      const { width, height } = targetElement.getBoundingClientRect()

      const centerX = width / 2
      const centerY = height / 2

      const sensitivity = 1
      const deltaX = (centerX - clientX) / sensitivity
      const deltaY = (centerY - clientY) / sensitivity

      galleryElement.style.transform = `translate(calc(-50% + ${deltaX}px), calc(-50% + ${deltaY}px))`
    }

    const container = document.querySelector('.projects-container')
    container!.addEventListener(
      'mousemove',
      handleMouseMovement as EventListener,
    )

    return () => {
      container!.removeEventListener(
        'mousemove',
        handleMouseMovement as EventListener,
      )
    }
  }, [])

  useEffect(() => {
    const galleryElement = galleryRef.current

    if (!galleryElement) return

    const generateStars = () => {
      const starCount = 50
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

    generateStars()
    const cometInterval = setInterval(generateComet, 1000)

    window.addEventListener('resize', () => {
      generateStars()
    })

    return () => {
      clearInterval(cometInterval)
      window.removeEventListener('resize', () => {
        generateStars()
      })
    }
  }, [])

  return (
    <div className="projects-container relative h-screen w-screen overflow-hidden">
      <div className="gallery absolute left-1/2 top-1/2 z-40 flex h-[250vh] w-[200vw] -translate-x-1/2 -translate-y-1/2 justify-around px-56 sm:h-[200vh] sm:flex-col sm:py-10">
        {items.map((row, rowIndex) => (
          <div
            key={`${rowIndex}`}
            className={`row z-50 flex w-full flex-wrap lg:flex-nowrap ${rowIndex === 1 ? 'items-center justify-center sm:justify-around' : 'items-center justify-center sm:justify-between'}`}
          >
            {row.map(
              (item) =>
                item.project && (
                  <div
                    key={item.id}
                    className="project group relative flex flex-col"
                  >
                    <p className="video-name atext-center pointer-events-none w-full rounded-t-2xl px-4 py-2 text-center text-base text-white lg:text-2xl">
                      {item.project.name}
                    </p>

                    <div className="relative h-[200px] w-[400px] overflow-hidden lg:h-[250px] lg:w-[600px]">
                      <div className="preview-img absolute inset-0 opacity-100 group-hover:opacity-0">
                        <Image
                          src={item.project.projectImg}
                          alt={item.project.name || 'Project image'}
                          className="h-full w-full object-fill"
                        />
                      </div>

                      <video
                        src={item.project.projectVideo}
                        loop
                        muted
                        className="absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100"
                        autoPlay
                      />
                    </div>

                    <div className="flex w-full justify-center gap-4 rounded-b-2xl p-4 lg:gap-10">
                      {item.project.techs.map((tech, techIndex) => {
                        const techData = techStack.find(
                          (item) => item.name === tech,
                        )
                        return (
                          <div
                            key={techIndex}
                            className="relative items-center gap-2"
                          >
                            <Image
                              src={asteroid}
                              alt=""
                              width={40}
                              height={40}
                              className="opacity-80"
                            />
                            {techData && (
                              <Image
                                src={techData.iconUrl}
                                alt={tech}
                                title={tech}
                                width={25}
                                height={25}
                                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                              />
                            )}
                          </div>
                        )
                      })}
                    </div>

                    <div>
                      <a
                        className="flex items-center gap-2 text-left transition-colors hover:text-zinc-400"
                        target="_blank"
                        href={item.project.projectRepo}
                        rel="noreferrer"
                      >
                        <span className="text-xs font-bold sm:text-sm">
                          Code
                        </span>
                        <FaGithub className="text-lg sm:text-xl" />
                      </a>
                    </div>
                  </div>
                ),
            )}
          </div>
        ))}

        <div
          ref={galleryRef}
          className="space-bg absolute left-1/2 top-1/2 z-30 flex h-[250vh] w-[200vw] -translate-x-1/2 -translate-y-1/2 bg-black px-56 sm:h-[200vh] sm:flex-col sm:py-10"
        ></div>
      </div>
    </div>
  )
}
