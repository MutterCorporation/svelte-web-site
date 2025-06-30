<script>
  import { onMount } from 'svelte';
  
  // @ts-ignore
  /**
	 * @type {any[]}
	 */
   export let data = [];
  
  // @ts-ignore
  /**
	 * @type {HTMLCanvasElement}
	 */
  let canvas;
  // @ts-ignore
  let ctx;
  const padding = { top: 20, right: 50, bottom: 80, left: 60 }; // Increased bottom padding for volume
  let isDrawingLine = false;
  // @ts-ignore
  let lineStartPoint = null;
  // @ts-ignore
  let lines = [];
  // @ts-ignore
  /**
	 * @type {string | null}
	 */
  let selectedTool = null; // 'support', 'resistance', or null
  let isDraggingLine = false;
  // @ts-ignore
  let selectedLine = null;
  let mousePos = { x: 0, y: 0 };
  
 // @ts-ignore
  // @ts-ignore
    $: if (data && data.length > 0) {
//   // Calcular suporte e resistência
   // @ts-ignore
   const lows = data.map(candle => parseFloat(candle[3])); // Preços mínimos
   // @ts-ignore
   const highs = data.map(candle => parseFloat(candle[2])); // Preços máximos
  
   const suporte = Math.min(...lows);
   const resistencia = Math.max(...highs);

  // Adicionar linhas de suporte e resistência automáticas
  lines = [
    {
      // @ts-ignore
      start: { x: padding.left, y: getYAtPrice(suporte) },
      // @ts-ignore
      end: { x: canvas.width - padding.right, y: getYAtPrice(suporte) },
      type: 'support',
      price: suporte
    },
    {
      // @ts-ignore
      start: { x: padding.left, y: getYAtPrice(resistencia) },
      // @ts-ignore
      end: { x: canvas.width - padding.right, y: getYAtPrice(resistencia) },
      type: 'resistance',
      price: resistencia
    }
  ];

  drawChart();
 }

// // Função para converter preço para coordenada Y no gráfico
	/**
	 * @param {number} price
	 */
function getYAtPrice(price) {
  const chartHeight = canvas.height - padding.top - padding.bottom;
  // @ts-ignore
  const priceRange = maxPrice - minPrice;
  return padding.top + chartHeight - ((price - minPrice) / priceRange) * chartHeight;
}

  // @ts-ignore
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`;
  };
  
  // @ts-ignore
  function getMousePos(canvas, evt) {
    const rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
  }
  
  // @ts-ignore
  function startDrawing(e) {
    // @ts-ignore
    if (selectedTool) {
      // @ts-ignore
      const pos = getMousePos(canvas, e);
      isDrawingLine = true;
      lineStartPoint = pos;
    }
  }
  
  // @ts-ignore
  function stopDrawing(e) {
    // @ts-ignore
    if (isDrawingLine && lineStartPoint) {
      // @ts-ignore
      const pos = getMousePos(canvas, e);
      lines.push({
        start: lineStartPoint,
        end: pos,
        // @ts-ignore
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
  
  // @ts-ignore
  function handleMouseMove(e) {
    // @ts-ignore
    mousePos = getMousePos(canvas, e);
    
    if (isDrawingLine) {
      drawChart();
      drawTemporaryLine();
    // @ts-ignore
    } else if (isDraggingLine && selectedLine) {
      const dy = mousePos.y - selectedLine.start.y;
      selectedLine.start.y += dy;
      selectedLine.end.y += dy;
      selectedLine.price = getPriceAtY(selectedLine.start.y);
      drawChart();
    }
  }
  
  function drawTemporaryLine() {
    // @ts-ignore
    if (!lineStartPoint) return;
    
    // @ts-ignore
    ctx.beginPath();
    // @ts-ignore
    ctx.strokeStyle = selectedTool === 'support' ? '#2196F3' : '#FF5722';
    // @ts-ignore
    ctx.lineWidth = 2;
    // @ts-ignore
    ctx.setLineDash([5, 5]);
    // @ts-ignore
    ctx.moveTo(lineStartPoint.x, lineStartPoint.y);
    // @ts-ignore
    ctx.lineTo(mousePos.x, lineStartPoint.y);
    // @ts-ignore
    ctx.stroke();
    // @ts-ignore
    ctx.setLineDash([]);
  }
  
  // @ts-ignore
  function getPriceAtY(y) {
    // @ts-ignore
    const chartHeight = canvas.height - padding.top - padding.bottom;
    // @ts-ignore
    const priceRange = maxPrice - minPrice;
    // @ts-ignore
    return maxPrice - ((y - padding.top) / chartHeight) * priceRange;
  }
  
  // @ts-ignore
  /**
	 * @type {number}
	 */
  /**
	 * @type {number}
	 */
  // @ts-ignore
  let minPrice, maxPrice, maxVolume;
  
  function drawChart() {
    // @ts-ignore
    if (!canvas || !ctx || !data.length) return;
  
    const width = canvas.width;
    const height = canvas.height;
    
    ctx.clearRect(0, 0, width, height);
    
    // Calculate ranges
    // @ts-ignore
    const prices = data.flatMap(candle => [
      parseFloat(candle[2]), // high
      parseFloat(candle[3])  // low
    ]);
    minPrice = Math.min(...prices);
    maxPrice = Math.max(...prices);
    const priceRange = maxPrice - minPrice;
    
    // Calculate volume range
    // @ts-ignore
    const volumes = data.map(candle => parseFloat(candle[5]));
    maxVolume = Math.max(...volumes);
    
    // Calculate dimensions
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;
    // @ts-ignore
    // @ts-ignore
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
    // @ts-ignore
    data.forEach((candle, i) => {
      const timestamp = parseInt(candle[0]);
      const open = parseFloat(candle[1]);
      const high = parseFloat(candle[2]);
      const low = parseFloat(candle[3]);
      const close = parseFloat(candle[4]);
      const volume = parseFloat(candle[5]);
      
      const x = padding.left + (i * (candleWidth + spacing));
      // @ts-ignore
      const y_high = padding.top + chartHeight - (chartHeight * (high - minPrice) / priceRange);
      // @ts-ignore
      const y_low = padding.top + chartHeight - (chartHeight * (low - minPrice) / priceRange);
      // @ts-ignore
      const y_open = padding.top + chartHeight - (chartHeight * (open - minPrice) / priceRange);
      // @ts-ignore
      const y_close = padding.top + chartHeight - (chartHeight * (close - minPrice) / priceRange);
      
      // Draw volume bars
      // @ts-ignore
      const volumeHeight = (volume / maxVolume) * (padding.bottom - 30);
      // @ts-ignore
      ctx.fillStyle = close >= open ? 'rgba(38, 166, 154, 0.3)' : 'rgba(239, 83, 80, 0.3)';
      // @ts-ignore
      ctx.fillRect(
        x,
        height - padding.bottom + (padding.bottom - 30 - volumeHeight),
        candleWidth,
        volumeHeight
      );
      
      // Draw candlestick
      // @ts-ignore
      ctx.fillStyle = close >= open ? '#26a69a' : '#ef5350';
      // @ts-ignore
      ctx.strokeStyle = close >= open ? '#26a69a' : '#ef5350';
      
      // @ts-ignore
      ctx.fillRect(
        x,
        Math.min(y_open, y_close),
        candleWidth,
        Math.abs(y_close - y_open)
      );
      
      // @ts-ignore
      ctx.beginPath();
      // @ts-ignore
      ctx.moveTo(x + candleWidth / 2, y_high);
      // @ts-ignore
      ctx.lineTo(x + candleWidth / 2, Math.min(y_open, y_close));
      // @ts-ignore
      ctx.moveTo(x + candleWidth / 2, Math.max(y_open, y_close));
      // @ts-ignore
      ctx.lineTo(x + candleWidth / 2, y_low);
      // @ts-ignore
      ctx.stroke();
      
      // Time labels
      if (i % 3 === 0) {
        // @ts-ignore
        ctx.fillStyle = '#666';
        // @ts-ignore
        ctx.textAlign = 'center';
        // @ts-ignore
        ctx.fillText(formatDate(timestamp), x + candleWidth / 2, height - padding.bottom + 25);
      }
    });
    
    // Draw support/resistance lines
    // @ts-ignore
    lines.forEach(line => {
      // @ts-ignore
      ctx.beginPath();
      // @ts-ignore
      ctx.strokeStyle = line.type === 'support' ? '#2196F3' : '#FF5722';
      // @ts-ignore
      ctx.lineWidth = 2;
      // @ts-ignore
      ctx.setLineDash([5, 5]);
      // @ts-ignore
      ctx.moveTo(padding.left, line.start.y);
      // @ts-ignore
      ctx.lineTo(width - padding.right, line.start.y);
      // @ts-ignore
      ctx.stroke();
      // @ts-ignore
      ctx.setLineDash([]);
      
      // Draw price label
      // @ts-ignore
      ctx.fillStyle = line.type === 'support' ? '#2196F3' : '#FF5722';
      // @ts-ignore
      ctx.textAlign = 'left';
      // @ts-ignore
      ctx.fillText(`${line.type === 'support' ? 'S' : 'R'}: ${line.price.toFixed(2)}`, width - padding.right + 5, line.start.y);
    });
  }
  
  onMount(() => {
    // @ts-ignore
    ctx = canvas.getContext('2d');
    
    const resize = () => {
      // @ts-ignore
      canvas.width = canvas.parentElement.clientWidth;
      // @ts-ignore
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
  
 // @ts-ignore
  // @ts-ignore
    $: if (data && canvas && ctx) {
    drawChart();
  }
  </script>
  
  <div class="trading-view-container">
    <div class="toolbar">
      <div class="tool-group">
        <button class="tool-button">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        </button>
        <button class="tool-button active">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
          </svg>
        </button>
      </div>

      <div class="interval-selector">
        <button class="interval-button active">1m</button>
        <button class="interval-button">5m</button>
        <button class="interval-button">15m</button>
        <button class="interval-button">1h</button>
        <button class="interval-button">4h</button>
        <button class="interval-button">1d</button>
      </div>

      <div class="indicators">
        <button class="indicator-button">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
          </svg>
          Indicadores
        </button>
      </div>
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
  </div>
  
  <style>
  .trading-view-container {
    @apply h-full flex flex-col;
  }

  .toolbar {
    @apply flex items-center justify-between p-4 border-b border-gray-700/50;
  }

  .tool-group {
    @apply flex gap-2;
  }

  .tool-button {
    @apply p-2 rounded-lg text-gray-400 hover:text-orange-500 transition-colors;
  }

  .tool-button.active {
    @apply text-orange-500 bg-orange-500/10;
  }

  .interval-selector {
    @apply flex gap-1;
  }

  .interval-button {
    @apply px-3 py-1 rounded-lg text-sm text-gray-400 hover:text-white transition-all;
  }

  .interval-button.active {
    @apply bg-orange-500 text-white;
  }

  .indicators {
    @apply flex items-center;
  }

  .indicator-button {
    @apply flex items-center gap-2 px-4 py-2 rounded-lg text-gray-400 hover:text-white transition-all;
    background: rgba(31, 31, 31, 0.6);
  }

  .chart-container {
    @apply flex-1 relative;
    background: rgba(17, 17, 17, 0.3);
  }

  canvas {
    @apply w-full h-full;
  }

  /* Estilização para elementos do gráfico */
  :global(.chart-line) {
    stroke: rgb(249,115,22);
    stroke-width: 2;
  }

  :global(.chart-grid) {
    stroke: rgba(255, 255, 255, 0.1);
  }

  :global(.chart-label) {
    fill: rgb(209, 213, 219);
    font-size: 12px;
  }

  :global(.chart-crosshair) {
    stroke: rgba(249,115,22, 0.5);
    stroke-width: 1;
    stroke-dasharray: 3,3;
  }
  </style>