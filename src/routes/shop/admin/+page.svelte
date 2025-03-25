<script>
    import { onMount } from 'svelte';
    import { fade, slide } from 'svelte/transition';
  
    // Estados
    let activeTab = 'dashboard';
    let isAddingProduct = false;
    let isEditingProduct = false;
    let searchQuery = '';
    let selectedOrder = null;
    
    // Mock de dados
    let products = [
      {
        id: 1,
        name: 'Camisa Básica Preta',
        price: 89.90,
        stock: 50,
        image: '/api/placeholder/80/80',
        status: 'active',
        sales: 124
      },
      {
        id: 2,
        name: 'Camisa Polo Azul',
        price: 129.90,
        stock: 35,
        image: '/api/placeholder/80/80',
        status: 'active',
        sales: 89
      }
    ];
  
    let orders = [
      {
        id: '#1234',
        customer: 'João Silva',
        date: '2024-12-20',
        status: 'Pendente',
        items: [
          { name: 'Camisa Básica Preta', quantity: 1, price: 89.90 }
        ],
        total: 89.90,
        address: 'Rua das Flores, 123 - São Paulo, SP'
      },
      {
        id: '#1235',
        customer: 'Maria Santos',
        date: '2024-12-25',
        status: 'Em transporte',
        items: [
          { name: 'Camisa Polo Azul', quantity: 2, price: 129.90 }
        ],
        total: 259.80,
        address: 'Av. Principal, 456 - Rio de Janeiro, RJ'
      }
    ];
  
    // Estado para novo produto
    let newProduct = {
      name: '',
      price: '',
      stock: '',
      description: '',
      image: null
    };
  
    // Métricas do dashboard
    let metrics = {
      totalSales: 'R$ 12.458,90',
      monthlyOrders: 145,
      averageOrder: 'R$ 185,90',
      pendingShipments: 12
    };
  
    // Funções
    const addProduct = () => {
      isAddingProduct = true;
    };
  
    const saveProduct = () => {
      // Implementar lógica de salvamento
      isAddingProduct = false;
      alert('Produto salvo com sucesso!');
    };
  
    const updateOrderStatus = (orderId, newStatus) => {
      orders = orders.map(order => 
        order.id === orderId 
          ? {...order, status: newStatus}
          : order
      );
    };
  
    const getStatusColor = (status) => {
      const colors = {
        'Pendente': 'bg-yellow-100 text-yellow-800',
        'Em transporte': 'bg-blue-100 text-blue-800',
        'Entregue': 'bg-green-100 text-green-800',
        'Cancelado': 'bg-red-100 text-red-800'
      };
      return colors[status] || 'bg-gray-100 text-gray-800';
    };
  </script>
  
  <main class="min-h-screen bg-gray-50">
    <!-- Sidebar -->
    <aside class="fixed left-0 top-0 w-64 h-full bg-white shadow-lg">
      <div class="p-6">
        <h1 class="text-2xl font-bold text-gray-800">Admin Panel</h1>
      </div>
      <nav class="mt-6">
        {#each ['dashboard', 'products', 'orders'] as tab}
          <button
            class="w-full px-6 py-4 text-left transition-colors
                   {activeTab === tab ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600' : 'text-gray-600 hover:bg-gray-50'}"
            on:click={() => activeTab = tab}>
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        {/each}
      </nav>
    </aside>
  
    <!-- Conteúdo Principal -->
    <div class="ml-64 p-8">
      {#if activeTab === 'dashboard'}
        <div in:fade>
          <h2 class="text-2xl font-bold mb-6">Dashboard</h2>
          
          <!-- Métricas -->
          <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {#each Object.entries(metrics) as [key, value]}
              <div class="bg-white rounded-lg shadow p-6">
                <h3 class="text-gray-600 mb-2">
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </h3>
                <p class="text-2xl font-bold text-gray-800">{value}</p>
              </div>
            {/each}
          </div>
  
          <!-- Gráficos e estatísticas adicionais iriam aqui -->
        </div>
      {/if}
  
      {#if activeTab === 'products'}
        <div in:fade>
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold">Produtos</h2>
            <button
              class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              on:click={addProduct}>
              Adicionar Produto
            </button>
          </div>
  
          <!-- Lista de Produtos -->
          <div class="bg-white rounded-lg shadow">
            <table class="w-full">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-gray-600">Produto</th>
                  <th class="px-6 py-3 text-left text-gray-600">Preço</th>
                  <th class="px-6 py-3 text-left text-gray-600">Estoque</th>
                  <th class="px-6 py-3 text-left text-gray-600">Vendas</th>
                  <th class="px-6 py-3 text-left text-gray-600">Status</th>
                  <th class="px-6 py-3 text-left text-gray-600">Ações</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                {#each products as product}
                  <tr class="hover:bg-gray-50">
                    <td class="px-6 py-4">
                      <div class="flex items-center">
                        <img src={product.image} alt={product.name} class="w-12 h-12 rounded object-cover mr-4"/>
                        <span>{product.name}</span>
                      </div>
                    </td>
                    <td class="px-6 py-4">R$ {product.price.toFixed(2)}</td>
                    <td class="px-6 py-4">{product.stock}</td>
                    <td class="px-6 py-4">{product.sales}</td>
                    <td class="px-6 py-4">
                      <span class={`px-3 py-1 rounded-full ${product.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {product.status}
                      </span>
                    </td>
                    <td class="px-6 py-4">
                      <button class="text-blue-600 hover:text-blue-800 mr-3">Editar</button>
                      <button class="text-red-600 hover:text-red-800">Remover</button>
                    </td>
                  </tr>
                {/each}
              </tbody>
            </table>
          </div>
        </div>
      {/if}
  
      {#if activeTab === 'orders'}
        <div in:fade>
          <h2 class="text-2xl font-bold mb-6">Pedidos</h2>
          
          <!-- Filtro de Pedidos -->
          <div class="mb-6">
            <input
              type="text"
              placeholder="Buscar pedidos..."
              bind:value={searchQuery}
              class="w-full max-w-md px-4 py-2 border rounded-lg"
            />
          </div>
  
          <!-- Lista de Pedidos -->
          <div class="space-y-4">
            {#each orders as order}
              <div class="bg-white rounded-lg shadow p-6">
                <div class="flex justify-between items-start mb-4">
                  <div>
                    <h3 class="text-lg font-semibold">Pedido {order.id}</h3>
                    <p class="text-gray-600">Cliente: {order.customer}</p>
                    <p class="text-gray-600">Data: {order.date}</p>
                  </div>
                  <div class="flex items-center gap-4">
                    <select
                      class="border rounded-lg px-3 py-1"
                      value={order.status}
                      on:change={(e) => updateOrderStatus(order.id, e.target.value)}>
                      <option>Pendente</option>
                      <option>Em transporte</option>
                      <option>Entregue</option>
                      <option>Cancelado</option>
                    </select>
                    <span class={`px-3 py-1 rounded-full ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                </div>
                
                <!-- Itens do Pedido -->
                <div class="border-t border-b py-4 my-4">
                  {#each order.items as item}
                    <div class="flex justify-between items-center mb-2">
                      <span>{item.name} x{item.quantity}</span>
                      <span>R$ {item.price.toFixed(2)}</span>
                    </div>
                  {/each}
                  <div class="flex justify-between items-center mt-4 font-semibold">
                    <span>Total</span>
                    <span>R$ {order.total.toFixed(2)}</span>
                  </div>
                </div>
  
                <!-- Endereço de Entrega -->
                <div class="text-gray-600">
                  <strong>Endereço de entrega:</strong>
                  <p>{order.address}</p>
                </div>
              </div>
            {/each}
          </div>
        </div>
      {/if}
    </div>
  
    <!-- Modal de Adicionar Produto -->
    {#if isAddingProduct}
      <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" in:fade>
        <div class="bg-white rounded-lg p-8 max-w-2xl w-full" in:slide>
          <h2 class="text-2xl font-bold mb-6">Adicionar Novo Produto</h2>
          <form on:submit|preventDefault={saveProduct} class="space-y-6">
            <div>
              <label class="block text-gray-700 mb-2">Nome do Produto</label>
              <input
                type="text"
                bind:value={newProduct.name}
                class="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-gray-700 mb-2">Preço</label>
                <input
                  type="number"
                  bind:value={newProduct.price}
                  class="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>
              <div>
                <label class="block text-gray-700 mb-2">Estoque</label>
                <input
                  type="number"
                  bind:value={newProduct.stock}
                  class="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>
            </div>
            <div>
              <label class="block text-gray-700 mb-2">Descrição</label>
              <textarea
                bind:value={newProduct.description}
                class="w-full px-4 py-2 border rounded-lg"
                rows="4"
              ></textarea>
            </div>
            <div>
              <label class="block text-gray-700 mb-2">Imagem</label>
              <input
                type="file"
                accept="image/*"
                class="w-full"
              />
            </div>
            <div class="flex justify-end gap-4">
              <button
                type="button"
                class="px-6 py-2 border rounded-lg"
                on:click={() => isAddingProduct = false}>
                Cancelar
              </button>
              <button
                type="submit"
                class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Salvar Produto
              </button>
            </div>
          </form>
        </div>
      </div>
    {/if}
  </main>
  
  <style>
    :global(body) {
      background-color: #f8fafc;
    }
  </style>