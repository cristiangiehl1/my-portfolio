'use client'

import { useEffect, useRef } from 'react'

import Magneto from './magneto'

interface ModalProps {
  url: string | null
  isModalOpen: boolean
  closeModal: () => void
}

export default function Modal({ url, closeModal, isModalOpen }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeModal()
      }
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        closeModal()
      }
    }

    if (isModalOpen) {
      document.addEventListener('keydown', handleKeyDown)
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.addEventListener('mousedown', handleClickOutside)
    }
  }, [isModalOpen, closeModal])

  return (
    <div>
      {isModalOpen && url && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-75 p-5">
          <div ref={modalRef} className="relative overflow-hidden rounded-2xl">
            <video
              src={url}
              loop
              muted
              autoPlay
              className="h-[60vh] w-[85vw] object-fill"
            />

            <div onClick={closeModal}>
              <Magneto
                text=" &times;"
                className={`absolute right-2 top-2 h-10 w-10 bg-black text-xs font-bold`}
                magnetoStrength={20}
                magnetoTextStrength={10}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
