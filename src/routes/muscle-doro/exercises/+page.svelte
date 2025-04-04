<script lang="ts">
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';

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

  onMount(() => {
    if (browser) {
      fetchExercises();
    }
  });
</script>

<div class="container">
  <div class="banner">
    <div class="banner-content">
      <h2>EXERCÍCIOS</h2>
      <p>CATÁLOGO COMPLETO DE EXERCÍCIOS</p>
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
      <div class="exercises-grid">
        {#each exercises as exercise}
          <div class="exercise-card">
            <div class="exercise-image">
              <img src={exercise.imageUrl} alt={exercise.name} />
            </div>
            <div class="exercise-info">
              <h3>{exercise.name}</h3>
              <p class="description">{exercise.description}</p>
              <div class="exercise-details">
                <span>MÚSCULO: {exercise.targetMuscle}</span>
                <span>DIFICULDADE: {exercise.difficulty}</span>
                <span>SÉRIES: {exercise.sets}</span>
                <span>REPS: {exercise.reps}</span>
                <span>DESCANSO: {exercise.rest}s</span>
              </div>
              <a href="/muscle-doro/exercises/{exercise.uid}" class="view-details">VER DETALHES</a>
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </div>
</div>

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

  .loading-state, .error-state {
    text-align: center;
    padding: 2rem;
    font-weight: 900;
    text-transform: uppercase;
  }

  .error-state {
    color: #ff0000;
  }

  .exercises-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
  }

  .exercise-card {
    background: #ffffff;
    border: 2px solid #000000;
    overflow: hidden;
    box-shadow: 4px 4px 0 #000000;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  .exercise-card:hover {
    transform: translate(-2px, -2px);
    box-shadow: 6px 6px 0 #000000;
  }

  .exercise-image {
    width: 100%;
    height: auto;
    max-height: 300px;
    overflow: hidden;
    background: #f5f5f5;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .exercise-image img {
    width: 100%;
    height: auto;
    max-height: 300px;
    object-fit: contain;
    display: block;
  }

  .exercise-card:hover .exercise-image img {
    transform: scale(1.05);
  }

  .exercise-info {
    padding: 1.5rem;
  }

  .exercise-info h3 {
    color: #000000;
    font-size: 1.5rem;
    font-weight: 900;
    text-transform: uppercase;
    margin-bottom: 0.5rem;
  }

  .description {
    color: #000000;
    margin-bottom: 1rem;
    line-height: 1.4;
  }

  .exercise-details {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem;
    font-weight: 900;
    text-transform: uppercase;
  }

  .exercise-details span {
    background: #000000;
    color: #ffffff;
    padding: 0.5rem;
    text-align: center;
  }

  .view-details {
    display: inline-block;
    background: #000000;
    color: #ffffff;
    padding: 0.8rem 1.5rem;
    text-decoration: none;
    font-weight: 900;
    text-transform: uppercase;
    margin-top: 1rem;
    border: 2px solid #000000;
    transition: all 0.3s ease;
  }

  .view-details:hover {
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

    .exercises-grid {
      grid-template-columns: 1fr;
    }

    .exercise-image {
      max-height: 250px;
    }

    .exercise-image img {
      max-height: 250px;
    }

    .banner-content h2 {
      font-size: 2rem;
    }

    .banner-content p {
      font-size: 1rem;
    }

    .exercise-details {
      grid-template-columns: 1fr;
    }
  }
</style> 