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
	
	// Define o texto do produto
	const productName = "Blue Sky Phase";
	const tagline = "Agende Suas Postagens com Facilidade";

	const intro = "Transforme a maneira como você gerencia suas postagens na Blue Sky com o Blue Sky Phase!";

	const description = `
No mundo dinâmico das redes sociais, a organização e o timing são essenciais. O Blue Sky Phase é a solução perfeita para quem deseja otimizar seu fluxo de trabalho e garantir que suas postagens sejam publicadas no momento mais estratégico. Com nossa ferramenta, você pode:
`;

	const features = [
	  {
	    title: "Agendar Postagens",
	    content: "Planeje e agende suas postagens com antecedência para garantir que seu conteúdo seja publicado exatamente quando você deseja, sem a necessidade de monitoramento constante."
	  },
	  {
	    title: "Gerenciar Facilidade",
	    content: "Com uma interface intuitiva, você pode gerenciar todas as suas postagens em um único lugar, tornando o processo de agendamento mais eficiente e menos estressante."
	  }
	]


	const callToAction = `
Comece a transformar sua presença na Blue Sky hoje mesmo com o ${productName} e aproveite ao máximo o potencial de suas postagens!
`;

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

		const response = await fetch('https://dev.muttercorp.com.br/users/check-blue-sky', {
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
<div class="app-container">
	<header class="header">
		<h1>{productName}</h1>
		<p>{tagline}</p>
	</header>
	
	<section class="intro">
		<h2>{intro}</h2>
		<p class="intro-description">{description}</p>
		<ul class="features-list">
			{#each features as feature}
			<li class="feature-item">
				<strong>{feature.title}:</strong> {feature.content}
			</li>
			{/each}
		</ul>
		<div class="card-container">
			<div class="card">
				<p>{callToAction}</p>
			</div>
		</div>
		<button class="btn-enter" on:click={handleLogin}>Entrar na Plataforma</button>
	</section>
	<div class="cards-container">
    <div class="card">
        <h3>Free</h3>
        <p>Explore as funcionalidades básicas e comece a agendar suas postagens com a nossa versão gratuita.</p>
        <ul class="plan-details">
            <li>Postagens mensais: 17</li>
        </ul>
        <button class="btn" on:click={handleRegister}>Experimente Grátis</button>
    </div>
    <div class="card">
        <h3>Premium</h3>
        <p>Obtenha acesso completo a todas as funcionalidades avançadas e maximize sua presença nas redes sociais.</p>
        <ul class="plan-details">
            <li>Limite diário: 300 postagens</li>
            <li>Postagens mensais: 1000</li>
        </ul>
        <p class="price">R$ 17,99 por mês</p>
        <button class="btn" on:click={handleRegister}>Adquira o Premium</button>
    </div>
</div>

	<!-- Cookie Consent Modal -->
	<div id="cookie-modal" class="cookie-modal">
		<div class="cookie-modal-content">
			<span class="cookie-modal-close">&times;</span>
			<h2>Política de Cookies</h2>
			<p>Utilizamos cookies para garantir que você tenha a melhor experiência em nosso site. Ao continuar a navegar, você concorda com o uso de cookies.</p>
			<button class="cookie-accept">Aceitar</button>
		</div>
	</div>
</div>

<style>

.plan-details {
    list-style: none;
    padding: 0;
    margin: 0 0 1.5rem;
    font-size: 0.875rem;
    color: #666;
}

.plan-details li {
    margin-bottom: 0.5rem;
}


	.price {
    margin-bottom: 1rem;
    font-size: 1.25rem;
    font-weight: bold;
   color: #0056a0;
	}

	/* Reset básico e estilo geral da página */
	.intro {
    padding: 2rem;
    background: linear-gradient(135deg, #0056a0, #e0e0e0); /* Gradiente azul e cinza */
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    color: #333;
}
.intro h2 {
    margin-bottom: 1rem;
    font-size: 2rem;
    color: #e0e0e0;
}

.intro-description {
    margin-bottom: 1.5rem;
    font-size: 1.125rem;
    color: #e0e0e0;
}

.features-list {
    list-style: none;
    padding: 0;
    margin-bottom: 1.5rem;
}

.feature-item {
    margin-bottom: 0.5rem;
    font-size: 1rem;
    color: black;
}

.card-container {
    display: flex;
    gap: 1rem;
    flex-direction: column;
    background: linear-gradient(135deg, #0056a0, #e0e0e0); /* Gradiente azul e cinza */
}

.card {
    background: #fff;
    padding: 1rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 1rem;
	background: linear-gradient(135deg, #0056a0, #e0e0e0); /* Gradiente azul e cinza */
}

.card p {
    margin: 0;
    font-size: 1rem;
    color: white;
}

	
	body {
		font-family: 'Roboto', sans-serif;
		margin: 0;
		padding: 0;
	}

	.app-container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 20px;
	}

	.header {
		text-align: center;
		padding: 20px 0;
		background: linear-gradient(135deg, #0056a0, #e0e0e0); /* Gradiente azul e cinza */
		color: #fff;
	}

	.header h1 {
		font-family: 'Lora', serif;
		font-size: 2.5em;
		margin: 0;
	}

	.header p {
		font-size: 1.5em;
		margin: 10px 0;
	}

	.btn-enter {
		background-color: #0056b3;
		color: #fff;
		border: none;
		padding: 10px 20px;
		border-radius: 4px;
		font-size: 16px;
		cursor: pointer;
		display: block;
		margin: 20px auto;
	}

	.btn-enter:hover {
		background-color: #003d7a;
	}

	.intro {
		text-align: center;
		margin: 20px 0;
	}

	.features-list {
		list-style: none;
		padding: 0;
	}

	.feature-item {
		margin-bottom: 10px;
		font-size: 1em;
	}

	.cards-container {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 20px;
		margin-top: 20px;
	}

	.card {
		background: linear-gradient(135deg, white, #e0e0e0); /* Gradiente azul e cinza */;
		padding: 20px;
		border-radius: 8px;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
		text-align: center;
	}

	.card h3 {
		color: #007bff; /* Azul */
		margin-bottom: 15px;
		font-family: 'Lora', serif;
	}

	.card p {
		color: black;
		font-size: 1.2em;
		margin-bottom: 15px;
	}

	.card .btn {
		background-color: #007bff;
		color: #fff;
		border: none;
		padding: 12px 24px;
		border-radius: 4px;
		font-size: 16px;
		cursor: pointer;
	}

	.card .btn:hover {
		background-color: #0056b3;
	}

	/* Cookie Consent Modal Styles */
	.cookie-modal {
		display: none;
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		background-color: #000;
		color: #fff;
		padding: 10px;
		box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.5);
	}

	.cookie-modal-content {
		max-width: 1200px;
		margin: 0 auto;
		text-align: center;
	}

	.cookie-modal h2 {
		margin: 0;
	}

	.cookie-modal p {
		margin: 10px 0;
	}

	.cookie-modal-close {
		position: absolute;
		right: 20px;
		top: 10px;
		font-size: 24px;
		cursor: pointer;
	}

	.cookie-modal-close:hover {
		color: #ddd;
	}

	.cookie-accept {
		background-color: #007bff;
		color: #fff;
		border: none;
		padding: 10px 20px;
		border-radius: 4px;
		cursor: pointer;
		font-size: 16px;
	}

	.cookie-accept:hover {
		background-color: #0056b3;
	}
</style>
