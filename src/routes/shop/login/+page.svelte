<script>
    import { fade, fly } from 'svelte/transition';
    
    let isLogin = true; // true para login, false para registro
    let email = '';
    let password = '';
    let name = '';
    let confirmPassword = '';
    let rememberMe = false;
    let loading = false;
    let error = '';
  
    const handleSubmit = async () => {
      loading = true;
      error = '';
  
      try {
        // Simular delay de requisição
        await new Promise(resolve => setTimeout(resolve, 1000));
  
        if (isLogin) {
          // Implementar lógica de login
          console.log('Login:', { email, password });
        } else {
          // Implementar lógica de registro
          if (password !== confirmPassword) {
            throw new Error('As senhas não coincidem');
          }
          console.log('Registro:', { name, email, password });
        }
  
        // Redirecionar após sucesso
        window.location.href = '/dashboard';
      } catch (err) {
        error = err.message || 'Ocorreu um erro. Tente novamente.';
      } finally {
        loading = false;
      }
    };
  
    const toggleForm = () => {
      isLogin = !isLogin;
      error = '';
    };
  </script>
  
  <main class="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
    <div 
      class="w-full max-w-md"
      in:fade={{ duration: 300 }}
    >
      <!-- Logo/Marca -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
          {isLogin ? 'Bem-vindo de volta!' : 'Crie sua conta'}
        </h1>
        <p class="text-gray-600 mt-2">
          {isLogin ? 'Faça login para continuar' : 'Preencha seus dados para começar'}
        </p>
      </div>
  
      <!-- Card do Formulário -->
      <div 
        class="bg-white rounded-2xl shadow-xl p-8"
        in:fly={{ y: 20, duration: 300 }}
      >
        <!-- Mensagem de Erro -->
        {#if error}
          <div class="bg-red-50 text-red-700 p-4 rounded-lg mb-6" transition:fade>
            {error}
          </div>
        {/if}
  
        <!-- Formulário -->
        <form on:submit|preventDefault={handleSubmit} class="space-y-6">
          <!-- Campo Nome (apenas registro) -->
          {#if !isLogin}
            <div class="space-y-2">
              <label for="name" class="block text-sm font-medium text-gray-700">
                Nome completo
              </label>
              <input
                type="text"
                id="name"
                bind:value={name}
                required
                class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 
                       focus:border-blue-500 transition-all"
                placeholder="Digite seu nome"
              />
            </div>
          {/if}
  
          <!-- Campo Email -->
          <div class="space-y-2">
            <label for="email" class="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              bind:value={email}
              required
              class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 
                     focus:border-blue-500 transition-all"
              placeholder="seu@email.com"
            />
          </div>
  
          <!-- Campo Senha -->
          <div class="space-y-2">
            <label for="password" class="block text-sm font-medium text-gray-700">
              Senha
            </label>
            <input
              type="password"
              id="password"
              bind:value={password}
              required
              class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 
                     focus:border-blue-500 transition-all"
              placeholder="••••••••"
            />
          </div>
  
          <!-- Confirmar Senha (apenas registro) -->
          {#if !isLogin}
            <div class="space-y-2">
              <label for="confirmPassword" class="block text-sm font-medium text-gray-700">
                Confirmar senha
              </label>
              <input
                type="password"
                id="confirmPassword"
                bind:value={confirmPassword}
                required
                class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 
                       focus:border-blue-500 transition-all"
                placeholder="••••••••"
              />
            </div>
          {/if}
  
          <!-- Opções adicionais (apenas login) -->
          {#if isLogin}
            <div class="flex items-center justify-between">
              <label class="flex items-center">
                <input
                  type="checkbox"
                  bind:checked={rememberMe}
                  class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span class="ml-2 text-sm text-gray-600">Lembrar-me</span>
              </label>
              <a href="/forgot-password" class="text-sm text-blue-600 hover:text-blue-800">
                Esqueceu a senha?
              </a>
            </div>
          {/if}
  
          <!-- Botão Submit -->
          <button
            type="submit"
            disabled={loading}
            class="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg
                   hover:from-blue-700 hover:to-blue-800 transform hover:scale-[1.02] transition-all
                   disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {#if loading}
              <span class="inline-block animate-spin mr-2">↻</span>
              Carregando...
            {:else}
              {isLogin ? 'Entrar' : 'Criar conta'}
            {/if}
          </button>
        </form>
  
        <!-- Alternar entre Login/Registro -->
        <div class="mt-6 text-center">
          <p class="text-gray-600">
            {isLogin ? 'Ainda não tem uma conta?' : 'Já tem uma conta?'}
            <button
              on:click={toggleForm}
              class="text-blue-600 hover:text-blue-800 font-medium ml-1"
            >
              {isLogin ? 'Criar conta' : 'Fazer login'}
            </button>
          </p>
        </div>
  
        <!-- Divisor -->
        <div class="relative mt-6">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-300"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 bg-white text-gray-500">Ou continue com</span>
          </div>
        </div>
  
        <!-- Botões de Social Login -->
        <div class="mt-6 grid grid-cols-2 gap-4">
          <button
            class="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg
                   hover:bg-gray-50 transition-colors"
          >
            <img src="/api/placeholder/24/24" alt="Google" class="w-6 h-6 mr-2" />
            Google
          </button>
          <button
            class="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg
                   hover:bg-gray-50 transition-colors"
          >
            <img src="/api/placeholder/24/24" alt="Facebook" class="w-6 h-6 mr-2" />
            Facebook
          </button>
        </div>
      </div>
    </div>
  </main>