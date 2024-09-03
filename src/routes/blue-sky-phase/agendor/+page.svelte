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

    // Variáveis para o modal
    let isModalOpen = false;
    let credential1 = '';
    let credential2 = '';

	let msg = []

	async function fetchMessages() {
        const token = localStorage.getItem('MutterCorp');

        const response = await fetch('https://dev.muttercorp.com.br/bluesky', {
            method: 'GET',
            headers: {
                accept: '*/*',
                Authorization: `Bearer ${token}`
            }
        });

        if (response.ok) {
            const data = await response.json();
            msg = data; // Supondo que a resposta seja um array de mensagens
        } else {
            console.error('Erro ao buscar mensagens');
        }
    }

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

        const postDateUtc = new Date(postDate).toISOString();
        
        fetch('https://dev.muttercorp.com.br/bluesky', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                accept: '*/*',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                text: body,
                shot_date: postDateUtc
            })
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
				alert(`Erro ao criar mensagem, verifique suas credentiais`)
			})
            .finally(() => {
                isLoading = false; // Esconde o loading após a request ser concluída
            });
    }

	function handleSubmitCredentials() {
        const token = localStorage.getItem('MutterCorp');
        isLoading = true; // Mostra o loading enquanto a request é enviada

        fetch('https://dev.muttercorp.com.br/bluesky/credentials', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                accept: '*/*',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                blue_user: credential1,
                blue_password: credential2
            })
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Credenciais Cadastradas com Sucesso:', data);
                // Limpar os campos após o sucesso
                credential1 = '';
                credential2 = '';
            })
            .catch((error) => {
                console.error('Erro ao Cadastrar Credenciais:', error);
				alert("Erro ao criar as credenciais")
			})
            .finally(() => {
                isLoading = false; // Esconde o loading após a request ser concluída
                toggleModal(); // Fecha o modal após a ação
            });
    }

    function toggleModal() {
        isModalOpen = !isModalOpen;
    }

    function handleUpdateCredentials() {
        console.log('Atualizar Credenciais:', credential1, credential2);
        toggleModal();
    }

    onMount(async () => {
        isAuthenticated = await validateToken();
        
        if (!isAuthenticated) {
            window.location.href = '/blue-sky-phase/login';
        } else {
            fetchMessages()
			isLoading = false
        }
    });
</script>

<div class="container">
    <header>
        <h1> Blue Sky Phase </h1>
    </header>
    <p class="message"> Faça o agendamento das sua postagens .</p>

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
			<button type="button" on:click={toggleModal}>Cadastrar Credentials</button>
        </form>
		<div class="messages">
			<h2>Mensagens Criadas</h2>
					{#if msg.length > 0}
						<div class="messages-container">
							{#each msg as message}
								<div class="message-card">
									<div class="message-header">
										<h3>Mensagem</h3>
										{#if message.failed}
											<span class="status failed">Falha</span>
										{/if}
										{#if message.deleted_at}
											<span class="status deleted">Deletada</span>
										{/if}
									</div>
									<div class="message-body">
										<p><strong>Texto:</strong> {message.text || 'Não disponível'}</p>
										<p><strong>Data do Evento:</strong> {new Date(message.shot_date).toLocaleString()}</p>
										<p><strong>Criado em:</strong> {new Date(message.created_at).toLocaleString()}</p>
										<p><strong>Publicado em:</strong> {new Date(message.post_at).toLocaleString()}</p>
										{#if message.cause}
											<p><strong>Causa:</strong> {message.cause}</p>
										{/if}
									</div>
								</div>
							{/each}
						</div>
            {:else}
                <p>Nenhuma mensagem encontrada.</p>
            {/if}
        </div>
    {/if}
</div>


{#if isModalOpen}
<div class="modal-overlay">
	<div class="modal-content">
		<h2>Cadastrar Credenciais</h2>
		<div class="form-group">
			<label for="credential1"> username </label>
			<input id="credential1" type="text" bind:value={credential1} />
		</div>
		<div class="form-group">
			<label for="credential2"> password </label>
			<input id="credential2" type="text" bind:value={credential2} />
		</div>
		<div class="modal-buttons">
			<button on:click={handleUpdateCredentials}>Atualizar Credenciais</button>
			<button on:click={handleSubmitCredentials}>Enviar Novas Credenciais</button>
		</div>
		<button class="modal-close" on:click={toggleModal}>Fechar</button>
	</div>
</div>
{/if}


<style>
body {
    font-family: 'Roboto', sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f4f4f4;
}

/* Container principal */
.container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background: linear-gradient(25deg, #0056a0, #e0e0e0); /* Gradiente azul e cinza */
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    color: #000931;
    overflow: hidden; /* Garantir que o conteúdo não ultrapasse o container */
}

.messages {
    padding: 20px;
    background: linear-gradient(135deg, #e0f7fa, #0282d1d8);
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
	color: #000931;
}

.messages-container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
}

.message-card {
	color: #000931;
    background: linear-gradient(135deg, #e0f7fa, #b9dff6);
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    padding: 15px;
    width: calc(33% - 20px);
    box-sizing: border-box;
}

.message-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
}

.message-body p {
    margin: 5px 0;
}

.status {
    padding: 5px 10px;
    border-radius: 4px;
    font-size: 0.9em;
}

.status.failed {
    background-color: #063c6e;
    color: #d9534f;
}

.status.deleted {
    background-color: #050224;
    color: #777;
}

@media (max-width: 768px) {
    .message-card {
        width: calc(50% - 20px);
    }
}

@media (max-width: 480px) {
    .message-card {
        width: 100%;
    }
}


/* Cabeçalho */
header {
    text-align: center;
    padding: 20px 0;
    background: linear-gradient(135deg, #0056a0, #e0e0e0); /* Gradiente azul e cinza */
    color: #fff;
}

header h1 {
    font-family: 'Lora', serif;
    font-size: 2.5em;
    margin: 0;
}

header p {
    font-size: 1.5em;
    margin: 10px 0;
}

/* Formulário */
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
    box-sizing: border-box; /* Garante que o padding e a borda sejam incluídos na largura total */
}

input[type='file'] {
    margin-top: 5px;
}

textarea {
    resize: vertical;
    min-height: 150px;
}

button {
    background-color: #000931;
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

/* Mensagens e visualizações */
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

/* Estilos de esqueleto (skeleton) */
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
}

.modal-content {
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    width: 80%;
    max-width: 500px;
}

.modal-buttons {
    margin-top: 20px;
}

.modal-buttons button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    margin-right: 10px;
}

.modal-buttons button:hover {
    background-color: #0056b3;
}

.modal-close {
    background: transparent;
    border: none;
    color: #007bff;
    cursor: pointer;
    font-size: 18px;
    margin-top: 10px;
}

.modal-close:hover {
    color: #0056b3;
}
    /* Estilos adicionais */
</style>

