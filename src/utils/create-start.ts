export function getRandom(min: number, max: number): number {
  return Math.random() * (max - min) + min
}

export function createStar(container: HTMLDivElement): HTMLElement {
  const star = document.createElement('div')
  const size = getRandom(2, 6)
  const xPos = getRandom(0, container.offsetWidth)
  const yPos = getRandom(0, container.offsetHeight)
  const duration = getRandom(2, 10)
  const delay = getRandom(0, 5)

  star.classList.add('star')
  star.style.position = 'absolute'
  star.style.top = `${yPos}px`
  star.style.left = `${xPos}px`
  star.style.width = `${size}px`
  star.style.height = `${size}px`
  star.style.backgroundColor = 'white'
  star.style.opacity = '0'
  star.style.animation = `twinkle ${duration}s ease-in-out ${delay}s infinite`

  star.style.clipPath =
    'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'

  container.appendChild(star)

  return star
}
