// Main services index - Centralized export for all services
// This file provides a single entry point for all services in the application

// Core service infrastructure
export { MutterCorpService } from './services/MutterCorpService.js';
export { BaseService } from './services/index.js';
export * from './services/constants.js';

// Authentication service
export {
  AuthService,
  getAuthService,
  login,
  logout,
  // @ts-ignore
  register,
  // @ts-ignore
  getCurrentUser,
  // @ts-ignore
  updateProfile,
  // @ts-ignore
  changePassword,
  // @ts-ignore
  resetPassword,
  // @ts-ignore
  verifyEmail,
  // @ts-ignore
  refreshToken,
  // @ts-ignore
  checkAuthStatus
} from './auth.js';

// Blog service
export {
  BlogService,
  getBlogService,
  fetchGoogleTrends,
  convertMarkdownToHtml,
  submitBlogPost,
  submitTweetPost,
  fetchPostData,
  fetchBlogPosts,
  deleteBlogPost,
  updateBlogPost
} from './blog.js';

// Blog interactions service
export {
  BlogInteractionsService,
  getBlogInteractionsService,
  incrementPostView,
  getPostViews,
  getPostComments,
  addPostComment,
  deletePostComment
} from './blog-interactions.js';

// Projects service
export {
  ProjectsService,
  getProjectsService,
  fetchProjectCount,
  fetchProjects,
  fetchProjectDetails,
  submitProposal,
  createProject,
  updateProject,
  deleteProject,
  fetchProjectProposals,
  updateProposal,
  deleteProposal
} from './projects.js';

// Leads service
export {
  LeadsService,
  getLeadsService,
  createLead,
  fetchLeads,
  fetchLeadById,
  updateLead,
  deleteLead,
  updateLeadStatus,
  assignLead,
  addLeadNote,
  fetchLeadStats,
  convertLeadToCustomer,
  bulkUpdateLeads
} from './leads.js';


// Legacy API utilities (for backward compatibility)
export {
  apiRequest,
  // @ts-ignore
  getAuthHeaders,
  getAuthToken,
  setAuthToken,
  // @ts-ignore
  clearAuthToken
} from './api.js';

/**
 * Service factory functions for easy instantiation
 */
export const Services = {
  // Get service instances with optional configuration
  // @ts-ignore
  auth: (config) => getAuthService(config),
  // @ts-ignore
  blog: (config) => getBlogService(config),
  // @ts-ignore
  blogInteractions: (config) => getBlogInteractionsService(config),
  // @ts-ignore
  projects: (config) => getProjectsService(config),
  // @ts-ignore
  leads: (config) => getLeadsService(config),
  // @ts-ignore
  finance: (config) => getFinanceService(config),
  
  // Get all services at once
  all: (config = {}) => ({
    // @ts-ignore
    auth: getAuthService(config),
    // @ts-ignore
    blog: getBlogService(config),
    // @ts-ignore
    blogInteractions: getBlogInteractionsService(config),
    // @ts-ignore
    projects: getProjectsService(config),
    // @ts-ignore
    leads: getLeadsService(config),
    // @ts-ignore
    finance: getFinanceService(config)
  })
};

/**
 * Default service instances (singletons)
 */
export const DefaultServices = Services.all();

// Export default for convenience
export default Services;
