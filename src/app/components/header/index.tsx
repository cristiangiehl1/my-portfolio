'use client'

import './styles.css'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { CgMail } from 'react-icons/cg'
import { FaInstagram, FaLinkedin } from 'react-icons/fa'
import { GiHamburgerMenu } from 'react-icons/gi'

import AnimatedLogo from '../animated-logo'
import Located from '../located'
import Magneto from '../magneto'
import { NavLink } from '../nav-links'

gsap.registerPlugin(ScrollTrigger)

export default function Header() {
  const pathname = usePathname()

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const menuMobileContainer = useRef<HTMLDivElement>(null)
  const menuContainer = useRef<HTMLDivElement | null>(null)

  const tl = useRef(gsap.timeline({ paused: true }))

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState)
  }

  function changeRouteSelected(event: React.MouseEvent<HTMLElement>) {
    const routes = document.getElementsByClassName('current-pathname')

    Array.from(routes).forEach((route) => {
      route.setAttribute('data-current', 'false')
    })

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
    if (menuContainer.current) {
      const parent = menuContainer.current.parentElement

      if (!parent) return

      gsap.to('.mobile-scrolltrigger-menu', {
        scrollTrigger: {
          trigger: parent,
          pin: '.mobile-scrolltrigger-menu',
          start: '80px top',
          markers: false,
          pinSpacing: false,
          toggleActions: 'play none none reverse',
        },
        opacity: 1,
        duration: 0.5,
        scale: 1,
        ease: 'power3',
      })
    }
  }, [])

  useGSAP(() => {
    const body = document.body

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
        stagger: {
          amount: 0.5,
        },
      })
      .to(body, {
        overflow: 'hidden',
        duration: 1,
        ease: 'power4.inOut',
        delay: -1,
      })
  }, [menuMobileContainer])

  useEffect(() => {
    if (isMenuOpen) {
      tl.current.play()
    } else {
      tl.current.reverse()
    }
  }, [isMenuOpen])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        toggleMenu()
      }
    }

    if (isMenuOpen) {
      document.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isMenuOpen])

  return (
    <header
      ref={menuContainer}
      id="app-header"
      className="absolute z-50 m-auto flex w-full items-center justify-between bg-transparent px-5 pt-6 md:px-10"
    >
      <div className="mobile-scrolltrigger-menu absolute -bottom-20 right-[10px] z-40 scale-0 opacity-0 md:-bottom-24">
        <Magneto
          text=""
          className="h-8 w-8 border-[1px] border-white bg-gradient-to-b from-slate-600 to-slate-900 md:h-14 md:w-14"
          magnetoStrength={10}
          magnetoTextStrength={10}
          onClick={toggleMenu}
        >
          <GiHamburgerMenu size={16} />
        </Magneto>
      </div>

      <AnimatedLogo />

      <Located />

      {/* Desktop Menu */}
      <nav className="hidden gap-8 sm:flex">
        <NavLink
          className="current-pathname current-route-desktop relative"
          href={'/'}
          onMouseEnter={changeRouteSelected}
          onMouseLeave={setPreviusRouteSelected}
          aria-label="Navigate to home"
        >
          Home
        </NavLink>

        <NavLink
          className="current-pathname current-route-desktop relative"
          href={'/portfolio'}
          onMouseEnter={changeRouteSelected}
          onMouseLeave={setPreviusRouteSelected}
          aria-label="Navigate to portfolio"
        >
          Portfolio
        </NavLink>

        <NavLink
          className="current-pathname current-route-desktop relative"
          href={'/about'}
          onMouseEnter={changeRouteSelected}
          onMouseLeave={setPreviusRouteSelected}
          aria-label="Navigate to about"
        >
          About
        </NavLink>

        <NavLink
          className="current-pathname current-route-desktop relative"
          href={'/contact'}
          onMouseEnter={changeRouteSelected}
          onMouseLeave={setPreviusRouteSelected}
          aria-label="Navigate to contact"
        >
          Contact
        </NavLink>
      </nav>

      {/* Mobile Menu Button */}
      <Magneto
        text="Menu"
        className="z-20 cursor-pointer sm:hidden"
        magnetoStrength={5}
        magnetoTextStrength={5}
        onClick={toggleMenu}
      />

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

        <div className="mb-4 flex justify-between">
          <div>
            <h3 className="mb-4 text-xs font-bold tracking-tighter text-zinc-500">
              SOCIALS
            </h3>
            <div className="flex items-center justify-start gap-4">
              <a
                className="transition-colors hover:text-zinc-500"
                target="_blank"
                href="https://www.instagram.com/cristian.giehl/"
                rel="noreferrer"
                aria-label="Navigate to Cristian Giehl Instagram Profile."
              >
                <FaInstagram size={20} />
              </a>
              <a
                className="transition-colors hover:text-zinc-500"
                target="_blank"
                href="https://www.linkedin.com/in/cristian-giehl-5b3539b4/"
                rel="noreferrer"
                aria-label="Navigate to Cristian Giehl LinkedIn Profile."
              >
                <FaLinkedin size={20} />
              </a>
              <a
                className="transition-colors hover:text-zinc-500"
                href="mailto:cristiangiehl@gmail.com"
                title="Gmail"
                aria-label="Send an e-mail to Cristian Giehl."
              >
                <CgMail size={25} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-tighter text-zinc-500">
              Language
            </h3>
            <div className="flex gap-4">
              <button>
                <Image
                  src={
                    'https://www.svgrepo.com/show/405433/flag-for-flag-brazil.svg'
                  }
                  alt="language option Portuguese"
                  height={30}
                  width={30}
                />
              </button>

              <button>
                <Image
                  src={'https://www.svgrepo.com/show/508668/flag-us.svg'}
                  alt="language option English"
                  height={30}
                  width={30}
                />
              </button>
            </div>
          </div>
        </div>

        <div
          onClick={toggleMenu}
          className="absolute right-4 top-4 rounded-full"
        >
          <Magneto
            text="&times;"
            className={`h-8 w-8 bg-zinc-500 text-xs font-bold`}
            magnetoStrength={10}
            magnetoTextStrength={10}
          />
        </div>
      </div>
    </header>
  )
}
