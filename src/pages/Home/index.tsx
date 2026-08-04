import Hero from './Hero'
import Intro from './Intro'
import ServicesTeaser from './ServicesTeaser'
import FeaturedWork from './FeaturedWork'
import Testimonials from './Testimonials'
import CTA from './CTA'

export default function Home() {
  return (
    <>
      <Hero />
      <Intro />
      <ServicesTeaser />
      <FeaturedWork />
      <Testimonials />
      <CTA />
    </>
  )
}