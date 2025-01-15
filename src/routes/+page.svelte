
<svelte:head>
  <title> MutterCorp - Serviços em Tecnologia </title>
  <meta name="description" content="Descubra os melhores produtos e serviços para sua vida no MutterCorp.">
  <meta name="keywords" content="Tecnologia, Ciência, Música, Blog, Desenvolvimento, Svelte, JavaScript">
  <meta name="author" content="Maikon Weber">
  <meta property="og:title" content=" Tecnologia, Ciência e Música">
  <meta property="og:description" content="Descubra os melhores produtos e serviços para sua vida no MutterCorp.">
  <meta property="og:url" content="https://muttercorp.com.br/">
  <meta property="og:type" content="website">
</svelte:head>


<!-- src/routes/+page.svelte -->
<script>
// @ts-nocheck
	import Header from '../components/Header.svelte';
	import Body from '../components/Body.svelte';
	import Hero from '../components/Hero.svelte';
	import { Footer, FooterBrand, FooterCopyright, FooterLink, FooterLinkGroup } from 'flowbite-svelte';
	import Carousell from '../components/Carousell.svelte';
	import CardProduct from '../components/Card.svelte';
	import About from '../components/About.svelte';


	let images =  [{
		
    alt: "Agende postagens na rede social Bluesky utilizando uma interface simples e intuitiva",
    title: "Blueske Phase", 
	all: "blue-sky-phase",
	slug: 'liberdade-do-tabaco'
},
  {
    alt: "Tenha informações sobre o mercado de criptomoedas em tempo real e sinais de compra e venda, tudo em um só lugar",
    title: "Cryptostomp",
	all: "cryptostomp",
	slug: 'liberdade-do-tabaco'
},
  {
    alt: "Realizamos a contagem de sinais de roleta para você, de forma rápida e precisa",
    title: "Sinais da Roleta",
	all: "sinais-da-roleta",
	slug: 'binance-refer'
	},
]



</script>


<div class="w-full bg-gradient-to-r from-gray-200 to-black-900">
	<!-- Header -->
	<Header />
	
	<!-- Main Content -->
	<!-- <Carousell /> -->
	<div class="container mx-auto">
	  <!-- Carousel -->
  
	  <!-- Hero Section -->
	  <!-- <div class='p-4 md:p-8 lg:p-12 xl:p-16 2xl:p-24 bg-gradient-to-r from-blue-900 to-red-700'> -->
	<Hero title="Bem-vindo à MutterCorp" 
			  subtitle="Aqui você encontra os melhores produtos e serviços para sua vida" />
	  <!-- </div> -->
	  <!-- <About /> -->
	  <!-- Products Grid Section -->
	  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
		{#each images as image}
		  <CardProduct
			title={image.title}
			description={image.alt}
			all={image.all}
			/>
				
		{/each}
	  </div>
	</div>

	<!-- Footer -->
	<Footer class="bg-gradient-to-r from-gray-800 to-gray-100" footerType="logo">
	  <div class="sm:flex sm:items-center sm:justify-between p-4">
		<FooterBrand class='text-gray-100' href="https://muttercorp.com.br" src="logo.png" alt="MutterCorp Logo" name="" />
		<FooterLinkGroup ulClass="flex flex-wrap items-center text-sm text-gray-100 dark:text-black-100">
		  <FooterLink class='' href="/about">About</FooterLink>
		  <FooterLink href="/policy">Privacy Policy</FooterLink>
		  <FooterLink href="/licensing">Licensing</FooterLink>
		  <FooterLink href="/contact">Contact</FooterLink>
		</FooterLinkGroup>
	  </div>
	  <hr class="my-6 border-gray-100 dark:border-gray-100" />
	  <FooterCopyright class='text-red-900' href="/" by="MutterCorp" />
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
