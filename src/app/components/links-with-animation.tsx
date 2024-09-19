'use client'

import gsap from 'gsap'
import Link from 'next/link'
import { type ComponentProps, type ReactNode, useEffect, useRef } from 'react'

interface LinksWithAnimationProps {
  linkProps: ComponentProps<typeof Link>
  blobProps?: React.HTMLProps<HTMLDivElement>
  children?: ReactNode
}

export default function LinksWithAnimation({
  linkProps,
  blobProps,
  children,
}: LinksWithAnimationProps) {
  const containerRef = useRef<HTMLAnchorElement>(null)
  const blobRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const blob = blobRef.current

    if (!container || !blob) return

    function handleMouseEnter() {
      gsap.to(blob, {
        startAt: { y: '100%' },
        y: '20%',
        duration: 1,
        ease: 'power3.inOut',
      })
    }

    function handleMouseLeave() {
      gsap.to(blob, {
        y: '-100%',
        duration: 1,
        ease: 'power3.inOut',
      })
    }

    container.addEventListener('mouseenter', handleMouseEnter)
    container.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      container.removeEventListener('mouseenter', handleMouseEnter)
      container.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <Link
      ref={containerRef}
      {...linkProps}
      className={`link-animation relative block overflow-hidden ${linkProps.className ? linkProps.className : ''}`}
    >
      {children}

      <div
        ref={blobRef}
        {...blobProps}
        className={`blob absolute bottom-0 left-[50%] h-[200%] w-[110%] -translate-x-1/2 translate-y-[100%] ${blobProps?.className ? blobProps.className : ''}`}
      ></div>
    </Link>
  )
}
