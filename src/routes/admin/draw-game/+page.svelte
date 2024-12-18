<script>
    import { onMount } from 'svelte';
  
    let canvas = $state();
    let context;
  
    // Função para desenhar no canvas
    function draw() {
      if (context) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.beginPath();
        context.arc(canvas.width / 2, canvas.height / 2, 50, 0, 2 * Math.PI);
        context.fillStyle = 'blue';
        context.fill();
        context.stroke();
      }
    }
  
    // Configura o canvas e o contexto quando o componente é montado
    onMount(() => {
      context = canvas.getContext('2d');
      draw();
    });
  </script>
  
  <canvas bind:this={canvas} width="400" height="400" style="border: 1px solid black;"></canvas>
  