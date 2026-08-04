import type { Post } from '../types'

export const posts: Post[] = [
  {
    id: 'post-1',
    slug: 'the-cost-of-slow',
    title: 'The cost of slow — why 100ms matters more than ever',
    excerpt:
      'A round-up of recent Core Web Vitals data, and the design decisions that compound into faster perceived performance.',
    body:
      'There is a number every product team should know: 100ms. That is the round-trip latency below which users stop noticing a delay. Above it, abandonment rises measurably.\n\nIn this piece we look at three high-traffic case studies from the last year and break down the small choices — image format, font loading, server timing — that together added up to a 40% lift in conversion.\n\nThe conclusion is not surprising but is often ignored: invest in the first paint, defer the rest, and design states for in-between.',
    category: 'engineering',
    author: 'Yuki Tanaka',
    date: '2026-04-12',
    readTime: 6,
  },
  {
    id: 'post-2',
    slug: 'motion-as-meaning',
    title: 'Motion as meaning — not decoration',
    excerpt:
      'A short field guide to using motion to communicate intent, hierarchy and state in product interfaces.',
    body:
      'There is a temptation, when an interface is mostly static, to add motion as garnish. We have all seen apps where a card flips for no reason, where a tab transition takes 800ms.\n\nIn our studio we treat motion the same way we treat typography: a system, with rules, with intent. Three rules we apply to every interaction: motion expresses cause and effect; motion has a single focal point at a time; motion exits faster than it enters.\n\nGet those three right and your product feels alive without ever feeling busy.',
    category: 'design',
    author: 'Noor Hassan',
    date: '2026-03-30',
    readTime: 5,
  },
  {
    id: 'post-3',
    slug: 'behind-the-helio-rebrand',
    title: 'Behind the Helio rebrand',
    excerpt:
      'How we helped a challenger bank rethink its identity, product, and the in-between.',
    body:
      'When Helio approached us they had the typical challenger-bank problem: a brand that signalled "we are a tech company" but a product that felt like a 2014 spreadsheet.\n\nOver six months we rebuilt the identity from typography to motion language, redesigned the customer portal end-to-end, and shipped a new marketing site. The numbers: a 38% lift in sign-up conversion, a 42% drop in support tickets, and a near-doubling of NPS.\n\nThe biggest lesson: identity is a system, not a logo.',
    category: 'studio',
    author: 'Aarav Mehta',
    date: '2026-02-18',
    readTime: 8,
  },
  {
    id: 'post-4',
    slug: 'small-teams-big-leverage',
    title: 'Small teams, big leverage — what we learned going from 6 to 28',
    excerpt:
      'A retrospective on scaling a design studio without losing the things that made the early work good.',
    body:
      'When we were six people, every project had a founder in the room. That was a feature and a bug. The feature: quality. The bug: throughput.\n\nThe work this year has been about codifying what made the early work good — a strong opinion about craft, a willingness to push back on scope, and a tendency to leave things a little better than we found them — into systems that survive beyond any one of us.\n\nThe result is a studio that is still small by industry standards but ships more, and better, than we ever have.',
    category: 'insights',
    author: 'Aarav Mehta',
    date: '2026-01-22',
    readTime: 7,
  },
  {
    id: 'post-5',
    slug: 'design-systems-that-scale',
    title: 'Design systems that actually scale',
    excerpt:
      'Why most design systems die within 18 months, and the four habits we use to keep ours alive.',
    body:
      'Most design systems do not fail because the components are wrong. They fail because the operating model around them collapses.\n\nFour habits keep ours useful: a small core team that owns the contract, a clear RFC process for additions, a published migration guide for breaking changes, and a quarterly review where we delete things.\n\nDelete is the most underused verb in design systems work.',
    category: 'design',
    author: 'Noor Hassan',
    date: '2025-12-10',
    readTime: 6,
  },
  {
    id: 'post-6',
    slug: 'choosing-the-stack',
    title: 'Choosing the stack — a 2026 frontend teardown',
    excerpt:
      'React, Svelte, Solid, HTMX — a practical comparison from a studio that has shipped all of them in production.',
    body:
      'We get asked about stack choice more than almost any other topic, so here is a one-paragraph summary: there is no winner, there is only fit.\n\nFor a marketing site with light interactivity, Astro. For a dashboard with realtime data, React. For a small interactive widget, Svelte. For a server-rendered app that needs a sprinkle of JS, HTMX. The decision tree is short.\n\nWhat matters more than the framework is the team that uses it.',
    category: 'engineering',
    author: 'Yuki Tanaka',
    date: '2025-11-04',
    readTime: 9,
  },
]