<svelte:head>
	<title>{post?.title || 'Post'} - CyberBlog</title>
	<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@300;400;500;700;900&family=Press+Start+2P&family=Rajdhani:wght@300;400;500;600;700&display=swap" rel="stylesheet">
</svelte:head>

<script>
	import { onMount } from 'svelte';
	import { fly, fade } from 'svelte/transition';
	import ViewCounter from '../../../../components/ViewCounter.svelte';
	import CommentSystem from '../../../../components/CommentSystem.svelte';
	import { fetchSinglePost, incrementPostViews } from '../../service.js';
	import { TENANT_CONFIG } from '../../../../services/services/constants.js';

	let { data } = $props();
	let tenantCode = data.tenantCode;
	let slug = data.slug;
	
	// Configuração do tenant
	let tenantConfig = $derived(TENANT_CONFIG[tenantCode]);
	
	/**
	 * @type {any}
	 */
	let post = null;
	let loading = true;
	let error = null;
	
	async function fetchPost() {
		try {
			const response = await fetchSinglePost(tenantCode, slug);
			
			if (response) {
				post = {
					title: response.titulo || 'Sem título',
					image: response.img || 'https://placehold.co/600x400/0a0a2e/00f6ff?text=CyberBlog',
					content: response.text || 'Conteúdo não disponível',
					date: new Date(response.created_at).toLocaleDateString('pt-BR'),
					id: response.id,
					preview: response.preview || ''
				};
				
				// Incrementar visualizações
				incrementPostViews(tenantCode, slug);
			} else {
				error = 'Post não encontrado';
			}
		} catch (err) {
			console.error('Erro ao carregar post:', err);
			error = 'Erro ao carregar o post';
		} finally {
			loading = false;
		}
	}

	onMount(() => {
		fetchPost();
	});
</script>

<main class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
	{#if loading}
		<div class="flex justify-center items-center min-h-screen">
			<div class="relative">
				<div class="w-16 h-16 border-4 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin"></div>
				<div class="absolute inset-0 w-16 h-16 border-4 border-purple-400/20 border-b-purple-400 rounded-full animate-spin" style="animation-direction: reverse; animation-duration: 1.5s;"></div>
			</div>
		</div>
	{:else if error}
		<div class="flex flex-col justify-center items-center min-h-screen text-center px-4">
			<div class="text-6xl mb-4">⚠️</div>
			<h1 class="text-3xl font-bold text-white mb-4 font-orbitron">Erro</h1>
			<p class="text-gray-400 mb-8 font-rajdhani">{error}</p>
			<a 
				href="/blog/{tenantCode}"
				class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
			>
				← Voltar ao Blog
			</a>
		</div>
	{:else if post}
		<article class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12" in:fade={{ duration: 500 }}>
			<!-- Header -->
			<header class="mb-12">
				<nav class="mb-8">
					<a 
						href="/blog/{tenantCode}"
						class="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors duration-300 font-rajdhani"
					>
						<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
						</svg>
						Voltar ao {tenantConfig?.blogName || 'Blog'}
					</a>
				</nav>

				<div class="text-center">
					<h1 class="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6 font-orbitron">
						{post.title}
					</h1>
					<div class="flex justify-center items-center space-x-4 text-gray-400 mb-8 font-rajdhani">
						<span class="flex items-center">
							<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
							</svg>
							{post.date}
						</span>
						<span>•</span>
						<span class="text-cyan-400">{tenantConfig?.name || 'MutterCorp'}</span>
					</div>
				</div>
			</header>

			<!-- Featured Image -->
			{#if post.image}
				<div class="relative mb-12 rounded-xl overflow-hidden" in:fly={{ y: 50, duration: 500, delay: 200 }}>
					<img 
						src={post.image} 
						alt={post.title}
						class="w-full h-64 md:h-96 object-cover"
					/>
					<div class="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent"></div>
				</div>
			{/if}

			<!-- Content -->
			<div class="prose prose-lg prose-invert max-w-none mb-12" in:fly={{ y: 50, duration: 500, delay: 400 }}>
				<div class="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-sm rounded-xl border border-cyan-500/20 p-8">
					<div class="text-gray-300 leading-relaxed font-rajdhani text-lg">
						{@html post.content.replace(/\n/g, '<br>')}
					</div>
				</div>
			</div>

			<!-- Actions -->
			<div class="flex justify-center space-x-4 mb-12" in:fly={{ y: 50, duration: 500, delay: 600 }}>
				<button 
					class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 hover:from-cyan-500/30 hover:to-purple-500/30 text-cyan-300 border border-cyan-500/30 hover:border-cyan-400/50 font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
					on:click={() => navigator.share && navigator.share({ title: post.title, url: window.location.href })}
				>
					<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"></path>
					</svg>
					Compartilhar
				</button>
			</div>

			<!-- Comments -->
			<div in:fly={{ y: 50, duration: 500, delay: 800 }}>
				<CommentSystem postId={post.id} />
			</div>
		</article>
	{/if}

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
</style>
