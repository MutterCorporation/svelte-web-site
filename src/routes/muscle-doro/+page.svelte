<script lang="ts">
  import { onMount } from 'svelte';
  import { currentWorkout, timeLeft, isRunning as storeIsRunning, currentExercise, selectedWorkoutType, workoutNumber, workoutTypes } from './store/store';
  import { mockWorkouts } from './mockData';
  import { startNewWorkout, finishExercise, finishWorkout, currentWorkoutData, showReportModal, closeReportModal, getWorkoutReport } from './store/exerciseStore';
  import { browser } from '$app/environment';
  import { leaderboardData } from './store/leaderboardStore';

  // Variáveis de estado
  let loading = false;
  let time = 0;
  let isRunning = false;
  let selectedMinutes = 25;
  let currentExerciseIndex = 0;
  let workoutStartTime: number | null = null;
  let showExerciseModal = false;
  let currentWeight = '';
  let actualReps = '';
  let notes = '';
  let showLeaderboardModal = false;
  let showPremiumModal = false;
  let isNearBottom = false;

  // Sons
  let hoverSound: HTMLAudioElement | null = null;
  let clickSound: HTMLAudioElement | null = null;

  // Funções de som
  function playSound(sound: HTMLAudioElement | null) {
    if (!sound) return;
    sound.currentTime = 0;
    sound.play().catch(() => {});
  }

  // Funções do timer
  function formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  function startTimer() {
    if (!isRunning) {
      isRunning = true;
      workoutStartTime = Date.now();
      playSound(clickSound);
    }
  }

  function pauseTimer() {
    if (isRunning) {
      isRunning = false;
      playSound(clickSound);
    }
  }

  function resetTimer() {
    isRunning = false;
    time = selectedMinutes * 60;
    workoutStartTime = null;
    playSound(clickSound);
  }

  function updateTimer() {
    time = selectedMinutes * 60;
    resetTimer();
  }

  // Funções de seleção de treino
  function changeWorkoutType(type: string) {
    selectedWorkoutType.set(type);
    workoutNumber.set(1);
    fetchWorkout();
  }

  function incrementWorkoutNumber() {
    workoutNumber.update(n => n + 1);
    fetchWorkout();
  }

  function decrementWorkoutNumber() {
    workoutNumber.update(n => Math.max(1, n - 1));
    fetchWorkout();
  }

  // Funções de exercícios
  function selectNextExercise() {
    if (!$currentWorkout) return;
    
    const exercises = $currentWorkout.exercises;
    if (currentExerciseIndex >= exercises.length) {
      currentExerciseIndex = 0;
      finishWorkout();
      return;
    }

    currentExercise.set(exercises[currentExerciseIndex]);
  }

  async function fetchWorkout() {
    loading = true;
    try {
      console.log('Buscando treino:', {
        type: $selectedWorkoutType,
        number: $workoutNumber
      });

      const workout = mockWorkouts[$selectedWorkoutType as keyof typeof mockWorkouts]?.[$workoutNumber];
      
      if (!workout) {
        throw new Error('Treino não encontrado');
      }

      console.log('Treino encontrado:', workout);
      currentWorkout.set(workout);
      startNewWorkout($selectedWorkoutType, $workoutNumber, workout);
      selectNextExercise();

      // Configurar timer com a duração do treino
      selectedMinutes = workout.duration;
      time = selectedMinutes * 60;
      timeLeft.set(time);
    } catch (err) {
      console.error('Erro ao buscar treino:', err);
    } finally {
      loading = false;
    }
  }

  function finishCurrentExercise() {
    if (!$currentExercise) return;

    const exerciseData = {
      name: $currentExercise.name,
      weight: Number(currentWeight) || 0,
      reps: Number(actualReps) || 0,
      duration: Date.now() - (workoutStartTime || Date.now()),
      notes,
      timestamp: Date.now(),
      targetReps: $currentExercise.reps,
      targetSets: $currentExercise.sets
    };

    console.log('Exercício finalizado:', exerciseData);
    finishExercise(exerciseData);
    
    // Limpar dados
    currentWeight = '';
    actualReps = '';
    notes = '';
    showExerciseModal = false;

    // Avançar para próximo exercício
    currentExerciseIndex++;
    selectNextExercise();
  }

  // Efeito do timer
  let timerInterval: ReturnType<typeof setInterval>;

  $: if (isRunning) {
    timerInterval = setInterval(() => {
      if (time > 0) {
        time--;
        timeLeft.set(time);
      } else {
        clearInterval(timerInterval);
        isRunning = false;
        storeIsRunning.set(false);
        playSound(clickSound);
      }
    }, 1000);
  } else {
    clearInterval(timerInterval);
  }

  // Sincronizar estado de execução
  $: isRunning = $storeIsRunning;
  $: storeIsRunning.set(isRunning);

  // Sincronizar tempo restante
  $: time = $timeLeft;

  // Atualizar exercício atual
  $: if ($currentExercise) {
    console.log('Exercício atual:', $currentExercise);
  }

  // Atualizar treino atual
  $: if ($currentWorkout) {
    console.log('Treino atual:', $currentWorkout);
  }

  // Atualizar dados do treino atual
  $: if ($currentWorkoutData) {
    console.log('Dados do treino atual:', $currentWorkoutData);
  }

  // Atualizar tipo de treino selecionado
  $: if ($selectedWorkoutType) {
    console.log('Tipo de treino selecionado:', $selectedWorkoutType);
  }

  // Atualizar número do treino
  $: if ($workoutNumber) {
    console.log('Número do treino:', $workoutNumber);
  }

  // Atualizar estado de carregamento
  $: if (loading) {
    console.log('Carregando treino...');
  }

  // Atualizar estado do modal
  $: if (showExerciseModal) {
    console.log('Modal de exercício:', showExerciseModal ? 'aberto' : 'fechado');
  }

  // Atualizar dados do exercício atual
  $: if (currentWeight || actualReps || notes) {
    console.log('Dados do exercício atual:', {
      weight: currentWeight,
      reps: actualReps,
      notes
    });
  }

  // Atualizar tempo de início do treino
  $: if (workoutStartTime) {
    console.log('Tempo de início do treino:', new Date(workoutStartTime).toLocaleString());
  }

  // Atualizar índice do exercício atual
  $: if (currentExerciseIndex >= 0) {
    console.log('Índice do exercício atual:', currentExerciseIndex);
  }

  // Atualizar tempo selecionado
  $: if (selectedMinutes) {
    console.log('Tempo selecionado:', selectedMinutes, 'minutos');
  }

  // Atualizar estado de execução do timer
  $: if (isRunning) {
    console.log('Timer em execução');
  }

  // Atualizar tempo restante
  $: if (time >= 0) {
    console.log('Tempo restante:', formatTime(time));
  }

  // Atualizar dados do exercício atual no modal
  $: if (showExerciseModal && $currentExercise) {
    console.log('Dados do exercício atual no modal:', {
      name: $currentExercise.name,
      weight: currentWeight,
      reps: actualReps,
      notes
    });
  }

  // Atualizar estado de carregamento do exercício
  $: if (!$currentExercise) {
    console.log('Carregando exercício...');
  }

  // Atualizar estado de carregamento do treino atual
  $: if (!$currentWorkout) {
    console.log('Carregando treino atual...');
  }

  // Função para verificar se está próximo do final da página
  function checkScroll() {
    if (browser) {
      const scrollPosition = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const threshold = 200; // pixels antes do final
      
      isNearBottom = documentHeight - scrollPosition < threshold;
    }
  }

  onMount(() => {
    if (browser) {
      try {
        hoverSound = new Audio('/sounds/hover.mp3');
        clickSound = new Audio('/sounds/click.mp3');
      } catch (error) {
        console.error('Erro ao carregar sons:', error);
      }

      // Adicionar listener de scroll
      window.addEventListener('scroll', checkScroll);
      checkScroll(); // Verificar posição inicial

      // Inicializar timer
      time = selectedMinutes * 60;
      timeLeft.set(time);

      // Buscar treino inicial
      fetchWorkout();

      return () => {
        clearInterval(timerInterval);
        window.removeEventListener('scroll', checkScroll);
      };
    }
  });
</script>

<div class="container">
  <div class="banner">
    <div class="banner-content">
      <h2>MUSCLE-DORO</h2>
      <p>SUA JORNADA FITNESS COMEÇA AQUI</p>
    </div>
  </div>

  <div class="glass-card">
    <h1>MUSCLE-DORO</h1>
    
    <div class="workout-selector">
      <div class="workout-type-selector">
        <h3>MODALIDADE</h3>
        <div class="workout-type-buttons">
          {#each workoutTypes as type}
            <button 
              class="workout-type-button"
              class:selected={$selectedWorkoutType === type.id}
              on:click={() => changeWorkoutType(type.id)}
              on:mouseenter={() => playSound(hoverSound)}
            >
              {type.name}
            </button>
          {/each}
        </div>
      </div>

      <div class="workout-number-selector">
        <h3>NÚMERO DO TREINO</h3>
        <div class="workout-number-controls">
          <button 
            class="number-button"
            on:click={decrementWorkoutNumber}
            on:mouseenter={() => playSound(hoverSound)}
          >
            -
          </button>
          <span class="workout-number">{$workoutNumber}</span>
          <button 
            class="number-button"
            on:click={incrementWorkoutNumber}
            on:mouseenter={() => playSound(hoverSound)}
          >
            +
          </button>
        </div>
      </div>
    </div>

    {#if $currentWorkout}
      <div class="workout-info">
        <h2>{$currentWorkout.name}</h2>
        <div class="workout-details">
          <span>MÚSCULO: {$currentWorkout.targetMuscle}</span>
          <span>DURAÇÃO: {$currentWorkout.duration}min</span>
          <span>DIFICULDADE: {$currentWorkout.difficulty}</span>
        </div>
      </div>
    {/if}
    
    <div class="timer-section">
      <div class="time-display">{formatTime(time)}</div>
      <div class="timer-controls">
        <button 
          class="timer-button" 
          on:click={startTimer} 
          disabled={isRunning}
          on:mouseenter={() => playSound(hoverSound)}
        >
          INICIAR
        </button>
        <button 
          class="timer-button" 
          on:click={pauseTimer} 
          disabled={!isRunning}
          on:mouseenter={() => playSound(hoverSound)}
        >
          PAUSAR
        </button>
        <button 
          class="timer-button" 
          on:click={resetTimer}
          on:mouseenter={() => playSound(hoverSound)}
        >
          RESETAR
        </button>
      </div>
    </div>

    <div class="exercise-section">
      <h2>EXERCÍCIO ATUAL</h2>
      {#if $currentExercise}
        <div class="exercise-card">
          <div class="exercise-image">
            <img src={$currentExercise.imageUrl} alt={$currentExercise.name} />
            <div class="exercise-overlay">
              <button 
                class="finish-exercise-button"
                on:click={() => showExerciseModal = true}
                on:mouseenter={() => playSound(hoverSound)}
              >
                FINALIZAR EXERCÍCIO
              </button>
            </div>
          </div>
          <h3>{$currentExercise.name}</h3>
          <div class="exercise-details">
            <span>SÉRIES: {$currentExercise.sets}</span>
            <span>REPETIÇÕES: {$currentExercise.reps}</span>
            <span>DESCANSO: {$currentExercise.rest}s</span>
          </div>
        </div>
      {:else}
        <div class="loading-card">
          <p>CARREGANDO EXERCÍCIOS...</p>
        </div>
      {/if}
    </div>
  </div>

  <button 
    class="leaderboard-button"
    class:near-bottom={isNearBottom}
    on:click={() => showLeaderboardModal = true}
    on:mouseenter={() => playSound(hoverSound)}
    aria-label="Abrir placar de usuários"
  >
    <span class="leaderboard-icon">🏆</span>
    <span class="leaderboard-text">PLACAR</span>
  </button>

  <button 
    class="premium-button"
    class:near-bottom={isNearBottom}
    on:click={() => showPremiumModal = true}
    on:mouseenter={() => playSound(hoverSound)}
    aria-label="Abrir versão premium"
  >
    <span class="premium-icon">⭐</span>
    <span class="premium-text">PREMIUM</span>
  </button>

  <div class="promo-banner">
    <div class="promo-content">
      <h3>QUER EVOLUIR MAIS RÁPIDO?</h3>
      <p>ACESSE O CURSO COMPLETO DE MUSCULAÇÃO</p>
      <a href="#" class="promo-button" on:mouseenter={() => playSound(hoverSound)}>
        SAIBA MAIS
      </a>
    </div>
  </div>
</div>

{#if showExerciseModal}
  <div 
    class="modal-overlay" 
    on:click={() => showExerciseModal = false}
    on:keydown={(e) => {
      if (e.key === 'Escape') showExerciseModal = false;
    }}
    role="dialog"
    aria-labelledby="modal-title"
    aria-modal="true"
  >
    <div 
      class="modal-content" 
      on:click|stopPropagation
      on:keydown|stopPropagation
      role="document"
    >
      <h3 id="modal-title">FINALIZAR EXERCÍCIO</h3>
      <div class="form-group">
        <label for="weight">CARGA (KG)</label>
        <input 
          type="number" 
          id="weight"
          bind:value={currentWeight} 
          placeholder="Ex: 20"
          aria-label="Carga em quilogramas"
        />
      </div>
      <div class="form-group">
        <label for="reps">REPETIÇÕES REALIZADAS</label>
        <input 
          type="number" 
          id="reps"
          bind:value={actualReps} 
          placeholder="Ex: 12"
          aria-label="Número de repetições realizadas"
        />
      </div>
      <div class="form-group">
        <label for="notes">ANOTAÇÕES</label>
        <textarea 
          id="notes"
          bind:value={notes} 
          placeholder="Observações sobre o exercício..."
          aria-label="Anotações sobre o exercício"
        ></textarea>
      </div>
      <div class="modal-buttons">
        <button 
          class="cancel-button"
          on:click={() => showExerciseModal = false}
          aria-label="Cancelar finalização do exercício"
        >
          CANCELAR
        </button>
        <button 
          class="confirm-button"
          on:click={finishCurrentExercise}
          aria-label="Finalizar exercício"
        >
          FINALIZAR
        </button>
      </div>
    </div>
  </div>
{/if}

{#if $showReportModal && $currentWorkoutData}
  {@const report = getWorkoutReport($currentWorkoutData)}
  <div 
    class="modal-overlay" 
    on:click={closeReportModal}
    on:keydown={(e) => {
      if (e.key === 'Escape') closeReportModal();
    }}
    role="dialog"
    aria-labelledby="report-title"
    aria-modal="true"
  >
    <div 
      class="modal-content report-content" 
      on:click|stopPropagation
      on:keydown|stopPropagation
      role="document"
    >
      <h3 id="report-title">RELATÓRIO DO TREINO</h3>
      <div class="report-summary">
        <div class="report-item">
          <span class="report-label">TREINO:</span>
          <span class="report-value">{report.name}</span>
        </div>
        <div class="report-item">
          <span class="report-label">MÚSCULO:</span>
          <span class="report-value">{report.targetMuscle}</span>
        </div>
        <div class="report-item">
          <span class="report-label">DIFICULDADE:</span>
          <span class="report-value">{report.difficulty}</span>
        </div>
        <div class="report-item">
          <span class="report-label">DURAÇÃO PLANEJADA:</span>
          <span class="report-value">{report.targetDuration}min</span>
        </div>
        <div class="report-item">
          <span class="report-label">DURAÇÃO REAL:</span>
          <span class="report-value">{report.actualDuration}min</span>
        </div>
        <div class="report-item">
          <span class="report-label">TOTAL DE PESO:</span>
          <span class="report-value">{report.totalWeight}kg</span>
        </div>
        <div class="report-item">
          <span class="report-label">TOTAL DE REPETIÇÕES:</span>
          <span class="report-value">{report.totalReps}</span>
        </div>
        <div class="report-item">
          <span class="report-label">TOTAL DE SÉRIES:</span>
          <span class="report-value">{report.totalSets}</span>
        </div>
      </div>
      <div class="report-exercises">
        <h4>EXERCÍCIOS REALIZADOS</h4>
        {#each report.exercises as exercise}
          <div class="exercise-report">
            <h5>{exercise.name}</h5>
            <div class="exercise-details">
              <span>PESO: {exercise.weight}kg</span>
              <span>REPS: {exercise.reps}</span>
              <span>SÉRIES: {exercise.targetSets}</span>
            </div>
            {#if exercise.notes}
              <p class="exercise-notes">{exercise.notes}</p>
            {/if}
          </div>
        {/each}
      </div>
      <div class="modal-buttons">
        <button 
          class="confirm-button"
          on:click={closeReportModal}
          aria-label="Fechar relatório do treino"
        >
          FECHAR
        </button>
      </div>
    </div>
  </div>
{/if}

{#if showLeaderboardModal}
  <div 
    class="modal-overlay" 
    on:click={() => showLeaderboardModal = false}
    on:keydown={(e) => {
      if (e.key === 'Escape') showLeaderboardModal = false;
    }}
    role="dialog"
    aria-labelledby="leaderboard-title"
    aria-modal="true"
  >
    <div 
      class="modal-content leaderboard-content" 
      on:click|stopPropagation
      on:keydown|stopPropagation
      role="document"
    >
      <h3 id="leaderboard-title">PLACAR DE USUÁRIOS</h3>
      <div class="leaderboard-list">
        {#each $leaderboardData as user, index}
          <div class="leaderboard-item" class:top-three={index < 3}>
            <div class="rank">{index + 1}</div>
            <div class="user-info">
              <span class="user-name">{user.name}</span>
              <span class="user-stats">
                {user.workouts} treinos • {user.totalTime}min
              </span>
            </div>
          </div>
        {/each}
      </div>
      <div class="modal-buttons">
        <button 
          class="confirm-button"
          on:click={() => showLeaderboardModal = false}
          aria-label="Fechar placar"
        >
          FECHAR
        </button>
      </div>
    </div>
  </div>
{/if}

{#if showPremiumModal}
  <div 
    class="modal-overlay" 
    on:click={() => showPremiumModal = false}
    on:keydown={(e) => {
      if (e.key === 'Escape') showPremiumModal = false;
    }}
    role="dialog"
    aria-labelledby="premium-title"
    aria-modal="true"
  >
    <div 
      class="modal-content premium-content" 
      on:click|stopPropagation
      on:keydown|stopPropagation
      role="document"
    >
      <h3 id="premium-title">VERSÃO PREMIUM</h3>
      <div class="premium-features">
        <div class="feature-item">
          <span class="feature-icon">🎯</span>
          <div class="feature-info">
            <h4>PLANOS PERSONALIZADOS</h4>
            <p>Treinos adaptados ao seu nível e objetivos</p>
          </div>
        </div>
        <div class="feature-item">
          <span class="feature-icon">📊</span>
          <div class="feature-info">
            <h4>ANÁLISE DE PROGRESSO</h4>
            <p>Acompanhe sua evolução com gráficos detalhados</p>
          </div>
        </div>
        <div class="feature-item">
          <span class="feature-icon">🎥</span>
          <div class="feature-info">
            <h4>VÍDEOS TUTORIAIS</h4>
            <p>Aprenda a execução correta dos exercícios</p>
          </div>
        </div>
        <div class="feature-item">
          <span class="feature-icon">💪</span>
          <div class="feature-info">
            <h4>SUPORTE ESPECIAL</h4>
            <p>Atendimento prioritário e dicas exclusivas</p>
          </div>
        </div>
      </div>
      <div class="premium-price">
        <span class="price">R$ 9,90</span>
        <span class="period">/mês</span>
      </div>
      <div class="modal-buttons">
        <button 
          class="cancel-button"
          on:click={() => showPremiumModal = false}
          aria-label="Fechar modal premium"
        >
          FECHAR
        </button>
        <button 
          class="confirm-button"
          on:click={() => {
            // Aqui você pode adicionar a lógica para assinatura
            console.log('Iniciar assinatura premium');
          }}
          aria-label="Assinar versão premium"
        >
          ASSINAR AGORA
        </button>
      </div>
    </div>
  </div>
{/if}

<style>
  .container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
    background: #000000;
  }

  .banner {
    width: 100%;
    background: #000000;
    color: #ffffff;
    padding: 1rem;
    margin-bottom: 2rem;
    border: 4px solid #000000;
    box-shadow: 8px 8px 0 #000000;
  }

  .banner-content {
    text-align: center;
  }

  .banner-content h2 {
    color: #ffffff;
    font-size: 2.5rem;
    font-weight: 900;
    text-transform: uppercase;
    margin-bottom: 0.5rem;
  }

  .banner-content p {
    color: #ffffff;
    font-size: 1.2rem;
    font-weight: 900;
    text-transform: uppercase;
  }

  .glass-card {
    background: #ffffff;
    border-radius: 0;
    padding: 2rem;
    width: 100%;
    max-width: 600px;
    color: #000000;
    border: 4px solid #000000;
    box-shadow: 8px 8px 0 #000000;
  }

  h1 {
    text-align: center;
    color: #000000;
    margin-bottom: 2rem;
    font-size: 3rem;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 2px;
  }

  .workout-info {
    text-align: center;
    margin-bottom: 2rem;
    padding: 1rem;
    background: #000000;
    color: #ffffff;
    border: 2px solid #000000;
  }

  .workout-info h2 {
    color: #ffffff;
    margin-bottom: 1rem;
    font-size: 1.5rem;
    font-weight: 900;
    text-transform: uppercase;
  }

  .workout-details {
    display: flex;
    justify-content: center;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .workout-details span {
    background: #ffffff;
    padding: 0.5rem 1rem;
    color: #000000;
    font-weight: 900;
    text-transform: uppercase;
  }

  .timer-section {
    text-align: center;
    margin-bottom: 2rem;
    padding: 1rem;
    background: #000000;
    color: #ffffff;
    border: 2px solid #000000;
  }

  .time-display {
    font-size: 5rem;
    font-weight: 900;
    color: #ffffff;
    margin-bottom: 1rem;
    font-family: monospace;
    text-shadow: 4px 4px 0 #000000;
    letter-spacing: 2px;
  }

  .timer-controls {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-bottom: 1rem;
  }

  .timer-button {
    background: #ffffff;
    border: 2px solid #000000;
    color: #000000;
    padding: 1rem 2rem;
    font-weight: 900;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 4px 4px 0 #000000;
    font-size: 1.2rem;
  }

  .timer-button:hover:not(:disabled) {
    transform: translate(-2px, -2px);
    box-shadow: 6px 6px 0 #000000;
  }

  .timer-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .exercise-section {
    margin-bottom: 2rem;
  }

  h2 {
    color: #000000;
    margin-bottom: 1rem;
    text-align: center;
    font-size: 1.5rem;
    font-weight: 900;
    text-transform: uppercase;
  }

  .exercise-card {
    background: #ffffff;
    border: 2px solid #000000;
    padding: 1.5rem;
    box-shadow: 4px 4px 0 #000000;
  }

  .exercise-image {
    position: relative;
    width: 100%;
    height: 200px;
    margin-bottom: 1rem;
    border: 2px solid #000000;
    overflow: hidden;
  }

  .exercise-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  .exercise-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .exercise-image:hover .exercise-overlay {
    opacity: 1;
  }

  .exercise-image:hover img {
    transform: scale(1.05);
  }

  .exercise-card h3 {
    color: #000000;
    margin-bottom: 0.5rem;
    font-size: 1.5rem;
    font-weight: 900;
    text-transform: uppercase;
  }

  .exercise-details {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    margin-top: 1rem;
    color: #000000;
    font-weight: 900;
    text-transform: uppercase;
  }

  .loading-card {
    background: #ffffff;
    border: 2px solid #000000;
    padding: 2rem;
    text-align: center;
    color: #000000;
    font-weight: 900;
    text-transform: uppercase;
  }

  .workout-selector {
    margin-bottom: 2rem;
    padding: 1rem;
    background: #000000;
    color: #ffffff;
    border: 2px solid #000000;
  }

  .workout-type-selector h3, .workout-number-selector h3 {
    color: #ffffff;
    margin-bottom: 0.5rem;
    text-align: center;
    font-weight: 900;
    text-transform: uppercase;
  }

  .workout-type-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    justify-content: center;
  }

  .workout-type-button {
    background: #ffffff;
    border: 2px solid #000000;
    color: #000000;
    padding: 0.8rem 1.5rem;
    font-weight: 900;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 4px 4px 0 #000000;
  }

  .workout-type-button.selected {
    background: #000000;
    color: #ffffff;
  }

  .workout-type-button:hover {
    transform: translate(-2px, -2px);
    box-shadow: 6px 6px 0 #000000;
  }

  .workout-number-controls {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }

  .number-button {
    background: #ffffff;
    border: 2px solid #000000;
    color: #000000;
    width: 50px;
    height: 50px;
    border-radius: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;
    font-size: 2rem;
    font-weight: 900;
    box-shadow: 4px 4px 0 #000000;
  }

  .number-button:hover {
    transform: translate(-2px, -2px);
    box-shadow: 6px 6px 0 #000000;
  }

  .workout-number {
    color: #ffffff;
    font-size: 2rem;
    font-weight: 900;
    min-width: 50px;
    text-align: center;
  }

  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }

  .modal-content {
    background: #ffffff;
    padding: 2rem;
    width: 90%;
    max-width: 500px;
    border: 4px solid #000000;
    box-shadow: 8px 8px 0 #000000;
  }

  .modal-content h3 {
    color: #000000;
    margin-bottom: 1.5rem;
    font-size: 1.5rem;
    font-weight: 900;
    text-transform: uppercase;
    text-align: center;
  }

  .form-group {
    margin-bottom: 1.5rem;
  }

  .form-group label {
    display: block;
    margin-bottom: 0.5rem;
    color: #000000;
    font-weight: 900;
    text-transform: uppercase;
  }

  .form-group input,
  .form-group textarea {
    width: 100%;
    padding: 0.8rem;
    border: 2px solid #000000;
    background: #ffffff;
    color: #000000;
    font-weight: 900;
    text-transform: uppercase;
  }

  .form-group textarea {
    height: 100px;
    resize: vertical;
  }

  .modal-buttons {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
  }

  .cancel-button,
  .confirm-button {
    padding: 0.8rem 1.5rem;
    font-weight: 900;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 4px 4px 0 #000000;
  }

  .cancel-button {
    background: #ffffff;
    border: 2px solid #000000;
    color: #000000;
  }

  .confirm-button {
    background: #000000;
    border: 2px solid #000000;
    color: #ffffff;
  }

  .cancel-button:hover,
  .confirm-button:hover {
    transform: translate(-2px, -2px);
    box-shadow: 6px 6px 0 #000000;
  }

  .report-content {
    max-height: 90vh;
    overflow-y: auto;
  }

  .report-summary {
    background: #000000;
    color: #ffffff;
    padding: 1rem;
    margin-bottom: 1.5rem;
    border: 2px solid #000000;
  }

  .report-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    font-weight: 900;
    text-transform: uppercase;
  }

  .report-label {
    color: #ffffff;
  }

  .report-value {
    color: #ffffff;
  }

  .report-exercises {
    margin-bottom: 1.5rem;
  }

  .report-exercises h4 {
    color: #000000;
    margin-bottom: 1rem;
    font-size: 1.2rem;
    font-weight: 900;
    text-transform: uppercase;
  }

  .exercise-report {
    background: #ffffff;
    border: 2px solid #000000;
    padding: 1rem;
    margin-bottom: 1rem;
  }

  .exercise-report h5 {
    color: #000000;
    margin-bottom: 0.5rem;
    font-size: 1.1rem;
    font-weight: 900;
    text-transform: uppercase;
  }

  .exercise-report .exercise-details {
    display: flex;
    gap: 1rem;
    margin-bottom: 0.5rem;
    color: #000000;
    font-weight: 900;
    text-transform: uppercase;
  }

  .exercise-report .exercise-notes {
    color: #000000;
    font-style: italic;
    margin-top: 0.5rem;
  }

  .leaderboard-button {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    background: #000000;
    color: #ffffff;
    border: 2px solid #000000;
    padding: 1rem 2rem;
    font-weight: 900;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 4px 4px 0 #000000;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    z-index: 100;
  }

  .leaderboard-button.near-bottom {
    bottom: auto;
    top: 2rem;
  }

  .leaderboard-icon {
    font-size: 1.5rem;
  }

  .leaderboard-content {
    max-width: 600px;
  }

  .leaderboard-list {
    margin: 1.5rem 0;
  }

  .leaderboard-item {
    display: flex;
    align-items: center;
    padding: 1rem;
    background: #ffffff;
    border: 2px solid #000000;
    margin-bottom: 0.5rem;
    transition: all 0.2s ease;
  }

  .leaderboard-item.top-three {
    background: #000000;
    color: #ffffff;
  }

  .rank {
    width: 40px;
    height: 40px;
    background: #000000;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 900;
    font-size: 1.2rem;
    margin-right: 1rem;
  }

  .top-three .rank {
    background: #ffffff;
    color: #000000;
  }

  .user-info {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .user-name {
    font-weight: 900;
    text-transform: uppercase;
  }

  .user-stats {
    font-size: 0.9rem;
    opacity: 0.8;
  }

  @media (max-width: 768px) {
    .container {
      padding: 10px;
    }

    .glass-card {
      padding: 1rem;
    }

    .exercise-image {
      height: 200px;
    }

    .time-display {
      font-size: 3rem;
    }

    .timer-controls {
      flex-direction: column;
    }

    .time-selector {
      flex-wrap: wrap;
    }

    .exercise-details {
      grid-template-columns: 1fr;
    }

    .workout-details {
      flex-direction: column;
      align-items: center;
    }

    .workout-type-buttons {
      flex-direction: column;
      align-items: center;
    }

    .workout-type-button {
      width: 100%;
      max-width: 200px;
    }

    .report-item {
      flex-direction: column;
      align-items: center;
      text-align: center;
    }

    .exercise-report .exercise-details {
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
    }

    .banner-content h2 {
      font-size: 2rem;
    }

    .banner-content p {
      font-size: 1rem;
    }

    .leaderboard-button {
      bottom: 1rem;
      right: 1rem;
      padding: 0.8rem 1.5rem;
    }

    .leaderboard-button.near-bottom {
      bottom: auto;
      top: 1rem;
    }

    .leaderboard-content {
      width: 95%;
      margin: 1rem;
    }
  }

  /* Remover seletor não utilizado */
  .time-selector {
    display: none;
  }

  .promo-banner {
    width: 100%;
    background: #000000;
    color: #ffffff;
    padding: 2rem;
    margin-top: 2rem;
    border: 4px solid #000000;
    box-shadow: 8px 8px 0 #000000;
  }

  .promo-content {
    text-align: center;
  }

  .promo-content h3 {
    color: #ffffff;
    font-size: 2rem;
    font-weight: 900;
    text-transform: uppercase;
    margin-bottom: 1rem;
  }

  .promo-content p {
    color: #ffffff;
    font-size: 1.2rem;
    font-weight: 900;
    text-transform: uppercase;
    margin-bottom: 1.5rem;
  }

  .promo-button {
    display: inline-block;
    background: #ffffff;
    color: #000000;
    border: 2px solid #000000;
    padding: 1rem 2rem;
    font-weight: 900;
    text-transform: uppercase;
    text-decoration: none;
    transition: all 0.2s ease;
    box-shadow: 4px 4px 0 #000000;
  }

  .promo-button:hover {
    transform: translate(-2px, -2px);
    box-shadow: 6px 6px 0 #000000;
  }

  .premium-button {
    position: fixed;
    bottom: 2rem;
    left: 2rem;
    background: linear-gradient(45deg, #FFD700, #FFA500);
    color: #000000;
    border: 2px solid #000000;
    padding: 1rem 2rem;
    font-weight: 900;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 4px 4px 0 #000000;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    z-index: 100;
  }

  .premium-button.near-bottom {
    bottom: auto;
    top: 2rem;
  }

  .premium-icon {
    font-size: 1.5rem;
  }

  .premium-content {
    max-width: 600px;
  }

  .premium-features {
    margin: 2rem 0;
  }

  .feature-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    background: #ffffff;
    border: 2px solid #000000;
    margin-bottom: 1rem;
  }

  .feature-icon {
    font-size: 2rem;
  }

  .feature-info h4 {
    color: #000000;
    margin-bottom: 0.25rem;
    font-size: 1.1rem;
    font-weight: 900;
    text-transform: uppercase;
  }

  .feature-info p {
    color: #000000;
    font-size: 0.9rem;
    opacity: 0.8;
  }

  .premium-price {
    text-align: center;
    margin: 2rem 0;
    padding: 1rem;
    background: #000000;
    color: #ffffff;
    border: 2px solid #000000;
  }

  .price {
    font-size: 2.5rem;
    font-weight: 900;
    text-transform: uppercase;
  }

  .period {
    font-size: 1.2rem;
    opacity: 0.8;
  }

  @media (max-width: 768px) {
    .promo-content h3 {
      font-size: 1.5rem;
    }

    .promo-content p {
      font-size: 1rem;
    }

    .premium-button {
      bottom: 1rem;
      left: 1rem;
      padding: 0.8rem 1.5rem;
    }

    .premium-button.near-bottom {
      bottom: auto;
      top: 1rem;
    }

    .feature-item {
      flex-direction: column;
      text-align: center;
    }

    .feature-icon {
      font-size: 1.5rem;
    }
  }
</style>
