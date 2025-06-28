// AI service
import { getAuthHeaders } from './api.js';

/**
 * Generates AI text using the Maritalk API
 * @param {string} prompt - Text prompt for AI generation
 * @param {Object} options - Additional options for AI generation
 * @returns {Promise<string>} Generated text
 */
export async function generateAiText(prompt, options = {}) {
  try {
    const payload = {
      prompt,
      max_tokens: options.maxTokens || 500,
      temperature: options.temperature || 0.7,
      ...options
    };

    const response = await fetch('https://dev.muttercorp.com.br/maritalk', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(payload)
    });
    
    if (!response.ok) {
      throw new Error('Failed to generate AI text');
    }
    
    const data = await response.json();
    return data.text || data.response || '';
  } catch (error) {
    console.error('Error generating AI text:', error);
    throw new Error('Failed to generate AI text');
  }
}

/**
 * Generates a proposal text using AI
 * @param {Object} projectData - Project information for context
 * @param {string} customPrompt - Custom prompt for the proposal
 * @returns {Promise<string>} Generated proposal text
 */
export async function generateProposalText(projectData, customPrompt = '') {
  try {
    const basePrompt = `
      Gere uma proposta profissional para o seguinte projeto:
      
      Título: ${projectData.title || 'Projeto'}
      Descrição: ${projectData.description || 'Sem descrição'}
      Orçamento: ${projectData.budget || 'A definir'}
      Prazo: ${projectData.deadline || 'A definir'}
      
      ${customPrompt}
      
      A proposta deve ser profissional, detalhada e convincente.
    `;

    return await generateAiText(basePrompt, {
      maxTokens: 800,
      temperature: 0.8
    });
  } catch (error) {
    console.error('Error generating proposal text:', error);
    throw new Error('Failed to generate proposal text');
  }
}

/**
 * Generates blog content using AI
 * @param {string} topic - Blog topic
 * @param {Object} options - Generation options
 * @returns {Promise<Object>} Generated blog content (title, content, tags)
 */
export async function generateBlogContent(topic, options = {}) {
  try {
    const prompt = `
      Crie um artigo de blog sobre: ${topic}
      
      O artigo deve ter:
      - Um título atrativo
      - Introdução envolvente
      - Desenvolvimento com subtópicos
      - Conclusão
      - Tags relevantes
      
      Formato: JSON com campos title, content, tags
    `;

    const response = await generateAiText(prompt, {
      maxTokens: 1200,
      temperature: 0.7,
      ...options
    });

    try {
      return JSON.parse(response);
    } catch {
      // If JSON parsing fails, return structured response
      return {
        title: `Artigo sobre ${topic}`,
        content: response,
        tags: [topic]
      };
    }
  } catch (error) {
    console.error('Error generating blog content:', error);
    throw new Error('Failed to generate blog content');
  }
}

/**
 * Generates social media content using AI
 * @param {string} topic - Content topic
 * @param {string} platform - Social media platform (twitter, linkedin, etc.)
 * @returns {Promise<string>} Generated social media content
 */
export async function generateSocialContent(topic, platform = 'twitter') {
  try {
    const platformLimits = {
      twitter: 280,
      linkedin: 1300,
      facebook: 500,
      instagram: 300
    };

    const charLimit = platformLimits[platform] || 280;

    const prompt = `
      Crie um post para ${platform} sobre: ${topic}
      
      Requisitos:
      - Máximo ${charLimit} caracteres
      - Engajante e relevante
      - Use hashtags apropriadas
      - Tom adequado para a plataforma
    `;

    return await generateAiText(prompt, {
      maxTokens: 150,
      temperature: 0.8
    });
  } catch (error) {
    console.error('Error generating social content:', error);
    throw new Error('Failed to generate social content');
  }
}

/**
 * Generates product descriptions using AI
 * @param {Object} productData - Product information
 * @returns {Promise<string>} Generated product description
 */
export async function generateProductDescription(productData) {
  try {
    const prompt = `
      Crie uma descrição atrativa para o produto:
      
      Nome: ${productData.name || 'Produto'}
      Categoria: ${productData.category || 'Geral'}
      Preço: ${productData.price || 'A consultar'}
      Características: ${productData.features || 'Não informado'}
      
      A descrição deve ser persuasiva e destacar os benefícios do produto.
    `;

    return await generateAiText(prompt, {
      maxTokens: 300,
      temperature: 0.7
    });
  } catch (error) {
    console.error('Error generating product description:', error);
    throw new Error('Failed to generate product description');
  }
}

/**
 * Summarizes text using AI
 * @param {string} text - Text to summarize
 * @param {number} maxLength - Maximum length of summary
 * @returns {Promise<string>} Summarized text
 */
export async function summarizeText(text, maxLength = 200) {
  try {
    const prompt = `
      Resuma o seguinte texto em no máximo ${maxLength} caracteres:
      
      ${text}
      
      O resumo deve capturar os pontos principais de forma clara e concisa.
    `;

    return await generateAiText(prompt, {
      maxTokens: Math.ceil(maxLength / 3),
      temperature: 0.5
    });
  } catch (error) {
    console.error('Error summarizing text:', error);
    throw new Error('Failed to summarize text');
  }
}

/**
 * Translates text using AI
 * @param {string} text - Text to translate
 * @param {string} targetLanguage - Target language
 * @param {string} sourceLanguage - Source language (optional)
 * @returns {Promise<string>} Translated text
 */
export async function translateText(text, targetLanguage, sourceLanguage = 'auto') {
  try {
    const prompt = `
      Traduza o seguinte texto ${sourceLanguage !== 'auto' ? `do ${sourceLanguage}` : ''} para ${targetLanguage}:
      
      ${text}
      
      Mantenha o tom e o contexto original.
    `;

    return await generateAiText(prompt, {
      maxTokens: Math.ceil(text.length * 1.5 / 3),
      temperature: 0.3
    });
  } catch (error) {
    console.error('Error translating text:', error);
    throw new Error('Failed to translate text');
  }
}
