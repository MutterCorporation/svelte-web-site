<script>
    let username = '';
    let password = '';
  
    async function login() {
      const res = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
  
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem('token', data.token);
        alert('Logged in');
      } else {
        alert('Login failed');
      }
    }
  </script>
  
  <style>
    .login-container {
      max-width: 400px;
      margin: 0 auto;
      padding: 2rem;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      border-radius: 8px;
      background-color: #fff;
    }
    
    h1 {
      text-align: center;
      margin-bottom: 1.5rem;
      color: #333;
    }
  
    .input-group {
      margin-bottom: 1rem;
    }
  
    .input-group label {
      display: block;
      margin-bottom: 0.5rem;
      color: #555;
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
      background-color: #007BFF;
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
  </style>
  
  <div class="login-container">
    <h1>Login</h1>
    <div class="input-group">
      <label for="username">Username</label>
      <input type="text" id="username" bind:value={username} placeholder="Enter your username" />
    </div>
    <div class="input-group">
      <label for="password">Password</label>
      <input type="password" id="password" bind:value={password} placeholder="Enter your password" />
    </div>
    <button on:click={login}>Login</button>
    <div class="error" hidden={true}>Login failed</div>
  </div>
  