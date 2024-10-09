'use client'

import './page.css'

import gsap from 'gsap'
import { CustomEase } from 'gsap/CustomEase'
import Image from 'next/image'
import { useEffect } from 'react'

import contact from '@/assets/contact-img.jpg'
import planet1 from '@/assets/planet.png'

gsap.registerPlugin(CustomEase)

export default function Test() {
  useEffect(() => {
    CustomEase.create(
      'hop',
      'M0,0 C071,0.505 0.192,0.726 0.318,0.852 0.45,0.984 0.504,1 1,1',
    )

    const sliderImages = document.querySelector(
      '.slider-images',
    ) as HTMLDivElement
    const counter = document.querySelector('.counter') as HTMLDivElement
    const titles = document.querySelector(
      '.slider-title-wrapper',
    ) as HTMLDivElement
    const indicators = document.querySelectorAll(
      '.slider-indicators p',
    ) as NodeListOf<HTMLParagraphElement>
    const prevSlides = document.querySelectorAll(
      '.slider-preview .preview',
    ) as NodeListOf<HTMLDivElement>
    const sliderPreview = document.querySelector(
      '.slider-preview',
    ) as HTMLDivElement

    let currentImg = 1
    const totalSLides = 5
    let indicatorRotation = 0

    function updateCounterandTitlePosition() {
      const counterY = -20 * (currentImg - 1)
      const titleY = -60 * (currentImg - 1)

      gsap.to(counter, {
        y: counterY,
        duration: 1,
        ease: 'hop',
      })

      gsap.to(titles, {
        y: titleY,
        duration: 1,
        ease: 'hop',
      })
    }

    function updateActiveSlidePreview() {
      prevSlides.forEach((prev) => prev.classList.remove('active'))
      prevSlides[currentImg - 1].classList.add('active')
    }

    function animateSlide(direction: string) {
      const currentSlide =
        document.querySelectorAll('.img')[
          document.querySelectorAll('.img').length - 1
        ]

      const slideImg = document.createElement('div')
      slideImg.classList.add('img')

      const slideImgElem = document.createElement('img')
      slideImgElem.src = `/assets/${'bird'}.jpg`

      gsap.set(slideImgElem, { x: direction === 'left' ? -300 : 300 })

      slideImg.appendChild(slideImgElem)
      sliderImages.appendChild(slideImg)

      const currentSlideImg = currentSlide.querySelector('img')

      gsap.to(currentSlideImg, {
        x: direction === 'left' ? 300 : -300,
        duration: 1.5,
        ease: 'power4.out',
      })

      gsap.fromTo(
        slideImg,
        {
          clipPath:
            direction === 'left'
              ? 'polygon(0 0,  0 0, 0 100%, 0 100%)'
              : 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)',
        },
        {
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
          duration: 1.5,
          ease: 'power4.out',
        },
      )

      gsap.to(slideImg, {
        x: 0,
        duration: 1.5,
        ease: 'power4.out',
      })

      cleanupSlides()

      indicatorRotation += direction === 'left' ? -90 : 90

      gsap.to(indicators, {
        rotate: indicatorRotation,
        duration: 1,
        ease: 'hop',
      })
    }

    document.addEventListener('click', (event: MouseEvent) => {
      const sliderWidth = document.querySelector('.slider')?.clientWidth

      const clickPosition = event.clientX

      if (sliderPreview && event.target instanceof HTMLElement) {
        if (sliderPreview.contains(event.target)) {
          const clickedPrev = event.target.closest('.preview') as HTMLDivElement
          if (clickedPrev) {
            const clickedIndex = Array.from(prevSlides).indexOf(clickedPrev) + 1

            if (clickedIndex !== currentImg) {
              if (clickedIndex < currentImg) {
                currentImg = clickedIndex
                animateSlide('left')
              } else {
                currentImg = clickedIndex
                animateSlide('right')
              }
              updateActiveSlidePreview()
              updateCounterandTitlePosition()
            }
          }
        }
      }
      if (clickPosition < sliderWidth! / 2 && currentImg !== 1) {
        currentImg--
        animateSlide('left')
      } else if (
        clickPosition > sliderWidth! / 2 &&
        currentImg !== totalSLides
      ) {
        currentImg++
        animateSlide('right')
      }
      updateActiveSlidePreview()
      updateCounterandTitlePosition()
    })

    function cleanupSlides() {
      const imgElements = document.querySelectorAll('.slider-images .img')

      if (imgElements.length > totalSLides) {
        imgElements[0].remove()
      }
    }
  })

  return (
    <div className="slider">
      <div className="slider-images">
        <img className="img" src={'/assets/fish.jpg'} alt="" />
      </div>

      <div className="slider-title">
        <div className="slider-title-wrapper">
          <p className="">The Revival Ensemble</p>
          <p className="">Above the Canvas</p>
          <p className="">Harmony in Every Note</p>
          <p className="">Redefining Imagination</p>
          <p className="">From Earth to Expression</p>
        </div>
      </div>

      <div className="slider-counter">
        <div className="counter">
          <p className="">1</p>
          <p className="">2</p>
          <p className="">3</p>
          <p className="">4</p>
          <p className="">5</p>
        </div>

        <div className="">
          <p className="">&mdash;</p>
        </div>

        <div className="">
          <p className="">5</p>
        </div>
      </div>

      <div className="slider-preview">
        <div className="preview active">
          <img src={'/assets/beach.jpg'} alt="" />
        </div>
        <div className="preview">
          <img src={'/assets/bird.jpg'} alt="" />
        </div>
        <div className="preview">
          <img src={'/assets/building.jpg'} alt="" />
        </div>
        <div className="preview">
          <img src={'/assets/city.jpg'} alt="" />
        </div>
        <div className="preview">
          <img src={'/assets/mountain.jpg'} alt="" />
        </div>
      </div>

      <div className="slider-indicators">
        <p className="">+</p>
        <p className="">+</p>
      </div>
    </div>
  )
}
