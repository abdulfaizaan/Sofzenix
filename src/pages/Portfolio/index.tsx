import PageHeader from '../../components/layout/PageHeader'
import ProjectGrid from './ProjectGrid'
import CTA from '../Home/CTA'

export default function Portfolio() {
  return (
    <>
      <PageHeader 
        eyebrow="Selected Work" 
        title="Work that moves the needle." 
        subtitle="Explore our recent collaborations with startups and enterprise teams across web, mobile, and brand." 
      />
      <ProjectGrid />
      <CTA />
    </>
  )
}