<script>
    let name = '';
    let surname = '';
    let username = '';
    let email = '';
    let password = '';
    let errorMessage = '';
    let successMessage = '';

    async function handleSubmit(event) {
        event.preventDefault();
        
        // Verificar se todos os campos estão preenchidos
        if (!name || !surname || !username || !email || !password) {
            errorMessage = 'Por favor, preencha todos os campos.';
            return;
        }
        
        // Montar o corpo da requisição
        const requestBody = {
            username,
            name,
            email,
            lastname: surname,
            password
        };

        try {
            const response = await fetch('https://dev.conteudointimo.com.br/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });

            if (response.status === 201) {
                // Sucesso
                successMessage = 'Registro realizado com sucesso!';
                errorMessage = ''; // Limpa a mensagem de erro
                // Limpar os campos após o envio bem-sucedido
                name = '';
                surname = '';
                username = '';
                email = '';
                password = '';
                // Redirecionar para a página de login
                window.location.href = '/blue-sky-phase/login';
            } else if (response.status === 409) {
                errorMessage = 'Este usuário ou email já está registrado.';
            } else {
                alert("Ocorreu um erro no seu registro. Tente novamente.");
            }

        } catch (error) {
            // Exibir mensagem de erro
            errorMessage = 'Ocorreu um erro: ' + error.message;
            successMessage = ''; // Limpa a mensagem de sucesso
        }
    }
</script>

<div class="flex justify-center items-center py-5">
    <div class="bg-gradient-to-br from-blue-600 to-gray-300 p-6 rounded-3xl shadow-lg max-w-lg w-full">
        <div class="text-center">
            <h2 class="text-3xl font-bold text-gray-800 mb-6">Crie sua conta</h2>
            <form onsubmit={handleSubmit}>
                <div class="space-y-6">
                    <!-- Nome -->
                    <div>
                        <label for="name" class="block text-gray-800 font-semibold mb-2">Nome:</label>
                        <input type="text" id="name" bind:value={name} class="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                    </div>

                    <!-- Sobrenome -->
                    <div>
                        <label for="surname" class="block text-gray-800 font-semibold mb-2">Sobrenome:</label>
                        <input type="text" id="surname" bind:value={surname} class="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                    </div>

                    <!-- Username -->
                    <div>
                        <label for="username" class="block text-gray-800 font-semibold mb-2">Username:</label>
                        <input type="text" id="username" bind:value={username} class="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                    </div>

                    <!-- Email -->
                    <div>
                        <label for="email" class="block text-gray-800 font-semibold mb-2">Email:</label>
                        <input type="email" id="email" bind:value={email} class="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                    </div>

                    <!-- Senha -->
                    <div>
                        <label for="password" class="block text-gray-800 font-semibold mb-2">Senha:</label>
                        <input type="password" id="password" bind:value={password} class="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                    </div>

                    <!-- Botão de Registro -->
                    <button type="submit" class="w-full py-3 mt-5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200">Registrar</button>
                </div>
            </form>

            <!-- Mensagens de erro e sucesso -->
            {#if errorMessage}
                <div class="mt-4 text-red-600 font-medium">{errorMessage}</div>
            {/if}
            {#if successMessage}
                <div class="mt-4 text-green-600 font-medium">{successMessage}</div>
            {/if}
        </div>
    </div>
</div>
