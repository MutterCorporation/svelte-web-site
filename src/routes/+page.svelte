<svelte:head>
  <title>MutterCorp - Soluções Empresariais em Tecnologia</title>
  <meta name="description" content="Transforme seu negócio com nossas soluções em CRM, Omnichannel e Análise de Investimentos">
  <meta name="keywords" content="CRM, Omnichannel, Chatwoot, Análise de Investimentos, Tecnologia Empresarial, B2B">
  <meta name="author" content="MutterCorp">
  <meta property="og:title" content="MutterCorp - Tecnologia que Transforma">
  <meta property="og:description" content="Soluções empresariais integradas para impulsionar seu negócio">
  <meta property="og:url" content="https://muttercorp.com.br/">
  <meta property="og:type" content="website">
</svelte:head>

<script>
	import Header from '../components/Header.svelte';
	import Hero from '../components/Hero.svelte';
	import { Footer, FooterBrand, FooterCopyright, FooterLink, FooterLinkGroup } from 'flowbite-svelte';
  import { fly, fade } from 'svelte/transition';

  // Apps disponíveis
  const apps = [
    {
      title: "Sexpomodoro",
      description: "Timer Pomodoro com posições do Kamasutra",
      icon: "🕐",
      link: "https://sexpomodoro.com.br",
      color: "from-pink-500 to-red-500"
    },
    {
      title: "Job Hunter",
      description: "Plataforma de busca de empregos tech",
      icon: "💼",
      link: "/job-hunter",
      color: "from-purple-500 to-indigo-500"
    },
    {
      title: "Finance Table",
      description: "Gestão financeira simplificada",
      icon: "💰",
      link: "/finance-table",
      color: "from-green-500 to-emerald-500"
    },
    {
    title: "Cryptostomp",
      description: "Análise e sinais de criptomoedas",
      icon: "📈",
      link: "/cryptostomp",
      color: "from-blue-500 to-cyan-500"
    }
  ];

  // Serviços principais
  const services = [
    {
      title: "Omnichat Whitelabel",
      description: "Plataforma de atendimento multicanal personalizada com sua marca",
      icon: "💬",
      link: "/omnichat",
      features: [
        "Integração com WhatsApp, Instagram e Facebook",
        "Chat em tempo real no seu site",
        "Relatórios detalhados de atendimento",
        "Personalização completa da interface"
      ]
    },
    {
      title: "CRM Empresarial",
      description: "Gestão completa do relacionamento com seus clientes",
      icon: "🎯",
      features: [
        "Pipeline de vendas personalizado",
        "Automação de processos",
        "Integração com e-mail marketing",
        "Dashboard de performance"
      ]
    },
  ];

  const stats = [
    { number: "98%", label: "Satisfação dos Clientes" },
    { number: "24/7", label: "Suporte Técnico" },
    { number: "+500", label: "Empresas Atendidas" },
    { number: "99.9%", label: "Uptime Garantido" }
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

<div class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
	<Header />
	
  <!-- Hero Section -->
  <section class="relative h-screen flex items-center justify-center overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-purple-900/80 z-0" />
    <!-- <div class="absolute inset-0 opacity-20 bg-[url('/tech-pattern.png')] z-0" /> -->
    
    <div class="container mx-auto px-4 z-10" in:fly="{{ y: 50, duration: 1000 }}">
      <div class="max-w-4xl mx-auto text-center">
        <h1 class="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
          Transforme Seu Negócio
        </h1>
        <p class="text-xl md:text-2xl text-gray-300 mb-8">
          Soluções empresariais integradas que impulsionam sua empresa para o próximo nível
        </p>
        <div class="flex gap-4 justify-center">
          <a href="#services" class="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-full transition-all transform hover:scale-105">
            Conhecer Soluções
          </a>
          <a href="/contact" class="px-8 py-3 border border-white/20 hover:bg-white/10 rounded-full transition-all">
            Falar com Especialista
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- Apps Section -->
  <section class="py-24 bg-gradient-to-r from-gray-900/50 to-black/50">
    <div class="container mx-auto px-4">
      <h2 class="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
        Nossas Aplicações
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {#each apps as app, i}
          <a 
            href={app.link}
            class="group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 p-6 transition-all hover:scale-105"
            in:fly="{{ y: 50, duration: 500, delay: i * 200 }}"
          >
            <div class="absolute inset-0 bg-gradient-to-br {app.color} opacity-0 group-hover:opacity-10 transition-opacity"></div>
            <span class="text-4xl mb-4 block">{app.icon}</span>
            <h3 class="text-xl font-bold mb-2 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r {app.color}">
              {app.title}
            </h3>
            <p class="text-gray-400">{app.description}</p>
          </a>
        {/each}
      </div>
    </div>
  </section>

  <!-- Serviços -->
  <section id="services" class="py-24">
    <div class="container mx-auto px-4">
      <h2 class="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
        Nossas Soluções
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        {#each services as service, i}
          <a 
            href={service.link}
            class="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-blue-500/50 transition-all"
            in:fly="{{ y: 50, duration: 500, delay: i * 200 }}"
          >
            <span class="text-4xl mb-4 block">{service.icon}</span>
            <h3 class="text-2xl font-bold mb-4 text-blue-400">{service.title}</h3>
            <p class="text-gray-400 mb-6">{service.description}</p>
            <ul class="space-y-3">
              {#each service.features as feature}
                <li class="flex items-center text-gray-300">
                  <svg class="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
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

  <!-- Estatísticas -->
  <section class="py-24 bg-gradient-to-r from-blue-900/50 to-purple-900/50">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
        {#each stats as stat}
          <div class="text-center" in:fly="{{ y: 50, duration: 500 }}">
            <div class="text-4xl font-bold text-blue-400 mb-2">{stat.number}</div>
            <div class="text-gray-400">{stat.label}</div>
          </div>
		{/each}
	  </div>
	</div>
  </section>

  <!-- CTA Section com Formulário -->
  <section class="py-24">
    <div class="container mx-auto px-4">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-4xl font-bold mb-8">Pronto para Transformar seu Negócio?</h2>
          <p class="text-xl text-gray-400 mb-8">
            Entre em contato conosco e descubra como nossas soluções podem impulsionar seus resultados
          </p>
        </div>

        <form 
          on:submit|preventDefault={handleSubmit}
          class="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10"
        >
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label for="name" class="block text-sm font-medium text-gray-400 mb-2">Nome</label>
              <input
                type="text"
                id="name"
                bind:value={name}
                required
                class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white"
                placeholder="Seu nome completo"
              />
            </div>
            
            <div>
              <label for="email" class="block text-sm font-medium text-gray-400 mb-2">E-mail</label>
              <input
                type="email"
                id="email"
                bind:value={email}
                required
                class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white"
                placeholder="seu@email.com"
              />
            </div>
          </div>

          <div class="mb-6">
            <label for="phone" class="block text-sm font-medium text-gray-400 mb-2">Telefone</label>
            <input
              type="tel"
              id="phone"
              bind:value={phone}
              required
              class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white"
              placeholder="(00) 00000-0000"
            />
          </div>

          <div class="mb-6">
            <label for="message" class="block text-sm font-medium text-gray-400 mb-2">Mensagem</label>
            <textarea
              id="message"
              bind:value={message}
              rows="4"
              class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white"
              placeholder="Como podemos ajudar?"
            ></textarea>
          </div>

          <div class="flex justify-center">
            <button
              type="submit"
              disabled={loading}
              class="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-full text-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {#if loading}
                <svg class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Enviando...
              {:else}
                Agendar Demonstração
              {/if}
            </button>
          </div>

          {#if success}
            <div class="mt-4 p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400 text-center">
              Mensagem enviada com sucesso! Entraremos em contato em breve.
            </div>
          {/if}

          {#if error}
            <div class="mt-4 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-center">
              Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente.
            </div>
          {/if}
        </form>
      </div>
    </div>
  </section>

  <!-- Footer Atualizado -->
  <Footer class="bg-gray-900/50 border-t border-white/10" footerType="logo">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8 py-8">
        <div>
          <FooterBrand href="https://muttercorp.com.br" src="logo.png" alt="MutterCorp Logo" />
          <p class="text-gray-400 mt-4">
            Transformando negócios através da tecnologia
          </p>
        </div>
        <div>
          <h3 class="text-lg font-semibold mb-4">Aplicações</h3>
          <FooterLinkGroup ulClass="space-y-2">
            <FooterLink href="/kama-doro">Kama-Doro</FooterLink>
            <FooterLink href="/job-hunter">Job Hunter</FooterLink>
            <FooterLink href="/finance-table">Finance Table</FooterLink>
            <FooterLink href="/cryptostomp">Cryptostomp</FooterLink>
          </FooterLinkGroup>
        </div>
        <div>
          <h3 class="text-lg font-semibold mb-4">Soluções</h3>
          <FooterLinkGroup ulClass="space-y-2">
            <FooterLink href="/omnichat">Omnichat</FooterLink>
            <FooterLink href="/crm">CRM</FooterLink>
            <FooterLink href="/investing">Investing Notice</FooterLink>
          </FooterLinkGroup>
        </div>
        <div>
          <h3 class="text-lg font-semibold mb-4">Legal</h3>
          <FooterLinkGroup ulClass="space-y-2">
            <FooterLink href="/privacy">Privacidade</FooterLink>
            <FooterLink href="/terms">Termos</FooterLink>
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
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }

  .animate-float {
    animation: float 3s ease-in-out infinite;
	}
  </style>
