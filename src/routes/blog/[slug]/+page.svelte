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
	<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&family=Press+Start+2P&display=swap" rel="stylesheet">
</svelte:head>

<script>
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import CommentSystem from '../../../components/CommentSystem.svelte';
	import ViewCounter from '../../../components/ViewCounter.svelte';

	let blogName = "CyberBlog";
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
			
			img = data.img || 'https://placehold.co/600x400/0a0a2e/00f6ff?text=CyberBlog';
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

<div class="cyberpunk-container">
	<!-- Partículas melhoradas -->
	<div class="cyber-particles"></div>
	<div class="cyber-grid"></div>

	{#if loading}
		<div class="loading-container">
			<div class="cyber-spinner-wrapper">
				<div class="cyber-spinner"></div>
				<div class="spinner-ring"></div>
			</div>
			<p class="neon-text">Carregando dados...</p>
		</div>
	{:else if error}
		<div class="error-container" in:fly="{{ y: 50, duration: 800 }}">
			<div class="error-glow"></div>
			<h1 class="error-title glitch" data-text="Erro">{errorMessage}</h1>
			<a href="/blog" class="cyber-button">
				<span class="button-content">
					<span class="button-text">← Voltar para o blog</span>
				</span>
				<span class="button-glitch"></span>
			</a>
		</div>
	{:else}
		<main class="post-container" in:fly="{{ y: 50, duration: 800 }}">
			<article class="cyber-card post-content">
				<div class="card-border-glow"></div>
				
				<header class="post-header">
					<h1 class="cyber-title post-title">{title}</h1>
					
					<div class="post-meta">
						<ViewCounter postId={slug} />
						<div class="post-divider"></div>
					</div>
					
					{#if img}
						<div class="card-image post-image-wrapper">
							<img 
								src={img}
								alt={title}
								class="post-image"
								loading="lazy"
							/>
							<div class="image-overlay"></div>
							<div class="image-scan-line"></div>
						</div>
					{/if}
				</header>
				
				<div class="post-body cyber-text">
					{@html previewHtml}
				</div>
				
				<footer class="post-footer">
					<div class="footer-divider"></div>
					<a href="/blog" class="cyber-button">
						<span class="button-content">
							<span class="button-text">← Voltar para blog</span>
						</span>
						<span class="button-glitch"></span>
					</a>
				</footer>
			</article>

			<!-- Sistema de Comentários -->
			<CommentSystem postId={slug} />
		</main>
	{/if}
</div>

<style>
	/* Estilos Base */
	:global(body) {
		background: #0a0a0f;
		color: #fff;
		font-family: 'Orbitron', sans-serif;
		margin: 0;
		overflow-x: hidden;
	}

	.cyberpunk-container {
		min-height: 100vh;
		position: relative;
		padding: 2rem;
		background: linear-gradient(45deg, #0a0a2e, #1a1a3a);
	}

	/* Partículas de fundo */
	.cyber-particles {
		position: fixed;
		inset: 0;
		background-image: 
			radial-gradient(1px 1px at 20px 30px, #ff00ea, transparent),
			radial-gradient(1px 1px at 40px 70px, #00f6ff, transparent),
			radial-gradient(1px 1px at 90px 40px, #ff00ea, transparent),
			radial-gradient(1px 1px at 130px 80px, #00f6ff, transparent);
		background-repeat: repeat;
		background-size: 150px 150px;
		opacity: 0.3;
		animation: particle-float 20s linear infinite;
		z-index: 0;
	}

	/* Grid de Fundo */
	.cyber-grid {
		position: fixed;
		inset: 0;
		background: 
			linear-gradient(90deg, #ff00ea 1px, transparent 1px) 0 0 / 50px 50px,
			linear-gradient(0deg, #00f6ff 1px, transparent 1px) 0 0 / 50px 50px;
		opacity: 0.1;
		z-index: 0;
		animation: grid-scroll 20s linear infinite;
	}

	/* Post Container */
	.post-container {
		max-width: 900px;
		margin: 2rem auto;
		position: relative;
		z-index: 1;
	}

	.cyber-card {
		background: rgba(255, 255, 255, 0.05);
		backdrop-filter: blur(10px);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 10px;
		overflow: hidden;
		position: relative;
		padding: 2rem;
		box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
	}

	.cyber-card::before {
		content: '';
		position: absolute;
		inset: 0;
		background: linear-gradient(45deg, #ff00ea, #00f6ff);
		opacity: 0.05;
	}

	.cyber-title {
		font-size: 2.5rem;
		color: #fff;
		text-shadow: 0 0 5px #ff00ea, 0 0 10px #ff00ea;
		line-height: 1.3;
		margin-bottom: 1.5rem;
		font-family: 'Press Start 2P', cursive;
	}

	.post-title {
		font-size: 2rem;
		margin-bottom: 1.5rem;
	}

	.card-image {
		position: relative;
		overflow: hidden;
		border-radius: 8px;
		margin: 2rem 0;
	}

	.post-image {
		width: 100%;
		height: 100%;
		object-fit: contain;
		transition: transform 0.3s;
	}

	.post-image:hover {
		transform: scale(1.02);
	}

	.image-glitch {
		position: absolute;
		inset: 0;
		background: linear-gradient(45deg, #ff00ea, #00f6ff);
		mix-blend-mode: overlay;
		opacity: 0.3;
	}

	.cyber-text {
		color: #b8b8b8;
		line-height: 1.8;
		font-size: 1.1rem;
	}

	

	.post-body {
		margin: 2rem 0;
	}

	.post-body :global(h2) {
		font-size: 1.8rem;
		color: #00f6ff;
		margin: 2rem 0 1rem;
		text-shadow: 0 0 5px #00f6ff;
	}

	.post-body :global(pre) {
		background: rgba(0, 0, 0, 0.5);
		color: #00f6ff;
		padding: 1.5rem;
		border-radius: 8px;
		overflow-x: auto;
		margin: 1.5rem 0;
		border-left: 3px solid #ff00ea;
	}

	.post-body :global(code) {
		font-family: 'Fira Code', monospace;
		font-size: 0.9rem;
		color: #00f6ff;
	}

	.post-body :global(a) {
		color: #ff00ea;
		text-decoration: none;
		position: relative;
		transition: color 0.3s;
	}

	.post-body :global(a:hover) {
		color: #00f6ff;
		text-shadow: 0 0 5px #00f6ff;
	}

	.post-body :global(blockquote) {
		border-left: 4px solid #ff00ea;
		padding-left: 1rem;
		margin-left: 0;
		color: #cccccc;
	}

	.post-body :global(ul), .post-body :global(ol) {
		margin-left: 1.5rem;
		color: #b8b8b8;
	}

	.post-body :global(img) {
		max-width: 100%;
		border-radius: 8px;
		margin: 1.5rem 0;
	}

	.post-footer {
		margin-top: 3rem;
		border-top: 1px solid rgba(255, 255, 255, 0.1);
		padding-top: 2rem;
	}

	.post-image {
		width: 100%;
		height: 100%;
		object-fit: contain;
		transition: transform 0.3s;
	}

	.post-image:hover {
		transform: scale(1.02);
	}

	/* Botões */
	.cyber-button {
		position: relative;
		padding: 0.7rem 1.2rem;
		background: linear-gradient(45deg, #ff00ea, #00f6ff);
		border: none;
		border-radius: 5px;
		color: #fff;
		text-decoration: none;
		font-weight: bold;
		overflow: hidden;
		display: inline-block;
		font-family: 'Orbitron', sans-serif;
		transition: transform 0.2s;
	}

	.cyber-button:hover {
		transform: translateY(-3px);
	}

	.button-glitch {
		position: absolute;
		inset: 0;
		background: linear-gradient(45deg, #ff00ea, #00f6ff);
		filter: blur(10px);
		opacity: 0;
		transition: opacity 0.3s;
	}

	.cyber-button:hover .button-glitch {
		opacity: 0.5;
	}

	/* Error Container */
	.error-container {
		text-align: center;
		padding: 4rem 2rem;
		background: rgba(255, 0, 0, 0.1);
		border-radius: 10px;
		max-width: 600px;
		margin: 4rem auto;
		position: relative;
		z-index: 1;
		backdrop-filter: blur(10px);
		border: 1px solid rgba(255, 0, 0, 0.2);
	}

	.error-title {
		font-size: 2rem;
		color: #ff004c;
		text-shadow: 0 0 10px #ff004c;
		margin-bottom: 2rem;
	}

	.glitch {
		position: relative;
		animation: glitch 1s infinite;
	}

	/* Loading */
	.loading-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 10;
	}

	.cyber-spinner {
		width: 50px;
		height: 50px;
		border: 3px solid #ff00ea;
		border-top-color: #00f6ff;
		border-radius: 50%;
		animation: spin 1s linear infinite;
	}

	.neon-text {
		color: #00f6ff;
		text-shadow: 0 0 5px #00f6ff, 0 0 10px #00f6ff;
		font-size: 1.2rem;
	}

	/* Animações */
	@keyframes grid-scroll {
		0% { transform: translateY(0); }
		100% { transform: translateY(50px); }
	}

	@keyframes spin {
		to { transform: rotate(360deg); }
	}

	@keyframes glitch {
		0% { text-shadow: 2px 2px #ff00ea, -2px -2px #00f6ff; }
		25% { text-shadow: -2px 2px #ff00ea, 2px -2px #00f6ff; }
		50% { text-shadow: 2px -2px #ff00ea, -2px 2px #00f6ff; }
		75% { text-shadow: -2px -2px #ff00ea, 2px 2px #00f6ff; }
		100% { text-shadow: 2px 2px #ff00ea, -2px -2px #00f6ff; }
	}

	/* Responsividade */
	@media (max-width: 768px) {
		.post-container {
			margin: 1rem auto;
			padding: 0;
		}

		.cyber-card {
			padding: 1.5rem;
		}

		.post-title {
			font-size: 1.5rem;
		}

		.post-image {
			max-height: 250px;
		}
		
		.cyber-title {
			font-size: 1.5rem;
		}
	}

	.post-meta {
		display: flex;
		align-items: center;
		gap: 1rem;
		margin-bottom: 2rem;
		padding-bottom: 1rem;
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
	}

	.post-divider {
		flex: 1;
		height: 1px;
		background: linear-gradient(90deg, transparent, #00f6ff, transparent);
	}

	.footer-divider {
		width: 100%;
		height: 2px;
		background: linear-gradient(90deg, transparent, #ff00ea, #00f6ff, transparent);
		margin-bottom: 2rem;
		opacity: 0.6;
	}

	.error-container {
		position: relative;
		text-align: center;
		padding: 4rem 2rem;
		background: 
			linear-gradient(145deg, rgba(255, 0, 0, 0.1), rgba(255, 0, 0, 0.05)),
			rgba(20, 0, 0, 0.8);
		backdrop-filter: blur(15px);
		border-radius: 16px;
		max-width: 600px;
		margin: 4rem auto;
		border: 1px solid rgba(255, 0, 0, 0.3);
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
	}

	.error-glow {
		position: absolute;
		inset: -20px;
		background: radial-gradient(circle, rgba(255, 0, 0, 0.3) 0%, transparent 70%);
		filter: blur(20px);
		z-index: -1;
	}
</style>