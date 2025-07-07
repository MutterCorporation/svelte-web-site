/**
 * Constantes utilizadas pelos services MutterCorp
 */

// Ambientes disponíveis
export const ENVIRONMENTS = {
  DEVELOPMENT: 'development',
  STAGING: 'staging',
  PRODUCTION: 'production'
};

// Versões da API
export const API_VERSIONS = {
  V1: 'v1',
  V2: 'v2'
};

// Timeout padrão para requisições (30 segundos)
export const DEFAULT_TIMEOUT = 30000;

// Códigos de erro HTTP
export const ERROR_CODES = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504
};

// Mensagens de erro padrão
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Erro de conexão. Verifique sua internet e tente novamente.',
  TIMEOUT_ERROR: 'A requisição demorou muito para responder. Tente novamente.',
  UNAUTHORIZED: 'Acesso não autorizado. Faça login novamente.',
  FORBIDDEN: 'Você não tem permissão para acessar este recurso.',
  NOT_FOUND: 'Recurso não encontrado.',
  INTERNAL_SERVER_ERROR: 'Erro interno do servidor. Tente novamente mais tarde.',
  UNKNOWN_ERROR: 'Ocorreu um erro inesperado. Tente novamente.',
  VALIDATION_ERROR: 'Dados inválidos. Verifique as informações e tente novamente.',
  RATE_LIMIT_ERROR: 'Muitas requisições. Aguarde um momento e tente novamente.'
};

// Headers padrão
export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
};

// Configurações de retry
export const RETRY_CONFIG = {
  DEFAULT_RETRIES: 3,
  DEFAULT_RETRY_DELAY: 1000,
  EXPONENTIAL_BACKOFF: true
};

// Status de requisição
export const REQUEST_STATUS = {
  PENDING: 'pending',
  SUCCESS: 'success',
  ERROR: 'error',
  CANCELLED: 'cancelled'
};

// Tipos de método HTTP
export const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE'
};

// Configurações de cache
export const CACHE_CONFIG = {
  DEFAULT_TTL: 300000, // 5 minutos
  MAX_CACHE_SIZE: 100,
  CACHE_ENABLED: true
};

// Eventos do service
export const SERVICE_EVENTS = {
  REQUEST_START: 'request:start',
  REQUEST_SUCCESS: 'request:success',
  REQUEST_ERROR: 'request:error',
  REQUEST_RETRY: 'request:retry',
  AUTH_EXPIRED: 'auth:expired',
  RATE_LIMITED: 'rate:limited'
};

// Configurações de logging
export const LOG_LEVELS = {
  ERROR: 'error',
  WARN: 'warn',
  INFO: 'info',
  DEBUG: 'debug'
};

// URLs base por ambiente
export const BASE_URLS = {
  [ENVIRONMENTS.DEVELOPMENT]: 'https://dev-api.muttercorp.com.br',
  [ENVIRONMENTS.STAGING]: 'https://staging-api.muttercorp.com.br',
  [ENVIRONMENTS.PRODUCTION]: 'https://api.muttercorp.com.br'
};

// Endpoints comuns
export const COMMON_ENDPOINTS = {
  HEALTH: '/health',
  VERSION: '/version',
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    VALIDATE: '/auth/validate',
    GOOGLE: '/auth/google'
  },
  USER: {
    PROFILE: '/user/profile',
    PREFERENCES: '/user/preferences',
    CHECK_ADMIN: '/users/check-admin'
  }
};

// Configurações de validação
export const VALIDATION_RULES = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD_MIN_LENGTH: 8,
  USERNAME_MIN_LENGTH: 3,
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_FILE_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'application/pdf']
};

// Configurações de paginação
export const PAGINATION_DEFAULTS = {
  PAGE: 1,
  PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100
};

// Configurações de rate limiting
export const RATE_LIMIT_CONFIG = {
  MAX_REQUESTS_PER_MINUTE: 60,
  WINDOW_SIZE: 60000, // 1 minuto
  BLOCK_DURATION: 300000 // 5 minutos
};
