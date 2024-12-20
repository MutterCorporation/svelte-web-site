<!-- src/routes/+page.svelte -->
<script>
	import Header from '../components/Header.svelte';
	import Body from '../components/Body.svelte';
	import Hero from '../components/Hero.svelte';
	import { Footer, FooterBrand, FooterCopyright, FooterLink, FooterLinkGroup } from 'flowbite-svelte';
	import Carousell from '../components/Carousell.svelte';
	import CardProduct from '../components/CardProduct.svelte';

	let images =  [{
		
    alt: "Agende postagens na rede social Bluesky utilizando uma interface simples e intuitiva",
    src: "https://conteudointimo.s3.amazonaws.com/a13551f4122b6fbeba740de5916d62ad43b68b061d4ef5e5f9e7ae6727d02d8c.png",
    title: "Blueske Phase"
  },
  {
    alt: "Tenha informações sobre o mercado de criptomoedas em tempo real e sinais de compra e venda, tudo em um só lugar",
    src: "https://conteudointimo.s3.amazonaws.com/a13551f4122b6fbeba740de5916d62ad43b68b061d4ef5e5f9e7ae6727d02d8c.png",
    title: "Cryptostomp"
  },
  {
    alt: "Realizamos a contagem de sinais de roleta para você, de forma rápida e precisa",
    src: "https://conteudointimo.s3.amazonaws.com/a13551f4122b6fbeba740de5916d62ad43b68b061d4ef5e5f9e7ae6727d02d8c.png",
    title: "Sinais da Roleta"
  },
//   {
//     alt: "Agencia de Viagens com os melhores preços e destinos",
//     src: "",
//     title: "Albatroz Viagens"
//   }
]

</script>


<div class="w-full bg-gradient-to-r from-blue-900 to-red-700">
	<!-- Header -->
	<Header />
  
	<!-- Main Content -->
	<!-- <Carousell /> -->
	<div class="container mx-auto">
	  <!-- Carousel -->
  
	  <!-- Hero Section -->
	  <div class='p-4 md:p-8 lg:p-12 xl:p-16 2xl:p-24 bg-gradient-to-r from-blue-900 to-red-700'>
		<Hero title="Bem-vindo à MutterCorp" 
			  subtitle="Aqui você encontra os melhores produtos e serviços para sua vida" />
	  </div>
  
	  <!-- Products Grid Section -->
	  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
		{#each images as image}
		  <CardProduct
			title={image.title}
			description={image.alt}
			picture={image.src}
		  />
		{/each}
	  </div>
	</div>
  
	<!-- Footer -->
	<Footer class="bg-gradient-to-r from-red-700 to-blue-800" footerType="logo">
	  <div class="sm:flex sm:items-center sm:justify-between p-4">
		<FooterBrand class='text-gray-100' href="https://muttercorp.com.br" src="logo.png" alt="MutterCorp Logo" name="MutterCorp" />
		<FooterLinkGroup ulClass="flex flex-wrap items-center text-sm text-gray-100 dark:text-black-100">
		  <FooterLink class='' href="/about">About</FooterLink>
		  <FooterLink href="/policy">Privacy Policy</FooterLink>
		  <FooterLink href="/licensing">Licensing</FooterLink>
		  <FooterLink href="/contact">Contact</FooterLink>
		</FooterLinkGroup>
	  </div>
	  <hr class="my-6 border-gray-100 dark:border-gray-100" />
	  <FooterCopyright class='text-gray-100' href="/" by="MutterCorp" />
	</Footer>
  </div>
  
  <style>
	.container {
	  display: flex;
	  flex-direction: column;
	  align-items: center;
	  justify-content: center;
	  min-height: 100vh; /* This ensures full-page height */
	}
  </style>
