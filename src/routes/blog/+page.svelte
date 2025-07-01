<svelte:head>
	<title>CyberBlog - Pensamentos do Futuro</title>
	<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@300;400;500;700;900&family=Press+Start+2P&family=Rajdhani:wght@300;400;500;600;700&display=swap" rel="stylesheet">
</svelte:head>

<script>
	import { onMount } from 'svelte';
	import { fly, fade } from 'svelte/transition';
	import ViewCounter from '../../components/ViewCounter.svelte';

	/**
	 * @type {any[]}
	 */
	let posts = [];
	let loading = true;
	
	// Exemplo do formato de dados esperado conforme comentário
	// {
	//     "id": 2,
	//     "titulo": "Svelte é a chave",
	//     "img": "https://conteudointimo.s3.amazonaws.com/cb481e11407a9a57ca3fc512a40c7b480631f1ad6ae954b8ebd3f74aff20bf54.jpeg",
	//     "text": "<p>Aqui é um desrição</p>",
	//     "preview": "No processo deve ter Processo",
	//     "created_at": "2025-03-26T19:20:58.762Z",
	//     "deleted_at": null
	// }

	async function fetchPosts() {
		try {
			const response = await fetch('https://dev.muttercorp.com.br/blog/');
			const data = await response.json();
			
			// Mapeamento dos dados recebidos para o formato esperado pelos componentes
			posts = data.map((/** @type {{ titulo: any; img: any; preview: any; created_at: string | number | Date; id: { toString: () => any; }; text: any; }} */ post) => ({
				title: post.titulo || 'Sem título', // Use titulo do API e garanta que existe
				image: post.img || 'https://placehold.co/600x400/0a0a2e/00f6ff?text=CyberBlog', // Use fallback se imagem não existir
				excerpt: post.preview || 'Sem prévia disponível', // Use preview do API
				date: new Date(post.created_at).toLocaleDateString('pt-BR'), // Formata a data
				slug: post.id.toString(), // Cria um slug a partir do ID
				text: post.text || '' // Mantém o texto completo
			}));
			
			console.log('Posts processados:', posts);
		} catch (error) {
			console.error('Erro ao carregar posts:', error);
			// Dados de fallback para evitar tela vazia em caso de erro
			posts = [
				{
					title: 'Erro de Conexão',
					image: 'https://placehold.co/600x400/0a0a2e/ff00ea?text=Erro',
					excerpt: 'Não foi possível carregar os dados. Tente novamente mais tarde.',
					date: new Date().toLocaleDateString('pt-BR'),
					slug: 'erro',
					text: ''
				}
			];
		} finally {
			loading = false;
		}
	}

	onMount(fetchPosts);
</script>

<div class="cyberpunk-container">
	<!-- Particles de fundo -->
	<div class="cyber-particles"></div>
	
	<!-- Grid de fundo animado -->
	<div class="cyber-grid"></div>

	<!-- Header melhorado -->
	<header class="cyber-header">
		<div class="header-glow"></div>
		<div class="glitch-container">
			<h1 class="glitch" data-text="CyberBlog">CyberBlog</h1>
			<div class="title-underline"></div>
		</div>
		<p class="neon-text">Explorando o futuro através das palavras</p>
		<div class="header-divider"></div>
	</header>

	<!-- Conteúdo Principal -->
	<main class="cyber-main">
		{#if loading}
			<div class="loading-container">
				<div class="cyber-spinner-wrapper">
					<div class="cyber-spinner"></div>
					<div class="spinner-ring"></div>
				</div>
				<p class="neon-text loading-text">Carregando dados...</p>
			</div>
		{:else}
			<div class="posts-grid">
				{#each posts as post, index}
					<article 
						class="cyber-card"
						in:fly="{{ y: 50, duration: 800, delay: index * 100 }}"
					>
						<div class="card-border-glow"></div>
						<div class="card-image">
							<img src={post.image} alt={post.title} />
							<div class="image-overlay"></div>
							<div class="image-scan-line"></div>
						</div>
						<div class="card-content">
							<h2 class="cyber-title">{post.title}</h2>
							<p class="cyber-text">{post.excerpt}</p>
							<div class="card-meta">
								<ViewCounter postId={post.slug} />
							</div>
							<div class="card-footer">
								<div class="card-info">
									<span class="cyber-date">{post.date}</span>
								</div>
								<a href={`/blog/${post.slug}`} class="cyber-button">
									<span class="button-content">
										<span class="button-text">Ler mais</span>
										<span class="button-arrow">→</span>
									</span>
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
	/* Estilos Base Melhorados */
	:global(body) {
		background: radial-gradient(ellipse at center, #0f0f23 0%, #0a0a0f 100%);
		color: #fff;
		font-family: 'Rajdhani', 'Orbitron', sans-serif;
		margin: 0;
		overflow-x: hidden;
		line-height: 1.6;
	}

	.cyberpunk-container {
		min-height: 100vh;
		position: relative;
		padding: 2rem;
		background: 
			radial-gradient(circle at 20% 80%, rgba(255, 0, 234, 0.1) 0%, transparent 50%),
			radial-gradient(circle at 80% 20%, rgba(0, 246, 255, 0.1) 0%, transparent 50%),
			linear-gradient(135deg, #0a0a2e, #1a1a3a, #0f0f23);
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

	/* Grid melhorado */
	.cyber-grid {
		position: fixed;
		inset: 0;
		background: 
			linear-gradient(90deg, rgba(255, 0, 234, 0.1) 1px, transparent 1px) 0 0 / 80px 80px,
			linear-gradient(0deg, rgba(0, 246, 255, 0.1) 1px, transparent 1px) 0 0 / 80px 80px;
		opacity: 0.4;
		z-index: 0;
		animation: grid-scroll 30s linear infinite;
	}

	/* Header melhorado */
	.cyber-header {
		text-align: center;
		margin-bottom: 5rem;
		position: relative;
		z-index: 1;
	}

	.header-glow {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 400px;
		height: 400px;
		background: radial-gradient(circle, rgba(255, 0, 234, 0.2) 0%, transparent 70%);
		filter: blur(40px);
		z-index: -1;
	}

	.glitch-container {
		position: relative;
		display: inline-block;
	}

	.glitch {
		font-family: 'Press Start 2P', cursive;
		font-size: clamp(2.5rem, 8vw, 4.5rem);
		color: #fff;
		text-shadow: 
			3px 3px 0 #ff00ea,
			-3px -3px 0 #00f6ff,
			0 0 20px rgba(255, 255, 255, 0.5);
		animation: enhanced-glitch 2s infinite;
		letter-spacing: 3px;
	}

	.title-underline {
		height: 4px;
		background: linear-gradient(90deg, transparent, #ff00ea, #00f6ff, transparent);
		margin-top: 1rem;
		animation: pulse-glow 2s ease-in-out infinite alternate;
	}

	.neon-text {
		color: #00f6ff;
		text-shadow: 
			0 0 5px #00f6ff, 
			0 0 10px #00f6ff, 
			0 0 20px #00f6ff;
		font-size: 1.4rem;
		font-weight: 300;
		margin-top: 2rem;
		letter-spacing: 1px;
	}

	.header-divider {
		width: 200px;
		height: 2px;
		background: linear-gradient(90deg, transparent, #ff00ea, #00f6ff, transparent);
		margin: 3rem auto;
		opacity: 0.7;
	}

	/* Cards melhorados */
	.posts-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
		gap: 3rem;
		position: relative;
		z-index: 1;
		max-width: 1400px;
		margin: 0 auto;
	}

	.cyber-card {
		background: 
			linear-gradient(145deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05)),
			rgba(10, 10, 35, 0.8);
		backdrop-filter: blur(15px);
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 16px;
		overflow: hidden;
		transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
		position: relative;
		box-shadow: 
			0 8px 32px rgba(0, 0, 0, 0.4),
			inset 0 1px 0 rgba(255, 255, 255, 0.1);
	}

	.cyber-card:hover {
		transform: translateY(-8px) scale(1.02);
		border-color: rgba(255, 0, 234, 0.5);
		box-shadow: 
			0 20px 60px rgba(0, 0, 0, 0.6),
			0 0 40px rgba(255, 0, 234, 0.3),
			inset 0 1px 0 rgba(255, 255, 255, 0.2);
	}

	.card-border-glow {
		position: absolute;
		inset: -2px;
		background: linear-gradient(45deg, #ff00ea, #00f6ff, #ff00ea);
		border-radius: 16px;
		opacity: 0;
		transition: opacity 0.4s ease;
		z-index: -1;
		filter: blur(4px);
	}

	.cyber-card:hover .card-border-glow {
		opacity: 0.6;
	}

	.card-image {
		position: relative;
		height: 240px;
		overflow: hidden;
	}

	.card-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: all 0.6s ease;
		filter: brightness(0.8) contrast(1.1);
	}

	.cyber-card:hover .card-image img {
		transform: scale(1.1);
		filter: brightness(1) contrast(1.2);
	}

	.image-overlay {
		position: absolute;
		inset: 0;
		background: linear-gradient(
			135deg, 
			rgba(255, 0, 234, 0.3) 0%, 
			transparent 50%, 
			rgba(0, 246, 255, 0.3) 100%
		);
		mix-blend-mode: overlay;
		opacity: 0.7;
	}

	.image-scan-line {
		position: absolute;
		top: 0;
		left: -100%;
		width: 100%;
		height: 2px;
		background: linear-gradient(90deg, transparent, #00f6ff, transparent);
		animation: scan-line 3s linear infinite;
	}

	.card-content {
		padding: 2rem;
	}

	.cyber-title {
		font-size: 1.4rem;
		font-weight: 600;
		margin-bottom: 1rem;
		color: #fff;
		text-shadow: 0 0 10px rgba(255, 0, 234, 0.5);
		line-height: 1.3;
		letter-spacing: 0.5px;
	}

	.cyber-text {
		color: #c8c8c8;
		line-height: 1.7;
		margin-bottom: 1.5rem;
		font-weight: 300;
		font-size: 1rem;
	}

	.card-footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-top: 1rem;
		border-top: 1px solid rgba(255, 255, 255, 0.1);
	}

	.cyber-date {
		color: #00f6ff;
		font-size: 0.9rem;
		font-weight: 500;
		text-shadow: 0 0 5px #00f6ff;
	}

	/* Botões melhorados */
	.cyber-button {
		position: relative;
		padding: 0.8rem 1.5rem;
		background: linear-gradient(135deg, #ff00ea, #00f6ff);
		border: none;
		border-radius: 8px;
		color: #fff;
		text-decoration: none;
		font-weight: 600;
		overflow: hidden;
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		font-size: 0.9rem;
		letter-spacing: 0.5px;
		box-shadow: 0 4px 15px rgba(255, 0, 234, 0.3);
	}

	.cyber-button:hover {
		transform: translateY(-2px);
		box-shadow: 0 8px 25px rgba(255, 0, 234, 0.5);
	}

	.button-content {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		position: relative;
		z-index: 2;
	}

	.button-arrow {
		transition: transform 0.3s ease;
	}

	.cyber-button:hover .button-arrow {
		transform: translateX(4px);
	}

	.button-glitch {
		position: absolute;
		inset: 0;
		background: linear-gradient(135deg, #ff00ea, #00f6ff);
		filter: blur(8px);
		opacity: 0;
		transition: opacity 0.3s;
	}

	.cyber-button:hover .button-glitch {
		opacity: 0.4;
	}

	/* Loading melhorado */
	.loading-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2rem;
		min-height: 400px;
		justify-content: center;
	}

	.cyber-spinner-wrapper {
		position: relative;
		width: 80px;
		height: 80px;
	}

	.cyber-spinner {
		width: 60px;
		height: 60px;
		border: 3px solid rgba(255, 0, 234, 0.3);
		border-top-color: #ff00ea;
		border-radius: 50%;
		animation: spin 1s linear infinite;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.spinner-ring {
		width: 80px;
		height: 80px;
		border: 2px solid rgba(0, 246, 255, 0.2);
		border-top-color: #00f6ff;
		border-radius: 50%;
		animation: spin 2s linear infinite reverse;
	}

	.loading-text {
		font-size: 1.1rem;
		animation: pulse-text 2s ease-in-out infinite;
	}

	/* Animações melhoradas */
	@keyframes enhanced-glitch {
		0%, 100% { 
			text-shadow: 3px 3px 0 #ff00ea, -3px -3px 0 #00f6ff, 0 0 20px rgba(255, 255, 255, 0.5);
		}
		25% { 
			text-shadow: -3px 3px 0 #ff00ea, 3px -3px 0 #00f6ff, 0 0 20px rgba(255, 255, 255, 0.5);
		}
		50% { 
			text-shadow: 3px -3px 0 #ff00ea, -3px 3px 0 #00f6ff, 0 0 30px rgba(255, 255, 255, 0.7);
		}
		75% { 
			text-shadow: -3px -3px 0 #ff00ea, 3px 3px 0 #00f6ff, 0 0 20px rgba(255, 255, 255, 0.5);
		}
	}

	@keyframes particle-float {
		0% { transform: translateY(0px) rotate(0deg); }
		100% { transform: translateY(-100px) rotate(360deg); }
	}

	@keyframes grid-scroll {
		0% { transform: translate(0, 0); }
		100% { transform: translate(80px, 80px); }
	}

	@keyframes scan-line {
		0% { left: -100%; }
		100% { left: 100%; }
	}

	@keyframes pulse-glow {
		0% { box-shadow: 0 0 5px #ff00ea; }
		100% { box-shadow: 0 0 20px #ff00ea, 0 0 30px #00f6ff; }
	}

	@keyframes pulse-text {
		0%, 100% { opacity: 1; }
		50% { opacity: 0.7; }
	}

	@keyframes spin {
		to { transform: rotate(360deg); }
	}

	.card-meta {
		margin-bottom: 1rem;
		padding-bottom: 0.5rem;
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
	}

	/* Responsividade melhorada */
	@media (max-width: 768px) {
		.cyberpunk-container {
			padding: 1rem;
		}

		.posts-grid {
			grid-template-columns: 1fr;
			gap: 2rem;
		}

		.cyber-card {
			margin: 0 auto;
			max-width: 400px;
		}

		.card-content {
			padding: 1.5rem;
		}

		.glitch {
			font-size: 2.5rem;
		}
	}

	@media (max-width: 480px) {
		.card-image {
			height: 200px;
		}

		.card-content {
			padding: 1rem;
		}

		.cyber-title {
			font-size: 1.2rem;
		}
	}
</style>