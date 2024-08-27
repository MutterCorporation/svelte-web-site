<script>
	import { onMount } from 'svelte';
	let isLoading = true;
	let isAuthenticated = false;

	// Função para validar o token
	async function validateToken() {
		const token = localStorage.getItem('MutterCorp');
		if (!token) {
			return false; // Não autenticado se não houver token
		}

		const response = await fetch('https://dev.muttercorp.com.br/users/check-admin', {
			method: 'GET',
			headers: {
				accept: '*/*',
				Authorization: `Bearer ${token}` // Envia o token no cabeçalho Authorization
			}
		});

		if (response.ok) {
			return true; // Autenticado
		} else {
			return false; // Não autenticado
		}
	}

	onMount(async () => {
		isAuthenticated = await validateToken();
		isLoading = false; // A autenticação terminou
		if (!isAuthenticated) {
			window.location.href = '/login'; // Redireciona para login se não autenticado
		}
	});
</script>

<div class="container">
	<header>
		<h1>Página Admin</h1>
	</header>
	<p class="message">Este conteúdo só é acessível para administradores autenticados.</p>
</div>

<style>
	/* Seu CSS permanece inalterado, incluindo os estilos do esqueleto */
	body {
		font-family: Arial, sans-serif;
		background-color: #f4f4f4;
		margin: 0;
		padding: 0;
	}

	.container {
		max-width: 800px;
		margin: 0 auto;
		padding: 20px;
		background: #fff;
		border-radius: 8px;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
	}

	header {
		text-align: center;
		margin-bottom: 20px;
	}

	h1 {
		font-size: 2em;
		color: #333;
	}

	.message {
		margin-top: 20px;
		font-size: 1.2em;
		color: #333;
	}

	/* Skeleton styles */
	.skeleton {
		opacity: 0.6;
		animation: pulse 1.5s infinite;
	}

	.skeleton-text {
		background-color: #e0e0e0;
		border-radius: 4px;
		height: 20px;
		width: 100%;
		margin-bottom: 10px;
	}

	.skeleton-button {
		background-color: #e0e0e0;
		border-radius: 4px;
		height: 50px;
		width: 100px;
		margin-top: 15px;
	}

	@keyframes pulse {
		0% {
			opacity: 0.6;
		}
		50% {
			opacity: 1;
		}
		100% {
			opacity: 0.6;
		}
	}
</style>
