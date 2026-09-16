const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

/**
 * Submit enquiry form data to Express backend
 * @param {Object} formData 
 * @returns {Promise<Object>} API response payload
 */
export const submitEnquiry = async (formData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/enquiries`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMsg = data.message || (data.errors && data.errors[0]?.message) || 'Failed to submit enquiry.';
      throw new Error(errorMsg);
    }

    return data;
  } catch (error) {
    console.error('[API Submit Error]:', error);
    throw error;
  }
};

/**
 * Fetch all enquiries with optional search & status filter
 * @param {string} status 
 * @param {string} search 
 * @returns {Promise<Object>}
 */
export const fetchEnquiries = async (status = 'All', search = '') => {
  try {
    const query = new URLSearchParams();
    if (status && status !== 'All') query.append('status', status);
    if (search) query.append('search', search);

    const response = await fetch(`${API_BASE_URL}/enquiries?${query.toString()}`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch enquiries.');
    }

    return data;
  } catch (error) {
    console.error('[API Fetch Error]:', error);
    throw error;
  }
};

/**
 * Update enquiry status (New, Contacted, Archived)
 * @param {string} id 
 * @param {string} status 
 * @returns {Promise<Object>}
 */
export const updateEnquiryStatus = async (id, status) => {
  try {
    const response = await fetch(`${API_BASE_URL}/enquiries/${id}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to update enquiry status.');
    }

    return data;
  } catch (error) {
    console.error('[API Status Update Error]:', error);
    throw error;
  }
};

/**
 * Delete enquiry by ID
 * @param {string} id 
 * @returns {Promise<Object>}
 */
export const deleteEnquiry = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/enquiries/${id}`, {
      method: 'DELETE',
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to delete enquiry.');
    }

    return data;
  } catch (error) {
    console.error('[API Delete Error]:', error);
    throw error;
  }
};

/**
 * Download exported enquiries CSV file directly
 */
export const downloadEnquiriesCSV = () => {
  window.open(`${API_BASE_URL}/enquiries/export`, '_blank');
};

/**
 * Check backend health status
 * @returns {Promise<boolean>}
 */
export const checkApiHealth = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/health`);
    const data = await res.json();
    return data.status === 'online';
  } catch (e) {
    return false;
  }
};
