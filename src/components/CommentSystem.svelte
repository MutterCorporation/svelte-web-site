<script>
  import { onMount } from 'svelte';
  import { fly } from 'svelte/transition';

  let { postId } = $props();
  
  /**
	 * @type {string | any[]}
	 */
  let comments = $state([]);
  let newComment = $state({ name: '', email: '', content: '' });
  let isLoading = $state(false);
  let isSubmitting = $state(false);
  let showCommentForm = $state(false);

  async function fetchComments() {
    isLoading = true;
    try {
      const response = await fetch(`https://dev.muttercorp.com.br/blog/${postId}/comments`);
      if (response.ok) {
        comments = await response.json();
      }
    } catch (error) {
      console.error('Erro ao carregar comentários:', error);
    } finally {
      isLoading = false;
    }
  }

  async function submitComment() {
    if (!newComment.content.trim()) return;
    
    isSubmitting = true;
    try {
      const response = await fetch(`https://dev.muttercorp.com.br/blog/${postId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: newComment.name || 'Anônimo',
          email: newComment.email,
          content: newComment.content
        })
      });

      if (response.ok) {
        const comment = await response.json();
        comments = [...comments, comment];
        newComment = { name: '', email: '', content: '' };
        showCommentForm = false;
      }
    } catch (error) {
      console.error('Erro ao enviar comentário:', error);
    } finally {
      isSubmitting = false;
    }
  }

  function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  onMount(fetchComments);
</script>

<section class="comments-section">
  <div class="comments-header">
    <h3 class="comments-title">
      💬 Comentários ({comments.length})
    </h3>
    <button 
      class="cyber-button add-comment-btn" 
      onclick={() => showCommentForm = !showCommentForm}
    >
      {showCommentForm ? 'Cancelar' : 'Adicionar Comentário'}
    </button>
  </div>

  {#if showCommentForm}
    <div class="comment-form" in:fly="{{ y: -20, duration: 300 }}">
      <div class="form-group">
        <input 
          type="text" 
          placeholder="Nome (opcional)" 
          bind:value={newComment.name}
          class="cyber-input"
        />
      </div>
      <div class="form-group">
        <input 
          type="email" 
          placeholder="Email (opcional)" 
          bind:value={newComment.email}
          class="cyber-input"
        />
      </div>
      <div class="form-group">
        <textarea 
          placeholder="Escreva seu comentário..." 
          bind:value={newComment.content}
          class="cyber-textarea"
          rows="4"
        ></textarea>
      </div>
      <div class="form-actions">
        <button 
          class="cyber-button submit-btn" 
          onclick={submitComment}
          disabled={isSubmitting || !newComment.content.trim()}
        >
          {isSubmitting ? 'Enviando...' : 'Enviar Comentário'}
        </button>
      </div>
    </div>
  {/if}

  <div class="comments-list">
    {#if isLoading}
      <div class="loading-comments">
        <div class="cyber-spinner"></div>
        <p>Carregando comentários...</p>
      </div>
    {:else if comments.length === 0}
      <div class="no-comments">
        <p>Seja o primeiro a comentar! 🚀</p>
      </div>
    {:else}
      {#each comments as comment}
        <div class="comment-card" in:fly="{{ y: 20, duration: 400 }}">
          <div class="comment-header">
            <div class="comment-author">
              <span class="author-name">{comment.name || 'Anônimo'}</span>
              <span class="comment-date">{formatDate(comment.created_at)}</span>
            </div>
          </div>
          <div class="comment-content">
            {comment.content}
          </div>
        </div>
      {/each}
    {/if}
  </div>
</section>

<style>
  .comments-section {
    margin-top: 3rem;
    padding: 2rem;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    backdrop-filter: blur(10px);
  }

  .comments-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .comments-title {
    font-size: 1.5rem;
    color: #00f6ff;
    text-shadow: 0 0 5px #00f6ff;
    margin: 0;
  }

  .add-comment-btn {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }

  .comment-form {
    background: rgba(0, 0, 0, 0.3);
    padding: 1.5rem;
    border-radius: 8px;
    margin-bottom: 2rem;
    border: 1px solid rgba(255, 0, 234, 0.2);
  }

  .form-group {
    margin-bottom: 1rem;
  }

  .cyber-input, .cyber-textarea {
    width: 100%;
    padding: 0.8rem;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 5px;
    color: #fff;
    font-family: 'Orbitron', sans-serif;
    transition: border-color 0.3s, box-shadow 0.3s;
  }

  .cyber-input:focus, .cyber-textarea:focus {
    outline: none;
    border-color: #00f6ff;
    box-shadow: 0 0 10px rgba(0, 246, 255, 0.3);
  }

  .cyber-textarea {
    resize: vertical;
    min-height: 100px;
  }

  .form-actions {
    display: flex;
    justify-content: flex-end;
  }

  .submit-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .comments-list {
    space-y: 1rem;
  }

  .comment-card {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    padding: 1.5rem;
    margin-bottom: 1rem;
    transition: transform 0.2s, border-color 0.2s;
  }

  .comment-card:hover {
    transform: translateY(-2px);
    border-color: rgba(255, 0, 234, 0.3);
  }

  .comment-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .comment-author {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .author-name {
    color: #ff00ea;
    font-weight: bold;
    text-shadow: 0 0 3px #ff00ea;
  }

  .comment-date {
    color: #888;
    font-size: 0.8rem;
  }

  .comment-content {
    color: #e0e0e0;
    line-height: 1.6;
    word-wrap: break-word;
  }

  .loading-comments, .no-comments {
    text-align: center;
    padding: 2rem;
    color: #888;
  }

  .cyber-spinner {
    width: 30px;
    height: 30px;
    border: 2px solid #ff00ea;
    border-top-color: #00f6ff;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto 1rem;
  }

  .cyber-button {
    position: relative;
    padding: 0.7rem 1.2rem;
    background: linear-gradient(45deg, #ff00ea, #00f6ff);
    border: none;
    border-radius: 5px;
    color: #fff;
    text-decoration: none;
    font-weight: bold;
    overflow: hidden;
    display: inline-block;
    font-family: 'Orbitron', sans-serif;
    transition: transform 0.2s;
    cursor: pointer;
  }

  .cyber-button:hover {
    transform: translateY(-2px);
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  @media (max-width: 768px) {
    .comments-section {
      padding: 1rem;
    }

    .comments-header {
      flex-direction: column;
      align-items: stretch;
    }

    .comment-form {
      padding: 1rem;
    }

    .comment-card {
      padding: 1rem;
    }
  }
</style> 