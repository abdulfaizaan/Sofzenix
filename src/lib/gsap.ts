import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

let registered = false

export function initGSAP() {
  if (registered) return gsap
  gsap.registerPlugin(ScrollTrigger, SplitText)

  gsap.defaults({
    ease: 'power3.out',
    duration: 0.8,
  })

  gsap.config({ nullTargetWarn: false })
  registered = true
  return gsap
}

export { gsap, ScrollTrigger, SplitText }