// @ts-nocheck
// @ts-ignore
import fetch from 'cross-fetch';
import { ENVIRONMENTS, API_VERSIONS, DEFAULT_TIMEOUT } from './constants';
import { handleApiError } from './utils/error-handling.js';
import { buildUrl, buildQueryString } from './utils/request.js';

/**
 * Cliente JavaScript para a API MutterCorp
 */
class MutterCorpService {
  /**
   * Cria uma nova instância do serviço MutterCorp
   * @param {Object} config Configurações do serviço
   * @param {string} [config.environment='production'] Ambiente da API (development, staging, production)
   * @param {string} [config.version='v1'] Versão da API
   * @param {number} [config.timeout=30000] Timeout das requisições em ms
   * @param {Function} config.getCookieCorp Função que retorna o cookie de autenticação
   * @param {Function} config.getSessionMutterCorp Função que retorna a sessão de autenticação
   */
  // @ts-ignore
  constructor(config = {}) {
    this.environment = config.environment || ENVIRONMENTS.PRODUCTION;
    this.version = config.version || API_VERSIONS.V1;
    this.timeout = config.timeout || DEFAULT_TIMEOUT;
    
    // Funções para obter credenciais de autenticação
    this.getCookieCorp = config.getCookieCorp;
    this.getSessionMutterCorp = config.getSessionMutterCorp;
    
    if (!this.getCookieCorp || !this.getSessionMutterCorp) {
      throw new Error('As funções getCookieCorp e getSessionMutterCorp são obrigatórias');
    }
    
    // Define a URL base de acordo com o ambiente
    switch (this.environment) {
      case ENVIRONMENTS.DEVELOPMENT:
        this.baseUrl = 'https://dev-api.muttercorp.com.br';
        break;
      case ENVIRONMENTS.STAGING:
        this.baseUrl = 'https://staging-api.muttercorp.com.br';
        break;
      case ENVIRONMENTS.PRODUCTION:
        this.baseUrl = 'https://api.muttercorp.com.br';
        break;
      default:
        throw new Error(`Ambiente inválido: ${this.environment}`);
    }
  }

  /**
   * Realiza uma requisição para a API MutterCorp
   * @param {string} endpoint Endpoint da API
   * @param {Object} options Opções da requisição
   * @returns {Promise<Object>} Resposta da API
   */
  async makeRequest(endpoint, options = {}) {
    const url = buildUrl(this.baseUrl, this.version, endpoint);
    
    // Obtém as credenciais de autenticação
    const cookieCorp = await this.getCookieCorp();
    const sessionMutterCorp = await this.getSessionMutterCorp();
    
    // Configura os headers da requisição
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-MutterCorp-Cookie': cookieCorp,
      'X-MutterCorp-Session': sessionMutterCorp,
      // @ts-ignore
      ...options.headers
    };
    
    // Configura o body da requisição
    // @ts-ignore
    const body = options.body ? JSON.stringify(options.body) : undefined;
    
    // Configura o timeout da requisição
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);
    
    try {
      const response = await fetch(url, {
        // @ts-ignore
        method: options.method || 'GET',
        headers,
        body,
        signal: controller.signal
      });
      
      // Limpa o timeout
      clearTimeout(timeoutId);
      
      // Verifica se a resposta foi bem-sucedida
      if (!response.ok) {
        throw await handleApiError(response);
      }
      
      // Retorna os dados da resposta
      return await response.json();
    } catch (error) {
      // Limpa o timeout em caso de erro
      clearTimeout(timeoutId);
      
      // Trata o erro
      throw handleApiError(error);
    }
  }

  /**
   * Obtém a lista de eventos
   * @param {Object} params Parâmetros da consulta
   * @returns {Promise<Array>} Lista de eventos
   */
  async getEvents(params = {}) {
    const queryString = buildQueryString(params);
    return this.makeRequest(`/events${queryString}`);
  }

  /**
   * Obtém um evento pelo ID
   * @param {string} eventId ID do evento
   * @returns {Promise<Object>} Dados do evento
   */
  async getEventById(eventId) {
    return this.makeRequest(`/events/${eventId}`);
  }

  /**
   * Obtém os tickets de um evento
   * @param {string} eventId ID do evento
   * @returns {Promise<Array>} Lista de tickets
   */
  async getEventTickets(eventId) {
    return this.makeRequest(`/events/${eventId}/tickets`);
  }

  /**
   * Obtém o perfil do usuário
   * @returns {Promise<Object>} Dados do perfil
   */
  async getUserProfile() {
    return this.makeRequest('/user/profile');
  }

  /**
   * Atualiza o perfil do usuário
   * @param {Object} data Dados do perfil
   * @returns {Promise<Object>} Dados atualizados
   */
  async updateUserProfile(data) {
    return this.makeRequest('/user/profile', {
      method: 'PUT',
      body: data
    });
  }
}

export { MutterCorpService };
