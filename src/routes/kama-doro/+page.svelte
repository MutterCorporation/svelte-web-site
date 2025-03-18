<script lang="ts">
  import { onMount } from 'svelte';
  import { tasks, timeLeft, isRunning as storeIsRunning, currentTask } from './store/store';

  let newTaskInput = '';
  let timer: number;
  let selectedMinutes = 25;
  let time = selectedMinutes * 60;
  let isRunning = false;

  // Lista de posições (exemplo)
  const positions = [
    { name: 'Lotus', description: 'Uma posição relaxante e íntima' },
    { name: 'Borboleta', description: 'Posição delicada e romântica' },
    { name: 'Lua Crescente', description: 'Perfeita para momentos especiais' },
    // Adicione mais posições conforme necessário
  ];

  let currentPosition = positions[0];

  // Format time for display
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  function updateTimer() {
    time = selectedMinutes * 60;
  }

  // Sons
  let clickSound: HTMLAudioElement;
  let timerEndSound: HTMLAudioElement;
  let hoverSound: HTMLAudioElement;
  let isMuted = false;

  // Responsividade
  let isMobile = false;

  function startTimer() {
    if (!isRunning) {
      playSound(clickSound);
      isRunning = true;
      timer = setInterval(() => {
        if (time > 0) {
          time--;
        } else {
          clearInterval(timer);
          isRunning = false;
          playSound(timerEndSound);
          changePosition();
        }
      }, 1000);
    }
  }

  function pauseTimer() {
    clearInterval(timer);
    isRunning = false;
  }

  function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    time = selectedMinutes * 60;
  }

  function changePosition() {
    const randomIndex = Math.floor(Math.random() * positions.length);
    currentPosition = positions[randomIndex];
  }

  // Task Management
  function addTask() {
    if (newTaskInput.trim()) {
      tasks.update(t => [...t, {
        id: Date.now(),
        text: newTaskInput,
        completed: false,
        pomodoros: 0
      }]);
      newTaskInput = '';
    }
  }

  function toggleTask(id) {
    tasks.update(t =>
      t.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  function deleteTask(id) {
    tasks.update(t => t.filter(task => task.id !== id));
    if ($currentTask === id) {
      currentTask.set(null);
    }
  }

  function selectTask(id) {
    currentTask.set(id);
    resetTimer();
  }

  function incrementPomodoro(id) {
    tasks.update(t =>
      t.map(task =>
        task.id === id ? { ...task, pomodoros: task.pomodoros + 1 } : task
      )
    );
  }

  // Notification
  function notify() {
    if (Notification.permission === "granted") {
      new Notification("Pomodoro Completed!", {
        body: "Time to take a break and change position to: " + currentPosition.name,
      });
      if ($currentTask) {
        incrementPomodoro($currentTask);
      }
    }
  }

  onMount(() => {
    // Corrigindo o caminho dos sons para o diretório correto
    clickSound = new Audio('../sounds/click.mp3');
    timerEndSound = new Audio('../sounds/timer-end.mp3');
    hoverSound = new Audio('../sounds/hover.mp3');
    
    // Verificar se é mobile
    checkMobile();
    window.addEventListener('resize', checkMobile);

    Notification.requestPermission();
    return () => {
      if (timer) clearInterval(timer);
      window.removeEventListener('resize', checkMobile);
    };
  });

  function checkMobile() {
    isMobile = window.innerWidth < 768;
  }

  function playSound(sound: HTMLAudioElement) {
    if (!isMuted) {
      sound.currentTime = 0;
      sound.play();
    }
  }
</script>

<div class="min-h-screen bg-gradient-to-br from-slate-900/90 via-purple-900/90 to-slate-900/90 p-8 backdrop-blur-md">
  <!-- Botão de Som -->
  <button
    class="fixed top-4 right-4 z-50 glass-button-outline p-3 rounded-full"
    on:click={() => isMuted = !isMuted}
  >
    {#if isMuted}
      <svg class="w-6 h-6 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
      </svg>
    {:else}
      <svg class="w-6 h-6 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072M12 8v8m-5.536-6.464a5 5 0 010 7.072" />
      </svg>
    {/if}
  </button>

  <div class="max-w-6xl mx-auto">
    <!-- Banner de Propaganda -->
    <div class="glass-container mb-8 overflow-hidden {isMobile ? 'sticky top-0 z-40' : ''}">
      <a href="https://erecaoduradoura.com.br" 
         target="_blank"
         class="block relative group"
         on:mouseenter={() => playSound(hoverSound)}
      >
        <div class="relative overflow-hidden rounded-2xl">
          <img
            src="https://images.unsplash.com/photo-1517960413843-0aee8e2b3285?q=80&w=1200"
            alt="Ereção Duradoura"
            class="w-full h-32 object-cover transform group-hover:scale-105 transition-transform duration-500"
          />
          <div class="absolute inset-0 bg-gradient-to-r from-purple-900/70 to-pink-900/70 backdrop-blur-sm"></div>
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="text-center">
              <h3 class="text-2xl font-bold text-white mb-2">Descubra o Segredo</h3>
              <p class="text-white/90">Clique aqui para uma performance extraordinária</p>
            </div>
          </div>
        </div>
      </a>
    </div>

    <div class="glass-container p-8 rounded-3xl mb-12">
      <h1 class="font-display text-7xl font-bold text-center mb-12 animate-gradient">
        Kama-Doro
      </h1>
      
      <!-- Seletor de Tempo -->
      <div class="mb-12 text-center">
        <select
          bind:value={selectedMinutes}
          on:change={updateTimer}
          class="glass-select px-8 py-4 rounded-2xl text-2xl backdrop-blur-lg
                 bg-white/5 border border-white/20 text-white/90
                 hover:border-pink-400 transition-all duration-500"
          disabled={isRunning}
        >
          <option value={5}>5 minutos</option>
          <option value={10}>10 minutos</option>
          <option value={15}>15 minutos</option>
          <option value={25}>25 minutos</option>
          <option value={30}>30 minutos</option>
        </select>
      </div>

      <!-- Timer -->
      <div class="relative w-96 h-96 mx-auto mb-16">
        <div class="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-2xl opacity-50"></div>
        <div class="relative w-full h-full bg-gradient-to-br from-purple-900/80 to-slate-900/80 rounded-full 
                    border border-white/20 backdrop-blur-md flex items-center justify-center
                    shadow-[0_0_50px_rgba(168,85,247,0.3)] hover:shadow-[0_0_70px_rgba(168,85,247,0.4)] 
                    transition-all duration-500">
          <span class="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
            {formatTime(time)}
          </span>
        </div>
      </div>

      <!-- Controles -->
      <div class="flex justify-center gap-8 mb-16">
        {#if !isRunning}
          <button
            on:click={startTimer}
            class="glass-button px-12 py-6 rounded-full font-bold text-2xl text-white/90
                   shadow-[0_0_30px_rgba(236,72,153,0.3)] hover:shadow-[0_0_50px_rgba(236,72,153,0.5)]
                   hover:scale-105 transition-all duration-500"
          >
            Iniciar
          </button>
        {:else}
          <button
            on:click={pauseTimer}
            class="glass-button-alt px-12 py-6 rounded-full font-bold text-2xl text-white/90
                   shadow-[0_0_30px_rgba(168,85,247,0.3)] hover:shadow-[0_0_50px_rgba(168,85,247,0.5)]
                   hover:scale-105 transition-all duration-500"
          >
            Pausar
          </button>
        {/if}
        <button
          on:click={resetTimer}
          class="glass-button-outline px-12 py-6 rounded-full font-bold text-2xl text-white/80
                 hover:text-white transition-all duration-500 hover:scale-105"
        >
          Reiniciar
        </button>
      </div>

      <!-- Card da Posição -->
      <div
        class="glass-card group relative overflow-hidden rounded-3xl transition-all duration-500 hover:scale-102 cursor-pointer"
        on:click={changePosition}
      >
        <div class="absolute inset-0 bg-gradient-to-br from-purple-900/50 to-pink-900/50"></div>
        <div class="relative p-12 backdrop-blur-sm bg-white/5">
          <h2 class="font-display text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
            {currentPosition.name}
          </h2>
          <p class="text-white/90 text-xl font-light leading-relaxed">
            {currentPosition.description}
          </p>
        </div>
      </div>
    </div>
  </div>

  <!-- Indicador de Progresso -->
  <div class="fixed bottom-0 left-0 right-0 h-1 bg-white/10">
    <div
      class="h-full bg-gradient-to-r from-pink-500 to-purple-500 transition-all duration-300"
      style="width: {((selectedMinutes * 60 - time) / (selectedMinutes * 60)) * 100}%"
    ></div>
  </div>
</div>

<style lang="postcss">
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&display=swap');

  :global(body) {
    @apply m-0 p-0;
    background: url('https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=1200') center/cover fixed;
    font-family: 'Cinzel', serif;
  }

  .animate-gradient {
    @apply text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400;
    background-size: 300% 300%;
    animation: gradient 8s ease infinite;
  }

  .glass-container {
    @apply backdrop-blur-xl bg-white/5 border border-white/10;
    box-shadow: 0 0 50px rgba(168, 85, 247, 0.2);
    transition: transform 0.3s ease;
  }

  .glass-container:hover {
    transform: translateY(-2px);
  }

  .glass-button {
    @apply bg-gradient-to-r from-pink-500/50 to-purple-500/50 border border-white/20 backdrop-blur-md;
  }

  .glass-button-alt {
    @apply bg-gradient-to-r from-purple-500/50 to-pink-500/50 border border-white/20 backdrop-blur-md;
  }

  .glass-button-outline {
    @apply bg-transparent border-2 border-white/20 backdrop-blur-md
           hover:border-pink-500/50 hover:bg-white/5;
  }

  .glass-select {
    @apply appearance-none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 1rem center;
    background-size: 1.5em;
    padding-right: 2.5rem;
  }

  .glass-select option {
    @apply bg-slate-900 text-white;
  }

  @keyframes gradient {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  /* Animação suave para todos os elementos */
  * {
    @apply transition-all duration-300;
  }

  /* Adicionar estilos para interatividade */
  .glass-container {
    @apply backdrop-blur-xl bg-white/5 border border-white/10;
    box-shadow: 0 0 50px rgba(168, 85, 247, 0.2);
    transition: transform 0.3s ease;
  }

  .glass-container:hover {
    transform: translateY(-2px);
  }

  /* Animação de pulso para o timer quando estiver próximo do fim */
  .timer-warning {
    animation: pulse 1s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
</style>