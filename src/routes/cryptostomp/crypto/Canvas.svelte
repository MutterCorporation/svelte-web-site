<script>
  import { onMount } from 'svelte';
  
  export let data = [];
  
  let canvas;
  let ctx;
  const padding = { top: 20, right: 50, bottom: 80, left: 60 }; // Increased bottom padding for volume
  let isDrawingLine = false;
  let lineStartPoint = null;
  let lines = [];
  let selectedTool = null; // 'support', 'resistance', or null
  let isDraggingLine = false;
  let selectedLine = null;
  let mousePos = { x: 0, y: 0 };
  
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`;
  };
  
  function getMousePos(canvas, evt) {
    const rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
  }
  
  function startDrawing(e) {
    if (selectedTool) {
      const pos = getMousePos(canvas, e);
      isDrawingLine = true;
      lineStartPoint = pos;
    }
  }
  
  function stopDrawing(e) {
    if (isDrawingLine && lineStartPoint) {
      const pos = getMousePos(canvas, e);
      lines.push({
        start: lineStartPoint,
        end: pos,
        type: selectedTool,
        price: getPriceAtY(lineStartPoint.y)
      });
      isDrawingLine = false;
      lineStartPoint = null;
      drawChart();
    }
    isDraggingLine = false;
    selectedLine = null;
  }
  
  function handleMouseMove(e) {
    mousePos = getMousePos(canvas, e);
    
    if (isDrawingLine) {
      drawChart();
      drawTemporaryLine();
    } else if (isDraggingLine && selectedLine) {
      const dy = mousePos.y - selectedLine.start.y;
      selectedLine.start.y += dy;
      selectedLine.end.y += dy;
      selectedLine.price = getPriceAtY(selectedLine.start.y);
      drawChart();
    }
  }
  
  function drawTemporaryLine() {
    if (!lineStartPoint) return;
    
    ctx.beginPath();
    ctx.strokeStyle = selectedTool === 'support' ? '#2196F3' : '#FF5722';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.moveTo(lineStartPoint.x, lineStartPoint.y);
    ctx.lineTo(mousePos.x, lineStartPoint.y);
    ctx.stroke();
    ctx.setLineDash([]);
  }
  
  function getPriceAtY(y) {
    const chartHeight = canvas.height - padding.top - padding.bottom;
    const priceRange = maxPrice - minPrice;
    return maxPrice - ((y - padding.top) / chartHeight) * priceRange;
  }
  
  let minPrice, maxPrice, maxVolume;
  
  function drawChart() {
    if (!canvas || !ctx || !data.length) return;
  
    const width = canvas.width;
    const height = canvas.height;
    
    ctx.clearRect(0, 0, width, height);
    
    // Calculate ranges
    const prices = data.flatMap(candle => [
      parseFloat(candle[2]), // high
      parseFloat(candle[3])  // low
    ]);
    minPrice = Math.min(...prices);
    maxPrice = Math.max(...prices);
    const priceRange = maxPrice - minPrice;
    
    // Calculate volume range
    const volumes = data.map(candle => parseFloat(candle[5]));
    maxVolume = Math.max(...volumes);
    
    // Calculate dimensions
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;
    const volumeHeight = padding.bottom - 30; // Height for volume bars
    const candleWidth = chartWidth / data.length * 0.8;
    const spacing = chartWidth / data.length * 0.2;
    
    // Draw price axis
    ctx.beginPath();
    ctx.strokeStyle = '#666';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
      const price = minPrice + (priceRange * i / 5);
      const y = padding.top + chartHeight - (chartHeight * (price - minPrice) / priceRange);
      
      ctx.moveTo(padding.left - 5, y);
      ctx.lineTo(padding.left, y);
      
      ctx.fillStyle = '#666';
      ctx.textAlign = 'right';
      ctx.fillText(price.toFixed(2), padding.left - 10, y + 4);
    }
    ctx.stroke();
    
    // Draw candlesticks and volume
    data.forEach((candle, i) => {
      const timestamp = parseInt(candle[0]);
      const open = parseFloat(candle[1]);
      const high = parseFloat(candle[2]);
      const low = parseFloat(candle[3]);
      const close = parseFloat(candle[4]);
      const volume = parseFloat(candle[5]);
      
      const x = padding.left + (i * (candleWidth + spacing));
      const y_high = padding.top + chartHeight - (chartHeight * (high - minPrice) / priceRange);
      const y_low = padding.top + chartHeight - (chartHeight * (low - minPrice) / priceRange);
      const y_open = padding.top + chartHeight - (chartHeight * (open - minPrice) / priceRange);
      const y_close = padding.top + chartHeight - (chartHeight * (close - minPrice) / priceRange);
      
      // Draw volume bars
      const volumeHeight = (volume / maxVolume) * (padding.bottom - 30);
      ctx.fillStyle = close >= open ? 'rgba(38, 166, 154, 0.3)' : 'rgba(239, 83, 80, 0.3)';
      ctx.fillRect(
        x,
        height - padding.bottom + (padding.bottom - 30 - volumeHeight),
        candleWidth,
        volumeHeight
      );
      
      // Draw candlestick
      ctx.fillStyle = close >= open ? '#26a69a' : '#ef5350';
      ctx.strokeStyle = close >= open ? '#26a69a' : '#ef5350';
      
      ctx.fillRect(
        x,
        Math.min(y_open, y_close),
        candleWidth,
        Math.abs(y_close - y_open)
      );
      
      ctx.beginPath();
      ctx.moveTo(x + candleWidth / 2, y_high);
      ctx.lineTo(x + candleWidth / 2, Math.min(y_open, y_close));
      ctx.moveTo(x + candleWidth / 2, Math.max(y_open, y_close));
      ctx.lineTo(x + candleWidth / 2, y_low);
      ctx.stroke();
      
      // Time labels
      if (i % 3 === 0) {
        ctx.fillStyle = '#666';
        ctx.textAlign = 'center';
        ctx.fillText(formatDate(timestamp), x + candleWidth / 2, height - padding.bottom + 25);
      }
    });
    
    // Draw support/resistance lines
    lines.forEach(line => {
      ctx.beginPath();
      ctx.strokeStyle = line.type === 'support' ? '#2196F3' : '#FF5722';
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      ctx.moveTo(padding.left, line.start.y);
      ctx.lineTo(width - padding.right, line.start.y);
      ctx.stroke();
      ctx.setLineDash([]);
      
      // Draw price label
      ctx.fillStyle = line.type === 'support' ? '#2196F3' : '#FF5722';
      ctx.textAlign = 'left';
      ctx.fillText(`${line.type === 'support' ? 'S' : 'R'}: ${line.price.toFixed(2)}`, width - padding.right + 5, line.start.y);
    });
  }
  
  onMount(() => {
    ctx = canvas.getContext('2d');
    
    const resize = () => {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = 500; // Increased height for volume
      drawChart();
    };
    
    resize();
    window.addEventListener('resize', resize);
    
    return () => {
      window.removeEventListener('resize', resize);
    };
  });
  
  function clearLines() {
    lines = [];
    drawChart();
  }
  
  $: if (data && canvas && ctx) {
    drawChart();
  }
  </script>
  
  <div class="controls">
    <button 
      class:active={selectedTool === 'support'} 
      on:click={() => selectedTool = selectedTool === 'support' ? null : 'support'}
    >
      Linha de Suporte
    </button>
    
    <button 
      class:active={selectedTool === 'resistance'} 
      on:click={() => selectedTool = selectedTool === 'resistance' ? null : 'resistance'}
    >
      Linha de Resistência
    </button>
    
    <button on:click={clearLines}>
      Limpar Linhas
    </button>
  </div>
  
  <div class="chart-container">
    <canvas
      bind:this={canvas}
      style="width: 100%; height: 500px;"
      on:mousedown={startDrawing}
      on:mouseup={stopDrawing}
      on:mousemove={handleMouseMove}
    ></canvas>
  </div>
  
  <style>
  .chart-container {
    width: 100%;
    height: 500px;
    background: white;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 16px;
  }
  
  .controls {
    margin-bottom: 1rem;
    display: flex;
    gap: 1rem;
  }
  
  button {
    padding: 0.5rem 1rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    background: white;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  button:hover {
    background: #f5f5f5;
  }
  
  button.active {
    background: #2196F3;
    color: white;
    border-color: #2196F3;
  }
  </style>