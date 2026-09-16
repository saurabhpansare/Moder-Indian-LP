import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Search,
  Download,
  RefreshCw,
  Mail,
  Phone,
  Building,
  CheckCircle2,
  Trash2,
  Lock,
  ArrowLeft,
  Calendar,
  Eye,
  X,
  FileSpreadsheet,
} from 'lucide-react';
import {
  fetchEnquiries,
  updateEnquiryStatus,
  deleteEnquiry,
  downloadEnquiriesCSV,
} from '../services/api';

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');

  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeStatus, setActiveStatus] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLead, setSelectedLead] = useState(null);
  const [notification, setNotification] = useState('');

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetchEnquiries(activeStatus, searchTerm);
      if (res.success) {
        setEnquiries(res.data || []);
      }
    } catch (err) {
      showNotice('Failed to load enquiries from server.');
    } finally {
      setLoading(false);
    }
  }, [activeStatus, searchTerm]);

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated, loadData]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (passcode === 'admin123' || passcode.trim().length > 0) {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Invalid passcode. Use demo passcode: admin123');
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateEnquiryStatus(id, newStatus);
      showNotice(`Status updated to "${newStatus}"`);
      loadData();
      if (selectedLead && selectedLead._id === id) {
        setSelectedLead((prev) => ({ ...prev, status: newStatus }));
      }
    } catch (err) {
      showNotice('Failed to update status.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this enquiry lead?')) return;

    try {
      await deleteEnquiry(id);
      showNotice('Enquiry deleted successfully.');
      if (selectedLead && selectedLead._id === id) {
        setSelectedLead(null);
      }
      loadData();
    } catch (err) {
      showNotice('Failed to delete lead.');
    }
  };

  const showNotice = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3500);
  };

  // Client-side CSV export generator
  const exportClientCSV = () => {
    if (!enquiries.length) return;

    const headers = ['ID,First Name,Last Name,Email,Mobile,Company,Message,Status,Date Submitted'];
    const rows = enquiries.map((e) => {
      const msg = `"${(e.message || '').replace(/"/g, '""')}"`;
      const comp = `"${(e.company || '').replace(/"/g, '""')}"`;
      const dateStr = new Date(e.createdAt).toLocaleString();
      return `${e._id},"${e.firstName}","${e.lastName}","${e.email}","${e.mobile}",${comp},${msg},"${e.status}","${dateStr}"`;
    });

    const blob = new Blob([[headers, ...rows].join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Modern_Suites_Leads_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showNotice('CSV export generated & downloaded successfully.');
  };

  // Calculate Metrics
  const totalLeads = enquiries.length;
  const newCount = enquiries.filter((e) => e.status === 'New').length;
  const contactedCount = enquiries.filter((e) => e.status === 'Contacted').length;

  return (
    <div style={styles.pageWrapper}>
      {/* Toast Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={styles.toast}
          >
            <ShieldCheck size={18} color="#c5a880" />
            <span>{notification}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ADMIN AUTH MODAL / PASSCODE PROMPT */}
      {!isAuthenticated ? (
        <div style={styles.authContainer}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            style={styles.authCard}
          >
            <div style={styles.lockBadge}>
              <Lock size={28} color="#c5a880" />
            </div>
            <span style={styles.brandTag}>MODERN ESTATES • ADMIN SUITE</span>
            <h1 style={styles.authTitle}>EXECUTIVE PORTAL</h1>
            <p style={styles.authDesc}>
              Enter admin passcode to access Modern Suites corporate lead dashboard.
            </p>

            <form onSubmit={handleLogin} style={styles.authForm}>
              <input
                type="password"
                placeholder="Enter passcode (e.g. admin123)"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                style={styles.authInput}
                autoFocus
              />
              {authError && <span style={styles.authError}>{authError}</span>}

              <button type="submit" className="btn-primary" style={{ width: '100%' }}>
                ACCESS DASHBOARD
              </button>
            </form>

            <div style={styles.quickAccessHint}>
              <span>Tip: Press <b>ACCESS DASHBOARD</b> with passcode <code>admin123</code> for instant demo login.</span>
            </div>

            <Link to="/" style={styles.returnLink}>
              <ArrowLeft size={14} /> Back to Modern Suites Presentation
            </Link>
          </motion.div>
        </div>
      ) : (
        /* MAIN ADMIN DASHBOARD CONTENT */
        <div className="container" style={styles.dashboardContainer}>
          {/* Top Admin Navigation Header */}
          <header className="admin-dash-header" style={styles.dashHeader}>
            <div style={styles.dashBrandGroup}>
              <span style={styles.dashBadge}>MODERN ESTATES</span>
              <h1 style={styles.dashTitle}>LEAD MANAGEMENT CONSOLE</h1>
              <span style={styles.dashSub}>Modern Suites Mahalaxmi • Commercial Advisory</span>
            </div>

            <div style={styles.dashActionGroup}>
              <Link to="/" style={styles.btnOutline}>
                <ArrowLeft size={14} /> VIEW WEBSITE
              </Link>
              <button onClick={loadData} style={styles.btnOutline} title="Refresh Data">
                <RefreshCw size={14} className={loading ? 'spin' : ''} /> REFRESH
              </button>
              <button onClick={exportClientCSV} className="btn-primary" style={styles.exportBtn}>
                <Download size={15} /> EXPORT LEADS (CSV)
              </button>
            </div>
          </header>

          {/* Metrics Stats Row */}
          <div className="admin-metrics-row" style={styles.metricsRow}>
            <div style={styles.metricCard}>
              <span style={styles.metricLabel}>TOTAL LEADS RECEIVED</span>
              <span style={styles.metricValue}>{totalLeads}</span>
              <span style={styles.metricSub}>Commercial Enquiry Requests</span>
            </div>

            <div style={{ ...styles.metricCard, borderColor: 'rgba(197, 168, 128, 0.4)' }}>
              <span style={{ ...styles.metricLabel, color: '#c5a880' }}>NEW UNCONTACTED</span>
              <span style={{ ...styles.metricValue, color: '#c5a880' }}>{newCount}</span>
              <span style={styles.metricSub}>Requires Immediate Callback</span>
            </div>

            <div style={styles.metricCard}>
              <span style={styles.metricLabel}>IN ADVISORY / CONTACTED</span>
              <span style={styles.metricValue}>{contactedCount}</span>
              <span style={styles.metricSub}>Active Executive Dialogues</span>
            </div>
          </div>

          {/* Search Toolbar & Status Filters */}
          <div className="admin-toolbar" style={styles.toolbar}>
            {/* Status Filter Tabs */}
            <div style={styles.tabsGroup}>
              {['All', 'New', 'Contacted', 'Archived'].map((status) => (
                <button
                  key={status}
                  onClick={() => setActiveStatus(status)}
                  style={{
                    ...styles.tabBtn,
                    backgroundColor: activeStatus === status ? '#c5a880' : 'transparent',
                    color: activeStatus === status ? '#08080a' : '#9c9992',
                    borderColor: activeStatus === status ? '#c5a880' : 'rgba(255,255,255,0.1)',
                  }}
                >
                  {status.toUpperCase()}
                  {status === 'New' && newCount > 0 && (
                    <span style={styles.badgeCount}>{newCount}</span>
                  )}
                </button>
              ))}
            </div>

            {/* Real-time Search Box */}
            <div className="admin-search-box" style={styles.searchBox}>
              <Search size={16} color="#c5a880" />
              <input
                type="text"
                placeholder="Search leads by name, email, company or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={styles.searchInput}
              />
              {searchTerm && (
                <button onClick={() => setSearchTerm('')} style={styles.clearSearchBtn}>
                  <X size={14} color="#9c9992" />
                </button>
              )}
            </div>
          </div>

          {/* Enquiries Leads Data Table */}
          <div style={styles.tableCard}>
            {loading ? (
              <div style={styles.loadingState}>
                <RefreshCw size={28} color="#c5a880" style={{ animation: 'spin 1s linear infinite' }} />
                <span>Loading leads from MongoDB...</span>
              </div>
            ) : enquiries.length === 0 ? (
              <div style={styles.emptyState}>
                <FileSpreadsheet size={42} color="#62605b" />
                <h3 style={styles.emptyTitle}>NO LEADS FOUND</h3>
                <p style={styles.emptyDesc}>
                  No enquiry leads matched your selected filter or search query.
                </p>
              </div>
            ) : (
              <div style={styles.tableResponsive}>
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th style={styles.th}>CLIENT NAME</th>
                      <th style={styles.th}>ORGANIZATION</th>
                      <th style={styles.th}>CONTACT INFO</th>
                      <th style={styles.th}>DATE SUBMITTED</th>
                      <th style={styles.th}>STATUS</th>
                      <th style={styles.th}>ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {enquiries.map((lead) => (
                      <tr key={lead._id} style={styles.tr}>
                        <td style={styles.td}>
                          <div style={styles.nameBlock}>
                            <span style={styles.clientName}>
                              {lead.firstName} {lead.lastName}
                            </span>
                            <span style={styles.refId}>ID: {lead._id}</span>
                          </div>
                        </td>

                        <td style={styles.td}>
                          <div style={styles.cellWithIcon}>
                            <Building size={14} color="#c5a880" />
                            <span>{lead.company || 'N/A'}</span>
                          </div>
                        </td>

                        <td style={styles.td}>
                          <div style={styles.contactStack}>
                            <a href={`mailto:${lead.email}`} style={styles.contactLink}>
                              <Mail size={13} color="#c5a880" /> {lead.email}
                            </a>
                            <a href={`tel:${lead.mobile}`} style={styles.contactLink}>
                              <Phone size={13} color="#c5a880" /> {lead.mobile}
                            </a>
                          </div>
                        </td>

                        <td style={styles.td}>
                          <div style={styles.cellWithIcon}>
                            <Calendar size={13} color="#9c9992" />
                            <span>{new Date(lead.createdAt).toLocaleDateString()}</span>
                          </div>
                        </td>

                        <td style={styles.td}>
                          <select
                            value={lead.status || 'New'}
                            onChange={(e) => handleStatusChange(lead._id, e.target.value)}
                            style={{
                              ...styles.statusSelect,
                              backgroundColor:
                                lead.status === 'New'
                                  ? 'rgba(197, 168, 128, 0.15)'
                                  : lead.status === 'Contacted'
                                  ? 'rgba(72, 187, 120, 0.15)'
                                  : 'rgba(255, 255, 255, 0.08)',
                              color:
                                lead.status === 'New'
                                  ? '#c5a880'
                                  : lead.status === 'Contacted'
                                  ? '#48bb78'
                                  : '#9c9992',
                              borderColor:
                                lead.status === 'New'
                                  ? 'rgba(197, 168, 128, 0.4)'
                                  : lead.status === 'Contacted'
                                  ? 'rgba(72, 187, 120, 0.4)'
                                  : 'rgba(255, 255, 255, 0.2)',
                            }}
                          >
                            <option value="New" style={{ backgroundColor: '#101015', color: '#c5a880' }}>
                              NEW
                            </option>
                            <option value="Contacted" style={{ backgroundColor: '#101015', color: '#48bb78' }}>
                              CONTACTED
                            </option>
                            <option value="Archived" style={{ backgroundColor: '#101015', color: '#9c9992' }}>
                              ARCHIVED
                            </option>
                          </select>
                        </td>

                        <td style={styles.td}>
                          <div style={styles.actionBtns}>
                            <button
                              onClick={() => setSelectedLead(lead)}
                              style={styles.iconBtn}
                              title="View Full Lead Details"
                            >
                              <Eye size={16} color="#c5a880" />
                            </button>

                            <button
                              onClick={() => handleDelete(lead._id)}
                              style={styles.iconBtn}
                              title="Delete Lead"
                            >
                              <Trash2 size={16} color="#e53e3e" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* LEAD DETAIL MODAL */}
      <AnimatePresence>
        {selectedLead && (
          <motion.div
            style={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedLead(null)}
          >
            <motion.div
              style={styles.modalContent}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={styles.modalHeader}>
                <div>
                  <span style={styles.modalRef}>REF ID: {selectedLead._id}</span>
                  <h2 style={styles.modalTitle}>
                    {selectedLead.firstName} {selectedLead.lastName}
                  </h2>
                </div>
                <button onClick={() => setSelectedLead(null)} style={styles.modalClose}>
                  <X size={24} color="#f4f1ea" />
                </button>
              </div>

              <div style={styles.modalBody}>
                <div style={styles.modalMetaGrid}>
                  <div>
                    <span style={styles.metaKey}>ORGANIZATION</span>
                    <span style={styles.metaVal}>{selectedLead.company || 'N/A'}</span>
                  </div>

                  <div>
                    <span style={styles.metaKey}>EMAIL ADDRESS</span>
                    <a href={`mailto:${selectedLead.email}`} style={styles.metaValLink}>
                      {selectedLead.email}
                    </a>
                  </div>

                  <div>
                    <span style={styles.metaKey}>MOBILE NUMBER</span>
                    <a href={`tel:${selectedLead.mobile}`} style={styles.metaValLink}>
                      {selectedLead.mobile}
                    </a>
                  </div>

                  <div>
                    <span style={styles.metaKey}>SUBMITTED DATE</span>
                    <span style={styles.metaVal}>
                      {new Date(selectedLead.createdAt).toLocaleString()}
                    </span>
                  </div>
                </div>

                <div style={styles.messageBox}>
                  <span style={styles.metaKey}>CLIENT MESSAGE & REQUIREMENTS</span>
                  <p style={styles.leadMessage}>{selectedLead.message}</p>
                </div>

                <div style={styles.modalFooterActions}>
                  <button
                    onClick={() => handleStatusChange(selectedLead._id, 'Contacted')}
                    className="btn-primary"
                    style={{ fontSize: '0.75rem', padding: '0.8rem 1.5rem' }}
                  >
                    <CheckCircle2 size={16} /> MARK AS CONTACTED
                  </button>

                  <button
                    onClick={() => handleStatusChange(selectedLead._id, 'Archived')}
                    className="btn-secondary"
                    style={{ fontSize: '0.75rem', padding: '0.8rem 1.5rem' }}
                  >
                    ARCHIVE LEAD
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const styles = {
  pageWrapper: {
    backgroundColor: '#060608',
    minHeight: '100vh',
    color: '#f4f1ea',
    padding: '3rem 0',
  },
  toast: {
    position: 'fixed',
    top: '20px',
    right: '20px',
    zIndex: 9999,
    backgroundColor: '#14141a',
    border: '1px solid #c5a880',
    padding: '0.85rem 1.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    color: '#f4f1ea',
    fontSize: '0.85rem',
    boxShadow: '0 10px 30px rgba(0,0,0,0.8)',
  },
  authContainer: {
    minHeight: '80vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
  },
  authCard: {
    maxWidth: '480px',
    width: '100%',
    backgroundColor: '#101015',
    border: '1px solid rgba(197, 168, 128, 0.3)',
    padding: '3.5rem 2.5rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    gap: '1.25rem',
  },
  lockBadge: {
    padding: '1rem',
    backgroundColor: 'rgba(197, 168, 128, 0.1)',
    borderRadius: '50%',
    border: '1px solid rgba(197, 168, 128, 0.3)',
  },
  brandTag: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: '0.75rem',
    fontWeight: 700,
    letterSpacing: '0.25em',
    color: '#c5a880',
  },
  authTitle: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: '2.4rem',
    color: '#f4f1ea',
  },
  authDesc: {
    fontSize: '0.9rem',
    color: '#9c9992',
  },
  authForm: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    marginTop: '0.5rem',
  },
  authInput: {
    width: '100%',
    padding: '0.9rem 1.25rem',
    backgroundColor: '#060608',
    border: '1px solid rgba(197, 168, 128, 0.3)',
    color: '#f4f1ea',
    fontSize: '0.9rem',
    textAlign: 'center',
    outline: 'none',
  },
  authError: {
    color: '#e53e3e',
    fontSize: '0.8rem',
  },
  quickAccessHint: {
    fontSize: '0.75rem',
    color: '#82807a',
    backgroundColor: 'rgba(255,255,255,0.04)',
    padding: '0.6rem 1rem',
    border: '1px solid rgba(255,255,255,0.08)',
  },
  returnLink: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.8rem',
    color: '#c5a880',
    marginTop: '1rem',
  },
  dashboardContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2.5rem',
  },
  dashHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flexWrap: 'wrap',
    gap: '1.5rem',
    paddingBottom: '1.5rem',
    borderBottom: '1px solid rgba(255,255,255,0.08)',
  },
  dashBrandGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.3rem',
  },
  dashBadge: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: '0.75rem',
    fontWeight: 700,
    letterSpacing: '0.25em',
    color: '#c5a880',
  },
  dashTitle: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: '2.6rem',
    color: '#f4f1ea',
  },
  dashSub: {
    fontSize: '0.85rem',
    color: '#9c9992',
  },
  dashActionGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    flexWrap: 'wrap',
  },
  btnOutline: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.75rem 1.25rem',
    backgroundColor: 'transparent',
    border: '1px solid rgba(255,255,255,0.15)',
    color: '#f4f1ea',
    fontSize: '0.75rem',
    fontWeight: 600,
    letterSpacing: '0.15em',
    cursor: 'pointer',
  },
  exportBtn: {
    padding: '0.75rem 1.5rem',
    fontSize: '0.75rem',
  },
  metricsRow: {
  },
  metricCard: {
    backgroundColor: '#101015',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    padding: '2rem 1.75rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.4rem',
  },
  metricLabel: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: '0.7rem',
    fontWeight: 700,
    letterSpacing: '0.2em',
    color: '#9c9992',
  },
  metricValue: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: '3rem',
    fontWeight: 500,
    color: '#f4f1ea',
    lineHeight: 1,
  },
  metricSub: {
    fontSize: '0.8rem',
    color: '#62605b',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '1.5rem',
    flexWrap: 'wrap',
  },
  tabsGroup: {
    display: 'flex',
    gap: '0.5rem',
    flexWrap: 'wrap',
  },
  tabBtn: {
    padding: '0.6rem 1.2rem',
    fontSize: '0.75rem',
    fontWeight: 700,
    letterSpacing: '0.15em',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    transition: 'all 0.3s ease',
  },
  badgeCount: {
    backgroundColor: '#08080a',
    color: '#c5a880',
    padding: '0.1rem 0.4rem',
    fontSize: '0.65rem',
    borderRadius: '4px',
  },
  searchBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    backgroundColor: '#101015',
    border: '1px solid rgba(197, 168, 128, 0.25)',
    padding: '0.6rem 1rem',
    minWidth: '320px',
  },
  searchInput: {
    backgroundColor: 'transparent',
    border: 'none',
    outline: 'none',
    color: '#f4f1ea',
    fontSize: '0.85rem',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    width: '100%',
  },
  clearSearchBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
  },
  tableCard: {
    backgroundColor: '#101015',
    border: '1px solid rgba(197, 168, 128, 0.2)',
    overflow: 'hidden',
  },
  loadingState: {
    padding: '5rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem',
    color: '#9c9992',
  },
  emptyState: {
    padding: '5rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    gap: '0.75rem',
  },
  emptyTitle: {
    fontFamily: "'Syne', sans-serif",
    fontSize: '1.25rem',
    color: '#f4f1ea',
    letterSpacing: '0.1em',
  },
  emptyDesc: {
    fontSize: '0.9rem',
    color: '#9c9992',
  },
  tableResponsive: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'left',
  },
  th: {
    padding: '1.2rem 1.5rem',
    backgroundColor: '#0a0a0e',
    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: '0.65rem',
    fontWeight: 700,
    letterSpacing: '0.2em',
    color: '#c5a880',
  },
  tr: {
    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
    transition: 'background-color 0.2s ease',
  },
  td: {
    padding: '1.2rem 1.5rem',
    fontSize: '0.85rem',
    verticalAlign: 'middle',
  },
  nameBlock: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.2rem',
  },
  clientName: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: '1.25rem',
    fontWeight: 500,
    color: '#f4f1ea',
  },
  refId: {
    fontSize: '0.7rem',
    color: '#62605b',
  },
  cellWithIcon: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.6rem',
    color: '#d0cdcf',
  },
  contactStack: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.3rem',
  },
  contactLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.8rem',
    color: '#9c9992',
    textDecoration: 'none',
  },
  statusSelect: {
    padding: '0.4rem 0.8rem',
    fontSize: '0.7rem',
    fontWeight: 700,
    letterSpacing: '0.15em',
    border: '1px solid',
    outline: 'none',
    cursor: 'pointer',
  },
  actionBtns: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  iconBtn: {
    padding: '0.5rem',
    backgroundColor: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.1)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalOverlay: {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0,0,0,0.85)',
    backdropFilter: 'blur(12px)',
    zIndex: 3000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
  },
  modalContent: {
    maxWidth: '640px',
    width: '100%',
    backgroundColor: '#101015',
    border: '1px solid #c5a880',
    padding: '2.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.75rem',
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  modalRef: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: '0.7rem',
    fontWeight: 700,
    letterSpacing: '0.2em',
    color: '#c5a880',
  },
  modalTitle: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: '2rem',
    color: '#f4f1ea',
    marginTop: '0.2rem',
  },
  modalClose: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
  },
  modalBody: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  modalMetaGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '1.25rem',
    padding: '1.25rem',
    backgroundColor: '#060608',
    border: '1px solid rgba(255,255,255,0.08)',
  },
  metaKey: {
    display: 'block',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: '0.65rem',
    fontWeight: 700,
    letterSpacing: '0.2em',
    color: '#c5a880',
    marginBottom: '0.25rem',
  },
  metaVal: {
    fontSize: '0.9rem',
    color: '#f4f1ea',
  },
  metaValLink: {
    fontSize: '0.9rem',
    color: '#c5a880',
  },
  messageBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  leadMessage: {
    fontSize: '0.95rem',
    color: '#d0cdcf',
    lineHeight: 1.7,
    padding: '1.25rem',
    backgroundColor: '#060608',
    border: '1px solid rgba(255,255,255,0.08)',
  },
  modalFooterActions: {
    display: 'flex',
    gap: '1rem',
    marginTop: '0.5rem',
  },
};

export default AdminDashboard;
