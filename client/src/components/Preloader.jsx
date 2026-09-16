import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader = ({ onComplete }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    // Step 0: "MODERN ESTATES"
    const timer1 = setTimeout(() => {
      setStep(1); // Step 1: "MODERN SUITES"
    }, 900);

    const timer2 = setTimeout(() => {
      setStep(2); // Complete
      if (onComplete) onComplete();
    }, 2200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {step < 2 && (
        <motion.div
          style={styles.overlay}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
        >
          <div style={styles.centerContainer}>
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
              style={styles.textWrapper}
            >
              {step === 0 ? (
                <span style={styles.brandSubtitle}>MODERN ESTATES</span>
              ) : (
                <div style={styles.titleGroup}>
                  <span style={styles.brandTitle}>MODERN SUITES</span>
                  <span style={styles.locationTag}>MAHALAXMI, MUMBAI</span>
                </div>
              )}
            </motion.div>

            {/* Thin Loading Bar */}
            <div style={styles.barContainer}>
              <motion.div
                style={styles.barFill}
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 2.1, ease: 'easeInOut' }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: '#08080a',
    zIndex: 9999,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '2rem',
  },
  textWrapper: {
    textAlign: 'center',
    minHeight: '80px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandSubtitle: {
    fontFamily: "'Syne', sans-serif",
    fontSize: '1.25rem',
    fontWeight: 700,
    letterSpacing: '0.4em',
    color: '#c5a880',
    textTransform: 'uppercase',
  },
  titleGroup: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.5rem',
  },
  brandTitle: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: '2.5rem',
    fontWeight: 400,
    letterSpacing: '0.25em',
    color: '#f4f1ea',
    textTransform: 'uppercase',
  },
  locationTag: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: '0.7rem',
    fontWeight: 500,
    letterSpacing: '0.3em',
    color: '#9c9992',
    textTransform: 'uppercase',
  },
  barContainer: {
    width: '180px',
    height: '1px',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    position: 'relative',
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    backgroundColor: '#c5a880',
  },
};

export default Preloader;
