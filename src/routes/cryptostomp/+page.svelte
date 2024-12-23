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

  let prediction = {"decision":"neutro","prediction":"NaN","statistics":{"rsi":43,"stochasticK":20,"momentum":null,"macd":{"value":905,"vies":"Viés de Baixa"},"adx":31,"ao":null,"williams":null,"mme10":98.102,"mme50":92.474,"mme20":98.25,"sma100":79.216}}

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


  
  async function fetchStatist(page = 1, size = 100) {
    try {
      const token = localStorage.getItem('MutterCorp');
      const res = await fetch(`https://dev.muttercorp.com.br/investing-new/static/prevision`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (res.ok) {
        const data = await res.json();
        prediction = data;
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
    fetchStatist()
  });

  function goToPost(postId) {
    window.location.href = `/cryptostomp/${postId}`;
  }
</script>

<div class="min-h-screen bg-gradient-to-l from-blue-700 via-blue-500 to-blue-900 text-gray-100">
  <div class="max-w-4xl mx-auto py-10 px-5">
    <header class="text-center mb-8">
      <h1 class="text-4xl font-bold mb-3 text-white drop-shadow-lg">{blogName}</h1>
      <p class="text-lg text-gray-200"> Noticias sobre finanças e investimentos e sinais de trades .</p>
    </header>

    <div>
      <div class="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 class="text-2xl font-bold mb-4 text-gray-800">Prediction - BTCUSD </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p class="text-gray-600"><strong>Decision:</strong> {prediction.decision}</p>
            <p class="text-gray-600"><strong>Prediction:</strong> {prediction.prediction}</p>
          </div>
          <div>
            <p class="text-gray-600"><strong>RSI:</strong> {prediction.statistics.rsi}</p>
            <p class="text-gray-600"><strong>Stochastic K:</strong> {prediction.statistics.stochasticK}</p>
            <p class="text-gray-600"><strong>Momentum:</strong> {prediction.statistics.momentum}</p>
            <p class="text-gray-600"><strong>MACD:</strong> {prediction.statistics.macd.value} ({prediction.statistics.macd.vies})</p>
            <p class="text-gray-600"><strong>ADX:</strong> {prediction.statistics.adx}</p>
            <p class="text-gray-600"><strong>AO:</strong> {prediction.statistics.ao}</p>
            <p class="text-gray-600"><strong>Williams:</strong> {prediction.statistics.williams}</p>
            <p class="text-gray-600"><strong>MME10:</strong> {prediction.statistics.mme10}</p>
            <p class="text-gray-600"><strong>MME50:</strong> {prediction.statistics.mme50}</p>
            <p class="text-gray-600"><strong>MME20:</strong> {prediction.statistics.mme20}</p>
            <p class="text-gray-600"><strong>SMA100:</strong> {prediction.statistics.sma100}</p>
          </div>
        </div>
      </div>

    </div>
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