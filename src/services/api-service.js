// Centralized API Service - All fetch functions in one place
import { getAuthToken } from './api.js';

const API_BASE_URL = 'https://dev.muttercorp.com.br';
const PROJECTS_BASE_URL = 'https://dev.muttercorp.com.br/frella';
const FINANCE_BASE_URL = 'https://api.example.com/finance';

// Common headers helper
function getHeaders(includeAuth = true, contentType = 'application/json') {
  const headers = {};
  
  if (contentType) {
    headers['Content-Type'] = contentType;
  }
  
  if (includeAuth) {
    const token = getAuthToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }
  
  return headers;
}

// Generic fetch wrapper
async function apiCall(url, options = {}) {
  try {
    const response = await fetch(url, options);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    return response;
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
}

// ============= AUTHENTICATION =============
export async function validateToken() {
  const token = getAuthToken();
  if (!token) return false;

  try {
    const response = await apiCall(`${API_BASE_URL}/users/check-admin`, {
      headers: getHeaders()
    });
    return response.ok;
  } catch (error) {
    return false;
  }
}

export async function login(username, password) {
  const response = await apiCall(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: getHeaders(false),
    body: JSON.stringify({ username, password })
  });
  
  return await response.json();
}

// ============= BLOG =============
export async function fetchGoogleTrends() {
  const response = await apiCall('https://dev.muttercorp.com/trends/api/dailytrends?hl=pt-BR&tz=-180&geo=BR&ns=15');
  let text = await response.text();
  text = text.replace(")]}',", '');
  const data = JSON.parse(text);
  return data.default.trendingSearchesDays[0].trendingSearches.map(item => item.title.query);
}

export async function convertMarkdownToHtml(markdown) {
  const response = await apiCall('https://api.github.com/markdown', {
    method: 'POST',
    headers: getHeaders(false),
    body: JSON.stringify({ text: markdown, mode: 'gfm' })
  });
  
  return await response.text();
}

export async function submitBlogPost(formData) {
  const response = await apiCall(`${API_BASE_URL}/blog`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${getAuthToken()}` },
    body: formData
  });
  
  return await response.json();
}

export async function submitTweetPost(tweetText, options = {}) {
  const payload = {
    text: tweetText,
    options: {
      cmd: "string",
      only_save: true,
      ia: true,
      ...options
    }
  };

  const response = await apiCall(`${API_BASE_URL}/blog/twitter`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(payload)
  });
  
  return await response.json();
}

export async function fetchPostData(slug) {
  const response = await apiCall(`${API_BASE_URL}/blog/${slug}`);
  return await response.json();
}

export async function fetchBlogPosts(params = {}) {
  const queryString = new URLSearchParams(params).toString();
  const url = `${API_BASE_URL}/blog${queryString ? `?${queryString}` : ''}`;
  
  const response = await apiCall(url);
  return await response.json();
}

// ============= PROJECTS =============
export async function fetchProjectCount() {
  const response = await apiCall(`${PROJECTS_BASE_URL}/projects/count`);
  const count = await response.text();
  return parseInt(count);
}

export async function fetchProjects(page = 1, pageSize = 10) {
  const response = await apiCall(`${PROJECTS_BASE_URL}/projects?page=${page}&pageSize=${pageSize}`);
  return await response.json();
}

export async function fetchProjectDetails(projectId) {
  const response = await apiCall(`${PROJECTS_BASE_URL}/projects/${projectId}`);
  return await response.json();
}

export async function submitProposal(proposal) {
  const response = await apiCall(`${PROJECTS_BASE_URL}/proposals`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({
      project_id: proposal.projectId,
      estimated_value: proposal.estimatedValue,
      estimated_time: proposal.estimatedTime
    })
  });
  
  return await response.json();
}

export async function createProject(projectData) {
  const response = await apiCall(`${PROJECTS_BASE_URL}/projects`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(projectData)
  });
  
  return await response.json();
}

export async function updateProject(projectId, projectData) {
  const response = await apiCall(`${PROJECTS_BASE_URL}/projects/${projectId}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(projectData)
  });
  
  return await response.json();
}

export async function deleteProject(projectId) {
  const response = await apiCall(`${PROJECTS_BASE_URL}/projects/${projectId}`, {
    method: 'DELETE',
    headers: getHeaders()
  });
  
  return await response.json();
}

// ============= AI =============
export async function generateAiText(prompt, options = {}) {
  const payload = {
    messages: [
      {
        role: "user",
        content: prompt
      }
    ],
    do_sample: true,
    max_tokens: options.maxTokens || 200,
    temperature: options.temperature || 0.7,
    top_p: 0.95,
    model: "sabia-3"
  };

  const response = await apiCall(`${API_BASE_URL}/maritalk`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(payload)
  });
  
  const data = await response.json();
  return data.choices ? data.choices[0].message.content : data.response || "Não foi possível obter uma resposta da IA.";
}

// ============= LEADS =============
export async function createLead(leadData) {
  const response = await apiCall(`${API_BASE_URL}/leads`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(leadData)
  });
  
  return await response.json();
}

export async function fetchLeads(filters = {}) {
  const queryString = new URLSearchParams(filters).toString();
  const url = `${API_BASE_URL}/leads${queryString ? `?${queryString}` : ''}`;
  
  const response = await apiCall(url, {
    headers: getHeaders()
  });
  
  return await response.json();
}

export async function fetchLeadById(leadId) {
  const response = await apiCall(`${API_BASE_URL}/leads/${leadId}`, {
    headers: getHeaders()
  });
  
  return await response.json();
}

export async function updateLead(leadId, leadData) {
  const response = await apiCall(`${API_BASE_URL}/leads/${leadId}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(leadData)
  });
  
  return await response.json();
}

export async function deleteLead(leadId) {
  const response = await apiCall(`${API_BASE_URL}/leads/${leadId}`, {
    method: 'DELETE',
    headers: getHeaders()
  });
  
  return await response.json();
}

// ============= FINANCE =============
export async function fetchUserData() {
  const response = await apiCall(`${FINANCE_BASE_URL}/user-data`, {
    headers: getHeaders()
  });
  
  return await response.json();
}

export async function fetchTransactions(filters = {}) {
  const queryString = new URLSearchParams(filters).toString();
  const url = `${FINANCE_BASE_URL}/transactions${queryString ? `?${queryString}` : ''}`;
  
  const response = await apiCall(url, {
    headers: getHeaders()
  });
  
  return await response.json();
}

export async function createTransaction(transactionData) {
  const response = await apiCall(`${FINANCE_BASE_URL}/transactions`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(transactionData)
  });
  
  return await response.json();
}

export async function updateTransaction(transactionId, transactionData) {
  const response = await apiCall(`${FINANCE_BASE_URL}/transactions/${transactionId}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(transactionData)
  });
  
  return await response.json();
}

export async function deleteTransaction(transactionId) {
  const response = await apiCall(`${FINANCE_BASE_URL}/transactions/${transactionId}`, {
    method: 'DELETE',
    headers: getHeaders()
  });

  return await response.json();
}

// ============= ADDITIONAL FUNCTIONS =============

// More Blog functions
export async function deleteBlogPost(postId) {
  const response = await apiCall(`${API_BASE_URL}/blog/${postId}`, {
    method: 'DELETE',
    headers: getHeaders()
  });

  return await response.json();
}

export async function updateBlogPost(postId, formData) {
  const response = await apiCall(`${API_BASE_URL}/blog/${postId}`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${getAuthToken()}` },
    body: formData
  });

  return await response.json();
}

// More Projects functions
export async function fetchProjectProposals(projectId) {
  const response = await apiCall(`${PROJECTS_BASE_URL}/projects/${projectId}/proposals`);
  return await response.json();
}

export async function updateProposal(proposalId, proposalData) {
  const response = await apiCall(`${PROJECTS_BASE_URL}/proposals/${proposalId}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(proposalData)
  });

  return await response.json();
}

export async function deleteProposal(proposalId) {
  const response = await apiCall(`${PROJECTS_BASE_URL}/proposals/${proposalId}`, {
    method: 'DELETE',
    headers: getHeaders()
  });

  return await response.json();
}

// More Leads functions
export async function updateLeadStatus(leadId, status) {
  const response = await apiCall(`${API_BASE_URL}/leads/${leadId}/status`, {
    method: 'PATCH',
    headers: getHeaders(),
    body: JSON.stringify({ status })
  });

  return await response.json();
}

export async function assignLead(leadId, userId) {
  const response = await apiCall(`${API_BASE_URL}/leads/${leadId}/assign`, {
    method: 'PATCH',
    headers: getHeaders(),
    body: JSON.stringify({ userId })
  });

  return await response.json();
}

export async function addLeadNote(leadId, note) {
  const response = await apiCall(`${API_BASE_URL}/leads/${leadId}/notes`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ note })
  });

  return await response.json();
}

export async function fetchLeadStats(filters = {}) {
  const queryString = new URLSearchParams(filters).toString();
  const url = `${API_BASE_URL}/leads/stats${queryString ? `?${queryString}` : ''}`;

  const response = await apiCall(url, {
    headers: getHeaders()
  });

  return await response.json();
}

// More Finance functions
export async function fetchCategories() {
  const response = await apiCall(`${FINANCE_BASE_URL}/categories`, {
    headers: getHeaders()
  });

  return await response.json();
}

export async function createCategory(categoryData) {
  const response = await apiCall(`${FINANCE_BASE_URL}/categories`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(categoryData)
  });

  return await response.json();
}

export async function fetchReports(params = {}) {
  const queryString = new URLSearchParams(params).toString();
  const url = `${FINANCE_BASE_URL}/reports${queryString ? `?${queryString}` : ''}`;

  const response = await apiCall(url, {
    headers: getHeaders()
  });

  return await response.json();
}

export async function fetchBudget() {
  const response = await apiCall(`${FINANCE_BASE_URL}/budget`, {
    headers: getHeaders()
  });

  return await response.json();
}

export async function updateBudget(budgetData) {
  const response = await apiCall(`${FINANCE_BASE_URL}/budget`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(budgetData)
  });

  return await response.json();
}

// More AI functions
export async function generateProposalText(projectData, customPrompt = '') {
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
}

export async function generateBlogContent(topic, options = {}) {
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
    return {
      title: `Artigo sobre ${topic}`,
      content: response,
      tags: [topic]
    };
  }
}
