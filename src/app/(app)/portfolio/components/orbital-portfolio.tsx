'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import Image, { type StaticImageData } from 'next/image'
import { useEffect, useState } from 'react'
import { FaGithub } from 'react-icons/fa'
import { TbWorld } from 'react-icons/tb'

import { type Project, projects } from '@/api/projects'
import { techStack } from '@/api/tech-stack'
import Modal from '@/app/components/modal'
import earth from '@/assets/planet07.png'
import venus from '@/assets/planet08.png'

interface GroupedProjectsInterface {
  projects: Project[]
  planet: StaticImageData
}

export default function OrbitalPortfolio() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)
  const [currentBanner, setCurrentBanner] = useState(0)

  const planets: StaticImageData[] = [earth, venus]

  const groupedProjects = projects.reduce<GroupedProjectsInterface[]>(
    (acc, project, index) => {
      if (index % 4 === 0) {
        const planet = planets[acc.length % planets.length]
        acc.push({
          projects: [],
          planet,
        })
      }

      acc[Math.floor(index / 4)].projects.push(project)
      return acc
    },
    [],
  )

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

  const totalSlides = groupedProjects.length

  function animateSlide(direction: 'left' | 'right') {
    const banners = document.querySelectorAll(
      '.banner',
    ) as NodeListOf<HTMLElement>
    const selectedBanner = banners[currentBanner]

    if (gsap.isTweening(selectedBanner)) {
      return
    }

    if (direction === 'left' && currentBanner === 0) return

    if (direction === 'right' && currentBanner === totalSlides - 1) return

    const nextImgIndex =
      (direction === 'left'
        ? currentBanner - 1
        : currentBanner + 1 + banners.length) % banners.length
    const nextBanner = banners[nextImgIndex]

    gsap.to(selectedBanner, {
      x: direction === 'left' ? window.innerWidth : -window.innerWidth,
      duration: 1.5,
      ease: 'power4.out',
      onComplete: () => {
        selectedBanner.style.display = 'none'
      },
    })

    gsap.fromTo(
      nextBanner,
      {
        x: direction === 'left' ? -window.innerWidth : +window.innerWidth,
        display: 'block',
      },
      { x: 0, duration: 1.5, ease: 'power4.out' },
    )

    setCurrentBanner(nextImgIndex)
  }

  // show current banner animation
  useGSAP(() => {
    const tl = gsap.timeline({})

    tl.to('.planet0', {
      opacity: 1,
      duration: 1.5,
      ease: 'circ.inOut',
    })
      .to('.banner', {
        scale: 1,
        duration: 4,
        ease: 'expo.inOut',
        delay: -1,
      })
      .to('.project', {
        opacity: 1,
        duration: 0.5,
        ease: 'power4.out',
        stagger: {
          amount: 1.5,
        },
      })
  }, [])

  // handle modal changes
  useEffect(() => {
    const sliders = document.querySelectorAll(
      '.slider',
    ) as NodeListOf<HTMLDivElement>

    if (!sliders) return

    const handleMouseEnter = () => {
      sliders.forEach((slider) => {
        slider.style.animationPlayState = 'paused'
      })
    }

    const handleMouseLeave = () => {
      if (isModalOpen) return

      sliders.forEach((slider) => {
        slider.style.animationPlayState = 'running'
      })
    }

    if (!isModalOpen) {
      sliders.forEach((slider) => {
        slider.style.animationPlayState = 'running'
      })
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
  }, [isModalOpen])

  // counter and slide animation
  useEffect(() => {
    const prevSlides = document.querySelectorAll(
      '.slider-preview .preview',
    ) as NodeListOf<HTMLDivElement>

    function updateCounterPosition() {
      const countX = -25 * currentBanner

      gsap.to('.counter', {
        x: countX,
        duration: 1,
        ease: 'elastic.inOut',
      })
    }

    function updateActiveSlidePreview() {
      prevSlides.forEach((prev) => prev.classList.remove('active'))
      prevSlides[currentBanner].classList.add('active')
    }

    updateCounterPosition()
    updateActiveSlidePreview()
  }, [currentBanner, groupedProjects])

  // handle preview slider changes
  useEffect(() => {
    const sliderPreview = document.querySelector(
      '.slider-preview',
    ) as HTMLDivElement
    const prevSlides = document.querySelectorAll(
      '.slider-preview .preview',
    ) as NodeListOf<HTMLDivElement>

    if (!sliderPreview) return

    sliderPreview.addEventListener('click', (event: MouseEvent) => {
      if (event.target instanceof HTMLElement) {
        const clickedPrev = event.target.closest('.preview') as HTMLDivElement

        if (clickedPrev) {
          const clickedIndex = Array.from(prevSlides).indexOf(clickedPrev)

          if (clickedIndex !== currentBanner) {
            if (clickedIndex < currentBanner) {
              setCurrentBanner(clickedIndex)
              animateSlide('left')
            } else {
              setCurrentBanner(clickedIndex)
              animateSlide('right')
            }
          }
        }
      }
    })
  })

  return (
    <div className="relative flex h-screen w-full gap-10">
      <aside
        className="slider-counter absolute left-2 top-1/2 z-50 flex -translate-y-1/2 flex-col items-start justify-center"
        style={{ clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)' }}
      >
        <div className="counter ml-1 flex gap-4">
          {groupedProjects.map((group, index) => (
            <p key={index} className="h-[30px]">
              {index + 1}
            </p>
          ))}
        </div>

        <div className="">
          <p className="">&mdash;</p>
        </div>

        <div className="ml-1">
          <p className="">{groupedProjects.length}</p>
        </div>
      </aside>

      <aside className="slider-preview absolute bottom-2 right-2 z-50 flex h-[50px] gap-5">
        {planets.map((planet, index) => (
          <div
            key={index}
            className={`preview ${index === 0 && 'active'} relative flex-1 cursor-pointer`}
          >
            <Image src={planet} alt="" className="aboslute h-full w-auto" />
          </div>
        ))}
      </aside>

      {groupedProjects.map((group, index) => (
        <div
          key={index}
          className={`banner ${index === 0 ? 'absolute' : 'hidden'} h-screen w-[100vw] scale-[0.2] overflow-hidden text-center`}
        >
          <div
            style={
              {
                '--quantity': group.projects.length,
              } as React.CSSProperties
            }
            className="slider absolute bottom-[40%] left-[calc(50%_-175px)] z-[60] flex h-[250px] w-[350px] items-center justify-center rounded-2xl lg:bottom-[210px] lg:left-[calc(50%_-275px)] lg:h-[320px] lg:w-[550px]"
          >
            {group.projects.map((project, index) => (
              <div
                style={
                  {
                    '--position': index,
                  } as React.CSSProperties
                }
                key={index}
                className="project rounded-2x absolute inset-0 flex flex-col items-center"
              >
                <div className="flex h-full w-full items-center justify-between gap-6">
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

                  <p className="video-name pointer-events-none w-full rounded-t-2xl px-4 py-2 text-center text-base font-extrabold lg:text-2xl">
                    {project.name}
                  </p>

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
                      <span className="text-xs font-bold sm:text-sm">
                        Deploy
                      </span>
                      <TbWorld className="text-lg sm:text-xl" />
                    </a>
                  </div>
                </div>

                <div className="flex flex-col items-start justify-center gap-2">
                  <div
                    onMouseEnter={(e) => playVideo(e, 'play')}
                    onMouseLeave={(e) => playVideo(e, 'pause')}
                    className="project-video-image relative h-[150px] w-[300px] cursor-pointer overflow-hidden rounded-xl lg:h-[220px] lg:w-[500px]"
                    style={{
                      boxShadow:
                        ' rgb(0, 0, 0) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;',
                    }}
                  >
                    <div className="preview-img absolute inset-0 opacity-100 hover:opacity-0">
                      <Image
                        src={project.projectImg}
                        alt={project.name || 'Project image'}
                        className="h-full w-full object-cover"
                        quality={80}
                      />
                    </div>
                    <video
                      src={project.projectVideo}
                      loop
                      muted
                      className="project-video absolute inset-0 h-full w-full object-cover opacity-0"
                      onClick={() => openModal(project.projectVideo)}
                    />
                  </div>

                  <div className="flex w-full items-center justify-center gap-4 rounded-b-2xl">
                    {project.techs.map((tech, techIndex) => {
                      const techData = techStack.find(
                        (item) => item.name === tech,
                      )
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
                              className="h-auto w-[15px] md:w-[25px]"
                            />
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="planet-container relative h-full w-full">
            <Image
              src={group.planet}
              width={400}
              height={400}
              priority
              alt=""
              className={`planet${index} absolute bottom-[30%] left-1/2 z-50 h-auto w-[250px] -translate-x-1/2 lg:bottom-0 lg:w-[400px] ${index === 0 ? 'opacity-0' : 'opacity-1'}`}
            />
          </div>

          <Modal
            isModalOpen={isModalOpen}
            closeModal={closeModal}
            url={selectedVideo}
          />
        </div>
      ))}
    </div>
  )
}
