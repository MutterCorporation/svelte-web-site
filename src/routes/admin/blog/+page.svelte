<script>
	import { onMount } from 'svelte';

	let preview = $state('');
	let image = $state(null);
	let title = $state('');
	let body = $state('');
	let previewHtml = $state('');
	let selectedBlog = $state('blog1'); // Default blog selection
	let tweetMemory = $state(''); // For the 300-character tweet memory
	let tweetOption = $state('normal'); // Default tweet option
	let isLoading = $state(true); // Control loading state
	let isAuthenticated = $state(false);
	
	// Blog options
	const blogs = [
		{ id: 'blog1', name: 'Blog Principal' },
		{ id: 'blog2', name: 'Blog Técnico' },
		{ id: 'blog3', name: 'Blog de Notícias' },
		{ id: 'blog4', name: 'Blog de Eventos' },
		{ id: 'blog5', name: 'Blog de Tutoriais' }
	];

	// Tweet options
	const tweetOptions = [
		{ id: 'normal', name: 'Normal' },
		{ id: 'urgent', name: 'Urgente' },
		{ id: 'scheduled', name: 'Agendado' },
		{ id: 'highlight', name: 'Destaque' }
	];

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
			return true; // Autenticado
		} else {
			return false; // Não autenticado
		}
	}

	// Função para processar a conversão do Markdown
	async function handleConvertMarkdown() {
		previewHtml = await convertMarkdownToHtml(body);
	}

	function handleSubmit(event) {
		event.preventDefault();

		// Cria um objeto FormData para enviar os dados
		const formData = new FormData();
		formData.append('file', image);
		formData.append('titulo', title);
		formData.append('text', previewHtml);
		formData.append('preview', preview);
		formData.append('blogId', selectedBlog);

		fetch('https://dev.muttercorp.com.br/blog', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${localStorage.getItem('MutterCorp')}`
			},
			body: formData
		})
			.then((response) => response.json())
			.then((data) => {
				console.log('Success:', data);
				alert('Post enviado com sucesso!');
				// Clear form
				title = '';
				body = '';
				preview = '';
				previewHtml = '';
				image = null;
			})
			.catch((error) => {
				console.error('Error:', error);
				alert('Erro ao enviar o post');
			});
	}
	
	function submitTweet() {
		if (tweetMemory.length > 300) {
			alert('O tweet excede o limite de 300 caracteres!');
			return;
		}
		
		// Create FormData
		const formData = new FormData();
		formData.append('text', tweetMemory);
		formData.append('option', tweetOption);
		
		fetch('https://dev.muttercorp.com.br/tweet-memory', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${localStorage.getItem('MutterCorp')}`
			},
			body: formData
		})
			.then((response) => response.json())
			.then((data) => {
				console.log('Tweet Success:', data);
				alert('Tweet enviado com sucesso!');
				tweetMemory = '';
			})
			.catch((error) => {
				console.error('Tweet Error:', error);
				alert('Erro ao enviar o tweet');
			});
	}

	onMount(async () => {
		isAuthenticated = await validateToken();
		isLoading = false; // A autenticação terminou
		if (!isAuthenticated) {
			window.location.href = '/login'; // Redireciona para login se não autenticado
		}
	});
</script>

{#if isLoading}
	<div class="loading-container">
		<div class="loading-text">CARREGANDO...</div>
	</div>
{:else}
	<div class="brutalist-container">
		<header class="brutalist-header">
			<h1 class="glitch-text">BLOG ADMIN CONTROL</h1>
		</header>
		
		<div class="grid-container">
			<!-- Left column: Form -->
			<div class="form-column">
				<form on:submit={handleSubmit}>
					<div class="form-section">
						<div class="form-group">
							<label for="blog-select">BLOG:</label>
							<div class="select-wrapper">
								<select id="blog-select" bind:value={selectedBlog} class="brutalist-select">
									{#each blogs as blog}
										<option value={blog.id}>{blog.name}</option>
									{/each}
								</select>
							</div>
						</div>
						
						<div class="form-group">
							<label for="image">IMAGEM:</label>
							<div class="file-input-wrapper">
								<input
									type="file"
									id="image"
									accept="image/*"
									on:change={(event) => (image = event.target.files[0])}
								/>
								{#if image}
									<div class="file-name">{image.name}</div>
								{/if}
							</div>
						</div>
						
						<div class="form-group">
							<label for="title">TÍTULO:</label>
							<input type="text" id="title" bind:value={title} class="brutalist-input" />
						</div>
						
						<div class="form-group">
							<label for="preview-text">PREVIEW TEXT:</label>
							<textarea id="preview-text" bind:value={preview} class="brutalist-textarea small-textarea"></textarea>
						</div>
					</div>
					
					<div class="form-section">
						<div class="form-group">
							<label for="body">CONTEÚDO (MARKDOWN):</label>
							<textarea id="body" bind:value={body} class="brutalist-textarea large-textarea"></textarea>
						</div>
						
						<div class="button-group">
							<button type="button" on:click={handleConvertMarkdown} class="brutalist-button secondary">
								PREVIEW
							</button>
							<button type="submit" class="brutalist-button primary">PUBLICAR POST</button>
						</div>
					</div>
				</form>
				
				<!-- Tweet memory section -->
				<div class="tweet-section">
					<h2 class="section-title">TWEET MEMORY</h2>
					<div class="form-group">
						<textarea 
							bind:value={tweetMemory} 
							maxlength="300" 
							class="brutalist-textarea tweet-textarea"
							placeholder="Digite seu tweet (máximo 300 caracteres)..."
						></textarea>
						<div class="char-counter {tweetMemory.length > 280 ? 'warning' : ''}">
							{tweetMemory.length}/300
						</div>
					</div>
					
					<div class="tweet-options">
						{#each tweetOptions as option}
							<label class="option-label">
								<input type="radio" name="tweetOption" value={option.id} 
									bind:group={tweetOption} class="option-radio" />
								<span class="option-text">{option.name}</span>
							</label>
						{/each}
					</div>
					
					<button on:click={submitTweet} class="brutalist-button accent">ENVIAR TWEET</button>
				</div>
			</div>
			
			<!-- Right column: Preview -->
			<div class="preview-column">
				<h2 class="section-title">PREVIEW DO POST</h2>
				<div class="preview-container">
					{#if previewHtml}
						<div class="preview-content">
							<h1 class="preview-title">{title || 'Título do Post'}</h1>
							<div class="preview-html">
								{@html previewHtml}
							</div>
						</div>
					{:else}
						<div class="preview-placeholder">
							<p>Clique em PREVIEW para visualizar o conteúdo formatado</p>
						</div>
					{/if}
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	/* Brutalist Reset & Base */
	:global(body) {
		margin: 0;
		padding: 0;
		background-color: #f0f0f0;
		font-family: 'Courier New', monospace;
		color: #000;
	}
	
	* {
		box-sizing: border-box;
	}
	
	/* Loading State */
	.loading-container {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
		background-color: #000;
	}
	
	.loading-text {
		font-size: 40px;
		font-weight: bold;
		color: #fff;
		animation: blink 1s infinite;
	}
	
	@keyframes blink {
		0%, 100% { opacity: 1; }
		50% { opacity: 0; }
	}
	
	/* Brutalist Container */
	.brutalist-container {
		max-width: 1600px;
		margin: 20px auto;
		padding: 0;
		background-color: #fff;
		border: 4px solid #000;
		box-shadow: 12px 12px 0 #000;
	}
	
	/* Brutalist Header */
	.brutalist-header {
		background-color: #000;
		color: #fff;
		padding: 20px;
		text-align: center;
		margin-bottom: 20px;
		border-bottom: 4px solid #ff3e00;
	}
	
	.glitch-text {
		font-size: 36px;
		font-weight: bold;
		text-transform: uppercase;
		letter-spacing: 4px;
		position: relative;
		margin: 0;
	}
	
	.glitch-text::before,
	.glitch-text::after {
		content: "BLOG ADMIN CONTROL";
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
	
	.glitch-text::before {
		color: cyan;
		z-index: -1;
		clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%);
		transform: translate(-2px, 2px);
		animation: glitch 2s infinite linear alternate-reverse;
	}
	
	.glitch-text::after {
		color: magenta;
		z-index: -2;
		clip-path: polygon(0 60%, 100% 60%, 100% 100%, 0 100%);
		transform: translate(2px, -2px);
		animation: glitch 3s infinite linear alternate-reverse;
	}
	
	@keyframes glitch {
		0% { transform: translate(-2px, 2px); }
		25% { transform: translate(-1px, -1px); }
		50% { transform: translate(1px, 1px); }
		75% { transform: translate(2px, -2px); }
		100% { transform: translate(-2px, 2px); }
	}
	
	/* Grid Layout */
	.grid-container {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 20px;
		padding: 0 20px 20px;
	}
	
	@media (max-width: 1200px) {
		.grid-container {
			grid-template-columns: 1fr;
		}
	}
	
	/* Form Column */
	.form-column {
		display: flex;
		flex-direction: column;
		gap: 30px;
	}
	
	.form-section {
		border: 3px solid #000;
		padding: 20px;
		margin-bottom: 20px;
		background-color: #f0f0f0;
	}
	
	/* Form Elements */
	.form-group {
		margin-bottom: 20px;
	}
	
	label {
		display: block;
		font-weight: bold;
		margin-bottom: 8px;
		font-size: 18px;
		text-transform: uppercase;
	}
	
	.brutalist-input,
	.brutalist-textarea,
	.brutalist-select {
		width: 100%;
		padding: 12px;
		border: 3px solid #000;
		background-color: #fff;
		font-family: 'Courier New', monospace;
		font-size: 16px;
		color: #000;
		transition: border-color 0.3s;
	}
	
	.brutalist-input:focus,
	.brutalist-textarea:focus,
	.brutalist-select:focus {
		outline: none;
		border-color: #ff3e00;
		box-shadow: 4px 4px 0 #000;
	}
	
	.small-textarea {
		height: 80px;
		resize: none;
	}
	
	.large-textarea {
		height: 300px;
		resize: vertical;
	}
	
	.file-input-wrapper {
		border: 3px dashed #000;
		padding: 15px;
		background-color: #fff;
	}
	
	.file-name {
		margin-top: 10px;
		font-weight: bold;
		word-break: break-all;
	}
	
	.select-wrapper {
		position: relative;
	}
	
	.select-wrapper::after {
		content: '▼';
		position: absolute;
		right: 15px;
		top: 50%;
		transform: translateY(-50%);
		pointer-events: none;
	}
	
	/* Buttons */
	.button-group {
		display: flex;
		gap: 15px;
		margin-top: 20px;
	}
	
	.brutalist-button {
		padding: 12px 20px;
		border: 3px solid #000;
		background-color: #fff;
		font-family: 'Courier New', monospace;
		font-size: 16px;
		font-weight: bold;
		text-transform: uppercase;
		cursor: pointer;
		transition: all 0.2s;
	}
	
	.brutalist-button:hover {
		transform: translate(-4px, -4px);
		box-shadow: 4px 4px 0 #000;
	}
	
	.brutalist-button:active {
		transform: translate(2px, 2px);
		box-shadow: none;
	}
	
	.primary {
		background-color: #ff3e00;
		color: #fff;
	}
	
	.secondary {
		background-color: #000;
		color: #fff;
	}
	
	.accent {
		background-color: #0077ff;
		color: #fff;
	}
	
	/* Tweet Section */
	.tweet-section {
		border: 3px solid #0077ff;
		padding: 20px;
		background-color: #f0f0f0;
	}
	
	.section-title {
		font-size: 24px;
		text-transform: uppercase;
		margin-top: 0;
		margin-bottom: 20px;
		border-bottom: 3px solid #000;
		padding-bottom: 10px;
	}
	
	.tweet-textarea {
		height: 120px;
		resize: none;
		border-color: #0077ff;
	}
	
	.char-counter {
		text-align: right;
		margin-top: 5px;
		font-weight: bold;
	}
	
	.char-counter.warning {
		color: #ff3e00;
	}
	
	.tweet-options {
		display: flex;
		flex-wrap: wrap;
		gap: 15px;
		margin: 15px 0;
	}
	
	.option-label {
		display: flex;
		align-items: center;
		cursor: pointer;
		margin-bottom: 0;
	}
	
	.option-radio {
		margin-right: 8px;
		transform: scale(1.5);
		accent-color: #0077ff;
	}
	
	.option-text {
		font-size: 16px;
		text-transform: none;
	}
	
	/* Preview Column */
	.preview-column {
		position: sticky;
		top: 20px;
		align-self: flex-start;
	}
	
	.preview-container {
		border: 3px solid #000;
		padding: 20px;
		background-color: #fff;
		min-height: 600px;
		max-height: 90vh;
		overflow-y: auto;
	}
	
	.preview-placeholder {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		min-height: 400px;
		border: 3px dashed #ccc;
		color: #666;
		text-align: center;
		padding: 20px;
	}
	
	.preview-title {
		margin-top: 0;
		margin-bottom: 30px;
		font-size: 32px;
		border-bottom: 3px solid #000;
		padding-bottom: 15px;
	}
	
	.preview-html {
		font-family: Arial, sans-serif;
		line-height: 1.6;
	}
	
	.preview-html :global(h1),
	.preview-html :global(h2),
	.preview-html :global(h3) {
		margin-top: 30px;
		margin-bottom: 15px;
		font-weight: bold;
	}
	
	.preview-html :global(a) {
		color: #0077ff;
		text-decoration: underline;
	}
	
	.preview-html :global(code) {
		background-color: #f0f0f0;
		border: 1px solid #ddd;
		padding: 2px 5px;
		font-family: 'Courier New', monospace;
		border-radius: 3px;
	}
	
	.preview-html :global(pre) {
		background-color: #1a1a1a;
		color: #f8f8f8;
		padding: 15px;
		border-radius: 3px;
		overflow-x: auto;
		border: 3px solid #000;
	}
	
	.preview-html :global(img) {
		max-width: 100%;
		height: auto;
		border: 3px solid #000;
	}
	
	.preview-html :global(blockquote) {
		border-left: 5px solid #ff3e00;
		padding-left: 15px;
		margin-left: 0;
		color: #666;
	}
	
	.preview-html :global(table) {
		border-collapse: collapse;
		width: 100%;
		margin: 20px 0;
	}
	
	.preview-html :global(th),
	.preview-html :global(td) {
		border: 2px solid #000;
		padding: 8px 12px;
	}
	
	.preview-html :global(th) {
		background-color: #f0f0f0;
	}
</style>