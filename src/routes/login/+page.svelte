<script>
  import Hero from "../../components/Hero.svelte";
  import Header from '../../components/Header.svelte';
  import Footer from "../../components/Footer.svelte";
  import Toast from "../../components/Toster.svelte";
  import { Card, Button, Label, Input, Checkbox } from 'flowbite-svelte';

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

  async function login(event) {
    event.preventDefault();
    try {
      const res = await fetch('https://dev.muttercorp.com.br/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      if (res.ok) {
        const data = await res.json();
        console.log(data);
        localStorage.setItem('MutterCorp', data.token);
        showToastMessage('Logged in successfully', 'success');
        window.location.href = '/admin';
      } else {
        const errorData = await res.json();
        showToastMessage(errorData.message || 'Login failed', 'error');
      }
    } catch (error) {
      showToastMessage('Network error', 'error');
    }
  }

  async function loginWithGoogleOauth() {
    try {
      // Redirect to Google OAuth endpoint
      const res = await fetch('https://dev.muttercorp.com.br/auth/google?tenant_code=muttercorp', {
        method: 'GET',
        headers: { 'accept': '*/*' }
      });

        const data = await res.json();
        window.location.href = data.redirect_url;

      if (res.redirected) {
        window.location.href = res.url;
      } else {
        showToastMessage('Google login failed', 'error');
      }
    } catch (error) {
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

<div class='flex justify-center items-center h-screen'> 
  <Card class='bg-blue-400'>
    <form class="flex flex-col space-y-6" onsubmit={login}>
      <h3 class="text-xl font-medium text-gray-900 dark:text-white">Sign in to our platform</h3>
      <Label class="space-y-2">
        <span>Email</span>
        <Input bind:value={username}  name="email" placeholder="username" required />
      </Label>
      <Label class="space-y-2">
        <span>Your password</span>
        <Input bind:value={password} type="password" name="password" placeholder="•••••" required />
      </Label>
      <div class="flex items-start">
        <Checkbox>Remember me</Checkbox>
        <a href="/" class="ms-auto text-sm text-primary-700 hover:underline dark:text-primary-500"> Lost password? </a>
      </div>
      <Button type="submit" class="w-full bg-red-600">Login to your account</Button>
      <Button on:click={loginWithGoogleOauth} class="w-full bg-blue-600">Login with Google</Button>
      <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
        Not registered? <a href="/blue-sky-phase/register" class="text-primary-700 hover:underline dark:text-primary-500"> Create account </a>
      </form>
  </Card>
</div>

{#if showToast}
  <Toast message={toastMessage} type={toastType} />
{/if}
