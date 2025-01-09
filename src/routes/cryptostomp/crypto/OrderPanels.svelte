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

<div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 p-4 bg-white rounded-lg shadow">
    <!-- Buy/Sell Panel -->
    <div class="p-4 rounded-lg {side === 'buy' ? 'bg-green-50' : 'bg-red-50'}">
        <div class="flex justify-between mb-4">
            <button 
                class="px-4 py-2 rounded-lg font-semibold {side === 'buy' ? 'bg-green-500 text-white' : 'bg-gray-200'}"
                on:click={() => side = 'buy'}
            >
                Comprar
            </button>
            <button 
                class="px-4 py-2 rounded-lg font-semibold {side === 'sell' ? 'bg-red-500 text-white' : 'bg-gray-200'}"
                on:click={() => side = 'sell'}
            >
                Vender
            </button>
        </div>

        <div class="space-y-4">
            <!-- Order Type -->
            <div>
                <label class="block text-sm font-medium mb-1">Tipo de Ordem</label>
                <select 
                    bind:value={orderType}
                    class="w-full p-2 border rounded-lg"
                >
                    <option value="limit">Limit</option>
                    <option value="market">Market</option>
                </select>
            </div>

            <!-- Quantity -->
            <div>
                <label class="block text-sm font-medium mb-1">Quantidade</label>
                <input 
                    type="number"
                    bind:value={quantity}
                    min="0"
                    step="0.0001"
                    class="w-full p-2 border rounded-lg"
                    placeholder="0.00"
                />
            </div>

            <!-- Price -->
            {#if orderType === 'limit'}
                <div>
                    <label class="block text-sm font-medium mb-1">Preço</label>
                    <input 
                        type="number"
                        bind:value={price}
                        min="0"
                        step="0.01"
                        class="w-full p-2 border rounded-lg"
                        placeholder="0.00"
                    />
                </div>
            {/if}

            <!-- Total -->
            <div class="pt-2 border-t">
                <div class="flex justify-between">
                    <span class="font-medium">Total:</span>
                    <span class="font-bold">${$totalAmount}</span>
                </div>
            </div>
        </div>
    </div>

    <!-- Stop Loss Panel -->
    <div class="p-4 bg-gray-50 rounded-lg">
        <h3 class="text-lg font-semibold mb-4">Stop Loss</h3>
        
        <div class="space-y-4">
            <div>
                <label class="block text-sm font-medium mb-1">Preço Stop</label>
                <input 
                    type="number"
                    bind:value={stopPrice}
                    min="0"
                    step="0.01"
                    class="w-full p-2 border rounded-lg"
                    placeholder="0.00"
                />
            </div>

            <div class="flex gap-2">
                <button 
                    class="flex-1 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                    on:click={() => {
                        stopPrice = (parseFloat(price) * 0.95).toFixed(2); // 5% below current price
                    }}
                >
                    -5%
                </button>
                <button 
                    class="flex-1 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                    on:click={() => {
                        stopPrice = (parseFloat(price) * 0.90).toFixed(2); // 10% below current price
                    }}
                >
                    -10%
                </button>
            </div>
        </div>
    </div>

    <!-- Action Buttons -->
    <div class="col-span-1 md:col-span-2 flex gap-4 mt-4">
        <button 
            class="flex-1 py-3 rounded-lg font-semibold text-white {side === 'buy' ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'}"
            on:click={handleOrder}
        >
            {side === 'buy' ? 'Confirmar Compra' : 'Confirmar Venda'}
        </button>
        <button 
            class="px-6 py-3 rounded-lg font-semibold bg-gray-200 hover:bg-gray-300"
            on:click={handleReset}
        >
            Limpar
        </button>
    </div>
</div>

<style>
    input[type="number"]::-webkit-inner-spin-button,
    input[type="number"]::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
    input[type="number"] {
        -moz-appearance: textfield;
    }
</style>