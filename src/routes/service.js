// Service simples para a página principal
const API_BASE = 'https://dev.muttercorp.com.br';

/**
 * Envia formulário de contato
 * @param {Object} contactData - Dados do formulário
 * @returns {Promise<any|null>} Resposta do envio
 */
export async function submitContactForm(contactData) {
    try {
        const response = await fetch(`${API_BASE}/contact`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contactData)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('Erro ao enviar formulário:', error);
        return null;
    }
}

/**
 * Busca estatísticas da empresa
 * @returns {Promise<any|null>} Estatísticas
 */
export async function fetchCompanyStats() {
    try {
        const response = await fetch(`${API_BASE}/stats`);
        
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('Erro ao buscar estatísticas:', error);
        return {
            projects: 150,
            clients: 50,
            years: 5,
            solutions: 8
        };
    }
}

/**
 * Busca depoimentos de clientes
 * @returns {Promise<any[]>} Lista de depoimentos
 */
export async function fetchTestimonials() {
    try {
        const response = await fetch(`${API_BASE}/testimonials`);
        
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }
        
        const data = await response.json();
        return Array.isArray(data) ? data : data.data || [];
    } catch (error) {
        console.error('Erro ao buscar depoimentos:', error);
        return [];
    }
}

/**
 * Busca casos de sucesso
 * @returns {Promise<any[]>} Lista de casos
 */
export async function fetchSuccessCases() {
    try {
        const response = await fetch(`${API_BASE}/success-cases`);
        
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }
        
        const data = await response.json();
        return Array.isArray(data) ? data : data.data || [];
    } catch (error) {
        console.error('Erro ao buscar casos de sucesso:', error);
        return [];
    }
}