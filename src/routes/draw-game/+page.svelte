<script>
    import { onMount, onDestroy } from 'svelte';
    import { tasks, timeLeft, isRunning, currentTask } from './store/store';
  
    let interval;
    let newTaskInput = '';
  
    // Format time for display
    const formatTime = (seconds) => {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };
  
    // Pomodoro Controls
    function startPomodoro() {
      isRunning.set(true);
      interval = setInterval(() => {
        timeLeft.update(t => {
          if (t <= 0) {
            stopPomodoro();
            notify();
            return 1500; // Reset to 25 minutes
          }
          return t - 1;
        });
      }, 1000);
    }
  
    function stopPomodoro() {
      clearInterval(interval);
      isRunning.set(false);
    }
  
    function resetPomodoro() {
      stopPomodoro();
      timeLeft.set(1500);
    }
  
    // Task Management
    function addTask() {
      if (newTaskInput.trim()) {
        tasks.update(t => [...t, {
          id: Date.now(),
          text: newTaskInput,
          completed: false,
          pomodoros: 0
        }]);
        newTaskInput = '';
      }
    }
  
    function toggleTask(id) {
      tasks.update(t =>
        t.map(task =>
          task.id === id ? { ...task, completed: !task.completed } : task
        )
      );
    }
  
    function deleteTask(id) {
      tasks.update(t => t.filter(task => task.id !== id));
      if ($currentTask === id) {
        currentTask.set(null);
      }
    }
  
    function selectTask(id) {
      currentTask.set(id);
      resetPomodoro();
    }
  
    function incrementPomodoro(id) {
      tasks.update(t =>
        t.map(task =>
          task.id === id ? { ...task, pomodoros: task.pomodoros + 1 } : task
        )
      );
    }
  
    // Notification
    function notify() {
      if (Notification.permission === "granted") {
        new Notification("Pomodoro Completed!", {
          body: "Time to take a break!",
        });
        if ($currentTask) {
          incrementPomodoro($currentTask);
        }
      }
    }
  
    onMount(() => {
      Notification.requestPermission();
    });
  
    onDestroy(() => {
      if (interval) clearInterval(interval);
    });
  </script>
  
  <div class="max-w-2xl mx-auto p-8">
    <h1 class="text-4xl font-bold text-gray-800 mb-8">Pomodoro Task Manager</h1>
  
    <!-- Timer Display -->
    <div class="bg-white rounded-lg shadow-lg p-6 mb-8">
      <p class="text-6xl font-mono text-center text-gray-700">
        {formatTime($timeLeft)}
      </p>
      <div class="flex justify-center mt-4 space-x-4">
        {#if !$isRunning}
          <button
            class="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            on:click={startPomodoro}
          >
            Start
          </button>
        {:else}
          <button
            class="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            on:click={stopPomodoro}
          >
            Stop
          </button>
        {/if}
        <button
          class="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
          on:click={resetPomodoro}
        >
          Reset
        </button>
      </div>
    </div>
  
    <!-- Task Input -->
    <div class="mb-8">
      <div class="flex space-x-2">
        <input
          type="text"
          bind:value={newTaskInput}
          placeholder="Add a new task..."
          class="flex-1 p-2 border rounded-lg"
          on:keydown={e => e.key === 'Enter' && addTask()}
        />
        <button
          class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          on:click={addTask}
        >
          Add Task
        </button>
      </div>
    </div>
  
    <!-- Task List -->
    <div class="space-y-4">
      {#each $tasks as task (task.id)}
        <div
          class="bg-white p-4 rounded-lg shadow flex items-center justify-between {
            task.id === $currentTask ? 'border-2 border-blue-500' : ''
          }"
        >
          <div class="flex items-center space-x-4">
            <input
              type="checkbox"
              checked={task.completed}
              on:change={() => toggleTask(task.id)}
              class="h-5 w-5"
            />
            <span class={task.completed ? 'line-through text-gray-500' : ''}>
              {task.text}
            </span>
            <span class="text-sm text-gray-500">
              ({task.pomodoros} pomodoros)
            </span>
          </div>
          <div class="flex space-x-2">
            <button
              class="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
              on:click={() => selectTask(task.id)}
            >
              Select
            </button>
            <button
              class="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
              on:click={() => deleteTask(task.id)}
            >
              Delete
            </button>
          </div>
        </div>
      {/each}
    </div>
  </div>