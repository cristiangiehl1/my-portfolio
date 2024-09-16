'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useEffect, useRef, useState } from 'react'
import { CgMail } from 'react-icons/cg'
import { FaInstagram, FaLinkedin } from 'react-icons/fa'
import { FaX } from 'react-icons/fa6'

import { NavLink } from './nav-links'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuMobileContainer = useRef(null)
  const menuContainer = useRef(null)

  const tl = useRef(gsap.timeline({ paused: true }))

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState)
  }

  useGSAP(
    () => {
      tl.current
        .to(menuMobileContainer.current, {
          duration: 1.25,
          clipPath: 'inset(0% 0% 0% 0%)',
          ease: 'power4.inOut',
        })
        .to('.link-mov', {
          duration: 0.7,
          clipPath: 'inset(0% 0% 0% 0%)',
          ease: 'power4.inOut',
        })
    },
    { scope: menuContainer },
  )

  useEffect(() => {
    if (isMenuOpen) {
      tl.current.play()
    } else {
      tl.current.reverse()
    }
  }, [isMenuOpen])

  return (
    <header
      ref={menuContainer}
      className="flex items-center justify-between px-6 pt-6"
    >
      <div>
        <span className="font-bold text-white">Cristian.dev</span>
      </div>

      {/* Desktop Menu */}
      <nav className="hidden gap-8 sm:flex">
        <button className="relative">
          <NavLink
            className="current-route-desktop data-[current=true]:text-green-500"
            href={'/'}
          >
            Home
          </NavLink>
        </button>

        <button className="relative">
          <NavLink
            className="current-route-desktop data-[current=true]:font-bold data-[current=true]:text-green-500"
            href={'#'}
          >
            Projects
          </NavLink>
        </button>

        <button className="relative">
          <NavLink
            className="current-route-desktop data-[current=true]:font-bold data-[current=true]:text-green-500"
            href={'#'}
          >
            About
          </NavLink>
        </button>

        <button className="relative">
          <NavLink
            className="current-route-desktop data-[current=true]:font-bold data-[current=true]:text-green-500"
            href={'#'}
          >
            Contact
          </NavLink>
        </button>
      </nav>

      {/* Mobile Menu Button */}
      <button
        className="group flex items-center justify-center gap-2 text-white sm:hidden"
        onClick={toggleMenu}
      >
        Menu
      </button>

      {/* Mobile Menu */}
      <div
        ref={menuMobileContainer}
        className="clip-hide fixed right-0 top-0 z-50 grid h-full w-full grid-rows-[max-content_1fr_max-content] bg-zinc-900 px-10 py-4"
      >
        <h3 className="mt-8 w-full text-xs font-bold tracking-tighter text-zinc-500">
          NAVIGATION
        </h3>

        <nav className="my-4 flex flex-col items-start gap-10 border-y-2 border-zinc-500 py-10">
          <button onClick={toggleMenu} className="link-mov relative">
            <NavLink
              className="currentRoute text-5xl tracking-widest"
              href={'/'}
            >
              Home
            </NavLink>
          </button>

          <button onClick={toggleMenu} className="link-mov relative">
            <NavLink
              className="currentRoute text-5xl tracking-widest"
              href={'#'}
            >
              Projects
            </NavLink>
          </button>

          <button onClick={toggleMenu} className="link-mov relative">
            <NavLink
              className="currentRoute text-5xl tracking-widest"
              href={'#'}
            >
              About
            </NavLink>
          </button>

          <button onClick={toggleMenu} className="link-mov relative">
            <NavLink
              className="currentRoute text-5xl tracking-widest"
              href={'#'}
            >
              Contact
            </NavLink>
          </button>
        </nav>

        <div className="mb-4">
          <h3 className="mb-4 text-xs font-bold tracking-tighter text-zinc-500">
            SOCIALS
          </h3>
          <div className="flex items-center justify-start gap-4">
            <a
              className="transition-colors hover:text-zinc-500"
              href="https://www.instagram.com/cristian.giehl/"
            >
              <FaInstagram size={20} />
            </a>

            <a
              className="transition-colors hover:text-zinc-500"
              href="https://www.linkedin.com/in/cristian-giehl-5b3539b4/"
            >
              <FaLinkedin size={20} />
            </a>

            <a
              className="transition-colors hover:text-zinc-500"
              href="mailto:cristiangiehl@gmail.com"
              title="Gmail"
            >
              <CgMail size={25} />
            </a>
          </div>
        </div>

        <button
          className="absolute right-5 top-5 rounded-full p-2 transition-colors hover:text-zinc-500"
          onClick={toggleMenu}
        >
          <FaX size={15} />
        </button>
      </div>
    </header>
  )
}
