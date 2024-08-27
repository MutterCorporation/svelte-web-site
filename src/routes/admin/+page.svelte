<script>
	import { onMount } from 'svelte';
	let image = null;
	let title = '';
	let body = '';
	let previewHtml = '';

	// Função para converter Markdown para HTML
	async function convertMarkdownToHtml(markdown) {
		const response = await fetch('https://api.github.com/markdown', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ text: markdown, mode: 'gfm' })
		});
		const html = await response.text();
		return html;
	}

	async function validateToken() {
		const token = localStorage.getItem('MutterCorp');
		if (!token) {
			return false; // Não autenticado se não houver token
		}

		const response = await fetch('https://dev.muttercorp.com.br/users/check-admin', {
			method: 'GET',
			headers: {
				accept: '*/*',
				Authorization: `Bearer ${token}` // Envia o token no cabeçalho Authorization
			}
		});

		if (response.ok) {
			const result = await response.json();
			return true; // Exemplo de como você pode usar a resposta do servidor
		} else {
			return false;
		}
	}

	// Atualiza a visualização prévia sempre que o corpo do post muda
	$: body,
		(async () => {
			previewHtml = await convertMarkdownToHtml(body);
		})();

	export function load() {
		return validateToken();
	}

	onMount(async () => {
		const isAuthenticated = await load();
		if (!isAuthenticated) {
			window.location.href = '/login'; // Redireciona para login se não autenticado
		}
	});

	function handleSubmit(event) {
		event.preventDefault();

		// Cria um objeto FormData para enviar os dados
		const formData = new FormData();
		formData.append('image', image);
		formData.append('title', title);
		formData.append('body', new Blob([body], { type: 'text/markdown' }), 'post.md');

		fetch('/api/posts', {
			method: 'POST',
			body: formData
		})
			.then((response) => response.json())
			.then((data) => {
				console.log('Success:', data);
				// Handle success
			})
			.catch((error) => {
				console.error('Error:', error);
				// Handle error
			});
	}
</script>

<div class="container">
	<header>
		<h1>Minha Página Protegida</h1>
	</header>
	<p class="message">Este conteúdo só é acessível se o usuário estiver autenticado.</p>

	<form on:submit={handleSubmit}>
		<div class="form-group">
			<label for="image">Imagem:</label>
			<input
				type="file"
				id="image"
				accept="image/*"
				on:change={(event) => (image = event.target.files[0])}
			/>
		</div>
		<div class="form-group">
			<label for="title">Título:</label>
			<input type="text" id="title" bind:value={title} />
		</div>
		<div class="form-group">
			<label for="body">Corpo:</label>
			<textarea id="body" bind:value={body}></textarea>
		</div>
		<button type="submit">Enviar</button>
	</form>

	<div class="preview">
		<h2>Pré-visualização:</h2>
		{@html previewHtml}
	</div>
</div>

<style>
	body {
		font-family: Arial, sans-serif;
		background-color: #f4f4f4;
		margin: 0;
		padding: 0;
	}

	.container {
		max-width: 800px;
		margin: 0 auto;
		padding: 20px;
		background: #fff;
		border-radius: 8px;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
	}

	header {
		text-align: center;
		margin-bottom: 20px;
	}

	h1 {
		font-size: 2em;
		color: #333;
	}

	form {
		display: flex;
		flex-direction: column;
	}

	.form-group {
		margin-bottom: 15px;
	}

	label {
		display: block;
		font-weight: bold;
		margin-bottom: 5px;
	}

	input[type='text'],
	textarea {
		width: 100%;
		padding: 10px;
		border: 1px solid #ddd;
		border-radius: 4px;
	}

	input[type='file'] {
		margin-top: 5px;
	}

	textarea {
		resize: vertical;
		min-height: 150px;
	}

	button {
		background-color: #007bff;
		color: white;
		border: none;
		padding: 10px 20px;
		border-radius: 4px;
		cursor: pointer;
		font-size: 16px;
	}

	button:hover {
		background-color: #0056b3;
	}

	.message {
		margin-top: 20px;
		font-size: 1.2em;
		color: #333;
	}

	.preview {
		border: 1px solid #ddd;
		padding: 10px;
		border-radius: 4px;
		background-color: #f9f9f9;
		margin-top: 20px;
	}
</style>
