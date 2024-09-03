<script>
	import { onMount } from 'svelte';
    import Loding from '../../../components/Loding.svelte'
    let isLoading = true;

    function handleAction(action) {
        if (action === 'pay') {
            // Redirecionar para o link de pagamento
            window.location.href = 'URL_DO_LINK_DE_PAGAMENTO'; // Substitua pelo URL real
        } else if (action === 'continue') {
            // Continuar com a versão gratuita
            window.location.href = 'agendor'; // Substitua pelo URL real
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

    function handleRegister() {
        // Lógica para registrar ou adquirir o plano
       
        console.log('Registro ou aquisição do plano');
    }

    onMount(async () => {
        const isAuthenticated = await validateToken();
        
        if (!isAuthenticated) {
			window.location.href = '/blue-sky-phase/login';
        } else {
			isLoading = false
		}
		 // Loading concluído
    });

</script>

{#if isLoading}
<Loding message="Por favor, aguarde..." />
{:else}
<div class="cards-container">
    <div class="card">
        <h3>Free</h3>
        <p>Explore as funcionalidades básicas e comece a agendar suas postagens com a nossa versão gratuita.</p>
        <ul class="plan-details">
            <li>Limite diário: 3 postagens</li>
            <li>Postagens mensais: 13</li>
        </ul>
        <button class="btn" on:click={() => handleAction('continue')}>Experimente Grátis</button>
    </div>
    <div class="card">
        <h3>Premium</h3>
        <p>Obtenha acesso completo a todas as funcionalidades avançadas e maximize sua presença nas redes sociais.</p>
        <ul class="plan-details">
            <li>Limite diário: 300 postagens</li>
            <li>Postagens mensais: Ilimitadas</li>
        </ul>
        <p class="price">R$ 27,99 por mês</p>
        <button class="btn" on:click={() => handleAction('pay')}>Adquira o Premium</button>
    </div>
</div>
{/if}

<style>
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

    html, body {
        height: 100%;
        margin: 0;
    }

    * {
        box-sizing: border-box;
    }

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

    .info-container {
        max-width: 100%;
        padding: 20px;
        background: #fff;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        color: #333;
        font-family: 'Roboto', sans-serif;
    }

    .info-container h2 {
        font-size: 2rem;
        color: #333;
        margin-bottom: 1rem;
        text-align: center;
    }

    .plan-info {
        margin-bottom: 1rem;
    }

    .plan-info h3 {
        font-size: 1.5rem;
        color: #333;
        margin-bottom: 0.5rem;
    }

    .plan-info ul {
        list-style-type: disc;
        margin-left: 1.5rem;
    }

    .plan-info p {
        font-size: 1rem;
        color: #333;
    }

    .action-buttons {
        text-align: center;
    }

    .btn-action {
        background-color: #007bff;
        color: #fff;
        border: none;
        padding: 10px 20px;
        border-radius: 4px;
        font-size: 16px;
        cursor: pointer;
        margin: 10px;
        display: inline-block;
        text-align: center;
    }

    .btn-action:hover {
        background-color: #0056b3;
    }

    .cards-container {
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        padding: 20px;
    }

    .cards-container .card {
        background: #fff;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        padding: 20px;
        max-width: 300px;
        width: 100%;
        margin: 10px;
    }

    .cards-container h3 {
        font-size: 1.5rem;
        margin-bottom: 0.5rem;
        color: #333;
    }

    .plan-details {
        list-style-type: none;
        padding: 0;
    }

    .plan-details li {
        margin-bottom: 0.5rem;
    }

    .price {
        font-size: 1.25rem;
        font-weight: 700;
        color: #007bff;
        margin-top: 1rem;
    }

    .btn {
        background-color: #007bff;
        color: #fff;
        border: none;
        padding: 10px 20px;
        border-radius: 4px;
        font-size: 16px;
        cursor: pointer;
        margin-top: 10px;
        display: block;
        width: 100%;
        text-align: center;
    }

    .btn:hover {
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

        .info-container {
            padding: 15px;
        }

        .cards-container {
            flex-direction: column;
            align-items: center;
        }
    }

    @media (max-width: 480px) {
        .card {
            padding: 10px;
        }

        .info-container {
            padding: 10px;
        }

        .btn, .btn-action {
            font-size: 14px;
            padding: 8px 16px;
        }
    }
</style>
