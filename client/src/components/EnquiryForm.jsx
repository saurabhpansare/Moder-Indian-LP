import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { submitEnquiry } from '../services/api';

const EnquiryForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    company: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [apiError, setApiError] = useState('');

  const validate = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^[\d\s+\-()]{7,15}$/.test(formData.mobile)) {
      newErrors.mobile = 'Please enter a valid mobile number';
    }
    if (!formData.message.trim()) newErrors.message = 'Please include a brief message';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    if (apiError) setApiError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setApiError('');

    try {
      const response = await submitEnquiry(formData);
      if (response.success) {
        setSuccess(true);
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          mobile: '',
          company: '',
          message: '',
        });
      }
    } catch (err) {
      setApiError(err.message || 'An error occurred while submitting your enquiry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="enquire" style={styles.section}>
      <div className="container">
        <div style={styles.grid}>
          {/* LEFT: Info & Editorial Subtext */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={styles.leftCol}
          >
            <span className="subheading-gold">ENQUIRE ABOUT MODERN SUITES</span>
            <h2 className="heading-editorial" style={styles.title}>
              MAKE YOUR <br />
              <span style={{ color: '#c5a880', fontStyle: 'italic' }}>NEXT MOVE.</span>
            </h2>

            <p style={styles.leftDesc}>
              Connect with our corporate sales advisors for private floor presentations, floor plans, and technical specifications.
            </p>

            <div style={styles.contactMeta}>
              <div>
                <span style={styles.metaLabel}>CORPORATE HEADQUARTERS</span>
                <span style={styles.metaValue}>Modern Estates, Mahalaxmi, Mumbai - 400011</span>
              </div>
              <div>
                <span style={styles.metaLabel}>PRIVATE ADVISORY</span>
                <span style={styles.metaValue}>enquiries@modernestates.in</span>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: High-End Dark Form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={styles.rightCol}
          >
            <div style={styles.formCard}>
              <AnimatePresence mode="wait">
                {success ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    style={styles.successBox}
                  >
                    <CheckCircle size={56} color="#c5a880" />
                    <h3 style={styles.successTitle}>ENQUIRY SUBMITTED</h3>
                    <p style={styles.successMsg}>
                      Thank you. Our senior executive team will be in touch with you shortly.
                    </p>
                    <button
                      onClick={() => setSuccess(false)}
                      className="btn-secondary"
                      style={{ marginTop: '1.5rem' }}
                    >
                      SUBMIT ANOTHER ENQUIRY
                    </button>
                  </motion.div>
                ) : (
                  <form key="form" onSubmit={handleSubmit} style={styles.formStack}>
                    {apiError && (
                      <div style={styles.apiErrorBox}>
                        <AlertCircle size={18} color="#e53e3e" />
                        <span>{apiError}</span>
                      </div>
                    )}

                    <div style={styles.rowTwo}>
                      <div style={styles.fieldGroup}>
                        <label style={styles.label}>FIRST NAME *</label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          placeholder="John"
                          style={{
                            ...styles.input,
                            borderColor: errors.firstName ? '#e53e3e' : 'rgba(255, 255, 255, 0.12)',
                          }}
                        />
                        {errors.firstName && <span style={styles.errorSpan}>{errors.firstName}</span>}
                      </div>

                      <div style={styles.fieldGroup}>
                        <label style={styles.label}>LAST NAME *</label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          placeholder="Doe"
                          style={{
                            ...styles.input,
                            borderColor: errors.lastName ? '#e53e3e' : 'rgba(255, 255, 255, 0.12)',
                          }}
                        />
                        {errors.lastName && <span style={styles.errorSpan}>{errors.lastName}</span>}
                      </div>
                    </div>

                    <div style={styles.rowTwo}>
                      <div style={styles.fieldGroup}>
                        <label style={styles.label}>EMAIL ADDRESS *</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="john@company.com"
                          style={{
                            ...styles.input,
                            borderColor: errors.email ? '#e53e3e' : 'rgba(255, 255, 255, 0.12)',
                          }}
                        />
                        {errors.email && <span style={styles.errorSpan}>{errors.email}</span>}
                      </div>

                      <div style={styles.fieldGroup}>
                        <label style={styles.label}>MOBILE NUMBER *</label>
                        <input
                          type="tel"
                          name="mobile"
                          value={formData.mobile}
                          onChange={handleChange}
                          placeholder="+91 98765 43210"
                          style={{
                            ...styles.input,
                            borderColor: errors.mobile ? '#e53e3e' : 'rgba(255, 255, 255, 0.12)',
                          }}
                        />
                        {errors.mobile && <span style={styles.errorSpan}>{errors.mobile}</span>}
                      </div>
                    </div>

                    <div style={styles.fieldGroup}>
                      <label style={styles.label}>COMPANY / ORGANIZATION</label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Enterprise Ltd."
                        style={styles.input}
                      />
                    </div>

                    <div style={styles.fieldGroup}>
                      <label style={styles.label}>MESSAGE / REQUIREMENTS *</label>
                      <textarea
                        name="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Please share details regarding required floor plate area..."
                        style={{
                          ...styles.textarea,
                          borderColor: errors.message ? '#e53e3e' : 'rgba(255, 255, 255, 0.12)',
                        }}
                      />
                      {errors.message && <span style={styles.errorSpan}>{errors.message}</span>}
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-primary"
                      style={styles.submitBtn}
                    >
                      {loading ? (
                        <>
                          <Loader2 size={16} className="spin" style={{ animation: 'spin 1s linear infinite' }} />
                          SUBMITTING...
                        </>
                      ) : (
                        <>
                          SUBMIT ENQUIRY
                          <Send size={14} />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </AnimatePresence>
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
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gap: '4rem',
    alignItems: 'start',
  },
  leftCol: {
    gridColumn: 'span 5',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.75rem',
    '@media (maxWidth: 992px)': {
      gridColumn: 'span 12',
    },
  },
  rightCol: {
    gridColumn: 'span 7',
    '@media (maxWidth: 992px)': {
      gridColumn: 'span 12',
    },
  },
  title: {
    color: '#f4f1ea',
  },
  leftDesc: {
    fontSize: '1.05rem',
    color: '#9c9992',
    lineHeight: 1.8,
  },
  contactMeta: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    marginTop: '1.5rem',
    paddingTop: '1.5rem',
    borderTop: '1px solid rgba(255, 255, 255, 0.08)',
  },
  metaLabel: {
    display: 'block',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: '0.65rem',
    fontWeight: 700,
    letterSpacing: '0.2em',
    color: '#c5a880',
    textTransform: 'uppercase',
  },
  metaValue: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: '0.9rem',
    color: '#f4f1ea',
  },
  formCard: {
    backgroundColor: '#121217',
    border: '1px solid rgba(197, 168, 128, 0.3)',
    padding: '3rem 2.5rem',
  },
  formStack: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.75rem',
  },
  rowTwo: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '1.5rem',
    '@media (maxWidth: 640px)': {
      gridTemplateColumns: '1fr',
    },
  },
  fieldGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  label: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: '0.65rem',
    fontWeight: 700,
    letterSpacing: '0.2em',
    color: '#9c9992',
  },
  input: {
    width: '100%',
    padding: '0.9rem 1.1rem',
    backgroundColor: '#08080a',
    border: '1px solid rgba(255, 255, 255, 0.12)',
    color: '#f4f1ea',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: '0.9rem',
    outline: 'none',
    transition: 'border-color 0.3s ease',
  },
  textarea: {
    width: '100%',
    padding: '0.9rem 1.1rem',
    backgroundColor: '#08080a',
    border: '1px solid rgba(255, 255, 255, 0.12)',
    color: '#f4f1ea',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: '0.9rem',
    outline: 'none',
    resize: 'vertical',
    transition: 'border-color 0.3s ease',
  },
  errorSpan: {
    fontSize: '0.75rem',
    color: '#e53e3e',
  },
  apiErrorBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.85rem 1.25rem',
    backgroundColor: 'rgba(229, 62, 62, 0.1)',
    border: '1px solid rgba(229, 62, 62, 0.3)',
    color: '#fc8181',
    fontSize: '0.85rem',
  },
  submitBtn: {
    marginTop: '0.5rem',
    width: '100%',
  },
  successBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    padding: '3rem 1rem',
    gap: '1rem',
  },
  successTitle: {
    fontFamily: "'Syne', sans-serif",
    fontSize: '1.5rem',
    fontWeight: 700,
    color: '#f4f1ea',
    letterSpacing: '0.1em',
  },
  successMsg: {
    fontSize: '1rem',
    color: '#9c9992',
    maxWidth: '400px',
  },
};

export default EnquiryForm;
