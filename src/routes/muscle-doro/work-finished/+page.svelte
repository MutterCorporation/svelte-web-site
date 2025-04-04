<script lang="ts">
  import { onMount } from 'svelte';
  import { currentWorkoutData, type WorkoutData } from '../store/exerciseStore';
  import { goto } from '$app/navigation';

  let workoutSummary: WorkoutData | null = null;
  let totalTime = 0;
  let totalWeight = 0;
  let totalReps = 0;
  let totalSets = 0;

  onMount(() => {
    if (!$currentWorkoutData) {
      goto('/muscle-doro');
      return;
    }

    workoutSummary = $currentWorkoutData;
    
    if (workoutSummary) {
      // Calcular tempo total em minutos
      totalTime = workoutSummary.endTime && workoutSummary.startTime 
        ? Math.round((workoutSummary.endTime - workoutSummary.startTime) / 1000 / 60)
        : 0;

      // Calcular totais
      workoutSummary.exercises.forEach(exercise => {
        totalWeight += exercise.weight;
        totalReps += exercise.reps;
      });
      totalSets = workoutSummary.exercises.length;
    }
  });
</script>

<div class="workout-finished">
  {#if workoutSummary}
    <div class="success-banner">
      <span class="success-icon">🎉</span>
      <h1>TREINO CONCLUÍDO!</h1>
      <p>Parabéns por mais um treino finalizado</p>
    </div>

    <div class="summary-card">
      <div class="workout-header">
        <h2>{workoutSummary.name}</h2>
        <span class="workout-type">{workoutSummary.type} #{workoutSummary.number}</span>
      </div>

      <div class="stats-grid">
        <div class="stat-card">
          <span class="stat-value">{totalTime}</span>
          <span class="stat-label">MINUTOS</span>
        </div>
        <div class="stat-card">
          <span class="stat-value">{totalWeight}</span>
          <span class="stat-label">KG TOTAL</span>
        </div>
        <div class="stat-card">
          <span class="stat-value">{totalReps}</span>
          <span class="stat-label">REPETIÇÕES</span>
        </div>
        <div class="stat-card">
          <span class="stat-value">{totalSets}</span>
          <span class="stat-label">SÉRIES</span>
        </div>
      </div>

      <div class="exercises-list">
        <h3>EXERCÍCIOS REALIZADOS</h3>
        {#each workoutSummary.exercises as exercise}
          <div class="exercise-card">
            <div class="exercise-header">
              <h4>{exercise.name}</h4>
              <span class="exercise-weight">{exercise.weight}kg</span>
            </div>
            <div class="exercise-details">
              <span>{exercise.reps} repetições</span>
              <span>{exercise.targetSets} séries</span>
            </div>
            {#if exercise.notes}
              <p class="exercise-notes">{exercise.notes}</p>
            {/if}
          </div>
        {/each}
      </div>

      <div class="progression-info">
        <h3>PRÓXIMO TREINO</h3>
        <p>{workoutSummary.progression.nextWorkout}</p>
        <ul class="progression-notes">
          {#each workoutSummary.progression.notes as note}
            <li>{note}</li>
          {/each}
        </ul>
      </div>

      <div class="action-buttons">
        <a href="/muscle-doro" class="button-primary">VOLTAR AO INÍCIO</a>
        <a href="/muscle-doro/dashboard" class="button-secondary">VER HISTÓRICO</a>
      </div>
    </div>
  {:else}
    <div class="error-state">
      <p>Nenhum treino finalizado encontrado.</p>
      <a href="/muscle-doro" class="button-primary">VOLTAR AO INÍCIO</a>
    </div>
  {/if}
</div>

<style>
  .workout-finished {
    min-height: 100vh;
    padding: 2rem;
    background: #000000;
    color: #ffffff;
  }

  .success-banner {
    text-align: center;
    margin-bottom: 2rem;
    animation: fadeIn 0.5s ease;
  }

  .success-icon {
    font-size: 4rem;
    display: block;
    margin-bottom: 1rem;
  }

  h1 {
    font-size: 2.5rem;
    font-weight: 900;
    margin-bottom: 0.5rem;
    text-transform: uppercase;
  }

  .summary-card {
    background: #ffffff;
    color: #000000;
    padding: 2rem;
    border: 4px solid #000000;
    box-shadow: 8px 8px 0 #000000;
    max-width: 800px;
    margin: 0 auto;
    animation: slideUp 0.5s ease;
  }

  .workout-header {
    text-align: center;
    margin-bottom: 2rem;
  }

  .workout-header h2 {
    font-size: 2rem;
    font-weight: 900;
    margin-bottom: 0.5rem;
    text-transform: uppercase;
  }

  .workout-type {
    background: #000000;
    color: #ffffff;
    padding: 0.5rem 1rem;
    font-weight: 900;
    text-transform: uppercase;
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1rem;
    margin-bottom: 2rem;
  }

  .stat-card {
    background: #000000;
    color: #ffffff;
    padding: 1rem;
    text-align: center;
    border: 2px solid #000000;
  }

  .stat-value {
    font-size: 2rem;
    font-weight: 900;
    display: block;
    margin-bottom: 0.5rem;
  }

  .stat-label {
    font-size: 0.875rem;
    font-weight: 700;
    text-transform: uppercase;
  }

  .exercises-list {
    margin-bottom: 2rem;
  }

  .exercises-list h3 {
    font-size: 1.5rem;
    font-weight: 900;
    margin-bottom: 1rem;
    text-transform: uppercase;
  }

  .exercise-card {
    background: #f5f5f5;
    padding: 1rem;
    margin-bottom: 1rem;
    border: 2px solid #000000;
  }

  .exercise-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
  }

  .exercise-header h4 {
    font-weight: 900;
    text-transform: uppercase;
    margin: 0;
  }

  .exercise-weight {
    background: #000000;
    color: #ffffff;
    padding: 0.25rem 0.5rem;
    font-weight: 700;
  }

  .exercise-details {
    display: flex;
    gap: 1rem;
    font-size: 0.875rem;
    margin-bottom: 0.5rem;
  }

  .exercise-notes {
    font-size: 0.875rem;
    color: #666;
    font-style: italic;
  }

  .progression-info {
    background: #f5f5f5;
    padding: 1rem;
    margin-bottom: 2rem;
    border: 2px solid #000000;
  }

  .progression-info h3 {
    font-size: 1.5rem;
    font-weight: 900;
    margin-bottom: 1rem;
    text-transform: uppercase;
  }

  .progression-notes {
    list-style: none;
    padding: 0;
    margin: 1rem 0 0;
  }

  .progression-notes li {
    margin-bottom: 0.5rem;
    padding-left: 1rem;
    border-left: 3px solid #000000;
  }

  .action-buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;
  }

  .button-primary,
  .button-secondary {
    padding: 1rem 2rem;
    font-weight: 900;
    text-transform: uppercase;
    text-decoration: none;
    transition: all 0.2s ease;
  }

  .button-primary {
    background: #000000;
    color: #ffffff;
    border: 2px solid #000000;
  }

  .button-secondary {
    background: #ffffff;
    color: #000000;
    border: 2px solid #000000;
  }

  .button-primary:hover,
  .button-secondary:hover {
    transform: translateY(-2px);
    box-shadow: 4px 4px 0 #000000;
  }

  .error-state {
    text-align: center;
    padding: 2rem;
    background: #ffffff;
    color: #000000;
    border: 4px solid #000000;
    box-shadow: 8px 8px 0 #000000;
    max-width: 600px;
    margin: 2rem auto;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes slideUp {
    from { 
      transform: translateY(20px);
      opacity: 0;
    }
    to { 
      transform: translateY(0);
      opacity: 1;
    }
  }

  @media (max-width: 768px) {
    .workout-finished {
      padding: 1rem;
    }

    .summary-card {
      padding: 1rem;
    }

    .stats-grid {
      grid-template-columns: repeat(2, 1fr);
    }

    .action-buttons {
      flex-direction: column;
    }

    .button-primary,
    .button-secondary {
      width: 100%;
      text-align: center;
    }

    .exercise-header {
      flex-direction: column;
      text-align: center;
      gap: 0.5rem;
    }

    .exercise-details {
      flex-direction: column;
      text-align: center;
      gap: 0.25rem;
    }
  }
</style> 