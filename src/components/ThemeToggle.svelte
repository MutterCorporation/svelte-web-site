<script>
  import { themeConfig, currentTheme, setTheme, THEMES } from '../lib/themeStore.js';
  
  // Configuração dos temas
  const themeOptions = [
    {
      key: THEMES.AUTO,
      icon: '🌓',
      label: 'Auto',
      description: 'Segue o sistema'
    },
    {
      key: THEMES.LIGHT,
      icon: '☀️',
      label: 'Claro',
      description: 'Tema claro'
    },
    {
      key: THEMES.DARK,
      icon: '🌙',
      label: 'Escuro',
      description: 'Tema escuro'
    }
  ];

  /** @param {string} newTheme */
  function handleThemeChange(newTheme) {
    setTheme(newTheme);
  }

  // Encontra o próximo tema na sequência
  $: nextTheme = (() => {
    const currentIndex = themeOptions.findIndex(t => t.key === $themeConfig);
    const nextIndex = (currentIndex + 1) % themeOptions.length;
    return themeOptions[nextIndex];
  })();

  $: currentOption = themeOptions.find(t => t.key === $themeConfig) || themeOptions[0];
</script>

<!-- Toggle Button -->
<div class="theme-toggle-container">
  <button 
    class="theme-toggle-btn"
    onclick={() => handleThemeChange(nextTheme.key)}
    title="Alternar tema ({currentOption.label} → {nextTheme.label})"
    aria-label="Alternar tema atual: {currentOption.label}"
  >
    <!-- Ícone atual -->
    <span class="theme-icon current" data-theme={$currentTheme}>
      {currentOption.icon}
    </span>
    
    <!-- Ícone do próximo tema (mostrado no hover) -->
    <span class="theme-icon next" data-theme={$currentTheme}>
      {nextTheme.icon}
    </span>
    
    <!-- Indicador de tema atual -->
    <span class="theme-indicator">
      <span class="theme-dot" data-active={$themeConfig === THEMES.AUTO}></span>
      <span class="theme-dot" data-active={$themeConfig === THEMES.LIGHT}></span>
      <span class="theme-dot" data-active={$themeConfig === THEMES.DARK}></span>
    </span>
  </button>

  <!-- Tooltip com informações -->
  <div class="theme-tooltip">
    <div class="tooltip-content">
      <strong>{currentOption.label}</strong>
      <small>{currentOption.description}</small>
      {#if $themeConfig === THEMES.AUTO}
        <small class="system-info">Sistema: {$currentTheme}</small>
      {/if}
    </div>
  </div>
</div>

<style>
  /* Container do Toggle */
  .theme-toggle-container {
    position: relative;
    display: inline-block;
  }

  /* Botão Principal */
  .theme-toggle-btn {
    position: relative;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem;
    background: var(--bg-surface);
    border: 2px solid var(--border-color);
    border-radius: 50px;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    overflow: hidden;
    min-width: 60px;
    justify-content: center;
  }

  .theme-toggle-btn:hover {
    background: var(--bg-surface-hover);
    border-color: var(--accent-color);
    transform: scale(1.05);
    box-shadow: var(--shadow-glow);
  }

  .theme-toggle-btn:active {
    transform: scale(0.95);
  }

  /* Ícones do Tema */
  .theme-icon {
    font-size: 1.2rem;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
  }

  .theme-icon.current {
    opacity: 1;
    transform: scale(1) rotate(0deg);
  }

  .theme-icon.next {
    position: absolute;
    opacity: 0;
    transform: scale(0.8) rotate(-90deg);
    pointer-events: none;
  }

  .theme-toggle-btn:hover .theme-icon.current {
    opacity: 0;
    transform: scale(0.8) rotate(90deg);
  }

  .theme-toggle-btn:hover .theme-icon.next {
    opacity: 1;
    transform: scale(1) rotate(0deg);
  }

  /* Indicadores de Tema */
  .theme-indicator {
    display: flex;
    gap: 2px;
    margin-left: 0.5rem;
  }

  .theme-dot {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: var(--text-muted);
    transition: all 0.3s ease;
    opacity: 0.3;
  }

  .theme-dot[data-active="true"] {
    background: var(--accent-color);
    opacity: 1;
    transform: scale(1.5);
  }

  /* Tooltip */
  .theme-tooltip {
    position: absolute;
    top: calc(100% + 8px);
    left: 50%;
    transform: translateX(-50%);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
    pointer-events: none;
  }

  .theme-toggle-container:hover .theme-tooltip {
    opacity: 1;
    visibility: visible;
    transform: translateX(-50%) translateY(4px);
  }

  .tooltip-content {
    background: var(--bg-surface-elevated);
    color: var(--text-primary);
    padding: 0.75rem 1rem;
    border-radius: 8px;
    border: 1px solid var(--border-color);
    box-shadow: var(--shadow-elevated);
    white-space: nowrap;
    text-align: center;
    backdrop-filter: blur(10px);
  }

  .tooltip-content strong {
    display: block;
    font-size: 0.875rem;
    margin-bottom: 0.25rem;
  }

  .tooltip-content small {
    display: block;
    font-size: 0.75rem;
    color: var(--text-muted);
    line-height: 1.2;
  }

  .system-info {
    margin-top: 0.25rem;
    padding-top: 0.25rem;
    border-top: 1px solid var(--border-color);
    color: var(--accent-color) !important;
    font-weight: 500;
  }

  /* Variantes para diferentes temas */
  .theme-toggle-btn[data-theme="dark"] {
    background: linear-gradient(135deg, #1e1e2e, #2a2a3e);
    border-color: #3e3e5e;
  }

  .theme-toggle-btn[data-theme="light"] {
    background: linear-gradient(135deg, #ffffff, #f8f9fa);
    border-color: #e9ecef;
  }

  /* Responsividade */
  @media (max-width: 768px) {
    .theme-toggle-btn {
      padding: 0.6rem;
      min-width: 50px;
    }
    
    .theme-icon {
      font-size: 1rem;
      width: 20px;
      height: 20px;
    }
    
    .theme-indicator {
      margin-left: 0.25rem;
    }
  }

  /* Animações especiais */
  @keyframes themeSwitch {
    0% { transform: rotate(0deg) scale(1); }
    50% { transform: rotate(180deg) scale(1.2); }
    100% { transform: rotate(360deg) scale(1); }
  }

  .theme-toggle-btn:active .theme-icon {
    animation: themeSwitch 0.6s ease-in-out;
  }

  /* Dark mode específico */
  :global(.dark) .theme-toggle-btn {
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  }

  :global(.light) .theme-toggle-btn {
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }
</style> 