// Authentication service
import { apiRequest, getAuthToken, setAuthToken, removeAuthToken } from './api.js';

/**
 * Validates the current authentication token
 * @returns {Promise<boolean>} True if token is valid, false otherwise
 */
export async function validateToken() {
  const token = getAuthToken();
  if (!token) {
    return false;
  }

  try {
    const response = await fetch('https://dev.muttercorp.com.br/users/check-admin', {
      method: 'GET',
      headers: {
        accept: '*/*',
        Authorization: `Bearer ${token}`
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
export async function login(username, password) {
  try {
    const response = await fetch('https://dev.muttercorp.com.br/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
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
      const errorData = await response.json();
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
export async function loginWithGoogleOauth(tenantCode = 'muttercorp') {
  try {
    window.location.href = `https://dev.muttercorp.com.br/auth/google?tenant_code=${tenantCode}`;
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
export async function logout() {
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
export function isAuthenticated() {
  return !!getAuthToken();
}

/**
 * Gets current user token
 * @returns {string|null} Current auth token or null
 */
export function getCurrentToken() {
  return getAuthToken();
}

/**
 * Redirects to login page if not authenticated
 * @param {string} loginPath - Path to login page (default: '/login')
 */
export function requireAuth(loginPath = '/login') {
  if (!isAuthenticated()) {
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
export async function validateAndRedirect(loginPath = '/login') {
  const isValid = await validateToken();
  if (!isValid) {
    removeAuthToken();
    window.location.href = loginPath;
    return false;
  }
  return true;
}
