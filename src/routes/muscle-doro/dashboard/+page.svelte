<script lang="ts">
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import { currentWorkoutData, type WorkoutData } from '../store/exerciseStore';
  
  let workoutHistory: WorkoutData[] = [];
  let isLoading = true;
  let isOffline = false;
  let error: string | null = null;

  // Função para verificar conexão
  function checkOnlineStatus() {
    if (browser) {
      isOffline = !navigator.onLine;
      if (isOffline) {
        error = 'Você está offline. Verifique sua conexão.';
      }
    }
  }

  // Listener para mudanças de status de conexão
  if (browser) {
    window.addEventListener('online', () => {
      isOffline = false;
      error = null;
      fetchWorkoutHistory();
    });
    
    window.addEventListener('offline', () => {
      isOffline = true;
      error = 'Você está offline. Verifique sua conexão.';
    });
  }

  async function fetchWorkoutHistory() {
    try {
      checkOnlineStatus();
      if (isOffline) return;

      const response = await fetch('/api/workouts/history', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      workoutHistory = data;
      error = null;

    } catch (e) {
      console.error('Erro ao carregar histórico:', e);
      error = 'Não foi possível carregar o histórico de treinos.';
      
      // Em desenvolvimento, use dados locais
      if (import.meta.env.DEV) {
        workoutHistory = getLocalWorkouts();
        error = null;
      }
    } finally {
      isLoading = false;
    }
  }

  // Função para obter treinos salvos localmente
  function getLocalWorkouts(): WorkoutData[] {
    if (browser) {
      const savedWorkouts = localStorage.getItem('workoutHistory');
      if (savedWorkouts) {
        try {
          return JSON.parse(savedWorkouts);
        } catch (e) {
          console.error('Erro ao carregar treinos locais:', e);
        }
      }
    }
    return [];
  }

  // Salvar treinos localmente quando houver mudanças
  $: if (browser && workoutHistory.length > 0) {
    localStorage.setItem('workoutHistory', JSON.stringify(workoutHistory));
  }

  onMount(() => {
    checkOnlineStatus();
    fetchWorkoutHistory();
  });

  function formatDate(timestamp: number): string {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(timestamp));
  }

  function calculateProgress(workout: WorkoutData): number {
    const totalExercises = workout.exercises.length;
    if (totalExercises === 0) return 0;
    return (totalExercises / (workout.targetDuration || 1)) * 100;
  }
</script>

<div class="dashboard-container">
  <h1>MEU HISTÓRICO DE TREINOS</h1>

  {#if isOffline}
    <div class="offline-banner">
      <span class="offline-icon">📡</span>
      <p>Você está offline. Mostrando dados salvos localmente.</p>
    </div>
  {/if}

  {#if isLoading}
    <div class="loading-state">
      <div class="loader"></div>
      <p>Carregando histórico de treinos...</p>
    </div>
  {:else if error}
    <div class="error-state">
      <p class="error-message">{error}</p>
      <button 
        class="retry-button"
        on:click={fetchWorkoutHistory}
        disabled={isOffline}
      >
        Tentar Novamente
      </button>
    </div>
  {:else if workoutHistory.length === 0}
    <div class="empty-state">
      <p>Nenhum treino registrado ainda.</p>
      <a href="/muscle-doro" class="start-button">
        Começar Primeiro Treino
      </a>
    </div>
  {:else}
    <div class="workout-grid">
      {#each workoutHistory as workout}
        <div class="workout-card">
          <div class="workout-header">
            <h3>{workout.name}</h3>
            <span class="workout-date">{formatDate(workout.startTime)}</span>
          </div>

          <div class="workout-stats">
            <div class="stat">
              <span class="stat-label">MÚSCULO</span>
              <span class="stat-value">{workout.targetMuscle}</span>
            </div>
            <div class="stat">
              <span class="stat-label">DURAÇÃO</span>
              <span class="stat-value">
                {Math.round((workout.endTime - workout.startTime) / 1000 / 60)}min
              </span>
            </div>
            <div class="stat">
              <span class="stat-label">EXERCÍCIOS</span>
              <span class="stat-value">{workout.exercises.length}</span>
            </div>
          </div>

          <div class="progress-bar">
            <div 
              class="progress-fill"
              style="width: {calculateProgress(workout)}%"
            />
          </div>

          <div class="workout-exercises">
            {#each workout.exercises as exercise}
              <div class="exercise-item">
                <span class="exercise-name">{exercise.name}</span>
                <div class="exercise-details">
                  <span>{exercise.weight}kg</span>
                  <span>{exercise.reps} reps</span>
                </div>
              </div>
            {/each}
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  :global(:root) {
    --primary-color: #000000;
    --secondary-color: #ffffff;
    --accent-color: #ff0000;
    --gray-100: #f5f5f5;
    --gray-200: #eeeeee;
    --gray-300: #e0e0e0;
    --gray-400: #bdbdbd;
    --gray-500: #9e9e9e;
    --border-radius: 4px;
    --spacing-xs: 0.25rem;
    --spacing-sm: 0.5rem;
    --spacing-md: 1rem;
    --spacing-lg: 2rem;
  }

  .dashboard-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: var(--spacing-md);
  }

  h1 {
    font-size: 2rem;
    font-weight: 900;
    text-align: center;
    margin-bottom: var(--spacing-lg);
  }

  .workout-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: var(--spacing-md);
  }

  .workout-card {
    background: var(--secondary-color);
    border: 2px solid var(--primary-color);
    border-radius: var(--border-radius);
    padding: var(--spacing-md);
    transition: transform 0.2s ease;
  }

  .workout-card:hover {
    transform: translateY(-2px);
  }

  .workout-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing-md);
  }

  .workout-header h3 {
    font-weight: 900;
    margin: 0;
  }

  .workout-date {
    font-size: 0.875rem;
    color: var(--gray-500);
  }

  .workout-stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--spacing-sm);
    margin-bottom: var(--spacing-md);
  }

  .stat {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .stat-label {
    font-size: 0.75rem;
    font-weight: 700;
    color: var(--gray-500);
    margin-bottom: var(--spacing-xs);
  }

  .stat-value {
    font-size: 1.125rem;
    font-weight: 900;
  }

  .progress-bar {
    height: 4px;
    background: var(--gray-200);
    border-radius: var(--border-radius);
    margin-bottom: var(--spacing-md);
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    background: var(--accent-color);
    transition: width 0.3s ease;
  }

  .workout-exercises {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
  }

  .exercise-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--spacing-sm);
    background: var(--gray-100);
    border-radius: var(--border-radius);
  }

  .exercise-name {
    font-weight: 700;
  }

  .exercise-details {
    display: flex;
    gap: var(--spacing-md);
    color: var(--gray-500);
  }

  .loading-state,
  .error-state,
  .empty-state {
    text-align: center;
    padding: var(--spacing-lg);
  }

  .loader {
    width: 40px;
    height: 40px;
    border: 4px solid var(--gray-200);
    border-top-color: var(--accent-color);
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  .retry-button,
  .start-button {
    display: inline-block;
    padding: var(--spacing-md) var(--spacing-lg);
    margin-top: var(--spacing-md);
    background: var(--primary-color);
    color: var(--secondary-color);
    border: none;
    border-radius: var(--border-radius);
    font-weight: 700;
    text-transform: uppercase;
    text-decoration: none;
    cursor: pointer;
    transition: transform 0.2s ease;
  }

  .retry-button:hover,
  .start-button:hover {
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    .workout-grid {
      grid-template-columns: 1fr;
    }

    .workout-stats {
      grid-template-columns: repeat(2, 1fr);
    }

    .stat:last-child {
      grid-column: span 2;
    }
  }

  @media (max-width: 480px) {
    h1 {
      font-size: 1.5rem;
    }

    .workout-card {
      padding: var(--spacing-sm);
    }

    .exercise-details {
      flex-direction: column;
      gap: var(--spacing-xs);
      text-align: right;
    }
  }

  .error-state {
    text-align: center;
    padding: var(--spacing-lg);
    background: var(--gray-100);
    border-radius: var(--border-radius);
  }

  .error-message {
    color: var(--accent-color);
    margin-bottom: var(--spacing-md);
  }

  .retry-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .offline-banner {
    background: var(--gray-200);
    color: var(--gray-700);
    padding: var(--spacing-md);
    border-radius: var(--border-radius);
    margin-bottom: var(--spacing-lg);
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
  }

  .offline-icon {
    font-size: 1.5rem;
  }

  @media (max-width: 768px) {
    .offline-banner {
      flex-direction: column;
      text-align: center;
    }
  }
</style>
