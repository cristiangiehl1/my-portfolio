'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { FaGithub } from 'react-icons/fa'

import { projects } from '@/api/projects'
import { techStack } from '@/api/tech-stack'
import { createComet } from '@/utils/create-comet'
import { createStar } from '@/utils/create-start'

import planet from '../../../assets/planet.png'

export default function Portfolio() {
  const galleryRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
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
    <div className="projects-container relative h-screen w-full overflow-hidden">
      <div className="banner relative h-screen w-full overflow-hidden text-center">
        <div
          style={
            {
              '--quantity': projects.length,
            } as React.CSSProperties
          }
          className="slider absolute left-[calc(50%_-200px)] top-[20%] z-[60] h-[350px] w-[400px]"
        >
          {projects.map((project, index) => (
            <div
              style={
                {
                  '--position': index,
                } as React.CSSProperties
              }
              key={index}
              className="project absolute inset-0 flex flex-col items-center"
            >
              <p className="video-name atext-center pointer-events-none w-full rounded-t-2xl px-4 py-2 text-center text-base text-white lg:text-2xl">
                {project.name}
              </p>

              <div className="relative h-[250px] w-[400px] cursor-pointer overflow-hidden rounded-xl">
                <div className="preview-img absolute inset-0 opacity-100 hover:opacity-0">
                  <Image
                    src={project.projectImg}
                    alt={project.name || 'Project image'}
                    className="h-full w-full object-fill"
                  />
                </div>

                <video
                  src={project.projectVideo}
                  loop
                  muted
                  className="absolute inset-0 opacity-0 transition-opacity hover:opacity-100"
                  autoPlay
                />
              </div>

              <div className="flex w-full justify-center gap-4 rounded-b-2xl p-4">
                {project.techs.map((tech, techIndex) => {
                  const techData = techStack.find((item) => item.name === tech)
                  return (
                    <div
                      key={techIndex}
                      className="relative items-center gap-2"
                    >
                      {techData && (
                        <Image
                          src={techData.iconUrl}
                          alt={tech}
                          title={tech}
                          width={25}
                          height={25}
                          className=""
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
                  href={project.projectRepo}
                  rel="noreferrer"
                >
                  <span className="text-xs font-bold sm:text-sm">Code</span>
                  <FaGithub className="text-lg sm:text-xl" />
                </a>
              </div>
            </div>
          ))}
        </div>

        <div
          ref={galleryRef}
          className="space-bg absolute left-1/2 top-1/2 z-30 h-[200vh] w-[200vw] -translate-x-1/2 -translate-y-1/2"
        ></div>

        <div className="planet relative h-full w-full">
          <Image
            src={planet}
            alt=""
            className="absolute -bottom-28 left-1/2 z-50 h-auto w-[650px] -translate-x-1/2"
          />
        </div>
      </div>
    </div>
  )
}
