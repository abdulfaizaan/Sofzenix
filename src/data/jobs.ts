import type { Job } from '../types'

export const jobs: Job[] = [
  {
    id: 'job-1',
    title: 'Senior Frontend Engineer',
    department: 'Engineering',
    location: 'Remote / Bengaluru',
    type: 'full-time',
    description:
      'Own the front-end of client projects end-to-end — from architecture and tooling to animation polish and accessibility.',
    responsibilities: [
      'Lead front-end architecture for client engagements',
      'Build reusable component systems across projects',
      'Mentor mid-level engineers and review PRs',
      'Partner with design on motion and interaction specs',
    ],
    requirements: [
      '6+ years of production front-end experience',
      'Deep React + TypeScript fluency',
      'Strong opinions on performance and accessibility',
      'Comfort with animation libraries (GSAP, Framer Motion)',
    ],
  },
  {
    id: 'job-2',
    title: 'Product Designer',
    department: 'Design',
    location: 'Hybrid / Bengaluru',
    type: 'full-time',
    description:
      'Drive product design from research to high-fidelity — across web, mobile and brand work.',
    responsibilities: [
      'Lead end-to-end product design engagements',
      'Run discovery research and synthesise findings',
      'Build and evolve design systems',
      'Prototype motion and interaction details',
    ],
    requirements: [
      '4+ years of product design experience',
      'Strong portfolio of shipped work',
      'Fluency in Figma component architecture',
      'Bonus: motion or 3D experience',
    ],
  },
  {
    id: 'job-3',
    title: 'Motion Designer',
    department: 'Design',
    location: 'Remote',
    type: 'full-time',
    description:
      'Bring interfaces to life with considered, performance-conscious motion — across web, mobile and brand.',
    responsibilities: [
      'Design and implement motion across all studio projects',
      'Build and maintain our internal motion library',
      'Prototype interaction details in code (GSAP, Rive)',
      'Partner with engineering on handoff and tooling',
    ],
    requirements: [
      '3+ years of motion design experience',
      'Strong portfolio of product motion',
      'Code fluency (GSAP, Lottie, Rive)',
      'Eye for type, layout and rhythm',
    ],
  },
  {
    id: 'job-4',
    title: 'Strategy Lead',
    department: 'Strategy',
    location: 'Hybrid / Bengaluru',
    type: 'full-time',
    description:
      'Lead the strategic layer of client engagements — research, positioning, growth strategy.',
    responsibilities: [
      'Run discovery and strategy for client engagements',
      'Synthesise research into actionable positioning',
      'Build GTM plans with growth and marketing teams',
      'Author case studies and thought leadership',
    ],
    requirements: [
      '6+ years in product strategy, consulting, or growth',
      'Strong written and verbal communication',
      'Experience in B2B SaaS or fintech',
      'Comfort working alongside founders',
    ],
  },
  {
    id: 'job-5',
    title: 'Design Intern',
    department: 'Design',
    location: 'Hybrid / Bengaluru',
    type: 'internship',
    description:
      'Work alongside our design leads on real client projects. Ideal for a final-year student or recent graduate.',
    responsibilities: [
      'Contribute to live client projects',
      'Build case studies for the studio portfolio',
      'Participate in design crits and reviews',
      'Own a small studio side-project end-to-end',
    ],
    requirements: [
      'Final-year or recent graduate in design, HCI or related',
      'Portfolio of 2–4 academic or personal projects',
      'Curiosity and craft',
      'Available for 6 months',
    ],
  },
  {
    id: 'job-6',
    title: 'Engineering Intern',
    department: 'Engineering',
    location: 'Hybrid / Bengaluru',
    type: 'internship',
    description:
      'Ship production code alongside our senior engineers. Strong performers are converted to full-time.',
    responsibilities: [
      'Implement features on client projects',
      'Write tests and documentation',
      'Participate in architecture discussions',
      'Contribute to our internal tooling',
    ],
    requirements: [
      'Final-year or recent graduate in CS or related',
      'Comfort with React + TypeScript',
      'A side project we can look at',
      'Available for 6 months',
    ],
  },
]