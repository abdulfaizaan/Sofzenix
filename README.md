# SOFZENIX IT Solutions LLP — Corporate Monorepo

Production-grade Next.js 15 corporate site for SOFZENIX. This repository is structured into two decoupled, distinct projects: the highly-animated frontend and the robust Prisma-powered API backend.

## 📁 Repository Structure

```
SOFZENIX/
├── backend/     # Next.js 15 API routes, Prisma ORM, PostgreSQL, CMS Admin Endpoints
└── frontend/    # Next.js 15 App Router, GSAP Animations, Tailwind 4, Marketing UI
```

---

## 🏗️ 1. Frontend Architecture (Marketing Site)

The frontend is built with Feature-Sliced Design, strict TypeScript, GSAP + Lenis motion, and TailwindCSS 4.

### Tech Stack
- **Framework:** Next.js 15 (App Router) + React 19
- **Styling:** TailwindCSS 4 + CSS Variables
- **Animation:** GSAP + ScrollTrigger + Lenis Smooth Scroll
- **Typography:** Inter, Space Grotesk, JetBrains Mono

### Running Locally
```bash
cd frontend
pnpm install
pnpm dev
```
Visit `http://localhost:3000` to see the site.

---

## ⚙️ 2. Backend Architecture (API & CMS)

The backend handles the PostgreSQL database connection, JWT Edge authentication, Role-Based Access Control, and Zod input validation. It serves as the central API for the Portfolio, CRM, Blog, and Careers.

### Tech Stack
- **Framework:** Next.js 15 (API Route Handlers)
- **Database:** PostgreSQL (via Neon)
- **ORM:** Prisma v6
- **Validation:** Zod
- **Authentication:** Custom JWT-based stateless auth (`jose`)

### Running Locally
1. Ensure your `.env` file in the `backend` folder has your `DATABASE_URL` and `JWT_SECRET`.
2. Start the API server:
```bash
cd backend
npm install
npm run dev
```
Visit `http://localhost:3001` (or your configured port) to access the API endpoints.

---

## 🔒 Security & Performance

- **Rate Limiting:** Public POST endpoints are protected by in-memory rate limiting.
- **CORS:** Cross-Origin Resource Sharing is strictly enforced.
- **Aesthetics:** The frontend targets 60fps minimum rendering via GSAP GPU acceleration, respecting reduced-motion preferences.

## License

© SOFZENIX IT Solutions LLP. All rights reserved.