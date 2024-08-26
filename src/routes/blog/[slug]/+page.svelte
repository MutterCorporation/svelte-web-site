<script>
	import { onMount } from 'svelte';
	import { marked } from 'marked';
	// import DOMPurify from 'dompurify';

	let post = {
		img: '',
		titulo: '',
		text: ''
	};

	let previewHtml = '';
	let error = false;
	let errorMessage = '';

	marked.setOptions({
		breaks: true,
		gfm: true
	});

	function preProcessMarkdown(md) {
  // Substitui blocos de código inline por placeholders
  	const codeBlocks = [];
  	md = md.replace(/```[\s\S]*?```/g, (match) => {
    const placeholder = `__CODE_BLOCK_${codeBlocks.length}__`;
    codeBlocks.push(match);
    return placeholder;
  	});

  // Garante que haja duas quebras de linha antes de cada cabeçalho
  	md = md.replace(/\n(#{1,6} )/g, '\n\n$1');

  // Restaura os blocos de código
 	 codeBlocks.forEach((block, index) => {
    md = md.replace(`__CODE_BLOCK_${index}__`, block);
  });

  	return md;
	}

	function renderMarkdown(md) {
  const renderer = new marked.Renderer();
  renderer.code = (code, language) => {
    return `<pre class="code-block"><code class="language-${language}">${code}</code></pre>`;
  };

  return marked(md, { 
    breaks: true,
    gfm: true,
    renderer: renderer
  });
}

	// Função para buscar dados da API com base no slug
	async function fetchPostData(slug) {
		try {
			const response = await fetch(`https://dev.muttercorp.com.br/blog/${slug}`, {
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
			post = {
				img: data.img,
				titulo: data.titulo,
				text: data.text
			};

			// Converter Markdown para HTML usando a função de API do GitHub
			previewHtml = renderMarkdown(preProcessMarkdown(data.text));
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

<style>
	.post-body {
	  white-space: pre-wrap;
	  word-wrap: break-word;
	}
  
	.post-body pre {
	  white-space: pre-wrap;
	  word-wrap: break-word;
	  background-color: #f4f4f4;
	  padding: 1em;
	  border-radius: 5px;
	}
  
	.post-body code {
	  background-color: #f4f4f4;
	  padding: 0.2em 0.4em;
	  border-radius: 3px;
	}
  
	.code-block {
	  white-space: pre-wrap;
	  word-wrap: break-word;
	  background-color: #f4f4f4;
	  padding: 1em;
	  border-radius: 5px;
	  margin: 1em 0;
	}
  </style>