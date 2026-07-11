<script>
	import ThemeToggle from './ThemeToggle.svelte';

	/** @type {boolean} */
	export let isOpen = false;
	/** @type {() => void} */
	export let onClose = () => {};

	const mainLinks = [
		{ href: '/', label: 'Início' },
		{ href: '/#servicos', label: 'Serviços' },
		{ href: '/#produtos', label: 'Produtos' },
		{ href: '/#experiencias', label: 'Experiências' },
		{ href: '/#contato', label: 'Contato' }
	];

	/** @param {KeyboardEvent} event */
	function handleKeydown(event) {
		if (event.key === 'Escape') onClose();
	}

	function handleOverlayClick() {
		onClose();
	}
</script>

<svelte:window on:keydown={handleKeydown} />

{#if isOpen}
	<!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
	<div class="overlay" onclick={handleOverlayClick}></div>

	<aside class="mobile-menu" class:open={isOpen} aria-label="Menu mobile">
		<nav class="menu-nav">
			{#each mainLinks as link}
				<a href={link.href} class="menu-link" onclick={onClose}>{link.label}</a>
			{/each}
		</nav>

		<div class="menu-footer">
			<ThemeToggle />
		</div>
	</aside>
{/if}

<style>
	.overlay {
		position: fixed;
		inset: 0;
		background: var(--bg-overlay);
		z-index: 90;
	}

	.mobile-menu {
		position: fixed;
		top: 0;
		right: 0;
		width: min(320px, 88vw);
		height: 100vh;
		background: var(--site-menu-bg);
		border-left: 1px solid var(--site-line);
		z-index: 100;
		padding: 5rem 1.5rem 2rem;
		display: flex;
		flex-direction: column;
		gap: 2rem;
		transform: translateX(100%);
		transition: transform 0.3s ease;
	}

	.mobile-menu.open {
		transform: translateX(0);
	}

	.menu-nav {
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
	}

	.menu-link {
		color: var(--site-fg);
		text-decoration: none;
		font-size: 1.15rem;
		font-weight: 600;
		padding: 0.75rem 0.5rem;
		border-radius: 0.35rem;
	}

	.menu-link:hover {
		background: var(--site-surface);
		color: var(--site-accent-soft);
	}

	.menu-footer {
		margin-top: auto;
	}
</style>
