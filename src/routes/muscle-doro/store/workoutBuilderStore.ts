import { writable } from 'svelte/store';

export interface ExerciseInWorkout {
  uid: string;
  name: string;
  sets: number;
  reps: number;
  weight: number;
  rest: number;
}

interface WorkoutTemplate {
  id: string;
  name: string;
  description: string;
  exercises: ExerciseInWorkout[];
  totalDuration: number;
  difficulty: string;
  targetMuscle: string;
}

function createWorkoutBuilderStore() {
  const { subscribe, set, update } = writable<{
    selectedExercises: ExerciseInWorkout[];
    workoutTemplates: WorkoutTemplate[];
    currentTemplate: WorkoutTemplate | null;
    isEditing: boolean;
  }>({
    selectedExercises: [],
    workoutTemplates: [],
    currentTemplate: null,
    isEditing: false
  });

  return {
    subscribe,
    addExercise: (exercise: ExerciseInWorkout) => {
      update(state => ({
        ...state,
        selectedExercises: [...state.selectedExercises, exercise]
      }));
    },
    removeExercise: (uid: string) => {
      update(state => ({
        ...state,
        selectedExercises: state.selectedExercises.filter(ex => ex.uid !== uid)
      }));
    },
    updateExercise: (uid: string, updates: Partial<ExerciseInWorkout>) => {
      update(state => ({
        ...state,
        selectedExercises: state.selectedExercises.map(ex => 
          ex.uid === uid ? { ...ex, ...updates } : ex
        )
      }));
    },
    saveWorkoutTemplate: (template: Omit<WorkoutTemplate, 'id'>) => {
      update(state => {
        const newTemplate: WorkoutTemplate = {
          ...template,
          id: crypto.randomUUID()
        };
        return {
          ...state,
          workoutTemplates: [...state.workoutTemplates, newTemplate]
        };
      });
    },
    updateWorkoutTemplate: (id: string, updates: Partial<WorkoutTemplate>) => {
      update(state => ({
        ...state,
        workoutTemplates: state.workoutTemplates.map(template =>
          template.id === id ? { ...template, ...updates } : template
        )
      }));
    },
    deleteWorkoutTemplate: (id: string) => {
      update(state => ({
        ...state,
        workoutTemplates: state.workoutTemplates.filter(template => template.id !== id)
      }));
    },
    setCurrentTemplate: (template: WorkoutTemplate | null) => {
      update(state => ({
        ...state,
        currentTemplate: template,
        isEditing: !!template
      }));
    },
    clearSelectedExercises: () => {
      update(state => ({
        ...state,
        selectedExercises: []
      }));
    },
    calculateTotalDuration: (exercises: ExerciseInWorkout[]): number => {
      return exercises.reduce((total, exercise) => {
        const exerciseDuration = (exercise.sets * exercise.reps * 3) + // Tempo de execução
          (exercise.sets * exercise.rest); // Tempo de descanso
        return total + exerciseDuration;
      }, 0);
    }
  };
}

export const workoutBuilder = createWorkoutBuilderStore(); 