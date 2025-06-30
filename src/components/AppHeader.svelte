<script>
  import { onMount } from 'svelte';
  import Logo from './Logo.svelte';
  import Navigation from './Navigation.svelte';
  import MobileMenu from './MobileMenu.svelte';
  import ThemeToggle from './ThemeToggle.svelte';

  // Estado do header (usando $state para Svelte 5)
  let isScrolled = $state(false);
  let isMobileMenuOpen = $state(false);

  onMount(() => {
    // Detectar scroll para mudança visual do header
    const handleScroll = () => {
      isScrolled = window.scrollY > 50;
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  function toggleMobileMenu() {
    isMobileMenuOpen = !isMobileMenuOpen;
  }

  function closeMobileMenu() {
    isMobileMenuOpen = false;
  }
</script>

<header class="app-header" class:scrolled={isScrolled}>
  <div class="container">
    <div class="header-content">
      
      <!-- Logo -->
      <div class="header-brand">
        <Logo />
      </div>

      <!-- Navegação Desktop -->
      <div class="header-nav">
        <Navigation />
      </div>

      <!-- Actions (Tema + Mobile Menu) -->
      <div class="header-actions">
        <!-- Theme Toggle Desktop -->
        <div class="desktop-theme">
          <ThemeToggle />
        </div>

        <!-- Mobile Menu Button -->
        <button 
          class="mobile-menu-toggle"
          onclick={toggleMobileMenu}
          aria-label="Abrir menu de navegação"
          aria-expanded={isMobileMenuOpen}
        >
          <span class="hamburger" class:open={isMobileMenuOpen}>
            <span class="line"></span>
            <span class="line"></span>
            <span class="line"></span>
          </span>
        </button>
      </div>
    </div>
  </div>

  <!-- Mobile Menu -->
  <MobileMenu 
    isOpen={isMobileMenuOpen}
    onClose={closeMobileMenu}
  />
</header>

<style>
  /* Header Container */
  .app-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    background: var(--bg-overlay);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid transparent;
    transition: all var(--transition-cubic);
  }

  .app-header.scrolled {
    background: var(--bg-surface-elevated);
    border-bottom-color: var(--border-color);
    box-shadow: var(--shadow-md);
  }

  /* Container */
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 var(--spacing-lg);
  }

  /* Header Content */
  .header-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 70px;
    gap: var(--spacing-lg);
  }

  /* Brand Section */
  .header-brand {
    flex-shrink: 0;
  }

  /* Navigation Section */
  .header-nav {
    flex: 1;
    display: flex;
    justify-content: center;
  }

  /* Actions Section */
  .header-actions {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    flex-shrink: 0;
  }

  /* Desktop Theme Toggle */
  .desktop-theme {
    display: flex;
  }

  /* Mobile Menu Toggle */
  .mobile-menu-toggle {
    display: none;
    background: none;
    border: none;
    cursor: pointer;
    padding: var(--spacing-sm);
    color: var(--text-primary);
    border-radius: var(--radius-md);
    transition: all var(--transition-fast);
  }

  .mobile-menu-toggle:hover {
    background: var(--bg-surface-hover);
  }

  /* Hamburger Animation */
  .hamburger {
    display: flex;
    flex-direction: column;
    width: 24px;
    height: 20px;
    position: relative;
    justify-content: space-between;
  }

  .line {
    width: 100%;
    height: 2px;
    background: currentColor;
    border-radius: 2px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    transform-origin: center;
  }

  .hamburger.open .line:nth-child(1) {
    transform: rotate(45deg) translate(6px, 6px);
  }

  .hamburger.open .line:nth-child(2) {
    opacity: 0;
    transform: scaleX(0);
  }

  .hamburger.open .line:nth-child(3) {
    transform: rotate(-45deg) translate(6px, -6px);
  }

  /* Responsividade */
  @media (max-width: 1024px) {
    .container {
      padding: 0 var(--spacing-md);
    }
  }

  @media (max-width: 768px) {
    .header-nav {
      display: none;
    }

    .mobile-menu-toggle {
      display: flex;
    }

    .desktop-theme {
      display: none;
    }

    .header-content {
      height: 60px;
    }
  }

  @media (max-width: 480px) {
    .container {
      padding: 0 var(--spacing-sm);
    }

    .header-content {
      gap: var(--spacing-sm);
    }
  }

  /* Skip Navigation */
  .app-header::before {
    content: '';
    position: absolute;
    top: -1px;
    left: var(--spacing-md);
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
  }

  /* Accessibility */
  .app-header:focus-within {
    outline: 2px solid var(--accent-color);
    outline-offset: 2px;
  }

  /* High Contrast Mode */
  @media (prefers-contrast: high) {
    .app-header {
      border-bottom: 2px solid var(--text-primary);
    }
  }

  /* Reduced Motion */
  @media (prefers-reduced-motion: reduce) {
    .app-header,
    .hamburger .line {
      transition: none;
    }
  }
</style> 