import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { buildingAmenities } from '../data/projectData';

const Amenities = () => {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section id="amenities" style={styles.section}>
      <div className="container">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={styles.header}
        >
          <span className="subheading-gold">BUILDING AMENITIES</span>
          <h2 className="heading-editorial" style={styles.title}>
            EVERYTHING WITHIN REACH.
          </h2>
        </motion.div>

        {/* Editorial Layout: Left List (60%), Right Dynamic Image Preview (40%) */}
        <div className="amenities-content-grid" style={styles.contentGrid}>
          {/* LEFT: Numbered Rows List */}
          <div className="amenities-list-container" style={styles.listContainer}>
            {buildingAmenities.map((item, idx) => {
              const isActive = activeIdx === idx;

              return (
                <div
                  key={item.number}
                  onMouseEnter={() => setActiveIdx(idx)}
                  onClick={() => setActiveIdx(idx)}
                  className="amenity-row-responsive"
                  style={{
                    ...styles.amenityRow,
                    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                    backgroundColor: isActive ? 'rgba(197, 168, 128, 0.04)' : 'transparent',
                  }}
                >
                  <div style={styles.numCol}>
                    <span style={{
                      ...styles.rowNum,
                      color: isActive ? '#c5a880' : 'rgba(255, 255, 255, 0.3)',
                    }}>
                      {item.number}
                    </span>
                  </div>

                  <div style={styles.textCol}>
                    <div style={styles.titleLine}>
                      <h3 style={{
                        ...styles.itemTitle,
                        color: isActive ? '#f4f1ea' : '#9c9992',
                      }}>
                        {item.title}
                      </h3>
                      <span style={styles.categoryBadge}>{item.category}</span>
                    </div>
                    {isActive && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        transition={{ duration: 0.3 }}
                        style={styles.itemDesc}
                      >
                        {item.desc}
                      </motion.p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* RIGHT: Dynamic Image Reveal Card */}
          <div className="amenities-image-col" style={styles.imageCol}>
            <div className="amenities-sticky-container" style={styles.stickyContainer}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIdx}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                  className="amenities-image-card"
                  style={styles.imageCard}
                >
                  <img
                    src={buildingAmenities[activeIdx].image}
                    alt={buildingAmenities[activeIdx].title}
                    style={styles.previewImage}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/images/modern-suites/hero.png';
                    }}
                  />
                  <div style={styles.cardCaption}>
                    <span style={styles.captionNum}>
                      AMENITY {buildingAmenities[activeIdx].number}
                    </span>
                    <h4 style={styles.captionTitle}>
                      {buildingAmenities[activeIdx].title}
                    </h4>
                    <p style={styles.captionDesc}>
                      {buildingAmenities[activeIdx].desc}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
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
    scrollMarginTop: '100px',
  },
  header: {
    marginBottom: '4rem',
  },
  title: {
    color: '#f4f1ea',
  },
  contentGrid: {
    alignItems: 'start',
  },
  listContainer: {
  },
  amenityRow: {
    padding: '1.5rem 1.25rem',
    display: 'flex',
    alignItems: 'flex-start',
    gap: '2rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  numCol: {
    flexShrink: 0,
    width: '40px',
  },
  rowNum: {
    fontFamily: "'Syne', sans-serif",
    fontSize: '1.2rem',
    fontWeight: 700,
    transition: 'color 0.3s ease',
  },
  textCol: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '0.4rem',
  },
  titleLine: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '1rem',
    flexWrap: 'wrap',
  },
  itemTitle: {
    fontFamily: "'Syne', sans-serif",
    fontSize: '1.1rem',
    fontWeight: 700,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    transition: 'color 0.3s ease',
  },
  categoryBadge: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: '0.65rem',
    fontWeight: 600,
    letterSpacing: '0.2em',
    color: '#c5a880',
    textTransform: 'uppercase',
    backgroundColor: 'rgba(197, 168, 128, 0.1)',
    padding: '0.25rem 0.6rem',
    border: '1px solid rgba(197, 168, 128, 0.2)',
  },
  itemDesc: {
    fontSize: '0.9rem',
    color: '#9c9992',
    marginTop: '0.4rem',
  },
  imageCol: {
  },
  stickyContainer: {
    position: 'sticky',
    top: '120px',
  },
  imageCard: {
    position: 'relative',
    height: '520px',
    backgroundColor: '#121217',
    border: '1px solid rgba(197, 168, 128, 0.25)',
    overflow: 'hidden',
  },
  previewImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    filter: 'brightness(0.85) contrast(1.05)',
  },
  cardCaption: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    background: 'linear-gradient(180deg, transparent 0%, rgba(8, 8, 10, 0.95) 100%)',
    padding: '2rem 1.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.3rem',
  },
  captionNum: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: '0.7rem',
    fontWeight: 700,
    letterSpacing: '0.2em',
    color: '#c5a880',
  },
  captionTitle: {
    fontFamily: "'Syne', sans-serif",
    fontSize: '1.25rem',
    fontWeight: 700,
    color: '#f4f1ea',
    letterSpacing: '0.05em',
  },
  captionDesc: {
    fontSize: '0.85rem',
    color: '#d0cdcf',
  },
};

export default Amenities;
