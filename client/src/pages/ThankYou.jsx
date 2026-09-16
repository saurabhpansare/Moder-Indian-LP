import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowLeft } from 'lucide-react';

const ThankYou = () => {
  return (
    <div style={styles.container}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={styles.card}
      >
        <CheckCircle2 size={64} color="#c5a880" />
        <span style={styles.sub}>MODERN SUITES • MAHALAXMI</span>
        <h1 style={styles.title}>THANK YOU FOR YOUR ENQUIRY</h1>
        <p style={styles.desc}>
          Your enquiry has been securely received by our executive sales team at Modern Estates. A senior corporate relationship manager will reach out to you within 24 business hours.
        </p>
        <Link to="/" className="btn-primary" style={{ marginTop: '1.5rem' }}>
          <ArrowLeft size={16} />
          RETURN TO HOME
        </Link>
      </motion.div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#08080a',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
  },
  card: {
    maxWidth: '600px',
    width: '100%',
    backgroundColor: '#101015',
    border: '1px solid rgba(197, 168, 128, 0.3)',
    padding: '4rem 3rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    gap: '1.25rem',
  },
  sub: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: '0.75rem',
    fontWeight: 700,
    letterSpacing: '0.25em',
    color: '#c5a880',
    textTransform: 'uppercase',
  },
  title: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: '2.5rem',
    color: '#f4f1ea',
  },
  desc: {
    fontSize: '1rem',
    color: '#9c9992',
    lineHeight: 1.7,
  },
};

export default ThankYou;
