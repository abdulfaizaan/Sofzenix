import PageHeader from '../../components/layout/PageHeader'
import ServiceGrid from './ServiceGrid'
import CTA from '../Home/CTA'

export default function Services() {
  return (
    <>
      <PageHeader 
        eyebrow="Expertise" 
        title="End-to-end capabilities." 
        subtitle="From brand identity to scalable engineering, we provide everything you need to launch and grow." 
      />
      <ServiceGrid />
      <CTA />
    </>
  )
}