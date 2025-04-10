

<div>
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-semibold text-gray-900">Gerenciamento de Envios</h1>
      <div class="flex space-x-3">
        <button class="px-4 py-2 flex items-center text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          <svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
          </svg>
          Filtrar
        </button>
        <button class="px-4 py-2 flex items-center text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          <svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
          </svg>
          Atualizar
        </button>
        <button class="px-4 py-2 flex items-center text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
          <svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          Novo Envio
        </button>
      </div>
    </div>
  
    <!-- Status overview -->
    <div class="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      <div class="bg-white overflow-hidden shadow rounded-lg border-l-4 border-blue-500">
        <div class="px-4 py-5 sm:p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0 bg-blue-100 rounded-md p-3">
              <svg class="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"></path>
              </svg>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dt class="text-sm font-medium text-gray-500 truncate">Enviados</dt>
              <dd class="text-2xl font-semibold text-gray-900">35</dd>
            </div>
          </div>
        </div>
      </div>
  
      <div class="bg-white overflow-hidden shadow rounded-lg border-l-4 border-yellow-500">
        <div class="px-4 py-5 sm:p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0 bg-yellow-100 rounded-md p-3">
              <svg class="h-6 w-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dt class="text-sm font-medium text-gray-500 truncate">Processando</dt>
              <dd class="text-2xl font-semibold text-gray-900">25</dd>
            </div>
          </div>
        </div>
      </div>
  
      <div class="bg-white overflow-hidden shadow rounded-lg border-l-4 border-green-500">
        <div class="px-4 py-5 sm:p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0 bg-green-100 rounded-md p-3">
              <svg class="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dt class="text-sm font-medium text-gray-500 truncate">Entregues</dt>
              <dd class="text-2xl font-semibold text-gray-900">30</dd>
            </div>
          </div>
        </div>
      </div>
  
      <div class="bg-white overflow-hidden shadow rounded-lg border-l-4 border-red-500">
        <div class="px-4 py-5 sm:p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0 bg-red-100 rounded-md p-3">
              <svg class="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dt class="text-sm font-medium text-gray-500 truncate">Atrasados</dt>
              <dd class="text-2xl font-semibold text-gray-900">7</dd>
            </div>
          </div>
        </div>
      </div>
    </div>
  
    <!-- Status chart and table -->
    <div class="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
      <div class="bg-white overflow-hidden shadow rounded-lg sm:col-span-1">
        <div class="px-4 py-5 sm:p-6">
          <h3 class="text-lg leading-6 font-medium text-gray-900">Status dos Envios</h3>
          <div class="mt-2 h-64 flex items-center justify-center">
            <canvas bind:this={statusChartCanvas}></canvas>
          </div>
        </div>
      </div>
  
      <div class="bg-white overflow-hidden shadow rounded-lg sm:col-span-2">
        <div class="px-4 py-5 sm:px-6 flex justify-between items-center">
          <h3 class="text-lg leading-6 font-medium text-gray-900">Roupas Enviadas Recentemente</h3>
          <div class="flex space-x-3">
            <select class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
              <option>Todos os Status</option>
              <option>Enviado</option>
              <option>Processando</option>
              <option>Entregue</option>
              <option>Atrasado</option>
            </select>
          </div>
        </div>
        <div class="border-t border-gray-200">
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Produto</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                {#each recentOrders as order}
                  <tr>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.product}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.customer}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span class={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[order.status]} text-white`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                {/each}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  
    <!-- Status List -->
    <div class="mt-8">
      <div class="bg-white shadow rounded-lg">
        <div class="px-4 py-5 sm:px-6 flex justify-between items-center">
          <h3 class="text-lg leading-6 font-medium text-gray-900">Status dos Envios</h3>
          <button class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Ver todos
          </button>
        </div>
        <div class="border-t border-gray-200">
          <ul class="divide-y divide-gray-200">
            {#each statusData as status}
              <li class="px-4 py-4 flex items-center justify-between">
                <div class="flex items-center">
                  <div class={`h-8 w-8 rounded-full flex items-center justify-center ${statusColors[status.name]}`}>
                    {#if getStatusIcon(status.name) === 'truck'}
                      <svg class="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"></path>
                      </svg>
                    {:else if getStatusIcon(status.name) === 'clock'}
                      <svg class="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    {:else if getStatusIcon(status.name) === 'check-circle'}
                      <svg class="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    {:else if getStatusIcon(status.name) === 'alert-circle'}
                      <svg class="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    {:else if getStatusIcon(status.name) === 'x-circle'}
                      <svg class="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    {/if}
                  </div>
                  <div class="ml-3">
                    <p class="text-sm font-medium text-gray-900">{status.name}</p>
                    <p class="text-sm text-gray-500">{status.value} pedidos</p>
                  </div>
                </div>
                <button class="px-3 py-1 bg-gray-100 text-gray-800 text-sm font-medium rounded-md hover:bg-gray-200">
                  Detalhes
                </button>
              </li>
            {/each}
          </ul>
        </div>
      </div>
    </div>
  </div><!-- components/Shipments.svelte -->
  <script>
    import { onMount } from 'svelte';
    import Chart from 'chart.js/auto';
    
    // Dados fictícios para demonstração
    const recentOrders = [
      { id: 'ORD-5289', product: 'Camisa Dry-Fit Pro', customer: 'João Silva', date: '10/04/2025', status: 'Enviado', value: 'R$ 89,90' },
      { id: 'ORD-5288', product: 'Legging Power Lift', customer: 'Maria Oliveira', date: '10/04/2025', status: 'Processando', value: 'R$ 129,90' },
      { id: 'ORD-5287', product: 'Whey Protein 900g', customer: 'Carlos Santos', date: '09/04/2025', status: 'Entregue', value: 'R$ 159,90' },
      { id: 'ORD-5286', product: 'Shorts Running', customer: 'Ana Costa', date: '09/04/2025', status: 'Atrasado', value: 'R$ 69,90' },
      { id: 'ORD-5285', product: 'Top Fitness Pro', customer: 'Júlia Ferreira', date: '08/04/2025', status: 'Enviado', value: 'R$ 59,90' },
    ];
  
    const statusColors = {
      'Enviado': 'bg-blue-500',
      'Processando': 'bg-yellow-500',
      'Entregue': 'bg-green-500',
      'Atrasado': 'bg-red-500',
      'Cancelado': 'bg-gray-500'
    };
    
    const statusData = [
      { name: 'Enviado', value: 35, color: '#3B82F6' },
      { name: 'Processando', value: 25, color: '#EAB308' },
      { name: 'Entregue', value: 30, color: '#22C55E' },
      { name: 'Atrasado', value: 7, color: '#EF4444' },
      { name: 'Cancelado', value: 3, color: '#6B7280' }
    ];
    
    let statusChartCanvas;
    
    onMount(() => {
      // Criar gráfico de pizza para status
      const statusChart = new Chart(statusChartCanvas, {
        type: 'pie',
        data: {
          labels: statusData.map(item => item.name),
          datasets: [{
            data: statusData.map(item => item.value),
            backgroundColor: statusData.map(item => item.color),
            hoverOffset: 4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'right',
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  const label = context.label || '';
                  const value = context.raw || 0;
                  const total = context.dataset.data.reduce((a, b) => a + b, 0);
                  const percentage = Math.round((value / total) * 100);
                  return `${label}: ${value} (${percentage}%)`;
                }
              }
            }
          }
        }
      });
      
      return () => {
        statusChart.destroy();
      };
    });
    
    function getStatusIcon(status) {
      switch(status) {
        case 'Enviado': return 'truck';
        case 'Processando': return 'clock';
        case 'Entregue': return 'check-circle';
        case 'Atrasado': return 'alert-circle';
        case 'Cancelado': return 'x-circle';
        default: return 'help-circle';
      }
    }
  </script>