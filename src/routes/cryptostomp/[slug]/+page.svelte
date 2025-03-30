<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	interface Post {
		title: string;
		modifiedText: string;
		img?: string;
	}

	const blogName = "CryptoStomp";
	const preview = '';
	let error = $state(false);
	let modifiedText = $state('');
	let title = $state('');
	let errorMessage = $state('');
	let img = '';
	let isLoading = $state(true);

	function getPreviewText(text: string, maxLength: number): string {
		return text.length > maxLength ? text.slice(0, maxLength) : text;
	}

	async function fetchPostData(slug: string) {
		console.log('Iniciando fetch do post com slug:', slug);
		try {
			const response = await fetch(`https://dev.muttercorp.com.br/investing-new/${slug}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			});

			console.log('Status da resposta:', response.status);

			if (!response.ok) {
				throw new Error(`Falha ao buscar dados: ${response.status}`);
			}

			const data = await response.json();
			console.log('Dados recebidos:', data);

			if (!data) {
				throw new Error('Post não encontrado');
			}

			img = data.img || 'https://assets.coingecko.com/coins/images/1/small/bitcoin.png';
			title = data.title || 'Título não disponível';
			modifiedText = data.modifiedText || 'Conteúdo não disponível';
			console.log('Dados processados:', { title, modifiedText: `${modifiedText.substring(0, 100)}...` });
			
			error = false;
		} catch (err) {
			console.error('Erro ao buscar post:', err);
			error = true;
			errorMessage = err instanceof Error ? err.message : 'Ocorreu um erro inesperado';
		} finally {
			isLoading = false;
		}
	}

	onMount(() => {
		console.log('Componente montado');
		const slug = $page.params.slug;
		console.log('Slug extraído:', slug);
		if (slug) {
			fetchPostData(slug);
		} else {
			error = true;
			errorMessage = 'Slug não encontrado';
			isLoading = false;
		}
	});
</script>

<svelte:head>
	<title>{title ? `${title} | CryptoStomp` : 'CryptoStomp - Análise Técnica de Criptomoedas'}</title>
	<meta
		name="description"
		content={modifiedText ? getPreviewText(modifiedText, 160) : 'Análise técnica em tempo real de criptomoedas na Binance. Gráficos de candlestick, indicadores técnicos e dados históricos para traders.'}
	/>
	<meta
		name="keywords"
		content="Criptomoedas, Bitcoin, Ethereum, Análise Técnica, Trading, Binance, Gráficos, Candlestick, RSI, MACD, {title}"
	/>
	<meta name="author" content="CryptoStomp" />
	<meta property="og:title" content={title ? `${title} | CryptoStomp` : 'CryptoStomp - Análise Técnica de Criptomoedas'} />
	<meta
		property="og:description"
		content={modifiedText ? getPreviewText(modifiedText, 160) : 'Análise técnica em tempo real de criptomoedas na Binance. Gráficos de candlestick, indicadores técnicos e dados históricos para traders.'}
	/>
	<meta property="og:image" content={img} />
	<meta property="og:url" content={`https://muttercorp.com.br/cryptostomp/${$page.params.slug}`} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta property="og:type" content="article" />
</svelte:head>

<div class="min-h-screen bg-gradient-to-l from-gray-900 via-black to-gray-900 py-12">
	{#if isLoading}
		<div class="container mx-auto px-4 text-center">
			<div class="animate-pulse space-y-4">
				<div class="h-8 bg-gray-700 rounded w-3/4 mx-auto"></div>
				<div class="space-y-3">
					<div class="h-4 bg-gray-700 rounded"></div>
					<div class="h-4 bg-gray-700 rounded w-5/6"></div>
					<div class="h-4 bg-gray-700 rounded w-4/6"></div>
				</div>
			</div>
		</div>
	{:else if error}
		<div class="error-container">
			<h1 class="text-2xl font-bold mb-4">Erro</h1>
			<p class="text-lg">{errorMessage}</p>
			<a href="/cryptostomp" class="inline-block mt-6 px-6 py-2 bg-orange-500 hover:bg-orange-600 rounded-lg text-white transition-colors">
				Voltar para Home
			</a>
		</div>
	{:else}
		<div class="container">
			<!-- Banner Binance -->
			<div class="mb-12">
				<a href="https://www.binance.com/referral/earn-together/refertoearn2000usdc/claim?hl=en&ref=GRO_14352_14CQL&utm_source=Lite_web_account" 
					target="_blank"
					class="block relative group overflow-hidden rounded-2xl">
					<div class="relative h-48 overflow-hidden">
						<img
							src="https://conteudointimo.s3.amazonaws.com/56e93a94570d8e976ded439a2c17ff6ee370bd0b9adb9b7776e105b3f31ce880.jpeg"
							alt="Binance Referral"
							class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
						/>
						<div class="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent flex items-center p-8">
							<div>
								<h3 class="text-3xl font-bold text-orange-500 mb-2">Comece a Trader Agora</h3>
								<p class="text-xl text-white/90">Ganhe bônus no seu primeiro depósito</p>
								<button class="mt-4 px-6 py-2 bg-orange-500 hover:bg-orange-600 rounded-lg font-semibold transition-colors">
									Criar Conta
								</button>
							</div>
						</div>
					</div>
				</a>
			</div>

			<div class="post">
				<h1 class="post-title">{title || 'Carregando...'}</h1>
				<div class="post-body">
					{#if modifiedText}
						{@html modifiedText}
					{:else}
						<p class="text-gray-400">Carregando conteúdo...</p>
					{/if}
				</div>
			</div>
		</div>
	{/if}
</div>

<style>
	.container {
		max-width: 800px;
		margin: 0 auto;
		padding: 20px;
		background: rgba(17, 17, 17, 0.7);
		backdrop-filter: blur(10px);
		border: 1px solid rgba(249,115,22,0.2);
		border-radius: 16px;
		box-shadow: 0 0 20px rgba(249,115,22,0.1);
	}

	.post-title {
		font-size: 2.5em;
		color: rgb(249,115,22);
		margin: 0 0 1em 0;
		line-height: 1.2;
		text-shadow: 0 0 10px rgba(249,115,22,0.3);
	}

	.post-body {
		font-size: 1.1em;
		color: #e5e5e5;
		white-space: pre-wrap;
		word-wrap: break-word;
		line-height: 1.8;
		padding: 0 1rem;
	}

	.error-container {
		max-width: 600px;
		margin: 0 auto;
		padding: 20px;
		background: rgba(220, 38, 38, 0.1);
		color: #ef4444;
		border: 1px solid rgba(220, 38, 38, 0.3);
		border-radius: 8px;
		backdrop-filter: blur(10px);
		text-align: center;
	}

	.post-body h1 {
		color: rgb(249,115,22);
		margin-top: 1.5em;
		margin-bottom: 0.5em;
	}

	/* Responsividade */
	@media (max-width: 768px) {
		.container {
			padding: 15px;
			margin: 0 15px;
		}

		.post-title {
			font-size: 2em;
		}

		.post-body {
			font-size: 1em;
			padding: 0;
		}
	}

	@media (max-width: 480px) {
		.container {
			padding: 10px;
			margin: 0 10px;
		}

		.post-title {
			font-size: 1.8em;
		}
	}
</style>
