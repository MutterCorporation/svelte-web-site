<!-- src/routes/+page.svelte -->
<script>
    import Header from '../components/Header.svelte';
    import Body from '../components/Body.svelte';
    import Footer from '../components/Footer.svelte';
  </script>
  
  <style>

    
    :global(body) {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: Arial, sans-serif;
    }
  
    .container {
      display: flex;
      flex-direction: column;
      min-height: 200vh;
    }
  </style>
  
  <div class="container">
    <Header logoSrc="../static/logo.png"  />
    <Body />
    <Footer />
  </div>