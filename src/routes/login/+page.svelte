<script>
    import Hero from "../../components/Hero.svelte";
    import Header from '../../components/Header.svelte';
    import Footer from "../../components/Footer.svelte";
  
    let username = '';
    let password = '';
  
    async function login() {
        const res = await fetch('http://localhost:3001/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
  
        if (res.ok) {
            const data = await res.json();
            console.log(data)
            localStorage.setItem('MutterCorp', data.token);
            alert('Logged in');
        } else {
            alert('Login failed');
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
        background: linear-gradient(to right, #f21d41, #230f2b);
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
  
  <Header />
  <div class="login-container">
    <img src={"/logo.png"} alt="MutterCorp Logo" class="logo" />
    <h1>Login</h1>
    <div class="login-form">
      <div class="input-group">
          <label for="username">Username</label>
          <input type="text" id="username" bind:value={username} placeholder="Enter your username" />
      </div>
      <div class="input-group">
          <label for="password">Password</label>
          <input type="password" id="password" bind:value={password} placeholder="Enter your password" />
      </div>
      <button on:click={login}> Login</button>
      <div class="error" hidden={true}>Login failed</div>
    </div>
    <div style="margin-top: 1rem;">
        <a href="/register">Register</a>
    </div>
  </div>
  <Footer />
  