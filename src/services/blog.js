// Blog service
import { apiRequest, getAuthHeaders, getAuthToken } from './api.js';

/**
 * Fetches Google Trends data
 * @returns {Promise<Array>} Array of trending search queries
 */
export async function fetchGoogleTrends() {
  try {
    const res = await fetch('https://dev.muttercorp.com/trends/api/dailytrends?hl=pt-BR&tz=-180&geo=BR&ns=15');
    let text = await res.text();
    text = text.replace(")]}',", '');
    const data = JSON.parse(text);
    return data.default.trendingSearchesDays[0].trendingSearches.map(item => item.title.query);
  } catch (error) {
    console.error('Error fetching Google Trends:', error);
    throw new Error('Failed to fetch Google Trends');
  }
}

/**
 * Converts markdown text to HTML using GitHub API
 * @param {string} markdown - Markdown text to convert
 * @returns {Promise<string>} HTML content
 */
export async function convertMarkdownToHtml(markdown) {
  try {
    const response = await fetch('https://api.github.com/markdown', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text: markdown, mode: 'gfm' })
    });
    
    if (!response.ok) {
      throw new Error('Failed to convert markdown');
    }
    
    return await response.text();
  } catch (error) {
    console.error('Error converting markdown:', error);
    throw new Error('Failed to convert markdown to HTML');
  }
}

/**
 * Submits a blog post
 * @param {FormData} formData - Blog post form data
 * @returns {Promise<Object>} API response
 */
export async function submitBlogPost(formData) {
  try {
    const response = await fetch('https://dev.muttercorp.com.br/blog', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${getAuthToken()}`
      },
      body: formData
    });
    
    if (!response.ok) {
      throw new Error('Failed to submit blog post');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error submitting blog post:', error);
    throw new Error('Failed to submit blog post');
  }
}

/**
 * Submits a tweet post
 * @param {string} tweetText - Tweet content
 * @param {Object} options - Additional options for the tweet
 * @returns {Promise<Object>} API response
 */
export async function submitTweetPost(tweetText, options = {}) {
  try {
    const payload = {
      text: tweetText,
      options: {
        cmd: "string",
        only_save: true,
        ia: true,
        ...options
      }
    };

    const response = await fetch('https://dev.muttercorp.com.br/blog/twitter', {
      method: 'POST',
      headers: {
        'accept': '*/*',
        'Authorization': `Bearer ${getAuthToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    
    if (!response.ok) {
      throw new Error('Failed to submit tweet');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error submitting tweet:', error);
    throw new Error('Failed to submit tweet');
  }
}

/**
 * Fetches a blog post by slug
 * @param {string} slug - Blog post slug
 * @returns {Promise<Object>} Blog post data
 */
export async function fetchPostData(slug) {
  try {
    const response = await fetch(`https://dev.muttercorp.com.br/blog/${slug}`);
    
    if (!response.ok) {
      throw new Error('Post not found');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching post data:', error);
    throw new Error('Failed to fetch post data');
  }
}

/**
 * Fetches all blog posts
 * @param {Object} params - Query parameters (page, limit, etc.)
 * @returns {Promise<Object>} Blog posts data
 */
export async function fetchBlogPosts(params = {}) {
  try {
    const queryString = new URLSearchParams(params).toString();
    const url = `https://dev.muttercorp.com.br/blog${queryString ? `?${queryString}` : ''}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Failed to fetch blog posts');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    throw new Error('Failed to fetch blog posts');
  }
}

/**
 * Deletes a blog post
 * @param {string} postId - Blog post ID
 * @returns {Promise<Object>} API response
 */
export async function deleteBlogPost(postId) {
  try {
    const response = await fetch(`https://dev.muttercorp.com.br/blog/${postId}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete blog post');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error deleting blog post:', error);
    throw new Error('Failed to delete blog post');
  }
}

/**
 * Updates a blog post
 * @param {string} postId - Blog post ID
 * @param {FormData} formData - Updated blog post data
 * @returns {Promise<Object>} API response
 */
export async function updateBlogPost(postId, formData) {
  try {
    const response = await fetch(`https://dev.muttercorp.com.br/blog/${postId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${getAuthToken()}`
      },
      body: formData
    });
    
    if (!response.ok) {
      throw new Error('Failed to update blog post');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error updating blog post:', error);
    throw new Error('Failed to update blog post');
  }
}
