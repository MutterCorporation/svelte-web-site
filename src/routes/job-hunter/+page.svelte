
<svelte:head>
  <title> Job Hunter - Busque profisionais  </title>
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
import Header from '../../components/Header.svelte';


</script>


<div class="w-full bg-gradient-to-r from-gray-200 to-black-900">
	<!-- Header -->
	<Header />
	
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
