<script>
  import Hero from "../../components/Hero.svelte";
  import Header from '../../components/Header.svelte';
  import Footer from "../../components/Footer.svelte";
  import Toast from "../../components/Toster.svelte";
  import { Card, Button, Label, Input, Checkbox } from 'flowbite-svelte';

  let username = $state('');
  let password = $state('');
  let showToast = $state(false);
  let toastMessage = $state('');
  let toastType = $state('');

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
      } else {
        const errorData = await res.json();
        showToastMessage(errorData.message || 'Login failed', 'error');
      }
    } catch (error) {
      showToastMessage('Network error', 'error');
    }
  }
</script>


<div class='flex justify-center items-center h-screen'> 
<Card class='bg-blue-400'>
  <form class="flex flex-col space-y-6" action="/">
    <h3 class="text-xl font-medium text-gray-900 dark:text-white">Sign in to our platform</h3>
    <Label class="space-y-2">
      <span>Email</span>
      <Input bind:value={username} type="email" name="email" placeholder="name@company.com" required />
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
    <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
      Not registered? <a href="/" class="text-primary-700 hover:underline dark:text-primary-500"> Create account </a>
    </div>
  </form>
</Card>
</div>

{#if showToast}
  <Toast message={toastMessage} type={toastType} />
{/if}

