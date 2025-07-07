// @ts-nocheck
// Serviço para gerenciar interações do blog (comentários e visualizações) usando MutterCorpService
import { BaseService } from './services/index.js';
import { HTTP_METHODS } from './services/constants.js';
import { getAuthToken } from './api.js';

/**
 * Service para gerenciar interações do blog usando MutterCorpService
 */
class BlogInteractionsService extends BaseService {
  constructor(config = {}) {
    const authConfig = {
      ...config,
      getCookieCorp: () => Promise.resolve(getAuthToken() || ''),
      getSessionMutterCorp: () => Promise.resolve(getAuthToken() || '')
    };
    super(authConfig);
  }

  /**
   * Incrementa o contador de visualizações de um post
   * @param {string} postId - ID do post
   * @returns {Promise<Object>} Resposta da API
   */
  async incrementPostView(postId) {
    this.validateRequiredParams({ postId }, ['postId']);

    return this.makeServiceRequest(`/blog/${postId}/view`, {
      method: HTTP_METHODS.POST
    });
  }

  /**
   * Busca o número de visualizações de um post
   * @param {string} postId - ID do post
   * @returns {Promise<Object>} Dados de visualização
   */
  async getPostViews(postId) {
    this.validateRequiredParams({ postId }, ['postId']);
    return this.makeServiceRequest(`/blog/${postId}/views`);
  }

  /**
   * Busca comentários de um post
   * @param {string} postId - ID do post
   * @returns {Promise<Array>} Lista de comentários
   */
  async getPostComments(postId) {
    this.validateRequiredParams({ postId }, ['postId']);
    return this.makeServiceRequest(`/blog/${postId}/comments`);
  }

  /**
   * Adiciona um comentário a um post
   * @param {string} postId - ID do post
   * @param {Object} commentData - Dados do comentário
   * @returns {Promise<Object>} Comentário criado
   */
  async addPostComment(postId, commentData) {
    this.validateRequiredParams({ postId, commentData }, ['postId', 'commentData']);

    return this.makeServiceRequest(`/blog/${postId}/comments`, {
      method: HTTP_METHODS.POST,
      body: commentData
    });
  }

  /**
   * Deleta um comentário (requer autenticação)
   * @param {string} postId - ID do post
   * @param {string} commentId - ID do comentário
   * @returns {Promise<Object>} Resposta da API
   */
  async deletePostComment(postId, commentId) {
    this.validateRequiredParams({ postId, commentId }, ['postId', 'commentId']);

    return this.makeServiceRequest(`/blog/${postId}/comments/${commentId}`, {
      method: HTTP_METHODS.DELETE
    });
  }
}

// Instância singleton do BlogInteractionsService
/**
 * @type {BlogInteractionsService | null}
 */
let blogInteractionsServiceInstance = null;

/**
 * Cria ou retorna a instância singleton do BlogInteractionsService
 * @param {Object} config - Configurações do service
 * @returns {BlogInteractionsService} Instância do BlogInteractionsService
 */
export function getBlogInteractionsService(config = {}) {
  if (!blogInteractionsServiceInstance) {
    blogInteractionsServiceInstance = new BlogInteractionsService(config);
  }
  return blogInteractionsServiceInstance;
}

// Exporta funções de conveniência para compatibilidade
const blogInteractionsService = getBlogInteractionsService();

export const incrementPostView = (/** @type {string} */ postId) => blogInteractionsService.incrementPostView(postId);
export const getPostViews = (/** @type {string} */ postId) => blogInteractionsService.getPostViews(postId);
export const getPostComments = (/** @type {string} */ postId) => blogInteractionsService.getPostComments(postId);
export const addPostComment = (/** @type {string} */ postId, /** @type {Object} */ commentData) => blogInteractionsService.addPostComment(postId, commentData);
export const deletePostComment = (/** @type {string} */ postId, /** @type {string} */ commentId) => blogInteractionsService.deletePostComment(postId, commentId);

// Exporta a classe para uso direto se necessário
export { BlogInteractionsService };