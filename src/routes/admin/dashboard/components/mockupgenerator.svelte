<!-- components/MockupGenerator.svelte -->
<script>
// @ts-nocheck

	import { createEventDispatcher, onMount } from 'svelte';

	// Props
	/**
	 * @type {{ id: any; name: any; tags: any; } | null}
	 */
	export let design = null;
	/**
	 * @type {{ id: any; name: any; basePrice: number; } | null}
	 */
	export let product = null;
	export let colors = ['white', 'black', 'navy'];

	// Dispatch eventos
	const dispatch = createEventDispatcher();

	// Estado do componente
	let currentColor = colors[0];
	let isGenerating = false;
	/**
	 * @type {{ imageUrl: any; id?: string; productId?: any; designId?: any; color?: string; timestamp?: string; } | null}
	 */
	let generatedMockup = null;
	/**
	 * @type {string | null}
	 */
	let error = null;

	const colorHexMap = {
		white: '#FFFFFF',
		black: '#000000',
		navy: '#000080',
		gray: '#808080',
		red: '#FF0000'
	};

	// Gerar mockup quando o componente é montado
	onMount(() => {
		if (design && product) {
			generateMockup();
		}
	});

	// Função para gerar mockup (simulação síncrona)
	function generateMockup() {
		if (!design || !product) {
			error = 'Design ou produto não disponível';
			return;
		}

		error = null;
		isGenerating = true;
		generatedMockup = null;

		// Simulação de processamento - normalmente seria assíncrono
		// com uma chamada a uma API de geração de mockups
		setTimeout(() => {
			try {
				// Simular geração bem-sucedida
				generatedMockup = {
					id: `mock-${Math.floor(Math.random() * 10000)}`,
					productId: product.id,
					designId: design.id,
					color: currentColor,
					timestamp: new Date().toISOString(),
					imageUrl: '/api/placeholder/600/800'
				};

				isGenerating = false;
				dispatch('generated', generatedMockup);
			} catch (e) {
				error = 'Erro ao gerar mockup. Tente novamente.';
				isGenerating = false;
			}
		}, 1500);
	}

	/**
	 * @param {string} color
	 */
	function changeColor(color) {
		currentColor = color;
		generateMockup();
	}

	function downloadMockup() {
		// Em uma implementação real, isso iniciaria o download da imagem
		alert('Iniciando download do mockup...');
	}

	function approveMockup() {
		if (generatedMockup) {
			dispatch('approve', generatedMockup);
		}
	}
</script>

<div class="overflow-hidden bg-white shadow sm:rounded-lg">
	<div class="border-b border-gray-200 px-4 py-5 sm:px-6">
		<h3 class="text-lg font-medium leading-6 text-gray-900">Gerador de Mockups</h3>
		<p class="mt-1 max-w-2xl text-sm text-gray-500">Visualize como a estampa ficará no produto</p>
	</div>

	<div class="px-4 py-5 sm:p-6">
		<div class="grid grid-cols-1 gap-6 md:grid-cols-3">
			<!-- Painel de Informações -->
			<div class="md:col-span-1">
				<div class="mb-4">
					<h4 class="text-sm font-medium text-gray-900">Detalhes do Produto</h4>
					{#if product}
						<div class="mt-2 rounded-md bg-gray-50 p-3">
							<p class="text-sm text-gray-700">{product.name}</p>
							<p class="mt-1 text-xs text-gray-500">ID: {product.id}</p>
							<p class="mt-1 text-xs text-gray-500">
								Preço Base: R$ {product.basePrice?.toFixed(2) || '0.00'}
							</p>
						</div>
					{:else}
						<div class="mt-2 rounded-md bg-gray-50 p-3 text-center">
							<p class="text-sm text-gray-500">Nenhum produto selecionado</p>
						</div>
					{/if}
				</div>

				<div class="mb-4">
					<h4 class="text-sm font-medium text-gray-900">Detalhes da Estampa</h4>
					{#if design}
						<div class="mt-2 rounded-md bg-gray-50 p-3">
							<p class="text-sm text-gray-700">{design.name}</p>
							<p class="mt-1 text-xs text-gray-500">ID: {design.id}</p>
							<div class="mt-2">
								{#each design.tags || [] as tag}
									<span
										class="mb-1 mr-1 inline-flex items-center rounded bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800"
									>
										{tag}
									</span>
								{/each}
							</div>
						</div>
					{:else}
						<div class="mt-2 rounded-md bg-gray-50 p-3 text-center">
							<p class="text-sm text-gray-500">Nenhuma estampa selecionada</p>
						</div>
					{/if}
				</div>

				<div>
					<h4 class="text-sm font-medium text-gray-900">Escolha a Cor</h4>
					<div class="mt-2 flex flex-wrap gap-2">
						{#each colors as color}
							<button
								type="button"
								class="relative inline-flex h-10 w-10 items-center justify-center rounded-full border {currentColor ===
								color
									? 'border-indigo-500 ring-2 ring-indigo-500'
									: 'border-gray-300'}"
								style="background-color: {colorHexMap[color] || '#CCCCCC'};"
								on:click={() => changeColor(color)}
							>
								{#if currentColor === color}
									<span
										class="absolute right-0 top-0 h-3 w-3 rounded-full bg-indigo-500 ring-2 ring-white"
									></span>
								{/if}
								<span class="sr-only">{color}</span>
							</button>
						{/each}
					</div>
				</div>

				<div class="mt-6">
					<button
						on:click={generateMockup}
						disabled={isGenerating || !design || !product}
						class="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
					>
						{isGenerating ? 'Gerando...' : 'Gerar Mockup'}
					</button>
				</div>
			</div>

			<!-- Visualização do Mockup -->
			<div class="md:col-span-2">
				<div class="flex h-96 items-center justify-center overflow-hidden rounded-md bg-gray-100">
					{#if isGenerating}
						<div class="text-center">
							<svg
								class="mx-auto h-12 w-12 animate-spin text-gray-400"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
								></path>
							</svg>
							<p class="mt-2 text-sm text-gray-500">Gerando mockup...</p>
						</div>
					{:else if error}
						<div class="text-center">
							<svg
								class="mx-auto h-12 w-12 text-red-400"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
								></path>
							</svg>
							<p class="mt-2 text-sm text-red-500">{error}</p>
						</div>
					{:else if generatedMockup}
						<img
							src={generatedMockup.imageUrl}
							alt="Mockup do produto com estampa"
							class="h-full w-full object-contain"
						/>
					{:else}
						<div class="text-center">
							<svg
								class="mx-auto h-12 w-12 text-gray-400"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
								></path>
							</svg>
							<p class="mt-2 text-sm text-gray-500">Nenhum mockup gerado</p>
						</div>
					{/if}
				</div>

				{#if generatedMockup}
					<div class="mt-4 flex justify-end space-x-3">
						<button
							on:click={downloadMockup}
							class="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
						>
							Download
						</button>
						<button
							on:click={approveMockup}
							class="rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
						>
							Aprovar Mockup
						</button>
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>
