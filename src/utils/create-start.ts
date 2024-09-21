export function getRandom(min: number, max: number): number {
  return Math.random() * (max - min) + min
}

export function createStar(container: HTMLDivElement): HTMLElement {
  const star = document.createElement('div')
  const size = getRandom(2, 6)
  const xPos = getRandom(0, window.innerWidth + 1600)
  const yPos = getRandom(0, window.innerHeight + 1600)
  const duration = getRandom(2, 10)
  const delay = getRandom(0, 5)

  star.classList.add('star')
  star.style.position = 'absolute'
  star.style.top = `${yPos}px`
  star.style.left = `${xPos}px`
  star.style.width = `${size}px`
  star.style.height = `${size}px`
  star.style.backgroundColor = 'white'
  star.style.borderRadius = '50%'
  star.style.opacity = '0'
  star.style.animation = `twinkle ${duration}s ease-in-out ${delay}s infinite`

  container.appendChild(star)

  return star
}
