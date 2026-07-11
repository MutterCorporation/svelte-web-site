<script>
	import '../app.css';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { initTheme } from '../lib/themeStore.js';
	import AppHeader from '../components/AppHeader.svelte';
	import AppFooter from '../components/AppFooter.svelte';

	/** @type {{children?: import('svelte').Snippet}} */
	let { children } = $props();

	onMount(() => {
		initTheme();
	});

	let currentPath = $derived($page.url.pathname);
</script>

<svelte:head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&family=Syne:wght@600;700;800&display=swap"
		rel="stylesheet"
	/>

	<meta name="theme-color" content="#0c1210" />
	<meta name="application-name" content="MutterCorp" />
	<meta name="apple-mobile-web-app-title" content="MutterCorp" />
	<meta name="robots" content="index, follow" />
	<meta name="author" content="MutterCorp" />
	<link rel="canonical" href="https://muttercorp.com.br{currentPath}" />
</svelte:head>

<div id="app" class="app-container">
	<a href="#main-content" class="skip-link">Pular para o conteúdo principal</a>

	<AppHeader />

	<main id="main-content" class="main-content has-nav">
		{@render children?.()}
	</main>

	<AppFooter />
</div>

<style>
	.app-container {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		background: var(--site-bg);
		color: var(--site-fg);
		transition:
			background 0.3s ease,
			color 0.3s ease;
	}

	.skip-link {
		position: absolute;
		top: -40px;
		left: 6px;
		background: var(--site-accent);
		color: white;
		padding: 8px;
		text-decoration: none;
		border-radius: 4px;
		z-index: 10000;
		transition: top 0.3s;
	}

	.skip-link:focus {
		top: 6px;
	}

	.main-content {
		flex: 1;
		display: flex;
		flex-direction: column;
		position: relative;
	}

	.main-content.has-nav {
		padding-top: 70px;
	}

	:global(body) {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		font-family: 'Manrope', system-ui, sans-serif;
		background: var(--site-bg);
		color: var(--site-fg);
		line-height: 1.6;
		-webkit-font-smoothing: antialiased;
		transition:
			background 0.3s ease,
			color 0.3s ease;
	}

	:global(*),
	:global(*::before),
	:global(*::after) {
		box-sizing: border-box;
	}

	:global(html) {
		scroll-behavior: smooth;
	}

	:global(::selection) {
		background: rgba(196, 92, 38, 0.35);
		color: #fff;
	}

	:global(a) {
		color: var(--site-accent-soft);
		transition: color 0.2s ease;
	}

	:global(a:hover) {
		color: var(--site-accent);
	}

	:global(img) {
		max-width: 100%;
		height: auto;
	}

	:global(button) {
		font-family: inherit;
		cursor: pointer;
	}

	@media (prefers-reduced-motion: reduce) {
		:global(*) {
			animation-duration: 0.01ms !important;
			animation-iteration-count: 1 !important;
			transition-duration: 0.01ms !important;
		}

		:global(html) {
			scroll-behavior: auto;
		}
	}

	:global(.container) {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 1.5rem;
	}

	@media (max-width: 768px) {
		.main-content.has-nav {
			padding-top: 60px;
		}
	}
</style>
