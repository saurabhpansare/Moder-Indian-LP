import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { workspaceExperience } from '../data/projectData';

const WorkspaceExperience = () => {
  return (
    <section id="workspace" style={styles.section}>
      <div className="container">
        {/* Header Overlay */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={styles.header}
        >
          <span className="subheading-gold">WORKSPACE EXPERIENCE</span>
          <h2 className="heading-editorial" style={styles.title}>
            {workspaceExperience.headline}
          </h2>
          <p style={styles.subtext}>{workspaceExperience.subtext}</p>
        </motion.div>

        {/* Split Screen Block 1: Image 60% / Text 40% */}
        <div className="workspace-split-row" style={styles.splitRow}>
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="workspace-col60"
            style={styles.col60}
          >
            <div className="workspace-image-card" style={styles.imageCard}>
              <img
                src={workspaceExperience.images[0]}
                alt="Executive Workspace Interior"
                style={styles.img}
                loading="lazy"
              />
              <div style={styles.badgeOverlay}>
                <span style={styles.badgeText}>EXECUTIVE SUITE</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="workspace-col40"
            style={styles.col40}
          >
            <div style={styles.featureList}>
              {workspaceExperience.features.slice(0, 3).map((item) => (
                <div key={item.title} style={styles.featureItem}>
                  <div style={styles.iconBox}>
                    <CheckCircle2 size={20} color="#c5a880" />
                  </div>
                  <div>
                    <h4 style={styles.itemTitle}>{item.title}</h4>
                    <p style={styles.itemDesc}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Split Screen Block 2: Text 40% / Image 60% */}
        <div className="workspace-split-row" style={{ ...styles.splitRow, marginTop: '3rem' }}>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="workspace-col40"
            style={styles.col40}
          >
            <div style={styles.featureList}>
              {workspaceExperience.features.slice(3, 5).map((item) => (
                <div key={item.title} style={styles.featureItem}>
                  <div style={styles.iconBox}>
                    <CheckCircle2 size={20} color="#c5a880" />
                  </div>
                  <div>
                    <h4 style={styles.itemTitle}>{item.title}</h4>
                    <p style={styles.itemDesc}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="workspace-col60"
            style={styles.col60}
          >
            <div className="workspace-image-card" style={styles.imageCard}>
              <img
                src={workspaceExperience.images[1]}
                alt="Executive Private Balcony & View"
                style={styles.img}
                loading="lazy"
              />
              <div style={styles.badgeOverlay}>
                <span style={styles.badgeText}>ENSUITE BALCONY</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const styles = {
  section: {
    backgroundColor: '#0c0c10',
    padding: '9rem 0',
    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
  },
  header: {
    marginBottom: '5rem',
    maxWidth: '780px',
  },
  title: {
    color: '#f4f1ea',
    marginBottom: '1rem',
  },
  subtext: {
    fontSize: '1.1rem',
    color: '#9c9992',
  },
  splitRow: {
    alignItems: 'center',
  },
  col60: {
  },
  col40: {
  },
  imageCard: {
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: '#16161c',
    border: '1px solid rgba(197, 168, 128, 0.2)',
  },
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    filter: 'brightness(0.9) contrast(1.05)',
  },
  badgeOverlay: {
    position: 'absolute',
    bottom: '1.5rem',
    left: '1.5rem',
    backgroundColor: 'rgba(8, 8, 10, 0.85)',
    border: '1px solid rgba(197, 168, 128, 0.3)',
    padding: '0.5rem 1.25rem',
    backdropFilter: 'blur(8px)',
  },
  badgeText: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: '0.7rem',
    fontWeight: 700,
    letterSpacing: '0.25em',
    color: '#c5a880',
  },
  featureList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2.5rem',
  },
  featureItem: {
    display: 'flex',
    gap: '1.25rem',
    alignItems: 'flex-start',
  },
  iconBox: {
    marginTop: '0.25rem',
    flexShrink: 0,
  },
  itemTitle: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: '1.6rem',
    fontWeight: 500,
    color: '#f4f1ea',
    marginBottom: '0.4rem',
  },
  itemDesc: {
    fontSize: '0.95rem',
    color: '#9c9992',
    lineHeight: 1.6,
  },
};

export default WorkspaceExperience;
