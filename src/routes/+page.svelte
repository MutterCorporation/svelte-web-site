<svelte:head>
  <!-- Título e descrição -->
  <title>Ebook Ereção Duradoura - Seu Guia Completo para Controle e Potência</title>
  <meta name="description" content="Descubra o guia definitivo para melhorar o controle, potência e saúde sexual com o Ebook Ereção Duradoura. Transforme sua vida com técnicas comprovadas.">

  <!-- Palavras-chave -->
  <meta name="keywords" content="Ereção Duradoura, Saúde Sexual, Ebook, Potência Masculina, Controle Muscular, Assoalho Pélvico, Técnicas de Respiração, Vida Saudável">

  <!-- Informações do autor -->
  <meta name="author" content="Maikon Weber">

  <!-- Viewport para design responsivo -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- Open Graph (Facebook e redes sociais) -->
  <meta property="og:title" content="Ebook Ereção Duradoura - Seu Guia Completo para Controle e Potência">
  <meta property="og:description" content="Transforme sua vida sexual com o Ebook Ereção Duradoura. Aprenda técnicas comprovadas de controle e potência.">
  <meta property="og:url" content="https://dev.muttercorp.com.br/ebook">
  <meta property="og:image" content="./logo_new-preview.png">
  <meta property="og:type" content="website">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Ebook Ereção Duradoura - Controle e Potência Masculina">
  <meta name="twitter:description" content="Aprenda as melhores técnicas para melhorar seu desempenho com o Ebook Ereção Duradoura.">
  <meta name="twitter:image" content="./logo_new-preview.png">

  <!-- Favicon -->
  <link rel="icon" href="/logo_new-preview.png" type="image/x-icon">

  <!-- CSS básico -->
  <link rel="stylesheet" href="/styles.css">

  <!-- Estrutura de dados JSON-LD (Rich Snippets) -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Book",
    "name": "Ebook Ereção Duradoura",
    "url": "https://erecaoduradoura.com.br",
    "description": "Descubra como melhorar sua saúde sexual e controle com o Ebook Ereção Duradoura.",
    "author": {
      "@type": "Person",
      "name": "Maikon Weber"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Mutter Corp",
      "logo": {
        "@type": "ImageObject",
        "url": "https://erecaoduradoura.com.br"
      }
    },
    "image": "./logo_new-preview.png"
  }
  </script>

  <!-- Manifesto para PWA -->
  <link rel="manifest" href="/manifest.json">
</svelte:head>

<script>
import { onMount } from 'svelte';
  
let days = 0, hours = 0, minutes = 0, seconds = 0, email = '';
let countdownFinished = false;
const targetDate = new Date('2025-01-05').getTime();



const features = [
  {
	title: "Controle Total",
	description: "Aprenda técnicas avançadas para dominar seus músculos pélvicos",
	icon: "💪"
  },
  {
	title: "Resultados Comprovados",
	description: "Metodologia testada e aprovada por especialistas",
	icon: "✅"
  },
  {
	title: "Conteúdo Exclusivo",
	description: "Exercícios e técnicas nunca antes revelados",
	icon: "🔒"
  }
];
const chapters = [
  {
    title: "Fundamentos da Anatomia",
    content: "Explore os aspectos essenciais da anatomia humana, entendendo como o corpo funciona de maneira integrada, com foco nos sistemas musculoesquelético, cardiovascular e nervoso."
  },
  {
    title: "O Mecanismo da Ereção e o Poder do Controle Muscular",
    content: "Descubra como o sistema vascular e os músculos do assoalho pélvico influenciam diretamente o mecanismo da ereção, e aprenda a fortalecer essas áreas para melhorar o desempenho."
  },
  {
    title: "A Mente no Controle – Superando o Estresse e Ansiedade",
    content: "Aprenda técnicas práticas para reduzir o estresse e a ansiedade, com foco no controle emocional e mental para alcançar maior estabilidade e foco em situações desafiadoras."
  },
  {
    title: "Fortalecendo os Músculos do Assoalho Pélvico – A Base do Controle Sexual",
    content: "Saiba como exercícios específicos podem ajudar a fortalecer os músculos do assoalho pélvico, promovendo maior controle durante as relações sexuais e benefícios gerais para a saúde."
  },
  {
    title: "A Respiração como Ferramenta de Controle e Potência",
    content: "Descubra o impacto da respiração controlada no desempenho físico e mental, com técnicas para aumentar a potência e reduzir a tensão em momentos críticos."
  },
  {
    title: "A Importância do Descanso e Recuperação",
    content: "Entenda como o descanso adequado e os métodos de recuperação ajudam a melhorar a saúde, o desempenho e a resistência a longo prazo."
  }
];


function updateCountdown() {
  const now = new Date().getTime();

  const distance = targetDate - now;
 
  if (distance < 0) {
      countdownFinished = true;
      return;
    }
 
  days = Math.floor(distance / (1000 * 60 * 60 * 24));
  hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  seconds = Math.floor((distance % (1000 * 60)) / 1000);
}

function handleSubmit() {
  alert('Email cadastrado com sucesso!');
  email = '';
}

onMount(() => {
  updateCountdown();
  const interval = setInterval(updateCountdown, 1000);
  return () => clearInterval(interval);
});
</script>




<main>
<div class="overlay" />

<section class="hero">
  <img src="./logo_new-preview.png" alt="Logo" class="logo animate-slide-down" />
  <h1 class="animate-slide-down"> A Ereção que Não Acaba Nunca !</h1>
  <p class="subtitle animate-slide-up">Uma jornada para transformar sua vida íntima</p>
 
  
  {#if !countdownFinished}
  <div class="countdown-container">
	<div class="countdown-container">
		<div class="countdown-title">Lançamento em:</div>
		<div class="countdown">
		  <div class="countdown-item">
			<span>{days}</span>
			<span class="label">Dias</span>
		  </div>
		  <div class="countdown-item">
			<span>{hours}</span>
			<span class="label">Horas</span>
		  </div>
		  <div class="countdown-item">
			<span>{minutes}</span>
			<span class="label">Minutos</span>
		  </div>
		  <div class="countdown-item">
			<span>{seconds}</span>
			<span class="label">Segundos</span>
		  </div>
		</div>
	  </div>
	<!-- Previous countdown code remains the same -->
  </div>
{:else}
  <div class="purchase-card animate-fade-in">
    <div class="card-content">
      <h2>Disponível Agora!</h2>
      <img src="./jeff-tumale-lov_Iroo2N8-unsplash.jpg" alt="Ebook Cover" class="ebook-cover" />
      <div class="price-tag">
        <span class="original-price">R$ 99,00</span>
        <span class="current-price">R$ 35,00</span>
      </div>
      <ul class="benefits">
        <li>✓ Acesso imediato ao conteúdo</li>
        <li>✓ Garantia de 30 dias</li>
      </ul>
      <a href="https://pay.kirvano.com/5ac5007d-8c52-408b-9419-a29acdbd1e4c" class="purchase-button">
        Comprar Agora
        <span class="arrow">→</span>
      </a>
    </div>
  </div>
{/if}
  
  <div class="features-grid">
	{#each features as feature}
	  <div class="feature-card">
		<span class="feature-icon">{feature.icon}</span>
		<h3>{feature.title}</h3>
		<p>{feature.description}</p>
	  </div>
	{/each}
  </div>
</section>

<section class="about">
  <div class="about-content">
	<div class="about-text">
	  <h2>Sobre o E-book</h2>
	  <p>Este guia completo foi desenvolvido por especialistas para ajudar homens a alcançarem seu máximo potencial. Com técnicas cientificamente comprovadas e exercícios práticos, você aprenderá a desenvolver um controle muscular excepcional.</p>
	  <p>Ideal para quem busca melhorar sua performance e autoconfiança, este e-book oferece um caminho claro e efetivo para resultados duradouros.</p>
	</div>
	<img src="./logo_new-preview.png" alt="Ebook Preview" class="about-image" />
  </div>
</section>

<section class="chapters">
  <h2>Conteúdo do E-book</h2>
  <div class="chapters-grid">
	{#each chapters as chapter, i}
	  <div class="chapter-card">
		<span class="chapter-number">Capítulo {i + 1}</span>
		<h3>{chapter.title}</h3>
		<p>{chapter.content}</p>
	  </div>
	{/each}
  </div>
</section>


<section class="testimonials">
  <h2>Depoimentos</h2>
  <div class="testimonials-grid">
	<div class="testimonial-card">
	  <img src="./young-bearded-man-with-striped-shirt.jpg" alt="User" class="testimonial-avatar" />
	  <p>"As técnicas são otimas realmente melhoram a desempenho e também fazem diferença, minhas esposa relata 
      que eu vibro dentro dela!"</p>
	  <span class="testimonial-author">- Bruno Toshi .</span>
	</div>
	<div class="testimonial-card">
	  <img src="./portrait-smiling-young-man-rubbing-his-hands.jpg" alt="User" class="testimonial-avatar" />
	  <p>"Hoje em dia consigo realmente gozar quando eu quero basta reduzir o ritmo
      e usar a tecnicas de controle."</p>
	  <span class="testimonial-author">- Erick Ramos .</span>
	</div>
  </div>
</section>

<section class="subscription-form">
  <h2>Garanta Seu E-book com Desconto Especial</h2>
  <p>Cadastre-se agora e receba 20% de desconto no lançamento + bônus exclusivos!</p>
  <form on:submit|preventDefault={handleSubmit}>
	<input 
	  type="email" 
	  bind:value={email}
	  placeholder="Seu melhor e-mail" 
	  required
	/>
	<button type="submit">Quero Garantir Meu Desconto</button>
  </form>
</section>

</main>

<style>

.purchase-card {
    background: rgba(130, 112, 133, 0.3);
    backdrop-filter: blur(10px);
    border-radius: 16px;
    padding: 2rem;
    max-width: 400px;
    margin: 2rem auto;
    text-align: center;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  }

  .ebook-cover {
    width: 200px;
    height: 200px;
    border-radius: 8px;
    margin: 1rem 0;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  .price-tag {
    margin: 1.5rem 0;
  }

  .original-price {
    text-decoration: line-through;
    color: #8ebe94;
    font-size: 1.2rem;
    margin-right: 1rem;
  }

  .current-price {
    color: #ccfc8e;
    font-size: 2rem;
    font-weight: bold;
  }

  .benefits {
    list-style: none;
    margin: 1.5rem 0;
    text-align: left;
  }

  .benefits li {
    margin: 0.5rem 0;
    color: white;
  }

  .purchase-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    background: #dc5b3e;
    color: white;
    padding: 1rem 2rem;
    border-radius: 8px;
    text-decoration: none;
    font-weight: bold;
    transition: all 0.3s ease;
  }

  .purchase-button:hover {
    background: #c64832;
    transform: translateY(-2px);
  }

  .arrow {
    transition: transform 0.3s ease;
  }

  .purchase-button:hover .arrow {
    transform: translateX(4px);
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .animate-fade-in {
    animation: fadeIn 0.5s ease-out;
  }
  
  :global(body) {
    margin: 0;
    font-family: 'Segoe UI', sans-serif;
    background-color: #4e395d;
    color: white;
    min-height: 100vh;
  }

  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, #4e395d, #827085);
    opacity: 0.8;
    z-index: -1;
  }

  main {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
  }

  .hero {
    text-align: center;
    padding: 4rem 0;
  }

  h1 {
    font-size: 3rem;
    color: #ccfc8e;
    margin-bottom: 1rem;
  }

  .subtitle {
    font-size: 1.5rem;
    color: #8ebe94;
    margin-bottom: 3rem;
  }

  .countdown-container {
    margin: 3rem 0;
  }

  .countdown {
    display: flex;
    justify-content: center;
    gap: 2rem;
    margin-top: 1rem;
  }

  .countdown-item {
    background: #827085;
    padding: 1rem;
    border-radius: 8px;
    min-width: 100px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .countdown-item span {
    display: block;
    font-size: 2rem;
    font-weight: bold;
    color: #ccfc8e;
  }

  .countdown-item .label {
    font-size: 0.9rem;
    color: white;
    margin-top: 0.5rem;
  }

  .subscription-form {
    background: rgba(130, 112, 133, 0.3);
    padding: 2rem;
    border-radius: 12px;
    backdrop-filter: blur(10px);
    max-width: 600px;
    margin: 3rem auto;
  }

  form {
    display: flex;
    gap: 1rem;
    margin-top: 1.5rem;
  }

  input {
    flex: 1;
    padding: 0.8rem;
    border: none;
    border-radius: 4px;
    background: rgba(255, 255, 255, 0.9);
  }

  button {
    padding: 0.8rem 1.5rem;
    border: none;
    border-radius: 4px;
    background: #dc5b3e;
    color: white;
    cursor: pointer;
    transition: background 0.3s ease;
  }

  button:hover {
    background: #c64832;
  }

  .chapter-preview {
    background: rgba(130, 112, 133, 0.3);
    padding: 2rem;
    border-radius: 12px;
    backdrop-filter: blur(10px);
    margin: 3rem 0;
  }

  ul {
    list-style-position: inside;
    margin-top: 1rem;
  }

  li {
    margin: 0.5rem 0;
    color: #ccfc8e;
  }

  @keyframes slideDown {
    from { transform: translateY(-50px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }

  @keyframes slideUp {
    from { transform: translateY(50px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }

  .animate-slide-down {
    animation: slideDown 1s ease-out;
  }

  .animate-slide-up {
    animation: slideUp 1s ease-out;
  }

  @media (max-width: 768px) {
    .countdown {
      flex-wrap: wrap;
      gap: 1rem;
    }

    .countdown-item {
      min-width: 80px;
    }

    form {
      flex-direction: column;
    }

    h1 {
      font-size: 2rem;
    }
  }

  
  .logo {
    width: 150px;
    height: 150px;
    margin-bottom: 2rem;
    border-radius: 50%;
  }

  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    margin: 4rem 0;
  }

  .feature-card {
    background: rgba(130, 112, 133, 0.3);
    padding: 2rem;
    border-radius: 12px;
    backdrop-filter: blur(10px);
    text-align: center;
  }

  .feature-icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    display: block;
  }

  .about {
    margin: 4rem 0;
  }

  .about-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    align-items: center;
  }

  .about-image {
    width: 100%;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .chapters-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin: 2rem 0;
  }

  .chapter-card {
    background: rgba(130, 112, 133, 0.3);
    padding: 2rem;
    border-radius: 12px;
    backdrop-filter: blur(10px);
  }

  .chapter-number {
    color: #ccfc8e;
    font-weight: bold;
    display: block;
    margin-bottom: 1rem;
  }

  .testimonials-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    margin: 2rem 0;
  }

  .testimonial-card {
    background: rgba(130, 112, 133, 0.3);
    padding: 2rem;
    border-radius: 12px;
    backdrop-filter: blur(10px);
    text-align: center;
  }

  .testimonial-avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    margin: 0 auto 1rem;
  }

  .testimonial-author {
    color: #ccfc8e;
    display: block;
    margin-top: 1rem;
  }

  @media (max-width: 768px) {
    .about-content {
      grid-template-columns: 1fr;
    }

    .about-image {
      order: -1;
    }

    .features-grid,
    .chapters-grid,
    .testimonials-grid {
      grid-template-columns: 1fr;
    }
  }
</style>