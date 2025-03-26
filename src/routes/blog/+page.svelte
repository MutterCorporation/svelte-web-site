<svelte:head>
	<title>CyberBlog - Pensamentos do Futuro</title>
	<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&family=Press+Start+2P&display=swap" rel="stylesheet">
</svelte:head>

<script>
	import { onMount } from 'svelte';
	import { fly, fade } from 'svelte/transition';

	let posts = [];
	let loading = true;

	async function fetchPosts() {
		try {
			const response = await fetch('https://dev.muttercorp.com.br/blog/');
			posts = await response.json();
			posts = posts.map(post => ({
				...post,
				date: new Date(post.created_at).toLocaleDateString('pt-BR', {
					day: '2-digit',
					month: 'long',
					year: 'numeric'
				})
			}));
		} catch (error) {
			console.error('Error fetching posts:', error);
		} finally {
			loading = false;
		}
	}

	onMount(fetchPosts);
</script>

<div class="cyberpunk-container">
	<!-- Grid de fundo animado -->
	<div class="cyber-grid"></div>

	<!-- Header -->
	<header class="cyber-header">
		<div class="glitch-container">
			<h1 class="glitch" data-text="CyberBlog">CyberBlog</h1>
		</div>
		<p class="neon-text">Explorando o futuro através das palavras</p>
	</header>

	<!-- Conteúdo Principal -->
	<main class="cyber-main">
		{#if loading}
			<div class="loading-container">
				<div class="cyber-spinner"></div>
				<p class="neon-text">Carregando dados...</p>
			</div>
		{:else}
			<div class="posts-grid">
				{#each posts as post}
					<article 
						class="cyber-card"
						in:fly="{{ y: 50, duration: 800 }}"
					>
						<div class="card-image">
							<img src={post.img} alt={post.titulo} />
							<div class="image-glitch"></div>
						</div>
						<div class="card-content">
							<h2 class="cyber-title">{post.titulo}</h2>
							<p class="cyber-text">{post.preview}</p>
							<div class="card-footer">
								<span class="cyber-date">{post.date}</span>
								<a href={`/blog/${post.id}`} class="cyber-button">
									<span class="button-text">Ler mais</span>
									<span class="button-glitch"></span>
								</a>
							</div>
						</div>
					</article>
				{/each}
			</div>
		{/if}
	</main>
</div>

<style>
	/* Adicione estas regras CSS para melhorar a legibilidade */
	.cyber-title {
		font-size: 1.8rem !important;
		margin-bottom: 1.5rem !important;
		text-shadow: 0 0 10px #ff00ea !important;
	}

	.cyber-text {
		font-size: 1.1rem !important;
		line-height: 1.8 !important;
		color: #e0e0e0 !important;
	}

	.card-image {
		position: relative;
		height: 250px !important;
		background: #000;
	}

	.card-image img {
		object-fit: cover;
		transition: transform 0.3s;
	}

	.cyber-card:hover img {
		transform: scale(1.05);
	}

	/* Melhorias de responsividade */
	@media (max-width: 768px) {
		.posts-grid {
			grid-template-columns: 1fr !important;
		}
		
		.glitch {
			font-size: 2.5rem !important;
		}
	}
</style>