<svelte:head>
	{#if modifiedText}
		<title>{`${getPreviewText(title, 60)}... - Maikon Weber Blog`}</title>
		<meta name="description" content={`${getPreviewText(preview, 160)}...`}>
		<meta name="keywords" content="Tecnologia, Ciência, Música, Blog, Maikon Weber, Desenvolvimento, Svelte, JavaScript">
		<meta name="author" content="Maikon Weber">
		<meta property="og:title" content={`${getPreviewText(title, 60)}... - Maikon Weber Blog`}>
		<meta property="og:description" content={`${getPreviewText(preview, 160)}...`}>
		<meta property="og:image" content={img || 'default-image-url'}>
		<meta property="og:url" content={`https://muttercorp.com.br/blog/${window.location.pathname.split('/').pop()}`}>
		<meta name="twitter:card" content="summary_large_image">
		<meta property="og:type" content="article">
	{:else}
		<title>Maikon Weber Blog</title>
		<meta name="description" content="Bem-vindo ao Maikon Weber Blog, onde compartilho minhas experiências e conhecimentos sobre tecnologia, ciência e música.">
		<meta name="keywords" content="Tecnologia, Ciência, Música, Blog, Maikon Weber, Desenvolvimento, Svelte, JavaScript">
		<meta name="author" content="Maikon Weber">
		<meta property="og:title" content="CryptoStomp">
		<meta property="og:description" content="Descubra artigos sobre tecnologia, ciência e música no Maikon Weber Blog.">
		<meta property="og:image" content="default-image-url">
		<meta property="og:url" content="https://muttercorp.com.br/cryptostomp">
		<meta name="twitter:card" content="summary_large_image">
		<meta property="og:type" content="website">
	{/if}
</svelte:head>
<script>
	import { onMount } from 'svelte';

	let blogName = "CryptoStomp"
	let error = $state(false);
	let preview = ''
	let modifiedText = $state('')
	let title = $state('')
	let errorMessage = $state('');
	let img = '';

	function getPreviewText(text, maxLength) {
		return text.length > maxLength ? text.slice(0, maxLength) : text;
	}


	async function fetchPostData(slug) {
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

			// img = data.img;
			// const html = data.text;
			title = data.title
			modifiedText = data.modifiedText
			error = false; // Reset error state if fetch is successful
		} catch (error) {
			// console.error(error);
			error = true;
			errorMessage = error.message || 'An unexpected error occurred';
		}
	}

	onMount(() => {
		const slug = window.location.pathname.split('/').pop(); // Supondo que o slug está no final da URL
		fetchPostData(slug);
	});
</script>

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
				<a href="https://accounts.binance.com/register?ref=SEU_ID_AQUI" 
					target="_blank"
					class="block relative group overflow-hidden rounded-2xl">
					<div class="relative h-48 overflow-hidden">
						<img
							src="https://public.bnbstatic.com/image/cms/blog/20230613/1c5f7d0c-33e7-4ead-8076-e4c3cd8e4362.png"
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
