<script>
  import { onMount } from 'svelte';
  
  let { postId } = $props();
  
  let views = $state(0);
  let isLoading = $state(true);

  async function incrementView() {
    try {
      const response = await fetch(`https://dev.muttercorp.com.br/blog/${postId}/view`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        views = data.views || views + 1;
      }
    } catch (error) {
      console.error('Erro ao incrementar visualização:', error);
    }
  }

  async function fetchViews() {
    try {
      const response = await fetch(`https://dev.muttercorp.com.br/blog/${postId}/views`);
      if (response.ok) {
        const data = await response.json();
        views = data.views || 0;
      }
    } catch (error) {
      console.error('Erro ao buscar visualizações:', error);
      views = 0;
    } finally {
      isLoading = false;
    }
  }

  /**
	 * @param {number} count
	 */
  function formatViews(count) {
    if (count >= 1000000) {
      return (count / 1000000).toFixed(1) + 'M';
    } else if (count >= 1000) {
      return (count / 1000).toFixed(1) + 'K';
    }
    return count.toString();
  }

  onMount(async () => {
    await fetchViews();
    await incrementView();
  });
</script>

<div class="view-counter">
  <div class="view-icon">👁️</div>
  <span class="view-count">
    {#if isLoading}
      <span class="loading-dots">...</span>
    {:else}
      {formatViews(views)} visualizações
    {/if}
  </span>
</div>

<style>
  .view-counter {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #00f6ff;
    font-size: 0.9rem;
    text-shadow: 0 0 3px #00f6ff;
  }

  .view-icon {
    font-size: 1.1rem;
    filter: drop-shadow(0 0 3px #00f6ff);
  }

  .view-count {
    font-family: 'Orbitron', sans-serif;
    font-weight: 500;
  }

  .loading-dots {
    animation: pulse 1.5s infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
</style> 