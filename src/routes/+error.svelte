<script>
  import { page } from '$app/stores';
  import { t } from '../lib/i18n/texts.js';

  // Estado da página de erro
  let status = $derived($page.status);
  let message = $derived($page.error?.message || '');

  // Rotas sugeridas baseadas no erro
  const suggestedRoutes = [
    { href: '/', label: t('LAYOUT.NAV.HOME'), icon: '🏠' },
    { href: '/shop', label: t('LAYOUT.NAV.SHOP'), icon: '🛍️' },
    { href: '/blog', label: t('LAYOUT.NAV.BLOG'), icon: '📝' },
    { href: '/tree', label: t('LAYOUT.NAV.LINKS'), icon: '🌳' },
    { href: '/task-doro', label: t('LAYOUT.NAV.TASK_DORO'), icon: '⏰' }
  ];

  // Mensagens de erro personalizadas
  /** @param {number} status */
  function getErrorMessage(status) {
    switch (status) {
      case 404:
        return 'Página não encontrada';
      case 500:
        return 'Erro interno do servidor';
      case 403:
        return 'Acesso negado';
      case 401:
        return 'Não autorizado';
      default:
        return 'Algo deu errado';
    }
  }

  /** @param {number} status */
  function getErrorDescription(status) {
    switch (status) {
      case 404:
        return 'A página que você está procurando não existe ou foi movida.';
      case 500:
        return 'Ocorreu um erro interno no servidor. Tente novamente mais tarde.';
      case 403:
        return 'Você não tem permissão para acessar esta página.';
      case 401:
        return 'Você precisa estar logado para acessar esta página.';
      default:
        return 'Ocorreu um erro inesperado. Por favor, tente novamente.';
    }
  }
  
  function goBack() {
    window.history.back();
  }
  
  function reloadPage() {
    window.location.reload();
  }
</script>

<svelte:head>
  <title>Erro {status} - MutterCorp</title>
  <meta name="description" content="Página de erro {status} - {getErrorMessage(status)}">
  <meta name="robots" content="noindex, nofollow">
</svelte:head>

<div class="error-page">
  <!-- Background Effects -->
  <div class="error-background">
    <div class="noise-overlay"></div>
    <div class="grid-overlay"></div>
    <div class="floating-elements">
      <div class="floating-element" style="--delay: 0s; --duration: 8s;">🔧</div>
      <div class="floating-element" style="--delay: 2s; --duration: 10s;">💻</div>
      <div class="floating-element" style="--delay: 4s; --duration: 12s;">⚡</div>
      <div class="floating-element" style="--delay: 6s; --duration: 9s;">🚀</div>
    </div>
  </div>

  <!-- Error Content -->
  <div class="error-content">
    <!-- Status Code -->
    <div class="error-code-container">
      <h1 class="error-code" aria-label="Código de erro {status}">
        {status}
      </h1>
      <div class="error-code-shadow">{status}</div>
    </div>

    <!-- Error Info -->
    <div class="error-info">
      <h2 class="error-title">{getErrorMessage(status)}</h2>
      <p class="error-description">{getErrorDescription(status)}</p>
      
      {#if message}
        <details class="error-details">
          <summary>Detalhes técnicos</summary>
          <code class="error-message">{message}</code>
        </details>
      {/if}
    </div>

    <!-- Navigation Suggestions -->
    <div class="error-navigation">
      <h3 class="nav-title">Onde você gostaria de ir?</h3>
      <div class="nav-grid">
        {#each suggestedRoutes as route}
          <a href={route.href} class="nav-card">
            <span class="nav-icon">{route.icon}</span>
            <span class="nav-label">{route.label}</span>
            <span class="nav-arrow">→</span>
          </a>
        {/each}
      </div>
    </div>

         <!-- Action Buttons -->
     <div class="error-actions">
             <button 
        class="btn btn-primary" 
        onclick={goBack}
        aria-label="Voltar à página anterior"
      >
         ← Voltar
       </button>
       <a href="/" class="btn btn-secondary">
         🏠 Página Inicial
       </a>
             <button 
        class="btn btn-secondary" 
        onclick={reloadPage}
        aria-label="Recarregar página"
      >
         🔄 Tentar Novamente
       </button>
     </div>

    <!-- Contact Support -->
    {#if status >= 500}
      <div class="error-support">
        <p>Se o problema persistir, entre em contato conosco:</p>
        <a href="mailto:suporte@muttercorp.com.br" class="support-link">
          📧 suporte@muttercorp.com.br
        </a>
      </div>
    {/if}
  </div>
</div>

<style>
/* === Error Page Layout === */
.error-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #0f172a, #1e293b, #334155);
}

/* === Background Effects === */
.error-background {
  position: absolute;
  inset: 0;
  z-index: 1;
}

.noise-overlay {
  position: absolute;
  inset: 0;
  opacity: 0.03;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noiseFilter)' opacity='0.5'/%3E%3C/svg%3E");
}

.grid-overlay {
  position: absolute;
  inset: 0;
  background: 
    linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px),
    linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px);
  background-size: 50px 50px;
}

.floating-elements {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.floating-element {
  position: absolute;
  font-size: 2rem;
  opacity: 0.1;
  animation: float var(--duration, 10s) ease-in-out infinite;
  animation-delay: var(--delay, 0s);
}

.floating-element:nth-child(1) { top: 20%; left: 10%; }
.floating-element:nth-child(2) { top: 60%; right: 20%; }
.floating-element:nth-child(3) { bottom: 30%; left: 30%; }
.floating-element:nth-child(4) { top: 40%; right: 10%; }

@keyframes float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  33% { transform: translateY(-20px) rotate(5deg); }
  66% { transform: translateY(10px) rotate(-3deg); }
}

/* === Error Content === */
.error-content {
  text-align: center;
  max-width: 800px;
  position: relative;
  z-index: 2;
}

/* === Error Code === */
.error-code-container {
  position: relative;
  margin-bottom: 2rem;
}

.error-code {
  font-size: clamp(6rem, 15vw, 12rem);
  font-weight: 900;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
  position: relative;
  z-index: 2;
  line-height: 1;
}

.error-code-shadow {
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: clamp(6rem, 15vw, 12rem);
  font-weight: 900;
  color: rgba(0, 0, 0, 0.2);
  z-index: 1;
  line-height: 1;
}

/* === Error Info === */
.error-info {
  margin-bottom: 3rem;
}

.error-title {
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  margin-bottom: 1rem;
  color: white;
  font-weight: 700;
}

.error-description {
  font-size: 1.125rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.error-details {
  margin-top: 1rem;
  text-align: left;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.error-details summary {
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
}

.error-message {
  display: block;
  background: rgba(0, 0, 0, 0.3);
  padding: 1rem;
  border-radius: 0.5rem;
  border-left: 4px solid #ef4444;
  color: #fca5a5;
  font-family: 'Fira Code', monospace;
  font-size: 0.875rem;
  white-space: pre-wrap;
  word-break: break-word;
}

/* === Navigation Suggestions === */
.error-navigation {
  margin-bottom: 3rem;
}

.nav-title {
  font-size: 1.25rem;
  margin-bottom: 1.5rem;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 600;
}

.nav-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  max-width: 600px;
  margin: 0 auto;
}

.nav-card {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.75rem;
  color: white;
  text-decoration: none;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.nav-card:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(59, 130, 246, 0.5);
  transform: translateY(-2px);
}

.nav-icon {
  font-size: 1.25rem;
}

.nav-label {
  flex: 1;
  font-weight: 500;
}

.nav-arrow {
  opacity: 0.5;
  transition: all 0.3s ease;
}

.nav-card:hover .nav-arrow {
  opacity: 1;
  transform: translateX(4px);
}

/* === Action Buttons === */
.error-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 2rem;
}

/* === Support Contact === */
.error-support {
  padding: 1.5rem;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: 0.75rem;
  margin-top: 2rem;
}

.error-support p {
  margin: 0 0 0.5rem;
  color: rgba(255, 255, 255, 0.8);
}

.support-link {
  color: #fca5a5;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
}

.support-link:hover {
  color: #f87171;
}

/* === Responsive === */
@media (max-width: 768px) {
  .error-page {
    padding: 1rem;
  }
  
  .error-actions {
    flex-direction: column;
  }
  
  .nav-grid {
    grid-template-columns: 1fr;
  }
  
  .floating-element {
    font-size: 1.5rem;
  }
}

@media (max-width: 480px) {
  .error-code,
  .error-code-shadow {
    font-size: 4rem;
  }
  
  .error-title {
    font-size: 1.5rem;
  }
  
  .error-description {
    font-size: 1rem;
  }
}

/* === Accessibility === */
@media (prefers-reduced-motion: reduce) {
  .floating-element {
    animation: none;
  }
  
  .nav-card:hover {
    transform: none;
  }
  
  .nav-card:hover .nav-arrow {
    transform: none;
  }
}

@media (prefers-color-scheme: light) {
  .error-page {
    background: linear-gradient(135deg, #f8fafc, #e2e8f0, #cbd5e1);
    color: #1f2937;
  }
  
  .error-title {
    color: #1f2937;
  }
  
  .error-description {
    color: rgba(31, 41, 55, 0.8);
  }
  
  .nav-card {
    background: rgba(255, 255, 255, 0.8);
    color: #1f2937;
    border-color: rgba(31, 41, 55, 0.1);
  }
  
  .nav-card:hover {
    background: rgba(255, 255, 255, 0.95);
  }
}

/* === High Contrast Mode === */
@media (prefers-contrast: high) {
  .error-code {
    -webkit-text-fill-color: #ffffff;
    background: none;
    color: #ffffff;
  }
  
  .nav-card {
    border-width: 2px;
  }
  
  .error-message {
    border-left-width: 6px;
  }
}
</style> 