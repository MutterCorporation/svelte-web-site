// Service simples para o admin
const API_BASE = 'https://dev.conteudointimo.com.br';

/**
 * Busca leads
 * @returns {Promise<any[]>} Lista de leads
 */
export async function fetchLeads() {
    try {
        const response = await fetch(`${API_BASE}/leads`);
        
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }
        
        const data = await response.json();
        return Array.isArray(data) ? data : data.data || [];
    } catch (error) {
        console.error('Erro ao buscar leads:', error);
        return [];
    }
}

/**
 * Cria um novo lead
 * @param {Object} leadData - Dados do lead
 * @returns {Promise<any|null>} Lead criado
 */
export async function createLead(leadData) {
    try {
        const response = await fetch(`${API_BASE}/leads`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(leadData)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('Erro ao criar lead:', error);
        return null;
    }
}

/**
 * Busca projetos
 * @returns {Promise<any[]>} Lista de projetos
 */
export async function fetchProjects() {
    try {
        const response = await fetch(`${API_BASE}/projects`);
        
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }
        
        const data = await response.json();
        return Array.isArray(data) ? data : data.data || [];
    } catch (error) {
        console.error('Erro ao buscar projetos:', error);
        return [];
    }
}

/**
 * Cria um novo projeto
 * @param {Object} projectData - Dados do projeto
 * @returns {Promise<any|null>} Projeto criado
 */
export async function createProject(projectData) {
    try {
        const response = await fetch(`${API_BASE}/projects`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(projectData)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('Erro ao criar projeto:', error);
        return null;
    }
}