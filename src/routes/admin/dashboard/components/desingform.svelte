<!-- components/DesignForm.svelte -->
<script>
	// @ts-nocheck

	import { createEventDispatcher, onMount } from 'svelte';

	// Criar dispatcher para eventos
	const dispatch = createEventDispatcher();

	// Estado inicial do formulário
	let design = {
		id: '',
		name: '',
		description: '',
		category: 'esporte',
		tags: [],
		isExclusive: false,
		previewImage: null,
		file: null,
		createdAt: new Date().toISOString().slice(0, 10)
	};

	// Campo de busca de tags
	let tagInput = '';

	// Referências para campos de arquivo
	/**
	 * @type {HTMLInputElement}
	 */
	let fileInput;

	// Opções disponíveis
	const categories = [
		{ value: 'esporte', label: 'Esporte' },
		{ value: 'motivacional', label: 'Motivacional' },
		{ value: 'fitness', label: 'Fitness' },
		{ value: 'humor', label: 'Humor' },
		{ value: 'minimalista', label: 'Minimalista' },
		{ value: 'natureza', label: 'Natureza' }
	];

	// Produtos disponíveis para mockup
	let availableProducts = [
		{
			id: 'prod-1',
			name: 'Camiseta Básica',
			category: 'camiseta',
			image: '/api/placeholder/400/500',
			selected: true
		},
		{
			id: 'prod-2',
			name: 'Regata Performance',
			category: 'regata',
			image: '/api/placeholder/400/500',
			selected: false
		},
		{
			id: 'prod-3',
			name: 'Camiseta Dry-Fit',
			category: 'camiseta',
			image: '/api/placeholder/400/500',
			selected: true
		},
		{
			id: 'prod-4',
			name: 'Moletom Canguru',
			category: 'moletom',
			image: '/api/placeholder/400/500',
			selected: false
		}
	];

	// Estado para controle do preview
	let showMockups = false;
	/**
	 * @type {string | any[]}
	 */
	let mockupImages = [];

	// Manipuladores
	function handleSubmit() {
		if (!design.name || !design.file) {
			alert('Nome e arquivo da estampa são obrigatórios');
			return;
		}

		// Gerar ID se for uma nova estampa
		if (!design.id) {
			design.id = 'ESTMP-' + Math.floor(1000 + Math.random() * 9000);
		}

		// Dispatch do evento com os dados da estampa
		dispatch('save', design);

		// Mostrar mockups após salvar
		generateMockups();
	}

	function resetForm() {
		design = {
			id: '',
			name: '',
			description: '',
			category: 'esporte',
			tags: [],
			isExclusive: false,
			previewImage: null,
			file: null,
			createdAt: new Date().toISOString().slice(0, 10)
		};
		showMockups = false;
		mockupImages = [];
	}

	/**
	 * @param {{ target: { files: any; }; }} event
	 */
	function handleFileChange(event) {
		const files = event.target.files;

		if (!files.length) return;

		const file = files[0];
		design.file = file;

		// Criar URL para preview
		if (design.previewImage) {
			URL.revokeObjectURL(design.previewImage);
		}

		// @ts-ignore
		design.previewImage = URL.createObjectURL(file);
	}

	function addTag() {
		// @ts-ignore
		if (tagInput.trim() && !design.tags.includes(tagInput.trim())) {
			// @ts-ignore
			design.tags = [...design.tags, tagInput.trim()];
			tagInput = '';
		}
	}

	// @ts-ignore
	function removeTag(tag) {
		design.tags = design.tags.filter((t) => t !== tag);
	}

	/**
	 * @param {string} productId
	 */
	function toggleProductSelection(productId) {
		availableProducts.forEach((product) => {
			if (product.id === productId) {
				product.selected = !product.selected;
			}
		});
		availableProducts = [...availableProducts]; // Para acionar a reatividade
	}

	// Função para gerar mockups (simulada)
	function generateMockups() {
		if (!design.previewImage) return;

		mockupImages = [];
		showMockups = true;

		// Simulação de geração de mockups
		// Em uma implementação real, isso poderia enviar a imagem para um servidor
		// ou usar uma biblioteca de manipulação de imagens no cliente

		const selectedProducts = availableProducts.filter((p) => p.selected);

		// Simular um pequeno atraso para mostrar que está "processando"
		setTimeout(() => {
			mockupImages = selectedProducts.map((product) => {
				return {
					productId: product.id,
					productName: product.name,
					mockupUrl: '/api/placeholder/600/800', // Placeholder para o mockup
					designId: design.id,
					designName: design.name
				};
			});
		}, 1000);
	}

	// Limpar objetos URL ao desmontar o componente
	onMount(() => {
		return () => {
			if (design.previewImage) {
				URL.revokeObjectURL(design.previewImage);
			}
		};
	});
</script>

<div class="overflow-hidden bg-white shadow sm:rounded-lg">
	<div class="flex items-center justify-between border-b border-gray-200 px-4 py-5 sm:px-6">
		<h3 class="text-lg font-medium leading-6 text-gray-900">Cadastro de Estampa</h3>
		<button
			on:click={() => dispatch('cancel')}
			class="rounded-md bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-200"
		>
			Voltar
		</button>
	</div>

	<div class="px-4 py-5 sm:p-6">
		<form on:submit|preventDefault={handleSubmit}>
			<div class="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-6">
				<!-- Nome da Estampa -->
				<div class="sm:col-span-4">
					<label for="design-name" class="block text-sm font-medium text-gray-700"
						>Nome da Estampa *</label
					>
					<div class="mt-1">
						<input
							type="text"
							id="design-name"
							bind:value={design.name}
							class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
							required
						/>
					</div>
				</div>

				<!-- Categoria -->
				<div class="sm:col-span-2">
					<label for="design-category" class="block text-sm font-medium text-gray-700"
						>Categoria</label
					>
					<div class="mt-1">
						<select
							id="design-category"
							bind:value={design.category}
							class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
						>
							{#each categories as category}
								<option value={category.value}>{category.label}</option>
							{/each}
						</select>
					</div>
				</div>

				<!-- Upload de Arquivo -->
				<div class="sm:col-span-3">
					<label for="design-file" class="block text-sm font-medium text-gray-700"
						>Arquivo da Estampa *</label
					>
					<div class="mt-1 flex items-center">
						<button
							type="button"
							on:click={() => fileInput.click()}
							class="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
						>
							Selecionar Arquivo
						</button>
						<input
							bind:this={fileInput}
							type="file"
							id="design-file"
							accept=".png,.jpg,.jpeg,.svg"
							on:change={handleFileChange}
							class="hidden"
						/>
						<span class="ml-2 text-sm text-gray-500">
							{design.file ? design.file.name : 'Nenhum arquivo selecionado'}
						</span>
					</div>
					<p class="mt-1 text-xs text-gray-500">
						PNG, JPG ou SVG. Recomendado 2000x2000px com fundo transparente.
					</p>
				</div>

				<!-- Preview da Imagem -->
				<div class="sm:col-span-3">
					<span class="block text-sm font-medium text-gray-700">Preview</span>
					<div
						class="mt-1 flex h-40 w-40 items-center justify-center overflow-hidden rounded-md border-2 border-dashed border-gray-300"
					>
						{#if design.previewImage}
							<img
								src={design.previewImage}
								alt="Preview da estampa"
								class="max-h-full max-w-full object-contain"
							/>
						{:else}
							<span class="text-sm text-gray-400">Sem imagem</span>
						{/if}
					</div>
				</div>

				<!-- Descrição -->
				<div class="sm:col-span-6">
					<label for="design-description" class="block text-sm font-medium text-gray-700"
						>Descrição</label
					>
					<div class="mt-1">
						<textarea
							id="design-description"
							bind:value={design.description}
							rows="3"
							class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
						></textarea>
					</div>
				</div>

				<!-- Tags -->
				<div class="sm:col-span-6">
					<label for="design-tags" class="block text-sm font-medium text-gray-700">Tags</label>
					<div class="mt-1 flex">
						<input
							type="text"
							id="design-tags"
							bind:value={tagInput}
							on:keydown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
							placeholder="Digite e pressione Enter para adicionar"
							class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
						/>
						<button
							type="button"
							on:click={addTag}
							class="ml-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
						>
							Adicionar
						</button>
					</div>

					{#if design.tags.length > 0}
						<div class="mt-2 flex flex-wrap gap-2">
							{#each design.tags as tag}
								<span
									class="inline-flex items-center rounded-md bg-indigo-100 px-2.5 py-0.5 text-sm font-medium text-indigo-800"
								>
									{tag}
									<!-- svelte-ignore a11y_consider_explicit_label -->
									<button
										type="button"
										on:click={() => removeTag(tag)}
										class="ml-1.5 inline-flex text-indigo-600 hover:text-indigo-900"
									>
										<svg
											class="h-3 w-3"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M6 18L18 6M6 6l12 12"
											></path>
										</svg>
									</button>
								</span>
							{/each}
						</div>
					{/if}
				</div>

				<!-- Opções para Mockup -->
				<div class="sm:col-span-6">
					<span class="mb-2 block text-sm font-medium text-gray-700"
						>Selecione produtos para gerar mockups</span
					>
					<div class="mt-1 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
						{#each availableProducts as product}
							<!-- svelte-ignore a11y_no_static_element_interactions -->
							<!-- svelte-ignore a11y_click_events_have_key_events -->
							<div
								class="cursor-pointer rounded-md border p-2 {product.selected
									? 'border-indigo-500 bg-indigo-50'
									: 'border-gray-300'}"
								on:click={() => toggleProductSelection(product.id)}
							>
								<div class="mb-2 h-40 overflow-hidden rounded-md bg-gray-100">
									<img src={product.image} alt={product.name} class="h-full w-full object-cover" />
								</div>
								<div class="flex items-center">
									<input
										type="checkbox"
										checked={product.selected}
										class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
										on:click|stopPropagation
										on:change={() => toggleProductSelection(product.id)}
									/>
									<span class="ml-2 text-sm text-gray-700">{product.name}</span>
								</div>
							</div>
						{/each}
					</div>
				</div>
			</div>

			<!-- Botões de Ação -->
			<div class="mt-6 border-t border-gray-200 pt-5">
				<div class="flex justify-end">
					<button
						type="button"
						on:click={resetForm}
						class="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
					>
						Limpar
					</button>
					<button
						type="submit"
						class="ml-3 rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
					>
						Salvar e Gerar Mockups
					</button>
				</div>
			</div>
		</form>
	</div>

	<!-- Mockups Gerados -->
	{#if showMockups}
		<div class="border-t border-gray-200 px-4 py-5 sm:p-6">
			<h4 class="mb-4 text-lg font-medium text-gray-900">Mockups Gerados</h4>

			{#if mockupImages.length === 0}
				<div class="py-6 text-center">
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
					<p class="mt-2 text-sm text-gray-500">Gerando mockups...</p>
				</div>
			{:else}
				<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
					{#each mockupImages as mockup}
						<div class="overflow-hidden rounded-lg bg-gray-50 shadow">
							<div class="h-80 bg-white">
								<img
									src={mockup.mockupUrl}
									alt={`Mockup de ${mockup.designName} em ${mockup.productName}`}
									class="h-full w-full object-cover"
								/>
							</div>
							<div class="p-4">
								<h5 class="text-sm font-medium text-gray-900">{mockup.productName}</h5>
								<p class="text-xs text-gray-500">Estampa: {mockup.designName}</p>
								<div class="mt-2 flex justify-between">
									<button class="text-xs text-indigo-600 hover:text-indigo-800">Download</button>
									<button class="text-xs text-green-600 hover:text-green-800">Aprovar</button>
								</div>
							</div>
						</div>
					{/each}
				</div>
			{/if}
		</div>
	{/if}
</div>
