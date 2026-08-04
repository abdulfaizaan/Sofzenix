import PageHeader from '../../components/layout/PageHeader'
import Story from './Story'
import VisionMission from './VisionMission'
import Team from './Team'
import Achievements from './Achievements'
import CTA from '../Home/CTA'

export default function About() {
  return (
    <>
      <PageHeader 
        eyebrow="Who we are" 
        title="We build digital products that matter." 
        subtitle="A full-stack team of designers, engineers, and strategists crafting premium experiences for ambitious brands." 
      />
      <Story />
      <VisionMission />
      <Achievements />
      <Team />
      <CTA />
    </>
  )
}