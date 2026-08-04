import PageHeader from '../../components/layout/PageHeader'
import ArticleList from './ArticleList'

export default function Blog() {
  return (
    <>
      <PageHeader 
        eyebrow="Insights" 
        title="Thoughts on craft." 
        subtitle="Articles, teardowns, and engineering notes from our team on building better software." 
      />
      <ArticleList />
    </>
  )
}