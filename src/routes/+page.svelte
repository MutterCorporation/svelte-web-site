<script>
	import Header from '../components/Header.svelte';
	import Hero from '../components/Hero.svelte';
	import {
		Footer,
		FooterBrand,
		FooterCopyright,
		FooterLink,
		FooterLinkGroup
	} from 'flowbite-svelte';
	import { fly, fade, slide } from 'svelte/transition';
	import { onMount } from 'svelte';

	// Slider de textos sobre a MutterCorp
	const aboutTexts = [
		{
			title: "MutterCorp — Inovação sob demanda. Soluções sem limites.",
			content: "Na MutterCorp, somos mais do que uma Software House — somos parceiros estratégicos na construção de produtos digitais de alto impacto. Atuamos no desenvolvimento de ferramentas inteligentes, SaaS sob medida e soluções server on demand para empresas que precisam escalar com eficiência, segurança e agilidade."
		},
		{
			title: "Criamos tecnologia que resolve.",
			content: "Do zero ao deployment, entregamos plataformas robustas, APIs escaláveis, backends sólidos e interfaces modernas, sempre com foco em performance e usabilidade."
		},
		{
			title: "Soluções que impulsionam seu negócio",
			content: "🔧 Produtos próprios e soluções personalizadas\n🚀 Servidores sob demanda para máxima performance\n📦 SaaS sob medida, pronto para escalar com seu negócio\n🤝 Atendimento próximo, técnico e objetivo"
		},
		{
			title: "Do conceito à realidade",
			content: "Seja para criar um produto do zero ou dar escala ao seu sistema atual, a MutterCorp é o time certo para levar sua ideia ao próximo nível."
		}
	];

	let currentSlide = 0;
	let sliderInterval;

	onMount(() => {
		// Auto-rotate slider
		sliderInterval = setInterval(() => {
			currentSlide = (currentSlide + 1) % aboutTexts.length;
		}, 5000);

		return () => {
			if (sliderInterval) clearInterval(sliderInterval);
		};
	});

	function nextSlide() {
		currentSlide = (currentSlide + 1) % aboutTexts.length;
	}

	function prevSlide() {
		currentSlide = currentSlide === 0 ? aboutTexts.length - 1 : currentSlide - 1;
	}

	function goToSlide(index) {
		currentSlide = index;
	}

	// Apps disponíveis
	const apps = [
		{
			title: 'CryptoStomp',
			description: 'Análise avançada de criptomoedas com IA e ML',
			icon: '📈',
			link: '/cryptostomp',
			color: 'from-blue-500 to-cyan-500',
			category: 'ML/AI'
		},
		{
			title: 'Sexpomodoro',
			description: 'Timer Pomodoro com posições do Kamasutra',
			icon: '🕐',
			link: 'https://sexpomodoro.com.br',
			color: 'from-pink-500 to-red-500',
			category: 'Produtividade'
		},
		{
			title: 'BillyAgent',
			description: 'Agente de atendimento WhatsApp com IA',
			icon: '🤖',
			link: '/billy-agent',
			color: 'from-green-500 to-emerald-500',
			category: 'ML/AI'
		},
		{
			title: 'Job Hunter',
			description: 'Plataforma de busca de empregos tech',
			icon: '💼',
			link: '/job-hunter',
			color: 'from-purple-500 to-indigo-500',
			category: 'Carreira'
		},
		{
			title: 'Finance Table',
			description: 'Gestão financeira simplificada',
			icon: '💰',
			link: '/finance-table',
			color: 'from-yellow-500 to-orange-500',
			category: 'Finanças'
		},
		{
			title: 'TAB',
			description: 'Aplicativo para transtorno afetivo bipolar',
			icon: '🧠',
			link: '/tab',
			color: 'from-purple-500 to-pink-500',
			category: 'Saúde'
		},
		{
			title: 'WorkPower',
			description: 'Aplicativo para personal trainers',
			icon: '💪',
			link: '/workpower',
			color: 'from-red-500 to-orange-500',
			category: 'Fitness'
		},
		{
			title: 'Jihad (VTES)',
			description: 'Jogo de TCG em Godot',
			icon: '🎮',
			link: '/jihad',
			color: 'from-gray-500 to-black',
			category: 'Gaming'
		}
	];

	// Serviços principais
	const services = [
		{
			title: 'Machine Learning & IA',
			description: 'Soluções inteligentes para automação e análise de dados',
			icon: '🤖',
			link: '/ml-services',
			features: [
				'Análise preditiva de dados',
				'Chatbots inteligentes',
				'Automação de processos',
				'Recomendações personalizadas'
			]
		},
		{
			title: 'Omnichat Whitelabel',
			description: 'Plataforma de atendimento multicanal personalizada com sua marca',
			icon: '💬',
			link: '/omnichat',
			features: [
				'Integração com WhatsApp, Instagram e Facebook',
				'Chat em tempo real no seu site',
				'Relatórios detalhados de atendimento',
				'Personalização completa da interface'
			]
		},
		{
			title: 'CRM Empresarial',
			description: 'Gestão completa do relacionamento com seus clientes',
			icon: '🎯',
			link: '/crm',
			features: [
				'Pipeline de vendas personalizado',
				'Automação de processos',
				'Integração com e-mail marketing',
				'Dashboard de performance'
			]
		},
		{
			title: 'Sites para Influencers',
			description: 'Criação de sites profissionais e infoprodutos',
			icon: '🌟',
			link: '/influencer-sites',
			features: [
				'Landing pages otimizadas',
				'Integração com redes sociais',
				'Sistemas de afiliados',
				'Área de membros'
			]
		},
		{
			title: 'Gateway de Pagamentos',
			description: 'Soluções completas de pagamento online',
			icon: '💳',
			link: '/payment-gateway',
			features: [
				'Integração com múltiplas bandeiras',
				'Pagamentos recorrentes',
				'Relatórios financeiros',
				'Segurança PCI DSS'
			]
		},
		{
			title: 'Automação de Marketing',
			description: 'Ferramentas para automação de marketing digital',
			icon: '📧',
			link: '/marketing-automation',
			features: [
				'Sequências de e-mail automáticas',
				'Segmentação avançada',
				'A/B testing',
				'Analytics em tempo real'
			]
		}
	];

	// Tecnologias que trabalhamos
	const technologies = [
		{ name: 'Machine Learning', icon: '🧠', description: 'IA e ML para automação' },
		{ name: 'React/Next.js', icon: '⚛️', description: 'Frontend moderno' },
		{ name: 'Node.js', icon: '🟢', description: 'Backend escalável' },
		{ name: 'Python', icon: '🐍', description: 'Data Science & ML' },
		{ name: 'Svelte', icon: '🎯', description: 'Frontend performático' },
		{ name: 'Godot', icon: '🎮', description: 'Desenvolvimento de jogos' },
		{ name: 'Docker', icon: '🐳', description: 'Containerização' },
		{ name: 'AWS/Azure', icon: '☁️', description: 'Cloud computing' }
	];

	// Casos de sucesso
	const successCases = [
		{
			title: 'CryptoStomp',
			description: 'Plataforma de análise de criptomoedas com IA',
			result: 'Aumento de 300% na precisão das previsões',
			image: '/cryptostomp-case.jpg'
		},
		{
			title: 'BillyAgent',
			description: 'Chatbot inteligente para WhatsApp',
			result: 'Redução de 70% no tempo de atendimento',
			image: '/billyagent-case.jpg'
		},
		{
			title: 'Job Hunter',
			description: 'Plataforma de busca de empregos',
			result: 'Mais de 10.000 vagas cadastradas',
			image: '/jobhunter-case.jpg'
		}
	];

	const stats = [
		{ number: '98%', label: 'Satisfação dos Clientes' },
		{ number: '24/7', label: 'Suporte Técnico' },
		{ number: '+500', label: 'Empresas Atendidas' },
		{ number: '99.9%', label: 'Uptime Garantido' },
		{ number: '+50', label: 'Projetos ML/IA' },
		{ number: '+100', label: 'Sites Criados' }
	];

	let name = '';
	let email = '';
	let phone = '';
	let message = '';
	let loading = false;
	let success = false;
	let error = false;

	async function handleSubmit() {
		loading = true;
		error = false;
		success = false;

		try {
			const response = await fetch('https://dev.muttercorp.com.br/leads', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					name,
					email,
					phone,
					message
				})
			});

			if (response.ok) {
				success = true;
				name = '';
				email = '';
				phone = '';
				message = '';
			} else {
				error = true;
			}
		} catch (err) {
			error = true;
		} finally {
			loading = false;
		}
	}
</script>

<svelte:head>
	<title>MutterCorp - Soluções Empresariais em Tecnologia e IA</title>
	<meta
		name="description"
		content="Transforme seu negócio com nossas soluções em ML, IA, CRM, Omnichannel e desenvolvimento de aplicações"
	/>
	<meta
		name="keywords"
		content="Machine Learning, IA, CRM, Omnichannel, Chatwoot, Análise de Investimentos, Tecnologia Empresarial, B2B, Desenvolvimento Web, Apps"
	/>
	<meta name="author" content="MutterCorp" />
	<meta property="og:title" content="MutterCorp - Tecnologia que Transforma" />
	<meta
		property="og:description"
		content="Soluções empresariais integradas com IA e ML para impulsionar seu negócio"
	/>
	<meta property="og:url" content="https://muttercorp.com.br/" />
	<meta property="og:type" content="website" />
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
	<Header />

	<!-- Hero Section -->
	<section class="relative flex h-screen items-center justify-center overflow-hidden">
		<div class="absolute inset-0 z-0 bg-gradient-to-r from-blue-900/80 to-purple-900/80"></div>

		<div class="container z-10 mx-auto px-4" in:fly={{ y: 50, duration: 1000 }}>
			<div class="mx-auto max-w-4xl text-center">
				<h1
					class="mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-5xl font-bold text-transparent md:text-7xl"
				>
					Inovação & Tecnologia
				</h1>
				<p class="mb-8 text-xl text-gray-300 md:text-2xl">
					Soluções empresariais com Machine Learning e IA que transformam seu negócio
				</p>
				<div class="flex flex-col justify-center gap-4 sm:flex-row">
					<a
						href="#services"
						class="transform rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-3 transition-all hover:scale-105 hover:from-blue-700 hover:to-purple-700"
					>
						Conhecer Soluções
					</a>
					<a
						href="#contact"
						class="rounded-full border border-white/20 px-8 py-3 transition-all hover:bg-white/10"
					>
						Falar com Especialista
					</a>
				</div>
			</div>
		</div>
	</section>

	<!-- Slider Sobre a MutterCorp -->
	<section class="bg-gradient-to-r from-gray-900/50 to-black/50 py-24">
		<div class="container mx-auto px-4">
			<div class="mx-auto max-w-4xl">
				<div class="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-lg">
					<!-- Slides -->
					<div class="relative h-64">
						{#each aboutTexts as text, i}
							{#if i === currentSlide}
								<div
									class="absolute inset-0 flex flex-col justify-center"
									in:slide={{ duration: 500 }}
									out:slide={{ duration: 500 }}
								>
									<h2 class="mb-4 text-2xl font-bold text-blue-400 md:text-3xl">
										{text.title}
									</h2>
									<p class="text-lg text-gray-300 whitespace-pre-line">
										{text.content}
									</p>
								</div>
							{/if}
						{/each}
					</div>

					<!-- Controles do Slider -->
					<div class="mt-6 flex items-center justify-between">
						<div class="flex gap-2">
							{#each aboutTexts as _, i}
								<button
									on:click={() => goToSlide(i)}
									class="h-2 w-8 rounded-full transition-all {i === currentSlide ? 'bg-blue-500' : 'bg-white/20'}"
									aria-label="Ir para slide {i + 1}"
								></button>
							{/each}
						</div>
						<div class="flex gap-2">
							<button
								on:click={prevSlide}
								class="rounded-full bg-white/10 p-2 transition-all hover:bg-white/20"
								aria-label="Slide anterior"
							>
								<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
								</svg>
							</button>
							<button
								on:click={nextSlide}
								class="rounded-full bg-white/10 p-2 transition-all hover:bg-white/20"
								aria-label="Próximo slide"
							>
								<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
								</svg>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Apps Section -->
	<section class="py-24">
		<div class="container mx-auto px-4">
			<h2
				class="mb-16 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-center text-4xl font-bold text-transparent"
			>
				Nossas Aplicações
			</h2>

			<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
				{#each apps as app, i}
					<a
						href={app.link}
						class="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-lg transition-all hover:scale-105 hover:border-blue-500/50"
						in:fly={{ y: 50, duration: 500, delay: i * 100 }}
					>
						<div
							class="absolute inset-0 bg-gradient-to-br {app.color} opacity-0 transition-opacity group-hover:opacity-10"
						></div>
						<div class="mb-2">
							<span class="inline-block rounded-full bg-white/10 px-2 py-1 text-xs text-gray-400">
								{app.category}
							</span>
						</div>
						<span class="mb-4 block text-4xl">{app.icon}</span>
						<h3
							class="mb-2 text-xl font-bold text-white group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:text-transparent {app.color}"
						>
							{app.title}
						</h3>
						<p class="text-gray-400">{app.description}</p>
					</a>
				{/each}
			</div>
		</div>
	</section>

	<!-- Tecnologias -->
	<section class="bg-gradient-to-r from-gray-900/50 to-black/50 py-24">
		<div class="container mx-auto px-4">
			<h2
				class="mb-16 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-center text-4xl font-bold text-transparent"
			>
				Tecnologias que Utilizamos
			</h2>

			<div class="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-8">
				{#each technologies as tech, i}
					<div
						class="group text-center"
						in:fly={{ y: 50, duration: 500, delay: i * 100 }}
					>
						<div class="mb-4 text-4xl transition-transform group-hover:scale-110">{tech.icon}</div>
						<h3 class="mb-2 text-sm font-semibold text-white">{tech.name}</h3>
						<p class="text-xs text-gray-400">{tech.description}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Serviços -->
	<section id="services" class="py-24">
		<div class="container mx-auto px-4">
			<h2
				class="mb-16 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-center text-4xl font-bold text-transparent"
			>
				Nossas Soluções
			</h2>

			<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
				{#each services as service, i}
					<a
						href={service.link}
						class="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-lg transition-all hover:border-blue-500/50 hover:bg-white/10"
						in:fly={{ y: 50, duration: 500, delay: i * 200 }}
					>
						<span class="mb-4 block text-4xl">{service.icon}</span>
						<h3 class="mb-4 text-2xl font-bold text-blue-400">{service.title}</h3>
						<p class="mb-6 text-gray-400">{service.description}</p>
						<ul class="space-y-3">
							{#each service.features || [] as feature}
								<li class="flex items-center text-gray-300">
									<svg
										class="mr-2 h-5 w-5 text-blue-500"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M5 13l4 4L19 7"
										/>
									</svg>
									{feature}
								</li>
							{/each}
						</ul>
					</a>
				{/each}
			</div>
		</div>
	</section>

	<!-- Casos de Sucesso -->
	<section class="bg-gradient-to-r from-gray-900/50 to-black/50 py-24">
		<div class="container mx-auto px-4">
			<h2
				class="mb-16 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-center text-4xl font-bold text-transparent"
			>
				Casos de Sucesso
			</h2>

			<div class="grid grid-cols-1 gap-8 md:grid-cols-3">
				{#each successCases as successCase, i}
					<div
						class="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-lg"
						in:fly={{ y: 50, duration: 500, delay: i * 200 }}
					>
						<div class="mb-4 h-48 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20"></div>
						<h3 class="mb-2 text-xl font-bold text-white">{successCase.title}</h3>
						<p class="mb-4 text-gray-400">{successCase.description}</p>
						<div class="rounded-lg bg-green-500/20 p-3">
							<p class="text-sm text-green-400">
								<strong>Resultado:</strong> {successCase.result}
							</p>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Estatísticas -->
	<section class="bg-gradient-to-r from-blue-900/50 to-purple-900/50 py-24">
		<div class="container mx-auto px-4">
			<div class="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
				{#each stats as stat}
					<div class="text-center" in:fly={{ y: 50, duration: 500 }}>
						<div class="mb-2 text-4xl font-bold text-blue-400">{stat.number}</div>
						<div class="text-sm text-gray-400">{stat.label}</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Por que escolher a MutterCorp -->
	<section class="py-24">
		<div class="container mx-auto px-4">
			<h2
				class="mb-16 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-center text-4xl font-bold text-transparent"
			>
				Por que Escolher a MutterCorp?
			</h2>

			<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
				<div class="text-center" in:fly={{ y: 50, duration: 500 }}>
					<div class="mb-4 text-4xl">🚀</div>
					<h3 class="mb-2 text-xl font-bold text-white">Inovação Constante</h3>
					<p class="text-gray-400">Sempre na vanguarda da tecnologia com ML e IA</p>
				</div>
				<div class="text-center" in:fly={{ y: 50, duration: 500, delay: 100 }}>
					<div class="mb-4 text-4xl">⚡</div>
					<h3 class="mb-2 text-xl font-bold text-white">Performance</h3>
					<p class="text-gray-400">Aplicações otimizadas para máxima velocidade</p>
				</div>
				<div class="text-center" in:fly={{ y: 50, duration: 500, delay: 200 }}>
					<div class="mb-4 text-4xl">🛡️</div>
					<h3 class="mb-2 text-xl font-bold text-white">Segurança</h3>
					<p class="text-gray-400">Proteção de dados e compliance total</p>
				</div>
				<div class="text-center" in:fly={{ y: 50, duration: 500, delay: 300 }}>
					<div class="mb-4 text-4xl">🤝</div>
					<h3 class="mb-2 text-xl font-bold text-white">Suporte 24/7</h3>
					<p class="text-gray-400">Equipe sempre disponível para ajudar</p>
				</div>
			</div>
		</div>
	</section>

	<!-- CTA Section com Formulário -->
	<section id="contact" class="bg-gradient-to-r from-gray-900/50 to-black/50 py-24">
		<div class="container mx-auto px-4">
			<div class="mx-auto max-w-4xl">
				<div class="mb-12 text-center">
					<h2 class="mb-8 text-4xl font-bold">Pronto para Transformar seu Negócio?</h2>
					<p class="mb-8 text-xl text-gray-400">
						Entre em contato conosco e descubra como nossas soluções em ML, IA e tecnologia podem impulsionar seus resultados
					</p>
				</div>

				<form
					on:submit|preventDefault={handleSubmit}
					class="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-lg"
				>
					<div class="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
						<div>
							<label for="name" class="mb-2 block text-sm font-medium text-gray-400">Nome</label>
							<input
								type="text"
								id="name"
								bind:value={name}
								required
								class="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
								placeholder="Seu nome completo"
							/>
						</div>

						<div>
							<label for="email" class="mb-2 block text-sm font-medium text-gray-400">E-mail</label>
							<input
								type="email"
								id="email"
								bind:value={email}
								required
								class="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
								placeholder="seu@email.com"
							/>
						</div>
					</div>

					<div class="mb-6">
						<label for="phone" class="mb-2 block text-sm font-medium text-gray-400">Telefone</label>
						<input
							type="tel"
							id="phone"
							bind:value={phone}
							required
							class="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
							placeholder="(00) 00000-0000"
						/>
					</div>

					<div class="mb-6">
						<label for="message" class="mb-2 block text-sm font-medium text-gray-400"
							>Mensagem</label
						>
						<textarea
							id="message"
							bind:value={message}
							rows="4"
							class="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
							placeholder="Como podemos ajudar?"
						></textarea>
					</div>

					<div class="flex justify-center">
						<button
							type="submit"
							disabled={loading}
							class="flex transform items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 text-lg transition-all hover:scale-105 hover:from-blue-700 hover:to-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
						>
							{#if loading}
								<svg
									class="h-5 w-5 animate-spin"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
								>
									<circle
										class="opacity-25"
										cx="12"
										cy="12"
										r="10"
										stroke="currentColor"
										stroke-width="4"
									></circle>
									<path
										class="opacity-75"
										fill="currentColor"
										d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
									></path>
								</svg>
								Enviando...
							{:else}
								Agendar Demonstração
							{/if}
						</button>
					</div>

					{#if success}
						<div
							class="mt-4 rounded-lg border border-green-500/50 bg-green-500/20 p-4 text-center text-green-400"
						>
							Mensagem enviada com sucesso! Entraremos em contato em breve.
						</div>
					{/if}

					{#if error}
						<div
							class="mt-4 rounded-lg border border-red-500/50 bg-red-500/20 p-4 text-center text-red-400"
						>
							Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente.
						</div>
					{/if}
				</form>
			</div>
		</div>
	</section>

	<!-- Footer Atualizado -->
	<Footer class="border-t border-white/10 bg-gray-900/50" footerType="logo">
		<div class="container mx-auto px-4">
			<div class="grid grid-cols-1 gap-8 py-8 md:grid-cols-4">
				<div>
					<FooterBrand href="https://muttercorp.com.br" src="logo.png" alt="MutterCorp Logo" />
					<p class="mt-4 text-gray-400">Transformando negócios através da tecnologia e IA</p>
				</div>
				<div>
					<h3 class="mb-4 text-lg font-semibold">Aplicações</h3>
					<FooterLinkGroup ulClass="space-y-2">
						<FooterLink href="/cryptostomp">CryptoStomp</FooterLink>
						<FooterLink href="/sexpomodoro">Sexpomodoro</FooterLink>
						<FooterLink href="/billy-agent">BillyAgent</FooterLink>
						<FooterLink href="/job-hunter">Job Hunter</FooterLink>
						<FooterLink href="/finance-table">Finance Table</FooterLink>
						<FooterLink href="/tab">TAB</FooterLink>
						<FooterLink href="/workpower">WorkPower</FooterLink>
						<FooterLink href="/jihad">Jihad (VTES)</FooterLink>
					</FooterLinkGroup>
				</div>
				<div>
					<h3 class="mb-4 text-lg font-semibold">Soluções</h3>
					<FooterLinkGroup ulClass="space-y-2">
						<FooterLink href="/ml-services">Machine Learning</FooterLink>
						<FooterLink href="/omnichat">Omnichat</FooterLink>
						<FooterLink href="/crm">CRM</FooterLink>
						<FooterLink href="/influencer-sites">Sites para Influencers</FooterLink>
						<FooterLink href="/payment-gateway">Gateway de Pagamentos</FooterLink>
						<FooterLink href="/marketing-automation">Automação de Marketing</FooterLink>
					</FooterLinkGroup>
				</div>
				<div>
					<h3 class="mb-4 text-lg font-semibold">Legal</h3>
					<FooterLinkGroup ulClass="space-y-2">
						<FooterLink href="/privacy">Privacidade</FooterLink>
						<FooterLink href="/terms">Termos</FooterLink>
						<FooterLink href="/cookies">Cookies</FooterLink>
					</FooterLinkGroup>
				</div>
			</div>
			<hr class="border-white/10" />
			<FooterCopyright class="py-4 text-center text-gray-400" by="MutterCorp" />
		</div>
	</Footer>
</div>

<style>
	:global(body) {
		@apply bg-gray-900;
	}

	/* Animações suaves */
	@keyframes float {
		0%,
		100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-10px);
		}
	}

	.animate-float {
		animation: float 3s ease-in-out infinite;
	}

	/* Gradientes animados */
	@keyframes gradient {
		0% {
			background-position: 0% 50%;
		}
		50% {
			background-position: 100% 50%;
		}
		100% {
			background-position: 0% 50%;
		}
	}

	.animate-gradient {
		background-size: 200% 200%;
		animation: gradient 3s ease infinite;
	}

	/* Estilos do slider */
	.slider-container {
		position: relative;
		overflow: hidden;
	}

	.slider-slide {
		transition: all 0.5s ease-in-out;
	}

	/* Melhorias de acessibilidade */
	button:focus {
		outline: 2px solid #3b82f6;
		outline-offset: 2px;
	}

	/* Efeitos de hover melhorados */
	.group:hover .group-hover\:scale-110 {
		transform: scale(1.1);
	}

	/* Animações de entrada */
	@keyframes fadeInUp {
		from {
			opacity: 0;
			transform: translateY(30px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.fade-in-up {
		animation: fadeInUp 0.6s ease-out;
	}
</style>
