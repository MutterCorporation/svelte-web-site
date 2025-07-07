/**
 * Ponto de entrada da biblioteca MutterCorpService
 * Exporta a API pública dos services
 */

import { MutterCorpService } from './MutterCorpService.js';
import { 
  ENVIRONMENTS, 
  API_VERSIONS, 
  DEFAULT_TIMEOUT,
  ERROR_CODES,
  ERROR_MESSAGES 
} from './constants.js';
import { MutterCorpApiError } from './utils/error-handling.js';
import { buildUrl, buildQueryString } from './utils/request.js';

/**
 * Factory para criar instâncias do MutterCorpService
 * @param {Object} config Configurações do serviço
 * @returns {MutterCorpService} Instância configurada do serviço
 */
export function createMutterCorpService(config = {}) {
  return new MutterCorpService(config);
}

/**
 * Factory para criar instâncias do MutterCorpService com configurações pré-definidas
 * @param {string} environment Ambiente (development, staging, production)
 * @param {Object} authConfig Configurações de autenticação
 * @returns {MutterCorpService} Instância configurada do serviço
 */
export function createMutterCorpServiceForEnvironment(environment, authConfig) {
  if (!authConfig || !authConfig.getCookieCorp || !authConfig.getSessionMutterCorp) {
    throw new Error('Configurações de autenticação são obrigatórias');
  }

  return new MutterCorpService({
    environment,
    ...authConfig
  });
}

/**
 * Cria uma instância do serviço para desenvolvimento
 * @param {Object} authConfig Configurações de autenticação
 * @returns {MutterCorpService} Instância para desenvolvimento
 */
export function createDevelopmentService(authConfig) {
  return createMutterCorpServiceForEnvironment(ENVIRONMENTS.DEVELOPMENT, authConfig);
}

/**
 * Cria uma instância do serviço para staging
 * @param {Object} authConfig Configurações de autenticação
 * @returns {MutterCorpService} Instância para staging
 */
export function createStagingService(authConfig) {
  return createMutterCorpServiceForEnvironment(ENVIRONMENTS.STAGING, authConfig);
}

/**
 * Cria uma instância do serviço para produção
 * @param {Object} authConfig Configurações de autenticação
 * @returns {MutterCorpService} Instância para produção
 */
export function createProductionService(authConfig) {
  return createMutterCorpServiceForEnvironment(ENVIRONMENTS.PRODUCTION, authConfig);
}

/**
 * Classe base para services especializados que estendem MutterCorpService
 */
export class BaseService extends MutterCorpService {
  constructor(config = {}) {
    super(config);
    this.serviceName = this.constructor.name;
  }

  /**
   * Método helper para fazer requisições com logging específico do service
   */
  async makeServiceRequest(endpoint, options = {}) {
    try {
      const result = await this.makeRequest(endpoint, options);
      this.logRequest('success', endpoint, options);
      return result;
    } catch (error) {
      this.logRequest('error', endpoint, options, error);
      throw error;
    }
  }

  /**
   * Log das requisições do service
   */
  logRequest(status, endpoint, options, error = null) {
    const logData = {
      service: this.serviceName,
      endpoint,
      method: options.method || 'GET',
      status,
      timestamp: new Date().toISOString()
    };

    if (error) {
      logData.error = error.message;
    }

    console.log(`[${this.serviceName}]`, logData);
  }

  /**
   * Valida parâmetros obrigatórios
   */
  validateRequiredParams(params, requiredFields) {
    const missingFields = requiredFields.filter(field => 
      params[field] === undefined || params[field] === null || params[field] === ''
    );

    if (missingFields.length > 0) {
      throw new MutterCorpApiError(
        `Parâmetros obrigatórios ausentes: ${missingFields.join(', ')}`,
        400,
        'VALIDATION_ERROR',
        { missingFields }
      );
    }
  }

  /**
   * Sanitiza parâmetros removendo valores undefined/null
   */
  sanitizeParams(params) {
    const sanitized = {};
    Object.keys(params).forEach(key => {
      if (params[key] !== undefined && params[key] !== null) {
        sanitized[key] = params[key];
      }
    });
    return sanitized;
  }
}

// Exportações principais
export { MutterCorpService };
export { MutterCorpApiError };
export { buildUrl, buildQueryString };
export { 
  ENVIRONMENTS, 
  API_VERSIONS, 
  DEFAULT_TIMEOUT,
  ERROR_CODES,
  ERROR_MESSAGES,
  HTTP_METHODS,
  COMMON_ENDPOINTS
} from './constants.js';

// Exportação padrão
export default {
  MutterCorpService,
  createMutterCorpService,
  createMutterCorpServiceForEnvironment,
  createDevelopmentService,
  createStagingService,
  createProductionService,
  BaseService,
  MutterCorpApiError,
  ENVIRONMENTS,
  API_VERSIONS,
  ERROR_CODES,
  ERROR_MESSAGES
};
