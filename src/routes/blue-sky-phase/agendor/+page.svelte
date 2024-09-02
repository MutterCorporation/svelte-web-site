<script>
    import { onMount } from 'svelte';
    import Loding from '../../../components/Loding.svelte';

    let preview = '';
    let image = null;
    let title = '';
    let body = '';
    let previewHtml = '';
    let isLoading = true;
    let isAuthenticated = false;
    let postDate = ''; // Variável para armazenar a data e hora do post
    let charLimit = 300; // Limite de caracteres para o campo de texto

    async function validateToken() {
        const token = localStorage.getItem('MutterCorp');
        if (!token) {
            return false;
        }

        const response = await fetch('https://dev.muttercorp.com.br/users/check-blue-sky', {
            method: 'GET',
            headers: {
                accept: '*/*',
                Authorization: `Bearer ${token}`
            }
        });

        return response.ok;
    }

    function handleSubmit(event) {
        event.preventDefault();

        const token = localStorage.getItem('MutterCorp');
        isLoading = true; // Mostra o loading enquanto a request é enviada

        fetch('https://dev.muttercorp.com.br/bluesky', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                accept: '*/*',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                text: body,
                date: postDate
            })
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            })
            .finally(() => {
                isLoading = false; // Esconde o loading após a request ser concluída
            });
    }

    onMount(async () => {
        isAuthenticated = await validateToken();
        
        if (!isAuthenticated) {
			window.location.href = '/blue-sky-phase/login';
        } else {
			isLoading = false
		}
		 // Loading concluído
    });
</script>

<div class="container">
    <header>
        <h1>Minha Página Protegida</h1>
    </header>
    <p class="message">Este conteúdo só é acessível se o usuário estiver autenticado.</p>

    {#if isLoading}
        <Loding message="Por favor, aguarde..." />
    {:else}
        <form on:submit={handleSubmit}>
            <div class="form-group">
                <label for="body">Corpo (máx. {charLimit} caracteres):</label>
                <textarea id="body" bind:value={body} maxlength={charLimit}></textarea>
                <p>{charLimit - body.length} caracteres restantes</p>
            </div>

            <div class="form-group">
                <label for="postDate">Data e Hora do Post:</label>
                <input id="postDate" type="datetime-local" bind:value={postDate} />
            </div>

            <button type="submit">Enviar</button>
        </form>
    {/if}
</div>

<style>
	/* Seu CSS permanece inalterado */
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
	textarea,
	input[type='datetime-local'] {
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
		margin-bottom: 10px;
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

	.skeleton {
		opacity: 0.6;
		animation: pulse 1.5s infinite;
	}

	.skeleton-text {
		background-color: #e0e0e0;
		border-radius: 4px;
		height: 20px;
		width: 100%;
		margin-bottom: 10px;
	}

	.skeleton-box {
		background-color: #e0e0e0;
		border-radius: 4px;
		height: 40px;
		width: 100%;
		margin-bottom: 15px;
	}

	.skeleton-button {
		background-color: #e0e0e0;
		border-radius: 4px;
		height: 50px;
		width: 100px;
		margin-top: 15px;
	}

	@keyframes pulse {
		0% {
			opacity: 0.6;
		}
		50% {
			opacity: 1;
		}
		100% {
			opacity: 0.6;
		}
	}
</style>
