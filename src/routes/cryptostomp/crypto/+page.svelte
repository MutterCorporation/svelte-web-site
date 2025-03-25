<svelte:head>
  <title>{blogName} - Tecnologia, Ciências e Música</title>
  <meta name="description" content="Bem-vindo ao {blogName}, onde compartilho minhas experiências e conhecimentos sobre tecnologia, ciência e música.">
  <meta name="keywords" content="Tecnologia, Ciência, Música, Blog, {blogName}, Desenvolvimento, Svelte, JavaScript">
  <meta name="author" content="Maikon Weber">
  <meta property="og:title" content="{blogName} - Tecnologia, Ciência e Música">
  <meta property="og:description" content="Descubra artigos sobre tecnologia, ciência e música no {blogName}.">
  <meta property="og:url" content="https://muttercorp.com.br/blog">
  <meta name="twitter:card" content="summary_large_image">
  <meta property="og:type" content="website">
</svelte:head>

<script>
  import { P } from 'flowbite-svelte';
import { onMount } from 'svelte';
import Canvas from './Canvas.svelte';
import OrderPanels from './OrderPanels.svelte';

  let prediction = $state([]);
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
      }
    } catch (error) {
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

<div class="min-h-screen bg-gradient-to-l from-gray-900 via-black to-gray-900 text-gray-100 p-4 md:p-8">
  <div class="max-w-7xl mx-auto">
    <!-- Header -->
    <header class="mb-12 text-center">
      <h1 class="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-300 drop-shadow-[0_0_15px_rgba(249,115,22,0.5)]">
        Crypto Trading View
      </h1>
      <p class="text-xl text-orange-200/80 mt-4">
        Análise técnica e ordens em tempo real
      </p>
    </header>

    <!-- Banner Binance -->
    <div class="mb-12">
      <a href="https://accounts.binance.com/register?ref=SEU_ID_AQUI" 
         target="_blank"
         class="block relative group overflow-hidden rounded-2xl">
        <div class="relative h-48 overflow-hidden">
          <img
            src="https://public.bnbstatic.com/image/cms/blog/20230613/1c5f7d0c-33e7-4ead-8076-e4c3cd8e4362.png"
            alt="Binance Referral"
            class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          />
          <div class="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent flex items-center p-8">
            <div>
              <h3 class="text-3xl font-bold text-orange-500 mb-2">Trade na Binance</h3>
              <p class="text-xl text-white/90">A maior exchange do mundo</p>
              <button class="mt-4 px-6 py-2 bg-orange-500 hover:bg-orange-600 rounded-lg font-semibold transition-colors">
                Começar Agora
              </button>
            </div>
          </div>
        </div>
      </a>
    </div>

    <!-- Trading View Container -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div class="lg:col-span-2 glass-panel">
        <Canvas />
      </div>
      <div class="glass-panel">
        <OrderPanels />
      </div>
    </div>
  </div>
</div>

<style>
  :global(body) {
    margin: 0;
    font-family: 'Inter', sans-serif;
    background-color: black;
  }

  .glass-panel {
    @apply backdrop-blur-xl bg-gray-800/30 border border-orange-500/20 rounded-2xl p-4 shadow-[0_0_20px_rgba(249,115,22,0.1)];
  }

  @keyframes neon {
    0%, 100% {
      text-shadow: 0 0 10px rgba(249,115,22,0.8),
                   0 0 20px rgba(249,115,22,0.8),
                   0 0 30px rgba(249,115,22,0.8);
    }
    50% {
      text-shadow: 0 0 20px rgba(249,115,22,0.5),
                   0 0 30px rgba(249,115,22,0.5),
                   0 0 40px rgba(249,115,22,0.5);
    }
  }
</style>