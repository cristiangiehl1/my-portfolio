'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { FaGithub } from 'react-icons/fa'
import { TbWorld } from 'react-icons/tb'

import { projects } from '@/api/projects'
import { techStack } from '@/api/tech-stack'
import Modal from '@/app/components/modal'
import planet from '@/assets/planet.png'

export default function OrbitalPortfolio() {
  const sliderRef = useRef<HTMLDivElement>(null)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)

  const openModal = (url: string) => {
    setSelectedVideo(url)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedVideo(null)
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

  useGSAP(() => {
    const tl = gsap.timeline({})

    tl.to('.planet', {
      clipPath: 'circle(150% at 50% 50%)',
      opacity: 1,
      duration: 2,
      ease: 'circ.inOut',
    })
      .to('.banner', {
        scale: 1,
        duration: 6,
        ease: 'sine.inOut',
        delay: -1,
      })
      .to('.project', {
        opacity: 1,
        duration: 0.8,
        ease: 'power4.out',
        stagger: {
          amount: 1,
        },
      })
  }, [])

  return (
    <div className="relative flex h-screen w-full gap-10">
      <aside className="absolute left-2 top-1/2 z-[9999px] -translate-y-1/2">
        <nav className="flex flex-col gap-4">
          <a href="#">Planet 1</a>
          <a href="#">Planet 2</a>
          <a href="#">Planet 3</a>
        </nav>
      </aside>
      <div className="banner absolute -z-10 h-screen w-[100vw] scale-[0.2] overflow-hidden bg-red-500 text-center">
        <div
          style={
            {
              '--quantity': projects.length,
            } as React.CSSProperties
          }
          ref={sliderRef}
          className="slider absolute left-[calc(50%_-200px)] top-[28%] z-[60] h-[280px] w-[400px] rounded-2xl sm:top-[30%] sm:h-[300px] lg:top-[22%] lg:h-[400px] max-sm:top-[33%]"
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
                className="project-video-image relative h-[160px] w-[320px] cursor-pointer overflow-hidden rounded-xl sm:h-[180px] sm:w-[360px] lg:h-[200px] lg:w-[400px] max-sm:h-[150px] max-sm:w-[300px]"
                style={{
                  boxShadow:
                    ' rgb(0, 0, 0) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;',
                }}
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
                      className="relative items-center gap-2 rounded-lg bg-slate-900 p-2"
                      style={{
                        boxShadow:
                          ' rgb(0, 0, 0) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;',
                      }}
                    >
                      {techData && (
                        <Image
                          src={techData.iconUrl}
                          alt={tech}
                          title={tech}
                          width={35}
                          height={35}
                          className="h-auto w-[15px] md:w-[35px]"
                        />
                      )}
                    </div>
                  )
                })}
              </div>

              <div className="flex items-center justify-center gap-6">
                <div
                  className="rounded-2xl bg-slate-800 p-2 hover:bg-slate-500"
                  style={{
                    boxShadow:
                      'rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;',
                  }}
                >
                  <a
                    className="flex items-center gap-2 text-left"
                    target="_blank"
                    href={project.projectRepo}
                    rel="noreferrer"
                  >
                    <span className="text-xs font-bold sm:text-sm">Code</span>
                    <FaGithub className="text-lg sm:text-xl" />
                  </a>
                </div>

                <div
                  className="rounded-2xl bg-slate-800 p-2 hover:bg-slate-500"
                  style={{
                    boxShadow:
                      'rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;',
                  }}
                >
                  <a
                    className="flex items-center gap-2 text-left"
                    target="_blank"
                    href={project.projectRepo}
                    rel="noreferrer"
                  >
                    <span className="text-xs font-bold sm:text-sm">Deploy</span>
                    <TbWorld className="text-lg sm:text-xl" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="planet-container relative h-full w-full">
          <Image
            src={planet}
            priority
            alt=""
            className="planet absolute -bottom-[140px] left-1/2 z-50 h-auto w-[650px] -translate-x-1/2 opacity-0 max-sm:-bottom-[50px]"
            style={{
              clipPath: 'circle(0% at 50% 50%)',
            }}
          />
        </div>

        <Modal
          isModalOpen={isModalOpen}
          closeModal={closeModal}
          url={selectedVideo}
        />
      </div>

      <div className="banner absolute -z-10 h-screen w-[100vw] scale-[0.2] overflow-hidden bg-red-500 text-center">
        <div
          style={
            {
              '--quantity': projects.length,
            } as React.CSSProperties
          }
          ref={sliderRef}
          className="slider absolute left-[calc(50%_-200px)] top-[28%] z-[60] h-[280px] w-[400px] rounded-2xl sm:top-[30%] sm:h-[300px] lg:top-[22%] lg:h-[400px] max-sm:top-[33%]"
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
                className="project-video-image relative h-[160px] w-[320px] cursor-pointer overflow-hidden rounded-xl sm:h-[180px] sm:w-[360px] lg:h-[200px] lg:w-[400px] max-sm:h-[150px] max-sm:w-[300px]"
                style={{
                  boxShadow:
                    ' rgb(0, 0, 0) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;',
                }}
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
                      className="relative items-center gap-2 rounded-lg bg-slate-900 p-2"
                      style={{
                        boxShadow:
                          ' rgb(0, 0, 0) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;',
                      }}
                    >
                      {techData && (
                        <Image
                          src={techData.iconUrl}
                          alt={tech}
                          title={tech}
                          width={35}
                          height={35}
                          className="h-auto w-[15px] md:w-[35px]"
                        />
                      )}
                    </div>
                  )
                })}
              </div>

              <div className="flex items-center justify-center gap-6">
                <div
                  className="rounded-2xl bg-slate-800 p-2 hover:bg-slate-500"
                  style={{
                    boxShadow:
                      'rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;',
                  }}
                >
                  <a
                    className="flex items-center gap-2 text-left"
                    target="_blank"
                    href={project.projectRepo}
                    rel="noreferrer"
                  >
                    <span className="text-xs font-bold sm:text-sm">Code</span>
                    <FaGithub className="text-lg sm:text-xl" />
                  </a>
                </div>

                <div
                  className="rounded-2xl bg-slate-800 p-2 hover:bg-slate-500"
                  style={{
                    boxShadow:
                      'rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;',
                  }}
                >
                  <a
                    className="flex items-center gap-2 text-left"
                    target="_blank"
                    href={project.projectRepo}
                    rel="noreferrer"
                  >
                    <span className="text-xs font-bold sm:text-sm">Deploy</span>
                    <TbWorld className="text-lg sm:text-xl" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="planet-container relative h-full w-full">
          <Image
            src={planet}
            priority
            alt=""
            className="planet absolute -bottom-[140px] left-1/2 z-50 h-auto w-[650px] -translate-x-1/2 opacity-0 max-sm:-bottom-[50px]"
            style={{
              clipPath: 'circle(0% at 50% 50%)',
            }}
          />
        </div>

        <Modal
          isModalOpen={isModalOpen}
          closeModal={closeModal}
          url={selectedVideo}
        />
      </div>

      <div className="banner absolute -z-10 h-screen w-[100vw] scale-[0.2] overflow-hidden bg-red-500 text-center">
        <div
          style={
            {
              '--quantity': projects.length,
            } as React.CSSProperties
          }
          ref={sliderRef}
          className="slider absolute left-[calc(50%_-200px)] top-[28%] z-[60] h-[280px] w-[400px] rounded-2xl sm:top-[30%] sm:h-[300px] lg:top-[22%] lg:h-[400px] max-sm:top-[33%]"
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
                className="project-video-image relative h-[160px] w-[320px] cursor-pointer overflow-hidden rounded-xl sm:h-[180px] sm:w-[360px] lg:h-[200px] lg:w-[400px] max-sm:h-[150px] max-sm:w-[300px]"
                style={{
                  boxShadow:
                    ' rgb(0, 0, 0) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;',
                }}
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
                      className="relative items-center gap-2 rounded-lg bg-slate-900 p-2"
                      style={{
                        boxShadow:
                          ' rgb(0, 0, 0) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;',
                      }}
                    >
                      {techData && (
                        <Image
                          src={techData.iconUrl}
                          alt={tech}
                          title={tech}
                          width={35}
                          height={35}
                          className="h-auto w-[15px] md:w-[35px]"
                        />
                      )}
                    </div>
                  )
                })}
              </div>

              <div className="flex items-center justify-center gap-6">
                <div
                  className="rounded-2xl bg-slate-800 p-2 hover:bg-slate-500"
                  style={{
                    boxShadow:
                      'rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;',
                  }}
                >
                  <a
                    className="flex items-center gap-2 text-left"
                    target="_blank"
                    href={project.projectRepo}
                    rel="noreferrer"
                  >
                    <span className="text-xs font-bold sm:text-sm">Code</span>
                    <FaGithub className="text-lg sm:text-xl" />
                  </a>
                </div>

                <div
                  className="rounded-2xl bg-slate-800 p-2 hover:bg-slate-500"
                  style={{
                    boxShadow:
                      'rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;',
                  }}
                >
                  <a
                    className="flex items-center gap-2 text-left"
                    target="_blank"
                    href={project.projectRepo}
                    rel="noreferrer"
                  >
                    <span className="text-xs font-bold sm:text-sm">Deploy</span>
                    <TbWorld className="text-lg sm:text-xl" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="planet-container relative h-full w-full">
          <Image
            src={planet}
            priority
            alt=""
            className="planet absolute -bottom-[140px] left-1/2 z-50 h-auto w-[650px] -translate-x-1/2 opacity-0 max-sm:-bottom-[50px]"
            style={{
              clipPath: 'circle(0% at 50% 50%)',
            }}
          />
        </div>

        <Modal
          isModalOpen={isModalOpen}
          closeModal={closeModal}
          url={selectedVideo}
        />
      </div>
    </div>
  )
}
