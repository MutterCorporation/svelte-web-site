import fetch from 'cross-fetch';

/**
 * Realiza uma requisição HTTP com suporte a retry
 * @param {string} url - URL da requisição
 * @param {Object} options - Opções da requisição
 * @param {Object} retryConfig - Configuração de retry
 * @returns {Promise<any>} Resposta da requisição
 */
export async function makeRequest(url, options = {}, retryConfig = {}) {
  const { retries = 3, retryDelay = 1000 } = retryConfig;
  let lastError;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      // Se não for a primeira tentativa, aguarda o delay
      if (attempt > 0) {
        await new Promise(resolve => setTimeout(resolve, retryDelay * attempt));
      }

      // Realiza a requisição
      const response = await fetch(url, options);
      
      // Verifica se a resposta é bem-sucedida
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw {
          status: response.status,
          statusText: response.statusText,
          data: errorData
        };
      }

      // Retorna os dados da resposta
      return await response.json();
    } catch (error) {
      lastError = error;
      
      // Se for o último retry, lança o erro
      if (attempt === retries) {
        throw lastError;
      }
      
      // Se for um erro de rede ou timeout, continua tentando
      // Para outros erros (como 4xx), não faz sentido tentar novamente
      if (!(error instanceof TypeError) && error.status && error.status >= 400 && error.status < 500) {
        throw error;
      }
    }
  }
}

/**
 * Constrói a URL completa para a requisição
 * @param {string} baseUrl URL base da API
 * @param {string} version Versão da API
 * @param {string} endpoint Endpoint da API
 * @returns {string} URL completa
 */
export function buildUrl(baseUrl, version, endpoint) {
  return `${baseUrl}/${version}${endpoint}`;
}

/**
 * Constrói a string de consulta a partir de um objeto de parâmetros
 * @param {Object} params Parâmetros da consulta
 * @returns {string} String de consulta formatada
 */
export function buildQueryString(params) {
  if (!params || Object.keys(params).length === 0) {
    return '';
  }
  
  const queryParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      if (Array.isArray(value)) {
        value.forEach(item => queryParams.append(`${key}[]`, item));
      } else {
        queryParams.append(key, value);
      }
    }
  });
  
  const queryString = queryParams.toString();
  return queryString ? `?${queryString}` : '';
}
