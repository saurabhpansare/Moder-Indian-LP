import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { useScrollDirection } from '../hooks/useScrollDirection';

const navLinks = [
  { name: 'PROJECT', href: '#project-intro' },
  { name: 'ARCHITECTURE', href: '#architecture' },
  { name: 'FEATURES', href: '#workspace' },
  { name: 'AMENITIES', href: '#amenities' },
  { name: 'GALLERY', href: '#gallery' },
  { name: 'LOCATION', href: '#location' },
];

const Navbar = () => {
  const { isScrolled } = useScrollDirection();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [mobileMenuOpen]);

  const scrollToSection = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        style={{
          ...styles.header,
          backgroundColor: isScrolled ? 'rgba(6, 6, 8, 0.88)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: isScrolled ? 'blur(20px)' : 'none',
          borderBottom: isScrolled ? '1px solid rgba(197, 168, 128, 0.25)' : '1px solid transparent',
          boxShadow: isScrolled ? '0 10px 30px rgba(0,0,0,0.5)' : 'none',
        }}
      >
        <div className="container" style={styles.navContainer}>
          {/* LEFT: Logo Wordmark */}
          <a href="#" style={styles.logoGroup} aria-label="Modern Estates Home">
            <span style={styles.logoTitle}>MODERN ESTATES</span>
            <span style={styles.logoTag}>SUITES • MAHALAXMI</span>
          </a>

          {/* CENTER: Navigation Links (Desktop) */}
          <nav className="nav-desktop" style={styles.desktopNav} aria-label="Main Navigation">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                style={styles.navLink}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* RIGHT: CTA Button (Desktop) */}
          <div className="nav-desktop-cta" style={styles.desktopCTA}>
            <a
              href="#enquire"
              onClick={(e) => scrollToSection(e, '#enquire')}
              className="btn-secondary"
              style={styles.enquireBtn}
            >
              ENQUIRE NOW
              <ArrowUpRight size={14} />
            </a>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            className="nav-hamburger-btn"
            style={styles.hamburgerBtn}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={26} color="#c5a880" /> : <Menu size={26} color="#f4f1ea" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            style={styles.mobileOverlay}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div style={styles.mobileHeader}>
              <div style={styles.logoGroup}>
                <span style={styles.logoTitle}>MODERN ESTATES</span>
                <span style={styles.logoTag}>SUITES • MAHALAXMI</span>
              </div>
            </div>

            <div style={styles.mobileNavLinks}>
              {navLinks.map((link, idx) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  style={styles.mobileNavLink}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + idx * 0.08, duration: 0.4 }}
                >
                  <span style={styles.mobileNum}>0{idx + 1}</span>
                  {link.name}
                </motion.a>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                style={{ marginTop: '2rem' }}
              >
                <a
                  href="#enquire"
                  onClick={(e) => scrollToSection(e, '#enquire')}
                  className="btn-primary"
                  style={{ width: '100%' }}
                >
                  ENQUIRE NOW
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const styles = {
  header: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    height: 'var(--header-height)',
    zIndex: 1000,
    transition: 'background-color 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s ease',
    display: 'flex',
    alignItems: 'center',
  },
  navContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  logoGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.15rem',
  },
  logoTitle: {
    fontFamily: "'Syne', sans-serif",
    fontSize: '0.95rem',
    fontWeight: 700,
    letterSpacing: '0.25em',
    color: '#f4f1ea',
    textTransform: 'uppercase',
  },
  logoTag: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: '0.65rem',
    fontWeight: 600,
    letterSpacing: '0.2em',
    color: '#c5a880',
  },
  desktopNav: {
    gap: '2.5rem',
  },
  navLink: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: '0.75rem',
    fontWeight: 600,
    letterSpacing: '0.2em',
    color: '#9c9992',
    transition: 'color 0.3s ease',
    textTransform: 'uppercase',
  },
  desktopCTA: {
    alignItems: 'center',
  },
  enquireBtn: {
    padding: '0.75rem 1.4rem',
    fontSize: '0.75rem',
  },
  hamburgerBtn: {
    padding: '0.5rem',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
  },
  mobileOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100dvh',
    backgroundColor: '#08080a',
    zIndex: 999,
    padding: '2rem 1.5rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    overflowY: 'auto',
  },
  mobileHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: '2rem',
    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
  },
  mobileNavLinks: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    margin: 'auto 0',
  },
  mobileNavLink: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: '2rem',
    fontWeight: 400,
    color: '#f4f1ea',
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
    letterSpacing: '0.05em',
  },
  mobileNum: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: '0.8rem',
    fontWeight: 600,
    color: '#c5a880',
    letterSpacing: '0.15em',
  },
};

export default Navbar;
