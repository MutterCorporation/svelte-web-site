<!-- components/ProductsManager.svelte -->
<script>
	// @ts-nocheck

	import { onMount } from 'svelte';
	// @ts-ignore
	import ProductForm from './productform.svelte';
	// @ts-ignore
	import DesignForm from './desingform.svelte';

	// Estado de visualização
	let currentView = 'list'; // 'list', 'product-form', 'design-form', 'mockup-view'
	// @ts-ignore
	/**
	 * @type {null}
	 */
	let selectedProduct = null;
	// @ts-ignore
	/**
	 * @type {{ name: any; id: any; } | null}
	 */
	let selectedDesign = null;

	// Dados
	/**
	 * @type {any[]}
	 */
	let products = [];
	// @ts-ignore
	let designs = [];
	/**
	 * @type {any[]}
	 */
	let mockups = [];
	// @ts-ignore
	let filteredProducts = [];
	// @ts-ignore
	let filteredDesigns = [];

	// Filtros
	let productFilter = '';
	let categoryFilter = 'all';
	let designFilter = '';
	let statusFilter = 'all';

	// Paginação
	let productsPerPage = 8;
	let designsPerPage = 8;
	let currentProductPage = 1;
	let currentDesignPage = 1;

	// Dados de exemplo para inicialização
	onMount(() => {
		// Simular carregamento de dados
		products = [
			{
				id: 'PROD-1001',
				name: 'Camiseta Básica',
				category: 'camiseta',
				basePrice: 59.9,
				gender: 'unisex',
				sizes: ['P', 'M', 'G'],
				colors: ['white', 'black', 'gray'],
				isActive: true,
				stockCount: 45
			},
			{
				id: 'PROD-1002',
				name: 'Regata Performance',
				category: 'regata',
				basePrice: 49.9,
				gender: 'male',
				sizes: ['M', 'G', 'GG'],
				colors: ['black', 'navy', 'red'],
				isActive: true,
				stockCount: 32
			},
			{
				id: 'PROD-1003',
				name: 'Legging Power',
				category: 'legging',
				basePrice: 89.9,
				gender: 'female',
				sizes: ['P', 'M', 'G'],
				colors: ['black', 'navy'],
				isActive: true,
				stockCount: 28
			},
			{
				id: 'PROD-1004',
				name: 'Shorts Running',
				category: 'shorts',
				basePrice: 69.9,
				gender: 'unisex',
				sizes: ['P', 'M', 'G', 'GG'],
				colors: ['black', 'gray', 'navy'],
				isActive: true,
				stockCount: 42
			},
			{
				id: 'PROD-1005',
				name: 'Moletom Canguru',
				category: 'moletom',
				basePrice: 129.9,
				gender: 'unisex',
				sizes: ['P', 'M', 'G', 'GG'],
				colors: ['black', 'gray'],
				isActive: true,
				stockCount: 23
			},
			{
				id: 'PROD-1006',
				name: 'Whey Protein 900g',
				category: 'suplemento',
				basePrice: 159.9,
				gender: 'unisex',
				sizes: [],
				colors: [],
				isActive: true,
				stockCount: 65
			}
		];

		designs = [
			{
				id: 'ESTMP-2001',
				name: 'Fitness Lifestyle',
				category: 'motivacional',
				tags: ['fitness', 'motivação', 'academia'],
				createdAt: '2025-03-15',
				isExclusive: false,
				previewUrl: '/api/placeholder/200/200'
			},
			{
				id: 'ESTMP-2002',
				name: 'No Pain No Gain',
				category: 'motivacional',
				tags: ['fitness', 'frase', 'motivação'],
				createdAt: '2025-03-20',
				isExclusive: false,
				previewUrl: '/api/placeholder/200/200'
			},
			{
				id: 'ESTMP-2003',
				name: 'Mountain Biking',
				category: 'esporte',
				tags: ['bike', 'montanha', 'radical'],
				createdAt: '2025-03-22',
				isExclusive: true,
				previewUrl: '/api/placeholder/200/200'
			},
			{
				id: 'ESTMP-2004',
				name: 'Just Lift',
				category: 'fitness',
				tags: ['peso', 'musculação'],
				createdAt: '2025-03-25',
				isExclusive: false,
				previewUrl: '/api/placeholder/200/200'
			}
		];

		mockups = [
			{
				id: 'MOCK-3001',
				productId: 'PROD-1001',
				designId: 'ESTMP-2001',
				imageUrl: '/api/placeholder/400/500',
				createdAt: '2025-03-16',
				status: 'approved'
			},
			{
				id: 'MOCK-3002',
				productId: 'PROD-1002',
				designId: 'ESTMP-2001',
				imageUrl: '/api/placeholder/400/500',
				createdAt: '2025-03-16',
				status: 'approved'
			},
			{
				id: 'MOCK-3003',
				productId: 'PROD-1001',
				designId: 'ESTMP-2002',
				imageUrl: '/api/placeholder/400/500',
				createdAt: '2025-03-21',
				status: 'pending'
			},
			{
				id: 'MOCK-3004',
				productId: 'PROD-1005',
				designId: 'ESTMP-2003',
				imageUrl: '/api/placeholder/400/500',
				createdAt: '2025-03-23',
				status: 'approved'
			}
		];

		applyProductsFilter();
		applyDesignsFilter();
	});

	// Funções auxiliares
	function applyProductsFilter() {
		filteredProducts = products.filter((product) => {
			// Aplicar filtro de texto
			const textMatch =
				productFilter === '' ||
				product.name.toLowerCase().includes(productFilter.toLowerCase()) ||
				product.id.toLowerCase().includes(productFilter.toLowerCase());

			// Aplicar filtro de categoria
			const categoryMatch = categoryFilter === 'all' || product.category === categoryFilter;

			return textMatch && categoryMatch;
		});
	}

	function applyDesignsFilter() {
		// @ts-ignore
		filteredDesigns = designs.filter((design) => {
			// Aplicar filtro de texto
			const textMatch =
				designFilter === '' ||
				design.name.toLowerCase().includes(designFilter.toLowerCase()) ||
				design.id.toLowerCase().includes(designFilter.toLowerCase()) ||
				// @ts-ignore
				design.tags.some((tag) => tag.toLowerCase().includes(designFilter.toLowerCase()));

			// Aplicar filtro de status
			const statusMatch =
				statusFilter === 'all' ||
				(statusFilter === 'exclusive' && design.isExclusive) ||
				(statusFilter === 'regular' && !design.isExclusive);

			return textMatch && statusMatch;
		});
	}

	// @ts-ignore
	function saveProduct(event) {
		const newProduct = event.detail;
		const existingIndex = products.findIndex((p) => p.id === newProduct.id);

		if (existingIndex >= 0) {
			// Atualizar produto existente
			products[existingIndex] = newProduct;
		} else {
			// Adicionar novo produto
			products = [...products, newProduct];
		}

		applyProductsFilter();
		currentView = 'list';
	}

	// @ts-ignore
	function saveDesign(event) {
		const newDesign = event.detail;
		// @ts-ignore
		const existingIndex = designs.findIndex((d) => d.id === newDesign.id);

		if (existingIndex >= 0) {
			// Atualizar estampa existente
			designs[existingIndex] = newDesign;
		} else {
			// Adicionar nova estampa
			// @ts-ignore
			designs = [...designs, newDesign];
		}

		applyDesignsFilter();
		currentView = 'mockup-view';
		selectedDesign = newDesign;
	}

	// @ts-ignore
	function editProduct(product) {
		selectedProduct = product;
		currentView = 'product-form';
	}

	// @ts-ignore
	function editDesign(design) {
		selectedDesign = design;
		currentView = 'design-form';
	}

	// @ts-ignore
	function viewMockups(design) {
		selectedDesign = design;
		currentView = 'mockup-view';
	}

	function getProductsForPage() {
		const start = (currentProductPage - 1) * productsPerPage;
		const end = start + productsPerPage;
		// @ts-ignore
		return filteredProducts.slice(start, end);
	}

	function getDesignsForPage() {
		const start = (currentDesignPage - 1) * designsPerPage;
		const end = start + designsPerPage;
		// @ts-ignore
		return filteredDesigns.slice(start, end);
	}

	function getTotalProductPages() {
		return Math.ceil(filteredProducts.length / productsPerPage);
	}

	function getTotalDesignPages() {
		return Math.ceil(filteredDesigns.length / designsPerPage);
	}

	// @ts-ignore
	function getMockupsForDesign(designId) {
		return mockups.filter((mockup) => mockup.designId === designId);
	}

	// @ts-ignore
	function getProductById(productId) {
		return products.find((product) => product.id === productId);
	}

	// Handlers para os filtros
	// @ts-ignore
	$: {
		applyProductsFilter();
		currentProductPage = 1;
	}

	// @ts-ignore
	$: {
		applyDesignsFilter();
		currentDesignPage = 1;
	}
</script>

<div>
	<!-- Navegação Topo -->
	<div class="mb-6 border-b border-gray-200 pb-4">
		<div class="flex flex-wrap items-center justify-between">
			<h1 class="text-2xl font-semibold text-gray-900">Gerenciamento de Produtos e Estampas</h1>
			<div class="mt-4 flex space-x-3 sm:mt-0">
				<button
					on:click={() => {
						selectedProduct = null;
						currentView = 'product-form';
					}}
					class="flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
				>
					<svg
						class="mr-2 h-4 w-4"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M12 6v6m0 0v6m0-6h6m-6 0H6"
						></path>
					</svg>
					Novo Produto
				</button>
				<button
					on:click={() => {
						selectedDesign = null;
						currentView = 'design-form';
					}}
					class="flex items-center rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
				>
					<svg
						class="mr-2 h-4 w-4"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M12 6v6m0 0v6m0-6h6m-6 0H6"
						></path>
					</svg>
					Nova Estampa
				</button>
			</div>
		</div>
	</div>

	{#if currentView === 'list'}
		<div class="grid grid-cols-1 gap-8">
			<!-- Produtos -->
			<div>
				<div class="mb-4 flex items-center justify-between">
					<h2 class="text-xl font-medium text-gray-900">Produtos</h2>

					<div class="flex items-center space-x-2">
						<div class="relative">
							<input
								type="text"
								bind:value={productFilter}
								placeholder="Buscar produtos..."
								class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
							/>
							<div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
								<svg
									class="h-5 w-5 text-gray-400"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
									></path>
								</svg>
							</div>
						</div>

						<select
							bind:value={categoryFilter}
							class="block rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
						>
							<option value="all">Todas Categorias</option>
							<option value="camiseta">Camisetas</option>
							<option value="regata">Regatas</option>
							<option value="shorts">Shorts</option>
							<option value="legging">Leggings</option>
							<option value="moletom">Moletons</option>
							<option value="suplemento">Suplementos</option>
						</select>
					</div>
				</div>

				<div class="overflow-hidden bg-white shadow sm:rounded-md">
					<ul class="divide-y divide-gray-200">
						{#if getProductsForPage().length === 0}
							<li class="px-6 py-4 text-center text-gray-500">Nenhum produto encontrado.</li>
						{:else}
							{#each getProductsForPage() as product}
								<li>
									<div class="flex items-center px-4 py-4 sm:px-6">
										<div class="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
											<div>
												<div class="flex text-sm">
													<p class="truncate font-medium text-indigo-600">{product.name}</p>
													<p class="ml-1 flex-shrink-0 font-normal text-gray-500">
														({product.id})
													</p>
												</div>
												<div class="mt-2 flex">
													<div class="flex items-center text-sm text-gray-500">
														<span
															class="inline-flex items-center rounded-md bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800"
														>
															{product.category}
														</span>
														<span class="ml-2">R$ {product.basePrice.toFixed(2)}</span>
														<span class="ml-2">{product.stockCount} em estoque</span>
													</div>
												</div>
											</div>
											<div class="mt-4 flex-shrink-0 sm:ml-5 sm:mt-0">
												<div class="flex -space-x-1 overflow-hidden">
													{#each product.colors.slice(0, 3) as color}
														<div
															class="inline-block h-6 w-6 rounded-full ring-2 ring-white"
															style="background-color: {color === 'white'
																? '#FFFFFF'
																: color === 'black'
																	? '#000000'
																	: color === 'navy'
																		? '#000080'
																		: color === 'gray'
																			? '#808080'
																			: color === 'red'
																				? '#FF0000'
																				: '#CCCCCC'};"
														></div>
													{/each}
													{#if product.colors.length > 3}
														<div
															class="inline-flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 text-xs"
														>
															+{product.colors.length - 3}
														</div>
													{/if}
												</div>
											</div>
										</div>
										<div class="ml-5 flex-shrink-0">
											<!-- svelte-ignore a11y_consider_explicit_label -->
											<button
												on:click={() => editProduct(product)}
												class="mr-2 text-indigo-600 hover:text-indigo-900"
											>
												<svg
													class="h-5 w-5"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24"
													xmlns="http://www.w3.org/2000/svg"
												>
													<path
														stroke-linecap="round"
														stroke-linejoin="round"
														stroke-width="2"
														d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
													></path>
												</svg>
											</button>
											<span
												class={`inline-flex rounded-full ${product.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'} px-2 text-xs font-semibold leading-5`}
											>
												{product.isActive ? 'Ativo' : 'Inativo'}
											</span>
										</div>
									</div>
								</li>
							{/each}
						{/if}
					</ul>

					<!-- Paginação para Produtos -->
					{#if getTotalProductPages() > 1}
						<nav
							class="flex items-center justify-between border-t border-gray-200 px-4 sm:px-6"
							aria-label="Paginação"
						>
							<div class="hidden sm:block">
								<p class="text-sm text-gray-700">
									Mostrando <span class="font-medium"
										>{(currentProductPage - 1) * productsPerPage + 1}</span
									>
									a
									<span class="font-medium"
										>{Math.min(currentProductPage * productsPerPage, filteredProducts.length)}</span
									>
									de <span class="font-medium">{filteredProducts.length}</span> resultados
								</p>
							</div>
							<div class="flex flex-1 justify-between sm:justify-end">
								<button
									on:click={() => (currentProductPage = Math.max(1, currentProductPage - 1))}
									disabled={currentProductPage === 1}
									class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 {currentProductPage ===
									1
										? 'cursor-not-allowed opacity-50'
										: ''}"
								>
									Anterior
								</button>
								<button
									on:click={() =>
										(currentProductPage = Math.min(getTotalProductPages(), currentProductPage + 1))}
									disabled={currentProductPage === getTotalProductPages()}
									class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 {currentProductPage ===
									getTotalProductPages()
										? 'cursor-not-allowed opacity-50'
										: ''}"
								>
									Próximo
								</button>
							</div>
						</nav>
					{/if}
				</div>
			</div>

			<!-- Estampas -->
			<div>
				<div class="mb-4 flex items-center justify-between">
					<h2 class="text-xl font-medium text-gray-900">Estampas</h2>

					<div class="flex items-center space-x-2">
						<div class="relative">
							<input
								type="text"
								bind:value={designFilter}
								placeholder="Buscar estampas..."
								class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
							/>
							<div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
								<svg
									class="h-5 w-5 text-gray-400"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
									></path>
								</svg>
							</div>
						</div>

						<select
							bind:value={statusFilter}
							class="block rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
						>
							<option value="all">Todos Status</option>
							<option value="exclusive">Exclusivas</option>
							<option value="regular">Regulares</option>
						</select>
					</div>
				</div>

				<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
					{#if getDesignsForPage().length === 0}
						<div
							class="col-span-full rounded-lg bg-white px-6 py-4 text-center text-gray-500 shadow"
						>
							Nenhuma estampa encontrada.
						</div>
					{:else}
						{#each getDesignsForPage() as design}
							<div class="overflow-hidden rounded-lg bg-white shadow">
								<div class="relative h-40 bg-gray-100">
									<img
										src={design.previewUrl}
										alt={design.name}
										class="h-full w-full object-cover"
									/>
									{#if design.isExclusive}
										<span
											class="absolute right-2 top-2 inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800"
										>
											Exclusiva
										</span>
									{/if}
								</div>
								<div class="px-4 py-4">
									<div class="flex justify-between">
										<h3 class="truncate text-sm font-medium text-gray-900">{design.name}</h3>
										<span class="text-xs text-gray-500">{design.id}</span>
									</div>
									<div class="mt-2">
										<span
											class="inline-flex items-center rounded-md bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800"
										>
											{design.category}
										</span>
									</div>
									<div class="mt-2 text-xs text-gray-500">
										Criada em {design.createdAt}
									</div>
									<div class="mt-4 flex justify-between">
										<button
											on:click={() => editDesign(design)}
											class="text-sm text-indigo-600 hover:text-indigo-900"
										>
											Editar
										</button>
										<button
											on:click={() => viewMockups(design)}
											class="text-sm text-green-600 hover:text-green-900"
										>
											Mockups
										</button>
									</div>
								</div>
							</div>
						{/each}
					{/if}
				</div>

				<!-- Paginação para Estampas -->
				{#if getTotalDesignPages() > 1}
					<nav
						class="mt-4 flex items-center justify-between border-t border-gray-200 px-4 sm:px-6"
						aria-label="Paginação"
					>
						<div class="hidden sm:block">
							<p class="text-sm text-gray-700">
								Mostrando <span class="font-medium"
									>{(currentDesignPage - 1) * designsPerPage + 1}</span
								>
								a
								<span class="font-medium"
									>{Math.min(currentDesignPage * designsPerPage, filteredDesigns.length)}</span
								>
								de <span class="font-medium">{filteredDesigns.length}</span> resultados
							</p>
						</div>
						<div class="flex flex-1 justify-between sm:justify-end">
							<button
								on:click={() => (currentDesignPage = Math.max(1, currentDesignPage - 1))}
								disabled={currentDesignPage === 1}
								class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 {currentDesignPage ===
								1
									? 'cursor-not-allowed opacity-50'
									: ''}"
							>
								Anterior
							</button>
							<button
								on:click={() =>
									(currentDesignPage = Math.min(getTotalDesignPages(), currentDesignPage + 1))}
								disabled={currentDesignPage === getTotalDesignPages()}
								class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 {currentDesignPage ===
								getTotalDesignPages()
									? 'cursor-not-allowed opacity-50'
									: ''}"
							>
								Próximo
							</button>
						</div>
					</nav>
				{/if}
			</div>
		</div>
	{:else if currentView === 'product-form'}
		<ProductForm
			product={selectedProduct}
			on:save={saveProduct}
			on:cancel={() => (currentView = 'list')}
		/>
	{:else if currentView === 'design-form'}
		<DesignForm
			design={selectedDesign}
			on:save={saveDesign}
			on:cancel={() => (currentView = 'list')}
		/>
	{:else if currentView === 'mockup-view'}
		<!-- Visualização de Mockups -->
		<div class="overflow-hidden bg-white shadow sm:rounded-lg">
			<div class="flex items-center justify-between border-b border-gray-200 px-4 py-5 sm:px-6">
				<h3 class="text-lg font-medium leading-6 text-gray-900">
					Mockups para Estampa: {selectedDesign.name}
				</h3>
				<button
					on:click={() => (currentView = 'list')}
					class="rounded-md bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-200"
				>
					Voltar
				</button>
			</div>

			<div class="px-4 py-5 sm:p-6">
				<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
					{#if getMockupsForDesign(selectedDesign.id).length === 0}
						<div class="col-span-full py-6 text-center text-gray-500">
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
									d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
								></path>
							</svg>
							<p class="mt-2 text-sm">Nenhum mockup encontrado para esta estampa.</p>
							<button
								on:click={() => {
									selectedDesign = selectedDesign;
									currentView = 'design-form';
								}}
								class="mt-3 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
							>
								Gerar Novos Mockups
							</button>
						</div>
					{:else}
						{#each getMockupsForDesign(selectedDesign.id) as mockup}
							{@const product = getProductById(mockup.productId)}
							{#if product}
								<div class="overflow-hidden rounded-lg bg-gray-50 shadow">
									<div class="h-80 bg-white">
										<img
											src={mockup.imageUrl}
											alt={`Mockup de ${selectedDesign.name} em ${product.name}`}
											class="h-full w-full object-cover"
										/>
									</div>
									<div class="p-4">
										<h5 class="text-sm font-medium text-gray-900">{product.name}</h5>
										<div class="mt-2 flex items-center justify-between">
											<span
												class={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${mockup.status === 'approved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}
											>
												{mockup.status === 'approved' ? 'Aprovado' : 'Pendente'}
											</span>
											<button class="text-xs font-medium text-indigo-600 hover:text-indigo-900">
												Download
											</button>
										</div>
									</div>
								</div>
							{/if}
						{/each}
					{/if}
				</div>
			</div>
		</div>
	{/if}
</div>
