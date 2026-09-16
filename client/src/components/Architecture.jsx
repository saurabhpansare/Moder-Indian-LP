import React from 'react';
import { motion } from 'framer-motion';
import { architectureFeatures } from '../data/projectData';

const Architecture = () => {
  return (
    <section id="architecture" style={styles.section}>
      <div className="container">
        {/* Section Heading Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={styles.header}
        >
          <span className="subheading-gold">THE ARCHITECTURE</span>
          <h2 className="heading-editorial" style={styles.title}>
            DESIGNED AROUND LIGHT, <br />
            <span style={{ color: '#c5a880', fontStyle: 'italic' }}>AIR AND INTENTION.</span>
          </h2>
        </motion.div>

        {/* Alternating Feature Blocks */}
        <div className="arch-features-stack" style={styles.featuresStack}>
          {architectureFeatures.map((feat, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <motion.div
                key={feat.number}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.9 }}
                className="arch-feature-row"
                style={{
                  ...styles.featureRow,
                  flexDirection: isEven ? 'row' : 'row-reverse',
                }}
              >
                {/* Image Block */}
                <div className="arch-image-block" style={styles.imageBlock}>
                  <div className="arch-image-wrapper" style={styles.imageWrapper}>
                    <img
                      src={feat.image}
                      alt={feat.title}
                      style={styles.featureImage}
                      loading="lazy"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/images/modern-suites/hero.png';
                      }}
                    />
                    <div style={styles.imageOverlay} />
                  </div>
                  <div style={styles.numberBadgeCard}>
                    <span style={styles.numberBadgeText}>{feat.number}</span>
                  </div>
                </div>

                {/* Text Block */}
                <div className="arch-text-block" style={styles.textBlock}>
                  <div style={styles.eyebrowLine}>
                    <span style={styles.featEyebrow}>ARCHITECTURAL FEATURE {feat.number}</span>
                  </div>
                  <h3 className="arch-feat-title" style={styles.featTitle}>{feat.title}</h3>
                  <p style={styles.featSummary}>{feat.summary}</p>
                  <p style={styles.featDesc}>{feat.description}</p>

                  <div style={styles.featureDivider} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const styles = {
  section: {
    backgroundColor: '#08080a',
    padding: '9rem 0',
    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
    scrollMarginTop: '90px',
  },
  header: {
    marginBottom: '6rem',
    textAlign: 'left',
  },
  title: {
    color: '#f4f1ea',
    maxWidth: '800px',
  },
  featuresStack: {
  },
  featureRow: {
    display: 'flex',
    alignItems: 'center',
  },
  imageBlock: {
    position: 'relative',
  },
  imageWrapper: {
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: '#121217',
    border: '1px solid rgba(197, 168, 128, 0.22)',
  },
  featureImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.8s ease',
    filter: 'brightness(0.9) contrast(1.05)',
  },
  imageOverlay: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(180deg, transparent 60%, rgba(8, 8, 10, 0.6) 100%)',
  },
  numberBadgeCard: {
    position: 'absolute',
    bottom: '1.5rem',
    right: '1.5rem',
    backgroundColor: 'rgba(8, 8, 10, 0.88)',
    border: '1px solid rgba(197, 168, 128, 0.35)',
    padding: '0.6rem 1.2rem',
    backdropFilter: 'blur(8px)',
    zIndex: 2,
  },
  numberBadgeText: {
    fontFamily: "'Syne', sans-serif",
    fontSize: '1.4rem',
    fontWeight: 800,
    color: '#c5a880',
    lineHeight: 1,
    letterSpacing: '0.1em',
  },
  textBlock: {
    flex: '1 1 45%',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
    width: '100%',
  },
  eyebrowLine: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  featEyebrow: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: '0.75rem',
    fontWeight: 700,
    letterSpacing: '0.25em',
    color: '#c5a880',
    textTransform: 'uppercase',
  },
  featTitle: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: '2.5rem',
    fontWeight: 400,
    color: '#f4f1ea',
    lineHeight: 1.2,
  },
  featSummary: {
    fontSize: '1.1rem',
    color: '#f4f1ea',
    fontWeight: 400,
    lineHeight: 1.6,
  },
  featDesc: {
    fontSize: '0.95rem',
    color: '#b5b2ab',
    lineHeight: 1.8,
    fontWeight: 300,
  },
  featureDivider: {
    width: '60px',
    height: '1px',
    backgroundColor: '#c5a880',
    marginTop: '1rem',
  },
};

export default Architecture;
