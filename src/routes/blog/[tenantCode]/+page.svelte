<svelte:head>
	<title>CyberBlog - MutterCorp</title>
	<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@300;400;500;700;900&family=Press+Start+2P&family=Rajdhani:wght@300;400;500;600;700&display=swap" rel="stylesheet">
</svelte:head>

<script>
	import { onMount } from 'svelte';
	import { fly, fade } from 'svelte/transition';
	import ViewCounter from '../../../components/ViewCounter.svelte';
	import { fetchBlogPost } from '../service.js';
	import { TENANT_CONFIG } from '../../../services/services/constants.js';

	let { data } = $props();
	let tenantCode = data.tenantCode;
	
	// Configuração do tenant
	let tenantConfig = $derived(TENANT_CONFIG[tenantCode]);
	
	/**
	 * @type {any[]}
	 */
	let posts = [];
	let loading = true;
	
	async function fetchPosts() {
		try {
			const response = await fetchBlogPost(tenantCode);

			
			const data = Array.isArray(response) ? response : 
			(/** @type {any} */(response).data || []);
			
			// Mapeamento dos dados recebidos para o formato esperado pelos componentes
			posts = data.map((/** @type {{ titulo: any; img: any; preview: any; created_at: string | number | Date; id: { toString: () => any; }; text: any; }} */ post) => ({
				title: post.titulo || 'Sem título',
				image: post.img || 'https://placehold.co/600x400/0a0a2e/00f6ff?text=CyberBlog',
				excerpt: post.preview || 'Sem prévia disponível',
				date: new Date(post.created_at).toLocaleDateString('pt-BR'),
				slug: post.id.toString(),
				text: post.text || ''
			}));
			
			console.log('Posts processados:', posts);
		} catch (error) {
			console.error('Erro ao carregar posts:', error);
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

	onMount(() => {
		fetchPosts();
	});
</script>

<main class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
	<!-- Header -->
	<header class="relative overflow-hidden bg-gradient-to-r from-purple-900/20 to-blue-900/20 backdrop-blur-sm border-b border-cyan-500/30">
		<div class="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%2300f6ff\' fill-opacity=\'0.05\'%3E%3Ccircle cx=\'30\' cy=\'30\' r=\'2\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
		
		
		<div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
			<div class="text-center">
				<h1 class="text-5xl md:text-7xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6 font-orbitron">
					{tenantConfig?.blogName || 'CyberBlog'}
				</h1>
				<p class="text-xl md:text-2xl text-cyan-300 mb-8 font-rajdhani">
					{tenantConfig?.name || 'MutterCorp'} - Pensamentos do Futuro Digital
				</p>
				<div class="flex justify-center space-x-4">
					<div class="h-1 w-16 bg-gradient-to-r from-cyan-400 to-purple-400 rounded"></div>
					<div class="h-1 w-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded"></div>
					<div class="h-1 w-12 bg-gradient-to-r from-pink-400 to-cyan-400 rounded"></div>
				</div>
			</div>
		</div>
	</header>

	<!-- Content -->
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
		{#if loading}
			<div class="flex justify-center items-center py-20">
				<div class="relative">
					<div class="w-16 h-16 border-4 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin"></div>
					<div class="absolute inset-0 w-16 h-16 border-4 border-purple-400/20 border-b-purple-400 rounded-full animate-spin" style="animation-direction: reverse; animation-duration: 1.5s;"></div>
				</div>
			</div>
		{:else}
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
				{#each posts as post, index}
					<article 
						class="group relative bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-sm rounded-xl border border-cyan-500/20 hover:border-cyan-400/50 transition-all duration-300 overflow-hidden hover:shadow-2xl hover:shadow-cyan-500/20"
						in:fly={{ y: 50, duration: 500, delay: index * 100 }}
					>
						<!-- Image -->
						<div class="relative overflow-hidden">
							<img 
								src={post.image} 
								alt={post.title}
								class="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
							/>
							<div class="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
							<div class="absolute top-4 right-4">
								<span class="px-3 py-1 bg-cyan-500/20 backdrop-blur-sm text-cyan-300 text-xs font-semibold rounded-full border border-cyan-500/30">
									{post.date}
								</span>
							</div>
						</div>

						<!-- Content -->
						<div class="p-6">
							<h2 class="text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors duration-300 font-orbitron">
								{post.title}
							</h2>
							<p class="text-gray-300 mb-4 line-clamp-3 font-rajdhani">
								{post.excerpt}
							</p>
							
							<!-- Read More Button -->
							<a 
								href="/blog/{tenantCode}/{post.slug}"
								class="inline-flex items-center px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25"
							>
								<span class="mr-2">Ler Mais</span>
								<svg class="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
								</svg>
							</a>
						</div>

						<!-- Hover Effect -->
						<div class="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
					</article>
				{/each}
			</div>

			{#if posts.length === 0}
				<div class="text-center py-20">
					<div class="text-6xl mb-4">🤖</div>
					<h3 class="text-2xl font-bold text-white mb-2 font-orbitron">Nenhum Post Encontrado</h3>
					<p class="text-gray-400 font-rajdhani">O futuro ainda está sendo escrito...</p>
				</div>
			{/if}
		{/if}
	</div>

	<!-- View Counter -->
	<ViewCounter />
</main>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@300;400;500;700;900&family=Rajdhani:wght@300;400;500;600;700&display=swap');
	
	.font-orbitron {
		font-family: 'Orbitron', monospace;
	}
	
	.font-rajdhani {
		font-family: 'Rajdhani', sans-serif;
	}
	
	.line-clamp-3 {
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
</style>
