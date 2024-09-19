'use client'
import React, { useEffect, useState } from 'react'

export default function Footer() {
  const [time, setTime] = useState(
    new Intl.DateTimeFormat('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short',
    }).format(new Date()),
  )

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(
        new Intl.DateTimeFormat('pt-BR', {
          hour: '2-digit',
          minute: '2-digit',
          timeZoneName: 'short',
        }).format(new Date()),
      )
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <footer className="absolute bottom-0 left-0 flex w-full justify-between px-8 py-6">
      <div className="flex flex-col gap-2">
        <strong className="text-xs text-gray-500">VERSION</strong>

        <span className="text-sm">2024 &copy; Edition</span>
      </div>

      <div className="flex flex-col gap-2">
        <strong className="text-xs text-gray-500">LOCAL TIME</strong>
        <span className="text-sm">{time}</span>
      </div>
      <div className="flex flex-col gap-1">
        <strong className="text-xs text-gray-500">SOCIALS</strong>
        <div className="flex items-center justify-start gap-6">
          <a
            className="transition-colors hover:text-zinc-500"
            target="_blank"
            href="https://www.instagram.com/cristian.giehl/"
            rel="noreferrer"
          >
            <span className="hover-underline">Instagram</span>
          </a>

          <a
            className="hover-underline"
            target="_blank"
            href="https://www.linkedin.com/in/cristian-giehl-5b3539b4/"
            rel="noreferrer"
          >
            <span className="text-sm">LinkedIn</span>
          </a>
        </div>
      </div>
    </footer>
  )
}
