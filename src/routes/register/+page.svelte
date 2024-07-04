<script>
  import Header from "../../components/Header.svelte";
  import Toast from "../../components/Toster.svelte";

  let username = '';
  let email = '';
  let password = '';
  let confirmPassword = '';
  let fullName = '';
  let toastMessage = '';
  let toastType = 'info';
  let showToast = false;

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePassword = (password) => /^(?=.*[A-Z])(?=.*[!@#$&*]).{8,}$/.test(password);

  const showToastMessage = (message, type) => {
    toastMessage = message;
    toastType = type;
    showToast = true;
    setTimeout(() => showToast = false, 3000);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (username.length > 20) {
      showToastMessage('O nome de usuário deve ter no máximo 20 caracteres.', 'error');
      return;
    }

    if (!validateEmail(email)) {
      showToastMessage('Por favor, insira um email válido.', 'error');
      return;
    }

    if (!validatePassword(password)) {
      showToastMessage('A senha deve ter pelo menos 8 caracteres, incluindo uma letra maiúscula e um símbolo.', 'error');
      return;
    }

    if (password !== confirmPassword) {
      showToastMessage('As senhas não coincidem!', 'error');
      return;
    }

    if (fullName.length > 90) {
      showToastMessage('O nome completo deve ter no máximo 90 caracteres.', 'error');
      return;
    }

    console.log('Usuário:', username);
    console.log('Email:', email);
    console.log('Senha:', password);
    console.log('Nome Completo:', fullName);

    // Aqui você pode adicionar a lógica para enviar os dados para o backend
    showToastMessage('Registro bem-sucedido!', 'success');
  };
</script>

<style>
  .container {
    margin-top: 10%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40px;
    height: 100%;
    background: linear-gradient(to right, #b02121, #6401318c);
    border-radius: 10px;
    max-width: 60%;
    margin: auto;
    color: white;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  form {
    display: flex;
    width: 100%;
    flex-direction: column;
  }

  label {
    margin-bottom: 5px;
    font-weight: bold;
  }

  input {
    margin-bottom: 15px;
    padding: 10px;
    border: none;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  button {
    width: 100%;
    padding: 12px;
    background-color: #ffa726;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease;
  }

  button:hover {
    background-color: #fb8c00;
  }

  .container_button {
    display: flex;
    justify-content: space-between;
  }

  .container_button button {
    width: 48%;
  }

  .google {
    background-color: red;
  }
</style>



<div class="container">
  <form on:submit={handleSubmit}>
    <h2>Registro</h2>

    <label for="username">Usuário:</label>
    <input type="text" id="username" bind:value={username} required maxlength="20">

    <label for="email">Email:</label>
    <input type="email" id="email" bind:value={email} required>

    <label for="password">Senha:</label>
    <input type="password" id="password" bind:value={password} required>

    <label for="confirmPassword">Confirme a Senha:</label>
    <input type="password" id="confirmPassword" bind:value={confirmPassword} required>

    <label for="fullName">Nome Completo:</label>
    <input type="text" id="fullName" bind:value={fullName} required maxlength="90">

    <div class="container_button">
      <button class="singid" type="submit">Sign In</button>
      <button class="google" type="button">Google</button>
    </div>
  </form>
</div>

{#if showToast}
  <Toast message={toastMessage} type={toastType} />
{/if}
