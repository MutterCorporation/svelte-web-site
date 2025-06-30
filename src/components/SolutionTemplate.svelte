<!-- Template para páginas de soluções -->
<script>
  import { fade, fly } from 'svelte/transition';
  import Header from './Header.svelte';
  import { t } from '../lib/i18n/texts.js';
  
  /** @type {string} */
  export let title = '';
  /** @type {string} */
  export let subtitle = '';
  /** @type {string} */
  export let description = '';
  /** @type {string[]} */
  export let features = [];
  /** @type {string} */
  export let icon = '🚀';
  /** @type {string} */
  export let gradient = 'from-blue-600 to-purple-600';

  let showContactForm = false;
  let formData = { name: '', email: '', phone: '', message: '' };
  let loading = false;
  let success = false;
  let error = false;

  async function submitForm() {
    loading = true;
    try {
      const response = await fetch('https://dev.muttercorp.com.br/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, service: title })
      });
      
      if (response.ok) {
        success = true;
        formData = { name: '', email: '', phone: '', message: '' };
        setTimeout(() => { showContactForm = false; success = false; }, 3000);
      } else {
        error = true;
      }
    } catch (err) {
      error = true;
    } finally {
      loading = false;
    }
  }
</script>

<svelte:head>
  <title>{title} - MutterCorp</title>
  <meta name="description" content={description} />
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
  <Header />

  <!-- Hero Section -->
  <section class="relative pt-32 pb-20">
    <div class="container mx-auto px-4">
      <div class="max-w-4xl mx-auto text-center" in:fly={{ y: 50, duration: 1000 }}>
        <div class="text-6xl mb-6">{icon}</div>
        <h1 class="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r {gradient} bg-clip-text text-transparent">
          {title}
        </h1>
        <p class="text-xl md:text-2xl text-gray-300 mb-8">
          {subtitle}
        </p>
        <p class="text-lg text-gray-400 mb-12 leading-relaxed">
          {description}
        </p>
        
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            on:click={() => showContactForm = true}
            class="px-8 py-4 bg-gradient-to-r {gradient} rounded-full font-semibold transition-all hover:scale-105"
          >
            {t('COMMON.SUBMIT')}
          </button>
          <a
            href="#features"
            class="px-8 py-4 border border-white/20 rounded-full font-semibold hover:bg-white/10 transition-all"
          >
            Ver Detalhes
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- Features Section -->
  <section id="features" class="py-20 bg-black/30">
    <div class="container mx-auto px-4">
      <h2 class="text-4xl font-bold text-center mb-16 bg-gradient-to-r {gradient} bg-clip-text text-transparent">
        Recursos Principais
      </h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {#each features as feature, i}
          <div 
            class="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-blue-500/50 transition-all"
            in:fly={{ y: 50, duration: 500, delay: i * 100 }}
          >
            <div class="text-3xl mb-4">✨</div>
            <h3 class="text-xl font-semibold mb-3 text-white">{feature}</h3>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- CTA Section -->
  <section class="py-20">
    <div class="container mx-auto px-4">
      <div class="bg-gradient-to-r {gradient} rounded-3xl p-12 text-center max-w-4xl mx-auto">
        <h2 class="text-4xl font-bold mb-6 text-white">
          Pronto para começar?
        </h2>
        <p class="text-xl mb-8 text-white/90">
          Entre em contato conosco e descubra como podemos transformar seu negócio com {title}
        </p>
        <button
          on:click={() => showContactForm = true}
          class="px-8 py-4 bg-white text-gray-900 rounded-full font-semibold hover:bg-gray-100 transition-all"
        >
          Falar com Especialista
        </button>
      </div>
    </div>
  </section>

  <!-- Contact Form Modal -->
  {#if showContactForm}
    <div 
      class="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
      in:fade={{ duration: 300 }}
    >
      <div 
        class="bg-gray-900 rounded-2xl p-8 max-w-md w-full border border-white/20"
        in:fly={{ y: 50, duration: 300 }}
      >
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-2xl font-bold text-white">Solicitar Orçamento</h3>
          <button
            on:click={() => showContactForm = false}
            class="text-gray-400 hover:text-white"
          >
            ✕
          </button>
        </div>

        <form on:submit|preventDefault={submitForm} class="space-y-4">
          <!-- Campo Nome -->
          <div>
            <label for="name" class="block text-sm font-medium text-gray-300 mb-2">
              {t('COMMON.NAME')}
            </label>
            <input
              id="name"
              type="text"
              bind:value={formData.name}
              required
              class="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:border-blue-500 focus:outline-none"
              placeholder={t('HOMEPAGE.FORM_NAME_PLACEHOLDER')}
            />
          </div>

          <!-- Campo Email -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-300 mb-2">
              {t('COMMON.EMAIL')}
            </label>
            <input
              id="email"
              type="email"
              bind:value={formData.email}
              required
              class="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:border-blue-500 focus:outline-none"
              placeholder={t('HOMEPAGE.FORM_EMAIL_PLACEHOLDER')}
            />
          </div>

          <!-- Campo Telefone -->
          <div>
            <label for="phone" class="block text-sm font-medium text-gray-300 mb-2">
              {t('COMMON.PHONE')}
            </label>
            <input
              id="phone"
              type="tel"
              bind:value={formData.phone}
              required
              class="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:border-blue-500 focus:outline-none"
              placeholder={t('HOMEPAGE.FORM_PHONE_PLACEHOLDER')}
            />
          </div>

          <!-- Campo Mensagem -->
          <div>
            <label for="message" class="block text-sm font-medium text-gray-300 mb-2">
              {t('COMMON.MESSAGE')}
            </label>
            <textarea
              id="message"
              bind:value={formData.message}
              rows="4"
              class="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:border-blue-500 focus:outline-none"
              placeholder={t('HOMEPAGE.FORM_MESSAGE_PLACEHOLDER')}
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={loading}
            class="w-full px-6 py-3 bg-gradient-to-r {gradient} text-white rounded-lg font-semibold hover:opacity-90 transition-all disabled:opacity-50"
          >
            {loading ? t('HOMEPAGE.FORM_SENDING') : t('COMMON.SUBMIT')}
          </button>

          {#if success}
            <div class="text-green-400 text-center text-sm">
              {t('HOMEPAGE.FORM_SUCCESS')}
            </div>
          {/if}

          {#if error}
            <div class="text-red-400 text-center text-sm">
              {t('HOMEPAGE.FORM_ERROR')}
            </div>
          {/if}
        </form>
      </div>
    </div>
  {/if}
</div>

<style>
  :global(body) {
    @apply bg-gray-900;
  }
</style> 