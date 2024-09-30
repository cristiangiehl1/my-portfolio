'use client'
import gsap from 'gsap'
import Image from 'next/image'
import { useState } from 'react'
import { FaGithub } from 'react-icons/fa'

import { projects } from '@/api/projects'
import { techStack } from '@/api/tech-stack'
import LinksWithAnimation from '@/app/components/links-with-animation'
import Modal from '@/app/components/modal'

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
          className="home-portfolio-container relative mb-10 flex w-full max-w-[95vw] flex-col justify-center overflow-hidden p-1 md:flex-row lg:w-[930px]"
        >
          <div className="relative flex flex-col items-center justify-between gap-4 bg-gray-900 px-6 py-4">
            <div className="flex flex-col items-center justify-start gap-4">
              <h3 className="text-sm font-bold text-white sm:text-base">
                {project.name}
              </h3>

              <div className="flex flex-wrap gap-4 pb-4 max-sm:pb-10">
                {project.techs.map((tech, techIndex) => {
                  const techData = techStack.find((item) => item.name === tech)
                  return (
                    <div key={techIndex} className="flex items-center gap-2">
                      {techData && (
                        <Image
                          src={techData.iconUrl}
                          alt={tech}
                          title={tech}
                          width={40}
                          height={40}
                          loading="lazy"
                          className="rounded-xl bg-gray-800 p-2"
                          style={{
                            boxShadow:
                              'rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset',
                          }}
                        />
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            <div
              className="absolute bottom-2 right-4 flex items-center justify-start gap-2 rounded-xl bg-gray-950 p-2 transition-colors hover:bg-green-800"
              style={{
                boxShadow:
                  'rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset',
              }}
            >
              <a
                className="flex items-center gap-2 text-left"
                target="_blank"
                href={project.projectRepo}
                rel="noreferrer"
                aria-label="Navigate to project github repository."
              >
                <span className="text-xs font-bold sm:text-sm">Code</span>
                <FaGithub className="text-lg sm:text-xl" />
              </a>
            </div>
          </div>

          <div className="relative flex h-full justify-end border-none">
            <Image
              src={project.projectImg}
              alt=""
              width={600}
              height={400}
              className="w-full cursor-pointer border-none object-cover"
              quality={80}
            />
            {project.projectVideo && (
              <div className="video-wrapper absolute left-0 top-0 h-full w-full cursor-pointer items-center justify-center border-none opacity-0">
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

      <Modal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        url={selectedVideo}
      />
    </section>
  )
}
