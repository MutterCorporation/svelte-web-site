<script>
	import { t } from '$lib/i18n/texts.js';
</script>

<svelte:head>
	<title>{t('FINANCE_TABLE.HERO.TITLE')} - MutterCorp</title>
	<meta name="description" content="{t('FINANCE_TABLE.HERO.DESCRIPTION')}" />
</svelte:head>

<div class="finance-container">
	<!-- Hero Section -->
	<section class="hero-section">
		<div class="hero-content">
			<h1 class="hero-title">{t('FINANCE_TABLE.HERO.TITLE')}</h1>
			<p class="hero-description">{t('FINANCE_TABLE.HERO.DESCRIPTION')}</p>
			<div class="hero-actions">
				<button class="btn-primary">{t('FINANCE_TABLE.HERO.CTA_PRIMARY')}</button>
				<button class="btn-secondary">{t('FINANCE_TABLE.HERO.CTA_SECONDARY')}</button>
			</div>
		</div>
	</section>

	<!-- Navigation Tabs -->
	<nav class="finance-nav">
		<button class="nav-tab active">{t('FINANCE_TABLE.NAV.GUIDE')}</button>
		<button class="nav-tab">{t('FINANCE_TABLE.NAV.DASHBOARD')}</button>
		<button class="nav-tab">{t('FINANCE_TABLE.NAV.TRANSACTIONS')}</button>
		<button class="nav-tab">{t('FINANCE_TABLE.NAV.REPORTS')}</button>
	</nav>

	<!-- Summary Cards -->
	<section class="summary-section">
		<div class="summary-grid">
			<div class="summary-card">
				<h3>{t('FINANCE_TABLE.SUMMARY.REVENUE.TITLE')}</h3>
				<p class="summary-value">R$ 125.450,00</p>
				<span class="summary-change positive">+12.5%</span>
			</div>
			<div class="summary-card">
				<h3>{t('FINANCE_TABLE.SUMMARY.EXPENSES.TITLE')}</h3>
				<p class="summary-value">R$ 45.230,00</p>
				<span class="summary-change negative">-3.2%</span>
			</div>
			<div class="summary-card">
				<h3>{t('FINANCE_TABLE.SUMMARY.PROFIT.TITLE')}</h3>
				<p class="summary-value">R$ 80.220,00</p>
				<span class="summary-change positive">+18.7%</span>
			</div>
			<div class="summary-card">
				<h3>{t('FINANCE_TABLE.SUMMARY.BALANCE.TITLE')}</h3>
				<p class="summary-value">R$ 325.680,00</p>
				<span class="summary-change neutral">0.0%</span>
			</div>
		</div>
	</section>

	<!-- Quick Actions -->
	<section class="actions-section">
		<h2>{t('FINANCE_TABLE.ACTIONS.TITLE')}</h2>
		<div class="actions-grid">
			<button class="action-card">
				<span class="action-icon">📊</span>
				<h3>{t('FINANCE_TABLE.ACTIONS.GENERATE_REPORT')}</h3>
			</button>
			<button class="action-card">
				<span class="action-icon">💰</span>
				<h3>{t('FINANCE_TABLE.ACTIONS.ADD_TRANSACTION')}</h3>
			</button>
			<button class="action-card">
				<span class="action-icon">📈</span>
				<h3>{t('FINANCE_TABLE.ACTIONS.VIEW_ANALYTICS')}</h3>
			</button>
			<button class="action-card">
				<span class="action-icon">⚙️</span>
				<h3>{t('FINANCE_TABLE.ACTIONS.SETTINGS')}</h3>
			</button>
		</div>
	</section>
</div>

<style>
	.finance-container {
		min-height: 100vh;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		padding: 2rem;
		color: white;
	}

	.hero-section {
		text-align: center;
		padding: 4rem 0;
		margin-bottom: 3rem;
	}

	.hero-title {
		font-size: clamp(2.5rem, 5vw, 4rem);
		font-weight: 800;
		margin-bottom: 1rem;
		background: linear-gradient(45deg, #fff, #a8edea);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.hero-description {
		font-size: clamp(1.1rem, 2vw, 1.3rem);
		margin-bottom: 2rem;
		max-width: 600px;
		margin-left: auto;
		margin-right: auto;
		opacity: 0.9;
	}

	.hero-actions {
		display: flex;
		gap: 1rem;
		justify-content: center;
		flex-wrap: wrap;
	}

	.btn-primary, .btn-secondary {
		padding: 1rem 2rem;
		border-radius: 0.5rem;
		font-weight: 600;
		transition: all 0.3s ease;
		cursor: pointer;
		border: none;
	}

	.btn-primary {
		background: linear-gradient(45deg, #ff6b6b, #feca57);
		color: white;
	}

	.btn-secondary {
		background: rgba(255, 255, 255, 0.1);
		color: white;
		border: 2px solid rgba(255, 255, 255, 0.3);
	}

	.btn-primary:hover, .btn-secondary:hover {
		transform: translateY(-2px);
		box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
	}

	.finance-nav {
		display: flex;
		justify-content: center;
		gap: 1rem;
		margin-bottom: 3rem;
		flex-wrap: wrap;
	}

	.nav-tab {
		padding: 0.75rem 1.5rem;
		background: rgba(255, 255, 255, 0.1);
		border: 2px solid rgba(255, 255, 255, 0.2);
		color: white;
		border-radius: 0.5rem;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.nav-tab.active {
		background: rgba(255, 255, 255, 0.2);
		border-color: rgba(255, 255, 255, 0.5);
	}

	.nav-tab:hover {
		background: rgba(255, 255, 255, 0.15);
	}

	.summary-section {
		margin-bottom: 4rem;
	}

	.summary-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 2rem;
		max-width: 1200px;
		margin: 0 auto;
	}

	.summary-card {
		background: rgba(255, 255, 255, 0.1);
		padding: 2rem;
		border-radius: 1rem;
		backdrop-filter: blur(10px);
		border: 1px solid rgba(255, 255, 255, 0.2);
		text-align: center;
	}

	.summary-card h3 {
		margin-bottom: 1rem;
		opacity: 0.8;
		font-size: 0.9rem;
		text-transform: uppercase;
		letter-spacing: 1px;
	}

	.summary-value {
		font-size: 2rem;
		font-weight: 800;
		margin-bottom: 0.5rem;
	}

	.summary-change {
		font-size: 0.9rem;
		font-weight: 600;
		padding: 0.25rem 0.5rem;
		border-radius: 0.25rem;
	}

	.summary-change.positive {
		background: rgba(76, 175, 80, 0.2);
		color: #4caf50;
	}

	.summary-change.negative {
		background: rgba(244, 67, 54, 0.2);
		color: #f44336;
	}

	.summary-change.neutral {
		background: rgba(158, 158, 158, 0.2);
		color: #9e9e9e;
	}

	.actions-section {
		text-align: center;
		max-width: 1000px;
		margin: 0 auto;
	}

	.actions-section h2 {
		margin-bottom: 2rem;
		font-size: 2rem;
		font-weight: 700;
	}

	.actions-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 1.5rem;
	}

	.action-card {
		background: rgba(255, 255, 255, 0.1);
		padding: 2rem;
		border-radius: 1rem;
		border: 1px solid rgba(255, 255, 255, 0.2);
		cursor: pointer;
		transition: all 0.3s ease;
		color: white;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
	}

	.action-card:hover {
		background: rgba(255, 255, 255, 0.15);
		transform: translateY(-5px);
	}

	.action-icon {
		font-size: 2.5rem;
	}

	.action-card h3 {
		margin: 0;
		font-size: 1rem;
		font-weight: 600;
	}

	@media (max-width: 768px) {
		.finance-container {
			padding: 1rem;
		}

		.hero-section {
			padding: 2rem 0;
		}

		.summary-grid,
		.actions-grid {
			grid-template-columns: 1fr;
		}
	}
</style> 