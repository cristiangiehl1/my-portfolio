'use client'
import gsap from 'gsap'
import Image from 'next/image'
import { useState } from 'react'
import { FaGithub } from 'react-icons/fa'

import { projects } from '@/api/projects'
import { techStack } from '@/api/tech-stack'
import LinksWithAnimation from '@/app/components/links-with-animation'

export default function HomePortfolio() {
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
    const videoWrapper = projectWrapper.querySelector(
      '.video-wrapper',
    ) as HTMLDivElement
    const video = videoWrapper.querySelector('video') as HTMLVideoElement

    if (action === 'play') {
      gsap.to(videoWrapper, {
        duration: 0.5,
        opacity: 1,
        ease: 'power4.inOut',
      })

      video.play()
    } else if (action === 'pause') {
      gsap.to(videoWrapper, {
        duration: 0.5,
        opacity: 0,
        ease: 'power4.inOut',
      })

      video.pause()
      video.currentTime = 0
    }
  }

  return (
    <section className="flex h-full w-full flex-col items-center justify-between bg-gray-950 px-4 pb-8 pt-4">
      <div className="mb-10 ml-6 mt-6 w-full text-left">
        <h2 className="mb-2 text-xl font-bold tracking-tighter">PORTFOLIO</h2>

        <p className="font-bold">
          Each project is a unique piece of development
        </p>
      </div>

      {projects.slice(0, 3).map((project, index) => (
        <div
          key={index}
          onMouseEnter={(e) => playVideo(e, 'play')}
          onMouseLeave={(e) => playVideo(e, 'pause')}
          className="project-container-home relative mb-10 flex w-full max-w-[95vw] flex-col justify-center overflow-hidden p-1 sm:flex-row lg:w-[800px]"
        >
          <div className="relative flex flex-col items-center justify-between gap-4 bg-gray-900 px-6 py-4">
            <div className="flex flex-col items-center justify-start gap-4">
              <h3 className="text-sm font-bold text-white sm:text-base">
                {project.name}
              </h3>
              <div className="flex flex-wrap gap-4 pb-4">
                {project.techs.map((tech, techIndex) => {
                  const techData = techStack.find((item) => item.name === tech)
                  return (
                    <div key={techIndex} className="flex items-center gap-2">
                      {techData && (
                        <Image
                          src={techData.iconUrl}
                          alt={tech}
                          title={tech}
                          width={25}
                          height={25}
                        />
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="flex w-full items-center justify-start gap-2">
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

          <div className="r relative flex h-full justify-end">
            <Image
              src={project.projectImg}
              alt=""
              width={600}
              className="cursor-pointer"
            />
            {project.projectVideo && (
              <div className="video-wrapper g absolute left-0 top-0 h-full w-full cursor-pointer items-center justify-center opacity-0">
                <video
                  src={project.projectVideo}
                  loop
                  muted
                  className="h-full w-full object-cover"
                  onClick={() => openModal(project.projectVideo)}
                />
              </div>
            )}
          </div>
        </div>
      ))}

      <LinksWithAnimation
        linkProps={{
          href: '/portfolio',
          className: 'p-6 rounded-full border-[2px]',
        }}
        blobProps={{ className: 'rounded-full bg-gray-700' }}
      >
        <span className="relative z-10">
          More projects <sup>{projects.length}</sup>
        </span>
      </LinksWithAnimation>

      {isModalOpen && selectedVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-5"
          onClick={closeModal}
        >
          <div className="relative overflow-hidden rounded-2xl">
            <video
              src={selectedVideo}
              loop
              muted
              autoPlay
              className="w-[85vw] object-cover"
            />
            <button
              className="absolute right-2 top-2 rounded-full bg-black px-4 py-2 text-2xl text-white transition-all hover:bg-white hover:text-black"
              onClick={closeModal}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
