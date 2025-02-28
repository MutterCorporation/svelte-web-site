<script>
  import { onMount } from 'svelte';
  import Header from '../components/Header.svelte';
  
  let transactions = [
    { id: 1, description: 'Salário', amount: 5000, type: 'income', category: 'Salário', date: '2025-02-15', isPaid: true },
    { id: 2, description: 'Aluguel', amount: 1200, type: 'expense', category: 'Moradia', date: '2025-02-05', isPaid: false },
    { id: 3, description: 'Supermercado', amount: 450, type: 'expense', category: 'Alimentação', date: '2025-02-10', isPaid: false }
  ];

  let showTransactionModal = false;
  let newTransaction = { description: '', amount: '', type: 'expense', category: '', date: '', isPaid: false };

  let filterDescription = '';
  let filterType = '';
  let filterStatus = '';

  function addTransaction() {
    showTransactionModal = false;
    newTransaction = { description: '', amount: '', type: 'expense', category: '', date: '', isPaid: false };
  }

  function deleteTransaction(id) {
    transactions = transactions.filter(t => t.id !== id);
  }

  function markAsPaid(id) {
    transactions = transactions.map(t => t.id === id ? { ...t, isPaid: !t.isPaid } : t);
  }

  $: filteredTransactions = transactions.filter(t => 
    (filterDescription === '' || t.description.toLowerCase().includes(filterDescription.toLowerCase())) &&
    (filterType === '' || t.type === filterType) &&
    (filterStatus === '' || (filterStatus === 'paid' ? t.isPaid : !t.isPaid))
  );
</script>

<Header />
<main class="p-6 bg-gray-100 min-h-screen">
  <h1 class="text-3xl font-bold mb-4">Lista de Transações</h1>

  <div class="mb-4 flex gap-4">
    <input type="text" placeholder="Filtrar por descrição" bind:value={filterDescription} class="p-2 border" />
    <select bind:value={filterType} class="p-2 border">
      <option value="">Todos os Tipos</option>
      <option value="income">Receita</option>
      <option value="expense">Despesa</option>
    </select>
    <select bind:value={filterStatus} class="p-2 border">
      <option value="">Todos os Status</option>
      <option value="paid">Pago</option>
      <option value="pending">Pendente</option>
    </select>
  </div>

  <button class="bg-blue-500 text-white p-2 rounded mb-4" on:click={() => showTransactionModal = true}>Adicionar Transação</button>
  
  <table class="w-full bg-white shadow-md rounded">
    <thead>
      <tr class="bg-gray-200">
        <th class="p-2">Descrição</th>
        <th class="p-2">Valor</th>
        <th class="p-2">Categoria</th>
        <th class="p-2">Data</th>
        <th class="p-2">Status</th>
        <th class="p-2">Ações</th>
      </tr>
    </thead>
    <tbody>
      {#each filteredTransactions as transaction}
        <tr class="border-b">
          <td class="p-2">{transaction.description}</td>
          <td class="p-2">R${transaction.amount.toFixed(2)}</td>
          <td class="p-2">{transaction.category}</td>
          <td class="p-2">{transaction.date}</td>
          <td class="p-2">{transaction.isPaid ? 'Pago' : 'Pendente'}</td>
          <td class="p-2">
            <button class="bg-green-500 text-white p-1 rounded" on:click={() => markAsPaid(transaction.id)}>
              {transaction.isPaid ? 'Desmarcar' : 'Marcar'} como Pago
            </button>
            <button class="bg-red-500 text-white p-1 rounded ml-2" on:click={() => deleteTransaction(transaction.id)}>Excluir</button>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</main>
