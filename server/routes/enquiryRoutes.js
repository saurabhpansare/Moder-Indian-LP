const express = require('express');
const { body } = require('express-validator');
const {
  createEnquiry,
  getEnquiries,
  updateEnquiryStatus,
  deleteEnquiry,
  exportEnquiriesCSV,
} = require('../controllers/enquiryController');

const router = express.Router();

// Validation chain for POST /api/enquiries
const validateEnquiry = [
  body('firstName')
    .trim()
    .notEmpty()
    .withMessage('First name is required')
    .isLength({ max: 50 })
    .withMessage('First name cannot exceed 50 characters'),
  body('lastName')
    .trim()
    .notEmpty()
    .withMessage('Last name is required')
    .isLength({ max: 50 })
    .withMessage('Last name cannot exceed 50 characters'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email address is required')
    .isEmail()
    .withMessage('Please enter a valid email address'),
  body('mobile')
    .trim()
    .notEmpty()
    .withMessage('Mobile number is required')
    .matches(/^[\d\s+\-()]{7,15}$/)
    .withMessage('Please enter a valid phone number'),
  body('company').optional().trim(),
  body('message')
    .trim()
    .notEmpty()
    .withMessage('Message is required')
    .isLength({ max: 1000 })
    .withMessage('Message cannot exceed 1000 characters'),
];

// Public Endpoints
router.post('/enquiries', validateEnquiry, createEnquiry);

// Admin Endpoints - Export must come before generic list endpoint
router.get('/enquiries/export', exportEnquiriesCSV);
router.get('/enquiries', getEnquiries);
router.patch('/enquiries/:id/status', updateEnquiryStatus);
router.delete('/enquiries/:id', deleteEnquiry);

module.exports = router;
