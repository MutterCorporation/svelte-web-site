<svelte:head>
  <title>{blogName} - Tecnologia, Ciências e Música</title>
  <meta name="description" content="Bem-vindo ao {blogName}, onde compartilho minhas experiências e conhecimentos sobre tecnologia, ciência e música.">
  <meta name="keywords" content="Tecnologia, Ciência, Música, Blog, {blogName}, Desenvolvimento, Svelte, JavaScript">
  <meta name="author" content="Maikon Weber">
  <meta property="og:title" content="{blogName} - Tecnologia, Ciência e Música">
  <meta property="og:description" content="Descubra artigos sobre tecnologia, ciência e música no {blogName}.">
  <meta property="og:url" content="https://dev.muttercorp.com.br/blog">
  <meta name="twitter:card" content="summary_large_image">
  <meta property="og:type" content="website">
</svelte:head>

<script>
  import { onMount } from 'svelte';

  let posts = $state([]);
  let blogName = 'Investing Notices';
  let hasError = $state(false);

  export function load() {
    const token = localStorage.getItem('MutterCorp');
    const isAuthenticated = !!token;

    return {
      isAuthenticated
    };
  }

  async function fetchPosts(page = 1, size = 100) {
    try {
      const token = localStorage.getItem('MutterCorp');
      const res = await fetch(`https://dev.muttercorp.com.br/investing-new?page=${page}&pageSize=${size}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (res.ok) {
        const data = await res.json();
        posts = data;
      } else {
        if (res.status === 403 || res.status === 401) {
          localStorage.removeItem('MutterCorp');
          window.location.href = '/login';
        } else if (res.status === 500) {
          hasError = true;
        }
        console.error('Failed to fetch posts');
      }
    } catch (error) {
      console.error('Error:', error);
      hasError = true;
    }
  }

  onMount(() => {
    fetchPosts();
  });

  function goToPost(postId) {
    window.location.href = `/cryptostomp/${postId}`;
  }
</script>

<div class="min-h-screen bg-gradient-to-b from-blue-900 via-blue-700 to-blue-500 text-gray-100">
  <div class="max-w-4xl mx-auto py-10 px-5">
    <header class="text-center mb-8">
      <h1 class="text-4xl font-bold mb-3 text-white drop-shadow-lg">{blogName}</h1>
      <p class="text-lg text-gray-200">Bem-vindo ao meu blog! Aqui, compartilho minhas experiências e conhecimentos sobre tecnologia, ciência e música.</p>
    </header>

    {#if hasError}
      <p class="text-center text-red-500">Desculpe, este blog não existe ou está temporariamente indisponível.</p>
    {:else if posts.length > 0}
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        {#each posts as post (post.id)}
          <div class="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow" onclick={() => goToPost(post.id)}>
            <div class="p-4">
              <h2 class="text-xl font-semibold text-gray-800 mb-2">{post.title}</h2>
              <p class="text-gray-600 mb-4">
                {post.modifiedText && post.modifiedText.length > 100
                  ? post.modifiedText.substring(0, 100) + "..."
                  : post.modifiedText}
              </p>
              <p class="text-sm text-gray-500">Publicado em: {post.createdAt}</p>
            </div>
          </div>
        {/each}
      </div>
    {:else}
      <p class="text-center text-gray-200">Nenhum post disponível.</p>
    {/if}
  </div>
</div>

<style>
  :global(body) {
    margin: 0;
    font-family: 'Inter', sans-serif;
  }
</style>