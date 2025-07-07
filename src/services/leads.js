// @ts-nocheck
// Leads service using MutterCorpService
import { BaseService } from './services/index.js';
import { HTTP_METHODS } from './services/constants.js';
import { getAuthToken } from './api.js';

/**
 * Service para gerenciar leads usando MutterCorpService
 */
class LeadsService extends BaseService {
  constructor(config = {}) {
    const authConfig = {
      ...config,
      getCookieCorp: () => Promise.resolve(getAuthToken() || ''),
      getSessionMutterCorp: () => Promise.resolve(getAuthToken() || '')
    };
    super(authConfig);
  }

  /**
   * Creates a new lead
   * @param {Object} leadData - Lead information
   * @returns {Promise<Object>} Created lead
   */
  async createLead(leadData) {
    this.validateRequiredParams({ leadData }, ['leadData']);

    return this.makeServiceRequest('/leads', {
      method: HTTP_METHODS.POST,
      body: leadData
    });
  }

  /**
   * Fetches all leads with optional filtering
   * @param {Object} filters - Filter parameters
   * @returns {Promise<Array>} Array of leads
   */
  async fetchLeads(filters = {}) {
    const sanitizedFilters = this.sanitizeParams(filters);
    // @ts-ignore
    const queryString = new URLSearchParams(sanitizedFilters).toString();
    const endpoint = `/leads${queryString ? `?${queryString}` : ''}`;
    // @ts-ignore
    return this.makeServiceRequest(endpoint);
  }

  /**
   * Fetches a specific lead by ID
   * @param {string} leadId - Lead ID
   * @returns {Promise<Object>} Lead details
   */
  async fetchLeadById(leadId) {
    this.validateRequiredParams({ leadId }, ['leadId']);
    return this.makeServiceRequest(`/leads/${leadId}`);
  }

  /**
   * Updates an existing lead
   * @param {string} leadId - Lead ID
   * @param {Object} leadData - Updated lead data
   * @returns {Promise<Object>} Updated lead
   */
  async updateLead(leadId, leadData) {
    this.validateRequiredParams({ leadId, leadData }, ['leadId', 'leadData']);

    return this.makeServiceRequest(`/leads/${leadId}`, {
      method: HTTP_METHODS.PUT,
      body: leadData
    });
  }

  /**
   * Deletes a lead
   * @param {string} leadId - Lead ID
   * @returns {Promise<Object>} API response
   */
  async deleteLead(leadId) {
    this.validateRequiredParams({ leadId }, ['leadId']);

    return this.makeServiceRequest(`/leads/${leadId}`, {
      method: HTTP_METHODS.DELETE
    });
  }

  /**
   * Updates lead status
   * @param {string} leadId - Lead ID
   * @param {string} status - New status
   * @returns {Promise<Object>} Updated lead
   */
  async updateLeadStatus(leadId, status) {
    this.validateRequiredParams({ leadId, status }, ['leadId', 'status']);

    return this.makeServiceRequest(`/leads/${leadId}/status`, {
      method: HTTP_METHODS.PATCH,
      body: { status }
    });
  }

  /**
   * Assigns a lead to a user
   * @param {string} leadId - Lead ID
   * @param {string} userId - User ID to assign to
   * @returns {Promise<Object>} Updated lead
   */
  async assignLead(leadId, userId) {
    this.validateRequiredParams({ leadId, userId }, ['leadId', 'userId']);

    return this.makeServiceRequest(`/leads/${leadId}/assign`, {
      method: HTTP_METHODS.PATCH,
      body: { userId }
    });
  }

  /**
   * Adds a note to a lead
   * @param {string} leadId - Lead ID
   * @param {string} note - Note content
   * @returns {Promise<Object>} Updated lead
   */
  async addLeadNote(leadId, note) {
    this.validateRequiredParams({ leadId, note }, ['leadId', 'note']);

    return this.makeServiceRequest(`/leads/${leadId}/notes`, {
      method: HTTP_METHODS.POST,
      body: { note }
    });
  }

  /**
   * Fetches lead statistics
   * @param {Object} filters - Filter parameters for statistics
   * @returns {Promise<Object>} Lead statistics
   */
  async fetchLeadStats(filters = {}) {
    const sanitizedFilters = this.sanitizeParams(filters);
    const queryString = new URLSearchParams(sanitizedFilters).toString();
    const endpoint = `/leads/stats${queryString ? `?${queryString}` : ''}`;
    return this.makeServiceRequest(endpoint);
  }

  /**
   * Converts a lead to a customer
   * @param {string} leadId - Lead ID
   * @param {Object} customerData - Customer conversion data
   * @returns {Promise<Object>} Conversion result
   */
  async convertLeadToCustomer(leadId, customerData = {}) {
    this.validateRequiredParams({ leadId }, ['leadId']);

    return this.makeServiceRequest(`/leads/${leadId}/convert`, {
      method: HTTP_METHODS.POST,
      body: customerData
    });
  }

  /**
   * Bulk updates multiple leads
   * @param {Array} leadIds - Array of lead IDs
   * @param {Object} updateData - Data to update
   * @returns {Promise<Object>} Bulk update result
   */
  async bulkUpdateLeads(leadIds, updateData) {
    this.validateRequiredParams({ leadIds, updateData }, ['leadIds', 'updateData']);

    return this.makeServiceRequest('/leads/bulk-update', {
      method: HTTP_METHODS.PATCH,
      body: { leadIds, updateData }
    });
  }
}

// Instância singleton do LeadsService
let leadsServiceInstance = null;

/**
 * Cria ou retorna a instância singleton do LeadsService
 * @param {Object} config - Configurações do service
 * @returns {LeadsService} Instância do LeadsService
 */
export function getLeadsService(config = {}) {
  if (!leadsServiceInstance) {
    leadsServiceInstance = new LeadsService(config);
  }
  return leadsServiceInstance;
}

// Exporta funções de conveniência para compatibilidade
const leadsService = getLeadsService();

export const createLead = (leadData) => leadsService.createLead(leadData);
export const fetchLeads = (filters) => leadsService.fetchLeads(filters);
export const fetchLeadById = (leadId) => leadsService.fetchLeadById(leadId);
export const updateLead = (leadId, leadData) => leadsService.updateLead(leadId, leadData);
export const deleteLead = (leadId) => leadsService.deleteLead(leadId);
export const updateLeadStatus = (leadId, status) => leadsService.updateLeadStatus(leadId, status);
export const assignLead = (leadId, userId) => leadsService.assignLead(leadId, userId);
export const addLeadNote = (leadId, note) => leadsService.addLeadNote(leadId, note);
export const fetchLeadStats = (filters) => leadsService.fetchLeadStats(filters);
export const convertLeadToCustomer = (leadId, customerData) => leadsService.convertLeadToCustomer(leadId, customerData);
export const bulkUpdateLeads = (leadIds, updateData) => leadsService.bulkUpdateLeads(leadIds, updateData);

// Exporta a classe para uso direto se necessário
export { LeadsService };
