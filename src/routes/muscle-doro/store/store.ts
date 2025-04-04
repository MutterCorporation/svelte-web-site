import { writable } from 'svelte/store';

interface Exercise {
  name: string;
  sets: number;
  reps: number;
  rest: number;
  imageUrl: string;
}

interface Workout {
  name: string;
  targetMuscle: string;
  duration: number;
  difficulty: string;
  exercises: Exercise[];
}

export const currentWorkout = writable<Workout | null>(null);
export const currentExercise = writable<Exercise | null>(null);
export const timeLeft = writable(0);
export const isRunning = writable(false);
export const selectedWorkoutType = writable('costa');
export const workoutNumber = writable(1);

export const workoutTypes = [
  { id: 'costa', name: 'COSTAS' },
  { id: 'peito', name: 'PEITO' },
  { id: 'pernas', name: 'PERNAS' },
  { id: 'ombros', name: 'OMBROS' },
  { id: 'biceps', name: 'BÍCEPS' },
  { id: 'triceps', name: 'TRÍCEPS' },
  { id: 'abdomen', name: 'ABDÔMEN' }
]; 
