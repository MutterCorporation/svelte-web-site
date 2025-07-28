// Service simples para o blog
const API_BASE = 'https://dev.muttercorp.com.br';

/**
 * Busca posts do blog para um tenant espec�fico
 * @param {string} tenantCode - C�digo do tenant
 * @returns {Promise<any[]>} Lista de posts
 */
export async function fetchBlogPost(tenantCode) {
    try {
        const response = await fetch(`${API_BASE}/blog/${tenantCode}`);
        
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }
        
        const data = await response.json();
        return Array.isArray(data) ? data : data.data || [];
    } catch (error) {
        console.error('Erro ao buscar posts do blog:', error);
        return [];
    }
}

/**
 * Busca um post espec�fico
 * @param {string} tenantCode - C�digo do tenant
 * @param {string} slug - Slug do post
 * @returns {Promise<any|null>} Dados do post
 */
export async function fetchSinglePost(tenantCode, slug) {
    try {
        const response = await fetch(`${API_BASE}/blog/${tenantCode}/${slug}`);
        
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('Erro ao buscar post espec�fico:', error);
        return null;
    }
}

/**
 * Incrementa visualiza��es do post
 * @param {string} tenantCode - C�digo do tenant
 * @param {string} slug - Slug do post
 */
export async function incrementPostViews(tenantCode, slug) {
    try {
        // await fetch(`${API_BASE}/blog/posts/${tenantCode}/${slug}/views`, {
        //     method: 'POST'
        // });
    } catch (error) {
        console.error('Erro ao incrementar visualiza��es:', error);
    }
}