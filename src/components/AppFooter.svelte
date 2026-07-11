<script>
	const whatsappUrl =
		'https://wa.me/5511915009625?text=' +
		encodeURIComponent(
			'Olá! Quero tirar uma ideia do papel / resolver uma demanda de software. Podemos conversar sobre orçamento?'
		);

	const socialLinks = [
		{ href: whatsappUrl, label: 'WhatsApp' },
		{ href: 'mailto:muttercorp@gmail.com', label: 'E-mail' },
		{ href: 'https://github.com/maikonweber', label: 'GitHub' },
		{ href: 'https://www.linkedin.com/in/maikonwebercorp/', label: 'LinkedIn' }
	];
</script>

<footer class="compact-footer">
	<div class="footer-container">
		<span class="copyright">&copy; {new Date().getFullYear()} MutterCorp</span>

		<div class="social-compact">
			{#each socialLinks as social}
				<a
					href={social.href}
					target={social.href.startsWith('mailto:') ? undefined : '_blank'}
					rel={social.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
					class="social-icon"
				>
					{social.label}
				</a>
			{/each}
		</div>
	</div>
</footer>

<style>
	.compact-footer {
		background: var(--site-footer-bg);
		border-top: 1px solid var(--site-line);
		position: relative;
		z-index: 5;
	}

	.footer-container {
		max-width: 1100px;
		margin: 0 auto;
		padding: 1.25rem 1.5rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1.5rem;
		flex-wrap: wrap;
	}

	.copyright {
		color: var(--site-muted);
		font-size: 0.875rem;
	}

	.social-compact {
		display: flex;
		gap: 1.15rem;
		flex-wrap: wrap;
	}

	.social-icon {
		color: var(--site-muted);
		text-decoration: none;
		font-size: 0.875rem;
		font-weight: 500;
	}

	.social-icon:hover {
		color: var(--site-accent-soft);
	}
</style>
