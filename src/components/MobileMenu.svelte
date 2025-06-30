<script>
  import { page } from '$app/stores';
  import { t } from '../lib/i18n/texts.js';
  import ThemeToggle from './ThemeToggle.svelte';

  /** @type {boolean} */
  export let isOpen = false;
  /** @type {() => void} */
  export let onClose = () => {};

  // Links de navegação
  const mainLinks = [
    { href: '/', label: t('LAYOUT.NAV.HOME'), icon: '🏠', disabled: true },
    { href: '/shop', label: t('LAYOUT.NAV.SHOP'), icon: '🛍️', disabled: true },
    { href: '/blog', label: t('LAYOUT.NAV.BLOG'), icon: '📝', disabled: false },
    { href: '/tree', label: t('LAYOUT.NAV.LINKS'), icon: '🌳', disabled: true },
    { href: '/task-doro', label: t('LAYOUT.NAV.TASK_DORO'), icon: '⏰', disabled: true }
  ];

  // Apps em destaque
  const appLinks = [
    { href: '/finance-table', label: 'Finance Table', icon: '💰', disabled: true },
    { href: '/solucoes/cryptostomp', label: 'CryptoStomp', icon: '📈', disabled: true }
  ];

  $: currentPath = $page.url.pathname;

  /** 
   * @param {Event} event 
   * @param {any} link 
   */
  function handleLinkClick(event, link) {
    if (link.disabled) {
      event.preventDefault();
      return false;
    }
    onClose();
  }

  function handleKeydown(event) {
    if (event.key === 'Escape') {
      onClose();
    }
  }

  function handleOverlayClick() {
    onClose();
  }

  function handleOverlayKeydown(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClose();
    }
  }
</script>

<svelte:window onkeydown={handleKeydown} />

{#if isOpen}
  <!-- Overlay -->
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div 
    class="mobile-overlay"
    onclick={handleOverlayClick}
    onkeydown={handleOverlayKeydown}
    role="button"
    tabindex="0"
    aria-label="Fechar menu"
  ></div>

  <!-- Menu -->
  <div class="mobile-menu" role="dialog" aria-modal="true" aria-label="Menu de navegação">
    <!-- Header do Menu -->
    <div class="menu-header">
      <h2 class="menu-title">{t('LAYOUT.NAV.MENU')}</h2>
      <button 
        class="close-button"
        onclick={onClose}
        aria-label="Fechar menu"
      >
        <span class="close-icon">✕</span>
      </button>
    </div>

    <!-- Conteúdo do Menu -->
    <div class="menu-content">
      <!-- Navegação Principal -->
      <div class="menu-section">
        <h3 class="section-title">{t('LAYOUT.NAV.MAIN')}</h3>
        <nav class="menu-nav">
          {#each mainLinks as link}
            <a 
              href={link.href}
              class="menu-link"
              class:active={currentPath === link.href}
              class:disabled={link.disabled}
              aria-disabled={link.disabled}
              onclick={(e) => handleLinkClick(e, link)}
            >
              <span class="link-icon">{link.icon}</span>
              <span class="link-text">{link.label}</span>
            </a>
          {/each}
        </nav>
      </div>

      <!-- Apps -->
      <div class="menu-section">
        <h3 class="section-title">{t('LAYOUT.NAV.APPS')}</h3>
        <nav class="menu-nav">
          {#each appLinks as app}
            <a 
              href={app.href}
              class="menu-link"
              class:active={currentPath.startsWith(app.href)}
              class:disabled={app.disabled}
              aria-disabled={app.disabled}
              onclick={(e) => handleLinkClick(e, app)}
            >
              <span class="link-icon">{app.icon}</span>
              <span class="link-text">{app.label}</span>
            </a>
          {/each}
        </nav>
      </div>

      <!-- Controle de Tema -->
      <div class="menu-section">
        <h3 class="section-title">Tema</h3>
        <div class="theme-section">
          <ThemeToggle />
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  /* Overlay */
  .mobile-overlay {
    position: fixed;
    inset: 0;
    background: var(--bg-overlay);
    z-index: 1001;
    backdrop-filter: blur(4px);
    cursor: pointer;
  }

  /* Menu Container */
  .mobile-menu {
    position: fixed;
    top: 0;
    right: 0;
    width: 100%;
    max-width: 380px;
    height: 100vh;
    background: var(--bg-surface-elevated);
    backdrop-filter: blur(20px);
    border-left: 1px solid var(--border-color);
    z-index: 1002;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    box-shadow: var(--shadow-xl);
    animation: slideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  /* Header do Menu */
  .menu-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--spacing-lg);
    border-bottom: 1px solid var(--border-color);
    background: var(--bg-surface);
  }

  .menu-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--text-primary);
    margin: 0;
  }

  .close-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background: var(--bg-surface-hover);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-full);
    cursor: pointer;
    transition: all var(--transition-fast);
    color: var(--text-muted);
  }

  .close-button:hover {
    background: var(--bg-surface);
    color: var(--text-primary);
    transform: scale(1.05);
  }

  .close-icon {
    font-size: 1.2rem;
    font-weight: bold;
  }

  /* Conteúdo */
  .menu-content {
    flex: 1;
    padding: var(--spacing-lg);
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xl);
  }

  .menu-section {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
  }

  .section-title {
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin: 0;
  }

  /* Navegação */
  .menu-nav {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xs);
  }

  .menu-link {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    padding: var(--spacing-md);
    color: var(--text-secondary);
    text-decoration: none;
    border-radius: var(--radius-lg);
    transition: all var(--transition-fast);
    font-weight: 500;
    border: 1px solid transparent;
  }

  .menu-link:hover {
    background: var(--bg-surface-hover);
    color: var(--text-primary);
    border-color: var(--border-color);
    transform: translateX(4px);
  }

  .menu-link.active {
    background: var(--accent-light);
    color: var(--accent-color);
    border-color: var(--accent-color);
  }

  .menu-link.disabled {
    color: var(--text-muted);
    opacity: 0.4;
    cursor: not-allowed;
    pointer-events: none;
  }

  .menu-link.disabled:hover {
    background: transparent;
    color: var(--text-muted);
    border-color: transparent;
    transform: none;
  }

  .link-icon {
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
  }

  .link-text {
    font-size: 1rem;
  }

  /* Seção de Tema */
  .theme-section {
    display: flex;
    justify-content: center;
    padding: var(--spacing-md);
    background: var(--bg-surface);
    border-radius: var(--radius-lg);
    border: 1px solid var(--border-color);
  }

  /* Responsividade */
  @media (max-width: 480px) {
    .mobile-menu {
      max-width: 100%;
      border-left: none;
    }

    .menu-header {
      padding: var(--spacing-md);
    }

    .menu-content {
      padding: var(--spacing-md);
    }
  }

  /* Animações */
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  /* Accessibility */
  @media (prefers-reduced-motion: reduce) {
    .mobile-menu {
      animation: none;
    }
    
    .menu-link {
      transition: none;
    }
  }
</style> 