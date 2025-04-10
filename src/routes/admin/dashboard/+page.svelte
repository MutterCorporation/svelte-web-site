<!-- App.svelte -->
<script>
	import { onMount } from 'svelte';

	// Componentes
	import Navbar from './components/navbar.svelte';
	import Sidebar from './components/sidebar.svelte';
	import Overview from './components/overview.svelte';
	import Shipments from './components/shipments.svelte';
	import ProductsTab from './components/producttab.svelte';

	// Estado do componente
	let activeTab = 'overview';

	// Função para mudar a tab ativa
	/**
	 * @param {string} tabName
	 */
	function handleTabChange(tabName) {
		activeTab = tabName;
	}

	// Itens do menu principal
	const menuItems = [
		{ id: 'overview', label: 'Visão Geral', icon: 'trending-up' },
		{ id: 'products', label: 'Produtos', icon: 'shopping-bag' },
		{ id: 'orders', label: 'Pedidos', icon: 'package' },
		{ id: 'shipments', label: 'Envios', icon: 'truck' },
		{ id: 'designs', label: 'Estampas', icon: 'image' },
		{ id: 'customers', label: 'Clientes', icon: 'users' },
		{ id: 'finance', label: 'Financeiro', icon: 'dollar-sign' }
	];
</script>

<div class="min-h-screen bg-gray-100">
	<!-- Navbar -->
	<Navbar />

	<div class="flex">
		<!-- Sidebar -->
		<Sidebar {activeTab} {menuItems} onTabChange={handleTabChange} />

		<!-- Main Content -->
		<div class="flex-1 p-6">
			{#if activeTab === 'overview'}
				<Overview />
			{:else if activeTab === 'shipments'}
				<Shipments />
			{:else if activeTab === 'products' || activeTab === 'designs'}
				<ProductsTab />
			{:else}
				<div class="overflow-hidden bg-white p-6 shadow sm:rounded-lg">
					<h1 class="text-2xl font-semibold text-gray-900">Conteúdo em Desenvolvimento</h1>
					<p class="mt-4 text-gray-500">Esta seção está em desenvolvimento.</p>
				</div>
			{/if}
		</div>
	</div>
</div>

<style>
	:global(body) {
		margin: 0;
		font-family: 'Inter', sans-serif;
	}
</style>
