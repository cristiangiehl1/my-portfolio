'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { CgMail } from 'react-icons/cg'
import { FaInstagram, FaLinkedin } from 'react-icons/fa'
import { FaX } from 'react-icons/fa6'

import AnimatedLogo from './animated-logo'
import Located from './located'
import { NavLink } from './nav-links'

export default function Header() {
  const pathname = usePathname()

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const menuMobileContainer = useRef(null)
  const menuContainer = useRef(null)

  const tl = useRef(gsap.timeline({ paused: true }))

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState)
  }

  function changeRouteSelected(event: React.MouseEvent<HTMLElement>) {
    const routes = document.getElementsByClassName('current-pathname')

    Array.from(routes).forEach((route) => {
      route.setAttribute('data-current', 'false')
    })

    console.log(event.currentTarget)

    event.currentTarget.setAttribute('data-current', 'true')
  }

  function setPreviusRouteSelected() {
    const routes = document.getElementsByClassName('current-pathname')

    Array.from(routes).forEach((route) => {
      const href = route.getAttribute('href')

      if (href === pathname) {
        route.setAttribute('data-current', 'true')
      } else {
        route.setAttribute('data-current', 'false')
      }
    })
  }

  useGSAP(() => {
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

    gsap.to('.current-route-desktop', {
      opacity: 1,
      y: 0,
      delay: 0.8,
      ease: 'power4.out',
      stagger: {
        amount: 0.3,
      },
    })
  }, [menuMobileContainer])

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
      <AnimatedLogo />

      <Located />

      {/* Desktop Menu */}
      <nav className="hidden gap-8 sm:flex">
        <NavLink
          className="current-pathname current-route-desktop relative translate-y-20 opacity-0 data-[current=true]:text-teal-500"
          href={'/'}
          onMouseEnter={changeRouteSelected}
          onMouseLeave={setPreviusRouteSelected}
        >
          Home
        </NavLink>

        <NavLink
          className="current-pathname current-route-desktop relative translate-y-20 opacity-0 data-[current=true]:text-teal-500"
          href={'/portfolio'}
          onMouseEnter={changeRouteSelected}
          onMouseLeave={setPreviusRouteSelected}
        >
          Portfolio
        </NavLink>

        <NavLink
          className="current-pathname current-route-desktop relative translate-y-20 opacity-0 data-[current=true]:text-teal-500"
          href={'/about'}
          onMouseEnter={changeRouteSelected}
          onMouseLeave={setPreviusRouteSelected}
        >
          About
        </NavLink>

        <NavLink
          className="current-pathname current-route-desktop relative translate-y-20 opacity-0 data-[current=true]:text-teal-500"
          href={'/contact'}
          onMouseEnter={changeRouteSelected}
          onMouseLeave={setPreviusRouteSelected}
        >
          Contact
        </NavLink>
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
          <NavLink
            onMouseEnter={changeRouteSelected}
            onMouseLeave={setPreviusRouteSelected}
            onClick={toggleMenu}
            className="link-mov current-pathname current-route-mobile relative text-5xl tracking-widest"
            href={'/'}
          >
            Home
          </NavLink>

          <NavLink
            onClick={toggleMenu}
            onMouseEnter={changeRouteSelected}
            onMouseLeave={setPreviusRouteSelected}
            className="link-mov current-pathname current-route-mobile relative text-5xl tracking-widest"
            href={'/portfolio'}
          >
            Portfolio
          </NavLink>

          <NavLink
            onMouseEnter={changeRouteSelected}
            onMouseLeave={setPreviusRouteSelected}
            onClick={toggleMenu}
            className="link-mov current-pathname current-route-mobile relative text-5xl tracking-widest"
            href={'/about'}
          >
            About
          </NavLink>

          <NavLink
            onMouseEnter={changeRouteSelected}
            onMouseLeave={setPreviusRouteSelected}
            onClick={toggleMenu}
            className="link-mov current-pathname current-route-mobile relative text-5xl tracking-widest"
            href={'/contact'}
          >
            Contact
          </NavLink>
        </nav>

        <div className="mb-4">
          <h3 className="mb-4 text-xs font-bold tracking-tighter text-zinc-500">
            SOCIALS
          </h3>
          <div className="flex items-center justify-start gap-4">
            <a
              className="transition-colors hover:text-zinc-500"
              target="_blank"
              href="https://www.instagram.com/cristian.giehl/"
              rel="noreferrer"
            >
              <FaInstagram size={20} />
            </a>

            <a
              className="transition-colors hover:text-zinc-500"
              target="_blank"
              href="https://www.linkedin.com/in/cristian-giehl-5b3539b4/"
              rel="noreferrer"
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
          className="close-menu-btn absolute right-4 top-4 rounded-full p-2"
          onClick={toggleMenu}
        >
          <FaX size={15} />
        </button>
      </div>
    </header>
  )
}
