// Serviço para gerenciar interações do blog (comentários e visualizações)
import { getAuthToken } from './api.js';

const API_BASE_URL = 'https://dev.muttercorp.com.br';

/**
 * Incrementa o contador de visualizações de um post
 * @param {string} postId - ID do post
 * @returns {Promise<Object>} Resposta da API
 */
export async function incrementPostView(postId) {
  try {
    const response = await fetch(`${API_BASE_URL}/blog/${postId}/view`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error('Erro ao incrementar visualização');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Erro ao incrementar visualização:', error);
    throw error;
  }
}

/**
 * Busca o número de visualizações de um post
 * @param {string} postId - ID do post
 * @returns {Promise<Object>} Dados de visualização
 */
export async function getPostViews(postId) {
  try {
    const response = await fetch(`${API_BASE_URL}/blog/${postId}/views`);
    
    if (!response.ok) {
      throw new Error('Erro ao buscar visualizações');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Erro ao buscar visualizações:', error);
    throw error;
  }
}

/**
 * Busca comentários de um post
 * @param {string} postId - ID do post
 * @returns {Promise<Array>} Lista de comentários
 */
export async function getPostComments(postId) {
  try {
    const response = await fetch(`${API_BASE_URL}/blog/${postId}/comments`);
    
    if (!response.ok) {
      throw new Error('Erro ao buscar comentários');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Erro ao buscar comentários:', error);
    throw error;
  }
}

/**
 * Adiciona um comentário a um post
 * @param {string} postId - ID do post
 * @param {Object} commentData - Dados do comentário
 * @returns {Promise<Object>} Comentário criado
 */
export async function addPostComment(postId, commentData) {
  try {
    const response = await fetch(`${API_BASE_URL}/blog/${postId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(commentData)
    });
    
    if (!response.ok) {
      throw new Error('Erro ao adicionar comentário');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Erro ao adicionar comentário:', error);
    throw error;
  }
}

/**
 * Deleta um comentário (requer autenticação)
 * @param {string} postId - ID do post
 * @param {string} commentId - ID do comentário
 * @returns {Promise<Object>} Resposta da API
 */
export async function deletePostComment(postId, commentId) {
  try {
    const response = await fetch(`${API_BASE_URL}/blog/${postId}/comments/${commentId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`
      }
    });
    
    if (!response.ok) {
      throw new Error('Erro ao deletar comentário');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Erro ao deletar comentário:', error);
    throw error;
  }
} 