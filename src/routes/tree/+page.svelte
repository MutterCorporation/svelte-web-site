<script>
	import { onMount } from 'svelte';
	import { fly, fade } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { TREE_PROFILE, TREE_SECTIONS } from './links.js';

	let mounted = $state(false);

	onMount(() => {
		mounted = true;
	});
</script>

<svelte:head>
	<title>Maikon Weber — Links | MutterCorp</title>
	<meta
		name="description"
		content="Links úteis de Maikon Weber de Carvalho: produtos MutterCorp, contato, LinkedIn, GitHub e experiências em software, IA e sistemas distribuídos."
	/>
	<meta
		name="keywords"
		content="Maikon Weber, Maikon Weber de Carvalho, MutterCorp, linktree, Full Stack, NestJS, LinkedIn"
	/>
</svelte:head>

<div class="tree">
	{#if mounted}
		<header class="hero" in:fade={{ duration: 400 }}>
			<img
				class="avatar"
				src={TREE_PROFILE.photo}
				alt={TREE_PROFILE.name}
				width="112"
				height="112"
			/>
			<p class="eyebrow">Link em bio</p>
			<h1>{TREE_PROFILE.name}</h1>
			<p class="role">{TREE_PROFILE.role}</p>
			<p class="location">{TREE_PROFILE.location}</p>
		</header>

		<section class="about" in:fly={{ y: 24, duration: 500, delay: 80, easing: cubicOut }}>
			<h2>Sobre mim</h2>
			{#each TREE_PROFILE.about as paragraph}
				<p>{paragraph}</p>
			{/each}
			<ul class="tags">
				<li>NestJS</li>
				<li>Kafka</li>
				<li>Sistemas distribuídos</li>
				<li>Full Stack</li>
				<li>IA / RAG</li>
			</ul>
		</section>

		{#each TREE_SECTIONS as section, i}
			<section
				class="section"
				aria-labelledby="sec-{section.id}"
				in:fly={{ y: 28, duration: 500, delay: 120 + i * 70, easing: cubicOut }}
			>
				<h2 id="sec-{section.id}">{section.title}</h2>
				<ul class="link-list">
					{#each section.links as link}
						<li>
							<a
								href={link.href}
								class="link-row"
								target={link.external ? '_blank' : undefined}
								rel={link.external ? 'noopener noreferrer' : undefined}
								download={link.download || undefined}
							>
								<span class="link-main">
									<span class="link-label">{link.label}</span>
									{#if link.hint}
										<span class="link-hint">{link.hint}</span>
									{/if}
								</span>
								<span class="link-arrow" aria-hidden="true">→</span>
							</a>
						</li>
					{/each}
				</ul>
			</section>
		{/each}

		<p class="foot-note" in:fade={{ duration: 400, delay: 400 }}>
			MutterCorp · desde 2018
		</p>
	{/if}
</div>

<style>
	.tree {
		--ink: var(--site-bg);
		--paper: var(--site-fg);
		--muted: var(--site-muted);
		--accent: var(--site-accent);
		--accent-soft: var(--site-accent-soft);
		--surface: var(--site-surface);
		--line: var(--site-line);
		position: relative;
		isolation: isolate;
		max-width: 40rem;
		margin: 0 auto;
		padding: 2.5rem 1.25rem 4rem;
		font-family: 'Manrope', system-ui, sans-serif;
		color: var(--paper);
	}

	.tree::before {
		content: '';
		position: absolute;
		inset: -2rem -1rem auto;
		height: 18rem;
		background:
			radial-gradient(ellipse 70% 60% at 20% 0%, color-mix(in srgb, var(--site-orb-a) 35%, transparent), transparent),
			radial-gradient(ellipse 60% 50% at 90% 20%, color-mix(in srgb, var(--site-orb-b) 28%, transparent), transparent);
		pointer-events: none;
		z-index: -1;
	}

	.hero {
		text-align: center;
		margin-bottom: 2rem;
	}

	.avatar {
		width: 7rem;
		height: 7rem;
		border-radius: 50%;
		object-fit: cover;
		border: 2px solid var(--site-line-strong);
		margin-bottom: 1.1rem;
		box-shadow: 0 12px 40px rgba(0, 0, 0, 0.18);
	}

	.eyebrow {
		margin: 0 0 0.35rem;
		font-size: 0.72rem;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		font-weight: 600;
		color: var(--muted);
	}

	h1 {
		font-family: 'Syne', sans-serif;
		font-size: clamp(1.85rem, 5vw, 2.35rem);
		font-weight: 800;
		letter-spacing: -0.04em;
		margin: 0 0 0.4rem;
		line-height: 1.1;
	}

	.role {
		margin: 0 auto;
		max-width: 28rem;
		color: var(--muted);
		font-size: 0.95rem;
		line-height: 1.45;
	}

	.location {
		margin: 0.55rem 0 0;
		font-size: 0.82rem;
		color: var(--accent-soft);
		font-weight: 600;
	}

	.about {
		margin-bottom: 2.25rem;
		padding: 1.35rem 1.25rem;
		background: var(--surface);
		border: 1px solid var(--line);
		border-radius: 0.5rem;
	}

	.about h2,
	.section h2 {
		font-family: 'Syne', sans-serif;
		font-size: 0.78rem;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		font-weight: 700;
		margin: 0 0 0.85rem;
		color: var(--muted);
	}

	.about p {
		margin: 0 0 0.75rem;
		color: var(--paper);
		line-height: 1.65;
		font-size: 0.95rem;
	}

	.about p:last-of-type {
		margin-bottom: 1rem;
	}

	.tags {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
	}

	.tags li {
		font-size: 0.72rem;
		font-weight: 600;
		padding: 0.28rem 0.5rem;
		border: 1px solid var(--line);
		border-radius: 0.25rem;
		background: var(--site-chip-bg);
		color: var(--paper);
	}

	.section {
		margin-bottom: 1.75rem;
	}

	.link-list {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 0.55rem;
	}

	.link-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		padding: 0.95rem 1.1rem;
		background: var(--surface);
		border: 1px solid var(--line);
		border-radius: 0.5rem;
		text-decoration: none;
		color: inherit;
		transition:
			border-color 0.2s ease,
			background 0.2s ease,
			transform 0.2s ease;
	}

	.link-row:hover {
		border-color: var(--site-line-strong);
		background: var(--site-surface-hover);
		transform: translateY(-2px);
	}

	.link-row:hover .link-arrow {
		color: var(--accent-soft);
		transform: translateX(3px);
	}

	.link-main {
		display: flex;
		flex-direction: column;
		gap: 0.15rem;
		min-width: 0;
	}

	.link-label {
		font-weight: 700;
		font-size: 1rem;
		letter-spacing: -0.01em;
	}

	.link-hint {
		font-size: 0.82rem;
		color: var(--muted);
		line-height: 1.35;
	}

	.link-arrow {
		flex-shrink: 0;
		font-size: 1.1rem;
		color: var(--muted);
		transition:
			color 0.2s ease,
			transform 0.2s ease;
	}

	.foot-note {
		text-align: center;
		margin: 2.5rem 0 0;
		font-size: 0.78rem;
		color: var(--muted);
		letter-spacing: 0.04em;
	}

	@media (max-width: 480px) {
		.tree {
			padding: 1.75rem 1rem 3rem;
		}

		.avatar {
			width: 5.75rem;
			height: 5.75rem;
		}

		.link-row {
			padding: 0.85rem 0.95rem;
		}
	}
</style>
