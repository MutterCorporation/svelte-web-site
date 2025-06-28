// Finance service
import { getAuthHeaders } from './api.js';

const FINANCE_BASE_URL = 'https://api.example.com/finance'; // Update with actual API URL

/**
 * Fetches user financial data
 * @returns {Promise<Object>} User financial data
 */
export async function fetchUserData() {
  try {
    const response = await fetch(`${FINANCE_BASE_URL}/user-data`, {
      headers: getAuthHeaders()
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw new Error('Failed to fetch user data');
  }
}

/**
 * Fetches all transactions with optional filtering
 * @param {Object} filters - Filter parameters (date, category, type, etc.)
 * @returns {Promise<Array>} Array of transactions
 */
export async function fetchTransactions(filters = {}) {
  try {
    const queryString = new URLSearchParams(filters).toString();
    const url = `${FINANCE_BASE_URL}/transactions${queryString ? `?${queryString}` : ''}`;
    
    const response = await fetch(url, {
      headers: getAuthHeaders()
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch transactions');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw new Error('Failed to fetch transactions');
  }
}

/**
 * Creates a new transaction
 * @param {Object} transactionData - Transaction data
 * @returns {Promise<Object>} Created transaction
 */
export async function createTransaction(transactionData) {
  try {
    const response = await fetch(`${FINANCE_BASE_URL}/transactions`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(transactionData)
    });
    
    if (!response.ok) {
      throw new Error('Failed to create transaction');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error creating transaction:', error);
    throw new Error('Failed to create transaction');
  }
}

/**
 * Updates an existing transaction
 * @param {string} transactionId - Transaction ID
 * @param {Object} transactionData - Updated transaction data
 * @returns {Promise<Object>} Updated transaction
 */
export async function updateTransaction(transactionId, transactionData) {
  try {
    const response = await fetch(`${FINANCE_BASE_URL}/transactions/${transactionId}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(transactionData)
    });
    
    if (!response.ok) {
      throw new Error('Failed to update transaction');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error updating transaction:', error);
    throw new Error('Failed to update transaction');
  }
}

/**
 * Deletes a transaction
 * @param {string} transactionId - Transaction ID
 * @returns {Promise<Object>} API response
 */
export async function deleteTransaction(transactionId) {
  try {
    const response = await fetch(`${FINANCE_BASE_URL}/transactions/${transactionId}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete transaction');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error deleting transaction:', error);
    throw new Error('Failed to delete transaction');
  }
}

/**
 * Fetches financial categories
 * @returns {Promise<Array>} Array of categories
 */
export async function fetchCategories() {
  try {
    const response = await fetch(`${FINANCE_BASE_URL}/categories`, {
      headers: getAuthHeaders()
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw new Error('Failed to fetch categories');
  }
}

/**
 * Creates a new category
 * @param {Object} categoryData - Category data
 * @returns {Promise<Object>} Created category
 */
export async function createCategory(categoryData) {
  try {
    const response = await fetch(`${FINANCE_BASE_URL}/categories`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(categoryData)
    });
    
    if (!response.ok) {
      throw new Error('Failed to create category');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error creating category:', error);
    throw new Error('Failed to create category');
  }
}

/**
 * Fetches financial reports
 * @param {Object} params - Report parameters (period, type, etc.)
 * @returns {Promise<Object>} Financial reports data
 */
export async function fetchReports(params = {}) {
  try {
    const queryString = new URLSearchParams(params).toString();
    const url = `${FINANCE_BASE_URL}/reports${queryString ? `?${queryString}` : ''}`;
    
    const response = await fetch(url, {
      headers: getAuthHeaders()
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch reports');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching reports:', error);
    throw new Error('Failed to fetch reports');
  }
}

/**
 * Fetches budget information
 * @returns {Promise<Object>} Budget data
 */
export async function fetchBudget() {
  try {
    const response = await fetch(`${FINANCE_BASE_URL}/budget`, {
      headers: getAuthHeaders()
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch budget');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching budget:', error);
    throw new Error('Failed to fetch budget');
  }
}

/**
 * Updates budget settings
 * @param {Object} budgetData - Budget configuration
 * @returns {Promise<Object>} Updated budget
 */
export async function updateBudget(budgetData) {
  try {
    const response = await fetch(`${FINANCE_BASE_URL}/budget`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(budgetData)
    });
    
    if (!response.ok) {
      throw new Error('Failed to update budget');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error updating budget:', error);
    throw new Error('Failed to update budget');
  }
}

/**
 * Fetches financial goals
 * @returns {Promise<Array>} Array of financial goals
 */
export async function fetchGoals() {
  try {
    const response = await fetch(`${FINANCE_BASE_URL}/goals`, {
      headers: getAuthHeaders()
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch goals');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching goals:', error);
    throw new Error('Failed to fetch goals');
  }
}

/**
 * Creates a new financial goal
 * @param {Object} goalData - Goal data
 * @returns {Promise<Object>} Created goal
 */
export async function createGoal(goalData) {
  try {
    const response = await fetch(`${FINANCE_BASE_URL}/goals`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(goalData)
    });
    
    if (!response.ok) {
      throw new Error('Failed to create goal');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error creating goal:', error);
    throw new Error('Failed to create goal');
  }
}
