'use client'

import FocusTrap from 'focus-trap-react'
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
        <FocusTrap>
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-75 p-5">
            <div
              ref={modalRef}
              className="relative overflow-hidden rounded-2xl"
            >
              <video
                src={url}
                loop
                muted
                autoPlay
                playsInline
                className="h-[50vh] w-[85vw] object-cover lg:h-[65vh] lg:w-[60vw]"
              />

              <div onClick={closeModal} autoFocus>
                <Magneto
                  text=" &times;"
                  className={`absolute right-2 top-2 h-10 w-10 bg-black text-xs font-bold`}
                  magnetoStrength={20}
                  magnetoTextStrength={10}
                />
              </div>
            </div>
          </div>
        </FocusTrap>
      )}
    </div>
  )
}
