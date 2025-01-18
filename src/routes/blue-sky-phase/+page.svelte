<svelte:head>
    <title>{productName} - {tagline}</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Transforme a maneira como você gerencia suas postagens na Blue Sky com o Blue Sky Phaces. Agende suas postagens com facilidade e maximize sua presença nas redes sociais.">
    <meta name="keywords" content="Blue Sky Places, agendamento de postagens, gerenciamento de redes sociais, ferramenta de agendamento, produto Blue Sky">
    <meta name="author" content="Maikon Weber">

    <!-- Open Graph tags for social media -->
    <meta property="og:title" content="{productName} - {tagline}">
    <meta property="og:description" content="Transforme a maneira como você gerencia suas postagens na Blue Sky com o Blue Sky Places. Agende suas postagens com facilidade e maximize sua presença nas redes sociais.">
    <meta property="og:image" content="../../static/blue-sky.jpg">
    <meta property="og:url" content="https://muttercorp.com.br/blue-sky-places">
    <meta property="og:type" content="website">

    <!-- Twitter Card tags -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="{productName} - {tagline}">
    <meta name="twitter:description" content="Transforme a maneira como você gerencia suas postagens na Blue Sky com o Blue Sky Places. Agende suas postagens com facilidade e maximize sua presença nas redes sociais.">
    <meta name="twitter:image" content="/bluesky/blue-sky-places.png">
    <meta name="twitter:site" content="@seuusuario">
    <meta name="twitter:creator" content="@seuusuario">

    <!-- Favicon -->
    <link rel="icon" href="/static/favicon.ico" type="image/x-icon">

    <!-- Google Fonts -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&family=Lora:wght@400;700&display=swap">
</svelte:head>

<script>
    import { onMount } from 'svelte';
    import Overlay from './Overlay.svelte'; // Componente de sobreposição
    import CornerText from './CornerText.svelte'; // Componente de texto no canto

    const productName = "Blue Sky Phase";
    const tagline = "Agende Suas Postagens com Facilidade";

    const intro = "Transforme a maneira como você gerencia suas postagens na Blue Sky com o Blue Sky Phase!";

    const description = `No mundo dinâmico das redes sociais, a organização e o timing são essenciais. O Blue Sky Phase é a solução perfeita para quem deseja otimizar seu fluxo de trabalho e garantir que suas postagens sejam publicadas no momento mais estratégico.`;

    const features = [
        {
            title: "Agendar Postagens",
            content: "Planeje e agende suas postagens com antecedência para garantir que seu conteúdo seja publicado exatamente quando você deseja, sem a necessidade de monitoramento constante."
        },
        {
            title: "Gerenciar Facilidade",
            content: "Com uma interface intuitiva, você pode gerenciar todas as suas postagens em um único lugar, tornando o processo de agendamento mais eficiente e menos estressante."
        }
    ];

    const callToAction = `Comece a transformar sua presença na Blue Sky hoje mesmo com o ${productName} e aproveite ao máximo o potencial de suas postagens!`;

    let isAuthenticated = false;
    let isLoading = true;

    onMount(async () => {
        isLoading = false;
    });

    async function validateToken() {
        const token = localStorage.getItem('MutterCorp');
        if (!token) {
            return false;
        }

        const response = await fetch('https://dev.conteudointimo.com.br/users/check-blue-sky', {
            method: 'GET',
            headers: {
                accept: '*/*',
                Authorization: `Bearer ${token}`
            }
        });

        return response.ok;
    }

    function handleLogin() {
        window.location.href = '/blue-sky-phase/login';
    }

    function handleRegister() {
        window.location.href = '/blue-sky-phase/register';
    }
</script>

<div class="container mx-auto px-4">
    <header class="bg-gradient-to-r from-blue-700 to-gray-300 text-white text-center py-8 rounded-lg shadow-lg">
        <h1 class="text-4xl font-bold font-lora">{productName}</h1>
        <p class="text-xl mt-2">{tagline}</p>
    </header>

    <section class="mt-8 bg-gradient-to-r from-blue-700 to-gray-300 text-gray-800 rounded-lg shadow-lg p-6">
        <h2 class="text-2xl font-bold text-white mb-4">{intro}</h2>
        <p class="text-lg text-white mb-6">{description}</p>

        <ul class="list-none space-y-4">
            {#each features as feature}
                <li class="bg-white p-4 rounded-lg shadow-md">
                    <strong class="block font-bold text-blue-700">{feature.title}:</strong>
                    <span class="text-gray-600">{feature.content}</span>
                </li>
            {/each}
        </ul>

        <div class="mt-6 bg-white p-6 rounded-lg shadow-md">
            <p class="text-center text-lg text-gray-700">{callToAction}</p>
        </div>

        <button 
            class="block w-full mt-6 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-800 transition duration-300" 
            on:click={handleLogin}>
            Entrar na Plataforma
        </button>
    </section>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div class="bg-white rounded-lg shadow-md p-6 text-center">
            <h3 class="text-xl font-bold text-blue-700">Free</h3>
            <p class="mt-4 text-gray-600">Explore as funcionalidades básicas e comece a agendar suas postagens com a nossa versão gratuita.</p>
            <ul class="mt-4 text-gray-500">
                <li>Postagens mensais: 30</li>
            </ul>
            <button 
                class="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-800 transition duration-300" 
                on:click={handleRegister}>
                Experimente Grátis
            </button>
        </div>

        <div class="bg-white rounded-lg shadow-md p-6 text-center">
            <h3 class="text-xl font-bold text-blue-700">Premium</h3>
            <p class="mt-4 text-gray-600">Obtenha acesso completo a todas as funcionalidades avançadas e maximize sua presença nas redes sociais.</p>
            <ul class="mt-4 text-gray-500 space-y-2">
                <li>Limite diário: 300 postagens</li>
                <li>Postagens mensais: 1000</li>
                <li>Thread-Creator: Envie um texto sem limites de caracteres em Markdown e montamos a thread</li>
                <li>Imagens na Aplicação</li>
            </ul>
            <p class="mt-4 text-blue-700 font-bold">Ainda Não Disponível</p>
            <button 
                class="mt-4 bg-gray-400 text-gray-800 py-2 px-4 rounded-lg cursor-not-allowed">
                Adquira o Premium
            </button>
        </div>
    </div>
</div>

<style>
    /* Adicione quaisquer estilos adicionais aqui, se necessário */
</style>
