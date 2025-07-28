// Service simples para login/auth
const API_BASE = 'https://dev.conteudointimo.com.br';

/**
 * Faz login do usuário
 * @param {string} email - Email do usuário
 * @param {string} password - Senha do usuário
 * @returns {Promise<any|null>} Dados do usuário e token
 */
export async function login(email, password) {
    try {
        const response = await fetch(`${API_BASE}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Salva o token no localStorage
        if (data.token) {
            localStorage.setItem('auth_token', data.token);
        }
        
        return data;
    } catch (error) {
        console.error('Erro no login:', error);
        return null;
    }
}

/**
 * Faz logout do usuário
 */
export function logout() {
    localStorage.removeItem('auth_token');
    window.location.href = '/';
}

/**
 * Verifica se o usuário está autenticado
 * @returns {boolean} Status de autenticação
 */
export function isAuthenticated() {
    return !!localStorage.getItem('auth_token');
}

/**
 * Obtém o token de autenticação
 * @returns {string|null} Token de autenticação
 */
export function getAuthToken() {
    return localStorage.getItem('auth_token');
}

/**
 * Busca dados do usuário atual
 * @returns {Promise<any|null>} Dados do usuário
 */
export async function getCurrentUser() {
    const token = getAuthToken();
    
    if (!token) {
        return null;
    }
    
    try {
        const response = await fetch(`${API_BASE}/auth/user`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('Erro ao buscar usuário:', error);
        return null;
    }
}