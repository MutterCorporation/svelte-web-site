<style>
    .body {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: linear-gradient(to right,#ebebbc,#82b3ae);
      color: #fff;
      text-align: center;
      padding: 2rem;
    }
  
    p {
      font-size: 1.5rem;
      max-width: 600px;
    }
  </style>
  
  <script>
    import Hero from './Hero.svelte';
    import Products from './Products.svelte';
    import About from './About.svelte';
    
    </script>
  
  <div class="body">
    <Hero/>
    <Products />
    <About />
  </div>