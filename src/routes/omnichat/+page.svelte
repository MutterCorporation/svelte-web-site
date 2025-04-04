<script lang="ts">
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';

  let isVisible = false;

  onMount(() => {
    if (browser) {
      isVisible = true;
    }
  });
</script>

<div class="w-full min-h-screen bg-gradient-to-br from-black to-gray-900 text-white overflow-x-hidden">
  <div class="min-h-screen w-full flex items-center justify-center text-center relative overflow-hidden p-8">
    <div class="absolute inset-0 bg-[url('/images/chat-pattern.png')] opacity-10 animate-pattern"></div>
    <div class="relative z-10 p-8 max-w-4xl mx-auto">
      <h1 class="text-6xl md:text-7xl font-black uppercase mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent animate-fade-in">
        OMNICHAT
      </h1>
      <p class="text-xl md:text-2xl mb-4 opacity-90 animate-fade-in-delay-1">
        A Solução Ideal para Negócios e Atendimento ao Cliente
      </p>
      <p class="text-lg md:text-xl leading-relaxed mb-8 opacity-90 animate-fade-in-delay-2">
        O Chatwoot é uma plataforma de atendimento ao cliente que visa otimizar a comunicação entre empresas e seus clientes. 
        Uma ferramenta eficaz, ágil e acessível para empresas de diferentes tamanhos, proporcionando uma experiência de atendimento 
        fluida e personalizada.
      </p>
      <a href="#contato" class="inline-block px-8 py-4 bg-white/10 text-white font-black uppercase border-2 border-white rounded-lg backdrop-blur-sm transition-all duration-300 hover:bg-white/20 hover:-translate-y-0.5 animate-fade-in-delay-3">
        COMEÇAR AGORA
      </a>
    </div>
  </div>

  <div class="py-20 px-8 text-center w-full">
    <h2 class="text-4xl md:text-5xl font-black uppercase mb-12">VANTAGENS PARA OS NEGÓCIOS</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
      <div class="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8 transition-all duration-300 hover:-translate-y-2 hover:bg-white/15 hover:shadow-xl">
        <div class="text-5xl mb-4">🔄</div>
        <h3 class="text-2xl font-black uppercase mb-4">Atendimento Multicanal</h3>
        <p class="opacity-90">Integre diversos canais de comunicação em uma única plataforma: WhatsApp, Facebook Messenger, e-mail, SMS e chat ao vivo.</p>
      </div>

      <div class="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8 transition-all duration-300 hover:-translate-y-2 hover:bg-white/15 hover:shadow-xl">
        <div class="text-5xl mb-4">⚡</div>
        <h3 class="text-2xl font-black uppercase mb-4">Automatização</h3>
        <p class="opacity-90">Bots automatizados para respostas rápidas e direcionamento eficiente, reduzindo tempo de espera e melhorando a experiência.</p>
      </div>

      <div class="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8 transition-all duration-300 hover:-translate-y-2 hover:bg-white/15 hover:shadow-xl">
        <div class="text-5xl mb-4">👤</div>
        <h3 class="text-2xl font-black uppercase mb-4">Personalização</h3>
        <p class="opacity-90">Visão detalhada do histórico de cada cliente para atendimentos mais assertivos e personalizados.</p>
      </div>

      <div class="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8 transition-all duration-300 hover:-translate-y-2 hover:bg-white/15 hover:shadow-xl">
        <div class="text-5xl mb-4">📊</div>
        <h3 class="text-2xl font-black uppercase mb-4">Análises e Relatórios</h3>
        <p class="opacity-90">Métricas valiosas sobre desempenho do atendimento para otimização contínua das operações.</p>
      </div>

      <div class="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8 transition-all duration-300 hover:-translate-y-2 hover:bg-white/15 hover:shadow-xl">
        <div class="text-5xl mb-4">📈</div>
        <h3 class="text-2xl font-black uppercase mb-4">Escalabilidade</h3>
        <p class="opacity-90">Solução adaptável para empresas de qualquer tamanho, crescendo conforme a demanda.</p>
      </div>
    </div>
  </div>

  <div class="py-20 px-8 text-center w-full">
    <h2 class="text-4xl md:text-5xl font-black uppercase mb-12">PÚBLICO-ALVO</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
      <div class="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8 transition-all duration-300 hover:-translate-y-2 hover:bg-white/15 hover:shadow-xl">
        <div class="text-5xl mb-4">🛍️</div>
        <h3 class="text-2xl font-black uppercase mb-4">E-commerce</h3>
        <p class="opacity-90">Atendimento ágil e personalizado para questões de pós-venda, rastreamento de pedidos e suporte.</p>
      </div>

      <div class="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8 transition-all duration-300 hover:-translate-y-2 hover:bg-white/15 hover:shadow-xl">
        <div class="text-5xl mb-4">🚀</div>
        <h3 class="text-2xl font-black uppercase mb-4">Startups</h3>
        <p class="opacity-90">Interface simples e acessível para pequenas empresas que precisam de uma solução robusta.</p>
      </div>

      <div class="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8 transition-all duration-300 hover:-translate-y-2 hover:bg-white/15 hover:shadow-xl">
        <div class="text-5xl mb-4">💼</div>
        <h3 class="text-2xl font-black uppercase mb-4">Empresas de Serviços</h3>
        <p class="opacity-90">Gestão eficaz de interações para consultorias, agências e prestadores de serviços.</p>
      </div>

      <div class="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8 transition-all duration-300 hover:-translate-y-2 hover:bg-white/15 hover:shadow-xl">
        <div class="text-5xl mb-4">🔧</div>
        <h3 class="text-2xl font-black uppercase mb-4">Suporte Técnico</h3>
        <p class="opacity-90">Resolução eficiente de problemas para empresas de software e TI.</p>
      </div>
    </div>
  </div>

  <div class="py-20 px-8 text-center w-full">
    <h2 class="text-4xl md:text-5xl font-black uppercase mb-12">POR QUE ESCOLHER O OMNICHAT?</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
      <div class="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8 transition-all duration-300 hover:-translate-y-2 hover:bg-white/15 hover:shadow-xl">
        <h3 class="text-2xl font-black uppercase mb-4">Eficiência Operacional</h3>
        <p class="opacity-90">Reduza o tempo de resposta e aumente a produtividade da sua equipe com ferramentas inteligentes de automação.</p>
      </div>
      <div class="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8 transition-all duration-300 hover:-translate-y-2 hover:bg-white/15 hover:shadow-xl">
        <h3 class="text-2xl font-black uppercase mb-4">Experiência do Cliente</h3>
        <p class="opacity-90">Ofereça atendimento personalizado e de qualidade, aumentando a satisfação e fidelização dos seus clientes.</p>
      </div>
      <div class="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8 transition-all duration-300 hover:-translate-y-2 hover:bg-white/15 hover:shadow-xl">
        <h3 class="text-2xl font-black uppercase mb-4">Integração Completa</h3>
        <p class="opacity-90">Conecte todos os seus canais de comunicação em uma única plataforma, simplificando a gestão.</p>
      </div>
      <div class="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8 transition-all duration-300 hover:-translate-y-2 hover:bg-white/15 hover:shadow-xl">
        <h3 class="text-2xl font-black uppercase mb-4">Analytics Avançado</h3>
        <p class="opacity-90">Tenha insights valiosos sobre o desempenho do seu atendimento e tome decisões baseadas em dados.</p>
      </div>
    </div>
  </div>

  <div class="py-20 px-8 text-center w-full bg-black/50 backdrop-blur-sm" id="contato">
    <h2 class="text-4xl md:text-5xl font-black uppercase mb-8">COMEÇE A TRANSFORMAR SEU ATENDIMENTO</h2>
    <p class="text-xl mb-12 opacity-90">Junte-se a milhares de empresas que já otimizaram sua comunicação com o OMNICHAT</p>
    <div class="flex flex-col md:flex-row gap-4 justify-center">
      <a href="#" class="px-8 py-4 bg-white/10 text-white font-black uppercase border-2 border-white rounded-lg backdrop-blur-sm transition-all duration-300 hover:bg-white/20 hover:-translate-y-0.5">
        SOLICITAR DEMONSTRAÇÃO
      </a>
      <a href="#" class="px-8 py-4 bg-transparent text-white font-black uppercase border-2 border-white rounded-lg transition-all duration-300 hover:bg-white/10 hover:-translate-y-0.5">
        FALAR COM CONSULTOR
      </a>
    </div>
  </div>
</div>

<style>
  @keyframes pattern {
    0% { background-position: 0 0; }
    100% { background-position: 100% 100%; }
  }

  @keyframes fade-in {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-pattern {
    animation: pattern 20s linear infinite;
  }

  .animate-fade-in {
    animation: fade-in 1s ease-out;
  }

  .animate-fade-in-delay-1 {
    animation: fade-in 1s ease-out 0.3s backwards;
  }

  .animate-fade-in-delay-2 {
    animation: fade-in 1s ease-out 0.6s backwards;
  }

  .animate-fade-in-delay-3 {
    animation: fade-in 1s ease-out 0.9s backwards;
  }
</style>
