<script>
	import { page } from '$app/stores';

	const navLinks = [
		{ href: '/', label: 'Início' },
		{ href: '/#servicos', label: 'Serviços' },
		{ href: '/#produtos', label: 'Produtos' },
		{ href: '/#experiencias', label: 'Experiências' },
		{ href: '/#contato', label: 'Contato' }
	];

	let currentPath = $derived($page.url.pathname);
</script>

<nav class="navigation" aria-label="Navegação principal">
	<ul class="nav-list">
		{#each navLinks as link}
			<li class="nav-item">
				<a
					href={link.href}
					class="nav-link"
					class:active={link.href === '/' && currentPath === '/'}
					aria-current={link.href === '/' && currentPath === '/' ? 'page' : undefined}
				>
					{link.label}
				</a>
			</li>
		{/each}
	</ul>
</nav>

<style>
	.navigation {
		display: flex;
		align-items: center;
	}

	.nav-list {
		display: flex;
		align-items: center;
		gap: 0.15rem;
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.nav-item {
		margin: 0;
	}

	.nav-link {
		display: flex;
		align-items: center;
		padding: 0.5rem 0.75rem;
		color: var(--site-muted);
		text-decoration: none;
		border-radius: 0.35rem;
		transition: all 0.2s ease;
		font-size: 0.88rem;
		font-weight: 500;
	}

	.nav-link:hover {
		color: var(--site-fg);
		background: var(--site-surface);
	}

	.nav-link.active {
		color: var(--site-accent-soft);
	}

	@media (max-width: 768px) {
		.navigation {
			display: none;
		}
	}
</style>
