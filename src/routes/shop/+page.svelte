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


  let showWelcome = true;
  let categories = ['Todos', 'Investimentos', 'Saúde', 'Educação', 'Entretenimento'];
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

  $: {
    filteredImages = images.filter(image => {
      const matchesCategory = selectedCategory === 'Todos' || image.category === selectedCategory;
      const matchesSearch = image.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           image.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }

  onMount(() => {
    setTimeout(() => {
      showWelcome = false;
    }, 3000);
  });
</script>

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

<!-- Hero Section -->
<div
  class="relative h-[50vh] bg-gradient-to-r from-pink-500 to-purple-600"
  in:fly={{ y: 50, duration: 1000 }}
>
  <div class="absolute inset-0 bg-black/30"></div>
  <div class="container mx-auto flex h-full items-center px-4">
    <div class="relative z-10 text-white">
      <h1 class="mb-4 text-5xl font-bold">Descubra Produtos Incríveis</h1>
      <p class="mb-8 text-xl">Encontre os melhores produtos digitais para transformar sua vida</p>
      <div class="flex gap-4">
        <input
          type="text"
          bind:value={searchQuery}
          placeholder="Buscar produtos..."
          class="w-full max-w-md rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
      </div>
    </div>
  </div>
</div>

<!-- Categories -->
<div class="bg-white py-8">
  <div class="container mx-auto px-4">
    <div class="flex flex-wrap justify-center gap-4">
      {#each categories as category}
        <button
          class="rounded-full px-6 py-2 transition-all {selectedCategory === category ? 'bg-pink-500 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}"
          on:click={() => selectedCategory = category}
        >
          {category}
        </button>
      {/each}
    </div>
  </div>
</div>

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

<!-- Newsletter Section -->
<div class="bg-pink-600 py-16 text-white">
  <div class="container mx-auto px-4 text-center">
    <h2 class="mb-4 text-3xl font-bold">Fique por dentro das novidades</h2>
    <p class="mb-8">Receba ofertas exclusivas e novos lançamentos diretamente no seu e-mail</p>
    <div class="mx-auto flex max-w-md gap-4">
      <input
        type="email"
        placeholder="Seu melhor e-mail"
        class="w-full rounded-lg px-4 py-2 text-gray-800"
      />
      <button class="rounded-lg bg-purple-700 px-6 py-2 font-semibold hover:bg-purple-800">
        Inscrever
      </button>
    </div>
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