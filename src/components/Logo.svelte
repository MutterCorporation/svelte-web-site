<script>
  /** @type {string} */
  export let size = 'md'; // sm, md, lg
  /** @type {boolean} */
  export let showText = true;
  /** @type {string} */
  export let href = '/';

  const sizes = {
    sm: { logo: '24px', text: '1rem' },
    md: { logo: '32px', text: '1.25rem' },
    lg: { logo: '48px', text: '1.5rem' }
  };

  $: currentSize = sizes[size] || sizes.md;
</script>

<a 
  href={href} 
  class="logo-link"
  aria-label="MutterCorp - Página inicial"
>
  <img 
    src="/logo.png" 
    alt="MutterCorp" 
    class="logo-image"
    style="width: {currentSize.logo}; height: {currentSize.logo};"
  />
  {#if showText}
    <span 
      class="logo-text"
      style="font-size: {currentSize.text};"
    >
      MutterCorp
    </span>
  {/if}
</a>

<style>
  .logo-link {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    text-decoration: none;
    color: var(--text-primary);
    font-weight: 600;
    transition: opacity var(--transition-fast);
  }

  .logo-link:hover {
    opacity: 0.8;
  }

  .logo-image {
    transition: transform var(--transition-fast);
  }

  .logo-link:hover .logo-image {
    transform: scale(1.05);
  }

  .logo-text {
    background: var(--gradient-primary);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-weight: 700;
  }
</style> 