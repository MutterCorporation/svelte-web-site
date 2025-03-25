<svelte:head>
  <title>Finance Table - Gestão Financeira Simplificada</title>
  <meta name="description" content="Gerencie suas finanças pessoais de forma simples e eficiente">
</svelte:head>

<script>
  import { onMount } from 'svelte';
  import { fly, fade, slide } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';

  // Estados
  let showGuide = false;
  let currentStep = 0;
  let loading = true;
  let error = null;

  // Dados do usuário
  let userData = {
    balance: 0,
    income: 0,
    expenses: 0,
    savings: 0
  };

  // Guia de uso
  const guideSteps = [
    {
      title: "Bem-vindo ao Finance Table",
      description: "Gerencie suas finanças de forma simples e eficiente",
      icon: "👋"
    },
    {
      title: "Adicione Transações",
      description: "Registre suas receitas e despesas facilmente",
      icon: "💰"
    },
    {
      title: "Acompanhe Relatórios",
      description: "Visualize gráficos e análises detalhadas",
      icon: "📊"
    },
    {
      title: "Configure suas Categorias",
      description: "Personalize as categorias de acordo com suas necessidades",
      icon: "⚙️"
    }
  ];

  // Categorias padrão
  const defaultCategories = [
    { id: 1, name: "Salário", type: "income", color: "#4CAF50" },
    { id: 2, name: "Freelance", type: "income", color: "#2196F3" },
    { id: 3, name: "Alimentação", type: "expense", color: "#F44336" },
    { id: 4, name: "Transporte", type: "expense", color: "#FF9800" },
    { id: 5, name: "Moradia", type: "expense", color: "#9C27B0" }
  ];

  // Função para buscar dados do usuário
  async function fetchUserData() {
    try {
      const response = await fetch('https://api.example.com/finance/user-data', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (!response.ok) throw new Error('Falha ao carregar dados');
      
      userData = await response.json();
    } catch (err) {
      error = err.message;
    } finally {
      loading = false;
    }
  }

  onMount(() => {
    fetchUserData();
  });
</script>

<div class="min-h-screen bg-gray-100 text-gray-800">
  <!-- Header Neumorphism -->
  <header class="fixed top-0 left-0 right-0 bg-gray-100 z-50 py-4">
    <div class="container mx-auto px-6">
      <div class="neu-card-flat flex items-center justify-between p-4">
        <div class="flex items-center space-x-4">
          <span class="text-2xl font-bold text-gray-700">
            Finance Table
          </span>
        </div>

        <nav class="flex items-center space-x-6">
          <a href="/finance-table/dashboard" class="neu-button-flat">Dashboard</a>
          <a href="/finance-table/transactions" class="neu-button-flat">Transações</a>
          <a href="/finance-table/reports" class="neu-button-flat">Relatórios</a>
          <button 
            class="neu-button-pressed"
            on:click={() => showGuide = true}
          >
            Como Usar
          </button>
        </nav>
      </div>
    </div>
  </header>

  <!-- Conteúdo Principal -->
  <main class="pt-32 pb-16">
    <div class="container mx-auto px-6">
      {#if loading}
        <div class="flex items-center justify-center min-h-[400px]">
          <div class="neu-spinner"></div>
        </div>
      {:else if error}
        <div class="neu-card-pressed bg-red-50 p-4 text-red-600">
          {error}
        </div>
      {:else}
        <!-- Cards de Resumo -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12" 
             in:fly="{{ y: 50, duration: 1000, delay: 200 }}">
          <div class="neu-card">
            <div class="p-6">
              <span class="text-sm font-medium text-gray-600">Saldo Total</span>
              <span class="text-2xl font-bold text-gray-800 mt-2 block">
                R$ {userData.balance.toLocaleString('pt-BR')}
              </span>
            </div>
          </div>
          <div class="neu-card">
            <div class="p-6">
              <span class="text-sm font-medium text-gray-600">Receitas</span>
              <span class="text-2xl font-bold text-green-600 mt-2 block">
                R$ {userData.income.toLocaleString('pt-BR')}
              </span>
            </div>
          </div>
          <div class="neu-card">
            <div class="p-6">
              <span class="text-sm font-medium text-gray-600">Despesas</span>
              <span class="text-2xl font-bold text-red-600 mt-2 block">
                R$ {userData.expenses.toLocaleString('pt-BR')}
              </span>
            </div>
          </div>
          <div class="neu-card">
            <div class="p-6">
              <span class="text-sm font-medium text-gray-600">Economia</span>
              <span class="text-2xl font-bold text-purple-600 mt-2 block">
                R$ {userData.savings.toLocaleString('pt-BR')}
              </span>
            </div>
          </div>
        </div>

        <!-- Ações Rápidas -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div class="quick-action-card">
            <h3 class="text-lg font-semibold mb-4">Adicionar Transação</h3>
            <!-- Formulário de Transação Rápida -->
          </div>
          <div class="quick-action-card">
            <h3 class="text-lg font-semibold mb-4">Categorias</h3>
            <!-- Lista de Categorias -->
          </div>
        </div>
      {/if}
    </div>
  </main>

  <!-- Modal do Guia -->
  {#if showGuide}
    <div class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
         on:click={() => showGuide = false}
         transition:fade>
      <div class="bg-white rounded-2xl p-8 max-w-md w-full mx-4"
           on:click|stopPropagation
           in:fly="{{ y: 20, duration: 300, easing: quintOut }}">
        <div class="text-center mb-8">
          <span class="text-4xl mb-4 block">{guideSteps[currentStep].icon}</span>
          <h3 class="text-2xl font-bold mb-2">{guideSteps[currentStep].title}</h3>
          <p class="text-gray-600">{guideSteps[currentStep].description}</p>
        </div>

        <div class="flex justify-between items-center">
          <button 
            class="text-gray-600 hover:text-gray-900"
            disabled={currentStep === 0}
            on:click={() => currentStep--}
          >
            Anterior
          </button>
          <div class="flex gap-2">
            {#each guideSteps as _, i}
              <div class="w-2 h-2 rounded-full transition-all duration-300"
                   class:bg-blue-600={currentStep === i}
                   class:bg-gray-300={currentStep !== i}>
              </div>
            {/each}
          </div>
          <button 
            class="text-blue-600 hover:text-blue-700 font-medium"
            on:click={() => {
              if (currentStep === guideSteps.length - 1) {
                showGuide = false;
                currentStep = 0;
              } else {
                currentStep++;
              }
            }}
          >
            {currentStep === guideSteps.length - 1 ? 'Concluir' : 'Próximo'}
          </button>
        </div>
      </div>
    </div>
  {/if}
</div>

<style>
  /* Estilos base */
  .nav-link {
    @apply text-gray-600 hover:text-blue-600 transition-colors;
  }

  .stat-card {
    @apply bg-white rounded-2xl p-6 flex flex-col gap-2 border border-gray-100 hover:border-blue-200 transition-all;
  }

  .quick-action-card {
    @apply bg-white rounded-2xl p-6 border border-gray-100;
  }

  /* Loading Spinner */
  .loading-spinner {
    @apply w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin;
  }

  /* Animações */
  @keyframes slideUp {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  .animate-slide-up {
    animation: slideUp 0.5s ease-out forwards;
  }

  /* Responsividade */
  @media (max-width: 768px) {
    .stat-card {
      @apply p-4;
    }
  }
</style>