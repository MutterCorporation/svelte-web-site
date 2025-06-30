<script>
  import { page } from '$app/stores';
  import { t } from '../lib/i18n/texts.js';

  // Links principais simplificados
  const navLinks = [
    { href: '/', label: t('LAYOUT.NAV.HOME'), icon: '🏠', disabled: true },
    { href: '/shop', label: t('LAYOUT.NAV.SHOP'), icon: '🛍️', disabled: true },
    { href: '/blog', label: t('LAYOUT.NAV.BLOG'), icon: '📝', disabled: false },
    { href: '/tree', label: t('LAYOUT.NAV.LINKS'), icon: '🌳', disabled: true }
  ];

  $: currentPath = $page.url.pathname;

  /** 
   * @param {Event} event 
   * @param {any} link 
   */
  function handleClick(event, link) {
    if (link.disabled) {
      event.preventDefault();
      return false;
    }
  }
</script>

<nav class="navigation" aria-label="Navegação principal">
  <ul class="nav-list">
    {#each navLinks as link}
      <li class="nav-item">
        <a 
          href={link.href}
          class="nav-link"
          class:active={currentPath === link.href}
          class:disabled={link.disabled}
          aria-current={currentPath === link.href ? 'page' : undefined}
          aria-disabled={link.disabled}
          onclick={(e) => handleClick(e, link)}
        >
          <span class="nav-icon" aria-hidden="true">{link.icon}</span>
          <span class="nav-label">{link.label}</span>
        </a>
      </li>
    {/each}
  </ul>
</nav>

<style>
  .navigation {
    display: flex;
    align-items: center;
  }

  .nav-list {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .nav-item {
    margin: 0;
  }

  .nav-link {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    color: var(--text-muted);
    text-decoration: none;
    border-radius: var(--radius-full);
    transition: all var(--transition-fast);
    font-size: 0.875rem;
    font-weight: 500;
    position: relative;
  }

  .nav-link:hover {
    color: var(--text-primary);
    background: var(--bg-surface-hover);
  }

  .nav-link.active {
    color: var(--accent-color);
    background: var(--accent-light);
  }

  .nav-link.disabled {
    color: var(--text-muted);
    opacity: 0.4;
    cursor: not-allowed;
    pointer-events: none;
  }

  .nav-link.disabled:hover {
    color: var(--text-muted);
    background: transparent;
    transform: none;
  }

  .nav-icon {
    font-size: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .nav-label {
    font-weight: 500;
  }

  /* Responsividade */
  @media (max-width: 768px) {
    .navigation {
      display: none; /* Esconde no mobile, será usado no mobile menu */
    }
  }

  @media (max-width: 480px) {
    .nav-link {
      padding: 0.4rem 0.8rem;
      font-size: 0.8rem;
    }

    .nav-icon {
      font-size: 0.9rem;
    }
  }
</style> 