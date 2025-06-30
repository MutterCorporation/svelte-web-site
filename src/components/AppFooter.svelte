<script>
  // Links essenciais apenas
  const essentialLinks = [
    { href: '/privacy', label: 'Privacidade' },
    { href: '/terms', label: 'Termos' },
    { href: '/cookies', label: 'Cookies' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contato' }
  ];

  // Links sociais compactos
  const socialLinks = [
    { href: 'https://github.com/maikonweber', icon: '👨‍💻', label: 'GitHub' },
    { href: 'https://x.com/MaikonWeber1', icon: '🐦', label: 'Twitter' },
    { href: 'https://www.linkedin.com/in/maikonwebercorp/', icon: '🔗', label: 'LinkedIn' }
  ];
</script>

<footer class="compact-footer">
  <div class="footer-container">
    
    <!-- Links Essenciais -->
    <nav class="footer-nav">
      {#each essentialLinks as link}
        <a href={link.href} class="footer-link">{link.label}</a>
      {/each}
    </nav>

    <!-- Copyright & Social -->
    <div class="footer-meta">
      <span class="copyright">&copy; {new Date().getFullYear()} MutterCorp</span>
      
      <div class="social-compact">
        {#each socialLinks as social}
          <a 
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            class="social-icon"
            title={social.label}
          >
            {social.icon}
          </a>
        {/each}
      </div>
    </div>
  </div>
</footer>

<style>
  /* Footer Compacto */
  .compact-footer {
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(10px);
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    position: relative;
    z-index: 5;
  }

  .footer-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 1rem 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
    min-height: 60px; /* Altura fixa e compacta */
  }

  /* Navigation Links */
  .footer-nav {
    display: flex;
    gap: 2rem;
    flex-wrap: wrap;
  }

  .footer-link {
    color: rgba(255, 255, 255, 0.7);
    text-decoration: none;
    font-size: 0.85rem;
    font-weight: 500;
    transition: all 0.2s ease;
    position: relative;
  }

  .footer-link::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 1px;
    background: #60a5fa;
    transition: width 0.2s ease;
  }

  .footer-link:hover {
    color: white;
  }

  .footer-link:hover::after {
    width: 100%;
  }

  /* Meta Section */
  .footer-meta {
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }

  .copyright {
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.8rem;
    white-space: nowrap;
  }

  /* Social Icons Compactos */
  .social-compact {
    display: flex;
    gap: 0.75rem;
  }

  .social-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    text-decoration: none;
    font-size: 1rem;
    transition: all 0.2s ease;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .social-icon:hover {
    background: rgba(96, 165, 250, 0.2);
    border-color: #60a5fa;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(96, 165, 250, 0.3);
  }

  /* Responsividade */
  @media (max-width: 768px) {
    .footer-container {
      flex-direction: column;
      gap: 1rem;
      padding: 1rem;
      min-height: 80px;
    }

    .footer-nav {
      gap: 1.5rem;
      justify-content: center;
    }

    .footer-meta {
      gap: 1rem;
      flex-direction: column-reverse;
    }

    .social-compact {
      gap: 1rem;
    }

    .social-icon {
      width: 36px;
      height: 36px;
      font-size: 1.1rem;
    }
  }

  @media (max-width: 480px) {
    .footer-container {
      min-height: 100px;
    }

    .footer-nav {
      gap: 1rem;
      text-align: center;
    }

    .footer-link {
      font-size: 0.8rem;
    }

    .copyright {
      font-size: 0.75rem;
      text-align: center;
    }
  }
</style> 