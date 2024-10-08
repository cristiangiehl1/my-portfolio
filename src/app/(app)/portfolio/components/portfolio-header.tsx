'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

import { NavLink } from '@/app/components/nav-links'
import spaceshipFrame from '@/assets/blue_game_backrground_01.jpg'
import spaceship from '@/assets/nav.png'

export default function PortFolioHeader() {
  const pathname = usePathname()

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const portfolioNavRef = useRef<HTMLElement>(null)
  const portfolioToggleBtnRef = useRef<HTMLButtonElement>(null)
  const tl = useRef(gsap.timeline({ paused: true }))

  function changeRouteSelected(event: React.MouseEvent<HTMLElement>) {
    const routes = document.getElementsByClassName('current-path-project')

    Array.from(routes).forEach((route) => {
      route.setAttribute('data-current', 'false')
    })

    event.currentTarget.setAttribute('data-current', 'true')
  }

  function setPreviusRouteSelected() {
    const routes = document.getElementsByClassName('current-path-project')

    Array.from(routes).forEach((route) => {
      const href = route.getAttribute('href')

      if (href === pathname) {
        route.setAttribute('data-current', 'true')
      } else {
        route.setAttribute('data-current', 'false')
      }
    })
  }

  function handlePortfolioToggle() {
    setIsMenuOpen((prevState) => !prevState)
  }

  useGSAP(() => {
    gsap.to('.portfolio-header', {
      y: 0,
      delay: 5,
      duration: 2,
      ease: 'sine.inOut',
    })
  }, [])

  useGSAP(() => {
    tl.current.to(portfolioNavRef.current, {
      duration: 0.7,
      x: 0,
      ease: 'power4.inOut',
    })
  }, [portfolioNavRef])

  useEffect(() => {
    if (isMenuOpen) {
      tl.current.play()
    } else {
      tl.current.reverse()
    }
  }, [isMenuOpen])

  return (
    <header className="portfolio-header absolute -left-0 top-0 z-50 flex -translate-y-full gap-4 p-2">
      <nav ref={portfolioNavRef} className="flex -translate-x-[88%] gap-4">
        <ul className="flex gap-4">
          <li className="relative">
            <Image
              src={spaceshipFrame}
              alt=""
              width={85}
              className="rounded-2xl"
              quality={80}
              priority
            />
            <NavLink
              className="current-path-project absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 rounded-sm p-[18px] text-[#E0FFFF] data-[current=true]:text-[#00FFFF]"
              href={'/'}
              onMouseEnter={changeRouteSelected}
              onMouseLeave={setPreviusRouteSelected}
              aria-label="Navigate to home"
            >
              Home
            </NavLink>
          </li>

          <li className="relative">
            <Image
              src={spaceshipFrame}
              alt=""
              width={85}
              className="rounded-2xl"
              quality={80}
            />
            <NavLink
              className="current-path-project absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-sm p-[18px] data-[current=true]:text-[#00FFFF]"
              href={'/portfolio'}
              onMouseEnter={changeRouteSelected}
              onMouseLeave={setPreviusRouteSelected}
              aria-label="Navigate to portfolio"
            >
              Portfolio
            </NavLink>
          </li>

          <li className="relative">
            <Image
              src={spaceshipFrame}
              alt=""
              width={85}
              className="rounded-2xl"
              quality={80}
            />
            <NavLink
              className="current-path-project absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-sm p-[18px] text-[#E0FFFF] data-[current=true]:text-[#00FFFF]"
              href={'/about'}
              onMouseEnter={changeRouteSelected}
              onMouseLeave={setPreviusRouteSelected}
              aria-label="Navigate to about"
            >
              About
            </NavLink>
          </li>

          <li className="relative">
            <Image
              src={spaceshipFrame}
              alt=""
              width={85}
              className="rounded-2xl"
              quality={80}
            />
            <NavLink
              className="current-path-project absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-sm p-[18px] text-[#E0FFFF] data-[current=true]:text-[#00FFFF]"
              href={'/contact'}
              onMouseEnter={changeRouteSelected}
              onMouseLeave={setPreviusRouteSelected}
              aria-label="Navigate to contact"
            >
              Contact
            </NavLink>
          </li>
        </ul>

        <button
          ref={portfolioToggleBtnRef}
          onClick={handlePortfolioToggle}
          className=""
          aria-label="toggle navbar"
        >
          <Image src={spaceship} alt="" width={48} />
        </button>
      </nav>
    </header>
  )
}
