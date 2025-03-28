import { writable } from 'svelte/store';

interface UserStats {
  name: string;
  workouts: number;
  totalTime: number;
}

export const leaderboardData = writable<UserStats[]>([
  { name: 'João Silva', workouts: 45, totalTime: 2250 },
  { name: 'Maria Santos', workouts: 38, totalTime: 1900 },
  { name: 'Pedro Oliveira', workouts: 32, totalTime: 1600 },
  { name: 'Ana Costa', workouts: 28, totalTime: 1400 },
  { name: 'Carlos Ferreira', workouts: 25, totalTime: 1250 }
]);

export async function updateLeaderboard(userName: string, workoutDuration: number) {
  try {
    // Aqui você pode implementar a lógica para atualizar o placar na API
    console.log('Atualizando placar:', { userName, workoutDuration });
    
    // Exemplo de atualização local
    leaderboardData.update(data => {
      const userIndex = data.findIndex(user => user.name === userName);
      if (userIndex === -1) {
        // Novo usuário
        return [...data, { name: userName, workouts: 1, totalTime: workoutDuration }];
      }
      
      // Usuário existente
      const updatedData = [...data];
      updatedData[userIndex] = {
        ...updatedData[userIndex],
        workouts: updatedData[userIndex].workouts + 1,
        totalTime: updatedData[userIndex].totalTime + workoutDuration
      };
      
      // Ordenar por número de treinos
      return updatedData.sort((a, b) => b.workouts - a.workouts);
    });
  } catch (error) {
    console.error('Erro ao atualizar placar:', error);
  }
} 