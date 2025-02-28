<svelte:head>
  <title>Finance Table - Controle suas finanças de forma fácil</title>
  <meta name="description" content="Gerencie suas finanças com facilidade e tenha controle total sobre seus gastos e receitas. Acompanhe sua evolução financeira com gráficos e relatórios detalhados.">
  <meta name="keywords" content="finanças, orçamento, controle financeiro, despesas, receitas, planejamento financeiro, investimentos">
  <meta name="author" content="Maikon Weber">
  
  <!-- Open Graph Meta Tags -->
  <meta property="og:title" content="Finance Table - Seu Gerenciador Financeiro Inteligente">
  <meta property="og:description" content="Organize seu orçamento e tome decisões financeiras melhores. Experimente agora!">
  <meta property="og:url" content="https://seusite.com/">
  <meta property="og:type" content="website">
  <meta property="og:image" content="https://seusite.com/imagem-preview.png">
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Finance Table - Gerenciamento Financeiro Simplificado">
  <meta name="twitter:description" content="Planeje suas finanças e tenha mais controle sobre seu dinheiro.">
  <meta name="twitter:image" content="https://seusite.com/imagem-preview.png">
</svelte:head>

<!-- src/routes/+page.svelte -->
<script>
// @ts-nocheck
	import Header from './components/Header.svelte';
  import { onMount } from "svelte";
  let showModal = false;

  function toggleModal() {
    showModal = !showModal;
  }
  
  </script>

  <main class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
  <!-- Hero Section -->
  <section class="text-center p-10">
    <h1 class="text-4xl font-bold text-gray-800 mb-4">Finance Table</h1>
    <p class="text-lg text-gray-600">Gerencie suas finanças de forma simples e inteligente.</p>
    <a 
      class="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      href='/finance-table/dashboard'
      >
      Experimente Agora
  </a>
  </section>

  <!-- Features Section -->
  <section class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mt-10">
    <div class="p-6 bg-white shadow-lg rounded-lg text-center">
      <h2 class="text-xl font-semibold text-gray-800">Controle de Gastos</h2>
      <p class="text-gray-600 mt-2">Registre e categorize seus gastos facilmente.</p>
    </div>
    <div class="p-6 bg-white shadow-lg rounded-lg text-center">
      <h2 class="text-xl font-semibold text-gray-800">Relatórios e Gráficos</h2>
      <p class="text-gray-600 mt-2">Visualize sua evolução financeira com gráficos interativos.</p>
    </div>
    <div class="p-6 bg-white shadow-lg rounded-lg text-center">
      <h2 class="text-xl font-semibold text-gray-800">Segurança e Privacidade</h2>
      <p class="text-gray-600 mt-2">Seus dados protegidos com criptografia avançada.</p>
    </div>
  </section>

  <!-- Modal de Experiência -->
  {#if showModal}
    <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white p-6 rounded-lg shadow-lg">
        <h2 class="text-xl font-bold text-gray-800">Teste Grátis</h2>
        <p class="text-gray-600 mt-2">Cadastre-se e experimente grátis por 30 dias.</p>
        <button 
          class="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          on:click={toggleModal}
        >
          Fechar
        </button>
      </div>
    </div>
  {/if}
</main>

<style>
  main {
    font-family: 'Inter', sans-serif;
  }
</style>