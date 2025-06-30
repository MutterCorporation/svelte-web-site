<script>
	import { t } from '../../../lib/i18n/texts.js';
	
	/** @type {{closeModal: any}} */
	let { closeModal } = $props();

	let message = $state('');
	let name = $state('');
	let email = $state('');
	let isAnonymous = $state(false);

	async function handleSubmit() {
		if (message.length > 500) {
			alert(t('TREE.MODAL.MAX_CHARS_ERROR'));
			return;
		}

		const payload = {
			name: isAnonymous ? 'Anônimo' : name,
			email: isAnonymous ? '' : email,
			message: message
		};

		try {
			const response = await fetch('https://dev.muttercorp.com.br/touch', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					name: isAnonymous ? 'Anônimo' : name,
					email: isAnonymous ? '' : email,
					message: message
				})
			});

			if (response.ok) {
				alert(t('TREE.MODAL.SUCCESS'));
				closeModal();
			} else {
				alert(t('TREE.MODAL.ERROR'));
			}
		} catch (error) {
			console.error('Erro ao enviar a mensagem:', error);
			alert(t('TREE.MODAL.NETWORK_ERROR'));
		}
	}

	function handleOverlayClick(event) {
		if (event.target === event.currentTarget) {
			closeModal();
		}
	}
</script>

<div class="modal-overlay" onclick={handleOverlayClick}>
	<div class="modal-content">
		<button class="close-button" onclick={closeModal}>✖</button>
		<h2>{t('TREE.MODAL.TITLE')}</h2>
		<textarea
			placeholder={t('TREE.MODAL.MESSAGE_PLACEHOLDER')}
			bind:value={message}
			maxlength="500"
		></textarea>
		<input type="text" placeholder={t('TREE.MODAL.NAME_PLACEHOLDER')} bind:value={name} disabled={isAnonymous} />
		<input type="email" placeholder={t('TREE.MODAL.EMAIL_PLACEHOLDER')} bind:value={email} disabled={isAnonymous} />
		<label>
			<input type="checkbox" bind:checked={isAnonymous} />
			{t('TREE.MODAL.ANONYMOUS')}
		</label>
		<button onclick={handleSubmit}>{t('TREE.MODAL.SEND')}</button>
	</div>
</div>

<style>
	.modal-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 1000;
	}

	.modal-content {
		background: linear-gradient(35deg, #2f2c2c, #67d5f9);
		padding: 2rem;
		border-radius: 10px;
		max-width: 600px;
		color: white;
		width: 90%;
		box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
		position: relative;
	}

	.close-button {
		position: absolute;
		top: 1rem;
		right: 1rem;
		background: transparent;
		border: none;
		font-size: 1.5rem;
		cursor: pointer;
		color: #333;
	}

	h2 {
		margin-bottom: 1rem;
		color: #333;
		text-align: center;
	}

	textarea {
		width: 100%;
		height: 100px;
		padding: 1rem;
		margin-bottom: 1rem;
		border-radius: 5px;
		border: 1px solid #ccc;
		resize: none;
		font-size: 1rem;
		box-sizing: border-box;
	}

	input[type='text'],
	input[type='email'] {
		width: 100%;
		padding: 0.5rem;
		margin-bottom: 1rem;
		border-radius: 5px;
		border: 1px solid #ccc;
		font-size: 1rem;
		box-sizing: border-box;
	}

	label {
		display: flex;
		align-items: center;
		margin-bottom: 1rem;
		font-size: 1rem;
		color: #333;
	}

	button {
		padding: 0.75rem 1.5rem;
		background-color: #007bff;
		color: white;
		border: none;
		border-radius: 5px;
		cursor: pointer;
		transition: background-color 0.3s;
		font-size: 1rem;
		display: block;
		margin: 0 auto;
	}

	button:hover {
		background-color: #0056b3;
	}
</style>
