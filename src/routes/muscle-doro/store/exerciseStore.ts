import { writable } from 'svelte/store';
import { updateLeaderboard } from './leaderboardStore';

interface ExerciseData {
  name: string;
  weight: number;
  reps: number;
  duration: number;
  notes: string;
  timestamp: number;
  targetReps: number;
  targetSets: number;
}

interface WorkoutData {
  type: string;
  number: number;
  startTime: number;
  endTime: number | null;
  exercises: ExerciseData[];
  targetDuration: number;
  name: string;
  targetMuscle: string;
  difficulty: string;
}

export const workoutHistory = writable<WorkoutData[]>([]);
export const currentWorkoutData = writable<WorkoutData | null>(null);
export const showReportModal = writable(false);

export function startNewWorkout(type: string, number: number, workout: any) {
  currentWorkoutData.set({
    type,
    number,
    startTime: Date.now(),
    endTime: null,
    exercises: [],
    targetDuration: workout.duration,
    name: workout.name,
    targetMuscle: workout.targetMuscle,
    difficulty: workout.difficulty
  });
}

export function finishExercise(exerciseData: ExerciseData) {
  currentWorkoutData.update(data => {
    if (!data) return null;
    return {
      ...data,
      exercises: [...data.exercises, exerciseData]
    };
  });
}

export async function sendWorkoutToAPI(workout: WorkoutData) {
  try {
    const response = await fetch('/api/workouts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(workout)
    });

    if (!response.ok) {
      throw new Error('Erro ao enviar dados do treino');
    }

    return await response.json();
  } catch (error) {
    console.error('Erro ao enviar dados do treino:', error);
    throw error;
  }
}

export function finishWorkout() {
  currentWorkoutData.update(data => {
    if (!data) return null;
    const finishedWorkout = {
      ...data,
      endTime: Date.now()
    };
    
    // Enviar para API e atualizar histórico
    sendWorkoutToAPI(finishedWorkout)
      .then(() => {
        workoutHistory.update(history => [...history, finishedWorkout]);
        showReportModal.set(true);
        
        // Atualizar placar
        const duration = Math.round((finishedWorkout.endTime - finishedWorkout.startTime) / 1000 / 60);
        updateLeaderboard('Usuário Atual', duration);
      })
      .catch(error => {
        console.error('Erro ao finalizar treino:', error);
      });
    
    return null;
  });
}

export function closeReportModal() {
  showReportModal.set(false);
}

export function getWorkoutReport(workout: WorkoutData) {
  const totalDuration = workout.endTime ? (workout.endTime - workout.startTime) / 1000 / 60 : 0;
  const totalWeight = workout.exercises.reduce((acc, exercise) => acc + exercise.weight, 0);
  const totalReps = workout.exercises.reduce((acc, exercise) => acc + exercise.reps, 0);
  const totalSets = workout.exercises.reduce((acc, exercise) => acc + exercise.targetSets, 0);

  return {
    name: workout.name,
    targetMuscle: workout.targetMuscle,
    difficulty: workout.difficulty,
    targetDuration: workout.targetDuration,
    actualDuration: Math.round(totalDuration),
    totalWeight,
    totalReps,
    totalSets,
    exercises: workout.exercises
  };
} 