import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { projectMeta } from '../data/projectData';

const Hero = () => {
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 1000], [0, 250]);
  const opacityFade = useTransform(scrollY, [0, 600], [1, 0]);

  const scrollToIntro = (e) => {
    e.preventDefault();
    const el = document.querySelector('#project-intro');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToEnquire = (e) => {
    e.preventDefault();
    const el = document.querySelector('#enquire');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section style={styles.heroSection}>
      {/* Background Architectural Image with Parallax */}
      <motion.div
        style={{
          ...styles.heroBgContainer,
          y: yParallax,
        }}
      >
        <div style={styles.heroBgImage} />
        <div style={styles.gradientOverlay} />
      </motion.div>

      {/* Main Hero Content */}
      <motion.div style={{ ...styles.heroContent, opacity: opacityFade }}>
        <div className="container" style={styles.contentContainer}>
          {/* Eyebrow / Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={styles.eyebrowBox}
          >
            <div style={styles.badgePill}>
              <span style={styles.brandBadge}>MODERN® SUITES™</span>
              <span style={styles.dividerDot}>•</span>
              <span style={styles.taglineText}>BOUTIQUE WORKSPACES</span>
            </div>
            <span style={styles.locationTag}>{projectMeta.location.toUpperCase()}</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            style={styles.mainTitle}
          >
            WHERE AMBITION <br />
            <span style={styles.goldTitle}>MEETS ADDRESS.</span>
          </motion.h1>

          {/* Supporting Copy & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6 }}
            style={styles.bottomRow}
          >
            <p style={styles.supportingCopy}>{projectMeta.subheadline}</p>

            <div style={styles.ctaGroup}>
              <a href="#project-intro" onClick={scrollToIntro} className="btn-primary">
                EXPLORE THE PROJECT
              </a>
              <a href="#enquire" onClick={scrollToEnquire} className="btn-secondary">
                ENQUIRE NOW
                <ArrowUpRight size={14} />
              </a>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Animated Scroll Indicator */}
      <motion.div
        style={{ ...styles.scrollIndicator, opacity: opacityFade }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <a href="#project-intro" onClick={scrollToIntro} style={styles.scrollLink}>
          <span style={styles.scrollText}>SCROLL TO EXPLORE</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          >
            <ArrowDown size={14} color="#c5a880" />
          </motion.div>
        </a>
      </motion.div>
    </section>
  );
};

const styles = {
  heroSection: {
    position: 'relative',
    width: '100%',
    minHeight: '100vh',
    height: '100svh',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#08080a',
  },
  heroBgContainer: {
    position: 'absolute',
    top: '-5%',
    left: 0,
    width: '100%',
    height: '115%',
    zIndex: 1,
  },
  heroBgImage: {
    width: '100%',
    height: '100%',
    backgroundImage: `url('/images/modern-suites/hero.png')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center 35%',
    filter: 'brightness(0.75) contrast(1.08)',
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: `linear-gradient(180deg, 
      rgba(8, 8, 10, 0.65) 0%, 
      rgba(8, 8, 10, 0.2) 40%, 
      rgba(8, 8, 10, 0.75) 85%, 
      rgba(8, 8, 10, 1) 100%),
      radial-gradient(ellipse at center, transparent 0%, rgba(8, 8, 10, 0.6) 100%)`,
  },
  heroContent: {
    position: 'relative',
    zIndex: 2,
    width: '100%',
    marginTop: '3rem',
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
  },
  eyebrowBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    flexWrap: 'wrap',
  },
  badgePill: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.75rem',
    backgroundColor: 'rgba(14, 14, 18, 0.85)',
    border: '1px solid rgba(197, 168, 128, 0.35)',
    padding: '0.45rem 1rem',
    backdropFilter: 'blur(10px)',
  },
  brandBadge: {
    fontFamily: "'Syne', sans-serif",
    fontSize: '0.8rem',
    fontWeight: 700,
    letterSpacing: '0.25em',
    color: '#c5a880',
    textTransform: 'uppercase',
  },
  dividerDot: {
    color: 'rgba(197, 168, 128, 0.5)',
    fontSize: '0.8rem',
  },
  taglineText: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: '0.75rem',
    fontWeight: 600,
    letterSpacing: '0.2em',
    color: '#f4f1ea',
    textTransform: 'uppercase',
  },
  locationTag: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: '0.75rem',
    fontWeight: 500,
    letterSpacing: '0.2em',
    color: '#9c9992',
  },
  mainTitle: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: 'clamp(2.8rem, 6.5vw, 6rem)',
    fontWeight: 400,
    lineHeight: 1.05,
    color: '#f4f1ea',
    letterSpacing: '-0.02em',
    maxWidth: '1000px',
  },
  goldTitle: {
    color: '#c5a880',
    fontStyle: 'italic',
    fontWeight: 300,
  },
  bottomRow: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2.5rem',
    maxWidth: '680px',
    marginTop: '0.5rem',
  },
  supportingCopy: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: 'clamp(1rem, 1.3vw, 1.25rem)',
    color: '#d0cdcf',
    fontWeight: 300,
    lineHeight: 1.7,
  },
  ctaGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.25rem',
    flexWrap: 'wrap',
  },
  scrollIndicator: {
    position: 'absolute',
    bottom: '2.5rem',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 2,
  },
  scrollLink: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.5rem',
  },
  scrollText: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: '0.65rem',
    fontWeight: 600,
    letterSpacing: '0.3em',
    color: '#9c9992',
  },
};

export default Hero;
