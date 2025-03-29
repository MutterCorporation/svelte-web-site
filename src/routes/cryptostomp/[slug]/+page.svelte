<script lang="ts">
	import { onMount } from 'svelte';

	interface Post {
		title: string;
		modifiedText: string;
		img?: string;
	}

	let blogName = "CryptoStomp";
	let error = $state(false);
	let preview = '';
	let modifiedText = $state('');
	let title = $state('');
	let errorMessage = $state('');
	let img = '';

	function getPreviewText(text: string, maxLength: number): string {
		return text.length > maxLength ? text.slice(0, maxLength) : text;
	}

	async function fetchPostData(slug: string) {
		try {
			const response = await fetch(`https://dev.muttercorp.com.br/investing-new/${slug}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			});

			if (!response.ok) {
				throw new Error('Failed to fetch post data');
			}

			const data = await response.json();

			if (!data) {
				throw new Error('Post not found');
			}

			img = data.img || 'https://assets.coingecko.com/coins/images/1/small/bitcoin.png';
			title = data.title;
			modifiedText = data.modifiedText;
			error = false;
		} catch (error) {
			error = true;
			errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
		}
	}

	onMount(() => {
		const slug = window.location.pathname.split('/').pop();
		if (slug) {
			fetchPostData(slug);
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
	<meta property="og:url" content={`https://muttercorp.com.br/cryptostomp/${window.location.pathname.split('/').pop()}`} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta property="og:type" content="article" />
</svelte:head>

<div class="min-h-screen bg-gradient-to-l from-gray-900 via-black to-gray-900 py-12">
	{#if error}
		<div class="error-container">
			<h1>Erro</h1>
			<p>{errorMessage}</p>
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
				<h1 class="post-title">{title}</h1>
				<div class="post-body">
					{modifiedText}
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

	.post-body h1,
	.post-body h2,
	.post-body h3 {
		color: rgb(249,115,22);
		margin-top: 1.5em;
		margin-bottom: 0.5em;
	}

	.code-block {
		background: rgba(31, 31, 31, 0.8);
		border: 1px solid rgba(249,115,22,0.2);
		padding: 1rem;
		border-radius: 8px;
		overflow-x: auto;
		margin: 1em 0;
	}
</style>
