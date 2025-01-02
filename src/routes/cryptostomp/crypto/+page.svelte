<svelte:head>
  <!-- Título e descrição -->
  <title>Ebook Ereção Duradoura - Seu Guia Completo para Controle e Potência</title>
  <meta name="description" content="Descubra o guia definitivo para melhorar o controle, potência e saúde sexual com o Ebook Ereção Duradoura. Transforme sua vida com técnicas comprovadas.">

  <!-- Palavras-chave -->
  <meta name="keywords" content="Ereção Duradoura, Saúde Sexual, Ebook, Potência Masculina, Controle Muscular, Assoalho Pélvico, Técnicas de Respiração, Vida Saudável">

  <!-- Informações do autor -->
  <meta name="author" content="Maikon Weber">

  <!-- Viewport para design responsivo -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- Open Graph (Facebook e redes sociais) -->
  <meta property="og:title" content="Ebook Ereção Duradoura - Seu Guia Completo para Controle e Potência">
  <meta property="og:description" content="Transforme sua vida sexual com o Ebook Ereção Duradoura. Aprenda técnicas comprovadas de controle e potência.">
  <meta property="og:url" content="https://dev.muttercorp.com.br/erecao-duradoura">
  <meta property="og:image" content="https://dev.muttercorp.com.br/erecao-duradoura/ebook-cover.jpg">
  <meta property="og:type" content="website">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Ebook Ereção Duradoura - Controle e Potência Masculina">
  <meta name="twitter:description" content="Aprenda as melhores técnicas para melhorar seu desempenho com o Ebook Ereção Duradoura.">
  <meta name="twitter:image" content="https://dev.muttercorp.com.br/erecao-duradoura/ebook-cover.jpg">

  <!-- Favicon -->
  <link rel="icon" href="/favicon.ico" type="image/x-icon">

  <!-- CSS básico -->
  <link rel="stylesheet" href="/styles.css">

  <!-- Estrutura de dados JSON-LD (Rich Snippets) -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Book",
    "name": "Ebook Ereção Duradoura",
    "url": "https://dev.muttercorp.com.br/erecao-duradoura",
    "description": "Descubra como melhorar sua saúde sexual e controle com o Ebook Ereção Duradoura.",
    "author": {
      "@type": "Person",
      "name": "Maikon Weber"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Mutter Corp",
      "logo": {
        "@type": "ImageObject",
        "url": "https://dev.muttercorp.com.br/logo.png"
      }
    },
    "image": "https://dev.muttercorp.com.br/erecao-duradoura/ebook-cover.jpg"
  }
  </script>

  <!-- Manifesto para PWA -->
  <link rel="manifest" href="/manifest.json">
</svelte:head>

<script>
  import { P } from 'flowbite-svelte';
import { onMount } from 'svelte';

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

<div class="min-h-screen bg-gradient-to-l from-blue-700 via-blue-500 to-blue-900 text-gray-100">
  <div class="max-w-4xl mx-auto py-10 px-5">
    <header class="text-center mb-8">
      <h1 class="text-4xl font-bold mb-3 text-white drop-shadow-lg">{blogName}</h1>
      <p class="text-lg text-gray-200"> Noticias sobre finanças e investimentos e sinais de trades .</p>
    </header>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      {#each prediction as value}
        <div 
          class="bg-white rounded-lg shadow-md p-6 mb-6 relative group hover:z-10"
        >
          <h2 class="text-2xl font-bold mb-4 text-gray-800">{value.signal}</h2>
          <div class='flex'>
            <p class="text-gray-600 mb-4">{value.lastPrice}</p>
            <span class="text-gray-600 ml-4">{value.change}</span>
          </div>
          
          <!-- Informações de statistics exibidas ao hover -->
          <div 
            class="grid grid-cols-1 md:grid-cols-2 gap-4 absolute top-full left-0 w-full bg-white rounded-lg shadow-md p-4 opacity-0 transition-opacity duration-200 ease-in-out group-hover:opacity-100 max-h-60 overflow-y-auto"
          >
            {#each Object.entries(value.statistics) as [key, val]}
              <div class="bg-gray-50 p-4 rounded-md shadow">
                <h2 class="font-bold text-gray-700 mb-2">{key}</h2>
                <p class="text-gray-600">{val}</p>
              </div>
            {/each}
          </div>
        </div>
      {/each}
    </div>
    
    <style>
      /* Garante que a seção de detalhes de statistics esteja oculta fora do hover */
      .group-hover\:opacity-100:hover .opacity-0 {
        opacity: 1;
      }
    </style>
    
    </div>
</div>

<style>
  :global(body) {
    margin: 0;
    font-family: 'Inter', sans-serif;
  }
</style>