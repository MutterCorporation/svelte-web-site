// @ts-nocheck
// Projects service using MutterCorpService
import { BaseService } from './services/index.js';
import { HTTP_METHODS, PAGINATION_DEFAULTS } from './services/constants.js';
import { getAuthToken } from './api.js';

/**
 * Service para gerenciar projetos usando MutterCorpService
 */
class ProjectsService extends BaseService {
  constructor(config = {}) {
    const authConfig = {
      ...config,
      getCookieCorp: () => Promise.resolve(getAuthToken() || ''),
      getSessionMutterCorp: () => Promise.resolve(getAuthToken() || '')
    };
    super(authConfig);
  }

  /**
   * Fetches the total count of projects
   * @returns {Promise<number>} Total number of projects
   */
  async fetchProjectCount() {
    const result = await this.makeServiceRequest('/projects/count');
    // @ts-ignore
    return result.count || 0;
  }

  /**
   * Fetches projects with pagination
   * @param {number} page - Page number (default: 1)
   * @param {number} pageSize - Number of items per page (default: 10)
   * @returns {Promise<Object>} Projects data with pagination info
   */
  async fetchProjects(page = PAGINATION_DEFAULTS.PAGE, pageSize = PAGINATION_DEFAULTS.PAGE_SIZE) {
    const params = this.sanitizeParams({ page, pageSize });
    // @ts-ignore
    const queryString = new URLSearchParams(params).toString();
    return this.makeServiceRequest(`/projects?${queryString}`);
  }

  /**
   * Fetches detailed information about a specific project
   * @param {string} projectId - Project ID
   * @returns {Promise<Object>} Project details
   */
  async fetchProjectDetails(projectId) {
    this.validateRequiredParams({ projectId }, ['projectId']);
    return this.makeServiceRequest(`/projects/${projectId}`);
  }

  /**
   * Submits a new proposal for a project
   * @param {Object} proposal - Proposal data
   * @returns {Promise<Object>} API response
   */
  async submitProposal(proposal) {
    this.validateRequiredParams({ proposal }, ['proposal']);

    return this.makeServiceRequest('/proposals', {
      method: HTTP_METHODS.POST,
      body: proposal
    });
  }

  /**
   * Creates a new project
   * @param {Object} projectData - Project data
   * @returns {Promise<Object>} Created project
   */
  async createProject(projectData) {
    this.validateRequiredParams({ projectData }, ['projectData']);

    return this.makeServiceRequest('/projects', {
      method: HTTP_METHODS.POST,
      body: projectData
    });
  }

  /**
   * Updates an existing project
   * @param {string} projectId - Project ID
   * @param {Object} projectData - Updated project data
   * @returns {Promise<Object>} Updated project
   */
  async updateProject(projectId, projectData) {
    this.validateRequiredParams({ projectId, projectData }, ['projectId', 'projectData']);

    return this.makeServiceRequest(`/projects/${projectId}`, {
      method: HTTP_METHODS.PUT,
      body: projectData
    });
  }

  /**
   * Deletes a project
   * @param {string} projectId - Project ID
   * @returns {Promise<Object>} API response
   */
  async deleteProject(projectId) {
    this.validateRequiredParams({ projectId }, ['projectId']);

    return this.makeServiceRequest(`/projects/${projectId}`, {
      method: HTTP_METHODS.DELETE
    });
  }

  /**
   * Fetches proposals for a specific project
   * @param {string} projectId - Project ID
   * @returns {Promise<Array>} Array of proposals
   */
  async fetchProjectProposals(projectId) {
    this.validateRequiredParams({ projectId }, ['projectId']);
    return this.makeServiceRequest(`/projects/${projectId}/proposals`);
  }

  /**
   * Updates a proposal
   * @param {string} proposalId - Proposal ID
   * @param {Object} proposalData - Updated proposal data
   * @returns {Promise<Object>} Updated proposal
   */
  async updateProposal(proposalId, proposalData) {
    this.validateRequiredParams({ proposalId, proposalData }, ['proposalId', 'proposalData']);

    return this.makeServiceRequest(`/proposals/${proposalId}`, {
      method: HTTP_METHODS.PUT,
      body: proposalData
    });
  }

  /**
   * Deletes a proposal
   * @param {string} proposalId - Proposal ID
   * @returns {Promise<Object>} API response
   */
  async deleteProposal(proposalId) {
    this.validateRequiredParams({ proposalId }, ['proposalId']);

    return this.makeServiceRequest(`/proposals/${proposalId}`, {
      method: HTTP_METHODS.DELETE
    });
  }
}

// Instância singleton do ProjectsService
let projectsServiceInstance = null;

/**
 * Cria ou retorna a instância singleton do ProjectsService
 * @param {Object} config - Configurações do service
 * @returns {ProjectsService} Instância do ProjectsService
 */
export function getProjectsService(config = {}) {
  if (!projectsServiceInstance) {
    projectsServiceInstance = new ProjectsService(config);
  }
  return projectsServiceInstance;
}

// Exporta funções de conveniência para compatibilidade
const projectsService = getProjectsService();

export const fetchProjectCount = () => projectsService.fetchProjectCount();
export const fetchProjects = (page, pageSize) => projectsService.fetchProjects(page, pageSize);
export const fetchProjectDetails = (projectId) => projectsService.fetchProjectDetails(projectId);
export const submitProposal = (proposal) => projectsService.submitProposal(proposal);
export const createProject = (projectData) => projectsService.createProject(projectData);
export const updateProject = (projectId, projectData) => projectsService.updateProject(projectId, projectData);
export const deleteProject = (projectId) => projectsService.deleteProject(projectId);
export const fetchProjectProposals = (projectId) => projectsService.fetchProjectProposals(projectId);
export const updateProposal = (proposalId, proposalData) => projectsService.updateProposal(proposalId, proposalData);
export const deleteProposal = (proposalId) => projectsService.deleteProposal(proposalId);

// Exporta a classe para uso direto se necessário
export { ProjectsService };
