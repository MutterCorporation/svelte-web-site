<script>
// @ts-nocheck

  import { fade, fly } from 'svelte/transition';
  import { onMount } from 'svelte';
  import CardProduct from '../../components/CardProduct.svelte';
  import Carousell from '../../components/Carousell.svelte';
  import Cart from '../../components/CartComponent.svelte';
  import { Footer, FooterCopyright, FooterLinkGroup, FooterBrand, FooterLink } from 'flowbite-svelte';
  import Header from '../../components/Header.svelte';
	import ProductModal from '../../components/ProductModal.svelte';
  // import { Toaster, toast } from 'svelte-french-toast';



  let showWelcome = true;
  let showCookieConsent = true;
  let categories = [
    { id: 1, name: 'Tênis', icon: '👟' },
    { id: 2, name: 'Fitness Feminino', icon: '💪' },
    { id: 3, name: 'Fitness Masculino', icon: '🏋️' },
    { id: 4, name: 'Acessórios', icon: '🎽' },
    { id: 5, name: 'Suplementos', icon: '🥤' }
  ];
  let selectedCategory = 'Todos';
  let searchQuery = '';

  let images = [
    {
      id: 1,
      alt: "Binance Refer",
      src: "https://conteudointimo.s3.amazonaws.com/56e93a94570d8e976ded439a2c17ff6ee370bd0b9adb9b7776e105b3f31ce880.jpeg",
      title: "Binance Refer",
      category: "Investimentos",
      price: 97.00,
      description: "Aprenda a lucrar com indicações na maior exchange do mundo",
      slug: 'binance-refer'
   },
    {
      id: 2,
      alt: "Liberdade do Tabaco",
      src: "https://conteudointimo.s3.amazonaws.com/01ff0ed71c22eee1c1537969077735553124fde9b40531ca4272b5f3f96e69c9.png",
      title: "Liberdade do Tabaco",
      category: "Saúde",
      price: 67.00,
      description: "Método comprovado para abandonar o cigarro definitivamente",
      slug: 'liberdade-do-tabaco'
    },
    // ... outros produtos
  ];

  let filteredImages = images;

  let featuredProducts = [
    {
      id: 1,
      name: 'Nike Air Max 2024',
      price: 899.90,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
      category: 'Tênis'
    },
    // Adicione mais produtos
  ];

  $: {
    filteredImages = images.filter(image => {
      const matchesCategory = selectedCategory === 'Todos' || image.category === selectedCategory;
      const matchesSearch = image.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           image.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }

  function acceptCookies() {
    localStorage.setItem('cookiesAccepted', 'true');
    showCookieConsent = false;
    toast.success('Preferências salvas!');
  }

  onMount(() => {
    if (localStorage.getItem('cookiesAccepted')) {
      showCookieConsent = false;
    }
    
    setTimeout(() => {
      showWelcome = false;
    }, 3000);
    
    // Animação de entrada
    toast.success('Bem-vindo à nossa loja!', {
      icon: '🏪',
      duration: 3000
    });
  });
</script>

<svelte:head>
	<title>FitStore - Produtos para Fitness e Saúde</title>
	<meta name="description" content="Encontre os melhores produtos para fitness, saúde e bem-estar. Tênis, roupas, acessórios e suplementos com os melhores preços." />
	<meta name="keywords" content="Fitness, Saúde, Tênis, Roupas Fitness, Suplementos, Acessórios, Bem-estar" />
	<meta name="author" content="MutterCorp" />
	<meta property="og:title" content="FitStore - Produtos para Fitness e Saúde" />
	<meta property="og:description" content="Encontre os melhores produtos para fitness, saúde e bem-estar. Tênis, roupas, acessórios e suplementos com os melhores preços." />
	<meta property="og:image" content="https://conteudointimo.s3.amazonaws.com/56e93a94570d8e976ded439a2c17ff6ee370bd0b9adb9b7776e105b3f31ce880.jpeg" />
	<meta property="og:url" content="https://muttercorp.com.br/shop" />
	<meta property="og:type" content="website" />
	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<!-- Welcome Overlay -->
{#if showWelcome}
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-pink-500"
    transition:fade={{ duration: 1000 }}
  >
    <h1 class="text-4xl font-bold text-white">Bem-vindo à nossa loja!</h1>
  </div>
{/if}

  
<Header />
<Cart />

<div class="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
  <!-- Header com Navigation -->
  <header class="sticky top-0 z-50 bg-white/80 backdrop-blur-lg shadow-lg">
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex items-center">
          <a href="/shop" class="flex items-center space-x-2">
            <span class="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
              FitStore
            </span>
          </a>
        </div>

        <div class="flex items-center space-x-4">
          <a href="/shop/login" class="nav-link">Login</a>
          <a href="/shop/cart" class="relative">
            <svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span class="absolute -top-2 -right-2 bg-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              0
            </span>
          </a>
        </div>
      </div>
    </nav>
  </header>

  <!-- Hero Section -->
  <section class="relative h-[70vh] overflow-hidden">
    <div class="absolute inset-0">
      <img
        src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f"
        alt="Hero"
        class="w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
    </div>
    
    <div class="relative max-w-7xl mx-auto px-4 h-full flex items-center">
      <div class="max-w-xl" in:fly="{{ y: 50, duration: 1000 }}">
        <h1 class="text-5xl font-bold text-white mb-6">
          Seu Estilo, Sua Força
        </h1>
        <p class="text-xl text-gray-200 mb-8">
          Descubra a nova coleção de moda fitness e tênis para seu treino
        </p>
        <a href="#products" class="inline-flex items-center px-8 py-3 rounded-full bg-purple-600 text-white font-semibold hover:bg-purple-700 transform hover:scale-105 transition-all">
          Explorar Agora
          <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>
    </div>
  </section>

  <!-- Categorias -->
  <section class="py-16 bg-white">
    <div class="max-w-7xl mx-auto px-4">
      <h2 class="text-3xl font-bold text-center mb-12">Categorias</h2>
      
      <div class="grid grid-cols-2 md:grid-cols-5 gap-6">
        {#each categories as category}
          <a
            href={`/shop/category/${category.id}`}
            class="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-100 to-pink-100 p-6 text-center transform hover:scale-105 transition-all"
            in:fly="{{ y: 50, duration: 500, delay: category.id * 100 }}"
          >
            <span class="text-4xl mb-3 block">{category.icon}</span>
            <h3 class="font-semibold text-gray-800">{category.name}</h3>
          </a>
        {/each}
      </div>
    </div>
  </section>

  <!-- Produtos em Destaque -->
  <section id="products" class="py-16 bg-gray-100">
    <div class="max-w-7xl mx-auto px-4">
      <h2 class="text-3xl font-bold text-center mb-12">Destaques</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        {#each featuredProducts as product}
          <div
            class="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all transform hover:scale-105"
            in:fly="{{ y: 50, duration: 500 }}"
          >
            <img
              src={product.image}
              alt={product.name}
              class="w-full h-64 object-cover"
            />
            <div class="p-6">
              <h3 class="font-semibold text-lg mb-2">{product.name}</h3>
              <p class="text-purple-600 font-bold">
                R$ {product.price.toFixed(2)}
              </p>
              <button
                class="mt-4 w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors"
                on:click={() => toast.success('Produto adicionado ao carrinho!')}
              >
                Adicionar ao Carrinho
              </button>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- Cookie Consent -->
  {#if showCookieConsent}
    <div
      class="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-4"
      in:fly="{{ y: 100, duration: 500 }}"
      out:fade
    >
      <div class="max-w-7xl mx-auto flex items-center justify-between">
        <p class="text-gray-700">
          Utilizamos cookies para melhorar sua experiência. Ao continuar navegando, você concorda com nossa política de privacidade.
        </p>
        <button
          class="ml-4 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          on:click={acceptCookies}
        >
          Aceitar
        </button>
      </div>
    </div>
  {/if}

  <!-- Newsletter -->
  <section class="bg-purple-600 py-16">
    <div class="max-w-7xl mx-auto px-4 text-center">
      <h2 class="text-3xl font-bold text-white mb-6">
        Fique por dentro das novidades
      </h2>
      <form
        class="max-w-md mx-auto flex gap-4"
        on:submit|preventDefault={() => toast.success('Newsletter assinada com sucesso!')}
      >
        <input
          type="email"
          placeholder="Seu melhor e-mail"
          class="flex-1 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
        />
        <button
          type="submit"
          class="px-6 py-2 bg-white text-purple-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
        >
          Assinar
        </button>
      </form>
    </div>
  </section>
</div>

<!-- <Toaster /> -->

<style>
  .nav-link {
    @apply text-gray-700 hover:text-purple-600 font-medium transition-colors;
  }

  /* Animações personalizadas */
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }

  .animate-float {
    animation: float 3s ease-in-out infinite;
  }

  /* Estilo para scrollbar personalizado */
  :global(body::-webkit-scrollbar) {
    width: 12px;
  }

  :global(body::-webkit-scrollbar-track) {
    background: #f1f1f1;
  }

  :global(body::-webkit-scrollbar-thumb) {
    background: #9333ea;
    border-radius: 6px;
  }

  :global(body::-webkit-scrollbar-thumb:hover) {
    background: #7e22ce;
  }
</style>

<!-- Products Grid -->
<div class="min-h-screen bg-gradient-to-b from-pink-50 to-white py-12">
  <div class="container mx-auto px-4">
    {#if filteredImages.length === 0}
      <div class="text-center py-12">
        <h2 class="text-2xl text-gray-600">Nenhum produto encontrado</h2>
      </div>
    {:else}
      <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {#each filteredImages as image (image.id)}
          <div in:fly={{ y: 50, duration: 500 }}>
            <CardProduct
              {...image}
              class="h-full transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              />
          </div>
        {/each}
      </div>
    {/if}
  </div>
</div>

<!-- Enhanced Footer -->
<Footer footerType="logo" class="bg-gray-900 text-white">
  <div class="container mx-auto px-4">
    <div class="grid grid-cols-1 gap-8 py-12 md:grid-cols-4">
      <div>
        <FooterBrand
          href="/"
          src="./logo.png"
          alt="Logo"
          name="Digital Store"
          class="mb-4"
        />
        <p class="text-gray-400">Sua loja digital de produtos transformadores</p>
      </div>
      <div>
        <h3 class="mb-4 text-lg font-semibold">Links Rápidos</h3>
        <FooterLinkGroup ulClass="space-y-2">
          <FooterLink href="/about">Sobre Nós</FooterLink>
          <FooterLink href="/products">Produtos</FooterLink>
          <FooterLink href="/blog">Blog</FooterLink>
          <FooterLink href="/contact">Contato</FooterLink>
        </FooterLinkGroup>
      </div>
      <div>
        <h3 class="mb-4 text-lg font-semibold">Suporte</h3>
        <FooterLinkGroup ulClass="space-y-2">
          <FooterLink href="/faq">FAQ</FooterLink>
          <FooterLink href="/shipping">Entrega</FooterLink>
          <FooterLink href="/returns">Devoluções</FooterLink>
          <FooterLink href="/privacy">Privacidade</FooterLink>
        </FooterLinkGroup>
      </div>
      <div>
        <h3 class="mb-4 text-lg font-semibold">Contato</h3>
        <p class="text-gray-400">
          Email: contato@digitalstore.com<br />
          Tel: (11) 99999-9999<br />
          Horário: Seg-Sex, 9h-18h
        </p>
      </div>
    </div>
    <hr class="border-gray-800" />
    <FooterCopyright
      href="/"
      by="Digital Store™"
      class="py-6 text-center text-gray-400"
    />
  </div>
</Footer>