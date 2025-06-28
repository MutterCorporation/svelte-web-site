// Leads service
import { getAuthHeaders } from './api.js';

const LEADS_BASE_URL = 'https://dev.muttercorp.com.br';

/**
 * Creates a new lead
 * @param {Object} leadData - Lead information
 * @returns {Promise<Object>} Created lead
 */
export async function createLead(leadData) {
  try {
    const response = await fetch(`${LEADS_BASE_URL}/leads`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(leadData)
    });
    
    if (!response.ok) {
      throw new Error('Failed to create lead');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error creating lead:', error);
    throw new Error('Failed to create lead');
  }
}

/**
 * Fetches all leads with optional filtering
 * @param {Object} filters - Filter parameters
 * @returns {Promise<Array>} Array of leads
 */
export async function fetchLeads(filters = {}) {
  try {
    const queryString = new URLSearchParams(filters).toString();
    const url = `${LEADS_BASE_URL}/leads${queryString ? `?${queryString}` : ''}`;
    
    const response = await fetch(url, {
      headers: getAuthHeaders()
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch leads');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching leads:', error);
    throw new Error('Failed to fetch leads');
  }
}

/**
 * Fetches a specific lead by ID
 * @param {string} leadId - Lead ID
 * @returns {Promise<Object>} Lead details
 */
export async function fetchLeadById(leadId) {
  try {
    const response = await fetch(`${LEADS_BASE_URL}/leads/${leadId}`, {
      headers: getAuthHeaders()
    });
    
    if (!response.ok) {
      throw new Error('Lead not found');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching lead:', error);
    throw new Error('Failed to fetch lead');
  }
}

/**
 * Updates an existing lead
 * @param {string} leadId - Lead ID
 * @param {Object} leadData - Updated lead data
 * @returns {Promise<Object>} Updated lead
 */
export async function updateLead(leadId, leadData) {
  try {
    const response = await fetch(`${LEADS_BASE_URL}/leads/${leadId}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(leadData)
    });
    
    if (!response.ok) {
      throw new Error('Failed to update lead');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error updating lead:', error);
    throw new Error('Failed to update lead');
  }
}

/**
 * Deletes a lead
 * @param {string} leadId - Lead ID
 * @returns {Promise<Object>} API response
 */
export async function deleteLead(leadId) {
  try {
    const response = await fetch(`${LEADS_BASE_URL}/leads/${leadId}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete lead');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error deleting lead:', error);
    throw new Error('Failed to delete lead');
  }
}

/**
 * Updates lead status
 * @param {string} leadId - Lead ID
 * @param {string} status - New status
 * @returns {Promise<Object>} Updated lead
 */
export async function updateLeadStatus(leadId, status) {
  try {
    const response = await fetch(`${LEADS_BASE_URL}/leads/${leadId}/status`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify({ status })
    });
    
    if (!response.ok) {
      throw new Error('Failed to update lead status');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error updating lead status:', error);
    throw new Error('Failed to update lead status');
  }
}

/**
 * Assigns a lead to a user
 * @param {string} leadId - Lead ID
 * @param {string} userId - User ID to assign to
 * @returns {Promise<Object>} Updated lead
 */
export async function assignLead(leadId, userId) {
  try {
    const response = await fetch(`${LEADS_BASE_URL}/leads/${leadId}/assign`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify({ userId })
    });
    
    if (!response.ok) {
      throw new Error('Failed to assign lead');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error assigning lead:', error);
    throw new Error('Failed to assign lead');
  }
}

/**
 * Adds a note to a lead
 * @param {string} leadId - Lead ID
 * @param {string} note - Note content
 * @returns {Promise<Object>} Updated lead
 */
export async function addLeadNote(leadId, note) {
  try {
    const response = await fetch(`${LEADS_BASE_URL}/leads/${leadId}/notes`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ note })
    });
    
    if (!response.ok) {
      throw new Error('Failed to add note');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error adding lead note:', error);
    throw new Error('Failed to add note');
  }
}

/**
 * Fetches lead statistics
 * @param {Object} filters - Filter parameters for statistics
 * @returns {Promise<Object>} Lead statistics
 */
export async function fetchLeadStats(filters = {}) {
  try {
    const queryString = new URLSearchParams(filters).toString();
    const url = `${LEADS_BASE_URL}/leads/stats${queryString ? `?${queryString}` : ''}`;
    
    const response = await fetch(url, {
      headers: getAuthHeaders()
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch lead statistics');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching lead stats:', error);
    throw new Error('Failed to fetch lead statistics');
  }
}

/**
 * Converts a lead to a customer
 * @param {string} leadId - Lead ID
 * @param {Object} customerData - Customer conversion data
 * @returns {Promise<Object>} Conversion result
 */
export async function convertLeadToCustomer(leadId, customerData = {}) {
  try {
    const response = await fetch(`${LEADS_BASE_URL}/leads/${leadId}/convert`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(customerData)
    });
    
    if (!response.ok) {
      throw new Error('Failed to convert lead');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error converting lead:', error);
    throw new Error('Failed to convert lead to customer');
  }
}

/**
 * Bulk updates multiple leads
 * @param {Array} leadIds - Array of lead IDs
 * @param {Object} updateData - Data to update
 * @returns {Promise<Object>} Bulk update result
 */
export async function bulkUpdateLeads(leadIds, updateData) {
  try {
    const response = await fetch(`${LEADS_BASE_URL}/leads/bulk-update`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify({ leadIds, updateData })
    });
    
    if (!response.ok) {
      throw new Error('Failed to bulk update leads');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error bulk updating leads:', error);
    throw new Error('Failed to bulk update leads');
  }
}
