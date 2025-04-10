<!-- components/ProductForm.svelte -->
<script>
	// @ts-nocheck

	import { createEventDispatcher } from 'svelte';

	// Criar dispatcher para eventos
	const dispatch = createEventDispatcher();

	// Estado inicial do formulário
	let product = {
		id: '',
		name: '',
		category: 'camiseta',
		description: '',
		basePrice: '',
		gender: 'unisex',
		sizes: [],
		colors: [],
		hasVariants: true,
		isActive: true
	};

	// Opções disponíveis
	const categories = [
		{ value: 'camiseta', label: 'Camiseta' },
		{ value: 'regata', label: 'Regata' },
		{ value: 'shorts', label: 'Shorts' },
		{ value: 'legging', label: 'Legging' },
		{ value: 'moletom', label: 'Moletom' },
		{ value: 'suplemento', label: 'Suplemento' }
	];

	const sizeOptions = [
		{ value: 'PP', label: 'PP' },
		{ value: 'P', label: 'P' },
		{ value: 'M', label: 'M' },
		{ value: 'G', label: 'G' },
		{ value: 'GG', label: 'GG' },
		{ value: 'XG', label: 'XG' }
	];

	const colorOptions = [
		{ value: 'white', label: 'Branco', hex: '#FFFFFF' },
		{ value: 'black', label: 'Preto', hex: '#000000' },
		{ value: 'navy', label: 'Azul Marinho', hex: '#000080' },
		{ value: 'gray', label: 'Cinza', hex: '#808080' },
		{ value: 'red', label: 'Vermelho', hex: '#FF0000' }
	];

	const genderOptions = [
		{ value: 'unisex', label: 'Unissex' },
		{ value: 'male', label: 'Masculino' },
		{ value: 'female', label: 'Feminino' }
	];

	// Manipuladores
	function handleSubmit() {
		if (!product.name || !product.basePrice) {
			alert('Preencha os campos obrigatórios');
			return;
		}

		// Gerar ID se for um novo produto
		if (!product.id) {
			product.id = 'PROD-' + Math.floor(1000 + Math.random() * 9000);
		}

		// Dispatch do evento com os dados do produto
		dispatch('save', product);

		// Limpar formulário
		resetForm();
	}

	function resetForm() {
		product = {
			id: '',
			name: '',
			category: 'camiseta',
			description: '',
			basePrice: '',
			gender: 'unisex',
			sizes: [],
			colors: [],
			hasVariants: true,
			isActive: true
		};
	}

	// @ts-ignore
	function toggleSize(size) {
		// @ts-ignore
		if (product.sizes.includes(size)) {
			product.sizes = product.sizes.filter((s) => s !== size);
		} else {
			// @ts-ignore
			product.sizes = [...product.sizes, size];
		}
	}

	// @ts-ignore
	function toggleColor(color) {
		// @ts-ignore
		if (product.colors.includes(color)) {
			product.colors = product.colors.filter((c) => c !== color);
		} else {
			// @ts-ignore
			product.colors = [...product.colors, color];
		}
	}
</script>

<div class="overflow-hidden bg-white shadow sm:rounded-lg">
	<div class="flex items-center justify-between border-b border-gray-200 px-4 py-5 sm:px-6">
		<h3 class="text-lg font-medium leading-6 text-gray-900">Cadastro de Produto</h3>
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
				<!-- Nome do Produto -->
				<div class="sm:col-span-4">
					<label for="product-name" class="block text-sm font-medium text-gray-700"
						>Nome do Produto *</label
					>
					<div class="mt-1">
						<input
							type="text"
							id="product-name"
							bind:value={product.name}
							class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
							required
						/>
					</div>
				</div>

				<!-- Categoria -->
				<div class="sm:col-span-2">
					<label for="product-category" class="block text-sm font-medium text-gray-700"
						>Categoria</label
					>
					<div class="mt-1">
						<select
							id="product-category"
							bind:value={product.category}
							class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
						>
							{#each categories as category}
								<option value={category.value}>{category.label}</option>
							{/each}
						</select>
					</div>
				</div>

				<!-- Preço Base -->
				<div class="sm:col-span-2">
					<label for="product-price" class="block text-sm font-medium text-gray-700"
						>Preço Base (R$) *</label
					>
					<div class="mt-1">
						<input
							type="number"
							id="product-price"
							bind:value={product.basePrice}
							min="0"
							step="0.01"
							class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
							required
						/>
					</div>
				</div>

				<!-- Gênero -->
				<div class="sm:col-span-2">
					<label for="product-gender" class="block text-sm font-medium text-gray-700">Gênero</label>
					<div class="mt-1">
						<select
							id="product-gender"
							bind:value={product.gender}
							class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
						>
							{#each genderOptions as option}
								<option value={option.value}>{option.label}</option>
							{/each}
						</select>
					</div>
				</div>

				<!-- Status -->
				<div class="sm:col-span-2">
					<fieldset class="mt-5">
						<div class="flex items-center">
							<input
								id="product-active"
								type="checkbox"
								bind:checked={product.isActive}
								class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
							/>
							<label for="product-active" class="ml-2 block text-sm font-medium text-gray-700">
								Produto Ativo
							</label>
						</div>
						<div class="mt-3 flex items-center">
							<input
								id="product-variants"
								type="checkbox"
								bind:checked={product.hasVariants}
								class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
							/>
							<label for="product-variants" class="ml-2 block text-sm font-medium text-gray-700">
								Possui Variantes
							</label>
						</div>
					</fieldset>
				</div>

				<!-- Descrição -->
				<div class="sm:col-span-6">
					<label for="product-description" class="block text-sm font-medium text-gray-700"
						>Descrição</label
					>
					<div class="mt-1">
						<textarea
							id="product-description"
							bind:value={product.description}
							rows="3"
							class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
						></textarea>
					</div>
				</div>

				<!-- Tamanhos -->
				<div class="sm:col-span-3">
					<span class="mb-2 block text-sm font-medium text-gray-700">Tamanhos Disponíveis</span>
					<div class="mt-1 flex flex-wrap gap-2">
						{#each sizeOptions as size}
							<button
								type="button"
								class="inline-flex items-center border px-3 py-1 {product.sizes.includes(size.value)
									? 'border-indigo-500 bg-indigo-100 text-indigo-800'
									: 'border-gray-300 bg-white text-gray-700'} rounded-md text-sm font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
								on:click={() => toggleSize(size.value)}
							>
								{size.label}
							</button>
						{/each}
					</div>
				</div>

				<!-- Cores -->
				<div class="sm:col-span-3">
					<span class="mb-2 block text-sm font-medium text-gray-700">Cores Disponíveis</span>
					<div class="mt-1 flex flex-wrap gap-2">
						{#each colorOptions as color}
							<button
								type="button"
								class="inline-flex items-center border px-3 py-1 {product.colors.includes(
									color.value
								)
									? 'border-indigo-500 ring-2 ring-indigo-500'
									: 'border-gray-300'} rounded-md text-sm font-medium hover:bg-gray-50 focus:outline-none"
								on:click={() => toggleColor(color.value)}
							>
								<span class="mr-2 h-4 w-4 rounded-full" style="background-color: {color.hex};"
								></span>
								{color.label}
							</button>
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
						Salvar Produto
					</button>
				</div>
			</div>
		</form>
	</div>
</div>
