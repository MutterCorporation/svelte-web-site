<script>
    import { onMount, onDestroy } from 'svelte';
    import { tasks, timeLeft, isRunning, currentTask } from './store/store';
  
    let interval;
    let newTaskInput = '';
  
    // Format time for display
    const formatTime = (seconds) => {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };
  
    // Pomodoro Controls
    function startPomodoro() {
      isRunning.set(true);
      interval = setInterval(() => {
        timeLeft.update(t => {
          if (t <= 0) {
            stopPomodoro();
            notify();
            return 1500; // Reset to 25 minutes
          }
          return t - 1;
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
      resetPomodoro();
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
          body: "Time to take a break!",
        });
        if ($currentTask) {
          incrementPomodoro($currentTask);
        }
      }
    }
  
    onMount(() => {
      Notification.requestPermission();
    });
  
    onDestroy(() => {
      if (interval) clearInterval(interval);
    });
  </script>
  
  <svelte:head>
    <title>Task-Doro | Gerenciador de Tarefas com Pomodoro</title>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
  </svelte:head>
  
  <div class="container">
    <header class="header" role="banner">
      <h1 class="title">Task-Doro</h1>
      <p class="subtitle">Gerencie seu tempo com elegância</p>
    </header>
  
    <!-- Timer Display -->
    <section class="timer-section" role="timer">
      <div class="timer-display">
        <p class="time" aria-live="polite">
          {formatTime($timeLeft)}
        </p>
        <div class="timer-controls">
          {#if !$isRunning}
            <button 
              class="btn btn-primary" 
              on:click={startPomodoro}
              aria-label="Iniciar timer">
              Iniciar
            </button>
          {:else}
            <button 
              class="btn btn-danger" 
              on:click={stopPomodoro}
              aria-label="Parar timer">
              Parar
            </button>
          {/if}
          <button 
            class="btn btn-secondary" 
            on:click={resetPomodoro}
            aria-label="Reiniciar timer">
            Reiniciar
          </button>
        </div>
      </div>
    </section>
  
    <!-- Task Input -->
    <section class="task-input-section" role="form">
      <div class="input-group">
        <input
          type="text"
          bind:value={newTaskInput}
          placeholder="Adicione uma nova tarefa..."
          class="task-input"
          on:keydown={e => e.key === 'Enter' && addTask()}
          aria-label="Nova tarefa"
        />
        <button 
          class="btn btn-add" 
          on:click={addTask}
          aria-label="Adicionar tarefa">
          Adicionar
        </button>
      </div>
    </section>
  
    <!-- Task List -->
    <section class="task-list" role="list" aria-label="Lista de tarefas">
      {#each $tasks as task (task.id)}
        <div 
          class="task-card {task.id === $currentTask ? 'task-selected' : ''}"
          role="listitem">
          <div class="task-content">
            <label class="task-checkbox">
              <input
                type="checkbox"
                checked={task.completed}
                on:change={() => toggleTask(task.id)}
                aria-label="Marcar tarefa como concluída"
              />
              <span class="checkmark"></span>
            </label>
            <div class="task-text">
              <span class={task.completed ? 'completed' : ''}>
                {task.text}
              </span>
              <span class="pomodoro-count">
                {task.pomodoros} pomodoros
              </span>
            </div>
          </div>
          <div class="task-actions">
            <button 
              class="btn btn-select" 
              on:click={() => selectTask(task.id)}
              aria-label="Selecionar tarefa">
              Selecionar
            </button>
            <button 
              class="btn btn-delete" 
              on:click={() => deleteTask(task.id)}
              aria-label="Deletar tarefa">
              Deletar
            </button>
          </div>
        </div>
      {/each}
    </section>
  </div>
  
  <style>
    /* Removendo definições duplicadas e organizando melhor o CSS */
    .container {
        max-width: 48rem;
        margin: 0 auto;
        padding: 2rem;
        background: linear-gradient(to bottom, #fafafa, #f5f5f5);
        min-height: 100vh;
        color: #1a1a1a;
    }
  
    /* Tipografia */
    .header {
      text-align: center;
      margin-bottom: 4rem;
    }
  
    .title {
      font-family: 'Playfair Display', serif;
      font-size: 3.5rem;
      font-weight: 700;
      color: #1a1a1a;
      margin-bottom: 0.5rem;
      letter-spacing: -0.02em;
    }
  
    .subtitle {
      font-family: 'Inter', sans-serif;
      font-size: 1.125rem;
      color: #666;
      font-weight: 400;
    }
  
    /* Timer */
    .timer-section {
      margin-bottom: 4rem;
    }
  
    .timer-display {
      background: white;
      padding: 3rem;
      border-radius: 1rem;
      box-shadow: 
        0 4px 6px rgba(0, 0, 0, 0.05),
        0 10px 15px rgba(37, 99, 235, 0.1);
      text-align: center;
      border: 1px solid rgba(37, 99, 235, 0.1);
    }
  
    .time {
      font-family: 'JetBrains Mono', monospace;
      font-size: 5rem;
      font-weight: 700;
      color: #1a1a1a;
      letter-spacing: -0.03em;
      margin-bottom: 2rem;
    }
  
    /* Botões */
    .timer-controls {
      display: flex;
      gap: 1rem;
      justify-content: center;
    }
  
    .btn {
      font-family: 'Inter', sans-serif;
      font-weight: 500;
      padding: 0.75rem 1.5rem;
      border-radius: 0.5rem;
      border: none;
      cursor: pointer;
      transition: all 0.2s ease;
    }
  
    .btn-primary {
      background: #2563eb;
      color: white;
    }
  
    .btn-primary:hover {
      background: #1d4ed8;
    }
  
    .btn-danger {
      background: #dc2626;
      color: white;
    }
  
    .btn-danger:hover {
      background: #b91c1c;
    }
  
    .btn-secondary {
      background: #4b5563;
      color: white;
    }
  
    .btn-secondary:hover {
      background: #374151;
    }
  
    /* Input */
    .task-input-section {
      margin-bottom: 3rem;
    }
  
    .input-group {
      display: flex;
      gap: 1rem;
    }
  
    .task-input {
      flex: 1;
      padding: 1rem;
      font-family: 'Inter', sans-serif;
      font-size: 1rem;
      border: 2px solid #e5e7eb;
      border-radius: 0.5rem;
      transition: border-color 0.2s ease;
      color: #1a1a1a;
      background-color: white;
    }
  
    .task-input::placeholder {
      color: #9ca3af;
    }
  
    /* Task List */
    .task-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
  
    .task-card {
      background: white;
      padding: 1.5rem;
      border-radius: 0.75rem;
      box-shadow: 
        0 2px 4px rgba(0, 0, 0, 0.05),
        0 4px 6px rgba(37, 99, 235, 0.1);
      display: flex;
      justify-content: space-between;
      align-items: center;
      transition: all 0.2s ease;
      border: 1px solid rgba(37, 99, 235, 0.1);
    }
  
    .task-card:hover {
      transform: translateY(-2px);
      box-shadow: 
        0 4px 6px rgba(0, 0, 0, 0.1),
        0 6px 8px rgba(37, 99, 235, 0.2);
    }
  
    .task-selected {
      border: 2px solid #2563eb;
      background: rgba(37, 99, 235, 0.05);
    }
  
    .task-content {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
  
    .task-text {
      font-family: 'Inter', sans-serif;
      font-size: 1rem;
      color: #1a1a1a;
    }
  
    .task-text span {
      color: #1a1a1a;
    }
  
    .completed {
      text-decoration: line-through;
      color: #6b7280;
    }
  
    .pomodoro-count {
      font-size: 0.875rem;
      color: #4b5563;
      margin-left: 0.75rem;
    }
  
    /* Checkbox personalizado */
    .task-checkbox {
      position: relative;
      display: inline-block;
      width: 1.5rem;
      height: 1.5rem;
    }
  
    .task-checkbox input {
      opacity: 0;
      width: 0;
      height: 0;
    }
  
    .checkmark {
      position: absolute;
      top: 0;
      left: 0;
      width: 1.5rem;
      height: 1.5rem;
      border: 2px solid #e5e7eb;
      border-radius: 0.375rem;
      transition: all 0.2s ease;
    }
  
    .task-checkbox input:checked ~ .checkmark {
      background: #2563eb;
      border-color: #2563eb;
    }
  
    .checkmark:after {
      content: "";
      position: absolute;
      display: none;
    }
  
    .task-checkbox input:checked ~ .checkmark:after {
      display: block;
      left: 0.5rem;
      top: 0.25rem;
      width: 0.25rem;
      height: 0.5rem;
      border: solid white;
      border-width: 0 2px 2px 0;
      transform: rotate(45deg);
    }
  
    /* Responsividade */
    @media (max-width: 640px) {
      .container {
        padding: 1rem;
      }
  
      .title {
        font-size: 2.5rem;
      }
  
      .time {
        font-size: 3.5rem;
      }
  
      .task-card {
        flex-direction: column;
        gap: 1rem;
        align-items: stretch;
      }
  
      .task-actions {
        display: flex;
        gap: 0.5rem;
      }
    }
  
    /* Ajustes nos botões */
    .btn-add {
      background: #2563eb;
      color: white;
    }
  
    .btn-add:hover {
      background: #1d4ed8;
    }
  
    .btn-select {
      background: #2563eb;
      color: white;
    }
  
    .btn-select:hover {
      background: #1d4ed8;
    }
  
    .btn-delete {
      background: #dc2626;
      color: white;
    }
  
    .btn-delete:hover {
      background: #b91c1c;
    }
  
    /* Melhorias na acessibilidade e interatividade */
    .btn,
    .task-input {
        transition: all 0.2s ease;
    }

    .btn:focus,
    .task-input:focus {
        outline: 2px solid #2563eb;
        outline-offset: 2px;
        box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.2);
    }

    /* Adicionando feedback visual para interação via teclado */
    .btn:focus-visible,
    .task-input:focus-visible {
        outline: 2px solid #2563eb;
        outline-offset: 2px;
    }

    @media (prefers-reduced-motion: reduce) {
        .btn,
        .task-input,
        .task-card {
            transition: none;
        }
    }
  </style>