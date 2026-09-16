import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, Shield } from 'lucide-react';
import { projectMeta } from '../data/projectData';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={styles.footer}>
      <div className="container">
        {/* Top Wordmark & Back to Top */}
        <div style={styles.topRow}>
          <div style={styles.brandBlock}>
            <span style={styles.brandTitle}>MODERN ESTATES</span>
            <span style={styles.brandSubtitle}>
              MODERN ESTATES INDIA PRIVATE LIMITED • {projectMeta.parentCompany.toUpperCase()}
            </span>
          </div>

          <button onClick={scrollToTop} style={styles.backTopBtn} aria-label="Back to Top">
            <span style={styles.backTopText}>BACK TO TOP</span>
            <ArrowUp size={16} color="#c5a880" />
          </button>
        </div>

        <div className="divider" style={{ margin: '3rem 0' }} />

        {/* Main Footer Links & Contact Info */}
        <div style={styles.mainGrid}>
          {/* Col 1: Modern Suites Summary */}
          <div style={styles.gridColBig}>
            <h4 style={styles.colTitle}>MODERN SUITES</h4>
            <p style={styles.colCopy}>
              A landmark boutique commercial development in Mahalaxmi, Mumbai. Engineered for corporate leaders and decision-makers seeking single-tenant floor exclusivity.
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div style={styles.gridCol}>
            <h5 style={styles.colHeader}>NAVIGATION</h5>
            <ul style={styles.linkList}>
              <li><a href="#project-intro" style={styles.footerLink}>Project Intro</a></li>
              <li><a href="#architecture" style={styles.footerLink}>Architecture</a></li>
              <li><a href="#workspace" style={styles.footerLink}>Workspace Features</a></li>
              <li><a href="#amenities" style={styles.footerLink}>Building Amenities</a></li>
              <li><a href="#gallery" style={styles.footerLink}>Cinematic Gallery</a></li>
              <li><a href="#location" style={styles.footerLink}>Location & Connectivity</a></li>
            </ul>
          </div>

          {/* Col 3: Portfolio Projects */}
          <div style={styles.gridCol}>
            <h5 style={styles.colHeader}>PORTFOLIO</h5>
            <ul style={styles.linkList}>
              <li><span style={styles.disabledLink}>Belvedere Court (1992)</span></li>
              <li><span style={styles.disabledLink}>Modern Vivarea</span></li>
              <li><span style={styles.disabledLink}>Modern Suites</span></li>
              <li><span style={styles.disabledLink}>Modern Centre</span></li>
              <li><span style={styles.disabledLink}>Modern Oasis</span></li>
              <li><span style={styles.disabledLink}>Modern Galleria</span></li>
            </ul>
          </div>

          {/* Col 4: Corporate Info */}
          <div style={styles.gridCol}>
            <h5 style={styles.colHeader}>CORPORATE HEADQUARTERS</h5>
            <address style={styles.addressBlock}>
              Modern Estates India Private Limited<br />
              Modern India Limited Vertical<br />
              Mahalaxmi, Mumbai - 400011<br />
              Maharashtra, India
            </address>
          </div>
        </div>

        <div className="divider" style={{ margin: '3rem 0 2rem 0' }} />

        {/* Bottom Legal Copyright */}
        <div style={styles.bottomRow}>
          <p style={styles.copyrightText}>
            © {new Date().getFullYear()} Modern Estates India Private Limited. All Rights Reserved.
          </p>
          <div style={styles.legalLinks}>
            <span style={styles.legalItem}>Disclaimer: Architectural visualization for representation only.</span>
            <Link to="/admin" style={{ ...styles.legalItem, color: '#c5a880', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600 }}>
              <Shield size={12} /> Admin Console
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: '#050507',
    padding: '6rem 0 3rem 0',
    color: '#9c9992',
    borderTop: '1px solid rgba(197, 168, 128, 0.2)',
  },
  topRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flexWrap: 'wrap',
    gap: '2rem',
  },
  brandBlock: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.4rem',
  },
  brandTitle: {
    fontFamily: "'Syne', sans-serif",
    fontSize: '1.75rem',
    fontWeight: 800,
    letterSpacing: '0.2em',
    color: '#f4f1ea',
    textTransform: 'uppercase',
  },
  brandSubtitle: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: '0.7rem',
    fontWeight: 600,
    letterSpacing: '0.25em',
    color: '#c5a880',
  },
  backTopBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.6rem',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
  },
  backTopText: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: '0.7rem',
    fontWeight: 700,
    letterSpacing: '0.2em',
    color: '#c5a880',
  },
  mainGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gap: '3rem',
  },
  gridColBig: {
    gridColumn: 'span 4',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    '@media (maxWidth: 992px)': {
      gridColumn: 'span 12',
    },
  },
  gridCol: {
    gridColumn: 'span 2.66',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    '@media (maxWidth: 992px)': {
      gridColumn: 'span 6',
    },
    '@media (maxWidth: 640px)': {
      gridColumn: 'span 12',
    },
  },
  colTitle: {
    fontFamily: "'Syne', sans-serif",
    fontSize: '1.1rem',
    fontWeight: 700,
    color: '#f4f1ea',
    letterSpacing: '0.1em',
  },
  colCopy: {
    fontSize: '0.85rem',
    color: '#82807a',
    lineHeight: 1.7,
  },
  colHeader: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: '0.7rem',
    fontWeight: 700,
    letterSpacing: '0.25em',
    color: '#c5a880',
    textTransform: 'uppercase',
  },
  linkList: {
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.6rem',
  },
  footerLink: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: '0.85rem',
    color: '#9c9992',
    transition: 'color 0.3s ease',
    '&:hover': {
      color: '#c5a880',
    },
  },
  disabledLink: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: '0.85rem',
    color: '#62605b',
  },
  addressBlock: {
    fontStyle: 'normal',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: '0.85rem',
    color: '#82807a',
    lineHeight: 1.7,
  },
  bottomRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '1rem',
  },
  copyrightText: {
    fontSize: '0.8rem',
    color: '#62605b',
  },
  legalLinks: {
    display: 'flex',
    gap: '1.5rem',
    flexWrap: 'wrap',
  },
  legalItem: {
    fontSize: '0.75rem',
    color: '#62605b',
  },
};

export default Footer;
