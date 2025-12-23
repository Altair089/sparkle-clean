import { useEffect, useState } from 'react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('no-scroll', isOpen)
    return () => document.body.classList.remove('no-scroll')
  }, [isOpen])

  const close = () => setIsOpen(false)

  return (
    <nav className="navbar" style={scrolled ? { backgroundColor: 'rgba(255, 255, 255, 0.95)' } : undefined}>
      <div className="container">
        <a className="logo" href="#home" onClick={close}>
          Sparkle<span>Clean</span>
        </a>

        <div className={`nav-links ${isOpen ? 'active' : ''}`}>
          <a href="#home" onClick={close}>
            Home
          </a>
          <a href="#services" onClick={close}>
            Services
          </a>
          <a href="#about" onClick={close}>
            About
          </a>
          <a href="#testimonials" onClick={close}>
            Testimonials
          </a>
          <a href="#contact" className="btn btn-primary" onClick={close}>
            Get a Quote
          </a>
        </div>

        <button
          type="button"
          className="hamburger"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </nav>
  )
}
