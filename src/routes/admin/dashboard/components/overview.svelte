<!-- components/Overview.svelte -->
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
      { id: 'ORD-5284', product: 'BCAA 2:1:1', customer: 'Roberto Almeida', date: '08/04/2025', status: 'Entregue', value: 'R$ 79,90' },
    ];
  
    const statusColors = {
      'Enviado': 'bg-blue-500',
      'Processando': 'bg-yellow-500',
      'Entregue': 'bg-green-500',
      'Atrasado': 'bg-red-500',
      'Cancelado': 'bg-gray-500'
    };
  
    let salesChartCanvas;
    let performanceChartCanvas;
  
    onMount(() => {
      // Gráfico de vendas por categoria
      const salesChart = new Chart(salesChartCanvas, {
        type: 'bar',
        data: {
          labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
          datasets: [
            {
              label: 'Camisas',
              data: [40, 35, 50, 65, 60, 55],
              backgroundColor: '#3B82F6'
            },
            {
              label: 'Roupas Academia',
              data: [65, 70, 80, 90, 85, 75],
              backgroundColor: '#10B981'
            },
            {
              label: 'Suplementos',
              data: [35, 45, 60, 75, 70, 65],
              backgroundColor: '#F59E0B'
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      });
  
      // Gráfico de performance de vendas
      const performanceChart = new Chart(performanceChartCanvas, {
        type: 'line',
        data: {
          labels: ['10/03', '17/03', '24/03', '31/03', '07/04', '10/04'],
          datasets: [{
            label: 'Vendas (R$)',
            data: [1000, 1200, 1500, 1300, 1700, 1900],
            borderColor: '#3B82F6',
            tension: 0.1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      });
  
      return () => {
        salesChart.destroy();
        performanceChart.destroy();
      };
    });
  </script>
  
  <div>
    <h1 class="text-2xl font-semibold text-gray-900">Visão Geral</h1>
    
    <!-- Stats -->
    <div class="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0 bg-indigo-500 rounded-md p-3">
              <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
              </svg>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dt class="text-sm font-medium text-gray-500 truncate">Total de Vendas</dt>
              <dd class="flex items-baseline">
                <div class="text-2xl font-semibold text-gray-900">R$ 24.389,50</div>
                <div class="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                  <svg class="self-center flex-shrink-0 h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                  </svg>
                  <span class="sr-only">Aumento</span>
                  12%
                </div>
              </dd>
            </div>
          </div>
        </div>
      </div>
  
      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0 bg-red-500 rounded-md p-3">
              <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
              </svg>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dt class="text-sm font-medium text-gray-500 truncate">Novos Pedidos</dt>
              <dd class="flex items-baseline">
                <div class="text-2xl font-semibold text-gray-900">43</div>
                <div class="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                  <svg class="self-center flex-shrink-0 h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                  </svg>
                  <span class="sr-only">Aumento</span>
                  8%
                </div>
              </dd>
            </div>
          </div>
        </div>
      </div>
  
      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0 bg-yellow-500 rounded-md p-3">
              <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"></path>
              </svg>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dt class="text-sm font-medium text-gray-500 truncate">Envios Pendentes</dt>
              <dd class="flex items-baseline">
                <div class="text-2xl font-semibold text-gray-900">25</div>
                <div class="ml-2 flex items-baseline text-sm font-semibold text-red-600">
                  <span class="sr-only">Diminuição</span>
                  5%
                </div>
              </dd>
            </div>
          </div>
        </div>
      </div>
  
      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0 bg-green-500 rounded-md p-3">
              <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
              </svg>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dt class="text-sm font-medium text-gray-500 truncate">Novos Clientes</dt>
              <dd class="flex items-baseline">
                <div class="text-2xl font-semibold text-gray-900">18</div>
                <div class="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                  <svg class="self-center flex-shrink-0 h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                  </svg>
                  <span class="sr-only">Aumento</span>
                  15%
                </div>
              </dd>
            </div>
          </div>
        </div>
      </div>
    </div>
  
    <!-- Charts -->
    <div class="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <h3 class="text-lg leading-6 font-medium text-gray-900">Vendas por Categoria</h3>
          <div class="mt-2 h-64">
            <canvas bind:this={salesChartCanvas}></canvas>
          </div>
        </div>
      </div>
  
      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <h3 class="text-lg leading-6 font-medium text-gray-900">Performance de Vendas</h3>
          <div class="mt-2 h-64">
            <canvas bind:this={performanceChartCanvas}></canvas>
          </div>
        </div>
      </div>
    </div>
  
    <!-- Recent Orders -->
    <div class="mt-8">
      <div class="bg-white shadow rounded-lg">
        <div class="px-4 py-5 sm:px-6 flex justify-between items-center">
          <h3 class="text-lg leading-6 font-medium text-gray-900">Pedidos Recentes</h3>
          <button class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Ver todos
          </button>
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
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor</th>
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
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.value}</td>
                  </tr>
                {/each}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>