<script>
  export let logoSrc = '/logo.png';

  function handleClick() {
    // @ts-ignore
    navigator('/');
  }
</script>

<style>
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: linear-gradient(to right, #f21d41, #230f2b);
    color: #fff;
    padding: 1rem 2rem;
    border-bottom: 1px solid #fff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  
  img {
  position: relative;
  top: 5px;
  width: 300px; /* Largura inicial da imagem */
  height: auto; /* Ajusta a altura proporcionalmente */
  transition: transform 0.5s ease-in-out; /* Transição suave para o zoom */
}

img:hover {
  transform: scale(1.2); /* Aplica o zoom quando o mouse está sobre a imagem */
}

/* Animação de zoom contínuo */
@keyframes zoom {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

/* Aplicar animação à imagem */
img.zoom {
  animation: zoom 5s infinite;
}

  .logo-container {
    display: flex;
    align-items: center;
  }

  .logo {
    width: 50px;
    height: 50px;
    margin-right: 1rem;
  }

  h1 {
    font-size: 1.4rem; /* Ajuste o tamanho conforme necessário */
    margin: 0; /* Remove margem padrão */
  }

 

  /* Media query para telas menores */
  @media (max-width: 768px) {
    header {
      padding: 1rem;
    
    }

    .logo-container {
      margin-bottom: 1rem;
    }

    .logo {
      margin-right: 0;
    }

    nav ul li {
      display: none;
      margin-left: 0;
      margin-bottom: 1rem;
    }
  }
</style>

<header>
  <div class="logo-container">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
    <img src={logoSrc} on:click={handleClick} alt="MutterCorp Logo" class="logo" />
    <h1>MutterCorp</h1>
  </div>

</header>