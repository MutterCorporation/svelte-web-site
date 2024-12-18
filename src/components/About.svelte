<!-- Typewriter.svelte -->

<style>
  .about {
    padding: 2rem;
    color: #230f2b;
    text-align: center;
  }

  .about h2 {
    margin-bottom: 1rem;
  }

  .about p {
    max-width: 800px;
    margin: 0 auto;
    line-height: 1.5;
  }
</style>

<script lang="ts">
  import { onMount } from 'svelte';

  let h2 = `MutterCorporation`;

  // Texto completo que será digitado pela máquina de escrever
  let Text = `MutterCorporation é uma empresa focada no 
    desenvolvimento de soluções em Tecnologia da Informação
    , com um duplo propósito: criar ferramentas que impulsionem 
    ganhos ou proporcionem diversão em atividades, além de atuar como 
    uma transformadora ao ajudar e divulgar ações relevantes.`;

  let text = $state(''); // Texto que será mostrado na máquina de escrever
  let displayText = ''; // Texto que será exibido com o efeito de digitação
  let currentIndex = 0; // Índice para acompanhar a posição atual do texto

  const typingSpeed = 50; // Velocidade de digitação (em milissegundos por caractere)

  onMount(() => {
    // Iniciar a animação de máquina de escrever
    startTyping();
  });

  function startTyping() {
    if (currentIndex < Text.length) {
      displayText += Text[currentIndex];
      currentIndex++;

      // Atualiza o estado para refletir o texto digitado até agora
      text = displayText;

      // Continua digitando o próximo caractere após o intervalo de tempo
      setTimeout(startTyping, typingSpeed);
    }
  }
</script>

<div class="about">
  <h2>{h2}</h2>
  <p>{text}</p>
</div>
