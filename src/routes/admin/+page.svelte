<script>
	import { onMount } from 'svelte';
	let isLoading = true;
	let isAuthenticated = false;

	async function validateToken() {
		const token = localStorage.getItem('MutterCorp');
		if (!token) return false;

		try {
			const response = await fetch('https://dev.muttercorp.com.br/users/check-admin', {
				headers: { Authorization: `Bearer ${token}` }
			});
			return response.ok;
		} catch (error) {
			return false;
		}
	}

	onMount(async () => {
		isAuthenticated = await validateToken();
		isLoading = false;
		if (!isAuthenticated) window.location.href = '/login';
	});
</script>

{#if isLoading}
	<div class="skeleton-container">
		<div class="skeleton-header"></div>
		<div class="skeleton-message"></div>
	</div>
{:else if isAuthenticated}
	<div class="container">
		<header>
			<h1>Página Admin</h1>
		</header>
		<p class="message">Este conteúdo só é acessível para administradores autenticados.</p>
	</div>
{/if}

<style>
	/* Cores melhoradas para melhor contraste */
	h1 {
		color: #2c3e50; /* Azul mais escuro */
		font-size: 2.2em;
	}

	.message {
		color: #34495e; /* Cinza-azulado escuro */
		font-size: 1.3em;
		line-height: 1.6;
	}

	/* Efeito skeleton durante o loading */
	.skeleton-container {
		max-width: 800px;
		margin: 0 auto;
		padding: 20px;
	}

	.skeleton-header {
		height: 40px;
		width: 60%;
		margin: 0 auto 20px;
		background: #ecf0f1;
		border-radius: 4px;
		animation: pulse 1.5s infinite;
	}

	.skeleton-message {
		height: 100px;
		background: #ecf0f1;
		border-radius: 4px;
		animation: pulse 1.5s infinite;
	}

	@keyframes pulse {
		0%, 100% { opacity: 0.6; }
		50% { opacity: 1; }
	}
</style>