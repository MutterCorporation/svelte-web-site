<script>
  import { onMount } from 'svelte';
  import Header from '../components/Header.svelte';
  
  let transactions = [
    { id: 1, description: 'Salário', amount: 5000, type: 'income', category: 'Salário', date: '2025-02-15', isPaid: true },
    { id: 2, description: 'Aluguel', amount: 1200, type: 'expense', category: 'Moradia', date: '2025-02-05', isPaid: false },
    { id: 3, description: 'Supermercado', amount: 450, type: 'expense', category: 'Alimentação', date: '2025-02-10', isPaid: false }
  ];
</script>

<svelte:head>
	<title>Configurações | Finance Table</title>
	<meta name="description" content="Gerencie suas configurações e preferências no Finance Table" />
	<meta name="keywords" content="Configurações, Finance Table, Preferências, Gerenciamento de Conta" />
	<meta name="author" content="MutterCorp" />
	<meta property="og:title" content="Configurações | Finance Table" />
	<meta property="og:description" content="Gerencie suas configurações e preferências no Finance Table" />
	<meta property="og:url" content="https://muttercorp.com.br/finance-table/settings" />
	<meta property="og:type" content="website" />
	<meta name="twitter:card" content="summary" />
</svelte:head>

<Header />
<main class="p-6 bg-gray-100 min-h-screen">
  <h1 class="text-3xl font-bold mb-4">Configurações</h1>
  
  <section class="bg-white p-6 shadow rounded-lg mb-6">
    <h2 class="text-xl font-bold mb-4">Gerenciamento da Conta</h2>
    <button class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Excluir Conta</button>
  </section>

  <section class="bg-white p-6 shadow rounded-lg mb-6">
    <h2 class="text-xl font-bold mb-4">Gerenciar Dados</h2>
    <button class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Excluir Todos os Dados</button>
  </section>

  <section class="bg-white p-6 shadow rounded-lg">
    <h2 class="text-xl font-bold mb-4">Plano de Assinatura</h2>
    <p class="mb-4">Plano atual: <strong>Gratuito</strong></p>
    <button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Migrar para Premium</button>
  </section>
</main>
