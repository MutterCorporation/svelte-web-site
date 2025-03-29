<script>
	import { P } from 'flowbite-svelte';
	import { onMount } from 'svelte';

	let prediction = $state([]);
	let posts = $state([]);
	let blogName = 'Investing Notices';
	let hasError = $state(false);
	let cryptoPrices = $state([]);

	export function load() {
		const token = localStorage.getItem('MutterCorp');
		const isAuthenticated = !!token;

		return {
			isAuthenticated
		};
	}

	async function fetchPosts(page = 1, size = 30) {
		try {
			const token = localStorage.getItem('MutterCorp');
			const res = await fetch(
				`https://dev.muttercorp.com.br/investing-new?page=${page}&pageSize=${size}`,
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`
					}
				}
			);

			if (res.ok) {
				const data = await res.json();
				posts = data;
			} else {
				if (res.status === 403 || res.status === 401) {
					localStorage.removeItem('MutterCorp');
					window.location.href = '/login';
				} else if (res.status === 500) {
					hasError = true;
				}
			}
		} catch (error) {
			hasError = true;
		}
	}

	// Função para buscar preços das criptomoedas
	async function fetchCryptoPrices() {
		try {
			const symbols = ['BTCUSDT', 'ETHUSDT', 'BNBUSDT', 'SOLUSDT', 'ADAUSDT'];
			const prices = await Promise.all(
				symbols.map(async (symbol) => {
					const response = await fetch(`https://api.binance.com/api/v3/ticker/24hr?symbol=${symbol}`);
					const data = await response.json();
					return {
						symbol: symbol.replace('USDT', ''),
						price: parseFloat(data.lastPrice).toFixed(2),
						change: parseFloat(data.priceChangePercent).toFixed(2)
					};
				})
			);
			cryptoPrices = prices;
		} catch (error) {
			console.error('Erro ao buscar preços:', error);
		}
	}

	onMount(() => {
		fetchPosts();
		fetchCryptoPrices();
		// Atualizar preços a cada 30 segundos
		setInterval(fetchCryptoPrices, 30000);
	});

	function goToPost(postId) {
		window.location.href = `/cryptostomp/${postId}`;
	}
</script>

<svelte:head>
	<title>{blogName} - Tecnologia, Ciências e Música</title>
	<meta
		name="description"
		content="Bem-vindo ao {blogName}, onde compartilho minhas experiências e conhecimentos sobre tecnologia, ciência e música."
	/>
	<meta
		name="keywords"
		content="Tecnologia, Ciência, Música, Blog, {blogName}, Desenvolvimento, Svelte, JavaScript"
	/>
	<meta name="author" content="Maikon Weber" />
	<meta property="og:title" content="{blogName} - Tecnologia, Ciência e Música" />
	<meta
		property="og:description"
		content="Descubra artigos sobre tecnologia, ciência e música no {blogName}."
	/>
	<meta property="og:url" content="https://muttercorp.com.br/blog" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta property="og:type" content="website" />
</svelte:head>

<div class="min-h-screen bg-gradient-to-l from-gray-900 via-black to-gray-900 text-gray-100">
	<div class="mx-auto max-w-6xl px-5 py-10">
		<!-- Header com efeito neon -->
		<header class="mb-12 text-center">
			<h1 class="mb-3 text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-300 drop-shadow-[0_0_15px_rgba(249,115,22,0.5)]">
				{blogName}
			</h1>
			<p class="text-xl text-orange-200/80">
				Notícias sobre finanças, investimentos e sinais de trades.
			</p>
		</header>

		<!-- Tags de Criptomoedas -->
		<div class="mb-8 flex flex-wrap gap-4 justify-center">
			{#each cryptoPrices as crypto}
				<div class="bg-gray-800/50 backdrop-blur-sm border border-orange-500/20 rounded-lg px-4 py-2 flex items-center gap-2">
					<span class="text-orange-500 font-bold">{crypto.symbol}</span>
					<span class="text-white">${crypto.price}</span>
					<span class={crypto.change >= 0 ? 'text-green-500' : 'text-red-500'}>
						{crypto.change >= 0 ? '+' : ''}{crypto.change}%
					</span>
				</div>
			{/each}
		</div>

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

		<!-- Grid de Posts -->
		{#if hasError}
			<p class="text-center text-red-500">
				Desculpe, este blog não está disponível no momento.
			</p>
		{:else if posts.length > 0}
			<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
				{#each posts as post (post.id)}
					<div
						class="cursor-pointer overflow-hidden rounded-xl bg-gray-800/50 backdrop-blur-sm border border-orange-500/20 shadow-[0_0_15px_rgba(249,115,22,0.1)] transition-all hover:scale-102 hover:shadow-[0_0_25px_rgba(249,115,22,0.2)]"
						onclick={() => goToPost(post.id)}
					>
						<div class="p-6">
							<h2 class="mb-3 text-2xl font-semibold text-orange-400">{post.title}</h2>
							<p class="mb-4 text-gray-300">
								{post.modifiedText && post.modifiedText.length > 100
									? post.modifiedText.substring(0, 100) + '...'
									: post.modifiedText}
							</p>
							<p class="text-sm text-orange-300/60">Publicado em: {post.createdAt}</p>
						</div>
					</div>
				{/each}
			</div>
		{:else}
			<p class="text-center text-gray-300">Nenhum post disponível.</p>
		{/if}
	</div>
</div>

<style>
	:global(body) {
		margin: 0;
		font-family: 'Inter', sans-serif;
		background-color: black;
	}

	@keyframes neon {
		0%, 100% {
			text-shadow: 0 0 10px rgba(249,115,22,0.8),
						0 0 20px rgba(249,115,22,0.8),
						0 0 30px rgba(249,115,22,0.8);
		}
		50% {
			text-shadow: 0 0 20px rgba(249,115,22,0.5),
						0 0 30px rgba(249,115,22,0.5),
						0 0 40px rgba(249,115,22,0.5);
		}
	}
</style>
