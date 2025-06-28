<script>
  import Hero from "../../components/Hero.svelte";
  import Header from '../../components/Header.svelte';
  import Footer from "../../components/Footer.svelte";
  import Toast from "../../components/Toster.svelte";
  import { Card, Button, Label, Input, Checkbox } from 'flowbite-svelte';
  import { login as apiLogin } from '../../services/api-service.js';
  import { setAuthToken } from '../../services/api.js';

  let username = '';
  let password = '';
  let showToast = false;
  let toastMessage = '';
  let toastType = '';

  function showToastMessage(message, type) {
    toastMessage = message;
    toastType = type;
    showToast = true;
    setTimeout(() => {
      showToast = false;
    }, 3000);
  }

  async function handleLogin(event) {
    event.preventDefault();
    try {
      const data = await apiLogin(username, password);
      console.log(data);
      setAuthToken(data.token);
      showToastMessage('Logged in successfully', 'success');
      window.location.href = '/admin';
    } catch (error) {
      console.error('Login error:', error);
      showToastMessage(error.message || 'Login failed', 'error');
    }
  }

  async function handleGoogleLogin() {
    try {
      window.location.href = 'https://dev.muttercorp.com.br/auth/google?tenant_code=muttercorp';
    } catch (error) {
      console.log(error);
      showToastMessage('Network error', 'error');
    }
  }
</script>

<svelte:head>
  <title>Login | MutterCorp</title>
  <meta name="description" content="Acesse sua conta MutterCorp para gerenciar suas aplicações" />
  <meta name="keywords" content="Login, MutterCorp, Acesso, Autenticação" />
  <meta name="author" content="MutterCorp" />
  <meta property="og:title" content="Login | MutterCorp" />
  <meta property="og:description" content="Acesse sua conta MutterCorp para gerenciar suas aplicações" />
  <meta property="og:url" content="https://muttercorp.com.br/login" />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary" />
</svelte:head>

<div class="flex min-h-screen items-center justify-center bg-gray-50 p-4">
  <Card class="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
    <form class="flex flex-col space-y-6" on:submit|preventDefault={handleLogin}>
      <h3 class="text-2xl font-semibold text-gray-900 dark:text-white text-center">Acesse sua conta</h3>

      <Label class="space-y-2">
        <span class="text-gray-700 dark:text-gray-300 font-medium">Email</span>
        <Input 
          bind:value={username}  
          name="email" 
          placeholder="Digite seu email" 
          required 
          class="focus:ring-red-500 focus:border-red-500" />
      </Label>

      <Label class="space-y-2">
        <span class="text-gray-700 dark:text-gray-300 font-medium">Senha</span>
        <Input 
          bind:value={password} 
          type="password" 
          name="password" 
          placeholder="••••••••" 
          required 
          class="focus:ring-red-500 focus:border-red-500" />
      </Label>

      <div class="flex items-center justify-between">
        <Checkbox id="remember" />
        <label for="remember" class="text-sm text-gray-600 dark:text-gray-400 select-none">Lembrar-me</label>

        <a href="/" class="text-sm text-red-600 hover:underline dark:text-red-400">Esqueceu a senha?</a>
      </div>

      <Button type="submit" class="w-full bg-red-600 hover:bg-red-700 focus:ring-red-500">Entrar</Button>

      <Button on:click={handleGoogleLogin} type="button" class="w-full bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 mt-2">
        Entrar com Google
      </Button>

      <p class="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
        Não tem uma conta? 
        <a href="/blue-sky-phase/register" class="text-red-600 hover:underline dark:text-red-400"> Crie uma aqui </a>
      </p>
    </form>
  </Card>
</div>

{#if showToast}
  <Toast message={toastMessage} type={toastType} />
{/if}
