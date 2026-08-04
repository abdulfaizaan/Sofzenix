import { lazy, Suspense, useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import CustomCursor from './components/layout/CustomCursor'
import PageTransition from './components/layout/PageTransition'
import Preloader from './components/layout/Preloader'
import MenuOverlay from './components/layout/MenuOverlay'
import { initSmoothScroll } from './lib/smoothScroll'
import { ScrollTrigger, initGSAP } from './lib/gsap'

initGSAP()

// Code-split routes
const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Services = lazy(() => import('./pages/Services'))
const Portfolio = lazy(() => import('./pages/Portfolio'))
const Blog = lazy(() => import('./pages/Blog'))
const Careers = lazy(() => import('./pages/Careers'))
const Contact = lazy(() => import('./pages/Contact'))
const ArticleDetail = lazy(() => import('./pages/Blog/ArticleDetail'))

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
    ScrollTrigger.refresh()
  }, [pathname])
  return null
}

export default function App() {
  const [booted, setBooted] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const lenis = initSmoothScroll()
    // initial refresh after fonts load
    const onLoad = () => ScrollTrigger.refresh()
    window.addEventListener('load', onLoad)
    return () => {
      window.removeEventListener('load', onLoad)
      lenis?.destroy()
    }
  }, [])

  // Close menu on route change
  const { pathname } = useLocation()
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  return (
    <>
      <Preloader onComplete={() => setBooted(true)} />

      <CustomCursor />
      <Navbar onMenuClick={() => setMenuOpen((o) => !o)} menuOpen={menuOpen} />
      <MenuOverlay open={menuOpen && booted} onClose={() => setMenuOpen(false)} />
      <ScrollToTop />
      <main>
        <PageTransition>
          <Suspense fallback={<div style={{ minHeight: '60vh' }} />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<ArticleDetail />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </Suspense>
        </PageTransition>
      </main>
      <Footer />
    </>
  )
}
