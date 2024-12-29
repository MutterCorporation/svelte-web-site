<script>
    import { onMount } from 'svelte';
    import Canvas from '../Canvas.svelte';
    
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

    // Time interval options
    const timeIntervals = [
        { value: '1m', label: '1 Minuto' },
        { value: '5m', label: '5 Minutos' },
        { value: '1h', label: '1 Hora' },
        { value: '1d', label: '1 Dia' }
    ];

    // Size options
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
        
        // Start auto-refresh
        startAutoRefresh();

        // Cleanup on component destroy
        return () => {
            if (refreshInterval) {
                clearInterval(refreshInterval);
            }
        };
    });

    function startAutoRefresh() {
        // Clear existing interval if any
        if (refreshInterval) {
            clearInterval(refreshInterval);
        }

        // Set new interval based on selected time
        const refreshTimes = {
            '1m': 10000,    // 10 seconds for 1m
            '5m': 30000,    // 30 seconds for 5m
            '1h': 60000,    // 1 minute for 1h
            '1d': 300000    // 5 minutes for 1d
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

<div class="controls">
    <select bind:value={limit} on:change={handleIntervalChange}>
        {#each timeIntervals as interval}
            <option value={interval.value}>{interval.label}</option>
        {/each}
    </select>

    <select bind:value={size} on:change={handleSizeChange}>
        {#each sizeOptions as option}
            <option value={option.value}>{option.label}</option>
        {/each}
    </select>

    <button on:click={handleManualRefresh} disabled={isLoading}>
        {#if isLoading}
            Carregando...
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

<p>Current slug: {slug}</p>
<Canvas data={dataGraph}/>

<style>
    .controls {
        display: flex;
        gap: 1rem;
        margin-bottom: 1rem;
    }

    select, button {
        padding: 0.5rem;
        border-radius: 4px;
        border: 1px solid #ccc;
    }

    button {
        background-color: #4CAF50;
        color: white;
        border: none;
        cursor: pointer;
    }

    button:disabled {
        background-color: #cccccc;
        cursor: not-allowed;
    }

    button:hover:not(:disabled) {
        background-color: #45a049;
    }

    .error {
        color: red;
        margin-bottom: 1rem;
    }
</style>