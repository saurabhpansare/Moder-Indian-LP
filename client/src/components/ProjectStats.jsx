import React from 'react';
import { motion } from 'framer-motion';
import { projectStats } from '../data/projectData';

const ProjectStats = () => {
  return (
    <section style={styles.section}>
      <div className="container">
        {/* Section Heading Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={styles.header}
        >
          <span className="subheading-gold">PROJECT HIGHLIGHTS</span>
          <h2 className="heading-editorial" style={styles.title}>
            ENGINEERED FOR DISTINCTION.
          </h2>
        </motion.div>

        {/* Editorial Stats Grid */}
        <div className="stats-grid" style={styles.statsGrid}>
          {projectStats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.1 }}
              whileHover={{ y: -6, borderColor: 'rgba(197, 168, 128, 0.45)' }}
              className="stat-card-responsive"
              style={styles.statCard}
            >
              <div style={styles.cardHeader}>
                {stat.isNumeric ? (
                  <span style={styles.statNumber}>{stat.value}</span>
                ) : (
                  <span style={styles.featureTag}>{stat.tag}</span>
                )}
                <span style={styles.cardNumber}>0{idx + 1}</span>
              </div>
              <h3 style={styles.statLabel}>{stat.label}</h3>
              <p style={styles.statDesc}>{stat.desc}</p>
              <div style={styles.accentLine} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const styles = {
  section: {
    backgroundColor: '#0c0c10',
    padding: '8rem 0',
    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
    scrollMarginTop: '90px',
  },
  header: {
    marginBottom: '4rem',
  },
  title: {
    color: '#f4f1ea',
  },
  statsGrid: {
  },
  statCard: {
    backgroundColor: '#121217',
    border: '1px solid rgba(197, 168, 128, 0.22)',
    padding: '2.5rem 2.25rem',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minHeight: '260px',
    gap: '1rem',
    transition: 'border-color 0.4s ease, box-shadow 0.4s ease, transform 0.4s ease',
    overflow: 'hidden',
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    marginBottom: '0.5rem',
  },
  statNumber: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: 'clamp(3rem, 4.5vw, 4rem)',
    fontWeight: 500,
    color: '#c5a880',
    lineHeight: 1,
    letterSpacing: '-0.02em',
  },
  featureTag: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: '0.75rem',
    fontWeight: 700,
    letterSpacing: '0.22em',
    color: '#c5a880',
    backgroundColor: 'rgba(197, 168, 128, 0.1)',
    border: '1px solid rgba(197, 168, 128, 0.25)',
    padding: '0.35rem 0.75rem',
    textTransform: 'uppercase',
  },
  cardNumber: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: '0.75rem',
    fontWeight: 600,
    color: 'rgba(255, 255, 255, 0.3)',
    letterSpacing: '0.2em',
  },
  statLabel: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: '0.85rem',
    fontWeight: 700,
    letterSpacing: '0.18em',
    color: '#f4f1ea',
    textTransform: 'uppercase',
    lineHeight: 1.35,
  },
  statDesc: {
    fontSize: '0.9rem',
    color: '#b5b2ab',
    lineHeight: 1.65,
    fontWeight: 300,
  },
  accentLine: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '40px',
    height: '2px',
    backgroundColor: '#c5a880',
    transition: 'width 0.4s ease',
  },
};

export default ProjectStats;
