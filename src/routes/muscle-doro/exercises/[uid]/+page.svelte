<script lang="ts">
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import { page } from '$app/stores';

  interface Exercise {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    tips: string[];
    muscles: string[];
    equipment: string[];
    uid: string;
  }

  let exercise: Exercise | null = null;
  let loading = true;
  let error: string | null = null;

  async function fetchExercise() {
    try {
      const response = await fetch('https://dev.muttercorp.com.br/muscle-doro/exercises');
      if (!response.ok) {
        throw new Error('Erro ao carregar exercícios');
      }
      const exercises = await response.json();
      exercise = exercises.find((e: Exercise) => e.uid === $page.params.uid);
      
      if (!exercise) {
        throw new Error('Exercício não encontrado');
      }
    } catch (err) {
      error = 'Não foi possível carregar o exercício. Tente novamente mais tarde.';
      console.error('Erro:', err);
    } finally {
      loading = false;
    }
  }

  onMount(() => {
    if (browser) {
      fetchExercise();
    }
  });
</script>

<div class="container">
  <div class="banner">
    <div class="banner-content">
      <h2>DETALHES DO EXERCÍCIO</h2>
      <p>INFORMAÇÕES COMPLETAS SOBRE O MOVIMENTO</p>
    </div>
  </div>

  <div class="glass-card">
    {#if loading}
      <div class="loading-state">
        <p>CARREGANDO EXERCÍCIO...</p>
      </div>
    {:else if error}
      <div class="error-state">
        <p>{error}</p>
      </div>
    {:else if exercise}
      <div class="exercise-details">
        <div class="exercise-header">
          <h1>{exercise.name}</h1>
        </div>

        <div class="exercise-image">
          <img src={exercise.imageUrl} alt={exercise.name} />
        </div>

        <div class="exercise-content">
          <div class="description-section">
            <h2>DESCRIÇÃO</h2>
            <p>{exercise.description}</p>
          </div>

          <div class="tips-section">
            <h2>DICAS</h2>
            <ul>
              {#each exercise.tips as tip}
                <li>{tip}</li>
              {/each}
            </ul>
          </div>

          <div class="muscles-section">
            <h2>MÚSCULOS TRABALHADOS</h2>
            <div class="muscles-grid">
              {#each exercise.muscles as muscle}
                <span class="muscle-tag">{muscle}</span>
              {/each}
            </div>
          </div>

          <div class="equipment-section">
            <h2>EQUIPAMENTOS NECESSÁRIOS</h2>
            <div class="equipment-grid">
              {#each exercise.equipment as item}
                <span class="equipment-tag">{item}</span>
              {/each}
            </div>
          </div>
        </div>
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

  .exercise-details {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .exercise-header {
    text-align: center;
  }

  .exercise-header h1 {
    color: #000000;
    font-size: 2.5rem;
    font-weight: 900;
    text-transform: uppercase;
    margin-bottom: 1rem;
  }

  .exercise-image {
    width: 100%;
    height: auto;
    max-height: 500px;
    overflow: hidden;
    border: 2px solid #000000;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f5f5f5;
  }

  .exercise-image img {
    width: 100%;
    height: auto;
    max-height: 500px;
    object-fit: contain;
    display: block;
  }

  .exercise-content {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .exercise-content h2 {
    color: #000000;
    font-size: 1.8rem;
    font-weight: 900;
    text-transform: uppercase;
    margin-bottom: 1rem;
  }

  .description-section p {
    color: #000000;
    line-height: 1.6;
    font-size: 1.1rem;
  }

  .tips-section ul {
    list-style: none;
    padding: 0;
  }

  .tips-section li {
    color: #000000;
    padding: 1rem;
    margin-bottom: 0.5rem;
    background: #f5f5f5;
    border: 2px solid #000000;
    font-weight: 900;
    text-transform: uppercase;
  }

  .muscles-grid, .equipment-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
  }

  .muscle-tag, .equipment-tag {
    background: #000000;
    color: #ffffff;
    padding: 0.8rem;
    text-align: center;
    font-weight: 900;
    text-transform: uppercase;
    border: 2px solid #000000;
  }

  @media (max-width: 768px) {
    .container {
      padding: 10px;
    }

    .glass-card {
      padding: 1rem;
    }

    .exercise-image {
      max-height: 300px;
    }

    .exercise-image img {
      max-height: 300px;
    }

    .banner-content h2 {
      font-size: 2rem;
    }

    .banner-content p {
      font-size: 1rem;
    }

    .exercise-header h1 {
      font-size: 2rem;
    }

    .exercise-content h2 {
      font-size: 1.5rem;
    }

    .muscles-grid, .equipment-grid {
      grid-template-columns: 1fr;
    }
  }
</style> 