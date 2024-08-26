<script>
	import { onMount } from 'svelte';
	import { marked } from 'marked';

	let post = {
		img: '',
		titulo: '',
		text: ''
	};

	let previewHtml = '';
	let error = false;
	let errorMessage = '';

	// Função para buscar dados da API com base no slug
	async function fetchPostData(slug) {
		try {
			const response = await fetch(`https://dev.muttercorp.com.br/blog/${slug}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
					// Adiciona o token no cabeçalho, se necessário
				}
			});
			if (!response.ok) {
				throw new Error('Failed to fetch post data');
			}
			const data = await response.json();
			if (!data) {
				throw new Error('Post not found');
			}
			post = {
				img: data.img,
				titulo: data.titulo,
				text: data.text
			};

			// Converte o texto Markdown em HTML
			previewHtml = marked(post.text);
			console.log('Converted HTML:', previewHtml); // Verificação

			error = false; // Reset error state if fetch is successful
		} catch (error) {
			console.error(error);
			error = true;
			errorMessage = error.message || 'An unexpected error occurred';
		}
	}

	// Obtém o slug da URL e faz o fetch ao montar o componente
	onMount(() => {
		const slug = window.location.pathname.split('/').pop(); // Supondo que o slug está no final da URL
		fetchPostData(slug);
	});
</script>

{#if error}
	<div class="error-container">
		<h1>Erro</h1>
		<p>{errorMessage}</p>
	</div>
{:else}
	<div class="container">
		<div class="post">
			{#if post.img}
				<img src={post.img} alt="Post Image" class="post-image" />
			{/if}
			<h1 class="post-title">{post.titulo}</h1>
			<div class="post-body">
				{@html previewHtml}
			</div>
		</div>
	</div>
{/if}
