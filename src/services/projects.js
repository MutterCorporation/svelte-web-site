// Projects service
import { apiRequest, getAuthHeaders } from './api.js';

// Base URL for projects API - extracted from the proposta page
const PROJECTS_BASE_URL = 'https://dev.muttercorp.com.br';

/**
 * Fetches the total count of projects
 * @returns {Promise<number>} Total number of projects
 */
export async function fetchProjectCount() {
  try {
    const response = await fetch(`${PROJECTS_BASE_URL}/projects/count`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch project count');
    }
    
    const data = await response.json();
    return data.count || 0;
  } catch (error) {
    console.error('Error fetching project count:', error);
    throw new Error('Failed to fetch project count');
  }
}

/**
 * Fetches projects with pagination
 * @param {number} page - Page number (default: 1)
 * @param {number} pageSize - Number of items per page (default: 10)
 * @returns {Promise<Object>} Projects data with pagination info
 */
export async function fetchProjects(page = 1, pageSize = 10) {
  try {
    const response = await fetch(`${PROJECTS_BASE_URL}/projects?page=${page}&pageSize=${pageSize}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch projects');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw new Error('Failed to fetch projects');
  }
}

/**
 * Fetches detailed information about a specific project
 * @param {string} projectId - Project ID
 * @returns {Promise<Object>} Project details
 */
export async function fetchProjectDetails(projectId) {
  try {
    const response = await fetch(`${PROJECTS_BASE_URL}/projects/${projectId}`);
    
    if (!response.ok) {
      throw new Error('Project not found');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching project details:', error);
    throw new Error('Failed to fetch project details');
  }
}

/**
 * Submits a new proposal for a project
 * @param {Object} proposal - Proposal data
 * @returns {Promise<Object>} API response
 */
export async function submitProposal(proposal) {
  try {
    const response = await fetch(`${PROJECTS_BASE_URL}/proposals`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(proposal)
    });
    
    if (!response.ok) {
      throw new Error('Failed to submit proposal');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error submitting proposal:', error);
    throw new Error('Failed to submit proposal');
  }
}

/**
 * Creates a new project
 * @param {Object} projectData - Project data
 * @returns {Promise<Object>} Created project
 */
export async function createProject(projectData) {
  try {
    const response = await fetch(`${PROJECTS_BASE_URL}/projects`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(projectData)
    });
    
    if (!response.ok) {
      throw new Error('Failed to create project');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error creating project:', error);
    throw new Error('Failed to create project');
  }
}

/**
 * Updates an existing project
 * @param {string} projectId - Project ID
 * @param {Object} projectData - Updated project data
 * @returns {Promise<Object>} Updated project
 */
export async function updateProject(projectId, projectData) {
  try {
    const response = await fetch(`${PROJECTS_BASE_URL}/projects/${projectId}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(projectData)
    });
    
    if (!response.ok) {
      throw new Error('Failed to update project');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error updating project:', error);
    throw new Error('Failed to update project');
  }
}

/**
 * Deletes a project
 * @param {string} projectId - Project ID
 * @returns {Promise<Object>} API response
 */
export async function deleteProject(projectId) {
  try {
    const response = await fetch(`${PROJECTS_BASE_URL}/projects/${projectId}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete project');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error deleting project:', error);
    throw new Error('Failed to delete project');
  }
}

/**
 * Fetches proposals for a specific project
 * @param {string} projectId - Project ID
 * @returns {Promise<Array>} Array of proposals
 */
export async function fetchProjectProposals(projectId) {
  try {
    const response = await fetch(`${PROJECTS_BASE_URL}/projects/${projectId}/proposals`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch project proposals');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching project proposals:', error);
    throw new Error('Failed to fetch project proposals');
  }
}

/**
 * Updates a proposal
 * @param {string} proposalId - Proposal ID
 * @param {Object} proposalData - Updated proposal data
 * @returns {Promise<Object>} Updated proposal
 */
export async function updateProposal(proposalId, proposalData) {
  try {
    const response = await fetch(`${PROJECTS_BASE_URL}/proposals/${proposalId}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(proposalData)
    });
    
    if (!response.ok) {
      throw new Error('Failed to update proposal');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error updating proposal:', error);
    throw new Error('Failed to update proposal');
  }
}

/**
 * Deletes a proposal
 * @param {string} proposalId - Proposal ID
 * @returns {Promise<Object>} API response
 */
export async function deleteProposal(proposalId) {
  try {
    const response = await fetch(`${PROJECTS_BASE_URL}/proposals/${proposalId}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete proposal');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error deleting proposal:', error);
    throw new Error('Failed to delete proposal');
  }
}
