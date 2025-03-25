<script>
  import { onMount } from "svelte";
  import Chart from "chart.js/auto";
  import Header from "../components/Header.svelte";

  let transactions = [];
  let userData = { name: "Usuário", currency: "R$" };
  let totalIncome = 0;
  let totalExpense = 0;
  let balance = 0;
  let monthlyChart, categoryChart;
  let selectedMonth = new Date().toISOString().slice(0, 7);

  function calculateSummary() {
    const filteredTransactions = transactions.filter(t => t.date.startsWith(selectedMonth));
    totalIncome = filteredTransactions.filter(t => t.type === "income").reduce((sum, t) => sum + t.amount, 0);
    totalExpense = filteredTransactions.filter(t => t.type === "expense").reduce((sum, t) => sum + t.amount, 0);
    balance = totalIncome - totalExpense;
  }

  function renderCharts() {
    if (monthlyChart) monthlyChart.destroy();
    if (categoryChart) categoryChart.destroy();

    const ctx1 = document.getElementById("monthlyChart").getContext("2d");
    monthlyChart = new Chart(ctx1, {
      type: "line",
      data: {
        labels: transactions.map(t => t.date),
        datasets: [{
          label: "Saldo Acumulado",
          data: transactions.reduce((acc, t) => {
            acc.push((acc.length ? acc[acc.length - 1] : 0) + (t.type === "income" ? t.amount : -t.amount));
            return acc;
          }, []),
          borderColor: "#3B82F6",
          fill: false
        }]
      }
    });

    const ctx2 = document.getElementById("categoryChart").getContext("2d");
    const expenseCategories = transactions.filter(t => t.type === "expense").reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});
    categoryChart = new Chart(ctx2, {
      type: "bar",
      data: {
        labels: Object.keys(expenseCategories),
        datasets: [{
          label: "Despesas por Categoria",
          data: Object.values(expenseCategories),
          backgroundColor: "#EF4444"
        }]
      }
    });
  }

  onMount(() => {
    transactions = [
      { id: 1, description: "Salário", amount: 5000, type: "income", category: "Trabalho", date: "2025-02-01" },
      { id: 2, description: "Aluguel", amount: 1200, type: "expense", category: "Moradia", date: "2025-02-05" },
      { id: 3, description: "Supermercado", amount: 450, type: "expense", category: "Alimentação", date: "2025-02-10" },
      { id: 4, description: "Internet", amount: 120, type: "expense", category: "Serviços", date: "2025-02-08" }
    ];

    calculateSummary();
    renderCharts();
  });
</script>

<Header />
<main class="min-h-screen bg-gray-100 p-6">
  <h1 class="text-3xl font-bold mb-4">Relatório Mensal</h1>
  <input type="month" bind:value={selectedMonth} on:change={() => { calculateSummary(); renderCharts(); }} />

  <section class="grid grid-cols-3 gap-4 mb-6">
    <div class="bg-white p-4 shadow rounded text-center">
      <h2>Saldo Atual</h2>
      <p class="text-2xl font-bold">{userData.currency}{balance.toFixed(2)}</p>
    </div>
    <div class="bg-green-100 p-4 shadow rounded text-center">
      <h2>Receitas</h2>
      <p class="text-2xl font-bold text-green-600">{userData.currency}{totalIncome.toFixed(2)}</p>
    </div>
    <div class="bg-red-100 p-4 shadow rounded text-center">
      <h2>Despesas</h2>
      <p class="text-2xl font-bold text-red-600">{userData.currency}{totalExpense.toFixed(2)}</p>
    </div>
  </section>

  <section class="bg-white p-6 shadow rounded-lg mb-6">
    <h2>Saldo Acumulado</h2>
    <canvas id="monthlyChart"></canvas>
  </section>

  <section class="bg-white p-6 shadow rounded-lg">
    <h2>Despesas por Categoria</h2>
    <canvas id="categoryChart"></canvas>
  </section>
</main>

<style>
  main { font-family: "Inter", sans-serif; }
</style>
