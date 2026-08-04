import type { Testimonial, TeamMember, Achievement } from '../types'

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    quote:
      'As a client of Sofzenix, I am truly impressed with the level of professionalism, technical expertise, and customer support they offer. They perfectly matched our business needs.',
    name: 'Jashwanth reddy Nagireddy',
    role: 'Verified Client',
    company: 'Google Reviews',
  },
  {
    id: 't2',
    quote:
      'Sofzenix engineering team transformed our legacy database infrastructure into a high-concurrency cloud platform. Their technical depth and customer-first mindset were exemplary.',
    name: 'Sarah Jenkins',
    role: 'Chief Technology Officer',
    company: 'Fintech Solutions Corp',
  },
  {
    id: 't3',
    quote:
      'The healthcare portal designed by Sofzenix has streamlined our practitioner-patient communication channels. Their adherence to strict security controls exceeded expectations.',
    name: 'Dr. Evelyn Carter',
    role: 'Director of Healthcare Systems',
    company: 'Helix Health System',
  },
]

export const team: TeamMember[] = [
  {
    id: 'tm1',
    name: 'Upputuri Sathish',
    role: 'Founder & CEO',
    bio: 'A visionary tech leader committed to building business innovation through state-of-the-art software solutions. Dedicated to delivering enterprise-grade apps.',
    initials: 'US',
    accent: '#7c5cff',
  },
]

export const achievements: Achievement[] = [
  { label: 'Technologies', value: '30', suffix: '+' },
  { label: 'Projects Delivered', value: '85', suffix: '+' },
  { label: 'Years Experience', value: '5', suffix: '+' },
  { label: 'Enterprise Ready', value: 'Yes' },
]