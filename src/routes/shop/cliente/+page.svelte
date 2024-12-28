<script>
    import { onMount } from 'svelte';
    import { fade, slide, scale } from 'svelte/transition';
    import { quintOut } from 'svelte/easing';
    
    let customer = {
      name: '',
      email: '',
      orders: [],
      addresses: []
    };
  
    let orders = [
      {
        id: '#1234',
        date: '2024-12-20',
        status: 'Entregue',
        items: [
          { name: 'Camisa Básica Preta', quantity: 1, price: 89.90, image: '/api/placeholder/60/60' }
        ],
        total: 89.90
      },
      {
        id: '#1235', 
        date: '2024-12-25',
        status: 'Em transporte',
        items: [
          { name: 'Camisa Polo Azul', quantity: 2, price: 129.90, image: '/api/placeholder/60/60' }
        ],
        total: 259.80
      }
    ];
  
    let activeTab = 'profile';
    let hoveredOrder = null;
  
    onMount(async () => {
      customer = {
        name: 'João Silva',
        email: 'joao@email.com',
        phone: '(11) 98765-4321',
        avatar: '/api/placeholder/100/100',
        addresses: [
          {
            street: 'Rua das Flores, 123',
            city: 'São Paulo',
            state: 'SP',
            zipCode: '01234-567',
            default: true
          },
          {
            street: 'Avenida Principal, 456',
            city: 'São Paulo',
            state: 'SP',
            zipCode: '04567-890',
            default: false
          }
        ]
      };
    });
  
    const updateProfile = () => {
      alert('Perfil atualizado com sucesso!');
    };
  
    const addAddress = () => {
      alert('Endereço adicionado com sucesso!');
    };
  
    const getStatusColor = (status) => {
      const statusColors = {
        'Entregue': 'bg-green-100 text-green-800',
        'Em transporte': 'bg-blue-100 text-blue-800',
        'Processando': 'bg-yellow-100 text-yellow-800',
        'Cancelado': 'bg-red-100 text-red-800'
      };
      return statusColors[status] || 'bg-gray-100 text-gray-800';
    };
  </script>
  
  <main class="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
    <div class="max-w-6xl mx-auto">
      <!-- Header com Avatar -->
      <div class="flex items-center gap-6 mb-8" in:fade>
        <img 
          src={customer.avatar} 
          alt="Avatar" 
          class="w-20 h-20 rounded-full shadow-lg border-4 border-white"
        />
        <div>
          <h1 class="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Minha Conta
          </h1>
          <p class="text-gray-600">Bem-vindo de volta, {customer.name}</p>
        </div>
      </div>
  
      <!-- Navegação -->
      <nav class="flex gap-1 bg-white p-1 rounded-xl shadow-md mb-8" in:slide>
        {#each ['profile', 'orders', 'addresses'] as tab}
          <button 
            class="flex-1 py-3 px-6 rounded-lg transition-all duration-300 text-lg
                   {activeTab === tab ? 
                     'bg-blue-500 text-white shadow-lg transform scale-105' : 
                     'text-gray-600 hover:bg-gray-100'}"
            on:click={() => activeTab = tab}>
            {tab === 'profile' ? 'Perfil' : 
             tab === 'orders' ? 'Pedidos' : 'Endereços'}
          </button>
        {/each}
      </nav>
  
      <!-- Conteúdo das abas -->
      {#if activeTab === 'profile'}
        <div class="bg-white rounded-2xl shadow-xl p-8" in:fade={{ duration: 300 }}>
          <h2 class="text-2xl font-semibold mb-6 text-gray-800">Dados Pessoais</h2>
          <form on:submit|preventDefault={updateProfile} class="space-y-6">
            <div class="grid md:grid-cols-2 gap-6">
              <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-700" for="name">Nome</label>
                <input 
                  type="text" 
                  id="name"
                  bind:value={customer.name}
                  class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </div>
              <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-700" for="email">Email</label>
                <input 
                  type="email" 
                  id="email"
                  bind:value={customer.email}
                  class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </div>
              <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-700" for="phone">Telefone</label>
                <input 
                  type="tel" 
                  id="phone"
                  bind:value={customer.phone}
                  class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </div>
            </div>
            <button 
              type="submit"
              class="mt-6 w-full md:w-auto bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-3 rounded-lg
                     hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg">
              Atualizar Dados
            </button>
          </form>
        </div>
      {/if}
  
      {#if activeTab === 'orders'}
        <div class="space-y-6" in:fade={{ duration: 300 }}>
          {#each orders as order}
            <div 
              class="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6"
              on:mouseenter={() => hoveredOrder = order.id}
              on:mouseleave={() => hoveredOrder = null}
              in:scale={{ duration: 300, easing: quintOut }}
            >
              <div class="flex justify-between items-start mb-6">
                <div>
                  <h3 class="text-xl font-semibold text-gray-800">Pedido {order.id}</h3>
                  <p class="text-gray-600">{order.date}</p>
                </div>
                <span class="px-4 py-2 rounded-full text-sm font-medium {getStatusColor(order.status)}">
                  {order.status}
                </span>
              </div>
              <div class="space-y-4">
                {#each order.items as item}
                  <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div class="flex items-center gap-4">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        class="w-16 h-16 rounded-lg object-cover"
                      />
                      <div>
                        <h4 class="font-medium text-gray-800">{item.name}</h4>
                        <p class="text-gray-600">Quantidade: {item.quantity}</p>
                      </div>
                    </div>
                    <span class="font-semibold text-gray-800">
                      R$ {item.price.toFixed(2)}
                    </span>
                  </div>
                {/each}
              </div>
              <div class="mt-6 pt-4 border-t border-gray-100">
                <div class="flex justify-between items-center">
                  <span class="text-lg font-semibold text-gray-800">Total</span>
                  <span class="text-2xl font-bold text-blue-600">
                    R$ {order.total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          {/each}
        </div>
      {/if}
  
      {#if activeTab === 'addresses'}
        <div class="bg-white rounded-2xl shadow-xl p-8" in:fade={{ duration: 300 }}>
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-semibold text-gray-800">Meus Endereços</h2>
            <button 
              class="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg
                     hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
              on:click={addAddress}>
              Adicionar Endereço
            </button>
          </div>
          <div class="grid md:grid-cols-2 gap-6">
            {#each customer.addresses as address}
              <div 
                class="border border-gray-200 p-6 rounded-xl hover:shadow-lg transition-all duration-300
                       {address.default ? 'bg-blue-50 border-blue-200' : 'bg-white'}"
                in:scale={{ duration: 300, easing: quintOut }}
              >
                {#if address.default}
                  <span class="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm mb-4">
                    Endereço Principal
                  </span>
                {/if}
                <p class="text-lg font-medium text-gray-800">{address.street}</p>
                <p class="text-gray-600">{address.city} - {address.state}</p>
                <p class="text-gray-600">CEP: {address.zipCode}</p>
                <div class="mt-4 flex gap-3">
                  <button class="text-blue-600 hover:text-blue-800 transition-colors">
                    Editar
                  </button>
                  {#if !address.default}
                    <button class="text-gray-600 hover:text-gray-800 transition-colors">
                      Definir como Principal
                    </button>
                  {/if}
                </div>
              </div>
            {/each}
          </div>
        </div>
      {/if}
    </div>
  </main>
  
  <style>
    :global(body) {
      background-color: #f8fafc;
    }
  </style>