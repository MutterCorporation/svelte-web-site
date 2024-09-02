<script>
	import { onMount } from 'svelte';
	import Overlay from './Overlay.svelte'; // Componente de sobreposição
	import CornerText from './CornerText.svelte'; // Componente de texto no canto
	
	let isAuthenticated = false;
	let isLoading = true;

	onMount(async () => {
		isAuthenticated = await validateToken();
		isLoading = false;
	});

	async function validateToken() {
		const token = localStorage.getItem('MutterCorp');
		if (!token) {
			return false;
		}

		const response = await fetch('https://dev.muttercorp.com.br/users/check-blue-sky', {
			method: 'GET',
			headers: {
				accept: '*/*',
				Authorization: `Bearer ${token}`
			}
		});

		return response.ok;
	}

	function handleLogin() {
		window.location.href = '/login';
	}

	function handlePurchase() {
		window.location.href = '/purchase';
	}
</script>

<div class="app-container">
	<header class="header">
		<h1>Blue Sky Phase</h1>
		<p>A solução ideal para agendar suas postagens de acordo com o tempo!</p>
	</header>

	{#if isLoading}
		<p>Loading...</p>
	{:else if isAuthenticated}
		<div class="grid-container">
			<section class="product-info">
				<h2>Sobre o Produto</h2>
				<p>O Blue Sky Phase permite que você agende suas postagens para momentos estratégicos, garantindo maior visibilidade e engajamento.</p>
				<ul>
					<li>Agendamento flexível</li>
					<li>Integração com redes sociais</li>
					<li>Relatórios de desempenho</li>
					<li>Suporte dedicado</li>
				</ul>
				<img src="/images/blue-sky-phase.png" alt="Blue Sky Phase" />
			</section>

			<div class="button-group">
				<button class="btn" on:click={handleLogin}>Login</button>
				<button class="btn" on:click={handlePurchase}>Página de Compras</button>
			</div>
		</div>
		<Overlay />
		<CornerText />
	{:else}
		<div class="login-prompt">
			<p>Você precisa estar autenticado para acessar o conteúdo.</p>
			<button class="btn" on:click={handleLogin}>Fazer Login</button>
		</div>
	{/if}
</div>

<style>
	/* Reset básico e estilo geral da página */
	body {
		font-family: 'Arial', sans-serif;
		background-color: #f0f8ff; /* Azul claro */
		margin: 0;
		padding: 0;
	}

	.app-container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 20px;
	}

	.header {
		text-align: center;
		padding: 20px 0;
		background-color: #007bff; /* Azul forte */
		color: #fff;
	}

	.grid-container {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 20px;
	}

	.product-info {
		background: #fff;
		padding: 20px;
		border-radius: 8px;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
	}

	.product-info h2 {
		color: #007bff; /* Azul */
	}

	.product-info p {
		color: #333;
		font-size: 1.2em;
		margin-bottom: 15px;
	}

	.product-info img {
		width: 100%;
		height: auto;
		border-radius: 8px;
	}

	.button-group {
		margin-top: 20px;
		display: flex;
		justify-content: center;
		gap: 15px;
	}

	.btn {
		background-color: #007bff;
		color: #fff;
		border: none;
		padding: 12px 24px;
		border-radius: 4px;
		font-size: 16px;
		cursor: pointer;
	}

	.btn:hover {
		background-color: #0056b3;
	}

	.login-prompt {
		text-align: center;
		margin: 20px 0;
	}
</style>
