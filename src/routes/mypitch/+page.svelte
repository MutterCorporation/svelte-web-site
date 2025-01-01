<script>
	import { onMount } from 'svelte';

	let productCategory = '';
	let productDescription = '';
	let productName = '';
	let primaryColor = '#2D2D2D';
	let secondaryColor = '#757575';
	let generatedPitch = '';
	let isLoading = false;
	let toast = { show: false, message: '', type: '' };

	function showToast(message, type = 'error') {
		toast = { show: true, message, type };
		setTimeout(() => {
			toast = { show: false, message: '', type: '' };
		}, 3000);
	}

	// Add to the top of your script section
	const API_URL = 'dev.muttercorp.com.br/maritalk';

	async function handleSubmit() {
		if (!productCategory || !productName || !productDescription) {
			showToast('Please fill in all required fields');
			return;
		}

		isLoading = true;

		// Construct a clear, structured prompt for the AI
		const prompt = `Create a marketing pitch with the following details:
      Product: ${productName}
      Category: ${productCategory}
      Description: ${productDescription}
      Brand Colors: Primary ${primaryColor}, Secondary ${secondaryColor}
      Please create a compelling, professional marketing pitch that highlights the key benefits and features of this product. Focus on its unique value proposition and target audience.`;

		const requestBody = {
			messages: [
				{
					role: 'user',
					content: prompt
				}
			],
			do_sample: true,
			max_tokens: 200, // Increased for more comprehensive responses
			temperature: 0.7, // Slightly increased for more creative outputs
			top_p: 0.95,
			model: 'sabia-3'
		};

		try {
			const response = await fetch(API_URL, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(requestBody)
			});

			if (!response.ok) {
				throw new Error('Network response was not ok');
			}

			const data = await response.json();
			generatedPitch = data.messages[data.messages.length - 1].content;
			showToast('Pitch generated successfully!', 'success');
		} catch (error) {
			console.error('Error:', error);
			showToast('Failed to generate pitch. Please try again.');
		} finally {
			isLoading = false;
		}
	}
</script>

<div class="banner">
	<div class="banner-content">
		<h1>AI Pitch Generator</h1>
		<p>
			Create professional marketing pitches tailored to your product and brand identity using
			advanced AI technology.
		</p>
	</div>
</div>

<div class="container">
	<div class="grid">
		<div class="form-section">
			<h2>Generate Your Pitch</h2>
			<p class="form-description">
				Fill in the details below to create a customized marketing pitch. Our AI will analyze your
				input and generate compelling content that matches your brand's voice.
			</p>

			<form class="form" on:submit|preventDefault={handleSubmit}>
				<div class="form-group">
					<label for="category">Product Category</label>
					<p class="field-description">
						Choose a specific category that best describes your product (e.g., Electronics, Fashion,
						Food & Beverage)
					</p>
					<input
						id="category"
						class="input"
						type="text"
						bind:value={productCategory}
						placeholder="Enter product category"
						required
					/>
				</div>

				<div class="form-group">
					<label for="name">Product Name</label>
					<p class="field-description">
						Enter the name of your product. Make it memorable and easy to pronounce.
					</p>
					<input
						id="name"
						class="input"
						type="text"
						bind:value={productName}
						placeholder="Enter product name"
						required
					/>
				</div>

				<!-- Add this after the product name form-group and before the brand colors form-group -->
				<div class="form-group">
					<label for="description">Product Description</label>
					<p class="field-description">
						Provide a brief description of your product's key features and benefits (max 200
						characters).
					</p>
					<textarea
						id="description"
						class="input textarea"
						bind:value={productDescription}
						placeholder="Describe your product's unique features and benefits..."
						maxlength="200"
						rows="3"
						required
					></textarea>
					<p class="character-count">
						{productDescription.length}/200 characters
					</p>
				</div>

				<div class="form-group">
					<label>Brand Colors</label>
					<p class="field-description">
						Select two colors that represent your brand's identity. These will influence the tone of
						your marketing pitch.
					</p>
					<div class="color-group">
						<div class="color-input">
							<span>Primary Color</span>
							<input type="color" bind:value={primaryColor} title="Primary Color" />
						</div>
						<div class="color-input">
							<span>Secondary Color</span>
							<input type="color" bind:value={secondaryColor} title="Secondary Color" />
						</div>
					</div>
				</div>

				<button type="submit" class="button" disabled={isLoading}>
					{isLoading ? 'Generating...' : 'Generate Pitch'}
				</button>
			</form>
		</div>

		<div class="output-section">
			{#if isLoading}
				<div class="loading">
					<p>Creating your perfect pitch...</p>
				</div>
			{/if}

			{#if generatedPitch}
				<div class="result">
					<h2>Your Marketing Pitch</h2>
					<p>{generatedPitch}</p>
				</div>
			{/if}
		</div>
	</div>
</div>

{#if toast.show}
	<div class="toast {toast.type}">
		{toast.message}
	</div>
{/if}

<style>
	/* Add these new styles to your existing style section */
	.textarea {
		resize: vertical;
		min-height: 80px;
		font-family: inherit;
	}

	.character-count {
		font-size: 0.75rem;
		color: #757575;
		text-align: right;
		margin-top: 0.25rem;
	}

	:global(body) {
		background-color: #f5f5f5;
		color: #2d2d2d;
		font-family:
			'Inter',
			-apple-system,
			BlinkMacSystemFont,
			sans-serif;
	}

	.banner {
		background: #2d2d2d;
		color: white;
		padding: 4rem 2rem;
		margin-bottom: 3rem;
	}

	.banner-content {
		max-width: 1200px;
		margin: 0 auto;
	}

	.banner h1 {
		font-size: 2.5rem;
		font-weight: 700;
		margin-bottom: 1rem;
		letter-spacing: -0.02em;
	}

	.banner p {
		font-size: 1.1rem;
		line-height: 1.6;
		color: #e0e0e0;
		max-width: 600px;
	}

	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 2rem 4rem;
	}

	.grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 3rem;
		align-items: start;
	}

	.form-section h2 {
		font-size: 1.5rem;
		margin-bottom: 0.5rem;
		font-weight: 600;
	}

	.form-description {
		color: #757575;
		margin-bottom: 2rem;
		line-height: 1.6;
	}

	.form {
		background: white;
		padding: 2rem;
		border-radius: 12px;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
	}

	.form-group {
		margin-bottom: 1.5rem;
	}

	.form-group label {
		display: block;
		font-weight: 500;
		margin-bottom: 0.5rem;
	}

	.field-description {
		font-size: 0.875rem;
		color: #757575;
		margin-bottom: 0.5rem;
		line-height: 1.5;
	}

	.input {
		width: 100%;
		padding: 0.75rem;
		border: 1px solid #e0e0e0;
		border-radius: 6px;
		font-size: 1rem;
		transition: all 0.2s;
	}

	.input:focus {
		outline: none;
		border-color: #2d2d2d;
		box-shadow: 0 0 0 2px rgba(45, 45, 45, 0.1);
	}

	.color-group {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
	}

	.color-input {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.color-input input[type='color'] {
		width: 100%;
		height: 40px;
		border: 1px solid #e0e0e0;
		border-radius: 6px;
		padding: 2px;
	}

	.button {
		width: 100%;
		padding: 1rem;
		background: #2d2d2d;
		color: white;
		border: none;
		border-radius: 6px;
		font-size: 1rem;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s;
	}

	.button:hover {
		background: #404040;
	}

	.button:disabled {
		background: #757575;
		cursor: not-allowed;
	}

	.result {
		background: white;
		padding: 2rem;
		border-radius: 12px;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
	}

	.result h2 {
		font-size: 1.5rem;
		margin-bottom: 1rem;
		font-weight: 600;
	}

	.result p {
		line-height: 1.6;
		color: #404040;
	}

	.loading {
		text-align: center;
		padding: 2rem;
		color: #757575;
	}

	.toast {
		position: fixed;
		bottom: 2rem;
		right: 2rem;
		padding: 1rem 1.5rem;
		border-radius: 6px;
		color: white;
		animation: slideIn 0.3s ease-out;
		z-index: 1000;
	}

	.toast.error {
		background-color: #dc2626;
	}

	.toast.success {
		background-color: #059669;
	}

	@keyframes slideIn {
		from {
			transform: translateX(100%);
			opacity: 0;
		}
		to {
			transform: translateX(0);
			opacity: 1;
		}
	}

	@media (max-width: 768px) {
		.grid {
			grid-template-columns: 1fr;
			gap: 2rem;
		}
	}
</style>
