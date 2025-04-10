<!-- components/ProductsTab.svelte -->
<script>
	import { onMount } from 'svelte';
	import ProductsManager from './productmanager.svelte';

	// Estado para controle de carregamento
	let isLoading = true;

	onMount(() => {
		// Simular carregamento
		setTimeout(() => {
			isLoading = false;
		}, 800);
	});
</script>

<div class="py-6">
	{#if isLoading}
		<div class="flex h-64 items-center justify-center">
			<div
				class="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-indigo-500"
			></div>
		</div>
	{:else}
		<ProductsManager />
	{/if}
</div>
