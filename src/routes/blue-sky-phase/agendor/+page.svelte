<script>
    import { onMount } from 'svelte';
    import Loding from '../../../components/Loding.svelte';

    let preview = '';
    let image = null;
    let title = '';
    let body = $state('');
    let previewHtml = '';
    let isLoading = $state(true);
    let isAuthenticated = false;
    let postDate = $state(''); // Variável para armazenar a data e hora do post
    let charLimit = 300; // Limite de caracteres para o campo de texto

    // Variáveis para o modal
    let isModalOpen = $state(false);
    let credential1 = $state('');
    let credential2 = $state('');

    let msg = $state([]);

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
            msg = [...data];
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

        const token = localStorage.getItem('MutterCorp');
        isLoading = true;

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
                fetchMessages(); // Atualizar mensagens após submissão
            })
            .catch((error) => {
                console.error('Erro ao enviar mensagem:', error);
            })
            .finally(() => {
                isLoading = false;
            });
    }

    function handleSubmitCredentials(method) {
        const token = localStorage.getItem('MutterCorp');
        isLoading = true;

        fetch('https://dev.muttercorp.com.br/bluesky/credentials', {
            method: method,
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
                credential1 = '';
                credential2 = '';
            })
            .catch((error) => {
                console.error('Erro ao cadastrar credenciais:', error);
                alert('Erro ao criar as credenciais');
            })
            .finally(() => {
                isLoading = false;
                toggleModal();
            });
    }

    function toggleModal() {
        isModalOpen = !isModalOpen;
    }

    onMount(async () => {
        isAuthenticated = await validateToken();

        if (!isAuthenticated) {
            window.location.href = '/blue-sky-phase/login';
        } else {
            fetchMessages();
            isLoading = false;
        }
    });
</script>

<div class="container mx-auto p-4 bg-gradient-to-br from-blue-700 via-gray-200 to-gray-50 rounded-lg shadow-lg text-gray-900">
    <header class="text-center mb-6">
        <h1 class="text-3xl font-bold text-white">Blue Sky Phase</h1>
        <p class="text-lg text-gray-200">Faça o agendamento das suas postagens.</p>
    </header>

    {#if isLoading}
        <Loding message="Por favor, aguarde..." />
    {:else}
        <form onsubmit={handleSubmit} class="space-y-4">
            <div class="form-group">
                <label for="body" class="block text-sm font-medium text-gray-700">Corpo (máx. {charLimit} caracteres):</label>
                <textarea id="body" bind:value={body} maxlength={charLimit} class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"></textarea>
                <p class="text-sm text-gray-500">{charLimit - body.length} caracteres restantes</p>
            </div>

            <div class="form-group">
                <label for="postDate" class="block text-sm font-medium text-gray-700">Data e Hora do Post:</label>
                <input id="postDate" type="datetime-local" bind:value={postDate} class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
            </div>

            <button type="submit" class="bg-blue-600 text-white py-2 px-4 rounded-md shadow hover:bg-blue-700">Enviar</button>
            <button type="button" onclick={toggleModal} class="bg-gray-600 text-white py-2 px-4 rounded-md shadow hover:bg-gray-700">Cadastrar Credenciais</button>
        </form>

        <div class="messages mt-8 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg shadow">
            <h2 class="text-xl font-semibold text-gray-700 mb-4">Mensagens Criadas</h2>
            {#if msg.length > 0}
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {#each msg as message}
                        <div class="message-card p-4 bg-white rounded-lg shadow-md">
                            <div class="message-header flex justify-between items-center mb-2">
                                <h3 class="text-lg font-semibold text-gray-800">Mensagem</h3>
                                {#if message.failed}
                                    <span class="status text-sm px-2 py-1 rounded bg-red-100 text-red-600">Falha</span>
                                {/if}
                                {#if message.deleted_at}
                                    <span class="status text-sm px-2 py-1 rounded bg-gray-100 text-gray-600">Deletada</span>
                                {/if}
                            </div>
                            <div class="message-body text-sm text-gray-600 space-y-1">
                                <p><strong>Texto:</strong> {message.text || 'Não disponível'}</p>
                                <p><strong>Data do Evento:</strong> {new Date(message.shot_date).toLocaleString()}</p>
                                <p><strong>Criado em:</strong> {new Date(message.created_at).toLocaleString()}</p>
                                <p><strong>Publicado em:</strong> {message.post_at ? new Date(message.post_at).toLocaleString() : "Ainda não publicada"}</p>
                                {#if message.cause}
                                    <p><strong>Causa:</strong> {message.cause}</p>
                                {/if}
                            </div>
                        </div>
                    {/each}
                </div>
            {:else}
                <p class="text-sm text-gray-500">Nenhuma mensagem encontrada.</p>
            {/if}
        </div>
    {/if}
</div>

{#if isModalOpen}
<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div class="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md">
        <h2 class="text-xl font-bold mb-4">Cadastrar Credenciais</h2>
        <p class="text-sm text-gray-600 mb-4">Suas credenciais são criptografadas e suas informações sensíveis são descriptografadas somente a nível de código e durante o envio.</p>
        <div class="mb-4">
            <label for="credential1" class="block text-sm font-medium text-gray-700 mb-2">Email do Blue-sky</label>
            <input id="credential1" type="text" bind:value={credential1} class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
        </div>
        <div class="mb-4">
            <label for="credential2" class="block text-sm font-medium text-gray-700 mb-2">Senha do Blue-sky</label>
            <input id="credential2" type="text" bind:value={credential2} class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
        </div>
        <div class="flex justify-end space-x-4">
            <button onclick={() => handleSubmitCredentials('PATCH')} class="bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700">Atualizar Credenciais</button>
            <button onclick={() => handleSubmitCredentials('POST')} class="bg-green-600 text-white px-4 py-2 rounded-md shadow hover:bg-green-700">Enviar Novas Credenciais</button>
        </div>
        <button class="mt-4 text-blue-600 hover:text-blue-700" onclick={toggleModal}>Fechar</button>
    </div>
</div>
{/if}

