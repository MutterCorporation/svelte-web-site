<script>
    import { writable } from 'svelte/store';

    // Order state
    let orderType = 'limit'; // 'limit' or 'market'
    let side = 'buy'; // 'buy' or 'sell'
    let quantity = '';
    let price = '';
    let stopPrice = '';
    let totalAmount = writable(0);

    // Computed total when price or quantity changes
    $: {
        if (price && quantity) {
            totalAmount.set((parseFloat(price) * parseFloat(quantity)).toFixed(2));
        } else {
            totalAmount.set(0);
        }
    }

    function handleOrder() {
        // Implementation for order submission
        const order = {
            type: orderType,
            side: side,
            quantity: parseFloat(quantity),
            price: parseFloat(price),
            stopPrice: stopPrice ? parseFloat(stopPrice) : null,
            timestamp: new Date().toISOString()
        };

        console.log('Submitting order:', order);
        // Add API call here
    }

    function handleReset() {
        quantity = '';
        price = '';
        stopPrice = '';
    }
</script>

<div class="order-panels">
  <div class="tabs">
    <button class="tab-button active">Spot</button>
    <button class="tab-button">Futures</button>
  </div>

  <div class="order-form">
    <div class="price-info">
      <span class="price">$45,123.45</span>
      <span class="change positive">+2.45%</span>
    </div>

    <div class="order-type-selector">
      <button class="order-type active">Limite</button>
      <button class="order-type">Mercado</button>
      <button class="order-type">Stop-Limit</button>
    </div>

    <div class="input-group">
      <label>Preço</label>
      <input type="number" class="order-input" placeholder="0.00" />
    </div>

    <div class="input-group">
      <label>Quantidade</label>
      <input type="number" class="order-input" placeholder="0.00" />
    </div>

    <div class="order-buttons">
      <button class="buy-button">Comprar BTC</button>
      <button class="sell-button">Vender BTC</button>
    </div>
  </div>
</div>

<style>
  .order-panels {
    @apply p-4;
  }

  .tabs {
    @apply flex gap-2 mb-6;
  }

  .tab-button {
    @apply px-6 py-2 rounded-lg text-gray-300 transition-all;
    background: rgba(31, 31, 31, 0.6);
  }

  .tab-button.active {
    @apply bg-orange-500 text-white;
  }

  .order-form {
    @apply space-y-6;
  }

  .price-info {
    @apply flex items-center gap-4 mb-6;
  }

  .price {
    @apply text-3xl font-bold text-white;
  }

  .change {
    @apply text-lg font-semibold;
  }

  .change.positive {
    @apply text-green-400;
  }

  .order-type-selector {
    @apply flex gap-2 mb-6;
  }

  .order-type {
    @apply px-4 py-2 rounded-lg text-sm text-gray-300 transition-all;
    background: rgba(31, 31, 31, 0.6);
  }

  .order-type.active {
    @apply bg-orange-500 text-white;
  }

  .input-group {
    @apply space-y-2;
  }

  .input-group label {
    @apply text-sm text-gray-400;
  }

  .order-input {
    @apply w-full px-4 py-3 rounded-lg text-white bg-gray-800/50 border border-gray-700/50 focus:border-orange-500/50 focus:outline-none transition-all;
  }

  .order-buttons {
    @apply grid grid-cols-2 gap-4 mt-8;
  }

  .buy-button, .sell-button {
    @apply px-6 py-3 rounded-lg font-semibold text-white transition-all;
  }

  .buy-button {
    @apply bg-green-500 hover:bg-green-600;
  }

  .sell-button {
    @apply bg-red-500 hover:bg-red-600;
  }
</style>