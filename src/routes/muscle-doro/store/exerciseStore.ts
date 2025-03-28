import { writable } from 'svelte/store';

interface ExerciseData {
  name: string;
  weight: number;
  reps: number;
  duration: number;
  notes: string;
  timestamp: number;
}

interface WorkoutData {
  type: string;
  number: number;
  startTime: number;
  endTime: number | null;
  exercises: ExerciseData[];
}

export const workoutHistory = writable<WorkoutData[]>([]);
export const currentWorkoutData = writable<WorkoutData | null>(null);

export function startNewWorkout(type: string, number: number) {
  currentWorkoutData.set({
    type,
    number,
    startTime: Date.now(),
    endTime: null,
    exercises: []
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

export function finishWorkout() {
  currentWorkoutData.update(data => {
    if (!data) return null;
    const finishedWorkout = {
      ...data,
      endTime: Date.now()
    };
    
    workoutHistory.update(history => [...history, finishedWorkout]);
    return null;
  });
} 