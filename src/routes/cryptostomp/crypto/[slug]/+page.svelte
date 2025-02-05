<script>
    import { onMount } from 'svelte';
    import Canvas from '../Canvas.svelte';
	import OrderPanels from '../OrderPanels.svelte';
    
    let slug = '';
    let limit = '1m';
    let size = 100;
    /**
     * @type {never[]}
     */
    let dataGraph = [];
    let isLoading = false;
    let hasError = false;
    let refreshInterval;

    const timeIntervals = [
        { value: '1m', label: '1 Minuto' },
        { value: '5m', label: '5 Minutos' },
        { value: '1h', label: '1 Hora' },
        { value: '1d', label: '1 Dia' }
    ];

    const sizeOptions = [
        { value: 50, label: '50 candles' },
        { value: 100, label: '100 candles' },
        { value: 200, label: '200 candles' },
        { value: 500, label: '500 candles' }
    ];

    onMount(() => {
        const path = window.location.pathname;
        slug = path.split('/').pop();
        loadData();
        startAutoRefresh();

        return () => {
            if (refreshInterval) {
                clearInterval(refreshInterval);
            }
        };
    });

    function startAutoRefresh() {
        if (refreshInterval) {
            clearInterval(refreshInterval);
        }

        const refreshTimes = {
            '1m': 10000,
            '5m': 30000,
            '1h': 60000,
            '1d': 300000
        };

        refreshInterval = setInterval(() => {
            loadData();
        }, refreshTimes[limit]);
    }

    async function loadData() {
        if (isLoading) return;

        isLoading = true;
        hasError = false;

        try {
            await fetchGraph(slug, limit, size);
        } catch (error) {
            hasError = true;
        } finally {
            isLoading = false;
        }
    }

    async function fetchGraph(slug, limit, size) {
        try {
            const token = localStorage.getItem('MutterCorp');
            const res = await fetch(
                `https://dev.muttercorp.com.br/binance/market-kline-data?symbol=${slug.toUpperCase()}&interval=${limit}&limit=${size}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            if (res.ok) {
                const data = await res.json();
                dataGraph = data;
            } else {
                if (res.status === 403 || res.status === 401) {
                    localStorage.removeItem('MutterCorp');
                    window.location.href = '/login';
                } else if (res.status === 500) {
                    hasError = true;
                }
            }
        } catch (error) {
            hasError = true;
        }
    }

    function handleIntervalChange() {
        loadData();
        startAutoRefresh();
    }

    function handleSizeChange() {
        loadData();
    }

    function handleManualRefresh() {
        loadData();
    }
</script>

<div class="container">
    <div class="controls">
        <div class="control-group">
            <label for="time-interval">Intervalo de Tempo</label>
            <select id="time-interval" bind:value={limit} on:change={handleIntervalChange}>
                {#each timeIntervals as interval}
                    <option value={interval.value}>{interval.label}</option>
                {/each}
            </select>
        </div>

        <div class="control-group">
            <label for="size">Tamanho</label>
            <select id="size" bind:value={size} on:change={handleSizeChange}>
                {#each sizeOptions as option}
                    <option value={option.value}>{option.label}</option>
                {/each}
            </select>
        </div>

        <button on:click={handleManualRefresh} disabled={isLoading} class="refresh-btn">
            {#if isLoading}
                <span class="loader"></span> Carregando...
            {:else}
                Atualizar
            {/if}
        </button>
    </div>

    {#if hasError}
        <div class="error">
            Erro ao carregar os dados. Tente novamente.
        </div>
    {/if}

    <p class="slug">Slug atual: <strong>{slug}</strong></p>
    <Canvas data={dataGraph}/>
    <OrderPanels />
</div>


<style>
    .container {
        font-family: Arial, sans-serif;
        max-width: 900px;
        margin: 0 auto;
        padding: 2rem;
        background-color: #f9f9f9;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }

    .controls {
        display: flex;
        gap: 1.5rem;
        margin-bottom: 1.5rem;
        align-items: flex-end;
        flex-wrap: wrap;
    }

    .control-group {
        display: flex;
        flex-direction: column;
    }

    label {
        font-size: 0.9rem;
        color: #333;
        margin-bottom: 0.5rem;
    }

    select, button {
        padding: 0.75rem 1rem;
        border-radius: 6px;
        border: 1px solid #ddd;
        font-size: 1rem;
    }

    button {
        background-color: #007BFF;
        color: white;
        cursor: pointer;
        transition: background-color 0.3s;
    }

    button:disabled {
        background-color: #cccccc;
        cursor: not-allowed;
    }

    button:hover:not(:disabled) {
        background-color: #0056b3;
    }

    .error {
        color: #d9534f;
        background-color: #f2dede;
        padding: 0.75rem;
        border: 1px solid #ebcccc;
        border-radius: 6px;
        margin-bottom: 1rem;
    }

    .slug {
        font-size: 1.1rem;
        color: #555;
    }

    .refresh-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
    }

    .loader {
        border: 2px solid #f3f3f3;
        border-top: 2px solid #007BFF;
        border-radius: 50%;
        width: 1rem;
        height: 1rem;
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
</style>
