<script>
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { quintOut, cubicOut } from 'svelte/easing';
	import { products } from '$lib/products.js';

	let mounted = $state(false);
	let servicesVisible = $state(false);
	let experienceVisible = $state(false);
	let contactVisible = $state(false);

	/** @type {HTMLElement | undefined} */
	let servicesSection = $state();
	/** @type {HTMLElement | undefined} */
	let experienceSection = $state();
	/** @type {HTMLElement | undefined} */
	let contactSection = $state();

	const whatsappUrl =
		'https://wa.me/5511915009625?text=' +
		encodeURIComponent(
			'Olá! Quero tirar uma ideia do papel / resolver uma demanda de software. Podemos conversar sobre orçamento?'
		);

	const services = [
		{
			title: 'Software do zero',
			text: 'Transforme uma ideia em produto digital: sites, sistemas, APIs e painéis feitos sob medida para gerar resultado no seu negócio.'
		},
		{
			title: 'MVP que convence',
			text: 'Valide rápido com um protótipo real — ideal para investidores, clientes piloto, editais e licitações públicas.'
		},
		{
			title: 'Demanda sob controle',
			text: 'Precisa de uma feature, integração ou correção urgente? Escopo fechado, prazo combinado e entrega sem enrolação.'
		},
		{
			title: 'IA que trabalha por você',
			text: 'Assistentes inteligentes, RAG e dashboards que entendem o seu contexto e aceleram decisões do dia a dia.'
		}
	];

	const experiences = [
		{
			name: 'Abbiamo',
			url: 'https://abbiamolog.com/',
			tag: 'Logística · E-commerce · Atual',
			report:
				'Experiência mais recente: atuação na infraestrutura logística pós-compra para o e-commerce brasileiro — orquestração de entregas, cotação inteligente e integração com centenas de transportadoras para transformar SAC em retenção e operação em escala.'
		},
		{
			name: 'Smart Sky',
			url: 'https://smartsky.com.br',
			tag: 'Infraestrutura de dados · Geoespacial',
			report:
				'Ajudei a transformar captura de realidade e dados de campo em produtos digitais e dashboards acionáveis. Atuação forte na concepção de MVPs para o setor público, incluindo processos de licitação.'
		},
		{
			name: 'Group Link One',
			url: 'https://grouplinkone.com/',
			tag: 'AIoT · Telemetria de utilities',
			report:
				'Contribuí em soluções AIoT de telemetria para água, gás e energia — conectando dispositivos, protocolo e dados em tempo real para concessionárias e condomínios operarem com mais precisão.'
		},
		{
			name: 'Grupo PLL',
			url: 'https://grupopll.com.br',
			tag: 'BPO · Telecom e pós-venda',
			report:
				'Experiência em sistemas de operação em escala: pós-venda mobile, gestão de prestadores e fluxos críticos para fabricantes e seguradoras — onde cada minuto e cada OS importam.'
		}
	];

	onMount(() => {
		mounted = true;

		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (!entry.isIntersecting) continue;
					if (entry.target === servicesSection) servicesVisible = true;
					if (entry.target === experienceSection) experienceVisible = true;
					if (entry.target === contactSection) contactVisible = true;
				}
			},
			{ threshold: 0.05, rootMargin: '80px 0px' }
		);

		if (servicesSection) observer.observe(servicesSection);
		if (experienceSection) observer.observe(experienceSection);
		if (contactSection) observer.observe(contactSection);

		return () => observer.disconnect();
	});
</script>

<svelte:head>
	<title>MutterCorp — Software que gera resultado</title>
	<meta
		name="description"
		content="Tire sua ideia do papel com a MutterCorp. Software sob medida, MVPs e demandas com prazo e orçamento claros. Experiência atual na Abbiamo."
	/>
</svelte:head>

<div class="page">
	<div class="atmosphere" aria-hidden="true">
		<div class="orb orb-a"></div>
		<div class="orb orb-b"></div>
		<div class="grid-fade"></div>
	</div>

	{#if mounted}
		<section class="hero">
			<div class="hero-inner">
				<p class="brand" in:fly={{ y: 28, duration: 700, easing: quintOut }}>MutterCorp</p>
				<h1 in:fly={{ y: 36, duration: 800, delay: 80, easing: quintOut }}>
					Sua ideia merece virar software de verdade
				</h1>
				<p class="lede" in:fly={{ y: 28, duration: 750, delay: 160, easing: quintOut }}>
					Desenvolvimento sob medida para quem precisa de resultado: produto no ar, MVP que
					convence e demandas resolvidas com clareza.
				</p>
				<div class="cta-row" in:fly={{ y: 24, duration: 700, delay: 240, easing: quintOut }}>
					<a href={whatsappUrl} class="cta-primary" target="_blank" rel="noopener noreferrer"
						>Quero um orçamento</a
					>
					<a href="#servicos" class="cta-ghost">Ver como funciona</a>
				</div>
			</div>
		</section>
	{/if}

	<section id="servicos" class="section services" bind:this={servicesSection}>
		{#if servicesVisible}
			<header class="section-head" in:fade={{ duration: 500 }}>
				<p class="eyebrow">Serviços</p>
				<h2>Do briefing à entrega — sem surpresa no meio do caminho</h2>
				<p class="section-copy">
					Seja um sistema completo ou uma demanda pontual, o processo é o mesmo: entender o
					problema, definir o que importa e entregar o que gera valor — no prazo combinado.
				</p>
			</header>

			<div class="service-grid">
				{#each services as service, i}
					<article
						class="service-card"
						in:fly={{ y: 36, duration: 600, delay: 70 + i * 90, easing: cubicOut }}
					>
						<h3>{service.title}</h3>
						<p>{service.text}</p>
					</article>
				{/each}
			</div>

			<p class="offer-note" in:fade={{ duration: 450, delay: 280 }}>
				Você conta o desafio. Eu devolvo uma proposta objetiva: o que será feito, em quanto tempo e
				quanto investe. Simples assim.
			</p>

			<div class="cta-row offer-cta" in:fly={{ y: 20, duration: 500, delay: 320, easing: quintOut }}>
				<a href={whatsappUrl} class="cta-primary" target="_blank" rel="noopener noreferrer">
					Falar no WhatsApp agora
				</a>
				<a
					href="mailto:muttercorp@gmail.com?subject=Quero%20orçamento%20-%20MutterCorp"
					class="cta-ghost"
				>
					Preferir e-mail
				</a>
			</div>
		{/if}
	</section>

	<section id="produtos" class="section products">
		<header class="section-head">
			<p class="eyebrow">Produtos</p>
			<h2>Prova no ar — produtos que já existem e funcionam</h2>
			<p class="section-copy">
				Não é só portfólio em PDF. São produtos vivos que você pode abrir, testar e sentir o
				nível de entrega.
			</p>
		</header>

		<div class="product-grid">
			{#each products as product, i}
				<article
					class="product-card product-{product.accent}"
					in:fly={{ y: 28, duration: 550, delay: 40 + i * 70, easing: cubicOut }}
				>
					<span class="tag">{product.tag}</span>
					<h3>{product.name}</h3>
					<p class="summary">{product.summary}</p>
					<ul class="chip-row">
						{#each product.points as point}
							<li>{point}</li>
						{/each}
					</ul>
					<a
						href={product.url}
						class="product-link"
						target="_blank"
						rel="noopener noreferrer"
					>
						Conhecer {product.name}
						<span aria-hidden="true">→</span>
					</a>
				</article>
			{/each}
		</div>
	</section>

	<section id="experiencias" class="section experiences" bind:this={experienceSection}>
		{#if experienceVisible}
			<header class="section-head" in:fade={{ duration: 500 }}>
				<p class="eyebrow">Experiências</p>
				<h2>Quem já confiou — e o que isso significa para você</h2>
				<p class="section-copy">
					Passagens por empresas reais, com problemas reais. Essa bagagem vira vantagem no seu
					projeto: menos tentativa e erro, mais entrega certeira.
				</p>
			</header>

			<div class="experience-list">
				{#each experiences as exp, i}
					<article
						class="experience-item"
						in:fly={{ y: 32, duration: 600, delay: 90 + i * 110, easing: cubicOut }}
					>
						<div class="experience-top">
							<div>
								<span class="tag">{exp.tag}</span>
								<h3>{exp.name}</h3>
							</div>
							<a href={exp.url} target="_blank" rel="noopener noreferrer" class="exp-link">
								Visitar
								<span aria-hidden="true">↗</span>
							</a>
						</div>
						<p class="report">{exp.report}</p>
					</article>
				{/each}
			</div>
		{/if}
	</section>

	<section id="contato" class="section contact" bind:this={contactSection}>
		{#if contactVisible}
			<div class="contact-panel" in:fly={{ y: 36, duration: 700, easing: quintOut }}>
				<p class="eyebrow">Contato</p>
				<h2>Vamos tirar isso do papel?</h2>
				<p class="section-copy">
					Mande uma mensagem com o que você precisa. Em pouco tempo você recebe um retorno claro
					sobre viabilidade, prazo e investimento — sem compromisso.
				</p>

				<div class="contact-actions" in:fade={{ duration: 450, delay: 150 }}>
					<a href={whatsappUrl} class="cta-primary" target="_blank" rel="noopener noreferrer">
						WhatsApp — (11) 91500-9625
					</a>
					<a href="mailto:muttercorp@gmail.com" class="cta-ghost">muttercorp@gmail.com</a>
				</div>

				<div class="socials" in:fade={{ duration: 450, delay: 250 }}>
					<a href="https://github.com/maikonweber" target="_blank" rel="noopener noreferrer"
						>GitHub</a
					>
					<a
						href="https://www.linkedin.com/in/maikonwebercorp/"
						target="_blank"
						rel="noopener noreferrer">LinkedIn</a
					>
					<a href="https://x.com/MaikonWeber1" target="_blank" rel="noopener noreferrer">X</a>
				</div>
			</div>
		{/if}
	</section>
</div>

<style>
	.page {
		--ink: var(--site-bg);
		--paper: var(--site-fg);
		--muted: var(--site-muted);
		--accent: var(--site-accent);
		--accent-soft: var(--site-accent-soft);
		--emotive: #2a7a6a;
		--jyhhad: #8b3a4a;
		--noticia: #3a6b8a;
		--barbeiro: #a67c52;
		--surface: var(--site-surface);
		--line: var(--site-line);
		position: relative;
		isolation: isolate;
		overflow: clip;
		background: var(--ink);
		color: var(--paper);
		font-family: 'Manrope', system-ui, sans-serif;
		min-height: 100%;
		transition:
			background 0.3s ease,
			color 0.3s ease;
	}

	.atmosphere {
		pointer-events: none;
		position: absolute;
		inset: 0;
		z-index: -1;
		overflow: hidden;
	}

	.orb {
		position: absolute;
		border-radius: 50%;
		filter: blur(80px);
		opacity: 0.45;
		animation: drift 18s ease-in-out infinite alternate;
	}

	.orb-a {
		width: min(70vw, 520px);
		height: min(70vw, 520px);
		top: -12%;
		left: -8%;
		background: radial-gradient(circle, var(--site-orb-a) 0%, transparent 70%);
	}

	.orb-b {
		width: min(60vw, 440px);
		height: min(60vw, 440px);
		top: 18%;
		right: -10%;
		background: radial-gradient(circle, var(--site-orb-b) 0%, transparent 70%);
		animation-delay: -6s;
	}

	.grid-fade {
		position: absolute;
		inset: 0;
		background-image:
			linear-gradient(var(--site-grid) 1px, transparent 1px),
			linear-gradient(90deg, var(--site-grid) 1px, transparent 1px);
		background-size: 64px 64px;
		mask-image: radial-gradient(ellipse 80% 60% at 50% 20%, black 20%, transparent 75%);
	}

	@keyframes drift {
		from {
			transform: translate(0, 0) scale(1);
		}
		to {
			transform: translate(24px, 36px) scale(1.08);
		}
	}

	.hero {
		min-height: calc(100vh - 70px);
		display: flex;
		align-items: center;
		padding: 4rem 1.5rem 5rem;
	}

	.hero-inner {
		max-width: 720px;
		margin: 0 auto;
		width: 100%;
	}

	.brand {
		font-family: 'Syne', sans-serif;
		font-size: clamp(2.75rem, 9vw, 5.5rem);
		font-weight: 800;
		letter-spacing: -0.04em;
		line-height: 0.95;
		margin: 0 0 1.75rem;
	}

	.hero h1 {
		font-family: 'Syne', sans-serif;
		font-size: clamp(1.35rem, 3.2vw, 1.85rem);
		font-weight: 600;
		letter-spacing: -0.02em;
		line-height: 1.25;
		margin: 0 0 1rem;
		max-width: 22ch;
	}

	.lede {
		margin: 0 0 2rem;
		max-width: 40ch;
		font-size: 1.05rem;
		line-height: 1.65;
		color: var(--muted);
	}

	.cta-row,
	.contact-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.85rem;
	}

	.cta-primary,
	.cta-ghost,
	.product-link,
	.exp-link {
		display: inline-flex;
		align-items: center;
		gap: 0.45rem;
		text-decoration: none;
		font-weight: 600;
		font-size: 0.95rem;
		border-radius: 0.35rem;
		transition:
			transform 0.25s ease,
			background 0.25s ease,
			color 0.25s ease,
			border-color 0.25s ease;
	}

	.cta-primary {
		background: var(--accent);
		color: #fff8f3;
		padding: 0.85rem 1.35rem;
	}

	.cta-primary:hover {
		background: #a84a1c;
		color: #fff;
		transform: translateY(-2px);
	}

	.cta-ghost {
		border: 1px solid var(--site-ghost-border);
		color: var(--paper);
		padding: 0.85rem 1.25rem;
		background: transparent;
	}

	.cta-ghost:hover {
		border-color: var(--site-line-strong);
		color: var(--paper);
		transform: translateY(-2px);
	}

	.section {
		padding: 4.5rem 1.5rem;
		max-width: 1100px;
		margin: 0 auto;
	}

	.section-head {
		margin-bottom: 2.25rem;
		max-width: 38rem;
	}

	.eyebrow {
		font-size: 0.75rem;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--accent-soft);
		margin: 0 0 0.75rem;
		font-weight: 600;
	}

	.section-head h2,
	.contact-panel h2 {
		font-family: 'Syne', sans-serif;
		font-size: clamp(1.55rem, 3.4vw, 2.15rem);
		font-weight: 700;
		letter-spacing: -0.03em;
		margin: 0 0 0.85rem;
		line-height: 1.15;
	}

	.section-copy {
		margin: 0;
		color: var(--muted);
		line-height: 1.65;
	}

	.service-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(min(100%, 240px), 1fr));
		gap: 1.15rem;
		margin-bottom: 1.75rem;
	}

	.service-card {
		padding: 1.35rem 1.25rem;
		border: 1px solid var(--line);
		border-radius: 0.5rem;
		background: var(--surface);
		transition:
			border-color 0.25s ease,
			transform 0.25s ease,
			background 0.25s ease;
	}

	.service-card:hover {
		border-color: var(--site-line-strong);
		background: var(--site-surface-hover);
		transform: translateY(-2px);
	}

	.service-card h3 {
		font-family: 'Syne', sans-serif;
		font-size: 1.1rem;
		font-weight: 700;
		letter-spacing: -0.02em;
		margin: 0 0 0.55rem;
	}

	.service-card p {
		margin: 0;
		color: var(--muted);
		font-size: 0.92rem;
		line-height: 1.55;
	}

	.offer-note {
		margin: 0 0 1.5rem;
		max-width: 40rem;
		color: var(--muted);
		line-height: 1.65;
		font-size: 0.98rem;
	}

	.offer-cta {
		margin-bottom: 0.5rem;
	}

	.product-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(min(100%, 280px), 1fr));
		gap: 1.25rem;
	}

	.product-card {
		display: flex;
		flex-direction: column;
		gap: 0.85rem;
		padding: 1.5rem 1.4rem 1.35rem;
		background: var(--surface);
		border: 1px solid var(--line);
		border-radius: 0.5rem;
		min-height: 100%;
		transition:
			border-color 0.25s ease,
			transform 0.25s ease,
			background 0.25s ease;
	}

	.product-card:hover {
		border-color: var(--site-line-strong);
		transform: translateY(-3px);
		background: var(--site-surface-hover);
	}

	.product-emotive {
		border-top: 2px solid var(--emotive);
	}

	.product-jyhhad {
		border-top: 2px solid var(--jyhhad);
	}

	.product-noticia {
		border-top: 2px solid var(--noticia);
	}

	.product-barbeiro {
		border-top: 2px solid var(--barbeiro);
	}

	.tag {
		display: inline-block;
		font-size: 0.72rem;
		letter-spacing: 0.07em;
		text-transform: uppercase;
		color: var(--muted);
		font-weight: 600;
	}

	.product-emotive .tag {
		color: var(--site-emotive-tag);
	}

	.product-jyhhad .tag {
		color: var(--site-jyhhad-tag);
	}

	.product-noticia .tag {
		color: var(--site-noticia-tag);
	}

	.product-barbeiro .tag {
		color: var(--site-barbeiro-tag);
	}

	.product-card h3,
	.experience-item h3 {
		font-family: 'Syne', sans-serif;
		font-size: 1.45rem;
		font-weight: 700;
		letter-spacing: -0.03em;
		margin: 0;
	}

	.summary,
	.report {
		margin: 0;
		color: var(--muted);
		line-height: 1.6;
		font-size: 0.95rem;
		flex: 1;
	}

	.chip-row {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-wrap: wrap;
		gap: 0.45rem;
	}

	.chip-row li {
		font-size: 0.78rem;
		font-weight: 600;
		color: var(--paper);
		padding: 0.3rem 0.55rem;
		border: 1px solid var(--line);
		border-radius: 0.25rem;
		background: var(--site-chip-bg);
	}

	.product-link {
		margin-top: 0.35rem;
		color: var(--paper);
		border-bottom: 1px solid var(--site-link-underline);
		padding: 0.25rem 0;
		border-radius: 0;
		width: fit-content;
	}

	.product-link:hover {
		color: var(--accent-soft);
		border-color: var(--accent-soft);
		transform: translateX(3px);
	}

	.experience-list {
		display: flex;
		flex-direction: column;
		gap: 0;
		border-top: 1px solid var(--line);
	}

	.experience-item {
		padding: 1.65rem 0;
		border-bottom: 1px solid var(--line);
	}

	.experience-top {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 1rem;
		margin-bottom: 0.75rem;
	}

	.experience-top .tag {
		margin-bottom: 0.4rem;
	}

	.exp-link {
		flex-shrink: 0;
		color: var(--muted);
		font-size: 0.85rem;
		padding: 0.35rem 0;
		border-bottom: 1px solid transparent;
	}

	.exp-link:hover {
		color: var(--accent-soft);
		border-color: var(--accent-soft);
	}

	.contact {
		padding-bottom: 6rem;
	}

	.contact-panel {
		padding-top: 2rem;
		border-top: 1px solid var(--line);
		max-width: 40rem;
	}

	.contact-panel .section-copy {
		margin-bottom: 1.75rem;
	}

	.socials {
		display: flex;
		flex-wrap: wrap;
		gap: 1.25rem;
		margin-top: 1.75rem;
	}

	.socials a {
		color: var(--paper);
		text-decoration: none;
		font-weight: 600;
		border-bottom: 1px solid var(--site-link-underline);
		padding-bottom: 0.15rem;
	}

	.socials a:hover {
		color: var(--accent-soft);
		border-color: var(--accent-soft);
	}

	@media (prefers-reduced-motion: reduce) {
		.orb {
			animation: none;
		}
	}
</style>
