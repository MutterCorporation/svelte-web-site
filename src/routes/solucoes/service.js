// Service simples para soluções
const API_BASE = 'https://dev.conteudointimo.com.br';

/**
 * Busca dados das soluções
 * @returns {Promise<any[]>} Lista de soluções
 */
export async function fetchSolutions() {
    try {
        const response = await fetch(`${API_BASE}/solutions`);
        
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }
        
        const data = await response.json();
        return Array.isArray(data) ? data : data.data || [];
    } catch (error) {
        console.error('Erro ao buscar soluções:', error);
        return [];
    }
}

/**
 * Envia solicitação de orçamento
 * @param {Object} requestData - Dados da solicitação
 * @returns {Promise<any|null>} Resposta da solicitação
 */
export async function submitQuoteRequest(requestData) {
    try {
        const response = await fetch(`${API_BASE}/quotes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('Erro ao enviar solicitação:', error);
        return null;
    }
}

/**
 * Envia formulário de contato
 * @param {Object} contactData - Dados de contato
 * @returns {Promise<any|null>} Resposta do contato
 */
export async function submitContact(contactData) {
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
        console.error('Erro ao enviar contato:', error);
        return null;
    }
}