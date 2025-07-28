// Service simples para CryptoStomp
const API_BASE = 'https://dev.muttercorp.com.br';

/**
 * Busca dados de criptomoedas
 * @param {string} symbol - Símbolo da criptomoeda
 * @returns {Promise<any|null>} Dados da cripto
 */
export async function fetchCryptoData(symbol = 'BTC') {
    try {
        const response = await fetch(`${API_BASE}/crypto/price/${symbol}`);
        
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('Erro ao buscar dados cripto:', error);
        return null;
    }
}

/**
 * Busca análise técnica
 * @param {string} symbol - Símbolo da criptomoeda
 * @param {string} timeframe - Timeframe (1h, 4h, 1d, etc.)
 * @returns {Promise<any|null>} Análise técnica
 */
export async function fetchTechnicalAnalysis(symbol, timeframe = '1d') {
    try {
        const response = await fetch(`${API_BASE}/crypto/analysis/${symbol}?timeframe=${timeframe}`);
        
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('Erro ao buscar análise técnica:', error);
        return null;
    }
}

/**
 * Busca previsões de ML
 * @param {string} symbol - Símbolo da criptomoeda
 * @returns {Promise<any|null>} Previsões
 */
export async function fetchMLPredictions(symbol) {
    try {
        const response = await fetch(`${API_BASE}/crypto/predictions/${symbol}`);
        
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('Erro ao buscar previsões:', error);
        return null;
    }
}

/**
 * Busca lista de criptomoedas suportadas
 * @returns {Promise<any[]>} Lista de criptos
 */
export async function fetchSupportedCryptos() {
    try {
        const response = await fetch(`${API_BASE}/crypto/supported`);
        
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }
        
        const data = await response.json();
        return Array.isArray(data) ? data : data.data || [];
    } catch (error) {
        console.error('Erro ao buscar criptos suportadas:', error);
        return [
            { symbol: 'BTC', name: 'Bitcoin' },
            { symbol: 'ETH', name: 'Ethereum' },
            { symbol: 'ADA', name: 'Cardano' }
        ];
    }
}