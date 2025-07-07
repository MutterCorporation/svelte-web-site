// @ts-nocheck
// Blog service using MutterCorpService
import { BaseService } from './services/index.js';
import { HTTP_METHODS } from './services/constants.js';
import { getAuthToken } from './api.js';

/**
 * Service para gerenciar blog usando MutterCorpService
 */
class BlogService extends BaseService {
  constructor(config = {}) {
    const authConfig = {
      ...config,
      getCookieCorp: () => Promise.resolve(getAuthToken() || ''),
      getSessionMutterCorp: () => Promise.resolve(getAuthToken() || '')
    };
    super(authConfig);

    // Tenant code padrão para o blog
    this.defaultTenantCode = config.tenantCode || 'muttercorp';
  }

  /**
   * Builds blog endpoint with tenant code
   * @param {string} endpoint - The endpoint path
   * @param {string} tenantCode - Tenant code (defaults to muttercorp)
   * @returns {string} Full endpoint path with tenant
   */
  buildBlogEndpoint(endpoint, tenantCode = this.defaultTenantCode) {
    // Remove leading slash if present
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
    return `/blog/${tenantCode}/${cleanEndpoint}`;
  }

  /**
   * Fetches Google Trends data
   * @returns {Promise<Array>} Array of trending search queries
   */
  async fetchGoogleTrends() {
    try {
      // Esta é uma API externa, não usamos o MutterCorpService
      const res = await fetch('https://dev.muttercorp.com/trends/api/dailytrends?hl=pt-BR&tz=-180&geo=BR&ns=15');
      let text = await res.text();
      text = text.replace(")]}',", '');
      const data = JSON.parse(text);
      return data.default.trendingSearchesDays[0].trendingSearches.map(item => item.title.query);
    } catch (error) {
      console.error('Error fetching Google Trends:', error);
      throw new Error('Failed to fetch Google Trends');
    }
  }

  /**
   * Converts markdown text to HTML using GitHub API
   * @param {string} markdown - Markdown text to convert
   * @returns {Promise<string>} HTML content
   */
  async convertMarkdownToHtml(markdown) {
    this.validateRequiredParams({ markdown }, ['markdown']);

    try {
      // Esta é uma API externa, não usamos o MutterCorpService
      const response = await fetch('https://api.github.com/markdown', {
        method: HTTP_METHODS.POST,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: markdown, mode: 'gfm' })
      });

      if (!response.ok) {
        throw new Error('Failed to convert markdown');
      }

      return await response.text();
    } catch (error) {
      console.error('Error converting markdown:', error);
      throw new Error('Failed to convert markdown to HTML');
    }
  }

  /**
   * Submits a blog post
   * @param {FormData} formData - Blog post form data
   * @param {string} tenantCode - Tenant code (defaults to muttercorp)
   * @returns {Promise<Object>} API response
   */
  async submitBlogPost(formData, tenantCode = this.defaultTenantCode) {
    this.validateRequiredParams({ formData }, ['formData']);

    try {
      // Para FormData, fazemos requisição direta pois não podemos usar JSON
      const endpoint = this.buildBlogEndpoint('', tenantCode);
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: HTTP_METHODS.POST,
        headers: {
          'Authorization': `Bearer ${getAuthToken()}`
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to submit blog post');
      }

      return await response.json();
    } catch (error) {
      console.error('Error submitting blog post:', error);
      throw new Error('Failed to submit blog post');
    }
  }

  /**
   * Submits a tweet post
   * @param {string} tweetText - Tweet content
   * @param {Object} options - Additional options for the tweet
   * @param {string} tenantCode - Tenant code (defaults to muttercorp)
   * @returns {Promise<Object>} API response
   */
  async submitTweetPost(tweetText, options = {}, tenantCode = this.defaultTenantCode) {
    this.validateRequiredParams({ tweetText }, ['tweetText']);

    const payload = {
      text: tweetText,
      options: {
        cmd: "string",
        only_save: true,
        ia: true,
        ...options
      }
    };

    const endpoint = this.buildBlogEndpoint('twitter', tenantCode);
    return this.makeServiceRequest(endpoint, {
      method: HTTP_METHODS.POST,
      body: payload,
      headers: {
        'accept': '*/*'
      }
    });
  }

  /**
   * Fetches a blog post by slug
   * @param {string} slug - Blog post slug
   * @param {string} tenantCode - Tenant code (defaults to muttercorp)
   * @returns {Promise<Object>} Blog post data
   */
  async fetchPostData(slug, tenantCode = this.defaultTenantCode) {
    this.validateRequiredParams({ slug }, ['slug']);
    const endpoint = this.buildBlogEndpoint(slug, tenantCode);
    return this.makeServiceRequest(endpoint);
  }

  /**
   * Fetches all blog posts
   * @param {Object} params - Query parameters (page, limit, etc.)
   * @param {string} tenantCode - Tenant code (defaults to muttercorp)
   * @returns {Promise<Object>} Blog posts data
   */
  async fetchBlogPosts(params = {}, tenantCode = this.defaultTenantCode) {
    const sanitizedParams = this.sanitizeParams(params);
    const queryString = new URLSearchParams(sanitizedParams).toString();
    const endpoint = this.buildBlogEndpoint('', tenantCode);
    const fullEndpoint = `${endpoint}${queryString ? `?${queryString}` : ''}`;
    return this.makeServiceRequest(fullEndpoint);
  }

  /**
   * Deletes a blog post
   * @param {string} postId - Blog post ID
   * @param {string} tenantCode - Tenant code (defaults to muttercorp)
   * @returns {Promise<Object>} API response
   */
  async deleteBlogPost(postId, tenantCode = this.defaultTenantCode) {
    this.validateRequiredParams({ postId }, ['postId']);
    const endpoint = this.buildBlogEndpoint(postId, tenantCode);
    return this.makeServiceRequest(endpoint, {
      method: HTTP_METHODS.DELETE
    });
  }

  /**
   * Updates a blog post
   * @param {string} postId - Blog post ID
   * @param {FormData} formData - Updated blog post data
   * @param {string} tenantCode - Tenant code (defaults to muttercorp)
   * @returns {Promise<Object>} API response
   */
  async updateBlogPost(postId, formData, tenantCode = this.defaultTenantCode) {
    this.validateRequiredParams({ postId, formData }, ['postId', 'formData']);

    try {
      // Para FormData, fazemos requisição direta pois não podemos usar JSON
      const endpoint = this.buildBlogEndpoint(postId, tenantCode);
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: HTTP_METHODS.PUT,
        headers: {
          'Authorization': `Bearer ${getAuthToken()}`
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to update blog post');
      }

      return await response.json();
    } catch (error) {
      console.error('Error updating blog post:', error);
      throw new Error('Failed to update blog post');
    }
  }
}

// Instância singleton do BlogService
let blogServiceInstance = null;

/**
 * Cria ou retorna a instância singleton do BlogService
 * @param {Object} config - Configurações do service
 * @returns {BlogService} Instância do BlogService
 */
export function getBlogService(config = {}) {
  if (!blogServiceInstance) {
    blogServiceInstance = new BlogService(config);
  }
  return blogServiceInstance;
}

// Exporta funções de conveniência para compatibilidade
const blogService = getBlogService();

export const fetchGoogleTrends = () => blogService.fetchGoogleTrends();
export const convertMarkdownToHtml = (markdown) => blogService.convertMarkdownToHtml(markdown);
export const submitBlogPost = (formData) => blogService.submitBlogPost(formData);
export const submitTweetPost = (tweetText, options) => blogService.submitTweetPost(tweetText, options);
export const fetchPostData = (slug) => blogService.fetchPostData(slug);
export const fetchBlogPosts = (params) => blogService.fetchBlogPosts(params);
export const deleteBlogPost = (postId) => blogService.deleteBlogPost(postId);
export const updateBlogPost = (postId, formData) => blogService.updateBlogPost(postId, formData);

// Exporta a classe para uso direto se necessário
export { BlogService };
