import { getRandom } from './create-start'

export function createComet(container: HTMLDivElement): HTMLElement {
  const comet = document.createElement('div')
  const startX = getRandom(-200, window.innerWidth)
  const startY = getRandom(0, window.innerHeight / 2)
  const duration = getRandom(2, 4)

  comet.classList.add('comet')
  comet.style.position = 'absolute'
  comet.style.top = `${startY}px`
  comet.style.left = `${startX}px`
  comet.style.width = '6px'
  comet.style.height = '6px'
  comet.style.backgroundColor = 'white'
  comet.style.borderRadius = '50%'
  comet.style.boxShadow = '-112 -81 119px -20px rgba(255, 255, 255, 0.5)'
  comet.style.opacity = '0'
  comet.style.animation = `cometMove ${duration}s linear`

  container.appendChild(comet)

  return comet
}
