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

interface WorkoutData {
  [key: string]: {
    [key: number]: Workout;
  };
}

export const mockWorkouts: WorkoutData = {
  costa: {
    1: {
      name: "Treino de Costas Básico",
      targetMuscle: "Costas",
      duration: 45,
      difficulty: "Iniciante",
      exercises: [
        {
          name: "Puxada na Frente",
          sets: 3,
          reps: 12,
          rest: 60,
          imageUrl: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=60"
        },
        {
          name: "Remada Curvada",
          sets: 3,
          reps: 12,
          rest: 60,
          imageUrl: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=60"
        },
        {
          name: "Puxada na Frente com Triângulo",
          sets: 3,
          reps: 12,
          rest: 60,
          imageUrl: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=60"
        }
      ]
    },
    2: {
      name: "Treino de Costas Avançado",
      targetMuscle: "Costas",
      duration: 60,
      difficulty: "Avançado",
      exercises: [
        {
          name: "Puxada na Frente com Peso",
          sets: 4,
          reps: 10,
          rest: 90,
          imageUrl: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=60"
        },
        {
          name: "Remada Curvada com Barra",
          sets: 4,
          reps: 10,
          rest: 90,
          imageUrl: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=60"
        },
        {
          name: "Puxada na Frente com Triângulo",
          sets: 4,
          reps: 10,
          rest: 90,
          imageUrl: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=60"
        }
      ]
    }
  },
  peito: {
    1: {
      name: "Treino de Peito Básico",
      targetMuscle: "Peito",
      duration: 45,
      difficulty: "Iniciante",
      exercises: [
        {
          name: "Supino Reto",
          sets: 3,
          reps: 12,
          rest: 60,
          imageUrl: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=60"
        },
        {
          name: "Crucifixo",
          sets: 3,
          reps: 12,
          rest: 60,
          imageUrl: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=60"
        },
        {
          name: "Supino Inclinado",
          sets: 3,
          reps: 12,
          rest: 60,
          imageUrl: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=60"
        }
      ]
    }
  },
  pernas: {
    1: {
      name: "Treino de Pernas Básico",
      targetMuscle: "Pernas",
      duration: 45,
      difficulty: "Iniciante",
      exercises: [
        {
          name: "Agachamento",
          sets: 3,
          reps: 12,
          rest: 60,
          imageUrl: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=60"
        },
        {
          name: "Leg Press",
          sets: 3,
          reps: 12,
          rest: 60,
          imageUrl: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=60"
        },
        {
          name: "Extensão de Pernas",
          sets: 3,
          reps: 12,
          rest: 60,
          imageUrl: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=60"
        }
      ]
    }
  }
}; 