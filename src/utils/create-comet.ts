import { getRandom } from './create-start'

export function createComet(container: HTMLDivElement): HTMLElement {
  const cometWithTail = document.createElement('div')
  const comet = document.createElement('div')
  const tail = document.createElement('div')
  const startX = getRandom(-200, container.offsetWidth)
  const startY = getRandom(0, container.offsetHeight / 2)
  const duration = getRandom(2, 4)

  // Container do cometa e sua cauda
  cometWithTail.classList.add('comet-with-tail')
  cometWithTail.style.position = 'absolute'
  cometWithTail.style.top = `${startY}px`
  cometWithTail.style.left = `${startX}px`
  cometWithTail.style.width = '20px'
  cometWithTail.style.height = '20px'
  cometWithTail.style.animation = `cometMove ${duration}s linear`
  cometWithTail.style.opacity = '0'

  // Cometa (corpo)
  comet.classList.add('comet')
  comet.style.position = 'absolute'
  comet.style.top = '50%'
  comet.style.left = '50%'
  comet.style.transform = 'translate(-50%, -50%)'

  comet.style.width = '4px'
  comet.style.height = '4px'
  comet.style.backgroundColor = 'white'
  comet.style.borderRadius = '50%'
  comet.style.boxShadow = '0 0 10px rgba(255, 255, 255, 0.8)'

  // Cauda
  tail.classList.add('tail')
  tail.style.position = 'absolute'
  tail.style.top = '-20%'
  tail.style.right = '40%'
  tail.style.transform = 'translateY(0%) rotate(30deg)'
  tail.style.zIndex = '-1'

  tail.style.width = '50px'
  tail.style.height = '2px'
  tail.style.background =
    'linear-gradient(to left, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0))'
  tail.style.clipPath = 'polygon(100% 0%, 0% 25%, 0% 75%, 100% 100%)'

  // Append comet and tail to the container
  cometWithTail.appendChild(comet)
  cometWithTail.appendChild(tail)
  container.appendChild(cometWithTail)

  return cometWithTail
}
