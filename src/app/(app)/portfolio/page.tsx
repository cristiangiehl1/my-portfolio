'use client'

import './portfolio.css'

import gsap from 'gsap'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { FaGithub } from 'react-icons/fa'

import { projects } from '@/api/projects'
import { techStack } from '@/api/tech-stack'
import Modal from '@/app/components/modal'
import { NavLink } from '@/app/components/nav-links'
import spaceshipFrame from '@/assets/blue_game_backrground_01.jpg'
import planet from '@/assets/planet.png'
import { createComet } from '@/utils/create-comet'
import { createStar } from '@/utils/create-start'

export default function Portfolio() {
  const pathname = usePathname()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)

  const projectsContainerRef = useRef<HTMLDivElement>(null)
  const galleryRef = useRef<HTMLDivElement>(null)
  const sliderRef = useRef<HTMLDivElement>(null)

  const resizeTimeout = useRef<number | null>(null)

  const openModal = (url: string) => {
    setSelectedVideo(url)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedVideo(null)
  }

  function changeRouteSelected(event: React.MouseEvent<HTMLElement>) {
    const routes = document.getElementsByClassName('current-path-project')

    Array.from(routes).forEach((route) => {
      route.setAttribute('data-current', 'false')
    })

    event.currentTarget.setAttribute('data-current', 'true')
  }

  function setPreviusRouteSelected() {
    const routes = document.getElementsByClassName('current-path-project')

    Array.from(routes).forEach((route) => {
      const href = route.getAttribute('href')

      if (href === pathname) {
        route.setAttribute('data-current', 'true')
      } else {
        route.setAttribute('data-current', 'false')
      }
    })
  }

  function playVideo(
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    action: 'play' | 'pause',
  ) {
    const projectWrapper = event.currentTarget as HTMLDivElement

    const video = projectWrapper.querySelector('video') as HTMLVideoElement

    if (action === 'play') {
      gsap.to(video, {
        duration: 0.5,
        opacity: 1,
        ease: 'power4.inOut',
      })

      video.play()
    } else if (action === 'pause') {
      gsap.to(video, {
        duration: 0.5,
        opacity: 0,
        ease: 'power4.inOut',
      })

      video.pause()
      video.currentTime = 0
    }
  }

  // background movement
  useEffect(() => {
    const projectContainerElement =
      projectsContainerRef.current as HTMLDivElement

    function handleMouseMovement(e: MouseEvent) {
      const { clientX, clientY, currentTarget } = e

      const targetElement = currentTarget as HTMLDivElement
      const galleryElement = galleryRef.current as HTMLDivElement

      if (!galleryElement) return

      const { width, height } = targetElement.getBoundingClientRect()

      const centerX = width / 2
      const centerY = height / 2

      const sensitivity = 1
      const deltaX = (centerX - clientX) / sensitivity
      const deltaY = (centerY - clientY) / sensitivity

      galleryElement.style.transform = `translate(calc(-50% + ${deltaX}px), calc(-50% + ${deltaY}px))`
    }

    projectContainerElement.addEventListener(
      'mousemove',
      handleMouseMovement as EventListener,
    )

    return () => {
      projectContainerElement.removeEventListener(
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

    generateStars()
    const cometInterval = setInterval(generateComet, 500)

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

  // video play state handle
  useEffect(() => {
    const sliderElement = sliderRef.current

    if (!sliderElement) return

    const handleMouseEnter = () => {
      sliderElement.style.animationPlayState = 'paused'
    }

    const handleMouseLeave = () => {
      sliderElement.style.animationPlayState = 'running'
    }

    const projectElements = document.querySelectorAll('.project')
    projectElements.forEach((projectElement) => {
      projectElement.addEventListener('mouseenter', handleMouseEnter)
      projectElement.addEventListener('mouseleave', handleMouseLeave)
    })

    return () => {
      projectElements.forEach((projectElement) => {
        projectElement.removeEventListener('mouseenter', handleMouseEnter)
        projectElement.removeEventListener('mouseleave', handleMouseLeave)
      })
    }
  }, [])

  return (
    <div
      ref={projectsContainerRef}
      className="projects-container relative h-screen w-full overflow-hidden"
    >
      <div className="banner relative h-screen w-full overflow-hidden text-center">
        <header className="absolute left-0 top-0 z-50 p-2">
          <nav className="">
            <ul className="flex gap-4">
              <li className="relative">
                <Image
                  src={spaceshipFrame}
                  alt=""
                  width={85}
                  className="rounded-2xl"
                />
                <NavLink
                  className="current-path-project absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 rounded-sm p-[18px] text-[#E0FFFF] data-[current=true]:text-[#00FFFF]"
                  href={'/'}
                  onMouseEnter={changeRouteSelected}
                  onMouseLeave={setPreviusRouteSelected}
                >
                  Home
                </NavLink>
              </li>

              <li className="relative">
                <Image
                  src={spaceshipFrame}
                  alt=""
                  width={85}
                  className="rounded-2xl"
                />
                <NavLink
                  className="current-path-project absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-sm p-[18px] data-[current=true]:text-[#00FFFF]"
                  href={'/portfolio'}
                  onMouseEnter={changeRouteSelected}
                  onMouseLeave={setPreviusRouteSelected}
                >
                  Portfolio
                </NavLink>
              </li>

              <li className="relative">
                <Image
                  src={spaceshipFrame}
                  alt=""
                  width={85}
                  className="rounded-2xl"
                />
                <NavLink
                  className="current-path-project absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-sm p-[18px] text-[#E0FFFF] data-[current=true]:text-[#00FFFF]"
                  href={'/about'}
                  onMouseEnter={changeRouteSelected}
                  onMouseLeave={setPreviusRouteSelected}
                >
                  About
                </NavLink>
              </li>

              <li className="relative">
                <Image
                  src={spaceshipFrame}
                  alt=""
                  width={85}
                  className="rounded-2xl"
                />
                <NavLink
                  className="current-path-project absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-sm p-[18px] text-[#E0FFFF] data-[current=true]:text-[#00FFFF]"
                  href={'/contact'}
                  onMouseEnter={changeRouteSelected}
                  onMouseLeave={setPreviusRouteSelected}
                >
                  Contact
                </NavLink>
              </li>
            </ul>
          </nav>
        </header>

        <div
          style={
            {
              '--quantity': projects.length,
            } as React.CSSProperties
          }
          ref={sliderRef}
          className="slider absolute left-[calc(50%_-200px)] top-[28%] z-[60] h-[280px] w-[400px] rounded-2xl max-sm:top-[33%] lg:top-[26%] lg:h-[310px]"
        >
          {projects.map((project, index) => (
            <div
              style={
                {
                  '--position': index,
                } as React.CSSProperties
              }
              key={index}
              className="project absolute inset-0 flex flex-col items-center rounded-2xl"
            >
              <p className="video-name atext-center pointer-events-none w-full rounded-t-2xl px-4 py-2 text-center text-base font-extrabold lg:text-2xl">
                {project.name}
              </p>

              <div
                onMouseEnter={(e) => playVideo(e, 'play')}
                onMouseLeave={(e) => playVideo(e, 'pause')}
                className="project-video-image relative h-[160px] w-[320px] cursor-pointer overflow-hidden rounded-xl max-sm:h-[150px] max-sm:w-[300px] sm:h-[180px] sm:w-[360px] lg:h-[200px] lg:w-[400px]"
              >
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
                  className="project-video absolute inset-0 opacity-0"
                  onClick={() => openModal(project.projectVideo)}
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

        <div className="planet-container relative h-full w-full">
          <Image
            src={planet}
            alt=""
            className="absolute -bottom-[140px] left-1/2 z-50 h-auto w-[650px] -translate-x-1/2 max-sm:-bottom-[20vw]"
          />
        </div>
      </div>

      <Modal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        url={selectedVideo}
      />
    </div>
  )
}
