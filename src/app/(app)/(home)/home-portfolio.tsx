'use client'
import Image, { type StaticImageData } from 'next/image'
import { useState } from 'react'
import { FaGithub } from 'react-icons/fa'

import { projects } from '@/api/projects'
import { techStack } from '@/api/tech-stack'

export default function HomePortfolio() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState<StaticImageData | null>(
    null,
  )

  const openModal = (image: StaticImageData) => {
    setSelectedImage(image)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedImage(null)
  }

  return (
    <section className="m-auto flex h-full max-w-[95vw] flex-col items-center justify-between rounded-2xl p-4 lg:max-w-[70vw]">
      <div className="mb-6 w-full text-left">
        <h2 className="mb-2 text-xl font-bold tracking-tighter">PORTFOLIO</h2>

        <p className="font-bold">
          Each project is a unique piece of development
        </p>
      </div>

      {projects.slice(0, 3).map((project, index) => (
        <div
          key={index}
          className="relative mb-8 flex w-full flex-col justify-between rounded-2xl bg-gray-950 px-6 pb-12 pt-6 sm:flex-row sm:pb-6"
        >
          <div className="flex flex-col items-center justify-start gap-4 px-4">
            <h3 className="font-bold text-white">{project.name}</h3>

            <div className="mb-4 flex flex-wrap gap-4">
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

            <div className="absolute bottom-4 left-4 flex w-full items-center justify-start gap-2">
              <a
                className="flex items-center gap-2 text-left transition-colors hover:text-zinc-600"
                target="_blank"
                href={project.projectRepo}
                rel="noreferrer"
              >
                <span className="text-sm font-bold">Code</span>
                <FaGithub size={20} />
              </a>
            </div>
          </div>

          <div className="flex h-full justify-end">
            <Image
              src={project.projectImg}
              alt=""
              width={600}
              className="cursor-pointer rounded-2xl"
              onClick={() => openModal(project.projectImg)}
            />
          </div>
        </div>
      ))}

      {isModalOpen && selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-5"
          onClick={closeModal}
        >
          <div className="relative">
            <Image
              src={selectedImage}
              alt="Expanded view"
              width={1000}
              height={800}
              quality={100}
              className="rounded-2xl"
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
      <div className="">
        <a
          href="#"
          className="relative z-10 rounded-full bg-zinc-950 p-6 font-bold"
        >
          More projects <sup>{projects.length}</sup>
        </a>
      </div>
    </section>
  )
}
