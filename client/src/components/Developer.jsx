import React from 'react';
import { motion } from 'framer-motion';
import { Award, Calendar, Landmark } from 'lucide-react';
import { developerData } from '../data/projectData';

const Developer = () => {
  return (
    <section style={styles.section}>
      <div className="container">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={styles.header}
        >
          <span className="subheading-gold">{developerData.subheadline}</span>
          <h2 className="heading-editorial" style={styles.title}>
            {developerData.headline}
          </h2>
        </motion.div>

        {/* Developer Bio Grid */}
        <div style={styles.bioGrid}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={styles.bioLeft}
          >
            <p style={styles.bioText}>{developerData.bio}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={styles.bioRight}
          >
            <div style={styles.heritageBadgeCard}>
              <div style={styles.heritageIcon}>
                <Landmark size={28} color="#c5a880" />
              </div>
              <div>
                <span style={styles.heritageYear}>EST. {developerData.heritageYear}</span>
                <h4 style={styles.heritageTitle}>BELVEDERE COURT HERITAGE</h4>
                <p style={styles.heritageSub}>
                  Pioneering landmark development along Mahalaxmi Race Course since 1992.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Selected Projects Showcase */}
        <div style={{ marginTop: '5rem' }}>
          <div style={styles.projectSectionHeader}>
            <span style={styles.projectsSub}>PORTFOLIO DESTINATIONS</span>
            <h3 style={styles.projectsTitle}>SELECTED DEVELOPMENT PORTFOLIO</h3>
          </div>

          <div style={styles.projectsGrid}>
            {developerData.projects.map((proj, idx) => (
              <motion.div
                key={proj.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: idx * 0.1 }}
                whileHover={{ y: -6, borderColor: '#c5a880' }}
                style={styles.projectCard}
              >
                <div style={styles.cardTop}>
                  <span style={styles.projType}>{proj.type}</span>
                  <span style={styles.projYear}>{proj.year}</span>
                </div>
                <h4 style={styles.projName}>{proj.name}</h4>
                <p style={styles.projLoc}>{proj.location}</p>
                <p style={styles.projDesc}>{proj.desc}</p>
              </motion.div>
            ))}
          </div>
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
  },
  header: {
    marginBottom: '3rem',
  },
  title: {
    color: '#f4f1ea',
  },
  bioGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gap: '3.5rem',
    alignItems: 'center',
  },
  bioLeft: {
    gridColumn: 'span 7',
    '@media (maxWidth: 992px)': {
      gridColumn: 'span 12',
    },
  },
  bioText: {
    fontSize: '1.15rem',
    color: '#d0cdcf',
    lineHeight: 1.8,
    fontWeight: 300,
  },
  bioRight: {
    gridColumn: 'span 5',
    '@media (maxWidth: 992px)': {
      gridColumn: 'span 12',
    },
  },
  heritageBadgeCard: {
    backgroundColor: '#101015',
    border: '1px solid rgba(197, 168, 128, 0.3)',
    padding: '2.25rem 2rem',
    display: 'flex',
    gap: '1.5rem',
    alignItems: 'flex-start',
  },
  heritageIcon: {
    padding: '0.75rem',
    backgroundColor: 'rgba(197, 168, 128, 0.1)',
    borderRadius: '4px',
    flexShrink: 0,
  },
  heritageYear: {
    fontFamily: "'Syne', sans-serif",
    fontSize: '0.75rem',
    fontWeight: 800,
    letterSpacing: '0.25em',
    color: '#c5a880',
    display: 'block',
    marginBottom: '0.25rem',
  },
  heritageTitle: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: '1.4rem',
    color: '#f4f1ea',
    marginBottom: '0.5rem',
  },
  heritageSub: {
    fontSize: '0.85rem',
    color: '#9c9992',
    lineHeight: 1.5,
  },
  projectSectionHeader: {
    marginBottom: '2.5rem',
  },
  projectsSub: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: '0.75rem',
    fontWeight: 700,
    letterSpacing: '0.25em',
    color: '#c5a880',
    textTransform: 'uppercase',
  },
  projectsTitle: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: '2rem',
    color: '#f4f1ea',
    marginTop: '0.4rem',
  },
  projectsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '1.75rem',
    '@media (maxWidth: 992px)': {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
    '@media (maxWidth: 640px)': {
      gridTemplateColumns: '1fr',
    },
  },
  projectCard: {
    backgroundColor: '#101015',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    padding: '2.25rem 1.75rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.6rem',
    transition: 'all 0.4s ease',
  },
  cardTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '0.5rem',
  },
  projType: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: '0.65rem',
    fontWeight: 700,
    letterSpacing: '0.2em',
    color: '#c5a880',
    textTransform: 'uppercase',
  },
  projYear: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: '0.75rem',
    color: 'rgba(255, 255, 255, 0.3)',
  },
  projName: {
    fontFamily: "'Syne', sans-serif",
    fontSize: '1.3rem',
    fontWeight: 700,
    color: '#f4f1ea',
    letterSpacing: '0.05em',
  },
  projLoc: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: '0.8rem',
    color: '#c5a880',
    fontWeight: 500,
  },
  projDesc: {
    fontSize: '0.85rem',
    color: '#9c9992',
    lineHeight: 1.6,
    marginTop: '0.4rem',
  },
};

export default Developer;
