<script lang="ts">
	import { onMount } from 'svelte';
	import { createChart, ColorType } from 'lightweight-charts';
	import type { IChartApi, ISeriesApi, CandlestickData, Time } from 'lightweight-charts';

	interface PageData {
		symbol: string;
	}

	const { data } = $props<{ data: PageData }>();
	const symbol = data.symbol;
	console.log('Símbolo recebido:', symbol);

	interface KlineData extends CandlestickData<Time> {
		time: Time;
		open: number;
		high: number;
		low: number;
		close: number;
	}

	let chartData = $state<KlineData[]>([]);
	let loading = $state(true);
	let error = $state<string | null>(null);
	let chartContainer: HTMLDivElement | null = null;
	let chart: IChartApi | null = null;
	let candlestickSeries: ISeriesApi<'Candlestick'> | null = null;

	async function fetchKlines(interval = '1d', limit = 100): Promise<KlineData[]> {
		try {
			const url = `https://api1.binance.com/api/v3/klines?symbol=${symbol}USDT&interval=${interval}&limit=${limit}`;
			console.log('URL da requisição:', url);
			
			const response = await fetch(url);
			console.log('Status da resposta:', response.status);
			
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			
			const data = await response.json();
			console.log('Dados recebidos:', data.length, 'registros');
			
			if (!Array.isArray(data) || data.length === 0) {
				throw new Error('Dados inválidos recebidos da API');
			}

			const formattedData: KlineData[] = data.map((kline: any[]) => ({
				time: (kline[0] / 1000) as Time,
				open: parseFloat(kline[1]),
				high: parseFloat(kline[2]),
				low: parseFloat(kline[3]),
				close: parseFloat(kline[4])
			}));

			console.log('Dados formatados:', formattedData.length, 'registros');
			return formattedData;
		} catch (err) {
			console.error('Erro detalhado:', err);
			error = err instanceof Error ? err.message : 'Erro ao carregar dados';
			return [];
		}
	}

	async function initChart() {
		console.log('Iniciando initChart');
		if (!chartContainer) {
			console.error('Container do gráfico não encontrado');
			return;
		}

		try {
			console.log('Iniciando criação do gráfico');
			// Criar o gráfico
			chart = createChart(chartContainer, {
				layout: {
					background: { type: ColorType.Solid, color: 'transparent' },
					textColor: '#d1d4dc'
				},
				grid: {
					vertLines: { color: 'rgba(42, 46, 57, 0.5)' },
					horzLines: { color: 'rgba(42, 46, 57, 0.5)' }
				},
				width: chartContainer.clientWidth,
				height: 500
			});

			console.log('Gráfico criado, adicionando série de candlesticks');
			// Criar série de candlesticks
			candlestickSeries = chart.addCandlestickSeries({
				upColor: '#26a69a',
				downColor: '#ef5350',
				borderVisible: false,
				wickUpColor: '#26a69a',
				wickDownColor: '#ef5350'
			});

			// Carregar dados iniciais
			console.log('Carregando dados iniciais');
			const klines = await fetchKlines();
			if (klines.length > 0 && candlestickSeries) {
				chartData = klines;
				candlestickSeries.setData(klines);
				console.log('Dados carregados no gráfico');

				// Ajustar visualização
				chart.timeScale().fitContent();
				console.log('Visualização ajustada');

				// Atualizar dados a cada minuto
				setInterval(async () => {
					const newKlines = await fetchKlines('1m', 1);
					if (newKlines.length > 0 && candlestickSeries) {
						candlestickSeries.update(newKlines[0]);
					}
				}, 60000);
			} else {
				throw new Error('Nenhum dado recebido da API');
			}
		} catch (err) {
			console.error('Erro ao inicializar gráfico:', err);
			error = err instanceof Error ? err.message : 'Erro ao inicializar gráfico';
		}
	}

	$effect(() => {
		console.log('Effect detectou mudança no chartContainer:', !!chartContainer);
		if (chartContainer) {
			console.log('Container encontrado, iniciando gráfico');
			initChart();
		}
	});

	onMount(() => {
		console.log('Componente montado');
		loading = false;

		// Ajustar tamanho do gráfico quando a janela for redimensionada
		const handleResize = () => {
			if (chart && chartContainer) {
				chart.applyOptions({
					width: chartContainer.clientWidth
				});
			}
		};

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
			if (chart) {
				chart.remove();
			}
		};
	});
</script>

<svelte:head>
	<title>{symbol}/USDT - Análise Técnica | CryptoStomp</title>
	<meta
		name="description"
		content="Análise técnica em tempo real de {symbol}/USDT na Binance. Gráficos de candlestick, indicadores técnicos e dados históricos para traders."
	/>
	<meta
		name="keywords"
		content="Criptomoedas, {symbol}, USDT, Análise Técnica, Trading, Binance, Gráficos, Candlestick, RSI, MACD"
	/>
	<meta name="author" content="CryptoStomp" />
	<meta property="og:title" content="{symbol}/USDT - Análise Técnica | CryptoStomp" />
	<meta
		property="og:description"
		content="Análise técnica em tempo real de {symbol}/USDT na Binance. Gráficos de candlestick, indicadores técnicos e dados históricos para traders."
	/>
	<meta property="og:image" content="https://conteudointimo.s3.amazonaws.com/56e93a94570d8e976ded439a2c17ff6ee370bd0b9adb9b7776e105b3f31ce880.jpeg" />
	<meta property="og:url" content={`https://muttercorp.com.br/cryptostomp/crypto/${symbol.toLowerCase()}`} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta property="og:type" content="website" />
</svelte:head>

<div class="min-h-screen bg-gradient-to-l from-gray-900 via-black to-gray-900 text-gray-100 py-10">
	<div class="mx-auto max-w-7xl px-5">
		<!-- Header -->
		<header class="mb-8 text-center">
			<h1 class="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-300 drop-shadow-[0_0_15px_rgba(249,115,22,0.5)]">
				{symbol}/USDT
			</h1>
			<p class="text-xl text-orange-200/80 mt-2">
				Análise Técnica e Dados em Tempo Real
			</p>
		</header>

		{#if loading}
			<div class="flex justify-center items-center h-96">
				<div class="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-500"></div>
			</div>
		{:else if error}
			<div class="text-center text-red-500 p-4 bg-red-900/20 rounded-lg">
				<p class="font-bold mb-2">Erro ao carregar dados</p>
				<p>{error}</p>
			</div>
		{:else}
			<!-- Gráfico Principal -->
			<div class="bg-gray-800/50 backdrop-blur-sm border border-orange-500/20 rounded-xl p-4 mb-8">
				<div bind:this={chartContainer} class="w-full h-[500px]"></div>
			</div>

			<!-- Informações Adicionais -->
			<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
				<!-- Estatísticas -->
				<div class="bg-gray-800/50 backdrop-blur-sm border border-orange-500/20 rounded-xl p-4">
					<h2 class="text-xl font-bold text-orange-500 mb-4">Estatísticas</h2>
					<div class="space-y-4">
						{#if chartData.length > 0}
							<div class="grid grid-cols-2 gap-4">
								<div class="bg-gray-900/50 p-3 rounded-lg">
									<p class="text-sm text-gray-400">Preço Atual</p>
									<p class="text-lg font-bold text-white">${chartData[chartData.length - 1].close}</p>
								</div>
								<div class="bg-gray-900/50 p-3 rounded-lg">
									<p class="text-sm text-gray-400">Variação 24h</p>
									<p class="text-lg font-bold text-white">
										{((chartData[chartData.length - 1].close - chartData[0].open) / chartData[0].open * 100).toFixed(2)}%
									</p>
								</div>
							</div>
						{/if}
					</div>
				</div>

				<!-- Indicadores Técnicos -->
				<div class="bg-gray-800/50 backdrop-blur-sm border border-orange-500/20 rounded-xl p-4">
					<h2 class="text-xl font-bold text-orange-500 mb-4">Indicadores Técnicos</h2>
					<div class="space-y-4">
						{#if chartData.length > 0}
							<div class="grid grid-cols-2 gap-4">
								<div class="bg-gray-900/50 p-3 rounded-lg">
									<p class="text-sm text-gray-400">RSI (14)</p>
									<p class="text-lg font-bold text-white">Calculando...</p>
								</div>
								<div class="bg-gray-900/50 p-3 rounded-lg">
									<p class="text-sm text-gray-400">MACD</p>
									<p class="text-lg font-bold text-white">Calculando...</p>
								</div>
							</div>
						{/if}
					</div>
				</div>
			</div>
		{/if}
	</div>
</div>

<style>
	:global(body) {
		margin: 0;
		font-family: 'Inter', sans-serif;
		background-color: black;
	}
</style>
