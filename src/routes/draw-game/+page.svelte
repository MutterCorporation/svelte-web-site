<script>
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';

  // Variáveis para o temporizador
  let timeLeft = writable(1500); // 25 minutos em segundos
  let isRunning = writable(false);
  let interval;

  // Funções do Pomodoro
  function startPomodoro() {
    isRunning.set(true);
    interval = setInterval(() => {
      timeLeft.update(t => {
        if (t > 0) return t - 1;
        stopPomodoro();
        return 0;
      });
    }, 1000);
  }

  function stopPomodoro() {
    clearInterval(interval);
    isRunning.set(false);
  }

  function resetPomodoro() {
    stopPomodoro();
    timeLeft.set(1500);
  }

  // Canvas
  // Canvas
  let canvas;
  let context;
  let isDrawing = false;
  let brushSize = writable(5); // Tamanho do pincel, valor inicial de 5


  function startDrawing(e) {
    isDrawing = true;
    draw(e);
  }

  function stopDrawing() {
    isDrawing = false;
    context.beginPath(); // Para continuar o desenho de forma limpa
  }

  function draw(e) {
    if (!isDrawing) return;

    const size = $brushSize; // Obtendo o tamanho do pincel
    context.lineWidth = size;
    context.lineCap = 'round';
    context.strokeStyle = 'blue';

    context.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    context.stroke();
    context.beginPath();
    context.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
  }

  // Inicialização do canvas
  onMount(() => {
    context = canvas.getContext('2d');
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseleave', stopDrawing);
  });
</script>

<style>
  body {
    margin: 0;
    padding: 0;
    overflow: hidden;
  }
</style>

<div class="absolute inset-0 flex flex-col items-center justify-start p-8 bg-gray-100">
  <h1 class="text-4xl font-semibold text-gray-800">Pomodoro Timer</h1>

  <p class="text-2xl mt-4 text-gray-600">
    {#if $timeLeft > 0}
      {Math.floor($timeLeft / 60)}:{String($timeLeft % 60).padStart(2, '0')}
    {:else}
      Tempo esgotado!
    {/if}
  </p>

  <div class="mt-6 flex gap-4">
    {#if !$isRunning}
      <button class="px-6 py-3 text-lg font-medium bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors" on:click={startPomodoro}>Iniciar</button>
    {:else}
      <button class="px-6 py-3 text-lg font-medium bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors" on:click={stopPomodoro}>Pausar</button>
    {/if}
    <button class="px-6 py-3 text-lg font-medium bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-colors" on:click={resetPomodoro}>Resetar</button>
  </div>

  <div class="mt-8 flex flex-col items-center w-full">
    <!-- Controle do tamanho do pincel -->
    <label class="text-xl text-gray-700 mb-2">Tamanho do Pincel: {$brushSize}</label>
    <input type="range" min="1" max="50" bind:value={$brushSize} class="w-48 mb-4" />

    <!-- Canvas -->
    <div class="w-full h-full">
      <canvas bind:this={canvas} class="w-full h-full border-2 border-gray-300 rounded-lg cursor-crosshair"></canvas>
    </div>
  </div>
</div>