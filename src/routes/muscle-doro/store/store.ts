import { writable } from 'svelte/store';

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

export const currentWorkout = writable<Workout | null>(null);
export const timeLeft = writable(25 * 60); // 25 minutos em segundos
export const isRunning = writable(false);
export const currentExercise = writable<Exercise | null>(null);
export const selectedWorkoutType = writable<string>('costa');
export const workoutNumber = writable<number>(1);

export const workoutTypes = [
  { id: 'costa', name: 'Costa' },
  { id: 'peito', name: 'Peito' },
  { id: 'pernas', name: 'Pernas' },
  { id: 'ombros', name: 'Ombros' },
  { id: 'biceps', name: 'Bíceps' },
  { id: 'triceps', name: 'Tríceps' },
  { id: 'abdomen', name: 'Abdômen' }
]; 