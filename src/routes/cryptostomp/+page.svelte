<svelte:head>
	<title>{blogName} - Tecnologia, Ciências e Música</title>
	<meta name="description" content="Bem-vindo ao {blogName}, onde compartilho minhas experiências e conhecimentos sobre tecnologia, ciência e música.">
	<meta name="keywords" content="Tecnologia, Ciência, Música, Blog, {blogName}, Desenvolvimento, Svelte, JavaScript">
	<meta name="author" content="Maikon Weber">
	<meta property="og:title" content="{blogName} - Tecnologia, Ciência e Música">
	<meta property="og:description" content="Descubra artigos sobre tecnologia, ciência e música no {blogName}.">
	<meta property="og:url" content="https://dev.muttercorp.com.br/blog">
	<meta name="twitter:card" content="summary_large_image">
	<meta property="og:type" content="website">
</svelte:head>
<script>
	import { onMount } from 'svelte';



	let posts = $state([]);
	let blogName = 'Investing Notices'; // Defina o nome do blog aqui
	let hasError = $state(false); // Variável para controlar o estado de erro

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
			const res = await fetch(`https://dev.muttercorp.com.br/investing-new?page=${page}&pageSize=${size}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1haWtvbndlYmVyIiwibmFtZSI6Ik1haWtvbiIsImlkIjozLCJlbWFpbCI6Im1haWtvbndlYmVyQGdtYWlsLmNvbSIsInBlcm1pc3Npb24iOnsiYWRtaW4iOnRydWUsImJsdWVza3lwaGFzZSI6dHJ1ZX0sImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE3MzMzMjg4NTksImV4cCI6MTczMzc2MDg1OX0.nILe9i3Gg-vQuU_MnjTN648hAPWA7YYigOSwKAkAPrE'
					// Adiciona o token no cabeçalho, se necessário
				}
			});

			console.log(res)

			if (res.ok) {
				const data = await res.json();
				const maxLength = 100; // Define o comprimento máximo do texto

				posts = data;

				console.log(posts);
			} else {
				if (res.status === 403 || res.status === 401) {
					localStorage.removeItem('MutterCorp');
					window.location.href = '/login';
				} else if (res.status === 500) {
					hasError = true; // Define o estado de erro
				}
				console.error('Failed to fetch posts');
			}
		} catch (error) {
			console.error('Error:', error);
			hasError = true; // Define o estado de erro em caso de exceção
		}
	}

	onMount(() => {
		fetchPosts();
	});

	function goToPost(postId) {
		window.location.href = `/cryptostomp/${postId}`;
	}
</script>

<div class="background"></div>

<div class="content">
	<div class="header">
		<h1>{blogName}</h1>
		<p>
			Bem-vindo ao meu blog! Aqui, compartilho minhas experiências e conhecimentos sobre tecnologia,
			ciência e música.
		</p>
	</div>

	{#if hasError}
		<p>Desculpe, este blog não existe ou está temporariamente indisponível.</p>
	{:else if posts.length > 0}
		{#each posts as post (post.id)}
			<div class="post" onclick={() => goToPost(post.id)}>
				<!-- <img src={post.img} alt="Post Image" class="post-image" /> -->

				<div class="post-content">
					<h2 class="post-title">{post.title}</h2>
					<div class="post-body">
						{post.modifiedText && post.modifiedText.length > 100 
						  ? post.modifiedText.substring(0, 100) + "..." 
						  : post.modifiedText}
					  </div>
					<div class="post-body">{post.createdAt}</div>
				</div>
			</div>
		{/each}
	{:else}
		<p>No posts available.</p>
	{/if}
</div>

<style>
	/* Estilo para o fundo degradê */
	.background {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: linear-gradient(to bottom, #003f5c, #a2c2e5); /* Azul escuro para azul claro */
		z-index: -1; /* Coloca o fundo atrás do conteúdo */
	}

	.content {
		background: linear-gradient(to top, #e9ecef, #f8f9fa); /* Azul claro para cinza claro */
		max-width: 800px;
		margin: 0 auto;
		padding: 20px;
		border-radius: 8px;
		box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
		margin-top: 40px;
		background: rgba(255, 255, 255, 0.9); /* Fundo branco com leve transparência */
	}

	.header {
		text-align: center;
		margin-bottom: 20px;
	}

	.header h1 {
		color: #ffffff; /* Texto branco */
		text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
		margin: 0;
		font-size: 2.5rem;
	}

	.header p {
		font-size: 1.2rem;
		color: #f0f0f0; /* Texto cinza claro */
		line-height: 1.6;
		max-width: 700px;
		margin: 0 auto;
	}

	.post {
		display: flex;
		align-items: flex-start;
		border-bottom: 1px solid #ddd;
		padding: 20px 0;
		gap: 20px;
		cursor: pointer;
		transition: background-color 0.3s;
		background: rgba(255, 255, 255, 0.8); /* Fundo branco com leve transparência */
		border-radius: 8px;
	}

	.post:last-child {
		border-bottom: none;
	}

	.post:hover {
		background-color: rgba(255, 255, 255, 0.9);
	}

	.post-image {
		max-width: 150px;
		height: auto;
		border-radius: 8px;
	}

	.post-content {
		flex: 1;
	}

	.post-title {
		font-size: 1.8rem;
		color: #343a40;
		margin: 0 0 10px;
	}

	.post-body {
		font-size: 1.1rem;
		color: #495057;
	}
</style>
