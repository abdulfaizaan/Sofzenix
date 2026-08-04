export type Service = {
  id: string
  slug: string
  title: string
  tagline: string
  description: string
  capabilities: string[]
  icon: string
}

export type Project = {
  id: string
  slug: string
  title: string
  client: string
  year: string
  category: 'web' | 'mobile' | 'branding' | 'marketing'
  tags: string[]
  cover: string
  accent: string
  summary: string
  results: { label: string; value: string }[]
  gallery: string[]
}

export type Testimonial = {
  id: string
  quote: string
  name: string
  role: string
  company: string
}

export type TeamMember = {
  id: string
  name: string
  role: string
  bio: string
  initials: string
  accent: string
}

export type Achievement = {
  label: string
  value: string
  suffix?: string
}

export type Post = {
  id: string
  slug: string
  title: string
  excerpt: string
  body: string
  category: 'design' | 'engineering' | 'studio' | 'insights'
  author: string
  date: string
  readTime: number
}

export type Job = {
  id: string
  title: string
  department: string
  location: string
  type: 'full-time' | 'part-time' | 'internship' | 'contract'
  description: string
  responsibilities: string[]
  requirements: string[]
}