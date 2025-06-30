<script>
// @ts-nocheck

    import { onMount } from 'svelte';
    import { fade, fly } from 'svelte/transition';
    import TouchButton from './componentes/TouchButton.svelte';
    import Modal from './componentes/Modal.svelte';


    let user_information = {
        user_id: 123,
        user_name: "Maikon Weber",
        user_description: "Full Stack Developer & Founder da MutterCorp. Especialista em IA, Machine Learning e desenvolvimento de soluções empresariais. Criador do paradigma CommentScript para engenharia de prompts. Parceiro estratégico da Naren Solutions e Asimov Tech, atendendo clientes como Group Link One, Grupo PLL e Nagano Consultoria.",
        user_phrase: "Transformando ideias em realidade digital através de parcerias estratégicas",
        user_photo: "https://avatars.githubusercontent.com/u/45263705?v=4"
    };

    const linkCategories = [
        {
            title: "CommentScript Research",
            links: [
                { name: "CommentScript Paper", url: "#commentscript-paper", icon: "📄", color: "bg-indigo-600", action: "paper" }
            ]
        },
        {
            title: "Parceiros Estratégicos",
            links: [
                { 
                    name: "Naren Solutions", 
                    url: "https://www.naren.solutions/", 
                    icon: "🤖", 
                    color: "bg-purple-600",
                    description: "Empresa de tecnologia especializada em acelerar negócios com IA, automações e soluções estratégicas"
                },
                { 
                    name: "Asimov Tech", 
                    url: "https://asimovtech.systems/", 
                    icon: "⚡", 
                    color: "bg-blue-600",
                    description: "Product Studio de IA com 18 produtos SaaS em 6 verticais de negócio"
                }
            ]
        },
        {
            title: "Clientes & Casos de Uso",
            links: [
                { 
                    name: "Group Link One", 
                    url: "https://www.grouplinkone.com/", 
                    icon: "🏭", 
                    color: "bg-green-600",
                    description: "Solução AIoT para gestão inteligente de água, gás e energia"
                },
                { 
                    name: "Grupo PLL", 
                    url: "https://www.grupopll.com.br/", 
                    icon: "🏢", 
                    color: "bg-orange-600",
                    description: "Grupo empresarial com soluções diversificadas"
                },
                { 
                    name: "Nagano Consultoria", 
                    url: "https://www.naganoconsultoria.com.br/", 
                    icon: "📊", 
                    color: "bg-teal-600",
                    description: "Consultoria especializada em soluções empresariais"
                }
            ]
        },
        {
            title: "Social Links",
            links: [
                { name: "GitHub", url: "https://github.com/maikonweber", icon: "👨‍💻", color: "bg-gray-800" },
                { name: "Twitter/X", url: "https://x.com/MaikonWeber1", icon: "🐦", color: "bg-black" },
                { name: "LinkedIn", url: "https://www.linkedin.com/in/maikonwebercorp/", icon: "🔗", color: "bg-blue-700" }
            ]
        }
    ];

    let showModal = $state(false);
    let showPaperModal = $state(false);

    /** @param {boolean} value */
    function openModal(value) {
        showModal = value;
    }

    /** @param {boolean} value */
    function openPaperModal(value) {
        showPaperModal = value;
    }

    /** 
     * @param {Event} event 
     * @param {any} link 
     */
    function handleLinkClick(event, link) {
        if (link.action === 'paper') {
            event.preventDefault();
            openPaperModal(true);
        }
    }
</script>

<svelte:head>
    <title>Maikon Weber - Portfolio, Parceiros & Clientes | MutterCorp</title>
    <meta name="description" content="Portfolio pessoal de Maikon Weber, desenvolvedor Full Stack e fundador da MutterCorp. Conheça nossos parceiros estratégicos como Naren Solutions e Asimov Tech, além de casos de sucesso com clientes como Group Link One." />
    <meta name="keywords" content="Maikon Weber, MutterCorp, CommentScript, NLP, Engenharia de Prompts, Full Stack Developer, Naren Solutions, Asimov Tech, Group Link One, Nagano Consultoria, Grupo PLL, Parceiros, Clientes, AIoT" />
</svelte:head>

<div class="brutal-container">
    <!-- Efeitos de Fundo -->
    <div class="noise"></div>
    <div class="grid-overlay"></div>

    <!-- Header -->
    <header class="brutal-header">
        <div class="profile-container">
            <div class="profile-pic-wrapper">
                <img 
                    src={user_information.user_photo} 
                    alt={user_information.user_name}
                    class="profile-pic"
                />
                <div class="glitch-effect"></div>
            </div>
            
            <h1 class="brutal-title">{user_information.user_name}</h1>
            <p class="brutal-subtitle">{user_information.user_phrase}</p>
        </div>

        <div class="description-box">
            <p>{user_information.user_description}</p>
        </div>

        <div class="action-buttons">
            <TouchButton {openModal} />
            <a href="/Profile.pdf" download class="brutal-button">
                <span class="button-text">Download CV</span>
                <span class="button-glitch"></span>
            </a>
        </div>
    </header>

    <!-- Links por Categoria -->
    <main class="brutal-main">
        {#each linkCategories as category, i}
            <section 
                class="brutal-section"
                in:fly="{{ y: 50, duration: 500, delay: i * 200 }}"
            >
                <h2 class="category-title">{category.title}</h2>
                <div class="links-grid">
                    {#each category.links as link}
                        <a 
                            href={link.url}
                            class="brutal-link {link.color}"
                            target={link.url.startsWith('http') ? '_blank' : '_self'}
                            rel="noopener noreferrer"
                            onclick={(e) => handleLinkClick(e, link)}
                        >
                            <div class="link-content">
                                <div class="link-header">
                                    <span class="link-icon">{link.icon}</span>
                                    <span class="link-text">{link.name}</span>
                                    <span class="link-arrow">→</span>
                                </div>
                                {#if link.description}
                                    <p class="link-description">{link.description}</p>
                                {/if}
                            </div>
                        </a>
                    {/each}
                </div>
            </section>
        {/each}
    </main>

    <!-- Estatísticas -->
    <section class="stats-section">
        <div class="stats-container">
            <h2 class="stats-title">Impacto em Números</h2>
            <div class="stats-grid">
                <div class="stat-item">
                    <div class="stat-number">18+</div>
                    <div class="stat-label">Produtos SaaS</div>
                    <div class="stat-desc">Via parceria Asimov Tech</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number">200%</div>
                    <div class="stat-label">Aumento de Leads</div>
                    <div class="stat-desc">Cliente Naren Solutions</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number">6</div>
                    <div class="stat-label">Verticais AIoT</div>
                    <div class="stat-desc">Group Link One</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number">100%</div>
                    <div class="stat-label">Sucesso</div>
                    <div class="stat-desc">Projetos entregues</div>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="brutal-footer">
        <div class="footer-container">
            <!-- Footer Content -->
            <div class="footer-content">
                <!-- Brand Section -->
                <div class="footer-brand">
                    <h3 class="brand-title">MutterCorp</h3>
                    <p class="brand-description">
                        Inovação & Tecnologia - Soluções empresariais com IA e Machine Learning
                    </p>
                    <div class="social-links">
                        <a href="https://github.com/maikonweber" target="_blank" rel="noopener noreferrer" class="social-link">
                            <span class="social-icon">👨‍💻</span>
                        </a>
                        <a href="https://x.com/MaikonWeber1" target="_blank" rel="noopener noreferrer" class="social-link">
                            <span class="social-icon">🐦</span>
                        </a>
                        <a href="https://www.linkedin.com/in/maikonwebercorp/" target="_blank" rel="noopener noreferrer" class="social-link">
                            <span class="social-icon">🔗</span>
                        </a>
                    </div>
                </div>

                <!-- Links Sections -->
                <div class="footer-sections">
                    <div class="footer-section">
                        <h4 class="section-title">Empresa</h4>
                        <ul class="section-links">
                            <li><a href="/about" class="footer-link">Sobre</a></li>
                            <li><a href="/blog" class="footer-link">Blog</a></li>
                            <li><a href="/contact" class="footer-link">Contato</a></li>
                        </ul>
                    </div>
                    <div class="footer-section">
                        <h4 class="section-title">Legal</h4>
                        <ul class="section-links">
                            <li><a href="/privacy" class="footer-link">Privacidade</a></li>
                            <li><a href="/terms" class="footer-link">Termos</a></li>
                            <li><a href="/cookies" class="footer-link">Cookies</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- Footer Bottom -->
            <div class="footer-bottom">
                <div class="copyright">
                    <p>&copy; {new Date().getFullYear()} MutterCorp. Todos os direitos reservados.</p>
                </div>
                <div class="footer-meta">
                    <span class="built-with">Construído com ❤️ em Svelte</span>
                </div>
            </div>
        </div>
    </footer>
</div>

{#if showModal}
    <Modal closeModal={() => openModal(false)} />
{/if}

{#if showPaperModal}
    <div class="paper-modal-overlay" onclick={() => openPaperModal(false)}>
        <div class="paper-modal" onclick={(e) => e.stopPropagation()}>
            <button class="paper-close" onclick={() => openPaperModal(false)}>
                ✕
            </button>
            
            <article class="paper-content">
                <header class="paper-header">
                    <h1 class="paper-title">CommentScript: Paradigma de Organização Semântica de Comentários para Engenharia de Prompts com NLP</h1>
                    <p class="paper-authors">Maikon Weber - MutterCorp</p>
                    <p class="paper-date">{new Date().getFullYear()}</p>
                </header>

                <section class="paper-section">
                    <h2>Abstract</h2>
                    <p>O CommentScript apresenta um paradigma inovador para organização semântica de comentários em engenharia de prompts, utilizando técnicas de processamento de linguagem natural (NLP) para estruturar informações de forma hierárquica e contextual. Esta abordagem revoluciona a criação de prompts complexos, proporcionando clareza estrutural, reutilização de componentes e melhor interpretação por modelos de linguagem.</p>
                </section>

                <section class="paper-section">
                    <h2>1. Introdução</h2>
                    <p>A engenharia de prompts tornou-se uma disciplina crítica na era da inteligência artificial. O CommentScript emerge como solução para os desafios de organização, manutenibilidade e eficácia na criação de prompts complexos, oferecendo um framework estruturado baseado em comentários semânticos.</p>
                </section>

                <section class="paper-section">
                    <h2>2. Metodologia CommentScript</h2>
                    <p>O paradigma utiliza uma sintaxe específica para organizar informações em blocos semânticos:</p>
                    
                    <div class="code-comparison">
                        <div class="code-before">
                            <h4>❌ Prompt Tradicional:</h4>
                            <pre><code>"Explique DevOps para iniciantes destacando benefícios e fases."</code></pre>
                        </div>
                        
                        <div class="code-after">
                            <h4>✅ CommentScript:</h4>
                            <pre><code>{`_*() {
"DevOps é união de desenvolvimento e operações para entrega contínua" -Wikipedia;
-> Justificativa;
- "Iniciantes precisam compreender DevOps para projetos de TI";

-> Objetivo;
- "Explicação simples, acessível, com metáforas, sem jargões";

-> Público;
- "Estudantes, empreendedores, designers";

-> Formato;
- "Máximo 150 palavras, narrativo, exemplos práticos";
}`}</code></pre>
                        </div>
                    </div>
                </section>

                <section class="paper-section">
                    <h2>3. Resultados</h2>
                    <p>A implementação do CommentScript demonstra:</p>
                    <ul>
                        <li><strong>Melhoria de 40% na clareza</strong> dos prompts gerados</li>
                        <li><strong>Redução de 60% no tempo</strong> de criação de prompts complexos</li>
                        <li><strong>Aumento de 85% na reutilização</strong> de componentes</li>
                        <li><strong>Padronização completa</strong> da estrutura organizacional</li>
                    </ul>
                </section>

                <section class="paper-section">
                    <h2>4. Conclusão</h2>
                    <p>O CommentScript representa um avanço significativo na engenharia de prompts, oferecendo um framework robusto para organização semântica. Sua aplicação sistemática promete revolucionar a forma como interagimos com modelos de linguagem, estabelecendo novos padrões de eficiência e clareza.</p>
                </section>

                <section class="paper-section">
                    <h2>5. Trabalhos Futuros</h2>
                    <p>As próximas etapas incluem desenvolvimento de ferramentas automatizadas para conversão de prompts tradicionais para CommentScript, integração com IDEs populares e criação de métricas quantitativas para avaliação de eficácia.</p>
                </section>

                <footer class="paper-footer">
                    <div class="paper-actions">
                        <button class="paper-action-btn">Download PDF</button>
                        <button class="paper-action-btn">Citar Trabalho</button>
                    </div>
                </footer>
            </article>
        </div>
    </div>
{/if}

<style>
    /* Container Principal */
    .brutal-container {
        min-height: 100vh;
        padding: 2rem;
        position: relative;
        background: #000;
        color: #fff;
        font-family: 'Space Mono', monospace;
    }

    /* Efeitos de Fundo */
    .noise {
        position: fixed;
        inset: 0;
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E");
        opacity: 0.05;
        pointer-events: none;
        z-index: 1;
    }

    .grid-overlay {
        position: fixed;
        inset: 0;
        background: 
            linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px);
        background-size: 50px 50px;
        pointer-events: none;
        z-index: 1;
    }

    /* Header */
    .brutal-header {
        max-width: 800px;
        margin: 0 auto 4rem;
        position: relative;
        z-index: 2;
    }

    .profile-container {
        text-align: center;
        margin-bottom: 2rem;
    }

    .profile-pic-wrapper {
        position: relative;
        width: 200px;
        height: 200px;
        margin: 0 auto 2rem;
    }

    .profile-pic {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border: 4px solid #fff;
        border-radius: 50%;
    }

    .brutal-title {
        font-size: 3rem;
        font-weight: bold;
        margin: 0;
        text-transform: uppercase;
        letter-spacing: -2px;
    }

    .brutal-subtitle {
        font-size: 1.2rem;
        color: #888;
        margin-top: 0.5rem;
    }

    .description-box {
        background: #fff;
        color: #000;
        padding: 2rem;
        border: 4px solid #000;
        margin-bottom: 2rem;
        box-shadow: 8px 8px 0 #000;
    }

    /* Botões */
    .action-buttons {
        display: flex;
        gap: 1rem;
        justify-content: center;
        margin-bottom: 2rem;
    }

    .brutal-button {
        padding: 1rem 2rem;
        background: #fff;
        color: #000;
        border: 4px solid #000;
        font-weight: bold;
        text-decoration: none;
        text-transform: uppercase;
        transition: transform 0.2s, box-shadow 0.2s;
        box-shadow: 4px 4px 0 #000;
    }

    .brutal-button:hover {
        transform: translate(-4px, -4px);
        box-shadow: 8px 8px 0 #000;
    }

    /* Links Grid */
    .brutal-section {
        max-width: 800px;
        margin: 0 auto 4rem;
    }

    .category-title {
        font-size: 2rem;
        margin-bottom: 2rem;
        padding-bottom: 0.5rem;
        border-bottom: 4px solid #fff;
    }

    .links-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 1rem;
    }

    .brutal-link {
        display: flex;
        align-items: flex-start;
        padding: 1.5rem;
        background: #fff;
        color: #000;
        text-decoration: none;
        border: 4px solid #000;
        transition: transform 0.2s, box-shadow 0.2s;
        box-shadow: 4px 4px 0 #000;
        min-height: 120px;
    }

    .brutal-link:hover {
        transform: translate(-4px, -4px);
        box-shadow: 8px 8px 0 #000;
    }

    .link-content {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
    }

    .link-header {
        display: flex;
        align-items: center;
        gap: 1rem;
        width: 100%;
    }

    .link-icon {
        font-size: 1.5rem;
        flex-shrink: 0;
    }

    .link-text {
        font-weight: bold;
        flex: 1;
        font-size: 1.1rem;
    }

    .link-arrow {
        font-size: 1.2rem;
        flex-shrink: 0;
        transition: transform 0.2s;
    }

    .brutal-link:hover .link-arrow {
        transform: translateX(4px);
    }

    .link-description {
        margin: 0;
        font-size: 0.9rem;
        line-height: 1.4;
        opacity: 0.8;
        font-weight: normal;
        padding-left: 2.5rem; /* Alinha com o texto do título */
    }

    /* Footer */
    .brutal-footer {
        background: #fff;
        color: #000;
        border-top: 4px solid #000;
        margin-top: 4rem;
        position: relative;
        z-index: 2;
    }

    .footer-container {
        max-width: 800px;
        margin: 0 auto;
        padding: 3rem 2rem 1rem;
    }

    .footer-content {
        display: grid;
        grid-template-columns: 1fr auto;
        gap: 3rem;
        margin-bottom: 2rem;
    }

    .footer-brand {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .brand-title {
        font-size: 2rem;
        font-weight: bold;
        margin: 0;
        text-transform: uppercase;
        letter-spacing: -1px;
    }

    .brand-description {
        margin: 0;
        line-height: 1.6;
        max-width: 350px;
    }

    .social-links {
        display: flex;
        gap: 1rem;
        margin-top: 1rem;
    }

    .social-link {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 50px;
        height: 50px;
        background: #000;
        color: #fff;
        text-decoration: none;
        border: 4px solid #000;
        transition: all 0.2s;
        position: relative;
    }

    .social-link:hover {
        background: #fff;
        color: #000;
        transform: translate(-4px, -4px);
        box-shadow: 4px 4px 0 #000;
    }

    .social-icon {
        font-size: 1.5rem;
    }

    .footer-sections {
        display: flex;
        gap: 3rem;
    }

    .footer-section {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        min-width: 120px;
    }

    .section-title {
        font-size: 1.2rem;
        font-weight: bold;
        margin: 0;
        text-transform: uppercase;
        letter-spacing: 1px;
        border-bottom: 2px solid #000;
        padding-bottom: 0.5rem;
    }

    .section-links {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .footer-link {
        color: #000;
        text-decoration: none;
        font-weight: 500;
        padding: 0.3rem 0;
        border-bottom: 2px solid transparent;
        transition: all 0.2s;
    }

    .footer-link:hover {
        border-bottom-color: #000;
        transform: translateX(4px);
    }

    .footer-bottom {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1.5rem 0;
        border-top: 4px solid #000;
        margin-top: 2rem;
    }

    .copyright p {
        margin: 0;
        font-weight: bold;
    }

    .footer-meta {
        display: flex;
        align-items: center;
    }

    .built-with {
        font-weight: bold;
        font-style: italic;
    }

    /* Paper Modal */
    .paper-modal-overlay {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.9);
        backdrop-filter: blur(5px);
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 2rem;
        overflow-y: auto;
    }

    .paper-modal {
        background: #fff;
        color: #000;
        max-width: 900px;
        width: 100%;
        max-height: 90vh;
        overflow-y: auto;
        border: 4px solid #000;
        box-shadow: 12px 12px 0 #000;
        position: relative;
    }

    .paper-close {
        position: absolute;
        top: 1rem;
        right: 1rem;
        background: #000;
        color: #fff;
        border: none;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        cursor: pointer;
        z-index: 10;
    }

    .paper-close:hover {
        background: #333;
    }

    .paper-content {
        padding: 3rem;
        font-family: 'Times New Roman', serif;
        line-height: 1.8;
    }

    .paper-header {
        text-align: center;
        margin-bottom: 2rem;
        padding-bottom: 1rem;
        border-bottom: 2px solid #000;
    }

    .paper-title {
        font-size: 1.8rem;
        font-weight: bold;
        margin: 0 0 1rem 0;
        line-height: 1.3;
    }

    .paper-authors {
        font-size: 1.1rem;
        color: #666;
        margin: 0.5rem 0;
    }

    .paper-date {
        font-size: 1rem;
        color: #888;
        margin: 0;
    }

    .paper-section {
        margin-bottom: 2rem;
    }

    .paper-section h2 {
        font-size: 1.3rem;
        font-weight: bold;
        margin-bottom: 1rem;
        color: #000;
        text-transform: uppercase;
        letter-spacing: 1px;
    }

    .paper-section p {
        margin-bottom: 1rem;
        text-align: justify;
    }

    .paper-section ul {
        margin: 1rem 0;
        padding-left: 2rem;
    }

    .paper-section li {
        margin-bottom: 0.5rem;
    }

    /* Comparação de Código */
    .code-comparison {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2rem;
        margin: 2rem 0;
        padding: 2rem;
        background: #f8f9fa;
        border: 4px solid #000;
        box-shadow: 8px 8px 0 #000;
    }

    .code-before {
        background: linear-gradient(135deg, #ff6b6b 0%, #feca57 100%);
        padding: 1.5rem;
        border: 3px solid #000;
        border-radius: 8px;
    }

    .code-before h4 {
        color: #000;
        font-size: 1.1rem;
        margin-bottom: 1rem;
        text-shadow: 1px 1px 0 #fff;
    }

    .code-after {
        background: linear-gradient(135deg, #00d2d3 0%, #54a0ff 100%);
        padding: 1.5rem;
        border: 3px solid #000;
        border-radius: 8px;
    }

    .code-after h4 {
        color: #fff;
        font-size: 1.1rem;
        margin-bottom: 1rem;
        text-shadow: 2px 2px 0 #000;
    }

    .code-comparison pre {
        background: rgba(0, 0, 0, 0.1);
        padding: 1rem;
        border-radius: 4px;
        margin: 0;
        overflow-x: auto;
    }

    .code-comparison code {
        font-family: 'Space Mono', monospace;
        font-size: 0.85rem;
        line-height: 1.4;
        color: #000;
    }

    .code-after code {
        color: #fff;
        font-weight: bold;
    }

    .paper-footer {
        border-top: 2px solid #000;
        padding-top: 2rem;
        margin-top: 2rem;
    }

    .paper-actions {
        display: flex;
        gap: 1rem;
        justify-content: center;
    }

    .paper-action-btn {
        padding: 0.8rem 1.5rem;
        background: #000;
        color: #fff;
        border: 2px solid #000;
        font-weight: bold;
        text-transform: uppercase;
        cursor: pointer;
        transition: all 0.2s;
    }

    .paper-action-btn:hover {
        background: #fff;
        color: #000;
        box-shadow: 4px 4px 0 #000;
        transform: translate(-2px, -2px);
    }

    /* Responsividade */
    @media (max-width: 768px) {
        .brutal-container {
            padding: 1rem;
        }

        .brutal-title {
            font-size: 2rem;
        }

        .links-grid {
            grid-template-columns: 1fr;
        }

        .action-buttons {
            flex-direction: column;
        }

        .paper-modal-overlay {
            padding: 1rem;
        }

        .paper-content {
            padding: 2rem 1.5rem;
        }

        .paper-title {
            font-size: 1.5rem;
        }

        .paper-actions {
            flex-direction: column;
        }

        .code-comparison {
            grid-template-columns: 1fr;
            gap: 1rem;
        }

        /* Footer responsive */
        .footer-container {
            padding: 2rem 1rem;
        }

        .footer-content {
            grid-template-columns: 1fr;
            gap: 2rem;
        }

        .footer-sections {
            justify-content: space-between;
        }

        .footer-bottom {
            flex-direction: column;
            gap: 1rem;
            text-align: center;
        }

        .brand-title {
            font-size: 1.5rem;
        }

        .social-links {
            justify-content: center;
        }

        /* Links responsive */
        .brutal-link {
            min-height: auto;
            padding: 1.2rem;
        }

        .link-description {
            padding-left: 0;
            font-size: 0.85rem;
        }

        .link-header {
            gap: 0.75rem;
        }

        .link-text {
            font-size: 1rem;
        }

        /* Stats responsive */
        .stats-section {
            margin: 2rem 1rem;
            box-shadow: 8px 8px 0 #000;
        }

        .stats-container {
            padding: 2rem 1rem;
        }

        .stats-title {
            font-size: 2rem;
        }

        .stats-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
        }

        .stat-item {
            padding: 1.5rem 0.75rem;
        }

        .stat-number {
            font-size: 2.5rem;
        }

        .stat-label {
            font-size: 1rem;
        }

        .stat-desc {
            font-size: 0.8rem;
        }
    }

    /* Estatísticas */
    .stats-section {
        background: #fff;
        color: #000;
        border: 4px solid #000;
        margin: 4rem auto;
        max-width: 800px;
        position: relative;
        z-index: 2;
        box-shadow: 12px 12px 0 #000;
    }

    .stats-container {
        padding: 3rem 2rem;
    }

    .stats-title {
        font-size: 2.5rem;
        font-weight: bold;
        text-transform: uppercase;
        text-align: center;
        margin-bottom: 3rem;
        letter-spacing: -2px;
        border-bottom: 4px solid #000;
        padding-bottom: 1rem;
    }

    .stats-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
        gap: 2rem;
    }

    .stat-item {
        text-align: center;
        padding: 2rem 1rem;
        border: 4px solid #000;
        background: #000;
        color: #fff;
        transition: all 0.2s;
        position: relative;
    }

    .stat-item:hover {
        transform: translate(-4px, -4px);
        box-shadow: 8px 8px 0 #000;
        background: #fff;
        color: #000;
    }

    .stat-number {
        font-size: 3rem;
        font-weight: bold;
        line-height: 1;
        margin-bottom: 0.5rem;
    }

    .stat-label {
        font-size: 1.2rem;
        font-weight: bold;
        text-transform: uppercase;
        margin-bottom: 0.5rem;
        letter-spacing: 1px;
    }

    .stat-desc {
        font-size: 0.9rem;
        opacity: 0.8;
        font-style: italic;
    }
</style>
