<script>
	import { P } from 'flowbite-svelte';
	import { onMount } from 'svelte';

	let prediction = $state([]);
	let posts = $state([]);
	let blogName = 'Investing Notices';
	let hasError = $state(false);

	export function load() {
		const token = localStorage.getItem('MutterCorp');
		const isAuthenticated = !!token;

		return {
			isAuthenticated
		};
	}

	async function fetchPosts(page = 1, size = 100) {
		try {
			const token = localStorage.getItem('MutterCorp');
			const res = await fetch(
				`https://dev.conteudointimo.com.br/investing-new?page=${page}&pageSize=${size}`,
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

	onMount(() => {
		fetchPosts();
		// fetchStatist()
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
	<meta property="og:url" content="https://dev.muttercorp.com.br/blog" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta property="og:type" content="website" />
</svelte:head>

<div class="min-h-screen bg-gradient-to-l from-blue-700 via-blue-500 to-blue-900 text-gray-100">
	<div class="mx-auto max-w-4xl px-5 py-10">
		<header class="mb-8 text-center">
			<h1 class="mb-3 text-4xl font-bold text-white drop-shadow-lg">{blogName}</h1>
			<p class="text-lg text-gray-200">
				Noticias sobre finanças e investimentos e sinais de trades .
			</p>
		</header>

		<div class="grid grid-cols-1 gap-6 md:grid-cols-2"></div>

		{#if hasError}
			<p class="text-center text-red-500">
				Desculpe, este blog não existe ou está temporariamente indisponível.
			</p>
		{:else if posts.length > 0}
			<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
				{#each posts as post (post.id)}
					<div
						class="cursor-pointer overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-lg"
						onclick={() => goToPost(post.id)}
					>
						<div class="p-4">
							<h2 class="mb-2 text-xl font-semibold text-gray-800">{post.title}</h2>
							<p class="mb-4 text-gray-600">
								{post.modifiedText && post.modifiedText.length > 100
									? post.modifiedText.substring(0, 100) + '...'
									: post.modifiedText}
							</p>
							<p class="text-sm text-gray-500">Publicado em: {post.createdAt}</p>
						</div>
					</div>
				{/each}
			</div>
		{:else}
			<p class="text-center text-gray-200">Nenhum post disponível.</p>
		{/if}
	</div>
</div>

<style>
	:global(body) {
		margin: 0;
		font-family: 'Inter', sans-serif;
	}
</style>
