import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { galleryItems } from '../data/projectData';

const Gallery = () => {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const openLightbox = (index) => {
    setLightboxIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    document.body.style.overflow = 'auto';
  }, []);

  const nextImage = useCallback(() => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev + 1) % galleryItems.length);
    }
  }, [lightboxIndex]);

  const prevImage = useCallback(() => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev - 1 + galleryItems.length) % galleryItems.length);
    }
  }, [lightboxIndex]);

  // Keyboard Navigation Handler
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;

      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, closeLightbox, nextImage, prevImage]);

  return (
    <section id="gallery" style={styles.section}>
      <div className="container">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={styles.header}
        >
          <span className="subheading-gold">PROJECT GALLERY</span>
          <h2 className="heading-editorial" style={styles.title}>
            CINEMATIC PERSPECTIVES.
          </h2>
        </motion.div>

        {/* Editorial Asymmetric Grid */}
        <div style={styles.galleryGrid}>
          {galleryItems.map((item, idx) => {
            const isHero = idx === 0;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: idx * 0.1 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => openLightbox(idx)}
                style={{
                  ...styles.gridCard,
                  gridColumn: isHero ? 'span 8' : item.aspect === 'tall' ? 'span 4' : 'span 4',
                  gridRow: isHero ? 'span 2' : 'span 1',
                }}
              >
                <img src={item.src} alt={item.title} style={styles.cardImage} loading="lazy" />
                <div style={styles.cardOverlay}>
                  <div style={styles.overlayTop}>
                    <span style={styles.catBadge}>{item.category}</span>
                    <button style={styles.expandBtn} aria-label="Expand Image">
                      <Maximize2 size={16} color="#f4f1ea" />
                    </button>
                  </div>
                  <div style={styles.overlayBottom}>
                    <h3 style={styles.itemTitle}>{item.title}</h3>
                    <p style={styles.itemCaption}>{item.caption}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal Overlay */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            style={styles.lightboxOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Top Bar: Counter & Close */}
            <div style={styles.lightboxHeader}>
              <span style={styles.counterText}>
                {lightboxIndex + 1} / {galleryItems.length}
              </span>
              <button onClick={closeLightbox} style={styles.closeBtn} aria-label="Close Lightbox">
                <X size={28} color="#f4f1ea" />
              </button>
            </div>

            {/* Previous Button */}
            <button onClick={prevImage} style={styles.navBtnLeft} aria-label="Previous Image">
              <ChevronLeft size={36} color="#c5a880" />
            </button>

            {/* Next Button */}
            <button onClick={nextImage} style={styles.navBtnRight} aria-label="Next Image">
              <ChevronRight size={36} color="#c5a880" />
            </button>

            {/* Main Lightbox Image Stage */}
            <div style={styles.lightboxStage} onClick={closeLightbox}>
              <motion.div
                key={lightboxIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                style={styles.lightboxContent}
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={galleryItems[lightboxIndex].src}
                  alt={galleryItems[lightboxIndex].title}
                  style={styles.lightboxImage}
                />
                <div style={styles.lightboxFooter}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <span style={styles.catBadge}>{galleryItems[lightboxIndex].category}</span>
                    <h3 style={styles.lightboxTitle}>{galleryItems[lightboxIndex].title}</h3>
                    <p style={styles.lightboxCaption}>{galleryItems[lightboxIndex].caption}</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
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
    marginBottom: '4rem',
  },
  title: {
    color: '#f4f1ea',
  },
  galleryGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gap: '1.5rem',
    '@media (maxWidth: 992px)': {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
    '@media (maxWidth: 640px)': {
      gridTemplateColumns: '1fr',
    },
  },
  gridCard: {
    position: 'relative',
    height: '340px',
    backgroundColor: '#121217',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    overflow: 'hidden',
    cursor: 'pointer',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.6s ease',
    filter: 'brightness(0.9) contrast(1.05)',
  },
  cardOverlay: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(180deg, rgba(8, 8, 10, 0.4) 0%, transparent 40%, rgba(8, 8, 10, 0.95) 100%)',
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    opacity: 0.85,
    transition: 'opacity 0.3s ease',
  },
  overlayTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  catBadge: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: '0.65rem',
    fontWeight: 700,
    letterSpacing: '0.2em',
    color: '#c5a880',
    textTransform: 'uppercase',
  },
  expandBtn: {
    background: 'rgba(8, 8, 10, 0.6)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    padding: '0.4rem',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlayBottom: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
  },
  itemTitle: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: '1.4rem',
    fontWeight: 500,
    color: '#f4f1ea',
  },
  itemCaption: {
    fontSize: '0.8rem',
    color: '#9c9992',
    lineHeight: 1.4,
  },
  lightboxOverlay: {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(5, 5, 7, 0.96)',
    backdropFilter: 'blur(20px)',
    zIndex: 2000,
    display: 'flex',
    flexDirection: 'column',
  },
  lightboxHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1.5rem 2.5rem',
    zIndex: 2010,
  },
  counterText: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: '0.85rem',
    fontWeight: 600,
    letterSpacing: '0.2em',
    color: '#c5a880',
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '0.5rem',
  },
  navBtnLeft: {
    position: 'absolute',
    left: '2rem',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 2010,
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(197, 168, 128, 0.3)',
    borderRadius: '50%',
    width: '60px',
    height: '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  navBtnRight: {
    position: 'absolute',
    right: '2rem',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 2010,
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(197, 168, 128, 0.3)',
    borderRadius: '50%',
    width: '60px',
    height: '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  lightboxStage: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem 5rem 3rem 5rem',
  },
  lightboxContent: {
    maxWidth: '1100px',
    width: '100%',
    maxHeight: '80vh',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#08080a',
    border: '1px solid rgba(197, 168, 128, 0.3)',
    overflow: 'hidden',
  },
  lightboxImage: {
    width: '100%',
    maxHeight: '62vh',
    objectFit: 'contain',
    backgroundColor: '#000',
  },
  lightboxFooter: {
    padding: '1.5rem 2rem',
    backgroundColor: '#0c0c10',
    borderTop: '1px solid rgba(255, 255, 255, 0.08)',
  },
  lightboxTitle: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: '1.8rem',
    color: '#f4f1ea',
  },
  lightboxCaption: {
    fontSize: '0.9rem',
    color: '#9c9992',
  },
};

export default Gallery;
