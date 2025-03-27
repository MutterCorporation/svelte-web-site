<script lang="ts">
  import { onMount } from 'svelte';
  import { currentWorkout, timeLeft, isRunning as storeIsRunning, currentExercise, selectedWorkoutType, workoutNumber, workoutTypes } from './store/store';
  import { mockWorkouts } from './mockData';

  interface Exercise {
    name: string;
    sets: number;
    reps: string;
    rest: number;
    imageUrl: string;
  }

  interface Workout {
    id: number;
    name: string;
    targetMuscle: string;
    duration: number;
    difficulty: string;
    exercises: Exercise[];
  }

  // URLs dos sons
  const SOUND_URLS = {
    click: 'https://cdn.pixabay.com/download/audio/2022/03/24/audio_c8c6a797f1.mp3?filename=click-button-140881.mp3',
    timerEnd: 'https://cdn.pixabay.com/download/audio/2022/03/19/audio_c8c6a797f1.mp3?filename=notification-sound-127856.mp3',
    hover: 'https://cdn.pixabay.com/download/audio/2021/08/04/audio_c8c6a797f1.mp3?filename=hover-pop-125867.mp3'
  };

  let timer: number;
  let selectedMinutes = 25;
  let lastSelectedMinutes = selectedMinutes;
  let time = selectedMinutes * 60;
  let isRunning = false;
  let loading = false;
  let currentSet = 0;
  let currentRep = 0;
  let currentExerciseIndex = 0;
  let workoutDuration = 0;
  let workoutStartTime: number | null = null;
  let workoutEndTime: number | null = null;
  let currentWeight = '';
  let actualReps = '';
  let notes = '';
  let showExerciseModal = false;
  let searchQuery = '';
  let showSearchModal = false;

  // Sons
  let clickSound: HTMLAudioElement;
  let timerEndSound: HTMLAudioElement;
  let hoverSound: HTMLAudioElement;
  let isMuted = false;

  // Responsividade
  let isMobile = false;

  async function fetchWorkout() {
    loading = true;
    try {
      console.log('Buscando treino:', {
        type: $selectedWorkoutType,
        number: $workoutNumber
      });

      // Usar dados mockados ao invés da API
      const workout = mockWorkouts[$selectedWorkoutType]?.[$workoutNumber];
      
      if (!workout) {
        throw new Error('Treino não encontrado');
      }

      console.log('Treino encontrado:', workout);
      currentWorkout.set(workout);
      selectNextExercise();
    } catch (err) {
      console.error('Erro ao buscar treino:', err);
    } finally {
      loading = false;
    }
  }

  function selectNextExercise() {
    const workout = $currentWorkout;
    if (!workout || workout.exercises.length === 0) return;
    
    if (currentExerciseIndex >= workout.exercises.length) {
      currentExerciseIndex = 0;
    }
    
    currentExercise.set(workout.exercises[currentExerciseIndex]);
    currentSet = 0;
    currentRep = 0;
  }

  // Format time for display
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  function updateTimer() {
    lastSelectedMinutes = selectedMinutes;
    time = selectedMinutes * 60;
  }

  function startTimer() {
    if (!isRunning) {
      playSound(clickSound);
      isRunning = true;
      if (!workoutStartTime) {
        workoutStartTime = Date.now();
      }
      timer = setInterval(() => {
        if (time > 0) {
          time--;
        } else {
          clearInterval(timer);
          isRunning = false;
          playSound(timerEndSound);
          selectNextExercise();
          time = lastSelectedMinutes * 60;
          notify();
        }
      }, 1000) as unknown as number;
    }
  }

  function pauseTimer() {
    clearInterval(timer);
    isRunning = false;
  }

  function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    time = lastSelectedMinutes * 60;
  }

  function incrementRep() {
    if (!$currentExercise) return;
    
    currentRep++;
    if (currentRep >= parseInt($currentExercise.reps)) {
      currentRep = 0;
      currentSet++;
      
      if (currentSet >= $currentExercise.sets) {
        currentExerciseIndex++;
        selectNextExercise();
      }
    }
  }

  // Notification
  function notify() {
    if (Notification.permission === "granted") {
      new Notification("Pomodoro Completo!", {
        body: "Hora de fazer uma pausa e mudar para o próximo exercício!",
      });
    }
  }

  function incrementWorkoutNumber() {
    workoutNumber.update(n => n + 1);
    fetchWorkout();
  }

  function decrementWorkoutNumber() {
    workoutNumber.update(n => Math.max(1, n - 1));
    fetchWorkout();
  }

  function changeWorkoutType(type: string) {
    selectedWorkoutType.set(type);
    workoutNumber.set(1);
    fetchWorkout();
  }

  function finishExercise() {
    if (!$currentExercise) return;

    const exerciseData = {
      name: $currentExercise.name,
      weight: currentWeight,
      actualReps,
      notes,
      duration: Date.now() - (workoutStartTime || Date.now())
    };

    console.log('Exercício finalizado:', exerciseData);
    
    // Limpar dados
    currentWeight = '';
    actualReps = '';
    notes = '';
    showExerciseModal = false;

    // Avançar para próximo exercício
    currentExerciseIndex++;
    selectNextExercise();
  }

  onMount(() => {
    clickSound = new Audio(SOUND_URLS.click);
    timerEndSound = new Audio(SOUND_URLS.timerEnd);
    hoverSound = new Audio(SOUND_URLS.hover);
    
    clickSound.load();
    timerEndSound.load();
    hoverSound.load();
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    fetchWorkout();
    lastSelectedMinutes = selectedMinutes;

    Notification.requestPermission();
    return () => {
      if (timer) clearInterval(timer);
      window.removeEventListener('resize', checkMobile);
    };
  });

  function checkMobile() {
    isMobile = window.innerWidth < 768;
  }

  async function playSound(sound: HTMLAudioElement) {
    if (!isMuted && sound) {
      try {
        sound.currentTime = 0;
        await sound.play();
      } catch (err) {
        console.error('Erro ao tocar som:', err);
      }
    }
  }
</script>

<div class="container">
  <div class="glass-card">
    <h1>Muscle-doro</h1>
    
    <div class="workout-selector">
      <div class="workout-type-selector">
        <h3>Modalidade</h3>
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
        <h3>Número do Treino</h3>
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
          <span>Músculo: {$currentWorkout.targetMuscle}</span>
          <span>Duração: {$currentWorkout.duration}min</span>
          <span>Dificuldade: {$currentWorkout.difficulty}</span>
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
          Iniciar
        </button>
        <button 
          class="timer-button" 
          on:click={pauseTimer} 
          disabled={!isRunning}
          on:mouseenter={() => playSound(hoverSound)}
        >
          Pausar
        </button>
        <button 
          class="timer-button" 
          on:click={resetTimer}
          on:mouseenter={() => playSound(hoverSound)}
        >
          Resetar
        </button>
      </div>
      <div class="time-selector">
        <button 
          class="time-option" 
          class:selected={selectedMinutes === 25}
          on:click={() => { selectedMinutes = 25; updateTimer(); }}
          on:mouseenter={() => playSound(hoverSound)}
        >
          25min
        </button>
        <button 
          class="time-option"
          class:selected={selectedMinutes === 5}
          on:click={() => { selectedMinutes = 5; updateTimer(); }}
          on:mouseenter={() => playSound(hoverSound)}
        >
          5min
        </button>
        <button 
          class="time-option"
          class:selected={selectedMinutes === 15}
          on:click={() => { selectedMinutes = 15; updateTimer(); }}
          on:mouseenter={() => playSound(hoverSound)}
        >
          15min
        </button>
      </div>
    </div>

    <div class="exercise-section">
      <h2>Exercício Atual</h2>
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
                Finalizar Exercício
              </button>
            </div>
          </div>
          <h3>{$currentExercise.name}</h3>
          <div class="exercise-details">
            <span>Séries: {$currentExercise.sets}</span>
            <span>Repetições: {$currentExercise.reps}</span>
            <span>Descanso: {$currentExercise.rest}s</span>
          </div>
          <div class="progress-section">
            <div class="progress-info">
              <span>Série: {currentSet + 1}/{$currentExercise.sets}</span>
              <span>Repetição: {currentRep}/{$currentExercise.reps}</span>
            </div>
            <button 
              class="increment-button"
              on:click={incrementRep}
              on:mouseenter={() => playSound(hoverSound)}
            >
              Próxima Repetição
            </button>
          </div>
        </div>
      {:else}
        <div class="loading-card">
          <p>Carregando exercícios...</p>
        </div>
      {/if}
    </div>
  </div>
</div>

{#if showExerciseModal}
  <div class="modal-overlay" on:click={() => showExerciseModal = false}>
    <div class="modal-content" on:click|stopPropagation>
      <h3>Finalizar Exercício</h3>
      <div class="form-group">
        <label>Carga (kg)</label>
        <input 
          type="number" 
          bind:value={currentWeight} 
          placeholder="Ex: 20"
        />
      </div>
      <div class="form-group">
        <label>Repetições Realizadas</label>
        <input 
          type="number" 
          bind:value={actualReps} 
          placeholder="Ex: 12"
        />
      </div>
      <div class="form-group">
        <label>Anotações</label>
        <textarea 
          bind:value={notes} 
          placeholder="Observações sobre o exercício..."
        ></textarea>
      </div>
      <div class="modal-buttons">
        <button 
          class="cancel-button"
          on:click={() => showExerciseModal = false}
        >
          Cancelar
        </button>
        <button 
          class="confirm-button"
          on:click={finishExercise}
        >
          Finalizar
        </button>
      </div>
    </div>
  </div>
{/if}

{#if showSearchModal}
  <div class="modal-overlay" on:click={() => showSearchModal = false}>
    <div class="modal-content" on:click|stopPropagation>
      <h3>Buscar Treino</h3>
      <div class="form-group">
        <input 
          type="text" 
          bind:value={searchQuery} 
          placeholder="Digite o nome do treino..."
        />
      </div>
      <div class="modal-buttons">
        <button 
          class="cancel-button"
          on:click={() => showSearchModal = false}
        >
          Cancelar
        </button>
        <button 
          class="confirm-button"
          on:click={() => {
            fetchWorkout();
            showSearchModal = false;
          }}
        >
          Buscar
        </button>
      </div>
    </div>
  </div>
{/if}

<style>
  .container {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%);
  }

  .glass-card {
    background: rgba(255, 165, 0, 0.1);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    padding: 2rem;
    box-shadow: 0 8px 32px 0 rgba(255, 165, 0, 0.2);
    border: 1px solid rgba(255, 165, 0, 0.2);
    width: 100%;
    max-width: 600px;
    color: #ffffff;
  }

  h1 {
    text-align: center;
    color: #ffa500;
    margin-bottom: 2rem;
    font-size: 2.5rem;
    text-shadow: 0 0 10px rgba(255, 165, 0, 0.5);
  }

  .workout-info {
    text-align: center;
    margin-bottom: 2rem;
    padding: 1rem;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 10px;
  }

  .workout-info h2 {
    color: #ffa500;
    margin-bottom: 1rem;
  }

  .workout-details {
    display: flex;
    justify-content: center;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .workout-details span {
    background: rgba(255, 165, 0, 0.1);
    padding: 0.5rem 1rem;
    border-radius: 15px;
    color: #ffa500;
  }

  .timer-section {
    text-align: center;
    margin-bottom: 2rem;
  }

  .time-display {
    font-size: 4rem;
    font-weight: bold;
    color: #ffa500;
    text-shadow: 0 0 20px rgba(255, 165, 0, 0.5);
    margin-bottom: 1rem;
  }

  .timer-controls {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-bottom: 1rem;
  }

  .timer-button {
    background: rgba(255, 165, 0, 0.2);
    border: 1px solid rgba(255, 165, 0, 0.3);
    color: #ffa500;
    padding: 0.5rem 1.5rem;
    border-radius: 25px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .timer-button:hover:not(:disabled) {
    background: rgba(255, 165, 0, 0.3);
    transform: translateY(-2px);
  }

  .timer-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .time-selector {
    display: flex;
    gap: 1rem;
    justify-content: center;
  }

  .time-option {
    background: rgba(255, 165, 0, 0.1);
    border: 1px solid rgba(255, 165, 0, 0.2);
    color: #ffa500;
    padding: 0.5rem 1rem;
    border-radius: 15px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .time-option.selected {
    background: rgba(255, 165, 0, 0.3);
    border-color: #ffa500;
  }

  .time-option:hover {
    background: rgba(255, 165, 0, 0.2);
  }

  .exercise-section {
    margin-bottom: 2rem;
  }

  h2 {
    color: #ffa500;
    margin-bottom: 1rem;
    text-align: center;
  }

  .exercise-card {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 15px;
    padding: 1.5rem;
    border: 1px solid rgba(255, 165, 0, 0.2);
  }

  .exercise-image {
    position: relative;
    width: 100%;
    height: 200px;
    margin-bottom: 1rem;
    border-radius: 10px;
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
    background: rgba(0, 0, 0, 0.5);
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
    color: #ffa500;
    margin-bottom: 0.5rem;
  }

  .exercise-details {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    margin-top: 1rem;
    color: #ffffff;
    font-size: 0.9rem;
  }

  .progress-section {
    margin-top: 1.5rem;
    text-align: center;
  }

  .progress-info {
    display: flex;
    justify-content: space-around;
    margin-bottom: 1rem;
    color: #ffa500;
    font-weight: bold;
  }

  .increment-button {
    background: rgba(255, 165, 0, 0.2);
    border: 1px solid rgba(255, 165, 0, 0.3);
    color: #ffa500;
    padding: 0.5rem 1.5rem;
    border-radius: 25px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .increment-button:hover {
    background: rgba(255, 165, 0, 0.3);
    transform: translateY(-2px);
  }

  .loading-card {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 15px;
    padding: 2rem;
    text-align: center;
    color: #ffa500;
  }

  .workout-selector {
    margin-bottom: 2rem;
    padding: 1rem;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 10px;
  }

  .workout-type-selector, .workout-number-selector {
    margin-bottom: 1rem;
  }

  .workout-type-selector h3, .workout-number-selector h3 {
    color: #ffa500;
    margin-bottom: 0.5rem;
    text-align: center;
  }

  .workout-type-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    justify-content: center;
  }

  .workout-type-button {
    background: rgba(255, 165, 0, 0.1);
    border: 1px solid rgba(255, 165, 0, 0.2);
    color: #ffa500;
    padding: 0.5rem 1rem;
    border-radius: 15px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .workout-type-button.selected {
    background: rgba(255, 165, 0, 0.3);
    border-color: #ffa500;
  }

  .workout-type-button:hover {
    background: rgba(255, 165, 0, 0.2);
  }

  .workout-number-controls {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }

  .number-button {
    background: rgba(255, 165, 0, 0.2);
    border: 1px solid rgba(255, 165, 0, 0.3);
    color: #ffa500;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 1.5rem;
  }

  .number-button:hover {
    background: rgba(255, 165, 0, 0.3);
    transform: scale(1.1);
  }

  .workout-number {
    color: #ffa500;
    font-size: 1.5rem;
    font-weight: bold;
    min-width: 40px;
    text-align: center;
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
  }
</style> 