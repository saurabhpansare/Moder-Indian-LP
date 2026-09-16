const { validationResult } = require('express-validator');
const Enquiry = require('../models/Enquiry');
const mongoose = require('mongoose');

// In-memory store fallback if MongoDB instance is unavailable
let memoryEnquiries = [
  {
    _id: 'mem_demo_1',
    firstName: 'Rajesh',
    lastName: 'Mehta',
    email: 'rajesh@mehtacapital.com',
    mobile: '+91 98200 98200',
    company: 'Mehta Capital Advisors',
    message: 'Interested in securing a single-office floor plate on high zone level.',
    status: 'New',
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
  },
  {
    _id: 'mem_demo_2',
    firstName: 'Vikram',
    lastName: 'Singhania',
    email: 'v.singhania@apexfintech.com',
    mobile: '+91 98199 12345',
    company: 'Apex Fintech India',
    message: 'Requesting floor plans, parking ratio details, and IGBC platinum certification specifications.',
    status: 'Contacted',
    createdAt: new Date(Date.now() - 3600000 * 28).toISOString(),
  },
];

/**
 * @desc    Submit a new enquiry
 * @route   POST /api/enquiries
 * @access  Public
 */
const createEnquiry = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed. Please check your form inputs.',
        errors: errors.array().map((err) => ({
          field: err.path,
          message: err.msg,
        })),
      });
    }

    const { firstName, lastName, email, mobile, company, message } = req.body;

    const sanitizedData = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim().toLowerCase(),
      mobile: mobile.trim(),
      company: company ? company.trim() : 'N/A',
      message: message.trim(),
      status: 'New',
    };

    let savedEnquiry = null;

    if (mongoose.connection.readyState === 1) {
      const newEnquiry = new Enquiry(sanitizedData);
      savedEnquiry = await newEnquiry.save();
    } else {
      savedEnquiry = {
        _id: `mem_${Date.now()}`,
        ...sanitizedData,
        createdAt: new Date().toISOString(),
      };
      memoryEnquiries.unshift(savedEnquiry);
    }

    return res.status(201).json({
      success: true,
      message: 'Thank you. Our executive team will be in touch with you shortly.',
      data: {
        referenceId: savedEnquiry._id,
        createdAt: savedEnquiry.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all enquiries with search & filter support
 * @route   GET /api/enquiries
 * @access  Admin / Public
 */
const getEnquiries = async (req, res, next) => {
  try {
    const { status, search } = req.query;

    if (mongoose.connection.readyState === 1) {
      let query = {};

      if (status && status !== 'All') {
        query.status = status;
      }

      if (search) {
        const regex = new RegExp(search, 'i');
        query.$or = [
          { firstName: regex },
          { lastName: regex },
          { email: regex },
          { company: regex },
          { mobile: regex },
          { message: regex },
        ];
      }

      const enquiries = await Enquiry.find(query).sort({ createdAt: -1 });
      return res.status(200).json({
        success: true,
        count: enquiries.length,
        data: enquiries,
      });
    }

    // In-memory filter logic
    let filtered = [...memoryEnquiries];
    if (status && status !== 'All') {
      filtered = filtered.filter((item) => item.status === status);
    }
    if (search) {
      const s = search.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.firstName.toLowerCase().includes(s) ||
          item.lastName.toLowerCase().includes(s) ||
          item.email.toLowerCase().includes(s) ||
          item.company.toLowerCase().includes(s) ||
          item.message.toLowerCase().includes(s)
      );
    }

    return res.status(200).json({
      success: true,
      count: filtered.length,
      data: filtered,
      mode: 'in-memory',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update enquiry status
 * @route   PATCH /api/enquiries/:id/status
 * @access  Admin
 */
const updateEnquiryStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['New', 'Contacted', 'Archived'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status parameter' });
    }

    if (mongoose.connection.readyState === 1) {
      const updated = await Enquiry.findByIdAndUpdate(id, { status }, { new: true });
      if (!updated) {
        return res.status(404).json({ success: false, message: 'Enquiry not found' });
      }
      return res.status(200).json({ success: true, data: updated });
    }

    const item = memoryEnquiries.find((e) => e._id === id);
    if (item) {
      item.status = status;
      return res.status(200).json({ success: true, data: item });
    }

    return res.status(404).json({ success: false, message: 'Enquiry not found' });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete enquiry
 * @route   DELETE /api/enquiries/:id
 * @access  Admin
 */
const deleteEnquiry = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (mongoose.connection.readyState === 1) {
      const deleted = await Enquiry.findByIdAndDelete(id);
      if (!deleted) {
        return res.status(404).json({ success: false, message: 'Enquiry not found' });
      }
      return res.status(200).json({ success: true, message: 'Enquiry deleted successfully' });
    }

    memoryEnquiries = memoryEnquiries.filter((e) => e._id !== id);
    return res.status(200).json({ success: true, message: 'Enquiry deleted successfully' });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Export enquiries to CSV format
 * @route   GET /api/enquiries/export
 * @access  Admin
 */
const exportEnquiriesCSV = async (req, res, next) => {
  try {
    let enquiries = [];

    if (mongoose.connection.readyState === 1) {
      enquiries = await Enquiry.find().sort({ createdAt: -1 });
    } else {
      enquiries = memoryEnquiries;
    }

    // Generate CSV Header & Rows
    const headers = ['ID,First Name,Last Name,Email,Mobile,Company,Message,Status,Date Submitted'];
    const rows = enquiries.map((e) => {
      const msg = `"${(e.message || '').replace(/"/g, '""')}"`;
      const company = `"${(e.company || '').replace(/"/g, '""')}"`;
      const dateStr = new Date(e.createdAt).toLocaleString();
      return `${e._id},"${e.firstName}","${e.lastName}","${e.email}","${e.mobile}",${company},${msg},"${e.status}","${dateStr}"`;
    });

    const csvContent = [headers, ...rows].join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename=Modern_Suites_Leads_${Date.now()}.csv`);
    return res.status(200).send(csvContent);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createEnquiry,
  getEnquiries,
  updateEnquiryStatus,
  deleteEnquiry,
  exportEnquiriesCSV,
};
