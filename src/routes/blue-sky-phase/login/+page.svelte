<script>
    import Hero from "../../../components/Hero.svelte";
    import Header from '../../../components/Header.svelte';
    import Footer from "../../../components/Footer.svelte";
    import Toast from "../../../components/Toster.svelte";
  
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
        const res = await fetch('https://dev.conteudointimo.com.br/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password })
        });
  
        if (res.ok) {
          const data = await res.json();
          console.log(data);
          localStorage.setItem('MutterCorp', data.token);
          showToastMessage('Logged in successfully', 'success');
          window.location.href = '/blue-sky-phase/premium'
        } else {
          const errorData = await res.json();
          showToastMessage(errorData.message || 'Login failed', 'error');
        }
      } catch (error) {
        showToastMessage('Network error', 'error');
      }
    }
  </script>
  
  <style>
    img {
      width: 120px;
      height: 120px;
    }
  
    :global(body) {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: Arial, sans-serif;
    }
  
    .login-container {
      max-width: 400px;
      margin: 10% auto;
      padding: 2rem;
      box-shadow: 0 10px 8px rgba(0, 0, 0, 0.1);
      border-radius: 8px;
      background: linear-gradient(135deg, #0056a0, #e0e0e0); /* Gradiente azul e cinza */
      text-align: center;
    }
  
    h1 {
      color: #fff;
      margin-bottom: 1.5rem;
    }
  
    .input-group {
      margin-bottom: 1rem;
      text-align: left;
    }
  
    .input-group label {
      display: block;
      margin-bottom: 0.5rem;
      color: #fff;
    }
  
    .input-group input {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
  
    button {
      width: 100%;
      padding: 0.75rem;
      border: none;
      border-radius: 4px;
      background-color: #043151;
      color: #fff;
      font-size: 1rem;
      cursor: pointer;
      transition: background-color 0.3s;
    }
  
    button:hover {
      background-color: #0056b3;
    }
  
    .error {
      color: red;
      text-align: center;
      margin-top: 1rem;
    }
  
    .login-form {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  
    .login-form .input-group, .login-form button {
      width: 100%;
    }
  </style>
  
  <div class="login-container">
    <img src={"/logo.png"} alt="MutterCorp Logo" class="logo" />
    <h1>Login</h1>
    <form class="login-form" onsubmit={login}>
      <div class="input-group">
        <label for="username">Username</label>
        <input type="text" id="username" bind:value={username} placeholder="Enter your username" />
      </div>
      <div class="input-group">
        <label for="password">Password</label>
        <input type="password" id="password" bind:value={password} placeholder="Enter your password" />
      </div>
      <button type="submit">Login</button>
    </form>
    <div style="margin-top: 1rem;">
      <a href="/blue-sky-phase/register">Register</a>
    </div>
  </div>
  
  {#if showToast}
    <Toast message={toastMessage} type={toastType} />
  {/if}
  
  