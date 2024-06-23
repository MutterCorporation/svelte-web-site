<script>
  export let logoSrc = '/assets/logo.png';
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

  nav {
    flex-grow: 1; /* Ocupa o espaço disponível */
    text-align: right; /* Alinha os links à direita em telas pequenas */
  }

  nav ul {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    justify-content: flex-end; /* Alinha os itens à direita */
  }

  nav ul li {
    margin-left: 2rem;
  }

  nav ul li a {
    color: #fff;
    text-decoration: none;
    font-weight: bold;
  }

  nav ul li a:hover {
    text-decoration: underline;
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
    <img src={logoSrc} alt="MutterCorp Logo" class="logo" />
    <h1>MutterCorp</h1>
  </div>

</header>