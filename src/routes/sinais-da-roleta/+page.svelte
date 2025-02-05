<script>
	// @ts-nocheck
		import { onMount } from 'svelte'
		import Header from '../../components/Header.svelte';
		import Footer from '../../components/Footer.svelte';
	
		let selectItem = '';
		let isAuthenticated = false;
		let isLoading = true;
		let last_result = null;
		export let roletas = [];
		let showModal = false;
	
		// Atualiza o modal quando um item é selecionado
		$: if (selectItem) {
			fetchPrediction(selectItem);
		}
	
		// Busca os nomes das roletas
		const fetchRoletasName = () => {
			const token = localStorage.getItem('MutterCorp');
			if (!token) {
				console.error("Token não encontrado no localStorage.");
				return;
			}
	
			fetch('https://dev.muttercorp.com.br/roleta', {
				method: 'GET',
				headers: {
					accept: '*/*',
					Authorization: `Bearer ${token}`,
				}
			})
				.then((response) => response.json())
				.then((data) => {
					console.log("Roletas recebidas:", data);
					roletas = data;
				})
				.catch((error) => console.error("Erro ao buscar roletas:", error));
		};
	
		// Busca os detalhes do resultado de uma roleta específica
		const fetchPrediction = (selectItem) => {
			const token = localStorage.getItem('MutterCorp');
			if (!token) {
				console.error("Token não encontrado no localStorage.");
				return;
			}
	
			fetch(`https://dev.muttercorp.com.br/roleta/resultado/${selectItem}`, {
				method: 'GET',
				headers: {
					accept: '*/*',
					Authorization: `Bearer ${token}`,
				}
			})
				.then((response) => response.json())
				.then((data) => {
					console.log("Resultado recebido:", data);
					last_result = data.last_result;
				})
				.catch((error) => console.error("Erro ao buscar previsão:", error));
		};
	
		// Define o item selecionado e abre o modal
		const handleSelectItem = (roleta) => {
			selectItem = roleta;
			showModal = true; // Abre o modal
		};
	
		// Executa na montagem do componente
		onMount(() => {
			fetchRoletasName();
		});
	</script>
	
	<Header title="Sinais da Roleta" />
	
	<div class="bg-color-gray-100 rounded-lg p-9">
		{#each roletas as roleta}
			<div>
				<div on:click={() => handleSelectItem(roleta)} class="bg-color-yellow-400 text-color-gray-800 p-4 cursor-pointer">
					<h2>{roleta}</h2>
				</div>
			</div>
		{/each}
	</div>
	
	{#if showModal}
		<div class="modal-overlay" on:click={() => (showModal = false)}>
			<div class="modal-content" on:click|stopPropagation>
				<h3 class="text-lg font-medium text-gray-900 mb-4">Detalhes da Roleta</h3>
				<div>
					{#if last_result}
						<div class="space-y-4">
							<div>
								<h4 class="text-md font-semibold text-gray-700">Último Resultado:</h4>
								<p class="text-gray-600">{last_result}</p>
							</div>
						</div>
					{:else}
						<p class="text-gray-600">Carregando detalhes...</p>
					{/if}
				</div>
				<div class="flex justify-end mt-4">
					<button
						class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
						on:click={() => (showModal = false)}
					>
						Fechar
					</button>
				</div>
			</div>
		</div>
	{/if}
	
	<style>
		.modal-overlay {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background-color: rgba(0, 0, 0, 0.5);
			display: flex;
			justify-content: center;
			align-items: center;
			z-index: 50;
		}
	
		.modal-content {
			background: white;
			border-radius: 8px;
			padding: 16px;
			width: 90%;
			max-width: 500px;
			box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
		}
	
		.cursor-pointer {
			cursor: pointer;
		}
	</style>
	