<script>
import "../app.css";
import { page } from '$app/stores';
import { onMount } from 'svelte';
import { initTheme } from '../lib/themeStore.js';

// Componentes
import AppHeader from '../components/AppHeader.svelte';
import AppFooter from '../components/AppFooter.svelte';

/** @type {{children?: import('svelte').Snippet}} */
let { children } = $props();

// Rotas especiais que não devem mostrar a navegação
const hideNavRoutes = ['/admin', '/login'];

onMount(() => {
  // Inicializar sistema de tema
  initTheme();
});

// Verificar se deve mostrar navegação
let showNav = $derived(!hideNavRoutes.some(route => $page.url.pathname.startsWith(route)));
let currentPath = $derived($page.url.pathname);
</script>

<svelte:head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  
  <!-- PWA Meta Tags -->
  <meta name="theme-color" content="#000000" />
  <meta name="application-name" content="MutterCorp" />
  <meta name="apple-mobile-web-app-title" content="MutterCorp" />
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
  
  <!-- SEO -->
  <meta name="robots" content="index, follow" />
  <meta name="author" content="MutterCorp" />
  <link rel="canonical" href="https://muttercorp.com.br{currentPath}" />
</svelte:head>

<div id="app" class="app-container">
  <!-- Skip to main content (accessibility) -->
  <a href="#main-content" class="skip-link">Pular para o conteúdo principal</a>

  <!-- Header -->
  {#if showNav}
    <AppHeader />
  {/if}

  <!-- Main Content -->
  <main id="main-content" class="main-content" class:has-nav={showNav}>
    {@render children?.()}
  </main>

  <!-- Footer -->
  {#if showNav}
    <AppFooter />
  {/if}
</div>

<style>
  /* === App Container === */
  .app-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background: var(--bg-primary);
    color: var(--text-primary);
  }

  /* === Skip Link (Accessibility) === */
  .skip-link {
    position: absolute;
    top: -40px;
    left: 6px;
    background: var(--accent-color);
    color: white;
    padding: 8px;
    text-decoration: none;
    border-radius: 4px;
    z-index: 10000;
    transition: top 0.3s;
  }

  .skip-link:focus {
    top: 6px;
  }

  /* === Main Content === */
  .main-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    position: relative;
  }

  .main-content.has-nav {
    padding-top: 70px; /* Height of fixed header */
  }

  /* === Global Styles === */
  :global(body) {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
    background: var(--bg-primary);
    color: var(--text-primary);
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  :global(*),
  :global(*::before),
  :global(*::after) {
    box-sizing: border-box;
  }

  :global(html) {
    scroll-behavior: smooth;
  }

  /* === Scrollbar Customization === */
  :global(::-webkit-scrollbar) {
    width: 8px;
    height: 8px;
  }

  :global(::-webkit-scrollbar-track) {
    background: var(--bg-surface);
  }

  :global(::-webkit-scrollbar-thumb) {
    background: var(--gradient-primary);
    border-radius: 4px;
  }

  :global(::-webkit-scrollbar-thumb:hover) {
    background: var(--accent-color);
  }

  /* === Focus Management === */
  :global(:focus-visible) {
    outline: 2px solid var(--accent-color);
    outline-offset: 2px;
    border-radius: 4px;
  }

  :global(:focus:not(:focus-visible)) {
    outline: none;
  }

  /* === Text Selection === */
  :global(::selection) {
    background: var(--accent-light);
    color: var(--accent-color);
  }

  /* === Form Elements Adaptation === */
  :global(input),
  :global(textarea),
  :global(select) {
    background: var(--bg-surface) !important;
    color: var(--text-primary) !important;
    border-color: var(--border-color) !important;
  }

  :global(input:focus),
  :global(textarea:focus),
  :global(select:focus) {
    border-color: var(--accent-color) !important;
    box-shadow: 0 0 0 3px var(--accent-light) !important;
  }

  /* === Placeholder Styles === */
  :global(::placeholder) {
    color: var(--text-muted);
    opacity: 1;
  }

  /* === Button Reset === */
  :global(button) {
    font-family: inherit;
    cursor: pointer;
  }

  /* === Link Styles === */
  :global(a) {
    color: var(--accent-color);
    transition: color var(--transition-fast);
  }

  :global(a:hover) {
    color: var(--accent-hover);
  }

  /* === Responsive Images === */
  :global(img) {
    max-width: 100%;
    height: auto;
  }

  /* === Accessibility === */
  @media (prefers-reduced-motion: reduce) {
    :global(*) {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
    
    :global(html) {
      scroll-behavior: auto;
    }
  }

  /* === High Contrast Mode === */
  @media (prefers-contrast: high) {
    :global(*) {
      border-width: 2px !important;
    }
  }

  /* === Print Styles === */
  @media print {
    .skip-link {
      display: none;
    }
    
    .main-content.has-nav {
      padding-top: 0;
    }
  }

  /* === Container Utility === */
  :global(.container) {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 var(--spacing-lg);
  }

  @media (max-width: 1024px) {
    :global(.container) {
      padding: 0 var(--spacing-md);
    }
  }

  @media (max-width: 768px) {
    :global(.container) {
      padding: 0 var(--spacing-sm);
    }
    
    .main-content.has-nav {
      padding-top: 60px; /* Mobile header height */
    }
  }
</style>
