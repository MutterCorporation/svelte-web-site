<script>
	import { onMount } from 'svelte';
    import Loding from '../../../components/Loding.svelte'
    let isLoading = $state(true);

    function handleAction(action) {
        if (action === 'pay') {
            // Redirecionar para o link de pagamento
            alert("Versão não disponível")
            window.location.href = 'agendor'; // Substitua pelo URL real
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
<div class="flex flex-wrap justify-center gap-6 p-6">
    <div class="bg-white shadow-lg rounded-lg p-6 w-full sm:w-1/2 lg:w-1/3">
        <h3 class="text-xl font-semibold text-gray-900 mb-4">Free</h3>
        <p class="text-gray-600 mb-4">Explore as funcionalidades básicas e comece a agendar suas postagens com a nossa versão gratuita.</p>
        <ul class="list-disc list-inside text-gray-800 mb-4">
            <li>Postagens mensais: 30</li>
        </ul>
        <button class="bg-blue-600 text-white w-full py-2 rounded-md hover:bg-blue-700" onclick={() => handleAction('continue')}>Experimente Grátis</button>
    </div>
    <div class="bg-white shadow-lg rounded-lg p-6 w-full sm:w-1/2 lg:w-1/3">
        <h3 class="text-xl font-semibold text-gray-900 mb-4">Premium</h3>
        <p class="text-gray-600 mb-4">Obtenha acesso completo a todas as funcionalidades avançadas e maximize sua presença nas redes sociais.</p>
        <ul class="list-disc list-inside text-gray-800 mb-4">
            <li>Limite diário: 300 postagens</li>
            <li>Postagens mensais: 1000</li>
			<li>Thread-Creator: Envie um texto sem limites de caracteres em Markdown e montamos a thread</li>
			<li>Imagens na Aplicação </li>
        </ul>
        <p class="text-lg font-bold text-blue-600 mb-4">Não disponível no momento</p>
        <button class="bg-gray-400 text-white w-full py-2 rounded-md cursor-not-allowed">Adquira o Premium</button>
    </div>
</div>
{/if}

<style>
	/* Remova estilos desnecessários substituídos pelo Tailwind CSS */
</style>
