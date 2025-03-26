<svelte:head>
	{#if previewHtml}
		<title>{`${getPreviewText(title, 60)} - ${blogName}`}</title>
		<meta name="description" content={getPreviewText(preview, 160)}>
		<meta property="og:title" content={`${getPreviewText(title, 60)} - ${blogName}`}>
		<meta property="og:description" content={getPreviewText(preview, 160)}>
		<meta property="og:image" content={img || 'https://muttercorp.com.br/default-og-image.jpg'}>
		<meta property="og:url" content={`https://muttercorp.com.br/blog/${slug}`}>
	{:else}
		<title>{blogName}</title>
		<meta name="description" content="Blog oficial de Maikon Weber com artigos sobre tecnologia, ciência e música">
		<meta property="og:title" content={blogName}>
		<meta property="og:image" content="https://muttercorp.com.br/default-og-image.jpg">
	{/if}
	<meta name="keywords" content="Tecnologia, Ciência, Música, Desenvolvimento Web, Svelte, JavaScript">
	<meta name="author" content="Maikon Weber">
	<meta name="twitter:card" content="summary_large_image">
	<meta property="og:type" content={previewHtml ? 'article' : 'website'}>
</svelte:head>

<script>
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	let blogName = "Maikon Weber Blog";
	let slug = $state('');
	let previewHtml = $state('');
	let error = $state(false);
	let preview = $state('');
	let title = $state('');
	let errorMessage = $state('');
	let img = $state('');
	let loading = $state(true);

	function getPreviewText(text, maxLength) {
		if (!text) return '';
		return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
	}

	async function fetchPostData() {
		try {
			const response = await fetch(`https://dev.muttercorp.com.br/blog/${slug}`);
			
			if (!response.ok) throw new Error(`Erro ${response.status}: ${response.statusText}`);
			if (response.status === 404) throw new Error('Post não encontrado');

			const data = await response.json();
			
			img = data.img || 'https://muttercorp.com.br/default-post-image.jpg';
			title = data.titulo || 'Sem título';
			preview = data.preview || '';
			previewHtml = data.text || '';
		} catch (err) {
			error = true;
			errorMessage = err.message || 'Erro ao carregar o post';
			console.error('Fetch error:', err);
		} finally {
			loading = false;
		}
	}

	onMount(() => {
		slug = window.location.pathname.split('/').pop();
		if (!slug) {
			error = true;
			errorMessage = 'URL inválida';
			loading = false;
			return;
		}
		fetchPostData();
	});
</script>

{#if loading}
	<div class="loading-container">
		<div class="spinner"></div>
		<p class="loading-text">Carregando post...</p>
	</div>
{:else if error}
	<div class="error-container">
		<h1 class="error-title">⛔ {errorMessage}</h1>
		<a href="/blog" class="back-link">Voltar para o blog</a>
	</div>
{:else}
	<main class="post-container">
		<article class="post-content">
			<header class="post-header">
				<h1 class="post-title">{title}</h1>
				{#if img}
					<figure class="post-image-wrapper">
						<img 
							src={img}
							alt={title}
							class="post-image"
							loading="lazy"
						/>
					</figure>
				{/if}
			</header>
			
			<div class="post-body">
				{@html previewHtml}
			</div>
			
			<footer class="post-footer">
				<a href="/blog" class="back-button">← Voltar para todos os posts</a>
			</footer>
		</article>
	</main>
{/if}

<style>
	/* Estilos otimizados */
	.post-container {
		max-width: 800px;
		margin: 2rem auto;
		padding: 2rem;
		background: #fff;
		border-radius: 12px;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
	}

	.post-title {
		font-size: 2.5rem;
		color: #1a1a1a;
		line-height: 1.3;
		margin-bottom: 1.5rem;
	}

	.post-image-wrapper {
		margin: 2rem 0;
		border-radius: 8px;
		overflow: hidden;
		background: #f8f9fa;
	}

	.post-image {
		width: 100%;
		height: 400px;
		object-fit: cover;
		transition: transform 0.3s ease;
	}

	.post-image:hover {
		transform: scale(1.02);
	}

	.post-body {
		font-size: 1.1rem;
		line-height: 1.8;
		color: #333;
	}

	.post-body :global(h2) {
		font-size: 1.8rem;
		color: #2d3748;
		margin: 2rem 0 1rem;
	}

	.post-body :global(pre) {
		background: #1a1a1a;
		color: #f8f8f2;
		padding: 1.5rem;
		border-radius: 8px;
		overflow-x: auto;
		margin: 1.5rem 0;
	}

	.post-body :global(code) {
		font-family: 'Fira Code', monospace;
		font-size: 0.9rem;
	}

	.error-container {
		text-align: center;
		padding: 4rem 2rem;
		background: #fff0f0;
		border-radius: 8px;
		max-width: 600px;
		margin: 2rem auto;
	}

	.back-link {
		color: #3182ce;
		text-decoration: none;
		font-weight: 500;
		margin-top: 1rem;
		display: inline-block;
	}

	.loading-container {
		text-align: center;
		padding: 4rem 0;
	}

	.spinner {
		width: 50px;
		height: 50px;
		border: 4px solid #e2e8f0;
		border-top-color: #3182ce;
		border-radius: 50%;
		animation: spin 1s linear infinite;
		margin: 0 auto;
	}

	@keyframes spin {
		to { transform: rotate(360deg); }
	}

	@media (max-width: 768px) {
		.post-container {
			margin: 1rem;
			padding: 1.5rem;
		}

		.post-title {
			font-size: 2rem;
		}

		.post-image {
			height: 250px;
		}
	}
</style>