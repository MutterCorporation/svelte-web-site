<script>
  import { onMount } from 'svelte';
  import Header from '../components/Header.svelte';
  
  let transactions = [
    { id: 1, description: 'Salário', amount: 5000, type: 'income', category: 'Salário', date: '2025-02-15', isPaid: true },
    { id: 2, description: 'Aluguel', amount: 1200, type: 'expense', category: 'Moradia', date: '2025-02-05', isPaid: false },
    { id: 3, description: 'Supermercado', amount: 450, type: 'expense', category: 'Alimentação', date: '2025-02-10', isPaid: false }
  ];

  function getTotal(type) {
    return transactions.filter(t => t.type === type).reduce((sum, t) => sum + t.amount, 0).toFixed(2);
  }
</script>

<Header />
<main class="p-6 bg-gray-100 min-h-screen">
  <h1 class="text-3xl font-bold mb-4">Relatório de Transações</h1>
  
  <section class="grid grid-cols-3 gap-4 mb-6">
    <div class="bg-white p-4 shadow rounded text-center">
      <h2>Total Receitas</h2>
      <p class="text-2xl font-bold text-green-600">R${getTotal('income')}</p>
    </div>
    <div class="bg-white p-4 shadow rounded text-center">
      <h2>Total Despesas</h2>
      <p class="text-2xl font-bold text-red-600">R${getTotal('expense')}</p>
    </div>
    <div class="bg-white p-4 shadow rounded text-center">
      <h2>Saldo</h2>
    </div>
  </section>

  <table class="w-full bg-white shadow-md rounded">
    <thead>
      <tr class="bg-gray-200">
        <th class="p-2">Descrição</th>
        <th class="p-2">Valor</th>
        <th class="p-2">Categoria</th>
        <th class="p-2">Data</th>
        <th class="p-2">Status</th>
      </tr>
    </thead>
    <tbody>
      {#each transactions as transaction}
        <tr class="border-b">
          <td class="p-2">{transaction.description}</td>
          <td class="p-2">R${transaction.amount.toFixed(2)}</td>
          <td class="p-2">{transaction.category}</td>
          <td class="p-2">{transaction.date}</td>
          <td class="p-2">{transaction.isPaid ? 'Pago' : 'Pendente'}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</main>