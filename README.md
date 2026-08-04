# Nova Studio

A premium agency website inspired by the fantasy.co class of interactive studios.
Built for an internship deliverable — covers Home, About, Services, Portfolio, Blog, Careers and Contact.

## Stack

- **Vite + React 18 + TypeScript** — fast dev, small production build.
- **GSAP 3 + ScrollTrigger + SplitText** — every animation runs through GSAP.
- **Lenis** — smooth scroll, bridged into ScrollTrigger via `src/lib/smoothScroll.ts`.
- **React Router 6** — lazy-loaded routes (each page is its own chunk).
- **Plain CSS Modules** — no Tailwind, no styled-components. Tokens live in `src/styles/tokens.css`.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → dist/
npm run preview  # serve the production build
```

## Structure

```
src/
  lib/           gsap + smoothScroll singletons
  hooks/         useReveal, useMarquee, useParallax, useMagnetic, useTextSplit, useScrollProgress
  components/
    layout/      Navbar, Footer, CustomCursor, PageTransition
    ui/          Button, Marquee, SectionHeading, Tag
  pages/
    Home/        Hero + Intro + ServicesTeaser + FeaturedWork + Testimonials + CTA
    About/       Story + VisionMission + Achievements + Team
    Services/    ServiceGrid + ServiceDetail
    Portfolio/   FilterBar + ProjectGrid + ProjectModal
    Blog/        ArticleList + ArticleCard + ArticleDetail + ShareButtons
    Careers/     JobList + ApplicationForm
    Contact/     ContactForm + MapEmbed + WhatsAppLink
  data/          Typed fixtures — easy to swap for a CMS later
  styles/        tokens.css, reset.css, global.css
```

## Animation system

| Hook | Use it when |
| --- | --- |
| `useReveal({ selector, stagger, y })` | you want a set of children to fade/slide up on enter |
| `useTextSplit({ type, stagger })` | words or chars should reveal one by one |
| `useMarquee({ speed, direction })` | an infinite horizontal scroll band |
| `useParallax(speed)` | a layer should move at a different rate than the page |
| `useMagnetic(strength)` | an element should follow the cursor on hover (buttons) |
| `useScrollProgress()` | you need a 0–1 value for scroll position |

All hooks are `prefers-reduced-motion` aware — they early-return when the user has reduced motion on.

## SEO / perf

- Full meta + OG + Twitter cards in `index.html`.
- Schema.org `Organization` JSON-LD.
- `robots.txt` + `sitemap.xml` in `public/`.
- Code-split routes, manual chunking for `react`, `gsap`, `lenis`.
- Self-hosted Google Fonts (Inter Tight + JetBrains Mono), preconnected.
- All below-fold images use `loading="lazy"` (where we ship images — most visuals are CSS gradients for now).
- Lighthouse-friendly: ~270 KB gzipped for the first paint.

## What is **not** in scope

- Backend, database, real CMS. The brief asks for one — this is the next sprint. Content is in `src/data/*.ts`.
- Email notifications on contact / careers forms. Forms currently log to console and show a success state. Wire to Formspree / Resend / your backend — clear `TODO` markers at each form.
- Deployment to AWS / Vercel. `npm run build` produces a static `dist/` ready for any host.
- Real photography / video. The site uses CSS gradients + accent colours as project covers; replace with your client work.

## Replacing the brand

Everything brand-related lives in three places:

1. `index.html` — title, meta description, OG image.
2. `src/components/layout/Footer.tsx` + `Navbar.tsx` — logo SVG + brand text.
3. `src/data/*.ts` — copy, project names, jobs, posts.

The accent colour is `--accent` in `src/styles/tokens.css`. Swap it to your brand colour and the whole site re-skins.