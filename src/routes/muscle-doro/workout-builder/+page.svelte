<script lang="ts">
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import { workoutBuilder } from '../store/workoutBuilderStore';

  interface Exercise {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    targetMuscle: string;
    difficulty: string;
    sets: number;
    reps: number;
    rest: number;
    tips: string[];
    muscles: string[];
    equipment: string[];
    uid: string;
  }

  let exercises: Exercise[] = [];
  let loading = true;
  let error: string | null = null;
  let showExerciseModal = false;
  let selectedExercise: Exercise | null = null;
  let workoutName = '';
  let workoutDescription = '';
  let workoutDifficulty = 'INICIANTE';
  let workoutTargetMuscle = '';

  const difficulties = ['INICIANTE', 'INTERMEDIÁRIO', 'AVANÇADO'];
  const targetMuscles = [
    'PEITO', 'COSTAS', 'OMBROS', 'BÍCEPS', 'TRÍCEPS',
    'PERNAS', 'ABDOMINAIS', 'GLÚTEOS', 'CARDIO'
  ];

  async function fetchExercises() {
    try {
      const response = await fetch('https://dev.muttercorp.com.br/muscle-doro/exercises');
      if (!response.ok) {
        throw new Error('Erro ao carregar exercícios');
      }
      exercises = await response.json();
    } catch (err) {
      error = 'Não foi possível carregar os exercícios. Tente novamente mais tarde.';
      console.error('Erro:', err);
    } finally {
      loading = false;
    }
  }

  function addExerciseToWorkout(exercise: Exercise) {
    workoutBuilder.addExercise({
      uid: exercise.uid,
      name: exercise.name,
      sets: exercise.sets,
      reps: exercise.reps,
      weight: 0,
      rest: exercise.rest
    });
    showExerciseModal = false;
    selectedExercise = null;
  }

  function removeExercise(uid: string) {
    workoutBuilder.removeExercise(uid);
  }

  function updateExercise(uid: string, updates: Partial<ExerciseInWorkout>) {
    workoutBuilder.updateExercise(uid, updates);
  }

  function saveWorkout() {
    if (!$workoutBuilder.selectedExercises.length) {
      alert('Adicione pelo menos um exercício ao treino');
      return;
    }

    if (!workoutName || !workoutDescription || !workoutTargetMuscle) {
      alert('Preencha todos os campos do treino');
      return;
    }

    const totalDuration = workoutBuilder.calculateTotalDuration($workoutBuilder.selectedExercises);

    workoutBuilder.saveWorkoutTemplate({
      name: workoutName,
      description: workoutDescription,
      exercises: $workoutBuilder.selectedExercises,
      totalDuration,
      difficulty: workoutDifficulty,
      targetMuscle: workoutTargetMuscle
    });

    // Limpar formulário
    workoutName = '';
    workoutDescription = '';
    workoutDifficulty = 'INICIANTE';
    workoutTargetMuscle = '';
    workoutBuilder.clearSelectedExercises();
  }

  onMount(() => {
    if (browser) {
      fetchExercises();
    }
  });
</script>

<div class="container">
  <div class="banner">
    <div class="banner-content">
      <h2>CRIAR TREINO</h2>
      <p>MONTE SEU TREINO PERSONALIZADO</p>
    </div>
  </div>

  <div class="glass-card">
    {#if loading}
      <div class="loading-state">
        <p>CARREGANDO EXERCÍCIOS...</p>
      </div>
    {:else if error}
      <div class="error-state">
        <p>{error}</p>
      </div>
    {:else}
      <div class="workout-builder">
        <div class="workout-info">
          <div class="form-group">
            <label for="workout-name">NOME DO TREINO</label>
            <input 
              type="text" 
              id="workout-name"
              bind:value={workoutName}
              placeholder="Ex: Treino de Força"
            />
          </div>

          <div class="form-group">
            <label for="workout-description">DESCRIÇÃO</label>
            <textarea 
              id="workout-description"
              bind:value={workoutDescription}
              placeholder="Descreva o objetivo do treino..."
            ></textarea>
          </div>

          <div class="form-group">
            <label for="workout-difficulty">DIFICULDADE</label>
            <select id="workout-difficulty" bind:value={workoutDifficulty}>
              {#each difficulties as difficulty}
                <option value={difficulty}>{difficulty}</option>
              {/each}
            </select>
          </div>

          <div class="form-group">
            <label for="workout-target">MÚSCULO PRINCIPAL</label>
            <select id="workout-target" bind:value={workoutTargetMuscle}>
              <option value="">Selecione um músculo</option>
              {#each targetMuscles as muscle}
                <option value={muscle}>{muscle}</option>
              {/each}
            </select>
          </div>
        </div>

        <div class="exercises-section">
          <h3>EXERCÍCIOS SELECIONADOS</h3>
          {#if $workoutBuilder.selectedExercises.length === 0}
            <p class="no-exercises">Nenhum exercício selecionado</p>
          {:else}
            <div class="selected-exercises">
              {#each $workoutBuilder.selectedExercises as exercise}
                <div class="exercise-item">
                  <div class="exercise-header">
                    <h4>{exercise.name}</h4>
                    <button 
                      class="remove-button"
                      on:click={() => removeExercise(exercise.uid)}
                    >
                      X
                    </button>
                  </div>
                  <div class="exercise-params">
                    <div class="param-group">
                      <label>SÉRIES</label>
                      <input 
                        type="number" 
                        min="1"
                        bind:value={exercise.sets}
                        on:change={() => updateExercise(exercise.uid, { sets: exercise.sets })}
                      />
                    </div>
                    <div class="param-group">
                      <label>REPS</label>
                      <input 
                        type="number" 
                        min="1"
                        bind:value={exercise.reps}
                        on:change={() => updateExercise(exercise.uid, { reps: exercise.reps })}
                      />
                    </div>
                    <div class="param-group">
                      <label>PESO (KG)</label>
                      <input 
                        type="number" 
                        min="0"
                        bind:value={exercise.weight}
                        on:change={() => updateExercise(exercise.uid, { weight: exercise.weight })}
                      />
                    </div>
                    <div class="param-group">
                      <label>DESCANSO (S)</label>
                      <input 
                        type="number" 
                        min="0"
                        bind:value={exercise.rest}
                        on:change={() => updateExercise(exercise.uid, { rest: exercise.rest })}
                      />
                    </div>
                  </div>
                </div>
              {/each}
            </div>
          {/if}

          <button 
            class="add-exercise-button"
            on:click={() => {
              selectedExercise = null;
              showExerciseModal = true;
            }}
          >
            ADICIONAR EXERCÍCIO
          </button>
        </div>

        <div class="workout-summary">
          <h3>RESUMO DO TREINO</h3>
          <div class="summary-content">
            <p>DURAÇÃO TOTAL: {Math.round(workoutBuilder.calculateTotalDuration($workoutBuilder.selectedExercises) / 60)}min</p>
            <p>EXERCÍCIOS: {$workoutBuilder.selectedExercises.length}</p>
          </div>
        </div>

        <button 
          class="save-workout-button"
          on:click={saveWorkout}
        >
          SALVAR TREINO
        </button>
      </div>
    {/if}
  </div>
</div>

{#if showExerciseModal}
  <div 
    class="modal-overlay" 
    on:click={() => showExerciseModal = false}
  >
    <div 
      class="modal-content" 
      on:click|stopPropagation
    >
      <h3>ADICIONAR EXERCÍCIO</h3>
      <div class="exercises-list">
        {#each exercises as exercise}
          <div 
            class="exercise-option"
            on:click={() => addExerciseToWorkout(exercise)}
          >
            <img src={exercise.imageUrl} alt={exercise.name} />
            <div class="exercise-info">
              <h4>{exercise.name}</h4>
              <p>{exercise.description}</p>
              <div class="exercise-tags">
                <span>{exercise.targetMuscle}</span>
                <span>{exercise.difficulty}</span>
              </div>
            </div>
          </div>
        {/each}
      </div>
      <button 
        class="close-button"
        on:click={() => showExerciseModal = false}
      >
        FECHAR
      </button>
    </div>
  </div>
{/if}

<style>
  .container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
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
    max-width: 1200px;
    color: #000000;
    border: 4px solid #000000;
    box-shadow: 8px 8px 0 #000000;
  }

  .workout-builder {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .workout-info {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
    padding: 1rem;
    background: #f5f5f5;
    border: 2px solid #000000;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .form-group label {
    font-weight: 900;
    text-transform: uppercase;
  }

  .form-group input,
  .form-group textarea,
  .form-group select {
    padding: 0.8rem;
    border: 2px solid #000000;
    font-weight: 900;
    text-transform: uppercase;
  }

  .form-group textarea {
    height: 100px;
    resize: vertical;
  }

  .exercises-section {
    padding: 1rem;
    background: #f5f5f5;
    border: 2px solid #000000;
  }

  .exercises-section h3 {
    margin-bottom: 1rem;
    font-size: 1.5rem;
    font-weight: 900;
    text-transform: uppercase;
  }

  .no-exercises {
    text-align: center;
    padding: 2rem;
    font-weight: 900;
    text-transform: uppercase;
    color: #666;
  }

  .selected-exercises {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .exercise-item {
    background: #ffffff;
    border: 2px solid #000000;
    padding: 1rem;
  }

  .exercise-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }

  .exercise-header h4 {
    font-size: 1.2rem;
    font-weight: 900;
    text-transform: uppercase;
  }

  .remove-button {
    background: #ff0000;
    color: #ffffff;
    border: none;
    width: 30px;
    height: 30px;
    font-weight: 900;
    cursor: pointer;
  }

  .exercise-params {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1rem;
  }

  .param-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .param-group label {
    font-weight: 900;
    text-transform: uppercase;
    font-size: 0.9rem;
  }

  .param-group input {
    padding: 0.5rem;
    border: 2px solid #000000;
    font-weight: 900;
  }

  .add-exercise-button {
    background: #000000;
    color: #ffffff;
    border: 2px solid #000000;
    padding: 1rem;
    font-weight: 900;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .add-exercise-button:hover {
    background: #ffffff;
    color: #000000;
  }

  .workout-summary {
    padding: 1rem;
    background: #000000;
    color: #ffffff;
    border: 2px solid #000000;
  }

  .workout-summary h3 {
    margin-bottom: 1rem;
    font-size: 1.5rem;
    font-weight: 900;
    text-transform: uppercase;
  }

  .summary-content {
    display: flex;
    justify-content: space-around;
    font-weight: 900;
    text-transform: uppercase;
  }

  .save-workout-button {
    background: #000000;
    color: #ffffff;
    border: 2px solid #000000;
    padding: 1rem;
    font-weight: 900;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .save-workout-button:hover {
    background: #ffffff;
    color: #000000;
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
    max-width: 800px;
    max-height: 90vh;
    overflow-y: auto;
    border: 4px solid #000000;
    box-shadow: 8px 8px 0 #000000;
  }

  .exercises-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
    margin: 1rem 0;
  }

  .exercise-option {
    background: #ffffff;
    border: 2px solid #000000;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .exercise-option:hover {
    transform: translate(-2px, -2px);
    box-shadow: 4px 4px 0 #000000;
  }

  .exercise-option img {
    width: 100%;
    height: 150px;
    object-fit: cover;
  }

  .exercise-info {
    padding: 1rem;
  }

  .exercise-info h4 {
    font-size: 1.1rem;
    font-weight: 900;
    text-transform: uppercase;
    margin-bottom: 0.5rem;
  }

  .exercise-info p {
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
  }

  .exercise-tags {
    display: flex;
    gap: 0.5rem;
  }

  .exercise-tags span {
    background: #000000;
    color: #ffffff;
    padding: 0.3rem 0.8rem;
    font-size: 0.8rem;
    font-weight: 900;
    text-transform: uppercase;
  }

  .close-button {
    background: #000000;
    color: #ffffff;
    border: 2px solid #000000;
    padding: 0.8rem 1.5rem;
    font-weight: 900;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .close-button:hover {
    background: #ffffff;
    color: #000000;
  }

  @media (max-width: 768px) {
    .container {
      padding: 10px;
    }

    .glass-card {
      padding: 1rem;
    }

    .workout-info {
      grid-template-columns: 1fr;
    }

    .exercise-params {
      grid-template-columns: 1fr;
    }

    .exercises-list {
      grid-template-columns: 1fr;
    }

    .banner-content h2 {
      font-size: 2rem;
    }

    .banner-content p {
      font-size: 1rem;
    }
  }
</style> 