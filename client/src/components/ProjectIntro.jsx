import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { projectMeta } from '../data/projectData';

const ProjectIntro = () => {
  const scrollToArchitecture = (e) => {
    e.preventDefault();
    const el = document.querySelector('#architecture');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="project-intro" style={styles.section}>
      <div className="container">
        <div className="intro-grid" style={styles.grid}>
          {/* LEFT: Eyebrow & Large Editorial Heading */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="intro-left-col"
            style={styles.leftCol}
          >
            <span className="subheading-gold">{projectMeta.name}</span>
            <h2 className="heading-editorial" style={styles.heading}>
              {projectMeta.introTitle}
            </h2>
          </motion.div>

          {/* RIGHT: Editorial Copy & Action Button */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="intro-right-col"
            style={styles.rightCol}
          >
            <div style={styles.textStack}>
              <p style={styles.leadParagraph}>{projectMeta.introCopy}</p>
              
              <p style={styles.secondaryParagraph}>
                Engineered with single-office floor privacy, triple-aspect ventilation, and IGBC Platinum pre-certified sustainability, Modern Suites offers an unmatched physical environment for forward-thinking leadership.
              </p>

              <div style={{ marginTop: '1.5rem' }}>
                <a
                  href="#architecture"
                  onClick={scrollToArchitecture}
                  className="btn-link"
                  style={styles.discoverBtn}
                >
                  DISCOVER MODERN SUITES
                  <ArrowRight size={16} />
                </a>
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
    backgroundColor: '#08080a',
    padding: '10rem 0 7rem 0',
    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
  },
  grid: {
    alignItems: 'start',
  },
  leftCol: {
  },
  rightCol: {
    paddingTop: '2.5rem',
  },
  heading: {
    color: '#f4f1ea',
    maxWidth: '540px',
  },
  textStack: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.75rem',
    maxWidth: '560px',
  },
  leadParagraph: {
    fontSize: '1.15rem',
    color: '#d0cdcf',
    fontWeight: 300,
    lineHeight: 1.8,
  },
  secondaryParagraph: {
    fontSize: '1rem',
    color: '#9c9992',
    fontWeight: 300,
    lineHeight: 1.8,
  },
  discoverBtn: {
    fontSize: '0.8rem',
  },
};

export default ProjectIntro;
