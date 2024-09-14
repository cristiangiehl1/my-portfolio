'use client'
import Link from 'next/link'
import { type FormEvent, useTransition } from 'react'
import { BiLoader } from 'react-icons/bi'
import { FaGithub, FaLinkedin } from 'react-icons/fa6'

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

  return (
    <div className="mt-2 flex w-full items-center gap-4">
      <Link
        className="transition-opacity hover:opacity-40"
        href={'https://github.com/cristiangiehl1'}
        target="_blank"
      >
        <FaGithub size={20} />
      </Link>
      <Link
        className="transition-opacity hover:opacity-40"
        href={'https://www.linkedin.com/in/cristian-giehl-5b3539b4/'}
        target="_blank"
      >
        <FaLinkedin size={20} />
      </Link>

      <form onSubmit={handleDownloadCV}>
        {!isPending ? (
          <button
            className="button-hover-effect flex items-center justify-center"
            type="submit"
            disabled={isPending}
          >
            <span className="text-left text-[12px] font-bold md:text-base">
              Download CV
            </span>
          </button>
        ) : (
          <span>
            <BiLoader size={35} className="animate-spin" />
          </span>
        )}
      </form>
    </div>
  )
}
