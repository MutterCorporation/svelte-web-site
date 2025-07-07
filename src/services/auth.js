// Authentication service using MutterCorpService
import { BaseService } from './services/index.js';
import { COMMON_ENDPOINTS, HTTP_METHODS } from './services/constants.js';
import { getAuthToken, setAuthToken, removeAuthToken } from './api.js';

/**
 * Service para gerenciar autenticação usando MutterCorpService
 */
class AuthService extends BaseService {
  constructor(config = {}) {
    // Para auth, não precisamos das funções de auth no construtor
    // pois estamos criando/validando tokens
    const authConfig = {
      ...config,
      getCookieCorp: () => Promise.resolve(''),
      getSessionMutterCorp: () => Promise.resolve('')
    };
    super(authConfig);
  }

  /**
   * Validates the current authentication token
   * @returns {Promise<boolean>} True if token is valid, false otherwise
   */
  async validateToken() {
    const token = getAuthToken();
    if (!token) {
      return false;
    }

    try {
      // Fazemos a requisição diretamente pois não podemos usar makeRequest
      // que requer autenticação para validar a própria autenticação
      const response = await fetch(`${this.baseUrl}/${this.version}${COMMON_ENDPOINTS.USER.CHECK_ADMIN}`, {
        method: HTTP_METHODS.GET,
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      return response.ok;
    } catch (error) {
      console.error('Token validation error:', error);
      return false;
    }
  }

  /**
   * Authenticates user with username and password
   * @param {string} username - User's email/username
   * @param {string} password - User's password
   * @returns {Promise<Object>} Authentication response
   */
  async login(username, password) {
    this.validateRequiredParams({ username, password }, ['username', 'password']);

    try {
      // Fazemos a requisição diretamente pois não temos token ainda
      const response = await fetch(`${this.baseUrl}/${this.version}${COMMON_ENDPOINTS.AUTH.LOGIN}`, {
        method: HTTP_METHODS.POST,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      if (response.ok) {
        const data = await response.json();
        setAuthToken(data.token);
        return {
          success: true,
          data,
          message: 'Logged in successfully'
        };
      } else {
        const errorData = await response.json().catch(() => ({}));
        return {
          success: false,
          message: errorData.message || 'Login failed'
        };
      }
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        message: 'Network error'
      };
    }
  }

  /**
   * Initiates Google OAuth authentication
   * @param {string} tenantCode - Tenant code for OAuth (default: 'muttercorp')
   * @returns {Promise<Object>} OAuth response
   */
  async loginWithGoogleOauth(tenantCode = 'muttercorp') {
    try {
      const url = `${this.baseUrl}${COMMON_ENDPOINTS.AUTH.GOOGLE}?tenant_code=${tenantCode}`;
      window.location.href = url;
      return {
        success: true,
        message: 'Redirecting to Google OAuth'
      };
    } catch (error) {
      console.error('Google OAuth error:', error);
      return {
        success: false,
        message: 'Network error'
      };
    }
  }

  /**
   * Logs out the current user
   * @returns {Promise<Object>} Logout response
   */
  async logout() {
    try {
      removeAuthToken();
      return {
        success: true,
        message: 'Logged out successfully'
      };
    } catch (error) {
      console.error('Logout error:', error);
      return {
        success: false,
        message: 'Logout failed'
      };
    }
  }

  /**
   * Checks if user is currently authenticated
   * @returns {boolean} True if user has a token, false otherwise
   */
  isAuthenticated() {
    return !!getAuthToken();
  }

  /**
   * Gets current user token
   * @returns {string|null} Current auth token or null
   */
  getCurrentToken() {
    return getAuthToken();
  }

  /**
   * Redirects to login page if not authenticated
   * @param {string} loginPath - Path to login page (default: '/login')
   */
  requireAuth(loginPath = '/login') {
    if (!this.isAuthenticated()) {
      window.location.href = loginPath;
      return false;
    }
    return true;
  }

  /**
   * Validates token and redirects if invalid
   * @param {string} loginPath - Path to login page (default: '/login')
   * @returns {Promise<boolean>} True if authenticated, false otherwise
   */
  async validateAndRedirect(loginPath = '/login') {
    const isValid = await this.validateToken();
    if (!isValid) {
      removeAuthToken();
      window.location.href = loginPath;
      return false;
    }
    return true;
  }
}

// Instância singleton do AuthService
/**
 * @type {AuthService | null}
 */
let authServiceInstance = null;

/**
 * Cria ou retorna a instância singleton do AuthService
 * @param {Object} config - Configurações do service
 * @returns {AuthService} Instância do AuthService
 */
export function getAuthService(config = {}) {
  if (!authServiceInstance) {
    authServiceInstance = new AuthService(config);
  }
  return authServiceInstance;
}

// Exporta funções de conveniência para compatibilidade
const authService = getAuthService();

export const validateToken = () => authService.validateToken();
export const login = (/** @type {string} */ username, /** @type {string} */ password) => authService.login(username, password);
export const loginWithGoogleOauth = (/** @type {string | undefined} */ tenantCode) => authService.loginWithGoogleOauth(tenantCode);
export const logout = () => authService.logout();
export const isAuthenticated = () => authService.isAuthenticated();
export const getCurrentToken = () => authService.getCurrentToken();
export const requireAuth = (/** @type {string | undefined} */ loginPath) => authService.requireAuth(loginPath);
export const validateAndRedirect = (/** @type {string | undefined} */ loginPath) => authService.validateAndRedirect(loginPath);

// Exporta a classe para uso direto se necessário
export { AuthService };
