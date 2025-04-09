<script>
	import { onMount } from 'svelte';

	// Lead data management
	let leadName = '';
	let leadFields = [
		{ id: crypto.randomUUID(), name: 'Email', value: '', required: true }
	];
	let selectedDatabase = 'db1';
	let isLoading = true;
	let isAuthenticated = false;
	
	// Form visibility controls
	let showAddFieldForm = false;
	let newFieldName = '';
	let newFieldRequired = false;
	
	// Available databases
	const databases = [
		{ id: 'db1', name: 'Banco Principal' },
		{ id: 'db2', name: 'Banco Marketing' },
		{ id: 'db3', name: 'Banco Vendas' },
		{ id: 'db4', name: 'Banco Eventos' },
		{ id: 'db5', name: 'Banco Suporte' }
	];

	async function validateToken() {
		const token = localStorage.getItem('MutterCorp');
		if (!token) {
			return false;
		}

		const response = await fetch('https://dev.muttercorp.com.br/users/check-admin', {
			method: 'GET',
			headers: {
				accept: '*/*',
				Authorization: `Bearer ${token}`
			}
		});

		return response.ok;
	}

	function addField() {
		if (!newFieldName.trim()) {
			alert('O nome do campo não pode estar vazio!');
			return;
		}
		
		// Check for duplicate field name
		if (leadFields.some(field => field.name.toLowerCase() === newFieldName.toLowerCase())) {
			alert('Já existe um campo com este nome!');
			return;
		}
		
		leadFields = [
			...leadFields, 
			{ 
				id: crypto.randomUUID(), 
				name: newFieldName, 
				value: '', 
				required: newFieldRequired 
			}
		];
		
		// Reset form
		newFieldName = '';
		newFieldRequired = false;
		showAddFieldForm = false;
	}

	function removeField(id) {
		leadFields = leadFields.filter(field => field.id !== id);
	}

	function handleSubmit(event) {
		event.preventDefault();
		
		// Validate required fields
		const missingFields = leadFields
			.filter(field => field.required && !field.value.trim())
			.map(field => field.name);
			
		if (missingFields.length > 0) {
			alert(`Campos obrigatórios não preenchidos: ${missingFields.join(', ')}`);
			return;
		}
		
		if (!leadName.trim()) {
			alert('O nome do lead é obrigatório!');
			return;
		}
		
		// Prepare data for submission
		const leadData = {
			name: leadName,
			database: selectedDatabase,
			fields: leadFields.map(({id, ...field}) => field) // Remove id from sent data
		};
		
		// Send to API
		fetch('https://dev.muttercorp.com.br/leads', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('MutterCorp')}`
			},
			body: JSON.stringify(leadData)
		})
			.then(response => {
				if (!response.ok) {
					throw new Error('Falha ao registrar lead');
				}
				return response.json();
			})
			.then(data => {
				alert('Lead registrado com sucesso!');
				console.log('Success:', data);
				
				// Reset form
				leadName = '';
				leadFields = [
					{ id: crypto.randomUUID(), name: 'Email', value: '', required: true }
				];
			})
			.catch(error => {
				console.error('Error:', error);
				alert(`Erro ao registrar lead: ${error.message}`);
			});
	}
	
	// Create a simple preview of the lead data
	$: previewData = {
		name: leadName || 'Nome do Lead',
		database: databases.find(db => db.id === selectedDatabase)?.name || 'Banco de dados',
		fields: leadFields.map(field => ({
			name: field.name,
			value: field.value || '[Não preenchido]',
			required: field.required
		}))
	};

	onMount(async () => {
		isAuthenticated = await validateToken();
		isLoading = false;
		if (!isAuthenticated) {
			window.location.href = '/login';
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
			<h1 class="glitch-text">REGISTRO DE LEADS</h1>
		</header>
		
		<div class="grid-container">
			<!-- Left column: Form -->
			<div class="form-column">
				<form on:submit={handleSubmit}>
					<div class="form-section">
						<div class="form-group">
							<label for="lead-name">NOME DO LEAD:</label>
							<input 
								type="text" 
								id="lead-name" 
								bind:value={leadName} 
								class="brutalist-input" 
								required
								placeholder="Insira um nome descritivo para o lead"
							/>
						</div>
						
						<div class="form-group">
							<label for="database-select">BANCO DE DADOS:</label>
							<div class="select-wrapper">
								<select id="database-select" bind:value={selectedDatabase} class="brutalist-select">
									{#each databases as db}
										<option value={db.id}>{db.name}</option>
									{/each}
								</select>
							</div>
						</div>
					</div>
					
					<div class="form-section">
						<div class="section-header">
							<h2 class="section-title">CAMPOS DO LEAD</h2>
							<button 
								type="button" 
								class="brutalist-button small-button accent"
								on:click={() => showAddFieldForm = !showAddFieldForm}
							>
								{showAddFieldForm ? 'CANCELAR' : '+ CAMPO'}
							</button>
						</div>
						
						{#if showAddFieldForm}
							<div class="add-field-form">
								<div class="form-group">
									<label for="new-field-name">NOME DO CAMPO:</label>
									<input 
										type="text" 
										id="new-field-name" 
										bind:value={newFieldName} 
										class="brutalist-input"
										placeholder="Ex: Telefone, Empresa, Cargo..."
									/>
								</div>
								
								<div class="form-group checkbox-group">
									<label class="checkbox-label">
										<input 
											type="checkbox" 
											bind:checked={newFieldRequired} 
											class="brutalist-checkbox"
										/>
										<span>CAMPO OBRIGATÓRIO</span>
									</label>
								</div>
								
								<div class="button-group">
									<button 
										type="button" 
										on:click={addField} 
										class="brutalist-button primary"
									>
										ADICIONAR CAMPO
									</button>
								</div>
							</div>
						{/if}
						
						<div class="fields-container">
							{#if leadFields.length === 0}
								<div class="no-fields-message">
									Nenhum campo adicionado. Clique em "+ CAMPO" para começar.
								</div>
							{:else}
								{#each leadFields as field (field.id)}
									<div class="field-item {field.required ? 'required' : ''}">
										<div class="field-header">
											<label for={field.id} class="field-label">
												{field.name}
												{#if field.required}
													<span class="required-marker">*</span>
												{/if}
											</label>
											<button 
												type="button"
												class="remove-field-button"
												on:click={() => removeField(field.id)}
												title="Remover campo"
											>
												×
											</button>
										</div>
										<input 
											type="text" 
											id={field.id} 
											bind:value={field.value} 
											class="brutalist-input"
											placeholder={`Digite o ${field.name.toLowerCase()}`}
											required={field.required}
										/>
									</div>
								{/each}
							{/if}
						</div>
						
						<div class="button-group submit-group">
							<button type="submit" class="brutalist-button primary large-button">
								REGISTRAR LEAD
							</button>
						</div>
					</div>
				</form>
			</div>
			
			<!-- Right column: Preview -->
			<div class="preview-column">
				<h2 class="section-title">PREVIEW DO LEAD</h2>
				<div class="preview-container">
					{#if leadName || leadFields.some(field => field.value)}
						<div class="preview-content">
							<div class="preview-header">
								<h3 class="preview-title">{previewData.name}</h3>
								<div class="preview-database">
									<span class="label">Banco de dados:</span>
									<span class="value">{previewData.database}</span>
								</div>
							</div>
							
							<div class="preview-fields">
								{#each previewData.fields as field}
									<div class="preview-field {field.required ? 'required' : ''}">
										<div class="field-name">
											{field.name}
											{#if field.required}
												<span class="required-marker">*</span>
											{/if}
										</div>
										<div class="field-value {!field.value || field.value === '[Não preenchido]' ? 'empty' : ''}">
											{field.value}
										</div>
									</div>
								{/each}
							</div>
						</div>
					{:else}
						<div class="preview-placeholder">
							<p>Preencha os campos para visualizar o preview do lead</p>
						</div>
					{/if}
				</div>
				
				<div class="instructions-box">
					<h3 class="instructions-title">INSTRUÇÕES</h3>
					<ul class="instructions-list">
						<li>Dê um nome descritivo para identificar o lead</li>
						<li>Selecione o banco de dados apropriado</li>
						<li>Adicione campos personalizados conforme necessário</li>
						<li>Campos marcados com <span class="required-marker">*</span> são obrigatórios</li>
						<li>Verifique o preview antes de registrar</li>
					</ul>
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
		border-bottom: 4px solid #00c853;
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
		content: "REGISTRO DE LEADS";
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
	
	.glitch-text::before {
		color: #00c853;
		z-index: -1;
		clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%);
		transform: translate(-2px, 2px);
		animation: glitch 2s infinite linear alternate-reverse;
	}
	
	.glitch-text::after {
		color: #ff3e00;
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
	
	.section-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 20px;
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
	.brutalist-select:focus {
		outline: none;
		border-color: #00c853;
		box-shadow: 4px 4px 0 #000;
	}
	
	.checkbox-group {
		margin-top: 15px;
	}
	
	.checkbox-label {
		display: flex;
		align-items: center;
		cursor: pointer;
	}
	
	.brutalist-checkbox {
		margin-right: 10px;
		width: 20px;
		height: 20px;
		border: 2px solid #000;
		accent-color: #00c853;
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
	
	/* Fields Container */
	.fields-container {
		border: 2px dashed #000;
		padding: 15px;
		margin-bottom: 20px;
		background-color: #fff;
		min-height: 150px;
	}
	
	.no-fields-message {
		text-align: center;
		padding: 30px;
		color: #666;
		font-style: italic;
	}
	
	.field-item {
		margin-bottom: 15px;
		padding: 15px;
		border: 2px solid #000;
		background-color: #f9f9f9;
	}
	
	.field-item.required {
		border-left: 8px solid #00c853;
	}
	
	.field-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 10px;
	}
	
	.field-label {
		margin-bottom: 0;
		font-size: 16px;
	}
	
	.required-marker {
		color: #ff3e00;
		margin-left: 4px;
		font-weight: bold;
	}
	
	.remove-field-button {
		background: none;
		border: none;
		font-size: 24px;
		cursor: pointer;
		color: #ff3e00;
		width: 30px;
		height: 30px;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0;
		border-radius: 50%;
		transition: all 0.2s;
	}
	
	.remove-field-button:hover {
		background-color: #ff3e00;
		color: #fff;
	}
	
	/* Add Field Form */
	.add-field-form {
		padding: 15px;
		margin-bottom: 20px;
		border: 2px solid #00c853;
		background-color: #f0fff0;
	}
	
	/* Buttons */
	.button-group {
		display: flex;
		gap: 15px;
	}
	
	.submit-group {
		margin-top: 30px;
		justify-content: flex-end;
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
		background-color: #00c853;
		color: #000;
	}
	
	.secondary {
		background-color: #000;
		color: #fff;
	}
	
	.accent {
		background-color: #0077ff;
		color: #fff;
	}
	
	.small-button {
		padding: 8px 12px;
		font-size: 14px;
	}
	
	.large-button {
		padding: 15px 25px;
		font-size: 18px;
	}
	
	/* Section Elements */
	.section-title {
		font-size: 24px;
		text-transform: uppercase;
		margin-top: 0;
		margin-bottom: 20px;
		border-bottom: 3px solid #000;
		padding-bottom: 10px;
	}
	
	/* Preview Column */
	.preview-column {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}
	
	.preview-container {
		border: 3px solid #000;
		padding: 20px;
		background-color: #fff;
		min-height: 400px;
	}
	
	.preview-placeholder {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		min-height: 200px;
		border: 3px dashed #ccc;
		color: #666;
		text-align: center;
		padding: 20px;
	}
	
	.preview-content {
		font-family: Arial, sans-serif;
	}
	
	.preview-header {
		margin-bottom: 30px;
		padding-bottom: 15px;
		border-bottom: 2px solid #000;
	}
	
	.preview-title {
		margin: 0 0 10px 0;
		font-size: 28px;
		font-weight: bold;
	}
	
	.preview-database {
		display: flex;
		font-size: 16px;
	}
	
	.preview-database .label {
		font-weight: bold;
		margin-right: 10px;
	}
	
	.preview-fields {
		display: flex;
		flex-direction: column;
		gap: 15px;
	}
	
	.preview-field {
		display: grid;
		grid-template-columns: 1fr 2fr;
		padding: 10px;
		border: 1px solid #ccc;
		border-radius: 4px;
	}
	
	.preview-field.required {
		border-left: 5px solid #00c853;
	}
	
	.field-name {
		font-weight: bold;
		color: #333;
	}
	
	.field-value {
		color: #000;
	}
	
	.field-value.empty {
		color: #999;
		font-style: italic;
	}
	
	/* Instructions Box */
	.instructions-box {
		border: 3px solid #0077ff;
		padding: 20px;
		background-color: #f0f8ff;
	}
	
	.instructions-title {
		font-size: 20px;
		text-transform: uppercase;
		margin-top: 0;
		margin-bottom: 15px;
		color: #0077ff;
	}
	
	.instructions-list {
		list-style-type: square;
		padding-left: 20px;
		margin: 0;
	}
	
	.instructions-list li {
		margin-bottom: 8px;
		line-height: 1.5;
	}
</style>