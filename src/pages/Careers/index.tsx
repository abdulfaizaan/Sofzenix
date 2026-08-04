import PageHeader from '../../components/layout/PageHeader'
import JobList from './JobList'
import CTA from '../Home/CTA'

export default function Careers() {
  return (
    <>
      <PageHeader 
        eyebrow="Careers" 
        title="Join the studio." 
        subtitle="We're always looking for talented designers, engineers, and strategists who care deeply about the details." 
      />
      <JobList />
      <CTA />
    </>
  )
}