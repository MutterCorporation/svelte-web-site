<!-- src/routes/+page.svelte -->
<script>
    import Header from '../components/Header.svelte';
    import Body from '../components/Body.svelte';
    import Footer from '../components/Footer.svelte';
	  import Hero from '../components/Hero.svelte';
  </script>
  
  <style>
  
    .container {
      display: flex;
      flex-direction: column;
      min-height: 200vh;
    }

  </style>
  
  <div class="container">
    <Header />
    <!-- <Body /> -->
    
  </div>