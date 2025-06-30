<script>
	import { fly, fade, scale } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { quintOut, elasticOut } from 'svelte/easing';

	// Estados do slider
	let currentSlide = $state(0);
	let isAutoPlaying = $state(true);
	/** @type {any} */
	let autoPlayInterval;
	
	// Elementos para animações 3D
	/** @type {HTMLCanvasElement} */
	let rocketCanvas;
	/** @type {HTMLCanvasElement} */
	let particlesCanvas;
	/** @type {any} */
	let animationFrame;

	// Form states
	let formData = $state({
		name: '',
		email: '',
		company: '',
		message: '',
		service: ''
	});
	let isSubmitting = $state(false);
	let submitMessage = $state('');

	// Slides da apresentação - TEXTOS MELHORADOS
	const slides = [
		// Slide 1 - Welcome
		{
			type: 'hero',
			title: 'MutterCorp',
			subtitle: 'Inovação & Tecnologia Avançada',
			description: 'Transformamos ideias em realidade digital com IA, Machine Learning e soluções empresariais de alta performance que revolucionam negócios',
			background: 'from-blue-900 via-purple-900 to-black',
			icon: '🚀'
		},
		// Slide 2 - Sobre a empresa  
		{
			type: 'about',
			title: 'Software House de Elite',
			subtitle: 'Da visão à execução perfeita',
			description: 'Desenvolvemos ecossistemas digitais completos, plataformas SaaS escaláveis, aplicações inteligentes e arquiteturas robustas para empresas que lideram mercados.',
			background: 'from-gray-900 via-blue-900 to-purple-900',
			icon: '💡'
		},
		// Slide 3 - Apps - DESCRIÇÕES MELHORADAS
		{
			type: 'apps',
			title: 'Produtos Revolucionários',
			subtitle: 'Inovação que gera resultados',
			apps: [
				{
					title: 'CryptoStomp',
					description: 'Plataforma de trading inteligente com IA avançada para maximizar lucros em crypto',
					icon: '📈',
					color: 'from-blue-500 to-cyan-500',
					link: '/solucoes/cryptostomp'
				},
				{
					title: 'FinanceTable Pro',
					description: 'Dashboard financeiro com bots de IA para análise preditiva e automação de investimentos',
					icon: '💰',
					color: 'from-yellow-500 to-orange-500',
					link: '/finance-table'
				},
				{
					title: 'SexPomodoro',
					description: 'Timer gamificado para casais com sistema de recompensas e intimidade conectada',
					icon: '❤️',
					color: 'from-pink-500 to-red-500',
					link: 'https://sexpomodoro.com.br'
				},
				{
					title: 'WorkPower AI',
					description: 'Suite de produtividade empresarial com automação inteligente e analytics em tempo real',
					icon: '⚡',
					color: 'from-purple-500 to-indigo-500',
					link: 'https://workpower.app.br'
				},
				{
					title: 'BillyAgent Pro',
					description: 'Assistente virtual WhatsApp com IA conversacional e integração empresarial completa',
					icon: '🤖',
					color: 'from-green-500 to-emerald-500',
					link: '/solucoes/omnichat'
				},
				{
					title: 'TaskDoro Elite',
					description: 'Pomodoro avançado com tracking de produtividade e insights comportamentais',
					icon: '⏰',
					color: 'from-orange-500 to-red-500',
					link: '/task-doro'
				}
			],
			background: 'from-purple-900 via-pink-900 to-red-900',
			icon: '🎯'
		},
		// Slide 4 - Serviços - DESCRIÇÕES PREMIUM
		{
			type: 'services',
			title: 'Soluções Enterprise Premium',
			subtitle: 'Tecnologia que transforma mercados',
			services: [
				{
					title: 'AI & Machine Learning',
					description: 'Modelos preditivos, automação inteligente, visão computacional e processamento de linguagem natural',
					icon: '🧠',
					link: '/solucoes/machine-learning'
				},
				{
					title: 'CRM Empresarial Avançado',
					description: 'Gestão completa de relacionamento com automação de vendas e analytics preditivos',
					icon: '🎯',
					link: '/solucoes/crm'
				},
				{
					title: 'Gateway de Pagamentos',
					description: 'Infraestrutura financeira robusta com compliance internacional e segurança bancária',
					icon: '💳',
					link: '/solucoes/gateway-pagamentos'
				},
				{
					title: 'Cyber Security & Pentest',
					description: 'Auditoria de segurança, testes de penetração e proteção contra ameaças avançadas',
					icon: '🛡️',
					link: '/solucoes/pentest'
				},
				{
					title: 'OmniChat Enterprise',
					description: 'Plataforma omnichannel com IA conversacional e integração CRM completa',
					icon: '💬',
					link: '/solucoes/omnichat'
				},
				{
					title: 'Marketing Automation',
					description: 'Campanhas inteligentes, lead nurturing automatizado e ROI otimizado',
					icon: '📧',
					link: '/solucoes/automacao-marketing'
				},
				{
					title: 'Web Intelligence',
					description: 'Extração e análise de dados em larga escala com IA para insights de mercado',
					icon: '🕷️',
					link: '/solucoes/web-scraping'
				},
				{
					title: 'Game Development',
					description: 'Jogos imersivos, gamificação empresarial e experiências interativas premium',
					icon: '🎮',
					link: '/solucoes/jogos-digitais'
				}
			],
			background: 'from-emerald-900 via-blue-900 to-purple-900',
			icon: '🔧'
		},
		// Slide 5 - Blockchain - DESCRIÇÃO MAIS TÉCNICA
		{
			type: 'blockchain',
			title: 'Blockchain & Web3 Solutions',
			subtitle: 'Descentralização e economia digital',
			description: 'Arquiteturas blockchain escaláveis, contratos inteligentes auditados, DApps enterprise, NFT marketplaces, DeFi protocols e infraestrutura Web3 completa.',
			technologies: [
				{ name: 'Ethereum & L2', icon: '⚡' },
				{ name: 'Solidity Expert', icon: '📜' },
				{ name: 'Web3 & DeFi', icon: '🌐' },
				{ name: 'IPFS Storage', icon: '🗄️' },
				{ name: 'NFT Platforms', icon: '🎨' },
				{ name: 'DeFi Protocols', icon: '💰' },
				{ name: 'DAO Governance', icon: '🏛️' },
				{ name: 'Polygon & BSC', icon: '🔺' }
			],
			background: 'from-yellow-900 via-orange-900 to-red-900',
			icon: '⛓️'
		},
		// Slide 6 - Tecnologias - STACK ATUALIZADO
		{
			type: 'tech',
			title: 'Stack Tecnológico Avançado',
			subtitle: 'Ferramentas de última geração',
			technologies: [
				{ name: 'TensorFlow & PyTorch', icon: '🧠' },
				{ name: 'Power BI & Tableau', icon: '📊' },
				{ name: 'React & Next.js 14', icon: '⚛️' },
				{ name: 'Node.js & Deno', icon: '🟢' },
				{ name: 'Python & FastAPI', icon: '🐍' },
				{ name: 'Svelte & SvelteKit', icon: '🎯' },
				{ name: 'Docker & K8s', icon: '🐳' },
				{ name: 'AWS & Azure & GCP', icon: '☁️' },
				{ name: 'Unreal & Unity', icon: '🎮' },
				{ name: 'Solidity & Rust', icon: '⛓️' }
			],
			background: 'from-indigo-900 via-purple-900 to-pink-900',
			icon: '⚡'
		},
		// ... resto dos slides mantidos com as mesmas melhorias
		// Slide 7 - Parceiros (mantido igual)
		{
			type: 'partners',
			title: 'Parceiros & Empresas Atendidas',
			subtitle: 'Confiança que constrói sucesso',
			description: 'Orgulhosamente atendemos empresas líderes em seus setores, construindo soluções que transformam negócios e geram resultados exponenciais.',
			background: 'from-slate-900 via-purple-900 to-indigo-900',
			icon: '🤝',
			partners: [
				{
					name: 'Naren Inc',
					sector: 'AI Technology',
					description: 'Aceleração empresarial com IA generativa, automações inteligentes e chatbots de última geração',
					logo: '🤖',
					category: 'tech',
					website: 'https://www.naren.solutions/'
				},
				{
					name: 'Grupo PLL',
					sector: 'Mobile Technology',
					description: 'Maior BPO mobile da América Latina, liderando em reparo e manutenção de dispositivos',
					logo: '📱',
					category: 'mobile',
					website: 'https://www.grupopll.com.br/'
				},
				{
					name: 'GroupLink One',
					sector: 'IoT & Smart Cities',
					description: 'Soluções AIoT revolucionárias para telemetria urbana, smart grids e cidades inteligentes',
					logo: '🌐',
					category: 'iot',
					website: 'https://www.grouplinkone.com/'
				},
				{
					name: 'Asimov Tech',
					sector: 'Product Innovation',
					description: 'Product Studio especializado em 18+ produtos SaaS distribuídos em 6 verticais de mercado',
					logo: '🚀',
					category: 'saas',
					website: 'https://asimovtech.systems/'
				},
				{
					name: 'Nagano Tour',
					sector: 'Travel Technology',
					description: 'Plataforma digital inovadora para experiências de turismo personalizadas e sustentáveis',
					logo: '✈️',
					category: 'tourism',
					website: 'https://naganotour.com.br/'
				}
			],
			stats: [
				{ number: '5+', label: 'Parceiros Estratégicos' },
				{ number: '100%', label: 'Projetos Entregues' },
				{ number: '24/7', label: 'Suporte Técnico' },
				{ number: '98%', label: 'Satisfação Cliente' }
			]
		},
		// Slide 8 - Founders - DESCRIÇÃO MELHORADA
		{
			type: 'founders',
			title: 'Liderança Visionária',
			subtitle: 'Maikon Weber - Chief Technology Officer',
			description: 'Desenvolvedor full-stack sênior, especialista em arquiteturas escaláveis, IA/ML, blockchain e sistemas distribuídos. Liderando a revolução digital empresarial.',
			background: 'from-gray-900 via-gray-800 to-black',
			icon: '👨‍💻',
			founder: {
				name: 'Maikon Weber',
				title: 'Founder & CTO',
				description: 'Arquiteto de software com 8+ anos construindo ecossistemas digitais de alta performance, especialista em IA, blockchain e infraestrutura cloud-native.',
				image: 'https://avatars.githubusercontent.com/u/45263705?v=4',
				skills: ['AI/ML Architecture', 'Blockchain Expert', 'Cloud Native', 'DevOps Master', 'UI/UX Design', 'IoT Systems', 'AIoT Solutions']
			}
		}
	];

	onMount(() => {
		startAutoPlay();
		initializeAnimations();
		
		// Detecta slides com muito conteúdo e ajusta o layout
		const adjustSliderHeight = () => {
			const sliderContainer = document.querySelector('.slider-container');
			const slideContent = document.querySelector('.slide-content');
			
			if (slideContent && sliderContainer) {
				const contentHeight = slideContent.scrollHeight;
				const viewportHeight = window.innerHeight;
				
				if (contentHeight > viewportHeight * 0.8) {
					sliderContainer.classList.add('has-long-content');
				} else {
					sliderContainer.classList.remove('has-long-content');
				}
			}
		};
		
		// Ajusta altura quando muda de slide
		$: {
			setTimeout(adjustSliderHeight, 100);
		}
		
		// Navegação por teclado
		const handleKeydown = (e) => {
			if (e.key === 'ArrowRight' || e.key === ' ') {
				e.preventDefault();
				nextSlide();
			} else if (e.key === 'ArrowLeft') {
				e.preventDefault();
				prevSlide();
			} else if (e.key === 'Escape') {
				toggleAutoPlay();
			}
		};

		window.addEventListener('keydown', handleKeydown);
		window.addEventListener('resize', adjustSliderHeight);
		
		return () => {
			stopAutoPlay();
			stopAnimations();
			window.removeEventListener('keydown', handleKeydown);
			window.removeEventListener('resize', adjustSliderHeight);
		};
	});

	function initializeAnimations() {
		// Inicializar canvas do foguete
		if (rocketCanvas) {
			animateRocket();
		}
		
		// Inicializar partículas
		if (particlesCanvas) {
			animateParticles();
		}
	}

	function stopAnimations() {
		if (animationFrame) {
			cancelAnimationFrame(animationFrame);
		}
	}

	function animateRocket() {
		if (!rocketCanvas) return;
		
		const ctx = rocketCanvas.getContext('2d');
		if (!ctx) return;
		
		rocketCanvas.width = 300;
		rocketCanvas.height = window.innerHeight * 0.8;
		
		let time = 0;
		let rocketY = (window.innerHeight * 0.8) + 100;
		let completed = false;
		let velocity = 8;
		let acceleration = 0.15;
		
		const trail = [];
		
		function draw() {
			ctx.clearRect(0, 0, rocketCanvas.width, rocketCanvas.height);
			
			if (completed) return;
			
			velocity += acceleration;
			rocketY -= velocity;
			
			if (rocketY < -200) {
				completed = true;
				return;
			}
			
			const x = 150 + Math.sin(time * 0.03) * 30 + Math.cos(time * 0.02) * 15;
			const rotation = Math.sin(time * 0.04) * 0.2;
			
			trail.push({
				x: x,
				y: rocketY + 30,
				opacity: 1,
				size: 15
			});
			
			if (trail.length > 20) {
				trail.shift();
			}
			
			// Efeitos visuais melhorados
			trail.forEach((point, index) => {
				const alpha = (point.opacity * (index / trail.length)) * 0.8;
				const size = point.size * (index / trail.length);
				
				ctx.fillStyle = `rgba(255, ${100 + index * 8}, 0, ${alpha})`;
				ctx.beginPath();
				ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
				ctx.fill();
				
				ctx.fillStyle = `rgba(255, 255, 0, ${alpha * 0.6})`;
				ctx.beginPath();
				ctx.arc(point.x, point.y, size * 0.6, 0, Math.PI * 2);
				ctx.fill();
				
				point.opacity -= 0.05;
			});
			
			// Efeito de brilho melhorado
			const glowSize = 80 + Math.sin(time * 0.1) * 20;
			const gradient = ctx.createRadialGradient(x, rocketY, 0, x, rocketY, glowSize);
			gradient.addColorStop(0, 'rgba(255, 255, 255, 0.3)');
			gradient.addColorStop(0.3, 'rgba(0, 150, 255, 0.2)');
			gradient.addColorStop(1, 'rgba(0, 150, 255, 0)');
			
			ctx.fillStyle = gradient;
			ctx.beginPath();
			ctx.arc(x, rocketY, glowSize, 0, Math.PI * 2);
			ctx.fill();
			
			// Foguete com sombra aprimorada
			ctx.save();
			ctx.translate(x, rocketY);
			ctx.rotate(rotation);
			
			ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
			ctx.shadowBlur = 10;
			ctx.shadowOffsetX = 3;
			ctx.shadowOffsetY = 3;
			
			ctx.font = 'bold 80px serif';
			ctx.textAlign = 'center';
			ctx.textBaseline = 'middle';
			ctx.fillText('🚀', 0, 0);
			
			ctx.restore();
			
			// Efeitos de propulsão mais intensos
			const propulsionIntensity = 0.7 + Math.sin(time * 0.3) * 0.3;
			
			ctx.fillStyle = `rgba(255, 69, 0, ${propulsionIntensity})`;
			ctx.beginPath();
			ctx.arc(x, rocketY + 50, 12 + Math.sin(time * 0.2) * 8, 0, Math.PI * 2);
			ctx.fill();
			
			ctx.fillStyle = `rgba(255, 200, 0, ${propulsionIntensity * 0.8})`;
			ctx.beginPath();
			ctx.arc(x - 8, rocketY + 60, 8 + Math.sin(time * 0.25) * 6, 0, Math.PI * 2);
			ctx.fill();
			
			ctx.fillStyle = `rgba(255, 255, 255, ${propulsionIntensity * 0.6})`;
			ctx.beginPath();
			ctx.arc(x + 8, rocketY + 60, 6 + Math.sin(time * 0.18) * 4, 0, Math.PI * 2);
			ctx.fill();
			
			// Partículas de combustão
			for (let i = 0; i < 8; i++) {
				const particleX = x + (Math.random() - 0.5) * 30;
				const particleY = rocketY + 70 + Math.random() * 40;
				const particleSize = Math.random() * 4 + 2;
				const particleOpacity = Math.random() * 0.7 + 0.3;
				
				ctx.fillStyle = `rgba(255, ${150 + Math.random() * 105}, 0, ${particleOpacity})`;
				ctx.beginPath();
				ctx.arc(particleX, particleY, particleSize, 0, Math.PI * 2);
				ctx.fill();
			}
			
			time++;
			animationFrame = requestAnimationFrame(draw);
		}
		
		draw();
	}

	function animateParticles() {
		if (!particlesCanvas) return;
		
		const ctx = particlesCanvas.getContext('2d');
		if (!ctx) return;
		
		particlesCanvas.width = window.innerWidth;
		particlesCanvas.height = window.innerHeight * 0.8;
		
		const particles = [];
		const starsParticles = [];
		
		// Criar partículas flutuantes
		for (let i = 0; i < 80; i++) {
			particles.push({
				x: Math.random() * particlesCanvas.width,
				y: Math.random() * particlesCanvas.height,
				size: Math.random() * 3 + 1,
				speedX: (Math.random() - 0.5) * 2,
				speedY: (Math.random() - 0.5) * 2,
				opacity: Math.random() * 0.5 + 0.2,
				pulseSpeed: Math.random() * 0.05 + 0.02
			});
		}
		
		// Criar estrelas de fundo
		for (let i = 0; i < 150; i++) {
			starsParticles.push({
				x: Math.random() * particlesCanvas.width,
				y: Math.random() * particlesCanvas.height,
				size: Math.random() * 2 + 0.5,
				twinkleSpeed: Math.random() * 0.03 + 0.01,
				opacity: Math.random() * 0.8 + 0.2,
				baseOpacity: Math.random() * 0.4 + 0.1
			});
		}
		
		let time = 0;
		
		function drawParticles() {
			ctx.clearRect(0, 0, particlesCanvas.width, particlesCanvas.height);
			
			starsParticles.forEach(star => {
				star.opacity = star.baseOpacity + Math.sin(time * star.twinkleSpeed) * 0.3;
				
				ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
				ctx.beginPath();
				ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
				ctx.fill();
				
				if (Math.random() < 0.005) {
					ctx.fillStyle = `rgba(255, 255, 255, 0.8)`;
					ctx.beginPath();
					ctx.arc(star.x, star.y, star.size * 2, 0, Math.PI * 2);
					ctx.fill();
				}
			});
			
			particles.forEach(particle => {
				particle.opacity = 0.3 + Math.sin(time * particle.pulseSpeed) * 0.2;
				
				const gradient = ctx.createRadialGradient(
					particle.x, particle.y, 0,
					particle.x, particle.y, particle.size * 3
				);
				gradient.addColorStop(0, `rgba(100, 200, 255, ${particle.opacity})`);
				gradient.addColorStop(0.5, `rgba(150, 150, 255, ${particle.opacity * 0.5})`);
				gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);
				
				ctx.fillStyle = gradient;
				ctx.beginPath();
				ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2);
				ctx.fill();
				
				ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity * 0.8})`;
				ctx.beginPath();
				ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
				ctx.fill();
				
				particle.x += particle.speedX;
				particle.y += particle.speedY;
				
				particle.y += Math.sin(time * 0.01 + particle.x * 0.001) * 0.5;
				
				if (particle.x < -50 || particle.x > particlesCanvas.width + 50) {
					particle.x = Math.random() * particlesCanvas.width;
				}
				if (particle.y < -50 || particle.y > particlesCanvas.height + 50) {
					particle.y = Math.random() * particlesCanvas.height;
				}
			});
			
			if (Math.random() < 0.003) {
				const meteor = {
					x: Math.random() * particlesCanvas.width,
					y: -50,
					trail: []
				};
				
				for (let i = 0; i < 15; i++) {
					const trailX = meteor.x + i * 2;
					const trailY = meteor.y - i * 3;
					const alpha = (15 - i) / 15;
					
					ctx.fillStyle = `rgba(255, 200, 100, ${alpha * 0.6})`;
					ctx.beginPath();
					ctx.arc(trailX, trailY, (15 - i) * 0.3, 0, Math.PI * 2);
					ctx.fill();
				}
			}
			
			time++;
			animationFrame = requestAnimationFrame(drawParticles);
		}
		
		drawParticles();
	}

	function startAutoPlay() {
		stopAutoPlay();
		autoPlayInterval = setInterval(() => {
			nextSlide();
		}, 12000);
	}

	function stopAutoPlay() {
		if (autoPlayInterval) {
			clearInterval(autoPlayInterval);
		}
	}

	function toggleAutoPlay() {
		if (isAutoPlaying) {
			stopAutoPlay();
			isAutoPlaying = false;
		} else {
			startAutoPlay();
			isAutoPlaying = true;
		}
	}

	function nextSlide() {
		if (currentSlide < slides.length - 1) {
			currentSlide++;
		} else {
			currentSlide = 0;
		}
	}

	function prevSlide() {
		if (currentSlide > 0) {
			currentSlide--;
		}
	}

	function goToSlide(index) {
		currentSlide = index;
	}

	function handleSlideClick(event) {
		if (event.target.closest('.clickable-link') || event.target.closest('.contact-form')) {
			return;
		}
		
		nextSlide();
	}

	function navigateToLink(link, event) {
		event.stopPropagation();
		if (link.startsWith('http') || link.startsWith('mailto:')) {
			window.open(link, '_blank');
		} else {
			goto(link);
		}
	}

	function navigateToPartner(partner, event) {
		event.stopPropagation();
		if (partner.website) {
			window.open(partner.website, '_blank');
		}
	}

	async function handleFormSubmit() {
		if (!formData.name || !formData.email || !formData.message) {
			submitMessage = 'Por favor, preencha todos os campos obrigatórios.';
			return;
		}

		isSubmitting = true;
		submitMessage = '';

		try {
			const response = await fetch('https://dev.muttercorp.com.br/touch', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					name: formData.name,
					email: formData.email,
					company: formData.company,
					message: formData.message,
					service: formData.service
				})
			});

			if (response.ok) {
				submitMessage = 'Mensagem enviada com sucesso! Entraremos em contato em breve.';
				formData = {
					name: '',
					email: '',
					company: '',
					message: '',
					service: ''
				};
			} else {
				submitMessage = 'Erro ao enviar mensagem. Tente novamente.';
			}
		} catch (error) {
			console.error('Erro ao enviar a mensagem:', error);
			submitMessage = 'Erro de rede. Verifique sua conexão e tente novamente.';
		} finally {
			isSubmitting = false;
		}
	}

	const currentSlideData = $derived(slides[currentSlide]);
</script>

<svelte:head>
	<title>MutterCorp - Soluções Empresariais em Tecnologia e IA</title>
	<meta
		name="description"
		content="Transforme seu negócio com nossas soluções em ML, IA, CRM e desenvolvimento de aplicações"
	/>
	<meta name="author" content="MutterCorp" />
	
	<!-- Fontes modernas e elegantes -->
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&family=Playfair+Display:wght@400;500;600;700;800;900&family=DM+Sans:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
	
	<!-- D3.js e Three.js -->
	<script src="https://d3js.org/d3.v7.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
</svelte:head>

<!-- Slider Container -->
<div class="slider-container" onclick={handleSlideClick}>
	<!-- Background -->
	<div class="slide-background bg-gradient-to-br {currentSlideData.background}"></div>
	
	<!-- Canvas para efeitos 3D -->
	<canvas bind:this={particlesCanvas} class="particles-canvas"></canvas>
	
	<!-- Canvas do foguete voador (apenas no primeiro slide) -->
	{#if currentSlide === 0}
		<canvas bind:this={rocketCanvas} class="rocket-canvas"></canvas>
	{/if}
	
	<!-- Slide Content -->
	<div class="slide-content">
		{#key currentSlide}
			<div class="slide-inner" in:fly={{ y: 50, duration: 800, easing: quintOut }} out:fade={{ duration: 400 }}>
				
				<!-- Hero Slide -->
				{#if currentSlideData.type === 'hero'}
					<div class="hero-slide">
						<div class="hero-icon" in:scale={{ duration: 1000, easing: elasticOut }}>{currentSlideData.icon}</div>
						<h1 class="hero-title" in:fly={{ y: 30, duration: 1000, delay: 200 }}>{currentSlideData.title}</h1>
						<h2 class="hero-subtitle" in:fly={{ y: 30, duration: 1000, delay: 400 }}>{currentSlideData.subtitle}</h2>
						<p class="hero-description" in:fly={{ y: 30, duration: 1000, delay: 600 }}>{currentSlideData.description}</p>
					</div>
				{/if}

				<!-- About Slide -->
				{#if currentSlideData.type === 'about'}
					<div class="about-slide">
						<div class="slide-icon" in:scale={{ duration: 800, easing: elasticOut }}>{currentSlideData.icon}</div>
						<h1 class="slide-title" in:fly={{ y: 30, duration: 800, delay: 200 }}>{currentSlideData.title}</h1>
						<h2 class="slide-subtitle" in:fly={{ y: 30, duration: 800, delay: 400 }}>{currentSlideData.subtitle}</h2>
						<p class="slide-description" in:fly={{ y: 30, duration: 800, delay: 600 }}>{currentSlideData.description}</p>
					</div>
				{/if}

				<!-- Apps Slide -->
				{#if currentSlideData.type === 'apps'}
					<div class="apps-slide">
						<div class="slide-header">
							<div class="slide-icon" in:scale={{ duration: 800, easing: elasticOut }}>{currentSlideData.icon}</div>
							<h1 class="slide-title" in:fly={{ y: 30, duration: 800, delay: 200 }}>{currentSlideData.title}</h1>
							<h2 class="slide-subtitle" in:fly={{ y: 30, duration: 800, delay: 400 }}>{currentSlideData.subtitle}</h2>
						</div>
						<div class="apps-grid">
							{#each currentSlideData.apps as app, i}
								<div 
									class="app-card clickable-link enhanced-card" 
									in:fly={{ y: 30, duration: 600, delay: i * 100, easing: quintOut }}
									onclick={(e) => navigateToLink(app.link, e)}
								>
									<div class="app-icon app-icon-enhanced">{app.icon}</div>
									<h3 class="app-title">{app.title}</h3>
									<p class="app-description">{app.description}</p>
									<div class="app-gradient bg-gradient-to-br {app.color}"></div>
									<div class="card-glow"></div>
								</div>
							{/each}
						</div>
					</div>
				{/if}

				<!-- Services Slide -->
				{#if currentSlideData.type === 'services'}
					<div class="services-slide">
						<div class="slide-header">
							<div class="slide-icon" in:scale={{ duration: 800, easing: elasticOut }}>{currentSlideData.icon}</div>
							<h1 class="slide-title" in:fly={{ y: 30, duration: 800, delay: 200 }}>{currentSlideData.title}</h1>
							<h2 class="slide-subtitle" in:fly={{ y: 30, duration: 800, delay: 400 }}>{currentSlideData.subtitle}</h2>
						</div>
						<div class="services-grid">
							{#each currentSlideData.services as service, i}
								<div 
									class="service-card clickable-link enhanced-card" 
									in:fly={{ y: 30, duration: 600, delay: i * 80, easing: quintOut }}
									onclick={(e) => navigateToLink(service.link, e)}
								>
									<div class="service-icon service-icon-enhanced">{service.icon}</div>
									<h3 class="service-title">{service.title}</h3>
									<p class="service-description">{service.description}</p>
									<div class="service-arrow">→</div>
									<div class="card-glow"></div>
								</div>
							{/each}
						</div>
					</div>
				{/if}

				<!-- Blockchain Slide -->
				{#if currentSlideData.type === 'blockchain'}
					<div class="blockchain-slide">
						<div class="slide-header">
							<div class="slide-icon" in:scale={{ duration: 800, easing: elasticOut }}>{currentSlideData.icon}</div>
							<h1 class="slide-title" in:fly={{ y: 30, duration: 800, delay: 200 }}>{currentSlideData.title}</h1>
							<h2 class="slide-subtitle" in:fly={{ y: 30, duration: 800, delay: 400 }}>{currentSlideData.subtitle}</h2>
							<p class="slide-description" in:fly={{ y: 30, duration: 800, delay: 600 }}>{currentSlideData.description}</p>
						</div>
						<div class="blockchain-grid">
							{#each currentSlideData.technologies as tech, i}
								<div class="blockchain-item enhanced-card" in:fly={{ scale: 0.8, duration: 600, delay: i * 80, easing: quintOut }}>
									<div class="blockchain-icon blockchain-icon-enhanced">{tech.icon}</div>
									<span class="blockchain-name">{tech.name}</span>
									<div class="card-glow"></div>
								</div>
							{/each}
						</div>
					</div>
				{/if}

				<!-- Tech Slide -->
				{#if currentSlideData.type === 'tech'}
					<div class="tech-slide">
						<div class="slide-header">
							<div class="slide-icon" in:scale={{ duration: 800, easing: elasticOut }}>{currentSlideData.icon}</div>
							<h1 class="slide-title" in:fly={{ y: 30, duration: 800, delay: 200 }}>{currentSlideData.title}</h1>
							<h2 class="slide-subtitle" in:fly={{ y: 30, duration: 800, delay: 400 }}>{currentSlideData.subtitle}</h2>
						</div>
						<div class="tech-grid">
							{#each currentSlideData.technologies as tech, i}
								<div class="tech-item enhanced-card" in:fly={{ scale: 0.8, duration: 600, delay: i * 50, easing: quintOut }}>
									<div class="tech-icon tech-icon-enhanced">{tech.icon}</div>
									<span class="tech-name">{tech.name}</span>
									<div class="card-glow"></div>
								</div>
							{/each}
						</div>
					</div>
				{/if}

				<!-- Partners Slide -->
				{#if currentSlideData.type === 'partners'}
					<div class="partners-slide">
						<div class="slide-header">
							<div class="slide-icon" in:scale={{ duration: 800, easing: elasticOut }}>{currentSlideData.icon}</div>
							<h1 class="slide-title" in:fly={{ y: 30, duration: 800, delay: 200 }}>{currentSlideData.title}</h1>
							<h2 class="slide-subtitle" in:fly={{ y: 30, duration: 800, delay: 400 }}>{currentSlideData.subtitle}</h2>
							<p class="slide-description" in:fly={{ y: 30, duration: 800, delay: 600 }}>{currentSlideData.description}</p>
						</div>
						
						<!-- Statistics -->
						<div class="partners-stats">
							{#each currentSlideData.stats as stat, i}
								<div class="stat-item enhanced-card" in:fly={{ y: 20, duration: 600, delay: i * 100, easing: quintOut }}>
									<div class="stat-number">{stat.number}</div>
									<div class="stat-label">{stat.label}</div>
									<div class="card-glow"></div>
								</div>
							{/each}
						</div>
						
						<!-- Partners Grid -->
						<div class="partners-grid">
							{#each currentSlideData.partners as partner, i}
								<div 
									class="partner-card clickable-link enhanced-card" 
									in:fly={{ y: 30, duration: 600, delay: i * 80, easing: quintOut }}
									onclick={(e) => navigateToPartner(partner, e)}
								>
									<div class="partner-logo partner-logo-enhanced">{partner.logo}</div>
									<div class="partner-info">
										<h3 class="partner-name">{partner.name}</h3>
										<div class="partner-sector">{partner.sector}</div>
										<p class="partner-description">{partner.description}</p>
									</div>
									<div class="partner-category {partner.category}"></div>
									<div class="card-glow"></div>
								</div>
							{/each}
						</div>
					</div>
				{/if}

				<!-- Founders Slide -->
				{#if currentSlideData.type === 'founders'}
					<div class="founders-slide">
						<div class="founder-content">
							<div class="founder-info">
								<div class="founder-avatar" in:scale={{ duration: 1000, easing: elasticOut }}>
									<img src={currentSlideData.founder.image} alt={currentSlideData.founder.name} />
									<div class="avatar-glow"></div>
								</div>
								<div class="founder-details">
									<h1 class="founder-name" in:fly={{ y: 30, duration: 800, delay: 200 }}>{currentSlideData.founder.name}</h1>
									<h2 class="founder-title" in:fly={{ y: 30, duration: 800, delay: 400 }}>{currentSlideData.founder.title}</h2>
									<p class="founder-description" in:fly={{ y: 30, duration: 800, delay: 600 }}>{currentSlideData.founder.description}</p>
									<div class="founder-skills" in:fly={{ y: 30, duration: 800, delay: 800 }}>
										{#each currentSlideData.founder.skills as skill, i}
											<span class="skill-tag" in:scale={{ duration: 400, delay: i * 100 }}>{skill}</span>
										{/each}
									</div>
									<a href="/tree" class="founder-link clickable-link" in:fly={{ y: 30, duration: 800, delay: 1000 }}>Ver Portfolio Completo →</a>
								</div>
							</div>
							
							<!-- Contact Form -->
							<div class="contact-form clickable-link enhanced-card" in:fly={{ x: 50, duration: 800, delay: 400 }}>
								<h3>Entre em Contato</h3>
								<form onsubmit={(e) => { e.preventDefault(); handleFormSubmit(); }}>
									<div class="form-row">
										<input 
											type="text" 
											placeholder="Nome *"
											bind:value={formData.name}
											required
										/>
										<input 
											type="email" 
											placeholder="Email *"
											bind:value={formData.email}
											required
										/>
									</div>
									<div class="form-row">
										<input 
											type="text" 
											placeholder="Empresa (opcional)"
											bind:value={formData.company}
										/>
										<select bind:value={formData.service}>
											<option value="">Selecione um serviço</option>
											<option value="ml-ia">Machine Learning & IA</option>
											<option value="blockchain">Blockchain & Smart Contracts</option>
											<option value="web-development">Desenvolvimento Web</option>
											<option value="mobile-app">App Mobile</option>
											<option value="crm">CRM Empresarial</option>
											<option value="automation">Automação</option>
											<option value="other">Outro</option>
										</select>
									</div>
									<textarea 
										placeholder="Descreva seu projeto *"
										bind:value={formData.message}
										rows="4"
										required
									></textarea>
									<button type="submit" disabled={isSubmitting} class="form-submit-btn">
										{isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
									</button>
									{#if submitMessage}
										<div class="submit-message" class:success={submitMessage.includes('sucesso')} class:error={!submitMessage.includes('sucesso')}>
											{submitMessage}
										</div>
									{/if}
								</form>
								<div class="card-glow"></div>
							</div>
						</div>
					</div>
				{/if}

			</div>
		{/key}
	</div>

	<!-- Navigation -->
	<div class="slide-navigation">
		<!-- Progress Bar -->
		<div class="progress-bar">
			<div 
				class="progress-fill" 
				style="width: {((currentSlide + 1) / slides.length) * 100}%"
			></div>
		</div>
		
		<!-- Slide Indicators -->
		<div class="slide-indicators">
			{#each slides as _, i}
				<button 
					class="indicator {i === currentSlide ? 'active' : ''}"
					onclick={() => goToSlide(i)}
					aria-label="Ir para slide {i + 1}"
				>
					<span class="indicator-dot"></span>
				</button>
			{/each}
		</div>

		<!-- Controls -->
		<div class="slide-controls">
			<button class="control-btn" onclick={prevSlide} aria-label="Slide anterior">
				<span>←</span>
			</button>
			<button class="control-btn play-pause" onclick={toggleAutoPlay} aria-label="Play/Pause">
				<span>{isAutoPlaying ? '⏸️' : '▶️'}</span>
			</button>
			<button class="control-btn" onclick={nextSlide} aria-label="Próximo slide">
				<span>→</span>
			</button>
		</div>
	</div>

	<!-- Click hint -->
	<div class="click-hint">
		<span>Clique para avançar ou use as setas ←→</span>
	</div>
</div>

<style>
	/* === FONTES MODERNAS E HIERARQUIA TIPOGRÁFICA === */
	:root {
		--font-primary: 'DM Sans', 'Inter', system-ui, sans-serif;
		--font-display: 'Playfair Display', Georgia, serif;
		--font-mono: 'JetBrains Mono', 'Fira Code', monospace;
		
		/* Escalas tipográficas responsivas */
		--text-xs: clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem);
		--text-sm: clamp(0.875rem, 0.8rem + 0.375vw, 1rem);
		--text-base: clamp(1rem, 0.95rem + 0.5vw, 1.125rem);
		--text-lg: clamp(1.125rem, 1.05rem + 0.75vw, 1.5rem);
		--text-xl: clamp(1.25rem, 1.1rem + 1vw, 1.875rem);
		--text-2xl: clamp(1.5rem, 1.3rem + 1.5vw, 2.25rem);
		--text-3xl: clamp(1.875rem, 1.6rem + 2vw, 3rem);
		--text-4xl: clamp(2.25rem, 1.9rem + 3vw, 4rem);
		--text-5xl: clamp(3rem, 2.5rem + 4vw, 6rem);
	}

	/* Container principal - altura dinâmica melhorada */
	.slider-container {
		position: relative;
		width: 100vw;
		min-height: calc(100vh - 80px);
		padding-bottom: 120px; /* Espaço para footer */
		overflow-x: hidden;
		overflow-y: auto;
		cursor: pointer;
		user-select: none;
		font-family: var(--font-primary);
		background: radial-gradient(ellipse at center, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.95) 100%);
		
		/* Smooth scrolling melhorado */
		scroll-behavior: smooth;
		-webkit-overflow-scrolling: touch;
	}

	/* Canvas layers - ajustados para mobile */
	.particles-canvas,
	.rocket-canvas {
		position: absolute;
		top: 0;
		left: 0;
		pointer-events: none;
		z-index: 1;
		opacity: 0.8;
	}

	.rocket-canvas {
		z-index: 3;
		top: 0;
		left: 5%;
		width: 300px;
		height: calc(100vh - 80px);
	}

	/* Background do slide */
	.slide-background {
		position: absolute;
		inset: 0;
		transition: all 1s ease-in-out;
		background-attachment: fixed;
	}

	/* Conteúdo do slide - responsivo melhorado */
	.slide-content {
		position: relative;
		z-index: 2;
		min-height: calc(100vh - 80px);
		display: flex;
		align-items: center;
		justify-content: center;
		padding: clamp(1rem, 3vw, 2rem);
		padding-bottom: clamp(2rem, 5vw, 4rem);
	}

	.slide-inner {
		text-align: center;
		color: white;
		max-width: 1200px;
		width: 100%;
		min-height: auto;
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: clamp(1rem, 3vw, 2rem);
	}

	/* === HERO SLIDE - TIPOGRAFIA PREMIUM === */
	.hero-slide {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: clamp(1.5rem, 4vw, 2.5rem);
	}

	.hero-icon {
		font-size: clamp(4rem, 12vw, 8rem);
		animation: float 3s ease-in-out infinite, pulse 2s ease-in-out infinite alternate;
		filter: drop-shadow(0 0 30px rgba(255, 255, 255, 0.3));
	}

	.hero-title {
		font-family: var(--font-display);
		font-size: var(--text-5xl);
		font-weight: 900;
		margin: 0;
		background: linear-gradient(45deg, #ffffff, #00d4ff, #ff006e, #8338ec, #ffbe0b);
		background-size: 400% 400%;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		letter-spacing: -0.02em;
		animation: gradientShift 4s ease-in-out infinite, textGlow 2s ease-in-out infinite alternate;
		text-shadow: 0 0 30px rgba(255, 255, 255, 0.3);
		line-height: 0.9;
	}

	.hero-subtitle {
		font-family: var(--font-primary);
		font-size: var(--text-2xl);
		font-weight: 600;
		margin: 0;
		color: rgba(255, 255, 255, 0.9);
		letter-spacing: 0.025em;
	}

	.hero-description {
		font-family: var(--font-primary);
		font-size: var(--text-lg);
		color: rgba(255, 255, 255, 0.8);
		max-width: 700px;
		line-height: 1.6;
		margin: 0;
		font-weight: 400;
	}

	/* === SLIDES GERAIS - TIPOGRAFIA MELHORADA === */
	.slide-icon {
		font-size: clamp(2.5rem, 8vw, 4rem);
		margin-bottom: clamp(0.5rem, 2vw, 1rem);
		animation: bounce 2s ease-in-out infinite;
		filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.2));
	}

	.slide-title {
		font-family: var(--font-display);
		font-size: var(--text-4xl);
		font-weight: 800;
		margin: 0 0 clamp(0.5rem, 2vw, 1rem) 0;
		color: white;
		line-height: 1.1;
		letter-spacing: -0.01em;
	}

	.slide-subtitle {
		font-family: var(--font-primary);
		font-size: var(--text-xl);
		font-weight: 500;
		margin: 0 0 clamp(1rem, 3vw, 2rem) 0;
		color: rgba(255, 255, 255, 0.9);
		letter-spacing: 0.01em;
	}

	.slide-description {
		font-family: var(--font-primary);
		font-size: var(--text-base);
		color: rgba(255, 255, 255, 0.8);
		max-width: 800px;
		margin: 0 auto clamp(1rem, 3vw, 2rem);
		line-height: 1.6;
		font-weight: 400;
	}

	.slide-header {
		margin-bottom: clamp(2rem, 5vw, 3rem);
	}

	/* === ENHANCED CARDS - SISTEMA DE DESIGN MELHORADO === */
	.enhanced-card {
		position: relative;
		overflow: hidden;
		backdrop-filter: blur(20px);
		transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
		border: 1px solid rgba(255, 255, 255, 0.1);
	}

	.enhanced-card::before {
		content: '';
		position: absolute;
		top: 0;
		left: -100%;
		width: 100%;
		height: 100%;
		background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
		transition: left 0.6s;
	}

	.enhanced-card:hover::before {
		left: 100%;
	}

	.card-glow {
		position: absolute;
		inset: -2px;
		background: linear-gradient(45deg, #60a5fa, #a78bfa, #f472b6, #fbbf24);
		border-radius: inherit;
		opacity: 0;
		transition: opacity 0.3s ease;
		z-index: -1;
		filter: blur(8px);
	}

	.enhanced-card:hover .card-glow {
		opacity: 0.3;
	}

	/* === APPS GRID - LAYOUT RESPONSIVO PREMIUM === */
	.apps-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(280px, 100%), 1fr));
		gap: clamp(1rem, 3vw, 2rem);
		max-width: 1000px;
		margin: 0 auto;
	}

	.app-card {
		background: rgba(255, 255, 255, 0.05);
		padding: clamp(1.5rem, 4vw, 2rem);
		border-radius: 1.5rem;
		position: relative;
		cursor: pointer;
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
		min-height: 200px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.app-card:hover {
		transform: translateY(-10px) scale(1.02);
		box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
		border-color: rgba(255, 255, 255, 0.3);
		background: rgba(255, 255, 255, 0.08);
	}

	.app-gradient {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 4px;
		opacity: 0;
		transition: opacity 0.3s ease;
	}

	.app-card:hover .app-gradient {
		opacity: 1;
	}

	.app-icon-enhanced {
		font-size: clamp(2rem, 6vw, 3rem);
		margin-bottom: clamp(0.75rem, 2vw, 1rem);
		animation: float 3s ease-in-out infinite;
		filter: drop-shadow(0 0 15px rgba(255, 255, 255, 0.2));
	}

	.app-title {
		font-family: var(--font-primary);
		font-size: var(--text-lg);
		font-weight: 700;
		margin: 0 0 clamp(0.5rem, 1.5vw, 0.75rem) 0;
		color: white;
		line-height: 1.2;
	}

	.app-description {
		font-family: var(--font-primary);
		font-size: var(--text-sm);
		color: rgba(255, 255, 255, 0.8);
		margin: 0;
		line-height: 1.5;
		font-weight: 400;
		flex: 1;
	}

	/* === SERVICES GRID - LAYOUT PREMIUM === */
	.services-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(300px, 100%), 1fr));
		gap: clamp(1rem, 3vw, 2rem);
		max-width: 1100px;
		margin: 0 auto;
	}

	.service-card {
		background: rgba(255, 255, 255, 0.05);
		padding: clamp(1.5rem, 4vw, 2rem);
		border-radius: 1.5rem;
		position: relative;
		cursor: pointer;
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
		min-height: 180px;
		display: flex;
		flex-direction: column;
	}

	.service-card:hover {
		transform: translateY(-8px) scale(1.02);
		box-shadow: 0 16px 48px rgba(0, 0, 0, 0.3);
		border-color: rgba(255, 255, 255, 0.2);
		background: rgba(255, 255, 255, 0.08);
	}

	.service-arrow {
		position: absolute;
		top: clamp(1rem, 3vw, 1.5rem);
		right: clamp(1rem, 3vw, 1.5rem);
		font-size: clamp(1.25rem, 3vw, 1.5rem);
		opacity: 0;
		transform: translateX(-10px);
		transition: all 0.3s ease;
		color: #60a5fa;
	}

	.service-card:hover .service-arrow {
		opacity: 1;
		transform: translateX(0);
	}

	.service-icon-enhanced {
		font-size: clamp(2rem, 5vw, 2.5rem);
		margin-bottom: clamp(0.75rem, 2vw, 1rem);
		animation: float 3s ease-in-out infinite;
		filter: drop-shadow(0 0 15px rgba(255, 255, 255, 0.2));
	}

	.service-title {
		font-family: var(--font-primary);
		font-size: var(--text-base);
		font-weight: 700;
		margin: 0 0 clamp(0.5rem, 1.5vw, 0.75rem) 0;
		color: white;
		line-height: 1.3;
	}

	.service-description {
		font-family: var(--font-primary);
		font-size: var(--text-sm);
		color: rgba(255, 255, 255, 0.8);
		margin: 0;
		line-height: 1.5;
		font-weight: 400;
		flex: 1;
	}

	/* === TECH & BLOCKCHAIN GRIDS === */
	.tech-grid, .blockchain-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(140px, 100%), 1fr));
		gap: clamp(1rem, 3vw, 2rem);
		max-width: 900px;
		margin: 0 auto;
	}

	.tech-item, .blockchain-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: clamp(0.5rem, 1.5vw, 0.75rem);
		background: rgba(255, 255, 255, 0.05);
		padding: clamp(1rem, 3vw, 1.5rem);
		border-radius: 1rem;
		border: 1px solid rgba(255, 255, 255, 0.1);
		transition: all 0.3s ease;
		backdrop-filter: blur(10px);
		min-height: 120px;
		justify-content: center;
	}

	.tech-item:hover, .blockchain-item:hover {
		transform: scale(1.05);
		background: rgba(255, 255, 255, 0.1);
		box-shadow: 0 8px 32px rgba(255, 193, 7, 0.3);
	}

	.tech-icon-enhanced, .blockchain-icon-enhanced {
		font-size: clamp(1.75rem, 5vw, 2.5rem);
		animation: float 3s ease-in-out infinite;
		filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.2));
	}

	.tech-name, .blockchain-name {
		font-family: var(--font-primary);
		font-size: var(--text-xs);
		font-weight: 600;
		text-align: center;
		color: #ffd700;
		line-height: 1.3;
	}

	/* === PARTNERS SECTION - LAYOUT RESPONSIVO === */
	.partners-slide {
		max-width: 1200px;
		margin: 0 auto;
		padding: clamp(1rem, 3vw, 2rem) 0;
	}

	.partners-stats {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(180px, 100%), 1fr));
		gap: clamp(1rem, 3vw, 1.5rem);
		margin: clamp(1.5rem, 4vw, 2rem) 0;
		padding: clamp(1rem, 3vw, 1.5rem) 0;
		border-top: 1px solid rgba(255, 255, 255, 0.1);
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
	}

	.stat-item {
		text-align: center;
		background: rgba(255, 255, 255, 0.05);
		padding: clamp(1rem, 3vw, 1.5rem);
		border-radius: 1rem;
		backdrop-filter: blur(10px);
		border: 1px solid rgba(255, 255, 255, 0.1);
		transition: all 0.3s ease;
	}

	.stat-item:hover {
		transform: translateY(-5px);
		background: rgba(255, 255, 255, 0.08);
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
	}

	.stat-number {
		font-family: var(--font-display);
		font-size: var(--text-3xl);
		font-weight: 800;
		background: linear-gradient(45deg, #60a5fa, #a78bfa);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		margin-bottom: 0.5rem;
		line-height: 1;
	}

	.stat-label {
		font-family: var(--font-primary);
		font-size: var(--text-xs);
		color: rgba(255, 255, 255, 0.8);
		font-weight: 500;
		line-height: 1.3;
	}

	.partners-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(280px, 100%), 1fr));
		gap: clamp(1rem, 3vw, 1.5rem);
		margin-top: clamp(1.5rem, 4vw, 2rem);
	}

	.partner-card {
		background: rgba(255, 255, 255, 0.05);
		padding: clamp(1rem, 3vw, 1.5rem);
		border-radius: 1.5rem;
		backdrop-filter: blur(20px);
		border: 1px solid rgba(255, 255, 255, 0.1);
		position: relative;
		overflow: hidden;
		transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
		cursor: pointer;
		min-height: 200px;
		display: flex;
		flex-direction: column;
	}

	.partner-card:hover {
		transform: translateY(-8px) scale(1.02);
		box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
		border-color: rgba(255, 255, 255, 0.2);
		background: rgba(255, 255, 255, 0.08);
	}

	.partner-logo-enhanced {
		font-size: clamp(2rem, 6vw, 2.5rem);
		margin-bottom: clamp(0.5rem, 2vw, 0.75rem);
		text-align: center;
		filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.3));
		animation: float 3s ease-in-out infinite;
	}

	.partner-info {
		text-align: center;
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.partner-name {
		font-family: var(--font-primary);
		font-size: var(--text-base);
		font-weight: 700;
		margin: 0 0 clamp(0.25rem, 1vw, 0.5rem) 0;
		color: white;
		line-height: 1.2;
	}

	.partner-sector {
		font-family: var(--font-primary);
		font-size: var(--text-xs);
		font-weight: 600;
		color: #60a5fa;
		margin-bottom: clamp(0.5rem, 2vw, 0.75rem);
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	.partner-description {
		font-family: var(--font-primary);
		font-size: var(--text-xs);
		color: rgba(255, 255, 255, 0.7);
		margin: 0;
		line-height: 1.4;
		font-weight: 400;
	}

	.partner-category {
		position: absolute;
		top: 0;
		right: 0;
		width: 4px;
		height: 100%;
		opacity: 0.8;
		transition: opacity 0.3s ease;
	}

	.partner-card:hover .partner-category {
		opacity: 1;
	}

	/* Category colors */
	.partner-category.tech { background: linear-gradient(to bottom, #3b82f6, #1d4ed8); }
	.partner-category.mobile { background: linear-gradient(to bottom, #10b981, #047857); }
	.partner-category.iot { background: linear-gradient(to bottom, #8b5cf6, #7c3aed); }
	.partner-category.saas { background: linear-gradient(to bottom, #f59e0b, #d97706); }
	.partner-category.tourism { background: linear-gradient(to bottom, #06b6d4, #0891b2); }

	/* === FOUNDERS SLIDE - LAYOUT RESPONSIVO === */
	.founders-slide {
		max-width: 1200px;
		margin: 0 auto;
	}

	.founder-content {
		display: grid;
		grid-template-columns: 1fr;
		gap: clamp(2rem, 6vw, 4rem);
		align-items: start;
	}

	.founder-info {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
	}

	.founder-avatar {
		position: relative;
		width: clamp(150px, 20vw, 200px);
		height: clamp(150px, 20vw, 200px);
		margin-bottom: clamp(1.5rem, 4vw, 2rem);
	}

	.founder-avatar img {
		width: 100%;
		height: 100%;
		border-radius: 50%;
		object-fit: cover;
		border: 4px solid rgba(255, 255, 255, 0.3);
		box-shadow: 0 0 40px rgba(255, 255, 255, 0.2);
	}

	.avatar-glow {
		position: absolute;
		inset: -10px;
		border-radius: 50%;
		background: linear-gradient(45deg, #60a5fa, #a78bfa, #60a5fa);
		opacity: 0.3;
		animation: spin 3s linear infinite;
		z-index: -1;
	}

	.founder-name {
		font-family: var(--font-display);
		font-size: var(--text-3xl);
		font-weight: 800;
		margin: 0 0 clamp(0.5rem, 2vw, 0.75rem) 0;
		background: linear-gradient(45deg, #60a5fa, #a78bfa);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		line-height: 1.1;
	}

	.founder-title {
		font-family: var(--font-primary);
		font-size: var(--text-lg);
		color: rgba(255, 255, 255, 0.8);
		margin: 0 0 clamp(1rem, 3vw, 1.5rem) 0;
		font-weight: 600;
	}

	.founder-description {
		font-family: var(--font-primary);
		font-size: var(--text-base);
		color: rgba(255, 255, 255, 0.7);
		line-height: 1.6;
		margin-bottom: clamp(1.5rem, 4vw, 2rem);
		font-weight: 400;
	}

	.founder-skills {
		display: flex;
		flex-wrap: wrap;
		gap: clamp(0.5rem, 1.5vw, 0.75rem);
		justify-content: center;
		margin-bottom: clamp(1.5rem, 4vw, 2rem);
	}

	.skill-tag {
		background: rgba(96, 165, 250, 0.2);
		color: #60a5fa;
		padding: clamp(0.4rem, 1.5vw, 0.6rem) clamp(0.8rem, 2.5vw, 1.2rem);
		border-radius: 2rem;
		font-size: var(--text-xs);
		font-weight: 600;
		border: 1px solid rgba(96, 165, 250, 0.3);
		font-family: var(--font-primary);
		white-space: nowrap;
		transition: all 0.3s ease;
	}

	.skill-tag:hover {
		background: rgba(96, 165, 250, 0.3);
		transform: translateY(-2px);
	}

	.founder-link {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		color: #60a5fa;
		text-decoration: none;
		font-weight: 600;
		font-size: var(--text-base);
		transition: all 0.3s ease;
		font-family: var(--font-primary);
	}

	.founder-link:hover {
		color: #a78bfa;
		transform: translateX(5px);
	}

	/* === CONTACT FORM - DESIGN PREMIUM === */
	.contact-form {
		background: rgba(255, 255, 255, 0.05);
		padding: clamp(1.5rem, 4vw, 2rem);
		border-radius: 1.5rem;
		backdrop-filter: blur(20px);
		border: 1px solid rgba(255, 255, 255, 0.1);
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
		max-width: 500px;
		margin: clamp(2rem, 5vw, 3rem) auto 0;
	}

	.contact-form h3 {
		font-family: var(--font-primary);
		font-size: var(--text-xl);
		margin: 0 0 clamp(1rem, 3vw, 1.5rem) 0;
		text-align: center;
		color: white;
		font-weight: 700;
	}

	.form-row {
		display: grid;
		grid-template-columns: 1fr;
		gap: clamp(0.75rem, 2vw, 1rem);
		margin-bottom: clamp(0.75rem, 2vw, 1rem);
	}

	.contact-form input,
	.contact-form select,
	.contact-form textarea {
		background: rgba(255, 255, 255, 0.1);
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 0.5rem;
		padding: clamp(0.6rem, 2vw, 0.75rem);
		color: white;
		font-size: var(--text-sm);
		font-family: var(--font-primary);
		transition: all 0.3s ease;
		width: 100%;
	}

	.contact-form input::placeholder,
	.contact-form textarea::placeholder {
		color: rgba(255, 255, 255, 0.6);
	}

	.contact-form input:focus,
	.contact-form select:focus,
	.contact-form textarea:focus {
		outline: none;
		border-color: #60a5fa;
		background: rgba(96, 165, 250, 0.1);
		box-shadow: 0 0 0 2px rgba(96, 165, 250, 0.2);
	}

	.contact-form select {
		cursor: pointer;
	}

	.contact-form select option {
		background: #1e1e1e;
		color: white;
	}

	.contact-form textarea {
		resize: vertical;
		min-height: 100px;
		margin-bottom: clamp(0.75rem, 2vw, 1rem);
	}

	.form-submit-btn {
		width: 100%;
		background: linear-gradient(45deg, #60a5fa, #a78bfa);
		color: white;
		border: none;
		padding: clamp(0.75rem, 2.5vw, 1rem);
		border-radius: 0.5rem;
		font-size: var(--text-base);
		font-weight: 600;
		font-family: var(--font-primary);
		cursor: pointer;
		transition: all 0.3s ease;
		box-shadow: 0 4px 15px rgba(96, 165, 250, 0.3);
	}

	.form-submit-btn:hover:not(:disabled) {
		transform: translateY(-2px);
		box-shadow: 0 6px 20px rgba(96, 165, 250, 0.4);
	}

	.form-submit-btn:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	.submit-message {
		margin-top: clamp(0.75rem, 2vw, 1rem);
		padding: clamp(0.5rem, 2vw, 0.75rem);
		border-radius: 0.5rem;
		font-size: var(--text-sm);
		font-family: var(--font-primary);
		text-align: center;
		font-weight: 500;
	}

	.submit-message.success {
		background: rgba(34, 197, 94, 0.2);
		color: #22c55e;
		border: 1px solid rgba(34, 197, 94, 0.3);
	}

	.submit-message.error {
		background: rgba(239, 68, 68, 0.2);
		color: #ef4444;
		border: 1px solid rgba(239, 68, 68, 0.3);
	}

	/* === NAVIGATION - RESPONSIVO === */
	.slide-navigation {
		position: fixed;
		bottom: clamp(1rem, 3vw, 2rem);
		left: 50%;
		transform: translateX(-50%);
		z-index: 10;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: clamp(0.75rem, 2vw, 1rem);
		background: rgba(0, 0, 0, 0.3);
		backdrop-filter: blur(10px);
		padding: clamp(0.75rem, 2vw, 1rem);
		border-radius: 1rem;
		border: 1px solid rgba(255, 255, 255, 0.1);
	}

	.progress-bar {
		width: clamp(200px, 50vw, 300px);
		height: 4px;
		background: rgba(255, 255, 255, 0.2);
		border-radius: 2px;
		overflow: hidden;
	}

	.progress-fill {
		height: 100%;
		background: linear-gradient(90deg, #60a5fa, #a78bfa);
		transition: width 0.3s ease;
	}

	.slide-indicators {
		display: flex;
		gap: clamp(0.4rem, 1vw, 0.5rem);
		flex-wrap: wrap;
		justify-content: center;
	}

	.indicator {
		background: none;
		border: none;
		cursor: pointer;
		padding: clamp(0.4rem, 1vw, 0.5rem);
		transition: transform 0.2s ease;
		border-radius: 50%;
	}

	.indicator:hover {
		transform: scale(1.2);
	}

	.indicator-dot {
		display: block;
		width: clamp(6px, 1.5vw, 8px);
		height: clamp(6px, 1.5vw, 8px);
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.4);
		transition: all 0.3s ease;
	}

	.indicator.active .indicator-dot {
		background: #60a5fa;
		transform: scale(1.5);
	}

	.slide-controls {
		display: flex;
		gap: clamp(0.75rem, 2vw, 1rem);
	}

	.control-btn {
		background: rgba(255, 255, 255, 0.1);
		border: 1px solid rgba(255, 255, 255, 0.2);
		color: white;
		padding: clamp(0.6rem, 1.5vw, 0.75rem);
		border-radius: 50%;
		cursor: pointer;
		backdrop-filter: blur(10px);
		transition: all 0.3s ease;
		font-size: clamp(0.875rem, 2vw, 1rem);
		width: clamp(40px, 10vw, 48px);
		height: clamp(40px, 10vw, 48px);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.control-btn:hover {
		background: rgba(255, 255, 255, 0.2);
		transform: scale(1.1);
	}

	.play-pause {
		background: rgba(96, 165, 250, 0.2);
		border-color: #60a5fa;
	}

	/* Click hint */
	.click-hint {
		position: fixed;
		bottom: clamp(0.5rem, 2vw, 1rem);
		right: clamp(1rem, 3vw, 2rem);
		z-index: 10;
		color: rgba(255, 255, 255, 0.6);
		font-size: var(--text-xs);
		font-family: var(--font-primary);
		animation: fadeInOut 3s ease-in-out infinite;
		background: rgba(0, 0, 0, 0.3);
		padding: clamp(0.5rem, 1.5vw, 0.75rem);
		border-radius: 0.5rem;
		backdrop-filter: blur(10px);
	}

	/* === ANIMAÇÕES PREMIUM === */
	@keyframes float {
		0%, 100% { transform: translateY(0) rotate(0deg); }
		25% { transform: translateY(-15px) rotate(2deg); }
		50% { transform: translateY(-30px) rotate(0deg); }
		75% { transform: translateY(-15px) rotate(-2deg); }
	}

	@keyframes bounce {
		0%, 100% { transform: translateY(0) scale(1); }
		50% { transform: translateY(-15px) scale(1.05); }
	}

	@keyframes pulse {
		0%, 100% { opacity: 1; transform: scale(1); }
		50% { opacity: 0.8; transform: scale(1.05); }
	}

	@keyframes fadeInOut {
		0%, 70%, 100% { opacity: 0.6; }
		35% { opacity: 1; }
	}

	@keyframes gradientShift {
		0% { background-position: 0% 50%; }
		50% { background-position: 100% 50%; }
		100% { background-position: 0% 50%; }
	}

	@keyframes textGlow {
		0% { 
			text-shadow: 0 0 20px rgba(255, 255, 255, 0.2),
						 0 0 40px rgba(0, 212, 255, 0.1),
						 0 0 60px rgba(255, 0, 110, 0.05);
		}
		100% { 
			text-shadow: 0 0 30px rgba(255, 255, 255, 0.4),
						 0 0 60px rgba(0, 212, 255, 0.2),
						 0 0 90px rgba(255, 0, 110, 0.1);
		}
	}

	@keyframes spin {
		0% { transform: rotate(0deg); }
		100% { transform: rotate(360deg); }
	}

	/* === RESPONSIVIDADE COMPLETA === */
	
	/* Tablets em paisagem */
	@media (max-width: 1024px) {
		.rocket-canvas {
			width: 250px;
			left: 3%;
		}
		
		.founder-content {
			gap: clamp(2rem, 5vw, 3rem);
		}
	}

	/* Tablets em retrato */
	@media (max-width: 768px) {
		.slider-container {
			min-height: calc(100vh - 60px);
			padding-bottom: 140px;
		}

		.slide-content {
			min-height: calc(100vh - 60px);
			padding: clamp(0.75rem, 2vw, 1rem);
			padding-bottom: clamp(2rem, 5vw, 3rem);
		}

		.rocket-canvas {
			display: none; /* Esconde no mobile para performance */
		}

		.particles-canvas {
			opacity: 0.5; /* Reduz opacidade no mobile */
		}

		.apps-grid {
			grid-template-columns: 1fr;
		}

		.services-grid {
			grid-template-columns: 1fr;
		}

		.tech-grid, .blockchain-grid {
			grid-template-columns: repeat(3, 1fr);
		}

		.partners-stats {
			grid-template-columns: repeat(2, 1fr);
		}

		.partners-grid {
			grid-template-columns: 1fr;
		}

		.founder-content {
			grid-template-columns: 1fr;
			text-align: center;
		}

		.form-row {
			grid-template-columns: 1fr;
		}

		.slide-navigation {
			bottom: clamp(0.75rem, 2vw, 1rem);
			padding: clamp(0.5rem, 1.5vw, 0.75rem);
		}
	}

	/* Smartphones */
	@media (max-width: 480px) {
		.slider-container {
			min-height: calc(100vh - 60px);
			padding-bottom: 160px;
		}

		.slide-content {
			min-height: calc(100vh - 60px);
			padding: 0.75rem;
			padding-bottom: 2rem;
		}

		.slide-inner {
			gap: 1rem;
		}

		.hero-icon {
			font-size: clamp(3rem, 15vw, 5rem);
		}

		.slide-icon {
			font-size: clamp(2rem, 10vw, 3rem);
		}

		.tech-grid, .blockchain-grid {
			grid-template-columns: repeat(2, 1fr);
		}

		.partners-stats {
			grid-template-columns: 1fr;
		}

		.slide-navigation {
			scale: 0.9;
		}

		.click-hint {
			display: none; /* Esconde no mobile */
		}

		/* Otimizações de performance para mobile */
		.enhanced-card::before {
			display: none;
		}

		.card-glow {
			display: none;
		}

		/* Simplifica animações no mobile */
		.app-icon-enhanced,
		.service-icon-enhanced,
		.tech-icon-enhanced,
		.blockchain-icon-enhanced,
		.partner-logo-enhanced {
			animation: none;
		}
	}

	/* Smartphones pequenos */
	@media (max-width: 375px) {
		.slider-container {
			padding-bottom: 180px;
		}

		.slide-content {
			padding: 0.5rem;
			padding-bottom: 1.5rem;
		}

		.slide-inner {
			gap: 0.75rem;
		}

		.hero-title {
			line-height: 0.85;
		}

		.founder-skills {
			gap: 0.4rem;
		}

		.skill-tag {
			font-size: 0.65rem;
			padding: 0.3rem 0.6rem;
		}
	}

	/* Accessibility e Reduced Motion */
	@media (prefers-reduced-motion: reduce) {
		*,
		*::before,
		*::after {
			animation-duration: 0.01ms !important;
			animation-iteration-count: 1 !important;
			transition-duration: 0.01ms !important;
			scroll-behavior: auto !important;
		}

		.enhanced-card::before,
		.card-glow {
			display: none;
		}
	}

	/* High contrast mode */
	@media (prefers-contrast: high) {
		.slider-container {
			background: #000;
		}

		.enhanced-card,
		.app-card,
		.service-card,
		.tech-item,
		.blockchain-item,
		.partner-card,
		.stat-item,
		.contact-form {
			border: 2px solid #fff;
			background: rgba(255, 255, 255, 0.1);
		}
	}

	/* Print styles */
	@media print {
		.slider-container {
			background: white;
			color: black;
		}

		.slide-navigation,
		.click-hint,
		.particles-canvas,
		.rocket-canvas {
			display: none;
		}
	}
</style> 