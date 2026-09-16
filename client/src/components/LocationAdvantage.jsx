import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Compass, ShieldCheck, MapPin } from 'lucide-react';
import { locationData } from '../data/projectData';

const LocationAdvantage = () => {
  return (
    <section style={styles.section}>
      <div className="container">
        <div className="advantage-grid" style={styles.grid}>
          {/* LEFT: Heading & Narrative */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="advantage-left-col"
            style={styles.leftCol}
          >
            <span className="subheading-gold">STRATEGIC ADVANTAGE</span>
            <h2 className="heading-editorial" style={styles.heading}>
              {locationData.narrativeHeading}
            </h2>
            <p style={styles.narrativeCopy}>{locationData.narrativeCopy}</p>

            <div style={styles.keyMetrics}>
              <div style={styles.metricItem}>
                <Building2 size={22} color="#c5a880" />
                <div>
                  <span style={styles.metricTitle}>BUSINESS CORRIDOR</span>
                  <span style={styles.metricDesc}>Direct proximity to BKC & Lower Parel</span>
                </div>
              </div>

              <div style={styles.metricItem}>
                <Compass size={22} color="#c5a880" />
                <div>
                  <span style={styles.metricTitle}>TRANSIT CONNECTIVITY</span>
                  <span style={styles.metricDesc}>Coastal Road & Sea Link access</span>
                </div>
              </div>

              <div style={styles.metricItem}>
                <ShieldCheck size={22} color="#c5a880" />
                <div>
                  <span style={styles.metricTitle}>CIVIC EXCELLENCE</span>
                  <span style={styles.metricDesc}>Established corporate governance hub</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: Visual Landmark Cards */}
          <div className="advantage-right-col" style={styles.rightCol}>
            <div className="advantage-landmarks-grid" style={styles.landmarksList}>
              {locationData.landmarks.map((item, idx) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: idx * 0.12 }}
                  whileHover={{ borderColor: '#c5a880', backgroundColor: '#14141a' }}
                  style={styles.landmarkCard}
                >
                  <div style={styles.cardHeader}>
                    <span style={styles.tagBadge}>{item.tag}</span>
                    <MapPin size={16} color="#c5a880" />
                  </div>
                  <h3 style={styles.landmarkName}>{item.name}</h3>
                  <p style={styles.landmarkDesc}>{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
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
  grid: {
    alignItems: 'center',
  },
  leftCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  rightCol: {
  },
  heading: {
    color: '#f4f1ea',
  },
  narrativeCopy: {
    fontSize: '1.05rem',
    color: '#9c9992',
    lineHeight: 1.8,
  },
  keyMetrics: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.75rem',
    marginTop: '1.5rem',
    paddingTop: '1.5rem',
    borderTop: '1px solid rgba(255, 255, 255, 0.08)',
  },
  metricItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.25rem',
  },
  metricTitle: {
    display: 'block',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: '0.75rem',
    fontWeight: 700,
    letterSpacing: '0.2em',
    color: '#f4f1ea',
    textTransform: 'uppercase',
  },
  metricDesc: {
    fontSize: '0.85rem',
    color: '#9c9992',
  },
  landmarksList: {
  },
  landmarkCard: {
    backgroundColor: '#101015',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    padding: '2rem 1.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    transition: 'all 0.3s ease',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tagBadge: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: '0.6rem',
    fontWeight: 700,
    letterSpacing: '0.2em',
    color: '#c5a880',
    textTransform: 'uppercase',
  },
  landmarkName: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: '1.4rem',
    fontWeight: 500,
    color: '#f4f1ea',
    lineHeight: 1.25,
  },
  landmarkDesc: {
    fontSize: '0.85rem',
    color: '#9c9992',
  },
};

export default LocationAdvantage;
