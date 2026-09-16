import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Compass } from 'lucide-react';
import { locationData } from '../data/projectData';

const Location = () => {
  return (
    <section id="location" style={styles.section}>
      <div className="container">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={styles.header}
        >
          <span className="subheading-gold">LOCATION & CONNECTIVITY</span>
          <h2 className="heading-editorial" style={styles.title}>
            {locationData.headline}
          </h2>
        </motion.div>

        {/* Integrated Dark Architectural Map Canvas */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          style={styles.mapCanvas}
        >
          {/* Stylized Architectural Map Background Graphics */}
          <div style={styles.mapGraphics}>
            <div style={styles.gridLines} />
            <div style={styles.seaLine} />
            
            {/* Mahalaxmi Pin Point */}
            <div style={styles.primeMarker}>
              <div style={styles.pulseRing} />
              <div style={styles.markerDot} />
              <div style={styles.markerCard}>
                <span style={styles.cardTag}>PROJECT ADDRESS</span>
                <h4 style={styles.cardTitle}>MODERN SUITES</h4>
                <p style={styles.cardSub}>Mahalaxmi, Mumbai</p>
              </div>
            </div>

            {/* Surrounding Landmark Nodes */}
            <div style={{ ...styles.nodePin, top: '22%', left: '38%' }}>
              <div style={styles.smallDot} />
              <span style={styles.nodeLabel}>Lower Parel Hub</span>
            </div>

            <div style={{ ...styles.nodePin, top: '68%', left: '30%' }}>
              <div style={styles.smallDot} />
              <span style={styles.nodeLabel}>Mahalaxmi Race Course</span>
            </div>

            <div style={{ ...styles.nodePin, top: '18%', left: '72%' }}>
              <div style={styles.smallDot} />
              <span style={styles.nodeLabel}>BKC Financial Center</span>
            </div>

            <div style={{ ...styles.nodePin, top: '82%', left: '42%' }}>
              <div style={styles.smallDot} />
              <span style={styles.nodeLabel}>Nariman Point Core</span>
            </div>
          </div>

          {/* Location Key Details Bar at Bottom of Map */}
          <div style={styles.mapLegendBar}>
            <div style={styles.legendItem}>
              <Navigation size={18} color="#c5a880" />
              <div>
                <span style={styles.legendTitle}>SOUTH MUMBAI CORRIDOR</span>
                <span style={styles.legendValue}>Prime Financial Axis</span>
              </div>
            </div>

            <div style={styles.legendItem}>
              <Compass size={18} color="#c5a880" />
              <div>
                <span style={styles.legendTitle}>WESTERN & CENTRAL</span>
                <span style={styles.legendValue}>Seamless Highway Access</span>
              </div>
            </div>

            <div style={styles.legendItem}>
              <MapPin size={18} color="#c5a880" />
              <div>
                <span style={styles.legendTitle}>DISTINGUISHED NEIGHBORHOOD</span>
                <span style={styles.legendValue}>Exclusive Commercial Hub</span>
              </div>
            </div>
          </div>
        </motion.div>
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
    marginBottom: '4rem',
  },
  title: {
    color: '#f4f1ea',
  },
  mapCanvas: {
    position: 'relative',
    height: '560px',
    backgroundColor: '#0c0c10',
    border: '1px solid rgba(197, 168, 128, 0.25)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    '@media (maxWidth: 768px)': {
      height: '420px',
    },
  },
  mapGraphics: {
    position: 'relative',
    width: '100%',
    height: '100%',
    background: 'radial-gradient(circle at 45% 45%, #14141c 0%, #08080b 100%)',
  },
  gridLines: {
    position: 'absolute',
    inset: 0,
    backgroundImage: `
      linear-gradient(to right, rgba(197, 168, 128, 0.05) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(197, 168, 128, 0.05) 1px, transparent 1px)
    `,
    backgroundSize: '40px 40px',
  },
  seaLine: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '25%',
    height: '100%',
    borderRight: '1px stroke rgba(197, 168, 128, 0.15)',
    background: 'linear-gradient(90deg, rgba(8, 8, 10, 0.8) 0%, rgba(197, 168, 128, 0.03) 100%)',
  },
  primeMarker: {
    position: 'absolute',
    top: '48%',
    left: '45%',
    transform: 'translate(-50%, -50%)',
    zIndex: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  pulseRing: {
    position: 'absolute',
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    backgroundColor: 'rgba(197, 168, 128, 0.2)',
    border: '1px solid #c5a880',
    animation: 'pulseRing 2.5s infinite ease-out',
  },
  markerDot: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    backgroundColor: '#c5a880',
    boxShadow: '0 0 15px #c5a880',
    zIndex: 2,
  },
  markerCard: {
    marginTop: '1rem',
    backgroundColor: 'rgba(8, 8, 10, 0.92)',
    border: '1px solid #c5a880',
    padding: '0.85rem 1.25rem',
    textAlign: 'center',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.6)',
    backdropFilter: 'blur(8px)',
  },
  cardTag: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: '0.6rem',
    fontWeight: 700,
    letterSpacing: '0.25em',
    color: '#c5a880',
    textTransform: 'uppercase',
  },
  cardTitle: {
    fontFamily: "'Syne', sans-serif",
    fontSize: '1.1rem',
    fontWeight: 700,
    color: '#f4f1ea',
    letterSpacing: '0.05em',
  },
  cardSub: {
    fontSize: '0.75rem',
    color: '#9c9992',
  },
  nodePin: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    gap: '0.6rem',
  },
  smallDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    backgroundColor: 'rgba(244, 241, 234, 0.5)',
  },
  nodeLabel: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: '0.75rem',
    fontWeight: 500,
    color: 'rgba(244, 241, 234, 0.6)',
    letterSpacing: '0.08em',
  },
  mapLegendBar: {
    position: 'relative',
    zIndex: 10,
    backgroundColor: 'rgba(12, 12, 16, 0.95)',
    borderTop: '1px solid rgba(255, 255, 255, 0.08)',
    padding: '1.25rem 2.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '2rem',
    flexWrap: 'wrap',
  },
  legendItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.85rem',
  },
  legendTitle: {
    display: 'block',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: '0.65rem',
    fontWeight: 700,
    letterSpacing: '0.2em',
    color: '#c5a880',
    textTransform: 'uppercase',
  },
  legendValue: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: '0.85rem',
    color: '#f4f1ea',
  },
};

export default Location;
