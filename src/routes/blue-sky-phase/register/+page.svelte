<script>
    let name = $state('');
    let surname = $state('');
    let username = $state('');
    let email = $state('');
    let password = $state('');
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
            const response = await fetch('https://dev.muttercorp.com.br/users', {
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
            } else {
                
                alert("Ocorreu um erro no seu registro tente trocar o usuario ou email, ou tente fazer login")
                // throw new Error('Erro na requisição: ' + response.statusText);
            }

            if(response.status === 409) {

            }

            // Sucesso
        } catch (error) {
            // Exibir mensagem de erro
            errorMessage = 'Ocorreu um erro: ' + error.message;
            successMessage = ''; // Limpa a mensagem de sucesso
        }
    }

</script>

<div class="card-container">
    <div class="card">
        <div class="form-container">
            <h2>Registro</h2>
            <form onsubmit={handleSubmit}>
                <div class="form-group">
                    <label for="name">Nome:</label>
                    <input type="text" id="name" bind:value={name} required aria-required="true" />
                </div>
                <div class="form-group">
                    <label for="surname">Sobrenome:</label>
                    <input type="text" id="surname" bind:value={surname} required aria-required="true" />
                </div>
                <div class="form-group">
                    <label for="username">Username:</label>
                    <input type="text" id="username" bind:value={username} required aria-required="true" />
                </div>
                <div class="form-group">
                    <label for="email">Email:</label>
                    <input type="email" id="email" bind:value={email} required aria-required="true" />
                </div>
                <div class="form-group">
                    <label for="password">Senha:</label>
                    <input type="password" id="password" bind:value={password} required aria-required="true" />
                </div>
                <button type="submit" class="btn-submit">Registrar</button>
            </form>
        </div>
    </div>
</div>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

    .card-container {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 20px;
    }

    .card {
        background: linear-gradient(135deg, #0056a0, #e0e0e0);
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        max-width: 600px;
        width: 100%;
        margin: 0 auto;
    }

    .form-container {
        max-width: 100%;
        padding: 20px;
        background: linear-gradient(175deg, #0056a0, #e0e0e0);

        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        color: #333;
        font-family: 'Roboto', sans-serif;
    }

    .form-container h2 {
        font-size: 2rem;
        color: #333;
        margin-bottom: 1rem;
        text-align: center;
    }

    .form-group {
        margin-bottom: 1rem;
    }

    .form-group label {
        display: block;
        font-size: 1rem;
        margin-bottom: 0.5rem;
        color: #333;
    }

    .form-group input {
        width: 100%;
        padding: 0.75rem;
        border-radius: 4px;
        border: 1px solid #ddd;
        font-size: 1rem;
        color: #333;
    }

    .form-group input:focus {
        border-color: #007bff;
        outline: none;
    }

    .btn-submit {
        background-color: #007bff;
        color: #fff;
        border: none;
        padding: 10px 20px;
        border-radius: 4px;
        font-size: 16px;
        cursor: pointer;
        display: block;
        margin: 20px auto;
    }

    .btn-submit:hover {
        background-color: #0056b3;
    }

    /* Responsividade */
    @media (max-width: 768px) {
        .card-container {
            padding: 10px;
        }

        .card {
            padding: 15px;
        }

        .form-container {
            padding: 15px;
        }
    }

    @media (max-width: 480px) {
        .card {
            padding: 10px;
        }

        .form-container {
            padding: 10px;
        }
    }

    body {
    margin: 0;
    padding: 0;
}

* {
    box-sizing: border-box;
}

</style>
