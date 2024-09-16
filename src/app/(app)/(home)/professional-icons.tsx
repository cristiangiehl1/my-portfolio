'use client'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
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

  useGSAP(() => {
    const magneto = document.querySelector('.magneto') as HTMLElement
    const magnetoText = document.querySelector('.magnetoText') as HTMLElement

    let mouseX = 0
    let mouseY = 0
    let animationFrame: number | null = null

    const magnetoStrength = 50
    const magnetoTextStrength = 30

    const activateMagneto = () => {
      const boundBox = magneto.getBoundingClientRect()
      const newX = (mouseX - boundBox.left) / magneto.offsetWidth - 0.5
      const newY = (mouseY - boundBox.top) / magneto.offsetHeight - 0.5

      // Atualiza a animação usando os valores armazenados do mouse
      gsap.to(magneto, {
        duration: 0,
        x: newX * magnetoStrength,
        y: newY * magnetoStrength,
        rotate: '0.001deg',
        ease: 'elastic.inOut',
      })

      gsap.to(magnetoText, {
        duration: 0,
        x: newX * magnetoTextStrength,
        y: newY * magnetoTextStrength,
        rotate: '0.001deg',
        ease: 'elastic.inOut',
      })

      // Chama novamente o requestAnimationFrame
      animationFrame = requestAnimationFrame(activateMagneto)
    }

    function onMouseMove(event: MouseEvent) {
      // Atualiza as coordenadas do mouse
      mouseX = event.clientX
      mouseY = event.clientY

      // Inicia a animação se ainda não estiver rodando
      if (!animationFrame) {
        animationFrame = requestAnimationFrame(activateMagneto)
      }
    }

    function resetMagneto() {
      // Cancela o requestAnimationFrame atual
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
        animationFrame = null
      }

      // Reseta as animações do magneto
      gsap.to(magneto, {
        duration: 0.5,
        x: 0,
        y: 0,
        ease: 'elastic.out',
      })

      gsap.to(magnetoText, {
        duration: 0.5,
        x: 0,
        y: 0,
        ease: 'elastic.out',
      })
    }

    // Adicionando os event listeners corretamente
    magneto.addEventListener('mousemove', onMouseMove)
    magneto.addEventListener('mouseleave', resetMagneto)

    // Cleanup
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }

      magneto.removeEventListener('mousemove', onMouseMove)
      magneto.removeEventListener('mouseleave', resetMagneto)
    }
  }, [])
  return (
    <div className="relative mt-4 flex w-full items-center justify-start gap-10">
      <form onSubmit={handleDownloadCV} className="">
        <button
          className={
            isPending
              ? 'hidden'
              : 'magneto flex h-24 w-24 items-center justify-center rounded-full border-none bg-green-500 text-white'
          }
          type="submit"
          disabled={isPending}
        >
          <span className="magnetoText text-left text-[12px] font-bold">
            Download CV
          </span>
        </button>

        <span>
          <BiLoader
            size={35}
            className={isPending ? 'block animate-spin' : 'hidden'}
          />
        </span>
      </form>

      <div className="flex flex-col gap-4">
        <Link
          className="transition-colors hover:text-green-500"
          href={'https://github.com/cristiangiehl1'}
          target="_blank"
        >
          <FaGithub size={25} />
        </Link>
        <Link
          className="transition-colors hover:text-green-500"
          href={'https://www.linkedin.com/in/cristian-giehl-5b3539b4/'}
          target="_blank"
        >
          <FaLinkedin size={25} />
        </Link>
      </div>
    </div>
  )
}
