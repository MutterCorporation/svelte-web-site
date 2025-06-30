<!-- App.svelte -->
<script>
	import { onMount } from 'svelte';
	import { t } from '../../../lib/i18n/texts.js';

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
		{ id: 'overview', label: t('ADMIN.SIDEBAR.OVERVIEW'), icon: 'trending-up' },
		{ id: 'products', label: t('ADMIN.SIDEBAR.PRODUCTS'), icon: 'shopping-bag' },
		{ id: 'orders', label: t('ADMIN.SIDEBAR.ORDERS'), icon: 'package' },
		{ id: 'shipments', label: t('ADMIN.SIDEBAR.SHIPMENTS'), icon: 'truck' },
		{ id: 'designs', label: t('ADMIN.SIDEBAR.DESIGNS'), icon: 'image' },
		{ id: 'customers', label: t('ADMIN.SIDEBAR.CUSTOMERS'), icon: 'users' },
		{ id: 'finance', label: t('ADMIN.SIDEBAR.FINANCE'), icon: 'dollar-sign' }
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
					<h1 class="text-2xl font-semibold text-gray-900">{t('ADMIN.COMMON.CONTENT_DEVELOPMENT')}</h1>
					<p class="mt-4 text-gray-500">{t('ADMIN.COMMON.CONTENT_DEVELOPMENT_TEXT')}</p>
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
