import { ERROR_CODES, ERROR_MESSAGES } from '../constants.js';

/**
 * Classe personalizada para erros da API MutterCorp
 */
export class MutterCorpApiError extends Error {
  constructor(message, statusCode, errorCode, details) {
    super(message);
    this.name = 'MutterCorpApiError';
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.details = details;
  }
}

/**
 * Trata erros da API e retorna um erro padronizado
 * @param {Response|Error|any} error Erro da requisição ou resposta da API
 * @returns {MutterCorpApiError|Promise<MutterCorpApiError>} Erro padronizado
 */
export function handleApiError(error) {
  // Se for um erro de rede (fetch falhou)
  if (error instanceof Error) {
    if (error.name === 'AbortError') {
      return new MutterCorpApiError(
        ERROR_MESSAGES.TIMEOUT_ERROR,
        0,
        'TIMEOUT',
        { originalError: error }
      );
    }

    return new MutterCorpApiError(
      ERROR_MESSAGES.NETWORK_ERROR,
      0,
      'NETWORK_ERROR',
      { originalError: error }
    );
  }

  // Se for uma resposta HTTP com erro
  if (error instanceof Response) {
    const statusCode = error.status;
    let message = ERROR_MESSAGES.UNKNOWN_ERROR;
    let errorCode = 'UNKNOWN_ERROR';

    // Define a mensagem de acordo com o código de status
    switch (statusCode) {
      case ERROR_CODES.UNAUTHORIZED:
        message = ERROR_MESSAGES.UNAUTHORIZED;
        errorCode = 'UNAUTHORIZED';
        break;
      case ERROR_CODES.FORBIDDEN:
        message = ERROR_MESSAGES.FORBIDDEN;
        errorCode = 'FORBIDDEN';
        break;
      case ERROR_CODES.NOT_FOUND:
        message = ERROR_MESSAGES.NOT_FOUND;
        errorCode = 'NOT_FOUND';
        break;
      case ERROR_CODES.INTERNAL_SERVER_ERROR:
        message = ERROR_MESSAGES.INTERNAL_SERVER_ERROR;
        errorCode = 'INTERNAL_SERVER_ERROR';
        break;
    }

    // Tenta extrair mais detalhes do corpo da resposta
    return error.json()
      .then(data => {
        return new MutterCorpApiError(
          data.message || message,
          statusCode,
          data.errorCode || errorCode,
          data.details || {}
        );
      })
      .catch(() => {
        // Se não conseguir extrair o JSON, retorna o erro padrão
        return new MutterCorpApiError(
          message,
          statusCode,
          errorCode,
          {}
        );
      });
  }

  // Para qualquer outro tipo de erro
  return new MutterCorpApiError(
    ERROR_MESSAGES.UNKNOWN_ERROR,
    0,
    'UNKNOWN_ERROR',
    { originalError: error }
  );
}
