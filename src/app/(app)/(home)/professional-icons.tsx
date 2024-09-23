'use client'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import Link from 'next/link'
import { type FormEvent, useTransition } from 'react'
import { BiLoader } from 'react-icons/bi'
import { FaGithub, FaLinkedin } from 'react-icons/fa6'

import Magneto from '@/app/components/magneto'

export default function ProfessionalIcons() {
  const [isPending, startTransition] = useTransition()

  async function handleDownloadCV(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    startTransition(async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000))
        // Faz a requisição para a API
        const response = await fetch('/api/download-cv')

        if (!response.ok) {
          throw new Error('Failed to download file')
        }

        // Converte a resposta em um blob
        const blob = await response.blob()

        // Cria um URL para o blob
        const url = window.URL.createObjectURL(blob)

        // Cria um link temporário para o download
        const link = document.createElement('a')
        link.href = url
        link.download = 'cristian-giehl-resume.pdf'
        document.body.appendChild(link)
        link.click()

        // Remove o link temporário e libera o URL
        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)
      } catch (error) {
        console.error('Error downloading file:', error)
      }
    })
  }

  useGSAP(() => {
    gsap.to('.professional-icons-gsap', {
      scale: 1,
      duration: 1.5,
      delay: 0.8,
      ease: 'power3.inOut',
    })
  }, [])
  return (
    <div className="relative mt-4 flex w-full items-center justify-start gap-10">
      <form
        onSubmit={handleDownloadCV}
        className="professional-icons-gsap scale-0"
      >
        <Magneto
          href=""
          text="Download CV"
          className={
            isPending
              ? 'hidden'
              : `magneto-professional-icons h-24 w-24 bg-cyan-900 text-xs font-bold`
          }
          disabled={isPending}
          type="submit"
          magnetoStrength={50}
          magnetoTextStrength={30}
        />

        <span className="">
          <BiLoader
            size={35}
            className={isPending ? 'block animate-spin' : 'hidden'}
          />
        </span>
      </form>

      <div className="flex flex-col gap-4">
        <Link
          className="professional-icons-gsap scale-0 transition-colors hover:text-green-500"
          href={'https://github.com/cristiangiehl1'}
          target="_blank"
        >
          <FaGithub size={25} />
        </Link>
        <Link
          className="professional-icons-gsap scale-0 transition-colors hover:text-green-500"
          href={'https://www.linkedin.com/in/cristian-giehl-5b3539b4/'}
          target="_blank"
        >
          <FaLinkedin size={25} />
        </Link>
      </div>
    </div>
  )
}
